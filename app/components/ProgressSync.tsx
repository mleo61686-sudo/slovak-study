/**
 * ProgressSync – синхронізація lesson progress між localStorage і сервером.
 *
 * Що робить:
 * Підтягує userProgress після логіну, записує його в localStorage,
 * відправляє зміни прогресу на /api/progress і тримає sync state для UI.
 *
 * Пов’язані файли:
 * - app/api/progress/route.ts
 * - lib/src/progress.ts
 * - SyncBadge.tsx
 * - saveProgress / LevelClient / lesson progress components
 */

"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { setActiveUserId } from "@/lib/src/progress";

const GUEST_KEY = "slovakStudy.guest.progress";
const keyFor = (userId?: string | null) =>
  userId ? `slovakStudy.${userId}.progress` : GUEST_KEY;

const PROGRESS_EVENT = "slovakStudy:progressChanged";

// ✅ UI state
const SYNC_EVENT = "slovakStudy:syncState";
type SyncState = "idle" | "syncing" | "error";
function emitSyncState(state: SyncState) {
  window.dispatchEvent(new CustomEvent(SYNC_EVENT, { detail: { state } }));
}

// ✅ pending
const PENDING_KEY = "slovakStudy.pendingSync";

function savePending(data: any) {
  try {
    localStorage.setItem(PENDING_KEY, JSON.stringify(data));
  } catch {}
}
function getPending() {
  try {
    const raw = localStorage.getItem(PENDING_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function clearPending() {
  try {
    localStorage.removeItem(PENDING_KEY);
  } catch {}
}

// ✅ завжди повертає object
function extractLessonsProgress(raw: string | null) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && "lessons" in parsed) {
      return (parsed as any).lessons ?? {};
    }
    return parsed ?? {};
  } catch {
    return {};
  }
}

export default function ProgressSync() {
  const { status, data: session } = useSession();

  const timer = useRef<any>(null);
  const activeKey = useRef<string>(GUEST_KEY);
  const activeUid = useRef<string | null>(null);

  // щоб не робити зайві GET-и на кожен ререндер
  const lastSyncEmail = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    function cancelTimer() {
      if (timer.current) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    }

    async function retryPendingIfAny(userId: string | null) {
      const pending = getPending();
      if (!pending?.userId) return;
      if (pending.userId !== userId) return;

      try {
        const res = await fetch("/api/progress", {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pending),
        });

        if (res.ok) clearPending();
      } catch {
        // лишаємо pending
      }
    }

    async function load(attempt = 0) {
      emitSyncState("syncing");

      try {
        const res = await fetch("/api/progress", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!res.ok) {
          // після логіну cookies інколи “докочуються”
          if (
            !cancelled &&
            (res.status === 401 || res.status === 403) &&
            attempt < 10
          ) {
            setTimeout(() => load(attempt + 1), 300);
            return;
          }

          emitSyncState("error");
          return;
        }

        const data = await res.json();
        const userId: string | null = data?.userId ?? null;

        if (activeUid.current !== userId) cancelTimer();

        activeUid.current = userId;
        setActiveUserId(userId);
        activeKey.current = keyFor(userId);

        if (data?.lessonsProgress) {
          localStorage.setItem(
            activeKey.current,
            JSON.stringify({
              version: 1,
              updatedAt: Date.now(),
              lessons: data.lessonsProgress,
              srs: {},
            })
          );
        }

        // 🔁 після успішного GET пробуємо дослати pending
        await retryPendingIfAny(userId);

        emitSyncState("idle");
      } catch {
        emitSyncState("error");
      }
    }

    // ⬇️ чекаємо статус NextAuth
    if (status === "loading") return;

    if (status === "unauthenticated") {
      lastSyncEmail.current = null;
      activeUid.current = null;
      setActiveUserId(null);
      activeKey.current = GUEST_KEY;
      emitSyncState("idle");
      return;
    }

    const email = session?.user?.email ?? null;
    if (email && lastSyncEmail.current !== email) {
      lastSyncEmail.current = email;
      load();
    }

    function pushToServer() {
      const uidSnapshot = activeUid.current;
      const keySnapshot = activeKey.current;

      if (!uidSnapshot) return;

      if (timer.current) clearTimeout(timer.current);

      timer.current = setTimeout(async () => {
        // захист від переключення акаунта
        if (activeUid.current !== uidSnapshot) return;
        if (activeKey.current !== keySnapshot) return;

        emitSyncState("syncing");

        const raw = localStorage.getItem(keySnapshot);
        const lessonsProgress = extractLessonsProgress(raw);

        const payload = { userId: uidSnapshot, lessonsProgress };

        try {
          const res = await fetch("/api/progress", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            savePending(payload);
            emitSyncState("error");
            return;
          }

          clearPending();
          emitSyncState("idle");
        } catch {
          savePending(payload);
          emitSyncState("error");
        }
      }, 600);
    }

    // ✅ головний тригер
    function onProgressChanged() {
      pushToServer();
    }

    // ✅ “страховка”: у тебе saveProgress диспатчить storage в цій вкладці
    function onStorage() {
      pushToServer();
    }

    window.addEventListener(PROGRESS_EVENT, onProgressChanged);
    window.addEventListener("storage", onStorage);

    // ✅ при поверненні на вкладку — load + retry pending
    function onFocus() {
      load();
    }
    window.addEventListener("focus", onFocus);

    return () => {
      cancelled = true;
      window.removeEventListener(PROGRESS_EVENT, onProgressChanged);
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
      cancelTimer();
    };
  }, [status, session?.user?.email]);

  return null;
}