"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, playLocal } from "../helpers";
import { SpeakCentered } from "./shared";

type CourseId = "sk" | "cs" | "pl";

export default function AudioQuiz({
  word,
  words,
  onNext,
  quizAutoKey,
  audioUnlocked,
  lang,
  courseId = "sk",
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  quizAutoKey: number;
  audioUnlocked: boolean;
  lang: Lang;
  courseId?: CourseId;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => w.sk);
  }, [word, words]);

  const [mounted, setMounted] = useState(false);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
  }, [word.sk]);

  const answered = status !== "idle";

  const playAnswerSfx = (ok: boolean) => {
    try {
      const enabled = window.localStorage.getItem("flunio.answerSfx.enabled");

      if (enabled === "false") return;

      const audio = new Audio(ok ? "/sfx/correct.mp3" : "/sfx/wrong.mp3");
      audio.volume = 0.13;
      audio.play().catch(() => { });
    } catch { }
  };

  const title =
    lang === "en"
      ? "Listen to the word and choose the correct one:"
      : lang === "ru"
        ? "Прослушай слово и выбери правильное:"
        : "Прослухай слово і обери правильне:";

  const resultTitle =
    status === "correct"
      ? lang === "en"
        ? "Correct!"
        : lang === "ru"
          ? "Правильно!"
          : "Правильно!"
      : lang === "en"
        ? "Not quite"
        : lang === "ru"
          ? "Неправильно"
          : "Неправильно";

  const correctLabel =
    lang === "en"
      ? "Correct answer"
      : lang === "ru"
        ? "Правильный ответ"
        : "Правильна відповідь";

  const nextLabel =
    lang === "en" ? "Next" : lang === "ru" ? "Дальше" : "Далі";

  const resultSheet =
    answered && mounted
      ? createPortal(
        <div
          className="fixed inset-x-0 bottom-14 z-[9999] px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:bottom-10 sm:px-5 sm:pb-6"
          aria-live="polite"
        >
          <div
            className={[
              "audio-quiz-bottom-sheet mx-auto w-full max-w-[720px] overflow-hidden rounded-[28px] border px-5 py-4 text-white shadow-2xl backdrop-blur-xl sm:px-6 sm:py-5",
              status === "correct"
                ? "border-lime-200/50 bg-lime-500"
                : "border-rose-200/50 bg-rose-500",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                  {resultTitle}
                </div>

                <div className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                  {status === "wrong" ? `${correctLabel}: ` : ""}
                  <span className="font-black text-white">{word.sk}</span>
                </div>
              </div>

              <button
                onClick={() => onNext(status === "correct")}
                className={[
                  "shrink-0 rounded-2xl px-5 py-3 text-sm font-black transition active:scale-95 sm:px-6 sm:text-base",
                  status === "correct"
                    ? "bg-white text-lime-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90"
                    : "bg-white text-rose-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90",
                ].join(" ")}
              >
                {nextLabel}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
      : null;

  return (
    <>
      <style jsx global>{`
        @keyframes audioQuizSheetIn {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes audioQuizGlow {
          0% {
            box-shadow: 0 0 0 rgba(163, 230, 53, 0);
          }
          100% {
            box-shadow: 0 -18px 50px rgba(163, 230, 53, 0.24);
          }
        }

        .audio-quiz-bottom-sheet {
          animation:
            audioQuizSheetIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both,
            audioQuizGlow 420ms ease-out both;
        }
      `}</style>

      <div className="space-y-4 text-center theme-text">
        <div className="text-[15px] font-semibold leading-snug theme-text sm:text-lg">
          {title}
        </div>

        <div className="flex justify-center">
          <SpeakCentered
            text={word.sk}
            kind="word"
            autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
          />
        </div>
      </div>

      <div className="mt-6 w-full space-y-3">
        <div className="grid gap-4">
          {options.map((opt) => {
            const isPicked = picked === opt;
            const isCorrectOption = opt === word.sk;

            return (
              <button
                key={opt}
                disabled={answered}
                onClick={async () => {
                  if (answered) return;

                  const ok = opt === word.sk;

                  setPicked(opt);
                  setStatus(ok ? "correct" : "wrong");

                  playAnswerSfx(ok);

                  if (!audioUnlocked) {
                    await playLocal(word.sk, "word", courseId);
                  }
                }}
                className={[
                  "rounded-2xl px-4 py-3.5 text-left text-[17px] font-semibold transition sm:px-5 sm:py-4",
                  answered
                    ? "cursor-not-allowed"
                    : "hover:-translate-y-0.5 hover:border-cyan-400/35",

                  answered && isCorrectOption
                    ? "border border-lime-300/80 bg-lime-400/20 text-lime-600 shadow-[0_0_22px_rgba(163,230,53,0.24)] ring-2 ring-lime-300/35"
                    : "",

                  answered && isPicked && !isCorrectOption
                    ? "border border-rose-300/80 bg-rose-400/20 text-rose-500 shadow-[0_0_22px_rgba(251,113,133,0.22)] ring-2 ring-rose-300/30"
                    : "",

                  !answered || (!isPicked && !isCorrectOption)
                    ? "theme-inner-card theme-text"
                    : "",
                ].join(" ")}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {resultSheet}
    </>
  );
}