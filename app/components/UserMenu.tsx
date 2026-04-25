"use client";

import { useState, useRef, useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/src/useLanguage";
import {
  getUserLevel,
  getXpState,
  type XpState,
} from "@/app/components/words-srs/words-srs-storage";

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
    manageSub: string;
    manageSubHint: string;
    logout: string;
    userFallback: string;
    level: string;
    xp: string;
    nextLevel: string;
    maxLevel: string;
  }
> = {
  ua: {
    profile: "Профіль",
    chooseLanguage: "Обрати курс",
    manageSub: "Керувати підпискою",
    manageSubHint: "Змінити тариф • скасувати • оновити картку • рахунки",
    logout: "Вийти",
    userFallback: "Користувач",
    level: "Рівень",
    xp: "XP",
    nextLevel: "до наступного рівня",
    maxLevel: "Максимальний рівень",
  },
  ru: {
    profile: "Профиль",
    chooseLanguage: "Выбрать курс",
    manageSub: "Управлять подпиской",
    manageSubHint: "Сменить тариф • отменить • обновить карту • счета",
    logout: "Выйти",
    userFallback: "Пользователь",
    level: "Уровень",
    xp: "XP",
    nextLevel: "до следующего уровня",
    maxLevel: "Максимальный уровень",
  },
  en: {
    profile: "Profile",
    chooseLanguage: "Choose course",
    manageSub: "Manage subscription",
    manageSubHint: "Change plan • cancel • update card • invoices",
    logout: "Log out",
    userFallback: "User",
    level: "Level",
    xp: "XP",
    nextLevel: "to next level",
    maxLevel: "Max level",
  },
};

function AvatarCircle({
  avatarUrl,
  initial,
  size = "sm",
}: {
  avatarUrl: string;
  initial: string;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "md" ? "h-10 w-10" : "h-9 w-9";

  return (
    <div
      className={`flex ${sizeClass} items-center justify-center overflow-hidden rounded-full bg-slate-900 text-sm font-semibold text-white`}
    >
      {avatarUrl ? (
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
  const { data: session } = useSession();
  const userId = String(session?.user?.id ?? "");

  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [xp, setXp] = useState<XpState>({ totalXp: 0 });

  const menuRef = useRef<HTMLDivElement>(null);

  const initial = (name || email || "?").charAt(0).toUpperCase();
  const levelInfo = getUserLevel(xp.totalXp);
  const levelTitle = levelInfo.title[L] ?? levelInfo.title.ua;
  const xpToNext = Math.max(0, levelInfo.nextLevelXp - xp.totalXp);
  const isMaxLevel = levelInfo.progressPercent >= 100;

  useEffect(() => {
    if (!userId) return;

    setXp(getXpState(userId));

    function handleSrsChanged() {
      setXp(getXpState(userId));
    }

    window.addEventListener("slovakStudy:srsChanged", handleSrsChanged);
    window.addEventListener("storage", handleSrsChanged);

    return () => {
      window.removeEventListener("slovakStudy:srsChanged", handleSrsChanged);
      window.removeEventListener("storage", handleSrsChanged);
    };
  }, [userId]);

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

        if (!cancelled && res.ok && data?.ok && data.avatarUrl) {
          setAvatarUrl(data.avatarUrl);
        }
      } catch {
        // avatar is optional
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
      }
    }

    window.addEventListener("flunio:avatarUpdated", handleAvatarUpdated);

    return () => {
      window.removeEventListener("flunio:avatarUpdated", handleAvatarUpdated);
    };
  }, []);

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

  if (mobile) {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3">
            <AvatarCircle avatarUrl={avatarUrl} initial={initial} size="md" />

            <div className="min-w-0">
              <div className="truncate font-semibold text-slate-900">
                {name || t.userFallback}
              </div>
              <div className="break-all text-sm text-slate-500">{email}</div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {t.level}
                </div>
                <div className="truncate text-sm font-bold text-amber-950">
                  ⭐ {levelInfo.level} · {levelTitle}
                </div>
              </div>

              <div className="shrink-0 text-right">
                <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                  {t.xp}
                </div>
                <div className="text-sm font-bold text-amber-950">
                  {xp.totalXp}
                </div>
              </div>
            </div>

            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-100">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-300"
                style={{ width: `${levelInfo.progressPercent}%` }}
              />
            </div>

            <div className="mt-1 text-xs text-amber-800">
              {isMaxLevel ? t.maxLevel : `${xpToNext} XP ${t.nextLevel}`}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200" />

        <Link
          href="/account"
          className="block px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
          onClick={() => onNavigate?.()}
        >
          {t.profile}
        </Link>

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
        className="rounded-full transition hover:scale-[1.03]"
        type="button"
        aria-label="User menu"
      >
        <AvatarCircle avatarUrl={avatarUrl} initial={initial} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-xl border bg-white shadow-lg"
          style={{ maxWidth: "calc(100vw - 16px)" }}
        >
          <div className="px-4 py-4 text-sm">
            <div className="flex items-center gap-3">
              <AvatarCircle avatarUrl={avatarUrl} initial={initial} size="md" />

              <div className="min-w-0">
                <div className="truncate font-semibold text-slate-900">
                  {name || t.userFallback}
                </div>
                <div className="truncate text-slate-500">{email}</div>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {t.level}
                  </div>
                  <div className="truncate text-sm font-bold text-amber-950">
                    ⭐ {levelInfo.level} · {levelTitle}
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {t.xp}
                  </div>
                  <div className="text-sm font-bold text-amber-950">
                    {xp.totalXp}
                  </div>
                </div>
              </div>

              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-amber-100">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${levelInfo.progressPercent}%` }}
                />
              </div>

              <div className="mt-1 text-xs text-amber-800">
                {isMaxLevel ? t.maxLevel : `${xpToNext} XP ${t.nextLevel}`}
              </div>
            </div>
          </div>

          <div className="border-t" />

          <Link
            href="/account"
            className="block px-4 py-2 text-sm hover:bg-slate-50"
            onClick={() => setOpen(false)}
          >
            {t.profile}
          </Link>

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