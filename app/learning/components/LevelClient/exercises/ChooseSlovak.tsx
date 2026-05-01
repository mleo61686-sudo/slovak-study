"use client";

import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
  }, [word.sk]);

  const answered = status !== "idle";
  const courseLang = courseLangName[courseId] ?? courseLangName.sk;

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
        <div className="text-lg font-semibold leading-snug theme-text">
          {title}{" "}
          <span className="font-bold theme-accent-text">
            {trWord(word, lang)}
          </span>
        </div>

        <div className="flex justify-center">
          <SpeakCentered
            text={word.sk}
            kind="word"
            autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
          />
        </div>
      </div>

      <div className="mt-4 grid gap-3">
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
              "rounded-2xl px-4 py-3 text-left text-[17px] font-semibold transition sm:px-5 sm:py-3.5",
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