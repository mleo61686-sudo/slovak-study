"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Lang = "ua" | "ru" | "en";

const LANGUAGES: {
  code: Lang;
  flagSrc: string;
  label: string;
}[] = [
    {
      code: "ua",
      flagSrc: "https://flagcdn.com/w40/ua.png",
      label: "Українська",
    },
    {
      code: "ru",
      flagSrc: "https://flagcdn.com/w40/ru.png",
      label: "Русский",
    },
    {
      code: "en",
      flagSrc: "https://flagcdn.com/w40/gb.png",
      label: "English",
    },
  ];

type Props = {
  mobile?: boolean;
};

export default function LanguageMenu({ mobile = false }: Props) {
  const { lang, setLang } = useLanguage();
  const router = useRouter();
  const current: Lang = lang === "ru" ? "ru" : lang === "en" ? "en" : "ua";

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const active =
    LANGUAGES.find((item) => item.code === current) ?? LANGUAGES[0];

  useEffect(() => {
    function handleOutside(event: MouseEvent) {
      if (
        open &&
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    function handleEsc(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          "inline-flex items-center justify-center border border-slate-200 bg-white hover:bg-slate-50",
          mobile
            ? "h-10 w-10 rounded-xl"
            : "h-9 w-9 rounded-full",
        ].join(" ")}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Interface language"
        title="Interface language"
      >
        <Image
          src={active.flagSrc}
          alt={active.label}
          width={18}
          height={18}
          className="h-[18px] w-[18px] rounded-full object-cover"
          unoptimized
        />
      </button>

      {open && (
        <div
          className={[
            "absolute top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-lg",
            mobile ? "right-0 w-52" : "right-0 w-56",
          ].join(" ")}
          style={{ maxWidth: "calc(100vw - 16px)" }}
          role="menu"
        >
          <div className="px-2 pb-2 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Interface language
          </div>

          <div className="flex flex-col gap-1">
            {LANGUAGES.map((item) => {
              const isActive = item.code === current;

              return (
                <button
                  key={item.code}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => {
                    setLang(item.code);
                    setOpen(false);
                    router.refresh();
                  }}
                  className={[
                    "flex min-h-11 w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-800 hover:bg-slate-50",
                  ].join(" ")}
                >
                  <span className="flex items-center gap-3">
                    <Image
                      src={item.flagSrc}
                      alt={item.label}
                      width={18}
                      height={18}
                      className="h-[18px] w-[18px] rounded-full object-cover"
                      unoptimized
                    />
                    <span>{item.label}</span>
                  </span>

                  <span
                    className={isActive ? "text-white/90" : "text-slate-400"}
                  >
                    {isActive ? "✓" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}