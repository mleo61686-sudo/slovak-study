"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { WORDS, type Word } from "@/app/data/words";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  isLearned as _isLearned,
  isMastered as _isMastered,
} from "@/lib/srs/srsWords";

type SrsState = {
  id: string; // word.sk
  dueAt: number;
  interval: number; // days
  ease: number;
  reps: number;
};

type Stats = {
  total: number;
  learned: number;
  mastered: number;
  due: number;
};

const KEY = "slovakStudy.srsWords";
const DAY = 1000 * 60 * 60 * 24;

// ✅ Хочеш 30 нових слів на день
const DAILY_NEW_LIMIT = 30;
const DAILY_KEY = "slovakStudy.dailyNewWords";

// ✅ Сеанс повторення (скільки показувати за один раз)
const SESSION_SIZE = 30;

// ✅ Forgot → повертається швидко
const FORGOT_MINUTES = 10;

// ✅ НЕ НАКОПИЧУЄМО БОРГ: максимум 30 повторень на день
const DAILY_REVIEW_LIMIT = 30;
const DAILY_SESSION_KEY = "slovakStudy.srsDailySession";

const I18N = {
  ua: {
    title: "Слова (SRS)",
    today: "На сьогодні",
    back: "Назад",
    add30: "Додати 30",
    total: "Всього слів",
    mastered: "Вивчив",
    learned: "Вчив",
    due: "На сьогодні",
    left: "Залишилось",
    showAnswer: "Показати відповідь",
    noDueTitle: "🎉 Немає слів для повторення сьогодні",
    noDueText: "Натисни “Додати 30”.",
    sessionDone: "✅ Сеанс завершено",
    nextSession: "Взяти наступні",
    skip: "Пропустити",
    forgot: "Забув",
    hard: "Важко",
    good: "Добре",
    easy: "Легко",
    dailyLimit: "Ліміт нових слів на сьогодні вичерпано 🙂",
    noNew: "Немає нових слів 🙂",
    nextIn: (days: number) => `📆 Наступне повторення через ${days} днів`,
    nextSoon: `⏳ Наступне повторення через ${FORGOT_MINUTES} хв`,
  },
  ru: {
    title: "Слова (SRS)",
    today: "На сегодня",
    back: "Назад",
    add30: "Добавить 30",
    total: "Всего слов",
    learned: "Учил",
    mastered: "Выучил",
    due: "На сегодня",
    left: "Осталось",
    showAnswer: "Показать ответ",
    noDueTitle: "🎉 Сегодня нет слов для повторения",
    noDueText: "Нажми “Добавить 30”.",
    sessionDone: "✅ Сеанс завершён",
    nextSession: "Взять следующие",
    skip: "Пропустить",
    forgot: "Забыл",
    hard: "Сложно",
    good: "Хорошо",
    easy: "Легко",
    dailyLimit: "Лимит новых слов на сегодня исчерпан 🙂",
    noNew: "Нет новых слов 🙂",
    nextIn: (days: number) => `📆 Следующее повторение через ${days} дней`,
    nextSoon: `⏳ Следующее повторение через ${FORGOT_MINUTES} мин`,
  },
} as const;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function getDailyState(): { date: string; count: number } {
  const raw = localStorage.getItem(DAILY_KEY);
  if (!raw) return { date: getTodayKey(), count: 0 };
  try {
    const parsed = JSON.parse(raw);
    return {
      date: typeof parsed?.date === "string" ? parsed.date : getTodayKey(),
      count: typeof parsed?.count === "number" ? parsed.count : 0,
    };
  } catch {
    return { date: getTodayKey(), count: 0 };
  }
}

function setDailyState(count: number) {
  localStorage.setItem(DAILY_KEY, JSON.stringify({ date: getTodayKey(), count }));
}

// ✅ “Порція повторення на день” (щоб не було 60, якщо пропустив день)
type DailySession = { date: string; ids: string[] };

function getDailySession(): DailySession | null {
  const raw = localStorage.getItem(DAILY_SESSION_KEY);
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if (typeof s?.date === "string" && Array.isArray(s?.ids)) return s;
    return null;
  } catch {
    return null;
  }
}

function setDailySession(ids: string[]) {
  localStorage.setItem(DAILY_SESSION_KEY, JSON.stringify({ date: getTodayKey(), ids }));
}

function loadDb(): Record<string, SrsState> {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

function saveDb(db: Record<string, SrsState>) {
  localStorage.setItem(KEY, JSON.stringify(db));
}

function initState(id: string): SrsState {
  return { id, dueAt: Date.now(), interval: 0, ease: 2.5, reps: 0 };
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function applyReview(prev: SrsState, grade: 0 | 1 | 2 | 3): SrsState {
  let { ease, interval, reps } = prev;

  // ✅ forgot → швидко повертаємо (10 хв)
  if (grade === 0) {
    return {
      ...prev,
      reps: 0,
      interval: 0,
      ease: Math.max(1.3, ease - 0.2),
      dueAt: Date.now() + FORGOT_MINUTES * 60 * 1000,
    };
  }

  if (grade === 1) ease -= 0.15;
  if (grade === 2) ease += 0.05;
  if (grade === 3) ease += 0.15;
  ease = Math.max(1.3, Math.min(3.2, ease));

  reps++;

  if (reps === 1) {
    if (grade === 1) interval = 1;
    else if (grade === 2) interval = 2;
    else interval = 3;
  } else if (reps === 2) {
    interval = 3;
  } else {
    interval = Math.max(1, Math.round(interval * ease));
  }

  if (grade === 1 && reps > 1) {
    interval = Math.max(1, Math.round(interval * 0.6));
  }

  return {
    ...prev,
    ease,
    reps,
    interval,
    dueAt: Date.now() + interval * DAY,
  };
}

const isLearned = (s: SrsState) => _isLearned(s as any);
const isMastered = (s: SrsState) => _isMastered(s as any);

function computeStats(db: Record<string, SrsState>, totalWords: number): Stats {
  const now = Date.now();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;
  const due = all.filter((s) => s.dueAt <= now).length;

  return { total: totalWords, learned, mastered, due };
}

function getDueSorted(words: Word[], db: Record<string, SrsState>): Word[] {
  const now = Date.now();

  return words
    .filter((w) => !!db[w.sk]) // тільки активовані
    .map((w) => ({ w, dueAt: db[w.sk]!.dueAt }))
    .filter((x) => x.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .map((x) => x.w);
}

export default function WordsSrsPage({ backHref }: { backHref: string }) {
  const { lang } = useLanguage();
  const t = I18N[lang];

  const allWords = useMemo(() => WORDS, []);
  const [db, setDb] = useState<Record<string, SrsState>>({});

  const [queue, setQueue] = useState<Word[]>([]);
  const [current, setCurrent] = useState<Word | null>(null);
  const [show, setShow] = useState(false);

  const [lastInfo, setLastInfo] = useState<string>("");
  const [isGrading, setIsGrading] = useState(false);

  const [stats, setStats] = useState<Stats>({
    total: allWords.length,
    learned: 0,
    mastered: 0,
    due: 0,
  });

  useEffect(() => {
    const initial = loadDb();
    startNewSession(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allWords]);

  function startNewSession(nextDb?: Record<string, SrsState>) {
    const updated = nextDb ?? loadDb();
    const dueAll = getDueSorted(allWords, updated);
    const dueIds = dueAll.map((w) => w.sk);

    const today = getTodayKey();
    const saved = getDailySession();

    const target = Math.min(DAILY_REVIEW_LIMIT, dueIds.length);

    let ids: string[] = [];

    if (saved?.date === today) {
      // 1) лишаємо тільки реально due з того, що було в saved
      const dueSet = new Set(dueIds);
      ids = saved.ids.filter((id) => dueSet.has(id));

      // 2) ✅ якщо з’явилися нові due (напр. після "Додати 30") — дозаповнюємо
      if (ids.length < target) {
        const picked = new Set(ids);
        for (const id of dueIds) {
          if (picked.has(id)) continue;
          ids.push(id);
          picked.add(id);
          if (ids.length >= target) break;
        }
      }

      // 3) якщо ids змінилися — оновлюємо saved session
      setDailySession(ids);
    } else {
      ids = dueIds.slice(0, target);
      setDailySession(ids);
    }

    const byId = new Map(allWords.map((w) => [w.sk, w]));
    const session = ids.map((id) => byId.get(id)).filter(Boolean) as Word[];

    const limited = session.slice(0, SESSION_SIZE);

    setDb(updated);
    setQueue(limited);
    setCurrent(limited[0] || null);
    setShow(false);
    setLastInfo("");
    setIsGrading(false);

    setStats(computeStats(updated, allWords.length));
  }

  function addNewWordsRandom(count: number) {
    const daily = getDailyState();

    if (daily.date !== getTodayKey()) {
      daily.count = 0;
    }

    const remaining = DAILY_NEW_LIMIT - daily.count;
    if (remaining <= 0) {
      alert(t.dailyLimit);
      return;
    }

    const updated = loadDb();

    const pool = allWords.filter((w) => !updated[w.sk]);
    const toAdd = shuffle(pool).slice(0, Math.min(count, remaining));

    if (toAdd.length === 0) {
      alert(t.noNew);
      return;
    }

    for (const w of toAdd) {
      updated[w.sk] = initState(w.sk);
    }

    saveDb(updated);
    setDailyState(daily.count + toAdd.length);

    // ✅ тепер startNewSession сам “дозаповнить” сьогоднішню порцію новими due
    startNewSession(updated);
  }

  function goNext() {
    const rest = queue.filter((w) => w.sk !== current?.sk);
    setQueue(rest);
    setCurrent(rest[0] || null);
    setShow(false);
    setLastInfo("");
    setIsGrading(false);
  }

  function grade(g: 0 | 1 | 2 | 3) {
    if (!current) return;
    if (isGrading) return;

    setIsGrading(true);
    const curWord = current;

    const updated = { ...db };
    const prev = updated[curWord.sk] ?? initState(curWord.sk);
    const next = applyReview(prev, g);
    updated[curWord.sk] = next;

    if (g === 0) {
      setLastInfo(
        lang === "ua"
          ? "🔁 Повторимо ще раз у цьому сеансі"
          : "🔁 Повторим ещё раз в этом сеансе"
      );
    } else if (next.interval <= 1) {
      setLastInfo(
        lang === "ua"
          ? "⏳ Наступне повторення — завтра"
          : "⏳ Следующее повторение — завтра"
      );
    } else {
      setLastInfo(t.nextIn(next.interval));
    }

    saveDb(updated);
    setDb(updated);
    setStats(computeStats(updated, allWords.length));

    setTimeout(() => {
      if (g === 0) {
        setQueue((q) => {
          const rest = q.filter((w) => w.sk !== curWord.sk);
          const nextQueue = [...rest, curWord];
          setCurrent(nextQueue[0] || null);
          return nextQueue;
        });

        setShow(false);
        setLastInfo("");
        setIsGrading(false);
        return;
      }

      goNext();
    }, 900);
  }

  function skip() {
    if (!current) return;
    if (isGrading) return;

    const rest = queue.filter((w) => w.sk !== current.sk);
    const next = [...rest, current];

    setQueue(next);
    setCurrent(next[0] || null);
    setShow(false);
    setLastInfo("");
  }

  const left = current ? queue.length : 0;

  const translation =
    !current ? "" : lang === "ru" ? current.ru || current.ua || "" : current.ua || "";

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">🧠 {t.title}</h1>
          <div className="text-sm text-gray-600">
            {t.today}: <b>{Math.min(stats.due, DAILY_REVIEW_LIMIT)}</b> · {t.left}:{" "}
            <b>{left}</b>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => addNewWordsRandom(30)}
            className="rounded-xl bg-slate-900 px-3 py-2 text-sm text-white hover:opacity-90"
          >
            ＋ {t.add30}
          </button>

          <Link
            href={backHref}
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            ← {t.back}
          </Link>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-4">
        <div className="rounded-xl border bg-white p-3">
          <div className="text-xs text-gray-500">{t.total}</div>
          <div className="text-xl font-semibold">{stats.total}</div>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <div className="text-xs text-gray-500">{t.learned}</div>
          <div className="text-xl font-semibold">{stats.learned}</div>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <div className="text-xs text-gray-500">{t.mastered}</div>
          <div className="text-xl font-semibold">{stats.mastered}</div>
        </div>
        <div className="rounded-xl border bg-white p-3">
          <div className="text-xs text-gray-500">{t.due}</div>
          <div className="text-xl font-semibold">
            {Math.min(stats.due, DAILY_REVIEW_LIMIT)}
          </div>
        </div>
      </div>

      {!current ? (
        Math.min(stats.due, DAILY_REVIEW_LIMIT) === 0 ? (
          <div className="rounded-2xl border bg-white p-6">
            <div className="text-lg">{t.noDueTitle}</div>
            <div className="mt-2 text-sm text-gray-600">{t.noDueText}</div>
          </div>
        ) : (
          <div className="rounded-2xl border bg-white p-6">
            <div className="text-lg">{t.sessionDone}</div>
            <div className="mt-3">
              <button
                onClick={() => startNewSession()}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
              >
                {t.nextSession}
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <div className="text-sm text-gray-500">
            {t.left}: {queue.length}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold">{current.sk}</div>
            <SpeakButton text={current.sk} />
            {show && (current as any).ipa && (
              <span className="text-sm text-slate-500">
                {(current as any).ipa}
              </span>
            )}
          </div>

          {lastInfo && <div className="text-sm text-slate-600">{lastInfo}</div>}

          {!show ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShow(true)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
              >
                {t.showAnswer}
              </button>
              <button
                onClick={skip}
                className="rounded-xl border px-4 py-2 hover:bg-slate-50"
              >
                {t.skip}
              </button>
            </div>
          ) : (
            <>
              <div className="text-xl text-green-700">{translation}</div>

              <div className="flex flex-wrap gap-2">
                <button
                  disabled={isGrading}
                  onClick={() => grade(0)}
                  className="rounded-xl bg-red-600 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.forgot}
                </button>
                <button
                  disabled={isGrading}
                  onClick={() => grade(1)}
                  className="rounded-xl bg-orange-500 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.hard}
                </button>
                <button
                  disabled={isGrading}
                  onClick={() => grade(2)}
                  className="rounded-xl bg-green-600 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.good}
                </button>
                <button
                  disabled={isGrading}
                  onClick={() => grade(3)}
                  className="rounded-xl bg-emerald-700 px-4 py-2 text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t.easy}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}
