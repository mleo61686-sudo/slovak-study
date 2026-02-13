"use client";

import { useEffect, useState } from "react";

type SyncState = "idle" | "syncing" | "error";
const SYNC_EVENT = "slovakStudy:syncState";

export default function SyncBadge() {
  const [state, setState] = useState<SyncState>("syncing");


  useEffect(() => {
    function onState(e: Event) {
      const ce = e as CustomEvent<{ state?: SyncState }>;
      const next = ce?.detail?.state;
      if (next) setState(next);
    }

    window.addEventListener(SYNC_EVENT, onState);
    return () => window.removeEventListener(SYNC_EVENT, onState);
  }, []);

  if (state === "idle") {
    return (
      <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-800">
        ✅ Sync
      </span>
    );
  }

  if (state === "syncing") {
    return (
      <span className="text-xs px-2 py-1 rounded-full bg-slate-200 text-slate-800">
        ⏳ Syncing…
      </span>
    );
  }

  return (
    <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800">
      ⚠ Sync error
    </span>
  );
}
