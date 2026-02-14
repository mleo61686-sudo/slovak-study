import Link from "next/link";
import { auth } from "@/auth";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";
import UserMenu from "@/app/components/UserMenu";
import SyncBadge from "@/app/components/SyncBadge";
import PremiumButton from "@/app/components/PremiumButton";

const nav = [
  { href: "/grammar", label: "Граматика" },
  { href: "/dictionary", label: "Словник" },
  { href: "/practice", label: "Тренажер" },
];

function isAdmin(email?: string | null) {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS ?? "";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return list.includes(email.toLowerCase());
}

export default async function Navbar() {
  const session = await auth();
  const admin = isAdmin(session?.user?.email);

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

              {admin && (
                <Link
                  href="/admin/reports"
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 border border-slate-300 hover:bg-slate-100"
                  title="Bug reports"
                >
                  🛠️ Reports
                </Link>
              )}
            </nav>

            {/* Right side */}
            <div className="flex flex-wrap items-center gap-2">
              
              {process.env.NODE_ENV === "development" && <SyncBadge />}

              {/* 🔥 Premium button тільки для залогінених */}
              {session && <PremiumButton />}

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
