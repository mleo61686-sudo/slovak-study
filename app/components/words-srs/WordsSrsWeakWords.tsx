"use client";

import { useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { Word } from "@/app/learning/data";
import type { Lang } from "@/lib/src/language";
import { getTerm, getTranslation, type SrsState } from "./words-srs-logic";

type Props = {
  words: Word[];
  db: Record<string, SrsState>;
  lang: Lang;
};

const VISIBLE_WEAK_WORDS = 4;

function getWeakLabel(lang: Lang) {
  if (lang === "ru") return "Слабые слова";
  if (lang === "en") return "Weak words";
  return "Слабкі слова";
}

function getWeakSubtitle(lang: Lang) {
  if (lang === "ru") {
    return "Flunio будет чаще возвращать эти слова в тренировке.";
  }

  if (lang === "en") {
    return "Flunio will bring these words back more often.";
  }

  return "Flunio буде частіше повертати ці слова в тренуванні.";
}

function getEmptyText(lang: Lang) {
  if (lang === "ru") {
    return "Пока слабых слов нет. Нажми «Забыл», и слово появится здесь.";
  }

  if (lang === "en") {
    return "No weak words yet. Tap “Forgot”, and the word will appear here.";
  }

  return "Поки слабких слів немає. Натисни «Забув», і слово зʼявиться тут.";
}

function getMoreLabel(lang: Lang, count: number) {
  if (lang === "ru") return `Показать ещё ${count}`;
  if (lang === "en") return `Show ${count} more`;
  return `Показати ще ${count}`;
}

function getCollapseLabel(lang: Lang) {
  if (lang === "ru") return "Свернуть";
  if (lang === "en") return "Collapse";
  return "Згорнути";
}

function getLapsesLabel(lang: Lang, lapses: number) {
  if (lang === "ru") return `${lapses} ошибок`;
  if (lang === "en") return `${lapses} misses`;
  return `${lapses} помилок`;
}

export default function WordsSrsWeakWords({ words, db, lang }: Props) {
  const [showAll, setShowAll] = useState(false);

  const weakWords = words
    .map((word) => {
      const id = getTerm(word);
      const state = id ? db[id] : undefined;
      const lapses =
        typeof state?.lapses === "number" && Number.isFinite(state.lapses)
          ? Math.max(0, state.lapses)
          : 0;

      return {
        word,
        id,
        state,
        lapses,
      };
    })
    .filter((item) => {
      if (!item.id || !item.state) return false;

      return (
        item.lapses >= 1 ||
        item.state.lastGrade === 0 ||
        item.state.ease <= 1.8
      );
    })
    .sort((a, b) => {
      if (a.lapses !== b.lapses) return b.lapses - a.lapses;
      return a.state!.ease - b.state!.ease;
    });

  const visibleWords = showAll
    ? weakWords
    : weakWords.slice(0, VISIBLE_WEAK_WORDS);

  const hiddenCount = Math.max(0, weakWords.length - VISIBLE_WEAK_WORDS);

  return (
    <section className="flunio-card rounded-3xl p-4 theme-text sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold theme-text sm:text-lg">
            ⚠️ {getWeakLabel(lang)}
          </h2>

          <p className="mt-1 text-sm leading-5 theme-text-muted">
            {getWeakSubtitle(lang)}
          </p>
        </div>

        <div className="theme-pill shrink-0 rounded-full px-3 py-1 text-xs font-semibold">
          {weakWords.length}
        </div>
      </div>

      {weakWords.length === 0 ? (
        <div className="theme-inner-card mt-3 rounded-2xl p-3 text-sm leading-5 theme-text-muted">
          {getEmptyText(lang)}
        </div>
      ) : (
        <>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {visibleWords.map(({ word, id, lapses }) => {
              const term = getTerm(word);
              const translation = getTranslation(word, lang);

              return (
                <div
                  key={id}
                  className="theme-inner-card rounded-2xl p-3 transition hover:-translate-y-0.5 hover:border-cyan-400/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="break-words text-sm font-bold theme-text sm:text-base">
                        {term}
                      </div>

                      <div className="mt-0.5 break-words text-xs theme-text-muted sm:text-sm">
                        {translation}
                      </div>
                    </div>

                    <SpeakButton text={term} />
                  </div>

                  {lapses > 0 ? (
                    <div className="mt-2 inline-flex rounded-full border border-amber-300/30 bg-amber-300/15 px-2.5 py-1 text-xs font-semibold text-amber-500">
                      {getLapsesLabel(lang, lapses)}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          {hiddenCount > 0 ? (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAll((value) => !value)}
                className="theme-secondary-button min-h-10 rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.98]"
              >
                {showAll ? getCollapseLabel(lang) : getMoreLabel(lang, hiddenCount)}
              </button>
            </div>
          ) : null}
        </>
      )}
    </section>
  );
}