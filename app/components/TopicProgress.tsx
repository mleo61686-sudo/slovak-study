"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  topicId: string;
  passedSignal?: number;
};

const KEY = "slovakStudy.progress";

export default function TopicProgress({ topicId, passedSignal }: Props) {
  const [mounted, setMounted] = useState(false);
  const [doneTopics, setDoneTopics] = useState<Record<string, boolean>>({});

  // 1) чекаємо поки компонент реально запуститься в браузері
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2) читаємо localStorage тільки після mount
  useEffect(() => {
    if (!mounted) return;

    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDoneTopics(JSON.parse(raw));
    } catch {
      setDoneTopics({});
    }
  }, [mounted]);

  const isDone = useMemo(() => !!doneTopics[topicId], [doneTopics, topicId]);

  function markDone() {
    const next = { ...doneTopics, [topicId]: true };
    setDoneTopics(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  }

  // авто-позначення після правильного проходження
  useEffect(() => {
    if (!mounted) return;
    if (!passedSignal) return;
    if (isDone) return;
    markDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedSignal, mounted]);

  // ВАЖЛИВО: поки не mounted — нічого не рендеримо (і на сервері, і на клієнті буде однаково)
  if (!mounted) return null;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm flex items-center justify-between">
      <div>
        <div className="font-semibold">Прогрес теми</div>
        <div className="text-sm text-slate-600">
          {isDone ? "✅ Тема пройдена" : "⏳ Тема ще не пройдена"}
        </div>
      </div>

      {!isDone ? (
        <button
          type="button"
          onClick={markDone}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Позначити як пройдену
        </button>
      ) : null}
    </div>
  );
}