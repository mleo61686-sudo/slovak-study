"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import {
  getPhraseForWord,
  normalizeSentence,
  playLocal,
  shuffle,
  tokensToSentence,
} from "../helpers";

type UiLang = "ua" | "ru" | "en";
type CourseId = "sk" | "cs" | "pl";

function uiLangFrom(lang: Lang): UiLang {
  if (lang === "ru") return "ru";
  if (lang === "en") return "en";
  return "ua";
}

const UI = {
  ua: {
    title: "Збери речення",
    targetLabel: "Ціль",
    yourSentence: "Твоє речення:",
    hint: "Збери речення.",
    clear: "Очистити",
    check: "Перевірити",
    next: "Далі",
    back: "← Назад",
    correct: "Правильно!",
    wrong: "Неправильно",
    correctAnswer: "Правильна відповідь",
    listenAgain: "Прослухати ще раз",
    dash: "—",
  },
  ru: {
    title: "Собери предложение",
    targetLabel: "Цель",
    yourSentence: "Твоё предложение:",
    hint: "Собери предложение.",
    clear: "Очистить",
    check: "Проверить",
    next: "Дальше",
    back: "← Назад",
    correct: "Правильно!",
    wrong: "Неправильно",
    correctAnswer: "Правильный ответ",
    listenAgain: "Прослушать ещё раз",
    dash: "—",
  },
  en: {
    title: "Build the sentence",
    targetLabel: "Target",
    yourSentence: "Your sentence:",
    hint: "Tap the words below.",
    clear: "Clear",
    check: "Check",
    next: "Next",
    back: "← Back",
    correct: "Correct!",
    wrong: "Not quite",
    correctAnswer: "Correct answer",
    listenAgain: "Listen again",
    dash: "—",
  },
} as const;

export default function BuildSentence({
  word,
  lang,
  levelId,
  courseId = "sk",
  onNext,
}: {
  word: Word;
  lang: Lang;
  levelId: string;
  courseId?: CourseId;
  onNext: (c: boolean) => void;
}) {
  const ui = UI[uiLangFrom(lang)];

  const phrase = useMemo(
    () => getPhraseForWord(word, lang, levelId, courseId),
    [word, lang, levelId, courseId],
  );

  const baseTokens = useMemo(() => [...phrase.tokens], [phrase.tokens.join("|")]);

  const [mounted, setMounted] = useState(false);
  const [available, setAvailable] = useState<string[]>(() => shuffle(baseTokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setAvailable(shuffle(baseTokens));
    setPicked([]);
    setStatus("idle");
  }, [word.sk, baseTokens.join("|")]);

  const playAnswerSfx = (ok: boolean) => {
    try {
      const enabled = window.localStorage.getItem("flunio.answerSfx.enabled");

      if (enabled === "false") return;

      const audio = new Audio(ok ? "/sfx/correct.mp3" : "/sfx/wrong.mp3");
      audio.volume = 0.11;
      audio.play().catch(() => { });
    } catch { }
  };

  function pickToken(t: string, idx: number) {
    if (status !== "idle") return;

    setPicked((p) => [...p, t]);
    setAvailable((a) => a.filter((_, i) => i !== idx));
  }

  function unpickLast() {
    if (status !== "idle") return;
    if (picked.length === 0) return;

    const last = picked[picked.length - 1];

    setPicked((p) => p.slice(0, -1));
    setAvailable((a) => [...a, last]);
  }

  function clear() {
    if (status !== "idle") return;

    setPicked([]);
    setAvailable(shuffle(baseTokens));
  }

  async function replay() {
    await playLocal(phrase.sk, "phrase", courseId);
  }

  async function check() {
    const built = tokensToSentence(picked);
    const target = tokensToSentence(baseTokens);
    const ok = normalizeSentence(built) === normalizeSentence(target);

    setStatus(ok ? "correct" : "wrong");

    playAnswerSfx(ok);

    await playLocal(phrase.sk, "phrase", courseId);
  }

  function next() {
    onNext(status === "correct");
  }

  const builtPretty = picked.join(" ").replace(/\s+([.,!?;:])/g, "$1");
  const correctSentence = tokensToSentence(baseTokens);

  const resultSheet =
    status !== "idle" && mounted
      ? createPortal(
        <div
          className="fixed inset-x-0 bottom-14 z-[9999] px-3 pb-[calc(env(safe-area-inset-bottom)+12px)] sm:bottom-10 sm:px-5 sm:pb-6"
          aria-live="polite"
        >
          <div
            className={[
              "build-sentence-bottom-sheet mx-auto w-full max-w-[720px] overflow-hidden rounded-[28px] border px-5 py-4 text-white shadow-2xl backdrop-blur-xl sm:px-6 sm:py-5",
              status === "correct"
                ? "border-lime-200/50 bg-lime-500"
                : "border-rose-200/50 bg-rose-500",
            ].join(" ")}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="text-xl font-black leading-tight tracking-tight text-white sm:text-2xl">
                  {status === "correct" ? ui.correct : ui.wrong}
                </div>

                <div className="mt-1 text-sm font-semibold leading-snug text-white/90 sm:text-base">
                  {status === "wrong" ? `${ui.correctAnswer}: ` : ""}
                  <span className="font-black text-white">
                    {correctSentence}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                <button
                  onClick={replay}
                  className="rounded-2xl bg-white/20 px-4 py-3 text-sm font-black text-white ring-1 ring-white/35 transition hover:bg-white/25 active:scale-95 sm:px-5"
                  aria-label={ui.listenAgain}
                  title={ui.listenAgain}
                >
                  🔊
                </button>

                <button
                  onClick={next}
                  className={[
                    "rounded-2xl px-5 py-3 text-sm font-black transition active:scale-95 sm:px-6 sm:text-base",
                    status === "correct"
                      ? "bg-white text-lime-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90"
                      : "bg-white text-rose-600 shadow-[0_10px_26px_rgba(255,255,255,0.22)] hover:bg-white/90",
                  ].join(" ")}
                >
                  {ui.next}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body,
      )
      : null;

  return (
    <>
      <style jsx global>{`
        @keyframes buildSentenceSheetIn {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes buildSentenceGlow {
          0% {
            box-shadow: 0 0 0 rgba(163, 230, 53, 0);
          }
          100% {
            box-shadow: 0 -18px 50px rgba(163, 230, 53, 0.24);
          }
        }

        .build-sentence-bottom-sheet {
          animation:
            buildSentenceSheetIn 260ms cubic-bezier(0.22, 1, 0.36, 1) both,
            buildSentenceGlow 420ms ease-out both;
        }
      `}</style>

      <div className="space-y-5 theme-text">
        <div className="flex flex-col gap-4 text-center lg:flex-row lg:items-start lg:justify-between lg:text-left">
          <div className="space-y-2">
            <div className="text-lg font-semibold leading-snug theme-text">
              {ui.title}
            </div>

            <div className="text-sm theme-text-muted">
              {ui.targetLabel}:{" "}
              <span className="font-medium theme-accent-text">
                {phrase.target}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 lg:flex lg:flex-wrap lg:items-center lg:justify-end">
            <button
              onClick={clear}
              disabled={status !== "idle"}
              className="theme-secondary-button w-full rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 lg:w-auto"
            >
              {ui.clear}
            </button>

            <button
              onClick={check}
              disabled={picked.length === 0 || status !== "idle"}
              className="theme-primary-button rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {ui.check}
            </button>
          </div>
        </div>

        <div className="theme-inner-card rounded-3xl p-5 shadow-[0_0_18px_rgba(34,211,238,0.08)] sm:p-6">
          <div className="space-y-3">
            <div className="text-sm font-medium theme-text-muted">
              {ui.yourSentence}
            </div>

            <div className="min-h-[44px] text-xl font-bold leading-snug theme-text sm:text-[28px]">
              {picked.length ? builtPretty : ui.dash}
            </div>

            <div className="text-sm theme-text-subtle">{ui.hint}</div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {available.map((t, idx) => (
            <button
              key={`${t}-${idx}`}
              onClick={() => pickToken(t, idx)}
              disabled={status !== "idle"}
              className="theme-secondary-button min-h-[42px] rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          <button
            onClick={unpickLast}
            disabled={picked.length === 0 || status !== "idle"}
            className="theme-secondary-button min-h-[42px] rounded-2xl px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {ui.back}
          </button>
        </div>
      </div>

      {resultSheet}
    </>
  );
}