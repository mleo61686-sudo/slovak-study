"use client";

import { useLanguage } from "@/lib/src/useLanguage";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const baseClass =
    "h-9 w-12 rounded-lg border text-sm font-semibold transition";

  const active = "bg-black text-white";
  const inactive = "bg-white hover:bg-slate-50";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-pressed={lang === "ua"}
        onClick={() => setLang("ua")}
        className={`${baseClass} ${lang === "ua" ? active : inactive}`}
      >
        UA
      </button>

      <button
        type="button"
        aria-pressed={lang === "ru"}
        onClick={() => setLang("ru")}
        className={`${baseClass} ${lang === "ru" ? active : inactive}`}
      >
        RU
      </button>

      <button
        type="button"
        aria-pressed={lang === "en"}
        onClick={() => setLang("en")}
        className={`${baseClass} ${lang === "en" ? active : inactive}`}
      >
        EN
      </button>
    </div>
  );
}