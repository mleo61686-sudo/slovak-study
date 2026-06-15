"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import type { Lang } from "@/app/learning/data";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  getLessonsProgress,
  patchLessonProgress,
  type LessonProgressObj,
} from "@/lib/src/progress";
import type { AudioPracticeItem } from "./data";

type PracticeMode = "listening" | "dictation";
type WordCheckStatus = "correct" | "wrong";

type CheckedWord = {
  raw: string;
  status: WordCheckStatus;
};

const TEXT: Record<
  Lang,
  {
    back: string;
    listening: string;
    dictation: string;
    listenTitle: string;
    listenHint: string;
    questionsTitle: string;
    checkAnswers: string;
    listeningResult: string;
    dictationTitle: string;
    dictationHint: string;
    audioLabel: string;
    replay: string;
    speed: string;
    writeLabel: string;
    writeHint: string;
    placeholder: string;
    check: string;
    edit: string;
    clear: string;
    result: string;
    showCorrect: string;
    hideCorrect: string;
    transcript: string;
    showTranscript: string;
    hideTranscript: string;
    bestResult: string;
    lastResult: string;
    attempts: string;
    noResultYet: string;
    textAfterCheck: string;
  }
> = {
  ua: {
    back: "Назад",
    listening: "Слухання",
    dictation: "Диктант",
    listenTitle: "1. Прослухай текст",
    listenHint: "Слухай уважно. Потім відповідай на питання нижче.",
    questionsTitle: "2. Відповідай на питання",
    checkAnswers: "Перевірити відповіді",
    listeningResult: "Результат слухання",
    dictationTitle: "1. Прослухай диктант",
    dictationHint: "Можеш змінити швидкість аудіо, щоб було зручніше писати.",
    audioLabel: "Аудіотекст",
    replay: "Спочатку",
    speed: "Швидкість:",
    writeLabel: "2. Напиши текст, який почув",
    writeHint:
      "Можна писати без діакритики. Розділові знаки та великі літери не впливають на перевірку.",
    placeholder: "Пиши тут текст мовою курсу...",
    check: "Перевірити",
    edit: "Редагувати",
    clear: "Очистити",
    result: "Результат",
    showCorrect: "Показати правильний текст",
    hideCorrect: "Сховати правильний текст",
    transcript: "Текст аудіо",
    showTranscript: "Показати текст",
    hideTranscript: "Сховати текст",
    bestResult: "Кращий результат",
    lastResult: "Останній результат",
    attempts: "Спроб",
    noResultYet: "Ще немає результату",
    textAfterCheck: "Текст можна подивитися після перевірки відповідей.",
  },
  ru: {
    back: "Назад",
    listening: "Слушание",
    dictation: "Диктант",
    listenTitle: "1. Прослушай текст",
    listenHint: "Слушай внимательно. Потом ответь на вопросы ниже.",
    questionsTitle: "2. Ответь на вопросы",
    checkAnswers: "Проверить ответы",
    listeningResult: "Результат слушания",
    dictationTitle: "1. Прослушай диктант",
    dictationHint: "Можно изменить скорость аудио, чтобы было удобнее писать.",
    audioLabel: "Аудиотекст",
    replay: "Сначала",
    speed: "Скорость:",
    writeLabel: "2. Напиши текст, который услышал",
    writeHint:
      "Можно писать без диакритики. Знаки препинания и заглавные буквы не влияют на проверку.",
    placeholder: "Пиши здесь текст на языке курса...",
    check: "Проверить",
    edit: "Редактировать",
    clear: "Очистить",
    result: "Результат",
    showCorrect: "Показать правильный текст",
    hideCorrect: "Скрыть правильный текст",
    transcript: "Текст аудио",
    showTranscript: "Показать текст",
    hideTranscript: "Скрыть текст",
    bestResult: "Лучший результат",
    lastResult: "Последний результат",
    attempts: "Попыток",
    noResultYet: "Пока нет результата",
    textAfterCheck: "Текст можно посмотреть после проверки ответов.",
  },
  en: {
    back: "Back",
    listening: "Listening",
    dictation: "Dictation",
    listenTitle: "1. Listen to the text",
    listenHint: "Listen carefully. Then answer the questions below.",
    questionsTitle: "2. Answer the questions",
    checkAnswers: "Check answers",
    listeningResult: "Listening result",
    dictationTitle: "1. Listen to the dictation",
    dictationHint: "You can change the audio speed to make writing easier.",
    audioLabel: "Audio text",
    replay: "Replay",
    speed: "Speed:",
    writeLabel: "2. Write the text you heard",
    writeHint:
      "You can write without diacritics. Punctuation and capital letters do not affect checking.",
    placeholder: "Write the course-language text here...",
    check: "Check",
    edit: "Edit",
    clear: "Clear",
    result: "Result",
    showCorrect: "Show correct text",
    hideCorrect: "Hide correct text",
    transcript: "Audio transcript",
    showTranscript: "Show text",
    hideTranscript: "Hide text",
    bestResult: "Best result",
    lastResult: "Last result",
    attempts: "Attempts",
    noResultYet: "No result yet",
    textAfterCheck: "You can view the text after checking your answers.",
  },
};

function pickLang(value: Lang): Lang {
  return value === "ru" || value === "en" ? value : "ua";
}

function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeWord(value: string) {
  return stripDiacritics(value)
    .toLowerCase()
    .replace(/[“”„]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/[.,!?;:()[\]{}"']/g, "")
    .replace(/[-–—]/g, "")
    .trim();
}

function getRawWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean);
}

function getComparableWords(value: string) {
  return getRawWords(value)
    .map((word) => normalizeWord(word))
    .filter(Boolean);
}

function checkWords(userText: string, correctText: string) {
  const rawUserWords = getRawWords(userText);
  const normalizedUserWords = rawUserWords.map((word) => normalizeWord(word));
  const correctWords = getComparableWords(correctText);

  const checkedWords: CheckedWord[] = rawUserWords.map((raw, index) => {
    const userWord = normalizedUserWords[index];
    const correctWord = correctWords[index];

    return {
      raw,
      status: userWord && correctWord && userWord === correctWord ? "correct" : "wrong",
    };
  });

  const correctCount = normalizedUserWords.reduce((count, word, index) => {
    if (word && word === correctWords[index]) return count + 1;
    return count;
  }, 0);

  const totalForScore = Math.max(correctWords.length, normalizedUserWords.length, 1);
  const score = Math.round((correctCount / totalForScore) * 100);

  const missingCount = Math.max(0, correctWords.length - normalizedUserWords.length);
  const extraCount = Math.max(0, normalizedUserWords.length - correctWords.length);

  return {
    checkedWords,
    correctCount,
    expectedCount: correctWords.length,
    typedCount: normalizedUserWords.length,
    missingCount,
    extraCount,
    score,
  };
}

function getResultMessage(score: number, lang: Lang) {
  if (score >= 90) {
    return lang === "ua" ? "Дуже добре 🔥" : lang === "ru" ? "Очень хорошо 🔥" : "Very good 🔥";
  }

  if (score >= 70) {
    return lang === "ua"
      ? "Непогано, але ще є помилки"
      : lang === "ru"
        ? "Неплохо, но ещё есть ошибки"
        : "Not bad, but there are still mistakes";
  }

  return lang === "ua"
    ? "Спробуй ще раз повільно"
    : lang === "ru"
      ? "Попробуй ещё раз медленно"
      : "Try again slowly";
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";

  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60);

  return `${minutes}:${String(rest).padStart(2, "0")}`;
}

function getListeningResultMessage(score: number, total: number, lang: Lang) {
  if (score === total) {
    return lang === "ua"
      ? "Супер, усе правильно 🔥"
      : lang === "ru"
        ? "Супер, всё правильно 🔥"
        : "Great, everything is correct 🔥";
  }

  if (score >= Math.ceil(total / 2)) {
    return lang === "ua"
      ? "Непогано, але текст варто прослухати ще раз"
      : lang === "ru"
        ? "Неплохо, но текст стоит прослушать ещё раз"
        : "Not bad, but listen to the text again";
  }

  return lang === "ua"
    ? "Спробуй прослухати ще раз повільніше"
    : lang === "ru"
      ? "Попробуй прослушать ещё раз медленнее"
      : "Try listening again more slowly";
}

function progressKey(mode: PracticeMode, itemId: string) {
  return `audioPractice:${mode}:${itemId}`;
}

function getProgressObj(key: string): LessonProgressObj | null {
  const progress = getLessonsProgress();
  const value = progress[key];

  if (!value || value === true || typeof value !== "object") {
    return null;
  }

  return value as LessonProgressObj;
}

function getPercent(correct?: number, total?: number) {
  if (typeof correct !== "number" || typeof total !== "number" || total <= 0) {
    return null;
  }

  return Math.round((correct / total) * 100);
}

function savePracticeResult(key: string, correct: number, total: number) {
  const prev = getProgressObj(key);
  const attempts = (prev?.attempts ?? 0) + 1;

  const prevBestCorrect = prev?.bestCorrect ?? 0;
  const prevBestTotal = prev?.bestTotal ?? total;
  const prevBestPercent = getPercent(prevBestCorrect, prevBestTotal) ?? 0;
  const nextPercent = getPercent(correct, total) ?? 0;

  const shouldReplaceBest =
    !prev || nextPercent > prevBestPercent || (nextPercent === prevBestPercent && correct > prevBestCorrect);

  patchLessonProgress(key, {
    lastCorrect: correct,
    lastWrong: Math.max(0, total - correct),
    lastTotal: total,
    bestCorrect: shouldReplaceBest ? correct : prevBestCorrect,
    bestTotal: shouldReplaceBest ? total : prevBestTotal,
    attempts,
    updatedAt: new Date().toISOString(),
  });
}

function ProgressSummary({
  progress,
  lang,
  text,
}: {
  progress: LessonProgressObj | null;
  lang: Lang;
  text: (typeof TEXT)[Lang];
}) {
  if (!progress) {
    return (
      <div className="theme-inner-card rounded-3xl p-4 text-xs theme-text-subtle">
        {text.noResultYet}
      </div>
    );
  }

  const bestPercent = getPercent(progress.bestCorrect, progress.bestTotal);
  const lastPercent = getPercent(progress.lastCorrect, progress.lastTotal);

  return (
    <div className="theme-inner-card rounded-3xl p-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <div>
          <div className="text-xs font-bold uppercase theme-text-subtle">
            {text.bestResult}
          </div>
          <div className="mt-1 text-lg font-black theme-text">
            {bestPercent === null ? "—" : `${bestPercent}%`}
          </div>
          {typeof progress.bestCorrect === "number" && typeof progress.bestTotal === "number" ? (
            <div className="mt-1 text-xs theme-text-subtle">
              {progress.bestCorrect}/{progress.bestTotal}
            </div>
          ) : null}
        </div>

        <div>
          <div className="text-xs font-bold uppercase theme-text-subtle">
            {text.lastResult}
          </div>
          <div className="mt-1 text-lg font-black theme-text">
            {lastPercent === null ? "—" : `${lastPercent}%`}
          </div>
          {typeof progress.lastCorrect === "number" && typeof progress.lastTotal === "number" ? (
            <div className="mt-1 text-xs theme-text-subtle">
              {progress.lastCorrect}/{progress.lastTotal}
            </div>
          ) : null}
        </div>

        <div>
          <div className="text-xs font-bold uppercase theme-text-subtle">
            {text.attempts}
          </div>
          <div className="mt-1 text-lg font-black theme-text">
            {progress.attempts ?? 0}
          </div>
        </div>
      </div>

      {lang === "ua" || lang === "ru" || lang === "en" ? null : null}
    </div>
  );
}

export default function AudioPracticeClient({ item }: { item: AudioPracticeItem }) {
  const { lang } = useLanguage();
  const safeLang = pickLang(lang);
  const t = TEXT[safeLang];

  const [mode, setMode] = useState<PracticeMode>("listening");
  const [playbackRate, setPlaybackRate] = useState(0.85);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [answersChecked, setAnswersChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  const [answer, setAnswer] = useState("");
  const [dictationChecked, setDictationChecked] = useState(false);
  const [showCorrectText, setShowCorrectText] = useState(false);

  const [listeningProgress, setListeningProgress] = useState<LessonProgressObj | null>(null);
  const [dictationProgress, setDictationProgress] = useState<LessonProgressObj | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const title = item.title[safeLang] ?? item.title.ua;
  const description = item.description[safeLang] ?? item.description.ua;

  const listeningKey = progressKey("listening", item.id);
  const dictationKey = progressKey("dictation", item.id);

  const refreshProgress = () => {
    setListeningProgress(getProgressObj(listeningKey));
    setDictationProgress(getProgressObj(dictationKey));
  };

  useEffect(() => {
    refreshProgress();

    const onProgressChanged = () => refreshProgress();
    const onStorage = () => refreshProgress();

    window.addEventListener("slovakStudy:progressChanged", onProgressChanged);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("slovakStudy:progressChanged", onProgressChanged);
      window.removeEventListener("storage", onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listeningKey, dictationKey]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const dictationResult = useMemo(() => {
    if (!dictationChecked) return null;
    return checkWords(answer, item.transcript);
  }, [answer, dictationChecked, item.transcript]);

  const listeningScore = item.questions.reduce((count, question, index) => {
    return selectedAnswers[index] === question.correctIndex ? count + 1 : count;
  }, 0);

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        audio.playbackRate = playbackRate;
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }

      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  const replayAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = 0;
    setCurrentTime(0);

    try {
      audio.playbackRate = playbackRate;
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seekAudio = (value: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const switchMode = (nextMode: PracticeMode) => {
    setMode(nextMode);
    setShowTranscript(false);
    setAnswersChecked(false);
    setDictationChecked(false);
    setShowCorrectText(false);
  };

  const checkListeningAnswers = () => {
    setAnswersChecked(true);
    setShowTranscript(false);
    savePracticeResult(listeningKey, listeningScore, item.questions.length);
    refreshProgress();
  };

  const checkDictationAnswer = () => {
    const result = checkWords(answer, item.transcript);

    setDictationChecked(true);
    setShowCorrectText(false);

    savePracticeResult(dictationKey, result.correctCount, result.expectedCount);
    refreshProgress();
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 theme-text">
      <div className="flunio-card relative overflow-hidden rounded-3xl p-6">
        <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />

        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="theme-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black uppercase">
              {item.courseId.toUpperCase()} · {item.band.toUpperCase()}
              {item.durationLabel ? ` · ${item.durationLabel}` : ""}
            </div>

            <h1 className="mt-4 text-3xl font-black tracking-tight theme-text">
              🎧 {title}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 theme-text-muted">
              {description}
            </p>
          </div>

          <Link
            href={`/learning/audio-practice/${item.courseId}/${item.band}`}
            className="theme-secondary-button inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
          >
            ← {t.back}
          </Link>
        </div>
      </div>

      <div className="flunio-card mt-6 rounded-3xl p-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => switchMode("listening")}
            className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
              mode === "listening" ? "theme-primary-button" : "theme-secondary-button"
            }`}
          >
            🎧 {t.listening}
          </button>

          <button
            type="button"
            onClick={() => switchMode("dictation")}
            className={`rounded-2xl px-4 py-3 text-sm font-black transition ${
              mode === "dictation" ? "theme-primary-button" : "theme-secondary-button"
            }`}
          >
            ✍️ {t.dictation}
          </button>
        </div>
      </div>

      <div className="mt-6">
        <ProgressSummary
          progress={mode === "listening" ? listeningProgress : dictationProgress}
          lang={safeLang}
          text={t}
        />
      </div>

      <div className="flunio-card mt-6 rounded-3xl p-6">
        <div className="theme-inner-card rounded-3xl p-4">
          <div className="text-sm font-bold theme-text">
            {mode === "listening" ? t.listenTitle : t.dictationTitle}
          </div>

          <p className="mt-2 text-sm theme-text-muted">
            {mode === "listening" ? t.listenHint : t.dictationHint}
          </p>

          <audio
            ref={audioRef}
            key={item.audioSrc}
            preload="metadata"
            src={item.audioSrc}
            onLoadedMetadata={(event) => {
              event.currentTarget.playbackRate = playbackRate;
              setDuration(event.currentTarget.duration || 0);
            }}
            onTimeUpdate={(event) => {
              setCurrentTime(event.currentTarget.currentTime);
            }}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => {
              setIsPlaying(false);
              setCurrentTime(duration);
            }}
          />

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-[0_0_22px_rgba(34,211,238,0.06)]">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={togglePlay}
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/15 text-xl font-black theme-text shadow-[0_0_20px_rgba(34,211,238,0.10)] transition hover:scale-[1.03] hover:bg-cyan-300/20 active:scale-[0.98]"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? "⏸" : "▶"}
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3 text-xs font-bold theme-text-subtle">
                  <span>{t.audioLabel}</span>

                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step={0.1}
                  value={Math.min(currentTime, duration || 0)}
                  onChange={(event) => seekAudio(Number(event.target.value))}
                  className="mt-3 w-full accent-cyan-300"
                  aria-label="Audio position"
                />

                <div className="mt-1 h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-cyan-300/70 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={replayAudio}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-bold theme-text-muted transition hover:bg-white/[0.08]"
              >
                ↺ {t.replay}
              </button>

              <span className="ml-1 text-xs font-bold theme-text-subtle">
                {t.speed}
              </span>

              {[0.65, 0.75, 0.85, 1].map((rate) => (
                <button
                  key={rate}
                  type="button"
                  onClick={() => setPlaybackRate(rate)}
                  className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${
                    playbackRate === rate
                      ? "border-cyan-300/50 bg-cyan-300/15 theme-text"
                      : "border-white/10 bg-white/[0.04] theme-text-muted hover:bg-white/[0.08]"
                  }`}
                >
                  {rate}×
                </button>
              ))}
            </div>
          </div>
        </div>

        {mode === "listening" ? (
          <div className="mt-6">
            <div className="text-sm font-bold theme-text">{t.questionsTitle}</div>

            <div className="mt-4 space-y-4">
              {item.questions.map((question, questionIndex) => {
                const questionText = question.question[safeLang] ?? question.question.ua;
                const selectedIndex = selectedAnswers[questionIndex];

                return (
                  <div
                    key={`${item.id}-question-${questionIndex}`}
                    className="theme-inner-card rounded-3xl p-4"
                  >
                    <div className="text-sm font-black theme-text">
                      {questionIndex + 1}. {questionText}
                    </div>

                    <div className="mt-3 grid gap-2">
                      {question.answers.map((answerItem, answerIndex) => {
                        const answerText = answerItem[safeLang] ?? answerItem.ua;
                        const isSelected = selectedIndex === answerIndex;
                        const isCorrect = question.correctIndex === answerIndex;
                        const shouldShowCorrect = answersChecked && isCorrect;
                        const shouldShowWrong = answersChecked && isSelected && !isCorrect;

                        return (
                          <button
                            key={`${item.id}-answer-${questionIndex}-${answerIndex}`}
                            type="button"
                            onClick={() => {
                              setSelectedAnswers((current) => ({
                                ...current,
                                [questionIndex]: answerIndex,
                              }));
                              setAnswersChecked(false);
                            }}
                            className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${
                              shouldShowCorrect
                                ? "border-emerald-300/60 bg-emerald-300/15 theme-text"
                                : shouldShowWrong
                                  ? "border-rose-300/60 bg-rose-300/15 theme-text"
                                  : isSelected
                                    ? "border-cyan-300/50 bg-cyan-300/15 theme-text"
                                    : "border-white/10 bg-white/[0.04] theme-text-muted hover:bg-white/[0.08]"
                            }`}
                          >
                            {answerText}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                onClick={checkListeningAnswers}
                className="theme-primary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
              >
                {t.checkAnswers}
              </button>

              {answersChecked ? (
                <button
                  type="button"
                  onClick={() => setShowTranscript((value) => !value)}
                  className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  {showTranscript ? t.hideTranscript : t.showTranscript}
                </button>
              ) : (
                <div className="text-xs theme-text-subtle">{t.textAfterCheck}</div>
              )}
            </div>

            {answersChecked ? (
              <div className="theme-inner-card mt-5 rounded-3xl p-4">
                <div className="text-sm font-bold theme-text">
                  {t.listeningResult}: {listeningScore}/{item.questions.length}
                </div>

                <p className="mt-2 text-sm theme-text-muted">
                  {getListeningResultMessage(
                    listeningScore,
                    item.questions.length,
                    safeLang,
                  )}
                </p>
              </div>
            ) : null}

            {showTranscript && answersChecked ? (
              <div className="theme-inner-card mt-5 rounded-3xl p-4">
                <div className="text-sm font-bold theme-text">{t.transcript}</div>

                <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 theme-text-muted">
                  {item.transcript}
                </pre>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="mt-6">
            <label className="text-sm font-bold theme-text" htmlFor="dictation-answer">
              {t.writeLabel}
            </label>

            <p className="mt-2 text-sm theme-text-muted">{t.writeHint}</p>

            {dictationChecked && dictationResult ? (
              <div
                className="mt-3 min-h-[220px] w-full rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-base leading-8 theme-text"
                aria-live="polite"
              >
                {dictationResult.checkedWords.map((word, wordIndex) => (
                  <span
                    key={`${word.raw}-${wordIndex}`}
                    className={
                      word.status === "correct"
                        ? "dictation-word-correct"
                        : "dictation-word-wrong"
                    }
                  >
                    {word.raw}
                    {wordIndex < dictationResult.checkedWords.length - 1 ? " " : ""}
                  </span>
                ))}
              </div>
            ) : (
              <textarea
                id="dictation-answer"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setDictationChecked(false);
                  setShowCorrectText(false);
                }}
                className="mt-3 min-h-[220px] w-full resize-y rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-base leading-7 theme-text outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                placeholder={t.placeholder}
                spellCheck={false}
              />
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (dictationChecked) {
                      setDictationChecked(false);
                      setShowCorrectText(false);
                      return;
                    }

                    checkDictationAnswer();
                  }}
                  disabled={!dictationChecked && answer.trim().length === 0}
                  className="theme-primary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 active:translate-y-0"
                >
                  {dictationChecked ? t.edit : t.check}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAnswer("");
                    setDictationChecked(false);
                    setShowCorrectText(false);
                  }}
                  className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                >
                  {t.clear}
                </button>
              </div>
            </div>

            {dictationChecked && dictationResult ? (
              <div className="mt-6 space-y-4">
                <div className="theme-inner-card rounded-3xl p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-bold theme-text">{t.result}</div>

                      <div className="mt-1 text-sm theme-text-muted">
                        {getResultMessage(dictationResult.score, safeLang)}
                      </div>

                      <div className="mt-2 text-xs theme-text-subtle">
                        {safeLang === "ua"
                          ? `Правильно: ${dictationResult.correctCount}/${dictationResult.expectedCount}. Написано слів: ${dictationResult.typedCount}.`
                          : safeLang === "ru"
                            ? `Правильно: ${dictationResult.correctCount}/${dictationResult.expectedCount}. Написано слов: ${dictationResult.typedCount}.`
                            : `Correct: ${dictationResult.correctCount}/${dictationResult.expectedCount}. Typed words: ${dictationResult.typedCount}.`}
                      </div>

                      {dictationResult.missingCount > 0 || dictationResult.extraCount > 0 ? (
                        <div className="mt-1 text-xs theme-text-subtle">
                          {safeLang === "ua"
                            ? `Пропущено: ${dictationResult.missingCount}. Зайвих слів: ${dictationResult.extraCount}.`
                            : safeLang === "ru"
                              ? `Пропущено: ${dictationResult.missingCount}. Лишних слов: ${dictationResult.extraCount}.`
                              : `Missing: ${dictationResult.missingCount}. Extra words: ${dictationResult.extraCount}.`}
                        </div>
                      ) : null}
                    </div>

                    <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-2xl font-black theme-text">
                      {dictationResult.score}%
                    </div>
                  </div>
                </div>

                <div className="theme-inner-card rounded-3xl p-4">
                  <button
                    type="button"
                    onClick={() => setShowCorrectText((value) => !value)}
                    className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {showCorrectText ? t.hideCorrect : t.showCorrect}
                  </button>

                  {showCorrectText ? (
                    <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 theme-text-muted">
                      {item.transcript}
                    </pre>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}