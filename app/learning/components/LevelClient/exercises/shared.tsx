"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SpeakButton from "@/app/components/SpeakButton";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";

export const RESULT_I18N = {
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
} satisfies Record<Lang, any>;

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
    <div className="rounded-2xl border bg-slate-50 p-4 space-y-3">
      {correct ? (
        <div className="font-semibold text-green-700">{T.correct}</div>
      ) : (
        <div className="font-semibold text-red-600">{T.wrong}</div>
      )}

      {extra ? <div>{extra}</div> : null}

      <button onClick={onNext} className="px-4 py-2 rounded-xl bg-black text-white">
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
              "w-full h-auto rounded-2xl bg-white transition-opacity duration-200",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onLoadingComplete={() => setReady(true)}
            onError={() => setReady(true)}
          />
        </div>
      </div>

      {word.imgCredit && <div className="text-xs text-slate-500">{word.imgCredit}</div>}
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