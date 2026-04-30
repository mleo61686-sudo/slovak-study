/**
 * CourseGate – компонент-фільтр для multi-course системи Flunio.
 *
 * Що робить:
 * Перевіряє чи активний курс (live). Якщо курс ще не доступний —
 * показує повідомлення “скоро” і пропонує перейти на /learn.
 *
 * Використовується:
 * Для блокування сторінок, коли користувач вибрав курс,
 * який ще не реалізований.
 *
 * Пов’язані файли:
 * - app/learning/courses/useActiveCourse.ts
 * - app/learning/courses/registry.ts
 * - CourseBootstrap
 * - сторінка /learn
 */

"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

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
  const { course } = useActiveCourse();
  const { lang } = useLanguage();

  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = I18N[L];

  if (!course) {
    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 text-white">
        <div className="flunio-card min-h-[220px] rounded-3xl p-6" />
      </main>
    );
  }

  const isLive = course.status === "live";

  if (!isLive) {
    const name = course.title ?? t.fallbackCourse;

    return (
      <main className="mx-auto w-full max-w-3xl px-4 py-10 text-white">
        <div className="flunio-card relative min-h-[220px] overflow-hidden rounded-3xl p-6">
          <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

          <div className="relative">
            <div className="text-xl font-semibold text-white">
              {name} — {t.soon}
            </div>

            <p className="mt-2 text-white/65">{t.text}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/learn"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_22px_rgba(59,130,246,0.35)] transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.chooseLanguage}
              </Link>

              <Link
                href="/learning"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-cyan-400/45 bg-white/5 px-5 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
              >
                {t.back}
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}