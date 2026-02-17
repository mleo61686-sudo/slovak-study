"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  className?: string;
  title?: string;
  label?: string;
  asChild?: boolean;
  autoPlayKey?: string | number;
};

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

async function buildLocalUrl(text: string) {
  const clean = text.trim();
  const kind = guessKind(clean);
  const h = await sha1Hex(`${kind}:${clean}`);
  return kind === "word"
    ? `/audio/words/${h}.mp3`
    : `/audio/phrases/${h}.mp3`;
}

export default function SpeakButton({
  text,
  className = "rounded-xl border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.98]",
  title,
  label,
  asChild,
  autoPlayKey,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastKey = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  function stop() {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }

  async function play() {
    const clean = text?.trim();
    if (!clean) return;

    stop();
    setLoading(true);

    try {
      const url = await buildLocalUrl(clean);
      const a = new Audio(url);
      audioRef.current = a;

      await a.play(); // ✅ прямий play без setTimeout
    } catch (e) {
      console.error("Audio play failed:", e);
    } finally {
      setLoading(false);
    }
  }

  // ✅ autoplay без timeout (важливо)
  useEffect(() => {
    if (autoPlayKey === undefined) return;
    if (!text?.trim()) return;

    const key = `${autoPlayKey}:${text}`;

    if (lastKey.current === key) return;
    lastKey.current = key;

    // ⚡ без setTimeout
    play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayKey, text]);

  const btnTitle = title ?? "Play";

  if (asChild) {
    return (
      <span
        onClick={play}
        title={btnTitle}
        className={className}
        role="button"
      >
        {loading ? "..." : label ?? "🔊"}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={play}
      title={btnTitle}
      className={className}
      disabled={loading}
    >
      {loading ? "..." : label ?? "🔊"}
    </button>
  );
}
