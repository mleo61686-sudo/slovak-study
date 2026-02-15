"use client";

import { useEffect, useRef, useState } from "react";
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

    // Safari/деякі браузери можуть не мати Utterance
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
  const lastTextRef = useRef<string | null>(null);
  const slowModeRef = useRef(false);

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

      // onvoiceschanged інколи null / не працює — тому в try/catch
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

  function speak() {
    // якщо натискаємо те саме слово вдруге → повільніше
    if (lastTextRef.current === text) {
      slowModeRef.current = !slowModeRef.current;
    } else {
      slowModeRef.current = false;
      lastTextRef.current = text;
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
    speak();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      speak();
    }
  };

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
        {computedLabel}
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
    >
      {computedLabel}
    </button>
  );
}
