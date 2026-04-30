"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

type CourseId = "sk" | "cs" | "pl";

export default function ChooseTranslation({
  word,
  words,
  onNext,
  lang,
  quizAutoKey,
  audioUnlocked,
  courseId = "sk",
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
  quizAutoKey: number;
  audioUnlocked: boolean;
  courseId?: CourseId;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => trWord(w, lang));
  }, [word, words, lang]);

  const correctText = trWord(word, lang);

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
    setImageLoaded(false);
  }, [word.sk]);

  const answered = status !== "idle";

  const correctLabel =
    lang === "en"
      ? "Correct answer:"
      : lang === "ru"
        ? "Правильный ответ:"
        : "Правильна відповідь:";

  const chooseLabel =
    lang === "en"
      ? "Choose the translation:"
      : lang === "ru"
        ? "Выбери перевод:"
        : "Обери переклад:";

  return (
    <>
      <div
        className={[
          "text-lg font-semibold text-white transition-all duration-300",
          word.img
            ? imageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-90"
            : "translate-y-0 opacity-100",
        ].join(" ")}
      >
        {chooseLabel} <span className="font-bold text-cyan-100">{word.sk}</span>
      </div>

      {word.img ? (
        <div className="mt-2 flex flex-col items-center gap-2">
          <div className="mx-auto w-full max-w-[320px]">
            <div className="relative min-h-[180px] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {!imageLoaded && (
                <div className="absolute inset-0 animate-pulse bg-white/10" />
              )}

              <Image
                src={word.img}
                alt={word.sk}
                width={1200}
                height={900}
                onLoad={() => setImageLoaded(true)}
                className={[
                  "h-auto w-full rounded-2xl bg-white/5 transition-all duration-500",
                  imageLoaded
                    ? "scale-100 opacity-100 blur-0"
                    : "scale-[1.02] opacity-0 blur-sm",
                ].join(" ")}
              />
            </div>
          </div>

          {word.imgCredit && (
            <div className="text-xs text-white/45">{word.imgCredit}</div>
          )}
        </div>
      ) : null}

      <div
        className={[
          "mt-2 transition-all duration-300",
          word.img
            ? imageLoaded
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-90"
            : "translate-y-0 opacity-100",
        ].join(" ")}
      >
        <SpeakCentered
          text={word.sk}
          kind="word"
          autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
        />
      </div>

      <div className="mt-3 grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            disabled={answered}
            onClick={async () => {
              if (answered) return;

              const ok = opt === correctText;
              setPicked(opt);
              setStatus(ok ? "correct" : "wrong");

              if (!audioUnlocked) {
                await playLocal(word.sk, "word", courseId);
              }
            }}
            className={[
              "rounded-2xl border px-4 py-3 text-left font-semibold text-white transition",
              answered
                ? "cursor-not-allowed opacity-60"
                : "border-white/10 bg-white/5 hover:border-cyan-400/35 hover:bg-white/10",
              picked === opt
                ? "border-cyan-400/50 bg-cyan-400/10 ring-2 ring-cyan-400/20"
                : "",
            ].join(" ")}
          >
            {opt}
          </button>
        ))}
      </div>

      {answered && (
        <ResultBox
          correct={status === "correct"}
          onNext={() => onNext(status === "correct")}
          lang={lang}
          extra={
            status === "wrong" ? (
              <div className="text-sm text-white/70">
                {correctLabel} <b className="text-white">{correctText}</b>
              </div>
            ) : null
          }
        />
      )}
    </>
  );
}