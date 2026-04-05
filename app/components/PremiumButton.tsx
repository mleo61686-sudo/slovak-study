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
      className="rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
    >
      {label}
    </button>
  );
}