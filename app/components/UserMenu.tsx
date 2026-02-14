"use client";

import { useState, useRef, useEffect } from "react";
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
    manageSub: "Керувати підпискою",
    manageSubHint: "Stripe • скасування/картка/інвойси",
    logout: "Вийти",
    userFallback: "Користувач",
    portalError: "Не вдалося відкрити керування підпискою.",
  },
  ru: {
    profile: "Профиль",
    manageSub: "Управлять подпиской",
    manageSubHint: "Stripe • отмена/карта/инвойсы",
    logout: "Выйти",
    userFallback: "Пользователь",
    portalError: "Не удалось открыть управление подпиской.",
  },
};

export default function UserMenu({ name, email }: Props) {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : "ua";
  const t = T[L];

  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = (name || email || "?").charAt(0).toUpperCase();

  // Закриття при кліку поза меню
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Закриття по Escape
  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  async function openPortal() {
    try {
      setLoadingPortal(true);
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data?.url) {
        setOpen(false);
        window.location.href = data.url;
        return;
      }

      alert(t.portalError);
    } catch {
      alert(t.portalError);
    } finally {
      setLoadingPortal(false);
    }
  }

  return (
    <div className="relative ml-auto" ref={menuRef}>
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
            absolute top-full mt-2 right-0
            w-56
            rounded-xl border bg-white shadow-lg overflow-hidden
          "
          style={{ maxWidth: "calc(100vw - 16px)" }}
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

          {/* ✅ Manage subscription */}
          <button
            onClick={openPortal}
            disabled={loadingPortal}
            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 disabled:opacity-50"
            type="button"
          >
            <div className="font-medium">{t.manageSub}</div>
            <div className="text-xs text-slate-500">{t.manageSubHint}</div>
          </button>

          <div className="border-t" />

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
