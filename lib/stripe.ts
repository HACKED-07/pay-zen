import Stripe from "stripe";

function getStripeSecretKey(): string {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return key;
}

export function getStripe() {
  return new Stripe(getStripeSecretKey(), { apiVersion: "2026-02-25.clover" });
}

export function hasStripeKeys(): boolean {
  return Boolean(
    process.env.STRIPE_SECRET_KEY &&
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  );
}

export async function createCheckoutSession({
  amount,
  userId,
  origin,
}: {
  amount: number;
  userId: string;
  origin: string;
}) {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: { name: "PayZen Wallet Top-Up" },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { userId, purpose: "wallet_topup" },
    success_url: `${origin}?topup=success`,
    cancel_url: `${origin}?topup=cancelled`,
  });

  return session;
}

export function verifyWebhookSignature(
  body: string | Buffer,
  signature: string,
): Stripe.Event {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not configured.");
  return stripe.webhooks.constructEvent(body, signature, secret);
}
