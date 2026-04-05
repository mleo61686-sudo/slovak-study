/**
 * CourseGate – компонент-фільтр для multi-course системи Flunio.
 *
 * Що робить:
 * Перевіряє чи активний курс (enabled). Якщо курс ще не доступний —
 * показує повідомлення “скоро” і пропонує перейти на /learn.
 *
 * Використовується:
 * Для блокування сторінок, коли користувач вибрав курс,
 * який ще не реалізований.
 *
 * Пов’язані файли:
 * - hooks/useActiveCourse.ts
 * - lib/course.ts (COURSES registry)
 * - CourseBootstrap
 * - сторінка /learn
 */

"use client";

import Link from "next/link";
import { useActiveCourse } from "@/hooks/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import { COURSES } from "@/lib/course";

type Lang = "ua" | "ru" | "en";

type CourseGateI18n = {
  fallbackCourse: string;
  soon: string;
  text: string;
  chooseLanguage: string;
  back: string;
};

const I18N: Record<Lang, CourseGateI18n> = {
  ua: {
    fallbackCourse: "Цей курс",
    soon: "скоро",
    text: "Цей курс ще недоступний. Вибери іншу доступну мову для навчання.",
    chooseLanguage: "Вибрати мову",
    back: "Назад",
  },
  ru: {
    fallbackCourse: "Этот курс",
    soon: "скоро",
    text: "Этот курс пока недоступен. Выбери другой доступный язык для обучения.",
    chooseLanguage: "Выбрать язык",
    back: "Назад",
  },
  en: {
    fallbackCourse: "This course",
    soon: "coming soon",
    text: "This course is not available yet. Choose another available language to continue learning.",
    chooseLanguage: "Choose language",
    back: "Back",
  },
};

export default function CourseGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { course, ready } = useActiveCourse();
  const { lang } = useLanguage();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = I18N[L];

  if (!ready) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="min-h-[220px] rounded-2xl border bg-white p-6" />
      </main>
    );
  }

  const def = COURSES.find((c) => c.id === course);

  if (!def || !def.enabled) {
    const name = def?.title ?? t.fallbackCourse;

    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10">
        <div className="min-h-[220px] rounded-2xl border bg-white p-6">
          <div className="text-xl font-semibold">
            {name} — {t.soon}
          </div>

          <p className="mt-2 text-slate-600">{t.text}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/learn"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              {t.chooseLanguage}
            </Link>

            <Link
              href="/learning"
              className="rounded-xl border px-4 py-2 text-sm font-medium"
            >
              {t.back}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}