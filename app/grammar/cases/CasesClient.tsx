"use client";

import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {
  BUILD_SAMPLES_CS,
  BUILD_SAMPLES_SK,
  CASES_CS,
  CASES_SK,
} from "./cases-data";
import {
  makeCaseQuiz,
  makeSentenceParts,
  shuffle,
  type QuizQ,
  type SentencePart,
} from "./cases-helpers";

export default function CasesClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);
  const isCzech = courseId === "cs";
  const cases = isCzech ? CASES_CS : CASES_SK;
  const buildSamples = isCzech ? BUILD_SAMPLES_CS : BUILD_SAMPLES_SK;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [quiz, setQuiz] = useState<QuizQ[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const [exIndex, setExIndex] = useState(0);
  const current = buildSamples[exIndex] ?? buildSamples[0];

  const [sentenceParts, setSentenceParts] = useState<SentencePart[]>([]);
  const [build, setBuild] = useState<SentencePart[]>([]);

  useEffect(() => {
    if (!mounted) return;

    setQuiz(makeCaseQuiz(cases, lang));
    setAnswers({});
    setChecked({});

    setExIndex(0);
    setBuild([]);
    setSentenceParts(makeSentenceParts(buildSamples[0].sk));
  }, [mounted, lang, cases, buildSamples]);

  const correctCount = useMemo(() => {
    let count = 0;
    for (const q of quiz) {
      if (answers[q.caseId] && answers[q.caseId] === q.correct) count++;
    }
    return count;
  }, [answers, quiz]);

  const builtSentence = build.map((part) => part.text).join(" ");
  const targetSk = (current?.sk ?? "").replace(/[.!?]$/, "");
  const targetTr = trWord(current, lang).replace(/[.!?]$/, "");

  const resetBuilder = (example: string) => {
    setBuild([]);
    setSentenceParts(makeSentenceParts(example));
  };

  if (!mounted) {
    return <div className="space-y-10">Loading…</div>;
  }

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {isCzech
            ? t("Відмінки (7 падежів у чеській)", "Падежи (7 падежей в чешском)")
            : t("Відмінки (6 падежів)", "Падежи (6 падежей)")}
        </h1>

        <p className="text-slate-700">
          {isCzech
            ? t(
                "У чеській 7 відмінків. Вони відповідають на питання (Kdo? Co? / Koho? Čeho? …) і змінюють закінчення слів.",
                "В чешском 7 падежей. Они отвечают на вопросы (Kdo? Co? / Koho? Čeho? …) и меняют окончания слов."
              )
            : t(
                "У словацькій 6 відмінків. Вони відповідають на питання (Kto? Čo? / Koho? Čoho? …) і змінюють закінчення слів.",
                "В словацком 6 падежей. Они отвечают на вопросы (Kto? Čo? / Koho? Čoho? …) и меняют окончания слов."
              )}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("1) Швидка таблиця", "1) Быстрая таблица")}</h2>

        <div className="rounded-2xl border bg-white">
          {cases.map((c) => (
            <div key={c.id} className="space-y-2 border-b px-5 py-4 last:border-b-0">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">
                    {c.name.sk} — {t(c.name.ua, c.name.ru ?? c.name.ua)}
                  </div>

                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{c.questions.sk}</span>{" "}
                    <span className="text-slate-500">
                      ({t(c.questions.ua, c.questions.ru ?? c.questions.ua)})
                    </span>
                  </div>
                </div>

                <SpeakButton text={c.questions.sk} kind="phrase" />
              </div>

              <div className="text-sm text-slate-700">{t(c.use.ua, c.use.ru ?? c.use.ua)}</div>
              <div className="text-sm text-slate-500">{t(c.rule.ua, c.rule.ru ?? c.rule.ua)}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("2) Приклади (звучання)", "2) Примеры (озвучка)")}</h2>

        <div className="rounded-2xl border bg-white">
          {cases.map((c) => (
            <div key={c.id} className="space-y-3 border-b px-5 py-4 last:border-b-0">
              <div className="font-semibold">
                {c.name.sk} — {t(c.name.ua, c.name.ru ?? c.name.ua)}
              </div>

              <div className="grid gap-2">
                {c.examples.map((ex, i) => (
                  <div
                    key={`${c.id}-${i}`}
                    className="flex items-center justify-between gap-3 rounded-xl border px-4 py-3"
                  >
                    <div className="min-w-0">
                      <div className="font-medium">{ex.sk}</div>
                      <div className="text-sm text-slate-500">{trWord(ex, lang)}</div>
                    </div>

                    <SpeakButton text={ex.sk} kind="phrase" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("3) Практика 🧠", "3) Практика 🧠")}</h2>

        <div className="space-y-4 rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">
                {t("A) Вибери правильний приклад", "A) Выбери правильный пример")}
              </div>
              <div className="text-sm text-slate-500">
                {t("Рахунок:", "Счет:")}{" "}
                <span className="font-medium text-slate-900">{correctCount}</span> / {quiz.length}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuiz(makeCaseQuiz(cases, lang));
                setAnswers({});
                setChecked({});
              }}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              {t("Скинути", "Сбросить")}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((q) => (
              <div key={q.caseId} className="space-y-2 rounded-xl border p-4">
                <div className="text-sm text-slate-500">
                  {lang === "ru" ? q.prompt.ru : q.prompt.ua}
                </div>

                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const picked = answers[q.caseId] === opt;
                    const isCorrect = answers[q.caseId] === q.correct;
                    const show = checked[q.caseId];

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [q.caseId]: opt }));
                          setChecked((c) => ({ ...c, [q.caseId]: true }));
                        }}
                        className={[
                          "rounded-xl border px-3 py-2 text-sm",
                          picked ? "border-slate-900 bg-slate-900 text-white" : "hover:bg-slate-50",
                          show && opt === q.correct ? "ring-2 ring-emerald-400" : "",
                          show && picked && !isCorrect ? "ring-2 ring-rose-400" : "",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {checked[q.caseId] && (
                  <div className="mt-1 text-xs">
                    {answers[q.caseId] === q.correct ? (
                      <span className="font-medium text-emerald-600">
                        {t("✅ Правильно", "✅ Правильно")}
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        {t("❌ Неправильно. Правильно:", "❌ Неправильно. Правильно:")}{" "}
                        <span className="font-medium">{q.correct}</span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">{t("B) Збери речення", "B) Собери предложение")}</div>
              <div className="text-sm text-slate-500">
                {t("Ціль:", "Цель:")} <span className="font-medium text-slate-900">{targetTr}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resetBuilder(current.sk)}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {t("Очистити", "Очистить")}
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = (exIndex + 1) % buildSamples.length;
                  setExIndex(next);
                  resetBuilder(buildSamples[next].sk);
                }}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {t("Наступне", "Следующее")}
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-2 text-sm text-slate-500">
              {t("Твоє речення:", "Твое предложение:")}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{builtSentence || "—"}</div>
              {builtSentence ? <SpeakButton text={`${builtSentence}.`} kind="phrase" /> : null}
            </div>

            <div className="mt-3 text-sm">
              {builtSentence === targetSk ? (
                <span className="font-medium text-emerald-600">
                  {t("✅ Правильно!", "✅ Правильно!")}
                </span>
              ) : builtSentence.length > 0 ? (
                <span className="text-slate-500">{t("Порівняй із ціллю 👆", "Сравни с целью 👆")}</span>
              ) : (
                <span className="text-slate-500">{t("Натискай слова нижче.", "Нажимай слова ниже.")}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sentenceParts.map((part) => (
              <button
                key={part.id}
                onClick={() => {
                  setBuild((prev) => [...prev, part]);
                  setSentenceParts((prev) => prev.filter((p) => p.id !== part.id));
                }}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {part.text}
              </button>
            ))}
          </div>

          {build.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  const last = build[build.length - 1];
                  if (!last) return;

                  setBuild((prev) => prev.slice(0, -1));
                  setSentenceParts((prev) => shuffle([...prev, last]));
                }}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {t("← Забрати останнє слово", "← Убрать последнее слово")}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("4) Шпаргалка", "4) Шпаргалка")}</h2>

        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          <ul className="list-disc space-y-2 pl-5">
            {!isCzech ? (
              <>
                <li>
                  {t(
                    "Lokál завжди з прийменником: v/vo, na, o, po.",
                    "Lokál всегда с предлогом: v/vo, na, o, po."
                  )}
                </li>
                <li>
                  {t(
                    "Genitív часто після bez, do, z/zo: bez vody, do práce, z domu.",
                    "Genitív часто после bez, do, z/zo: bez vody, do práce, z domu."
                  )}
                </li>
                <li>
                  {t(
                    "Inštrumentál часто з s/so: s kamarátom, so sestrou.",
                    "Inštrumentál часто с s/so: s kamarátom, so sestrou."
                  )}
                </li>
              </>
            ) : (
              <>
                <li>
                  {t(
                    "Lokál у чеській завжди з прийменником: v/ve, na, o, po.",
                    "Lokál в чешском всегда с предлогом: v/ve, na, o, po."
                  )}
                </li>
                <li>
                  {t(
                    "Genitiv часто після bez, do, z/ze: bez vody, do práce, z domu.",
                    "Genitiv часто после bez, do, z/ze: bez vody, do práce, z domu."
                  )}
                </li>
                <li>
                  {t(
                    "Instrumentál часто з s/se: s kamarádem, se sestrou.",
                    "Instrumentál часто с s/se: s kamarádem, se sestrou."
                  )}
                </li>
                <li>
                  {t(
                    "Vokativ використовується для звертання: Petře!, pane!, Jano!",
                    "Vokativ используется для обращения: Petře!, pane!, Jano!"
                  )}
                </li>
              </>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}