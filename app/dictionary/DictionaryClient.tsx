"use client";

import { useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { getDictionaryForCourse } from "@/app/learning/courses/dictionary";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";

function getWordTranslation(word: any, lang: Lang) {
  if (lang === "en") return word.en ?? word.ua;
  if (lang === "ru") return word.ru ?? word.ua;
  return word.ua;
}

const ui = {
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
} satisfies Record<Lang, any>;

export default function DictionaryClient() {
  const { lang } = useLanguage() as { lang: Lang };
  const { courseId } = useActiveCourse();

  const [q, setQ] = useState("");
  const STEP = 80;
  const [limit, setLimit] = useState(STEP);

  const dict = useMemo(() => getDictionaryForCourse(courseId), [courseId]);
  const t = ui[lang];

  const searchSourceLabel = useMemo(() => {
    return (
      t.searchIn[courseId as "sk" | "cs" | "pl"] ??
      t.searchIn.fallback
    );
  }, [courseId, t]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return dict;

    return dict.filter((w: any) => {
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

      <div className="space-y-2 w-full self-stretch">
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
        <div className="rounded-2xl border bg-white p-4 w-full self-stretch">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-lg">
                  {visible[0].term ?? visible[0].sk}
                </span>

                <SpeakButton
                  text={visible[0].term ?? visible[0].sk}
                  kind="word"
                />
              </div>

              {visible[0].ipa && (
                <span className="text-xs text-slate-500">
                  {visible[0].ipa}
                </span>
              )}

              <span className="text-slate-700">
                {getWordTranslation(visible[0], lang)}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 w-full self-stretch">
          {visible.map((word: any) => (
            <div
              key={word.key ?? word.term ?? word.sk}
              className="rounded-2xl border bg-white p-4 w-full"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">
                      {word.term ?? word.sk}
                    </span>

                    <SpeakButton
                      text={word.term ?? word.sk}
                      kind="word"
                    />
                  </div>

                  {word.ipa && (
                    <span className="text-xs text-slate-500">
                      {word.ipa}
                    </span>
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
        <div className="flex justify-center w-full self-stretch">
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