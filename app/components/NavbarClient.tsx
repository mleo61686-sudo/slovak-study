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
          className="theme-icon-button inline-flex h-10 w-10 items-center justify-center rounded-xl border text-lg backdrop-blur transition"
          aria-label="Menu"
          type="button"
          data-onboarding="mobile-menu"
        >
          ☰
        </button>

        {open && (
          <div className="theme-menu-panel absolute right-0 top-full z-50 mt-2 w-[min(92vw,360px)] rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="theme-menu-item rounded-xl px-3 py-2 text-sm font-medium transition"
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
                  className="theme-nav-button mt-1 rounded-xl border px-3 py-2 text-sm font-semibold transition"
                  onClick={() => setOpen(false)}
                >
                  🛠️ <NavLabel k="reports" />
                </Link>
              )}
            </nav>

            <div className="mt-3 space-y-2">
              {isLoggedIn && (
                <div onClick={() => setOpen(false)}>
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
                  className="theme-menu-item block rounded-xl px-3 py-2 text-sm font-medium transition"
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