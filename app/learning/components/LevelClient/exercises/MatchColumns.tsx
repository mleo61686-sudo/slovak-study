"use client";

import { useEffect, useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import type { Word } from "../types";
import { shuffle, trWord } from "../helpers";

export default function MatchColumns({
  words,
  lang,
  onDone,
}: {
  words: Word[];
  lang: Lang;
  onDone: (correctCount: number) => void;
}) {
  const left = useMemo(() => shuffle(words.map((w) => w.sk)), [words]);
  const right = useMemo(() => shuffle(words.map((w) => trWord(w, lang))), [words, lang]);

  const mapSkToTr = useMemo(() => {
    const m = new Map<string, string>();
    words.forEach((w) => m.set(w.sk, trWord(w, lang)));
    return m;
  }, [words, lang]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const [matchedLeft, setMatchedLeft] = useState<Set<string>>(() => new Set());
  const [matchedRight, setMatchedRight] = useState<Set<string>>(() => new Set());

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [shakeWrong, setShakeWrong] = useState(false);
  const [wrongPair, setWrongPair] = useState<{ l: string; r: string } | null>(null);

  const MAX_WRONG = 3;

  useEffect(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedLeft(new Set());
    setMatchedRight(new Set());
    setCorrectCount(0);
    setWrongCount(0);
    setShakeWrong(false);
    setWrongPair(null);
  }, [words, lang]);

  const doneAll = matchedLeft.size >= words.length;
  const doneByWrong = wrongCount >= MAX_WRONG;
  const locked = doneAll || doneByWrong;

  function clearSelection() {
    if (locked) return;
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongPair(null);
    setShakeWrong(false);
  }

  useEffect(() => {
    if (locked) return;
    if (!selectedLeft || !selectedRight) return;

    const correct = mapSkToTr.get(selectedLeft) === selectedRight;

    if (correct) {
      setCorrectCount((c) => c + 1);
      setMatchedLeft((prev) => new Set(prev).add(selectedLeft));
      setMatchedRight((prev) => new Set(prev).add(selectedRight));
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
      return;
    }

    setWrongCount((w) => w + 1);
    setWrongPair({ l: selectedLeft, r: selectedRight });
    setShakeWrong(true);

    const t = setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
    }, 700);

    return () => clearTimeout(t);
  }, [selectedLeft, selectedRight, mapSkToTr, locked]);

  function leftBtnClass(sk: string) {
    const isMatched = matchedLeft.has(sk);
    const isSelected = selectedLeft === sk;
    const isWrong = wrongPair?.l === sk;

    return [
      "w-full text-left rounded-xl border px-4 py-3 transition",
      locked || isMatched ? "opacity-50 cursor-not-allowed bg-slate-50" : "hover:bg-slate-50",
      isSelected ? "border-green-600 ring-4 ring-green-200 bg-green-50" : "",
      isWrong ? "border-red-500 bg-red-50" : "",
    ].join(" ");
  }

  function rightBtnClass(tr: string) {
    const isMatched = matchedRight.has(tr);
    const isSelected = selectedRight === tr;
    const isWrong = wrongPair?.r === tr;

    return [
      "w-full text-left rounded-xl border px-4 py-3 transition",
      locked || isMatched ? "opacity-50 cursor-not-allowed bg-slate-50" : "hover:bg-slate-50",
      isSelected ? "border-black ring-2 ring-black/10 bg-slate-50" : "",
      isWrong ? "border-red-500 bg-red-50" : "",
    ].join(" ");
  }

  const canNext = locked;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Підбери пари</div>
          <div className="text-sm text-slate-500">
            ✅ Правильно: {correctCount} / {words.length}
            <span className="mx-2">•</span>
            ❌ Помилки: {wrongCount} / {MAX_WRONG}
          </div>

          {doneByWrong && (
            <div className="text-sm text-red-600 font-semibold mt-1">
              Ліміт помилок вичерпано — можна перейти далі.
            </div>
          )}

          {doneAll && (
            <div className="text-sm text-green-700 font-semibold mt-1">
              Усі пари зібрано — можна перейти далі.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearSelection}
            disabled={locked}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            Очистити
          </button>

          <button
            disabled={!canNext}
            onClick={() => onDone(correctCount)}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          >
            Наступне →
          </button>
        </div>
      </div>

      <div
        className={[
          "grid grid-cols-2 gap-4",
          shakeWrong ? "animate-[shake_0.2s_linear_0s_2]" : "",
        ].join(" ")}
      >
        <div className="space-y-2">
          {left.map((sk) => (
            <button
              key={sk}
              disabled={locked || matchedLeft.has(sk)}
              onClick={() => {
                if (locked) return;
                setSelectedLeft(sk);
              }}
              className={leftBtnClass(sk)}
            >
              {sk}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {right.map((t) => (
            <button
              key={t}
              disabled={locked || matchedRight.has(t)}
              onClick={() => {
                if (locked) return;
                setSelectedRight(t);
              }}
              className={rightBtnClass(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-6px);
          }
          50% {
            transform: translateX(6px);
          }
          75% {
            transform: translateX(-6px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}