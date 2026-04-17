"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {
  PRONOUNS_BY_COURSE,
  UI,
  VERBS_CS,
  VERBS_PL,
  VERBS_SK,
  type GrammarCourseId,
  type PersonKey,
} from "./verbs-present-data";
import {
  capFirst,
  genExamplesFromRows,
  makeQuestion,
  makeQuiz,
  makeSentenceParts,
  negateSentence,
} from "./verbs-present-helpers";

const SpeakButton = dynamic(() => import("@/app/components/SpeakButton"), {
  ssr: false,
  loading: () => null,
});

type QuizItem = {
  person: PersonKey;
  correct: string;
  options: string[];
};

type UiLang = "ua" | "ru" | "en";

const FALLBACK_BY_COURSE: Record<GrammarCourseId, string> = {
  sk: "Ja pracujem.",
  cs: "Já pracuji.",
  pl: "Ja pracuję.",
};

export default function VerbsPresentClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const uiLang: UiLang = lang === "ru" || lang === "en" ? lang : "ua";
  const ui = UI[uiLang];

  const grammarCourseId: GrammarCourseId =
    courseId === "cs" || courseId === "pl" ? courseId : "sk";

  const verbs =
    grammarCourseId === "cs"
      ? VERBS_CS
      : grammarCourseId === "pl"
        ? VERBS_PL
        : VERBS_SK;

  const pronouns = PRONOUNS_BY_COURSE[grammarCourseId];

  const [activeVerbId, setActiveVerbId] = useState(verbs[0]?.id ?? "");
  const [quizVersion, setQuizVersion] = useState(0);
  const [sentenceVersion, setSentenceVersion] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [build, setBuild] = useState<string[]>([]);
  const [exIndex, setExIndex] = useState(0);

  useEffect(() => {
    setActiveVerbId(verbs[0]?.id ?? "");
  }, [grammarCourseId, verbs]);

  const active =
    useMemo(
      () => verbs.find((v) => v.id === activeVerbId) ?? verbs[0],
      [activeVerbId, verbs]
    ) ?? verbs[0];

  const pronounKeys = useMemo(() => Object.keys(pronouns) as PersonKey[], [pronouns]);

  const examplesForSection4 = useMemo(
    () => (active ? genExamplesFromRows(active, grammarCourseId) : []),
    [active, grammarCourseId]
  );

  useEffect(() => {
    setQuizVersion((v) => v + 1);
    setSentenceVersion((v) => v + 1);
    setExIndex(0);
    setAnswers({});
    setChecked({});
    setBuild([]);
  }, [active?.id, grammarCourseId]);

  const quiz: QuizItem[] = useMemo(() => {
    if (!active) return [];
    return makeQuiz(active);
  }, [active, quizVersion]);

  const currentEx =
    examplesForSection4[exIndex] ??
    examplesForSection4[0] ?? {
      sk: FALLBACK_BY_COURSE[grammarCourseId],
      ua: "Я працюю.",
      ru: "Я работаю.",
      en: "I work.",
    };

  const sentenceSource = currentEx.sk || FALLBACK_BY_COURSE[grammarCourseId];

  const sentenceParts = useMemo(
    () => makeSentenceParts(sentenceSource),
    [sentenceSource, sentenceVersion]
  );

  const correctCount = useMemo(() => {
    let c = 0;
    for (const q of quiz) {
      if (answers[q.person] && answers[q.person] === q.correct) c++;
    }
    return c;
  }, [answers, quiz]);

  const builtSentence = build.join(" ");
  const targetSk = sentenceSource.replace(/[.!?]$/, "");
  const targetTr = trWord(currentEx, uiLang).replace(/[.!?]$/, "");

  const handleResetQuiz = () => {
    setAnswers({});
    setChecked({});
    setQuizVersion((v) => v + 1);
  };

  const handleNextSentence = () => {
    const len = examplesForSection4.length || 1;
    const next = (exIndex + 1) % len;
    setExIndex(next);
    setBuild([]);
    setSentenceVersion((v) => v + 1);
  };

  const cheatItems =
    grammarCourseId === "cs"
      ? ui.cheatItemsCs
      : grammarCourseId === "pl"
        ? ui.cheatItemsPl
        : ui.cheatItemsSk;

  const title =
    grammarCourseId === "cs"
      ? ui.titleCs
      : grammarCourseId === "pl"
        ? ui.titlePl
        : ui.titleSk;

  const subtitle =
    grammarCourseId === "cs"
      ? ui.subtitleCs
      : grammarCourseId === "pl"
        ? ui.subtitlePl
        : ui.subtitleSk;

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-slate-700">{subtitle}</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s1}</h2>
        <div className="rounded-2xl border bg-white">
          {pronounKeys.map((k) => (
            <div
              key={k}
              className="flex justify-between border-b px-5 py-3 last:border-b-0"
            >
              <span className="font-medium">{pronouns[k].sk}</span>
              <span className="text-slate-600">{trWord(pronouns[k], uiLang)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s2}</h2>

        <div className="rounded-2xl border bg-white p-3">
          <div className="flex flex-wrap gap-2">
            {verbs.map((v) => {
              const activeTab = v.id === activeVerbId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setActiveVerbId(v.id)}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm",
                    activeTab
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  {v.infinitive}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">{ui.infinitive}</div>
              <div className="text-lg font-semibold">{active?.infinitive}</div>
              <div className="mt-1 text-slate-600">
                {active ? trWord(active.meaning, uiLang) : "—"}
              </div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">{ui.hint}</div>
              <div className="text-slate-700">
                {active?.note ? trWord(active.note, uiLang) : "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s3}</h2>
        <div className="rounded-2xl border bg-white">
          {active?.rows.map((row) => (
            <div
              key={row.person}
              className="flex items-center justify-between border-b px-5 py-3 last:border-b-0"
            >
              <div className="min-w-0">
                <div className="font-medium">
                  <span className="text-slate-900">{capFirst(row.full)}</span>
                </div>
                <div className="text-sm text-slate-500">{trWord(row.tr, uiLang)}</div>
              </div>
              <SpeakButton text={row.full} kind="phrase" />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s4}</h2>

        <div className="rounded-2xl border bg-white">
          {examplesForSection4.map((ex, i) => {
            const neg = negateSentence(ex.sk, grammarCourseId);
            const q = makeQuestion(ex.sk);

            return (
              <div
                key={`${active?.id ?? "verb"}-${i}`}
                className="space-y-2 border-b px-5 py-4 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium">{ex.sk}</div>
                    <div className="text-sm text-slate-500">{trWord(ex, uiLang)}</div>
                  </div>
                  <SpeakButton text={ex.sk} kind="phrase" />
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border px-4 py-3">
                    <div className="mb-1 text-xs text-slate-500">{ui.negation}</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium">{neg}</div>
                      <SpeakButton text={neg} kind="phrase" />
                    </div>
                  </div>

                  <div className="rounded-xl border px-4 py-3">
                    <div className="mb-1 text-xs text-slate-500">{ui.question}</div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium">{q}</div>
                      <SpeakButton text={q} kind="phrase" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s5}</h2>

        <div className="space-y-4 rounded-2xl border bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">{ui.quizA}</div>
              <div className="text-sm text-slate-500">
                {ui.score}:{" "}
                <span className="font-medium text-slate-900">{correctCount}</span> /{" "}
                {quiz.length}
              </div>
            </div>
            <button
              type="button"
              onClick={handleResetQuiz}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              {ui.reset}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((q) => (
              <div key={q.person} className="space-y-2 rounded-xl border p-4">
                <div className="text-sm text-slate-500">
                  {capFirst(pronouns[q.person].sk)} + …
                </div>

                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const picked = answers[q.person] === opt;
                    const isCorrect = answers[q.person] === q.correct;
                    const show = checked[q.person];

                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [q.person]: opt }));
                          setChecked((c) => ({ ...c, [q.person]: true }));
                        }}
                        className={[
                          "rounded-xl border px-3 py-2 text-sm",
                          picked
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "hover:bg-slate-50",
                          show && opt === q.correct ? "ring-2 ring-emerald-400" : "",
                          show && picked && !isCorrect ? "ring-2 ring-rose-400" : "",
                        ].join(" ")}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {checked[q.person] && (
                  <div className="mt-1 text-xs">
                    {answers[q.person] === q.correct ? (
                      <span className="font-medium text-emerald-600">
                        {ui.correctYes}
                      </span>
                    ) : (
                      <span className="text-rose-600">
                        {ui.correctNo} {ui.correctForm}:{" "}
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
              <div className="font-semibold">{ui.quizB}</div>
              <div className="text-sm text-slate-500">
                {ui.target}: <span className="font-medium text-slate-900">{targetTr}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setBuild([])}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {ui.clear}
              </button>

              <button
                type="button"
                onClick={handleNextSentence}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {ui.next}
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="mb-2 text-sm text-slate-500">{ui.yourSentence}</div>
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{builtSentence || "—"}</div>
              {builtSentence ? (
                <SpeakButton text={builtSentence + "."} kind="phrase" />
              ) : null}
            </div>

            <div className="mt-3 text-sm">
              {builtSentence === targetSk ? (
                <span className="font-medium text-emerald-600">{ui.correct}</span>
              ) : builtSentence.length > 0 ? (
                <span className="text-slate-500">{ui.wrongHint}</span>
              ) : (
                <span className="text-slate-500">{ui.clickWords}</span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sentenceParts.map((w, idx) => (
              <button
                key={`${w}-${idx}`}
                type="button"
                onClick={() => setBuild((b) => [...b, w])}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{ui.s6}</h2>
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          <ul className="list-disc space-y-2 pl-5">
            {cheatItems.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}