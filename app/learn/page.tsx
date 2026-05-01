"use client";

import {
  COURSE_REGISTRY,
  type CourseId,
} from "@/app/learning/courses/registry";
import { setStoredCourseId } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

const dict = {
  ua: {
    title: "Обери мову",
    subtitle: "Вибери, що хочеш вивчати. Це можна змінити будь-коли.",
    comingSoon: "Скоро",
    descriptions: {
      sk: "Словацька мова для життя, роботи та переїзду.",
      cs: "Чеська мова для життя, роботи та навчання.",
      pl: "Польська мова для життя, роботи та навчання.",
    },
    subtitles: {
      sk: "Slovenčina",
      cs: "Čeština",
      pl: "Polski",
    },
  },
  ru: {
    title: "Выбери язык",
    subtitle: "Выбери, что хочешь изучать. Это можно изменить в любой момент.",
    comingSoon: "Скоро",
    descriptions: {
      sk: "Словацкий язык для жизни, работы и переезда.",
      cs: "Чешский язык для жизни, работы и учёбы.",
      pl: "Польский язык для жизни, работы и учёбы.",
    },
    subtitles: {
      sk: "Slovenčina",
      cs: "Čeština",
      pl: "Polski",
    },
  },
  en: {
    title: "Choose a language",
    subtitle: "Choose what you want to learn. You can change it anytime.",
    comingSoon: "Coming soon",
    descriptions: {
      sk: "Slovak for life, work, and relocation.",
      cs: "Czech for life, work, and study.",
      pl: "Polish for life, work, and study.",
    },
    subtitles: {
      sk: "Slovenčina",
      cs: "Čeština",
      pl: "Polski",
    },
  },
} satisfies Record<
  Lang,
  {
    title: string;
    subtitle: string;
    comingSoon: string;
    descriptions: Record<CourseId, string>;
    subtitles: Record<CourseId, string>;
  }
>;

const COURSE_ORDER = ["sk", "cs", "pl"] as const satisfies readonly CourseId[];

const COURSE_FLAGS: Record<CourseId, string> = {
  sk: "https://flagcdn.com/w40/sk.png",
  cs: "https://flagcdn.com/w40/cz.png",
  pl: "https://flagcdn.com/w40/pl.png",
};

export default function LearnPage() {
  const { lang } = useLanguage();
  const safeLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = dict[safeLang];

  function chooseCourse(id: CourseId, isLive: boolean) {
    if (!isLive) return;

    setStoredCourseId(id);
    window.location.href = "/learning";
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 theme-text">
      <div className="flunio-card relative mb-8 overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <div className="theme-pill mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Flunio · Courses
          </div>

          <h1 className="text-3xl font-bold tracking-tight theme-text sm:text-4xl">
            {t.title}
          </h1>

          <p className="mt-3 max-w-2xl text-base leading-relaxed theme-text-muted">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {COURSE_ORDER.map((id, index) => {
          const course = COURSE_REGISTRY[id];
          const isLive = course.status === "live";

          return (
            <button
              key={course.id}
              onClick={() => chooseCourse(course.id, isLive)}
              className="learn-course-card rounded-3xl p-5 text-left theme-text transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!isLive}
              type="button"
              data-onboarding={
                isLive && index === 0 ? "course-card" : undefined
              }
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-xl font-semibold theme-text">
                    <img
                      src={COURSE_FLAGS[course.id]}
                      alt=""
                      className="h-5 w-7 rounded-sm object-cover shadow-sm"
                      loading="lazy"
                    />

                    <span>{course.title}</span>
                  </div>

                  <div className="mt-1 text-sm theme-accent-text">
                    {t.subtitles[course.id]}
                  </div>

                  <div className="mt-3 text-sm leading-relaxed theme-text-muted">
                    {t.descriptions[course.id]}
                  </div>
                </div>

                {!isLive && (
                  <span className="theme-pill shrink-0 rounded-full px-3 py-1 text-xs font-semibold">
                    {t.comingSoon}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </main>
  );
}