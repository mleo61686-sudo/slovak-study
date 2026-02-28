import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
    }

    const userId = session.user.id;

    try {
        const row = await prisma.srsProgress.findUnique({
            where: { userId },
            select: {
                data: true,
                dailySession: true,
                dailyNewWords: true,
                updatedAt: true,
            },
        });

        return NextResponse.json({
            ok: true,
            srs: row?.data ?? null,
            dailySession: row?.dailySession ?? null,
            dailyNewWords: row?.dailyNewWords ?? null,
            updatedAt: row?.updatedAt ?? null,
        });
    } catch {
        return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const userId = session.user.id;

  let body: any = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
  }

  const srs = body?.srs ?? {};
  const dailySession = body?.dailySession ?? null;
  const dailyNewWords = body?.dailyNewWords ?? null;

  try {
    const row = await prisma.srsProgress.upsert({
      where: { userId },
      create: {
        userId,
        data: srs,
        dailySession,
        dailyNewWords,
      },
      update: {
        data: srs,
        dailySession,
        dailyNewWords,
      },
      select: { updatedAt: true },
    });

    return NextResponse.json({ ok: true, updatedAt: row.updatedAt });
  } catch {
    return NextResponse.json({ ok: false, code: "SERVER_ERROR" }, { status: 500 });
  }
}