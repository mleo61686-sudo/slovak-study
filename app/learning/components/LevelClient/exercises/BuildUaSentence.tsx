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

type UiLang = "ua" | "ru";
type CourseId = "sk" | "cs" | "pl";

function uiLangFrom(lang: Lang): UiLang {
  return (lang === "ru" ? "ru" : "ua") as UiLang;
}

const UI = {
  ua: {
    title: "Збери переклад",
    targetLabel: "Ціль",
    yourSentence: "Твій переклад:",
    hint: "Натискай слова нижче. Є зайві слова.",
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
    title: "Собери перевод",
    targetLabel: "Цель",
    yourSentence: "Твой перевод:",
    hint: "Нажимай слова ниже. Есть лишние слова.",
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

  // Фіксуємо мову самої вправи на поточному слові,
  // щоб перемикання UI-мови не скидало стан і не давало обійти перевірку.
  const [lockedExerciseLang, setLockedExerciseLang] = useState<UiLang>(uiLangFrom(lang));

  // При переході на нове слово дозволяємо вправі знову взяти актуальну мову.
  useEffect(() => {
    setLockedExerciseLang(uiLangFrom(lang));
  }, [word.sk, levelId, courseId]);

  const item = useMemo(
    () => getBuildUaSentenceForWord(word, lockedExerciseLang as Lang, levelId, courseId),
    [word, lockedExerciseLang, levelId, courseId]
  );

  const correctTokens = useMemo(
    () => [...item.answerTokens],
    [item.answerTokens]
  );

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

  // Скидаємо вправу тільки коли змінилось саме слово/рівень/курс,
  // але НЕ при звичайному перемиканні UA/RU посеред поточної спроби.
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
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{ui.title}</div>

          <div className="text-sm text-slate-500">
            {ui.targetLabel}:{" "}
            <span className="font-medium text-slate-800">{item.sk}</span>
          </div>

          <div className="mt-2">
            <button className="rounded-lg border px-3 py-1 text-xs text-slate-600 hover:bg-slate-50">
              {ui.reportBug}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clear}
            disabled={status !== "idle"}
            className="rounded-xl border px-4 py-2 disabled:opacity-50"
          >
            {ui.clear}
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
            >
              {ui.check}
            </button>
          ) : (
            <button
              onClick={next}
              className="rounded-xl bg-black px-4 py-2 text-white"
            >
              {ui.next}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 rounded-2xl border bg-white p-4">
        <div className="text-sm text-slate-500">{ui.yourSentence}</div>
        <div className="text-lg">{picked.length ? builtPretty : ui.dash}</div>
        <div className="text-sm text-slate-500">{ui.hint}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((t, idx) => (
          <button
            key={`${t}-${idx}`}
            onClick={() => pickToken(t, idx)}
            disabled={status !== "idle"}
            className="rounded-xl border px-3 py-2 hover:bg-slate-50 disabled:opacity-50"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={unpickLast}
          disabled={picked.length === 0 || status !== "idle"}
          className="rounded-xl border px-3 py-2 disabled:opacity-50"
        >
          {ui.back}
        </button>
      </div>

      {status === "correct" && (
        <div className="flex items-center justify-between gap-3 font-semibold text-green-600">
          <span>{ui.correct}</span>

          <button onClick={replay} className="rounded-xl border px-3 py-2">
            {ui.listenAgain}
          </button>
        </div>
      )}

      {status === "wrong" && (
        <div className="space-y-2 font-semibold text-red-600">
          <div>
            {ui.wrongPrefix} <b>{tokensToSentence(correctTokens)}</b>
          </div>

          <div className="flex gap-2">
            <button onClick={replay} className="rounded-xl border px-3 py-2">
              {ui.listenAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}