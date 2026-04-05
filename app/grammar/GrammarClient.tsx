"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

type LocalizedText = Partial<Record<Lang, string>>;

type Topic = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
};

const SK_TOPICS: Topic[] = [
  {
    id: "alphabet",
    title: {
      ua: "Алфавіт і вимова",
      ru: "Алфавит и произношение",
      en: "Alphabet and pronunciation",
    },
    description: {
      ua: "Основи читання і звуків у словацькій мові.",
      ru: "Основы чтения и звуков в словацком языке.",
      en: "The basics of reading and sounds in Slovak.",
    },
  },
  {
    id: "verbs-present",
    title: {
      ua: "Дієслова теперішнього часу",
      ru: "Глаголы настоящего времени",
      en: "Present tense verbs",
    },
    description: {
      ua: "Як відмінюються дієслова в теперішньому часі.",
      ru: "Как спрягаются глаголы в настоящем времени.",
      en: "How verbs are conjugated in the present tense.",
    },
  },
  {
    id: "cases",
    title: {
      ua: "Відмінки",
      ru: "Падежи",
      en: "Cases",
    },
    description: {
      ua: "6 відмінків у словацькій мові з прикладами.",
      ru: "6 падежей в словацком языке с примерами.",
      en: "6 cases in Slovak with examples.",
    },
  },
  {
    id: "slovak-slang",
    title: {
      ua: "Сленг і розмовна мова",
      ru: "Сленг и разговорная речь",
      en: "Slang and spoken language",
    },
    description: {
      ua: "Живі фрази та вирази, як реально говорять словаки щодня.",
      ru: "Живые фразы и выражения: как реально говорят словаки каждый день.",
      en: "Real-life phrases and expressions used by Slovaks every day.",
    },
  },
];

const CS_TOPICS: Topic[] = [
  {
    id: "alphabet",
    title: {
      ua: "Абетка і вимова",
      ru: "Алфавит и произношение",
      en: "Alphabet and pronunciation",
    },
    description: {
      ua: "Основи читання і звуків у чеській мові.",
      ru: "Основы чтения и звуков в чешском языке.",
      en: "The basics of reading and sounds in Czech.",
    },
  },
  {
    id: "verbs-present",
    title: {
      ua: "Дієслова теперішнього часу",
      ru: "Глаголы настоящего времени",
      en: "Present tense verbs",
    },
    description: {
      ua: "Як відмінюються дієслова в теперішньому часі.",
      ru: "Как спрягаются глаголы в настоящем времени.",
      en: "How verbs are conjugated in the present tense.",
    },
  },
  {
    id: "cases",
    title: {
      ua: "Відмінки",
      ru: "Падежи",
      en: "Cases",
    },
    description: {
      ua: "7 відмінків у чеській мові з прикладами.",
      ru: "7 падежей в чешском языке с примерами.",
      en: "7 cases in Czech with examples.",
    },
  },
  {
    id: "slovak-slang",
    title: {
      ua: "Сленг і розмовна мова",
      ru: "Сленг и разговорная речь",
      en: "Slang and spoken language",
    },
    description: {
      ua: "Живі фрази та вирази живої чеської мови.",
      ru: "Живые фразы и выражения живой чешской речи.",
      en: "Real-life phrases and expressions used in spoken Czech.",
    },
  },
];

const UI: Record<
  "grammarSkTitle" | "grammarCsTitle" | "csIntro" | "skIntro",
  LocalizedText
> = {
  grammarSkTitle: {
    ua: "Граматика SK",
    ru: "Грамматика SK",
    en: "Slovak grammar",
  },
  grammarCsTitle: {
    ua: "Граматика CZ",
    ru: "Грамматика CZ",
    en: "Czech grammar",
  },
  csIntro: {
    ua: "Обери тему та відкрий урок з прикладами і міні-вправою для чеської мови.",
    ru: "Выбери тему и открой урок с примерами и мини-упражнением для чешского языка.",
    en: "Choose a topic and open a lesson with examples and a mini exercise for Czech.",
  },
  skIntro: {
    ua: "Обери тему та відкрий урок з прикладами і міні-вправою.",
    ru: "Выбери тему и открой урок с примерами и мини-упражнением.",
    en: "Choose a topic and open a lesson with examples and a mini exercise.",
  },
};

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
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
      className="rounded-2xl border bg-white p-5 shadow-sm transition hover:bg-slate-50"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{tr(topic.title, lang)}</h2>
      </div>

      <p className="mt-1 text-sm text-slate-600">
        {tr(topic.description, lang)}
      </p>
    </Link>
  );
}

export default function GrammarClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const isCzech = courseId === "cs";
  const topics = isCzech ? CS_TOPICS : SK_TOPICS;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        {isCzech ? tr(UI.grammarCsTitle, lang) : tr(UI.grammarSkTitle, lang)}
      </h1>

      <p className="text-slate-700">
        {isCzech ? tr(UI.csIntro, lang) : tr(UI.skIntro, lang)}
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} lang={lang} />
        ))}
      </div>
    </div>
  );
}