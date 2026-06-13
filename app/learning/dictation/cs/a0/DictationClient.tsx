"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { useLanguage } from "@/lib/src/useLanguage";
import { CS_A0_DICTATIONS } from "./data";

type WordCheckStatus = "correct" | "wrong";

type CheckedWord = {
    raw: string;
    status: WordCheckStatus;
};

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

function getResultMessage(score: number, lang: "ua" | "ru" | "en") {
    if (score >= 90) {
        return lang === "ua"
            ? "Дуже добре 🔥"
            : lang === "ru"
                ? "Очень хорошо 🔥"
                : "Very good 🔥";
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

export default function DictationClient() {
    const { lang } = useLanguage();

    const dictations = CS_A0_DICTATIONS;
    const [index, setIndex] = useState(0);
    const [answer, setAnswer] = useState("");
    const [checked, setChecked] = useState(false);
    const [showCorrectText, setShowCorrectText] = useState(false);
    const [playbackRate, setPlaybackRate] = useState(0.75);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const current = dictations[index];

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.playbackRate = playbackRate;
    }, [playbackRate, index]);

    const result = useMemo(() => {
        if (!checked) return null;
        return checkWords(answer, current.text);
    }, [answer, checked, current.text]);

    const title = current.title[lang] ?? current.title.ua;
    const description = current.description[lang] ?? current.description.ua;

    const hasPrev = index > 0;
    const hasNext = index < dictations.length - 1;

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

    const resetForIndex = (nextIndex: number) => {
        const audio = audioRef.current;

        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        setIndex(nextIndex);
        setAnswer("");
        setChecked(false);
        setShowCorrectText(false);
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
    };

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

    return (
        <div className="mx-auto max-w-3xl px-4 py-10 theme-text">
            <div className="flunio-card relative overflow-hidden rounded-3xl p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-14 -left-10 h-36 w-36 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="theme-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold">
                            🇨🇿 Czech · A0
                        </div>

                        <h1 className="mt-4 text-3xl font-black tracking-tight theme-text">
                            🎧 {title}
                        </h1>

                        <p className="mt-2 text-sm leading-6 theme-text-muted">
                            {description}
                        </p>
                    </div>

                    <Link
                        href="/learning/levels/a0"
                        className="theme-secondary-button inline-flex min-h-10 shrink-0 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                    >
                        ← {lang === "ua" ? "Назад" : lang === "ru" ? "Назад" : "Back"}
                    </Link>
                </div>
            </div>

            <div className="flunio-card mt-6 rounded-3xl p-6">
                <div className="theme-inner-card rounded-3xl p-4">
                    <div className="text-sm font-bold theme-text">
                        {lang === "ua"
                            ? "1. Прослухай диктант"
                            : lang === "ru"
                                ? "1. Прослушай диктант"
                                : "1. Listen to the dictation"}
                    </div>

                    <p className="mt-2 text-sm theme-text-muted">
                        {lang === "ua"
                            ? "Можеш змінити швидкість аудіо, щоб було зручніше писати."
                            : lang === "ru"
                                ? "Можно изменить скорость аудио, чтобы было удобнее писать."
                                : "You can change the audio speed to make writing easier."}
                    </p>

                    <audio
                        ref={audioRef}
                        key={current.audioSrc}
                        preload="metadata"
                        src={current.audioSrc}
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
                                aria-label={
                                    isPlaying
                                        ? lang === "ua"
                                            ? "Пауза"
                                            : lang === "ru"
                                                ? "Пауза"
                                                : "Pause"
                                        : lang === "ua"
                                            ? "Відтворити"
                                            : lang === "ru"
                                                ? "Воспроизвести"
                                                : "Play"
                                }
                            >
                                {isPlaying ? "⏸" : "▶"}
                            </button>

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-3 text-xs font-bold theme-text-subtle">
                                    <span>
                                        {lang === "ua"
                                            ? "Аудіо диктанту"
                                            : lang === "ru"
                                                ? "Аудио диктанта"
                                                : "Dictation audio"}
                                    </span>

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
                                    aria-label={
                                        lang === "ua"
                                            ? "Позиція аудіо"
                                            : lang === "ru"
                                                ? "Позиция аудио"
                                                : "Audio position"
                                    }
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
                                ↺{" "}
                                {lang === "ua"
                                    ? "Спочатку"
                                    : lang === "ru"
                                        ? "Сначала"
                                        : "Replay"}
                            </button>

                            <span className="ml-1 text-xs font-bold theme-text-subtle">
                                {lang === "ua"
                                    ? "Швидкість:"
                                    : lang === "ru"
                                        ? "Скорость:"
                                        : "Speed:"}
                            </span>

                            {[0.65, 0.75, 0.85, 1].map((rate) => (
                                <button
                                    key={rate}
                                    type="button"
                                    onClick={() => setPlaybackRate(rate)}
                                    className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition ${playbackRate === rate
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

                <div className="mt-4">
                    <label className="text-sm font-bold theme-text" htmlFor="dictation-answer">
                        {lang === "ua"
                            ? "2. Напиши текст, який почув"
                            : lang === "ru"
                                ? "2. Напиши текст, который услышал"
                                : "2. Write the text you heard"}
                    </label>

                    <p className="mt-2 text-sm theme-text-muted">
                        {lang === "ua"
                            ? "Можна писати без діакритики. Розділові знаки та великі літери не впливають на перевірку."
                            : lang === "ru"
                                ? "Можно писать без диакритики. Знаки препинания и заглавные буквы не влияют на проверку."
                                : "You can write without diacritics. Punctuation and capital letters do not affect checking."}
                    </p>

                    {checked && result ? (
                        <div
                            className="mt-3 min-h-[220px] w-full rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-base leading-8 theme-text"
                            aria-live="polite"
                        >
                            {result.checkedWords.map((word, wordIndex) => (
                                <span
                                    key={`${word.raw}-${wordIndex}`}
                                    className={
                                        word.status === "correct"
                                            ? "dictation-word-correct"
                                            : "dictation-word-wrong"
                                    }
                                >
                                    {word.raw}
                                    {wordIndex < result.checkedWords.length - 1 ? " " : ""}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <textarea
                            id="dictation-answer"
                            value={answer}
                            onChange={(event) => {
                                setAnswer(event.target.value);
                                setChecked(false);
                                setShowCorrectText(false);
                            }}
                            className="mt-3 min-h-[220px] w-full resize-y rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-base leading-7 theme-text outline-none transition placeholder:text-slate-500 focus:border-cyan-300/50 focus:bg-white/[0.06]"
                            placeholder={
                                lang === "ua"
                                    ? "Пиши тут чеською..."
                                    : lang === "ru"
                                        ? "Пиши здесь на чешском..."
                                        : "Write the Czech text here..."
                            }
                            spellCheck={false}
                        />
                    )}
                </div>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                if (checked) {
                                    setChecked(false);
                                    setShowCorrectText(false);
                                    return;
                                }

                                setChecked(true);
                                setShowCorrectText(false);
                            }}
                            disabled={!checked && answer.trim().length === 0}
                            className="theme-primary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 active:translate-y-0"
                        >
                            {checked
                                ? lang === "ua"
                                    ? "Редагувати"
                                    : lang === "ru"
                                        ? "Редактировать"
                                        : "Edit"
                                : lang === "ua"
                                    ? "Перевірити"
                                    : lang === "ru"
                                        ? "Проверить"
                                        : "Check"}
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setAnswer("");
                                setChecked(false);
                                setShowCorrectText(false);
                            }}
                            className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                        >
                            {lang === "ua"
                                ? "Очистити"
                                : lang === "ru"
                                    ? "Очистить"
                                    : "Clear"}
                        </button>
                    </div>

                    <div className="flex gap-2">
                        {hasPrev && (
                            <button
                                type="button"
                                onClick={() => resetForIndex(index - 1)}
                                className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                            >
                                ←
                            </button>
                        )}

                        {hasNext && (
                            <button
                                type="button"
                                onClick={() => resetForIndex(index + 1)}
                                className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                            >
                                →
                            </button>
                        )}
                    </div>
                </div>

                {checked && result ? (
                    <div className="mt-6 space-y-4">
                        <div className="theme-inner-card rounded-3xl p-4">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <div className="text-sm font-bold theme-text">
                                        {lang === "ua"
                                            ? "Результат"
                                            : lang === "ru"
                                                ? "Результат"
                                                : "Result"}
                                    </div>

                                    <div className="mt-1 text-sm theme-text-muted">
                                        {getResultMessage(result.score, lang)}
                                    </div>

                                    <div className="mt-2 text-xs theme-text-subtle">
                                        {lang === "ua"
                                            ? `Правильно: ${result.correctCount}/${result.expectedCount}. Написано слів: ${result.typedCount}.`
                                            : lang === "ru"
                                                ? `Правильно: ${result.correctCount}/${result.expectedCount}. Написано слов: ${result.typedCount}.`
                                                : `Correct: ${result.correctCount}/${result.expectedCount}. Typed words: ${result.typedCount}.`}
                                    </div>

                                    {result.missingCount > 0 || result.extraCount > 0 ? (
                                        <div className="mt-1 text-xs theme-text-subtle">
                                            {lang === "ua"
                                                ? `Пропущено: ${result.missingCount}. Зайвих слів: ${result.extraCount}.`
                                                : lang === "ru"
                                                    ? `Пропущено: ${result.missingCount}. Лишних слов: ${result.extraCount}.`
                                                    : `Missing: ${result.missingCount}. Extra words: ${result.extraCount}.`}
                                        </div>
                                    ) : null}
                                </div>

                                <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-2xl font-black theme-text">
                                    {result.score}%
                                </div>
                            </div>
                        </div>

                        <div className="theme-inner-card rounded-3xl p-4">
                            <button
                                type="button"
                                onClick={() => setShowCorrectText((value) => !value)}
                                className="theme-secondary-button inline-flex min-h-10 items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {showCorrectText
                                    ? lang === "ua"
                                        ? "Сховати правильний текст"
                                        : lang === "ru"
                                            ? "Скрыть правильный текст"
                                            : "Hide correct text"
                                    : lang === "ua"
                                        ? "Показати правильний текст"
                                        : lang === "ru"
                                            ? "Показать правильный текст"
                                            : "Show correct text"}
                            </button>

                            {showCorrectText ? (
                                <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/10 p-4 text-sm leading-7 theme-text-muted">
                                    {current.text}
                                </pre>
                            ) : null}
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}