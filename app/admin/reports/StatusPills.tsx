"use client";

import { useState } from "react";

type Status = "new" | "fixed" | "ignored";

export default function StatusPills({
    id,
    initialStatus,
}: {
    id: string;
    initialStatus: Status;
}) {
    const [status, setStatus] = useState<Status>(initialStatus);
    const [busy, setBusy] = useState(false);

    async function set(next: Status) {
        if (busy) return;
        setBusy(true);
        try {
            const res = await fetch("/api/admin/update-report-status/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: next }),
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok && data?.ok && data?.report?.status) {
                setStatus(data.report.status as Status);
                return;
            }

            alert(
                `Не вдалося змінити статус. HTTP ${res.status}\n` +
                (data?.error ? String(data.error) : "")
            );
        } catch (e: any) {
            alert("Fetch error: " + (e?.message ?? String(e)));
        } finally {
            setBusy(false);
        }
    }

    const pill = (value: Status, label: string) => {
        const active = status === value;
        const cls =
            "text-xs px-2 py-1 rounded-full border transition " +
            (active
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-800 border-slate-300 hover:bg-slate-50") +
            (busy ? " opacity-60 pointer-events-none" : "");

        return (
            <button key={value} type="button" onClick={() => set(value)} className={cls}>
                {label}
            </button>
        );
    };

    return (
        <div className="flex flex-wrap gap-2">
            {pill("new", "new")}
            {pill("fixed", "fixed")}
            {pill("ignored", "ignored")}
        </div>
    );
}
