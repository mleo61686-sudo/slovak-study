"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

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

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
  }, [word.sk]);

  const answered = status !== "idle";

  const title =
    lang === "en"
      ? "Listen to the word and choose the correct one:"
      : lang === "ru"
        ? "Прослушай слово и выбери правильное:"
        : "Прослухай слово і обери правильне:";

  const correctLabel =
    lang === "en" ? "Correct:" : lang === "ru" ? "Правильно:" : "Правильно:";

  return (
    <>
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
          {options.map((opt) => (
            <button
              key={opt}
              disabled={answered}
              onClick={async () => {
                if (answered) return;

                const ok = opt === word.sk;
                setPicked(opt);
                setStatus(ok ? "correct" : "wrong");

                if (!audioUnlocked) {
                  await playLocal(word.sk, "word", courseId);
                }
              }}
              className={[
                "rounded-2xl px-4 py-3.5 text-left text-[17px] font-semibold transition sm:px-5 sm:py-4",
                answered
                  ? "cursor-not-allowed opacity-60"
                  : "hover:-translate-y-0.5 hover:border-cyan-400/35",
                picked === opt
                  ? "border border-cyan-400/70 bg-cyan-400/20 text-cyan-600 shadow-[0_0_22px_rgba(34,211,238,0.24)] ring-2 ring-cyan-400/35"
                  : "theme-inner-card theme-text",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>

        {answered && (
          <div className="mt-4">
            <ResultBox
              correct={status === "correct"}
              onNext={() => onNext(status === "correct")}
              lang={lang}
              extra={
                status === "wrong" ? (
                  <div className="text-sm theme-text-muted">
                    {correctLabel} <b className="theme-text">{word.sk}</b>
                  </div>
                ) : null
              }
            />
          </div>
        )}
      </div>
    </>
  );
}