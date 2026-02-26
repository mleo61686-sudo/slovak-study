"use client";

import { useLanguage } from "@/lib/src/useLanguage";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-pressed={lang === "ua"}
        onClick={() => setLang("ua")}
        className={`px-3 py-1 rounded-lg border text-sm font-semibold ${
          lang === "ua" ? "bg-black text-white" : "bg-white hover:bg-slate-50"
        }`}
      >
        UA
      </button>

      <button
        type="button"
        aria-pressed={lang === "ru"}
        onClick={() => setLang("ru")}
        className={`px-3 py-1 rounded-lg border text-sm font-semibold ${
          lang === "ru" ? "bg-black text-white" : "bg-white hover:bg-slate-50"
        }`}
      >
        RU
      </button>
    </div>
  );
}