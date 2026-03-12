"use client";

import { useLanguage } from "@/lib/src/useLanguage";

export default function TopBanner() {
  const { lang } = useLanguage();

  const text =
    lang === "ru"
      ? "✅ Уровни A0–A1-A2-B1 полностью готовы • 🔄 Сайт обновляется ежедневно"
      : "✅ Рівні A0–A1-A2-B1 повністю готові • 🔄 Сайт оновлюється щоденно";

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-600 text-white h-9 sm:h-10">
      {/* MOBILE: без marquee */}
      <div className="flex h-full items-center justify-center px-3 sm:hidden">
        <span className="block truncate whitespace-nowrap text-xs font-medium">
          {text}
        </span>
      </div>

      {/* DESKTOP: marquee можна лишити */}
      <div className="hidden h-full sm:flex sm:items-center">
        <div className="marquee">
          <div className="marquee__track">
            <div className="marquee__group">
              <span className="marquee__item whitespace-nowrap" role="presentation">
                {text}
              </span>
              <span className="marquee__item whitespace-nowrap" role="presentation">
                {text}
              </span>
              <span className="marquee__item whitespace-nowrap" role="presentation">
                {text}
              </span>
            </div>

            <div className="marquee__group" aria-hidden="true">
              <span className="marquee__item whitespace-nowrap">{text}</span>
              <span className="marquee__item whitespace-nowrap">{text}</span>
              <span className="marquee__item whitespace-nowrap">{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}