"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  name?: string | null;
  email?: string | null;
  isPremium?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
};

type Lang = "ua" | "ru" | "en";

const T: Record<
  Lang,
  {
    profile: string;
    chooseLanguage: string;
    interfaceLanguage: string;
    manageSub: string;
    manageSubHint: string;
    logout: string;
    userFallback: string;
  }
> = {
  ua: {
    profile: "Профіль",
    chooseLanguage: "Обрати курс",
    interfaceLanguage: "Мова інтерфейсу",
    manageSub: "Керувати підпискою",
    manageSubHint: "Змінити тариф • скасувати • оновити картку • рахунки",
    logout: "Вийти",
    userFallback: "Користувач",
  },
  ru: {
    profile: "Профиль",
    chooseLanguage: "Выбрать курс",
    interfaceLanguage: "Язык интерфейса",
    manageSub: "Управлять подпиской",
    manageSubHint: "Сменить тариф • отменить • обновить карту • счета",
    logout: "Выйти",
    userFallback: "Пользователь",
  },
  en: {
    profile: "Profile",
    chooseLanguage: "Choose course",
    interfaceLanguage: "Interface language",
    manageSub: "Manage subscription",
    manageSubHint: "Change plan • cancel • update card • invoices",
    logout: "Log out",
    userFallback: "User",
  },
};

const LANGUAGE_OPTIONS: {
  code: Lang;
  label: Record<Lang, string>;
}[] = [
  {
    code: "ua",
    label: {
      ua: "Українська",
      ru: "Украинский",
      en: "Ukrainian",
    },
  },
  {
    code: "ru",
    label: {
      ua: "Русский",
      ru: "Русский",
      en: "Russian",
    },
  },
  {
    code: "en",
    label: {
      ua: "English",
      ru: "English",
      en: "English",
    },
  },
];

export default function UserMenu({
  name,
  email,
  isPremium = false,
  mobile = false,
  onNavigate,
}: Props) {
  const { lang, setLang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = (name || email || "?").charAt(0).toUpperCase();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (mobile) return;
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
  }, [open, mobile]);

  useEffect(() => {
    function handleEsc(event: KeyboardEvent) {
      if (mobile) return;
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobile]);

  async function openPortal() {
    if (!isPremium) {
      onNavigate?.();
      setOpen(false);
      router.push("/premium");
      return;
    }

    try {
      setLoadingPortal(true);

      const res = await fetch("/api/stripe/portal", { method: "POST" });

      const text = await res.text();
      let data: any = {};

      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { raw: text };
      }

      if (res.ok && data?.url) {
        onNavigate?.();
        setOpen(false);
        window.location.href = data.url;
        return;
      }

      console.error("Portal error:", { status: res.status, data });
      onNavigate?.();
      setOpen(false);
      router.push("/premium");
    } catch (e) {
      console.error("Portal exception:", e);
      onNavigate?.();
      setOpen(false);
      router.push("/premium");
    } finally {
      setLoadingPortal(false);
    }
  }

  const languageBlock = (
    <div className="px-4 py-3">
      <div className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
        {t.interfaceLanguage}
      </div>

      <div className="flex flex-col gap-2">
        {LANGUAGE_OPTIONS.map((item) => {
          const isActive = lang === item.code;

          return (
            <button
              key={item.code}
              type="button"
              aria-pressed={isActive}
              onClick={() => setLang(item.code)}
              className={`flex min-h-11 w-full items-center rounded-xl border px-3 py-2 text-left text-sm font-medium transition ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-slate-300 bg-white text-slate-900 hover:bg-slate-50"
              }`}
            >
              {item.label[L]}
            </button>
          );
        })}
      </div>
    </div>
  );

  if (mobile) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="px-4 py-3">
          <div className="font-medium text-slate-900">
            {name || t.userFallback}
          </div>
          <div className="break-all text-sm text-slate-500">{email}</div>
        </div>

        <div className="border-t border-slate-200" />

        <Link
          href="/learn"
          className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
          onClick={() => onNavigate?.()}
        >
          {t.chooseLanguage}
        </Link>

        <button
          onClick={openPortal}
          disabled={loadingPortal}
          className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-100 disabled:opacity-50"
          type="button"
        >
          <div className="font-medium">{t.manageSub}</div>
          <div className="mt-0.5 text-xs text-slate-500">
            {t.manageSubHint}
          </div>
        </button>

        <div className="border-t border-slate-200" />

        {languageBlock}

        <div className="border-t border-slate-200" />

        <button
          onClick={() => {
            onNavigate?.();
            signOut({ callbackUrl: "/login" });
          }}
          className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-slate-100"
          type="button"
        >
          {t.logout}
        </button>
      </div>
    );
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
          className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-xl border bg-white shadow-lg"
          style={{ maxWidth: "calc(100vw - 16px)" }}
        >
          <div className="px-4 py-3 text-sm">
            <div className="font-medium">{name || t.userFallback}</div>
            <div className="truncate text-slate-500">{email}</div>
          </div>

          <div className="border-t" />

          <Link
            href="/learn"
            className="block px-4 py-2 text-sm hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            {t.chooseLanguage}
          </Link>

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

          {languageBlock}

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