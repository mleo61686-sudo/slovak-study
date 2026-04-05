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
    <div className="space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        {speakText ? <SpeakButton text={speakText} /> : null}
      </div>

      <p className="font-medium">{question}</p>

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
                "w-full rounded-xl border px-4 py-2 text-left transition",
                !showResult ? "hover:bg-slate-50" : "",
                correct ? "border-green-400 bg-green-100" : "",
                wrong ? "border-red-400 bg-red-100" : "",
              ].join(" ")}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {showResult ? (
        <div className="space-y-2">
          <p className={isCorrect ? "text-green-700" : "text-red-700"}>
            {isCorrect ? t.correct : t.wrong}
          </p>
          {explanation ? (
            <p className="text-sm text-slate-600">{explanation}</p>
          ) : null}
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
          >
            {t.tryAgain}
          </button>
        </div>
      ) : null}
    </div>
  );
}