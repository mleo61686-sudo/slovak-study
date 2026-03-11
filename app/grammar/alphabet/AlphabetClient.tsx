"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

// ===== Data =====

const SK_VOWELS = [
  { value: "a", label: { ua: "а", ru: "а" }, example: "auto" },
  { value: "á", label: { ua: "а (довга)", ru: "а (долгая)" }, example: "máš" },
  { value: "ä", label: { ua: "я / е (залежно від слова)", ru: "я / е (в зависимости от слова)" }, example: "päť" },
  { value: "e", label: { ua: "е", ru: "е" }, example: "mesto" },
  { value: "é", label: { ua: "е (довга)", ru: "е (долгая)" }, example: "méso" },
  { value: "i", label: { ua: "і", ru: "и" }, example: "lista" },
  { value: "í", label: { ua: "і (довга)", ru: "и (долгая)" }, example: "píše" },
  { value: "o", label: { ua: "о", ru: "о" }, example: "dom" },
  { value: "ó", label: { ua: "о (довга)", ru: "о (долгая)" }, example: "móda" },
  { value: "ô", label: { ua: "уо", ru: "уо" }, example: "stôl" },
  { value: "u", label: { ua: "у", ru: "у" }, example: "ulica" },
  { value: "ú", label: { ua: "у (довга)", ru: "у (долгая)" }, example: "dúfať" },
  { value: "y", label: { ua: "и", ru: "ы" }, example: "syn" },
  { value: "ý", label: { ua: "и (довга)", ru: "ы (долгая)" }, example: "býva" },
];

const CS_VOWELS = [
  { value: "a", label: { ua: "а", ru: "а" }, example: "auto" },
  { value: "á", label: { ua: "а (довга)", ru: "а (долгая)" }, example: "mám" },
  { value: "e", label: { ua: "е", ru: "е" }, example: "ten" },
  { value: "é", label: { ua: "е (довга)", ru: "е (долгая)" }, example: "mléko" },
  { value: "i", label: { ua: "і", ru: "и" }, example: "kino" },
  { value: "í", label: { ua: "і (довга)", ru: "и (долгая)" }, example: "bílý" },
  { value: "o", label: { ua: "о", ru: "о" }, example: "okno" },
  { value: "ó", label: { ua: "о (довга)", ru: "о (долгая)" }, example: "móda" },
  { value: "u", label: { ua: "у", ru: "у" }, example: "ulice" },
  { value: "ú", label: { ua: "у (довга)", ru: "у (долгая)" }, example: "úkol" },
  { value: "ů", label: { ua: "у (довга, з кружечком)", ru: "у (долгая, с кружком)" }, example: "dům" },
  { value: "y", label: { ua: "и", ru: "ы" }, example: "syn" },
  { value: "ý", label: { ua: "и (довга)", ru: "ы (долгая)" }, example: "dobrý" },
  { value: "ě", label: { ua: "є / пом’якшує попередній звук", ru: "е / смягчает предыдущий звук" }, example: "město" },
];

const SK_CONSONANTS = [
  { value: "č", label: { ua: "ч", ru: "ч" }, example: "čaj" },
  { value: "š", label: { ua: "ш", ru: "ш" }, example: "škola" },
  { value: "ž", label: { ua: "ж", ru: "ж" }, example: "žena" },
  { value: "ď", label: { ua: "дь", ru: "дь" }, example: "ďakujem" },
  { value: "ť", label: { ua: "ть", ru: "ть" }, example: "ťa" },
  { value: "ň", label: { ua: "нь", ru: "нь" }, example: "ňho" },
  { value: "ľ", label: { ua: "ль", ru: "ль" }, example: "ľudia" },
  { value: "ch", label: { ua: "х", ru: "х" }, example: "chlieb" },
  { value: "dz", label: { ua: "дз", ru: "дз" }, example: "medzi" },
  { value: "dž", label: { ua: "дж", ru: "дж" }, example: "džús" },
];

const CS_CONSONANTS = [
  { value: "č", label: { ua: "ч", ru: "ч" }, example: "čaj" },
  { value: "š", label: { ua: "ш", ru: "ш" }, example: "škola" },
  { value: "ž", label: { ua: "ж", ru: "ж" }, example: "žena" },
  { value: "ď", label: { ua: "дь", ru: "дь" }, example: "ďábel" },
  { value: "ť", label: { ua: "ть", ru: "ть" }, example: "ťuknout" },
  { value: "ň", label: { ua: "нь", ru: "нь" }, example: "kůň" },
  { value: "ř", label: { ua: "особливий звук ř", ru: "особый звук ř" }, example: "řeka" },
  { value: "ch", label: { ua: "х", ru: "х" }, example: "chléb" },
];

const SK_PRACTICE_WORDS = [
  "práca",
  "škola",
  "človek",
  "život",
  "ďakujem",
  "chlieb",
  "mesto",
  "učiteľ",
];

const CS_PRACTICE_WORDS = [
  "práce",
  "škola",
  "člověk",
  "život",
  "děkuju",
  "chléb",
  "město",
  "učitel",
];

// ===== Mini trainer data =====

type ForcedLang = "ua" | "ru";

type Props = {
  forcedLang?: ForcedLang;
};

type Q = {
  questionUa: string;
  questionRu: string;
  options: string[];
  correct: string;
};

type LetterRow = {
  value: string;
  label: { ua: string; ru: string };
  example: string;
};

const SK_LETTER_QUESTIONS: Q[] = [
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
    questionUa: "Як пишеться звук «х» у словацькій?",
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

const CS_LETTER_QUESTIONS: Q[] = [
  {
    questionUa: "Обери букву для звука «ч»",
    questionRu: "Выбери букву для звука «ч»",
    options: ["č", "š", "ž", "ch"],
    correct: "č",
  },
  {
    questionUa: "Обери букву для звука «ш»",
    questionRu: "Выбери букву для звука «ш»",
    options: ["č", "š", "ž", "ř"],
    correct: "š",
  },
  {
    questionUa: "Обери букву для звука «ж»",
    questionRu: "Выбери букву для звука «ж»",
    options: ["ž", "š", "ď", "ť"],
    correct: "ž",
  },
  {
    questionUa: "Як пишеться звук «х» у чеській?",
    questionRu: "Как пишется звук «х» в чешском?",
    options: ["h", "ch", "x", "kh"],
    correct: "ch",
  },
  {
    questionUa: "Яка літера є особливою для чеської мови?",
    questionRu: "Какая буква является особой для чешского языка?",
    options: ["ľ", "ř", "dz", "dž"],
    correct: "ř",
  },
  {
    questionUa: "Яка літера часто пом’якшує попередній звук?",
    questionRu: "Какая буква часто смягчает предыдущий звук?",
    options: ["ě", "ô", "ä", "ľ"],
    correct: "ě",
  },
];

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(s: string) {
  return s.trim().toLowerCase();
}

function isGoodForDictation(word: string) {
  if (!word) return false;
  if (word.includes(" ")) return false;
  if (word.includes("-")) return false;
  if (word.length < 3) return false;
  if (word.length > 14) return false;
  return true;
}

function pickRandomWords(pool: string[], count: number) {
  const unique = Array.from(new Set(pool.filter(isGoodForDictation)));
  return shuffle(unique).slice(0, Math.min(count, unique.length));
}

// ===== Audio helpers =====

async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuf = await crypto.subtle.digest("SHA-1", data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function LetterList({
  items,
  uiLang,
  t,
}: {
  items: LetterRow[];
  uiLang: "ua" | "ru";
  t: (ua: string, ru: string) => string;
}) {
  return (
    <div className="rounded-2xl border bg-white">
      {items.map((item) => (
        <div
          key={item.value}
          className="flex justify-between border-b px-5 py-3 last:border-b-0"
        >
          <div>
            <div className="text-lg font-medium">
              {item.value} — {uiLang === "ru" ? item.label.ru : item.label.ua}
            </div>
            <div className="text-sm text-slate-500">
              {t("Приклад:", "Пример:")} {item.example}
            </div>
          </div>
          <SpeakButton text={item.example} />
        </div>
      ))}
    </div>
  );
}

export default function AlphabetPage({ forcedLang }: Props) {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const uiLang = forcedLang ?? lang;
  const isCzech = courseId === "cs";
  const t = (ua: string, ru: string) => (uiLang === "ru" ? ru : ua);

  const vowels = isCzech ? CS_VOWELS : SK_VOWELS;
  const consonants = isCzech ? CS_CONSONANTS : SK_CONSONANTS;
  const practiceWords = isCzech ? CS_PRACTICE_WORDS : SK_PRACTICE_WORDS;
  const dictationPool = useMemo(
    () => (isCzech ? CS_PRACTICE_WORDS : SK_PRACTICE_WORDS),
    [isCzech]
  );

  // ===== Trainer tab =====
  const [tab, setTab] = useState<"quiz" | "listen" | "type">("quiz");

  // 1) quiz
  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const quiz = useMemo(
    () => shuffle(isCzech ? CS_LETTER_QUESTIONS : SK_LETTER_QUESTIONS).slice(0, 6),
    [isCzech]
  );

  // 2) listen
  const listenRounds = useMemo(() => {
    const rounds = isCzech
      ? [
          { target: "č", words: ["člověk", "škola", "život", "město"] },
          { target: "š", words: ["škola", "učitel", "chléb", "život"] },
          { target: "ž", words: ["život", "člověk", "město", "práce"] },
          { target: "ř", words: ["řeka", "město", "škola", "chléb"] },
          { target: "ch", words: ["chléb", "práce", "život", "učitel"] },
        ]
      : [
          { target: "č", words: ["človek", "škola", "život", "mesto"] },
          { target: "š", words: ["škola", "učiteľ", "chlieb", "život"] },
          { target: "ž", words: ["život", "človek", "mesto", "práca"] },
          { target: "ď", words: ["ďakujem", "mesto", "škola", "chlieb"] },
          { target: "ch", words: ["chlieb", "práca", "život", "učiteľ"] },
        ];

    return shuffle(rounds);
  }, [isCzech]);

  const [lIndex, setLIndex] = useState(0);
  const [lScore, setLScore] = useState(0);
  const [lDone, setLDone] = useState(false);

  // 3) dictation
  const [dictationWords, setDictationWords] = useState<string[]>(() =>
    pickRandomWords(SK_PRACTICE_WORDS, 6)
  );
  const typeWords = dictationWords;

  useEffect(() => {
    setDictationWords(pickRandomWords(dictationPool, 6));
  }, [dictationPool]);

  const [tIndex, setTIndex] = useState(0);
  const [tScore, setTScore] = useState(0);
  const [tDone, setTDone] = useState(false);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stopAnyAudio = () => {
    if (audioRef.current) {
      try {
        audioRef.current.pause();
      } catch {}
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  };

  const autoplayDictationWord = async (word: string) => {
    stopAnyAudio();

    const clean = word.trim();
    const key = await sha1Hex(`word:${clean}`);
    const src = `/audio/words/${key}.mp3`;

    const audio = new Audio(src);
    audioRef.current = audio;

    try {
      await audio.play();
    } catch {}
  };

  useEffect(() => {
    setStatus("idle");
    setInput("");
    stopAnyAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  useEffect(() => {
    if (tab !== "type") return;
    if (tDone) return;

    const word = typeWords[tIndex];
    if (!word) return;
    if (status !== "idle") return;

    let cancelled = false;

    (async () => {
      if (cancelled) return;
      await autoplayDictationWord(word);
    })();

    return () => {
      cancelled = true;
      stopAnyAudio();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, tIndex, typeWords, status, tDone]);

  const resetQuiz = () => {
    setQIndex(0);
    setQScore(0);
    setQDone(false);
  };

  const resetListen = () => {
    setLIndex(0);
    setLScore(0);
    setLDone(false);
  };

  const resetDictationWithNewWords = () => {
    stopAnyAudio();
    setDictationWords(pickRandomWords(dictationPool, 6));
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
          {isCzech
            ? t("Чеський алфавіт і вимова 🔤", "Чешский алфавит и произношение 🔤")
            : t("Словацький алфавіт і вимова 🔤", "Словацкий алфавит и произношение 🔤")}
        </h1>
        <p className="mt-2 text-slate-700">
          {isCzech
            ? t(
                "Чеська мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
                "Чешский язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге."
              )
            : t(
                "Словацька мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
                "Словацкий язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге."
              )}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("1) Алфавіт", "1) Алфавит")}</h2>
        <div className="rounded-xl border bg-white p-4 text-sm leading-relaxed">
          {!isCzech
            ? "a, á, ä, b, c, č, d, ď, e, é, f, g, h, ch, i, í, j, k, l, ľ, m, n, ň, o, ó, ô, p, q, r, ŕ, s, š, t, ť, u, ú, v, w, x, y, ý, z, ž"
            : "a, á, b, c, č, d, ď, e, é, ě, f, g, h, ch, i, í, j, k, l, m, n, ň, o, ó, p, q, r, ř, s, š, t, ť, u, ú, ů, v, w, x, y, ý, z, ž"}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t("2) Голосні", "2) Гласные")}</h2>
        <LetterList items={vowels} uiLang={uiLang} t={t} />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t("3) Особливі приголосні", "3) Особые согласные")}
        </h2>
        <LetterList items={consonants} uiLang={uiLang} t={t} />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{t("4) Наголос", "4) Ударение")}</h2>
        <div className="rounded-xl border bg-white p-4">
          {isCzech
            ? t(
                "У чеській мові наголос майже завжди на першому складі:",
                "В чешском языке ударение почти всегда на первом слоге:"
              )
            : t(
                "У словацькій мові наголос майже завжди на першому складі:",
                "В словацком языке ударение почти всегда на первом слоге:"
              )}
          <div className="mt-2 flex items-center gap-2">
            <b>{isCzech ? "PRA-ha" : "PRÁ-ca"}</b>
            <SpeakButton text={isCzech ? "Praha" : "práca"} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t("5) Тренування вимови 🧠", "5) Тренировка произношения 🧠")}
        </h2>
        <div className="rounded-2xl border bg-white">
          {practiceWords.map((word) => (
            <div
              key={word}
              className="flex justify-between border-b px-5 py-3 last:border-b-0"
            >
              <span className="font-medium">{word}</span>
              <SpeakButton text={word} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold">
              {t("6) Міні-тренажер 🔥", "6) Мини-тренажёр 🔥")}
            </h2>
            <p className="mt-1 text-sm text-slate-700">
              {t(
                "Тут можна реально потренуватись: тести + слухання + диктант.",
                "Тут можно реально потренироваться: тесты + слушание + диктант."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab("quiz")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "quiz" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {t("Тест", "Тест")}
            </button>
            <button
              onClick={() => setTab("listen")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "listen" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {t("Слухання", "Слушание")}
            </button>
            <button
              onClick={() => setTab("type")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "type" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {t("Диктант", "Диктант")}
            </button>
          </div>
        </div>

        {tab === "quiz" && (
          <div className="space-y-4">
            {!qDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Питання", "Вопрос")} {qIndex + 1} / {quiz.length} • {t("Рахунок", "Счёт")}: {qScore}
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">
                    {uiLang === "ru" ? quiz[qIndex].questionRu : quiz[qIndex].questionUa}
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
                        className="rounded-xl border px-4 py-3 text-left hover:bg-slate-50"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={resetQuiz}
                  className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                >
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{qScore}</b> / <b>{quiz.length}</b>
                </div>
                <button
                  onClick={resetQuiz}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
                  {t("Пройти ще раз", "Пройти ещё раз")}
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "listen" && (
          <div className="space-y-4">
            {!lDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Раунд", "Раунд")} {lIndex + 1} / {listenRounds.length} • {t("Рахунок", "Счёт")}: {lScore}
                </div>

                <div className="space-y-3 rounded-2xl border p-4">
                  <div className="font-semibold">
                    {t(
                      `Знайди слово з літерою: "${listenRounds[lIndex].target}"`,
                      `Найди слово с буквой: "${listenRounds[lIndex].target}"`
                    )}
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    {listenRounds[lIndex].words.map((word) => {
                      const ok = word.includes(listenRounds[lIndex].target);

                      return (
                        <div key={word} className="flex items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              if (ok) setLScore((s) => s + 1);
                              const last = lIndex >= listenRounds.length - 1;
                              if (last) setLDone(true);
                              else setLIndex((i) => i + 1);
                            }}
                            className="flex-1 rounded-xl border px-4 py-3 text-left hover:bg-slate-50"
                            type="button"
                          >
                            <span className="font-medium">{word}</span>
                          </button>

                          <SpeakButton text={word} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  onClick={resetListen}
                  className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                >
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{lScore}</b> / <b>{listenRounds.length}</b>
                </div>
                <button
                  onClick={resetListen}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
                  {t("Пройти ще раз", "Пройти ещё раз")}
                </button>
              </div>
            )}
          </div>
        )}

        {tab === "type" && (
          <div className="space-y-4">
            {!tDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {t("Слово", "Слово")} {tIndex + 1} / {typeWords.length} • {t("Рахунок", "Счёт")}: {tScore}
                </div>

                <div className="space-y-3 rounded-2xl border p-4">
                  <div className="font-semibold">
                    {t("Прослухай і напиши слово:", "Прослушай и напиши слово:")}
                  </div>

                  <div className="flex justify-center">
                    <SpeakButton text={typeWords[tIndex]} />
                  </div>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={status !== "idle"}
                    placeholder={t("Введи слово...", "Введи слово...")}
                    className={`w-full rounded-xl border px-3 py-2 ${
                      status === "correct"
                        ? "border-green-500"
                        : status === "wrong"
                        ? "border-red-500"
                        : "border-slate-300"
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
                      className="rounded-xl bg-black px-4 py-2 text-white disabled:opacity-50"
                    >
                      {t("Перевірити", "Проверить")}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {status === "correct" ? (
                        <div className="font-semibold text-green-600">
                          ✅ {t("Правильно!", "Правильно!")}
                        </div>
                      ) : (
                        <div className="font-semibold text-red-600">
                          ❌ {t("Неправильно. Правильно:", "Неправильно. Правильно:")}{" "}
                          <b>{typeWords[tIndex]}</b>
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
                          className="rounded-xl bg-black px-4 py-2 text-white"
                        >
                          {t("Далі →", "Далее →")}
                        </button>

                        <button
                          onClick={() => {
                            setInput("");
                            setStatus("idle");
                          }}
                          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                        >
                          {t("Спробувати знову", "Попробовать снова")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={resetDictationWithNewWords}
                  className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                >
                  {t("Почати заново", "Начать заново")}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{t("Готово! 🎉", "Готово! 🎉")}</div>
                <div className="text-slate-700">
                  {t("Результат", "Результат")}: <b>{tScore}</b> / <b>{typeWords.length}</b>
                </div>
                <button
                  onClick={resetDictationWithNewWords}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
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