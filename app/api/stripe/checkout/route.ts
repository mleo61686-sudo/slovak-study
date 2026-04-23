import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

type BillingInterval = "month" | "year";
type CurrencyCode = "eur" | "usd" | "uah" | "pln" | "czk";

const PRICE_MAP: Record<CurrencyCode, { month?: string; year?: string }> = {
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

  // ❗ ТІЛЬКИ MONTH
  pln: {
    month: process.env.STRIPE_PRICE_PLN,
  },
  czk: {
    month: process.env.STRIPE_PRICE_CZK,
  },
};

function isCurrencyCode(value: string): value is CurrencyCode {
  return ["eur", "usd", "uah", "pln", "czk"].includes(value);
}

function isBillingInterval(value: string): value is BillingInterval {
  return value === "month" || value === "year";
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const email = session?.user?.email?.trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));

    const rawCurrency = String(body?.currency ?? "eur").toLowerCase();
    const rawInterval = String(body?.interval ?? "month").toLowerCase();

    const currency: CurrencyCode = isCurrencyCode(rawCurrency)
      ? rawCurrency
      : "eur";

    const interval: BillingInterval = isBillingInterval(rawInterval)
      ? rawInterval
      : "month";

    const currencyMap = PRICE_MAP[currency];

    // ❗ якщо вибрали YEAR, але його нема → fallback на MONTH
    const priceId =
      interval === "year"
        ? currencyMap.year ?? currencyMap.month
        : currencyMap.month;

    if (!priceId) {
      return NextResponse.json(
        {
          error: `Price not configured for currency=${currency}, interval=${interval}`,
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

      // корисно для дебага
      metadata: {
        currency,
        interval,
      },
    });

    return NextResponse.json({ url: checkout.url });
  } catch (e: any) {
    const msg =
      e?.raw?.message ||
      e?.message ||
      "Unknown server error in /api/checkout";

    return NextResponse.json({ error: msg }, { status: 500 });
  }
}