import Link from "next/link";
import { auth } from "@/auth";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import UserMenu from "@/app/components/UserMenu";
import SyncBadge from "@/app/components/SyncBadge";

const nav = [
  { href: "/grammar", label: "Граматика" },
  { href: "/dictionary", label: "Словник" },
  { href: "/practice", label: "Тренажер" },
];

export default async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🇸🇰</span>
            <span>Slovak Study</span>
          </Link>

          {/* Nav + actions */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3 min-w-0">
            
            {/* Links */}
            <nav className="flex flex-wrap items-center gap-1 min-w-0">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex flex-wrap items-center gap-2">
              
              {/* 🔥 Показуємо тільки в development */}
              {process.env.NODE_ENV === "development" && <SyncBadge />}

              {session ? (
                <UserMenu
                  name={session.user?.name}
                  email={session.user?.email}
                />
              ) : (
                <Link
                  href="/login"
                  className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                >
                  Login
                </Link>
              )}

              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}