"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import {
  getBuildUaSentenceForWord,
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
    title: "Збери переклад",
    targetLabel: "Ціль",
    yourSentence: "Твій переклад:",
    hint: "Збери речення. Є зайві слова.",
    clear: "Очистити",
    check: "Перевірити",
    next: "Наступне →",
    back: "← Назад",
    correct: "✅ Правильно!",
    wrongPrefix: "❌ Неправильно. Правильно:",
    listenAgain: "🔊 Прослухати ще раз",
    dash: "—",
  },
  ru: {
    title: "Собери перевод",
    targetLabel: "Цель",
    yourSentence: "Твой перевод:",
    hint: "Собери предложение. Есть лишние слова.",
    clear: "Очистить",
    check: "Проверить",
    next: "Далее →",
    back: "← Назад",
    correct: "✅ Правильно!",
    wrongPrefix: "❌ Неправильно. Правильно:",
    listenAgain: "🔊 Прослушать ещё раз",
    dash: "—",
  },
  en: {
    title: "Build the translation",
    targetLabel: "Target",
    yourSentence: "Your translation:",
    hint: "Tap the words below. There are extra words.",
    clear: "Clear",
    check: "Check",
    next: "Next →",
    back: "← Back",
    correct: "✅ Correct!",
    wrongPrefix: "❌ Wrong. Correct answer:",
    listenAgain: "🔊 Listen again",
    dash: "—",
  },
} as const;

export default function BuildUaSentence({
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

  const [lockedExerciseLang, setLockedExerciseLang] = useState<UiLang>(
    uiLangFrom(lang)
  );

  useEffect(() => {
    setLockedExerciseLang(uiLangFrom(lang));
  }, [word.sk, levelId, courseId]);

  const item = useMemo(
    () =>
      getBuildUaSentenceForWord(
        word,
        lockedExerciseLang as Lang,
        levelId,
        courseId
      ),
    [word, lockedExerciseLang, levelId, courseId]
  );

  const correctTokens = useMemo(() => [...item.answerTokens], [item.answerTokens]);

  const validAnswers = useMemo(
    () => item.validAnswers.map((tokens) => [...tokens]),
    [item.validAnswers]
  );

  const initialTokens = useMemo(
    () => shuffle([...item.answerTokens, ...item.extraTokens]),
    [item.answerTokens, item.extraTokens]
  );

  const [available, setAvailable] = useState<string[]>(initialTokens);
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setAvailable(shuffle([...item.answerTokens, ...item.extraTokens]));
    setPicked([]);
    setStatus("idle");
  }, [word.sk, levelId, courseId, item.answerTokens, item.extraTokens]);

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
    setAvailable(shuffle([...item.answerTokens, ...item.extraTokens]));
  }

  async function replay() {
    await playLocal(item.sk, "phrase", courseId);
  }

  async function check() {
    const built = tokensToSentence(picked);

    const ok = validAnswers.some(
      (answer) =>
        normalizeSentence(built) ===
        normalizeSentence(tokensToSentence(answer))
    );

    setStatus(ok ? "correct" : "wrong");
    await playLocal(item.sk, "phrase", courseId);
  }

  function next() {
    onNext(status === "correct");
  }

  const builtPretty = picked.join(" ").replace(/\s+([.,!?;:])/g, "$1");

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-2">
          <div className="text-lg font-semibold leading-snug">{ui.title}</div>

          <div className="text-sm text-slate-500">
            {ui.targetLabel}:{" "}
            <span className="font-medium text-slate-800">{item.sk}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 lg:justify-end">
          <button
            onClick={clear}
            disabled={status !== "idle"}
            className="rounded-2xl border px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-50"
          >
            {ui.clear}
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900 disabled:opacity-50"
            >
              {ui.check}
            </button>
          ) : (
            <button
              onClick={next}
              className="rounded-2xl bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-900"
            >
              {ui.next}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-slate-50/60 p-4 shadow-sm sm:p-5">
        <div className="space-y-3">
          <div className="text-sm font-medium text-slate-500">
            {ui.yourSentence}
          </div>

          <div className="min-h-[32px] text-lg font-semibold text-slate-900 sm:text-[28px]">
            {picked.length ? builtPretty : ui.dash}
          </div>

          <div className="text-sm text-slate-500">{ui.hint}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {available.map((t, idx) => (
          <button
            key={`${t}-${idx}`}
            onClick={() => pickToken(t, idx)}
            disabled={status !== "idle"}
            className="rounded-xl border bg-white px-3 py-2 text-sm font-medium transition hover:bg-slate-50 active:scale-[0.97] disabled:opacity-50"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={unpickLast}
          disabled={picked.length === 0 || status !== "idle"}
          className="rounded-2xl border px-4 py-2.5 text-sm font-medium transition hover:bg-slate-50 disabled:opacity-50"
        >
          {ui.back}
        </button>
      </div>

      {status === "correct" && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3 py-2 font-medium text-green-700">
            <span>{ui.correct}</span>
          </div>

          <button
            onClick={replay}
            className="rounded-2xl border border-green-300 bg-white px-4 py-2.5 text-sm font-medium text-green-700 transition hover:bg-green-50"
          >
            {ui.listenAgain}
          </button>
        </div>
      )}

      {status === "wrong" && (
        <div className="space-y-3">
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 font-medium text-red-700">
            {ui.wrongPrefix} <b>{tokensToSentence(correctTokens)}</b>
          </div>

          <div className="flex gap-2">
            <button
              onClick={replay}
              className="rounded-2xl border border-red-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-red-50"
            >
              {ui.listenAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}