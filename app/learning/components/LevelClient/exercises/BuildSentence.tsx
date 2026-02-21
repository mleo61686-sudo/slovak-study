"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { getPhraseForWord, normalizeSentence, playLocal, shuffle, tokensToSentence } from "../helpers";
import SpeakButton from "@/app/components/SpeakButton";

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
  const phrase = useMemo(() => getPhraseForWord(word, lang, levelId), [word, lang, levelId]);

  const baseTokens = useMemo(() => [...phrase.tokens], [phrase.tokens.join("|")]);
  const [available, setAvailable] = useState<string[]>(() => shuffle(baseTokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setAvailable(shuffle(baseTokens));
    setPicked([]);
    setStatus("idle");
  }, [word.sk, lang, baseTokens.join("|")]);

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
          <div className="font-semibold">B) Збери речення</div>

          <div className="text-sm text-slate-500">
            Ціль: <span className="text-slate-800 font-medium">{phrase.target}</span>
          </div>

          <div className="mt-2 flex justify-center">
            <SpeakButton text={phrase.sk} kind="phrase" />
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={clear} className="px-4 py-2 border rounded-xl">
            Очистити
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
            >
              Перевірити
            </button>
          ) : (
            <button onClick={next} className="px-4 py-2 rounded-xl bg-black text-white">
              Наступне →
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-2">
        <div className="text-sm text-slate-500">Твоє речення:</div>
        <div className="text-lg">{picked.length ? builtPretty : "—"}</div>
        <div className="text-sm text-slate-500">Натискай слова нижче.</div>
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
          ← Назад
        </button>
      </div>

      {status === "correct" && <div className="font-semibold text-green-600">✅ Правильно!</div>}
      {status === "wrong" && (
        <div className="font-semibold text-red-600">
          ❌ Неправильно. Правильно: <b>{tokensToSentence(baseTokens)}</b>
        </div>
      )}
    </div>
  );
}