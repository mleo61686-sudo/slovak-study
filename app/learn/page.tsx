"use client";

import { COURSES } from "@/lib/course";
import {
  setStoredCourseId,
  type CourseId,
} from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

const dict = {
  ua: {
    title: "Обери мову",
    subtitle: "Вибери, що хочеш вивчати. Це можна змінити будь-коли.",
    comingSoon: "Скоро",
  },
  ru: {
    title: "Выбери язык",
    subtitle: "Выбери, что хочешь изучать. Это можно изменить в любой момент.",
    comingSoon: "Скоро",
  },
  en: {
    title: "Choose a language",
    subtitle: "Choose what you want to learn. You can change it anytime.",
    comingSoon: "Coming soon",
  },
} satisfies Record<
  Lang,
  {
    title: string;
    subtitle: string;
    comingSoon: string;
  }
>;

export default function LearnPage() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = dict[safeLang];

  function chooseCourse(id: string, enabled: boolean) {
    if (!enabled) return;

    setStoredCourseId(id as CourseId);
    window.location.href = "/learning";
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t.title}
        </h1>
        <p className="mt-2 text-base text-slate-600">{t.subtitle}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {COURSES.map((c) => (
          <button
            key={c.id}
            onClick={() => chooseCourse(c.id, c.enabled)}
            className="rounded-3xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-[2px] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            disabled={!c.enabled}
            type="button"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-xl font-semibold text-slate-900">
                  {c.title}
                </div>
                <div className="mt-1 text-sm text-slate-500">{c.subtitle}</div>
                <div className="mt-3 text-sm text-slate-600">
                  {c.description[safeLang] ?? c.description.ua}
                </div>
              </div>

              {c.status === "comingSoon" && (
                <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                  {t.comingSoon}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </main>
  );
}