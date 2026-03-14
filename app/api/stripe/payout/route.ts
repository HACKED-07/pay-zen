import { auth } from "@/auth";
import { getStripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { amount } = await req.json(); // amount in INR (rupees)
    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const userId = session.user.id;
    
    // Use an interactive transaction to prevent race conditions during payout
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { id: userId },
        include: { wallet: true },
      });

      if (!user) throw new Error("User not found");
      if (!user.stripeAccountId || !user.stripeAccountSetupComplete) {
        throw new Error("Stripe Connect account not fully configured");
      }
      
      const wallet = user.wallet;
      if (!wallet || wallet.balance < amount) {
        throw new Error("Insufficient wallet balance");
      }

      // 1. Deduct from wallet
      const updatedWallet = await tx.wallet.update({
        where: { id: wallet.id },
        data: { balance: { decrement: amount } },
      });

      // 2. Create withdrawal transaction
      const walletTx = await tx.walletTransaction.create({
        data: {
          walletId: wallet.id,
          amount: -amount,
          type: "WITHDRAWAL",
          description: "Withdrawal to Bank Account",
        },
      });

      return { user, walletTx };
    });

    const stripe = getStripe();

    try {
      // 3. Trigger Stripe Transfer to the Connected Account
      // Amount is in smallest currency unit (paise for INR)
      const transfer = await stripe.transfers.create({
        amount: Math.round(amount * 100),
        currency: "inr",
        destination: result.user.stripeAccountId!,
        metadata: {
          walletTransactionId: result.walletTx.id,
          userId: userId,
        },
      });

      // 4. Update the transaction with the Stripe transfer ID
      await prisma.walletTransaction.update({
        where: { id: result.walletTx.id },
        data: { referenceId: transfer.id },
      });

      return NextResponse.json({ success: true, transferId: transfer.id });
    } catch (stripeError: any) {
      // If Stripe transfer fails, we MUST rollback the wallet deduction.
      console.error("Stripe Transfer Failed, rolling back wallet.", stripeError);
      await prisma.$transaction(async (tx) => {
        await tx.wallet.update({
          where: { id: result.user.wallet!.id },
          data: { balance: { increment: amount } },
        });
        await tx.walletTransaction.update({
          where: { id: result.walletTx.id },
          data: { description: "Withdrawal to Bank Account (FAILED)" },
        });
      });
      return NextResponse.json({ error: stripeError.message || "Transfer failed" }, { status: 500 });
    }

  } catch (error: any) {
    console.error("Payout Route Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process withdrawal" },
      { status: 500 }
    );
  }
}
