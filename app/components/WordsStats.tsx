"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { WORDS } from "@/app/data/words";
import { useLanguage } from "@/lib/src/useLanguage";
import type { SrsState } from "@/lib/srs/srsWords";
import { isLearned, isMastered } from "@/lib/srs/srsWords";

type Stats = {
  total: number;
  learned: number;
  mastered: number;
  due: number;
};

const KEY = "slovakStudy.srsWords";

// ✅ same rules as /practice/words
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
  },
} as const;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
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

  // ✅ show only today's batch (max 30), don't accumulate backlog
  const daily = getDailySession();
  const due =
    daily && daily.ids.length > 0
      ? daily.ids.length
      : Math.min(realDue, DAILY_REVIEW_LIMIT);

  return { total: totalWords, learned, mastered, due };
}

export default function WordsStats() {
  const { lang } = useLanguage();
  const t = I18N[lang];

  const [stats, setStats] = useState<Stats>({
    total: WORDS.length,
    learned: 0,
    mastered: 0,
    due: 0,
  });

  useEffect(() => {
    const update = () => {
      const db = loadDb();
      setStats(computeStats(db, WORDS.length));
    };

    update();

    // refresh when returning to tab or when other tab changes localStorage
    window.addEventListener("focus", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("focus", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  const progress =
    stats.total === 0 ? 0 : Math.round((stats.mastered / stats.total) * 100);

  return (
    <section className="rounded-3xl border bg-white p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">📊 {t.title}</h2>

        {stats.due > 0 ? (
          <Link
            href="/practice/words"
            className="rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
          >
            {t.repeat} {stats.due} →
          </Link>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-green-600">{t.done}</span>
            <Link
              href="/practice/words"
              className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
            >
              {t.addNew} →
            </Link>
          </div>
        )}
      </div>

      <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border p-4 flex flex-col justify-between h-full">
          <div className="text-xs text-gray-500">{t.total}</div>
          <div className="text-3xl font-semibold leading-none">
            {stats.total}
          </div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-xs text-gray-500">{t.learned}</div>
          <div className="text-2xl font-semibold">{stats.learned}</div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-xs text-gray-500">{t.mastered}</div>
          <div className="text-2xl font-semibold">{stats.mastered}</div>
        </div>

        <div className="rounded-2xl border p-4">
          <div className="text-xs text-gray-500">{t.due}</div>
          <div className="text-2xl font-semibold">{stats.due}</div>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-xs text-gray-500">
          {t.progress}: {progress}%
        </div>
        <div className="h-2 w-full rounded-full bg-slate-200">
          <div
            className="h-2 rounded-full bg-black transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
