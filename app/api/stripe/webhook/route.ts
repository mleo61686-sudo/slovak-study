import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

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

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const rawEmail =
      session.customer_details?.email || session.customer_email || null;
    const email = rawEmail ? rawEmail.trim().toLowerCase() : null;

    const stripeCustomerId =
      typeof session.customer === "string" ? session.customer : null;

    const stripeSubscriptionId =
      typeof session.subscription === "string" ? session.subscription : null;

    let premiumUntil: Date | null = null;

    if (stripeSubscriptionId) {
      try {
        const subscription = await stripe.subscriptions.retrieve(
          stripeSubscriptionId
        );

        const periodEndSec = (subscription as any).current_period_end as
          | number
          | undefined;

        premiumUntil = periodEndSec ? new Date(periodEndSec * 1000) : null;
      } catch (err) {
        console.error("Failed to retrieve subscription in checkout.session.completed:", err);
      }
    }

    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        await prisma.user.update({
          where: { email },
          data: {
            isPremium: true,
            premiumUntil: premiumUntil ?? user.premiumUntil ?? new Date(),
            stripeCustomerId: stripeCustomerId ?? user.stripeCustomerId ?? null,
            stripeSubscriptionId:
              stripeSubscriptionId ?? user.stripeSubscriptionId ?? null,
          },
        });
      }
    }
  }

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription;

    const stripeCustomerId =
      typeof sub.customer === "string" ? sub.customer : null;

    const stripeSubscriptionId = sub.id;

    const periodEndSec = (sub as any).current_period_end as number | undefined;
    const periodEnd = periodEndSec ? new Date(periodEndSec * 1000) : null;

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
            isPremium: active,
            premiumUntil: active ? periodEnd : null,
          },
        });
      }
    }
  }

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