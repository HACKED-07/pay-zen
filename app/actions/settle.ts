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
          "Insufficient wallet balance. Please add funds via Stripe.",
        );
      }
      if (!receiverWallet) {
        throw new Error("Receiver does not have an active wallet.");
      }

      // 2. Create the Settlement Record (from your existing schema)
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
          referenceId: settlement.id,
        },
      });

      return settlement;
    });

    return { success: true, settlementId: result.id };
  } catch (error: any) {
    console.error("Settlement execution failed:", error);
    return { error: error.message || "Failed to execute settlement." };
  }
}
