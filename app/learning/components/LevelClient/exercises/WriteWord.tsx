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
      <div className="space-y-2.5 sm:space-y-3">
        <div className="text-lg font-semibold leading-snug theme-text">
          {t.title}{" "}
          <span className="font-bold theme-accent-text">
            {trWord(word, lang)}
          </span>
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
          className={`theme-input w-full rounded-2xl px-4 py-2.5 text-[17px] outline-none transition disabled:opacity-60 sm:py-3 ${inputClass}`}
          placeholder={t.placeholder}
        />

        <div className="text-sm leading-snug theme-text-subtle">{t.hint}</div>

        {status === "idle" ? (
          <button
            onClick={check}
            className="theme-primary-button rounded-2xl px-5 py-2.5 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5 sm:py-2.5"
            disabled={!value.trim()}
          >
            {t.check}
          </button>
        ) : (
          <div className="mt-2 space-y-3">
            {status === "correct" ? (
              <div className="rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-3 py-2 font-semibold text-emerald-500">
                {t.correctPrefix} <b>{correctAnswer}</b>
              </div>
            ) : (
              <div className="rounded-xl border border-rose-300/25 bg-rose-400/10 px-3 py-2 font-semibold text-rose-500">
                {t.wrongPrefix} <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={next}
                className="theme-primary-button rounded-2xl px-5 py-2.5 font-semibold transition hover:-translate-y-0.5"
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