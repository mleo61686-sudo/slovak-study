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
    const interval = (body?.interval ?? "month").toLowerCase(); // ✅ NEW

    // ✅ PRICE MAP
    const PRICE_MAP: Record<
      string,
      { month?: string; year?: string }
    > = {
      eur: {
        month: process.env.STRIPE_PRICE_EUR,
        year: process.env.STRIPE_PRICE_EUR_YEAR,
      },
      usd: {
        month: process.env.STRIPE_PRICE_USD,
        year: process.env.STRIPE_PRICE_USD_YEAR,
      },
      uah: {
        month: process.env.STRIPE_PRICE_UAH,
        year: process.env.STRIPE_PRICE_UAH_YEAR,
      },
    };

    const currencyMap = PRICE_MAP[currency] ?? PRICE_MAP.eur;
    const priceId =
      interval === "year"
        ? currencyMap.year
        : currencyMap.month;

    if (!priceId) {
      return NextResponse.json(
        {
          error:
            "Price not configured: check STRIPE_PRICE_* env variables",
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