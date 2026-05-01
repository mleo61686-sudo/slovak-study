"use client";

import { useEffect, useState } from "react";

type AppTheme = "flunio" | "simple";

const THEME_KEY = "flunio.theme";

function applyTheme(theme: AppTheme) {
  document.body.classList.remove("theme-flunio", "theme-simple");
  document.body.classList.add(`theme-${theme}`);
}

export default function ThemeToggleButton() {
  const [theme, setTheme] = useState<AppTheme>("flunio");

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as AppTheme | null;
    const nextTheme = saved === "simple" ? "simple" : "flunio";

    setTheme(nextTheme);
    applyTheme(nextTheme);
  }, []);

  function toggleTheme() {
    const nextTheme: AppTheme = theme === "flunio" ? "simple" : "flunio";

    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-icon-button inline-flex h-10 w-10 items-center justify-center rounded-full border text-base transition hover:scale-[1.03]"
      aria-label="Toggle theme"
      title={theme === "flunio" ? "Simple theme" : "Flunio theme"}
    >
      {theme === "flunio" ? "☀️" : "🌌"}
    </button>
  );
}