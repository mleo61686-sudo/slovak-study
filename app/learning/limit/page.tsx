"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type LimitI18n = {
  title: string;
  text: string;
  back: string;
};

const dict: Record<Lang, LimitI18n> = {
  ua: {
    title: "Ліміт на сьогодні 😅",
    text: "На день доступно 2 нові уроки для проходження. Завтра ліміт скинеться.",
    back: "← Назад до навчання",
  },
  ru: {
    title: "Лимит на сегодня 😅",
    text: "В день доступно 2 новых урока для прохождения. Завтра лимит сбросится.",
    back: "← Назад к обучению",
  },
  en: {
    title: "Daily limit reached 😅",
    text: "You can complete 2 new lessons per day. The limit will reset tomorrow.",
    back: "← Back to learning",
  },
};

export default function Page() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = dict[L];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-3">
      <div className="text-2xl font-semibold">{t.title}</div>

      <div className="text-slate-600">{t.text}</div>

      <Link href="/learning" className="underline">
        {t.back}
      </Link>
    </div>
  );
}