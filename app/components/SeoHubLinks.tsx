"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";

type HubKind = "dictionary" | "grammar";

type HubItem = {
  href: string;
  title: string;
  text: string;
};

type HubCopy = {
  title: string;
  description: string;
  ariaLabel: string;
  items: HubItem[];
};

const COPY: Record<HubKind, Record<Lang, HubCopy>> = {
  dictionary: {
    ua: {
      title: "Словники, лексика та вимова",
      description:
        "Перевір слово у словнику, а потім закріпи його в тематичному списку, аудіопрактиці або у повному курсі для початківців.",
      ariaLabel: "Матеріали для вивчення слів і вимови",
      items: [
        {
          href: "/slovak-for-beginners",
          title: "Словацька для початківців",
          text: "Перші слова, вимова та план навчання на 30 днів.",
        },
        {
          href: "/czech-vocabulary",
          title: "Чеська лексика",
          text: "Базові чеські слова за повсякденними темами.",
        },
        {
          href: "/czech-words-with-audio",
          title: "Чеські слова з аудіо",
          text: "Слухай поширені слова та тренуй вимову.",
        },
        {
          href: "/polish-vocabulary",
          title: "Польська лексика",
          text: "Понад 60 базових польських слів із прикладами.",
        },
        {
          href: "/polish-words-with-audio",
          title: "Польські слова з аудіо",
          text: "Прослуховуй слова та складні звукосполучення.",
        },
        {
          href: "/learning",
          title: "Уроки A0–B2",
          text: "Закріплюй лексику в коротких практичних вправах.",
        },
      ],
    },
    ru: {
      title: "Словари, лексика и произношение",
      description:
        "Проверь слово в словаре, а затем закрепи его в тематическом списке, аудиопрактике или полном курсе для начинающих.",
      ariaLabel: "Материалы для изучения слов и произношения",
      items: [
        {
          href: "/slovak-for-beginners",
          title: "Словацкий для начинающих",
          text: "Первые слова, произношение и план обучения на 30 дней.",
        },
        {
          href: "/czech-vocabulary",
          title: "Чешская лексика",
          text: "Базовые чешские слова по повседневным темам.",
        },
        {
          href: "/czech-words-with-audio",
          title: "Чешские слова с аудио",
          text: "Слушай распространённые слова и тренируй произношение.",
        },
        {
          href: "/polish-vocabulary",
          title: "Польская лексика",
          text: "Более 60 базовых польских слов с примерами.",
        },
        {
          href: "/polish-words-with-audio",
          title: "Польские слова с аудио",
          text: "Слушай слова и сложные сочетания звуков.",
        },
        {
          href: "/learning",
          title: "Уроки A0–B2",
          text: "Закрепляй лексику в коротких практических упражнениях.",
        },
      ],
    },
    en: {
      title: "Vocabulary and pronunciation guides",
      description:
        "Check a word in the dictionary, then reinforce it through a topic list, audio practice or a complete beginner course.",
      ariaLabel: "Vocabulary and pronunciation resources",
      items: [
        {
          href: "/slovak-for-beginners",
          title: "Slovak for beginners",
          text: "First words, pronunciation and a 30-day learning plan.",
        },
        {
          href: "/czech-vocabulary",
          title: "Czech vocabulary",
          text: "Basic Czech words grouped by everyday topics.",
        },
        {
          href: "/czech-words-with-audio",
          title: "Czech words with audio",
          text: "Listen to common words and practise pronunciation.",
        },
        {
          href: "/polish-vocabulary",
          title: "Polish vocabulary",
          text: "More than 60 beginner Polish words with examples.",
        },
        {
          href: "/polish-words-with-audio",
          title: "Polish words with audio",
          text: "Hear common words and difficult sound combinations.",
        },
        {
          href: "/learning",
          title: "Lessons A0–B2",
          text: "Put vocabulary into practice through short exercises.",
        },
      ],
    },
  },
  grammar: {
    ua: {
      title: "Повні довідники з граматики",
      description:
        "Обери мову та відкрий публічний довідник із правилами, прикладами й переходами до словника та практичних уроків.",
      ariaLabel: "Довідники з граматики",
      items: [
        {
          href: "/slovak-grammar",
          title: "Словацька граматика",
          text: "Відмінки, дієслова, часи та приклади речень.",
        },
        {
          href: "/czech-grammar",
          title: "Чеська граматика",
          text: "Сім відмінків, рід, дієслова та порядок слів.",
        },
        {
          href: "/polish-grammar",
          title: "Польська граматика",
          text: "Відмінки, дієвідміна, рід і вимова.",
        },
        {
          href: "/grammar/alphabet",
          title: "Алфавіт і звуки",
          text: "Почни з літер, діакритики та правильної вимови.",
        },
      ],
    },
    ru: {
      title: "Полные справочники по грамматике",
      description:
        "Выбери язык и открой публичный справочник с правилами, примерами и переходами к словарю и практическим урокам.",
      ariaLabel: "Справочники по грамматике",
      items: [
        {
          href: "/slovak-grammar",
          title: "Словацкая грамматика",
          text: "Падежи, глаголы, времена и примеры предложений.",
        },
        {
          href: "/czech-grammar",
          title: "Чешская грамматика",
          text: "Семь падежей, род, глаголы и порядок слов.",
        },
        {
          href: "/polish-grammar",
          title: "Польская грамматика",
          text: "Падежи, спряжение, род и произношение.",
        },
        {
          href: "/grammar/alphabet",
          title: "Алфавит и звуки",
          text: "Начни с букв, диакритики и правильного произношения.",
        },
      ],
    },
    en: {
      title: "Complete grammar guides",
      description:
        "Choose a language and open a public guide with rules, examples and links to vocabulary and practical lessons.",
      ariaLabel: "Grammar guides",
      items: [
        {
          href: "/slovak-grammar",
          title: "Slovak grammar",
          text: "Cases, verbs, tenses and sentence examples.",
        },
        {
          href: "/czech-grammar",
          title: "Czech grammar",
          text: "Seven cases, gender, verbs and word order.",
        },
        {
          href: "/polish-grammar",
          title: "Polish grammar",
          text: "Cases, conjugation, gender and pronunciation.",
        },
        {
          href: "/grammar/alphabet",
          title: "Alphabet and sounds",
          text: "Start with letters, diacritics and pronunciation.",
        },
      ],
    },
  },
};

export default function SeoHubLinks({ kind }: { kind: HubKind }) {
  const { lang } = useLanguage();
  const copy = COPY[kind][lang];
  const gridClass =
    kind === "grammar"
      ? "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      : "mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-10 theme-text">
      <div className="flunio-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold theme-text">{copy.title}</h2>
        <p className="mt-2 max-w-3xl leading-7 theme-text-muted">
          {copy.description}
        </p>

        <nav aria-label={copy.ariaLabel} className={gridClass}>
          {copy.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="theme-home-soft-card block rounded-2xl p-4 transition hover:-translate-y-0.5"
            >
              <div className="font-bold theme-accent-text">{item.title}</div>
              <p className="mt-1 text-sm leading-6 theme-text-muted">
                {item.text}
              </p>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
