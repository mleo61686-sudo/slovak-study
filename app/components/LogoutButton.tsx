"use client";

import { signOut } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

const T: Record<Lang, { logout: string }> = {
  ua: { logout: "Вийти" },
  ru: { logout: "Выйти" },
  en: { logout: "Log out" },
};

export default function LogoutButton() {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  return (
    <button
      onClick={async () => {
        try {
          localStorage.removeItem("slovakStudy.activeUserId");
          window.dispatchEvent(new Event("storage"));
        } catch {}

        await signOut({ redirect: false });
        window.location.href = "/login";
      }}
      className="w-full rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-left text-sm font-medium text-red-300 backdrop-blur transition hover:border-red-400/40 hover:bg-red-500/15 hover:text-red-200 theme-simple:border-red-200 theme-simple:bg-red-50 theme-simple:text-red-700 theme-simple:hover:border-red-300 theme-simple:hover:bg-red-100 theme-simple:hover:text-red-800"
      type="button"
    >
      {t.logout}
    </button>
  );
}