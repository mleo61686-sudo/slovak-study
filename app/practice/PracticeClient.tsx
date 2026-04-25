"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { SLANG_SK, SLANG_CS } from "@/data/slang";

import { UI } from "./practice-texts";
import type {
  Lang,
  PracticeClientProps,
  PracticeMistake,
  PracticeStats,
  SessionMode,
  SessionQuestionBase,
} from "./practice-types";
import { loadStats, saveStats } from "./practice-storage";
import { getTerm, getTrans, norm } from "./practice-utils";
import { buildSessionBase, makePromptAndHelper } from "./practice-session";

const BLITZ_SECONDS = 60;

function playFeedbackSound(ok: boolean) {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = ok ? 720 : 180;

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(ok ? 0.12 : 0.18, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.16);

    oscillator.connect(gain);
    gain.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.17);
  } catch { }
}

export default function PracticeClient({
  initialCourseId,
  initialWords,
  pack,
  slangLevel,
  slangCat,
}: PracticeClientProps) {
  const { lang } = useLanguage();
  const uiLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = UI[uiLang];

  const [ready, setReady] = useState(false);
  const words = initialWords;
  const courseId = initialCourseId;

  const [sessionMode, setSessionMode] = useState<SessionMode>("mixed");
  const [questionCount, setQuestionCount] = useState<number>(12);

  const [phase, setPhase] = useState<"setup" | "quiz" | "result">("setup");
  const [session, setSession] = useState<SessionQuestionBase[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    setReady(true);
  }, []);

  const [stats, setStats] = useState<PracticeStats>({
    bestAccuracyPct: 0,
    bestStreak: 0,
    bestScore: 0,
  });

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  const [streak, setStreak] = useState(0);
  const [bestStreakSession, setBestStreakSession] = useState(0);

  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [typedChecked, setTypedChecked] = useState<null | { ok: boolean }>(null);
  const [revealAutoKey, setRevealAutoKey] = useState(0);

  const [mistakes, setMistakes] = useState<PracticeMistake[]>([]);

  const poolCount = useMemo(() => {
    const pool = words
      .map((w) => ({
        term: getTerm(w),
        ua: getTrans(w, "ua"),
        ru: getTrans(w, "ru"),
        en: getTrans(w, "en"),
      }))
      .filter((w) => w.term && w.ua && w.ru && w.en);
    return pool.length;
  }, [words]);

  const notEnough = poolCount < 4;
  const isBlitz = sessionMode === "blitz";

  const slangTermList = useMemo(() => {
    if (pack !== "slang") return null;

    const slang = courseId === "cs" ? SLANG_CS : SLANG_SK;

    const list = slang
      .filter((x) => {
        const okLevel = !slangLevel || x.level === slangLevel;
        const okCat = !slangCat || x.category === slangCat;
        return okLevel && okCat;
      })
      .map((x) => x.sk);

    return list;
  }, [pack, slangLevel, slangCat, courseId]);

  const qBase = useMemo(() => {
    if (phase !== "quiz") return null;
    if (!session.length) return null;
    return session[Math.min(current, session.length - 1)];
  }, [phase, session, current]);

  const progressPct = session.length
    ? Math.round((current / session.length) * 100)
    : 0;

  const accuracyPct = session.length ? Math.round((score / session.length) * 100) : 0;

  const streakLevel = useMemo(() => {
    if (streak >= 10) return "legend";
    if (streak >= 5) return "fire";
    if (streak >= 3) return "warm";
    return "none";
  }, [streak]);

  const canRevealAnswer = useMemo(() => {
    if (!qBase) return false;
    if (qBase.mode === "typing") return true;
    return !!selected;
  }, [qBase, selected]);

  const resultMood = useMemo(() => {
    if (accuracyPct >= 95) {
      return {
        emoji: "🏆",
        title:
          uiLang === "en"
            ? "Perfect run!"
            : uiLang === "ru"
              ? "Идеальный раунд!"
              : "Ідеальний раунд!",
        text:
          uiLang === "en"
            ? "You crushed this training. Can you repeat it?"
            : uiLang === "ru"
              ? "Ты разнёс эту тренировку. Сможешь повторить?"
              : "Ти розніс це тренування. Зможеш повторити?",
      };
    }

    if (accuracyPct >= 80) {
      return {
        emoji: "🔥",
        title:
          uiLang === "en"
            ? "On fire!"
            : uiLang === "ru"
              ? "Ты в огне!"
              : "Ти у вогні!",
        text:
          uiLang === "en"
            ? "Strong result. One more round could be even better."
            : uiLang === "ru"
              ? "Сильный результат. Ещё один раунд может быть ещё лучше."
              : "Сильний результат. Ще один раунд може бути ще кращим.",
      };
    }

    if (accuracyPct >= 60) {
      return {
        emoji: "💪",
        title:
          uiLang === "en"
            ? "Good fight!"
            : uiLang === "ru"
              ? "Хорошая попытка!"
              : "Хороша спроба!",
        text:
          uiLang === "en"
            ? "You are close. Replay the same setup and push higher."
            : uiLang === "ru"
              ? "Ты близко. Повтори те же настройки и подними результат."
              : "Ти близько. Повтори ті самі налаштування і підніми результат.",
      };
    }

    return {
      emoji: "🎯",
      title:
        uiLang === "en"
          ? "Warm-up round"
          : uiLang === "ru"
            ? "Разогревочный раунд"
            : "Розігрівочний раунд",
      text:
        uiLang === "en"
          ? "Mistakes are the best target. Retry them now."
          : uiLang === "ru"
            ? "Ошибки — лучшая цель. Повтори их сейчас."
            : "Помилки — найкраща ціль. Повтори їх зараз.",
    };
  }, [accuracyPct, uiLang]);

  function finalizeRecords() {
    const finalScore = score;
    const finalBestStreak = bestStreakSession;
    const finalAccuracy = session.length
      ? Math.round((finalScore / session.length) * 100)
      : 0;

    setStats((prev) => {
      const next: PracticeStats = {
        bestAccuracyPct: Math.max(prev.bestAccuracyPct, finalAccuracy),
        bestStreak: Math.max(prev.bestStreak, finalBestStreak),
        bestScore: Math.max(prev.bestScore, finalScore),
      };
      if (typeof window !== "undefined") saveStats(next);
      return next;
    });
  }

  function finishSession() {
    setTimeLeft(null);
    setPhase("result");
    finalizeRecords();
  }

  function resetAnswerState() {
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
  }

  function startNew(customTermList?: string[]) {
    const countForSession =
      sessionMode === "blitz" ? Math.min(Math.max(poolCount, questionCount), 60) : questionCount;

    const built = buildSessionBase(words, countForSession, sessionMode, customTermList);

    setSession(built);
    setCurrent(0);
    setScore(0);
    setMistakes([]);

    setStreak(0);
    setBestStreakSession(0);

    resetAnswerState();

    if (built.length < 4) {
      setTimeLeft(null);
      setPhase("setup");
      return;
    }

    setTimeLeft(sessionMode === "blitz" ? BLITZ_SECONDS : null);
    setPhase("quiz");
  }

  function goNext() {
    const next = current + 1;
    resetAnswerState();
    setCurrent(next);

    if (next >= session.length) {
      finishSession();
    }
  }

  function skip() {
    setStreak(0);

    const next = current + 1;
    resetAnswerState();
    setCurrent(next);

    if (next >= session.length) {
      finishSession();
    }
  }

  function onAnswered(ok: boolean) {
    if (ok) {
      setScore((s) => s + 1);
      setStreak((s) => {
        const next = s + 1;
        setBestStreakSession((b) => (next > b ? next : b));
        return next;
      });
    } else {
      setStreak(0);
    }
  }

  function checkMcq(option: string) {
    if (!qBase || qBase.mode !== "mcq") return;

    setSelected(option);
    setRevealAutoKey((k) => k + 1);

    const ok = option === qBase.sk;
    playFeedbackSound(ok);
    onAnswered(ok);

    if (!ok) {
      setMistakes((m) => [
        ...m,
        {
          sk: qBase.sk,
          ua: qBase.ua,
          ru: qBase.ru,
          en: qBase.en,
          mode: "mcq",
          your: option,
        },
      ]);
    }

    if (isBlitz) {
      window.setTimeout(() => {
        goNext();
      }, 550);
    }
  }

  function checkTyping() {
    if (!qBase || qBase.mode !== "typing") return;

    const ok = norm(typed) === norm(qBase.sk);
    playFeedbackSound(ok);
    setTypedChecked({ ok });

    onAnswered(ok);

    if (!ok) {
      setMistakes((m) => [
        ...m,
        {
          sk: qBase.sk,
          ua: qBase.ua,
          ru: qBase.ru,
          en: qBase.en,
          mode: "typing",
          your: typed,
        },
      ]);
    }

    if (isBlitz) {
      window.setTimeout(() => {
        goNext();
      }, 650);
    }
  }

  useEffect(() => {
    if (phase !== "quiz") return;
    if (timeLeft === null) return;

    if (timeLeft <= 0) {
      finishSession();
      return;
    }

    const timer = window.setTimeout(() => {
      setTimeLeft((value) => (value === null ? null : value - 1));
    }, 1000);

    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, timeLeft]);

  useEffect(() => {
    if (phase !== "quiz") return;
    if (!session.length) return;
    if (current < session.length) return;
    finishSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, session.length]);

  if (!ready) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <div className="rounded-2xl border bg-white p-6">{t.loading}</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t.title}</h1>

        <div className="flex gap-2">
          <Link
            href="/practice/words"
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            {t.wordsSrs}
          </Link>
        </div>
      </div>

      {notEnough ? (
        <div className="space-y-3 rounded-2xl border bg-white p-6">
          <p className="font-medium">{t.notEnoughTitle}</p>
          <p className="text-sm text-gray-600">{t.notEnoughHint}</p>
        </div>
      ) : null}

      {phase === "setup" ? (
        <section className="space-y-4 rounded-2xl border bg-white p-6">
          <h2 className="text-lg font-semibold">{t.setupTitle}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">{t.setupCount}</div>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full rounded-xl border px-3 py-2"
                disabled={isBlitz}
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
              </select>

              {isBlitz ? (
                <div className="text-xs text-slate-500">
                  {uiLang === "en"
                    ? "Blitz uses a 60-second timer instead of a fixed question count."
                    : uiLang === "ru"
                      ? "Blitz использует таймер 60 секунд вместо фиксированного количества вопросов."
                      : "Blitz використовує таймер 60 секунд замість фіксованої кількості питань."}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">{t.setupMode}</div>
              <select
                value={sessionMode}
                onChange={(e) => setSessionMode(e.target.value as SessionMode)}
                className="w-full rounded-xl border px-3 py-2"
              >
                <option value="mixed">{t.modeMixed}</option>
                <option value="mcq">{t.modeMcq}</option>
                <option value="typing">{t.modeTyping}</option>
                <option value="blitz">{t.modeBlitz}</option>
              </select>
            </div>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-4 text-sm">
            <div className="mb-2 font-semibold">{t.record}</div>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.accuracy}: <b>{stats.bestAccuracyPct}%</b>
              </div>
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.bestStreak}: <b>{stats.bestStreak}</b>
              </div>
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.bestScore}: <b>{stats.bestScore}</b>
              </div>
            </div>
          </div>

          <button
            onClick={() => startNew(slangTermList ?? undefined)}
            disabled={notEnough}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-40"
          >
            {t.start}
          </button>
        </section>
      ) : null}

      {phase === "result" ? (
        <section className="space-y-4 rounded-2xl border bg-white p-6">
          <h2 className="text-xl font-semibold">{t.resultTitle}</h2>

          <div className="rounded-2xl border bg-gradient-to-br from-slate-50 to-white p-4">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{resultMood.emoji}</div>
              <div>
                <div className="text-lg font-semibold">{resultMood.title}</div>
                <p className="mt-1 text-sm text-slate-600">{resultMood.text}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="rounded-xl border bg-slate-50 px-3 py-2">
              {t.yourResult}: <b>{score}</b> / {session.length}
            </div>
            <div className="rounded-xl border bg-slate-50 px-3 py-2">
              {t.accuracy}: <b>{accuracyPct}%</b>
            </div>
            <div className="rounded-xl border bg-slate-50 px-3 py-2">
              {t.bestStreak}: <b>{bestStreakSession}</b>
            </div>
          </div>

          <div className="rounded-2xl border bg-slate-50 p-4 text-sm">
            <div className="mb-2 font-semibold">{t.record}</div>
            <div className="flex flex-wrap gap-2">
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.accuracy}: <b>{stats.bestAccuracyPct}%</b>
              </div>
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.bestStreak}: <b>{stats.bestStreak}</b>
              </div>
              <div className="rounded-xl border bg-white px-3 py-2">
                {t.bestScore}: <b>{stats.bestScore}</b>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => startNew(slangTermList ?? undefined)}
              className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
            >
              {uiLang === "en"
                ? "Play again 🔁"
                : uiLang === "ru"
                  ? "Ещё раз 🔁"
                  : "Ще раз 🔁"}
            </button>

            <button
              onClick={() => {
                setPhase("setup");
                setSession([]);
                setTimeLeft(null);
              }}
              className="rounded-xl border px-4 py-2 hover:bg-slate-50"
            >
              {uiLang === "en"
                ? "Change settings ⚙️"
                : uiLang === "ru"
                  ? "Изменить настройки ⚙️"
                  : "Змінити налаштування ⚙️"}
            </button>

            <button
              onClick={() => startNew(mistakes.map((m) => m.sk))}
              disabled={mistakes.length === 0}
              className="rounded-xl border px-4 py-2 hover:bg-slate-50 disabled:opacity-40"
            >
              {t.retryMistakes}
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-sm font-semibold">{t.mistakesTitle}</div>

            {mistakes.length === 0 ? (
              <div className="text-sm text-slate-700">{t.noMistakes}</div>
            ) : (
              <div className="space-y-2">
                {mistakes.slice(0, 20).map((m, idx) => {
                  const tr = uiLang === "en" ? m.en : uiLang === "ru" ? m.ru : m.ua;
                  return (
                    <div
                      key={`${m.sk}-${idx}`}
                      className="rounded-xl border bg-white p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium">
                          {m.sk} — <span className="text-slate-700">{tr}</span>
                        </div>
                        <SpeakButton text={m.sk} />
                      </div>
                      {m.your ? (
                        <div className="mt-1 text-sm text-slate-600">
                          {t.yourAnswer} <span className="font-medium">{m.your}</span>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      ) : null}

      {phase === "quiz" && qBase ? (
        <section className="space-y-4 rounded-2xl border bg-white p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div>
                {t.questionLabel} {current + 1} / {session.length}
              </div>

              <div className="flex items-center gap-2">
                <div className="rounded-full border px-3 py-1">
                  {isBlitz
                    ? t.blitzBadge
                    : qBase.mode === "mcq"
                      ? t.mcqBadge
                      : t.typingBadge}
                </div>

                <button
                  onClick={skip}
                  className="rounded-full border px-3 py-1 hover:bg-slate-50"
                >
                  {t.skip}
                </button>
              </div>
            </div>

            {isBlitz && timeLeft !== null ? (
              <div className="rounded-2xl border bg-slate-950 px-4 py-3 text-white">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">⚡ {t.blitzBadge}</span>
                  <span className="font-semibold">
                    ⏱️ {t.timeLeft}: {timeLeft}s
                  </span>
                </div>

                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-2 bg-white transition-all"
                    style={{ width: `${Math.max(0, (timeLeft / BLITZ_SECONDS) * 100)}%` }}
                  />
                </div>
              </div>
            ) : null}

            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-2 bg-slate-900"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-600">
                {t.progress}: {progressPct}% • {t.accuracy}: {accuracyPct}%
              </span>

              <span
                className={`rounded-full px-2 py-1 text-xs font-medium
                  ${streakLevel === "legend" ? "bg-purple-100 text-purple-700" : ""}
                  ${streakLevel === "fire" ? "bg-orange-100 text-orange-700" : ""}
                  ${streakLevel === "warm" ? "bg-green-100 text-green-700" : ""}
                  ${streakLevel === "none" ? "bg-slate-100 text-slate-600" : ""}
                `}
              >
                🔥 {streak}
              </span>
            </div>
          </div>

          {(() => {
            const { prompt, helper } = makePromptAndHelper(qBase, uiLang, courseId);

            return (
              <>
                <div className="space-y-2">
                  <p className="text-lg font-medium">{prompt}</p>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>{t.listen}</span>

                    {canRevealAnswer ? (
                      <SpeakButton
                        text={qBase.sk}
                        autoPlayKey={!isBlitz && qBase.mode === "mcq" ? revealAutoKey : undefined}
                      />
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-lg border bg-white px-2 py-1 text-xs opacity-50"
                        title={t.revealLock}
                      >
                        🔒
                      </button>
                    )}
                  </div>
                </div>

                {qBase.mode === "mcq" ? (
                  <>
                    <div className="space-y-2">
                      {qBase.options.map((option) => {
                        const isCorrect = selected && option === qBase.sk;
                        const isWrong = selected === option && option !== qBase.sk;

                        return (
                          <div
                            key={option}
                            role="button"
                            tabIndex={selected ? -1 : 0}
                            aria-disabled={!!selected}
                            onClick={() => {
                              if (selected) return;
                              checkMcq(option);
                            }}
                            onKeyDown={(e) => {
                              if (selected) return;
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                checkMcq(option);
                              }
                            }}
                            className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition
                              ${isCorrect ? "border-green-400 bg-green-100" : ""}
                              ${isWrong ? "border-red-400 bg-red-100" : ""}
                              ${!selected
                                ? "cursor-pointer hover:bg-slate-50"
                                : "cursor-default opacity-95"
                              }
                            `}
                          >
                            <span className="font-medium">{option}</span>

                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                              onPointerDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                              }}
                            >
                              <SpeakButton
                                text={option}
                                asChild
                                label="🔊"
                                className="rounded-lg border bg-white px-2 py-1 text-xs hover:bg-slate-50"
                              />
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {selected && (
                      <div
                        className={`text-sm font-medium ${selected === qBase.sk ? "text-green-600" : "text-red-600"
                          }`}
                      >
                        {selected === qBase.sk
                          ? uiLang === "en"
                            ? "Nice! 🔥"
                            : uiLang === "ru"
                              ? "Отлично! 🔥"
                              : "Клас! 🔥"
                          : uiLang === "en"
                            ? "Oops 😅"
                            : uiLang === "ru"
                              ? "Ошибка 😅"
                              : "Помилка 😅"}
                      </div>
                    )}

                    {selected && !isBlitz && (
                      <div className="space-y-3">
                        <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-gray-700">
                          {helper}
                        </div>
                        <button
                          onClick={goNext}
                          className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
                        >
                          {t.next}
                        </button>
                      </div>
                    )}

                    {selected && isBlitz && (
                      <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-gray-700">
                        {helper}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <input
                        value={typed}
                        onChange={(e) => setTyped(e.target.value)}
                        placeholder={t.placeholder}
                        className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                        disabled={!!typedChecked}
                      />

                      <div className="text-sm text-slate-500">{t.hintNoDiacritics}</div>

                      {!typedChecked ? (
                        <button
                          onClick={checkTyping}
                          disabled={!typed.trim()}
                          className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-40"
                        >
                          {t.check}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div
                            className={`rounded-xl border px-4 py-3 text-sm ${typedChecked.ok
                              ? "border-green-400 bg-green-100"
                              : "border-red-400 bg-red-100"
                              }`}
                          >
                            <div className="text-sm font-medium">
                              {typedChecked.ok
                                ? uiLang === "en"
                                  ? "Perfect! ⚡"
                                  : uiLang === "ru"
                                    ? "Идеально! ⚡"
                                    : "Ідеально! ⚡"
                                : uiLang === "en"
                                  ? "Not quite 😅"
                                  : uiLang === "ru"
                                    ? "Не совсем 😅"
                                    : "Майже 😅"}
                            </div>
                            {typedChecked.ok ? t.correct : `${t.wrongPrefix} ${qBase.sk}`}
                          </div>

                          <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-gray-700">
                            {helper}
                          </div>

                          {!isBlitz ? (
                            <button
                              onClick={goNext}
                              className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
                            >
                              {t.next}
                            </button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </>
            );
          })()}
        </section>
      ) : null}
    </main>
  );
}