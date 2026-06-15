"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { CefrBandId, Lang } from "@/app/learning/data";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  getLessonsProgress,
  type LessonProgressObj,
  type LessonsProgress,
  type LessonProgressValue,
} from "@/lib/src/progress";
import { getAudioPracticeItems } from "./data";

const TEXT: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    listen: string;
    dictation: string;
    all: string;
    open: string;
    best: string;
    noResult: string;
  }
> = {
  ua: {
    title: "Аудіопрактика",
    subtitle: "Короткі тексти для слухання, розуміння та диктанту.",
    listen: "Слухання",
    dictation: "Диктант",
    all: "Показати всі →",
    open: "Відкрити",
    best: "Кращий",
    noResult: "Ще не пройдено",
  },
  ru: {
    title: "Аудиопрактика",
    subtitle: "Короткие тексты для слушания, понимания и диктанта.",
    listen: "Слушание",
    dictation: "Диктант",
    all: "Показать все →",
    open: "Открыть",
    best: "Лучший",
    noResult: "Ещё не пройдено",
  },
  en: {
    title: "Audio practice",
    subtitle: "Short texts for listening, comprehension and dictation.",
    listen: "Listening",
    dictation: "Dictation",
    all: "Show all →",
    open: "Open",
    best: "Best",
    noResult: "Not completed yet",
  },
};

function pickLang(value: Lang): Lang {
  return value === "ru" || value === "en" ? value : "ua";
}

function progressKey(mode: "listening" | "dictation", itemId: string) {
  return `audioPractice:${mode}:${itemId}`;
}

function getProgressObj(
  progress: LessonsProgress,
  key: string,
): LessonProgressObj | null {
  const value: LessonProgressValue | undefined =
    progress[key] ?? progress[key.toLowerCase()];

  if (!value || value === true || typeof value !== "object") {
    return null;
  }

  return value as LessonProgressObj;
}

function getPercent(correct?: number, total?: number) {
  if (typeof correct !== "number" || typeof total !== "number" || total <= 0) {
    return null;
  }

  return Math.round((correct / total) * 100);
}

function ResultPill({
  label,
  progress,
}: {
  label: string;
  progress: LessonProgressObj | null;
}) {
  if (!progress) return null;

  const bestPercent = getPercent(progress.bestCorrect, progress.bestTotal);

  if (bestPercent === null) return null;

  return (
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2.5 py-1 text-xs font-black theme-text">
      {label}: {bestPercent}%
    </span>
  );
}

export default function AudioPracticeTeaser({ band }: { band: CefrBandId }) {
  const { lang } = useLanguage();
  const safeLang = pickLang(lang);
  const t = TEXT[safeLang];
  const { courseId } = useActiveCourse();

  const [progress, setProgress] = useState<LessonsProgress>({});

  useEffect(() => {
    const refresh = () => {
      setProgress(getLessonsProgress());
    };

    refresh();

    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    window.addEventListener("slovakStudy:progressChanged", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      window.removeEventListener("storage", refresh);
      window.removeEventListener("slovakStudy:progressChanged", refresh);
    };
  }, []);

  const items = useMemo(() => {
    return getAudioPracticeItems(courseId, band);
  }, [courseId, band]);

  const visibleItems = items.slice(0, 3);

  if (items.length === 0) return null;

  return (
    <section className="mt-14">
      <div className="mb-5 flex items-center gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight theme-text">
            🎧 {t.title}
          </h2>
          <p className="mt-1 text-sm theme-text-muted">{t.subtitle}</p>
        </div>

        <div className="theme-divider hidden flex-1 sm:block" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item) => {
          const title = item.title[safeLang] ?? item.title.ua;
          const description = item.description[safeLang] ?? item.description.ua;
          const href = `/learning/audio-practice/${item.courseId}/${item.band}/${item.slug}`;

          const listeningProgress = getProgressObj(
            progress,
            progressKey("listening", item.id),
          );

          const dictationProgress = getProgressObj(
            progress,
            progressKey("dictation", item.id),
          );

          const hasAnyResult = Boolean(listeningProgress || dictationProgress);

          return (
            <article
              key={item.id}
              className="flunio-card-soft rounded-3xl p-5 transition hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg font-black theme-text">{title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 theme-text-muted">
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

              <div className="mt-4 flex min-h-7 flex-wrap items-center gap-2">
                {hasAnyResult ? (
                  <>
                    <ResultPill label="🎧" progress={listeningProgress} />
                    <ResultPill label="✍️" progress={dictationProgress} />
                  </>
                ) : (
                  <span className="text-xs font-bold theme-text-subtle">
                    {t.noResult}
                  </span>
                )}
              </div>

              <Link
                href={href}
                className="theme-primary-button mt-4 inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.open}
              </Link>
            </article>
          );
        })}
      </div>

      {items.length > visibleItems.length ? (
        <div className="mt-5">
          <Link
            href={`/learning/audio-practice/${courseId}/${band}`}
            className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            {t.all}
          </Link>
        </div>
      ) : null}
    </section>
  );
}