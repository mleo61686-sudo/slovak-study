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
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-lg font-semibold leading-snug">
          {t.title} <span className="font-bold">{trWord(word, lang)}</span>
        </div>

        <div className="flex justify-start">
          <SpeakButton
            text={word.sk}
            kind="word"
            autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
          />
        </div>
      </div>

      <div className="mt-3 max-w-[720px] space-y-2.5 sm:mt-4 sm:space-y-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          className={`w-full rounded-2xl border px-4 py-2.5 text-[17px] outline-none transition sm:py-3 ${inputClass}`}
          placeholder={t.placeholder}
        />

        <div className="text-sm leading-snug text-slate-500">{t.hint}</div>

        {status === "idle" ? (
          <button
            onClick={check}
            className="rounded-2xl bg-black px-5 py-2.5 text-white transition disabled:opacity-50 sm:px-5 sm:py-2.5"
            disabled={!value.trim()}
          >
            {t.check}
          </button>
        ) : (
          <div className="mt-2 space-y-3">
            {status === "correct" ? (
              <div className="rounded-xl border border-green-200 bg-green-50 px-3 py-2 font-semibold text-green-700">
                {t.correctPrefix} <b>{correctAnswer}</b>
              </div>
            ) : (
              <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-semibold text-red-700">
                {t.wrongPrefix} <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex gap-2 items-center">
              <button
                onClick={next}
                className="rounded-2xl bg-black px-5 py-2.5 text-white transition"
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