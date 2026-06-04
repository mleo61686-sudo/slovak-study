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

  lifetimeTitle: string;
  lifetimeText: string;
  lifetimeBadge: string;
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
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "Для тих, хто хоче не просто спробувати, а реально пройти курс і рухатися швидше.",
    badge: "Premium",
    title: "Вчися без стопів 🚀",
    subtitle:
      "Без денного ліміту, з повним доступом до рівнів, тренажера, статистики та Premium-теми Flunio.",
    bullets: [
      "🔓 Усі рівні курсу без блокування",
      "🚫 Без денного ліміту на нові уроки",
      "🏋️ Повний доступ до тренажера",
      "📊 Статистика, серії та рекорди",
      "🌌 Premium Flunio тема",
      "🧠 Більше контролю над прогресом",
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

    compareTitle: "Що змінюється з Premium",
    compareSubtitle:
      "Безкоштовний план дає старт. Premium прибирає обмеження і відкриває повний темп навчання.",
    colFeature: "Можливість",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформити Premium →",
    premiumBetter: "повний доступ",
    yearlyHint: "Річний план вигідніший, якщо ти вчишся серйозно.",
    monthlyHint:
      "Місячний план зручний, якщо хочеш спробувати Premium без довгого зобов’язання.",
    currencyHint:
      "Для PLN і CZK зараз доступний лише місячний план. Річний план доступний у EUR/USD/UAH.",

    lifetimeTitle: "Lifetime Early Access скоро",
    lifetimeText:
      "Окремий одноразовий доступ можна додати пізніше як early supporter offer. Спочатку треба підключити окремий Stripe price.",
    lifetimeBadge: "планується",
  },

  ru: {
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "Для тех, кто хочет не просто попробовать, а реально пройти курс и двигаться быстрее.",
    badge: "Premium",
    title: "Учись без стопов 🚀",
    subtitle:
      "Без дневного лимита, с полным доступом к уровням, тренажёру, статистике и Premium-теме Flunio.",
    bullets: [
      "🔓 Все уровни курса без блокировки",
      "🚫 Без дневного лимита на новые уроки",
      "🏋️ Полный доступ к тренажёру",
      "📊 Статистика, серии и рекорды",
      "🌌 Premium Flunio тема",
      "🧠 Больше контроля над прогрессом",
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

    compareTitle: "Что меняется с Premium",
    compareSubtitle:
      "Бесплатный план даёт старт. Premium убирает ограничения и открывает полный темп обучения.",
    colFeature: "Возможность",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Оформить Premium →",
    premiumBetter: "полный доступ",
    yearlyHint: "Годовой план выгоднее, если ты учишься серьёзно.",
    monthlyHint:
      "Месячный план удобен, если хочешь попробовать Premium без долгого обязательства.",
    currencyHint:
      "Для PLN и CZK сейчас доступен только месячный план. Годовой план доступен в EUR/USD/UAH.",

    lifetimeTitle: "Lifetime Early Access скоро",
    lifetimeText:
      "Отдельный единоразовый доступ можно добавить позже как early supporter offer. Сначала нужно подключить отдельный Stripe price.",
    lifetimeBadge: "планируется",
  },

  en: {
    topTitle: "Flunio Premium ⭐",
    topSubtitle:
      "For learners who want more than a trial: unlock the full learning pace and keep moving.",
    badge: "Premium",
    title: "Learn without stops 🚀",
    subtitle:
      "No daily limit, full level access, the full trainer, progress statistics, and the Premium Flunio theme.",
    bullets: [
      "🔓 All course levels unlocked",
      "🚫 No daily limit on new lessons",
      "🏋️ Full trainer access",
      "📊 Statistics, streaks, and records",
      "🌌 Premium Flunio theme",
      "🧠 More control over your progress",
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

    compareTitle: "What Premium changes",
    compareSubtitle:
      "Free gives you the start. Premium removes the limits and unlocks the full learning pace.",
    colFeature: "Feature",
    colFree: "Free",
    colPremium: "Premium",
    ctaAfterCompare: "Get Premium →",
    premiumBetter: "full access",
    yearlyHint: "The yearly plan is better value if you are learning seriously.",
    monthlyHint: "The monthly plan is useful if you want to try Premium first.",
    currencyHint:
      "PLN and CZK currently support monthly plans only. Yearly is available in EUR/USD/UAH.",

    lifetimeTitle: "Lifetime Early Access soon",
    lifetimeText:
      "A one-time lifetime option can be added later as an early supporter offer. First, we need a separate Stripe price.",
    lifetimeBadge: "planned",
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
    ua: "Рівні курсу",
    ru: "Уровни курса",
    en: "Course levels",
    free: "Стартові рівні",
    premium: "Усі рівні",
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
    key: "theme",
    ua: "Premium Flunio тема",
    ru: "Premium Flunio тема",
    en: "Premium Flunio theme",
    free: "🔒",
    premium: "✅",
  },
  {
    key: "stats",
    ua: "Статистика, серії та рекорди",
    ru: "Статистика, серии и рекорды",
    en: "Statistics, streaks, and records",
    free: "Базово",
    premium: "Повністю",
  },
  {
    key: "pace",
    ua: "Темп навчання",
    ru: "Темп обучения",
    en: "Learning pace",
    free: "Повільний",
    premium: "Без обмежень",
  },
  {
    key: "courses",
    ua: "Курси",
    ru: "Курсы",
    en: "Courses",
    free: "Обмежено",
    premium: "Усі доступні",
  },
] as const;

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-amber-300/30 bg-amber-400/15 px-2 py-0.5 text-xs font-bold text-amber-300 theme-simple:text-amber-700">
      {children}
    </span>
  );
}

function getFeatureText(feature: FeatureRow, lang: Lang) {
  if (lang === "ru") return feature.ru;
  if (lang === "en") return feature.en;
  return feature.ua;
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

                  if (!price) return null;

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
        <section className="flunio-card-soft rounded-3xl p-5 theme-text">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center rounded-full border border-cyan-400/25 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300 theme-simple:text-cyan-700">
                {t.lifetimeBadge}
              </div>

              <h2 className="text-lg font-semibold theme-text">
                {t.lifetimeTitle}
              </h2>

              <p className="max-w-3xl text-sm theme-text-muted">
                {t.lifetimeText}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold theme-text theme-simple:border-slate-200 theme-simple:bg-slate-50">
              €49–69 one-time
            </div>
          </div>
        </section>
      ) : null}

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
                      {getFeatureText(feature, L)}
                    </td>

                    <td className="p-4 text-center text-sm theme-text-muted">
                      {feature.free}
                    </td>

                    <td className="bg-amber-400/10 p-4 text-center text-sm font-semibold text-amber-300 theme-simple:text-amber-700">
                      {feature.premium}
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