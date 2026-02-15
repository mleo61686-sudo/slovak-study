import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const currency = (body?.currency ?? "eur").toLowerCase();

    const PRICE_BY_CURRENCY: Record<string, string | undefined> = {
      eur: process.env.STRIPE_PRICE_EUR,
      usd: process.env.STRIPE_PRICE_USD,
      uah: process.env.STRIPE_PRICE_UAH,
    };

    const priceId =
      PRICE_BY_CURRENCY[currency] ?? process.env.STRIPE_PRICE_EUR;

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "Price not configured: set STRIPE_PRICE_EUR / USD / UAH in Vercel env",
        },
        { status: 500 }
      );
    }

    const origin = req.headers.get("origin") ?? process.env.APP_URL;
    if (!origin) {
      return NextResponse.json(
        { error: "APP_URL/origin not configured" },
        { status: 500 }
      );
    }

    const checkout = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer_email: email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/premium-success`,
      cancel_url: `${origin}/premium-cancel`,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: checkout.url });
  } catch (e: any) {
    const msg =
      e?.raw?.message || e?.message || "Unknown server error in /api/checkout";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
