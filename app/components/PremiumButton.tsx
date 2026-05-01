"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

const LABELS = {
  ua: "Преміум ⭐",
  ru: "Премиум ⭐",
  en: "Premium ⭐",
} as const;

export default function PremiumButton() {
  const router = useRouter();
  const { lang } = useLanguage();

  const label = LABELS[lang] ?? LABELS.ua;

  return (
    <button
      onClick={() => router.push("/premium")}
      className="rounded-xl bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 px-3 py-2 text-sm font-semibold text-black shadow-[0_0_18px_rgba(251,191,36,0.45)] transition hover:scale-[1.03] hover:shadow-[0_0_28px_rgba(251,191,36,0.7)] active:scale-[0.98] theme-simple:shadow-md theme-simple:hover:shadow-lg"
      type="button"
    >
      {label}
    </button>
  );
}