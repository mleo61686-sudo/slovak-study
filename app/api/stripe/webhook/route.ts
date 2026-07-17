import Stripe from "stripe";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

/**
 * Зберігає пізнішу з двох дат.
 *
 * Це важливо, щоб Stripe webhook не скоротив вручну
 * додану компенсацію, наприклад Premium до 21.08.2026.
 */
function keepLaterDate(
  currentDate: Date | null | undefined,
  newDate: Date | null | undefined
): Date | null {
  if (!currentDate) return newDate ?? null;
  if (!newDate) return currentDate;

  return currentDate.getTime() > newDate.getTime()
    ? currentDate
    : newDate;
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

/**
 * Резервна дата на випадок, якщо Stripe тимчасово
 * не вдалося отримати підписку.
 */
function getFallbackPremiumUntilFromCheckoutSession(
  session: Stripe.Checkout.Session
): Date {
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

/**
 * У нових версіях Stripe current_period_end знаходиться
 * у subscription.items.data[], а не на верхньому рівні subscription.
 *
 * Беремо найпізнішу дату серед усіх елементів підписки.
 */
function getPremiumUntilFromSubscriptionObject(
  subscription: Stripe.Subscription
): Date | null {
  const items = (subscription as any)?.items?.data;

  if (!Array.isArray(items)) {
    return null;
  }

  const periodEnds = items
    .map((item: any) => item?.current_period_end)
    .filter(
      (value: unknown): value is number =>
        typeof value === "number" &&
        Number.isFinite(value)
    );

  if (periodEnds.length === 0) {
    return null;
  }

  const latestPeriodEnd = Math.max(...periodEnds);

  return new Date(latestPeriodEnd * 1000);
}

/**
 * Безпечно дістає Stripe ID:
 * - якщо значення вже є рядком;
 * - якщо Stripe повернув розгорнутий об'єкт з полем id.
 */
function getStripeObjectId(value: unknown): string | null {
  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  if (
    value &&
    typeof value === "object" &&
    "id" in value &&
    typeof (value as { id?: unknown }).id === "string"
  ) {
    return (value as { id: string }).id;
  }

  return null;
}

/**
 * У новій Stripe API ID підписки в invoice знаходиться тут:
 * invoice.parent.subscription_details.subscription
 *
 * Унизу також залишена підтримка старого invoice.subscription.
 */
function getInvoiceSubscriptionId(
  invoice: Stripe.Invoice
): string | null {
  const rawInvoice = invoice as any;

  const subscriptionFromParent =
    rawInvoice?.parent?.subscription_details?.subscription;

  const newStructureId =
    getStripeObjectId(subscriptionFromParent);

  if (newStructureId) {
    return newStructureId;
  }

  // Підтримка старої структури Stripe.
  return getStripeObjectId(rawInvoice?.subscription);
}

function getInvoiceCustomerId(
  invoice: Stripe.Invoice
): string | null {
  return getStripeObjectId((invoice as any)?.customer);
}

/**
 * Отримує актуальну дату завершення оплаченого періоду
 * безпосередньо зі Stripe.
 */
async function getPremiumUntilFromSubscription(
  subscriptionId: string
): Promise<Date | null> {
  try {
    const subscription =
      await stripe.subscriptions.retrieve(subscriptionId);

    return getPremiumUntilFromSubscriptionObject(subscription);
  } catch (error) {
    console.error(
      "Failed to retrieve Stripe subscription:",
      {
        subscriptionId,
        error,
      }
    );

    return null;
  }
}

async function findUserFromCheckoutSession(
  session: Stripe.Checkout.Session
) {
  const userId =
    session.metadata?.userId ||
    session.client_reference_id ||
    null;

  const rawEmail =
    session.customer_details?.email ||
    session.customer_email ||
    null;

  const email = rawEmail
    ? rawEmail.trim().toLowerCase()
    : null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user) {
      return user;
    }
  }

  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return user;
    }
  }

  return null;
}

/**
 * Спочатку шукаємо користувача за Stripe Customer ID.
 * Якщо не знайшли — пробуємо Stripe Subscription ID.
 */
async function findUserByStripeIds(
  stripeCustomerId: string | null,
  stripeSubscriptionId: string | null
) {
  if (stripeCustomerId) {
    const userByCustomer =
      await prisma.user.findFirst({
        where: { stripeCustomerId },
      });

    if (userByCustomer) {
      return userByCustomer;
    }
  }

  if (stripeSubscriptionId) {
    const userBySubscription =
      await prisma.user.findFirst({
        where: { stripeSubscriptionId },
      });

    if (userBySubscription) {
      return userBySubscription;
    }
  }

  return null;
}

/**
 * Перевіряє, чи збережена Premium-дата ще не минула.
 *
 * Завдяки цьому скасування підписки не забере
 * вручну додані компенсаційні дні.
 */
function hasRemainingPremium(
  premiumUntil: Date | null | undefined
): boolean {
  return Boolean(
    premiumUntil &&
      premiumUntil.getTime() > Date.now()
  );
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = (await headers()).get("stripe-signature");

  if (!sig) {
    return new Response("Missing signature", {
      status: 400,
    });
  }

  const webhookSecret =
    process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");

    return new Response("Missing webhook secret", {
      status: 500,
    });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      webhookSecret
    );
  } catch (error) {
    console.error(
      "Invalid Stripe webhook signature:",
      error
    );

    return new Response("Invalid signature", {
      status: 400,
    });
  }

  try {
    /**
     * Перша покупка Premium через Stripe Checkout.
     */
    if (event.type === "checkout.session.completed") {
      const checkoutSession =
        event.data.object as Stripe.Checkout.Session;

      const user =
        await findUserFromCheckoutSession(checkoutSession);

      if (!user) {
        console.error(
          "Stripe webhook: user not found for checkout session",
          {
            eventId: event.id,
            sessionId: checkoutSession.id,
            clientReferenceId:
              checkoutSession.client_reference_id,
            metadata: checkoutSession.metadata,
            customerEmail:
              checkoutSession.customer_email,
            customerDetailsEmail:
              checkoutSession.customer_details?.email,
          }
        );

        // Повертаємо 200, щоб Stripe не повторював
        // цю подію безкінечно.
        return new Response("ok");
      }

      const stripeCustomerId =
        getStripeObjectId(checkoutSession.customer);

      const stripeSubscriptionId =
        getStripeObjectId(checkoutSession.subscription);

      const premiumUntilFromStripe =
        stripeSubscriptionId
          ? await getPremiumUntilFromSubscription(
              stripeSubscriptionId
            )
          : null;

      const fallbackPremiumUntil =
        getFallbackPremiumUntilFromCheckoutSession(
          checkoutSession
        );

      const nextPremiumUntil =
        premiumUntilFromStripe ??
        fallbackPremiumUntil;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isPremium: true,

          // Не скорочує вручну додану компенсацію.
          premiumUntil: keepLaterDate(
            user.premiumUntil,
            nextPremiumUntil
          ),

          stripeCustomerId:
            stripeCustomerId ??
            user.stripeCustomerId ??
            null,

          stripeSubscriptionId:
            stripeSubscriptionId ??
            user.stripeSubscriptionId ??
            null,
        },
      });

      console.log(
        "Stripe checkout completed successfully",
        {
          eventId: event.id,
          userId: user.id,
          stripeCustomerId,
          stripeSubscriptionId,
          nextPremiumUntil,
        }
      );
    }

    /**
     * Створення або оновлення підписки.
     */
    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated"
    ) {
      const subscription =
        event.data.object as Stripe.Subscription;

      const stripeCustomerId =
        getStripeObjectId(subscription.customer);

      const stripeSubscriptionId = subscription.id;

      const periodEnd =
        getPremiumUntilFromSubscriptionObject(
          subscription
        );

      const user = await findUserByStripeIds(
        stripeCustomerId,
        stripeSubscriptionId
      );

      if (!user) {
        console.error(
          "Stripe subscription: user not found",
          {
            eventId: event.id,
            eventType: event.type,
            stripeCustomerId,
            stripeSubscriptionId,
            subscriptionStatus: subscription.status,
          }
        );
      } else {
        const accessIsActive =
          subscription.status === "active" ||
          subscription.status === "trialing";

        const accessShouldBeRevoked =
          subscription.status === "canceled" ||
          subscription.status === "unpaid" ||
          subscription.status ===
            "incomplete_expired";

        if (accessIsActive) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId:
                stripeCustomerId ??
                user.stripeCustomerId ??
                null,

              stripeSubscriptionId,

              isPremium: true,

              // Stripe не може скоротити ручну компенсацію.
              premiumUntil: keepLaterDate(
                user.premiumUntil,
                periodEnd
              ),
            },
          });
        } else if (accessShouldBeRevoked) {
          const remainingManualAccess =
            hasRemainingPremium(user.premiumUntil);

          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId:
                stripeCustomerId ??
                user.stripeCustomerId ??
                null,

              stripeSubscriptionId:
                subscription.status === "canceled"
                  ? null
                  : stripeSubscriptionId,

              // Залишаємо доступ, якщо вручну задана
              // Premium-дата ще не минула.
              isPremium: remainingManualAccess,

              premiumUntil: remainingManualAccess
                ? user.premiumUntil
                : null,
            },
          });
        } else {
          /**
           * Статуси past_due, incomplete або paused.
           *
           * Не забираємо Premium миттєво, тому що Stripe
           * може повторити спробу оплати.
           */
          await prisma.user.update({
            where: { id: user.id },
            data: {
              stripeCustomerId:
                stripeCustomerId ??
                user.stripeCustomerId ??
                null,

              stripeSubscriptionId,
            },
          });
        }
      }
    }

    /**
     * Підписка остаточно завершилася або була видалена.
     */
    if (event.type === "customer.subscription.deleted") {
      const subscription =
        event.data.object as Stripe.Subscription;

      const stripeCustomerId =
        getStripeObjectId(subscription.customer);

      const stripeSubscriptionId = subscription.id;

      const user = await findUserByStripeIds(
        stripeCustomerId,
        stripeSubscriptionId
      );

      if (!user) {
        console.error(
          "Stripe deleted subscription: user not found",
          {
            eventId: event.id,
            stripeCustomerId,
            stripeSubscriptionId,
          }
        );
      } else {
        const remainingManualAccess =
          hasRemainingPremium(user.premiumUntil);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            stripeCustomerId:
              stripeCustomerId ??
              user.stripeCustomerId ??
              null,

            stripeSubscriptionId: null,

            // Компенсаційні дні не зникають
            // після завершення Stripe-підписки.
            isPremium: remainingManualAccess,

            premiumUntil: remainingManualAccess
              ? user.premiumUntil
              : null,
          },
        });
      }
    }

    /**
     * Успішна перша або повторна оплата.
     *
     * Підтримуємо обидві події.
     * Якщо Stripe надішле обидві, повторне оновлення
     * безпечне завдяки keepLaterDate().
     */
    if (
      event.type === "invoice.paid" ||
      event.type === "invoice.payment_succeeded"
    ) {
      const invoice =
        event.data.object as Stripe.Invoice;

      const stripeCustomerId =
        getInvoiceCustomerId(invoice);

      const stripeSubscriptionId =
        getInvoiceSubscriptionId(invoice);

      if (!stripeCustomerId) {
        console.error(
          "Stripe invoice: customer ID not found",
          {
            eventId: event.id,
            eventType: event.type,
            invoiceId: invoice.id,
          }
        );
      } else if (!stripeSubscriptionId) {
        console.error(
          "Stripe invoice: subscription ID not found",
          {
            eventId: event.id,
            eventType: event.type,
            invoiceId: invoice.id,
            parent: (invoice as any)?.parent,
            legacySubscription:
              (invoice as any)?.subscription,
          }
        );
      } else {
        const user = await findUserByStripeIds(
          stripeCustomerId,
          stripeSubscriptionId
        );

        if (!user) {
          console.error(
            "Stripe invoice: user not found",
            {
              eventId: event.id,
              eventType: event.type,
              invoiceId: invoice.id,
              stripeCustomerId,
              stripeSubscriptionId,
            }
          );
        } else {
          const premiumUntilFromStripe =
            await getPremiumUntilFromSubscription(
              stripeSubscriptionId
            );

          if (!premiumUntilFromStripe) {
            console.error(
              "Stripe invoice: period end not found",
              {
                eventId: event.id,
                eventType: event.type,
                invoiceId: invoice.id,
                stripeCustomerId,
                stripeSubscriptionId,
              }
            );
          } else {
            await prisma.user.update({
              where: { id: user.id },
              data: {
                stripeCustomerId,
                stripeSubscriptionId,

                isPremium: true,

                // Якщо вручну поставлено 21.08.2026,
                // Stripe не поверне дату назад до 11.08.2026.
                premiumUntil: keepLaterDate(
                  user.premiumUntil,
                  premiumUntilFromStripe
                ),
              },
            });

            console.log(
              "Stripe invoice payment processed successfully",
              {
                eventId: event.id,
                eventType: event.type,
                invoiceId: invoice.id,
                userId: user.id,
                stripeCustomerId,
                stripeSubscriptionId,
                premiumUntilFromStripe,
              }
            );
          }
        }
      }
    }

    /**
     * Невдала оплата.
     *
     * Не вимикаємо Premium відразу — Stripe може
     * автоматично повторити списання.
     */
    if (event.type === "invoice.payment_failed") {
      const invoice =
        event.data.object as Stripe.Invoice;

      console.warn(
        "Stripe invoice payment failed",
        {
          eventId: event.id,
          invoiceId: invoice.id,
          stripeCustomerId:
            getInvoiceCustomerId(invoice),
          stripeSubscriptionId:
            getInvoiceSubscriptionId(invoice),
        }
      );
    }

    return new Response("ok");
  } catch (error) {
    console.error(
      "Stripe webhook handler error:",
      {
        eventId: event.id,
        eventType: event.type,
        error,
      }
    );

    return new Response("Webhook handler error", {
      status: 500,
    });
  }
}