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

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { stripeAccountId: true, email: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stripe = getStripe();
    let stripeAccountId = user.stripeAccountId;

    // Create a connected account if it doesn't exist
    if (!stripeAccountId) {
      const account = await stripe.accounts.create({
        type: "express",
        country: "IN",
        email: user.email ?? undefined,
        capabilities: {
          transfers: { requested: true },
        },
      });
      stripeAccountId = account.id;

      await prisma.user.update({
        where: { id: userId },
        data: { stripeAccountId },
      });
    }

    // Generate onboarding link
    const origin = new URL(req.url).origin;
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${origin}/?onboarding=failed`,
      return_url: `${origin}/?onboarding=success`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error: any) {
    console.error("Stripe Connect Onboarding Error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to generate onboarding link" },
      { status: 500 }
    );
  }
}
