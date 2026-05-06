"use client";

import { useEffect, useRef, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";
import FocusMusic from "@/app/components/FocusMusic";

type Props = {
  name?: string | null;
  email?: string | null;
  isPremium?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
};

type Lang = "ua" | "ru" | "en";
type AppTheme = "flunio" | "simple";

const THEME_KEY = "flunio.theme";

const T: Record<
  Lang,
  {
    profile: string;
    chooseLanguage: string;
    manageSub: string;
    manageSubHint: string;
    logout: string;
    userFallback: string;
    premium: string;
    free: string;
    themeSimple: string;
    themeFlunio: string;
  }
> = {
  ua: {
    profile: "Профіль",
    chooseLanguage: "Обрати курс",
    manageSub: "Керувати підпискою",
    manageSubHint: "Тариф • картка • рахунки • скасування",
    logout: "Вийти",
    userFallback: "Користувач",
    premium: "Premium",
    free: "Free",
    themeSimple: "☀️ Simple theme",
    themeFlunio: "🌌 Flunio theme",
  },
  ru: {
    profile: "Профиль",
    chooseLanguage: "Выбрать курс",
    manageSub: "Управлять подпиской",
    manageSubHint: "Тариф • карта • счета • отмена",
    logout: "Выйти",
    userFallback: "Пользователь",
    premium: "Premium",
    free: "Free",
    themeSimple: "☀️ Simple theme",
    themeFlunio: "🌌 Flunio theme",
  },
  en: {
    profile: "Profile",
    chooseLanguage: "Choose course",
    manageSub: "Manage subscription",
    manageSubHint: "Plan • card • invoices • cancel",
    logout: "Log out",
    userFallback: "User",
    premium: "Premium",
    free: "Free",
    themeSimple: "☀️ Simple theme",
    themeFlunio: "🌌 Flunio theme",
  },
};

function ThemeToggle({ lang }: { lang: Lang }) {
  const [theme, setTheme] = useState<AppTheme>("flunio");
  const t = T[lang];

  useEffect(() => {
    const saved = localStorage.getItem(THEME_KEY) as AppTheme | null;
    const nextTheme = saved === "simple" ? "simple" : "flunio";

    setTheme(nextTheme);
    document.body.classList.remove("theme-flunio", "theme-simple");
    document.body.classList.add(`theme-${nextTheme}`);
  }, []);

  function toggleTheme() {
    const nextTheme: AppTheme = theme === "flunio" ? "simple" : "flunio";

    setTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);

    document.body.classList.remove("theme-flunio", "theme-simple");
    document.body.classList.add(`theme-${nextTheme}`);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="mx-2 flex w-[calc(100%-1rem)] items-center justify-between rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2.5 text-left text-sm font-semibold text-cyan-50 transition hover:border-cyan-300/40 hover:bg-cyan-400/15 active:scale-[0.99]"
    >
      <span>{theme === "flunio" ? t.themeSimple : t.themeFlunio}</span>
    </button>
  );
}

function AvatarCircle({
  avatarUrl,
  initial,
  size = "sm",
  loaded = true,
}: {
  avatarUrl: string;
  initial: string;
  size?: "sm" | "md" | "lg";
  loaded?: boolean;
}) {
  const sizeClass =
    size === "lg" ? "h-12 w-12" : size === "md" ? "h-10 w-10" : "h-9 w-9";

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-500 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.35)] ring-1 ring-white/15`}
    >
      {!loaded ? (
        <div className="h-full w-full animate-pulse bg-white/20" />
      ) : avatarUrl ? (
        <img src={avatarUrl} alt="" className="h-full w-full object-cover" />
      ) : (
        initial
      )}
    </div>
  );
}

function Divider() {
  return <div className="my-2 h-px bg-white/10" />;
}

function MenuItem({
  href,
  children,
  onClick,
  onboarding,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  onboarding?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      data-onboarding={onboarding}
      className="mx-2 flex items-center rounded-2xl px-3 py-2.5 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
    >
      {children}
    </Link>
  );
}

export default function UserMenu({
  name,
  email,
  isPremium = false,
  mobile = false,
  onNavigate,
}: Props) {
  const { lang } = useLanguage();
  const L: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";
  const t = T[L];

  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarLoaded, setAvatarLoaded] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const initial = (name || email || "?").charAt(0).toUpperCase();

  useEffect(() => {
    let cancelled = false;

    async function loadAvatar() {
      try {
        const res = await fetch("/api/account/update-avatar", {
          method: "GET",
          cache: "no-store",
        });

        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          avatarUrl?: string | null;
        };

        if (!cancelled && res.ok && data?.ok) {
          setAvatarUrl(data.avatarUrl ?? "");
        }
      } catch {
        // avatar is optional
      } finally {
        if (!cancelled) setAvatarLoaded(true);
      }
    }

    loadAvatar();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function handleAvatarUpdated(event: Event) {
      const customEvent = event as CustomEvent<{ avatarUrl?: string }>;
      const nextAvatarUrl = customEvent.detail?.avatarUrl;

      if (typeof nextAvatarUrl === "string") {
        setAvatarUrl(nextAvatarUrl);
        setAvatarLoaded(true);
      }
    }

    window.addEventListener("flunio:avatarUpdated", handleAvatarUpdated);

    return () => {
      window.removeEventListener("flunio:avatarUpdated", handleAvatarUpdated);
    };
  }, []);

  useEffect(() => {
    if (mobile) return;

    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement | null;

      if (target?.closest("[data-onboarding-overlay='true']")) return;

      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, mobile]);

  useEffect(() => {
    if (mobile) return;

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [mobile]);

  useEffect(() => {
    if (mobile) return;

    function openForOnboarding() {
      setOpen(true);
    }

    function closeForOnboarding() {
      setOpen(false);
    }

    window.addEventListener(
      "flunio:onboarding:open-user-menu",
      openForOnboarding
    );

    window.addEventListener(
      "flunio:onboarding:close-user-menu",
      closeForOnboarding
    );

    return () => {
      window.removeEventListener(
        "flunio:onboarding:open-user-menu",
        openForOnboarding
      );

      window.removeEventListener(
        "flunio:onboarding:close-user-menu",
        closeForOnboarding
      );
    };
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

  const userName = name || t.userFallback;

  const userHeader = (
    <div className="relative overflow-hidden rounded-t-3xl border-b border-white/10 bg-gradient-to-br from-cyan-500/18 via-white/5 to-fuchsia-500/16 px-4 py-4">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-cyan-400/20 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-12 left-8 h-24 w-24 rounded-full bg-fuchsia-400/15 blur-2xl" />

      <div className="relative flex items-center gap-3">
        <AvatarCircle
          avatarUrl={avatarUrl}
          initial={initial}
          size="lg"
          loaded={avatarLoaded}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-bold text-white">
              {userName}
            </div>

            <span
              className={[
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide",
                isPremium
                  ? "bg-amber-400/95 text-slate-950"
                  : "bg-white/10 text-white/70",
              ].join(" ")}
            >
              {isPremium ? t.premium : t.free}
            </span>
          </div>

          <div className="truncate text-xs text-white/60">{email}</div>
        </div>
      </div>
    </div>
  );

  const menuContent = (
    <>
      {userHeader}

      <div className="py-2">
        <MenuItem
          href="/account"
          onClick={() => {
            onNavigate?.();
            setOpen(false);
          }}
        >
          {t.profile}
        </MenuItem>

        <MenuItem
          href="/learn"
          onboarding="choose-course"
          onClick={() => {
            onNavigate?.();
            setOpen(false);
          }}
        >
          {t.chooseLanguage}
        </MenuItem>

        <button
          onClick={openPortal}
          disabled={loadingPortal}
          className="mx-2 w-[calc(100%-1rem)] rounded-2xl px-3 py-2.5 text-left text-sm transition hover:bg-white/10 disabled:opacity-50"
          type="button"
        >
          <div className="font-semibold text-white/85">{t.manageSub}</div>
          <div className="mt-0.5 text-xs leading-snug text-white/45">
            {t.manageSubHint}
          </div>
        </button>
      </div>

      <Divider />

      <div className="py-1">
        <ThemeToggle lang={L} />
      </div>

      <Divider />

      <div className="py-1">
        <FocusMusic />
      </div>

      <Divider />

      <div className="pb-2">
        <button
          onClick={() => {
            onNavigate?.();
            setOpen(false);
            signOut({ callbackUrl: "/login" });
          }}
          className="mx-2 w-[calc(100%-1rem)] rounded-2xl px-3 py-2.5 text-left text-sm font-semibold text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
          type="button"
        >
          {t.logout}
        </button>
      </div>
    </>
  );

  if (mobile) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/82 text-white shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        {menuContent}
      </div>
    );
  }

  return (
    <div className="relative ml-auto" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={[
          "rounded-full transition",
          "hover:scale-[1.03] active:scale-95",
          open ? "ring-2 ring-cyan-400/60 ring-offset-2 ring-offset-slate-950" : "",
        ].join(" ")}
        type="button"
        aria-label="User menu"
        aria-expanded={open}
        data-onboarding="avatar"
      >
        <AvatarCircle
          avatarUrl={avatarUrl}
          initial={initial}
          loaded={avatarLoaded}
        />
      </button>

      {open && (
        <div
          className={[
            "absolute right-0 top-full z-[100] mt-3 w-[340px]",
            "max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain",
            "rounded-3xl border border-white/10 bg-slate-950/88 text-white",
            "shadow-[0_24px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl",
          ].join(" ")}
          style={{ maxWidth: "calc(100vw - 16px)" }}
        >
          {menuContent}
        </div>
      )}
    </div>
  );
}