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
        <div className="flunio-card rounded-3xl p-6 theme-text">{t.loading}</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-4 theme-text">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold theme-text">{t.title}</h1>

        <div className="flex gap-2">
          <Link
            href="/practice/words"
            className="theme-secondary-button rounded-2xl px-3 py-2 text-sm transition"
          >
            {t.wordsSrs}
          </Link>
        </div>
      </div>

      {notEnough ? (
        <div className="flunio-card space-y-3 rounded-3xl p-6">
          <p className="font-medium theme-text">{t.notEnoughTitle}</p>
          <p className="text-sm theme-text-muted">{t.notEnoughHint}</p>
        </div>
      ) : null}

      {phase === "setup" ? (
        <section className="flunio-card space-y-4 rounded-3xl p-6">
          <h2 className="text-lg font-semibold theme-text">{t.setupTitle}</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <div className="text-sm font-medium theme-text-muted">{t.setupCount}</div>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="theme-select w-full rounded-2xl px-3 py-2 outline-none transition"
                disabled={isBlitz}
              >
                <option value={8}>8</option>
                <option value={12}>12</option>
                <option value={16}>16</option>
                <option value={20}>20</option>
              </select>

              {isBlitz ? (
                <div className="text-xs theme-text-subtle">
                  {uiLang === "en"
                    ? "Blitz uses a 60-second timer instead of a fixed question count."
                    : uiLang === "ru"
                      ? "Blitz использует таймер 60 секунд вместо фиксированного количества вопросов."
                      : "Blitz використовує таймер 60 секунд замість фіксованої кількості питань."}
                </div>
              ) : null}
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium theme-text-muted">{t.setupMode}</div>
              <select
                value={sessionMode}
                onChange={(e) => setSessionMode(e.target.value as SessionMode)}
                className="theme-select w-full rounded-2xl px-3 py-2 outline-none transition"
              >
                <option value="mixed">{t.modeMixed}</option>
                <option value="mcq">{t.modeMcq}</option>
                <option value="typing">{t.modeTyping}</option>
                <option value="blitz">{t.modeBlitz}</option>
              </select>
            </div>
          </div>

          <div className="theme-home-soft-card rounded-2xl p-4 text-sm theme-text-muted">
            <div className="mb-2 font-semibold theme-text">{t.record}</div>
            <div className="flex flex-wrap gap-2">
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.accuracy}: <b className="theme-text">{stats.bestAccuracyPct}%</b>
              </div>
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.bestStreak}: <b className="theme-text">{stats.bestStreak}</b>
              </div>
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.bestScore}: <b className="theme-text">{stats.bestScore}</b>
              </div>
            </div>
          </div>

          <button
            onClick={() => startNew(slangTermList ?? undefined)}
            disabled={notEnough}
            className="theme-primary-button rounded-2xl px-5 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0"
          >
            {t.start}
          </button>
        </section>
      ) : null}

      {phase === "result" ? (
        <section className="flunio-card space-y-4 rounded-3xl p-6">
          <h2 className="text-xl font-semibold theme-text">{t.resultTitle}</h2>

          <div className="theme-home-soft-card rounded-3xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{resultMood.emoji}</div>
              <div>
                <div className="text-lg font-semibold theme-text">
                  {resultMood.title}
                </div>
                <p className="mt-1 text-sm theme-text-muted">{resultMood.text}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-sm theme-text-muted">
            <div className="theme-pill rounded-xl px-3 py-2">
              {t.yourResult}: <b className="theme-text">{score}</b> / {session.length}
            </div>
            <div className="theme-pill rounded-xl px-3 py-2">
              {t.accuracy}: <b className="theme-text">{accuracyPct}%</b>
            </div>
            <div className="theme-pill rounded-xl px-3 py-2">
              {t.bestStreak}: <b className="theme-text">{bestStreakSession}</b>
            </div>
          </div>

          <div className="theme-home-soft-card rounded-2xl p-4 text-sm theme-text-muted">
            <div className="mb-2 font-semibold theme-text">{t.record}</div>
            <div className="flex flex-wrap gap-2">
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.accuracy}: <b className="theme-text">{stats.bestAccuracyPct}%</b>
              </div>
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.bestStreak}: <b className="theme-text">{stats.bestStreak}</b>
              </div>
              <div className="theme-pill rounded-xl px-3 py-2">
                {t.bestScore}: <b className="theme-text">{stats.bestScore}</b>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => startNew(slangTermList ?? undefined)}
              className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
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
              className="theme-secondary-button rounded-2xl px-5 py-3 text-sm font-semibold transition"
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
              className="theme-secondary-button rounded-2xl px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.retryMistakes}
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-sm font-semibold theme-text">{t.mistakesTitle}</div>

            {mistakes.length === 0 ? (
              <div className="text-sm theme-text-muted">{t.noMistakes}</div>
            ) : (
              <div className="space-y-2">
                {mistakes.slice(0, 20).map((m, idx) => {
                  const tr = uiLang === "en" ? m.en : uiLang === "ru" ? m.ru : m.ua;
                  return (
                    <div key={`${m.sk}-${idx}`} className="theme-home-soft-card rounded-2xl p-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium theme-text">
                          {m.sk} — <span className="theme-text-muted">{tr}</span>
                        </div>
                        <SpeakButton text={m.sk} />
                      </div>
                      {m.your ? (
                        <div className="mt-1 text-sm theme-text-subtle">
                          {t.yourAnswer}{" "}
                          <span className="font-medium theme-text-muted">{m.your}</span>
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
        <section className="flunio-card space-y-4 rounded-3xl p-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm theme-text-subtle">
              <div>
                {t.questionLabel} {current + 1} / {session.length}
              </div>

              <div className="flex items-center gap-2">
                <div className="theme-pill rounded-full px-3 py-1">
                  {isBlitz
                    ? t.blitzBadge
                    : qBase.mode === "mcq"
                      ? t.mcqBadge
                      : t.typingBadge}
                </div>

                <button
                  onClick={skip}
                  className="theme-secondary-button rounded-full px-3 py-1 transition"
                >
                  {t.skip}
                </button>
              </div>
            </div>

            {isBlitz && timeLeft !== null ? (
              <div className="theme-home-soft-card rounded-2xl px-4 py-3 theme-text">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">⚡ {t.blitzBadge}</span>
                  <span className="font-semibold">
                    ⏱️ {t.timeLeft}: {timeLeft}s
                  </span>
                </div>

                <div className="theme-progress-track mt-2 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 transition-all"
                    style={{
                      width: `${Math.max(0, (timeLeft / BLITZ_SECONDS) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ) : null}

            <div className="theme-progress-track h-2 w-full overflow-hidden rounded-full">
              <div
                className="h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400"
                style={{ width: `${progressPct}%` }}
              />
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="theme-text-subtle">
                {t.progress}: {progressPct}% • {t.accuracy}: {accuracyPct}%
              </span>

              <span
                className={`rounded-full border px-2 py-1 text-xs font-medium
            ${streakLevel === "legend" ? "border-purple-400/30 bg-purple-500/15 text-purple-300" : ""}
            ${streakLevel === "fire" ? "border-orange-400/30 bg-orange-500/15 text-orange-300" : ""}
            ${streakLevel === "warm" ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-300" : ""}
            ${streakLevel === "none" ? "theme-pill" : ""}
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
                  <p className="text-lg font-medium theme-text">{prompt}</p>

                  <div className="flex items-center gap-2 text-sm theme-text-muted">
                    <span>{t.listen}</span>

                    {canRevealAnswer ? (
                      <SpeakButton
                        text={qBase.sk}
                        autoPlayKey={
                          !isBlitz && qBase.mode === "mcq" ? revealAutoKey : undefined
                        }
                      />
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs theme-text-subtle opacity-60 theme-simple:border-slate-200 theme-simple:bg-slate-100"
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
                            className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition
                        ${isCorrect ? "border-emerald-400/45 bg-emerald-500/15 text-emerald-300" : ""}
                        ${isWrong ? "border-red-400/45 bg-red-500/15 text-red-300" : ""}
                        ${!selected
                                ? "theme-secondary-button cursor-pointer hover:-translate-y-0.5"
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
                                className="theme-secondary-button rounded-lg px-2 py-1 text-xs"
                              />
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {selected && (
                      <div
                        className={`text-sm font-medium ${selected === qBase.sk ? "text-emerald-300" : "text-red-300"
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
                        <div className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text-muted">
                          {helper}
                        </div>
                        <button
                          onClick={goNext}
                          className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {t.next}
                        </button>
                      </div>
                    )}

                    {selected && isBlitz && (
                      <div className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text-muted">
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
                        className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
                        disabled={!!typedChecked}
                      />

                      <div className="text-sm theme-text-subtle">{t.hintNoDiacritics}</div>

                      {!typedChecked ? (
                        <button
                          onClick={checkTyping}
                          disabled={!typed.trim()}
                          className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0"
                        >
                          {t.check}
                        </button>
                      ) : (
                        <div className="space-y-3">
                          <div
                            className={`rounded-2xl border px-4 py-3 text-sm ${typedChecked.ok
                              ? "border-emerald-400/45 bg-emerald-500/15 text-emerald-300"
                              : "border-red-400/45 bg-red-500/15 text-red-300"
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

                          <div className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text-muted">
                            {helper}
                          </div>

                          {!isBlitz ? (
                            <button
                              onClick={goNext}
                              className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
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