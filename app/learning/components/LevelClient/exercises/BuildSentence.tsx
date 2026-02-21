"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { getPhraseForWord, normalizeSentence, playLocal, shuffle, tokensToSentence } from "../helpers";

type UiLang = "ua" | "ru";

function uiLangFrom(lang: Lang): UiLang {
  return (lang === "ru" ? "ru" : "ua") as UiLang;
}

const UI = {
  ua: {
    title: "Збери речення",
    targetLabel: "Ціль",
    yourSentence: "Твоє речення:",
    hint: "Натискай слова нижче.",
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
    hint: "Нажимай слова ниже.",
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

export default function BuildSentence({
  word,
  lang,
  levelId,
  onNext,
}: {
  word: Word;
  lang: Lang;
  levelId: string;
  onNext: (c: boolean) => void;
}) {
  const ui = UI[uiLangFrom(lang)];

  const phrase = useMemo(() => getPhraseForWord(word, lang, levelId), [word, lang, levelId]);

  const baseTokens = useMemo(() => [...phrase.tokens], [phrase.tokens.join("|")]);
  const [available, setAvailable] = useState<string[]>(() => shuffle(baseTokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setAvailable(shuffle(baseTokens));
    setPicked([]);
    setStatus("idle");
    // не ресетимо на зміну мови, щоб не можна було "перезібрати" після wrong
  }, [word.sk, baseTokens.join("|")]);

  function pickToken(t: string, idx: number) {
    if (status !== "idle") return;
    setPicked((p) => [...p, t]);
    setAvailable((a) => a.filter((_, i) => i !== idx));
  }

  function unpickLast() {
    if (status !== "idle") return;
    setPicked((p) => {
      if (p.length === 0) return p;
      const last = p[p.length - 1];
      setAvailable((a) => [...a, last]);
      return p.slice(0, -1);
    });
  }

  function clear() {
    if (status !== "idle") return;
    setPicked([]);
    setAvailable(shuffle(baseTokens));
  }

  async function replay() {
    await playLocal(phrase.sk);
  }

  async function check() {
    const built = tokensToSentence(picked);
    const target = tokensToSentence(baseTokens);
    const ok = normalizeSentence(built) === normalizeSentence(target);

    setStatus(ok ? "correct" : "wrong");
    await playLocal(phrase.sk);
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
            {ui.targetLabel}: <span className="text-slate-800 font-medium">{phrase.target}</span>
          </div>

          <div className="mt-2">
            <button className="text-xs px-3 py-1 border rounded-lg text-slate-600 hover:bg-slate-50">
              {ui.reportBug}
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={clear} className="px-4 py-2 border rounded-xl">
            {ui.clear}
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
            >
              {ui.check}
            </button>
          ) : (
            <button onClick={next} className="px-4 py-2 rounded-xl bg-black text-white">
              {ui.next}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-2">
        <div className="text-sm text-slate-500">{ui.yourSentence}</div>
        <div className="text-lg">{picked.length ? builtPretty : ui.dash}</div>
        <div className="text-sm text-slate-500">{ui.hint}</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((t, idx) => (
          <button
            key={`${t}-${idx}`}
            onClick={() => pickToken(t, idx)}
            className="px-3 py-2 border rounded-xl hover:bg-slate-50"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={unpickLast}
          disabled={picked.length === 0 || status !== "idle"}
          className="px-3 py-2 border rounded-xl disabled:opacity-50"
        >
          {ui.back}
        </button>
      </div>

      {status === "correct" && (
        <div className="font-semibold text-green-600 flex items-center justify-between gap-3">
          <span>{ui.correct}</span>

          <button onClick={replay} className="px-3 py-2 border rounded-xl">
            {ui.listenAgain}
          </button>
        </div>
      )}

      {status === "wrong" && (
        <div className="font-semibold text-red-600 space-y-2">
          <div>
            {ui.wrongPrefix} <b>{tokensToSentence(baseTokens)}</b>
          </div>

          <div className="flex gap-2">
            <button onClick={replay} className="px-3 py-2 border rounded-xl">
              {ui.listenAgain}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}