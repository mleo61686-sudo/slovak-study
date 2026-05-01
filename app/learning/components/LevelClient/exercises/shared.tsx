"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SpeakButton from "@/app/components/SpeakButton";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";

type ResultI18n = {
  correct: string;
  wrong: string;
  next: string;
  correctAnswer: string;
  correctWord: string;
};

export const RESULT_I18N: Record<Lang, ResultI18n> = {
  ua: {
    correct: "✅ Правильно!",
    wrong: "❌ Неправильно.",
    next: "Далі →",
    correctAnswer: "Правильна відповідь:",
    correctWord: "Правильно:",
  },
  ru: {
    correct: "✅ Правильно!",
    wrong: "❌ Неправильно.",
    next: "Далее →",
    correctAnswer: "Правильный ответ:",
    correctWord: "Правильно:",
  },
  en: {
    correct: "✅ Correct!",
    wrong: "❌ Wrong.",
    next: "Next →",
    correctAnswer: "Correct answer:",
    correctWord: "Correct:",
  },
};

export function ResultBox({
  correct,
  onNext,
  lang,
  extra,
}: {
  correct: boolean;
  onNext: () => void;
  lang: Lang;
  extra?: React.ReactNode;
}) {
  const T = RESULT_I18N[lang];

  return (
    <div className="theme-inner-card space-y-3 rounded-2xl p-4 theme-text">
      {correct ? (
        <div className="font-semibold text-emerald-500">{T.correct}</div>
      ) : (
        <div className="font-semibold text-rose-500">{T.wrong}</div>
      )}

      {extra ? <div className="theme-text-muted">{extra}</div> : null}

      <button
        onClick={onNext}
        className="theme-primary-button rounded-xl px-4 py-2 font-semibold transition hover:-translate-y-0.5"
      >
        {T.next}
      </button>
    </div>
  );
}

export function WordImage({
  word,
  size = "medium",
}: {
  word: Word;
  size?: "small" | "medium" | "large";
}) {
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (!word?.img) return;
    setReady(false);

    const img = new window.Image();
    img.src = word.img;

    if (img.complete) setReady(true);
  }, [word?.img]);

  if (!word?.img) return null;

  const widthClass =
    size === "large"
      ? "w-[280px] sm:w-[360px] md:w-[420px] lg:w-[440px]"
      : size === "small"
        ? "w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px]"
        : "w-[240px] sm:w-[300px] md:w-[320px] lg:w-[340px]";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={["mx-auto", widthClass].join(" ")}>
        <div className="mx-auto w-full">
          {!ready && <div className="h-[1px]" />}

          <Image
            key={word.img}
            src={word.img}
            alt={word.sk}
            width={1200}
            height={900}
            className={[
              "h-auto w-full rounded-2xl transition-opacity duration-200",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onLoadingComplete={() => setReady(true)}
            onError={() => setReady(true)}
          />
        </div>
      </div>

      {word.imgCredit && (
        <div className="text-xs theme-text-subtle">{word.imgCredit}</div>
      )}
    </div>
  );
}

export function SpeakCentered({
  text,
  kind,
  autoPlayKey,
}: {
  text: string;
  kind?: "word" | "phrase";
  autoPlayKey?: string;
}) {
  return (
    <div className="flex justify-center">
      <SpeakButton text={text} kind={kind} autoPlayKey={autoPlayKey} />
    </div>
  );
}