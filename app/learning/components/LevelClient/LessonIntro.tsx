"use client";

import SpeakButton from "@/app/components/SpeakButton";
import type { Lang } from "@/lib/src/language";
import type { Word, ExerciseDef } from "./types";
import { trWord } from "./helpers";

type CourseId = "sk" | "cs" | "pl";

type LessonIntroText = {
  introEyebrow: string;
  introTitle: string;
  introSubtitle: string;
  introCount: string;
  introHint: string;
  introReadyTitle: string;
  introReadyText: string;
  startExercises: string;
  lesson: string;
};

type LessonIntroProps = {
  levelId: string;
  words: Word[];
  lang: Lang;
  courseId: CourseId;
  courseLabel: string;
  t: LessonIntroText;
  exercises: ExerciseDef[];
  getExerciseTitle: (kind: ExerciseDef["kind"]) => string;
  onStartQuiz: () => void;
  onUnlockAudio: () => void;
};

export default function LessonIntro({
  levelId,
  words,
  lang,
  courseId,
  courseLabel,
  t,
  exercises,
  getExerciseTitle,
  onStartQuiz,
  onUnlockAudio,
}: LessonIntroProps) {
  return (
    <div
      className="space-y-5 pt-4 theme-text sm:space-y-6 sm:pt-0"
      onPointerDownCapture={onUnlockAudio}
      onKeyDownCapture={onUnlockAudio}
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
                  type="button"
                  onClick={onStartQuiz}
                  className="theme-primary-button flex min-h-[54px] w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-black transition hover:-translate-y-0.5"
                >
                  {t.startExercises}
                </button>

                <div className="grid grid-cols-7 gap-1.5">
                  {exercises.map((exercise, index) => (
                    <div
                      key={exercise.kind}
                      className="h-1.5 rounded-full bg-gradient-to-r from-cyan-400/70 via-blue-400/70 to-fuchsia-400/70"
                      title={`${index + 1}. ${getExerciseTitle(exercise.kind)}`}
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