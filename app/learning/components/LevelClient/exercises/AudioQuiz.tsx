"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

export default function AudioQuiz({
  word,
  words,
  onNext,
  quizAutoKey,
  audioUnlocked,
  lang,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  quizAutoKey: number;
  audioUnlocked: boolean;
  lang: Lang;
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

  return (
    <>
      <div className="text-lg font-semibold">
        Прослухай слово і обери правильне:
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

              const ok = opt === word.sk;
              setPicked(opt);
              setStatus(ok ? "correct" : "wrong");

              // ✅ якщо autoplay вимкнений — програємо після вибору (інакше буде 2 рази)
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
                Правильно: <b>{word.sk}</b>
              </div>
            ) : null
          }
        />
      )}
    </>
  );
}