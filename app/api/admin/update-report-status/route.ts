import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

function isAdmin(email?: string | null) {
  if (!email) return false;
  const raw = process.env.ADMIN_EMAILS ?? "";
  const list = raw
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

  return list.includes(email.toLowerCase());
}

type Body = {
  id: string;
  status: "new" | "fixed" | "ignored";
};

export async function POST(req: Request) {
  try {
    const session = await auth().catch(() => null);
    const email = (session as any)?.user?.email ?? null;

    if (!isAdmin(email)) {
      return NextResponse.json({ ok: false }, { status: 404 });
    }

    const data = (await req.json()) as Body;

    if (!data?.id || typeof data.id !== "string") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const allowed = new Set(["new", "fixed", "ignored"]);
    if (!allowed.has(data.status)) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const updated = await prisma.errorReport.update({
      where: { id: data.id },
      data: { status: data.status },
      select: { id: true, status: true },
    });

    return NextResponse.json({ ok: true, report: updated });
  } catch (e) {
    console.error("update-report-status error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
