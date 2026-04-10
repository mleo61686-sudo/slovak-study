import Link from "next/link";
import NavbarClient from "./NavbarClient";
import CourseBadge from "@/app/components/CourseBadge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4 group">
            <CourseBadge />

            <span className="text-[1.2rem] font-semibold tracking-[-0.02em] text-slate-900 transition group-hover:text-sky-700">
              Flunio
            </span>
          </Link>

          <NavbarClient />
        </div>
      </div>
    </header>
  );
}