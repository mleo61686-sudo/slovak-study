"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "slovakStudy.progress";

const TOPIC_TITLES: Record<string, string> = {
  "present-tense": "Present tense (теперішній час)",
  "past-tense": "Past tense (минулий час)",
  "future-tense": "Future tense (майбутній час)",
  "modal-verbs": "Modal verbs (модальні дієслова)",
  "word-order": "Word order (порядок слів)",
};

type TopicData =
  | boolean
  | {
      done?: boolean;
      lastStudied?: string;
    };

type TopicItem = {
  id: string;
  title: string;
  done: boolean;
  daysAgo: number | null;
};

function calcDaysAgo(date?: string) {
  if (!date) return null;
  const diff = Date.now() - new Date(date).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export default function ReviewPage() {
  const [items, setItems] = useState<TopicItem[]>([]);
  const [total, setTotal] = useState(0);

  function reload() {
    const raw = localStorage.getItem(KEY);

    if (!raw) {
      setItems([]);
      setTotal(0);
      return;
    }

    try {
      const data: Record<string, TopicData> = JSON.parse(raw);

      const allIds = Object.keys(data);
      setTotal(allIds.length);

      const list: TopicItem[] = allIds.map((id) => {
        const value = data[id];

        const done =
          value === true || (typeof value === "object" && value?.done === true);

        const lastStudied =
          typeof value === "object" ? value.lastStudied : undefined;

        return {
          id,
          title: TOPIC_TITLES[id] || id,
          done,
          daysAgo: calcDaysAgo(lastStudied),
        };
      });

      // сортування: спочатку ті, що давно повторювали
      list.sort((a, b) => {
        const aScore = a.daysAgo ?? 999;
        const bScore = b.daysAgo ?? 999;
        return bScore - aScore;
      });

      setItems(list.filter((x) => x.done));
    } catch (e) {
      console.error("Progress parse error:", e);
      setItems([]);
      setTotal(0);
    }
  }

  useEffect(() => {
    reload();

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) reload();
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function getStatus(item: TopicItem) {
    if (item.daysAgo === null) return "🆕 нова";
    if (item.daysAgo === 0) return "✅ сьогодні";
    if (item.daysAgo <= 2) return "🙂 недавно";
    if (item.daysAgo <= 6) return "🕒 давно";
    return "🔁 пора повторити";
  }

  return (
    <main className="mx-auto max-w-3xl p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">🔁 Smart Review</h1>

        {/* ✅ Free-навігація: назад на навчання, а не на /practice */}
        <Link href="/learning" className="text-sm underline">
          ← Назад
        </Link>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        Вивчено тем: <b>{items.length}</b> з <b>{total}</b>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 text-gray-500">Ти ще не завершив жодної теми.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <div className="font-medium">{item.title}</div>
                <div className="text-xs text-gray-500">
                  {getStatus(item)}
                  {item.daysAgo !== null && ` • ${item.daysAgo} дн. тому`}
                </div>
              </div>

              {/* Повторення теми: це граматика, не тренажер */}
              <Link
                href={`/grammar/${item.id}`}
                className="rounded-lg bg-black px-3 py-1 text-sm text-white hover:opacity-80"
              >
                Повторити →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
