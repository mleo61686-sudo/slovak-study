"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";
import { finishLessonQuiz } from "@/lib/src/progress";

import type { Word, ExerciseDef } from "./types";
import LessonIntro from "./LessonIntro";
import LessonFinished from "./LessonFinished";
import LessonExerciseScreen, {
  preloadExerciseModules,
} from "./LessonExerciseScreen";

type UiLang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

type IdleWindow = Window & {
  requestIdleCallback?: (
    callback: () => void,
    options?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

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
      <LessonIntro
        levelId={levelId}
        words={words}
        lang={lang}
        courseId={courseId}
        courseLabel={courseLabel}
        t={t}
        exercises={EXERCISES}
        getExerciseTitle={(kind) => getExerciseTitle(kind, t)}
        onStartQuiz={startQuiz}
        onUnlockAudio={unlockInsideLesson}
      />
    );
  }

  const exercise = EXERCISES[exerciseIndex];
  const exerciseTitle = getExerciseTitle(exercise.kind, t);
  const exerciseScreenKey = `${exercise.kind}-${wordIndex}-${quizAutoKey}`;

  if (finished) {
    return (
      <LessonFinished
        t={t}
        score={score}
        totalQuestions={totalQuestions}
        savingNext={savingNext}
        canGoNextNow={canGoNextNow}
        lockedReasonNow={lockedReasonNow}
        isNavigating={isNavigating}
        nextLevelId={nextLevelId}
        onReviewAgain={resetToLearn}
        onGoNext={goTo}
        onGoToLessonsList={() => goTo(onLockedNextRedirect)}
      />
    );
  }

  return (
    <LessonExerciseScreen
      levelId={levelId}
      words={words}
      lang={lang}
      courseId={courseId}
      exercise={exercise}
      exerciseIndex={exerciseIndex}
      wordIndex={wordIndex}
      exerciseTitle={exerciseTitle}
      exerciseScreenKey={exerciseScreenKey}
      quizAutoKey={quizAutoKey}
      audioUnlocked={audioUnlocked}
      exercisesCount={EXERCISES.length}
      onUnlockAudio={unlockInsideLesson}
      onNextPerWord={nextPerWord}
      onDoneWhole={doneWhole}
      t={t}
    />
  );
}