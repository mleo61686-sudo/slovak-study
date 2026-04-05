"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type SuccessI18n = {
  title: string;
  text: string;
  goPremium: string;
  goHome: string;
  goPractice: string;
};

const I18N: Record<Lang, SuccessI18n> = {
  ua: {
    title: "Оплата успішна ✅",
    text: "Premium активовано. Можеш повернутися на сайт і продовжити навчання.",
    goPremium: "До Premium",
    goHome: "На головну",
    goPractice: "До тренажера",
  },
  ru: {
    title: "Оплата успешна ✅",
    text: "Premium активирован. Можешь вернуться на сайт и продолжить обучение.",
    goPremium: "К Premium",
    goHome: "На главную",
    goPractice: "К тренажёру",
  },
  en: {
    title: "Payment successful ✅",
    text: "Premium has been activated. You can return to the site and continue learning.",
    goPremium: "Go to Premium",
    goHome: "Back to home",
    goPractice: "Go to trainer",
  },
};

export default function PremiumSuccess() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = I18N[L];

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="mt-2 text-slate-600">{t.text}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/practice"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white hover:opacity-90"
          >
            {t.goPractice}
          </Link>

          <Link
            href="/premium"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            {t.goPremium}
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            {t.goHome}
          </Link>
        </div>
      </div>
    </div>
  );
}