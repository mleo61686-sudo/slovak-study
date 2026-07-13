"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { SLANG_SK, SLANG_CS } from "@/data/slang";

import { UI } from "./practice-texts";
import type {
  Lang,
  ListeningOption,
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
const BLITZ_MAX_SECONDS = 75;

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
  } catch {}
}

function getLocalizedOption(option: ListeningOption, lang: Lang) {
  return lang === "en" ? option.en : lang === "ru" ? option.ru : option.ua;
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

  const [stats, setStats] = useState<PracticeStats>({
    bestAccuracyPct: 0,
    bestStreak: 0,
    bestScore: 0,
    bestBlitzPoints: 0,
  });

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreakSession, setBestStreakSession] = useState(0);
  const [blitzPoints, setBlitzPoints] = useState(0);
  const [timeBonusFlash, setTimeBonusFlash] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const [typedChecked, setTypedChecked] = useState<null | { ok: boolean }>(null);
  const [revealAutoKey, setRevealAutoKey] = useState(0);
  const [mistakes, setMistakes] = useState<PracticeMistake[]>([]);

  useEffect(() => {
    setReady(true);
    setStats(loadStats());
  }, []);

  useEffect(() => {
    if (!timeBonusFlash) return;
    const timer = window.setTimeout(() => setTimeBonusFlash(false), 950);
    return () => window.clearTimeout(timer);
  }, [timeBonusFlash]);

  const poolCount = useMemo(() => {
    return words
      .map((w) => ({
        term: getTerm(w),
        ua: getTrans(w, "ua"),
        ru: getTrans(w, "ru"),
        en: getTrans(w, "en"),
      }))
      .filter((w) => w.term && w.ua && w.ru && w.en).length;
  }, [words]);

  const notEnough = poolCount < 4;
  const isBlitz = sessionMode === "blitz";

  const slangTermList = useMemo(() => {
    if (pack !== "slang") return null;

    const slang = courseId === "cs" ? SLANG_CS : SLANG_SK;
    return slang
      .filter((x) => {
        const okLevel = !slangLevel || x.level === slangLevel;
        const okCat = !slangCat || x.category === slangCat;
        return okLevel && okCat;
      })
      .map((x) => x.sk);
  }, [pack, slangLevel, slangCat, courseId]);

  const qBase = useMemo(() => {
    if (phase !== "quiz" || !session.length) return null;
    return session[Math.min(current, session.length - 1)];
  }, [phase, session, current]);

  const progressPct = session.length
    ? Math.min(100, Math.round((current / session.length) * 100))
    : 0;

  const accuracyPct = answeredCount
    ? Math.round((score / answeredCount) * 100)
    : 0;

  const blitzMultiplier = Math.min(3, 1 + Math.floor(streak / 5));

  const streakLevel = useMemo(() => {
    if (streak >= 10) return "legend";
    if (streak >= 5) return "fire";
    if (streak >= 3) return "warm";
    return "none";
  }, [streak]);

  const canRevealAnswer = useMemo(() => {
    if (!qBase) return false;
    if (qBase.mode === "typing") return !!typedChecked;
    return !!selected;
  }, [qBase, selected, typedChecked]);

  const modeCards = useMemo(
    () => [
      {
        id: "mixed" as const,
        icon: "✨",
        title: t.modeMixed,
        description: t.modeMixedDesc,
        badge: t.recommended,
      },
      {
        id: "mcq" as const,
        icon: "🎯",
        title: t.modeMcq,
        description: t.modeMcqDesc,
      },
      {
        id: "typing" as const,
        icon: "⌨️",
        title: t.modeTyping,
        description: t.modeTypingDesc,
      },
      {
        id: "listening" as const,
        icon: "🎧",
        title: t.modeListening,
        description: t.modeListeningDesc,
        badge: t.newBadge,
      },
      {
        id: "blitz" as const,
        icon: "⚡",
        title: t.modeBlitz,
        description: t.modeBlitzDesc,
        badge: "60 SEC",
      },
    ],
    [t]
  );

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
    setStats((prev) => {
      const next: PracticeStats = {
        bestAccuracyPct: Math.max(prev.bestAccuracyPct, accuracyPct),
        bestStreak: Math.max(prev.bestStreak, bestStreakSession),
        bestScore: Math.max(prev.bestScore, score),
        bestBlitzPoints: Math.max(
          prev.bestBlitzPoints,
          isBlitz ? blitzPoints : 0
        ),
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
      sessionMode === "blitz"
        ? Math.min(Math.max(poolCount, 40), 60)
        : customTermList?.length
          ? Math.min(questionCount, customTermList.length)
          : questionCount;

    const built = buildSessionBase(words, countForSession, sessionMode, customTermList);

    setSession(built);
    setCurrent(0);
    setScore(0);
    setAnsweredCount(0);
    setMistakes([]);
    setStreak(0);
    setBestStreakSession(0);
    setBlitzPoints(0);
    setTimeBonusFlash(false);
    resetAnswerState();

    if (!built.length) {
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

    if (next >= session.length) finishSession();
  }

  function addCurrentMistake(your?: string) {
    if (!qBase) return;

    setMistakes((items) => [
      ...items,
      {
        sk: qBase.sk,
        ua: qBase.ua,
        ru: qBase.ru,
        en: qBase.en,
        mode: qBase.mode,
        your,
      },
    ]);
  }

  function skip() {
    setAnsweredCount((value) => value + 1);
    setStreak(0);
    addCurrentMistake();
    goNext();
  }

  function onAnswered(ok: boolean) {
    setAnsweredCount((value) => value + 1);

    if (!ok) {
      setStreak(0);
      return;
    }

    const nextStreak = streak + 1;
    const answerMultiplier = Math.min(3, 1 + Math.floor(streak / 5));

    setScore((value) => value + 1);
    setStreak(nextStreak);
    setBestStreakSession((value) => Math.max(value, nextStreak));

    if (isBlitz) {
      setBlitzPoints((value) => value + 100 * answerMultiplier);

      if (nextStreak % 5 === 0) {
        setTimeLeft((value) =>
          value === null ? null : Math.min(BLITZ_MAX_SECONDS, value + 3)
        );
        setTimeBonusFlash(true);
      }
    }
  }

  function checkMcq(option: string) {
    if (!qBase || qBase.mode !== "mcq" || selected) return;

    setSelected(option);
    setRevealAutoKey((key) => key + 1);

    const ok = option === qBase.sk;
    playFeedbackSound(ok);
    onAnswered(ok);
    if (!ok) addCurrentMistake(option);

    if (isBlitz) window.setTimeout(goNext, 520);
  }

  function checkListening(option: ListeningOption) {
    if (!qBase || qBase.mode !== "listening" || selected) return;

    setSelected(option.sk);
    const ok = option.sk === qBase.sk;
    playFeedbackSound(ok);
    onAnswered(ok);
    if (!ok) addCurrentMistake(getLocalizedOption(option, uiLang));

    if (isBlitz) window.setTimeout(goNext, 520);
  }

  function checkTyping() {
    if (!qBase || qBase.mode !== "typing" || typedChecked) return;

    const ok = norm(typed) === norm(qBase.sk);
    playFeedbackSound(ok);
    setTypedChecked({ ok });
    onAnswered(ok);
    if (!ok) addCurrentMistake(typed);

    if (isBlitz) window.setTimeout(goNext, 620);
  }

  useEffect(() => {
    if (phase !== "quiz" || timeLeft === null) return;

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
    if (phase !== "quiz" || !session.length || current < session.length) return;
    finishSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, current, session.length]);

  useEffect(() => {
    if (phase !== "quiz" || !qBase || qBase.mode !== "typing") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Enter" || typedChecked || !typed.trim()) return;
      event.preventDefault();
      checkTyping();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, qBase, typed, typedChecked]);

  if (!ready) {
    return (
      <main className="mx-auto max-w-4xl p-4">
        <div className="flunio-card rounded-3xl p-6 theme-text">{t.loading}</div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 p-4 theme-text">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-amber-500">
            <span>✦</span> Premium Lab
          </div>
          <h1 className="text-2xl font-bold theme-text sm:text-3xl">{t.title}</h1>
          <p className="mt-1 max-w-2xl text-sm theme-text-muted">{t.subtitle}</p>
        </div>

        <Link
          href="/practice/words"
          className="theme-secondary-button w-fit rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
        >
          {t.wordsSrs}
        </Link>
      </div>

      {notEnough ? (
        <div className="flunio-card space-y-3 rounded-3xl p-6">
          <p className="font-medium theme-text">{t.notEnoughTitle}</p>
          <p className="text-sm theme-text-muted">{t.notEnoughHint}</p>
        </div>
      ) : null}

      {phase === "setup" ? (
        <section className="flunio-card space-y-6 rounded-3xl p-5 sm:p-6">
          <div>
            <h2 className="text-xl font-bold theme-text">{t.setupTitle}</h2>
            <p className="mt-1 text-sm theme-text-muted">
              {uiLang === "en"
                ? "Each mode trains a different real-life skill."
                : uiLang === "ru"
                  ? "Каждый режим тренирует отдельный навык для реальной жизни."
                  : "Кожен режим тренує окрему навичку для реального життя."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {modeCards.map((mode) => {
              const active = sessionMode === mode.id;
              const wide = mode.id === "blitz";

              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setSessionMode(mode.id)}
                  className={`group relative overflow-hidden rounded-3xl border p-4 text-left transition duration-200 hover:-translate-y-0.5 ${
                    wide ? "sm:col-span-2" : ""
                  } ${
                    active
                      ? "border-cyan-400/70 bg-cyan-400/10 shadow-[0_0_28px_rgba(34,211,238,0.12)] ring-2 ring-cyan-400/20"
                      : "theme-home-soft-card hover:border-cyan-400/35"
                  }`}
                >
                  {active ? (
                    <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-xs font-bold text-white">
                      ✓
                    </div>
                  ) : null}

                  <div className="flex items-start gap-3 pr-7">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-2xl shadow-sm theme-simple:border-slate-200 theme-simple:bg-white">
                      {mode.icon}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold theme-text">{mode.title}</span>
                        {mode.badge ? (
                          <span className="rounded-full border border-fuchsia-400/25 bg-fuchsia-400/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-fuchsia-500">
                            {mode.badge}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm leading-5 theme-text-muted">
                        {mode.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {isBlitz ? (
            <div className="rounded-3xl border border-amber-400/25 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-fuchsia-400/10 p-4">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⚡</div>
                <div>
                  <div className="font-bold theme-text">Blitz 2.0</div>
                  <p className="mt-1 text-sm leading-5 theme-text-muted">{t.blitzHint}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-sm font-semibold theme-text-muted">{t.setupCount}</div>
              <div className="grid grid-cols-4 gap-2">
                {[8, 12, 16, 20].map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`rounded-2xl border px-3 py-2.5 text-sm font-bold transition ${
                      questionCount === count
                        ? "border-cyan-400/60 bg-cyan-400/15 text-cyan-500 ring-2 ring-cyan-400/15"
                        : "theme-secondary-button"
                    }`}
                  >
                    {count}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="theme-home-soft-card rounded-3xl p-4 text-sm theme-text-muted">
            <div className="mb-3 font-bold theme-text">{t.record}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <div className="theme-pill rounded-2xl px-3 py-2.5">
                <div className="text-xs theme-text-subtle">{t.accuracy}</div>
                <b className="mt-1 block text-lg theme-text">{stats.bestAccuracyPct}%</b>
              </div>
              <div className="theme-pill rounded-2xl px-3 py-2.5">
                <div className="text-xs theme-text-subtle">{t.bestStreak}</div>
                <b className="mt-1 block text-lg theme-text">{stats.bestStreak}</b>
              </div>
              <div className="theme-pill rounded-2xl px-3 py-2.5">
                <div className="text-xs theme-text-subtle">{t.bestScore}</div>
                <b className="mt-1 block text-lg theme-text">{stats.bestScore}</b>
              </div>
              <div className="theme-pill rounded-2xl px-3 py-2.5">
                <div className="text-xs theme-text-subtle">{t.bestBlitz}</div>
                <b className="mt-1 block text-lg theme-text">{stats.bestBlitzPoints}</b>
              </div>
            </div>
          </div>

          <button
            onClick={() => startNew(slangTermList ?? undefined)}
            disabled={notEnough}
            className="theme-primary-button w-full rounded-2xl px-5 py-3.5 font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0 sm:w-auto"
          >
            {t.start}
          </button>
        </section>
      ) : null}

      {phase === "result" ? (
        <section className="flunio-card space-y-5 rounded-3xl p-5 sm:p-6">
          <h2 className="text-xl font-bold theme-text">{t.resultTitle}</h2>

          <div className="theme-home-soft-card rounded-3xl p-4">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{resultMood.emoji}</div>
              <div>
                <div className="text-lg font-bold theme-text">{resultMood.title}</div>
                <p className="mt-1 text-sm theme-text-muted">{resultMood.text}</p>
              </div>
            </div>
          </div>

          <div className={`grid gap-2 ${isBlitz ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
            <div className="theme-pill rounded-2xl px-3 py-3 text-sm theme-text-muted">
              <div className="text-xs theme-text-subtle">{t.yourResult}</div>
              <b className="mt-1 block text-lg theme-text">{score} / {answeredCount}</b>
            </div>
            <div className="theme-pill rounded-2xl px-3 py-3 text-sm theme-text-muted">
              <div className="text-xs theme-text-subtle">{t.accuracy}</div>
              <b className="mt-1 block text-lg theme-text">{accuracyPct}%</b>
            </div>
            <div className="theme-pill rounded-2xl px-3 py-3 text-sm theme-text-muted">
              <div className="text-xs theme-text-subtle">{t.bestStreak}</div>
              <b className="mt-1 block text-lg theme-text">{bestStreakSession}</b>
            </div>
            {isBlitz ? (
              <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 px-3 py-3 text-sm">
                <div className="text-xs text-amber-600">{t.blitzPoints}</div>
                <b className="mt-1 block text-lg text-amber-500">{blitzPoints}</b>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => startNew(slangTermList ?? undefined)}
              className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 active:translate-y-0"
            >
              {uiLang === "en" ? "Play again 🔁" : uiLang === "ru" ? "Ещё раз 🔁" : "Ще раз 🔁"}
            </button>

            <button
              onClick={() => {
                setPhase("setup");
                setSession([]);
                setTimeLeft(null);
              }}
              className="theme-secondary-button rounded-2xl px-5 py-3 text-sm font-bold transition"
            >
              {uiLang === "en"
                ? "Change mode ⚙️"
                : uiLang === "ru"
                  ? "Изменить режим ⚙️"
                  : "Змінити режим ⚙️"}
            </button>

            <button
              onClick={() => startNew(mistakes.map((mistake) => mistake.sk))}
              disabled={mistakes.length === 0}
              className="theme-secondary-button rounded-2xl px-5 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.retryMistakes}
            </button>
          </div>

          <div className="space-y-2 pt-2">
            <div className="text-sm font-bold theme-text">{t.mistakesTitle}</div>

            {mistakes.length === 0 ? (
              <div className="text-sm theme-text-muted">{t.noMistakes}</div>
            ) : (
              <div className="space-y-2">
                {mistakes.slice(0, 20).map((mistake, index) => {
                  const translation =
                    uiLang === "en" ? mistake.en : uiLang === "ru" ? mistake.ru : mistake.ua;

                  return (
                    <div
                      key={`${mistake.sk}-${index}`}
                      className="theme-home-soft-card rounded-2xl p-3"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="font-medium theme-text">
                          {mistake.sk} — <span className="theme-text-muted">{translation}</span>
                        </div>
                        <SpeakButton text={mistake.sk} />
                      </div>
                      {mistake.your ? (
                        <div className="mt-1 text-sm theme-text-subtle">
                          {t.yourAnswer}{" "}
                          <span className="font-medium theme-text-muted">{mistake.your}</span>
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
        <section className="flunio-card space-y-5 rounded-3xl p-5 sm:p-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm theme-text-subtle">
              <div>
                {t.questionLabel} {current + 1} / {session.length}
              </div>

              <div className="flex items-center gap-2">
                <div className="theme-pill rounded-full px-3 py-1">
                  {isBlitz
                    ? t.blitzBadge
                    : qBase.mode === "mcq"
                      ? t.mcqBadge
                      : qBase.mode === "listening"
                        ? t.listeningBadge
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
              <div className="relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-r from-amber-400/10 via-orange-400/10 to-fuchsia-400/10 px-4 py-3 theme-text">
                {timeBonusFlash ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-emerald-500/90 text-lg font-black text-white backdrop-blur-sm">
                    ⏱ {t.timeBonus}
                  </div>
                ) : null}

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="text-xs theme-text-subtle">{t.timeLeft}</div>
                    <div className={`mt-1 text-xl font-black ${timeLeft <= 10 ? "text-red-500" : "theme-text"}`}>
                      {timeLeft}s
                    </div>
                  </div>
                  <div>
                    <div className="text-xs theme-text-subtle">{t.points}</div>
                    <div className="mt-1 text-xl font-black text-amber-500">{blitzPoints}</div>
                  </div>
                  <div>
                    <div className="text-xs theme-text-subtle">{t.combo}</div>
                    <div className="mt-1 text-xl font-black text-fuchsia-500">×{blitzMultiplier}</div>
                  </div>
                </div>

                <div className="theme-progress-track mt-3 h-2 w-full overflow-hidden rounded-full">
                  <div
                    className={`h-2 transition-all duration-500 ${
                      timeLeft <= 10
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : "bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400"
                    }`}
                    style={{ width: `${Math.max(0, (timeLeft / BLITZ_MAX_SECONDS) * 100)}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="theme-progress-track h-2 w-full overflow-hidden rounded-full">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-fuchsia-400 transition-all"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            )}

            <div className="flex items-center gap-2 text-xs">
              <span className="theme-text-subtle">
                {t.accuracy}: {accuracyPct}%
              </span>

              <span
                className={`rounded-full border px-2 py-1 text-xs font-bold ${
                  streakLevel === "legend"
                    ? "border-purple-400/30 bg-purple-500/15 text-purple-400"
                    : streakLevel === "fire"
                      ? "border-orange-400/30 bg-orange-500/15 text-orange-500"
                      : streakLevel === "warm"
                        ? "border-emerald-400/30 bg-emerald-500/15 text-emerald-500"
                        : "theme-pill"
                }`}
              >
                🔥 {streak}
              </span>
            </div>
          </div>

          {(() => {
            const { prompt, helper } = makePromptAndHelper(qBase, uiLang, courseId);

            return (
              <>
                <div className="space-y-3">
                  <p className="text-lg font-bold theme-text">{prompt}</p>

                  {qBase.mode === "listening" ? (
                    <div className="flex flex-col items-center rounded-3xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-6 text-center">
                      <div className="mb-3 text-4xl">🎧</div>
                      <SpeakButton
                        text={qBase.sk}
                        autoPlayKey={`listening-${qBase.id}-${current}`}
                        label={`🔊 ${t.listenAgain}`}
                        className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5"
                      />
                      <div className="mt-3 text-xs theme-text-subtle">
                        {uiLang === "en"
                          ? "The written word stays hidden until you answer."
                          : uiLang === "ru"
                            ? "Написание слова скрыто до ответа."
                            : "Написання слова приховане до відповіді."}
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm theme-text-muted">
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
                          className="cursor-not-allowed rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs theme-text-subtle opacity-60 theme-simple:border-slate-200 theme-simple:bg-slate-100"
                          title={t.revealLock}
                        >
                          🔒
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {qBase.mode === "mcq" ? (
                  <div className="space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {qBase.options.map((option) => {
                        const isCorrect = !!selected && option === qBase.sk;
                        const isWrong = selected === option && option !== qBase.sk;

                        return (
                          <div key={option} className="flex items-stretch gap-2">
                            <button
                              type="button"
                              disabled={!!selected}
                              onClick={() => checkMcq(option)}
                              className={`flex min-w-0 flex-1 items-center rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                                isCorrect
                                  ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_22px_rgba(16,185,129,0.28)] ring-2 ring-emerald-400/35"
                                  : isWrong
                                    ? "border-red-500 bg-red-500 text-white shadow-[0_0_22px_rgba(239,68,68,0.24)] ring-2 ring-red-400/35"
                                    : !selected
                                      ? "theme-secondary-button hover:-translate-y-0.5"
                                      : "theme-secondary-button opacity-70"
                              }`}
                            >
                              {option}
                            </button>

                            <SpeakButton
                              text={option}
                              label="🔊"
                              className="theme-secondary-button flex w-12 shrink-0 items-center justify-center rounded-2xl text-sm"
                            />
                          </div>
                        );
                      })}
                    </div>

                    {selected ? (
                      <AnswerFeedback
                        ok={selected === qBase.sk}
                        helper={helper}
                        isBlitz={isBlitz}
                        onNext={goNext}
                        nextLabel={t.next}
                        uiLang={uiLang}
                      />
                    ) : null}
                  </div>
                ) : qBase.mode === "listening" ? (
                  <div className="space-y-3">
                    <div className="grid gap-2 sm:grid-cols-2">
                      {qBase.options.map((option) => {
                        const label = getLocalizedOption(option, uiLang);
                        const isCorrect = !!selected && option.sk === qBase.sk;
                        const isWrong = selected === option.sk && option.sk !== qBase.sk;

                        return (
                          <button
                            key={`${option.sk}-${label}`}
                            type="button"
                            disabled={!!selected}
                            onClick={() => checkListening(option)}
                            className={`rounded-2xl border px-4 py-3 text-left font-semibold transition ${
                              isCorrect
                                ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_22px_rgba(16,185,129,0.28)] ring-2 ring-emerald-400/35"
                                : isWrong
                                  ? "border-red-500 bg-red-500 text-white shadow-[0_0_22px_rgba(239,68,68,0.24)] ring-2 ring-red-400/35"
                                  : !selected
                                    ? "theme-secondary-button hover:-translate-y-0.5"
                                    : "theme-secondary-button opacity-70"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>

                    {selected ? (
                      <AnswerFeedback
                        ok={selected === qBase.sk}
                        helper={helper}
                        isBlitz={isBlitz}
                        onNext={goNext}
                        nextLabel={t.next}
                        uiLang={uiLang}
                      />
                    ) : null}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      value={typed}
                      onChange={(event) => setTyped(event.target.value)}
                      placeholder={t.placeholder}
                      autoFocus
                      className="theme-input w-full rounded-2xl px-4 py-3 outline-none transition focus:border-cyan-400/55 focus:ring-2 focus:ring-cyan-400/20"
                      disabled={!!typedChecked}
                    />

                    <div className="text-sm theme-text-subtle">{t.hintNoDiacritics}</div>

                    {!typedChecked ? (
                      <button
                        onClick={checkTyping}
                        disabled={!typed.trim()}
                        className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40 active:translate-y-0"
                      >
                        {t.check}
                      </button>
                    ) : (
                      <AnswerFeedback
                        ok={typedChecked.ok}
                        helper={helper}
                        isBlitz={isBlitz}
                        onNext={goNext}
                        nextLabel={t.next}
                        uiLang={uiLang}
                        wrongText={`${t.wrongPrefix} ${qBase.sk}`}
                      />
                    )}
                  </div>
                )}
              </>
            );
          })()}
        </section>
      ) : null}
    </main>
  );
}

type AnswerFeedbackProps = {
  ok: boolean;
  helper: string;
  isBlitz: boolean;
  onNext: () => void;
  nextLabel: string;
  uiLang: Lang;
  wrongText?: string;
};

function AnswerFeedback({
  ok,
  helper,
  isBlitz,
  onNext,
  nextLabel,
  uiLang,
  wrongText,
}: AnswerFeedbackProps) {
  const title = ok
    ? uiLang === "en"
      ? "Nice! 🔥"
      : uiLang === "ru"
        ? "Отлично! 🔥"
        : "Клас! 🔥"
    : uiLang === "en"
      ? "Not quite 😅"
      : uiLang === "ru"
        ? "Не совсем 😅"
        : "Майже 😅";

  return (
    <div className="space-y-3">
      <div
        className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-sm ${
          ok
            ? "border-emerald-500 bg-emerald-500 text-white shadow-[0_0_18px_rgba(16,185,129,0.22)]"
            : "border-red-500 bg-red-500 text-white shadow-[0_0_18px_rgba(239,68,68,0.2)]"
        }`}
      >
        <div className="font-bold">{title}</div>
        {wrongText ? <div className="mt-1">{wrongText}</div> : null}
      </div>

      <div className="theme-home-soft-card rounded-2xl px-4 py-3 text-sm theme-text-muted">
        {helper}
      </div>

      {!isBlitz ? (
        <button
          onClick={onNext}
          className="theme-primary-button rounded-2xl px-5 py-3 text-sm font-bold transition hover:-translate-y-0.5 active:translate-y-0"
        >
          {nextLabel}
        </button>
      ) : null}
    </div>
  );
}