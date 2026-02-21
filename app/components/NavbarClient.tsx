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

  // ✅ MOBILE: клік поза меню закриває dropdown
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

  // ✅ MOBILE: Escape закриває dropdown
  useEffect(() => {
    if (!mobile) return;

    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [mobile]);

  // DESKTOP: просто рендеримо праву частину (без ☰)
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
            <NavLabel k="login" />
          </Link>
        )}

        <LanguageSwitcher />
      </div>
    );
  }

  // MOBILE: ☰ + dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-xl px-3 py-2 text-lg hover:bg-slate-100"
        aria-label="Menu"
        type="button"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-[min(92vw,360px)] rounded-2xl border bg-white shadow-lg p-2">
          <nav className="flex flex-col">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setOpen(false)}
              >
                <NavLabel k={item.key} />
              </Link>
            ))}

            {admin && (
              <Link
                href="/admin/reports"
                className="rounded-xl px-3 py-2 text-sm font-semibold border border-slate-300 hover:bg-slate-100 mt-1"
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

            {/* ✅ НЕ обгортаємо UserMenu onClick, інакше воно не відкривається */}
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
                <NavLabel k="login" />
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