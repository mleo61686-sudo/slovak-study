"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Word } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";
import { useLanguage } from "@/lib/src/useLanguage";

import WordsSrsReviewCard from "./words-srs/WordsSrsReviewCard";
import WordsSrsStats from "./words-srs/WordsSrsStats";
import { WORDS_SRS_TEXTS } from "./words-srs/words-srs-texts";
import {
  applyReview,
  computeStats,
  DAILY_NEW_LIMIT,
  DAILY_REVIEW_LIMIT,
  getDueSorted,
  getTerm,
  getTodayKey,
  getTranslation,
  initState,
  SESSION_SIZE,
  shuffle,
  type SrsState,
  type Stats,
} from "./words-srs/words-srs-logic";
import {
  addXp,
  getDailyGoalState,
  getDailySession,
  getDailyState,
  getStreakState,
  getXpState,
  loadDb,
  markDailyGoalReview,
  markStreakReview,
  removeFromDailySession,
  saveDb,
  setDailySession,
  setDailyState,
  type DailyGoalState,
  type StreakState,
  type XpState,
} from "./words-srs/words-srs-storage";

type Props = {
  backHref: string;
  initialCourseId: CourseId;
  initialWords?: Word[];
};

const DAILY_GOAL_TARGET = 30;
const XP_PER_REVIEW = 10;

export default function WordsSrsPage({
  backHref,
  initialCourseId,
  initialWords,
}: Props) {
  const { lang } = useLanguage();
  const t = WORDS_SRS_TEXTS[lang] ?? WORDS_SRS_TEXTS.ua;

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

  const [streak, setStreak] = useState<StreakState>({
    count: 0,
    lastReviewDate: null,
  });

  const [dailyGoal, setDailyGoal] = useState<DailyGoalState>({
    date: getTodayKey(),
    reviewed: 0,
  });

  const [xp, setXp] = useState<XpState>({
    totalXp: 0,
  });

  useEffect(() => {
    if (needLogin) return;
    if (!userId) return;

    const initial = loadDb(userId, courseId);

    setStreak(getStreakState(userId, courseId));
    setDailyGoal(getDailyGoalState(userId, courseId));
    setXp(getXpState(userId, courseId));

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
      setLastInfo(`${t.repeatAgainThisSession} • +${XP_PER_REVIEW} XP`);
    } else if (next.interval <= 1) {
      setLastInfo(`${t.nextTomorrow} • +${XP_PER_REVIEW} XP`);
    } else {
      setLastInfo(`${t.nextIn(next.interval)} • +${XP_PER_REVIEW} XP`);
    }

    saveDb(userId, courseId, updated);
    setDb(updated);
    setStats(computeStats(updated, allWords.length));
    setStreak(markStreakReview(userId, courseId));
    setDailyGoal(markDailyGoalReview(userId, courseId));
    setXp(addXp(userId, XP_PER_REVIEW, courseId));

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
    sessionSize > 0
      ? Math.min(100, Math.round((reviewed / sessionSize) * 100))
      : 0;

  const translation = current ? getTranslation(current, lang) : "";
  const term = current ? getTerm(current) : "";
  const ipa = current && "ipa" in current ? current.ipa : undefined;

  const streakLabel =
    lang === "ru"
      ? "Дней подряд"
      : lang === "en"
        ? "Day streak"
        : "Днів підряд";

  const dailyGoalLabel =
    lang === "ru"
      ? "Сегодня"
      : lang === "en"
        ? "Today"
        : "Сьогодні";

  const xpLabel = lang === "ru" ? "Опыт" : lang === "en" ? "XP" : "Досвід";

  if (needLogin) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-4 sm:p-4">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
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
    <main className="mx-auto max-w-3xl space-y-4 px-4 py-4 sm:space-y-6 sm:p-4">
      <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 space-y-1">
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
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

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-end">
            <button
              onClick={() => addNewWordsRandom(30)}
              className="min-h-11 w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold leading-5 text-white shadow-sm transition hover:bg-black active:scale-[0.98] sm:w-auto"
              type="button"
            >
              ＋ {t.add30}
            </button>

            <Link
              href={backHref}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] sm:w-auto"
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

      <WordsSrsStats
        stats={stats}
        t={t}
        streak={streak.count}
        streakLabel={streakLabel}
        dailyGoalLabel={dailyGoalLabel}
        dailyGoalReviewed={dailyGoal.reviewed}
        dailyGoalTarget={DAILY_GOAL_TARGET}
        xpLabel={xpLabel}
        xp={xp.totalXp}
      />

      {!current ? (
        Math.min(stats.due, DAILY_REVIEW_LIMIT) === 0 ? (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:p-6">
            <div className="text-xl font-semibold text-slate-900">
              {t.noDueTitle}
            </div>

            <div className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
              {t.noDueText}
            </div>

            <div className="mt-5">
              <button
                onClick={() => addNewWordsRandom(30)}
                className="min-h-11 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98] sm:w-auto"
                type="button"
              >
                ＋ {t.add30}
              </button>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 text-center shadow-sm sm:p-6">
            <div className="text-2xl font-bold text-slate-900">
              {t.sessionDone}
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {t.sessionDoneText}
            </p>

            <div className="mt-5">
              <button
                onClick={() => startNewSession()}
                className="min-h-11 w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-black active:scale-[0.98] sm:w-auto"
                type="button"
              >
                {t.nextSession}
              </button>
            </div>
          </section>
        )
      ) : (
        <WordsSrsReviewCard
          term={term}
          translation={translation}
          ipa={ipa}
          show={show}
          lastInfo={lastInfo}
          isGrading={isGrading}
          left={queue.length}
          reviewed={reviewed}
          sessionSize={sessionSize}
          t={t}
          onShow={() => setShow(true)}
          onSkip={skip}
          onGrade={grade}
        />
      )}
    </main>
  );
}