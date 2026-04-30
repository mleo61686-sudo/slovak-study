/**
 * QuizCard – універсальна картка міні-тесту у Flunio.
 *
 * Що робить:
 * Показує питання з варіантами відповіді, перевіряє правильність,
 * підсвічує результат, може програвати аудіо через SpeakButton
 * і викликає onPassed після правильної відповіді.
 *
 * Пов’язані файли:
 * - SpeakButton.tsx
 * - grammar / learning / practice сторінки, де є міні-квізи
 * - компоненти уроків, які передають title/question/options/answer
 */

"use client";

import { useState } from "react";
import SpeakButton from "./SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  title: string;
  question: string;
  speakText?: string;
  options: readonly string[];
  answer: string;
  explanation?: string;
  onPassed?: () => void;
};

const UI = {
  ua: {
    correct: "✅ Правильно!",
    wrong: "❌ Неправильно.",
    tryAgain: "Спробувати ще раз",
  },
  ru: {
    correct: "✅ Правильно!",
    wrong: "❌ Неправильно.",
    tryAgain: "Попробовать ещё раз",
  },
  en: {
    correct: "✅ Correct!",
    wrong: "❌ Incorrect.",
    tryAgain: "Try again",
  },
} as const;

export default function QuizCard({
  title,
  question,
  speakText,
  options,
  answer,
  explanation,
  onPassed,
}: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const { lang } = useLanguage();

  const t = UI[lang] ?? UI.ua;
  const isCorrect = selected === answer;
  const showResult = selected !== null;

  return (
    <div className="flunio-card space-y-4 rounded-3xl p-6 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {speakText ? <SpeakButton text={speakText} /> : null}
      </div>

      <p className="font-medium text-white/85">{question}</p>

      <div className="space-y-2">
        {options.map((opt, idx) => {
          const correct = showResult && opt === answer;
          const wrong = showResult && opt === selected && opt !== answer;

          return (
            <button
              key={`${opt}-${idx}`}
              type="button"
              disabled={showResult}
              onClick={() => {
                setSelected(opt);
                if (opt === answer) onPassed?.();
              }}
              className={[
                "w-full rounded-2xl border px-4 py-3 text-left font-medium transition",
                !showResult
                  ? "border-white/10 bg-white/5 text-white/80 hover:-translate-y-0.5 hover:border-cyan-400/40 hover:bg-white/10"
                  : "border-white/10 bg-white/5 text-white/70",
                correct
                  ? "border-emerald-400/50 bg-emerald-400/15 text-emerald-100 shadow-[0_0_18px_rgba(16,185,129,0.18)]"
                  : "",
                wrong
                  ? "border-red-400/50 bg-red-500/15 text-red-100 shadow-[0_0_18px_rgba(239,68,68,0.18)]"
                  : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showResult ? (
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <p
            className={
              isCorrect
                ? "font-semibold text-emerald-300"
                : "font-semibold text-red-300"
            }
          >
            {isCorrect ? t.correct : t.wrong}
          </p>

          {explanation ? (
            <p className="text-sm text-white/65">{explanation}</p>
          ) : null}

          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-2xl border border-cyan-400/45 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
          >
            {t.tryAgain}
          </button>
        </div>
      ) : null}
    </div>
  );
}