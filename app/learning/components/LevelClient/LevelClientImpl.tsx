"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";
import { finishLessonQuiz } from "@/lib/src/progress";
import { useSession } from "next-auth/react";
import { buildLessonPlan, buildMistakeReview, LESSON_MASTERY_PERCENT, type LessonStep } from "./lesson-plan";
import { enrollLessonWords } from "./enrollLessonWords";
import type { VerifiedContextKind } from "./verified-content";

import type { Word, ExerciseDef } from "./types";
import LessonIntro from "./LessonIntro";
import LessonFinished from "./LessonFinished";
import LessonExerciseScreen, {
  preloadExerciseModules,
} from "./LessonExerciseScreen";
import {
  getLockedLessonReason,
  isFreeLesson,
} from "@/app/learning/access/lessonAccess";

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
    levelDone: "Урок завершено 🎉",
    result: "Результат",
    nextLockedTitle: "Наступний урок входить у Premium 🔒",
    nextLockedDefault:
      "A0 доступний безкоштовно. Щоб перейти до A1, A2, B1 або B2, відкрий Premium.",
    reviewAgain: "Переглянути слова знову",
    goNextLevel: "Перейти до наступного рівня →",
    toLessonsList: "До списку уроків",
    toPathway: "До мого маршруту →",
    notAvailableFree: "Недоступно у free",
    saving: "Зберігаю прогрес…",
    mastered: "Матеріал засвоєно",
    needsPractice: "Урок завершено — варто потренуватися ще",
    masteryHint: "Для позначки «засвоєно» потрібно щонайменше 80% правильних відповідей з першої спроби.",
    mistakesLabel: "Слів для додаткового повторення",
    addToSrs: "Додати слова до повторення",
    addedToSrs: "Додано до повторення",
    allInSrs: "Слова вже є в повторенні",
    dailySrsLimit: "Денний ліміт нових слів вичерпано. Інші можна додати завтра.",
    repeatPhase: "Робота над помилками",

    premiumA1Locked:
      "A1 відкривається з Premium. A0 можна пройти безкоштовно без денного ліміту.",
    premiumAdvancedLocked:
      "Цей рівень входить у Premium. Відкрий Premium, щоб продовжити курс.",
    premiumLessonLocked: "Цей урок входить у Premium.",
    unknownLessonLocked: "Цей урок зараз недоступний.",
    sequenceLocked: "Спочатку пройди попередні уроки послідовно.",

    introEyebrow: "Старт уроку",
    introTitle: "Що сьогодні вчимо?",
    introSubtitle:
      "Ось 10 слів, які зараз потренуємо. Можеш послухати вимову — і погнали.",
    introCount: "слів у цьому уроці",
    introHint:
      "Не треба зубрити їх одразу. Просто ознайомся — далі вправи допоможуть усе закріпити.",
    introReadyTitle: "Починаємо?",
    introReadyText:
      "Спочатку впізнавання слів, потім пригадування й перевірені речення. Помилки повторимо окремо.",
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
    levelDone: "Урок завершён 🎉",
    result: "Результат",
    nextLockedTitle: "Следующий урок входит в Premium 🔒",
    nextLockedDefault:
      "A0 доступен бесплатно. Чтобы перейти к A1, A2, B1 или B2, открой Premium.",
    reviewAgain: "Посмотреть слова снова",
    goNextLevel: "Перейти к следующему уровню →",
    toLessonsList: "К списку уроков",
    toPathway: "К моему маршруту →",
    notAvailableFree: "Недоступно в free",
    saving: "Сохраняю прогресс…",
    mastered: "Материал усвоен",
    needsPractice: "Урок завершён — стоит потренироваться ещё",
    masteryHint: "Для отметки «усвоено» нужно минимум 80% правильных ответов с первой попытки.",
    mistakesLabel: "Слов для дополнительного повторения",
    addToSrs: "Добавить слова в повторение",
    addedToSrs: "Добавлено в повторение",
    allInSrs: "Слова уже в повторении",
    dailySrsLimit: "Дневной лимит новых слов исчерпан. Остальные можно добавить завтра.",
    repeatPhase: "Работа над ошибками",

    premiumA1Locked:
      "A1 открывается с Premium. A0 можно пройти бесплатно без дневного лимита.",
    premiumAdvancedLocked:
      "Этот уровень входит в Premium. Открой Premium, чтобы продолжить курс.",
    premiumLessonLocked: "Этот урок входит в Premium.",
    unknownLessonLocked: "Этот урок сейчас недоступен.",
    sequenceLocked: "Сначала пройди предыдущие уроки последовательно.",

    introEyebrow: "Старт урока",
    introTitle: "Что сегодня учим?",
    introSubtitle:
      "Вот 10 слов, которые сейчас потренируем. Можешь послушать произношение — и погнали.",
    introCount: "слов в этом уроке",
    introHint:
      "Не нужно сразу всё зубрить. Просто познакомься со словами — дальше упражнения помогут закрепить.",
    introReadyTitle: "Начинаем?",
    introReadyText:
      "Сначала узнавание слов, затем вспоминание и проверенные предложения. Ошибки повторим отдельно.",
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
    levelDone: "Lesson completed 🎉",
    result: "Result",
    nextLockedTitle: "The next lesson is Premium 🔒",
    nextLockedDefault:
      "A0 is free. To continue with A1, A2, B1 or B2, unlock Premium.",
    reviewAgain: "Review words again",
    goNextLevel: "Go to the next level →",
    toLessonsList: "Back to lessons list",
    toPathway: "My learning pathway →",
    notAvailableFree: "Not available in free",
    saving: "Saving progress…",
    mastered: "Material mastered",
    needsPractice: "Lesson completed — more practice recommended",
    masteryHint: "Mastery requires at least 80% correct on the first attempt.",
    mistakesLabel: "Words to practise again",
    addToSrs: "Add words to review",
    addedToSrs: "Added to review",
    allInSrs: "Words are already in review",
    dailySrsLimit: "Daily new-word limit reached. Add the remaining words tomorrow.",
    repeatPhase: "Mistake review",

    premiumA1Locked:
      "A1 unlocks with Premium. You can complete A0 for free without a daily limit.",
    premiumAdvancedLocked:
      "This level is included in Premium. Unlock Premium to continue the course.",
    premiumLessonLocked: "This lesson is included in Premium.",
    unknownLessonLocked: "This lesson is currently unavailable.",
    sequenceLocked: "Complete the previous lessons in order first.",

    introEyebrow: "Lesson start",
    introTitle: "What are we learning today?",
    introSubtitle:
      "Here are 10 words we are going to practise. Listen to them if you want — then let’s go.",
    introCount: "words in this lesson",
    introHint:
      "No need to memorise everything right now. Get familiar with the words — the exercises will help you lock them in.",
    introReadyTitle: "Ready?",
    introReadyText:
      "First recognise words, then recall them and practise verified sentences. Mistakes get an extra round.",
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

function getLockedReasonText(
  reason: string | undefined,
  t: (typeof UI)[UiLang]
): string | undefined {
  if (!reason) return undefined;

  switch (reason) {
    case "premium_a1":
      return t.premiumA1Locked;

    case "premium_advanced":
      return t.premiumAdvancedLocked;

    case "premium_lesson":
      return t.premiumLessonLocked;

    case "unknown_lesson":
      return t.unknownLessonLocked;

    case "sequence_locked":
      return t.sequenceLocked;

    default:
      return reason;
  }
}

export default function LevelClient({
  levelId,
  words,
  canGoNext = true,
  lockedReason,
  onLockedNextRedirect = "/learning",
  courseId = "sk",
  contextKinds = [],
}: {
  levelId: string;
  words: Word[];
  canGoNext?: boolean;
  lockedReason?: string;
  onLockedNextRedirect?: string;
  courseId?: CourseId;
  contextKinds?: VerifiedContextKind[];
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const { lang } = useLanguage();
  const t = UI[uiLangFrom(lang)];
  const nextLevelId = getNextLevelId(levelId);

  const [mode, setMode] = useState<"learn" | "quiz">("learn");
  const lessonPlan = useMemo(
    () => buildLessonPlan(words, levelId, contextKinds),
    [words, levelId, contextKinds]
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [reviewSteps, setReviewSteps] = useState<LessonStep[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const mistakesRef = useRef<Set<number>>(new Set());
  const [srsStatus, setSrsStatus] = useState("");
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
  const hasWarmedUpRef = useRef(false);

  const warmUpLessonAssets = useCallback(() => {
    if (hasWarmedUpRef.current) return;

    hasWarmedUpRef.current = true;

    const nextPath = nextLevelId.startsWith("/")
      ? nextLevelId
      : `/learning/${nextLevelId}`;

    router.prefetch(nextPath);
    router.prefetch(onLockedNextRedirect);

    void preloadExerciseModules();
  }, [nextLevelId, onLockedNextRedirect, router]);

  function unlockInsideLesson() {
    if (audioUnlockedRef.current) return;
    audioUnlockedRef.current = true;
    setAudioUnlocked(true);
  }

  function resetToLearn() {
    finishingRef.current = false;
    advancingRef.current = false;
    setMode("learn");
    setStepIndex(0);
    setReviewSteps([]);
    setReviewIndex(0);
    mistakesRef.current = new Set();
    setSrsStatus("");
    setScore(0);
    setFinished(false);
  }

  function startQuiz() {
    unlockInsideLesson();
    warmUpLessonAssets();

    advancingRef.current = false;
    setQuizAutoKey((k) => k + 1);
    setMode("quiz");
    setStepIndex(0);
    setReviewSteps([]);
    setReviewIndex(0);
    mistakesRef.current = new Set();
    setSrsStatus("");
    setScore(0);
    setFinished(false);
  }

  useEffect(() => {
    setCanGoNextNow(canGoNext);
    setLockedReasonNow(lockedReason);
  }, [canGoNext, lockedReason]);

  useEffect(() => {
    advancingRef.current = false;
  }, [mode, stepIndex, reviewIndex, reviewSteps, finished]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (mode !== "learn") return;

    const win = window as IdleWindow;
    let idleId: number | undefined;

    const timeoutId = window.setTimeout(() => {
      if (typeof win.requestIdleCallback === "function") {
        idleId = win.requestIdleCallback(warmUpLessonAssets, {
          timeout: 2500,
        });

        return;
      }

      warmUpLessonAssets();
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);

      if (
        typeof idleId === "number" &&
        typeof win.cancelIdleCallback === "function"
      ) {
        win.cancelIdleCallback(idleId);
      }
    };
  }, [mode, warmUpLessonAssets]);

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

  const totalQuestions = lessonPlan.length;
  const inReview = reviewSteps.length > 0;
  const activeStep = inReview ? reviewSteps[reviewIndex] : lessonPlan[stepIndex];

  function finishLesson(finalScore: number) {
    if (finishingRef.current) return;
    finishingRef.current = true;

    setSavingNext(true);
    setCanGoNextNow(false);
    setLockedReasonNow(undefined);
    setFinished(true);

    try {
      finishLessonQuiz(levelId, finalScore, totalQuestions);
    } catch (e) {
      console.error("Save local progress error", e);
    }

    (async () => {
      try {
        const res = await fetch("/api/progress/lesson-done", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            levelId,
            courseId,
            correctAnswers: finalScore,
            totalQuestions,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.ok) {
          console.error("Save server progress failed:", { status: res.status, data });
          setCanGoNextNow(false);
          setLockedReasonNow("unknown_lesson");
          return;
        }

        const nextIsFree = isFreeLesson(nextLevelId);
        if (nextIsFree) {
          setCanGoNextNow(true);
          setLockedReasonNow(undefined);
        } else {
          setCanGoNextNow(canGoNext);
          setLockedReasonNow(canGoNext ? undefined : lockedReason ?? getLockedLessonReason(nextLevelId));
        }
        router.refresh();
      } catch (e) {
        console.error("Save server progress error", e);
        setCanGoNextNow(false);
        setLockedReasonNow("unknown_lesson");
      } finally {
        setSavingNext(false);
      }
    })();
  }

  function nextPerWord(correct: boolean) {
    if (advancingRef.current || finishingRef.current) return;
    advancingRef.current = true;

    if (inReview) {
      if (reviewIndex < reviewSteps.length - 1) {
        setReviewIndex((i) => i + 1);
      } else {
        // Reinforcement never inflates the first-attempt assessment score.
        finishLesson(score);
      }
      return;
    }

    if (!correct && activeStep) mistakesRef.current.add(activeStep.wordIndex);
    const updatedScore = score + (correct ? 1 : 0);
    if (correct) setScore((s) => s + 1);

    if (stepIndex < lessonPlan.length - 1) {
      setStepIndex((i) => i + 1);
      return;
    }

    const repeats = buildMistakeReview(mistakesRef.current, words, levelId);
    if (repeats.length > 0) {
      setReviewSteps(repeats);
      setReviewIndex(0);
    } else {
      finishLesson(updatedScore);
    }
  }

  function doneWhole(correctCount: number) {
    // Kept for the existing matching exercise; it is not part of the v2 plan.
    nextPerWord(correctCount === words.length);
  }

  function addLessonWordsToSrs() {
    if (!session?.user?.id) return;
    try {
      const result = enrollLessonWords(session.user.id, courseId, words);
      const message = result.added > 0
        ? `${t.addedToSrs}: ${result.added}. ${result.dailyLimitReached ? t.dailySrsLimit : ""}`
        : result.dailyLimitReached ? t.dailySrsLimit : t.allInSrs;
      setSrsStatus(message);
    } catch (error) {
      console.error("Could not enroll lesson words in SRS", error);
    }
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

  const exercise = EXERCISES.find((item) => item.kind === activeStep?.kind) ?? EXERCISES[0];
  const exerciseTitle = inReview ? t.repeatPhase : getExerciseTitle(exercise.kind, t);
  const wordIndex = activeStep?.wordIndex ?? 0;
  const exerciseScreenKey = `${inReview ? "review" : "core"}-${exercise.kind}-${wordIndex}-${stepIndex}-${reviewIndex}-${quizAutoKey}`;

  if (finished) {
    return (
      <LessonFinished
        t={t}
        score={score}
        totalQuestions={totalQuestions}
        mastered={totalQuestions > 0 && (score / totalQuestions) * 100 >= LESSON_MASTERY_PERCENT}
        mistakeCount={mistakesRef.current.size}
        srsStatus={srsStatus}
        onEnrollSrs={session?.user?.id ? addLessonWordsToSrs : undefined}
        savingNext={savingNext}
        canGoNextNow={canGoNextNow}
        lockedReasonNow={getLockedReasonText(lockedReasonNow, t)}
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
      wordIndex={wordIndex}
      exerciseTitle={exerciseTitle}
      exerciseScreenKey={exerciseScreenKey}
      quizAutoKey={quizAutoKey}
      audioUnlocked={audioUnlocked}
      questionNumber={inReview ? reviewIndex + 1 : stepIndex + 1}
      questionsCount={inReview ? reviewSteps.length : lessonPlan.length}
      isReview={inReview}
      onUnlockAudio={unlockInsideLesson}
      onNextPerWord={nextPerWord}
      onDoneWhole={doneWhole}
      t={t}
    />
  );
}