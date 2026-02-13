"use client";

import { useEffect, useMemo, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { WORDS_RU } from "@/app/data/words";

// ===== Data =====

const vowels = [
  { sk: "a", label: { ua: "а", ru: "а" }, example: "auto" },
  { sk: "á", label: { ua: "а (довга)", ru: "а (долгая)" }, example: "máš" },
  { sk: "e", label: { ua: "е", ru: "е" }, example: "mesto" },
  { sk: "é", label: { ua: "е (довга)", ru: "е (долгая)" }, example: "méso" },
  { sk: "i", label: { ua: "і", ru: "и" }, example: "lista" },
  { sk: "í", label: { ua: "і (довга)", ru: "и (долгая)" }, example: "píše" },
  { sk: "o", label: { ua: "о", ru: "о" }, example: "dom" },
  { sk: "ó", label: { ua: "о (довга)", ru: "о (долгая)" }, example: "stôl" },
  { sk: "u", label: { ua: "у", ru: "у" }, example: "ulica" },
  { sk: "ú", label: { ua: "у (довга)", ru: "у (долгая)" }, example: "dúfať" },
  { sk: "y", label: { ua: "и", ru: "ы" }, example: "syn" },
  { sk: "ý", label: { ua: "и (довга)", ru: "ы (долгая)" }, example: "býva" },
];

const consonants = [
  { sk: "č", label: { ua: "ч", ru: "ч" }, example: "čaj" },
  { sk: "š", label: { ua: "ш", ru: "ш" }, example: "škola" },
  { sk: "ž", label: { ua: "ж", ru: "ж" }, example: "žena" },
  { sk: "ď", label: { ua: "дь", ru: "дь" }, example: "ďakujem" },
  { sk: "ť", label: { ua: "ть", ru: "ть" }, example: "ťa" },
  { sk: "ň", label: { ua: "нь", ru: "нь" }, example: "ňho" },
  { sk: "ľ", label: { ua: "ль", ru: "ль" }, example: "ľudia" },
  { sk: "ch", label: { ua: "х", ru: "х" }, example: "chlieb" },
  { sk: "dz", label: { ua: "дз", ru: "дз" }, example: "medzi" },
  { sk: "dž", label: { ua: "дж", ru: "дж" }, example: "džús" },
];

// Пару простих слів для секції “Тренування вимови”
const practiceWords = ["práca", "škola", "človek", "život", "ďakujem", "chlieb", "mesto", "učiteľ"];

// ===== Mini trainer data =====

type Q = {
  questionUa: string;
  questionRu: string;
  options: string[];
  correct: string;
};

const letterQuestions: Q[] = [
  {
    questionUa: "Обери букву для звука «ч»",
    questionRu: "Выбери букву для звука «ч»",
    options: ["č", "š", "ž", "ch"],
    correct: "č",
  },
  {
    questionUa: "Обери букву для звука «ш»",
    questionRu: "Выбери букву для звука «ш»",
    options: ["č", "š", "ž", "dz"],
    correct: "š",
  },
  {
    questionUa: "Обери букву для звука «ж»",
    questionRu: "Выбери букву для звука «ж»",
    options: ["ž", "š", "ď", "ť"],
    correct: "ž",
  },
  {
    questionUa: "Як пишеться звук «х» в словацькій?",
    questionRu: "Как пишется звук «х» в словацком?",
    options: ["h", "ch", "x", "kh"],
    correct: "ch",
  },
  {
    questionUa: "Обери ‘dz’ (як в слові ‘medzi’)",
    questionRu: "Выбери ‘dz’ (как в слове ‘medzi’)",
    options: ["dz", "dž", "ž", "z"],
    correct: "dz",
  },
  {
    questionUa: "Обери ‘dž’ (як в слові ‘džús’)",
    questionRu: "Выбери ‘dž’ (как в слове ‘džús’)",
    options: ["dz", "dž", "ď", "ž"],
    correct: "dž",
  },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function isGoodForDictation(sk: string) {
  // Для диктанту краще брати однослівні, без пробілів/тире,
  // не надто короткі і не надто довгі
  if (!sk) return false;
  if (sk.includes(" ")) return false;
  if (sk.includes("-")) return false;
  if (sk.length < 3) return false;
  if (sk.length > 14) return false;
  return true;
}

function pickRandomDictationWords(count: number) {
  const pool = WORDS_RU
    .map((w) => w.sk)
    .filter((sk) => isGoodForDictation(sk));

  const unique = Array.from(new Set(pool));
  return shuffle(unique).slice(0, Math.min(count, unique.length));
}

export default function AlphabetPage() {
  const { lang } = useLanguage();
  const t = (ua: string, ru: string) => (lang === "ru" ? ru : ua);

  // ===== Trainer tab =====
  const [tab, setTab] = useState<"quiz" | "listen" | "type">("quiz");

  // 1) quiz
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const quiz = useMemo(() => shuffle(letterQuestions).slice(0, 6), []);

  // 2) listen
  const listenRounds = useMemo(() => {
    const rounds = [
      { target: "č", words: ["človek", "škola", "život", "mesto"] },
      { target: "š", words: ["škola", "učiteľ", "chlieb", "život"] },
      { target: "ž", words: ["život", "človek", "mesto", "práca"] },
      { target: "ď", words: ["ďakujem", "mesto", "škola", "chlieb"] },
      { target: "ch", words: ["chlieb", "práca", "život", "učiteľ"] },
    ];
    return shuffle(rounds);
  }, []);

  const [lIndex, setLIndex] = useState(0);
  const [lScore, setLScore] = useState(0);
  const [lDone, setLDone] = useState(false);

  // 3) dictation (6 random words from dictionary)
  const [dictationWords, setDictationWords] = useState<string[]>(() => pickRandomDictationWords(6));
  const typeWords = dictationWords;

  const [tIndex, setTIndex] = useState(0);
  const [tScore, setTScore] = useState(0);
  const [tDone, setTDone] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    // when switching tabs, reset small UI states
    setStatus("idle");
    setInput("");
  }, [tab]);

  // autoplay the current dictation word when tab is "type"
  useEffect(() => {
    if (tab !== "type") return;
    const word = typeWords[tIndex];
    if (!word) return;

    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;
    synth.speak(utter);
  }, [tab, tIndex, typeWords]);

  const resetDictationWithNewWords = () => {
    setDictationWords(pickRandomDictationWords(6));
    setTIndex(0);
    setTScore(0);
    setTDone(false);
    setInput("");
    setStatus("idle");
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold">
          {t("Алфавіт і вимова 🔤", "Алфавит и произношение 🔤")}
        </h1>
        <p className="text-slate-700 mt-2">
          {t(
            "Словацька мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
            "Словацкий язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге."
          )}
        </p>
      </div>

      {/* Алфавіт */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("1) Алфавіт", "1) Алфавит")}</h2>
        <div className="rounded-xl border bg-white p-4 text-sm leading-relaxed">
          a, á, ä, b, c, č, d, ď, e, é, f, g, h, ch, i, í, j, k, l, ľ, m, n, ň, o, ó, ô, p, q, r, ŕ, s, š, t, ť, u, ú, v, w, x, y, ý, z, ž
        </div>
      </section>

      {/* Голосні */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("2) Голосні", "2) Гласные")}</h2>
        <div className="rounded-2xl border bg-white">
          {vowels.map((v, i) => (
            <div key={i} className="flex justify-between border-b px-5 py-3 last:border-b-0">
              <div>
                <div className="font-medium text-lg">
                  {v.sk} — {lang === "ru" ? v.label.ru : v.label.ua}
                </div>
                <div className="text-sm text-slate-500">
                  {t("Приклад:", "Пример:")} {v.example}
                </div>
              </div>
              <SpeakButton text={v.example} />
            </div>
          ))}
        </div>
      </section>

      {/* Приголосні */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("3) Особливі приголосні", "3) Особые согласные")}</h2>
        <div className="rounded-2xl border bg-white">
          {consonants.map((c, i) => (
            <div key={i} className="flex justify-between border-b px-5 py-3 last:border-b-0">
              <div>
                <div className="font-medium text-lg">
                  {c.sk} — {lang === "ru" ? c.label.ru : c.label.ua}
                </div>
                <div className="text-sm text-slate-500">
                  {t("Приклад:", "Пример:")} {c.example}
                </div>
              </div>
              <SpeakButton text={c.example} />
            </div>
          ))}
        </div>
      </section>

      {/* Наголос */}
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("4) Наголос", "4) Ударение")}</h2>
        <div className="rounded-xl border bg-white p-4">
          {t(
            "У словацькій мові наголос майже завжди на першому складі:",
            "В словацком языке ударение почти всегда на первом слоге:"
          )}
          <div className="mt-2 flex items-center gap-2">
            <b>PRÁ-ca</b>
            <SpeakButton text="práca" />
          </div>
        </div>
      </section>

      {/* Тренування слова */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("5) Тренування вимови 🧠", "5) Тренировка произношения 🧠")}</h2>
        <div className="rounded-2xl border bg-white">
          {practiceWords.map((w) => (
            <div key={w} className="flex justify-between border-b px-5 py-3 last:border-b-0">
              <span className="font-medium">{w}</span>
              <SpeakButton text={w} />
            </div>
          ))}
        </div>
      </section>

      {/* ===== MINI TRAINER ===== */}
      <section className="rounded-3xl border bg-white p-4 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold">{t("6) Міні-тренажер 🔥", "6) Мини-тренажёр 🔥")}</h2>
            <p className="text-sm text-slate-700 mt-1">
              {t(
                "Тут можна реально потренуватись: тести + слухання + диктант.",
                "Тут можно реально потренироваться: тесты + слушание + диктант."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab("quiz")}
              className={`px-3 py-2 rounded-xl border text-sm ${tab === "quiz" ? "bg-black text-white" : "hover:bg-slate-50"}`}
            >
              {t("Тест", "Тест")}
            </button>
            <button
              onClick={() => setTab("listen")}
              className={`px-3 py-2 rounded-xl border text-sm ${tab === "listen" ? "bg-black text-white" : "hover:bg-slate-50"}`}
            >
              {t("Слухання", "Слушание")}
            </button>
            <button
              onClick={() => setTab("type")}
              className={`px-3 py-2 rounded-xl border text-sm ${tab === "type" ? "bg-black text-white" : "hover:bg-slate-50"}`}
            >
              {t("Диктант", "Диктант")}
            </button>
          </div>
        </div>

        {/* TAB: QUIZ */}
        {tab === "quiz" && (
          <div className="space-y-4">
            {!qDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Питання", "Вопрос")} {qIndex + 1} / {quiz.length} • {t("Рахунок", "Счёт")}: {qScore}
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">
                    {lang === "ru" ? quiz[qIndex].questionRu : quiz[qIndex].questionUa}
                  </div>

                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {quiz[qIndex].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const correct = opt === quiz[qIndex].correct;
                          if (correct) setQScore((s) => s + 1);

                          const last = qIndex >= quiz.length - 1;
                          if (last) setQDone(true);
                          else setQIndex((i) => i + 1);
                        }}
                        className="rounded-xl border px-4 py-3 hover:bg-slate-50 text-left"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setQIndex(0);
                    setQScore(0);
                    setQDone(false);
                  }}
                  className="px-4 py-2 rounded-xl border hover:bg-slate-50"
                >
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="rounded-2xl border p-4 space-y-3">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{qScore}</b> / <b>{quiz.length}</b>
                </div>
                <button
                  onClick={() => {
                    setQIndex(0);
                    setQScore(0);
                    setQDone(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-black text-white"
                >
                  {t("Пройти ще раз", "Пройти ещё раз")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB: LISTEN */}
        {tab === "listen" && (
          <div className="space-y-4">
            {!lDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Раунд", "Раунд")} {lIndex + 1} / {listenRounds.length} • {t("Рахунок", "Счёт")}: {lScore}
                </div>

                <div className="rounded-2xl border p-4 space-y-3">
                  <div className="font-semibold">
                    {t(
                      `Знайди слово з літерою: "${listenRounds[lIndex].target}"`,
                      `Найди слово с буквой: "${listenRounds[lIndex].target}"`
                    )}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {listenRounds[lIndex].words.map((w) => {
                      const ok = w.includes(listenRounds[lIndex].target);

                      return (
                        <div key={w} className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              if (ok) setLScore((s) => s + 1);
                              const last = lIndex >= listenRounds.length - 1;
                              if (last) setLDone(true);
                              else setLIndex((i) => i + 1);
                            }}
                            className="flex-1 rounded-xl border px-4 py-3 hover:bg-slate-50 text-left"
                            type="button"
                          >
                            <span className="font-medium">{w}</span>
                          </button>

                          <SpeakButton text={w} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={() => {
                    setLIndex(0);
                    setLScore(0);
                    setLDone(false);
                  }}
                  className="px-4 py-2 rounded-xl border hover:bg-slate-50"
                >
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="rounded-2xl border p-4 space-y-3">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{lScore}</b> / <b>{listenRounds.length}</b>
                </div>
                <button
                  onClick={() => {
                    setLIndex(0);
                    setLScore(0);
                    setLDone(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-black text-white"
                >
                  {t("Пройти ще раз", "Пройти ещё раз")}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB: TYPE (DICTATION) */}
        {tab === "type" && (
          <div className="space-y-4">
            {!tDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Слово", "Слово")} {tIndex + 1} / {typeWords.length} • {t("Рахунок", "Счёт")}: {tScore}
                </div>

                <div className="rounded-2xl border p-4 space-y-3">
                  <div className="font-semibold">{t("Прослухай і напиши слово:", "Прослушай и напиши слово:")}</div>

                  <div className="flex justify-center">
                    <SpeakButton text={typeWords[tIndex]} />
                  </div>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={status !== "idle"}
                    placeholder={t("Введи слово...", "Введи слово...")}
                    className={`w-full rounded-xl border px-3 py-2 ${
                      status === "correct" ? "border-green-500" : status === "wrong" ? "border-red-500" : "border-slate-300"
                    }`}
                  />

                  {status === "idle" ? (
                    <button
                      onClick={() => {
                        const ok = normalize(input) === normalize(typeWords[tIndex]);
                        setStatus(ok ? "correct" : "wrong");
                        if (ok) setTScore((s) => s + 1);
                      }}
                      disabled={!input.trim()}
                      className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
                    >
                      {t("Перевірити", "Проверить")}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {status === "correct" ? (
                        <div className="font-semibold text-green-600">✅ {t("Правильно!", "Правильно!")}</div>
                      ) : (
                        <div className="font-semibold text-red-600">
                          ❌ {t("Неправильно. Правильно:", "Неправильно. Правильно:")} <b>{typeWords[tIndex]}</b>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setInput("");
                            setStatus("idle");
                            const last = tIndex >= typeWords.length - 1;
                            if (last) setTDone(true);
                            else setTIndex((i) => i + 1);
                          }}
                          className="px-4 py-2 rounded-xl bg-black text-white"
                        >
                          {t("Далі →", "Далее →")}
                        </button>

                        <button
                          onClick={() => {
                            setInput("");
                            setStatus("idle");
                          }}
                          className="px-4 py-2 rounded-xl border hover:bg-slate-50"
                        >
                          {t("Спробувати знову", "Попробовать снова")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={resetDictationWithNewWords} className="px-4 py-2 rounded-xl border hover:bg-slate-50">
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="rounded-2xl border p-4 space-y-3">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{tScore}</b> / <b>{typeWords.length}</b>
                </div>
                <button onClick={resetDictationWithNewWords} className="px-4 py-2 rounded-xl bg-black text-white">
                  {t("Пройти ще раз", "Пройти ещё раз")}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
