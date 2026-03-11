"use client";

import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {
  PRONOUNS,
  UI,
  VERBS_CS,
  VERBS_SK,
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

export default function VerbsPresentClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const ui = UI[lang === "ru" ? "ru" : "ua"];
  const isCzech = courseId === "cs";
  const verbs = isCzech ? VERBS_CS : VERBS_SK;

  const [activeVerbId, setActiveVerbId] = useState(verbs[0].id);
  const active = useMemo(
    () => verbs.find((v) => v.id === activeVerbId) ?? verbs[0],
    [activeVerbId, verbs]
  );

  const [mounted, setMounted] = useState(false);
  const [quiz, setQuiz] = useState<{ person: PersonKey; correct: string; options: string[] }[]>([]);
  const [sentenceParts, setSentenceParts] = useState<string[]>([]);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [build, setBuild] = useState<string[]>([]);
  const [exIndex, setExIndex] = useState(0);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setActiveVerbId(verbs[0].id);
  }, [courseId, verbs]);

  const examplesForSection4 = useMemo(
    () => genExamplesFromRows(active, isCzech),
    [active, isCzech]
  );

  useEffect(() => {
    if (!mounted) return;

    setQuiz(makeQuiz(active));

    setExIndex(0);
    const ex = examplesForSection4[0]?.sk ?? (isCzech ? "Já pracuji." : "Ja pracujem.");
    setSentenceParts(makeSentenceParts(ex));

    setAnswers({});
    setChecked({});
    setBuild([]);
  }, [mounted, active, examplesForSection4, isCzech]);

  const correctCount = useMemo(() => {
    let c = 0;
    for (const q of quiz) {
      if (answers[q.person] && answers[q.person] === q.correct) c++;
    }
    return c;
  }, [answers, quiz]);

  const builtSentence = build.join(" ");
  const currentEx = examplesForSection4[exIndex] ?? examplesForSection4[0];

  const targetSk = (currentEx?.sk ?? (isCzech ? "Já pracuji." : "Ja pracujem.")).replace(/[.!?]$/, "");
  const targetUa = (currentEx?.ua ?? "Я працюю.").replace(/[.!?]$/, "");

  if (!mounted) return <div className="space-y-10">{ui.loading}</div>;

  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {isCzech ? ui.titleCs : ui.titleSk}
        </h1>
        <p className="text-slate-700">
          {isCzech ? ui.subtitleCs : ui.subtitleSk}
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s1}</h2>
        <div className="rounded-2xl border bg-white">
          {(Object.keys(PRONOUNS) as PersonKey[]).map((k, i) => (
            <div key={i} className="flex justify-between border-b px-5 py-3 last:border-b-0">
              <span className="font-medium">{PRONOUNS[k].sk}</span>
              <span className="text-slate-600">{trWord(PRONOUNS[k], lang)}</span>
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
                  onClick={() => setActiveVerbId(v.id)}
                  className={[
                    "rounded-xl border px-3 py-2 text-sm",
                    activeTab ? "border-slate-900 bg-slate-900 text-white" : "hover:bg-slate-50",
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
              <div className="text-lg font-semibold">{active.infinitive}</div>
              <div className="mt-1 text-slate-600">{trWord(active.meaning, lang)}</div>
            </div>

            <div className="rounded-xl border p-4">
              <div className="text-sm text-slate-500">{ui.hint}</div>
              <div className="text-slate-700">
                {active.note ? trWord(active.note, lang) : "—"}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{ui.s3}</h2>
        <div className="rounded-2xl border bg-white">
          {active.rows.map((row, i) => (
            <div key={i} className="flex items-center justify-between border-b px-5 py-3 last:border-b-0">
              <div className="min-w-0">
                <div className="font-medium">
                  <span className="text-slate-900">{capFirst(row.full)}</span>
                </div>
                <div className="text-sm text-slate-500">{trWord(row.tr, lang)}</div>
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
            const neg = negateSentence(ex.sk, isCzech);
            const q = makeQuestion(ex.sk);

            return (
              <div key={i} className="space-y-2 border-b px-5 py-4 last:border-b-0">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium">{ex.sk}</div>
                    <div className="text-sm text-slate-500">{trWord(ex, lang)}</div>
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
                <span className="font-medium text-slate-900">{correctCount}</span> / {quiz.length}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setAnswers({});
                setChecked({});
                setQuiz(makeQuiz(active));
              }}
              className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
            >
              {ui.reset}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((q) => (
              <div key={q.person} className="space-y-2 rounded-xl border p-4">
                <div className="text-sm text-slate-500">{capFirst(PRONOUNS[q.person].sk)} + …</div>

                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => {
                    const picked = answers[q.person] === opt;
                    const isCorrect = answers[q.person] === q.correct;
                    const show = checked[q.person];

                    return (
                      <button
                        key={opt}
                        onClick={() => {
                          setAnswers((a) => ({ ...a, [q.person]: opt }));
                          setChecked((c) => ({ ...c, [q.person]: true }));
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

                {checked[q.person] && (
                  <div className="mt-1 text-xs">
                    {answers[q.person] === q.correct ? (
                      <span className="font-medium text-emerald-600">{ui.correctYes}</span>
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
                {ui.target}: <span className="font-medium text-slate-900">{targetUa}</span>
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
                onClick={() => {
                  const len = examplesForSection4.length || 1;
                  const next = (exIndex + 1) % len;

                  setExIndex(next);
                  setBuild([]);

                  const sk =
                    examplesForSection4[next]?.sk ??
                    examplesForSection4[0]?.sk ??
                    (isCzech ? "Já pracuji." : "Ja pracujem.");
                  setSentenceParts(makeSentenceParts(sk));
                }}
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
              {builtSentence ? <SpeakButton text={builtSentence + "."} kind="phrase" /> : null}
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
                key={idx}
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
            {(isCzech ? ui.cheatItemsCs : ui.cheatItemsSk).map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}