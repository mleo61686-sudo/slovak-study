"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

type CourseId = "sk" | "cs" | "pl";

const courseLangName: Record<CourseId, Record<Lang, string>> = {
  sk: { ua: "словацькою", ru: "по-словацки", en: "in Slovak" },
  cs: { ua: "чеською", ru: "по-чешски", en: "in Czech" },
  pl: { ua: "польською", ru: "по-польски", en: "in Polish" },
};

export default function ChooseSlovak({
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
    return variants.map((w) => w.sk);
  }, [word, words]);

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
    setImageLoaded(false);
  }, [word.sk]);

  const answered = status !== "idle";
  const courseLang = courseLangName[courseId] ?? courseLangName.sk;
  const translation = trWord(word, lang);

  const title =
    lang === "en"
      ? `Choose the word ${courseLang.en}:`
      : lang === "ru"
        ? `Выбери слово ${courseLang.ru}:`
        : `Обери слово ${courseLang.ua}:`;

  const correctLabel =
    lang === "en" ? "Correct:" : lang === "ru" ? "Правильно:" : "Правильно:";

  return (
    <>
      <div className="space-y-3 theme-text">
        <div className="text-center text-[15px] font-medium leading-snug theme-text">
          {title}
        </div>

        {word.img ? (
          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="mx-auto w-full max-w-[320px]">
              <div className="theme-inner-card relative min-h-[180px] overflow-hidden rounded-2xl">
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
                    "h-auto w-full rounded-2xl transition-all duration-500",
                    imageLoaded
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-[1.02] opacity-0 blur-sm",
                  ].join(" ")}
                />
              </div>
            </div>

            {word.imgCredit && (
              <div className="text-xs theme-text-subtle">{word.imgCredit}</div>
            )}
          </div>
        ) : null}

        <div
          className={[
            "text-center transition-all duration-300",
            word.img
              ? imageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-90"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-2xl font-black leading-tight theme-accent-text sm:text-[30px]">
            <span className="break-words">{translation}</span>
          </div>
        </div>

        <div
          className={[
            "flex justify-center transition-all duration-300",
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
      </div>

      <div className="mt-3 grid gap-3">
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
              "rounded-2xl px-4 py-3 text-left font-semibold transition",
              "break-words leading-snug",
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
    </>
  );
}