"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SpeakButton from "@/app/components/SpeakButton";
import type { CourseId } from "@/app/learning/courses/registry";
import type { Lang } from "@/lib/src/language";

import {
  CS_LETTER_QUESTIONS,
  CS_PRACTICE_WORDS,
  PL_LETTER_QUESTIONS,
  PL_PRACTICE_WORDS,
  SK_LETTER_QUESTIONS,
  SK_PRACTICE_WORDS,
  UI,
  type LocalizedText,
} from "./alphabet-data";

type Props = {
  uiLang: Lang;
  courseId: CourseId;
  isCzech: boolean;
  isPolish: boolean;
};

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

async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hashBuf = await crypto.subtle.digest("SHA-1", data);
  const hashArr = Array.from(new Uint8Array(hashBuf));

  return hashArr.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getWordAudioBase(courseId: CourseId) {
  if (courseId === "pl") return "/audio/pl/words";
  if (courseId === "cs") return "/audio/cs/words";
  return "/audio/words";
}

const card =
  "flunio-card rounded-3xl overflow-hidden shadow-[0_0_24px_rgba(34,211,238,0.08)]";

const softCard = "theme-home-soft-card rounded-2xl";

const ghostButton =
  "theme-secondary-button rounded-xl px-4 py-2 text-sm font-semibold transition";

const activeButton =
  "theme-primary-button rounded-xl px-4 py-2 text-sm font-semibold transition";

export default function AlphabetTrainer({
  uiLang,
  courseId,
  isCzech,
  isPolish,
}: Props) {
  const dictationPool = useMemo(
    () =>
      isPolish
        ? PL_PRACTICE_WORDS
        : isCzech
          ? CS_PRACTICE_WORDS
          : SK_PRACTICE_WORDS,
    [isCzech, isPolish]
  );

  const [tab, setTab] = useState<"quiz" | "listen" | "type">("quiz");

  const [qIndex, setQIndex] = useState(0);
  const [qScore, setQScore] = useState(0);
  const [qDone, setQDone] = useState(false);

  const quiz = useMemo(
    () =>
      shuffle(
        isPolish
          ? PL_LETTER_QUESTIONS
          : isCzech
            ? CS_LETTER_QUESTIONS
            : SK_LETTER_QUESTIONS
      ).slice(0, 6),
    [isCzech, isPolish]
  );

  const listenRounds = useMemo(() => {
    const rounds = isPolish
      ? [
          { target: "cz", words: ["człowiek", "szkoła", "życie", "miasto"] },
          { target: "sz", words: ["szkoła", "nauczyciel", "chleb", "życie"] },
          { target: "ż", words: ["życie", "żona", "miasto", "praca"] },
          { target: "rz", words: ["rzeka", "miasto", "szkoła", "chleb"] },
          { target: "ch", words: ["chleb", "praca", "życie", "nauczyciel"] },
        ]
      : isCzech
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
  }, [isCzech, isPolish]);

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
    const base = getWordAudioBase(courseId);
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
    <section className={`${card} space-y-4 p-4 sm:p-6`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h2 className="text-xl font-semibold theme-text">
            {tr(UI.section6, uiLang)}
          </h2>
          <p className="mt-1 text-sm theme-text-muted">
            {tr(UI.miniIntro, uiLang)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setTab("quiz")}
            className={tab === "quiz" ? activeButton : ghostButton}
          >
            {tr(UI.quiz, uiLang)}
          </button>

          <button
            onClick={() => setTab("listen")}
            className={tab === "listen" ? activeButton : ghostButton}
          >
            {tr(UI.listen, uiLang)}
          </button>

          <button
            onClick={() => setTab("type")}
            className={tab === "type" ? activeButton : ghostButton}
          >
            {tr(UI.type, uiLang)}
          </button>
        </div>
      </div>

      {tab === "quiz" && (
        <div className="space-y-4">
          {!qDone ? (
            <>
              <div className="text-sm theme-text-muted">
                {tr(UI.question, uiLang)} {qIndex + 1} / {quiz.length} •{" "}
                {tr(UI.score, uiLang)}: {qScore}
              </div>

              <div className={`${softCard} p-4`}>
                <div className="font-semibold theme-text">
                  {tr(quiz[qIndex].question, uiLang)}
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
                      className="theme-secondary-button rounded-xl px-4 py-3 text-left font-semibold transition hover:-translate-y-0.5 hover:border-cyan-400/35"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={resetQuiz} className={ghostButton}>
                {tr(UI.restart, uiLang)}
              </button>
            </>
          ) : (
            <div className={`${softCard} space-y-3 p-4`}>
              <div className="text-lg font-semibold theme-text">
                {tr(UI.done, uiLang)}
              </div>
              <div className="theme-text-muted">
                {tr(UI.result, uiLang)}: <b>{qScore}</b> / <b>{quiz.length}</b>
              </div>
              <button onClick={resetQuiz} className={activeButton}>
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
              <div className="text-sm theme-text-muted">
                {tr(UI.round, uiLang)} {lIndex + 1} / {listenRounds.length} •{" "}
                {tr(UI.score, uiLang)}: {lScore}
              </div>

              <div className={`${softCard} space-y-3 p-4`}>
                <div className="font-semibold theme-text">
                  {tr(UI.listenPrompt, uiLang)}{" "}
                  <span className="theme-accent-text">
                    "{listenRounds[lIndex].target}"
                  </span>
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  {listenRounds[lIndex].words.map((word) => {
                    const ok = word.includes(listenRounds[lIndex].target);

                    return (
                      <div
                        key={word}
                        className="flex items-center justify-between gap-2"
                      >
                        <button
                          onClick={() => {
                            if (ok) setLScore((s) => s + 1);

                            const last = lIndex >= listenRounds.length - 1;
                            if (last) setLDone(true);
                            else setLIndex((i) => i + 1);
                          }}
                          className="theme-secondary-button flex-1 rounded-xl px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-400/35"
                          type="button"
                        >
                          <span className="font-semibold">{word}</span>
                        </button>

                        <SpeakButton text={word} />
                      </div>
                    );
                  })}
                </div>
              </div>

              <button onClick={resetListen} className={ghostButton}>
                {tr(UI.restart, uiLang)}
              </button>
            </>
          ) : (
            <div className={`${softCard} space-y-3 p-4`}>
              <div className="text-lg font-semibold theme-text">
                {tr(UI.done, uiLang)}
              </div>
              <div className="theme-text-muted">
                {tr(UI.result, uiLang)}: <b>{lScore}</b> /{" "}
                <b>{listenRounds.length}</b>
              </div>
              <button onClick={resetListen} className={activeButton}>
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
              <div className="text-sm theme-text-muted">
                {tr(UI.word, uiLang)} {tIndex + 1} / {typeWords.length} •{" "}
                {tr(UI.score, uiLang)}: {tScore}
              </div>

              <div className={`${softCard} space-y-3 p-4`}>
                <div className="font-semibold theme-text">
                  {tr(UI.dictationPrompt, uiLang)}
                </div>

                <div className="flex justify-center">
                  <SpeakButton text={typeWords[tIndex]} />
                </div>

                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={status !== "idle"}
                  placeholder={tr(UI.inputPlaceholder, uiLang)}
                  className={`theme-input w-full rounded-xl border px-3 py-2 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-60 ${
                    status === "correct"
                      ? "border-emerald-400/70"
                      : status === "wrong"
                        ? "border-red-400/70"
                        : ""
                  }`}
                />

                {status === "idle" ? (
                  <button
                    onClick={() => {
                      const ok =
                        normalize(input) === normalize(typeWords[tIndex]);

                      setStatus(ok ? "correct" : "wrong");

                      if (ok) setTScore((s) => s + 1);
                    }}
                    disabled={!input.trim()}
                    className={`${activeButton} disabled:cursor-not-allowed disabled:opacity-50`}
                  >
                    {tr(UI.check, uiLang)}
                  </button>
                ) : (
                  <div className="space-y-2">
                    {status === "correct" ? (
                      <div className="rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 font-semibold text-emerald-500">
                        ✅ {tr(UI.correct, uiLang)}
                      </div>
                    ) : (
                      <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 font-semibold text-red-500">
                        ❌ {tr(UI.wrongPrefix, uiLang)}{" "}
                        <b className="text-red-600">{typeWords[tIndex]}</b>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => {
                          setInput("");
                          setStatus("idle");

                          const last = tIndex >= typeWords.length - 1;

                          if (last) setTDone(true);
                          else setTIndex((i) => i + 1);
                        }}
                        className={activeButton}
                      >
                        {tr(UI.next, uiLang)}
                      </button>

                      <button
                        onClick={() => {
                          setInput("");
                          setStatus("idle");
                        }}
                        className={ghostButton}
                      >
                        {tr(UI.tryAgain, uiLang)}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={resetDictationWithNewWords}
                className={ghostButton}
              >
                {tr(UI.restart, uiLang)}
              </button>
            </>
          ) : (
            <div className={`${softCard} space-y-3 p-4`}>
              <div className="text-lg font-semibold theme-text">
                {tr(UI.done, uiLang)}
              </div>

              <div className="theme-text-muted">
                {tr(UI.result, uiLang)}: <b>{tScore}</b> /{" "}
                <b>{typeWords.length}</b>
              </div>

              <button
                onClick={resetDictationWithNewWords}
                className={activeButton}
              >
                {tr(UI.retry, uiLang)}
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  );
}