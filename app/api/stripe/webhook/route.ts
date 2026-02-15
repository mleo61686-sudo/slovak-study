import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

function addOneMonth(d: Date) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + 1);
  return x;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // ✅ 1) checkout завершено: включаємо premium + зберігаємо customer/subscription
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // ✅ FIX: нормалізуємо email (інакше findUnique може не знайти користувача)
    const rawEmail =
      session.customer_details?.email || session.customer_email || null;
    const email = rawEmail ? rawEmail.trim().toLowerCase() : null;

    const stripeCustomerId =
      typeof session.customer === "string" ? session.customer : null;

    const stripeSubscriptionId =
      typeof session.subscription === "string" ? session.subscription : null;

    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        const base =
          user.premiumUntil && user.premiumUntil > new Date()
            ? user.premiumUntil
            : new Date();

        await prisma.user.update({
          where: { email },
          data: {
            isPremium: true,
            premiumUntil: addOneMonth(base),

            // ✅ важливо для Customer Portal
            stripeCustomerId: stripeCustomerId ?? user.stripeCustomerId ?? null,
            stripeSubscriptionId:
              stripeSubscriptionId ?? user.stripeSubscriptionId ?? null,
          },
        });
      }
    }
  }

  // ✅ 2) підписка оновилась (cancel_at_period_end / period_end / status)
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;

    const stripeCustomerId =
      typeof sub.customer === "string" ? sub.customer : null;

    const stripeSubscriptionId = sub.id;

    // ✅ TS types можуть не містити current_period_end, тому беремо через any
    const periodEndSec = (sub as any).current_period_end as number | undefined;
    const periodEnd = periodEndSec ? new Date(periodEndSec * 1000) : null;

    // premium активний якщо subscription active/trialing
    const active = sub.status === "active" || sub.status === "trialing";

    if (stripeCustomerId) {
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId },
        select: { id: true },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeSubscriptionId,
            isPremium: active ? true : false,
            premiumUntil: active ? periodEnd : null,
          },
        });
      }
    }
  }

  // ✅ 3) підписка видалена (повне скасування / закінчилась)
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription;

    const stripeCustomerId =
      typeof sub.customer === "string" ? sub.customer : null;

    if (stripeCustomerId) {
      const user = await prisma.user.findFirst({
        where: { stripeCustomerId },
        select: { id: true },
      });

      if (user) {
        await prisma.user.update({
          where: { id: user.id },
          data: {
            isPremium: false,
            premiumUntil: null,
          },
        });
      }
    }
  }

  return new Response("ok");
}
