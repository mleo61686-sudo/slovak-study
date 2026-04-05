"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

// ===== Types =====

type LocalizedText = Partial<Record<Lang, string>>;

type LetterRow = {
  value: string;
  label: LocalizedText;
  example: string;
};

type ForcedLang = Lang;

type Props = {
  forcedLang?: ForcedLang;
};

type Q = {
  question: LocalizedText;
  options: string[];
  correct: string;
};

// ===== Helpers =====

function tr(text: LocalizedText, lang: Lang) {
  return text[lang] ?? text.ua ?? "";
}

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

// ===== Data =====

const SK_VOWELS: LetterRow[] = [
  { value: "a", label: { ua: "а", ru: "а", en: "a" }, example: "auto" },
  { value: "á", label: { ua: "а (довга)", ru: "а (долгая)", en: "a (long)" }, example: "máš" },
  { value: "ä", label: { ua: "я / е (залежно від слова)", ru: "я / е (в зависимости от слова)", en: "ya / e (depends on the word)" }, example: "päť" },
  { value: "e", label: { ua: "е", ru: "е", en: "e" }, example: "mesto" },
  { value: "é", label: { ua: "е (довга)", ru: "е (долгая)", en: "e (long)" }, example: "méso" },
  { value: "i", label: { ua: "і", ru: "и", en: "i" }, example: "lista" },
  { value: "í", label: { ua: "і (довга)", ru: "и (долгая)", en: "i (long)" }, example: "píše" },
  { value: "o", label: { ua: "о", ru: "о", en: "o" }, example: "dom" },
  { value: "ó", label: { ua: "о (довга)", ru: "о (долгая)", en: "o (long)" }, example: "móda" },
  { value: "ô", label: { ua: "уо", ru: "уо", en: "uo" }, example: "stôl" },
  { value: "u", label: { ua: "у", ru: "у", en: "u" }, example: "ulica" },
  { value: "ú", label: { ua: "у (довга)", ru: "у (долгая)", en: "u (long)" }, example: "dúfať" },
  { value: "y", label: { ua: "и", ru: "ы", en: "y" }, example: "syn" },
  { value: "ý", label: { ua: "и (довга)", ru: "ы (долгая)", en: "y (long)" }, example: "býva" },
];

const CS_VOWELS: LetterRow[] = [
  { value: "a", label: { ua: "а", ru: "а", en: "a" }, example: "auto" },
  { value: "á", label: { ua: "а (довга)", ru: "а (долгая)", en: "a (long)" }, example: "mám" },
  { value: "e", label: { ua: "е", ru: "е", en: "e" }, example: "ten" },
  { value: "é", label: { ua: "е (довга)", ru: "е (долгая)", en: "e (long)" }, example: "mléko" },
  { value: "i", label: { ua: "і", ru: "и", en: "i" }, example: "kino" },
  { value: "í", label: { ua: "і (довга)", ru: "и (долгая)", en: "i (long)" }, example: "bílý" },
  { value: "o", label: { ua: "о", ru: "о", en: "o" }, example: "okno" },
  { value: "ó", label: { ua: "о (довга)", ru: "о (долгая)", en: "o (long)" }, example: "móda" },
  { value: "u", label: { ua: "у", ru: "у", en: "u" }, example: "ulice" },
  { value: "ú", label: { ua: "у (довга)", ru: "у (долгая)", en: "u (long)" }, example: "úkol" },
  { value: "ů", label: { ua: "у (довга, з кружечком)", ru: "у (долгая, с кружком)", en: "u (long, with ring)" }, example: "dům" },
  { value: "y", label: { ua: "и", ru: "ы", en: "y" }, example: "syn" },
  { value: "ý", label: { ua: "и (довга)", ru: "ы (долгая)", en: "y (long)" }, example: "dobrý" },
  { value: "ě", label: { ua: "є / пом’якшує попередній звук", ru: "е / смягчает предыдущий звук", en: "ě / softens the previous sound" }, example: "město" },
];

const SK_CONSONANTS: LetterRow[] = [
  { value: "č", label: { ua: "ч", ru: "ч", en: "ch" }, example: "čaj" },
  { value: "š", label: { ua: "ш", ru: "ш", en: "sh" }, example: "škola" },
  { value: "ž", label: { ua: "ж", ru: "ж", en: "zh" }, example: "žena" },
  { value: "ď", label: { ua: "дь", ru: "дь", en: "ď / soft d" }, example: "ďakujem" },
  { value: "ť", label: { ua: "ть", ru: "ть", en: "ť / soft t" }, example: "ťa" },
  { value: "ň", label: { ua: "нь", ru: "нь", en: "ň / soft n" }, example: "ňho" },
  { value: "ľ", label: { ua: "ль", ru: "ль", en: "ľ / soft l" }, example: "ľudia" },
  { value: "ch", label: { ua: "х", ru: "х", en: "kh / ch" }, example: "chlieb" },
  { value: "dz", label: { ua: "дз", ru: "дз", en: "dz" }, example: "medzi" },
  { value: "dž", label: { ua: "дж", ru: "дж", en: "dzh / j" }, example: "džús" },
];

const CS_CONSONANTS: LetterRow[] = [
  { value: "č", label: { ua: "ч", ru: "ч", en: "ch" }, example: "čaj" },
  { value: "š", label: { ua: "ш", ru: "ш", en: "sh" }, example: "škola" },
  { value: "ž", label: { ua: "ж", ru: "ж", en: "zh" }, example: "žena" },
  { value: "ď", label: { ua: "дь", ru: "дь", en: "ď / soft d" }, example: "ďábel" },
  { value: "ť", label: { ua: "ть", ru: "ть", en: "ť / soft t" }, example: "ťuknout" },
  { value: "ň", label: { ua: "нь", ru: "нь", en: "ň / soft n" }, example: "kůň" },
  { value: "ř", label: { ua: "особливий звук ř", ru: "особый звук ř", en: "special Czech sound ř" }, example: "řeka" },
  { value: "ch", label: { ua: "х", ru: "х", en: "kh / ch" }, example: "chléb" },
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

const SK_LETTER_QUESTIONS: Q[] = [
  {
    question: {
      ua: "Обери букву для звука «ч»",
      ru: "Выбери букву для звука «ч»",
      en: 'Choose the letter for the sound "ch"',
    },
    options: ["č", "š", "ž", "ch"],
    correct: "č",
  },
  {
    question: {
      ua: "Обери букву для звука «ш»",
      ru: "Выбери букву для звука «ш»",
      en: 'Choose the letter for the sound "sh"',
    },
    options: ["č", "š", "ž", "dz"],
    correct: "š",
  },
  {
    question: {
      ua: "Обери букву для звука «ж»",
      ru: "Выбери букву для звука «ж»",
      en: 'Choose the letter for the sound "zh"',
    },
    options: ["ž", "š", "ď", "ť"],
    correct: "ž",
  },
  {
    question: {
      ua: "Як пишеться звук «х» у словацькій?",
      ru: "Как пишется звук «х» в словацком?",
      en: 'How is the "kh" sound written in Slovak?',
    },
    options: ["h", "ch", "x", "kh"],
    correct: "ch",
  },
  {
    question: {
      ua: "Обери ‘dz’ (як в слові ‘medzi’)",
      ru: "Выбери ‘dz’ (как в слове ‘medzi’)",
      en: "Choose ‘dz’ (as in ‘medzi’)",
    },
    options: ["dz", "dž", "ž", "z"],
    correct: "dz",
  },
  {
    question: {
      ua: "Обери ‘dž’ (як в слові ‘džús’)",
      ru: "Выбери ‘dž’ (как в слове ‘džús’)",
      en: "Choose ‘dž’ (as in ‘džús’)",
    },
    options: ["dz", "dž", "ď", "ž"],
    correct: "dž",
  },
];

const CS_LETTER_QUESTIONS: Q[] = [
  {
    question: {
      ua: "Обери букву для звука «ч»",
      ru: "Выбери букву для звука «ч»",
      en: 'Choose the letter for the sound "ch"',
    },
    options: ["č", "š", "ž", "ch"],
    correct: "č",
  },
  {
    question: {
      ua: "Обери букву для звука «ш»",
      ru: "Выбери букву для звука «ш»",
      en: 'Choose the letter for the sound "sh"',
    },
    options: ["č", "š", "ž", "ř"],
    correct: "š",
  },
  {
    question: {
      ua: "Обери букву для звука «ж»",
      ru: "Выбери букву для звука «ж»",
      en: 'Choose the letter for the sound "zh"',
    },
    options: ["ž", "š", "ď", "ť"],
    correct: "ž",
  },
  {
    question: {
      ua: "Як пишеться звук «х» у чеській?",
      ru: "Как пишется звук «х» в чешском?",
      en: 'How is the "kh" sound written in Czech?',
    },
    options: ["h", "ch", "x", "kh"],
    correct: "ch",
  },
  {
    question: {
      ua: "Яка літера є особливою для чеської мови?",
      ru: "Какая буква является особой для чешского языка?",
      en: "Which letter is special in Czech?",
    },
    options: ["ľ", "ř", "dz", "dž"],
    correct: "ř",
  },
  {
    question: {
      ua: "Яка літера часто пом’якшує попередній звук?",
      ru: "Какая буква часто смягчает предыдущий звук?",
      en: "Which letter often softens the previous sound?",
    },
    options: ["ě", "ô", "ä", "ľ"],
    correct: "ě",
  },
];

// ===== Audio helpers =====

async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuf = await crypto.subtle.digest("SHA-1", data);
  const hashArr = Array.from(new Uint8Array(hashBuf));
  return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function LetterList({
  items,
  lang,
  exampleLabel,
}: {
  items: LetterRow[];
  lang: Lang;
  exampleLabel: string;
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
              {item.value} — {tr(item.label, lang)}
            </div>
            <div className="text-sm text-slate-500">
              {exampleLabel} {item.example}
            </div>
          </div>
          <SpeakButton text={item.example} />
        </div>
      ))}
    </div>
  );
}

const UI: Record<
  string,
  LocalizedText
> = {
  titleSk: {
    ua: "Словацький алфавіт і вимова 🔤",
    ru: "Словацкий алфавит и произношение 🔤",
    en: "Slovak alphabet and pronunciation 🔤",
  },
  titleCs: {
    ua: "Чеський алфавіт і вимова 🔤",
    ru: "Чешский алфавит и произношение 🔤",
    en: "Czech alphabet and pronunciation 🔤",
  },
  introSk: {
    ua: "Словацька мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
    ru: "Словацкий язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге.",
    en: "Slovak uses the Latin alphabet with diacritics. Stress is almost always on the first syllable.",
  },
  introCs: {
    ua: "Чеська мова використовує латиницю з діакритикою. Наголос майже завжди на першому складі.",
    ru: "Чешский язык использует латиницу с диакритикой. Ударение почти всегда на первом слоге.",
    en: "Czech uses the Latin alphabet with diacritics. Stress is almost always on the first syllable.",
  },
  section1: { ua: "1) Алфавіт", ru: "1) Алфавит", en: "1) Alphabet" },
  section2: { ua: "2) Голосні", ru: "2) Гласные", en: "2) Vowels" },
  section3: { ua: "3) Особливі приголосні", ru: "3) Особые согласные", en: "3) Special consonants" },
  section4: { ua: "4) Наголос", ru: "4) Ударение", en: "4) Stress" },
  section5: { ua: "5) Тренування вимови 🧠", ru: "5) Тренировка произношения 🧠", en: "5) Pronunciation practice 🧠" },
  section6: { ua: "6) Міні-тренажер 🔥", ru: "6) Мини-тренажёр 🔥", en: "6) Mini trainer 🔥" },
  example: { ua: "Приклад:", ru: "Пример:", en: "Example:" },
  stressSk: {
    ua: "У словацькій мові наголос майже завжди на першому складі:",
    ru: "В словацком языке ударение почти всегда на первом слоге:",
    en: "In Slovak, stress is almost always on the first syllable:",
  },
  stressCs: {
    ua: "У чеській мові наголос майже завжди на першому складі:",
    ru: "В чешском языке ударение почти всегда на первом слоге:",
    en: "In Czech, stress is almost always on the first syllable:",
  },
  miniIntro: {
    ua: "Тут можна реально потренуватись: тести + слухання + диктант.",
    ru: "Тут можно реально потренироваться: тесты + слушание + диктант.",
    en: "Here you can really practice: quiz + listening + dictation.",
  },
  quiz: { ua: "Тест", ru: "Тест", en: "Quiz" },
  listen: { ua: "Слухання", ru: "Слушание", en: "Listening" },
  type: { ua: "Диктант", ru: "Диктант", en: "Dictation" },
  question: { ua: "Питання", ru: "Вопрос", en: "Question" },
  round: { ua: "Раунд", ru: "Раунд", en: "Round" },
  score: { ua: "Рахунок", ru: "Счёт", en: "Score" },
  word: { ua: "Слово", ru: "Слово", en: "Word" },
  restart: { ua: "Почати заново", ru: "Начать заново", en: "Start over" },
  done: { ua: "Готово! 🎉", ru: "Готово! 🎉", en: "Done! 🎉" },
  result: { ua: "Результат", ru: "Результат", en: "Result" },
  retry: { ua: "Пройти ще раз", ru: "Пройти ещё раз", en: "Try again" },
  listenPrompt: {
    ua: "Знайди слово з літерою:",
    ru: "Найди слово с буквой:",
    en: "Find the word with the letter:",
  },
  dictationPrompt: {
    ua: "Прослухай і напиши слово:",
    ru: "Прослушай и напиши слово:",
    en: "Listen and type the word:",
  },
  inputPlaceholder: {
    ua: "Введи слово...",
    ru: "Введи слово...",
    en: "Type the word...",
  },
  check: { ua: "Перевірити", ru: "Проверить", en: "Check" },
  correct: { ua: "Правильно!", ru: "Правильно!", en: "Correct!" },
  wrongPrefix: {
    ua: "Неправильно. Правильно:",
    ru: "Неправильно. Правильно:",
    en: "Incorrect. Correct answer:",
  },
  next: { ua: "Далі →", ru: "Далее →", en: "Next →" },
  tryAgain: { ua: "Спробувати знову", ru: "Попробовать снова", en: "Try again" },
};

export default function AlphabetPage({ forcedLang }: Props) {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const uiLang = forcedLang ?? lang;
  const isCzech = courseId === "cs";

  const vowels = isCzech ? CS_VOWELS : SK_VOWELS;
  const consonants = isCzech ? CS_CONSONANTS : SK_CONSONANTS;
  const practiceWords = isCzech ? CS_PRACTICE_WORDS : SK_PRACTICE_WORDS;
  const dictationPool = useMemo(
    () => (isCzech ? CS_PRACTICE_WORDS : SK_PRACTICE_WORDS),
    [isCzech]
  );

  const [tab, setTab] = useState<"quiz" | "listen" | "type">("quiz");

  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);
  const quiz = useMemo(
    () => shuffle(isCzech ? CS_LETTER_QUESTIONS : SK_LETTER_QUESTIONS).slice(0, 6),
    [isCzech]
  );

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
    const base = isCzech ? "/audio/cs/words" : "/audio/words";
    const src = `${base}/${key}.mp3`;

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
          {isCzech ? tr(UI.titleCs, uiLang) : tr(UI.titleSk, uiLang)}
        </h1>
        <p className="mt-2 text-slate-700">
          {isCzech ? tr(UI.introCs, uiLang) : tr(UI.introSk, uiLang)}
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{tr(UI.section1, uiLang)}</h2>
        <div className="rounded-xl border bg-white p-4 text-sm leading-relaxed">
          {!isCzech
            ? "a, á, ä, b, c, č, d, ď, e, é, f, g, h, ch, i, í, j, k, l, ľ, m, n, ň, o, ó, ô, p, q, r, ŕ, s, š, t, ť, u, ú, v, w, x, y, ý, z, ž"
            : "a, á, b, c, č, d, ď, e, é, ě, f, g, h, ch, i, í, j, k, l, m, n, ň, o, ó, p, q, r, ř, s, š, t, ť, u, ú, ů, v, w, x, y, ý, z, ž"}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{tr(UI.section2, uiLang)}</h2>
        <LetterList
          items={vowels}
          lang={uiLang}
          exampleLabel={tr(UI.example, uiLang)}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{tr(UI.section3, uiLang)}</h2>
        <LetterList
          items={consonants}
          lang={uiLang}
          exampleLabel={tr(UI.example, uiLang)}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">{tr(UI.section4, uiLang)}</h2>
        <div className="rounded-xl border bg-white p-4">
          {isCzech ? tr(UI.stressCs, uiLang) : tr(UI.stressSk, uiLang)}
          <div className="mt-2 flex items-center gap-2">
            <b>{isCzech ? "PRA-ha" : "PRÁ-ca"}</b>
            <SpeakButton text={isCzech ? "Praha" : "práca"} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{tr(UI.section5, uiLang)}</h2>
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
            <h2 className="text-xl font-semibold">{tr(UI.section6, uiLang)}</h2>
            <p className="mt-1 text-sm text-slate-700">{tr(UI.miniIntro, uiLang)}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTab("quiz")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "quiz" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {tr(UI.quiz, uiLang)}
            </button>
            <button
              onClick={() => setTab("listen")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "listen" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {tr(UI.listen, uiLang)}
            </button>
            <button
              onClick={() => setTab("type")}
              className={`rounded-xl border px-3 py-2 text-sm ${
                tab === "type" ? "bg-black text-white" : "hover:bg-slate-50"
              }`}
            >
              {tr(UI.type, uiLang)}
            </button>
          </div>
        </div>

        {tab === "quiz" && (
          <div className="space-y-4">
            {!qDone ? (
              <>
                <div className="text-sm text-slate-500">
                  {tr(UI.question, uiLang)} {qIndex + 1} / {quiz.length} • {tr(UI.score, uiLang)}: {qScore}
                </div>

                <div className="rounded-2xl border p-4">
                  <div className="font-semibold">{tr(quiz[qIndex].question, uiLang)}</div>

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
                  {tr(UI.restart, uiLang)}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{tr(UI.done, uiLang)}</div>
                <div className="text-slate-700">
                  {tr(UI.result, uiLang)}: <b>{qScore}</b> / <b>{quiz.length}</b>
                </div>
                <button
                  onClick={resetQuiz}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
                  {tr(UI.retry, uiLang)}
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
                  {tr(UI.round, uiLang)} {lIndex + 1} / {listenRounds.length} • {tr(UI.score, uiLang)}: {lScore}
                </div>

                <div className="space-y-3 rounded-2xl border p-4">
                  <div className="font-semibold">
                    {tr(UI.listenPrompt, uiLang)} "{listenRounds[lIndex].target}"
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
                  {tr(UI.restart, uiLang)}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{tr(UI.done, uiLang)}</div>
                <div className="text-slate-700">
                  {tr(UI.result, uiLang)}: <b>{lScore}</b> / <b>{listenRounds.length}</b>
                </div>
                <button
                  onClick={resetListen}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
                  {tr(UI.retry, uiLang)}
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
                  {tr(UI.word, uiLang)} {tIndex + 1} / {typeWords.length} • {tr(UI.score, uiLang)}: {tScore}
                </div>

                <div className="space-y-3 rounded-2xl border p-4">
                  <div className="font-semibold">{tr(UI.dictationPrompt, uiLang)}</div>

                  <div className="flex justify-center">
                    <SpeakButton text={typeWords[tIndex]} />
                  </div>

                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={status !== "idle"}
                    placeholder={tr(UI.inputPlaceholder, uiLang)}
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
                      {tr(UI.check, uiLang)}
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {status === "correct" ? (
                        <div className="font-semibold text-green-600">
                          ✅ {tr(UI.correct, uiLang)}
                        </div>
                      ) : (
                        <div className="font-semibold text-red-600">
                          ❌ {tr(UI.wrongPrefix, uiLang)} <b>{typeWords[tIndex]}</b>
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
                          {tr(UI.next, uiLang)}
                        </button>

                        <button
                          onClick={() => {
                            setInput("");
                            setStatus("idle");
                          }}
                          className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                        >
                          {tr(UI.tryAgain, uiLang)}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={resetDictationWithNewWords}
                  className="rounded-xl border px-4 py-2 hover:bg-slate-50"
                >
                  {tr(UI.restart, uiLang)}
                </button>
              </>
            ) : (
              <div className="space-y-3 rounded-2xl border p-4">
                <div className="text-lg font-semibold">{tr(UI.done, uiLang)}</div>
                <div className="text-slate-700">
                  {tr(UI.result, uiLang)}: <b>{tScore}</b> / <b>{typeWords.length}</b>
                </div>
                <button
                  onClick={resetDictationWithNewWords}
                  className="rounded-xl bg-black px-4 py-2 text-white"
                >
                  {tr(UI.retry, uiLang)}
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}