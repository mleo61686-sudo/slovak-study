"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { finishLessonQuiz } from "@/lib/src/progress";
import ReportErrorButton from "@/app/components/ReportErrorButton";

import type { Word, ExerciseDef } from "./types";
import { trWord } from "./helpers";
import { phraseKey } from "@/app/learning/phrases/a0";

import ChooseTranslation from "@/app/learning/components/LevelClient/exercises/ChooseTranslation";
import ChooseSlovak from "@/app/learning/components/LevelClient/exercises/ChooseSlovak";
import WriteWord from "@/app/learning/components/LevelClient/exercises/WriteWord";
import AudioQuiz from "@/app/learning/components/LevelClient/exercises/AudioQuiz";
import MatchColumns from "@/app/learning/components/LevelClient/exercises/MatchColumns";
import BuildSentence from "@/app/learning/components/LevelClient/exercises/BuildSentence";

// ===== UI i18n (local) =====
type UiLang = "ua" | "ru";
function uiLangFrom(lang: string): UiLang {
  return lang === "ru" ? "ru" : "ua";
}

const UI = {
  ua: {
    viewed: "Переглянуто",
    back: "← Назад",
    next: "Далі →",
    startExercises: "Почати вправи 🧠",

    // quiz header
    exercise: "Вправа",
    word: "Слово",
    lesson: "Урок",

    // finished
    levelDone: "Рівень пройдено 🎉",
    result: "Результат",
    nextLockedTitle: "Наступний урок зараз закритий 🔒",
    nextLockedDefault:
      "У безкоштовній версії є ліміт/послідовність рівнів. Повернись до списку уроків.",
    reviewAgain: "Переглянути слова знову",
    goNextLevel: "Перейти до наступного рівня →",
    toLessonsList: "До списку уроків",
    notAvailableFree: "Недоступно у free",
  },
  ru: {
    viewed: "Просмотрено",
    back: "← Назад",
    next: "Далее →",
    startExercises: "Начать упражнения 🧠",

    // quiz header
    exercise: "Упражнение",
    word: "Слово",
    lesson: "Урок",

    // finished
    levelDone: "Уровень пройден 🎉",
    result: "Результат",
    nextLockedTitle: "Следующий урок сейчас закрыт 🔒",
    nextLockedDefault:
      "В бесплатной версии есть лимит/последовательность уроков. Вернись к списку уроков.",
    reviewAgain: "Посмотреть слова снова",
    goNextLevel: "Перейти к следующему уровню →",
    toLessonsList: "К списку уроков",
    notAvailableFree: "Недоступно в free",
  },
} as const;

function getNextLevelId(levelId: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(levelId);
  if (m) {
    const band = m[1];
    const n = Number(m[2]);

    if (band === "a0" && Number.isFinite(n) && n >= 30) return "a1-1";
    if (Number.isFinite(n)) return `${band}-${n + 1}`;
  }

  const n = Number(levelId);
  if (Number.isFinite(n)) return String(n + 1);
  return levelId;
}

const EXERCISES: ExerciseDef[] = [
  { kind: "chooseTranslation", title: "Вибір перекладу", mode: "perWord" },
  { kind: "chooseSlovak", title: "Вибір словацького слова", mode: "perWord" },
  { kind: "writeWord", title: "Введення слова", mode: "perWord" },
  { kind: "audioQuiz", title: "Аудіо-вправа", mode: "perWord" },
  { kind: "matchColumns", title: "Пари (2 колонки)", mode: "perWord" },
  { kind: "buildSentence", title: "Збери речення", mode: "perWord" },
];

export default function LevelClient({
  levelId,
  words,
  canGoNext = true,
  lockedReason,
  onLockedNextRedirect = "/learning",
}: {
  levelId: string;
  words: Word[];
  canGoNext?: boolean;
  lockedReason?: string;
  onLockedNextRedirect?: string;
}) {
  const [mode, setMode] = useState<"learn" | "quiz">("learn");

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // ✅ ключ для автоплею (залишаємо для 1 та 4 вправ, як було)
  const [quizAutoKey, setQuizAutoKey] = useState(0);

  // ✅ IMPORTANT: unlock autoplay тільки після першої взаємодії
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

  // preload наступного зображення
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nextImg = words[wordIndex + 1]?.img;
    if (!nextImg) return;

    const pre = new window.Image();
    pre.src = nextImg;
  }, [words, wordIndex]);

  const totalQuestions = useMemo(() => {
    return EXERCISES.reduce(
      (sum, ex) => sum + (ex.mode === "perWord" ? words.length : words.length),
      0
    );
  }, [words.length]);

  // =============== LEARN MODE ===============
  if (mode === "learn") {
    const word = words[wordIndex];

    return (
      <div
        className="space-y-6"
        onPointerDownCapture={unlockInsideLesson}
        onKeyDownCapture={unlockInsideLesson}
      >
        <div className="sticky top-2 z-10 rounded-xl border bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold">
          {t.viewed}: {wordIndex + 1}/{words.length}
        </div>

        <div className="mx-auto w-full max-w-[720px] rounded-2xl border bg-white p-6 text-center space-y-3">
          {word?.img ? (
            <div className="flex flex-col items-center gap-2">
              <div className="mx-auto w-full max-w-[340px] sm:max-w-[460px] md:max-w-[560px] lg:max-w-[520px]">
                <div className="mx-auto w-full max-w-[360px] sm:max-w-[480px] md:max-w-[600px] lg:max-w-[360px]">
                  <Image
                    src={word.img}
                    alt={word.sk}
                    width={1200}
                    height={900}
                    className="w-full h-auto rounded-2xl bg-white"
                    priority={wordIndex === 0}
                  />
                </div>
              </div>

              {word.imgCredit && <div className="text-xs text-slate-500">{word.imgCredit}</div>}
            </div>
          ) : (
            <div className="mx-auto h-40 w-40 rounded-2xl border bg-slate-50 flex items-center justify-center text-slate-400">
              📷
            </div>
          )}

          <div className="text-3xl font-bold">{word.sk}</div>
          <div className="text-slate-600">{trWord(word, lang)}</div>

          <div className="flex justify-center">
            <SpeakButton text={word.sk} autoPlayKey={audioUnlocked ? word.sk : undefined} />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[720px] justify-between">
          <button
            disabled={wordIndex === 0}
            onClick={() => setWordIndex((i) => i - 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            {t.back}
          </button>

          {wordIndex < words.length - 1 ? (
            <button onClick={() => setWordIndex((i) => i + 1)} className="px-4 py-2 border rounded-xl">
              {t.next}
            </button>
          ) : (
            <button
              onClick={() => {
                // ✅ gesture тут!
                setQuizAutoKey((k) => k + 1);

                setMode("quiz");
                setExerciseIndex(0);
                setWordIndex(0);
                setScore(0);
                setFinished(false);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              {t.startExercises}
            </button>
          )}
        </div>
      </div>
    );
  }

  // =============== QUIZ MODE ===============
  const exercise = EXERCISES[exerciseIndex];
  const currentWord = words[wordIndex];

  function finishLesson(finalScore: number) {
    setFinished(true);
    try {
      finishLessonQuiz(levelId, finalScore, totalQuestions);
      fetch("/api/progress/lesson-done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelId }),
      }).catch(() => { });
    } catch (e) {
      console.error("Save progress error", e);
    }
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
      <div className="rounded-2xl border bg-white p-6 space-y-3">
        <div className="text-xl font-semibold">{t.levelDone}</div>
        <div className="text-slate-600">
          {t.result}: <b>{score}</b> / <b>{totalQuestions}</b>
        </div>

        {!canGoNext && (
          <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-700">
            <div className="font-semibold">{t.nextLockedTitle}</div>
            <div className="mt-1">{lockedReason ?? t.nextLockedDefault}</div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setMode("learn");
              setExerciseIndex(0);
              setWordIndex(0);
              setScore(0);
              setFinished(false);
            }}
            className="px-4 py-2 border rounded-xl"
          >
            {t.reviewAgain}
          </button>

          <button
            onClick={() => {
              if (!canGoNext) {
                router.push(onLockedNextRedirect);
                return;
              }
              router.push(`/learning/${nextLevelId}`);
            }}
            className={[
              "px-4 py-2 rounded-xl text-white",
              canGoNext ? "bg-black" : "bg-black/40 cursor-not-allowed",
            ].join(" ")}
            disabled={!canGoNext}
            title={!canGoNext ? t.notAvailableFree : undefined}
          >
            {t.goNextLevel}
          </button>

          {!canGoNext && (
            <button onClick={() => router.push(onLockedNextRedirect)} className="px-4 py-2 border rounded-xl">
              {t.toLessonsList}
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border bg-white p-6 space-y-4"
      onPointerDownCapture={unlockInsideLesson}
      onKeyDownCapture={unlockInsideLesson}
    >
      <div className="text-sm text-slate-500">
        {t.exercise} {exerciseIndex + 1} / {EXERCISES.length} •{" "}
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
        <ChooseSlovak word={currentWord} words={words} lang={lang} onNext={nextPerWord} />
      )}

      {exercise.kind === "writeWord" && <WriteWord word={currentWord} lang={lang} onNext={nextPerWord} />}

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

      {exercise.kind === "matchColumns" && <MatchColumns words={words} lang={lang} onDone={(c) => doneWhole(c)} />}

      {exercise.kind === "buildSentence" && (
        <BuildSentence word={currentWord} lang={lang} levelId={levelId} onNext={nextPerWord} />
      )}
    </div>
  );
}