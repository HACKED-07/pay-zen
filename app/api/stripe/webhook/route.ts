import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWebhookSignature } from "@/lib/stripe";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header." },
      { status: 400 },
    );
  }

  let event;
  try {
    event = verifyWebhookSignature(body, signature);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.userId;
    const amountTotal = session.amount_total;

    if (!userId || !amountTotal) {
      return NextResponse.json(
        { error: "Missing metadata." },
        { status: 400 },
      );
    }

    const amount = amountTotal / 100;
    const paymentId = session.payment_intent as string;

    await prisma.$transaction(async (tx) => {
      const existing = await tx.walletTransaction.findFirst({
        where: { referenceId: paymentId, type: "DEPOSIT" },
      });

      if (existing) return existing;

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
          referenceId: paymentId,
        },
      });

      return wallet;
    });
  }

  return NextResponse.json({ received: true });
}
