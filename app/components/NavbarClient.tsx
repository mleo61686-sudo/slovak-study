"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "@/app/components/UserMenu";
import PremiumButton from "@/app/components/PremiumButton";
import NavLabel, { type NavKey } from "@/app/components/NavLabel";
import LanguageMenu from "@/app/components/LanguageMenu";
import ThemeToggleButton from "@/app/components/ThemeToggleButton";

type NavItem = { href: string; key: NavKey };

export default function NavbarClient() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isPremium = !!session?.user?.isPremium;
  const isLoggedIn = status === "authenticated";
  const isAdmin = !!session?.user?.isAdmin;

  const nav = useMemo<NavItem[]>(
    () => [
      { href: "/grammar", key: "grammar" },
      { href: "/dictionary", key: "dictionary" },
      {
        href: isPremium ? "/practice" : "/premium",
        key: isPremium ? "practice" : "practiceLocked",
      },
      { href: "/support", key: "support" },
    ],
    [isPremium]
  );

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (!open) return;

      const target = e.target as HTMLElement | null;
      if (target?.closest("[data-onboarding-overlay='true']")) return;

      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    function openForOnboarding() {
      setOpen(true);
    }

    function closeForOnboarding() {
      setOpen(false);
    }

    window.addEventListener(
      "flunio:onboarding:open-mobile-menu",
      openForOnboarding
    );

    window.addEventListener(
      "flunio:onboarding:close-mobile-menu",
      closeForOnboarding
    );

    return () => {
      window.removeEventListener(
        "flunio:onboarding:open-mobile-menu",
        openForOnboarding
      );

      window.removeEventListener(
        "flunio:onboarding:close-mobile-menu",
        closeForOnboarding
      );
    };
  }, []);

  return (
    <>
      <div className="hidden items-center gap-3 sm:flex">
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="theme-nav-link rounded-xl px-3 py-2 text-sm font-medium transition"
            >
              <span className="inline-block min-w-[88px] text-center">
                <NavLabel k={item.key} />
              </span>
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin/reports"
              className="theme-nav-button rounded-xl border px-3 py-2 text-sm font-semibold transition"
              title="Bug reports"
            >
              🛠️ <NavLabel k="reports" />
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {isLoggedIn && <PremiumButton />}

          {isLoggedIn ? (
            <>
              <UserMenu
                name={session.user?.name ?? null}
                email={session.user?.email ?? null}
                isPremium={!!session.user?.isPremium}
              />
              <LanguageMenu />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="theme-nav-link rounded-xl px-3 py-2 text-sm font-medium transition"
              >
                <span className="inline-block min-w-[60px] whitespace-nowrap text-center">
                  <NavLabel k="login" />
                </span>
              </Link>

              <LanguageMenu />
              <ThemeToggleButton />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:hidden" ref={menuRef}>
        <LanguageMenu mobile />

        <button
          onClick={() => setOpen((v) => !v)}
          className={[
            "theme-icon-button inline-flex h-10 w-10 items-center justify-center rounded-xl border text-lg backdrop-blur transition",
            "active:scale-95",
            open ? "ring-2 ring-cyan-400/60 ring-offset-2 ring-offset-slate-950" : "",
          ].join(" ")}
          aria-label="Menu"
          aria-expanded={open}
          type="button"
          data-onboarding="mobile-menu"
        >
          {open ? "✕" : "☰"}
        </button>

        {open && (
          <div className="fixed inset-0 z-[90] sm:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-slate-950/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div
              className={[
                "absolute right-3 top-[64px] w-[min(92vw,380px)]",
                "max-h-[calc(100dvh-88px)] overflow-y-auto overscroll-contain",
                "theme-menu-panel rounded-3xl p-2",
                "shadow-[0_24px_90px_rgba(0,0,0,0.60)] backdrop-blur-2xl",
              ].join(" ")}
            >
              <nav className="flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="theme-menu-item rounded-2xl px-3 py-3 text-sm font-semibold transition active:scale-[0.99]"
                    onClick={() => setOpen(false)}
                  >
                    <span className="inline-block min-w-[88px] whitespace-nowrap">
                      <NavLabel k={item.key} />
                    </span>
                  </Link>
                ))}

                {isAdmin && (
                  <Link
                    href="/admin/reports"
                    className="theme-nav-button mt-1 rounded-2xl border px-3 py-3 text-sm font-semibold transition active:scale-[0.99]"
                    onClick={() => setOpen(false)}
                  >
                    🛠️ <NavLabel k="reports" />
                  </Link>
                )}
              </nav>

              <div className="theme-divider my-2" />

              {isLoggedIn && (
                <div className="px-1 pb-2">
                  <PremiumButton />
                </div>
              )}

              {isLoggedIn ? (
                <UserMenu
                  name={session.user?.name ?? null}
                  email={session.user?.email ?? null}
                  isPremium={!!session.user?.isPremium}
                  mobile
                  onNavigate={() => setOpen(false)}
                />
              ) : (
                <Link
                  href="/login"
                  className="theme-menu-item block rounded-2xl px-3 py-3 text-sm font-semibold transition active:scale-[0.99]"
                  onClick={() => setOpen(false)}
                >
                  <span className="inline-block min-w-[60px] whitespace-nowrap">
                    <NavLabel k="login" />
                  </span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}