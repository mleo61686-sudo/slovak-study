"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";
type PremiumSyncStatus = "checking" | "active" | "pending" | "unauthorized";

type SuccessI18n = {
  titleChecking: string;
  titleActive: string;
  titlePending: string;
  titleUnauthorized: string;
  textChecking: string;
  textActive: string;
  textPending: string;
  textUnauthorized: string;
  retry: string;
  goPremium: string;
  goHome: string;
  goPractice: string;
};

const I18N: Record<Lang, SuccessI18n> = {
  ua: {
    titleChecking: "Оплата успішна ✅",
    titleActive: "Premium активовано 🎉",
    titlePending: "Оплату отримано ✅",
    titleUnauthorized: "Оплату отримано ✅",
    textChecking:
      "Перевіряємо Premium і оновлюємо акаунт. Це може зайняти кілька секунд.",
    textActive:
      "Готово. Premium вже активний у твоєму акаунті — виходити й заходити заново не потрібно.",
    textPending:
      "Stripe ще синхронізує оплату з акаунтом. Зачекай кілька секунд і натисни перевірку ще раз.",
    textUnauthorized:
      "Щоб оновити Premium-статус у цьому браузері, увійди в акаунт, з якого була зроблена оплата.",
    retry: "Перевірити ще раз",
    goPremium: "До Premium",
    goHome: "На головну",
    goPractice: "До тренажера",
  },
  ru: {
    titleChecking: "Оплата успешна ✅",
    titleActive: "Premium активирован 🎉",
    titlePending: "Оплата получена ✅",
    titleUnauthorized: "Оплата получена ✅",
    textChecking:
      "Проверяем Premium и обновляем аккаунт. Это может занять несколько секунд.",
    textActive:
      "Готово. Premium уже активен в твоём аккаунте — выходить и входить заново не нужно.",
    textPending:
      "Stripe ещё синхронизирует оплату с аккаунтом. Подожди несколько секунд и нажми проверку ещё раз.",
    textUnauthorized:
      "Чтобы обновить Premium-статус в этом браузере, войди в аккаунт, с которого была сделана оплата.",
    retry: "Проверить ещё раз",
    goPremium: "К Premium",
    goHome: "На главную",
    goPractice: "К тренажёру",
  },
  en: {
    titleChecking: "Payment successful ✅",
    titleActive: "Premium activated 🎉",
    titlePending: "Payment received ✅",
    titleUnauthorized: "Payment received ✅",
    textChecking:
      "Checking Premium and refreshing your account. This may take a few seconds.",
    textActive:
      "Done. Premium is active on your account — you do not need to log out and log back in.",
    textPending:
      "Stripe is still syncing the payment with your account. Wait a few seconds and check again.",
    textUnauthorized:
      "To refresh Premium status in this browser, sign in to the account that made the payment.",
    retry: "Check again",
    goPremium: "Go to Premium",
    goHome: "Back to home",
    goPractice: "Go to trainer",
  },
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function PremiumSuccess() {
  const router = useRouter();
  const { update } = useSession();
  const { lang } = useLanguage();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = I18N[L];

  const [status, setStatus] = useState<PremiumSyncStatus>("checking");
  const [checkKey, setCheckKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function syncPremiumAfterCheckout() {
      setStatus("checking");

      for (let attempt = 0; attempt < 10; attempt += 1) {
        try {
          const res = await fetch("/api/premium/status", {
            cache: "no-store",
            headers: {
              "Cache-Control": "no-store",
            },
          });

          if (cancelled) return;

          if (res.status === 401) {
            setStatus("unauthorized");
            return;
          }

          const data = (await res.json().catch(() => null)) as {
            isPremium?: boolean;
          } | null;

          if (data?.isPremium) {
            await update();

            if (cancelled) return;

            router.refresh();
            setStatus("active");
            return;
          }
        } catch {
          // Stripe webhook/session sync can be delayed, so we retry.
        }

        await wait(1500);
      }

      if (!cancelled) {
        setStatus("pending");
      }
    }

    void syncPremiumAfterCheckout();

    return () => {
      cancelled = true;
    };
  }, [checkKey, router, update]);

  const title =
    status === "active"
      ? t.titleActive
      : status === "pending"
        ? t.titlePending
        : status === "unauthorized"
          ? t.titleUnauthorized
          : t.titleChecking;

  const text =
    status === "active"
      ? t.textActive
      : status === "pending"
        ? t.textPending
        : status === "unauthorized"
          ? t.textUnauthorized
          : t.textChecking;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="flunio-card rounded-3xl p-6 theme-text">
        <h1 className="text-2xl font-bold theme-text">{title}</h1>
        <p className="mt-2 theme-text-muted">{text}</p>

        {status === "checking" && (
          <div className="mt-5 h-2 overflow-hidden rounded-full theme-pill">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-current opacity-40" />
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {status === "pending" && (
            <button
              type="button"
              onClick={() => setCheckKey((value) => value + 1)}
              className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.retry}
            </button>
          )}

          {status === "active" && (
            <Link
              href="/practice"
              className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {t.goPractice}
            </Link>
          )}

          <Link
            href="/premium"
            className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition"
          >
            {t.goPremium}
          </Link>

          <Link
            href="/"
            className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition"
          >
            {t.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}