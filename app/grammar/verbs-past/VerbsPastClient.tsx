"use client";

import { useMemo, useState } from "react";
import type { Lang } from "@/lib/src/language";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import { UI, getBadgeLabel } from "./verbs-past-ui";
import {
  COURSE_INFO,
  DATA,
  normalizeCourse,
  tr,
} from "./verbs-past-data";

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const ghostButton =
  "theme-secondary-button rounded-xl px-3 py-2 text-sm font-semibold";

const activeButton =
  "theme-primary-button rounded-xl px-3 py-2 text-sm font-semibold";

const infoItem =
  "theme-home-soft-card rounded-2xl px-4 py-3 theme-text-muted";

export default function VerbsPastClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const uiLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
  const ui = UI[uiLang];

  const grammarCourseId = normalizeCourse(courseId);
  const verbs = DATA[grammarCourseId];
  const courseInfo = COURSE_INFO[grammarCourseId][uiLang];

  const [activeId, setActiveId] = useState(verbs[0].id);
  const [practiceIndex, setPracticeIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const active = useMemo(
    () => verbs.find((v) => v.id === activeId) ?? verbs[0],
    [activeId, verbs]
  );

  const allPracticeRows = useMemo(
    () =>
      verbs.flatMap((v) =>
        v.rows.map((row) => ({ ...row, verb: v.infinitive }))
      ),
    [verbs]
  );

  const currentPractice = allPracticeRows[practiceIndex] ?? allPracticeRows[0];

  function nextPractice() {
    setShowAnswer(false);
    setPracticeIndex((i) => (i + 1) % allPracticeRows.length);
  }

  return (
    <div className="space-y-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <div className="theme-pill mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            {getBadgeLabel(uiLang)}
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight theme-text sm:text-4xl">
            {ui.title}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed theme-text-muted">
            {ui.subtitle}
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">{ui.s1}</h2>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className={`${card} p-5`}>
            <div className="font-semibold theme-text">{ui.pattern}</div>

            <div className="mt-4 grid gap-3">
              {courseInfo.formulaItems.map((item) => (
                <div key={item} className={infoItem}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`${card} p-5`}>
            <div className="font-semibold theme-text">{ui.noteTitle}</div>

            <ul className="mt-4 space-y-2">
              {courseInfo.noteItems.slice(0, 3).map((item) => (
                <li key={item} className={infoItem}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">{ui.s2}</h2>

        <div className={`${card} p-5`}>
          <div className="text-sm font-semibold theme-text-muted">
            {ui.chooseVerb}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {verbs.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => {
                  setActiveId(v.id);
                  setShowAnswer(false);
                }}
                className={active.id === v.id ? activeButton : ghostButton}
              >
                {v.infinitive}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className={`${softCard} p-4`}>
              <div className="text-sm theme-text-muted">{ui.infinitive}</div>
              <div className="text-lg font-semibold theme-accent-text">
                {active.infinitive}
              </div>
              <div className="mt-1 theme-text-muted">
                {tr(active.meaning, uiLang)}
              </div>
            </div>

            <div className={`${softCard} p-4`}>
              <div className="text-sm theme-text-muted">{ui.rule}</div>
              <div className="text-lg font-semibold theme-accent-text">
                {active.rule.sk}
              </div>
              <div className="mt-1 theme-text-muted">
                {tr(active.rule, uiLang)}
              </div>
            </div>

            <div className={`${softCard} p-4`}>
              <div className="text-sm theme-text-muted">{ui.pattern}</div>
              <div className="font-semibold theme-accent-text">
                {active.pattern.sk}
              </div>
              <div className="mt-1 theme-text-muted">
                {tr(active.pattern, uiLang)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">{ui.s3}</h2>
        <p className="theme-text-muted">{ui.examplesHint}</p>

        <div className="grid gap-4 md:grid-cols-3">
          {active.rows.map((row) => (
            <div key={row.form} className={`${card} p-5`}>
              <div className="text-2xl">{row.emoji}</div>
              <div className="mt-2 text-sm theme-text-muted">
                {tr(row.label, uiLang)}
              </div>
              <div className="mt-1 text-lg font-semibold theme-accent-text">
                {row.form}
              </div>

              <div className={`${softCard} mt-4 p-4`}>
                <div className="font-semibold theme-text">
                  {row.example.sk}
                </div>
                <div className="mt-1 text-sm theme-text-muted">
                  {tr(row.example, uiLang)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">{ui.s4}</h2>

        <div className={`${card} p-5`}>
          <div className="text-sm theme-text-muted">{ui.practice}</div>

          <div className="mt-2 text-lg font-semibold theme-text">
            {tr(currentPractice.example, uiLang)}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setShowAnswer(true)}
              className={activeButton}
            >
              {ui.show}
            </button>

            <button type="button" onClick={nextPractice} className={ghostButton}>
              {ui.next}
            </button>
          </div>

          {showAnswer && (
            <div className={`${softCard} mt-4 p-4`}>
              <div className="text-sm theme-text-muted">{ui.answer}</div>
              <div className="font-semibold theme-accent-text">
                {currentPractice.example.sk}
              </div>
              <div className="mt-1 text-sm theme-text-muted">
                {currentPractice.form}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold theme-text">{ui.noteTitle}</h2>

        <div className={`${card} p-5`}>
          <ul className="space-y-2">
            {courseInfo.noteItems.map((item) => (
              <li key={item} className={infoItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}