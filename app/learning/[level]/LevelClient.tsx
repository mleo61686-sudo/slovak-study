"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
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

function getImgFit(word?: Word) {
  return word?.imgCredit ? "cover" : "contain";
}

function getImgPos(word?: Word) {
  return word?.imgCredit ? "object-top" : "object-center";
}

function getImgAspect(word?: Word) {
  return word?.imgCredit
    ? "aspect-[3/4] sm:aspect-[4/5] md:aspect-[3/4]"
    : "aspect-[3/4]";
}

function getPhraseForWord(word: Word, lang: Lang, levelId: string) {
  // 1) якщо фраза прямо в слові
  if (word.phrase) {
    const target =
      lang === "ru" ? word.phrase.ru ?? word.phrase.ua : word.phrase.ua;
    return { sk: word.phrase.sk, target, tokens: word.phrase.tokens };
  }

  // 2) шукаємо в A0_PHRASES по ключу
  const k = phraseKey(word.sk, word.ua, levelId);
  const p = A0_PHRASES[k];
  if (p) {
    const target = lang === "ru" ? p.ru ?? p.ua : p.ua;
    return { sk: p.sk, target, tokens: p.tokens };
  }

  // 3) fallback якщо фрази нема
  const sk = `To je ${word.sk}.`;
  const target =
    lang === "ru" ? `Это ${word.ru ?? word.ua}.` : `Це ${word.ua}.`;
  const tokens = ["To", "je", word.sk, "."];
  return { sk, target, tokens };
}

// ✅ same hashing scheme as SpeakButton (local mp3)
async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function guessKind(text: string): "word" | "phrase" {
  return /[ ,.!?;:]/.test(text.trim()) ? "phrase" : "word";
}

async function buildLocalUrl(text: string, forcedKind?: "word" | "phrase") {
  const clean = (text ?? "").trim();
  const kind = forcedKind ?? guessKind(clean);
  const h = await sha1Hex(`${kind}:${clean}`);
  return kind === "word" ? `/audio/words/${h}.mp3` : `/audio/phrases/${h}.mp3`;
}

// ✅ play local audio (tries word/phrase fallback). Call this ONLY inside user gesture.
async function playLocal(text: string) {
  const clean = (text ?? "").trim();
  if (!clean) return;

  const kind = guessKind(clean);
  const url1 = await buildLocalUrl(clean, kind);
  const otherKind: "word" | "phrase" = kind === "word" ? "phrase" : "word";
  const url2 = await buildLocalUrl(clean, otherKind);

  try {
    await new Audio(url1).play();
  } catch {
    try {
      await new Audio(url2).play();
    } catch {
      // ignore
    }
  }
}

// ------------------ main ------------------

export default function LevelClient({
  levelId,
  words,
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

  // ✅ ключ для автоплею (залишаємо для 1 та 4 вправ, як було)
  const [quizAutoKey, setQuizAutoKey] = useState(0);

  const router = useRouter();
  const nextLevelId = getNextLevelId(levelId);
  const { lang } = useLanguage();

  // preload наступного зображення
  useEffect(() => {
    if (typeof window === "undefined") return;

    const nextImg = words[wordIndex + 1]?.img;
    if (!nextImg) return;

    const pre = new window.Image();
    pre.src = nextImg;
  }, [words, wordIndex]);

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

        <div className="mx-auto w-full max-w-[720px] rounded-2xl border bg-white p-6 text-center space-y-3">
          {word?.img ? (
            <div className="flex flex-col items-center gap-2">
              <div className="mx-auto w-full max-w-[260px] sm:max-w-[320px] md:max-w-[420px] lg:max-w-[270px]">
                <div
                  className={[
                    "relative overflow-hidden rounded-2xl border bg-slate-50",
                    getImgAspect(word),
                  ].join(" ")}
                >
                  <Image
                    src={word.img}
                    alt={word.sk}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 768px) 320px, (max-width: 1024px) 340px, 360px"
                    className={[
                      getImgFit(word) === "cover"
                        ? "object-cover"
                        : "object-contain",
                      getImgPos(word),
                      getImgFit(word) === "contain" ? "p-2" : "",
                    ].join(" ")}
                    priority={wordIndex === 0}
                  />
                </div>
              </div>

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

          <div className="flex justify-center">
            <SpeakButton text={word.sk} autoPlayKey={word.sk} />
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[720px] justify-between">
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
                // ✅ gesture тут!
                setQuizAutoKey((k) => k + 1);

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
      }).catch(() => {});
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
          quizAutoKey={quizAutoKey}
        />
      )}

      {exercise.kind === "chooseSlovak" && (
        <ChooseSlovak word={currentWord} words={words} lang={lang} onNext={nextPerWord} />
      )}

      {exercise.kind === "writeWord" && (
        <WriteWord word={currentWord} lang={lang} onNext={nextPerWord} />
      )}

      {exercise.kind === "audioQuiz" && (
        <AudioQuiz
          word={currentWord}
          words={words}
          onNext={nextPerWord}
          quizAutoKey={quizAutoKey}
        />
      )}

      {exercise.kind === "matchColumns" && (
        <MatchColumns words={words} lang={lang} onDone={(c) => doneWhole(c)} />
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
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (!word?.img) return;
    setReady(false);

    const img = new window.Image();
    img.src = word.img;

    if (img.complete) setReady(true);
  }, [word?.img]);

  if (!word?.img) return null;

  const widthClass =
    size === "large"
      ? "w-[260px] sm:w-[320px] md:w-[340px] lg:w-[360px]"
      : size === "small"
      ? "w-[220px] sm:w-[260px] md:w-[280px] lg:w-[300px]"
      : "w-[240px] sm:w-[300px] md:w-[320px] lg:w-[340px]";

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={["mx-auto", widthClass].join(" ")}>
        <div
          className={[
            "relative overflow-hidden rounded-2xl border bg-slate-50",
            getImgAspect(word),
          ].join(" ")}
        >
          {!ready && <div className="absolute inset-0 animate-pulse bg-black/10" />}

          <Image
            key={word.img}
            src={word.img}
            alt={word.sk}
            fill
            sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
            className={[
              getImgFit(word) === "cover" ? "object-cover" : "object-contain",
              getImgPos(word),
              getImgFit(word) === "contain" ? "p-2" : "",
              "transition-opacity duration-200",
              ready ? "opacity-100" : "opacity-0",
            ].join(" ")}
            onLoadingComplete={() => setReady(true)}
            onError={() => setReady(true)}
          />
        </div>
      </div>

      {word.imgCredit && (
        <div className="text-xs text-slate-500">{word.imgCredit}</div>
      )}
    </div>
  );
}

// 1️⃣ вибір перекладу (залишаємо autoplay як було)
function ChooseTranslation({
  word,
  words,
  onNext,
  lang,
  quizAutoKey,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  lang: Lang;
  quizAutoKey: number;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => trWord(w, lang));
  }, [word, words, lang]);

  const correctText = trWord(word, lang);

  return (
    <>
      <WordImage word={word} />

      <div className="text-lg font-semibold">
        Обери переклад: <span className="font-bold">{word.sk}</span>
      </div>

      <div className="flex justify-center">
        <SpeakButton text={word.sk} autoPlayKey={`${quizAutoKey}:${word.sk}`} />
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

// 2️⃣ вибір словацького слова — ✅ вимовляємо ПІСЛЯ вибору відповіді
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

  return (
    <>
      <WordImage word={word} />

      <div className="text-lg font-semibold">
        Обери слово словацькою:{" "}
        <span className="font-bold">{trWord(word, lang)}</span>
      </div>

      {/* ✅ тільки кнопка, без autoplay */}
      <div className="flex justify-center">
        <SpeakButton text={word.sk} />
      </div>

      <div className="grid gap-3">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={async () => {
              const correct = opt === word.sk;
              // ✅ після вибору відповіді — вимовляємо слово (gesture)
              await playLocal(word.sk);
              onNext(correct);
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

// 3️⃣ введення слова — ✅ вимовляємо ПІСЛЯ "Перевірити"
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

  function normalize(s: string) {
    return s.trim().toLowerCase();
  }

  async function check() {
    const ok = normalize(value) === normalize(word.sk);
    setStatus(ok ? "correct" : "wrong");
    setCorrectAnswer(word.sk);

    // ✅ після вводу/перевірки — вимовляємо (gesture)
    await playLocal(word.sk);
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
        Напиши словацькою: <span className="font-bold">{trWord(word, lang)}</span>
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

            <div className="flex gap-2 items-center">
              {/* ✅ тільки кнопка, без autoplay */}
              <SpeakButton text={word.sk} />

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

// 4️⃣ аудіо-вправа (залишаємо autoplay як було)
function AudioQuiz({
  word,
  words,
  onNext,
  quizAutoKey,
}: {
  word: Word;
  words: Word[];
  onNext: (c: boolean) => void;
  quizAutoKey: number;
}) {
  const options = useMemo(() => {
    const others = words.filter((w) => w !== word);
    const variants = shuffle([word, ...shuffle(others).slice(0, 3)]);
    return variants.map((w) => w.sk);
  }, [word, words]);

  return (
    <>
      <div className="text-lg font-semibold">Прослухай слово і обери правильне:</div>

      <div className="flex justify-center">
        <SpeakButton text={word.sk} autoPlayKey={`${quizAutoKey}:${word.sk}`} />
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

// 5️⃣ ПАРИ В 2 КОЛОНКИ (whole) — без змін
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

// 6️⃣ ЗБЕРИ РЕЧЕННЯ (perWord) — ✅ вимовляємо ТІЛЬКИ після "Перевірити"
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

  async function check() {
    const built = picked.join(" ");
    const target = baseTokens.join(" ");
    const ok = normalizeSentence(built) === normalizeSentence(target);
    setStatus(ok ? "correct" : "wrong");

    // ✅ після "Перевірити" — програємо фразу (gesture)
    await playLocal(phrase.sk);
  }

  function next() {
    onNext(status === "correct");
  }

  const builtPretty = picked.join(" ").replace(/\s+([.,!?;:])/g, "$1");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">B) Збери речення</div>

          <div className="text-sm text-slate-500">
            Ціль:{" "}
            <span className="text-slate-800 font-medium">{phrase.target}</span>
          </div>

          {/* ✅ тільки кнопка, без autoplay */}
          <div className="mt-2 flex justify-center">
            <SpeakButton text={phrase.sk} />
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
            <button onClick={next} className="px-4 py-2 rounded-xl bg-black text-white">
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
