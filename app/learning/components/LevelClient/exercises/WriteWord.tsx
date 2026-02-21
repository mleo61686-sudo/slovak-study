"use client";

import { useEffect, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { trWord, playLocal } from "../helpers";
import SpeakButton from "@/app/components/SpeakButton";

export default function WriteWord({
  word,
  onNext,
  lang,
}: {
  word: Word;
  onNext: (c: boolean) => void;
  lang: Lang;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setCorrectAnswer(null);
  }, [word.sk]);

  function normalize(s: string) {
    return s.trim().toLowerCase();
  }

  async function check() {
    const ok = normalize(value) === normalize(word.sk);
    setStatus(ok ? "correct" : "wrong");
    setCorrectAnswer(word.sk);
    await playLocal(word.sk);
  }

  function next() {
    onNext(status === "correct");
  }

  const inputClass =
    status === "correct"
      ? "border-green-500"
      : status === "wrong"
        ? "border-red-500"
        : "border-slate-300";

  const t = {
    title: lang === "ru" ? "Напиши по-словацки:" : "Напиши словацькою:",
    placeholder: lang === "ru" ? "Введи слово..." : "Введи слово...",
    check: lang === "ru" ? "Проверить" : "Перевірити",
    correct: lang === "ru" ? "✅ Правильно!" : "✅ Правильно!",
    wrongPrefix: lang === "ru" ? "❌ Неправильно. Правильно:" : "❌ Неправильно. Правильно:",
    next: lang === "ru" ? "Далее →" : "Далі →",
  };

  return (
    <>
      <div className="text-lg font-semibold">
        {t.title} <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      <div className="space-y-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          className={`w-full border rounded-xl px-3 py-2 ${inputClass}`}
          placeholder={t.placeholder}
        />

        {status === "idle" ? (
          <button
            onClick={check}
            className="px-4 py-2 rounded-xl bg-black text-white"
            disabled={!value.trim()}
          >
            {t.check}
          </button>
        ) : (
          <div className="space-y-2">
            {status === "correct" ? (
              <div className="font-semibold text-green-600">{t.correct}</div>
            ) : (
              <div className="font-semibold text-red-600">
                {t.wrongPrefix} <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <SpeakButton text={word.sk} kind="word" />
              <button onClick={next} className="px-4 py-2 rounded-xl bg-black text-white">
                {t.next}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}