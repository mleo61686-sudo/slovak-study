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
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;

    function loadVoices() {
      const v = synth.getVoices();
      if (v.length > 0) setVoices(v);
    }

    loadVoices();
    synth.onvoiceschanged = loadVoices;

    return () => {
      synth.onvoiceschanged = null;
    };
  }, []);

  function speak() {
    if (typeof window === "undefined") return;

    const synth = window.speechSynthesis;
    synth.cancel();

    // якщо натискаємо те саме слово вдруге → повільніше
    if (lastTextRef.current === text) {
      slowModeRef.current = !slowModeRef.current;
    } else {
      slowModeRef.current = false;
      lastTextRef.current = text;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;

    utter.rate = slowModeRef.current ? 0.6 : 1;
    utter.pitch = 1;

    const bestVoice =
      voices.find(
        (v) => v.lang === "sk-SK" && v.name.toLowerCase().includes("google")
      ) ||
      voices.find((v) => v.lang === "sk-SK") ||
      voices.find((v) => v.lang.toLowerCase().startsWith("cs")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("en"));

    if (bestVoice) utter.voice = bestVoice;

    synth.speak(utter);
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
