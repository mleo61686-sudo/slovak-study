"use client";

import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { trWord } from "@/lib/src/tr";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import {
  BUILD_SAMPLES_CS,
  BUILD_SAMPLES_PL,
  BUILD_SAMPLES_SK,
  CASES_CS,
  CASES_PL,
  CASES_SK,
} from "./cases-data";
import {
  makeCaseQuiz,
  makeSentenceParts,
  shuffle,
  type QuizQ,
  type SentencePart,
} from "./cases-helpers";

type LocalizedText = Partial<Record<Lang, string>>;

const UI: Record<string, LocalizedText> = {
  titleSk: {
    ua: "Відмінки (6 падежів)",
    ru: "Падежи (6 падежей)",
    en: "Cases (6 cases)",
  },
  titleCs: {
    ua: "Відмінки (7 падежів у чеській)",
    ru: "Падежи (7 падежей в чешском)",
    en: "Cases (7 cases in Czech)",
  },
  titlePl: {
    ua: "Відмінки (7 падежів у польській)",
    ru: "Падежи (7 падежей в польском)",
    en: "Cases (7 cases in Polish)",
  },

  introSk: {
    ua: "У словацькій 6 відмінків. Вони відповідають на питання (Kto? Čo? / Koho? Čoho? …) і змінюють закінчення слів.",
    ru: "В словацком 6 падежей. Они отвечают на вопросы (Kto? Čo? / Koho? Čoho? …) и меняют окончания слов.",
    en: "Slovak has 6 cases. They answer questions like (Kto? Čo? / Koho? Čoho? …) and change word endings.",
  },
  introCs: {
    ua: "У чеській 7 відмінків. Вони відповідають на питання (Kdo? Co? / Koho? Čeho? …) і змінюють закінчення слів.",
    ru: "В чешском 7 падежей. Они отвечают на вопросы (Kdo? Co? / Koho? Čeho? …) и меняют окончания слов.",
    en: "Czech has 7 cases. They answer questions like (Kdo? Co? / Koho? Čeho? …) and change word endings.",
  },
  introPl: {
    ua: "У польській 7 відмінків. Вони відповідають на питання (Kto? Co? / Kogo? Czego? …) і змінюють закінчення слів.",
    ru: "В польском 7 падежей. Они отвечают на вопросы (Kto? Co? / Kogo? Czego? …) и меняют окончания слов.",
    en: "Polish has 7 cases. They answer questions like (Kto? Co? / Kogo? Czego? …) and change word endings.",
  },

  section1: {
    ua: "1) Швидка таблиця",
    ru: "1) Быстрая таблица",
    en: "1) Quick table",
  },
  section2: {
    ua: "2) Приклади (звучання)",
    ru: "2) Примеры (озвучка)",
    en: "2) Examples (audio)",
  },
  section3: {
    ua: "3) Практика 🧠",
    ru: "3) Практика 🧠",
    en: "3) Practice 🧠",
  },
  section4: {
    ua: "4) Шпаргалка",
    ru: "4) Шпаргалка",
    en: "4) Cheat sheet",
  },
  score: {
    ua: "Рахунок:",
    ru: "Счет:",
    en: "Score:",
  },
  reset: {
    ua: "Скинути",
    ru: "Сбросить",
    en: "Reset",
  },
  quizTitle: {
    ua: "A) Вибери правильний приклад",
    ru: "A) Выбери правильный пример",
    en: "A) Choose the correct example",
  },
  builderTitle: {
    ua: "B) Збери речення",
    ru: "B) Собери предложение",
    en: "B) Build the sentence",
  },
  target: {
    ua: "Ціль:",
    ru: "Цель:",
    en: "Target:",
  },
  clear: {
    ua: "Очистити",
    ru: "Очистить",
    en: "Clear",
  },
  next: {
    ua: "Наступне",
    ru: "Следующее",
    en: "Next",
  },
  yourSentence: {
    ua: "Твоє речення:",
    ru: "Твое предложение:",
    en: "Your sentence:",
  },
  correct: {
    ua: "✅ Правильно!",
    ru: "✅ Правильно!",
    en: "✅ Correct!",
  },
  compare: {
    ua: "Порівняй із ціллю 👆",
    ru: "Сравни с целью 👆",
    en: "Compare it with the target 👆",
  },
  clickWords: {
    ua: "Натискай слова нижче.",
    ru: "Нажимай слова ниже.",
    en: "Click the words below.",
  },
  removeLast: {
    ua: "← Забрати останнє слово",
    ru: "← Убрать последнее слово",
    en: "← Remove last word",
  },
  correctShort: {
    ua: "✅ Правильно",
    ru: "✅ Правильно",
    en: "✅ Correct",
  },
  wrongPrefix: {
    ua: "❌ Неправильно. Правильно:",
    ru: "❌ Неправильно. Правильно:",
    en: "❌ Incorrect. Correct answer:",
  },

  tip1Sk: {
    ua: "Lokál завжди з прийменником: v/vo, na, o, po.",
    ru: "Lokál всегда с предлогом: v/vo, na, o, po.",
    en: "Lokál is always used with a preposition: v/vo, na, o, po.",
  },
  tip2Sk: {
    ua: "Genitív часто після bez, do, z/zo: bez vody, do práce, z domu.",
    ru: "Genitív часто после bez, do, z/zo: bez vody, do práce, z domu.",
    en: "Genitív often follows bez, do, z/zo: bez vody, do práce, z domu.",
  },
  tip3Sk: {
    ua: "Inštrumentál часто з s/so: s kamarátom, so sestrou.",
    ru: "Inštrumentál часто с s/so: s kamarátom, so sestrou.",
    en: "Inštrumentál is often used with s/so: s kamarátom, so sestrou.",
  },

  tip1Cs: {
    ua: "Lokál у чеській завжди з прийменником: v/ve, na, o, po.",
    ru: "Lokál в чешском всегда с предлогом: v/ve, na, o, po.",
    en: "Lokál in Czech is always used with a preposition: v/ve, na, o, po.",
  },
  tip2Cs: {
    ua: "Genitiv часто після bez, do, z/ze: bez vody, do práce, z domu.",
    ru: "Genitiv часто после bez, do, z/ze: bez vody, do práce, z domu.",
    en: "Genitiv often follows bez, do, z/ze: bez vody, do práce, z domu.",
  },
  tip3Cs: {
    ua: "Instrumentál часто з s/se: s kamarádem, se sestrou.",
    ru: "Instrumentál часто с s/se: s kamarádem, se sestrou.",
    en: "Instrumentál is often used with s/se: s kamarádem, se sestrou.",
  },
  tip4Cs: {
    ua: "Vokativ використовується для звертання: Petře!, pane!, Jano!",
    ru: "Vokativ используется для обращения: Petře!, pane!, Jano!",
    en: "Vokativ is used for addressing someone: Petře!, pane!, Jano!",
  },

  tip1Pl: {
    ua: "Miejscownik у польській завжди з прийменником: w/we, na, o, po.",
    ru: "Miejscownik в польском всегда с предлогом: w/we, na, o, po.",
    en: "Miejscownik in Polish is always used with a preposition: w/we, na, o, po.",
  },
  tip2Pl: {
    ua: "Dopełniacz часто після bez, do, z/ze: bez wody, do pracy, z domu.",
    ru: "Dopełniacz часто после bez, do, z/ze: bez wody, do pracy, z domu.",
    en: "Dopełniacz often follows bez, do, z/ze: bez wody, do pracy, z domu.",
  },
  tip3Pl: {
    ua: "Narzędnik часто з z/ze: z kolegą, ze siostrą.",
    ru: "Narzędnik часто с z/ze: z kolegą, ze siostrą.",
    en: "Narzędnik is often used with z/ze: z kolegą, ze siostrą.",
  },
  tip4Pl: {
    ua: "Wołacz використовується для звертання: Piotrze!, Anno!, panie!",
    ru: "Wołacz используется для обращения: Piotrze!, Anno!, panie!",
    en: "Wołacz is used for addressing someone: Piotrze!, Anno!, panie!",
  },
};

const card = "flunio-card rounded-3xl";

const softCard = "theme-home-soft-card rounded-2xl";

const ghostButton =
  "theme-secondary-button rounded-xl px-3 py-2 text-sm font-semibold";

const activeButton =
  "theme-primary-button rounded-xl px-3 py-2 text-sm font-semibold";

const rowDivider =
  "border-b border-slate-300/70 last:border-b-0 theme-flunio:border-white/10";

const tipItem =
  "theme-home-soft-card rounded-2xl px-4 py-3 theme-text-muted";

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

function trPair(
  ua: string,
  ru: string | undefined,
  en: string | undefined,
  lang: Lang
) {
  if (lang === "ru") return ru ?? ua;
  if (lang === "en") return en ?? ua;
  return ua;
}

export default function CasesClient() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const isCzech = courseId === "cs";
  const isPolish = courseId === "pl";

  const cases = isCzech ? CASES_CS : isPolish ? CASES_PL : CASES_SK;
  const buildSamples = isCzech
    ? BUILD_SAMPLES_CS
    : isPolish
      ? BUILD_SAMPLES_PL
      : BUILD_SAMPLES_SK;

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
    return <div className="space-y-10 theme-text">Loading…</div>;
  }

  return (
    <div className="space-y-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative">
          <div className="theme-pill mb-4 inline-flex rounded-full px-3 py-1 text-xs font-semibold">
            Grammar · Cases
          </div>

          <h1 className="text-3xl font-semibold leading-tight tracking-tight theme-text sm:text-4xl">
            {isCzech
              ? tr(UI.titleCs, lang)
              : isPolish
                ? tr(UI.titlePl, lang)
                : tr(UI.titleSk, lang)}
          </h1>

          <p className="mt-3 max-w-3xl text-base leading-relaxed theme-text-muted">
            {isCzech
              ? tr(UI.introCs, lang)
              : isPolish
                ? tr(UI.introPl, lang)
                : tr(UI.introSk, lang)}
          </p>
        </div>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section1, lang)}
        </h2>

        <div className={card}>
          {cases.map((c) => (
            <div key={c.id} className={`space-y-3 px-5 py-5 ${rowDivider}`}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold theme-accent-text">
                    {c.name.sk}{" "}
                    <span className="theme-text-muted">—</span>{" "}
                    <span className="theme-text">
                      {trPair(c.name.ua, c.name.ru, c.name.en, lang)}
                    </span>
                  </div>

                  <div className="mt-1 text-sm theme-text-muted">
                    <span className="font-semibold theme-text">
                      {c.questions.sk}
                    </span>{" "}
                    <span className="theme-text-muted">
                      (
                      {trPair(
                        c.questions.ua,
                        c.questions.ru,
                        c.questions.en,
                        lang
                      )}
                      )
                    </span>
                  </div>
                </div>

                <SpeakButton text={c.questions.sk} kind="phrase" />
              </div>

              <div className="text-sm leading-relaxed theme-text-muted">
                {trPair(c.use.ua, c.use.ru, c.use.en, lang)}
              </div>

              <div className="text-sm leading-relaxed theme-text-muted">
                {trPair(c.rule.ua, c.rule.ru, c.rule.en, lang)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section2, lang)}
        </h2>

        <div className={card}>
          {cases.map((c) => (
            <div key={c.id} className={`space-y-3 px-5 py-5 ${rowDivider}`}>
              <div className="font-semibold theme-accent-text">
                {c.name.sk}{" "}
                <span className="theme-text-muted">—</span>{" "}
                <span className="theme-text">
                  {trPair(c.name.ua, c.name.ru, c.name.en, lang)}
                </span>
              </div>

              <div className="grid gap-2">
                {c.examples.map((ex, i) => (
                  <div
                    key={`${c.id}-${i}`}
                    className={`${softCard} flex items-center justify-between gap-3 px-4 py-3`}
                  >
                    <div className="min-w-0">
                      <div className="font-semibold theme-text">{ex.sk}</div>
                      <div className="text-sm theme-text-muted">
                        {trWord(ex, lang)}
                      </div>
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
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section3, lang)}
        </h2>

        <div className={`${card} space-y-4 p-5`}>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold theme-text">
                {tr(UI.quizTitle, lang)}
              </div>
              <div className="text-sm theme-text-muted">
                {tr(UI.score, lang)}{" "}
                <span className="font-semibold theme-accent-text">
                  {correctCount}
                </span>{" "}
                / {quiz.length}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuiz(makeCaseQuiz(cases, lang));
                setAnswers({});
                setChecked({});
              }}
              className={ghostButton}
            >
              {tr(UI.reset, lang)}
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {quiz.map((q) => (
              <div key={q.caseId} className={`${softCard} space-y-2 p-4`}>
                <div className="text-sm theme-text-muted">
                  {lang === "ru"
                    ? q.prompt.ru
                    : lang === "en"
                      ? q.prompt.en
                      : q.prompt.ua}
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
                          picked ? activeButton : ghostButton,
                          show && opt === q.correct
                            ? "ring-2 ring-emerald-400"
                            : "",
                          show && picked && !isCorrect
                            ? "ring-2 ring-rose-400"
                            : "",
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
                      <span className="font-semibold text-emerald-300">
                        {tr(UI.correctShort, lang)}
                      </span>
                    ) : (
                      <span className="text-rose-300">
                        {tr(UI.wrongPrefix, lang)}{" "}
                        <span className="font-semibold theme-text">
                          {q.correct}
                        </span>
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className={`${card} space-y-4 p-5`}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-semibold theme-text">
                {tr(UI.builderTitle, lang)}
              </div>
              <div className="text-sm theme-text-muted">
                {tr(UI.target, lang)}{" "}
                <span className="font-semibold theme-accent-text">
                  {targetTr}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => resetBuilder(current.sk)}
                className={ghostButton}
              >
                {tr(UI.clear, lang)}
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = (exIndex + 1) % buildSamples.length;
                  setExIndex(next);
                  resetBuilder(buildSamples[next].sk);
                }}
                className={ghostButton}
              >
                {tr(UI.next, lang)}
              </button>
            </div>
          </div>

          <div className={`${softCard} p-4`}>
            <div className="mb-2 text-sm theme-text-muted">
              {tr(UI.yourSentence, lang)}
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="font-semibold theme-text">
                {builtSentence || "—"}
              </div>

              {builtSentence ? (
                <SpeakButton text={`${builtSentence}.`} kind="phrase" />
              ) : null}
            </div>

            <div className="mt-3 text-sm">
              {builtSentence === targetSk ? (
                <span className="font-semibold text-emerald-300">
                  {tr(UI.correct, lang)}
                </span>
              ) : builtSentence.length > 0 ? (
                <span className="theme-text-muted">{tr(UI.compare, lang)}</span>
              ) : (
                <span className="theme-text-muted">
                  {tr(UI.clickWords, lang)}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {sentenceParts.map((part) => (
              <button
                key={part.id}
                onClick={() => {
                  setBuild((prev) => [...prev, part]);
                  setSentenceParts((prev) =>
                    prev.filter((p) => p.id !== part.id)
                  );
                }}
                className={ghostButton}
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
                className={ghostButton}
              >
                {tr(UI.removeLast, lang)}
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold theme-text">
          {tr(UI.section4, lang)}
        </h2>

        <div className={`${card} p-5`}>
          <ul className="space-y-2">
            {!isCzech && !isPolish ? (
              <>
                <li className={tipItem}>{tr(UI.tip1Sk, lang)}</li>
                <li className={tipItem}>{tr(UI.tip2Sk, lang)}</li>
                <li className={tipItem}>{tr(UI.tip3Sk, lang)}</li>
              </>
            ) : isCzech ? (
              <>
                <li className={tipItem}>{tr(UI.tip1Cs, lang)}</li>
                <li className={tipItem}>{tr(UI.tip2Cs, lang)}</li>
                <li className={tipItem}>{tr(UI.tip3Cs, lang)}</li>
                <li className={tipItem}>{tr(UI.tip4Cs, lang)}</li>
              </>
            ) : (
              <>
                <li className={tipItem}>{tr(UI.tip1Pl, lang)}</li>
                <li className={tipItem}>{tr(UI.tip2Pl, lang)}</li>
                <li className={tipItem}>{tr(UI.tip3Pl, lang)}</li>
                <li className={tipItem}>{tr(UI.tip4Pl, lang)}</li>
              </>
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}