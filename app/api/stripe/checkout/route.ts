import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // твоя версія stripe типізує тільки таку apiVersion
  apiVersion: "2026-01-28.clover",
});

export async function POST() {
  const session = await auth();
  const email = session?.user?.email;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: process.env.STRIPE_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.APP_URL}/premium-success`,
    cancel_url: `${process.env.APP_URL}/premium-cancel`,
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: checkout.url });
}
