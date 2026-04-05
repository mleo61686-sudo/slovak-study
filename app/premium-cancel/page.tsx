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
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="mt-2 text-slate-600">{t.text}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/premium"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-black px-5 text-sm font-semibold text-white hover:opacity-90"
          >
            {t.tryAgain}
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}