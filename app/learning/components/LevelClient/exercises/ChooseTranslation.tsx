"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

export default function ChooseTranslation({
  word,
  words,
  onNext,
  lang,
  quizAutoKey,
  audioUnlocked,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
  quizAutoKey: number;
  audioUnlocked: boolean;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => trWord(w, lang));
  }, [word, words, lang]);

  const correctText = trWord(word, lang);

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
  }, [word.sk, lang]);

  const answered = status !== "idle";

  return (
    <>
      <div className="text-lg font-semibold">
        Обери переклад: <span className="font-bold">{word.sk}</span>
      </div>

      <SpeakCentered
        text={word.sk}
        kind="word"
        autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
      />

      <div className="grid gap-3">
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
                await playLocal(word.sk);
              }
            }}
            className={[
              "rounded-xl border px-4 py-3 text-left transition",
              answered ? "opacity-60 cursor-not-allowed" : "hover:bg-slate-50",
              picked === opt ? "border-black ring-2 ring-black/10" : "",
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
              <div className="text-sm text-slate-700">
                Правильна відповідь: <b>{correctText}</b>
              </div>
            ) : null
          }
        />
      )}
    </>
  );
}