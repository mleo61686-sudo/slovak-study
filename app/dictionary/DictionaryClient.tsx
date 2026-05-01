"use client";

import { useDeferredValue, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import type { CourseId } from "@/app/learning/courses/registry";

type SearchInLabels = Record<CourseId | "fallback", string>;

type DictionaryUi = {
  title: string;
  searchIn: SearchInLabels;
  placeholder: (label: string) => string;
  found: string;
  showMore: (n: number) => string;
};

export type DictionaryWord = {
  key?: string;
  term?: string;
  sk?: string;
  ua?: string;
  ru?: string;
  en?: string;
  ipa?: string;
};

type Props = {
  initialCourseId: CourseId;
  initialDictionary: DictionaryWord[];
};

function getWordTranslation(word: DictionaryWord, lang: Lang) {
  if (lang === "en") return word.en ?? word.ua ?? "";
  if (lang === "ru") return word.ru ?? word.ua ?? "";
  return word.ua ?? "";
}

const ui: Record<Lang, DictionaryUi> = {
  ua: {
    title: "Словник 📚",
    searchIn: {
      sk: "словацька",
      cs: "чеська",
      pl: "польська",
      fallback: "мова курсу",
    },
    placeholder: (label: string) =>
      `Пошук: ${label} / українська / русский / english…`,
    found: "Знайдено:",
    showMore: (n: number) => `Показати ще (${n})`,
  },
  ru: {
    title: "Словарь 📚",
    searchIn: {
      sk: "словацкий",
      cs: "чешский",
      pl: "польский",
      fallback: "язык курса",
    },
    placeholder: (label: string) =>
      `Поиск: ${label} / українська / русский / english…`,
    found: "Найдено:",
    showMore: (n: number) => `Показать ещё (${n})`,
  },
  en: {
    title: "Dictionary 📚",
    searchIn: {
      sk: "Slovak",
      cs: "Czech",
      pl: "Polish",
      fallback: "course language",
    },
    placeholder: (label: string) =>
      `Search: ${label} / Ukrainian / Russian / English…`,
    found: "Found:",
    showMore: (n: number) => `Show more (${n})`,
  },
};

export default function DictionaryClient({
  initialCourseId,
  initialDictionary,
}: Props) {
  const { lang } = useLanguage();

  const [q, setQ] = useState("");
  const deferredQ = useDeferredValue(q);

  const STEP = 80;
  const [limit, setLimit] = useState(STEP);

  const t = ui[lang] ?? ui.ua;

  const searchSourceLabel = useMemo(() => {
    return t.searchIn[initialCourseId] ?? t.searchIn.fallback;
  }, [initialCourseId, t]);

  const filtered = useMemo(() => {
    const s = deferredQ.trim().toLowerCase();
    if (!s) return initialDictionary;

    return initialDictionary.filter((w) => {
      const term = String(w.term ?? w.sk ?? "").toLowerCase();
      const ua = String(w.ua ?? "").toLowerCase();
      const ru = String(w.ru ?? "").toLowerCase();
      const en = String(w.en ?? "").toLowerCase();
      const ipa = String(w.ipa ?? "").toLowerCase();

      return (
        term.includes(s) ||
        ua.includes(s) ||
        ru.includes(s) ||
        en.includes(s) ||
        ipa.includes(s)
      );
    });
  }, [deferredQ, initialDictionary]);

  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit]);
  const canLoadMore = visible.length < filtered.length;

  return (
    <div className="mx-auto w-[min(100vw-2rem,56rem)] space-y-6 theme-text">
      <section className="flunio-card rounded-3xl p-6">
        <h1 className="text-2xl font-semibold theme-text">{t.title}</h1>

        <div className="mt-5 w-full self-stretch space-y-2">
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setLimit(STEP);
            }}
            placeholder={t.placeholder(searchSourceLabel)}
            className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20"
          />

          <div className="text-sm theme-text-muted">
            {t.found}{" "}
            <span className="font-semibold theme-accent-text">
              {filtered.length}
            </span>
          </div>
        </div>
      </section>

      {visible.length === 1 ? (
        <div className="flunio-card rounded-2xl p-4 theme-text">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold theme-text">
                  {visible[0].term ?? visible[0].sk}
                </span>

                <SpeakButton
                  text={visible[0].term ?? visible[0].sk ?? ""}
                  kind="word"
                />
              </div>

              {visible[0].ipa && (
                <span className="text-xs theme-text-subtle">
                  {visible[0].ipa}
                </span>
              )}

              <span className="theme-text-muted">
                {getWordTranslation(visible[0], lang)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid w-full self-stretch grid-cols-1 gap-3 sm:grid-cols-2">
          {visible.map((word) => (
            <div
              key={word.key ?? word.term ?? word.sk}
              className="flunio-card rounded-2xl p-4 theme-text transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 flex-col">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-lg font-semibold theme-text">
                      {word.term ?? word.sk}
                    </span>

                    <SpeakButton text={word.term ?? word.sk ?? ""} kind="word" />
                  </div>

                  {word.ipa && (
                    <span className="text-xs theme-text-subtle">
                      {word.ipa}
                    </span>
                  )}

                  <span className="theme-text-muted">
                    {getWordTranslation(word, lang)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {canLoadMore && (
        <div className="flex w-full self-stretch justify-center">
          <button
            type="button"
            onClick={() => setLimit((v) => v + STEP)}
            className="theme-secondary-button rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-95"
          >
            {t.showMore(filtered.length - visible.length)}
          </button>
        </div>
      )}
    </div>
  );
}