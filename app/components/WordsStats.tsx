"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getSrsWordsForCourse } from "@/app/learning/courses/dictionary";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import type { SrsState } from "@/lib/srs/srsWords";
import {
  isLearned,
  isMastered,
  loadDb as loadSrsDb,
  migrateSrsIfNeeded,
} from "@/lib/srs/srsWords";
import { getLessonsProgress } from "@/lib/src/progress";

type Stats = {
  total: number;
  learned: number;
  mastered: number;
  due: number;
};

type LessonAnalytics = {
  lessonsDone: number;
  studyDays: number;
  currentStreak: number;
  bestStreak: number;
};

const DAILY_REVIEW_LIMIT = 30;

const I18N: Record<
  Lang,
  {
    title: string;
    repeat: string;
    done: string;
    addNew: string;
    total: string;
    learned: string;
    mastered: string;
    due: string;
    progress: string;
    premiumTitle: string;
    lessonsDone: string;
    studyDays: string;
    currentStreak: string;
    bestStreak: string;
    premiumLocked: string;
    premiumHint: string;
  }
> = {
  ua: {
    title: "Твій прогрес слів",
    repeat: "Повторити",
    done: "✅ Сьогодні все зроблено",
    addNew: "Додати нові слова",
    total: "Всього слів",
    learned: "Вчив",
    mastered: "Вивчив",
    due: "На сьогодні",
    progress: "Прогрес",
    premiumTitle: "Твій прогрес уроків (Premium)",
    lessonsDone: "Уроків завершено",
    studyDays: "Днів навчання",
    currentStreak: "Серія (днів)",
    bestStreak: "Рекорд серії",
    premiumLocked: "🔒 Серії та рекорди — в Premium",
    premiumHint: "Premium відкриває серії, рекорди та статистику уроків.",
  },
  ru: {
    title: "Твой прогресс слов",
    repeat: "Повторить",
    done: "✅ Сегодня всё сделано",
    addNew: "Добавить новые слова",
    total: "Всего слов",
    learned: "Учил",
    mastered: "Выучил",
    due: "На сегодня",
    progress: "Прогресс",
    premiumTitle: "Твой прогресс уроков (Premium)",
    lessonsDone: "Уроков завершено",
    studyDays: "Дней обучения",
    currentStreak: "Серия (дней)",
    bestStreak: "Рекорд серии",
    premiumLocked: "🔒 Серии и рекорды — в Premium",
    premiumHint: "Premium открывает серии, рекорды и статистику уроков.",
  },
  en: {
    title: "Your word progress",
    repeat: "Review",
    done: "✅ Everything is done for today",
    addNew: "Add new words",
    total: "Total words",
    learned: "Learned",
    mastered: "Mastered",
    due: "Due today",
    progress: "Progress",
    premiumTitle: "Your lesson progress (Premium)",
    lessonsDone: "Lessons completed",
    studyDays: "Study days",
    currentStreak: "Current streak",
    bestStreak: "Best streak",
    premiumLocked: "🔒 Streaks and records — Premium",
    premiumHint: "Premium unlocks streaks, records, and lesson analytics.",
  },
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailySession(userId: string): { date: string; ids: string[] } | null {
  try {
    const raw = localStorage.getItem(`slovakStudy.srsDailySession:${userId}`);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s?.date === getTodayKey() && Array.isArray(s?.ids)) return s;
    return null;
  } catch {
    return null;
  }
}

function computeStats(
  db: Record<string, SrsState>,
  totalWords: number,
  userId: string
): Stats {
  const now = Date.now();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;

  const realDue = all.filter((s) => s.dueAt <= now).length;

  const daily = getDailySession(userId);
  const due =
    daily && daily.ids.length > 0
      ? daily.ids.length
      : Math.min(realDue, DAILY_REVIEW_LIMIT);

  return { total: totalWords, learned, mastered, due };
}

// ===== Premium lesson analytics =====

function parseDoneAt(v: unknown): string | null {
  if (v === true) return null;

  if (v && typeof v === "object") {
    const record = v as {
      done?: boolean;
      doneAt?: string;
      updatedAt?: string;
    };

    const done = record.done === true;
    if (!done) return null;

    const doneAt = typeof record.doneAt === "string" ? record.doneAt : null;
    if (doneAt && /^\d{4}-\d{2}-\d{2}$/.test(doneAt)) return doneAt;

    const updatedAt =
      typeof record.updatedAt === "string" ? record.updatedAt : null;
    if (updatedAt) {
      const day = updatedAt.slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(day)) return day;
    }
  }

  return null;
}

function dayToInt(day: string): number {
  const [y, m, d] = day.split("-").map((x) => parseInt(x, 10));
  const ms = Date.UTC(y, m - 1, d);
  return Math.floor(ms / 86400000);
}

function computeLessonAnalytics(): LessonAnalytics {
  const lessons = getLessonsProgress();
  const values = Object.values(lessons);

  const lessonsDone = values.filter((v: unknown) =>
    v === true
      ? true
      : !!(
          v &&
          typeof v === "object" &&
          "done" in v &&
          (v as { done?: boolean }).done === true
        )
  ).length;

  const dateSet = new Set<string>();
  for (const v of values) {
    const day = parseDoneAt(v);
    if (day) dateSet.add(day);
  }

  const studyDays = dateSet.size;

  if (studyDays === 0) {
    return { lessonsDone, studyDays: 0, currentStreak: 0, bestStreak: 0 };
  }

  const days = Array.from(dateSet)
    .map(dayToInt)
    .sort((a, b) => a - b);

  let bestStreak = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] === days[i - 1] + 1) run += 1;
    else run = 1;
    if (run > bestStreak) bestStreak = run;
  }

  const todayInt = dayToInt(getTodayKey());
  const hasToday = dateSet.has(getTodayKey());

  const lastInt = days[days.length - 1];
  let currentStreak = 0;

  if (hasToday || lastInt === todayInt - 1) {
    const intSet = new Set(days);

    currentStreak = 1;
    let cursor = lastInt;
    while (intSet.has(cursor - 1)) {
      currentStreak += 1;
      cursor -= 1;
    }
  } else {
    currentStreak = 0;
  }

  return { lessonsDone, studyDays, currentStreak, bestStreak };
}

function StatTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-3">
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold leading-none tabular-nums">
        {value}
      </div>
    </div>
  );
}

export default function WordsStats() {
  const { lang } = useLanguage();
  const t = I18N[lang] ?? I18N.ua;
  const { data: session, status } = useSession();

  const isPremium = !!session?.user?.isPremium;
  const { courseId } = useActiveCourse();

  const allWords = useMemo(() => getSrsWordsForCourse(courseId), [courseId]);

  const [stats, setStats] = useState<Stats>({
    total: allWords.length,
    learned: 0,
    mastered: 0,
    due: 0,
  });

  const [lessonA, setLessonA] = useState<LessonAnalytics>({
    lessonsDone: 0,
    studyDays: 0,
    currentStreak: 0,
    bestStreak: 0,
  });

  useEffect(() => {
    const update = () => {
      if (status !== "authenticated") {
        setStats({
          total: allWords.length,
          learned: 0,
          mastered: 0,
          due: 0,
        });

        setLessonA({
          lessonsDone: 0,
          studyDays: 0,
          currentStreak: 0,
          bestStreak: 0,
        });

        return;
      }

      const userId = String(session?.user?.id ?? "");
      if (!userId) return;

      migrateSrsIfNeeded(userId);

      const db = loadSrsDb(userId);
      setStats(computeStats(db, allWords.length, userId));
      setLessonA(computeLessonAnalytics());
    };

    update();
    window.addEventListener("focus", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("storage", update);
    };
  }, [allWords.length, status, session]);

  const progress =
    stats.total === 0 ? 0 : Math.round((stats.mastered / stats.total) * 100);

  const showPremiumBlock = status !== "loading";

  return (
    <section className="min-w-0 space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">📊 {t.title}</h2>

        {stats.due > 0 ? (
          <Link
            href="/words"
            className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            {t.repeat} {stats.due} →
          </Link>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-green-600">{t.done}</span>
            <Link
              href="/words"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
            >
              {t.addNew} →
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <StatTile label={t.total} value={stats.total} />
        <StatTile label={t.learned} value={stats.learned} />
        <StatTile label={t.mastered} value={stats.mastered} />
        <StatTile label={t.due} value={stats.due} />
      </div>

      <div className="space-y-1">
        <div className="text-xs text-slate-500">
          {t.progress}: {progress}%
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-2 bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {showPremiumBlock ? (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">⭐ {t.premiumTitle}</div>

            {!isPremium ? (
              <Link
                href="/premium"
                className="rounded-full border border-slate-200 px-3 py-1 text-xs hover:bg-slate-50"
              >
                {t.premiumLocked}
              </Link>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <StatTile
              label={t.currentStreak}
              value={isPremium ? lessonA.currentStreak : 0}
            />
            <StatTile
              label={t.bestStreak}
              value={isPremium ? lessonA.bestStreak : 0}
            />
            <StatTile
              label={t.studyDays}
              value={isPremium ? lessonA.studyDays : 0}
            />
            <StatTile
              label={t.lessonsDone}
              value={isPremium ? lessonA.lessonsDone : 0}
            />
          </div>

          {!isPremium ? (
            <div className="text-xs text-slate-500">{t.premiumHint}</div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}