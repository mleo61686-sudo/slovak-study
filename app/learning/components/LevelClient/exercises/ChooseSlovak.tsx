"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord, playLocal } from "../helpers";
import { ResultBox, SpeakCentered } from "./shared";

export default function ChooseSlovak({
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
    lang === "ru" ? "Выбери слово по-словацки:" : "Обери слово словацькою:";
  const correctLabel = lang === "ru" ? "Правильно:" : "Правильно:";

  return (
    <>
      <div className="text-lg font-semibold">
        {title} <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      {/* ✅ autoplay як у вправі 1 */}
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

              // ✅ якщо autoplay ще не дозволений браузером — програємо після кліку
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
                {correctLabel} <b>{word.sk}</b>
              </div>
            ) : null
          }
        />
      )}
    </>
  );
}