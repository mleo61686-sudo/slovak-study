"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CEFR_LEVELS } from "./data";
import type { LessonsProgress, LessonProgressValue } from "@/lib/src/progress";
import { getLessonsProgress } from "@/lib/src/progress";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

const dict = {
  ua: {
    title: "Навчання 📚",
    subtitle: "Обирай рівень (A0 → B2) і проходь уроки по 10 слів.",
    done: "Пройдено уроків:",
    lessons: "Уроків:",
    words: "Слів:",
    allLessons: "Всі уроки →",
    soon: "Скоро додамо уроки для цього рівня ✅",
    wordsCount: (n: number) => `${n} слів`,
    repeat: "Повторити",
    start: "Почати",
    locked: "Закрито 🔒",
  },
  ru: {
    title: "Обучение 📚",
    subtitle: "Выбирай уровень (A0 → B2) и проходи уроки по 10 слов.",
    done: "Пройдено уроков:",
    lessons: "Уроков:",
    words: "Слов:",
    allLessons: "Все уроки →",
    soon: "Скоро добавим уроки для этого уровня ✅",
    wordsCount: (n: number) => `${n} слов`,
    repeat: "Повторить",
    start: "Начать",
    locked: "Закрыто 🔒",
  },
} satisfies Record<Lang, any>;

// ===== Глобальна логіка порядку (як у server) =====

function parseLevelId(id: string) {
  const m = /^(a0|a1|a2|b1|b2)-(\d+)$/i.exec(String(id).toLowerCase());
  if (!m) return null;
  return { band: m[1].toLowerCase(), n: Number(m[2]) };
}

function bandOrder(band: string) {
  const b = String(band).toLowerCase();
  if (b === "a0") return 0;
  if (b === "a1") return 1;
  if (b === "a2") return 2;
  if (b === "b1") return 3;
  if (b === "b2") return 4;
  return 0;
}

function compareLevel(a: string, b: string) {
  // -1 якщо a < b, 0 якщо рівні, 1 якщо a > b
  const pa = parseLevelId(a);
  const pb = parseLevelId(b);
  if (!pa || !pb) return 0;

  const ba = bandOrder(pa.band);
  const bb = bandOrder(pb.band);
  if (ba !== bb) return ba < bb ? -1 : 1;

  if (pa.n === pb.n) return 0;
  return pa.n < pb.n ? -1 : 1;
}

function nextLevelId(id: string) {
  const p = parseLevelId(id);
  if (!p) return id;

  // якщо хочеш: після a0-30 → a1-1
  if (p.band === "a0" && Number.isFinite(p.n) && p.n >= 30) return "a1-1";
  return `${p.band}-${p.n + 1}`;
}

function getLastDone(progress: LessonsProgress) {
  let best: string | null = null;

  for (const [idRaw, val] of Object.entries(progress ?? {})) {
    const id = String(idRaw).toLowerCase();
    const p = parseLevelId(id);
    if (!p) continue;

    const done =
      val === true ||
      (val && typeof val === "object" && (val as any).done === true);

    if (!done) continue;

    if (!best) best = id;
    else if (compareLevel(id, best) === 1) best = id;
  }

  return best;
}

export default function LearningPage() {
  const [progress, setProgress] = useState<LessonsProgress>({});
  const { lang } = useLanguage() as { lang: Lang };
  const t = dict[lang];

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

  const completedCount = useMemo(
    () =>
      Object.values(progress).filter(
        (v) => v === true || (typeof v === "object" && v?.done === true)
      ).length,
    [progress]
  );

  // ✅ ГЛОБАЛЬНО дозволений “наступний” урок
  const allowed = useMemo(() => {
    const lastDone = getLastDone(progress);
    return lastDone ? nextLevelId(lastDone) : "a0-1";
  }, [progress]);

  // ✅ відкриті всі <= allowed (повторення можна), все що > allowed — закрито
  function isLessonUnlockedGlobal(lessonId: string) {
    return compareLevel(lessonId, allowed) <= 0;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="mt-2 text-slate-600">{t.subtitle}</p>

      <p className="mt-3 text-sm text-slate-500">
        {t.done} <span className="font-medium">{completedCount}</span>
      </p>

      <div className="mt-2 text-xs text-slate-500">
        Доступний зараз: <span className="font-medium">{allowed}</span>
      </div>

      <div className="mt-8 space-y-8">
        {CEFR_LEVELS.map((band) => (
          <section
            key={band.id}
            className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold">{band.title[lang]}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {band.subtitle[lang]}
                </p>

                <p className="mt-2 text-xs text-slate-500">
                  {t.lessons} {band.lessons.length} · {t.words}{" "}
                  {band.lessons.length * 10}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/learning/levels/${band.id}`}
                  className="rounded-xl border px-3 py-1 text-xs font-medium hover:bg-slate-50"
                >
                  {t.allLessons}
                </Link>

                <span className="rounded-full border px-3 py-1 text-xs text-slate-600">
                  {band.id.toUpperCase()}
                </span>
              </div>
            </div>

            {band.lessons.length === 0 ? (
              <div className="mt-5 rounded-2xl border bg-slate-50 p-4 text-sm text-slate-600">
                {t.soon}
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {band.lessons.slice(0, 4).map((lesson) => {
                  const unlocked = isLessonUnlockedGlobal(lesson.id);
                  const done = isDone(lesson.id);
                  const stats = getStats(lesson.id);

                  return (
                    <div
                      key={lesson.id}
                      className={`rounded-2xl border p-4 ${
                        unlocked ? "hover:bg-slate-50" : "opacity-60"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">
                          {lesson.title[lang]} {done ? "✅" : ""}
                        </div>
                        <div className="text-sm text-slate-500">
                          {t.wordsCount(lesson.wordsCount)}
                        </div>
                      </div>

                      {stats && (
                        <div className="mt-1 text-xs text-slate-500">
                          ✅ {stats.lastCorrect} • ❌ {stats.lastWrong} /{" "}
                          {stats.lastTotal}
                        </div>
                      )}

                      <div className="mt-3 flex justify-end">
                        {unlocked ? (
                          <Link
                            href={`/learning/${lesson.id}`}
                            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white"
                          >
                            {lesson.id === allowed && !done ? t.start : t.repeat}
                          </Link>
                        ) : (
                          <button
                            disabled
                            className="rounded-xl border px-4 py-2 text-sm text-slate-600"
                          >
                            {t.locked}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
