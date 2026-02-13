"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

const BASE_KEY = "slovakStudy.progress";
const keyFor = (userId?: string | null) =>
  userId ? `slovakStudy.${userId}.progress` : BASE_KEY;

type Lang = "ua" | "ru";

const T: Record<Lang, any> = {
  ua: {
    title: "Синхронізація прогресу",
    cloud: "Хмара",
    local: "Цей браузер",
    loading: "Перевіряю…",
    cloudYes: "✅ Прогрес збережено в хмарі",
    cloudNo: "ℹ️ У хмарі ще немає прогресу",
    cloudUnknown: "⚠️ Не вдалося перевірити хмару",
    localYes: "✅ Є локальний прогрес",
    localNo: "ℹ️ Локального прогресу немає",
    updatedAt: "Останнє збереження",
    clearLocal: "Очистити локальний прогрес",
    cleared: "Готово: локальний прогрес очищено",
  },
  ru: {
    title: "Синхронизация прогресса",
    cloud: "Облако",
    local: "Этот браузер",
    loading: "Проверяю…",
    cloudYes: "✅ Прогресс сохранён в облаке",
    cloudNo: "ℹ️ В облаке пока нет прогресса",
    cloudUnknown: "⚠️ Не удалось проверить облако",
    localYes: "✅ Есть локальный прогресс",
    localNo: "ℹ️ Локального прогресса нет",
    updatedAt: "Последнее сохранение",
    clearLocal: "Очистить локальный прогресс",
    cleared: "Готово: локальный прогресс очищен",
  },
};

function formatDT(iso: string, lang: Lang) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString(lang === "ru" ? "ru-RU" : "uk-UA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ProfileClient() {
  const { lang } = useLanguage();
  const L: Lang = (lang as Lang) ?? "ua";
  const t = T[L];

  const [loading, setLoading] = useState(true);
  const [cloudHas, setCloudHas] = useState<boolean | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);

  const [localHas, setLocalHas] = useState<boolean | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/progress", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          setCloudHas(null);
          setUpdatedAt(null);
          setLocalHas(null);
          setUserId(null);
          return;
        }

        const data = await res.json();

        const uid: string | null = data?.userId ?? null;
        setUserId(uid);

        const KEY = keyFor(uid);

        // local (персональний ключ)
        try {
          const raw = localStorage.getItem(KEY);
          setLocalHas(!!raw);
        } catch {
          setLocalHas(null);
        }

        // cloud
        setCloudHas(!!data?.lessonsProgress);
        setUpdatedAt(data?.updatedAt ?? null);
      } catch {
        setCloudHas(null);
        setUpdatedAt(null);
        setLocalHas(null);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cloudLine = useMemo(() => {
    if (loading) return t.loading;
    if (cloudHas === true) return t.cloudYes;
    if (cloudHas === false) return t.cloudNo;
    return t.cloudUnknown;
  }, [loading, cloudHas, t]);

  const localLine = useMemo(() => {
    if (loading || localHas === null) return t.loading;
    if (localHas === true) return t.localYes;
    return t.localNo;
  }, [loading, localHas, t]);

  function clearLocal() {
    const ok = window.confirm(
      L === "ru"
        ? "Сбросить прогресс на этом браузере?\n\nЭто удалит ВСЕ локальные прогрессы (включая другие тестовые аккаунты). Продолжить?"
        : "Скинути прогрес на цьому браузері?\n\nЦе видалить ВСІ локальні прогреси (включно з іншими тестовими акаунтами). Продовжити?"
    );

    if (!ok) return;

    try {
      // Проходимо по всіх ключах localStorage
      for (let i = localStorage.length - 1; i >= 0; i--) {
        const key = localStorage.key(i);
        if (!key) continue;

        // Видаляємо тільки наші ключі прогресу
        if (key.startsWith("slovakStudy.") && key.endsWith(".progress")) {
          localStorage.removeItem(key);
        }
      }

      // на всяк випадок legacy
      localStorage.removeItem(BASE_KEY);

      setLocalHas(false);
      setToast(t.cleared);
      setTimeout(() => setToast(null), 1600);

      window.dispatchEvent(new Event("storage"));
    } catch { }
  }

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-extrabold">{t.title}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {cloudLine}
            {updatedAt ? (
              <span className="block mt-1">
                {t.updatedAt}:{" "}
                <span className="font-medium text-slate-900">
                  {formatDT(updatedAt, L)}
                </span>
              </span>
            ) : null}
          </p>
        </div>

        <button
          type="button"
          onClick={clearLocal}
          className="rounded-xl border px-3 py-2 text-sm font-semibold hover:bg-slate-50"
        >
          {t.clearLocal}
        </button>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">{t.cloud}</div>
          <div className="mt-1 text-sm text-slate-900">{cloudLine}</div>
        </div>

        <div className="rounded-xl border bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">{t.local}</div>
          <div className="mt-1 text-sm text-slate-900">{localLine}</div>
        </div>
      </div>

      {toast && <div className="mt-3 text-sm text-slate-600">{toast}</div>}
    </div>
  );
}
