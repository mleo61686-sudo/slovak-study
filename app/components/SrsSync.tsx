"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";
import type { CourseId } from "@/app/learning/courses/registry";

const KEY_BASE = "slovakStudy.srsWords";
const EVENT_NAME = "slovakStudy:srsChanged";

function keyFor(userId: string, courseId: CourseId) {
  return `${KEY_BASE}:${userId}:${courseId}`;
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

async function apiGet(courseId: CourseId) {
  const res = await fetch(`/api/srs?courseId=${encodeURIComponent(courseId)}`, {
    method: "GET",
  });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.ok ? json : null; // { ok:true, srs, dailySession, dailyNewWords, updatedAt }
}

async function apiPut(courseId: CourseId, srs: any, dailySession: any, dailyNewWords: any) {
  const res = await fetch(`/api/srs?courseId=${encodeURIComponent(courseId)}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      srs,
      dailySession,
      dailyNewWords,
    }),
  });

  return res.ok;
}

export default function SrsSync() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const { courseId } = useActiveCourse();

  const [ready, setReady] = useState(false);

  const pushing = useRef(false);
  const pullDoneKey = useRef<string | null>(null); // userId:courseId
  const lastPushedHash = useRef<string>("");
  const t = useRef<any>(null); // debounce timer

  // 1) PULL (1 раз на userId+courseId)
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    if (!courseId) return;

    const pullKey = `${userId}:${courseId}`;
    if (pullDoneKey.current === pullKey) return;
    pullDoneKey.current = pullKey;

    (async () => {
      const server = await apiGet(courseId);

      // якщо на сервері пусто — просто ready
      if (!server?.srs) {
        setReady(true);
        return;
      }

      const localKey = keyFor(userId, courseId);
      const local = safeParse(localStorage.getItem(localKey));

      // якщо локально пусто — ставимо сервер (SRS + daily keys)
      if (!local || Object.keys(local).length === 0) {
        localStorage.setItem(localKey, JSON.stringify(server.srs));

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

        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        setReady(true);
        return;
      }

      // якщо локально вже є — НЕ перетираємо SRS
      // але можемо підкинути daily keys, якщо їх локально немає
      const localDailySession = safeParse(
        localStorage.getItem(getDailySessionKey(userId, courseId))
      );
      const localDailyNewWords = safeParse(
        localStorage.getItem(getDailyNewWordsKey(userId, courseId))
      );

      if (!localDailySession && server.dailySession) {
        localStorage.setItem(
          getDailySessionKey(userId, courseId),
          JSON.stringify(server.dailySession)
        );
      }

      if (!localDailyNewWords && server.dailyNewWords) {
        localStorage.setItem(
          getDailyNewWordsKey(userId, courseId),
          JSON.stringify(server.dailyNewWords)
        );
      }

      setReady(true);
    })();
  }, [status, userId, courseId]);

  // 2) PUSH (debounced) при подіях
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    if (!courseId) return;
    if (!ready) return;

    const localKey = keyFor(userId, courseId);

    const schedulePush = () => {
      if (t.current) clearTimeout(t.current);

      t.current = setTimeout(async () => {
        const raw = localStorage.getItem(localKey);
        const srs = safeParse(raw) ?? {};

        const dailySession = safeParse(
          localStorage.getItem(getDailySessionKey(userId, courseId))
        );

        const dailyNewWords = safeParse(
          localStorage.getItem(getDailyNewWordsKey(userId, courseId))
        );

        const hash = JSON.stringify({ srs, dailySession, dailyNewWords });
        if (hash === lastPushedHash.current) return;

        if (pushing.current) return;
        pushing.current = true;

        try {
          const ok = await apiPut(courseId, srs, dailySession, dailyNewWords);
          if (ok) lastPushedHash.current = hash;
        } finally {
          pushing.current = false;
        }
      }, 600);
    };

    const onStorage = (e: StorageEvent) => {
      // ✅ пушимо, якщо змінився будь-який з ключів цього курсу
      if (e.key === localKey) schedulePush();
      if (e.key === getDailySessionKey(userId, courseId)) schedulePush();
      if (e.key === getDailyNewWordsKey(userId, courseId)) schedulePush();
    };

    const onCustom = () => schedulePush();

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onCustom as any);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onCustom as any);
      if (t.current) clearTimeout(t.current);
    };
  }, [status, userId, courseId, ready]);

  return null;
}