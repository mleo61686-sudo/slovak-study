"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const t = {
    title: lang === "ru" ? "Подбери пары" : "Підбери пари",
    correct: lang === "ru" ? "✅ Правильно" : "✅ Правильно",
    wrongs: lang === "ru" ? "❌ Ошибки" : "❌ Помилки",
    limitReached:
      lang === "ru"
        ? "Лимит ошибок исчерпан — можно перейти дальше."
        : "Ліміт помилок вичерпано — можна перейти далі.",
    allDone:
      lang === "ru"
        ? "Все пары собраны — можно перейти дальше."
        : "Усі пари зібрано — можна перейти далі.",
    clear: lang === "ru" ? "Очистить" : "Очистити",
    next: lang === "ru" ? "Далее →" : "Наступне →",
  };

  const left = useMemo(() => shuffle(words.map((w) => w.sk)), [words]);
  const right = useMemo(
    () => shuffle(words.map((w) => trWord(w, lang))),
    [words, lang]
  );

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
  const [wrongPair, setWrongPair] = useState<{ l: string; r: string } | null>(
    null
  );

  const [isResolving, setIsResolving] = useState(false);

  const timeoutRef = useRef<number | null>(null);

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
    setIsResolving(false);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [words, lang]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  const doneAll = matchedLeft.size >= words.length;
  const doneByWrong = wrongCount >= MAX_WRONG;
  const locked = doneAll || doneByWrong;

  function clearSelection() {
    if (locked || isResolving) return;

    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongPair(null);
    setShakeWrong(false);
  }

  useEffect(() => {
    if (locked) return;
    if (isResolving) return;
    if (!selectedLeft || !selectedRight) return;

    setIsResolving(true);

    const correct = mapSkToTr.get(selectedLeft) === selectedRight;

    if (correct) {
      setCorrectCount((c) => c + 1);
      setMatchedLeft((prev) => new Set(prev).add(selectedLeft));
      setMatchedRight((prev) => new Set(prev).add(selectedRight));
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
      setIsResolving(false);
      return;
    }

    setWrongCount((w) => w + 1);
    setWrongPair({ l: selectedLeft, r: selectedRight });
    setShakeWrong(true);

    timeoutRef.current = window.setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
      setIsResolving(false);
      timeoutRef.current = null;
    }, 700);
  }, [selectedLeft, selectedRight, mapSkToTr, locked, isResolving]);

  function leftBtnClass(sk: string) {
    const isMatched = matchedLeft.has(sk);
    const isSelected = selectedLeft === sk;
    const isWrong = wrongPair?.l === sk;

    return [
      "w-full text-left rounded-xl border px-4 py-3 transition",
      locked || isMatched || isResolving
        ? "opacity-50 cursor-not-allowed bg-slate-50"
        : "hover:bg-slate-50",
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
      locked || isMatched || isResolving
        ? "opacity-50 cursor-not-allowed bg-slate-50"
        : "hover:bg-slate-50",
      isSelected ? "border-black ring-2 ring-black/10 bg-slate-50" : "",
      isWrong ? "border-red-500 bg-red-50" : "",
    ].join(" ");
  }

  const canNext = locked;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{t.title}</div>
          <div className="text-sm text-slate-500">
            {t.correct}: {correctCount} / {words.length}
            <span className="mx-2">•</span>
            {t.wrongs}: {wrongCount} / {MAX_WRONG}
          </div>

          {doneByWrong && (
            <div className="mt-1 text-sm font-semibold text-red-600">
              {t.limitReached}
            </div>
          )}

          {doneAll && (
            <div className="mt-1 text-sm font-semibold text-green-700">
              {t.allDone}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearSelection}
            disabled={locked || isResolving}
            className="rounded-xl border px-4 py-2 disabled:opacity-50"
          >
            {t.clear}
          </button>

          <button
            disabled={!canNext}
            onClick={() => onDone(correctCount)}
            className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {t.next}
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
              disabled={locked || matchedLeft.has(sk) || isResolving}
              onClick={() => {
                if (locked || isResolving) return;
                setSelectedLeft(sk);
              }}
              className={leftBtnClass(sk)}
            >
              {sk}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {right.map((r) => (
            <button
              key={r}
              disabled={locked || matchedRight.has(r) || isResolving}
              onClick={() => {
                if (locked || isResolving) return;
                setSelectedRight(r);
              }}
              className={rightBtnClass(r)}
            >
              {r}
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