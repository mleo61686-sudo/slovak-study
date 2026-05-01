"use client";

import { useEffect, useMemo, useState } from "react";
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
    next: "Наступне →",
    back: "← Назад",
    correct: "✅ Правильно!",
    wrongPrefix: "❌ Неправильно. Правильно:",
    listenAgain: "🔊 Прослухати ще раз",
    reportBug: "Повідомити про помилку",
    dash: "—",
  },
  ru: {
    title: "Собери предложение",
    targetLabel: "Цель",
    yourSentence: "Твоё предложение:",
    hint: "Собери предложение.",
    clear: "Очистить",
    check: "Проверить",
    next: "Далее →",
    back: "← Назад",
    correct: "✅ Правильно!",
    wrongPrefix: "❌ Неправильно. Правильно:",
    listenAgain: "🔊 Прослушать ещё раз",
    reportBug: "Сообщить об ошибке",
    dash: "—",
  },
  en: {
    title: "Build the sentence",
    targetLabel: "Target",
    yourSentence: "Your sentence:",
    hint: "Tap the words below.",
    clear: "Clear",
    check: "Check",
    next: "Next →",
    back: "← Back",
    correct: "✅ Correct!",
    wrongPrefix: "❌ Wrong. Correct answer:",
    listenAgain: "🔊 Listen again",
    reportBug: "Report a bug",
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
    [word, lang, levelId, courseId]
  );

  const baseTokens = useMemo(() => [...phrase.tokens], [phrase.tokens.join("|")]);
  const [available, setAvailable] = useState<string[]>(() => shuffle(baseTokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setAvailable(shuffle(baseTokens));
    setPicked([]);
    setStatus("idle");
  }, [word.sk, baseTokens.join("|")]);

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
    await playLocal(phrase.sk, "phrase", courseId);
  }

  function next() {
    onNext(status === "correct");
  }

  const builtPretty = picked.join(" ").replace(/\s+([.,!?;:])/g, "$1");

  return (
    <div className="space-y-5 theme-text">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
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

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            onClick={clear}
            className="theme-secondary-button rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
          >
            {ui.clear}
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="theme-primary-button rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {ui.check}
            </button>
          ) : (
            <button
              onClick={next}
              className="theme-primary-button rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5"
            >
              {ui.next}
            </button>
          )}
        </div>
      </div>

      <div className="theme-inner-card rounded-2xl p-4 shadow-[0_0_18px_rgba(34,211,238,0.08)] sm:p-5">
        <div className="space-y-3">
          <div className="text-sm font-medium theme-text-muted">
            {ui.yourSentence}
          </div>

          <div className="min-h-[32px] text-lg font-semibold theme-text sm:text-[28px]">
            {picked.length ? builtPretty : ui.dash}
          </div>

          <div className="text-sm theme-text-subtle">{ui.hint}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {available.map((t, idx) => (
          <button
            key={`${t}-${idx}`}
            onClick={() => pickToken(t, idx)}
            className="theme-secondary-button rounded-xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:scale-[0.97]"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={unpickLast}
          disabled={picked.length === 0 || status !== "idle"}
          className="theme-secondary-button rounded-2xl px-4 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {ui.back}
        </button>
      </div>

      {status === "correct" && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-3 py-2 font-semibold text-emerald-500">
            <span>{ui.correct}</span>
          </div>

          <button
            onClick={replay}
            className="rounded-2xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-2.5 text-sm font-semibold text-emerald-500 transition hover:-translate-y-0.5 hover:bg-emerald-400/15"
          >
            {ui.listenAgain}
          </button>
        </div>
      )}

      {status === "wrong" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 font-semibold text-rose-500">
            {ui.wrongPrefix}{" "}
            <b className="text-rose-600">{tokensToSentence(baseTokens)}</b>
          </div>

          <div className="flex gap-2">
            <button
              onClick={replay}
              className="rounded-2xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-sm font-semibold text-rose-500 transition hover:-translate-y-0.5 hover:bg-rose-400/15"
            >
              {ui.listenAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}