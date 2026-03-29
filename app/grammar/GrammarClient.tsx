"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type Lang = "ua" | "ru";

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
    title: {
      ua: "Дієслова теперішнього часу",
      ru: "Глаголы настоящего времени",
    },
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
    title: {
      ua: "Дієслова теперішнього часу",
      ru: "Глаголы настоящего времени",
    },
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

function tr(lang: Lang, ua: string, ru: string) {
  return lang === "ru" ? ru : ua;
}

function TopicCard({
  topic,
  lang,
}: {
  topic: Topic;
  lang: Lang;
}) {
  return (
    <Link
      href={`/grammar/${topic.id}`}
      className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:bg-slate-50"
    >
      <h2 className="text-lg font-semibold">
        {tr(lang, topic.title.ua, topic.title.ru)}
      </h2>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {tr(lang, topic.description.ua, topic.description.ru)}
      </p>
    </Link>
  );
}

export default function GrammarClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const currentLang: Lang = lang === "ru" ? "ru" : "ua";
  const isCzech = courseId === "cs";
  const topics = isCzech ? CS_TOPICS : SK_TOPICS;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {isCzech
            ? tr(currentLang, "Граматика CZ", "Грамматика CZ")
            : tr(currentLang, "Граматика SK", "Грамматика SK")}
        </h1>

        <p className="text-slate-700">
          {isCzech
            ? tr(
                currentLang,
                "Обери тему та відкрий урок з прикладами і міні-вправою для чеської мови.",
                "Выбери тему и открой урок с примерами и мини-упражнением для чешского языка."
              )
            : tr(
                currentLang,
                "Обери тему та відкрий урок з прикладами і міні-вправою.",
                "Выбери тему и открой урок с примерами и мини-упражнением."
              )}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} lang={currentLang} />
        ))}
      </div>
    </div>
  );
}