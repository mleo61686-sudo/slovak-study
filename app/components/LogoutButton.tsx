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
      className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      type="button"
    >
      {t.logout}
    </button>
  );
}