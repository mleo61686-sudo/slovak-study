"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { finishLessonQuiz } from "@/lib/src/progress";
import ReportErrorButton from "@/app/components/ReportErrorButton";

import type { Word, ExerciseDef } from "./types";
import { trWord } from "./helpers";
import { phraseKey } from "@/app/learning/phrases/phraseKey";

const exerciseEnterStyle = `
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

type UiLang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

function ExerciseLoading() {
  return (
    <div className="theme-inner-card rounded-2xl p-4">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-56 rounded bg-white/10" />
        <div className="mx-auto h-[220px] w-full max-w-[320px] rounded-2xl bg-white/10" />
        <div className="mx-auto h-10 w-10 rounded-full bg-white/10" />
        <div className="space-y-3">
          <div className="h-12 w-full rounded-xl bg-white/10" />
          <div className="h-12 w-full rounded-xl bg-white/10" />
          <div className="h-12 w-full rounded-xl bg-white/10" />
          <div className="h-12 w-full rounded-xl bg-white/10" />
        </div>
      </div>
    </div>
  );
}

const ChooseTranslation = dynamic(
  () =>
    import(
      "@/app/learning/components/LevelClient/exercises/ChooseTranslation"
    ),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const ChooseSlovak = dynamic(
  () => import("@/app/learning/components/LevelClient/exercises/ChooseSlovak"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const WriteWord = dynamic(
  () => import("@/app/learning/components/LevelClient/exercises/WriteWord"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const AudioQuiz = dynamic(
  () => import("@/app/learning/components/LevelClient/exercises/AudioQuiz"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const MatchColumns = dynamic(
  () => import("@/app/learning/components/LevelClient/exercises/MatchColumns"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const BuildSentence = dynamic(
  () => import("@/app/learning/components/LevelClient/exercises/BuildSentence"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

const BuildUaSentence = dynamic(
  () =>
    import("@/app/learning/components/LevelClient/exercises/BuildUaSentence"),
  {
    ssr: false,
    loading: () => <ExerciseLoading />,
  }
);

function preloadExerciseModules() {
  return Promise.all([
    import("@/app/learning/components/LevelClient/exercises/ChooseTranslation"),
    import("@/app/learning/components/LevelClient/exercises/ChooseSlovak"),
    import("@/app/learning/components/LevelClient/exercises/WriteWord"),
    import("@/app/learning/components/LevelClient/exercises/AudioQuiz"),
    import("@/app/learning/components/LevelClient/exercises/MatchColumns"),
    import("@/app/learning/components/LevelClient/exercises/BuildSentence"),
    import("@/app/learning/components/LevelClient/exercises/BuildUaSentence"),
  ]);
}

function uiLangFrom(lang: string): UiLang {
  if (lang === "ru") return "ru";
  if (lang === "en") return "en";
  return "ua";
}

const UI = {
  ua: {
    viewed: "Переглянуто",
    back: "← Назад",
    next: "Далі →",
    startExercises: "Почати вправи 🧠",
    exercise: "Вправа",
    word: "Слово",
    lesson: "Урок",
    levelDone: "Рівень пройдено 🎉",
    result: "Результат",
    nextLockedTitle: "Наступний урок зараз закритий 🔒",
    nextLockedDefault:
      "У безкоштовній версії є ліміт/послідовність рівнів. Повернись до списку уроків.",
    reviewAgain: "Переглянути слова знову",
    goNextLevel: "Перейти до наступного рівня →",
    toLessonsList: "До списку уроків",
    notAvailableFree: "Недоступно у free",
    saving: "Зберігаю прогрес…",

    introEyebrow: "Старт уроку",
    introTitle: "Що сьогодні вчимо?",
    introSubtitle:
      "Ось 10 слів, які зараз потренуємо. Можеш послухати вимову — і погнали.",
    introCount: "слів у цьому уроці",
    introHint:
      "Не треба зубрити їх одразу. Просто ознайомся — далі вправи допоможуть усе закріпити.",
    introReadyTitle: "Починаємо?",
    introReadyText:
      "Спочатку легкі вибори, потім аудіо, письмо, пари й речення.",
    courseSk: "Словацька",
    courseCs: "Чеська",
    coursePl: "Польська",

    exerciseChooseTranslation: "Вибір перекладу",
    exerciseChooseSlovak: "Вибір словацького слова",
    exerciseWriteWord: "Введення слова",
    exerciseAudioQuiz: "Аудіо-вправа",
    exerciseMatchColumns: "Пари (2 колонки)",
    exerciseBuildSentence: "Збери речення",
    exerciseBuildUaSentence: "Збери переклад",
  },
  ru: {
    viewed: "Просмотрено",
    back: "← Назад",
    next: "Далее →",
    startExercises: "Начать упражнения 🧠",
    exercise: "Упражнение",
    word: "Слово",
    lesson: "Урок",
    levelDone: "Уровень пройден 🎉",
    result: "Результат",
    nextLockedTitle: "Следующий урок сейчас закрыт 🔒",
    nextLockedDefault:
      "В бесплатной версии есть лимит/последовательность уроков. Вернись к списку уроков.",
    reviewAgain: "Посмотреть слова снова",
    goNextLevel: "Перейти к следующему уровню →",
    toLessonsList: "К списку уроков",
    notAvailableFree: "Недоступно в free",
    saving: "Сохраняю прогресс…",

    introEyebrow: "Старт урока",
    introTitle: "Что сегодня учим?",
    introSubtitle:
      "Вот 10 слов, которые сейчас потренируем. Можешь послушать произношение — и погнали.",
    introCount: "слов в этом уроке",
    introHint:
      "Не нужно сразу всё зубрить. Просто познакомься со словами — дальше упражнения помогут закрепить.",
    introReadyTitle: "Начинаем?",
    introReadyText:
      "Сначала лёгкий выбор, потом аудио, письмо, пары и предложения.",
    courseSk: "Словацкий",
    courseCs: "Чешский",
    coursePl: "Польский",

    exerciseChooseTranslation: "Выбор перевода",
    exerciseChooseSlovak: "Выбор словацкого слова",
    exerciseWriteWord: "Ввод слова",
    exerciseAudioQuiz: "Аудио-упражнение",
    exerciseMatchColumns: "Пары (2 колонки)",
    exerciseBuildSentence: "Собери предложение",
    exerciseBuildUaSentence: "Собери перевод",
  },
  en: {
    viewed: "Viewed",
    back: "← Back",
    next: "Next →",
    startExercises: "Start exercises 🧠",
    exercise: "Exercise",
    word: "Word",
    lesson: "Lesson",
    levelDone: "Level completed 🎉",
    result: "Result",
    nextLockedTitle: "The next lesson is locked right now 🔒",
    nextLockedDefault:
      "In the free version there is a lesson limit/sequence. Return to the lessons list.",
    reviewAgain: "Review words again",
    goNextLevel: "Go to the next level →",
    toLessonsList: "Back to lessons list",
    notAvailableFree: "Not available in free",
    saving: "Saving progress…",

    introEyebrow: "Lesson start",
    introTitle: "What are we learning today?",
    introSubtitle:
      "Here are 10 words we are going to practise. Listen to them if you want — then let’s go.",
    introCount: "words in this lesson",
    introHint:
      "No need to memorise everything right now. Get familiar with the words — the exercises will help you lock them in.",
    introReadyTitle: "Ready?",
    introReadyText:
      "First simple choices, then audio, typing, matching and sentences.",
    courseSk: "Slovak",
    courseCs: "Czech",
    coursePl: "Polish",

    exerciseChooseTranslation: "Choose the translation",
    exerciseChooseSlovak: "Choose the Slovak word",
    exerciseWriteWord: "Type the word",
    exerciseAudioQuiz: "Audio exercise",
    exerciseMatchColumns: "Match pairs (2 columns)",
    exerciseBuildSentence: "Build the sentence",
    exerciseBuildUaSentence: "Build the translation",
  },
} as const;

function getNextLevelId(levelId: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(levelId.toLowerCase());
  if (m) {
    const band = m[1];
    const n = Number(m[2]);

    if (band === "a0" && Number.isFinite(n) && n >= 30) return "a1-1";
    if (band === "a1" && Number.isFinite(n) && n >= 40) return "a2-1";
    if (band === "a2" && Number.isFinite(n) && n >= 50) return "b1-1";
    if (band === "b1" && Number.isFinite(n) && n >= 35) return "b2-1";
    if (band === "b2" && Number.isFinite(n) && n >= 50) return "/learning";

    if (Number.isFinite(n)) return `${band}-${n + 1}`;
  }

  const n = Number(levelId);
  if (Number.isFinite(n)) return String(n + 1);
  return levelId;
}

function isFreeStarterUnlimitedLesson(levelId: string) {
  const m = /^a0-(\d+)$/i.exec(String(levelId).toLowerCase());
  if (!m) return false;

  const n = Number(m[1]);
  return n >= 1 && n <= 10;
}

const EXERCISES: ExerciseDef[] = [
  { kind: "chooseTranslation", title: "chooseTranslation", mode: "perWord" },
  { kind: "chooseSlovak", title: "chooseSlovak", mode: "perWord" },
  { kind: "writeWord", title: "writeWord", mode: "perWord" },
  { kind: "audioQuiz", title: "audioQuiz", mode: "perWord" },
  { kind: "matchColumns", title: "matchColumns", mode: "perWord" },
  { kind: "buildSentence", title: "buildSentence", mode: "perWord" },
  { kind: "buildUaSentence", title: "buildUaSentence", mode: "perWord" },
];

function getExerciseTitle(
  kind: ExerciseDef["kind"],
  t: (typeof UI)[UiLang]
): string {
  switch (kind) {
    case "chooseTranslation":
      return t.exerciseChooseTranslation;
    case "chooseSlovak":
      return t.exerciseChooseSlovak;
    case "writeWord":
      return t.exerciseWriteWord;
    case "audioQuiz":
      return t.exerciseAudioQuiz;
    case "matchColumns":
      return t.exerciseMatchColumns;
    case "buildSentence":
      return t.exerciseBuildSentence;
    case "buildUaSentence":
      return t.exerciseBuildUaSentence;
    default:
      return t.exercise;
  }
}

function getCourseLabel(courseId: CourseId, t: (typeof UI)[UiLang]) {
  if (courseId === "cs") return t.courseCs;
  if (courseId === "pl") return t.coursePl;
  return t.courseSk;
}

export default function LevelClient({
  levelId,
  words,
  canGoNext = true,
  lockedReason,
  onLockedNextRedirect = "/learning",
  courseId = "sk",
}: {
  levelId: string;
  words: Word[];
  canGoNext?: boolean;
  lockedReason?: string;
  onLockedNextRedirect?: string;
  courseId?: CourseId;
}) {
  const router = useRouter();
  const { lang } = useLanguage();
  const t = UI[uiLangFrom(lang)];
  const nextLevelId = getNextLevelId(levelId);

  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quizAutoKey, setQuizAutoKey] = useState(0);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [savingNext, setSavingNext] = useState(false);
  const [canGoNextNow, setCanGoNextNow] = useState<boolean>(canGoNext);
  const [lockedReasonNow, setLockedReasonNow] = useState<string | undefined>(
    lockedReason
  );
  const [isNavigating, startNavigation] = useTransition();

  const audioUnlockedRef = useRef(false);
  const finishingRef = useRef(false);
  const advancingRef = useRef(false);

  function unlockInsideLesson() {
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    setAudioUnlocked(true);
  }

  function resetToLearn() {
    finishingRef.current = false;
    advancingRef.current = false;
    setMode("learn");
    setExerciseIndex(0);
    setWordIndex(0);
    setScore(0);
    setFinished(false);
  }

  function startQuiz() {
    unlockInsideLesson();
    advancingRef.current = false;
    setQuizAutoKey((k) => k + 1);
    setMode("quiz");
    setExerciseIndex(0);
    setWordIndex(0);
    setScore(0);
    setFinished(false);
  }

  useEffect(() => {
    setCanGoNextNow(canGoNext);
    setLockedReasonNow(lockedReason);
  }, [canGoNext, lockedReason]);

  useEffect(() => {
    advancingRef.current = false;
  }, [mode, exerciseIndex, wordIndex, finished]);

  useEffect(() => {
    router.prefetch(nextLevelId);
    router.prefetch(onLockedNextRedirect);
  }, [router, nextLevelId, onLockedNextRedirect]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mode !== "learn") return;

    const win = window as IdleWindow;

    const preload = () => {
      void preloadExerciseModules();
    };

    if (typeof win.requestIdleCallback === "function") {
      const idleId = win.requestIdleCallback(preload, { timeout: 1500 });

      return () => {
        if (typeof win.cancelIdleCallback === "function") {
          win.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = window.setTimeout(preload, 900);
    return () => window.clearTimeout(timeoutId);
  }, [mode]);

  useEffect(() => {
    if (mode !== "learn") return;

    function isTypingTarget(target: EventTarget | null) {
      const el = target as HTMLElement | null;
      if (!el) return false;

      const tag = el.tagName;
      return (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        el.isContentEditable ||
        el.getAttribute("role") === "textbox"
      );
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) return;
      if (isTypingTarget(event.target)) return;

      if (event.key === "Enter" || event.key === "ArrowRight") {
        unlockInsideLesson();
        event.preventDefault();
        startQuiz();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode]);

  const totalQuestions = useMemo(() => {
    return EXERCISES.reduce((sum, ex) => {
      return sum + (ex.mode === "perWord" ? words.length : words.length);
    }, 0);
  }, [words.length]);

  function finishLesson(finalScore: number) {
    if (finishingRef.current) return;
    finishingRef.current = true;

    setFinished(true);

    try {
      finishLessonQuiz(levelId, finalScore, totalQuestions);
    } catch (e) {
      console.error("Save local progress error", e);
    }

    (async () => {
      setSavingNext(true);
      try {
        const res = await fetch("/api/progress/lesson-done", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ levelId }),
        });

        const data = await res.json().catch(() => ({}));

        if (res.ok && data?.ok) {
          const dailyCount =
            typeof data?.dailyCount === "number" ? data.dailyCount : 0;

          const nextIsStarterUnlimited =
            isFreeStarterUnlimitedLesson(nextLevelId);
          const freeCanGoNext = nextIsStarterUnlimited || dailyCount < 2;

          if (freeCanGoNext) {
            setCanGoNextNow(true);
            setLockedReasonNow(undefined);
          } else {
            setCanGoNextNow(canGoNext);
          }
        }
      } catch (e) {
        console.error("Save server progress error", e);
      } finally {
        setSavingNext(false);
      }
    })();
  }

  function nextPerWord(correct: boolean) {
    if (advancingRef.current || finishingRef.current) return;
    advancingRef.current = true;

    const updatedScore = score + (correct ? 1 : 0);
    if (correct) setScore((s) => s + 1);

    const lastWord = wordIndex >= words.length - 1;
    const lastExercise = exerciseIndex >= EXERCISES.length - 1;

    if (!lastWord) {
      setWordIndex((i) => i + 1);
      return;
    }

    if (!lastExercise) {
      setExerciseIndex((e) => e + 1);
      setWordIndex(0);
      return;
    }

    finishLesson(updatedScore);
  }

  function doneWhole(correctCount: number) {
    if (advancingRef.current || finishingRef.current) return;
    advancingRef.current = true;

    const updatedScore = score + correctCount;
    setScore((s) => s + correctCount);

    const lastExercise = exerciseIndex >= EXERCISES.length - 1;
    if (!lastExercise) {
      setExerciseIndex((e) => e + 1);
      setWordIndex(0);
      return;
    }

    finishLesson(updatedScore);
  }

  function goTo(path: string) {
    startNavigation(() => {
      router.push(path);
    });
  }

  if (mode === "learn") {
    const courseLabel = getCourseLabel(courseId, t);

    return (
      <div
        className="space-y-5 pt-4 theme-text sm:space-y-6 sm:pt-0"
        onPointerDownCapture={unlockInsideLesson}
        onKeyDownCapture={unlockInsideLesson}
      >
        <div className="mx-auto w-full max-w-[1120px]">
          <div className="lesson-intro-shell flunio-card relative overflow-hidden rounded-[2rem] p-4 sm:p-6 lg:p-8">
            <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/50 to-transparent" />

            <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px] lg:items-start">
              <div className="space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="theme-pill inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.22em]">
                    {t.introEyebrow}
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold theme-text-muted backdrop-blur">
                    {courseLabel}
                  </span>

                  <span className="rounded-full border border-cyan-300/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-500">
                    {t.lesson} {levelId.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h1 className="max-w-3xl text-3xl font-black tracking-tight theme-text sm:text-4xl lg:text-5xl">
                    {t.introTitle}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-6 theme-text-muted sm:text-base">
                    {t.introSubtitle}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {words.map((word, index) => (
                    <div
                      key={`${word.sk}-${index}`}
                      className="lesson-intro-word-card group relative overflow-hidden rounded-2xl p-4 backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/35 hover:bg-white/[0.075] hover:shadow-[0_0_22px_rgba(34,211,238,0.12)]"
                    >
                      <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-cyan-400/0 blur-2xl transition group-hover:bg-cyan-400/12" />

                      <div className="relative flex items-start gap-3">
                        <div className="lesson-intro-number mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl text-sm font-black theme-text">
                          {index + 1}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="break-words text-lg font-extrabold leading-tight theme-text sm:text-xl">
                                {word.sk}
                              </div>

                              {courseId === "pl" && word.hintUa ? (
                                <div className="mt-1 break-words text-xs italic theme-text-subtle">
                                  [{word.hintUa}]
                                </div>
                              ) : null}

                              <div className="mt-1 break-words text-sm font-semibold theme-accent-text">
                                {trWord(word, lang)}
                              </div>
                            </div>

                            <div className="lesson-intro-audio shrink-0 scale-[0.82]">
                              <SpeakButton text={word.sk} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="lesson-intro-hint rounded-2xl p-4 text-sm leading-6">
                  {t.introHint}
                </div>
              </div>

              <aside className="lesson-intro-side relative overflow-hidden rounded-3xl p-5 backdrop-blur-xl lg:sticky lg:top-24">
                <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-cyan-400/15 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-16 -left-16 h-36 w-36 rounded-full bg-fuchsia-500/12 blur-3xl" />

                <div className="relative space-y-5">
                  <div className="lesson-intro-stat rounded-3xl p-5 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-400/20 via-blue-500/15 to-fuchsia-500/20 text-3xl shadow-[0_0_24px_rgba(34,211,238,0.14)]">
                      ✨
                    </div>

                    <div className="mt-4 text-4xl font-black theme-text">
                      {words.length}
                    </div>

                    <div className="mt-1 text-sm font-semibold theme-text-muted">
                      {t.introCount}
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-black theme-text">
                      {t.introReadyTitle}
                    </div>

                    <p className="mt-2 text-sm leading-6 theme-text-muted">
                      {t.introReadyText}
                    </p>
                  </div>

                  <button
                    onClick={startQuiz}
                    className="theme-primary-button flex min-h-[54px] w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-black transition hover:-translate-y-0.5"
                  >
                    {t.startExercises}
                  </button>

                  <div className="grid grid-cols-7 gap-1.5">
                    {EXERCISES.map((exercise, index) => (
                      <div
                        key={exercise.kind}
                        className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400/70 via-blue-400/70 to-fuchsia-400/70"
                        title={`${index + 1}. ${getExerciseTitle(
                          exercise.kind,
                          t
                        )}`}
                      />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const exercise = EXERCISES[exerciseIndex];
  const currentWord = words[wordIndex];
  const exerciseTitle = getExerciseTitle(exercise.kind, t);
  const exerciseScreenKey = `${exercise.kind}-${wordIndex}-${quizAutoKey}`;

  if (finished) {
    return (
      <div className="flunio-card space-y-4 rounded-3xl p-6 theme-text">
        <div className="text-xl font-semibold theme-text">{t.levelDone}</div>

        <div className="theme-text-muted">
          {t.result}: <b className="theme-text">{score}</b> /{" "}
          <b className="theme-text">{totalQuestions}</b>
        </div>

        {savingNext ? (
          <div className="text-sm theme-text-subtle">{t.saving}</div>
        ) : null}

        {!canGoNextNow && (
          <div className="theme-inner-card rounded-2xl p-4 text-sm theme-text-muted">
            <div className="font-semibold theme-text">{t.nextLockedTitle}</div>
            <div className="mt-1">{lockedReasonNow ?? t.nextLockedDefault}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={resetToLearn}
            disabled={isNavigating}
            className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {t.reviewAgain}
          </button>

          <button
            onClick={() => goTo(nextLevelId)}
            className={[
              "rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed",
              canGoNextNow && !savingNext && !isNavigating
                ? "theme-primary-button hover:-translate-y-0.5"
                : "theme-secondary-button opacity-60",
            ].join(" ")}
            disabled={!canGoNextNow || savingNext || isNavigating}
            title={!canGoNextNow ? t.notAvailableFree : undefined}
          >
            {t.goNextLevel}
          </button>

          {!canGoNextNow && (
            <button
              onClick={() => goTo(onLockedNextRedirect)}
              disabled={isNavigating}
              className="theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {t.toLessonsList}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flunio-card space-y-4 rounded-3xl p-6 theme-text"
      onPointerDownCapture={unlockInsideLesson}
      onKeyDownCapture={unlockInsideLesson}
    >
      <div className="text-xs font-medium leading-snug theme-text-subtle sm:text-sm">
        <span className="sm:hidden">
          {t.exercise} {exerciseIndex + 1}/{EXERCISES.length} ·{" "}
          {exercise.mode === "perWord"
            ? `${t.word} ${wordIndex + 1}/${words.length}`
            : t.lesson}
        </span>

        <span className="hidden sm:inline">
          {t.exercise} {exerciseIndex + 1} / {EXERCISES.length} •{" "}
          {exerciseTitle} •{" "}
          {exercise.mode === "perWord" ? (
            <>
              {t.word} {wordIndex + 1} / {words.length}
            </>
          ) : (
            <>{t.lesson}</>
          )}
        </span>
      </div>

      <style>{exerciseEnterStyle}</style>

      <ReportErrorButton
        lang={lang}
        context={{
          lessonId: levelId,
          exercise: `${mode}:${exercise.kind}`,
          actionIdx: exercise.mode === "perWord" ? wordIndex + 1 : undefined,
          sk: exercise.mode === "perWord" ? currentWord?.sk : undefined,
          ua: exercise.mode === "perWord" ? currentWord?.ua : undefined,
          ru: exercise.mode === "perWord" ? currentWord?.ru : undefined,
          key:
            exercise.mode === "perWord" && currentWord?.sk && currentWord?.ua
              ? phraseKey(currentWord.sk, currentWord.ua, levelId)
              : undefined,
        }}
      />

      <div
        key={exerciseScreenKey}
        className="theme-inner-card rounded-3xl px-4 py-10 transition-all duration-300 ease-out motion-reduce:transition-none animate-[fadeSlideIn_220ms_ease-out]"
      >
        {exercise.kind === "chooseTranslation" && (
          <ChooseTranslation
            word={currentWord}
            words={words}
            lang={lang}
            onNext={nextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
          />
        )}

        {exercise.kind === "chooseSlovak" && (
          <ChooseSlovak
            word={currentWord}
            words={words}
            lang={lang}
            onNext={nextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            courseId={courseId}
          />
        )}

        {exercise.kind === "writeWord" && (
          <WriteWord
            word={currentWord}
            lang={lang}
            onNext={nextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            courseId={courseId}
          />
        )}

        {exercise.kind === "audioQuiz" && (
          <AudioQuiz
            word={currentWord}
            words={words}
            onNext={nextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            lang={lang}
          />
        )}

        {exercise.kind === "matchColumns" && (
          <MatchColumns words={words} lang={lang} onDone={(c) => doneWhole(c)} />
        )}

        {exercise.kind === "buildSentence" && (
          <BuildSentence
            word={currentWord}
            lang={lang}
            levelId={levelId}
            courseId={courseId}
            onNext={nextPerWord}
          />
        )}

        {exercise.kind === "buildUaSentence" && (
          <BuildUaSentence
            word={currentWord}
            lang={lang}
            levelId={levelId}
            courseId={courseId}
            onNext={nextPerWord}
          />
        )}
      </div>
    </div>
  );
}