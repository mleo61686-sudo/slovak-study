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

  // ✅ Оплата пройшла — підняли преміум на 1 місяць
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;

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
          },
        });
      }
    }
  }

  return new Response("ok");
}
