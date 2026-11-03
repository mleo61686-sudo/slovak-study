"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./UpdatesOwl.module.css";

const GUEST_KEY = "flunio.updates.seen.guest.v1";
const userKey = (id: string) => `flunio.updates.seen.user.${id}.v1`;
const syncedKey = (id: string) => `flunio.updates.synced.user.${id}.v1`;

function read(key: string) {
  try { return window.localStorage.getItem(key); } catch { return null; }
}
function write(key: string, value: string) {
  try { window.localStorage.setItem(key, value); } catch { /* storage disabled */ }
}
function saveForAccount(userId: string, key: string) {
  if (read(syncedKey(userId)) === key) return;
  void fetch("/api/updates/seen", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key }),
    credentials: "same-origin",
    keepalive: true,
  }).then((res) => {
    if (res.ok) write(syncedKey(userId), key);
  }).catch(() => { /* Retry next visit without showing the owl again. */ });
}

/**
 * `indicator`: show on the home Updates link only for unseen releases.
 * `mark-seen`: render nothing; mark the latest release when /updates opens.
 * Guest status is device-local; account status is stored in the database.
 */
export default function UpdatesOwl({
  latestKey,
  mode = "indicator",
}: {
  latestKey: string | null;
  mode?: "indicator" | "mark-seen";
}) {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (mode === "indicator" && process.env.NODE_ENV === "development" &&
      new URLSearchParams(window.location.search).get("owlPreview") === "1") {
      setVisible(true);
      return () => { cancelled = true; };
    }
    setVisible(false);
    if (!latestKey || status === "loading") return () => { cancelled = true; };

    if (mode === "mark-seen") {
      write(GUEST_KEY, latestKey);
      if (status === "authenticated" && userId) {
        write(userKey(userId), latestKey);
        saveForAccount(userId, latestKey);
      }
      return () => { cancelled = true; };
    }

    if (status !== "authenticated" || !userId) {
      setVisible(read(GUEST_KEY) !== latestKey);
      return () => { cancelled = true; };
    }

    const localSeen = read(userKey(userId)) === latestKey || read(GUEST_KEY) === latestKey;
    if (localSeen) {
      // Sync a receipt from an earlier offline visit or pre-login guest visit.
      write(userKey(userId), latestKey);
      saveForAccount(userId, latestKey);
      return () => { cancelled = true; };
    }

    // Remain hidden if the network is unavailable rather than nag the learner.
    void fetch("/api/updates/seen", { cache: "no-store", credentials: "same-origin" })
      .then(async (res) => {
        if (!res.ok) throw new Error("Could not fetch update status");
        return res.json() as Promise<{ seenKey?: string | null }>;
      })
      .then((data) => {
        if (cancelled) return;
        if (data.seenKey === latestKey) {
          write(userKey(userId), latestKey);
          write(syncedKey(userId), latestKey);
          write(GUEST_KEY, latestKey);
        } else {
          setVisible(true);
        }
      })
      .catch(() => { /* No distracting indicator on connection errors. */ });

    return () => { cancelled = true; };
  }, [latestKey, mode, status, userId]);

  if (mode !== "indicator" || !visible) return null;

  return (
    <>
      <span className="sr-only">Є нове оновлення Flunio</span>
      <span aria-hidden="true" className={styles.root}>
        <svg className={styles.owl} viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="owl-body" x1="18" y1="8" x2="66" y2="82" gradientUnits="userSpaceOnUse"><stop stopColor="#BE8858"/><stop offset=".5" stopColor="#995C36"/><stop offset="1" stopColor="#633D31"/></linearGradient>
            <linearGradient id="owl-belly" x1="26" y1="32" x2="51" y2="79" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE6B8"/><stop offset="1" stopColor="#E9B77E"/></linearGradient>
            <linearGradient id="owl-wing" x1="0" y1="39" x2="31" y2="76" gradientUnits="userSpaceOnUse"><stop stopColor="#C89060"/><stop offset="1" stopColor="#754834"/></linearGradient>
          </defs>
          <path d="M15 27 10 9 28 18C36 12 48 12 57 18L74 9 66 29C73 42 72 65 60 76 48 87 27 86 17 74 6 61 7 40 15 27Z" fill="url(#owl-body)" stroke="#734631" strokeWidth="1.3"/>
          <path d="M20 23Q39 10 62 25" stroke="#E8B181" strokeWidth="2.4" strokeLinecap="round" opacity=".7"/>
          <ellipse cx="40" cy="59" rx="22" ry="23" fill="url(#owl-belly)"/>
          <path d="M27 61q6 6 12 0m-9 9q8 5 17-1m-7-15q7 5 14-1" stroke="#C18B61" strokeWidth="1.5" strokeLinecap="round" opacity=".55"/>
          <g className={styles.wing}><path d="M20 42C5 39 2 52 12 68c4 7 11 11 15 8 6-6 4-25-7-34Z" fill="url(#owl-wing)" stroke="#70432F" strokeWidth="1.5"/><path d="M13 55q5 8 10 10" stroke="#E7B080" strokeWidth="2" strokeLinecap="round"/></g>
          <path d="M62 44q11 1 9 13c-1 12-9 19-16 16" fill="#98613D" stroke="#734631" strokeWidth="1.5"/>
          <path d="M15 38Q18 22 35 28q8 4 5 17-5 15-18 12-12-2-7-19Z" fill="#F9E9CB"/>
          <path d="M41 44q-3-13 7-17 15-6 19 10 6 17-7 20-15 2-19-13Z" fill="#F9E9CB"/>
          <circle cx="29" cy="42" r="8" fill="#FFF8E9"/><circle cx="52" cy="42" r="8" fill="#FFF8E9"/>
          <circle cx="30" cy="42" r="5.2" fill="#304653"/><circle cx="51" cy="42" r="5.2" fill="#304653"/>
          <circle cx="31.6" cy="40.4" r="2" fill="white"/><circle cx="52.6" cy="40.4" r="2" fill="white"/>
          <g className={styles.eyelids}><path d="M21 41h17m5 0h17" stroke="#A26845" strokeWidth="12" strokeLinecap="round"/></g>
          <path d="M36 51 42 59 48 51q-6-6-12 0Z" fill="#F1A747" stroke="#BD792F" strokeWidth="1"/>
          <path d="M29 81v5m20-5v5M25 87h9m12 0h9" stroke="#C9863E" strokeWidth="3" strokeLinecap="round"/>
        </svg>
        <span className={styles.dot}/>
      </span>
    </>
  );
}
