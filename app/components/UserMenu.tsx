"use client";

import { useEffect, useRef, useState } from "react";
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
  }
> = {
  ua: {
    profile: "Профіль",
    chooseLanguage: "Обрати курс",
    manageSub: "Керувати підпискою",
    manageSubHint: "Змінити тариф • скасувати • оновити картку • рахунки",
    logout: "Вийти",
    userFallback: "Користувач",
  },
  ru: {
    profile: "Профиль",
    chooseLanguage: "Выбрать курс",
    manageSub: "Управлять подпиской",
    manageSubHint: "Сменить тариф • отменить • обновить карту • счета",
    logout: "Выйти",
    userFallback: "Пользователь",
  },
  en: {
    profile: "Profile",
    chooseLanguage: "Choose course",
    manageSub: "Manage subscription",
    manageSubHint: "Change plan • cancel • update card • invoices",
    logout: "Log out",
    userFallback: "User",
  },
};

function ThemeToggle() {
  const [theme, setTheme] = useState<AppTheme>("flunio");

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
      className="user-menu-theme-toggle mx-3 my-2 w-[calc(100%-1.5rem)] rounded-2xl px-4 py-3 text-left text-sm font-medium transition"
    >
      {theme === "flunio" ? "☀️ Simple theme" : "🌌 Flunio theme"}
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
  size?: "sm" | "md";
  loaded?: boolean;
}) {
  const sizeClass = size === "md" ? "h-10 w-10" : "h-9 w-9";

  return (
    <div
      className={`flex ${sizeClass} shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-fuchsia-500 text-sm font-semibold text-white shadow-[0_0_18px_rgba(59,130,246,0.35)]`}
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

  if (mobile) {
    return (
      <div className="theme-menu-panel overflow-hidden rounded-3xl">
        <div className="user-menu-header flex items-center gap-3 px-4 py-4">
          <AvatarCircle
            avatarUrl={avatarUrl}
            initial={initial}
            size="md"
            loaded={avatarLoaded}
          />

          <div className="min-w-0">
            <div className="theme-text truncate font-medium">
              {name || t.userFallback}
            </div>
            <div className="theme-text-muted break-all text-sm">{email}</div>
          </div>
        </div>

        <div className="theme-divider" />

        <Link
          href="/account"
          className="theme-menu-item block px-4 py-3 text-sm transition"
          onClick={() => onNavigate?.()}
        >
          {t.profile}
        </Link>

        <Link
          href="/learn"
          className="theme-menu-item block px-4 py-3 text-sm transition"
          onClick={() => onNavigate?.()}
          data-onboarding="choose-course"
        >
          {t.chooseLanguage}
        </Link>

        <button
          onClick={openPortal}
          disabled={loadingPortal}
          className="theme-menu-item w-full px-4 py-3 text-left text-sm transition disabled:opacity-50"
          type="button"
        >
          <div className="font-medium">{t.manageSub}</div>
          <div className="theme-text-subtle mt-0.5 text-xs">
            {t.manageSubHint}
          </div>
        </button>

        <div className="theme-divider" />

        <ThemeToggle />

        <div className="theme-divider" />

        <button
          onClick={() => {
            onNavigate?.();
            signOut({ callbackUrl: "/login" });
          }}
          className="w-full px-4 py-3 text-left text-sm font-medium text-red-300 transition hover:bg-red-500/10 hover:text-red-200"
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
        className="rounded-full transition hover:scale-[1.03]"
        type="button"
        aria-label="User menu"
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
          className="theme-menu-panel absolute right-0 top-full z-50 mt-3 w-80 overflow-hidden rounded-3xl"
          style={{ maxWidth: "calc(100vw - 16px)" }}
        >
          <div className="user-menu-header flex items-center gap-3 px-4 py-4 text-sm">
            <AvatarCircle
              avatarUrl={avatarUrl}
              initial={initial}
              size="md"
              loaded={avatarLoaded}
            />

            <div className="min-w-0">
              <div className="theme-text truncate font-medium">
                {name || t.userFallback}
              </div>
              <div className="theme-text-muted truncate">{email}</div>
            </div>
          </div>

          <div className="theme-divider" />

          <Link
            href="/account"
            className="theme-menu-item mx-2 block px-3 py-2.5 text-sm font-medium transition"
            onClick={() => setOpen(false)}
          >
            {t.profile}
          </Link>

          <Link
            href="/learn"
            className="theme-menu-item mx-2 block px-3 py-2.5 text-sm font-medium transition"
            onClick={() => setOpen(false)}
            data-onboarding="choose-course"
          >
            {t.chooseLanguage}
          </Link>

          <button
            onClick={openPortal}
            disabled={loadingPortal}
            className="theme-menu-item mx-2 w-[calc(100%-1rem)] px-3 py-2.5 text-left text-sm transition disabled:opacity-50"
            type="button"
          >
            <div className="font-medium">{t.manageSub}</div>
            <div className="theme-text-subtle text-xs">{t.manageSubHint}</div>
          </button>

          <div className="theme-divider" />

          <ThemeToggle />

          <div className="theme-divider" />

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="user-menu-logout mx-2 mb-2 w-[calc(100%-1rem)] rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition"
            type="button"
          >
            {t.logout}
          </button>
        </div>
      )}
    </div>
  );
}