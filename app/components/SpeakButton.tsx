"use client";

import React, { useRef, useState } from "react";

type Props = {
  text: string;
  lang?: string;
  className?: string;
  title?: string;
  label?: string;
  asChild?: boolean;
};

async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function guessKind(text: string): "word" | "phrase" {
  const t = text.trim();
  if (/[ ,.!?;:]/.test(t)) return "phrase";
  return "word";
}

async function buildLocalUrl(text: string, forcedKind?: "word" | "phrase") {
  const clean = text.trim();
  const kind = forcedKind ?? guessKind(clean);
  const h = await sha1Hex(`${kind}:${clean}`);
  return kind === "word" ? `/audio/words/${h}.mp3` : `/audio/phrases/${h}.mp3`;
}

async function headOk(url: string) {
  const r = await fetch(url, { method: "HEAD", cache: "force-cache" });
  return r.ok;
}

export default function SpeakButton({
  text,
  className = "rounded-xl border bg-white px-3 py-2 text-sm font-medium hover:bg-gray-50 active:scale-[0.98]",
  title,
  label,
  asChild,
}: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [loading, setLoading] = useState(false);

  function stopNow() {
    const a = audioRef.current;
    if (a) {
      a.pause();
      a.currentTime = 0;
      audioRef.current = null;
    }
  }

  async function play() {
    const clean = (text ?? "").trim();
    if (!clean) return;

    // Якщо вже грає — другий клік зупиняє
    if (audioRef.current) {
      stopNow();
      return;
    }

    setLoading(true);
    try {
      // 1) пробуємо “вгаданий” kind
      const kind = guessKind(clean);
      const url = await buildLocalUrl(clean, kind);

      if (await headOk(url)) {
        const a = new Audio(url);
        a.preload = "auto";
        audioRef.current = a;
        a.onended = () => (audioRef.current = null);
        await a.play();
        return;
      }

      // 2) fallback: інший kind (інколи слово/фраза може плутатись)
      const otherKind: "word" | "phrase" = kind === "word" ? "phrase" : "word";
      const url2 = await buildLocalUrl(clean, otherKind);

      if (await headOk(url2)) {
        const a2 = new Audio(url2);
        a2.preload = "auto";
        audioRef.current = a2;
        a2.onended = () => (audioRef.current = null);
        await a2.play();
        return;
      }

      // ✅ 3) НІЯКОГО throw — просто warning і вихід (щоб сторінка не падала)
      console.warn(`No local mp3 for "${clean}". Tried: ${url} and ${url2}`);
      return;
    } catch (e) {
      console.error("TTS play failed:", e);
      return;
    } finally {
      setLoading(false);
    }
  }

  const btnTitle = title ?? (audioRef.current ? "Stop" : "Play");

  if (asChild) {
    return (
      <span onClick={play} title={btnTitle} className={className} role="button">
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
