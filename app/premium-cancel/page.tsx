"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type CancelI18n = {
  title: string;
  text: string;
  backHome: string;
  tryAgain: string;
};

const I18N: Record<Lang, CancelI18n> = {
  ua: {
    title: "Оплата скасована",
    text: "Можеш спробувати ще раз.",
    backHome: "На головну",
    tryAgain: "Спробувати знову",
  },
  ru: {
    title: "Оплата отменена",
    text: "Можешь попробовать ещё раз.",
    backHome: "На главную",
    tryAgain: "Попробовать снова",
  },
  en: {
    title: "Payment cancelled",
    text: "You can try again.",
    backHome: "Back to home",
    tryAgain: "Try again",
  },
};

export default function PremiumCancel() {
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
            href="/premium"
            className="theme-primary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.tryAgain}
          </Link>

          <Link
            href="/"
            className="theme-secondary-button inline-flex h-11 items-center justify-center rounded-2xl px-5 text-sm font-semibold transition"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}