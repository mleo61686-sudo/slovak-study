import Link from "next/link";
import { auth } from "@/auth";
import SyncBadge from "@/app/components/SyncBadge";
import NavbarClient from "./NavbarClient";

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
  const isPremium = !!session?.user?.isPremium;

  const nav = [
    { href: "/grammar", label: "Граматика" },
    { href: "/dictionary", label: "Словник" },
    {
      href: isPremium ? "/practice" : "/premium",
      label: isPremium ? "Тренажер" : "Тренажер 🔒",
    },
    // ✅ NEW: Support
    { href: "/support", label: "Підтримка" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-2 sm:py-3">
        {/* TOP ROW */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="text-xl">🇸🇰</span>
            <span>Slovak Study</span>
          </Link>

          {/* DESKTOP RIGHT */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Links */}
            <nav className="flex items-center gap-1">
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

            {process.env.NODE_ENV === "development" && <SyncBadge />}

            {/* решта кнопок/меню/мови — у client-компоненті */}
            <NavbarClient
              nav={nav}
              admin={admin}
              session={
                session
                  ? {
                      name: session.user?.name ?? null,
                      email: session.user?.email ?? null,
                      isPremium: !!session.user?.isPremium,
                    }
                  : null
              }
            />
          </div>

          {/* MOBILE (☰ + dropdown) */}
          <div className="sm:hidden">
            <NavbarClient
              nav={nav}
              admin={admin}
              session={
                session
                  ? {
                      name: session.user?.name ?? null,
                      email: session.user?.email ?? null,
                      isPremium: !!session.user?.isPremium,
                    }
                  : null
              }
              mobile
            />
          </div>
        </div>
      </div>
    </header>
  );
}
