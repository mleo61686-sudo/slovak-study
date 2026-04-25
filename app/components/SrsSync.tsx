"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import type { CourseId } from "@/app/learning/courses/registry";

const KEY_BASE = "slovakStudy.srsWords";
const META_KEY_BASE = "slovakStudy.srsSyncMeta";
const EVENT_NAME = "slovakStudy:srsChanged";

function keyFor(userId: string, courseId: CourseId) {
  return `${KEY_BASE}:${userId}:${courseId}`;
}

function metaKeyFor(userId: string, courseId: CourseId) {
  return `${META_KEY_BASE}:${userId}:${courseId}`;
}

function safeParse(raw: string | null) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function getDailySessionKey(userId: string, courseId: CourseId) {
  return `slovakStudy.srsDailySession:${userId}:${courseId}`;
}

function getDailyNewWordsKey(userId: string, courseId: CourseId) {
  return `slovakStudy.dailyNewWords:${userId}:${courseId}`;
}

function getSnapshot(userId: string, courseId: CourseId) {
  const localKey = keyFor(userId, courseId);

  return {
    srs: safeParse(localStorage.getItem(localKey)) ?? {},
    dailySession: safeParse(localStorage.getItem(getDailySessionKey(userId, courseId))),
    dailyNewWords: safeParse(localStorage.getItem(getDailyNewWordsKey(userId, courseId))),
  };
}

function getHash(snapshot: {
  srs: any;
  dailySession: any;
  dailyNewWords: any;
}) {
  return JSON.stringify(snapshot);
}

function saveServerToLocal(
  userId: string,
  courseId: CourseId,
  server: {
    srs: any;
    dailySession: any;
    dailyNewWords: any;
    updatedAt: string | null;
  }
) {
  localStorage.setItem(keyFor(userId, courseId), JSON.stringify(server.srs ?? {}));

  if (server.dailySession) {
    localStorage.setItem(
      getDailySessionKey(userId, courseId),
      JSON.stringify(server.dailySession)
    );
  }

  if (server.dailyNewWords) {
    localStorage.setItem(
      getDailyNewWordsKey(userId, courseId),
      JSON.stringify(server.dailyNewWords)
    );
  }

  localStorage.setItem(
    metaKeyFor(userId, courseId),
    JSON.stringify({
      serverUpdatedAt: server.updatedAt ?? null,
      localDirty: false,
      syncedAt: Date.now(),
    })
  );
}

function markLocalDirty(userId: string, courseId: CourseId) {
  const metaKey = metaKeyFor(userId, courseId);
  const current = safeParse(localStorage.getItem(metaKey)) ?? {};

  localStorage.setItem(
    metaKey,
    JSON.stringify({
      ...current,
      localDirty: true,
      localUpdatedAt: Date.now(),
    })
  );
}

function markSynced(userId: string, courseId: CourseId, serverUpdatedAt?: string | null) {
  const metaKey = metaKeyFor(userId, courseId);
  const current = safeParse(localStorage.getItem(metaKey)) ?? {};

  localStorage.setItem(
    metaKey,
    JSON.stringify({
      ...current,
      serverUpdatedAt: serverUpdatedAt ?? current.serverUpdatedAt ?? null,
      localDirty: false,
      syncedAt: Date.now(),
    })
  );
}

async function apiGet(courseId: CourseId) {
  const res = await fetch(`/api/srs?courseId=${encodeURIComponent(courseId)}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) return null;

  const json = await res.json();

  return json?.ok ? json : null;
}

async function apiPut(
  courseId: CourseId,
  srs: any,
  dailySession: any,
  dailyNewWords: any
) {
  const res = await fetch(`/api/srs?courseId=${encodeURIComponent(courseId)}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      courseId,
      srs,
      dailySession,
      dailyNewWords,
    }),
  });

  if (!res.ok) return null;

  const json = await res.json().catch(() => null);

  return json?.ok ? json : null;
}

export default function SrsSync() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { courseId } = useActiveCourse();

  const [ready, setReady] = useState(false);

  const pushing = useRef(false);
  const pullDoneKey = useRef<string | null>(null);
  const activeReadyKey = useRef<string | null>(null);
  const lastPushedHash = useRef<string>("");
  const t = useRef<any>(null);

  // 1) PULL з сервера для конкретного userId + courseId
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    if (!courseId) return;

    const pullKey = `${userId}:${courseId}`;

    if (pullDoneKey.current === pullKey) return;

    pullDoneKey.current = pullKey;
    activeReadyKey.current = null;
    setReady(false);

    (async () => {
      const server = await apiGet(courseId);

      const localKey = keyFor(userId, courseId);
      const local = safeParse(localStorage.getItem(localKey));
      const localIsEmpty = !local || Object.keys(local).length === 0;

      if (!server?.srs) {
        activeReadyKey.current = pullKey;
        setReady(true);
        return;
      }

      const meta = safeParse(localStorage.getItem(metaKeyFor(userId, courseId))) ?? {};
      const serverUpdatedAt = server.updatedAt ?? null;
      const knownServerUpdatedAt = meta.serverUpdatedAt ?? null;
      const localDirty = meta.localDirty === true;

      const serverIsNewForThisDevice =
        serverUpdatedAt && serverUpdatedAt !== knownServerUpdatedAt;

      if (localIsEmpty || (serverIsNewForThisDevice && !localDirty)) {
        saveServerToLocal(userId, courseId, {
          srs: server.srs,
          dailySession: server.dailySession,
          dailyNewWords: server.dailyNewWords,
          updatedAt: serverUpdatedAt,
        });

        const snapshot = getSnapshot(userId, courseId);
        lastPushedHash.current = getHash(snapshot);

        window.dispatchEvent(new CustomEvent(EVENT_NAME));

        activeReadyKey.current = pullKey;
        setReady(true);
        return;
      }

      if (!localDirty) {
        markSynced(userId, courseId, serverUpdatedAt);
      }

      activeReadyKey.current = pullKey;
      setReady(true);
    })();
  }, [status, userId, courseId]);

  // 2) PUSH локальних змін на сервер
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    if (!courseId) return;
    if (!ready) return;

    const syncKey = `${userId}:${courseId}`;
    if (activeReadyKey.current !== syncKey) return;

    const localKey = keyFor(userId, courseId);
    const dailySessionKey = getDailySessionKey(userId, courseId);
    const dailyNewWordsKey = getDailyNewWordsKey(userId, courseId);

    const schedulePush = () => {
      if (t.current) clearTimeout(t.current);

      markLocalDirty(userId, courseId);

      t.current = setTimeout(async () => {
        if (activeReadyKey.current !== syncKey) return;

        const snapshot = getSnapshot(userId, courseId);
        const hash = getHash(snapshot);

        if (hash === lastPushedHash.current) return;

        if (pushing.current) return;
        pushing.current = true;

        try {
          const result = await apiPut(
            courseId,
            snapshot.srs,
            snapshot.dailySession,
            snapshot.dailyNewWords
          );

          if (result?.ok) {
            lastPushedHash.current = hash;
            markSynced(userId, courseId, result.updatedAt ?? null);
          }
        } finally {
          pushing.current = false;
        }
      }, 600);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === localKey) schedulePush();
      if (e.key === dailySessionKey) schedulePush();
      if (e.key === dailyNewWordsKey) schedulePush();
    };

    const onCustom = () => schedulePush();

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onCustom as any);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onCustom as any);

      if (t.current) {
        clearTimeout(t.current);
        t.current = null;
      }
    };
  }, [status, userId, courseId, ready]);

  return null;
}