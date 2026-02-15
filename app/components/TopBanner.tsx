"use client";

import { useLanguage } from "@/lib/src/useLanguage";

export default function TopBanner() {
  const { lang } = useLanguage();

  const text =
    lang === "ru"
      ? "✅ Уровни A0–A1 полностью готовы • 🔄 Сайт обновляется ежедневно"
      : "✅ Рівні A0–A1 повністю готові • 🔄 Сайт оновлюється щоденно";

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-emerald-500 to-blue-600 text-white">
      <div className="marquee">
        <div className="marquee__track">
          <div className="marquee__group">
            <span className="marquee__item">{text}</span>
            <span className="marquee__item">{text}</span>
            <span className="marquee__item">{text}</span>
          </div>

          <div className="marquee__group" aria-hidden="true">
            <span className="marquee__item">{text}</span>
            <span className="marquee__item">{text}</span>
            <span className="marquee__item">{text}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
