"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { finishLessonQuiz } from "@/lib/src/progress";
import ReportErrorButton from "@/app/components/ReportErrorButton";

import type { Word, ExerciseDef } from "./types";
import { trWord } from "./helpers";
import { phraseKey } from "@/app/learning/phrases/phraseKey";

import ChooseTranslation from "@/app/learning/components/LevelClient/exercises/ChooseTranslation";
import ChooseSlovak from "@/app/learning/components/LevelClient/exercises/ChooseSlovak";
import WriteWord from "@/app/learning/components/LevelClient/exercises/WriteWord";
import AudioQuiz from "@/app/learning/components/LevelClient/exercises/AudioQuiz";
import MatchColumns from "@/app/learning/components/LevelClient/exercises/MatchColumns";
import BuildSentence from "@/app/learning/components/LevelClient/exercises/BuildSentence";
import BuildUaSentence from "@/app/learning/components/LevelClient/exercises/BuildUaSentence";

type UiLang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

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
  const [mode, setMode] = useState<"learn" | "quiz">("learn");

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [quizAutoKey, setQuizAutoKey] = useState(0);

  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const unlockedRef = useMemo(() => ({ v: false }), []);

  function unlockInsideLesson() {
    if (unlockedRef.v) return;
    unlockedRef.v = true;
    setAudioUnlocked(true);
  }

  const router = useRouter();
  const nextLevelId = getNextLevelId(levelId);
  const { lang } = useLanguage();
  const t = UI[uiLangFrom(lang)];

  const [savingNext, setSavingNext] = useState(false);
  const finishingRef = useRef(false);

  const [canGoNextNow, setCanGoNextNow] = useState<boolean>(canGoNext);
  const [lockedReasonNow, setLockedReasonNow] = useState<string | undefined>(
    lockedReason
  );

  useEffect(() => {
    setCanGoNextNow(canGoNext);
    setLockedReasonNow(lockedReason);
  }, [canGoNext, lockedReason]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const lookahead = 4;
    for (let k = 1; k <= lookahead; k++) {
      const src = words[wordIndex + k]?.img;
      if (!src) continue;

      const img = new window.Image();
      img.decoding = "async";
      img.loading = "eager";
      img.src = src;
    }
  }, [words, wordIndex]);

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

      if (event.key === "ArrowLeft") {
        if (wordIndex > 0) {
          unlockInsideLesson();
          event.preventDefault();
          setWordIndex((i) => Math.max(0, i - 1));
        }
        return;
      }

      if (event.key === "ArrowRight") {
        unlockInsideLesson();
        event.preventDefault();

        if (wordIndex < words.length - 1) {
          setWordIndex((i) => Math.min(words.length - 1, i + 1));
          return;
        }

        setQuizAutoKey((k) => k + 1);
        setMode("quiz");
        setExerciseIndex(0);
        setWordIndex(0);
        setScore(0);
        setFinished(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, wordIndex, words.length]);

  const totalQuestions = useMemo(() => {
    return EXERCISES.reduce(
      (sum, ex) => sum + (ex.mode === "perWord" ? words.length : words.length),
      0
    );
  }, [words.length]);

  if (mode === "learn") {
    const word = words[wordIndex];
    const isFirst = wordIndex === 0;
    const isLast = wordIndex === words.length - 1;

    return (
      <div
        className="space-y-3 sm:space-y-6"
        onPointerDownCapture={unlockInsideLesson}
        onKeyDownCapture={unlockInsideLesson}
      >
        <div className="sticky top-2 z-10 rounded-xl border bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur">
          {t.viewed}: {wordIndex + 1}/{words.length}
        </div>

        <div className="mx-auto w-full max-w-[1100px]">
          <div className="grid grid-cols-1 items-center gap-3 sm:gap-4 lg:grid-cols-[110px_minmax(0,1fr)_110px]">
            <div className="hidden justify-center lg:flex">
              <button
                disabled={isFirst}
                onClick={() => setWordIndex((i) => Math.max(0, i - 1))}
                className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {t.back}
              </button>
            </div>

            <div className="relative mx-auto w-full max-w-[760px] rounded-3xl border bg-white px-3 py-3 text-center shadow-sm sm:px-6 sm:py-6">
              {word?.img ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex min-h-[360px] w-full items-center justify-center rounded-2xl bg-slate-50 px-1 py-1 sm:min-h-[420px]">
                    <Image
                      src={word.img}
                      alt={word.sk}
                      width={1200}
                      height={900}
                      className="max-h-[340px] w-full max-w-[92%] rounded-2xl bg-white object-contain sm:w-auto sm:max-w-full sm:max-h-[380px] lg:max-h-[460px]"
                      priority={wordIndex === 0}
                      fetchPriority={wordIndex === 0 ? "high" : "auto"}
                      sizes="(max-width: 640px) 96vw, (max-width: 1024px) 70vw, 700px"
                    />
                  </div>

                  {word.imgCredit && (
                    <div className="text-xs text-slate-500">{word.imgCredit}</div>
                  )}
                </div>
              ) : (
                <div className="flex min-h-[360px] w-full items-center justify-center rounded-2xl border bg-slate-50 text-slate-400 sm:min-h-[420px]">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-5xl">📷</div>
                  </div>
                </div>
              )}

              <div className="mt-4 flex flex-col items-center">
                <div className="flex items-center justify-center">
                  <div className="break-words text-3xl font-bold leading-none sm:text-4xl">
                    {word.sk}
                  </div>

                  <div className="ml-5 shrink-0 sm:ml-6">
                    <SpeakButton
                      text={word.sk}
                      autoPlayKey={audioUnlocked ? word.sk : undefined}
                    />
                  </div>
                </div>

                <div className="mt-3 text-center text-lg leading-tight text-slate-600 sm:text-xl">
                  {trWord(word, lang)}
                </div>
              </div>
            </div>

            <div className="hidden justify-center lg:flex">
              {isLast ? (
                <button
                  onClick={() => {
                    setQuizAutoKey((k) => k + 1);
                    setMode("quiz");
                    setExerciseIndex(0);
                    setWordIndex(0);
                    setScore(0);
                    setFinished(false);
                  }}
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl bg-black px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-slate-900"
                >
                  {t.startExercises}
                </button>
              ) : (
                <button
                  onClick={() =>
                    setWordIndex((i) => Math.min(words.length - 1, i + 1))
                  }
                  className="inline-flex min-h-[52px] items-center justify-center rounded-2xl border bg-white px-5 py-3 text-sm font-medium shadow-sm transition hover:bg-slate-50"
                >
                  {t.next}
                </button>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 lg:hidden">
            <button
              disabled={isFirst}
              onClick={() => setWordIndex((i) => Math.max(0, i - 1))}
              className="min-h-[44px] rounded-2xl border bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {t.back}
            </button>

            {isLast ? (
              <button
                onClick={() => {
                  setQuizAutoKey((k) => k + 1);
                  setMode("quiz");
                  setExerciseIndex(0);
                  setWordIndex(0);
                  setScore(0);
                  setFinished(false);
                }}
                className="min-h-[44px] rounded-2xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-900"
              >
                {t.startExercises}
              </button>
            ) : (
              <button
                onClick={() =>
                  setWordIndex((i) => Math.min(words.length - 1, i + 1))
                }
                className="min-h-[44px] rounded-2xl border bg-white px-4 py-2 text-sm font-medium transition hover:bg-slate-50"
              >
                {t.next}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  const exercise = EXERCISES[exerciseIndex];
  const currentWord = words[wordIndex];
  const exerciseTitle = getExerciseTitle(exercise.kind, t);

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
          const freeCanGoNext = dailyCount < 2;

          if (!canGoNext && freeCanGoNext) {
            setCanGoNextNow(true);
            setLockedReasonNow(undefined);
          } else {
            setCanGoNextNow(canGoNext || freeCanGoNext);
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

    const finalScore = score + (correct ? 1 : 0);
    finishLesson(finalScore);
  }

  function doneWhole(correctCount: number) {
    setScore((s) => s + correctCount);

    const lastExercise = exerciseIndex >= EXERCISES.length - 1;
    if (!lastExercise) {
      setExerciseIndex((e) => e + 1);
      setWordIndex(0);
      return;
    }

    finishLesson(score + correctCount);
  }

  if (finished) {
    return (
      <div className="space-y-3 rounded-2xl border bg-white p-6">
        <div className="text-xl font-semibold">{t.levelDone}</div>
        <div className="text-slate-600">
          {t.result}: <b>{score}</b> / <b>{totalQuestions}</b>
        </div>

        {savingNext ? (
          <div className="text-sm text-slate-500">{t.saving}</div>
        ) : null}

        {!canGoNextNow && (
          <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-700">
            <div className="font-semibold">{t.nextLockedTitle}</div>
            <div className="mt-1">{lockedReasonNow ?? t.nextLockedDefault}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              finishingRef.current = false;
              setMode("learn");
              setExerciseIndex(0);
              setWordIndex(0);
              setScore(0);
              setFinished(false);
            }}
            className="rounded-xl border px-4 py-2"
          >
            {t.reviewAgain}
          </button>

          <button
            onClick={() => {
              if (!canGoNextNow) {
                router.push(onLockedNextRedirect);
                return;
              }
              router.push(nextLevelId);
            }}
            className={[
              "rounded-xl px-4 py-2 text-white",
              canGoNextNow && !savingNext
                ? "bg-black"
                : "cursor-not-allowed bg-black/40",
            ].join(" ")}
            disabled={!canGoNextNow || savingNext}
            title={!canGoNextNow ? t.notAvailableFree : undefined}
          >
            {t.goNextLevel}
          </button>

          {!canGoNextNow && (
            <button
              onClick={() => router.push(onLockedNextRedirect)}
              className="rounded-xl border px-4 py-2"
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
      className="space-y-4 rounded-2xl border bg-white p-6"
      onPointerDownCapture={unlockInsideLesson}
      onKeyDownCapture={unlockInsideLesson}
    >
      <div className="text-sm text-slate-500">
        {t.exercise} {exerciseIndex + 1} / {EXERCISES.length} • {exerciseTitle} •{" "}
        {exercise.mode === "perWord" ? (
          <>
            {t.word} {wordIndex + 1} / {words.length}
          </>
        ) : (
          <>{t.lesson}</>
        )}
      </div>

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
        />
      )}

      {exercise.kind === "writeWord" && (
        <WriteWord
          word={currentWord}
          lang={lang}
          onNext={nextPerWord}
          quizAutoKey={quizAutoKey}
          audioUnlocked={audioUnlocked}
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
  );
}