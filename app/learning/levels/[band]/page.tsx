"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CEFR_LEVELS } from "../../data";
import type { LessonsProgress, LessonProgressValue } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";

export default function BandPage() {
  const params = useParams<{ band?: string }>();
  const bandId = String(params?.band || "").trim().toLowerCase();

  const { lang } = useLanguage();

  const band = useMemo(() => {
    return CEFR_LEVELS.find((b) => b.id === bandId) ?? null;
  }, [bandId]);

  const [progress, setProgress] = useState<LessonsProgress>({});

  useEffect(() => {
    const refresh = () => setProgress(getLessonsProgress());

    refresh();
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", refresh);

    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", refresh);
    };
  }, []);

  const isDone = (id: string) => {
    const v: LessonProgressValue | undefined = progress[id];
    return v === true || (typeof v === "object" && v?.done === true);
  };

  const getStats = (id: string) => {
    const v = progress[id];
    if (!v || v === true || typeof v !== "object") return null;

    if (typeof v.lastTotal === "number" && v.lastTotal > 0) {
      const lastCorrect = Number(v.lastCorrect ?? 0);
      const lastWrong =
        typeof v.lastWrong === "number"
          ? v.lastWrong
          : Math.max(0, v.lastTotal - lastCorrect);

      return { lastCorrect, lastWrong, lastTotal: v.lastTotal };
    }

    return null;
  };

  if (!band) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-bold">
          {lang === "ua" ? "Рівень не знайдено" : "Уровень не найден"}
        </h1>
        <p className="mt-2 text-slate-600">
          {lang === "ua" ? "Спробуй повернутися назад." : "Попробуй вернуться назад."}
        </p>

        <div className="mt-4 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-700">
          <div>
            <span className="font-medium">bandId:</span> {bandId || "(порожньо)"}
          </div>
          <div className="mt-2">
            <span className="font-medium">
              {lang === "ua" ? "Доступні рівні:" : "Доступные уровни:"}
            </span>{" "}
            {CEFR_LEVELS.map((x) => x.id).join(", ")}
          </div>
        </div>

        <Link
          className="mt-4 inline-block rounded-xl bg-black px-4 py-2 text-white"
          href="/learning"
        >
          {lang === "ua" ? "Назад" : "Назад"}
        </Link>
      </div>
    );
  }

  const doneCount = band.lessons.filter((l) => isDone(l.id)).length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{band.title[lang]}</h1>
          <p className="mt-2 text-slate-600">{band.subtitle[lang]}</p>
          <p className="mt-2 text-sm text-slate-500">
            {lang === "ua" ? "Прогрес" : "Прогресс"}: {doneCount}/{band.lessons.length} ·{" "}
            {lang === "ua" ? "Слів" : "Слов"}: {band.lessons.length * 10}
          </p>
        </div>

        <Link
          href="/learning"
          className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
        >
          ← {lang === "ua" ? "Назад" : "Назад"}
        </Link>
      </div>

      <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-2 rounded-full bg-black"
          style={{
            width:
              band.lessons.length === 0
                ? "0%"
                : `${Math.round((doneCount / band.lessons.length) * 100)}%`,
          }}
        />
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {band.lessons.map((lesson, idx) => {
          const done = isDone(lesson.id);
          const stats = getStats(lesson.id);

          const prev = band.lessons[idx - 1];
          const locked = idx > 0 && !isDone(prev.id);

          const cardClass = "rounded-2xl border bg-white p-4 hover:bg-slate-50";

          const lessonTitle = lesson.title[lang]; // ✅ головне

          if (locked) {
            return (
              <div
                key={lesson.id}
                className={`${cardClass} cursor-not-allowed opacity-60`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium">{lessonTitle}</div>
                  <div className="text-xs text-slate-500">
                    {lesson.wordsCount} {lang === "ua" ? "слів" : "слов"}
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-500">{lesson.id}</div>

                {stats && (
                  <div className="mt-1 text-xs text-slate-500">
                    ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} / {stats.lastTotal}
                  </div>
                )}

                <div className="mt-3 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm">
                  {lang === "ua" ? "Закрито" : "Закрыто"} 🔒
                </div>
              </div>
            );
          }

          return (
            <Link key={lesson.id} href={`/learning/${lesson.id}`} className={cardClass}>
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium">
                  {lessonTitle} {done ? "✅" : ""}
                </div>
                <div className="text-xs text-slate-500">
                  {lesson.wordsCount} {lang === "ua" ? "слів" : "слов"}
                </div>
              </div>

              <div className="mt-2 text-xs text-slate-500">{lesson.id}</div>

              {stats && (
                <div className="mt-1 text-xs text-slate-500">
                  ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} / {stats.lastTotal}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
