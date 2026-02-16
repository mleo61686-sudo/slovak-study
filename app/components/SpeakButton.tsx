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
    try {
      if (typeof window === "undefined") return;
      const synth = window.speechSynthesis as SpeechSynthesis | undefined;
      if (!synth || typeof synth.getVoices !== "function") return;

      const loadVoices = () => {
        try {
          const v = synth.getVoices?.() ?? [];
          if (Array.isArray(v) && v.length > 0) setVoices(v);
        } catch {}
      };

      loadVoices();
      (synth as any).onvoiceschanged = loadVoices;

      return () => {
        try {
          (synth as any).onvoiceschanged = null;
        } catch {}
      };
    } catch {}
  }, []);

  async function playUrl(url: string) {
    if (!audioRef.current) audioRef.current = new Audio();
    const a = audioRef.current;

    a.pause();
    a.src = url;
    a.currentTime = 0;
    a.playbackRate = slowModeRef.current ? 0.85 : 1;

    await a.play();
  }

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

    const lsKey = `slovakStudy.tts:${text}`;

    // ✅ 1) якщо вже є url у localStorage — граємо ОДРАЗУ (iPhone це точно дозволяє)
    try {
      const cached =
        typeof window !== "undefined" ? localStorage.getItem(lsKey) : null;

      if (cached) {
        await playUrl(cached);
        return;
      }
    } catch {
      // ignore
    }

    // ✅ 2) якщо url ще нема — 1-й тап тільки генерує/підтягує url
    // (Safari часто блокує play() після async fetch, тому не намагаємось autoplay тут)
    try {
      setLoading(true);
      const url = await getTtsUrl(text);
      setLoading(false);

      try {
        localStorage.setItem(lsKey, url);
      } catch {
        // ignore
      }

      // ✅ НЕ робимо await play() тут — щоб на iPhone не “пропадало”.
      // Користувач натисне вдруге — і тоді cachedUrl вже буде і відтвориться.
      return;
    } catch {
      setLoading(false);
      // fallback нижче
    }

    // ✅ 3) fallback — старий браузерний TTS
    safeSpeak({
      text,
      lang,
      rate: slowModeRef.current ? 0.6 : 1,
      voices,
    });
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    void speak();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      void speak();
    }
  };

  // 👇 підказка на 1-й тап (коли ще нема кешу)
  const content = loading
    ? "⏳"
    : computedLabel;

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
