"use client";

import { signOut } from "next-auth/react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru";

const T: Record<Lang, { logout: string }> = {
  ua: { logout: "Вийти" },
  ru: { logout: "Выйти" },
};

export default function LogoutButton() {
  const { lang } = useLanguage();
  const L: Lang = (lang as Lang) ?? "ua";
  const t = T[L];

  return (
    <button
      onClick={async () => {
        try {
          // очищаємо локальний активний user
          localStorage.removeItem("slovakStudy.activeUserId");

          // сигналимо UI
          window.dispatchEvent(new Event("storage"));
        } catch {}

        // logout без автоматичного redirect
        await signOut({ redirect: false });

        // повне перезавантаження (гарантований reset cookies + state)
        window.location.href = "/login";
      }}
      className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
      type="button"
    >
      {t.logout}
    </button>
  );
}
