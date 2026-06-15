"use client";

import Link from "next/link";

import type { CefrBandId, Lang } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";
import { useLanguage } from "@/lib/src/useLanguage";
import type { AudioPracticeItem } from "./data";

const TEXT: Record<
  Lang,
  {
    back: string;
    title: string;
    subtitle: string;
    empty: string;
    listen: string;
    dictation: string;
    open: string;
  }
> = {
  ua: {
    back: "Назад до рівня",
    title: "Аудіопрактика",
    subtitle: "Слухай короткі тексти, відповідай на питання або тренуй диктант.",
    empty: "Для цього рівня поки немає аудіопрактики.",
    listen: "Слухання",
    dictation: "Диктант",
    open: "Відкрити",
  },
  ru: {
    back: "Назад к уровню",
    title: "Аудиопрактика",
    subtitle: "Слушай короткие тексты, отвечай на вопросы или тренируй диктант.",
    empty: "Для этого уровня пока нет аудиопрактики.",
    listen: "Слушание",
    dictation: "Диктант",
    open: "Открыть",
  },
  en: {
    back: "Back to level",
    title: "Audio practice",
    subtitle: "Listen to short texts, answer questions or practise dictation.",
    empty: "There is no audio practice for this level yet.",
    listen: "Listening",
    dictation: "Dictation",
    open: "Open",
  },
};

const COURSE_LABELS: Record<CourseId, string> = {
  sk: "🇸🇰 Slovak",
  cs: "🇨🇿 Czech",
  pl: "🇵🇱 Polish",
};

function pickLang(value: Lang): Lang {
  return value === "ru" || value === "en" ? value : "ua";
}

export default function AudioPracticeListClient({
  courseId,
  band,
  items,
}: {
  courseId: CourseId;
  band: CefrBandId;
  items: AudioPracticeItem[];
}) {
  const { lang } = useLanguage();
  const safeLang = pickLang(lang);
  const t = TEXT[safeLang];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-14 h-44 w-44 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="theme-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase">
              {COURSE_LABELS[courseId]} · {band.toUpperCase()}
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight theme-text">
              🎧 {t.title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 theme-text-muted">
              {t.subtitle}
            </p>
          </div>

          <Link
            href={`/learning/levels/${band}`}
            className="theme-secondary-button inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            ← {t.back}
          </Link>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flunio-card mt-6 rounded-3xl p-6 text-sm theme-text-muted">
          {t.empty}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => {
            const title = item.title[safeLang] ?? item.title.ua;
            const description = item.description[safeLang] ?? item.description.ua;

            return (
              <article
                key={item.id}
                className="flunio-card-soft rounded-3xl p-5 transition hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-black theme-text">{title}</h2>

                    <p className="mt-2 text-sm leading-6 theme-text-muted">
                      {description}
                    </p>
                  </div>

                  <span className="theme-pill shrink-0 rounded-full px-3 py-1 text-xs font-black uppercase">
                    {item.band}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-bold theme-text-subtle">
                  <span>🎧 {t.listen}</span>
                  <span>·</span>
                  <span>✍️ {t.dictation}</span>
                  {item.durationLabel ? (
                    <>
                      <span>·</span>
                      <span>{item.durationLabel}</span>
                    </>
                  ) : null}
                </div>

                <Link
                  href={`/learning/audio-practice/${item.courseId}/${item.band}/${item.slug}`}
                  className="theme-primary-button mt-5 inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t.open} →
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}