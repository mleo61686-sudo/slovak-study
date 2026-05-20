"use client";

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
        className="theme-inner-card rounded-3xl px-4 py-10 transition-all duration-300 ease-out motion-reduce:transition-none animate-[fadeSlideIn_220ms_ease-out]"
      >
        {exercise.kind === "chooseTranslation" && (
          <ChooseTranslation
            word={currentWord}
            words={words}
            lang={lang}
            onNext={onNextPerWord}
            quizAutoKey={quizAutoKey}
            audioUnlocked={audioUnlocked}
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