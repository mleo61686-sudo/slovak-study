"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type FooterLink = {
  href: string;
  label: string;
};

type FooterDict = {
  copyright: string;
  coursesLabel: string;
  courseLinks: FooterLink[];
  privacy: string;
  terms: string;
  support: string;
};

const t: Record<Lang, FooterDict> = {
  ua: {
    copyright: "Flunio — вивчай мови щодня",
    coursesLabel: "Онлайн-курси",
    courseLinks: [
      {
        href: "/vyvchennia-slovatskoi-movy-online",
        label: "Словацька мова онлайн",
      },
      {
        href: "/vyvchennia-cheskoi-movy-online",
        label: "Чеська мова онлайн",
      },
      {
        href: "/vyvchennia-polskoi-movy-online",
        label: "Польська мова онлайн",
      },
    ],
    privacy: "Конфіденційність",
    terms: "Умови",
    support: "Підтримка",
  },

  ru: {
    copyright: "Flunio — учите языки каждый день",
    coursesLabel: "Онлайн-курсы",
    courseLinks: [
      {
        href: "/ru/learn-slovak",
        label: "Словацкий язык онлайн",
      },
      {
        href: "/ru/learn-czech",
        label: "Чешский язык онлайн",
      },
      {
        href: "/ru/learn-polish",
        label: "Польский язык онлайн",
      },
    ],
    privacy: "Конфиденциальность",
    terms: "Условия",
    support: "Поддержка",
  },

  en: {
    copyright: "Flunio — learn languages every day",
    coursesLabel: "Online courses",
    courseLinks: [
      {
        href: "/learn-slovak",
        label: "Learn Slovak online",
      },
      {
        href: "/learn-czech",
        label: "Learn Czech online",
      },
      {
        href: "/learn-polish",
        label: "Learn Polish online",
      },
    ],
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
      <div className="mx-auto w-full max-w-7xl space-y-4 px-4 py-5 text-sm sm:px-6">
        <nav
          aria-label={dict.coursesLabel}
          className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-2"
        >
          <span className="theme-text-muted text-xs font-semibold uppercase tracking-wide">
            {dict.coursesLabel}
          </span>

          {dict.courseLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="theme-footer-link transition hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
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
      </div>
    </footer>
  );
}