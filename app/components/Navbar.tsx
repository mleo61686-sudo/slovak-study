import Link from "next/link";
import NavbarClient from "./NavbarClient";
import CourseBadge from "@/app/components/CourseBadge";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 theme-navbar">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-4">
            <CourseBadge />

            <span className="text-[1.2rem] font-semibold tracking-[-0.02em] theme-text transition group-hover:opacity-80">
              Flunio
            </span>
          </Link>

          <NavbarClient />
        </div>
      </div>
    </header>
  );
}