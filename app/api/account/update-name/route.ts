import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    const userId = session?.user?.id;
    if (!userId) {
      return NextResponse.json(
        { ok: false, code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const body = (await req.json().catch(() => null)) as
      | { name?: string }
      | null;

    const rawName = body?.name ?? "";
    const name = normalizeName(rawName);

    if (!name) {
      return NextResponse.json(
        { ok: false, code: "NAME_REQUIRED" },
        { status: 400 }
      );
    }

    if (name.length < 2) {
      return NextResponse.json(
        { ok: false, code: "NAME_TOO_SHORT" },
        { status: 400 }
      );
    }

    if (name.length > 40) {
      return NextResponse.json(
        { ok: false, code: "NAME_TOO_LONG" },
        { status: 400 }
      );
    }

    await prisma.user.update({
      where: { id: userId },
      data: { name },
    });

    return NextResponse.json({
      ok: true,
      name,
    });
  } catch (error) {
    console.error("update-name error", error);

    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}