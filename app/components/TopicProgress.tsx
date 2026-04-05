"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

type Props = {
  topicId: string;
  passedSignal?: number;
};

const ACTIVE_USER_KEY = "slovakStudy.activeUserId";
const GUEST_ID = "guest";
const TOPICS_BASE = "topicsProgress";

const UI = {
  ua: {
    title: "Прогрес теми",
    done: "✅ Тема пройдена",
    notDone: "⏳ Тема ще не пройдена",
    markDone: "Позначити як пройдену",
  },
  ru: {
    title: "Прогресс темы",
    done: "✅ Тема пройдена",
    notDone: "⏳ Тема ещё не пройдена",
    markDone: "Отметить как пройденную",
  },
  en: {
    title: "Topic progress",
    done: "✅ Topic completed",
    notDone: "⏳ Topic not completed yet",
    markDone: "Mark as completed",
  },
} as const;

function topicsKey() {
  try {
    const uid = localStorage.getItem(ACTIVE_USER_KEY);
    const safe = uid && uid.trim() ? uid.trim() : GUEST_ID;
    return `slovakStudy.${safe}.${TOPICS_BASE}`;
  } catch {
    return `slovakStudy.${GUEST_ID}.${TOPICS_BASE}`;
  }
}

export default function TopicProgress({ topicId, passedSignal }: Props) {
  const { lang } = useLanguage();
  const t = UI[lang] ?? UI.ua;

  const [mounted, setMounted] = useState(false);
  const [doneTopics, setDoneTopics] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    try {
      const raw = localStorage.getItem(topicsKey());
      if (raw) setDoneTopics(JSON.parse(raw));
    } catch {
      setDoneTopics({});
    }
  }, [mounted]);

  const isDone = useMemo(() => !!doneTopics[topicId], [doneTopics, topicId]);

  function markDone() {
    const next = { ...doneTopics, [topicId]: true };
    setDoneTopics(next);
    localStorage.setItem(topicsKey(), JSON.stringify(next));
  }

  useEffect(() => {
    if (!mounted) return;
    if (!passedSignal) return;
    if (isDone) return;
    markDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passedSignal, mounted]);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-4 shadow-sm">
      <div>
        <div className="font-semibold">{t.title}</div>
        <div className="text-sm text-slate-600">
          {isDone ? t.done : t.notDone}
        </div>
      </div>

      {!isDone ? (
        <button
          type="button"
          onClick={markDone}
          className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          {t.markDone}
        </button>
      ) : null}
    </div>
  );
}