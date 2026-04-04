"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/app/components/SpeakButton";
import { getSrsWordsForCourse } from "@/app/learning/courses/dictionary";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { useLanguage } from "@/lib/src/useLanguage";
import { SLANG_SK, SLANG_CS } from "@/data/slang";
import CourseGate from "@/app/components/CourseGate";

type Lang = "ua" | "ru" | "en";
type Mode = "mcq" | "typing";
type SessionMode = "mixed" | "mcq" | "typing";

type SessionQuestionBase =
  | {
    id: string;
    mode: "mcq";
    sk: string;
    ua: string;
    ru: string;
    en: string;
    options: string[];
  }
  | {
    id: string;
    mode: "typing";
    sk: string;
    ua: string;
    ru: string;
    en: string;
  };

const UI = {
  ua: {
    title: "Тренування 🏋️",
    loading: "Завантаження…",
    notEnoughTitle: "Недостатньо слів для тренування.",
    notEnoughHint: "Додай хоча б 4 слова з перекладом для UA, RU або EN.",
    wordsSrs: "🧠 Words (SRS)",

    setupTitle: "Налаштування тренування",
    setupCount: "Кількість питань",
    setupMode: "Режим",
    modeMixed: "Mixed (і вибір, і ввід)",
    modeMcq: "Лише вибір відповіді",
    modeTyping: "Лише ввід слова",
    start: "Почати ▶",

    progress: "Прогрес",
    accuracy: "Точність",
    streak: "Серія",
    bestStreak: "Краща серія",
    record: "Рекорд",
    bestScore: "Найкращий результат",
    skip: "Пропустити →",

    resultTitle: "Результат 🏁",
    yourResult: "Твій результат",
    tryAgain: "Нове тренування ↻",
    retryMistakes: "Повторити тільки помилки 🔁",
    mistakesTitle: "Помилки",
    noMistakes: "Помилок немає — топ! ✅",

    questionLabel: "Питання",
    mcqBadge: "Вибір відповіді",
    typingBadge: "Ввід слова",
    listen: "Слухати правильну відповідь (після відповіді):",
    next: "Далі →",
    check: "Перевірити ✓",
    placeholder: "Введи слово мовою курсу...",
    correct: "Правильно!",
    wrongPrefix: "Неправильно. Правильна відповідь:",
    yourAnswer: "Твоя відповідь:",
    prompt: (tr: string) => `Як буде мовою курсу слово «${tr}»?`,
    helper: (sk: string, tr: string) => `Мовою курсу: ${sk} — «${tr}»`,
    revealLock: "Відповідай, щоб відкрити озвучку",
  },
  ru: {
    title: "Тренировка 🏋️",
    loading: "Загрузка…",
    notEnoughTitle: "Недостаточно слов для тренировки.",
    notEnoughHint: "Добавь хотя бы 4 слова с переводом для UA, RU или EN.",
    wordsSrs: "🧠 Words (SRS)",

    setupTitle: "Настройки тренировки",
    setupCount: "Количество вопросов",
    setupMode: "Режим",
    modeMixed: "Mixed (и выбор, и ввод)",
    modeMcq: "Только выбор ответа",
    modeTyping: "Только ввод слова",
    start: "Начать ▶",

    progress: "Прогресс",
    accuracy: "Точность",
    streak: "Серия",
    bestStreak: "Лучшая серия",
    record: "Рекорд",
    bestScore: "Лучший результат",
    skip: "Пропустить →",

    resultTitle: "Результат 🏁",
    yourResult: "Твой результат",
    tryAgain: "Новая тренировка ↻",
    retryMistakes: "Повторить только ошибки 🔁",
    mistakesTitle: "Ошибки",
    noMistakes: "Ошибок нет — отлично! ✅",

    questionLabel: "Вопрос",
    mcqBadge: "Выбор ответа",
    typingBadge: "Ввод слова",
    listen: "Слушать правильный ответ (после ответа):",
    next: "Далее →",
    check: "Проверить ✓",
    placeholder: "Введи слово на языке курса...",
    correct: "Правильно!",
    wrongPrefix: "Неверно. Правильный ответ:",
    yourAnswer: "Твой ответ:",
    prompt: (tr: string) => `Как будет на языке курса слово «${tr}»?`,
    helper: (sk: string, tr: string) => `На языке курса: ${sk} — «${tr}»`,
    revealLock: "Ответь, чтобы открыть озвучку",
  },
  en: {
    title: "Practice 🏋️",
    loading: "Loading…",
    notEnoughTitle: "Not enough words for practice.",
    notEnoughHint: "Add at least 4 words with UA, RU or EN translation.",
    wordsSrs: "🧠 Words (SRS)",

    setupTitle: "Practice settings",
    setupCount: "Number of questions",
    setupMode: "Mode",
    modeMixed: "Mixed (choice and typing)",
    modeMcq: "Multiple choice only",
    modeTyping: "Typing only",
    start: "Start ▶",

    progress: "Progress",
    accuracy: "Accuracy",
    streak: "Streak",
    bestStreak: "Best streak",
    record: "Record",
    bestScore: "Best score",
    skip: "Skip →",

    resultTitle: "Result 🏁",
    yourResult: "Your result",
    tryAgain: "New practice ↻",
    retryMistakes: "Retry mistakes only 🔁",
    mistakesTitle: "Mistakes",
    noMistakes: "No mistakes — great! ✅",

    questionLabel: "Question",
    mcqBadge: "Multiple choice",
    typingBadge: "Typing",
    listen: "Listen to the correct answer (after answering):",
    next: "Next →",
    check: "Check ✓",
    placeholder: "Type the course language word...",
    correct: "Correct!",
    wrongPrefix: "Wrong. Correct answer:",
    yourAnswer: "Your answer:",
    prompt: (tr: string) => `How do you say “${tr}” in the course language?`,
    helper: (sk: string, tr: string) => `In the course language: ${sk} — “${tr}”`,
    revealLock: "Answer first to unlock audio",
  },
} as const;

const LS_KEY = "slovakStudy.practiceStats.v1";

type PracticeStats = {
  bestAccuracyPct: number;
  bestStreak: number;
  bestScore: number;
};

function loadStats(): PracticeStats {
  if (typeof window === "undefined")
    return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };
    const parsed = JSON.parse(raw);
    return {
      bestAccuracyPct: Number(parsed?.bestAccuracyPct) || 0,
      bestStreak: Number(parsed?.bestStreak) || 0,
      bestScore: Number(parsed?.bestScore) || 0,
    };
  } catch {
    return { bestAccuracyPct: 0, bestStreak: 0, bestScore: 0 };
  }
}

function saveStats(next: PracticeStats) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(next));
  } catch {}
}

function norm(s: string) {
  return s.trim().toLowerCase();
}
function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function sample<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

function getTerm(word: any): string {
  return String(word?.term ?? word?.sk ?? "").trim();
}

function getTrans(word: any, lang: Lang): string | null {
  const value =
    lang === "en"
      ? word.en ?? word.ua
      : lang === "ru"
        ? word.ru ?? word.ua
        : word.ua;

  return typeof value === "string" && value.trim() ? value : null;
}

function buildSessionBase(
  words: any[],
  count: number,
  sessionMode: SessionMode,
  sourceTermList?: string[]
): SessionQuestionBase[] {
  const pool = words
    .map((w, idx) => {
      const term = getTerm(w);
      return {
        ...w,
        __term: term,
        __id: `${term || "x"}-${idx}`,
        __ua: getTrans(w, "ua"),
        __ru: getTrans(w, "ru"),
        __en: getTrans(w, "en"),
      };
    })
    .filter((w) => w.__term && w.__ua && w.__ru && w.__en);

  if (pool.length < 4) return [];

  const filteredPool = sourceTermList?.length
    ? pool.filter((w) => sourceTermList.includes(w.__term))
    : pool;

  const picked = sample(filteredPool, count);

  return picked.map((w, i) => {
    let mode: Mode;

    if (sessionMode === "mcq") mode = "mcq";
    else if (sessionMode === "typing") mode = "typing";
    else mode = i % 3 === 0 ? "typing" : "mcq";

    if (mode === "typing") {
      return {
        id: `${w.__id}-typing`,
        mode: "typing",
        sk: w.__term,
        ua: w.__ua!,
        ru: w.__ru!,
        en: w.__en!,
      };
    }

    const distractors = sample(
      pool.filter((x) => x.__term !== w.__term).map((x) => x.__term),
      3
    );

    const options = shuffle([w.__term, ...distractors]).slice(0, 4);

    return {
      id: `${w.__id}-mcq`,
      mode: "mcq",
      sk: w.__term,
      ua: w.__ua!,
      ru: w.__ru!,
      en: w.__en!,
      options,
    };
  });
}

function makePromptAndHelper(q: SessionQuestionBase, lang: Lang) {
  const tr = lang === "en" ? q.en : lang === "ru" ? q.ru : q.ua;
  const t = UI[lang];

  return {
    prompt: t.prompt(tr),
    helper: t.helper(q.sk, tr),
  };
}

export default function PracticePage() {
  const { lang } = useLanguage();
  const uiLang: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = UI[uiLang];

  const { courseId } = useActiveCourse();

  const [ready, setReady] = useState(false);
  const words = useMemo(() => getSrsWordsForCourse(courseId), [courseId]);

  const urlParams = useMemo(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search);
  }, [ready]);

  const pack = urlParams?.get("pack");
  const slangLevel = urlParams?.get("level");
  const slangCat = urlParams?.get("cat");

  const [sessionMode, setSessionMode] = useState<SessionMode>("mixed");
  const [questionCount, setQuestionCount] = useState<number>(12);

  const [phase, setPhase] = useState<"setup" | "quiz" | "result">("setup");
  const [session, setSession] = useState<SessionQuestionBase[]>([]);

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

  const [mistakes, setMistakes] = useState<
    { sk: string; ua: string; ru: string; en: string; mode: Mode; your?: string }[]
  >([]);

  const poolCount = useMemo(() => {
    const pool = (words as any[])
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
  const accuracyPct = session.length
    ? Math.round((score / session.length) * 100)
    : 0;

  const canRevealAnswer = useMemo(() => {
    if (!qBase) return false;
    if (qBase.mode === "typing") return true;
    return !!selected;
  }, [qBase, selected]);

  function startNew(customTermList?: string[]) {
    const built = buildSessionBase(
      words as any[],
      questionCount,
      sessionMode,
      customTermList
    );

    setSession(built);
    setCurrent(0);
    setScore(0);
    setMistakes([]);

    setStreak(0);
    setBestStreakSession(0);

    setSelected(null);
    setTyped("");
    setTypedChecked(null);

    if (built.length < 4) {
      setPhase("setup");
      return;
    }

    setPhase("quiz");
  }

  function goNext() {
    const next = current + 1;
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
    setCurrent(next);

    if (next >= session.length) {
      setPhase("result");
      finalizeRecords();
    }
  }

  function skip() {
    setStreak(0);

    const next = current + 1;
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
    setCurrent(next);

    if (next >= session.length) {
      setPhase("result");
      finalizeRecords();
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
  }

  function checkTyping() {
    if (!qBase || qBase.mode !== "typing") return;

    const ok = norm(typed) === norm(qBase.sk);
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
  }

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

  useEffect(() => {
    if (phase !== "quiz") return;
    if (!session.length) return;
    if (current < session.length) return;
    setPhase("result");
    finalizeRecords();
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
    <CourseGate>
      <main className="mx-auto max-w-3xl p-4 space-y-6">
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
          <div className="rounded-2xl border bg-white p-6 space-y-3">
            <p className="font-medium">{t.notEnoughTitle}</p>
            <p className="text-sm text-gray-600">{t.notEnoughHint}</p>
          </div>
        ) : null}

        {phase === "setup" ? (
          <section className="rounded-2xl border bg-white p-6 space-y-4">
            <h2 className="text-lg font-semibold">{t.setupTitle}</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">
                  {t.setupCount}
                </div>
                <select
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="w-full rounded-xl border px-3 py-2"
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={16}>16</option>
                  <option value={20}>20</option>
                </select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">
                  {t.setupMode}
                </div>
                <select
                  value={sessionMode}
                  onChange={(e) => setSessionMode(e.target.value as SessionMode)}
                  className="w-full rounded-xl border px-3 py-2"
                >
                  <option value="mixed">{t.modeMixed}</option>
                  <option value="mcq">{t.modeMcq}</option>
                  <option value="typing">{t.modeTyping}</option>
                </select>
              </div>
            </div>

            <div className="rounded-2xl border bg-slate-50 p-4 text-sm">
              <div className="font-semibold mb-2">{t.record}</div>
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
          <section className="rounded-2xl border bg-white p-6 space-y-4">
            <h2 className="text-xl font-semibold">{t.resultTitle}</h2>

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
              <div className="font-semibold mb-2">{t.record}</div>
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
                onClick={() => {
                  setPhase("setup");
                  setSession([]);
                }}
                className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
              >
                {t.tryAgain}
              </button>

              <button
                onClick={() => startNew(mistakes.map((m) => m.sk))}
                disabled={mistakes.length === 0}
                className="rounded-xl border px-4 py-2 hover:bg-slate-50 disabled:opacity-40"
              >
                {t.retryMistakes}
              </button>
            </div>

            <div className="pt-2 space-y-2">
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
          <section className="rounded-2xl border bg-white p-6 space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  {t.questionLabel} {current + 1} / {session.length}
                </div>

                <div className="flex items-center gap-2">
                  <div className="rounded-full border px-3 py-1">
                    {qBase.mode === "mcq" ? t.mcqBadge : t.typingBadge}
                  </div>

                  <button
                    onClick={skip}
                    className="rounded-full border px-3 py-1 hover:bg-slate-50"
                  >
                    {t.skip}
                  </button>
                </div>
              </div>

              <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-2 bg-slate-900"
                  style={{ width: `${progressPct}%` }}
                />
              </div>

              <div className="text-xs text-slate-600">
                {t.progress}: {progressPct}% • {t.accuracy}: {accuracyPct}% •{" "}
                {t.streak}: <b>{streak}</b> • {t.bestStreak}:{" "}
                <b>{bestStreakSession}</b>
              </div>
            </div>

            {(() => {
              const { prompt, helper } = makePromptAndHelper(qBase, uiLang);

              return (
                <>
                  <div className="space-y-2">
                    <p className="font-medium text-lg">{prompt}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{t.listen}</span>

                      {canRevealAnswer ? (
                        <SpeakButton
                          text={qBase.sk}
                          autoPlayKey={
                            qBase.mode === "mcq" ? revealAutoKey : undefined
                          }
                        />
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="rounded-lg border bg-white px-2 py-1 text-xs opacity-50 cursor-not-allowed"
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
                              className={`w-full rounded-xl border px-4 py-3 text-left transition flex items-center justify-between
${isCorrect ? "bg-green-100 border-green-400" : ""}
${isWrong ? "bg-red-100 border-red-400" : ""}
${!selected
                                  ? "hover:bg-slate-50 cursor-pointer"
                                  : "opacity-95 cursor-default"
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
                              className={`rounded-xl border px-4 py-3 text-sm ${
                                typedChecked.ok
                                  ? "bg-green-100 border-green-400"
                                  : "bg-red-100 border-red-400"
                              }`}
                            >
                              {typedChecked.ok
                                ? t.correct
                                : `${t.wrongPrefix} ${qBase.sk}`}
                            </div>

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
                      </div>
                    </>
                  )}
                </>
              );
            })()}
          </section>
        ) : null}
      </main>
    </CourseGate>
  );
}