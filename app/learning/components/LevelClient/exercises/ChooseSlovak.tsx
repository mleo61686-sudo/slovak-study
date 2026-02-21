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
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
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
  }, [word.sk, lang]);

  const answered = status !== "idle";

  return (
    <>
      <div className="text-lg font-semibold">
        Обери слово словацькою:{" "}
        <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      <SpeakCentered text={word.sk} kind="word" />

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

              // ✅ тут autoplay немає — сміливо програємо після вибору
              await playLocal(word.sk);
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