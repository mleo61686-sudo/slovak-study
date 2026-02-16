"use client";

import React, { useMemo, useRef, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  text: string;
  lang?: string; // sk-SK by default
  className?: string;
  title?: string;
  label?: string;
  asChild?: boolean;
};

export default function SpeakButton({
  text,
  lang = "sk-SK",
  className = "inline-flex items-center justify-center rounded-xl border bg-white px-3 py-2 text-sm font-semibold hover:bg-slate-50 active:scale-[0.99] transition",
  title,
  label,
  asChild = false,
}: Props) {
  const { lang: uiLang } = useLanguage();

  const computedTitle = useMemo(
    () =>
      title ??
      (uiLang === "ru" ? "Прослушать произношение" : "Прослухати вимову"),
    [title, uiLang]
  );

  const computedLabel = useMemo(
    () => label ?? (uiLang === "ru" ? "🔊 Прослушать" : "🔊 Прослухати"),
    [label, uiLang]
  );

  const [loading, setLoading] = useState(false);
  const lastTextRef = useRef<string>("");

  function speakBrowserTts() {
    const t = (text ?? "").trim();
    if (!t) return;

    // якщо API нема — SpeechSynthesis єдиний варіант
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("speechSynthesis not supported");
      return;
    }

    // ✅ stop previous
    try {
      synth.cancel();
    } catch {}

    setLoading(true);

    const u = new SpeechSynthesisUtterance(t);
    u.lang = lang;

    // спроба вибрати словацький голос якщо є
    try {
      const voices = synth.getVoices?.() ?? [];
      const v =
        voices.find((x) => (x.lang || "").toLowerCase().startsWith("sk")) ??
        voices.find((x) => (x.lang || "").toLowerCase().includes("sk"));
      if (v) u.voice = v;
    } catch {}

    u.onend = () => setLoading(false);
    u.onerror = () => setLoading(false);

    lastTextRef.current = t;

    // ✅ iOS інколи не стартує з першого разу — але з кліку має
    try {
      synth.speak(u);
    } catch (e) {
      console.error("TTS speak error:", e);
      setLoading(false);
    }
  }

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    speakBrowserTts();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      speakBrowserTts();
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
