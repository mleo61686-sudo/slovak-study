"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord, playLocal } from "../helpers";
import { SpeakCentered } from "./shared";

type CourseId = "sk" | "cs" | "pl";

const courseLangName: Record<CourseId, Record<Lang, string>> = {
  sk: { ua: "словацькою", ru: "по-словацки", en: "in Slovak" },
  cs: { ua: "чеською", ru: "по-чешски", en: "in Czech" },
  pl: { ua: "польською", ru: "по-польски", en: "in Polish" },
};

export default function ChooseSlovak({
  word,
  words,
  onNext,
  lang,
  quizAutoKey,
  audioUnlocked,
  courseId = "sk",
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
  quizAutoKey: number;
  audioUnlocked: boolean;
  courseId?: CourseId;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => w.sk);
  }, [word, words]);

  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [picked, setPicked] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setStatus("idle");
    setPicked(null);
    setImageLoaded(false);
  }, [word.sk]);

  const answered = status !== "idle";
  const courseLang = courseLangName[courseId] ?? courseLangName.sk;
  const translation = trWord(word, lang);

  const playAnswerSfx = (ok: boolean) => {
    try {
      const enabled = window.localStorage.getItem("flunio.answerSfx.enabled");

      if (enabled === "false") return;

      const audio = new Audio(ok ? "/sfx/correct.mp3" : "/sfx/wrong.mp3");
      audio.volume = 0.13;
      audio.play().catch(() => { });
    } catch { }
  };

  const title =
    lang === "en"
      ? `Choose the word ${courseLang.en}:`
      : lang === "ru"
        ? `Выбери слово ${courseLang.ru}:`
        : `Обери слово ${courseLang.ua}:`;

  const resultTitle =
    status === "correct"
      ? lang === "en"
        ? "Correct!"
        : lang === "ru"
          ? "Правильно!"
          : "Правильно!"
      : lang === "en"
        ? "Not quite"
        : lang === "ru"
          ? "Неправильно"
          : "Неправильно";

  const correctLabel =
    lang === "en"
      ? "Correct answer"
      : lang === "ru"
        ? "Правильный ответ"
        : "Правильна відповідь";

  const nextLabel =
    lang === "en" ? "Next" : lang === "ru" ? "Дальше" : "Далі";

  return (
    <>
      <style jsx global>{`
        @keyframes chooseSlovakSheetIn {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes chooseSlovakGlow {
          0% {
            box-shadow: 0 0 0 rgba(163, 230, 53, 0);
          }
          100% {
            box-shadow: 0 -18px 50px rgba(163, 230, 53, 0.24);
          }
        }

        .choose-slovak-bottom-sheet {
          animation:
            chooseSlovakSheetIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both,
            chooseSlovakGlow 420ms ease-out both;
        }
      `}</style>

      <div className="space-y-3 theme-text">
        <div className="text-center text-[15px] font-medium leading-snug theme-text">
          {title}
        </div>

        {word.img ? (
          <div className="mt-2 flex flex-col items-center gap-2">
            <div className="mx-auto w-full max-w-[320px]">
              <div className="theme-inner-card relative min-h-[180px] overflow-hidden rounded-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-white/10" />
                )}

                <Image
                  src={word.img}
                  alt={word.sk}
                  width={1200}
                  height={900}
                  onLoad={() => setImageLoaded(true)}
                  className={[
                    "h-auto w-full rounded-2xl transition-all duration-500",
                    imageLoaded
                      ? "scale-100 opacity-100 blur-0"
                      : "scale-[1.02] opacity-0 blur-sm",
                  ].join(" ")}
                />
              </div>
            </div>

            {word.imgCredit && (
              <div className="text-xs theme-text-subtle">{word.imgCredit}</div>
            )}
          </div>
        ) : null}

        <div
          className={[
            "text-center transition-all duration-300",
            word.img
              ? imageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-90"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-2xl font-black leading-tight theme-accent-text sm:text-[30px]">
            <span className="break-words">{translation}</span>
          </div>
        </div>

        <div
          className={[
            "flex justify-center transition-all duration-300",
            word.img
              ? imageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-1 opacity-90"
              : "translate-y-0 opacity-100",
          ].join(" ")}
        >
          <SpeakCentered
            text={word.sk}
            kind="word"
            autoPlayKey={audioUnlocked ? `${quizAutoKey}:${word.sk}` : undefined}
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3">
        {options.map((opt) => {
          const isPicked = picked === opt;
          const isCorrectOption = opt === word.sk;

          return (
            <button
              key={opt}
              disabled={answered}
              onClick={async () => {
                if (answered) return;

                const ok = opt === word.sk;

                setPicked(opt);
                setStatus(ok ? "correct" : "wrong");

                playAnswerSfx(ok);

                if (!audioUnlocked) {
                  await playLocal(word.sk, "word", courseId);
                }
              }}
              className={[
                "rounded-2xl px-4 py-3 text-left font-semibold transition",
                "break-words leading-snug",
                answered
                  ? "cursor-not-allowed"
                  : "hover:-translate-y-0.5 hover:border-cyan-400/35",

                answered && isCorrectOption
                  ? "border border-lime-300/80 bg-lime-400/20 text-lime-600 shadow-[0_0_22px_rgba(163,230,53,0.24)] ring-2 ring-lime-300/35"
                  : "",

                answered && isPicked && !isCorrectOption
                  ? "border border-rose-300/80 bg-rose-400/20 text-rose-500 shadow-[0_0_22px_rgba(251,113,133,0.22)] ring-2 ring-rose-300/30"
                  : "",

                !answered || (!isPicked && !isCorrectOption)
                  ? "theme-inner-card theme-text"
                  : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {answered && (
        <div
          className="fixed inset-x-0 bottom-14 z-50 px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:bottom-10 sm:px-5 sm:pb-6"
          aria-live="polite"
        >
          <div
            className={[
              "choose-slovak-bottom-sheet mx-auto w-full max-w-[720px] overflow-hidden rounded-[28px] border px-5 py-4 text-white shadow-2xl backdrop-blur-xl sm:px-6 sm:py-5",
              status === "correct"
                ? "border-lime-200/50 bg-lime-500"
                : "border-rose-200/50 bg-rose-500",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                  {resultTitle}
                </div>

                <div className="mt-1 text-sm font-semibold text-white/90 sm:text-base">
                  {status === "wrong" ? `${correctLabel}: ` : ""}
                  <span className="font-black text-white">{word.sk}</span>
                  <span className="px-1 text-white/80">—</span>
                  <span className="font-black text-white">{translation}</span>
                </div>
              </div>

              <button
                onClick={() => onNext(status === "correct")}
                className={[
                  "shrink-0 rounded-2xl px-5 py-3 text-sm font-black transition active:scale-95 sm:px-6 sm:text-base",
                  status === "correct"
                    ? "bg-white text-lime-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90"
                    : "bg-white text-rose-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90",
                ].join(" ")}
              >
                {nextLabel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}