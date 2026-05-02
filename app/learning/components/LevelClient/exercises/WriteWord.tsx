"use client";

import { useEffect, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { trWord, playLocal } from "../helpers";

type CourseId = "sk" | "cs" | "pl";

const courseLangName: Record<CourseId, Record<Lang, string>> = {
  sk: { ua: "словацькою", ru: "по-словацки", en: "in Slovak" },
  cs: { ua: "чеською", ru: "по-чешски", en: "in Czech" },
  pl: { ua: "польською", ru: "по-польски", en: "in Polish" },
};

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
    return stripDiacritics(s).trim().toLowerCase().replace(/\s+/g, " ");
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
      ? "border-emerald-400/60 ring-2 ring-emerald-400/20"
      : status === "wrong"
        ? "border-rose-400/60 ring-2 ring-rose-400/20"
        : "focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20";

  const courseLang = courseLangName[courseId] ?? courseLangName.sk;

  const t = {
    title:
      lang === "en"
        ? `Write it ${courseLang.en}:`
        : lang === "ru"
          ? `Напиши ${courseLang.ru}:`
          : `Напиши ${courseLang.ua}:`,
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
    next: lang === "en" ? "Next →" : lang === "ru" ? "Далее →" : "Далі →",
    hint:
      lang === "en"
        ? "You can type without diacritics"
        : lang === "ru"
          ? "Можно без диакритики"
          : "Можна без діакритики",
  };

  return (
    <>
      <div className="space-y-4 text-center sm:space-y-5">
        <div className="space-y-2">
          <div className="text-[15px] font-semibold leading-snug theme-text sm:text-lg">
            {t.title}
          </div>

          <div className="break-words text-2xl font-bold leading-tight theme-accent-text sm:text-[30px]">
            {trWord(word, lang)}
          </div>
        </div>

        <div className="flex justify-center">
          <SpeakButton
            text={word.sk}
            kind="word"
            autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
          />
        </div>
      </div>

      <div className="mx-auto mt-6 w-full max-w-[720px] space-y-4 sm:mt-7">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          className={`theme-input w-full rounded-2xl px-4 py-3.5 text-[17px] font-semibold outline-none transition disabled:opacity-60 sm:px-5 sm:py-4 ${inputClass}`}
          placeholder={t.placeholder}
        />

        <div className="text-center text-sm leading-snug theme-text-subtle">
          {t.hint}
        </div>

        {status === "idle" ? (
          <div className="flex justify-center pt-1">
            <button
              onClick={check}
              className="theme-primary-button min-h-[46px] rounded-2xl px-7 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!value.trim()}
            >
              {t.check}
            </button>
          </div>
        ) : (
          <div className="mt-2 space-y-3">
            {status === "correct" ? (
              <div className="rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 text-center font-semibold text-emerald-500">
                {t.correctPrefix} <b>{correctAnswer}</b>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-300/25 bg-rose-400/10 px-3 py-2 text-center font-semibold text-rose-500">
                {t.wrongPrefix} <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex justify-center">
              <button
                onClick={next}
                className="theme-primary-button min-h-[46px] rounded-2xl px-7 py-3 font-semibold transition hover:-translate-y-0.5"
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