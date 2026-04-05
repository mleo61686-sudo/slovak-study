"use client";

import { useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { getDictionaryForCourse } from "@/app/learning/courses/dictionary";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
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

type DictionaryWord = {
  key?: string;
  term?: string;
  sk?: string;
  ua?: string;
  ru?: string;
  en?: string;
  ipa?: string;
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

export default function DictionaryClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const [q, setQ] = useState("");
  const STEP = 80;
  const [limit, setLimit] = useState(STEP);

  const dict = useMemo(
    () => getDictionaryForCourse(courseId) as DictionaryWord[],
    [courseId]
  );
  const t = ui[lang] ?? ui.ua;

  const searchSourceLabel = useMemo(() => {
    return t.searchIn[courseId] ?? t.searchIn.fallback;
  }, [courseId, t]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return dict;

    return dict.filter((w) => {
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
  }, [q, dict]);

  const visible = useMemo(() => filtered.slice(0, limit), [filtered, limit]);
  const canLoadMore = visible.length < filtered.length;

  return (
    <div className="mx-auto w-[min(100vw-2rem,56rem)] space-y-6">
      <h1 className="text-2xl font-semibold">{t.title}</h1>

      <div className="w-full self-stretch space-y-2">
        <input
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setLimit(STEP);
          }}
          placeholder={t.placeholder(searchSourceLabel)}
          className="w-full rounded-2xl border bg-white px-4 py-3 outline-none focus:ring-2"
        />

        <div className="text-sm text-slate-500">
          {t.found} {filtered.length}
        </div>
      </div>

      {visible.length === 1 ? (
        <div className="w-full self-stretch rounded-2xl border bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold">
                  {visible[0].term ?? visible[0].sk}
                </span>

                <SpeakButton text={visible[0].term ?? visible[0].sk ?? ""} kind="word" />
              </div>

              {visible[0].ipa && (
                <span className="text-xs text-slate-500">{visible[0].ipa}</span>
              )}

              <span className="text-slate-700">
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
              className="w-full rounded-2xl border bg-white p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">
                      {word.term ?? word.sk}
                    </span>

                    <SpeakButton text={word.term ?? word.sk ?? ""} kind="word" />
                  </div>

                  {word.ipa && (
                    <span className="text-xs text-slate-500">{word.ipa}</span>
                  )}

                  <span className="text-slate-700">
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
            className="rounded-2xl border bg-white px-5 py-3 text-sm font-medium hover:bg-slate-50"
          >
            {t.showMore(filtered.length - visible.length)}
          </button>
        </div>
      )}
    </div>
  );
}