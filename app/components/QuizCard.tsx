"use client";

import { useState } from "react";
import SpeakButton from "./SpeakButton";

type Props = {
    title: string;
    question: string;
    speakText?: string;
    options: readonly string[];
    answer: string;
    explanation?: string;
    onPassed?: () => void;
    progressKey?: string;
};

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

    const isCorrect = selected === answer;
    const showResult = selected !== null;

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">{title}</h2>
                {speakText ? <SpeakButton text={speakText} /> : null}
            </div>

            <p className="font-medium">{question}</p>

            <div className="space-y-2">
                {options.map((opt) => {
                    const correct = showResult && opt === answer;
                    const wrong = showResult && opt === selected && opt !== answer;

                    return (
                        <button
                            key={opt}
                            type="button"
                            disabled={showResult}
                            onClick={() => {
                                setSelected(opt);
                                if (opt === answer) onPassed?.();
                            }}
                            className={[
                                "w-full rounded-xl border px-4 py-2 text-left transition",
                                !showResult ? "hover:bg-slate-50" : "",
                                correct ? "bg-green-100 border-green-400" : "",
                                wrong ? "bg-red-100 border-red-400" : "",
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
                        {isCorrect ? "✅ Правильно!" : "❌ Неправильно."}
                    </p>
                    {explanation ? (
                        <p className="text-sm text-slate-600">{explanation}</p>
                    ) : null}
                    <button
                        type="button"
                        onClick={() => setSelected(null)}
                        className="rounded-xl border px-4 py-2 text-sm font-semibold hover:bg-slate-50"
                    >
                        Спробувати ще раз
                    </button>
                </div>
            ) : null}
        </div>
    );
}