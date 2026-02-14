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
    </section>
  );
}
