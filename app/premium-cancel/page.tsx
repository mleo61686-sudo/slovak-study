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
      <div className="flunio-card rounded-3xl p-6 text-white">
        <h1 className="text-2xl font-bold">{t.title}</h1>
        <p className="mt-2 text-white/65">{t.text}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/premium"
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.tryAgain}
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-white hover:bg-white/10 transition"
          >
            {t.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}