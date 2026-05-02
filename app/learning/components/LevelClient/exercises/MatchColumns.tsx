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
    title:
      lang === "en"
        ? "Match the pairs"
        : lang === "ru"
          ? "Подбери пары"
          : "Підбери пари",
    correct:
      lang === "en" ? "✅ Correct" : lang === "ru" ? "✅ Правильно" : "✅ Правильно",
    wrongs:
      lang === "en" ? "❌ Mistakes" : lang === "ru" ? "❌ Ошибки" : "❌ Помилки",
    limitReached:
      lang === "en"
        ? "Mistake limit reached — you can continue."
        : lang === "ru"
          ? "Лимит ошибок исчерпан — можно перейти дальше."
          : "Ліміт помилок вичерпано — можна перейти далі.",
    allDone:
      lang === "en"
        ? "All pairs matched — you can continue."
        : lang === "ru"
          ? "Все пары собраны — можно перейти дальше."
          : "Усі пари зібрано — можна перейти далі.",
    clear: lang === "en" ? "Clear" : lang === "ru" ? "Очистить" : "Очистити",
    next: lang === "en" ? "Next →" : lang === "ru" ? "Далее →" : "Наступне →",
  };

  const left = useMemo(() => shuffle(words.map((w) => w.sk)), [words]);

  const right = useMemo(
    () => shuffle(words.map((w) => trWord(w, lang))),
    [words, lang]
  );

  const rows = useMemo(() => {
    return left.map((sk, index) => ({
      sk,
      tr: right[index],
    }));
  }, [left, right]);

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

  const [justMatchedPair, setJustMatchedPair] = useState<{
    l: string;
    r: string;
  } | null>(null);

  const [isResolving, setIsResolving] = useState(false);

  const timeoutRef = useRef<number | null>(null);
  const correctFlashTimeoutRef = useRef<number | null>(null);

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
    setJustMatchedPair(null);
    setIsResolving(false);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (correctFlashTimeoutRef.current !== null) {
      window.clearTimeout(correctFlashTimeoutRef.current);
      correctFlashTimeoutRef.current = null;
    }
  }, [words, lang]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      if (correctFlashTimeoutRef.current !== null) {
        window.clearTimeout(correctFlashTimeoutRef.current);
        correctFlashTimeoutRef.current = null;
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
    setJustMatchedPair(null);
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
      setJustMatchedPair({ l: selectedLeft, r: selectedRight });
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
      setIsResolving(false);

      if (correctFlashTimeoutRef.current !== null) {
        window.clearTimeout(correctFlashTimeoutRef.current);
      }

      correctFlashTimeoutRef.current = window.setTimeout(() => {
        setJustMatchedPair(null);
        correctFlashTimeoutRef.current = null;
      }, 650);

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
    const isJustMatched = justMatchedPair?.l === sk;

    return [
      "min-h-[44px] w-full rounded-2xl px-3 py-2 text-left text-[14px] font-semibold leading-snug transition sm:min-h-[50px] sm:px-4 sm:py-3 sm:text-base",
      isMatched
        ? "cursor-not-allowed border border-emerald-400/50 bg-emerald-400/15 text-emerald-300 opacity-95"
        : locked || isResolving
          ? "cursor-not-allowed opacity-45 theme-inner-card theme-text"
          : "theme-inner-card theme-text hover:-translate-y-0.5 hover:border-cyan-400/35",
      isSelected
        ? "scale-[1.015] border-2 border-emerald-400 bg-emerald-400/25 text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.28)] ring-2 ring-emerald-400/35"
        : "",
      isJustMatched
        ? "border-2 border-emerald-400 bg-emerald-400/25 text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.28)] ring-2 ring-emerald-400/35"
        : "",
      isWrong
        ? "border-2 border-rose-400 bg-rose-400/20 text-rose-100 ring-2 ring-rose-400/30"
        : "",
    ].join(" ");
  }

  function rightBtnClass(tr: string) {
    const isMatched = matchedRight.has(tr);
    const isSelected = selectedRight === tr;
    const isWrong = wrongPair?.r === tr;
    const isJustMatched = justMatchedPair?.r === tr;

    return [
      "min-h-[44px] w-full rounded-2xl px-3 py-2 text-left text-[14px] font-semibold leading-snug transition sm:min-h-[50px] sm:px-4 sm:py-3 sm:text-base",
      isMatched
        ? "cursor-not-allowed border border-emerald-400/50 bg-emerald-400/15 text-emerald-300 opacity-95"
        : locked || isResolving
          ? "cursor-not-allowed opacity-45 theme-inner-card theme-text"
          : "theme-inner-card theme-text hover:-translate-y-0.5 hover:border-cyan-400/35",
      isSelected
        ? "scale-[1.015] border-2 border-cyan-400 bg-cyan-400/25 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.28)] ring-2 ring-cyan-400/35"
        : "",
      isJustMatched
        ? "border-2 border-emerald-400 bg-emerald-400/25 text-emerald-100 shadow-[0_0_22px_rgba(16,185,129,0.28)] ring-2 ring-emerald-400/35"
        : "",
      isWrong
        ? "border-2 border-rose-400 bg-rose-400/20 text-rose-100 ring-2 ring-rose-400/30"
        : "",
    ].join(" ");
  }

  const canNext = locked;

  return (
    <div className="space-y-4 theme-text">
      <div className="space-y-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="text-xl font-bold leading-tight theme-text sm:text-lg">
              {t.title}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-xs font-semibold sm:text-sm">
              <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-emerald-400">
                {t.correct}: {correctCount}/{words.length}
              </span>

              <span className="rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 text-rose-400">
                {t.wrongs}: {wrongCount}/{MAX_WRONG}
              </span>
            </div>

            {doneByWrong && (
              <div className="mt-1 text-sm font-semibold text-rose-500">
                {t.limitReached}
              </div>
            )}

            {doneAll && (
              <div className="mt-1 text-sm font-semibold text-emerald-500">
                {t.allDone}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:flex">
            <button
              onClick={clearSelection}
              disabled={locked || isResolving}
              className="theme-secondary-button min-h-[44px] rounded-xl px-3 py-2 text-sm font-medium transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              {t.clear}
            </button>

            <button
              disabled={!canNext}
              onClick={() => onDone(correctCount)}
              className="theme-primary-button min-h-[44px] rounded-xl px-3 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4"
            >
              {t.next}
            </button>
          </div>
        </div>
      </div>

      <div
        className={[
          "space-y-2.5 sm:space-y-3",
          shakeWrong ? "animate-[shake_0.2s_linear_0s_2]" : "",
        ].join(" ")}
      >
        {rows.map((row, index) => (
          <div key={`${row.sk}-${row.tr}-${index}`} className="grid grid-cols-2 gap-2.5 sm:gap-3">
            <button
              disabled={locked || matchedLeft.has(row.sk) || isResolving}
              onClick={() => {
                if (locked || isResolving) return;
                setSelectedLeft(row.sk);
              }}
              className={leftBtnClass(row.sk)}
            >
              {row.sk}
            </button>

            <button
              disabled={locked || matchedRight.has(row.tr) || isResolving}
              onClick={() => {
                if (locked || isResolving) return;
                setSelectedRight(row.tr);
              }}
              className={rightBtnClass(row.tr)}
            >
              {row.tr}
            </button>
          </div>
        ))}
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