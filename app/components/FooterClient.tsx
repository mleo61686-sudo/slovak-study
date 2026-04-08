"use client";

import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

type FooterDict = {
    slogan: string;
    courses: string;
    grammar: string;
    dictionary: string;
    practice: string;
    support: string;
};

const t: Record<Lang, FooterDict> = {
    ua: {
        slogan: "вивчай мови щодня.",
        courses: "Курси",
        grammar: "Граматика",
        dictionary: "Словник",
        practice: "Тренажер",
        support: "Підтримка",
    },
    ru: {
        slogan: "учите языки каждый день.",
        courses: "Курсы",
        grammar: "Грамматика",
        dictionary: "Словарь",
        practice: "Тренажёр",
        support: "Поддержка",
    },
    en: {
        slogan: "learn languages every day.",
        courses: "Courses",
        grammar: "Grammar",
        dictionary: "Dictionary",
        practice: "Practice",
        support: "Support",
    },
};

export default function FooterClient() {
    const { lang } = useLanguage();

    const safeLang: Lang = lang === "ru" || lang === "en" ? lang : "ua";
    const dict = t[safeLang];

    return (
        <footer className="border-t bg-white">
            <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-600">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-left">
                        © {new Date().getFullYear()} Flunio — {dict.slogan}
                    </div>

                    <nav
                        aria-label="Footer"
                        className="grid grid-cols-2 gap-x-6 gap-y-2 text-left sm:flex sm:flex-wrap sm:items-center sm:justify-end"
                    >
                        <a className="hover:text-slate-900 hover:underline" href="/learn">
                            {dict.courses}
                        </a>
                        <a className="hover:text-slate-900 hover:underline" href="/grammar">
                            {dict.grammar}
                        </a>
                        <a className="hover:text-slate-900 hover:underline" href="/dictionary">
                            {dict.dictionary}
                        </a>
                        <a className="hover:text-slate-900 hover:underline" href="/practice">
                            {dict.practice}
                        </a>
                        <a className="hover:text-slate-900 hover:underline" href="/support">
                            {dict.support}
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    );
}