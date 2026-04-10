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

  return (
    <>
      <div className="hidden sm:flex items-center gap-3">
        <nav className="flex items-center gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
            >
              <span className="inline-block min-w-[88px] text-center">
                <NavLabel k={item.key} />
              </span>
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin/reports"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-100"
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
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <span className="inline-block min-w-[60px] text-center whitespace-nowrap">
                  <NavLabel k="login" />
                </span>
              </Link>
              <LanguageMenu />
            </>
          )}
        </div>
      </div>

      <div className="sm:hidden flex items-center gap-2" ref={menuRef}>
        <LanguageMenu mobile />

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg hover:bg-slate-100"
          aria-label="Menu"
          type="button"
        >
          ☰
        </button>

        {open && (
          <div className="absolute right-0 top-full z-50 mt-2 w-[min(92vw,360px)] rounded-2xl border bg-white p-2 shadow-lg">
            <nav className="flex flex-col">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
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
                  className="mt-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
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
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
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