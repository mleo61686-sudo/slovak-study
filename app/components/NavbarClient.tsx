"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserMenu from "@/app/components/UserMenu";
import PremiumButton from "@/app/components/PremiumButton";
import NavLabel, { type NavKey } from "@/app/components/NavLabel";
import LanguageMenu from "@/app/components/LanguageMenu";

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
              className="rounded-xl px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <span className="inline-block min-w-[88px] text-center">
                <NavLabel k={item.key} />
              </span>
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin/reports"
              className="rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
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
                className="rounded-xl px-3 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
              >
                <span className="inline-block min-w-[60px] whitespace-nowrap text-center">
                  <NavLabel k="login" />
                </span>
              </Link>

              <LanguageMenu />
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 sm:hidden" ref={menuRef}>
        <LanguageMenu mobile />

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-lg text-white shadow-[0_0_18px_rgba(34,211,238,0.12)] backdrop-blur transition hover:bg-white/10"
          aria-label="Menu"
          type="button"
          data-onboarding="mobile-menu"
        >
          ☰
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,360px)] rounded-2xl border border-white/10 bg-[#080d24]/95 p-2 text-white shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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
                  className="mt-1 rounded-xl border border-white/15 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
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
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
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