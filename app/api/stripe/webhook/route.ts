import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

function keepLaterDate(
  currentDate: Date | null | undefined,
  newDate: Date | null | undefined
) {
  if (!currentDate) return newDate ?? null;
  if (!newDate) return currentDate;
  return currentDate > newDate ? currentDate : newDate;
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getFallbackPremiumUntilFromCheckoutSession(
  session: Stripe.Checkout.Session
) {
  const createdMs =
    typeof session.created === "number"
      ? session.created * 1000
      : Date.now();

  const createdDate = new Date(createdMs);
  const interval = session.metadata?.interval;

  if (interval === "year") {
    return addDays(createdDate, 365);
  }

  return addDays(createdDate, 30);
}

async function getPremiumUntilFromSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const periodEndSec = (subscription as any).current_period_end as
      | number
      | undefined;

    return periodEndSec ? new Date(periodEndSec * 1000) : null;
  } catch (err) {
    console.error("Failed to retrieve Stripe subscription:", err);
    return null;
  }
}

async function findUserFromCheckoutSession(session: Stripe.Checkout.Session) {
  const userId =
    session.metadata?.userId || session.client_reference_id || null;

  const rawEmail =
    session.customer_details?.email || session.customer_email || null;

  const email = rawEmail ? rawEmail.trim().toLowerCase() : null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) return user;
  }

  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) return user;
  }

  return null;
}

async function findUserByStripeCustomerId(stripeCustomerId: string) {
  return prisma.user.findFirst({
    where: { stripeCustomerId },
  });
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return new Response("Missing signature", { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return new Response("Missing webhook secret", { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Invalid Stripe webhook signature:", err);
    return new Response("Invalid signature", { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      const user = await findUserFromCheckoutSession(session);

      if (!user) {
        console.error("Stripe webhook: user not found for checkout session", {
          sessionId: session.id,
          clientReferenceId: session.client_reference_id,
          metadata: session.metadata,
          customerEmail: session.customer_email,
          customerDetailsEmail: session.customer_details?.email,
        });

        // Return 200 so Stripe does not retry forever,
        // but log the issue for manual investigation.
        return new Response("ok");
      }

      const stripeCustomerId =
        typeof session.customer === "string" ? session.customer : null;

      const stripeSubscriptionId =
        typeof session.subscription === "string" ? session.subscription : null;

      const premiumUntilFromStripe = stripeSubscriptionId
        ? await getPremiumUntilFromSubscription(stripeSubscriptionId)
        : null;

      const fallbackPremiumUntil =
        getFallbackPremiumUntilFromCheckoutSession(session);

      const nextPremiumUntil =
        premiumUntilFromStripe ?? fallbackPremiumUntil;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isPremium: true,

          // Important:
          // Do not reduce premiumUntil if you manually gave compensation.
          premiumUntil: keepLaterDate(user.premiumUntil, nextPremiumUntil),

          stripeCustomerId: stripeCustomerId ?? user.stripeCustomerId ?? null,
          stripeSubscriptionId:
            stripeSubscriptionId ?? user.stripeSubscriptionId ?? null,
        },
      });
    }

    if (event.type === "customer.subscription.updated") {
      const sub = event.data.object as Stripe.Subscription;

      const stripeCustomerId =
        typeof sub.customer === "string" ? sub.customer : null;

      const stripeSubscriptionId = sub.id;

      const periodEndSec = (sub as any).current_period_end as
        | number
        | undefined;

      const periodEnd = periodEndSec ? new Date(periodEndSec * 1000) : null;

      const active = sub.status === "active" || sub.status === "trialing";

      if (stripeCustomerId) {
        const user = await findUserByStripeCustomerId(stripeCustomerId);

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeSubscriptionId,
              isPremium: active,

              // If active, extend date but do not reduce manual compensation.
              // If not active, remove access.
              premiumUntil: active
                ? keepLaterDate(user.premiumUntil, periodEnd)
                : null,
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
        const user = await findUserByStripeCustomerId(stripeCustomerId);

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isPremium: false,
              premiumUntil: null,
              stripeSubscriptionId: null,
            },
          });
        }
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;

      const stripeCustomerId =
        typeof invoice.customer === "string" ? invoice.customer : null;

      const stripeSubscriptionId =
        typeof (invoice as any).subscription === "string"
          ? ((invoice as any).subscription as string)
          : null;

      if (stripeCustomerId && stripeSubscriptionId) {
        const user = await findUserByStripeCustomerId(stripeCustomerId);

        if (user) {
          const premiumUntilFromStripe =
            await getPremiumUntilFromSubscription(stripeSubscriptionId);

          await prisma.user.update({
            where: { id: user.id },
            data: {
              isPremium: true,
              stripeSubscriptionId,
              premiumUntil: keepLaterDate(
                user.premiumUntil,
                premiumUntilFromStripe
              ),
            },
          });
        }
      }
    }

    if (event.type === "invoice.payment_failed") {
      const invoice = event.data.object as Stripe.Invoice;

      console.warn("Stripe invoice payment failed:", {
        invoiceId: invoice.id,
        customer: invoice.customer,
        subscription: (invoice as any).subscription,
      });

      // Important:
      // Do not immediately remove Premium here.
      // Stripe may retry payment. Subscription status updates will handle access.
    }

    return new Response("ok");
  } catch (err) {
    console.error("Stripe webhook handler error:", err);
    return new Response("Webhook handler error", { status: 500 });
  }
}