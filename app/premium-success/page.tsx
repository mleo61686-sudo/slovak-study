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
      <div className="flunio-card rounded-3xl p-6 theme-text">
        <h1 className="text-2xl font-bold theme-text">{t.title}</h1>
        <p className="mt-2 theme-text-muted">{t.text}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/practice"
            className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.goPractice}
          </Link>

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