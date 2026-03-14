// app/actions/settle.ts
"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

type ExecuteSettlementPayload = {
  groupId: string;
  toUserId: string;
  amount: number;
};

export async function executeWalletSettlement({
  groupId,
  toUserId,
  amount,
}: ExecuteSettlementPayload) {
  const session = await auth();
  const fromUserId = session?.user?.id;

  if (!fromUserId) return { error: "Unauthorized" };
  if (amount <= 0) return { error: "Invalid amount" };

  try {
    // Resolve user names for descriptions
    const [fromUser, toUser, group] = await Promise.all([
      prisma.user.findUnique({ where: { id: fromUserId }, select: { name: true, email: true } }),
      prisma.user.findUnique({ where: { id: toUserId }, select: { name: true, email: true } }),
      prisma.group.findUnique({ where: { id: groupId }, select: { name: true } }),
    ]);

    const fromName = fromUser?.name || fromUser?.email || "Unknown";
    const toName = toUser?.name || toUser?.email || "Unknown";
    const groupName = group?.name || "group";

    const result = await prisma.$transaction(async (tx) => {
      // 1. Lock/Fetch both wallets
      const senderWallet = await tx.wallet.findUnique({
        where: { userId: fromUserId },
      });
      const receiverWallet = await tx.wallet.findUnique({
        where: { userId: toUserId },
      });

      if (!senderWallet || senderWallet.balance < amount) {
        throw new Error(
          `Insufficient balance. You have ₹${senderWallet?.balance?.toFixed(2) ?? "0.00"} but need ₹${amount.toFixed(2)}. Add funds first.`,
        );
      }
      if (!receiverWallet) {
        throw new Error("Receiver does not have an active wallet.");
      }

      // 2. Create the Settlement Record
      const settlement = await tx.settlement.create({
        data: {
          groupId,
          fromId: fromUserId,
          toId: toUserId,
          amount,
          method: "APP",
          status: "COMPLETED",
        },
      });

      // 3. Deduct from Sender
      await tx.wallet.update({
        where: { id: senderWallet.id },
        data: { balance: { decrement: amount } },
      });
      await tx.walletTransaction.create({
        data: {
          walletId: senderWallet.id,
          amount: -Math.abs(amount),
          type: "SETTLEMENT_SENT",
          description: `Sent to ${toName} · ${groupName} pre-settlement`,
          referenceId: settlement.id,
        },
      });

      // 4. Credit to Receiver
      await tx.wallet.update({
        where: { id: receiverWallet.id },
        data: { balance: { increment: amount } },
      });
      await tx.walletTransaction.create({
        data: {
          walletId: receiverWallet.id,
          amount: Math.abs(amount),
          type: "SETTLEMENT_RECEIVED",
          description: `Received from ${fromName} · ${groupName} pre-settlement`,
          referenceId: settlement.id,
        },
      });

      return settlement;
    });

    return { success: true, settlementId: result.id };
  } catch (error) {
    console.error("Settlement execution failed:", error);
    return {
      error:
        error instanceof Error
          ? error.message
          : "Failed to execute settlement.",
    };
  }
}
