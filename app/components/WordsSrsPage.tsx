"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { Word } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import {
  isLearned as _isLearned,
  isMastered as _isMastered,
} from "@/lib/srs/srsWords";

type SrsState = {
  id: string;
  dueAt: number;
  interval: number;
  ease: number;
  reps: number;
};

type Stats = {
  total: number;
  learned: number;
  mastered: number;
  due: number;
};

type Props = {
  backHref: string;
  initialCourseId: CourseId;
  initialWords?: Word[];
};

const KEY_BASE = "slovakStudy.srsWords";
const DAY = 1000 * 60 * 60 * 24;

const DAILY_NEW_LIMIT = 30;
const DAILY_KEY_BASE = "slovakStudy.dailyNewWords";

const SESSION_SIZE = 30;

const FORGOT_MINUTES = 10;

const DAILY_REVIEW_LIMIT = 30;
const DAILY_SESSION_KEY_BASE = "slovakStudy.srsDailySession";

const I18N: Record<
  Lang,
  {
    title: string;
    subtitle: string;
    today: string;
    back: string;
    add30: string;
    total: string;
    mastered: string;
    learned: string;
    due: string;
    left: string;
    progress: string;
    showAnswer: string;
    tapToReveal: string;
    noDueTitle: string;
    noDueText: string;
    sessionDone: string;
    sessionDoneText: string;
    nextSession: string;
    skip: string;
    skipHint: string;
    forgot: string;
    hard: string;
    good: string;
    easy: string;
    dailyLimit: string;
    noNew: string;
    repeatAgainThisSession: string;
    nextTomorrow: string;
    nextIn: (days: number) => string;
    nextSoon: string;
    almostDone: (left: number) => string;
    needLoginTitle: string;
    needLoginText: string;
    login: string;
  }
> = {
  ua: {
    title: "Повторення слів",
    subtitle: "Flunio показує слова тоді, коли їх найкраще повторити.",
    today: "На сьогодні",
    back: "Назад",
    add30: "Додати 30 нових слів",
    total: "Всього слів",
    mastered: "Вивчив",
    learned: "Вчив",
    due: "На сьогодні",
    left: "Залишилось",
    progress: "Прогрес сеансу",
    showAnswer: "Показати відповідь",
    tapToReveal: "Натисни на картку, щоб побачити переклад",
    noDueTitle: "🎉 Слів для повторення поки немає",
    noDueText:
      "Додай перші 30 слів, і Flunio почне показувати їх для повторення у правильний час.",
    sessionDone: "🎉 Сеанс завершено",
    sessionDoneText: "Круто! Ти закріпив слова на сьогодні.",
    nextSession: "Взяти наступні",
    skip: "Пропустити",
    skipHint: "показати пізніше",
    forgot: "Забув",
    hard: "Важко",
    good: "Добре",
    easy: "Легко",
    dailyLimit: "Ліміт нових слів на сьогодні вичерпано 🙂",
    noNew: "Немає нових слів 🙂",
    repeatAgainThisSession: "🔁 Повторимо ще раз у цьому сеансі",
    nextTomorrow: "✅ Добре! Наступне повторення — завтра",
    nextIn: (days: number) => `🚀 Чудово! Наступне повторення через ${days} днів`,
    nextSoon: `⏳ Наступне повторення через ${FORGOT_MINUTES} хв`,
    almostDone: (left: number) => `🔥 Майже готово — залишилось ${left}`,
    needLoginTitle: "Потрібен вхід",
    needLoginText:
      "Прогрес повторення слів зберігається по акаунту. Увійди, щоб продовжити.",
    login: "Увійти →",
  },
  ru: {
    title: "Повторение слов",
    subtitle: "Flunio показывает слова тогда, когда их лучше всего повторить.",
    today: "На сегодня",
    back: "Назад",
    add30: "Добавить 30 новых слов",
    total: "Всего слов",
    learned: "Учил",
    mastered: "Выучил",
    due: "На сегодня",
    left: "Осталось",
    progress: "Прогресс сеанса",
    showAnswer: "Показать ответ",
    tapToReveal: "Нажми на карточку, чтобы увидеть перевод",
    noDueTitle: "🎉 Слов для повторения пока нет",
    noDueText:
      "Добавь первые 30 слов, и Flunio начнёт показывать их для повторения в нужное время.",
    sessionDone: "🎉 Сеанс завершён",
    sessionDoneText: "Отлично! Ты закрепил слова на сегодня.",
    nextSession: "Взять следующие",
    skip: "Пропустить",
    skipHint: "показать позже",
    forgot: "Забыл",
    hard: "Сложно",
    good: "Хорошо",
    easy: "Легко",
    dailyLimit: "Лимит новых слов на сегодня исчерпан 🙂",
    noNew: "Нет новых слов 🙂",
    repeatAgainThisSession: "🔁 Повторим ещё раз в этом сеансе",
    nextTomorrow: "✅ Хорошо! Следующее повторение — завтра",
    nextIn: (days: number) => `🚀 Отлично! Следующее повторение через ${days} дней`,
    nextSoon: `⏳ Следующее повторение через ${FORGOT_MINUTES} мин`,
    almostDone: (left: number) => `🔥 Почти готово — осталось ${left}`,
    needLoginTitle: "Нужен вход",
    needLoginText:
      "Прогресс повторения слов сохраняется по аккаунту. Войдите, чтобы продолжить.",
    login: "Войти →",
  },
  en: {
    title: "Word review",
    subtitle: "Flunio shows words when it is the best time to review them.",
    today: "Today",
    back: "Back",
    add30: "Add 30 new words",
    total: "Total words",
    learned: "Learned",
    mastered: "Mastered",
    due: "Due today",
    left: "Remaining",
    progress: "Session progress",
    showAnswer: "Show answer",
    tapToReveal: "Tap the card to reveal the translation",
    noDueTitle: "🎉 No words to review yet",
    noDueText:
      "Add your first 30 words, and Flunio will start showing them at the right time for review.",
    sessionDone: "🎉 Session completed",
    sessionDoneText: "Great job! You reviewed your words for today.",
    nextSession: "Take next batch",
    skip: "Skip",
    skipHint: "show later",
    forgot: "Forgot",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    dailyLimit: "Daily limit of new words reached 🙂",
    noNew: "No new words 🙂",
    repeatAgainThisSession: "🔁 We’ll repeat it again in this session",
    nextTomorrow: "✅ Good! Next review — tomorrow",
    nextIn: (days: number) => `🚀 Great! Next review in ${days} days`,
    nextSoon: `⏳ Next review in ${FORGOT_MINUTES} min`,
    almostDone: (left: number) => `🔥 Almost done — ${left} left`,
    needLoginTitle: "Login required",
    needLoginText:
      "Word review progress is saved per account. Log in to continue.",
    login: "Log in →",
  },
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
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

type DailySession = { date: string; ids: string[] };

function getDailySession(
  userId: string,
  courseId: CourseId
): DailySession | null {
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

function removeFromDailySession(
  userId: string,
  courseId: CourseId,
  id: string
) {
  const saved = getDailySession(userId, courseId);
  if (!saved) return;
  if (saved.date !== getTodayKey()) return;

  const nextIds = saved.ids.filter((x) => x !== id);
  setDailySession(userId, courseId, nextIds);
}

function loadDb(userId: string, courseId: CourseId): Record<string, SrsState> {
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
    } catch {
      // legacy migration is best-effort only
    }
  }

  try {
    return JSON.parse(localStorage.getItem(srsKey(userId, courseId)) || "{}");
  } catch {
    return {};
  }
}

function saveDb(
  userId: string,
  courseId: CourseId,
  db: Record<string, SrsState>
) {
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

const isLearned = (s: SrsState) => _isLearned(s as never);
const isMastered = (s: SrsState) => _isMastered(s as never);

function computeStats(db: Record<string, SrsState>, totalWords: number): Stats {
  const now = Date.now();
  const all = Object.values(db);

  const learned = all.filter(isLearned).length;
  const mastered = all.filter(isMastered).length;
  const due = all.filter((s) => s.dueAt <= now).length;

  return { total: totalWords, learned, mastered, due };
}

function getTerm(w: Word): string {
  return String((w as { term?: string; sk?: string }).term ?? w.sk ?? "").trim();
}

function getTranslation(w: Word, lang: Lang): string {
  if (lang === "ru") return w.ru ?? w.ua ?? "";
  if (lang === "en") return w.en ?? w.ua ?? "";
  return w.ua ?? "";
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

export default function WordsSrsPage({
  backHref,
  initialCourseId,
  initialWords,
}: Props) {
  const { lang } = useLanguage();
  const t = I18N[lang] ?? I18N.ua;

  const { data: session, status } = useSession();
  const userId = String(session?.user?.id ?? "");

  const courseId = initialCourseId;
  const allWords = initialWords ?? [];

  const needLogin = status !== "authenticated";

  const [db, setDb] = useState<Record<string, SrsState>>({});

  const [queue, setQueue] = useState<Word[]>([]);
  const [current, setCurrent] = useState<Word | null>(null);
  const [show, setShow] = useState(false);

  const [lastInfo, setLastInfo] = useState<string>("");
  const [isGrading, setIsGrading] = useState(false);
  const [sessionSize, setSessionSize] = useState(0);

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
    setSessionSize(limited.length);

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
      setLastInfo(t.repeatAgainThisSession);
    } else if (next.interval <= 1) {
      setLastInfo(t.nextTomorrow);
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
  const reviewed = sessionSize > 0 ? Math.max(0, sessionSize - left) : 0;
  const progressPercent =
    sessionSize > 0 ? Math.min(100, Math.round((reviewed / sessionSize) * 100)) : 0;

  const translation = current ? getTranslation(current, lang) : "";
  const term = current ? getTerm(current) : "";
  const ipa = current && "ipa" in current ? current.ipa : undefined;

  if (needLogin) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="text-lg font-semibold text-slate-900">
            {t.needLoginTitle}
          </div>
          <div className="mt-2 text-sm leading-6 text-slate-600">
            {t.needLoginText}
          </div>
          <div className="mt-4">
            <Link
              href="/login"
              className="inline-flex rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {t.login}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              🧠 {t.title}
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              {t.subtitle}
            </p>
            <div className="text-sm text-slate-600">
              {t.today}: <b>{Math.min(stats.due, DAILY_REVIEW_LIMIT)}</b> ·{" "}
              {t.left}: <b>{left}</b>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => addNewWordsRandom(30)}
              className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98]"
              type="button"
            >
              ＋ {t.add30}
            </button>

            <Link
              href={backHref}
              className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
            >
              ← {t.back}
            </Link>
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>{t.progress}</span>
            <span>
              {reviewed}/{sessionSize || 0}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-slate-900 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {current && left <= 5 && left > 0 ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800">
              {t.almostDone(left)}
            </div>
          ) : null}
        </div>
      </section>

      <section className="grid gap-2 sm:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t.total}</div>
          <div className="text-xl font-semibold text-slate-900">
            {stats.total}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t.learned}</div>
          <div className="text-xl font-semibold text-slate-900">
            {stats.learned}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t.mastered}</div>
          <div className="text-xl font-semibold text-slate-900">
            {stats.mastered}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="text-xs text-slate-500">{t.due}</div>
          <div className="text-xl font-semibold text-slate-900">
            {Math.min(stats.due, DAILY_REVIEW_LIMIT)}
          </div>
        </div>
      </section>

      {!current ? (
        Math.min(stats.due, DAILY_REVIEW_LIMIT) === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="text-xl font-semibold text-slate-900">
              {t.noDueTitle}
            </div>
            <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              {t.noDueText}
            </div>

            <div className="mt-5">
              <button
                onClick={() => addNewWordsRandom(30)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98]"
                type="button"
              >
                ＋ {t.add30}
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-slate-900">
              {t.sessionDone}
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t.sessionDoneText}
            </p>

            <div className="mt-5">
              <button
                onClick={() => startNewSession()}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98]"
                type="button"
              >
                {t.nextSession}
              </button>
            </div>
          </section>
        )
      ) : (
        <section className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
            <span>
              {t.left}: <b>{queue.length}</b>
            </span>
            <span>
              {reviewed}/{sessionSize || 0}
            </span>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <div className="flex flex-wrap items-center gap-3">
              <div className="text-4xl font-bold tracking-tight text-slate-900">
                {term}
              </div>

              <SpeakButton text={term} />

              {show && ipa ? (
                <span className="rounded-full bg-white px-3 py-1 text-sm text-slate-500 ring-1 ring-slate-200">
                  {ipa}
                </span>
              ) : null}
            </div>

            {lastInfo ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700">
                {lastInfo}
              </div>
            ) : null}

            {!show ? (
              <div
                onClick={() => setShow(true)}
                className="mt-6 cursor-pointer rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center transition hover:border-slate-400 hover:bg-slate-50 active:scale-[0.99]"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setShow(true);
                }}
              >
                <div className="text-base font-semibold text-slate-900">
                  {t.showAnswer}
                </div>
                <div className="mt-1 text-sm text-slate-500">
                  {t.tapToReveal}
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                <div className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
                  {t.showAnswer}
                </div>
                <div className="mt-1 text-2xl font-bold text-emerald-800">
                  {translation}
                </div>
              </div>
            )}
          </div>

          {!show ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShow(true)}
                className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98]"
                type="button"
              >
                {t.showAnswer}
              </button>

              <button
                onClick={skip}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98]"
                type="button"
              >
                {t.skip} · {t.skipHint}
              </button>
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-4">
              <button
                disabled={isGrading}
                onClick={() => grade(0)}
                className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                type="button"
              >
                {t.forgot}
              </button>

              <button
                disabled={isGrading}
                onClick={() => grade(1)}
                className="rounded-2xl bg-orange-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                type="button"
              >
                {t.hard}
              </button>

              <button
                disabled={isGrading}
                onClick={() => grade(2)}
                className="rounded-2xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                type="button"
              >
                {t.good}
              </button>

              <button
                disabled={isGrading}
                onClick={() => grade(3)}
                className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                type="button"
              >
                {t.easy}
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  );
}