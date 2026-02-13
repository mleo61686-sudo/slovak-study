"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

export default function Page() {
  const { lang } = useLanguage();

  const dict = {
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
  };

  const t = dict[lang];

  return (
    <div className="max-w-xl mx-auto p-6 space-y-3">
      <div className="text-2xl font-semibold">{t.title}</div>

      <div className="text-slate-600">
        {t.text}
      </div>

      <Link href="/learning" className="underline">
        {t.back}
      </Link>
    </div>
  );
}