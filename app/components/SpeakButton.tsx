"use client";

import React, { useEffect, useRef, useState } from "react";

type Props = {
  text: string;
  kind?: "word" | "phrase"; // ✅ передаємо явно
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

// ✅ same as scripts audioKey.ts: sha1(text).hex.slice(0,13)
async function phraseKey13(text: string) {
  const h = await sha1Hex(text.trim());
  return h.slice(0, 13);
}

async function buildLocalUrl(text: string, kind: "word" | "phrase") {
  const clean = text.trim();

  if (kind === "phrase") {
    const key = await phraseKey13(clean);
    return `/audio/phrases/${key}.mp3`;
  }

  // ✅ words: sha1("word:<text>") full hex (must match generator script)
  const h = await sha1Hex(`word:${clean}`);
  return `/audio/words/${h}.mp3`;
}

export default function SpeakButton({
  text,
  kind = "word",
  className = "rounded-xl border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.98]",
  title,
  label,
  asChild,
  autoPlayKey,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastKey = useRef<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ id кожного запуску play, щоб старі async не лізли в state
  const playIdRef = useRef(0);

  function stop() {
    const a = audioRef.current;
    if (a) {
      try {
        a.pause();
      } catch {}
      a.currentTime = 0;
      audioRef.current = null;
    }
  }

  async function play() {
    const clean = text?.trim();
    if (!clean) return;

    const myPlayId = ++playIdRef.current;

    stop();
    setLoading(true);

    try {
      const url = await buildLocalUrl(clean, kind);

      if (myPlayId !== playIdRef.current) return;

      const a = new Audio(url);
      audioRef.current = a;

      await a.play();
    } catch (e: any) {
      if (e?.name === "AbortError") return;
      const msg = String(e?.message ?? "");
      if (msg.includes("interrupted") || msg.includes("pause()")) return;

      console.error("Audio play failed:", e);
    } finally {
      if (myPlayId === playIdRef.current) setLoading(false);
    }
  }

  useEffect(() => {
    if (autoPlayKey === undefined) return;
    if (!text?.trim()) return;

    const key = `${autoPlayKey}:${kind}:${text}`;
    if (lastKey.current === key) return;
    lastKey.current = key;

    play().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlayKey, text, kind]);

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
