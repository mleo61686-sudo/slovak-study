"use client";

import { useLanguage } from "@/lib/src/useLanguage";

const LANGUAGES = [
  { code: "ua", label: "Українська", flag: "🇺🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "en", label: "English", flag: "🇬🇧" },
] as const;

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex flex-col gap-2">
      {LANGUAGES.map((item) => {
        const isActive = lang === item.code;

        return (
          <button
            key={item.code}
            type="button"
            aria-pressed={isActive}
            onClick={() => setLang(item.code)}
            className={[
              "flex h-11 w-full items-center gap-3 rounded-xl border px-3 text-left text-sm font-medium transition",
              isActive
                ? "border-black bg-black text-white"
                : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
            ].join(" ")}
          >
            <span className="text-base leading-none">{item.flag}</span>
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}