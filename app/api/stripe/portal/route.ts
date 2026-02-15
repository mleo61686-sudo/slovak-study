// app/api/stripe/portal/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function POST(req: Request) {
  try {
    const session = await auth();
    const emailRaw = session?.user?.email;

    if (!emailRaw) {
      return NextResponse.json(
        { ok: false, error: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const email = emailRaw.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email },
      select: { stripeCustomerId: true },
    });

    if (!user?.stripeCustomerId) {
      return NextResponse.json(
        { ok: false, error: "NO_CUSTOMER" },
        { status: 400 }
      );
    }

    const origin = req.headers.get("origin") ?? "http://localhost:3000";

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${origin}/premium`,
    });

    return NextResponse.json({ ok: true, url: portalSession.url });
  } catch (e) {
    console.error("Stripe portal error:", e);
    return NextResponse.json(
      { ok: false, error: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}
