import Link from "next/link";
import { UPDATES } from "@/app/updates/updates";
import type { Lang } from "@/lib/src/language";

const UI: Record<"title" | "allUpdates", Partial<Record<Lang, string>>> = {
  title: {
    ua: "Останні оновлення ✨",
    ru: "Последние обновления ✨",
    en: "Latest updates ✨",
  },
  allUpdates: {
    ua: "Усі оновлення →",
    ru: "Все обновления →",
    en: "All updates →",
  },
};

function formatUA(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

function tr(key: keyof typeof UI, lang: Lang) {
  return UI[key][lang] ?? UI[key].ua ?? "";
}

export default function WhatsNew({ lang }: { lang: Lang }) {
  const latest = UPDATES.slice(0, 2);

  return (
    <section className="flunio-card space-y-4 rounded-3xl p-8 text-white">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold text-white">{tr("title", lang)}</h2>

        <Link
          href="/updates"
          className="text-sm font-semibold text-cyan-200 underline-offset-4 transition hover:text-cyan-100 hover:underline"
        >
          {tr("allUpdates", lang)}
        </Link>
      </div>

      <div className="space-y-4">
        {latest.map((u) => (
          <div
            key={u.date}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:border-cyan-400/35 hover:bg-white/10"
          >
            <div className="text-sm text-white/45">{formatUA(u.date)}</div>

            <div className="mt-1 font-semibold text-white">
              {u.title[lang] ?? u.title.ua}
            </div>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-white/65">
              {(u.items[lang] ?? u.items.ua ?? [])
                .slice(0, 3)
                .map((t: string) => (
                  <li key={t}>{t}</li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}