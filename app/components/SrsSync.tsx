"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";

const KEY_BASE = "slovakStudy.srsWords";
const EVENT_NAME = "slovakStudy:srsChanged";

function keyFor(userId: string) {
  return `${KEY_BASE}:${userId}`;
}

function safeParse(raw: string | null) {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function apiGet() {
  const res = await fetch("/api/srs", { method: "GET" });
  if (!res.ok) return null;
  const json = await res.json();
  return json?.ok ? json : null; // очікуємо { ok:true, srs, dailySession, dailyNewWords, updatedAt }
}

async function apiPut(srs: any, userId: string) {
  const dailySession = safeParse(
    localStorage.getItem(`slovakStudy.srsDailySession:${userId}`)
  );

  const dailyNewWords = safeParse(
    localStorage.getItem(`slovakStudy.dailyNewWords:${userId}`)
  );

  const res = await fetch("/api/srs", {
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

  const [ready, setReady] = useState(false);

  const pushing = useRef(false);
  const pullDoneForUser = useRef<string | null>(null);
  const lastPushedHash = useRef<string>("");
  const t = useRef<any>(null); // debounce timer

  // 1) PULL (1 раз на user)
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;

    if (pullDoneForUser.current === userId) return;
    pullDoneForUser.current = userId;

    (async () => {
      const server = await apiGet();

      // якщо на сервері пусто — просто ready
      if (!server?.srs) {
        setReady(true);
        return;
      }

      const localKey = keyFor(userId);
      const local = safeParse(localStorage.getItem(localKey));

      // якщо локально пусто — ставимо сервер (SRS + daily keys)
      if (!local || Object.keys(local).length === 0) {
        localStorage.setItem(localKey, JSON.stringify(server.srs));

        if (server.dailySession) {
          localStorage.setItem(
            `slovakStudy.srsDailySession:${userId}`,
            JSON.stringify(server.dailySession)
          );
        }

        if (server.dailyNewWords) {
          localStorage.setItem(
            `slovakStudy.dailyNewWords:${userId}`,
            JSON.stringify(server.dailyNewWords)
          );
        }

        window.dispatchEvent(new CustomEvent(EVENT_NAME));
        setReady(true);
        return;
      }

      // якщо локально вже є — НЕ перетираємо SRS
      // але можемо підкинути daily keys, якщо їх локально немає (це безпечно)
      const localDailySession = safeParse(
        localStorage.getItem(`slovakStudy.srsDailySession:${userId}`)
      );
      const localDailyNewWords = safeParse(
        localStorage.getItem(`slovakStudy.dailyNewWords:${userId}`)
      );

      if (!localDailySession && server.dailySession) {
        localStorage.setItem(
          `slovakStudy.srsDailySession:${userId}`,
          JSON.stringify(server.dailySession)
        );
      }

      if (!localDailyNewWords && server.dailyNewWords) {
        localStorage.setItem(
          `slovakStudy.dailyNewWords:${userId}`,
          JSON.stringify(server.dailyNewWords)
        );
      }

      setReady(true);
    })();
  }, [status, userId]);

  // 2) PUSH (debounced) при подіях
  useEffect(() => {
    if (status !== "authenticated" || !userId) return;
    if (!ready) return;

    const localKey = keyFor(userId);

    const schedulePush = () => {
      if (t.current) clearTimeout(t.current);

      t.current = setTimeout(async () => {
        const raw = localStorage.getItem(localKey);
        const srs = safeParse(raw) ?? {};

        const hash = JSON.stringify(srs);
        if (hash === lastPushedHash.current) return;

        if (pushing.current) return;
        pushing.current = true;

        try {
          // ✅ ВАЖЛИВО: тут треба передати userId
          const ok = await apiPut(srs, userId);
          if (ok) lastPushedHash.current = hash;
        } finally {
          pushing.current = false;
        }
      }, 600);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === localKey) schedulePush();
    };

    const onCustom = () => schedulePush();

    window.addEventListener("storage", onStorage);
    window.addEventListener(EVENT_NAME, onCustom as any);

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(EVENT_NAME, onCustom as any);
      if (t.current) clearTimeout(t.current);
    };
  }, [status, userId, ready]);

  return null;
}