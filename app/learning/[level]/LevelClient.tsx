"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SpeakButton from "@/app/components/SpeakButton";
import { useLanguage } from "@/lib/src/useLanguage";
import type { Lang } from "@/lib/src/language";
import { finishLessonQuiz } from "@/lib/src/progress";
import ReportErrorButton from "@/app/components/ReportErrorButton";

// ✅ беремо фрази з централізованого словника
import { A0_PHRASES, phraseKey } from "@/app/learning/phrases/a0";

export type Word = {
  sk: string;
  ua: string;
  ru?: string;
  ipa?: string;
  img?: string;
  imgCredit?: string;

  // ✅ для вправи "Збери речення" (необов'язково)
  phrase?: {
    sk: string;
    ua: string;
    ru?: string;
    tokens: string[];
  };
};

function getNextLevelId(levelId: string) {
  const m = /^([a-z]\d)-(\d+)$/.exec(levelId);
  if (m) {
    const band = m[1];
    const n = Number(m[2]);

    if (band === "a0" && Number.isFinite(n) && n >= 30) return "a1-1";
    if (Number.isFinite(n)) return `${band}-${n + 1}`;
  }

  const n = Number(levelId);
  if (Number.isFinite(n)) return String(n + 1);
  return levelId;
}

type ExerciseKind =
  | "chooseTranslation"
  | "chooseSlovak"
  | "writeWord"
  | "audioQuiz"
  | "matchColumns"
  | "buildSentence";

type ExerciseDef = {
  kind: ExerciseKind;
  title: string;
  mode: "perWord" | "whole";
};

const EXERCISES: ExerciseDef[] = [
  { kind: "chooseTranslation", title: "Обери переклад", mode: "perWord" },
  { kind: "chooseSlovak", title: "Обери слово словацькою", mode: "perWord" },
  { kind: "writeWord", title: "Напиши словацькою", mode: "perWord" },
  { kind: "audioQuiz", title: "Аудіо-вправа", mode: "perWord" },
  { kind: "matchColumns", title: "Пари в 2 колонки", mode: "whole" },
  { kind: "buildSentence", title: "Збери речення", mode: "perWord" },
];

// ------------------ helpers ------------------

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalizeSentence(s: string) {
  return s
    .trim()
    .replace(/\s+/g, " ")
    .replace(/\s+([.,!?;:])/g, "$1")
    .toLowerCase();
}

const trWord = (w: Word, lang: Lang) => (lang === "ru" ? w.ru ?? w.ua : w.ua);

function getPhraseForWord(word: Word, lang: Lang, levelId: string) {
  // 1) якщо фраза прямо в слові
  if (word.phrase) {
    const target =
      lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;
    return {
      sk: word.phrase.sk,
      target,
      tokens: word.phrase.tokens,
    };
  }

  // 2) ✅ головне: шукаємо в A0_PHRASES по ключу (sk + ua + levelId)
  const k = phraseKey(word.sk, word.ua, levelId);
  const p = A0_PHRASES[k];
  if (p) {
    const target = lang === "ru" ? p.ru ?? p.ua : p.ua;
    return { sk: p.sk, target, tokens: p.tokens };
  }

  // 3) fallback якщо фрази нема
  const sk = `To je ${word.sk}.`;
  const target = lang === "ru" ? `Это ${word.ru ?? word.ua}.` : `Це ${word.ua}.`;
  const tokens = ["To", "je", word.sk, "."]; // ✅ пунктуація як токен
  return { sk, target, tokens };
}

function useAutoSpeak(text: string, enabled: boolean) {
  const lastRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    if (lastRef.current === text) return;
    lastRef.current = text;

    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const skVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("sk")) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith("cs")) ??
      null;

    if (skVoice) utter.voice = skVoice;

    synth.speak(utter);
  }, [text, enabled]);
}

// ------------------ main ------------------

export default function LevelClient({
  levelId,
  words,

  // ✅ NEW (optional): контроль переходу на next
  canGoNext = true,
  lockedReason,
  onLockedNextRedirect = "/learning",
}: {
  levelId: string;
  words: Word[];

  canGoNext?: boolean;
  lockedReason?: string;
  onLockedNextRedirect?: string;
}) {
  const [mode, setMode] = useState<"learn" | "quiz">("learn");

  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const router = useRouter();
  const nextLevelId = getNextLevelId(levelId);
  const { lang } = useLanguage();

  const totalQuestions = useMemo(() => {
    return EXERCISES.reduce(
      (sum, ex) => sum + (ex.mode === "perWord" ? words.length : words.length),
      0
    );
  }, [words.length]);

  // =============== LEARN MODE ===============
  if (mode === "learn") {
    const word = words[wordIndex];

    return (
      <div className="space-y-6">
        <div className="sticky top-2 z-10 rounded-xl border bg-white/90 backdrop-blur px-4 py-2 text-sm font-semibold">
          Переглянуто: {wordIndex + 1}/{words.length}
        </div>

        <div className="rounded-2xl border bg-white p-6 text-center space-y-3">
          {word?.img ? (
            <div className="flex flex-col items-center gap-1">
              <img
                src={word.img}
                alt={word.sk}
                className="mx-auto h-52 w-52 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-2xl object-contain border bg-slate-50"
              />
              {word.imgCredit && (
                <div className="text-xs text-slate-500">{word.imgCredit}</div>
              )}
            </div>
          ) : (
            <div className="mx-auto h-40 w-40 rounded-2xl border bg-slate-50 flex items-center justify-center text-slate-400">
              📷
            </div>
          )}

          <div className="text-3xl font-bold">{word.sk}</div>
          <div className="text-slate-600">{trWord(word, lang)}</div>
          <SpeakButton text={word.sk} />
        </div>

        <div className="flex justify-between">
          <button
            disabled={wordIndex === 0}
            onClick={() => setWordIndex((i) => i - 1)}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            ← Назад
          </button>

          {wordIndex < words.length - 1 ? (
            <button
              onClick={() => setWordIndex((i) => i + 1)}
              className="px-4 py-2 border rounded-xl"
            >
              Далі →
            </button>
          ) : (
            <button
              onClick={() => {
                setMode("quiz");
                setExerciseIndex(0);
                setWordIndex(0);
                setScore(0);
                setFinished(false);
              }}
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              Почати вправи 🧠
            </button>
          )}
        </div>
      </div>
    );
  }

  // =============== QUIZ MODE ===============
  const exercise = EXERCISES[exerciseIndex];
  const currentWord = words[wordIndex];

  function finishLesson(finalScore: number) {
    setFinished(true);
    try {
      finishLessonQuiz(levelId, finalScore, totalQuestions);
      fetch("/api/progress/lesson-done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ levelId }),
      }).catch(() => { });
    } catch (e) {
      console.error("Save progress error", e);
    }
  }

  function nextPerWord(correct: boolean) {
    if (correct) setScore((s) => s + 1);

    const lastWord = wordIndex >= words.length - 1;
    const lastExercise = exerciseIndex >= EXERCISES.length - 1;

    if (!lastWord) {
      setWordIndex((i) => i + 1);
      return;
    }

    if (!lastExercise) {
      setExerciseIndex((e) => e + 1);
      setWordIndex(0);
      return;
    }

    const finalScore = score + (correct ? 1 : 0);
    finishLesson(finalScore);
  }

  function doneWhole(correctCount: number) {
    setScore((s) => s + correctCount);

    const lastExercise = exerciseIndex >= EXERCISES.length - 1;
    if (!lastExercise) {
      setExerciseIndex((e) => e + 1);
      setWordIndex(0);
      return;
    }

    finishLesson(score + correctCount);
  }

  if (finished) {
    return (
      <div className="rounded-2xl border bg-white p-6 space-y-3">
        <div className="text-xl font-semibold">Рівень пройдено 🎉</div>
        <div className="text-slate-600">
          Результат: <b>{score}</b> / <b>{totalQuestions}</b>
        </div>

        {!canGoNext && (
          <div className="rounded-xl border bg-slate-50 p-3 text-sm text-slate-700">
            <div className="font-semibold">Наступний урок зараз закритий 🔒</div>
            <div className="mt-1">
              {lockedReason ??
                "У безкоштовній версії є ліміт/послідовність рівнів. Повернись до списку уроків."}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              setMode("learn");
              setExerciseIndex(0);
              setWordIndex(0);
              setScore(0);
              setFinished(false);
            }}
            className="px-4 py-2 border rounded-xl"
          >
            Переглянути слова знову
          </button>

          <button
            onClick={() => {
              if (!canGoNext) {
                router.push(onLockedNextRedirect);
                return;
              }
              router.push(`/learning/${nextLevelId}`);
            }}
            className={[
              "px-4 py-2 rounded-xl text-white",
              canGoNext ? "bg-black" : "bg-black/40 cursor-not-allowed",
            ].join(" ")}
            disabled={!canGoNext}
            title={!canGoNext ? "Недоступно у free" : undefined}
          >
            Перейти до наступного рівня →
          </button>

          {!canGoNext && (
            <button
              onClick={() => router.push(onLockedNextRedirect)}
              className="px-4 py-2 border rounded-xl"
            >
              До списку уроків
            </button>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-2xl border bg-white p-6 space-y-4">
      <div className="text-sm text-slate-500">
        Вправа {exerciseIndex + 1} / {EXERCISES.length} •{" "}
        {exercise.mode === "perWord" ? (
          <>
            Слово {wordIndex + 1} / {words.length}
          </>
        ) : (
          <>Урок</>
        )}
      </div>

      <ReportErrorButton
        context={{
          lessonId: levelId,
          exercise: `${mode}:${exercise.kind}`,
          actionIdx: exercise.mode === "perWord" ? wordIndex + 1 : undefined,
          sk: exercise.mode === "perWord" ? currentWord?.sk : undefined,
          ua: exercise.mode === "perWord" ? currentWord?.ua : undefined,
          ru: exercise.mode === "perWord" ? currentWord?.ru : undefined,
          key:
            exercise.mode === "perWord" && currentWord?.sk && currentWord?.ua
              ? phraseKey(currentWord.sk, currentWord.ua, levelId)
              : undefined,
        }}
      />

      {exercise.kind === "chooseTranslation" && (
        <ChooseTranslation
          word={currentWord}
          words={words}
          lang={lang}
          onNext={nextPerWord}
        />
      )}

      {exercise.kind === "chooseSlovak" && (
        <ChooseSlovak
          word={currentWord}
          words={words}
          lang={lang}
          onNext={nextPerWord}
        />
      )}

      {exercise.kind === "writeWord" && (
        <WriteWord word={currentWord} lang={lang} onNext={nextPerWord} />
      )}

      {exercise.kind === "audioQuiz" && (
        <AudioQuiz word={currentWord} words={words} onNext={nextPerWord} />
      )}

      {exercise.kind === "matchColumns" && (
        <MatchColumns
          words={words}
          lang={lang}
          onDone={(correct) => doneWhole(correct)}
        />
      )}

      {exercise.kind === "buildSentence" && (
        <BuildSentence
          word={currentWord}
          lang={lang}
          levelId={levelId}
          onNext={nextPerWord}
        />
      )}
    </div>
  );
}

// ================= EXERCISES =================

function WordImage({
  word,
  size = "medium",
}: {
  word: Word;
  size?: "small" | "medium" | "large";
}) {
  if (!word?.img) return null;

  const sizeClass =
    size === "large"
      ? "h-52 sm:h-64 md:h-72"
      : size === "small"
        ? "h-40 sm:h-48 md:h-52"
        : "h-48 sm:h-56 md:h-60";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizeClass} overflow-hidden rounded-2xl`}>
        <img
          src={word.img}
          alt={word.sk}
          className="h-full w-full object-cover scale-105 object-center"
        />
      </div>

      {word.imgCredit && (
        <div className="text-xs text-slate-500">{word.imgCredit}</div>
      )}
    </div>
  );
}

// 1️⃣ вибір перекладу
function ChooseTranslation({
  word,
  words,
  onNext,
  lang,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => trWord(w, lang));
  }, [word, words, lang]);

  useAutoSpeak(word.sk, true);

  const correctText = trWord(word, lang);

  return (
    <>
      <WordImage word={word} />

      <div className="text-lg font-semibold">
        Обери переклад: <span className="font-bold">{word.sk}</span>
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onNext(opt === correctText)}
            className="rounded-xl border px-4 py-3 hover:bg-slate-50 text-left"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// 2️⃣ вибір словацького слова
function ChooseSlovak({
  word,
  words,
  onNext,
  lang,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => w.sk);
  }, [word, words]);

  function speak(text: string) {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const skVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("sk")) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith("cs")) ??
      null;

    if (skVoice) utter.voice = skVoice;
    synth.speak(utter);
  }

  return (
    <>
      <div className="text-lg font-semibold">
        <WordImage word={word} />
        Обери слово словацькою:{" "}
        <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              speak(opt);
              onNext(opt === word.sk);
            }}
            className="rounded-xl border px-4 py-3 hover:bg-slate-50 text-left"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// 3️⃣ введення слова
function WriteWord({
  word,
  onNext,
  lang,
}: {
  word: Word;
  onNext: (c: boolean) => void;
  lang: Lang;
}) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    setValue("");
    setStatus("idle");
    setCorrectAnswer(null);
  }, [word.sk]);

  function speak(text: string) {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const skVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("sk")) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith("cs")) ??
      null;

    if (skVoice) utter.voice = skVoice;
    synth.speak(utter);
  }

  function normalize(s: string) {
    return s.trim().toLowerCase();
  }

  function check() {
    const ok = normalize(value) === normalize(word.sk);
    setStatus(ok ? "correct" : "wrong");
    setCorrectAnswer(word.sk);
    speak(word.sk);
  }

  function next() {
    onNext(status === "correct");
  }

  const inputClass =
    status === "correct"
      ? "border-green-500"
      : status === "wrong"
        ? "border-red-500"
        : "border-slate-300";

  return (
    <>
      <WordImage word={word} />
      <div className="text-lg font-semibold">
        Напиши словацькою:{" "}
        <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      <div className="space-y-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={status !== "idle"}
          className={`w-full border rounded-xl px-3 py-2 ${inputClass}`}
          placeholder="Введи слово..."
        />

        {status === "idle" ? (
          <button
            onClick={check}
            className="px-4 py-2 rounded-xl bg-black text-white"
            disabled={!value.trim()}
          >
            Перевірити
          </button>
        ) : (
          <div className="space-y-2">
            {status === "correct" ? (
              <div className="font-semibold text-green-600">✅ Правильно!</div>
            ) : (
              <div className="font-semibold text-red-600">
                ❌ Неправильно. Правильно: <b>{correctAnswer}</b>
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={() => speak(word.sk)}
                className="px-4 py-2 border rounded-xl"
              >
                🔊 Прослухати
              </button>

              <button
                onClick={next}
                className="px-4 py-2 rounded-xl bg-black text-white"
              >
                Далі →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// 4️⃣ аудіо-вправа
function AudioQuiz({
  word,
  words,
  onNext,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => w.sk);
  }, [word, words]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();

    const utter = new SpeechSynthesisUtterance(word.sk);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const skVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("sk")) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith("cs")) ??
      null;

    if (skVoice) utter.voice = skVoice;

    synth.speak(utter);
  }, [word.sk]);

  return (
    <>
      <div className="text-lg font-semibold">
        Прослухай слово і обери правильне:
      </div>

      <div className="flex justify-center">
        <SpeakButton text={word.sk} />
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onNext(opt === word.sk)}
            className="rounded-xl border px-4 py-3 hover:bg-slate-50 text-left"
          >
            {opt}
          </button>
        ))}
      </div>
    </>
  );
}

// 5️⃣ ПАРИ В 2 КОЛОНКИ (whole)
function MatchColumns({
  words,
  lang,
  onDone,
}: {
  words: Word[];
  lang: Lang;
  onDone: (correctCount: number) => void;
}) {
  const left = useMemo(() => shuffle(words.map((w) => w.sk)), [words]);
  const right = useMemo(
    () => shuffle(words.map((w) => trWord(w, lang))),
    [words, lang]
  );

  const mapSkToTr = useMemo(() => {
    const m = new Map<string, string>();
    words.forEach((w) => m.set(w.sk, trWord(w, lang)));
    return m;
  }, [words, lang]);

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);

  const [matchedLeft, setMatchedLeft] = useState<Set<string>>(() => new Set());
  const [matchedRight, setMatchedRight] = useState<Set<string>>(() => new Set());

  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const [shakeWrong, setShakeWrong] = useState(false);
  const [wrongPair, setWrongPair] = useState<{ l: string; r: string } | null>(
    null
  );

  const MAX_WRONG = 3;

  useEffect(() => {
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedLeft(new Set());
    setMatchedRight(new Set());
    setCorrectCount(0);
    setWrongCount(0);
    setShakeWrong(false);
    setWrongPair(null);
  }, [words, lang]);

  const doneAll = matchedLeft.size >= words.length;
  const doneByWrong = wrongCount >= MAX_WRONG;
  const locked = doneAll || doneByWrong;

  function clearSelection() {
    if (locked) return;
    setSelectedLeft(null);
    setSelectedRight(null);
    setWrongPair(null);
    setShakeWrong(false);
  }

  useEffect(() => {
    if (locked) return;
    if (!selectedLeft || !selectedRight) return;

    const correct = mapSkToTr.get(selectedLeft) === selectedRight;

    if (correct) {
      setCorrectCount((c) => c + 1);
      setMatchedLeft((prev) => new Set(prev).add(selectedLeft));
      setMatchedRight((prev) => new Set(prev).add(selectedRight));

      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
      return;
    }

    setWrongCount((w) => w + 1);
    setWrongPair({ l: selectedLeft, r: selectedRight });
    setShakeWrong(true);

    const t = setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
      setWrongPair(null);
      setShakeWrong(false);
    }, 700);

    return () => clearTimeout(t);
  }, [selectedLeft, selectedRight, mapSkToTr, locked]);

  function leftBtnClass(sk: string) {
    const isMatched = matchedLeft.has(sk);
    const isSelected = selectedLeft === sk;
    const isWrong = wrongPair?.l === sk;

    return [
      "w-full text-left rounded-xl border px-4 py-3 transition",
      locked || isMatched
        ? "opacity-50 cursor-not-allowed bg-slate-50"
        : "hover:bg-slate-50",
      isSelected ? "border-green-600 ring-4 ring-green-200 bg-green-50" : "",
      isWrong ? "border-red-500 bg-red-50" : "",
    ].join(" ");
  }

  function rightBtnClass(tr: string) {
    const isMatched = matchedRight.has(tr);
    const isSelected = selectedRight === tr;
    const isWrong = wrongPair?.r === tr;

    return [
      "w-full text-left rounded-xl border px-4 py-3 transition",
      locked || isMatched
        ? "opacity-50 cursor-not-allowed bg-slate-50"
        : "hover:bg-slate-50",
      isSelected ? "border-black ring-2 ring-black/10 bg-slate-50" : "",
      isWrong ? "border-red-500 bg-red-50" : "",
    ].join(" ");
  }

  const canNext = locked;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">Підбери пари</div>
          <div className="text-sm text-slate-500">
            ✅ Правильно: {correctCount} / {words.length}
            <span className="mx-2">•</span>
            ❌ Помилки: {wrongCount} / {MAX_WRONG}
          </div>

          {doneByWrong && (
            <div className="text-sm text-red-600 font-semibold mt-1">
              Ліміт помилок вичерпано — можна перейти далі.
            </div>
          )}

          {doneAll && (
            <div className="text-sm text-green-700 font-semibold mt-1">
              Усі пари зібрано — можна перейти далі.
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearSelection}
            disabled={locked}
            className="px-4 py-2 border rounded-xl disabled:opacity-50"
          >
            Очистити
          </button>

          <button
            disabled={!canNext}
            onClick={() => onDone(correctCount)}
            className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
          >
            Наступне →
          </button>
        </div>
      </div>

      <div
        className={[
          "grid grid-cols-2 gap-4",
          shakeWrong ? "animate-[shake_0.2s_linear_0s_2]" : "",
        ].join(" ")}
      >
        <div className="space-y-2">
          {left.map((sk) => (
            <button
              key={sk}
              disabled={locked || matchedLeft.has(sk)}
              onClick={() => {
                if (locked) return;
                setSelectedLeft(sk);
              }}
              className={leftBtnClass(sk)}
            >
              {sk}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {right.map((t) => (
            <button
              key={t}
              disabled={locked || matchedRight.has(t)}
              onClick={() => {
                if (locked) return;
                setSelectedRight(t);
              }}
              className={rightBtnClass(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-6px);
          }
          50% {
            transform: translateX(6px);
          }
          75% {
            transform: translateX(-6px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}

// 6️⃣ ЗБЕРИ РЕЧЕННЯ (perWord)
function BuildSentence({
  word,
  lang,
  levelId,
  onNext,
}: {
  word: Word;
  lang: Lang;
  levelId: string;
  onNext: (c: boolean) => void;
}) {
  const phrase = useMemo(
    () => getPhraseForWord(word, lang, levelId),
    [word, lang, levelId]
  );

  const baseTokens = useMemo(() => phrase.tokens, [phrase.tokens]);
  const [available, setAvailable] = useState<string[]>(() => shuffle(baseTokens));
  const [picked, setPicked] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong">("idle");

  useEffect(() => {
    setAvailable(shuffle(baseTokens));
    setPicked([]);
    setStatus("idle");
  }, [word.sk, lang, baseTokens.join("|")]);

  function speak(text: string) {
    if (typeof window === "undefined") return;
    const synth = window.speechSynthesis;
    if (!synth) return;

    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "sk-SK";
    utter.rate = 1;
    utter.pitch = 1;

    const voices = synth.getVoices();
    const skVoice =
      voices.find((v) => v.lang?.toLowerCase().startsWith("sk")) ??
      voices.find((v) => v.lang?.toLowerCase().startsWith("cs")) ??
      null;

    if (skVoice) utter.voice = skVoice;

    synth.speak(utter);
  }

  function pickToken(t: string, idx: number) {
    if (status !== "idle") return;
    setPicked((p) => [...p, t]);
    setAvailable((a) => a.filter((_, i) => i !== idx));
  }

  function unpickLast() {
    if (status !== "idle") return;
    setPicked((p) => {
      if (p.length === 0) return p;
      const last = p[p.length - 1];
      setAvailable((a) => [...a, last]);
      return p.slice(0, -1);
    });
  }

  function clear() {
    if (status !== "idle") return;
    setPicked([]);
    setAvailable(shuffle(baseTokens));
  }

  function check() {
    const built = picked.join(" ");
    const target = baseTokens.join(" ");
    const ok = normalizeSentence(built) === normalizeSentence(target);
    setStatus(ok ? "correct" : "wrong");
    speak(phrase.sk);
  }

  function next() {
    onNext(status === "correct");
  }

  // ✅ НЕ додаємо "." вручну — пунктуація вже є токеном
  const builtPretty = picked
    .join(" ")
    .replace(/\s+([.,!?;:])/g, "$1");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">B) Збери речення</div>
          <div className="text-sm text-slate-500">
            Ціль:{" "}
            <span className="text-slate-800 font-medium">{phrase.target}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={clear} className="px-4 py-2 border rounded-xl">
            Очистити
          </button>

          {status === "idle" ? (
            <button
              onClick={check}
              disabled={picked.length === 0}
              className="px-4 py-2 rounded-xl bg-black text-white disabled:opacity-50"
            >
              Перевірити
            </button>
          ) : (
            <button
              onClick={next}
              className="px-4 py-2 rounded-xl bg-black text-white"
            >
              Наступне →
            </button>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-4 space-y-2">
        <div className="text-sm text-slate-500">Твоє речення:</div>
        <div className="text-lg">{picked.length ? builtPretty : "—"}</div>
        <div className="text-sm text-slate-500">Натискай слова нижче.</div>
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((t, idx) => (
          <button
            key={`${t}-${idx}`}
            onClick={() => pickToken(t, idx)}
            className="px-3 py-2 border rounded-xl hover:bg-slate-50"
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={unpickLast}
          disabled={picked.length === 0 || status !== "idle"}
          className="px-3 py-2 border rounded-xl disabled:opacity-50"
        >
          ← Назад
        </button>
      </div>

      {status === "correct" && (
        <div className="font-semibold text-green-600">✅ Правильно!</div>
      )}
      {status === "wrong" && (
        <div className="font-semibold text-red-600">
          ❌ Неправильно. Правильно: <b>{baseTokens.join(" ")}</b>
        </div>
      )}
    </div>
  );
}
