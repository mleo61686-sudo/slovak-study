"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type FooterDict = {
  copyright: string;
  privacy: string;
  terms: string;
  support: string;
};

const t: Record<Lang, FooterDict> = {
  ua: {
    copyright: "Flunio — вивчай мови щодня",
    privacy: "Конфіденційність",
    terms: "Умови",
    support: "Підтримка",
  },

  ru: {
    copyright: "Flunio — учите языки каждый день",
    privacy: "Конфиденциальность",
    terms: "Условия",
    support: "Поддержка",
  },

  en: {
    copyright: "Flunio — learn languages every day",
    privacy: "Privacy",
    terms: "Terms",
    support: "Support",
  },
};

export default function FooterClient() {
  const { lang } = useLanguage();

  const safeLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
  const dict = t[safeLang];
  const year = new Date().getFullYear();

  return (
    <footer className="theme-footer border-t border-white/10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-4 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="theme-text-muted">
          © {year} {dict.copyright}
        </div>

        <nav
          aria-label="Footer"
          className="flex flex-wrap items-center gap-x-5 gap-y-2"
        >
          <Link
            href="/support"
            className="theme-footer-link transition hover:underline"
          >
            {dict.support}
          </Link>

          <Link
            href="/privacy"
            className="theme-footer-link transition hover:underline"
          >
            {dict.privacy}
          </Link>

          <Link
            href="/terms"
            className="theme-footer-link transition hover:underline"
          >
            {dict.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}