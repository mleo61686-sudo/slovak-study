"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import UserMenu from "@/app/components/UserMenu";
import PremiumButton from "@/app/components/PremiumButton";
import NavLabel, { type NavKey } from "@/app/components/NavLabel";

type NavItem = { href: string; key: NavKey };

export default function NavbarClient({
  nav,
  admin,
  session,
  mobile = false,
}: {
  nav: NavItem[];
  admin: boolean;
  session: { name: string | null; email: string | null; isPremium: boolean } | null;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobile) return;

    function handleOutside(e: MouseEvent) {
      if (!open) return;
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [open, mobile]);

  useEffect(() => {
    if (!mobile) return;

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobile]);

  if (!mobile) {
    return (
      <div className="flex items-center gap-2">
        {session && <PremiumButton />}

        {session ? (
          <UserMenu
            name={session.name}
            email={session.email}
            isPremium={session.isPremium}
          />
        ) : (
          <Link
            href="/login"
            className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          >
            <span className="inline-block min-w-[60px] text-center whitespace-nowrap">
              <NavLabel k="login" />
            </span>
          </Link>
        )}

        <LanguageSwitcher />
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-lg hover:bg-slate-100"
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

            {admin && (
              <Link
                href="/admin/reports"
                className="mt-1 rounded-xl border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                🛠️ <NavLabel k="reports" />
              </Link>
            )}
          </nav>

          <div className="mt-2 flex items-center justify-between gap-2">
            {session && (
              <div onClick={() => setOpen(false)}>
                <PremiumButton />
              </div>
            )}

            {session ? (
              <UserMenu
                name={session.name}
                email={session.email}
                isPremium={session.isPremium}
              />
            ) : (
              <Link
                href="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <span className="inline-block min-w-[60px] text-center whitespace-nowrap">
                  <NavLabel k="login" />
                </span>
              </Link>
            )}

            <div onClick={() => setOpen(false)}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}