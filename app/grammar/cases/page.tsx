"use client";

import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { trWord } from "@/lib/src/tr";
import { useEffect, useMemo, useState } from "react";

type W = { sk: string; ua: string; ru?: string };

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeSentenceParts(example: string) {
  return shuffle(example.replace(/[.!?]$/, "").split(" "));
}

type CaseId = "nom" | "gen" | "dat" | "acc" | "loc" | "ins";

type CaseBlock = {
  id: CaseId;
  name: W; // назва відмінка
  questions: W; // питання
  use: W; // коли використовуємо
  rule: W; // коротко про прийменники/логіку
  examples: W[]; // приклади (sk + ua + ru)
};

const CASES: CaseBlock[] = [
  {
    id: "nom",
    name: { sk: "Nominatív", ua: "Називний", ru: "Именительный" },
    questions: { sk: "Kto? Čo?", ua: "Хто? Що?", ru: "Кто? Что?" },
    use: {
      sk: "Podmet (хто/що робить дію) + словникова форма.",
      ua: "Підмет (хто/що робить дію) + словникова форма.",
      ru: "Подлежащее (кто/что делает) + словарная форма.",
    },
    rule: {
      sk: "Bez predložiek. Часто з дієсловом byť: On je lekár.",
      ua: "Без прийменників. Часто з дієсловом byť: On je lekár.",
      ru: "Без предлогов. Часто с глаголом byť: On je lekár.",
    },
    examples: [
      { sk: "Ja som študent.", ua: "Я студент.", ru: "Я студент." },
      { sk: "Toto je auto.", ua: "Це авто.", ru: "Это машина." },
      { sk: "Brat pracuje.", ua: "Брат працює.", ru: "Брат работает." },
    ],
  },

  {
    id: "gen",
    name: { sk: "Genitív", ua: "Родовий", ru: "Родительный" },
    questions: { sk: "Koho? Čoho?", ua: "Кого? Чого?", ru: "Кого? Чего?" },
    use: {
      sk: "Vlastníctvo, „без/немає“, частина чогось.",
      ua: "Належність, «немає/без», частина чогось.",
      ru: "Принадлежность, «нет/без», часть чего-то.",
    },
    rule: {
      sk: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ua: "Часто з: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
      ru: "Часто с: bez, od, do, z/zo, u. (bez vody, do práce, z domu).",
    },
    examples: [
      { sk: "Nemám čas.", ua: "Я не маю часу.", ru: "У меня нет времени." },
      { sk: "Som z Ukrajiny.", ua: "Я з України.", ru: "Я из Украины." },
      { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
    ],
  },

  {
    id: "dat",
    name: { sk: "Datív", ua: "Давальний", ru: "Дательный" },
    questions: { sk: "Komu? Čomu?", ua: "Кому? Чому?", ru: "Кому? Чему?" },
    use: {
      sk: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ua: "Кому/чому даємо, допомагаємо, телефонуємо.",
      ru: "Кому/чему даём, помогаем, звоним.",
    },
    rule: {
      sk: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ua: "Часто з: k/ku (k lekárovi). Також: ďakujem, pomáham, volám.",
      ru: "Часто с: k/ku (k lekárovi). Также: ďakujem, pomáham, volám.",
    },
    examples: [
      { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
      { sk: "Volám mame.", ua: "Я телефоную мамі.", ru: "Я звоню маме." },
      { sk: "Ďakujem ti.", ua: "Дякую тобі.", ru: "Спасибо тебе." },
    ],
  },

  {
    id: "acc",
    name: { sk: "Akuzatív", ua: "Знахідний", ru: "Винительный" },
    questions: { sk: "Koho? Čo?", ua: "Кого? Що?", ru: "Кого? Что?" },
    use: {
      sk: "Прямий об’єкт дії (бачу/маю/роблю).",
      ua: "Прямий додаток (бачу/маю/роблю).",
      ru: "Прямое дополнение (вижу/имею/делаю).",
    },
    rule: {
      sk: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ua: "Часто після: vidím, mám, robím, kupujem. Також рух „na“: idem na poštu.",
      ru: "Часто после: vidím, mám, robím, kupujem. Также движение „na“: idem na poštu.",
    },
    examples: [
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
      { sk: "Mám otázku.", ua: "У мене є питання.", ru: "У меня есть вопрос." },
      { sk: "Idem na poštu.", ua: "Я йду на пошту.", ru: "Я иду на почту." },
    ],
  },

  {
    id: "loc",
    name: { sk: "Lokál", ua: "Місцевий", ru: "Предложный (местный)" },
    questions: { sk: "O kom? O čom? Kde?", ua: "Про кого? Про що? Де?", ru: "О ком? О чём? Где?" },
    use: {
      sk: "Про щось говоримо + де знаходимось (у/на).",
      ua: "Говоримо про щось + де знаходимось (у/на).",
      ru: "Говорим о чём-то + где находимся (в/на).",
    },
    rule: {
      sk: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ua: "Завжди з прийменником: v/vo, na, o, po (v meste, o práci).",
      ru: "Всегда с предлогом: v/vo, na, o, po (v meste, o práci).",
    },
    examples: [
      { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе." },
      { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
      { sk: "Bývam v meste.", ua: "Я живу в місті.", ru: "Я живу в городе." },
    ],
  },

  {
    id: "ins",
    name: { sk: "Inštrumentál", ua: "Орудний", ru: "Творительный" },
    questions: { sk: "S kým? S čím?", ua: "З ким? З чим?", ru: "С кем? С чем?" },
    use: {
      sk: "З ким/чим (разом), „ким є“ (професія/роль інколи).",
      ua: "З ким/чим (разом), «ким є» (роль/професія інколи).",
      ru: "С кем/чем (вместе), «кем является» (роль/профессия иногда).",
    },
    rule: {
      sk: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ua: "Часто з: s/so (s kamarátom), pred (pred domom).",
      ru: "Часто с: s/so (s kamarátom), pred (pred domom).",
    },
    examples: [
      { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом." },
      { sk: "Píšem perom.", ua: "Я пишу ручкою.", ru: "Я пишу ручкой." },
      { sk: "Som sám/sama.", ua: "Я сам/сама.", ru: "Я один/одна." },
    ],
  },
];

type QuizQ = {
  caseId: CaseId;
  prompt: W;
  correct: string;
  options: string[];
};

function makeCaseQuiz(lang: "ua" | "ru"): QuizQ[] {
  const picks = shuffle(CASES).slice(0, 4);

  return picks.map((c) => {
    const correct = c.examples[0].sk;
    const opts = new Set<string>([correct]);
    while (opts.size < 4) {
      const anyCase = CASES[Math.floor(Math.random() * CASES.length)];
      const ex = anyCase.examples[Math.floor(Math.random() * anyCase.examples.length)].sk;
      opts.add(ex);
    }
    const prompt =
      lang === "ru"
        ? { sk: c.questions.sk, ua: "", ru: `${c.name.ru}: ${c.questions.ru}` }
        : { sk: c.questions.sk, ua: `${c.name.ua}: ${c.questions.ua}`, ru: "" };

    return { caseId: c.id, prompt, correct, options: shuffle(Array.from(opts)) };
  });
}

export default function CasesPage() {
  const { lang } = useLanguage();
  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Quiz A
  const [quiz, setQuiz] = useState<QuizQ[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  // Quiz B (build sentence)
  const buildSamples = useMemo(() => {
    return [
      { sk: "Som v práci.", ua: "Я на роботі.", ru: "Я на работе." },
      { sk: "Idem do práce.", ua: "Я йду на роботу.", ru: "Я иду на работу." },
      { sk: "Idem s kamarátom.", ua: "Я йду з другом.", ru: "Я иду с другом." },
      { sk: "Hovoríme o škole.", ua: "Ми говоримо про школу.", ru: "Мы говорим о школе." },
      { sk: "Vidím auto.", ua: "Я бачу авто.", ru: "Я вижу машину." },
      { sk: "Pomáham kamarátovi.", ua: "Я допомагаю другу.", ru: "Я помогаю другу." },
    ];
  }, []);

  const [exIndex, setExIndex] = useState(0);
  const current = buildSamples[exIndex] ?? buildSamples[0];
  const [sentenceParts, setSentenceParts] = useState<string[]>([]);
  const [build, setBuild] = useState<string[]>([]);

  useEffect(() => {
    if (!mounted) return;
    setQuiz(makeCaseQuiz(lang));
    setAnswers({});
    setChecked({});

    setExIndex(0);
    setBuild([]);
    setSentenceParts(makeSentenceParts(buildSamples[0].sk));
  }, [mounted, lang, buildSamples]);

  const correctCount = useMemo(() => {
    let c = 0;
    for (const q of quiz) if (answers[q.caseId] && answers[q.caseId] === q.correct) c++;
    return c;
  }, [answers, quiz]);

  const builtSentence = build.join(" ");
  const targetSk = (current?.sk ?? "").replace(/[.!?]$/, "");
  const targetTr = trWord(current, lang).replace(/[.!?]$/, "");

  if (!mounted) return <div className="space-y-10">Loading…</div>;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">{t("Відмінки (6 падежів)", "Падежи (6 падежей)")}</h1>
        <p className="text-slate-700">
          {t(
            "У словацькій 6 відмінків. Вони відповідають на питання (Kto? Čo? / Koho? Čoho? …) і змінюють закінчення слів.",
            "В словацком 6 падежей. Они отвечают на вопросы (Kto? Čo? / Koho? Čoho? …) и меняют окончания слов."
          )}
        </p>
      </div>

      {/* 1) Quick table */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("1) Швидка таблиця", "1) Быстрая таблица")}</h2>
        <div className="rounded-2xl border bg-white">
          {CASES.map((c) => (
            <div key={c.id} className="border-b px-5 py-4 last:border-b-0 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-semibold">
                    {c.name.sk} — {t(c.name.ua, c.name.ru ?? c.name.ua)}
                  </div>
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">{c.questions.sk}</span>{" "}
                    <span className="text-slate-500">({t(c.questions.ua, c.questions.ru ?? c.questions.ua)})</span>
                  </div>
                </div>

                {/* ✅ це фраза */}
                <SpeakButton text={c.questions.sk} kind="phrase" />
              </div>

              <div className="text-sm text-slate-700">{t(c.use.ua, c.use.ru ?? c.use.ua)}</div>
              <div className="text-sm text-slate-500">{t(c.rule.ua, c.rule.ru ?? c.rule.ua)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2) Examples */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("2) Приклади (звучання)", "2) Примеры (озвучка)")}</h2>

        <div className="rounded-2xl border bg-white">
          {CASES.map((c) => (
            <div key={c.id} className="border-b px-5 py-4 last:border-b-0 space-y-3">
              <div className="font-semibold">
                {c.name.sk} — {t(c.name.ua, c.name.ru ?? c.name.ua)}
              </div>

              <div className="grid gap-2">
                {c.examples.map((ex, i) => (
                  <div key={i} className="rounded-xl border px-4 py-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-medium">{ex.sk}</div>
                      <div className="text-sm text-slate-500">{trWord(ex, lang)}</div>
                    </div>

                    {/* ✅ це фраза */}
                    <SpeakButton text={ex.sk} kind="phrase" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3) Practice */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("3) Практика 🧠", "3) Практика 🧠")}</h2>

        {/* Quiz A */}
        <div className="rounded-2xl border bg-white p-5 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-semibold">{t("A) Вибери правильний приклад", "A) Выбери правильный пример")}</div>
              <div className="text-sm text-slate-500">
                {t("Рахунок:", "Счет:")}{" "}
                <span className="font-medium text-slate-900">{correctCount}</span> / {quiz.length}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setQuiz(makeCaseQuiz(lang));
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
              <div key={q.caseId} className="rounded-xl border p-4 space-y-2">
                <div className="text-sm text-slate-500">{lang === "ru" ? q.prompt.ru : q.prompt.ua}</div>

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
                          "px-3 py-2 rounded-xl border text-sm",
                          picked ? "bg-slate-900 text-white border-slate-900" : "hover:bg-slate-50",
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
                  <div className="text-xs mt-1">
                    {answers[q.caseId] === q.correct ? (
                      <span className="text-emerald-600 font-medium">{t("✅ Правильно", "✅ Правильно")}</span>
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

        {/* Quiz B */}
        <div className="rounded-2xl border bg-white p-5 space-y-4">
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
                onClick={() => setBuild([])}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {t("Очистити", "Очистить")}
              </button>

              <button
                type="button"
                onClick={() => {
                  const next = (exIndex + 1) % buildSamples.length;
                  setExIndex(next);
                  setBuild([]);
                  setSentenceParts(makeSentenceParts(buildSamples[next].sk));
                }}
                className="rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
              >
                {t("Наступне", "Следующее")}
              </button>
            </div>
          </div>

          <div className="rounded-xl border p-4">
            <div className="text-sm text-slate-500 mb-2">{t("Твоє речення:", "Твое предложение:")}</div>
            <div className="flex items-center justify-between gap-3">
              <div className="font-medium">{builtSentence || "—"}</div>

              {/* ✅ це фраза */}
              {builtSentence ? <SpeakButton text={builtSentence + "."} kind="phrase" /> : null}
            </div>

            <div className="mt-3 text-sm">
              {builtSentence === targetSk ? (
                <span className="text-emerald-600 font-medium">{t("✅ Правильно!", "✅ Правильно!")}</span>
              ) : builtSentence.length > 0 ? (
                <span className="text-slate-500">{t("Порівняй із ціллю 👆", "Сравни с целью 👆")}</span>
              ) : (
                <span className="text-slate-500">{t("Натискай слова нижче.", "Нажимай слова ниже.")}</span>
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

      {/* 4) Tips */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("4) Шпаргалка", "4) Шпаргалка")}</h2>
        <div className="rounded-2xl border bg-white p-5 text-slate-700">
          <ul className="list-disc pl-5 space-y-2">
            <li>{t("Lokál завжди з прийменником: v/vo, na, o, po.", "Lokál всегда с предлогом: v/vo, na, o, po.")}</li>
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
          </ul>
        </div>
      </section>
    </div>
  );
}