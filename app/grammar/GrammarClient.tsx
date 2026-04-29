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
    id: "verbs-past",
    title: {
      ua: "Минулий час",
      ru: "Прошедшее время",
      en: "Past tense",
    },
    description: {
      ua: "Як сказати: я робив, я була, ми пішли.",
      ru: "Как сказать: я делал, я была, мы пошли.",
      en: "How to say: I did, I was, we went.",
    },
  },
  {
    id: "verbs-future",
    title: {
      ua: "Майбутній час",
      ru: "Будущее время",
      en: "Future tense",
    },
    description: {
      ua: "Як сказати: я буду робити, я зроблю, ми підемо.",
      ru: "Как сказать: я буду делать, я сделаю, мы пойдём.",
      en: "How to say: I will do, I will finish, we will go.",
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
      ua: "Як читати чеські літери, наголос і звуки без плутанини.",
      ru: "Как читать чешские буквы, ударение и звуки без путаницы.",
      en: "How to read Czech letters, stress, and sounds without confusion.",
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
      ua: "Як сказати: я роблю, ти робиш, він робить — і не плутатися.",
      ru: "Как сказать: я делаю, ты делаешь, он делает — и не путаться.",
      en: "How to say: I do, you do, he does — without getting confused.",
    },
  },
  {
    id: "verbs-past",
    title: {
      ua: "Минулий час",
      ru: "Прошедшее время",
      en: "Past tense",
    },
    description: {
      ua: "Як сказати: я робив, я була, ми пішли.",
      ru: "Как сказать: я делал, я была, мы пошли.",
      en: "How to say: I did, I was, we went.",
    },
  },
  {
    id: "verbs-future",
    title: {
      ua: "Майбутній час",
      ru: "Будущее время",
      en: "Future tense",
    },
    description: {
      ua: "Як сказати: я буду робити, я зроблю, ми підемо.",
      ru: "Как сказать: я буду делать, я сделаю, мы пойдём.",
      en: "How to say: I will do, I will finish, we will go.",
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
      ua: "Коли змінюється форма слова і як це побачити в реченні.",
      ru: "Когда меняется форма слова и как увидеть это в предложении.",
      en: "When word forms change and how to notice it in a sentence.",
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
      ua: "Живі слова й фрази, які часто звучать у реальному спілкуванні.",
      ru: "Живые слова и фразы, которые часто звучат в реальном общении.",
      en: "Everyday words and phrases you will hear in real conversations.",
    },
  },
];

const PL_TOPICS: Topic[] = [
  {
    id: "alphabet",
    title: {
      ua: "Алфавіт і вимова",
      ru: "Алфавит и произношение",
      en: "Alphabet and pronunciation",
    },
    description: {
      ua: "Основи читання і звуків у польській мові.",
      ru: "Основы чтения и звуков в польском языке.",
      en: "The basics of reading and sounds in Polish.",
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
    id: "verbs-past",
    title: {
      ua: "Минулий час",
      ru: "Прошедшее время",
      en: "Past tense",
    },
    description: {
      ua: "Як сказати: я робив, я була, ми пішли.",
      ru: "Как сказать: я делал, я была, мы пошли.",
      en: "How to say: I did, I was, we went.",
    },
  },
  {
    id: "verbs-future",
    title: {
      ua: "Майбутній час",
      ru: "Будущее время",
      en: "Future tense",
    },
    description: {
      ua: "Як сказати: я буду робити, я зроблю, ми підемо.",
      ru: "Как сказать: я буду делать, я сделаю, мы пойдём.",
      en: "How to say: I will do, I will finish, we will go.",
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
      ua: "7 відмінків у польській мові з прикладами.",
      ru: "7 падежей в польском языке с примерами.",
      en: "7 cases in Polish with examples.",
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
      ua: "Живі фрази та вирази живої польської мови.",
      ru: "Живые фразы и выражения живой польской речи.",
      en: "Real-life phrases and expressions used in spoken Polish.",
    },
  },
];

const UI: Record<
  | "grammarSkTitle"
  | "grammarCsTitle"
  | "grammarPlTitle"
  | "skIntro"
  | "csIntro"
  | "plIntro",
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
  grammarPlTitle: {
    ua: "Граматика PL",
    ru: "Грамматика PL",
    en: "Polish grammar",
  },
  skIntro: {
    ua: "Обери тему граматики та розбери правило на простих прикладах.",
    ru: "Выбери тему грамматики и разбери правило на простых примерах.",
    en: "Choose a grammar topic and understand the rule through simple examples.",
  },
  csIntro: {
    ua: "Обери тему чеської граматики та розбери правило на простих прикладах.",
    ru: "Выбери тему чешской грамматики и разбери правило на простых примерах.",
    en: "Choose a Czech grammar topic and understand the rule through simple examples.",
  },
  plIntro: {
    ua: "Обери тему польської граматики та розбери правило на простих прикладах.",
    ru: "Выбери тему польской грамматики и разбери правило на простых примерах.",
    en: "Choose a Polish grammar topic and understand the rule through simple examples.",
  },
};

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

function TopicCard({ topic, lang }: { topic: Topic; lang: Lang }) {
  return (
    <Link
      href={`/grammar/${topic.id}`}
      className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_0_18px_rgba(34,211,238,0.06)] backdrop-blur transition hover:-translate-y-0.5 hover:border-cyan-400/35 hover:bg-white/10"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold">{tr(topic.title, lang)}</h2>
        <span className="text-cyan-200 opacity-0 transition group-hover:opacity-100">
          →
        </span>
      </div>

      <p className="mt-1 text-sm text-white/65">
        {tr(topic.description, lang)}
      </p>
    </Link>
  );
}

export default function GrammarClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const topics =
    courseId === "cs" ? CS_TOPICS : courseId === "pl" ? PL_TOPICS : SK_TOPICS;

  const title =
    courseId === "cs"
      ? tr(UI.grammarCsTitle, lang)
      : courseId === "pl"
        ? tr(UI.grammarPlTitle, lang)
        : tr(UI.grammarSkTitle, lang);

  const intro =
    courseId === "cs"
      ? tr(UI.csIntro, lang)
      : courseId === "pl"
        ? tr(UI.plIntro, lang)
        : tr(UI.skIntro, lang);

  return (
    <div className="space-y-6 text-white">
      <section className="flunio-card rounded-3xl p-6">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="mt-2 text-white/65">{intro}</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <TopicCard key={topic.id} topic={topic} lang={lang} />
        ))}
      </div>
    </div>
  );
}