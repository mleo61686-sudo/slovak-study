"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ReportErrorButton from "@/app/components/ReportErrorButton";
import type { Lang } from "@/lib/src/language";
import type { Word, ExerciseDef } from "./types";
import { phraseKey } from "@/app/learning/phrases/phraseKey";

type CourseId = "sk" | "cs" | "pl";

type LessonExerciseText = {
  exercise: string;
  word: string;
  lesson: string;
};

type LessonExerciseScreenProps = {
  levelId: string;
  words: Word[];
  lang: Lang;
  courseId: CourseId;
  exercise: ExerciseDef;
  exerciseIndex: number;
  wordIndex: number;
  exerciseTitle: string;
  exerciseScreenKey: string;
  quizAutoKey: number;
  audioUnlocked: boolean;
  exercisesCount: number;
  onUnlockAudio: () => void;
  onNextPerWord: (correct: boolean) => void;
  onDoneWhole: (correctCount: number) => void;
  t: LessonExerciseText;
};

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

function getNoteText(word: Word | undefined, lang: Lang) {
  if (!word?.note) return undefined;

  if (lang === "en") return word.note.en ?? word.note.ua;
  if (lang === "ru") return word.note.ru ?? word.note.ua;

  return word.note.ua;
}

function getNoteExample(word: Word | undefined, lang: Lang) {
  if (!word?.note?.exampleSk) return undefined;

  const target =
    lang === "en"
      ? word.note.exampleEn ?? word.note.exampleUa
      : lang === "ru"
        ? word.note.exampleRu ?? word.note.exampleUa
        : word.note.exampleUa;

  if (!target) return undefined;

  return {
    sk: word.note.exampleSk,
    target,
  };
}

function getNoteLabels(lang: Lang) {
  if (lang === "en") {
    return {
      title: "Hint",
      example: "Example",
      close: "Close",
    };
  }

  if (lang === "ru") {
    return {
      title: "Подсказка",
      example: "Пример",
      close: "Закрыть",
    };
  }

  return {
    title: "Підказка",
    example: "Приклад",
    close: "Закрити",
  };
}

function WordNote({
  word,
  lang,
  exerciseKey,
}: {
  word: Word | undefined;
  lang: Lang;
  exerciseKey: string;
}) {
  const [open, setOpen] = useState(false);

  const noteText = getNoteText(word, lang);
  const example = getNoteExample(word, lang);
  const labels = useMemo(() => getNoteLabels(lang), [lang]);

  useEffect(() => {
    setOpen(false);
  }, [exerciseKey]);

  if (!noteText) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-300/25 bg-slate-900/80 text-lg shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:scale-[1.03] hover:border-cyan-300/45 hover:bg-slate-800/90"
        aria-label={labels.title}
        title={labels.title}
      >
        💡
      </button>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/35"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-x-4 bottom-4 z-40 mx-auto max-h-[52vh] max-w-[340px] overflow-y-auto rounded-2xl border border-cyan-300/20 bg-slate-950/95 shadow-2xl backdrop-blur-xl sm:absolute sm:inset-x-auto sm:bottom-auto sm:right-4 sm:top-16 sm:max-h-none sm:w-[320px] sm:overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-black theme-text">
                <span>💡</span>
                <span>{labels.title}</span>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm theme-text-muted transition hover:bg-white/10"
                aria-label={labels.close}
                title={labels.close}
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 px-4 py-4">
              <p className="text-sm leading-6 theme-text-muted">{noteText}</p>

              {example ? (
                <div className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <div className="text-[11px] font-bold uppercase tracking-[0.18em] theme-text-subtle">
                    {labels.example}
                  </div>

                  <div className="mt-2 text-sm font-bold theme-text">
                    {example.sk}
                  </div>

                  <div className="mt-1 text-sm theme-text-muted">
                    {example.target}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
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

export function preloadExerciseModules() {
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

export default function LessonExerciseScreen({
  levelId,
  words,
  lang,
  courseId,
  exercise,
  exerciseIndex,
  wordIndex,
  exerciseTitle,
  exerciseScreenKey,
  quizAutoKey,
  audioUnlocked,
  exercisesCount,
  onUnlockAudio,
  onNextPerWord,
  onDoneWhole,
  t,
}: LessonExerciseScreenProps) {
  const currentWord = words[wordIndex];
  const showWordNote =
    exercise.kind === "chooseTranslation" || exercise.kind === "chooseSlovak"
      ? currentWord
      : undefined;

  return (
    <div
      className="flunio-card space-y-4 rounded-3xl p-6 theme-text"
      onPointerDownCapture={onUnlockAudio}
      onKeyDownCapture={onUnlockAudio}
    >
      <div className="text-xs font-medium leading-snug theme-text-subtle sm:text-sm">
        <span className="sm:hidden">
          {t.exercise} {exerciseIndex + 1}/{exercisesCount} ·{" "}
          {exercise.mode === "perWord"
            ? `${t.word} ${wordIndex + 1}/${words.length}`
            : t.lesson}
        </span>

        <span className="hidden sm:inline">
          {t.exercise} {exerciseIndex + 1} / {exercisesCount} •{" "}
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
          exercise: `quiz:${exercise.kind}`,
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
        className="relative theme-inner-card rounded-3xl px-4 py-10 transition-all duration-300 ease-out motion-reduce:transition-none animate-[fadeSlideIn_220ms_ease-out]"
      >
        <WordNote
          word={showWordNote}
          lang={lang}
          exerciseKey={exerciseScreenKey}
        />

        {exercise.kind === "chooseTranslation" && (
          <ChooseTranslation
            word={currentWord}
            words={words}
            lang={lang}
            onNext={onNextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            courseId={courseId}
          />
        )}

        {exercise.kind === "chooseSlovak" && (
          <ChooseSlovak
            word={currentWord}
            words={words}
            lang={lang}
            onNext={onNextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            courseId={courseId}
          />
        )}

        {exercise.kind === "writeWord" && (
          <WriteWord
            word={currentWord}
            lang={lang}
            onNext={onNextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            courseId={courseId}
          />
        )}

        {exercise.kind === "audioQuiz" && (
          <AudioQuiz
            word={currentWord}
            words={words}
            onNext={onNextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
            lang={lang}
          />
        )}

        {exercise.kind === "matchColumns" && (
          <MatchColumns words={words} lang={lang} onDone={onDoneWhole} />
        )}

        {exercise.kind === "buildSentence" && (
          <BuildSentence
            word={currentWord}
            lang={lang}
            levelId={levelId}
            courseId={courseId}
            onNext={onNextPerWord}
          />
        )}

        {exercise.kind === "buildUaSentence" && (
          <BuildUaSentence
            word={currentWord}
            lang={lang}
            levelId={levelId}
            courseId={courseId}
            onNext={onNextPerWord}
          />
        )}
      </div>
    </div>
  );
}