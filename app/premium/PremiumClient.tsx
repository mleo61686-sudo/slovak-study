"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";
type Currency = "eur" | "usd" | "uah";
type Interval = "month" | "year";

const YEARLY_DISPLAY_PRICE: Record<Currency, string> = {
  eur: "€79",
  usd: "$89",
  uah: "₴3490",
};

const MONTHLY_DISPLAY_PRICE: Record<Currency, string> = {
  eur: "€7.99",
  usd: "$8.99",
  uah: "₴349",
};

const T = {
  ua: {
    topTitle: "Premium ⭐",
    topSubtitle:
      "Повний доступ без обмежень: уроки, тренажер, озвучка та статистика.",
    badge: "Premium",
    title: "Навчання без обмежень 🚀",
    subtitle:
      "Відкрий усі рівні A0–B2 одразу та проходь уроки без денного ліміту.",
    bullets: [
      "🔓 Всі рівні та уроки відкриті одразу (A0–B2)",
      "🚫 Без денного ліміту на нові уроки",
      "🏋️ Повний доступ до тренажера",
      "🔁 Повторення тільки помилок",
      "📊 Статистика, серії та рекорди",
    ],

    planTitle: "Обери план:",
    planMonth: "Місячний",
    planYear: "Річний",
    planYearBadge: "вигідніше",
    planHint: "Можна скасувати будь-коли.",

    priceNote:
      "Обери валюту: EUR / USD / UAH • Оплата через Stripe • можна скасувати будь-коли",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформити Premium — ${price} / рік (${currencyLabel}) →`
        : `Оформити Premium — ${price} / місяць (${currencyLabel}) →`,

    manage: "Керувати підпискою →",
    secondary: "Подивитись тренажер →",
    lockedTrainer: "Тренажер 🔒",
    loading: "Завантажую…",
    opening: "Відкриваю Stripe…",
  },
  ru: {
    topTitle: "Premium ⭐",
    topSubtitle:
      "Полный доступ без ограничений: уроки, тренажёр, озвучка и статистика.",
    badge: "Premium",
    title: "Обучение без ограничений 🚀",
    subtitle:
      "Открой все уровни A0–B2 сразу и проходи уроки без дневного лимита.",
    bullets: [
      "🔓 Все уровни и уроки открыты сразу (A0–B2)",
      "🚫 Без дневного лимита на новые уроки",
      "🏋️ Полный доступ к тренажёру",
      "🔁 Повторять только ошибки",
      "📊 Статистика, серии и рекорды",
    ],

    planTitle: "Выбери план:",
    planMonth: "Месячный",
    planYear: "Годовой",
    planYearBadge: "выгоднее",
    planHint: "Можно отменить в любой момент.",

    priceNote:
      "Выбери валюту: EUR / USD / UAH • Оплата через Stripe • можно отменить в любой момент",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформить Premium — ${price} / год (${currencyLabel}) →`
        : `Оформить Premium — ${price} / месяц (${currencyLabel}) →`,

    manage: "Управлять подпиской →",
    secondary: "Посмотреть тренажёр →",
    lockedTrainer: "Тренажёр 🔒",
    loading: "Загрузка…",
    opening: "Открываю Stripe…",
  },
} satisfies Record<Lang, any>;

const CURRENCY_LABEL: Record<Currency, string> = {
  eur: "EUR",
  usd: "USD",
  uah: "UAH",
};

export default function PremiumClient() {
  const { lang } = useLanguage();
  const { data: session, status } = useSession();

  const L: Lang = lang === "ru" ? "ru" : "ua";
  const t = T[L];

  const isLoadingSession = status === "loading";
  const isPremium = !!session?.user?.isPremium;

  const [loading, setLoading] = useState<Currency | "portal" | null>(null);
  const [interval, setInterval] = useState<Interval>("month");

  const displayPrice = useMemo(() => {
    return interval === "year" ? YEARLY_DISPLAY_PRICE : MONTHLY_DISPLAY_PRICE;
  }, [interval]);

  async function handleCheckout(currency: Currency) {
    setLoading(currency);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // ✅ NEW: interval
        body: JSON.stringify({ currency, interval }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        console.error("Checkout error:", { status: res.status, data });
        alert(data?.error ?? "Stripe checkout error");
        return;
      }

      window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  async function handleManage() {
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.url) {
        console.error("Portal error:", { status: res.status, data });
        alert(data?.error ?? "Stripe portal error");
        return;
      }

      window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.topTitle}
        </h1>
        <p className="text-slate-600">{t.topSubtitle}</p>
      </header>

      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-8 text-white shadow-sm">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
              {t.badge}
            </div>

            <h2 className="text-2xl font-semibold">{t.title}</h2>
            <p className="max-w-2xl text-white/80">{t.subtitle}</p>

            {/* ✅ Plan toggle */}
            <div className="space-y-2">
              <div className="text-sm font-semibold text-white/90">
                {t.planTitle}
              </div>

              <div className="inline-flex rounded-2xl border border-white/15 bg-white/5 p-1">
                <button
                  type="button"
                  onClick={() => setInterval("month")}
                  className={[
                    "h-9 rounded-xl px-4 text-sm font-semibold transition",
                    interval === "month"
                      ? "bg-white text-slate-900"
                      : "text-white/85 hover:bg-white/10",
                  ].join(" ")}
                >
                  {t.planMonth}
                </button>

                <button
                  type="button"
                  onClick={() => setInterval("year")}
                  className={[
                    "relative h-9 rounded-xl px-4 text-sm font-semibold transition",
                    interval === "year"
                      ? "bg-white text-slate-900"
                      : "text-white/85 hover:bg-white/10",
                  ].join(" ")}
                >
                  <span className="inline-flex items-center gap-2">
                    {t.planYear}
                    <span className="rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-black">
                      {t.planYearBadge}
                    </span>
                  </span>
                </button>
              </div>

              <div className="text-xs text-white/65">{t.planHint}</div>
            </div>

            <ul className="grid gap-2 sm:grid-cols-2">
              {t.bullets.map((item: string) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="text-sm text-white/70">{t.priceNote}</div>
          </div>

          <div className="flex flex-col gap-3 sm:pt-2">
            {isLoadingSession ? (
              <div className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white/80">
                {t.loading}
              </div>
            ) : !isPremium ? (
              <>
                <button
                  onClick={() => handleCheckout("eur")}
                  disabled={!!loading}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                >
                  {loading === "eur"
                    ? t.opening
                    : t.buy("EUR", displayPrice.eur, interval)}
                </button>

                <button
                  onClick={() => handleCheckout("usd")}
                  disabled={!!loading}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                >
                  {loading === "usd"
                    ? t.opening
                    : t.buy("USD", displayPrice.usd, interval)}
                </button>

                <button
                  onClick={() => handleCheckout("uah")}
                  disabled={!!loading}
                  className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
                >
                  {loading === "uah"
                    ? t.opening
                    : t.buy("UAH", displayPrice.uah, interval)}
                </button>
              </>
            ) : (
              <button
                onClick={handleManage}
                disabled={!!loading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-500 px-6 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading === "portal" ? t.opening : t.manage}
              </button>
            )}

            <a
              href={isPremium ? "/practice" : "/premium"}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/15"
            >
              {isPremium ? t.secondary : t.lockedTrainer}
            </a>

            {/* small note under buttons */}
            {!isPremium ? (
              <div className="pt-1 text-center text-xs text-white/55">
                {interval === "year"
                  ? L === "ru"
                    ? "Годовой план — лучший выбор, если учишься всерьёз."
                    : "Річний план — найкращий вибір, якщо вчишся серйозно."
                  : L === "ru"
                  ? "Можно перейти на годовой план в любое время."
                  : "Можна перейти на річний план у будь-який момент."}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}