"use client";

import SpeakButton from "@/app/components/SpeakButton";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";

import AlphabetTrainer from "./AlphabetTrainer";

import {
  CS_CONSONANTS,
  CS_PRACTICE_WORDS,
  CS_VOWELS,
  PL_CONSONANTS,
  PL_PRACTICE_WORDS,
  PL_VOWELS,
  SK_CONSONANTS,
  SK_PRACTICE_WORDS,
  SK_VOWELS,
  UI,
  type LetterRow,
  type LocalizedText,
} from "./alphabet-data";

type ForcedLang = Lang;

type Props = {
  forcedLang?: ForcedLang;
};

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

const card =
  "flunio-card rounded-3xl overflow-hidden shadow-[0_0_24px_rgba(34,211,238,0.08)]";

const softCard = "theme-home-soft-card rounded-2xl";

function LetterList({
  items,
  lang,
  exampleLabel,
}: {
  items: LetterRow[];
  lang: Lang;
  exampleLabel: string;
}) {
  return (
    <div className={card}>
      {items.map((item) => (
        <div
          key={item.value}
          className="flex items-center justify-between gap-4 border-b border-slate-300/70 px-5 py-4 last:border-b-0 theme-flunio:border-white/10"
        >
          <div>
            <div className="text-lg font-semibold theme-text">
              <span className="theme-accent-text">{item.value}</span>{" "}
              <span className="theme-text-muted">—</span> {tr(item.label, lang)}
            </div>

            <div className="mt-1 text-sm theme-text-muted">
              {exampleLabel}{" "}
              <span className="font-medium theme-text-muted">
                {item.example}
              </span>
            </div>
          </div>

          <SpeakButton text={item.example} />
        </div>
      ))}
    </div>
  );
}

export default function AlphabetClient({ forcedLang }: Props) {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const uiLang = forcedLang ?? lang;
  const isCzech = courseId === "cs";
  const isPolish = courseId === "pl";

  const vowels = isPolish ? PL_VOWELS : isCzech ? CS_VOWELS : SK_VOWELS;
  const consonants = isPolish
    ? PL_CONSONANTS
    : isCzech
      ? CS_CONSONANTS
      : SK_CONSONANTS;

  const practiceWords = isPolish
    ? PL_PRACTICE_WORDS
    : isCzech
      ? CS_PRACTICE_WORDS
      : SK_PRACTICE_WORDS;

  return (
    <div className="space-y-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <div className="theme-pill mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Grammar · Alphabet
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight theme-text sm:text-4xl">
            {isPolish
              ? tr(UI.titlePl, uiLang)
              : isCzech
                ? tr(UI.titleCs, uiLang)
                : tr(UI.titleSk, uiLang)}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed theme-text-muted">
            {isPolish
              ? tr(UI.introPl, uiLang)
              : isCzech
                ? tr(UI.introCs, uiLang)
                : tr(UI.introSk, uiLang)}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section1, uiLang)}
        </h2>

        <div className={`${softCard} p-4 text-sm leading-relaxed theme-text-muted`}>
          {isPolish
            ? "a, ą, b, c, ć, d, e, ę, f, g, h, i, j, k, l, ł, m, n, ń, o, ó, p, r, s, ś, t, u, w, y, z, ź, ż"
            : isCzech
              ? "a, á, b, c, č, d, ď, e, é, ě, f, g, h, ch, i, í, j, k, l, m, n, ň, o, ó, p, q, r, ř, s, š, t, ť, u, ú, ů, v, w, x, y, ý, z, ž"
              : "a, á, ä, b, c, č, d, ď, e, é, f, g, h, ch, i, í, j, k, l, ľ, m, n, ň, o, ó, ô, p, q, r, ŕ, s, š, t, ť, u, ú, v, w, x, y, ý, z, ž"}

          {isPolish && (
            <p className="mt-3 text-xs leading-relaxed theme-text-muted">
              {uiLang === "ru"
                ? "Буквы q, v, x встречаются в основном в иностранных словах и собственных названиях."
                : uiLang === "en"
                  ? "The letters q, v, x appear mostly in foreign words and proper names."
                  : "Літери q, v, x трапляються переважно в іншомовних словах і власних назвах."}
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section2, uiLang)}
        </h2>

        <LetterList
          items={vowels}
          lang={uiLang}
          exampleLabel={tr(UI.example, uiLang)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section3, uiLang)}
        </h2>

        <LetterList
          items={consonants}
          lang={uiLang}
          exampleLabel={tr(UI.example, uiLang)}
        />
      </section>

      {isPolish && (
        <section className="space-y-3">
          <div className={`${softCard} p-5 text-sm leading-relaxed theme-text-muted`}>
            {uiLang === "ru"
              ? "В польском языке ż и rz часто звучат одинаково или очень похоже, но пишутся по-разному. Поэтому такие слова лучше запоминать сразу в правильном написании: żona, rzeka, dobrze."
              : uiLang === "en"
                ? "In Polish, ż and rz often sound the same or very similar, but they are written differently. It is better to learn words with their spelling from the beginning: żona, rzeka, dobrze."
                : "У польській мові ż і rz часто звучать однаково або дуже близько, але пишуться по-різному. Тому такі слова краще одразу запам’ятовувати з правильним написанням: żona, rzeka, dobrze."}
          </div>
        </section>
      )}

      <section className="space-y-3">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section4, uiLang)}
        </h2>

        <div className={`${softCard} p-5 theme-text-muted`}>
          {isPolish
            ? tr(UI.stressPl, uiLang)
            : isCzech
              ? tr(UI.stressCs, uiLang)
              : tr(UI.stressSk, uiLang)}

          <div className="theme-inner-card mt-4 flex items-center gap-3 rounded-2xl px-4 py-3">
            <b className="text-lg theme-accent-text">
              {isPolish ? "wa-KA-cje" : isCzech ? "PRA-ha" : "PRÁ-ca"}
            </b>

            <SpeakButton
              text={isPolish ? "wakacje" : isCzech ? "Praha" : "práca"}
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section5, uiLang)}
        </h2>

        <div className={card}>
          {practiceWords.map((word) => (
            <div
              key={word}
              className="flex items-center justify-between gap-4 border-b border-slate-300/70 px-5 py-4 last:border-b-0 theme-flunio:border-white/10"
            >
              <span className="font-semibold theme-text">{word}</span>
              <SpeakButton text={word} />
            </div>
          ))}
        </div>
      </section>

      <AlphabetTrainer
        uiLang={uiLang}
        courseId={courseId}
        isCzech={isCzech}
        isPolish={isPolish}
      />
    </div>
  );
}