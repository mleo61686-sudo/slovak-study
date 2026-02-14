"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  name?: string | null;
  email?: string | null;
};

type Lang = "ua" | "ru";

const T: Record<Lang, any> = {
  ua: {
    profile: "Профіль",
    logout: "Вийти",
    userFallback: "Користувач",
  },
  ru: {
    profile: "Профиль",
    logout: "Выйти",
    userFallback: "Пользователь",
  },
};

export default function UserMenu({ name, email }: Props) {
  const { lang } = useLanguage();
  const L: Lang = (lang as Lang) ?? "ua";
  const t = T[L];

  const [open, setOpen] = useState(false);

  const initial = (name || email || "?").charAt(0).toUpperCase();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white"
        type="button"
        aria-label="User menu"
      >
        {initial}
      </button>

      {open && (
        <div
          className="
            absolute top-full mt-2
            left-1/2 -translate-x-1/2
            sm:left-auto sm:right-0 sm:translate-x-0
            w-56 max-w-[calc(100vw-16px)]
            rounded-xl border bg-white shadow-lg overflow-hidden
          "
        >
          <div className="px-4 py-3 text-sm">
            <div className="font-medium">{name || t.userFallback}</div>
            <div className="text-slate-500 truncate">{email}</div>
          </div>

          <div className="border-t" />

          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            {t.profile}
          </Link>

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-50"
            type="button"
          >
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}
