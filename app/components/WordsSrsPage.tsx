"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { Word } from "@/app/learning/data";
import { getSrsWordsForCourse } from "@/app/learning/courses/dictionary";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import type { CourseId } from "@/app/learning/courses/registry";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  isLearned as _isLearned,
  isMastered as _isMastered,
} from "@/lib/srs/srsWords";

type SrsState = {
  id: string; // word.term або word.sk
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

const KEY_BASE = "slovakStudy.srsWords";
const DAY = 1000 * 60 * 60 * 24;

// ✅ Хочеш 30 нових слів на день
const DAILY_NEW_LIMIT = 30;
const DAILY_KEY_BASE = "slovakStudy.dailyNewWords";

// ✅ Сеанс повторення (скільки показувати за один раз)
const SESSION_SIZE = 30;

// ✅ Forgot → повертається швидко
const FORGOT_MINUTES = 10;

// ✅ НЕ НАКОПИЧУЄМО БОРГ: максимум 30 повторень на день
const DAILY_REVIEW_LIMIT = 30;
const DAILY_SESSION_KEY_BASE = "slovakStudy.srsDailySession";

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
    needLoginTitle: "Потрібен вхід",
    needLoginText:
      "SRS-прогрес зберігається по акаунту. Увійди, щоб продовжити.",
    login: "Увійти →",
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
    needLoginTitle: "Нужен вход",
    needLoginText:
      "SRS-прогресс сохраняется по аккаунту. Войдите, чтобы продолжить.",
    login: "Войти →",
  },
} as const;

function getTodayKey() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

function srsKey(userId: string, courseId: CourseId) {
  return `${KEY_BASE}:${userId}:${courseId}`;
}
function dailyKey(userId: string, courseId: CourseId) {
  return `${DAILY_KEY_BASE}:${userId}:${courseId}`;
}
function dailySessionKey(userId: string, courseId: CourseId) {
  return `${DAILY_SESSION_KEY_BASE}:${userId}:${courseId}`;
}

// legacy keys (до курсів)
function legacySrsKey(userId: string) {
  return `${KEY_BASE}:${userId}`;
}
function legacyDailyKey(userId: string) {
  return `${DAILY_KEY_BASE}:${userId}`;
}
function legacyDailySessionKey(userId: string) {
  return `${DAILY_SESSION_KEY_BASE}:${userId}`;
}

function getDailyState(
  userId: string,
  courseId: CourseId
): { date: string; count: number } {
  const raw = localStorage.getItem(dailyKey(userId, courseId));
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

function setDailyState(userId: string, courseId: CourseId, count: number) {
  localStorage.setItem(
    dailyKey(userId, courseId),
    JSON.stringify({ date: getTodayKey(), count })
  );
}

// ✅ “Порція повторення на день”
type DailySession = { date: string; ids: string[] };

function getDailySession(userId: string, courseId: CourseId): DailySession | null {
  const raw = localStorage.getItem(dailySessionKey(userId, courseId));
  if (!raw) return null;
  try {
    const s = JSON.parse(raw);
    if (typeof s?.date === "string" && Array.isArray(s?.ids)) return s;
    return null;
  } catch {
    return null;
  }
}

function setDailySession(userId: string, courseId: CourseId, ids: string[]) {
  localStorage.setItem(
    dailySessionKey(userId, courseId),
    JSON.stringify({ date: getTodayKey(), ids })
  );
}

function removeFromDailySession(userId: string, courseId: CourseId, id: string) {
  const saved = getDailySession(userId, courseId);
  if (!saved) return;
  if (saved.date !== getTodayKey()) return;

  const nextIds = saved.ids.filter((x) => x !== id);
  setDailySession(userId, courseId, nextIds);
}

function loadDb(userId: string, courseId: CourseId): Record<string, SrsState> {
  // ✅ міграція: тільки для sk — переносимо legacy ключі в :sk один раз
  if (courseId === "sk") {
    try {
      const newKey = srsKey(userId, courseId);
      const hasNew = !!localStorage.getItem(newKey);
      if (!hasNew) {
        const legacyRaw = localStorage.getItem(legacySrsKey(userId));
        if (legacyRaw) {
          localStorage.setItem(newKey, legacyRaw);
          localStorage.removeItem(legacySrsKey(userId));
        }
      }

      const newDailyKey = dailyKey(userId, courseId);
      const hasDailyNew = !!localStorage.getItem(newDailyKey);
      if (!hasDailyNew) {
        const legacyRaw = localStorage.getItem(legacyDailyKey(userId));
        if (legacyRaw) {
          localStorage.setItem(newDailyKey, legacyRaw);
          localStorage.removeItem(legacyDailyKey(userId));
        }
      }

      const newSessionKey = dailySessionKey(userId, courseId);
      const hasSessionNew = !!localStorage.getItem(newSessionKey);
      if (!hasSessionNew) {
        const legacyRaw = localStorage.getItem(legacyDailySessionKey(userId));
        if (legacyRaw) {
          localStorage.setItem(newSessionKey, legacyRaw);
          localStorage.removeItem(legacyDailySessionKey(userId));
        }
      }
    } catch { }
  }

  try {
    return JSON.parse(localStorage.getItem(srsKey(userId, courseId)) || "{}");
  } catch {
    return {};
  }
}

function saveDb(userId: string, courseId: CourseId, db: Record<string, SrsState>) {
  localStorage.setItem(srsKey(userId, courseId), JSON.stringify(db));
  window.dispatchEvent(new CustomEvent("slovakStudy:srsChanged"));
  window.dispatchEvent(new Event("storage"));
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

function getTerm(w: any): string {
  return String(w?.term ?? w?.sk ?? "").trim();
}

function getDueSorted(words: Word[], db: Record<string, SrsState>): Word[] {
  const now = Date.now();

  return words
    .map((w) => {
      const id = getTerm(w);
      return { w, id };
    })
    .filter((x) => !!x.id && !!db[x.id])
    .map((x) => ({ w: x.w, id: x.id, dueAt: db[x.id]!.dueAt }))
    .filter((x) => x.dueAt <= now)
    .sort((a, b) => a.dueAt - b.dueAt)
    .map((x) => x.w);
}

export default function WordsSrsPage({ backHref }: { backHref: string }) {
  const { lang } = useLanguage();
  const t = I18N[lang];

  const { data: session, status } = useSession();
  const userId = String(session?.user?.id ?? "");

  const { courseId } = useActiveCourse();

  // ✅ важливо: НІЯКИХ ранніх return ДО хуків
  const needLogin = status !== "authenticated";

  const allWords = useMemo(() => getSrsWordsForCourse(courseId), [courseId]);
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
    if (needLogin) return;
    if (!userId) return;

    const initial = loadDb(userId, courseId);
    startNewSession(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needLogin, allWords.length, userId, courseId]);

  function startNewSession(nextDb?: Record<string, SrsState>) {
    if (needLogin) return;
    if (!userId) return;

    const updated = nextDb ?? loadDb(userId, courseId);
    const now = Date.now();

    const dueAll = getDueSorted(allWords, updated);
    const dueIds = dueAll.map((w) => getTerm(w));

    const today = getTodayKey();
    const saved = getDailySession(userId, courseId);

    const target = Math.min(DAILY_REVIEW_LIMIT, dueIds.length);

    let ids: string[] = [];

    if (saved?.date === today) {
      ids = saved.ids.filter((id) => updated[id] && updated[id].dueAt <= now);

      // ✅ якщо saved.ids вичерпались/порожні — генеруємо нову порцію з due
      if (ids.length === 0) {
        ids = dueIds.slice(0, target);
      }

      setDailySession(userId, courseId, ids);
    } else {
      ids = dueIds.slice(0, target);
      setDailySession(userId, courseId, ids);
    }
    const byId = new Map(allWords.map((w) => [getTerm(w), w]));
    const sessionWords = ids.map((id) => byId.get(id)).filter(Boolean) as Word[];

    const limited = sessionWords.slice(0, SESSION_SIZE);

    setDb(updated);
    setQueue(limited);
    setCurrent(limited[0] || null);
    setShow(false);
    setLastInfo("");
    setIsGrading(false);

    setStats(computeStats(updated, allWords.length));
  }

  function addNewWordsRandom(count: number) {
    if (needLogin) return;
    if (!userId) return;

    const daily = getDailyState(userId, courseId);

    if (daily.date !== getTodayKey()) {
      daily.count = 0;
    }

    const remaining = DAILY_NEW_LIMIT - daily.count;
    if (remaining <= 0) {
      alert(t.dailyLimit);
      return;
    }

    const updated = loadDb(userId, courseId);

    const pool = allWords.filter((w) => {
      const id = getTerm(w);
      return id && !updated[id];
    });

    const toAdd = shuffle(pool).slice(0, Math.min(count, remaining));

    if (toAdd.length === 0) {
      alert(t.noNew);
      return;
    }

    for (const w of toAdd) {
      const id = getTerm(w);
      if (!id) continue;
      updated[id] = initState(id);
    }

    saveDb(userId, courseId, updated);
    setDailyState(userId, courseId, daily.count + toAdd.length);

    startNewSession(updated);
  }

  function goNext() {
    const curId = current ? getTerm(current) : "";
    const rest = queue.filter((w) => getTerm(w) !== curId);
    setQueue(rest);
    setCurrent(rest[0] || null);
    setShow(false);
    setLastInfo("");
    setIsGrading(false);
  }

  function grade(g: 0 | 1 | 2 | 3) {
    if (!current) return;
    if (isGrading) return;
    if (needLogin) return;
    if (!userId) return;

    setIsGrading(true);
    const curWord = current;
    const curId = getTerm(curWord);
    if (!curId) {
      setIsGrading(false);
      return;
    }

    const updated = { ...db };
    const prev = updated[curId] ?? initState(curId);
    const next = applyReview(prev, g);
    updated[curId] = next;

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

    saveDb(userId, courseId, updated);
    setDb(updated);
    setStats(computeStats(updated, allWords.length));

    setTimeout(() => {
      if (g === 0) {
        setQueue((q) => {
          const rest = q.filter((w) => getTerm(w) !== curId);
          const nextQueue = [...rest, curWord];
          setCurrent(nextQueue[0] || null);
          return nextQueue;
        });

        setShow(false);
        setLastInfo("");
        setIsGrading(false);
        return;
      }

      removeFromDailySession(userId, courseId, curId);
      goNext();
    }, 900);
  }

  function skip() {
    if (!current) return;
    if (isGrading) return;

    const curId = getTerm(current);
    const rest = queue.filter((w) => getTerm(w) !== curId);
    const next = [...rest, current];

    setQueue(next);
    setCurrent(next[0] || null);
    setShow(false);
    setLastInfo("");
  }

  const left = current ? queue.length : 0;

  const translation =
    !current
      ? ""
      : lang === "ru"
        ? current.ru || current.ua || ""
        : current.ua || "";

  const term = current ? getTerm(current) : "";

  // ✅ Login UI після хуків (правильно для React)
  if (needLogin) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <div className="rounded-2xl border bg-white p-6">
          <div className="text-lg font-semibold">{t.needLoginTitle}</div>
          <div className="mt-2 text-sm text-slate-600">{t.needLoginText}</div>
          <div className="mt-4">
            <Link
              href="/login"
              className="inline-flex rounded-xl bg-black px-4 py-2 text-sm text-white hover:opacity-90"
            >
              {t.login}
            </Link>
          </div>
        </div>
      </main>
    );
  }

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
            <div className="text-3xl font-bold">{term}</div>
            <SpeakButton text={term} />
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