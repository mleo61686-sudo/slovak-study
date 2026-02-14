"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

const topics = [
  {
    id: "alphabet",
    title: { ua: "Алфавіт і вимова", ru: "Алфавит и произношение" },
    description: {
      ua: "Основи читання і звуків у словацькій мові.",
      ru: "Основы чтения и звуков в словацком языке.",
    },
  },
  {
    id: "verbs-present",
    title: { ua: "Дієслова теперішнього часу", ru: "Глаголы настоящего времени" },
    description: {
      ua: "Як відмінюються дієслова в теперішньому часі.",
      ru: "Как спрягаются глаголы в настоящем времени.",
    },
  },
  {
    id: "cases",
    title: { ua: "Відмінки", ru: "Падежи" },
    description: {
      ua: "6 відмінків у словацькій мові з прикладами.",
      ru: "6 падежей в словацком языке с примерами.",
    },
  },
];

export default function GrammarClient() {
  const { lang } = useLanguage();
  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {t("Граматика 🇸🇰", "Грамматика 🇸🇰")}
      </h1>

      <p className="text-slate-700">
        {t(
          "Обери тему та відкрий урок з прикладами і міні-вправою.",
          "Выбери тему и открой урок с примерами и мини-упражнением."
        )}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Link
            key={topic.id}
            href={`/grammar/${topic.id}`}
            className="rounded-2xl border bg-white p-5 shadow-sm hover:bg-slate-50 transition"
          >
            <h2 className="text-lg font-semibold">
              {t(topic.title.ua, topic.title.ru)}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {t(topic.description.ua, topic.description.ru)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
