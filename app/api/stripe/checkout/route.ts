import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createCheckoutSession } from "@/lib/stripe";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const amount = Number(body.amount ?? 0);

  if (!Number.isFinite(amount) || amount < 1) {
    return NextResponse.json(
      { error: "Amount must be at least ₹1." },
      { status: 400 },
    );
  }

  try {
    const origin = new URL(request.url).origin;
    const checkoutSession = await createCheckoutSession({
      amount,
      userId: session.user.id,
      origin,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Unable to create checkout session.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
