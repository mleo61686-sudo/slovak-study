"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Topic = {
  id: string;
  title: { ua: string; ru: string };
  description: { ua: string; ru: string };
};

const SK_TOPICS: Topic[] = [
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
  {
    id: "slovak-slang",
    title: { ua: "Сленг і розмовна мова", ru: "Сленг и разговорная речь" },
    description: {
      ua: "Живі фрази та вирази, як реально говорять словаки щодня.",
      ru: "Живые фразы и выражения: как реально говорят словаки каждый день.",
    },
  },
];

const CS_TOPICS: Topic[] = [
  {
    id: "alphabet",
    title: { ua: "Абетка і вимова", ru: "Алфавит и произношение" },
    description: {
      ua: "Основи читання і звуків у чеській мові.",
      ru: "Основы чтения и звуков в чешском языке.",
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
      ua: "7 відмінків у чеській мові з прикладами.",
      ru: "7 падежей в чешском языке с примерами.",
    },
  },
  {
    id: "slovak-slang",
    title: { ua: "Сленг і розмовна мова", ru: "Сленг и разговорная речь" },
    description: {
      ua: "Живі фрази та вирази живої чеської мови.",
      ru: "Живые фразы и выражения живой чешской речи.",
    },
  },
];

function TopicCard({
  topic,
  lang,
}: {
  topic: Topic;
  lang: "ua" | "ru";
}) {
  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  return (
    <Link
      href={`/grammar/${topic.id}`}
      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">
          {t(topic.title.ua, topic.title.ru)}
        </h2>
      </div>

      <p className="mt-1 text-sm text-slate-600">
        {t(topic.description.ua, topic.description.ru)}
      </p>
    </Link>
  );
}

export default function GrammarClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  const isCzech = courseId === "cs";
  const topics = isCzech ? CS_TOPICS : SK_TOPICS;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {isCzech
          ? t("Граматика 🇨🇿", "Грамматика 🇨🇿")
          : t("Граматика 🇸🇰", "Грамматика 🇸🇰")}
      </h1>

      <p className="text-slate-700">
        {isCzech
          ? t(
              "Обери тему та відкрий урок з прикладами і міні-вправою для чеської мови.",
              "Выбери тему и открой урок с примерами и мини-упражнением для чешского языка."
            )
          : t(
              "Обери тему та відкрий урок з прикладами і міні-вправою.",
              "Выбери тему и открой урок с примерами и мини-упражнением."
            )}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} lang={lang} />
        ))}
      </div>
    </div>
  );
}