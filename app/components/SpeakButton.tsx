"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  text: string;
  kind?: "word" | "phrase";
  className?: string;
  title?: string;
  label?: string;
  asChild?: boolean;
  autoPlayKey?: string | number;
};

const urlCache = new Map<string, string[]>();
const courseCache = {
  value: "sk",
  initialized: false,
};

async function sha1Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-1", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function phraseKey13(text: string) {
  const h = await sha1Hex(text.trim());
  return h.slice(0, 13);
}

function getCourseFromCookie() {
  if (typeof document === "undefined") return "sk";
  if (courseCache.initialized) return courseCache.value;

  const found =
    document.cookie
      .split("; ")
      .find((c) => c.startsWith("slovakStudyActiveCourse="))
      ?.split("=")[1] || "sk";

  courseCache.value = found;
  courseCache.initialized = true;
  return found;
}

async function buildLocalUrlsCached(
  text: string,
  kind: "word" | "phrase",
  course: string
) {
  const clean = text.trim();
  const cacheKey = `${course}::${kind}::${clean}`;

  const cached = urlCache.get(cacheKey);
  if (cached) return cached;

  let urls: string[];

  if (kind === "phrase") {
    const key = await phraseKey13(clean);
    urls =
      course === "sk"
        ? [`/audio/phrases/${key}.mp3`]
        : [`/audio/${course}/phrases/${key}.mp3`];
  } else {
    const h = await sha1Hex(`word:${clean}`);
    urls =
      course === "sk"
        ? [`/audio/words/${h}.mp3`]
        : [`/audio/${course}/words/${h}.mp3`];
  }

  urlCache.set(cacheKey, urls);
  return urls;
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
  const lastAutoKeyRef = useRef<string | null>(null);
  const playIdRef = useRef(0);
  const mountedRef = useRef(true);

  const [loading, setLoading] = useState(false);
  const cleanText = useMemo(() => text?.trim() ?? "", [text]);

  const btnTitle = title ?? "Play";

  const stop = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      try {
        a.pause();
      } catch {}
      a.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const play = useCallback(async () => {
    if (!cleanText) return;

    const myPlayId = ++playIdRef.current;
    stop();

    if (mountedRef.current) setLoading(true);

    try {
      const course = getCourseFromCookie();
      const urls = await buildLocalUrlsCached(cleanText, kind, course);

      if (myPlayId !== playIdRef.current) return;

      let lastError: unknown = null;
      let played = false;

      for (const url of urls) {
        try {
          const a = new Audio(url);
          audioRef.current = a;
          a.preload = "none";

          await a.play();
          played = true;
          break;
        } catch (err) {
          lastError = err;
        }
      }

      if (!played && lastError) {
        throw lastError;
      }
    } catch (e: any) {
      if (e?.name === "AbortError") return;

      const msg = String(e?.message ?? "");
      if (msg.includes("interrupted") || msg.includes("pause()")) return;

      console.error("Audio play failed:", e);
    } finally {
      if (myPlayId === playIdRef.current && mountedRef.current) {
        setLoading(false);
      }
    }
  }, [cleanText, kind, stop]);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      stop();
    };
  }, [stop]);

  useEffect(() => {
    if (autoPlayKey === undefined) return;
    if (!cleanText) return;

    const nextKey = `${autoPlayKey}:${kind}:${cleanText}`;
    if (lastAutoKeyRef.current === nextKey) return;
    lastAutoKeyRef.current = nextKey;

    play().catch(() => {});
  }, [autoPlayKey, cleanText, kind, play]);

  if (asChild) {
    return (
      <span
        onClick={() => {
          play();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            play();
          }
        }}
        title={btnTitle}
        className={className}
        role="button"
        tabIndex={0}
        aria-disabled={loading}
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