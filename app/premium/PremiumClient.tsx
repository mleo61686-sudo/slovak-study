"use client";

import { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";
type Currency = "eur" | "usd" | "uah" | "pln" | "czk";
type Interval = "month" | "year";

type SessionUserLike = {
  isPremium?: boolean;
};

type PremiumTranslations = {
  topTitle: string;
  topSubtitle: string;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];

  planTitle: string;
  planMonth: string;
  planYear: string;
  planYearBadge: string;
  planHint: string;

  priceNote: string;

  buy: (currencyLabel: string, price: string, interval: Interval) => string;

  manage: string;
  secondary: string;
  lockedTrainer: string;
  loading: string;
  opening: string;

  compareTitle: string;
  compareSubtitle: string;
  colFeature: string;
  colFree: string;
  colPremium: string;
  ctaAfterCompare: string;
  premiumBetter: string;
  yearlyHint: string;
  monthlyHint: string;
  currencyHint: string;
};

type FeatureRow = {
  key: string;
  ua: string;
  ru: string;
  en: string;
  free: string;
  premium: string;
};

const YEARLY_DISPLAY_PRICE: Partial<Record<Currency, string>> = {
  eur: "€79",
  usd: "$89",
  uah: "₴3490",
};

const MONTHLY_DISPLAY_PRICE: Record<Currency, string> = {
  eur: "€7.99",
  usd: "$8.99",
  uah: "₴349",
  pln: "34 zł",
  czk: "199 Kč",
};

const T: Record<Lang, PremiumTranslations> = {
  ua: {
    topTitle: "Premium ⭐",
    topSubtitle:
      "Повний доступ без обмежень: уроки, тренажер, озвучка та статистика.",
    badge: "Premium",
    title: "Навчання без обмежень 🚀",
    subtitle:
      "Відкрий повний A2, B1–B2 та проходь уроки без денного ліміту.",
    bullets: [
      "🔓 Повний доступ до A2, B1 та B2",
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
      "Обери валюту: EUR / USD / UAH / PLN / CZK • Оплата через Stripe • можна скасувати будь-коли",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформити Premium — ${price} / рік (${currencyLabel}) →`
        : `Оформити Premium — ${price} / місяць (${currencyLabel}) →`,

    manage: "Керувати підпискою →",
    secondary: "Подивитись тренажер →",
    lockedTrainer: "Тренажер 🔒",
    loading: "Завантажую…",
    opening: "Відкриваю Stripe…",

    compareTitle: "Free vs Premium",
    compareSubtitle: "Різниця, яку відчуєш одразу.",
    colFeature: "Функція",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформити Premium →",
    premiumBetter: "краще",
    yearlyHint: "Річний план — найкращий вибір, якщо вчишся серйозно.",
    monthlyHint: "Можна перейти на річний план у будь-який момент.",
    currencyHint:
      "Вгорі можна обрати EUR/USD/UAH/PLN/CZK. Для PLN і CZK доступний лише місячний план.",
  },
  ru: {
    topTitle: "Premium ⭐",
    topSubtitle:
      "Полный доступ без ограничений: уроки, тренажёр, озвучка и статистика.",
    badge: "Premium",
    title: "Обучение без ограничений 🚀",
    subtitle:
      "Открой полный A2, B1–B2 и проходи уроки без дневного лимита.",
    bullets: [
      "🔓 Полный доступ к A2, B1 и B2",
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
      "Выбери валюту: EUR / USD / UAH / PLN / CZK • Оплата через Stripe • можно отменить в любой момент",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформить Premium — ${price} / год (${currencyLabel}) →`
        : `Оформить Premium — ${price} / месяц (${currencyLabel}) →`,

    manage: "Управлять подпиской →",
    secondary: "Посмотреть тренажёр →",
    lockedTrainer: "Тренажёр 🔒",
    loading: "Загрузка…",
    opening: "Открываю Stripe…",

    compareTitle: "Free vs Premium",
    compareSubtitle: "Разница, которую почувствуешь сразу.",
    colFeature: "Функция",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформить Premium →",
    premiumBetter: "лучше",
    yearlyHint: "Годовой план — лучший выбор, если учишься всерьёз.",
    monthlyHint: "Можно перейти на годовой план в любое время.",
    currencyHint:
      "Вверху можно выбрать EUR/USD/UAH/PLN/CZK. Для PLN и CZK доступен только месячный план.",
  },
  en: {
    topTitle: "Premium ⭐",
    topSubtitle:
      "Full access without limits: lessons, trainer, audio, and statistics.",
    badge: "Premium",
    title: "Learning without limits 🚀",
    subtitle:
      "Unlock full A2, B1–B2, and go through lessons without a daily limit.",
    bullets: [
      "🔓 Full access to A2, B1, and B2",
      "🚫 No daily limit on new lessons",
      "🏋️ Full access to the trainer",
      "🔁 Review only mistakes",
      "📊 Statistics, streaks, and records",
    ],

    planTitle: "Choose a plan:",
    planMonth: "Monthly",
    planYear: "Yearly",
    planYearBadge: "better value",
    planHint: "You can cancel anytime.",

    priceNote:
      "Choose currency: EUR / USD / UAH / PLN / CZK • Payment via Stripe • cancel anytime",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Get Premium — ${price} / year (${currencyLabel}) →`
        : `Get Premium — ${price} / month (${currencyLabel}) →`,

    manage: "Manage subscription →",
    secondary: "Open trainer →",
    lockedTrainer: "Trainer 🔒",
    loading: "Loading…",
    opening: "Opening Stripe…",

    compareTitle: "Free vs Premium",
    compareSubtitle: "A difference you’ll feel right away.",
    colFeature: "Feature",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Get Premium →",
    premiumBetter: "better",
    yearlyHint: "The yearly plan is the best choice if you’re learning seriously.",
    monthlyHint: "You can switch to the yearly plan at any time.",
    currencyHint:
      "You can choose EUR/USD/UAH/PLN/CZK above. PLN and CZK are available only for the monthly plan.",
  },
};

const CURRENCY_LABEL: Record<Currency, string> = {
  eur: "EUR",
  usd: "USD",
  uah: "UAH",
  pln: "PLN",
  czk: "CZK",
};

const FEATURES: readonly FeatureRow[] = [
  {
    key: "levels",
    ua: "Доступ до рівнів",
    ru: "Доступ к уровням",
    en: "Access to levels",
    free: "A0–A2(1-10 Lessons)",
    premium: "A0–B2",
  },
  {
    key: "limit",
    ua: "Нові уроки на день",
    ru: "Новые уроки в день",
    en: "New lessons per day",
    free: "2",
    premium: "∞",
  },
  {
    key: "trainer",
    ua: "Тренажер",
    ru: "Тренажёр",
    en: "Trainer",
    free: "🔒",
    premium: "✅",
  },
  {
    key: "voice",
    ua: "Озвучка",
    ru: "Озвучка",
    en: "Audio",
    free: "✅",
    premium: "✅",
  },
  {
    key: "mistakes",
    ua: "Повторення помилок",
    ru: "Повторение ошибок",
    en: "Mistake review",
    free: "✅",
    premium: "✅",
  },
  {
    key: "stats",
    ua: "Серії та рекорди",
    ru: "Серии и рекорды",
    en: "Streaks and records",
    free: "🔒",
    premium: "✅",
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/15 px-2 py-0.5 text-xs font-bold text-amber-300">
      {children}
    </span>
  );
}

export default function PremiumClient() {
  const { lang } = useLanguage();
  const { data: session, status } = useSession();
  const user = session?.user as SessionUserLike | undefined;

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const isLoadingSession = status === "loading";
  const isPremium = user?.isPremium === true;

  const [loading, setLoading] = useState<Currency | "portal" | null>(null);
  const [interval, setInterval] = useState<Interval>("month");

  const displayPrice = useMemo(() => {
    return interval === "year" ? YEARLY_DISPLAY_PRICE : MONTHLY_DISPLAY_PRICE;
  }, [interval]);

  const visibleCurrencies = useMemo<Currency[]>(() => {
    if (interval === "year") {
      return ["eur", "usd", "uah"];
    }
    return ["eur", "usd", "uah", "pln", "czk"];
  }, [interval]);

  async function handleCheckout(currency: Currency) {
    setLoading(currency);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currency, interval }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

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
      const data = (await res.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };

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
    <div className="space-y-10 theme-text">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight theme-text sm:text-4xl">
          {t.topTitle}
        </h1>
        <p className="theme-text-muted">{t.topSubtitle}</p>
      </header>

      <section className="flunio-card relative overflow-hidden rounded-3xl p-8 theme-text shadow-[0_0_30px_rgba(34,211,238,0.10)]">
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-4">
            <div className="theme-pill inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
              {t.badge}
            </div>

            <h2 className="text-2xl font-semibold theme-text">{t.title}</h2>
            <p className="max-w-2xl theme-text-muted">{t.subtitle}</p>

            {!isPremium ? (
              <div className="space-y-2">
                <div className="text-sm font-semibold theme-text">
                  {t.planTitle}
                </div>

                <div className="theme-home-soft-card inline-flex rounded-2xl p-1">
                  <button
                    type="button"
                    onClick={() => setInterval("month")}
                    className={[
                      "h-9 rounded-xl px-4 text-sm font-semibold transition",
                      interval === "month"
                        ? "bg-white text-slate-900 shadow-sm theme-simple:bg-slate-900 theme-simple:text-white"
                        : "theme-text-muted hover:bg-white/10 theme-simple:hover:bg-slate-100",
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
                        ? "bg-white text-slate-900 shadow-sm theme-simple:bg-slate-900 theme-simple:text-white"
                        : "theme-text-muted hover:bg-white/10 theme-simple:hover:bg-slate-100",
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

                <div className="text-xs theme-text-muted">{t.planHint}</div>
              </div>
            ) : null}

            <ul className="grid gap-2 sm:grid-cols-2">
              {t.bullets.map((item) => (
                <li
                  key={item}
                  className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text"
                >
                  {item}
                </li>
              ))}
            </ul>

            <div className="text-sm theme-text-muted">{t.priceNote}</div>
          </div>

          <div className="flex flex-col gap-3 sm:pt-2">
            {isLoadingSession ? (
              <div className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-6 text-sm font-semibold">
                {t.loading}
              </div>
            ) : !isPremium ? (
              <>
                {visibleCurrencies.map((currency) => {
                  const price = displayPrice[currency];

                  if (!price) return null;

                  return (
                    <button
                      key={currency}
                      onClick={() => handleCheckout(currency)}
                      disabled={!!loading}
                      className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-6 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0"
                    >
                      {loading === currency
                        ? t.opening
                        : t.buy(CURRENCY_LABEL[currency], price, interval)}
                    </button>
                  );
                })}
              </>
            ) : (
              <button
                onClick={handleManage}
                disabled={!!loading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 px-6 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0"
              >
                {loading === "portal" ? t.opening : t.manage}
              </button>
            )}

            <a
              href={isPremium ? "/practice" : "/premium"}
              className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-6 text-sm font-semibold transition"
            >
              {isPremium ? t.secondary : t.lockedTrainer}
            </a>

            {!isPremium ? (
              <div className="pt-1 text-center text-xs theme-text-subtle">
                {interval === "year" ? t.yearlyHint : t.monthlyHint}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {!isPremium ? (
        <section className="flunio-card space-y-4 rounded-3xl p-6 theme-text">
          <div className="space-y-1 text-center">
            <h2 className="text-2xl font-semibold theme-text">
              {t.compareTitle}
            </h2>
            <p className="text-sm theme-text-muted">{t.compareSubtitle}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse overflow-hidden rounded-2xl">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-sm theme-text-muted theme-simple:border-slate-200 theme-simple:bg-slate-50">
                  <th className="p-4 text-left">{t.colFeature}</th>
                  <th className="p-4 text-center">{t.colFree}</th>
                  <th className="bg-amber-400/10 p-4 text-center theme-text">
                    <div className="inline-flex items-center justify-center gap-2">
                      {t.colPremium} <Badge>{t.premiumBetter}</Badge>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {FEATURES.map((f) => (
                  <tr
                    key={f.key}
                    className="border-t border-white/10 theme-simple:border-slate-200"
                  >
                    <td className="p-4 text-sm theme-text">
                      {L === "ru" ? f.ru : L === "en" ? f.en : f.ua}
                    </td>

                    <td className="p-4 text-center text-sm theme-text-muted">
                      {f.free}
                    </td>

                    <td className="bg-amber-400/10 p-4 text-center text-sm font-semibold text-amber-300 theme-simple:text-amber-700">
                      {f.premium}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              onClick={() => handleCheckout(interval === "year" ? "eur" : "eur")}
              disabled={!!loading}
              className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-8 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0"
            >
              {loading ? t.opening : t.ctaAfterCompare}
            </button>

            <div className="text-center text-xs theme-text-subtle">
              {t.currencyHint}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}