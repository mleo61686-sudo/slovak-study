"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

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
    price: "7.99€ / місяць • можна скасувати будь-коли",
    buy: "Оформити Premium →",
    manage: "Керувати підпискою →",
    secondary: "Подивитись тренажер →",
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
    price: "7.99€ / месяц • можно отменить в любой момент",
    buy: "Оформить Premium →",
    manage: "Управлять подпиской →",
    secondary: "Посмотреть тренажёр →",
  },
} satisfies Record<Lang, any>;

export default function PremiumClient() {
  const { lang } = useLanguage();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const L: Lang = lang === "ru" ? "ru" : "ua";
  const t = T[L];

  const isPremium = !!session?.user?.isPremium;

  async function handleCheckout() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  async function handleManage() {
    setLoading(true);
    const res = await fetch("/api/stripe/portal", { method: "POST" });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    }
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <header className="text-center space-y-2">
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

            <div className="text-sm text-white/70">{t.price}</div>
          </div>

          <div className="flex flex-col gap-3 sm:pt-2">
            {!isPremium ? (
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-amber-400 px-6 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50"
              >
                {t.buy}
              </button>
            ) : (
              <button
                onClick={handleManage}
                disabled={loading}
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-emerald-500 px-6 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {t.manage}
              </button>
            )}

            <a
              href={isPremium ? "/practice" : "/premium"}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/15"
            >
              {isPremium ? t.secondary : "Тренажер 🔒"}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
