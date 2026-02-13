"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SpeakButton from "@/app/components/SpeakButton";
import { WORDS } from "@/app/data/words";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";
type Mode = "mcq" | "typing";

type SessionQuestionBase =
  | {
      id: string;
      mode: "mcq";
      sk: string; // правильне словацьке слово
      ua: string; // переклад UA
      ru: string; // переклад RU
      options: string[]; // варіанти (словацькі)
    }
  | {
      id: string;
      mode: "typing";
      sk: string; // правильне словацьке слово
      ua: string;
      ru: string;
    };

const UI = {
  ua: {
    title: "Тренування 🏋️",
    loading: "Завантаження…",
    notEnoughTitle: "Недостатньо слів для тренування.",
    notEnoughHint: "Додай хоча б 4 слова з перекладом для UA і RU.",
    wordsSrs: "🧠 Words (SRS)",
    resultTitle: "Результат 🏁",
    yourResult: "Твій результат",
    tryAgain: "Спробувати ще раз ↻",
    questionLabel: "Питання",
    mcqBadge: "Вибір відповіді",
    typingBadge: "Ввід слова",
    listen: "Слухати словацьке слово:",
    next: "Далі →",
    check: "Перевірити ✓",
    placeholder: "Введи словацьке слово...",
    correct: "Правильно!",
    wrongPrefix: "Неправильно. Правильна відповідь:",
  },
  ru: {
    title: "Тренировка 🏋️",
    loading: "Загрузка…",
    notEnoughTitle: "Недостаточно слов для тренировки.",
    notEnoughHint: "Добавь хотя бы 4 слова с переводом для UA и RU.",
    wordsSrs: "🧠 Words (SRS)",
    resultTitle: "Результат 🏁",
    yourResult: "Твой результат",
    tryAgain: "Попробовать ещё раз ↻",
    questionLabel: "Вопрос",
    mcqBadge: "Выбор ответа",
    typingBadge: "Ввод слова",
    listen: "Слушать словацкое слово:",
    next: "Далее →",
    check: "Проверить ✓",
    placeholder: "Введи словацкое слово...",
    correct: "Правильно!",
    wrongPrefix: "Неверно. Правильный ответ:",
  },
} as const;

function norm(s: string) {
  return s.trim().toLowerCase();
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], n: number) {
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

function getTrans(word: any, lang: Lang): string | null {
  const t = lang === "ua" ? word.ua : word.ru;
  return typeof t === "string" && t.trim() ? t : null;
}

function buildSessionBase(words: any[], count: number): SessionQuestionBase[] {
  const pool = words
    .map((w, idx) => ({
      ...w,
      __id: `${w.sk}-${idx}`,
      __ua: getTrans(w, "ua"),
      __ru: getTrans(w, "ru"),
    }))
    .filter((w) => w.sk && w.__ua && w.__ru);

  if (pool.length < 4) return [];

  const picked = sample(pool, count);

  return picked.map((w, i) => {
    const mode: Mode = i % 3 === 0 ? "typing" : "mcq";

    if (mode === "typing") {
      return {
        id: `${w.__id}-typing`,
        mode: "typing",
        sk: w.sk,
        ua: w.__ua!,
        ru: w.__ru!,
      };
    }

    const distractors = sample(
      pool.filter((x) => x.sk !== w.sk).map((x) => x.sk),
      3
    );

    const options = shuffle([w.sk, ...distractors]).slice(0, 4);

    return {
      id: `${w.__id}-mcq`,
      mode: "mcq",
      sk: w.sk,
      ua: w.__ua!,
      ru: w.__ru!,
      options,
    };
  });
}

function makePromptAndHelper(q: SessionQuestionBase, lang: Lang) {
  const tr = lang === "ua" ? q.ua : q.ru;

  const prompt =
    lang === "ua"
      ? `Як буде словацькою слово «${tr}»?`
      : `Как будет по-словацки слово «${tr}»?`;

  const helper =
    lang === "ua"
      ? `Словацькою: ${q.sk} — «${tr}»`
      : `По-словацки: ${q.sk} — «${tr}»`;

  return { prompt, helper };
}

export default function PracticePage() {
  const { lang } = useLanguage();
  const uiLang: Lang = (lang === "ru" ? "ru" : "ua") as Lang;
  const t = UI[uiLang];

  const QUESTION_COUNT = 12;

  // ✅ генеруємо тільки на клієнті (після mount)
  const [session, setSession] = useState<SessionQuestionBase[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(buildSessionBase(WORDS as any[], QUESTION_COUNT));
    setReady(true);
  }, []);

  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);

  // MCQ
  const [selected, setSelected] = useState<string | null>(null);

  // typing
  const [typed, setTyped] = useState("");
  const [typedChecked, setTypedChecked] = useState<null | { ok: boolean }>(null);

  // ✅ при зміні мови — скидаємо вибір/ввід
  useEffect(() => {
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
  }, [uiLang]);

  // ---- РЕНДЕРИ ----

  if (!ready) {
    return (
      <main className="mx-auto max-w-3xl p-4">
        <div className="rounded-2xl border bg-white p-6">{t.loading}</div>
      </main>
    );
  }

  if (session.length < 4) {
    return (
      <main className="mx-auto max-w-3xl p-4 space-y-6">
        <h1 className="text-2xl font-semibold">{t.title}</h1>
        <div className="rounded-2xl border bg-white p-6 space-y-3">
          <p className="font-medium">{t.notEnoughTitle}</p>
          <p className="text-sm text-gray-600">{t.notEnoughHint}</p>
        </div>
      </main>
    );
  }

  const finished = current >= session.length;
  const qBase = session[Math.min(current, session.length - 1)];

  if (!qBase) return null;

  // ✅ БЕЗ useMemo — щоб не ламався порядок хуків
  const { prompt, helper } = makePromptAndHelper(qBase, uiLang);

  function goNext() {
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
    setCurrent((c) => c + 1);
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setTyped("");
    setTypedChecked(null);
  }

  function checkMcq(option: string) {
    if (qBase.mode !== "mcq") return;
    setSelected(option);
    if (option === qBase.sk) setScore((s) => s + 1);
  }

  function checkTyping() {
    if (qBase.mode !== "typing") return;
    const ok = norm(typed) === norm(qBase.sk);
    setTypedChecked({ ok });
    if (ok) setScore((s) => s + 1);
  }

  return (
    <main className="mx-auto max-w-3xl p-4 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t.title}</h1>

        <div className="flex gap-2">
          <Link
            href="/practice/words"
            className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
          >
            {t.wordsSrs}
          </Link>
        </div>
      </div>

      {finished ? (
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <h2 className="text-xl font-semibold">{t.resultTitle}</h2>
          <p>
            {t.yourResult}: <b>{score}</b> / {session.length}
          </p>

          <button
            onClick={restart}
            className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
          >
            {t.tryAgain}
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-6 space-y-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              {t.questionLabel} {current + 1} / {session.length}
            </div>

            <div className="rounded-full border px-3 py-1">
              {qBase.mode === "mcq" ? t.mcqBadge : t.typingBadge}
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-medium text-lg">{prompt}</p>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>{t.listen}</span>
              <SpeakButton text={qBase.sk} lang="sk-SK" />
            </div>
          </div>

          {qBase.mode === "mcq" ? (
            <>
              <div className="space-y-2">
                {qBase.options.map((option) => {
                  const isCorrect = selected && option === qBase.sk;
                  const isWrong = selected === option && option !== qBase.sk;

                  return (
                    <button
                      key={option}
                      onClick={() => checkMcq(option)}
                      disabled={!!selected}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition flex items-center justify-between
${isCorrect ? "bg-green-100 border-green-400" : ""}
${isWrong ? "bg-red-100 border-red-400" : ""}
${!selected ? "hover:bg-slate-50" : "opacity-95"}
`}
                    >
                      <span className="font-medium">{option}</span>

                      <SpeakButton
                        text={option}
                        lang="sk-SK"
                        asChild
                        label="🔊"
                        className="rounded-lg border bg-white px-2 py-1 text-xs hover:bg-slate-50"
                      />
                    </button>
                  );
                })}
              </div>

              {selected && (
                <div className="space-y-3">
                  <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-gray-700">
                    {helper}
                  </div>
                  <button
                    onClick={goNext}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
                  >
                    {t.next}
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="space-y-2">
                <input
                  value={typed}
                  onChange={(e) => setTyped(e.target.value)}
                  placeholder={t.placeholder}
                  className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-slate-200"
                  disabled={!!typedChecked}
                />

                {!typedChecked ? (
                  <button
                    onClick={checkTyping}
                    disabled={!typed.trim()}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90 disabled:opacity-40"
                  >
                    {t.check}
                  </button>
                ) : (
                  <div className="space-y-3">
                    <div
                      className={`rounded-xl border px-4 py-3 text-sm ${
                        typedChecked.ok
                          ? "bg-green-100 border-green-400"
                          : "bg-red-100 border-red-400"
                      }`}
                    >
                      {typedChecked.ok
                        ? t.correct
                        : `${t.wrongPrefix} ${qBase.sk}`}
                    </div>

                    <div className="rounded-xl border bg-slate-50 px-4 py-3 text-sm text-gray-700">
                      {helper}
                    </div>

                    <button
                      onClick={goNext}
                      className="rounded-xl bg-slate-900 px-4 py-2 text-white hover:opacity-90"
                    >
                      {t.next}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </main>
  );
}