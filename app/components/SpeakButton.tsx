"use client";

import React, { useRef, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  text: string;
  lang?: string;
  className?: string;

  title?: string;
  label?: string;

  /** коли SpeakButton всередині іншого <button> */
  asChild?: boolean;
};

async function getTtsUrl(text: string) {
  const r = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  const data = await r.json().catch(() => null);

  if (!r.ok) {
    const msg = (data && (data.error || data.message)) || `TTS error (${r.status})`;
    throw new Error(msg);
  }

  if (!data?.url) throw new Error("No TTS url");
  return String(data.url);
}

export default function SpeakButton({
  text,
  lang = "sk-SK", // зараз не критично, бо mp3 генерується на бекенді
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

  const [loading, setLoading] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastTextRef = useRef<string | null>(null);
  const slowModeRef = useRef(false);

  async function speak() {
    if (!text?.trim()) return;
    if (loading) return;

    // другий клік по тому самому слову → повільніше
    if (lastTextRef.current === text) {
      slowModeRef.current = !slowModeRef.current;
    } else {
      slowModeRef.current = false;
      lastTextRef.current = text;
    }

    setLoading(true);

    try {
      const lsKey = `slovakStudy.tts:${text}`;
      let url: string | null = null;

      try {
        url = localStorage.getItem(lsKey);
      } catch {}

      if (!url) {
        url = await getTtsUrl(text);
        try {
          localStorage.setItem(lsKey, url);
        } catch {}
      }

      if (!audioRef.current) audioRef.current = new Audio();
      const a = audioRef.current;

      a.pause();
      a.src = url;
      a.currentTime = 0;
      a.playbackRate = slowModeRef.current ? 0.85 : 1;

      await a.play(); // важливо для iPhone
    } catch (e) {
      // якщо не вийшло — просто мовчимо (без browser voice)
      console.error("TTS play failed:", e);
    } finally {
      setLoading(false);
    }
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

  const content = loading ? "⏳" : computedLabel;

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
