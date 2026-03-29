"use client";

import Link from "next/link";
import { useActiveCourse } from "@/hooks/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import { COURSES } from "@/lib/course";

export default function CourseGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { course, ready } = useActiveCourse();
  const { lang } = useLanguage();

  const currentLang = lang === "ru" ? "ru" : "ua";

  const loadingTitle =
    currentLang === "ru" ? "Завантаження..." : "Завантаження...";
  const fallbackName =
    currentLang === "ru" ? "Этот курс" : "Цей курс";

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="h-7 w-40 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-4 w-full animate-pulse rounded bg-slate-100" />
          <div className="mt-2 h-4 w-4/5 animate-pulse rounded bg-slate-100" />
          <div className="mt-6 flex gap-2">
            <div className="h-10 w-32 animate-pulse rounded-xl bg-slate-200" />
            <div className="h-10 w-24 animate-pulse rounded-xl bg-slate-100" />
          </div>
          <span className="sr-only">{loadingTitle}</span>
        </div>
      </main>
    );
  }

  const def = COURSES.find((c) => c.id === course);

  if (!def || !def.enabled) {
    const name = def?.title ?? fallbackName;

    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="min-h-[220px] rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-xl font-semibold">
            {name} — {currentLang === "ru" ? "скоро" : "скоро"}
          </div>

          <p className="mt-2 text-slate-600">
            {currentLang === "ru"
              ? "Этот курс пока недоступен. Выбери другой доступный язык для обучения."
              : "Цей курс ще недоступний. Вибери іншу доступну мову для навчання."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/learn"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              {currentLang === "ru" ? "Выбрать язык" : "Вибрати мову"}
            </Link>

            <Link
              href="/learning"
              className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
            >
              {currentLang === "ru" ? "Назад" : "Назад"}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}