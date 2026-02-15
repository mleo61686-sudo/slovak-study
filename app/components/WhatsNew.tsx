import Link from "next/link";
import { UPDATES } from "@/app/updates/updates";

type Lang = "ua" | "ru";

function formatUA(dateISO: string) {
  const [y, m, d] = dateISO.split("-").map(Number);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

export default function WhatsNew({ lang }: { lang: Lang }) {
  const latest = UPDATES.slice(0, 2);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm ring-1 ring-black/5 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {lang === "ru" ? "Последние обновления ✨" : "Останні оновлення ✨"}
        </h2>

        <Link href="/updates" className="text-sm font-semibold underline text-slate-700">
          {lang === "ru" ? "Все обновления →" : "Усі оновлення →"}
        </Link>
      </div>

      <div className="space-y-4">
        {latest.map((u) => (
          <div key={u.date} className="rounded-2xl border bg-slate-50 p-5">
            <div className="text-sm text-slate-500">{formatUA(u.date)}</div>
            <div className="font-semibold">{u.title[lang]}</div>

            <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
              {u.items[lang].slice(0, 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
