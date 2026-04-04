"use client";

import { useEffect, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { trWord, playLocal } from "../helpers";

type CourseId = "sk" | "cs" | "pl";

export default function WriteWord({
  word,
  onNext,
  lang,
  quizAutoKey,
  audioUnlocked,
  courseId = "sk",
}: {
  word: Word;
  onNext: (c: boolean) => void;
  lang: Lang;
  quizAutoKey: number;
  audioUnlocked: boolean;
  courseId?: CourseId;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setCorrectAnswer(null);
  }, [word.sk]);

  function stripDiacritics(s: string) {
    return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function normalize(s: string) {
    return stripDiacritics(s)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  }

  async function check() {
    const ok = normalize(value) === normalize(word.sk);
    setStatus(ok ? "correct" : "wrong");
    setCorrectAnswer(word.sk);

    if (!audioUnlocked) {
      await playLocal(word.sk, "word", courseId);
    }
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
    title:
      lang === "en"
        ? "Write it in the course language:"
        : lang === "ru"
          ? "Напиши по-словацки:"
          : "Напиши словацькою:",
    placeholder:
      lang === "en"
        ? "Type the word..."
        : lang === "ru"
          ? "Введи слово..."
          : "Введи слово...",
    check:
      lang === "en" ? "Check" : lang === "ru" ? "Проверить" : "Перевірити",
    correctPrefix:
      lang === "en"
        ? "✅ Correct:"
        : lang === "ru"
          ? "✅ Правильно:"
          : "✅ Правильно:",
    wrongPrefix:
      lang === "en"
        ? "❌ Wrong. Correct:"
        : lang === "ru"
          ? "❌ Неправильно. Правильно:"
          : "❌ Неправильно. Правильно:",
    next:
      lang === "en" ? "Next →" : lang === "ru" ? "Далее →" : "Далі →",
    hint:
      lang === "en"
        ? "You can type without diacritics"
        : lang === "ru"
          ? "Можно без диакритики"
          : "Можна без діакритики",
  };

  return (
    <>
      <div className="text-lg font-semibold">
        {t.title} <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      <div className="mt-2">
        <SpeakButton
          text={word.sk}
          kind="word"
          autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
        />
      </div>

      <div className="space-y-3 mt-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          className={`w-full border rounded-xl px-3 py-2 ${inputClass}`}
          placeholder={t.placeholder}
        />

        <div className="text-sm text-slate-500">{t.hint}</div>

        {status === "idle" ? (
          <button
            onClick={check}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
            disabled={!value.trim()}
          >
            {t.check}
          </button>
        ) : (
          <div className="space-y-2">
            {status === "correct" ? (
              <div className="font-semibold text-green-600">
                {t.correctPrefix} <b>{correctAnswer}</b>
              </div>
            ) : (
              <div className="font-semibold text-red-600">
                {t.wrongPrefix} <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <button
                onClick={next}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                {t.next}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}