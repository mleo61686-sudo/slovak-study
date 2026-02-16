"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  text: string;
  lang?: string;
  className?: string;

  // Якщо передаси — буде саме так. Якщо ні — авто-локалізація.
  title?: string;
  label?: string;

  /** ✅ коли вставляєш SpeakButton всередину іншого <button> */
  asChild?: boolean;
};

function safeSpeak(opts: {
  text: string;
  lang: string;
  rate: number;
  voices: SpeechSynthesisVoice[];
}) {
  try {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis as SpeechSynthesis | undefined;
    if (!synth) return;

    const Utter = (window as any).SpeechSynthesisUtterance;
    if (typeof Utter === "undefined") return;

    if (typeof synth.cancel === "function") synth.cancel();
    if (typeof synth.speak !== "function") return;

    const utter = new Utter(opts.text) as SpeechSynthesisUtterance;
    utter.lang = opts.lang;
    utter.rate = opts.rate;
    utter.pitch = 1;

    const voices = Array.isArray(opts.voices) ? opts.voices : [];

    const bestVoice =
      voices.find(
        (v) =>
          v.lang === "sk-SK" &&
          typeof v.name === "string" &&
          v.name.toLowerCase().includes("google")
      ) ??
      voices.find((v) => v.lang === "sk-SK") ??
      voices.find((v) => (v.lang ?? "").toLowerCase().startsWith("cs")) ??
      voices.find((v) => (v.lang ?? "").toLowerCase().startsWith("en")) ??
      null;

    if (bestVoice) utter.voice = bestVoice;

    synth.speak(utter);
  } catch {
    // важливо: ніколи не ламати сторінку
  }
}

async function getTtsUrl(text: string) {
  const r = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await r.json().catch(() => null);

  if (!r.ok) {
    const msg =
      (data && (data.error || data.message)) || `TTS error (${r.status})`;
    throw new Error(msg);
  }

  if (!data?.url) throw new Error("No TTS url");
  return String(data.url);
}

export default function SpeakButton({
  text,
  lang = "sk-SK",
  className = "rounded-xl border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50",
  title,
  label,
  asChild = false,
}: Props) {
  const { lang: uiLang } = useLanguage(); // ua | ru

  const computedTitle =
    title ?? (uiLang === "ru" ? "Прослушать произношение" : "Прослухати вимову");
  const computedLabel =
    label ?? (uiLang === "ru" ? "🔊 Прослушать" : "🔊 Прослухати");

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [loading, setLoading] = useState(false);

  const lastTextRef = useRef<string | null>(null);
  const slowModeRef = useRef(false);

  // ✅ для програвання mp3
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // голоса — опціонально, якщо не працює, то й ок
    try {
      if (typeof window === "undefined") return;
      const synth = window.speechSynthesis as SpeechSynthesis | undefined;
      if (!synth || typeof synth.getVoices !== "function") return;

      const loadVoices = () => {
        try {
          const v = synth.getVoices?.() ?? [];
          if (Array.isArray(v) && v.length > 0) setVoices(v);
        } catch {
          // ignore
        }
      };

      loadVoices();
      (synth as any).onvoiceschanged = loadVoices;

      return () => {
        try {
          (synth as any).onvoiceschanged = null;
        } catch {
          // ignore
        }
      };
    } catch {
      // ignore
    }
  }, []);

  async function speak() {
    if (!text?.trim()) return;
    if (loading) return;

    // якщо натискаємо те саме слово вдруге → повільніше
    if (lastTextRef.current === text) {
      slowModeRef.current = !slowModeRef.current;
    } else {
      slowModeRef.current = false;
      lastTextRef.current = text;
    }

    // ✅ 1) спочатку пробуємо mp3 (правильна вимова)
    try {
      setLoading(true);

      // маленький локальний кеш у браузері, щоб 2-й раз було миттєво
      const lsKey = `slovakStudy.tts:${text}`;
      const cached =
        typeof window !== "undefined" ? localStorage.getItem(lsKey) : null;

      const url = cached ?? (await getTtsUrl(text));

      try {
        if (!cached) localStorage.setItem(lsKey, url);
      } catch {
        // ignore (Safari private mode etc.)
      }

      if (!audioRef.current) audioRef.current = new Audio();
      const a = audioRef.current;

      a.pause();
      a.src = url;
      a.currentTime = 0;

      // ✅ якщо натиснув вдруге на те саме — повільніше
      a.playbackRate = slowModeRef.current ? 0.85 : 1;

      await a.play();
      setLoading(false);
      return;
    } catch {
      setLoading(false);
      // ✅ 2) fallback на старий браузерний TTS (щоб не було "нічого")
    }

    safeSpeak({
      text,
      lang,
      rate: slowModeRef.current ? 0.6 : 1,
      voices,
    });
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // ✅ щоб не клікався outer button
    void speak();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      void speak();
    }
  };

  const content = loading ? (uiLang === "ru" ? "⏳" : "⏳") : computedLabel;

  // ✅ ВАЖЛИВО: коли всередині <button>, рендеримо НЕ <button>, а <span>
  if (asChild) {
    return (
      <span
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={className}
        title={computedTitle}
        aria-label={computedTitle}
      >
        {content}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      title={computedTitle}
      aria-label={computedTitle}
      disabled={loading}
    >
      {content}
    </button>
  );
}
