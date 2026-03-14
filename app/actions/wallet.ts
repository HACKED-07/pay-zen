"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function addDummyFunds(amount: number) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return { error: "Unauthorized" };
  if (!Number.isFinite(amount) || amount < 1 || amount > 100000) {
    return { error: "Amount must be between ₹1 and ₹1,00,000." };
  }

  try {
    await prisma.$transaction(async (tx) => {
      const wallet = await tx.wallet.upsert({
        where: { userId },
        update: { balance: { increment: amount } },
        create: { userId, balance: amount },
      });

      await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount,
          type: "DEPOSIT",
          referenceId: `test_${Date.now()}`,
        },
      });
    });

    return { success: `₹${amount.toLocaleString("en-IN")} added to wallet.` };
  } catch (error) {
    console.error("Dummy funds failed:", error);
    return {
      error:
        error instanceof Error ? error.message : "Failed to add test funds.",
    };
  }
}
