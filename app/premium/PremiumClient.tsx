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

type LocalizedText = Record<Lang, string>;

type FeatureRow = {
  key: string;
  label: LocalizedText;
  free: LocalizedText;
  premium: LocalizedText;
};

const YEARLY_DISPLAY_PRICE: Record<Currency, string> = {
  eur: "€59.99",
  usd: "$59.99",
  uah: "₴2399",
  pln: "239.99 zł",
  czk: "1499 Kč",
};

const MONTHLY_DISPLAY_PRICE: Record<Currency, string> = {
  eur: "€9.99",
  usd: "$9.99",
  uah: "₴399",
  pln: "39.99 zł",
  czk: "249 Kč",
};

const T: Record<Lang, PremiumTranslations> = {
  ua: {
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "A0 доступний безкоштовно. Premium відкриває A1–B2, тренажер і всі активні курси Flunio.",
    badge: "Premium",
    title: "Продовжуй навчання після A0 🚀",
    subtitle:
      "Безкоштовно можна пройти A0. Premium відкриває A1, A2, B1, B2, тренажер, повторення слів і всі активні курси в одній підписці.",
    bullets: [
      "🔓 Доступ до A1, A2, B1 та B2",
      "🌍 Усі активні курси в одній підписці",
      "🏋️ Тренажер для активної практики",
      "🔁 Розширене повторення слів",
      "📊 Серії, рекорди та статистика навчання",
    ],

    planTitle: "Обери план:",
    planMonth: "Місячний",
    planYear: "Річний",
    planYearBadge: "вигідніше",
    planHint: "Можна скасувати будь-коли.",

    priceNote:
      "Оплата через Stripe • доступ активується автоматично • можна скасувати будь-коли",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформити Premium — ${price} / рік (${currencyLabel}) →`
        : `Оформити Premium — ${price} / місяць (${currencyLabel}) →`,

    manage: "Керувати підпискою →",
    secondary: "Відкрити тренажер →",
    lockedTrainer: "Тренажер 🔒",
    loading: "Завантажую…",
    opening: "Відкриваю Stripe…",

    compareTitle: "Що відкриває Premium",
    compareSubtitle:
      "Free дає стартовий рівень. Premium потрібен, якщо ти хочеш продовжити курс і практикуватися серйозніше.",
    colFeature: "Можливість",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформити Premium →",
    premiumBetter: "повний доступ",
    yearlyHint: "Річний план вигідніший, якщо ти вчишся серйозно.",
    monthlyHint:
      "Місячний план зручний, якщо хочеш спробувати Premium без довгого зобов’язання.",
    currencyHint:
      "Одна підписка відкриває всі активні курси Flunio. Можна вибрати місячний або річний план.",
  },

  ru: {
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "A0 доступен бесплатно. Premium открывает A1–B2, тренажёр и все активные курсы Flunio.",
    badge: "Premium",
    title: "Продолжай обучение после A0 🚀",
    subtitle:
      "Бесплатно можно пройти A0. Premium открывает A1, A2, B1, B2, тренажёр, повторение слов и все активные курсы в одной подписке.",
    bullets: [
      "🔓 Доступ к A1, A2, B1 и B2",
      "🌍 Все активные курсы в одной подписке",
      "🏋️ Тренажёр для активной практики",
      "🔁 Расширенное повторение слов",
      "📊 Серии, рекорды и статистика обучения",
    ],

    planTitle: "Выбери план:",
    planMonth: "Месячный",
    planYear: "Годовой",
    planYearBadge: "выгоднее",
    planHint: "Можно отменить в любой момент.",

    priceNote:
      "Оплата через Stripe • доступ активируется автоматически • можно отменить в любой момент",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Оформить Premium — ${price} / год (${currencyLabel}) →`
        : `Оформить Premium — ${price} / месяц (${currencyLabel}) →`,

    manage: "Управлять подпиской →",
    secondary: "Открыть тренажёр →",
    lockedTrainer: "Тренажёр 🔒",
    loading: "Загрузка…",
    opening: "Открываю Stripe…",

    compareTitle: "Что открывает Premium",
    compareSubtitle:
      "Free даёт стартовый уровень. Premium нужен, если ты хочешь продолжить курс и практиковаться серьёзнее.",
    colFeature: "Возможность",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформить Premium →",
    premiumBetter: "полный доступ",
    yearlyHint: "Годовой план выгоднее, если ты учишься серьёзно.",
    monthlyHint:
      "Месячный план удобен, если хочешь попробовать Premium без долгого обязательства.",
    currencyHint:
      "Одна подписка открывает все активные курсы Flunio. Можно выбрать месячный или годовой план.",
  },

  en: {
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "A0 is free. Premium unlocks A1–B2, the trainer, and all active Flunio courses.",
    badge: "Premium",
    title: "Continue learning after A0 🚀",
    subtitle:
      "You can complete A0 for free. Premium unlocks A1, A2, B1, B2, the trainer, word review, and all active courses in one subscription.",
    bullets: [
      "🔓 Access to A1, A2, B1 and B2",
      "🌍 All active courses in one subscription",
      "🏋️ Trainer for active practice",
      "🔁 Advanced word review",
      "📊 Streaks, records and learning stats",
    ],

    planTitle: "Choose a plan:",
    planMonth: "Monthly",
    planYear: "Yearly",
    planYearBadge: "better value",
    planHint: "You can cancel anytime.",

    priceNote:
      "Payment via Stripe • access activates automatically • cancel anytime",

    buy: (currencyLabel: string, price: string, interval: Interval) =>
      interval === "year"
        ? `Get Premium — ${price} / year (${currencyLabel}) →`
        : `Get Premium — ${price} / month (${currencyLabel}) →`,

    manage: "Manage subscription →",
    secondary: "Open trainer →",
    lockedTrainer: "Trainer 🔒",
    loading: "Loading…",
    opening: "Opening Stripe…",

    compareTitle: "What Premium unlocks",
    compareSubtitle:
      "Free gives you the starter level. Premium is for continuing the course and practicing more seriously.",
    colFeature: "Feature",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Get Premium →",
    premiumBetter: "full access",
    yearlyHint: "The yearly plan is better value if you are learning seriously.",
    monthlyHint: "The monthly plan is useful if you want to try Premium first.",
    currencyHint:
      "One subscription unlocks all active Flunio courses. You can choose monthly or yearly billing.",
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
    key: "courseAccess",
    label: {
      ua: "Доступ до курсу",
      ru: "Доступ к курсу",
      en: "Course access",
    },
    free: {
      ua: "A0 безкоштовно",
      ru: "A0 бесплатно",
      en: "A0 for free",
    },
    premium: {
      ua: "A1–B2 у всіх курсах",
      ru: "A1–B2 во всех курсах",
      en: "A1–B2 in all courses",
    },
  },
  {
    key: "trainer",
    label: {
      ua: "Тренажер",
      ru: "Тренажёр",
      en: "Trainer",
    },
    free: {
      ua: "🔒",
      ru: "🔒",
      en: "🔒",
    },
    premium: {
      ua: "✅ повний доступ",
      ru: "✅ полный доступ",
      en: "✅ full access",
    },
  },
  {
    key: "wordReview",
    label: {
      ua: "Повторення слів",
      ru: "Повторение слов",
      en: "Word review",
    },
    free: {
      ua: "Базове",
      ru: "Базовое",
      en: "Basic",
    },
    premium: {
      ua: "Розширене",
      ru: "Расширенное",
      en: "Advanced",
    },
  },
  {
    key: "progress",
    label: {
      ua: "Прогрес навчання",
      ru: "Прогресс обучения",
      en: "Learning progress",
    },
    free: {
      ua: "Старт",
      ru: "Старт",
      en: "Starter",
    },
    premium: {
      ua: "Серії, рекорди, статистика",
      ru: "Серии, рекорды, статистика",
      en: "Streaks, records, stats",
    },
  },
  {
    key: "courses",
    label: {
      ua: "Активні курси",
      ru: "Активные курсы",
      en: "Active courses",
    },
    free: {
      ua: "A0",
      ru: "A0",
      en: "A0",
    },
    premium: {
      ua: "Усі рівні",
      ru: "Все уровни",
      en: "All levels",
    },
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/15 px-2 py-0.5 text-xs font-bold text-amber-300 theme-simple:text-amber-700">
      {children}
    </span>
  );
}

function getText(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua;
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
    return ["eur", "usd", "uah", "pln", "czk"];
  }, []);

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

        <p className="mx-auto max-w-2xl theme-text-muted">{t.topSubtitle}</p>
      </header>

      <section className="flunio-card relative overflow-hidden rounded-3xl p-6 theme-text shadow-[0_0_30px_rgba(34,211,238,0.10)] sm:p-8">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-5">
            <div className="theme-pill inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold">
              {t.badge}
            </div>

            <div className="space-y-3">
              <h2 className="text-2xl font-semibold theme-text sm:text-3xl">
                {t.title}
              </h2>

              <p className="max-w-2xl theme-text-muted">{t.subtitle}</p>
            </div>

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

          <div className="flex w-full flex-col gap-3 lg:w-[360px] lg:pt-2">
            {isLoadingSession ? (
              <div className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-6 text-sm font-semibold">
                {t.loading}
              </div>
            ) : !isPremium ? (
              <>
                {visibleCurrencies.map((currency) => {
                  const price = displayPrice[currency];

                  return (
                    <button
                      key={currency}
                      onClick={() => handleCheckout(currency)}
                      disabled={!!loading}
                      className="theme-primary-button inline-flex min-h-11 items-center justify-center rounded-2xl px-6 py-3 text-center text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 active:translate-y-0"
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
                {FEATURES.map((feature) => (
                  <tr
                    key={feature.key}
                    className="border-t border-white/10 theme-simple:border-slate-200"
                  >
                    <td className="p-4 text-sm theme-text">
                      {getText(feature.label, L)}
                    </td>

                    <td className="p-4 text-center text-sm theme-text-muted">
                      {getText(feature.free, L)}
                    </td>

                    <td className="bg-amber-400/10 p-4 text-center text-sm font-semibold text-amber-300 theme-simple:text-amber-700">
                      {getText(feature.premium, L)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2">
            <button
              onClick={() => handleCheckout("eur")}
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