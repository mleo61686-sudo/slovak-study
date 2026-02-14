import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import StatusPills from "./StatusPills";

function isAdmin(email?: string | null) {
    if (!email) return false;
    const raw = process.env.ADMIN_EMAILS ?? "";
    const list = raw
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean);

    return list.includes(email.toLowerCase());
}

export default async function AdminReportsPage() {
    const session = await auth().catch(() => null);
    const email = (session as any)?.user?.email ?? null;

    if (!isAdmin(email)) {
        return notFound();
    }

    const reports = await prisma.errorReport.findMany({
        orderBy: { createdAt: "desc" },
        take: 200,
    });

    return (
        <div className="p-6 space-y-4">
            <div className="flex items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Bug reports</h1>
                    <div className="text-sm text-slate-600">
                        Показано: <b>{reports.length}</b> (останні 200)
                    </div>
                </div>

                <div className="text-xs text-slate-500">
                    Адмін: <b>{email}</b>
                </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border bg-white">
                <table className="min-w-[980px] w-full text-sm">
                    <thead className="bg-slate-50">
                        <tr className="text-left">
                            <th className="p-3 border-b">Час</th>
                            <th className="p-3 border-b">Урок</th>
                            <th className="p-3 border-b">Вправа</th>
                            <th className="p-3 border-b">Крок</th>
                            <th className="p-3 border-b">Категорія</th>
                            <th className="p-3 border-b">Статус</th>
                            <th className="p-3 border-b">SK / UA</th>
                            <th className="p-3 border-b">Повідомлення</th>
                        </tr>
                    </thead>

                    <tbody>
                        {reports.map((r) => (
                            <tr key={r.id} className="align-top">
                                <td className="p-3 border-b whitespace-nowrap text-slate-600">
                                    {new Date(r.createdAt).toLocaleString()}
                                </td>

                                <td className="p-3 border-b whitespace-nowrap">
                                    {r.lessonId ?? "—"}
                                </td>

                                <td className="p-3 border-b whitespace-nowrap">
                                    {r.exercise ?? "—"}
                                </td>

                                <td className="p-3 border-b whitespace-nowrap">
                                    {r.actionIdx ?? "—"}
                                </td>

                                <td className="p-3 border-b whitespace-nowrap">
                                    {r.category ?? "—"}
                                </td>

                                <td className="p-3 border-b whitespace-nowrap">
                                    <StatusPills id={r.id} initialStatus={(r.status ?? "new") as any} />
                                </td>

                                <td className="p-3 border-b">
                                    <div className="font-semibold">{r.sk ?? "—"}</div>
                                    <div className="text-slate-600">{r.ua ?? r.ru ?? "—"}</div>
                                </td>

                                <td className="p-3 border-b">
                                    <div className="whitespace-pre-wrap">{r.message}</div>
                                    {r.page && (
                                        <div className="mt-2 text-xs text-slate-500">
                                            page: {r.page}
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                        {reports.length === 0 && (
                            <tr>
                                <td className="p-6 text-slate-500" colSpan={8}>
                                    Поки що репортів немає.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
