"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const playAnswerSfx = (ok: boolean) => {
    try {
      const enabled = window.localStorage.getItem("flunio.answerSfx.enabled");

      if (enabled === "false") return;

      const audio = new Audio(ok ? "/sfx/correct.mp3" : "/sfx/wrong.mp3");
      audio.volume = 0.15;
      audio.play().catch(() => { });
    } catch { }
  };

  async function check() {
    const ok = normalize(value) === normalize(word.sk);

    setStatus(ok ? "correct" : "wrong");
    setCorrectAnswer(word.sk);

    playAnswerSfx(ok);

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
  const translation = trWord(word, lang);

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
    resultTitleCorrect:
      lang === "en"
        ? "Correct!"
        : lang === "ru"
          ? "Правильно!"
          : "Правильно!",
    resultTitleWrong:
      lang === "en"
        ? "Not quite"
        : lang === "ru"
          ? "Неправильно"
          : "Неправильно",
    correctLabel:
      lang === "en"
        ? "Correct answer"
        : lang === "ru"
          ? "Правильный ответ"
          : "Правильна відповідь",
    yourAnswer:
      lang === "en"
        ? "Your answer"
        : lang === "ru"
          ? "Твой ответ"
          : "Твоя відповідь",
    next: lang === "en" ? "Next" : lang === "ru" ? "Дальше" : "Далі",
    hint:
      lang === "en"
        ? "You can type without diacritics"
        : lang === "ru"
          ? "Можно без диакритики"
          : "Можна без діакритики",
  };

  const resultSheet =
    status !== "idle" && mounted
      ? createPortal(
        <div
          className="fixed inset-x-0 bottom-8 z-[9999] px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:bottom-10 sm:px-5 sm:pb-6"
          aria-live="polite"
        >
          <div
            className={[
              "write-word-bottom-sheet mx-auto w-full max-w-[720px] overflow-hidden rounded-[28px] border px-5 py-4 text-white shadow-2xl backdrop-blur-xl sm:px-6 sm:py-5",
              status === "correct"
                ? "border-lime-200/50 bg-lime-500"
                : "border-rose-200/50 bg-rose-500",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                  {status === "correct"
                    ? t.resultTitleCorrect
                    : t.resultTitleWrong}
                </div>

                <div className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                  {status === "wrong" && (
                    <>
                      <span className="text-white/85">
                        {t.yourAnswer}:{" "}
                        <span className="font-black text-white">
                          {value.trim()}
                        </span>
                      </span>
                      <span className="mx-2 text-white/70">•</span>
                    </>
                  )}

                  <span>
                    {status === "wrong" ? `${t.correctLabel}: ` : ""}
                    <span className="font-black text-white">
                      {correctAnswer}
                    </span>
                    <span className="px-1 text-white/80">—</span>
                    <span className="font-black text-white">
                      {translation}
                    </span>
                  </span>
                </div>
              </div>

              <button
                onClick={next}
                className={[
                  "shrink-0 rounded-2xl px-5 py-3 text-sm font-black transition active:scale-95 sm:px-6 sm:text-base",
                  status === "correct"
                    ? "bg-white text-lime-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90"
                    : "bg-white text-rose-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90",
                ].join(" ")}
              >
                {t.next}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )
      : null;

  return (
    <>
      <style jsx global>{`
        @keyframes writeWordSheetIn {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes writeWordGlow {
          0% {
            box-shadow: 0 0 0 rgba(163, 230, 53, 0);
          }
          100% {
            box-shadow: 0 -18px 50px rgba(163, 230, 53, 0.24);
          }
        }

        .write-word-bottom-sheet {
          animation:
            writeWordSheetIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both,
            writeWordGlow 420ms ease-out both;
        }
      `}</style>

      <div className="space-y-4 text-center sm:space-y-5">
        <div className="space-y-2">
          <div className="text-[15px] font-semibold leading-snug theme-text sm:text-lg">
            {t.title}
          </div>

          <div className="break-words text-2xl font-bold leading-tight theme-accent-text sm:text-[30px]">
            {translation}
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

        {status === "idle" && (
          <div className="flex justify-center pt-1">
            <button
              onClick={check}
              className="theme-primary-button min-h-[46px] rounded-2xl px-7 py-3 font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!value.trim()}
            >
              {t.check}
            </button>
          </div>
        )}
      </div>

      {resultSheet}
    </>
  );
}