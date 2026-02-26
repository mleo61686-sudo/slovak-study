"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { getSrsWordsFromLessons } from "@/app/learning/data";
import { useLanguage } from "@/lib/src/useLanguage";
import type { SrsState } from "@/lib/srs/srsWords";
import { isLearned, isMastered } from "@/lib/srs/srsWords";
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

const KEY = "slovakStudy.srsWords";
const DAILY_REVIEW_LIMIT = 30;
const DAILY_SESSION_KEY = "slovakStudy.srsDailySession";

const I18N = {
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

    // Premium analytics
    premiumTitle: "Твій прогрес уроків (Premium)",
    lessonsDone: "Уроків завершено",
    studyDays: "Днів навчання",
    currentStreak: "Серія (днів)",
    bestStreak: "Рекорд серії",
    premiumLocked: "🔒 Серії та рекорди — в Premium",
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

    // Premium analytics
    premiumTitle: "Твой прогресс уроков (Premium)",
    lessonsDone: "Уроков завершено",
    studyDays: "Дней обучения",
    currentStreak: "Серия (дней)",
    bestStreak: "Рекорд серии",
    premiumLocked: "🔒 Серии и рекорды — в Premium",
  },
} as const;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailySession(): { date: string; ids: string[] } | null {
  try {
    const raw = localStorage.getItem(DAILY_SESSION_KEY);
    if (!raw) return null;
    const s = JSON.parse(raw);
    if (s?.date === getTodayKey() && Array.isArray(s?.ids)) return s;
    return null;
  } catch {
    return null;
  }
}

function loadDb(): Record<string, SrsState> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function computeStats(db: Record<string, SrsState>, totalWords: number): Stats {
  const now = Date.now();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;

  const realDue = all.filter((s) => s.dueAt <= now).length;

  const daily = getDailySession();
  const due =
    daily && daily.ids.length > 0
      ? daily.ids.length
      : Math.min(realDue, DAILY_REVIEW_LIMIT);

  return { total: totalWords, learned, mastered, due };
}

// ===== Premium lesson analytics =====

function parseDoneAt(v: any): string | null {
  // підтримка: boolean true (старий формат) — без дати
  if (v === true) return null;

  if (v && typeof v === "object") {
    const done = v.done === true;
    if (!done) return null;

    const doneAt = typeof v.doneAt === "string" ? v.doneAt : null;
    if (doneAt && /^\d{4}-\d{2}-\d{2}$/.test(doneAt)) return doneAt;

    // fallback: updatedAt -> YYYY-MM-DD
    const updatedAt = typeof v.updatedAt === "string" ? v.updatedAt : null;
    if (updatedAt) {
      const day = updatedAt.slice(0, 10);
      if (/^\d{4}-\d{2}-\d{2}$/.test(day)) return day;
    }
  }

  return null;
}

function dayToInt(day: string): number {
  // YYYY-MM-DD -> days since epoch (UTC)
  const [y, m, d] = day.split("-").map((x) => parseInt(x, 10));
  const ms = Date.UTC(y, m - 1, d);
  return Math.floor(ms / 86400000);
}

function computeLessonAnalytics(): LessonAnalytics {
  const lessons = getLessonsProgress();
  const values = Object.values(lessons);

  // done count
  const lessonsDone = values.filter((v: any) =>
    v === true ? true : !!(v && typeof v === "object" && v.done === true)
  ).length;

  // dates set
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

  // best streak over all history
  let bestStreak = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    if (days[i] === days[i - 1] + 1) run += 1;
    else run = 1;
    if (run > bestStreak) bestStreak = run;
  }

  // current streak up to today
  const todayInt = dayToInt(getTodayKey());
  const hasToday = dateSet.has(getTodayKey());

  // if no activity today, streak can still be "ongoing" if last day was yesterday
  const lastInt = days[days.length - 1];
  let currentStreak = 0;

  if (hasToday || lastInt === todayInt - 1) {
    // Build int set for fast check
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
      <div className="text-[11px] text-slate-500 whitespace-nowrap overflow-hidden text-ellipsis">
        {label}
      </div>
      <div className="mt-1 text-2xl font-semibold tabular-nums leading-none">
        {value}
      </div>
    </div>
  );
}

export default function WordsStats() {
  const { lang } = useLanguage();
  const t = I18N[lang];
  const { data: session, status } = useSession();

  const isPremium = !!session?.user?.isPremium;

  // ✅ тепер беремо загальну кількість слів із уроків, а не з WORDS
  const allWords = useMemo(() => getSrsWordsFromLessons(), []);

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
      const db = loadDb();
      setStats(computeStats(db, allWords.length));

      // ✅ premium analytics (lightweight)
      setLessonA(computeLessonAnalytics());
    };

    update();
    window.addEventListener("focus", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("storage", update);
    };
  }, [allWords.length]);

  const progress =
    stats.total === 0 ? 0 : Math.round((stats.mastered / stats.total) * 100);

  const showPremiumBlock = status !== "loading";

  return (
    <section className="min-w-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
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

      {/* ✅ завжди 2x2 — стабільно в колонці */}
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
        <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div
            className="h-2 bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ✅ Premium: streak + records */}
      {showPremiumBlock ? (
        <div className="pt-2 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm font-semibold">⭐ {t.premiumTitle}</div>

            {!isPremium ? (
              <Link
                href="/premium"
                className="text-xs rounded-full border border-slate-200 px-3 py-1 hover:bg-slate-50"
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
            <div className="text-xs text-slate-500">
              {lang === "ru"
                ? "Premium открывает серии, рекорды и статистику уроков."
                : "Premium відкриває серії, рекорди та статистику уроків."}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}