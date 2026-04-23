import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isStrongPassword(password: string) {
  return (
    password.length >= 8 &&
    /\d/.test(password) &&
    /[A-ZÀ-Ý]/.test(password)
  );
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { ok: false, code: "UNAUTHORIZED" },
        { status: 401 }
      );
    }

    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { ok: false, code: "CONTENT_TYPE" },
        { status: 415 }
      );
    }

    let body: any = null;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { ok: false, code: "INVALID_JSON" },
        { status: 400 }
      );
    }

    const currentPassword = String(body?.currentPassword ?? "");
    const newPassword = String(body?.newPassword ?? "");
    const confirmPassword = String(body?.confirmPassword ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { ok: false, code: "MISSING_FIELDS" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { ok: false, code: "PASSWORDS_DO_NOT_MATCH" },
        { status: 400 }
      );
    }

    if (!isStrongPassword(newPassword)) {
      return NextResponse.json(
        { ok: false, code: "WEAK_PASSWORD" },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        { ok: false, code: "SAME_AS_CURRENT" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        passwordHash: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { ok: false, code: "USER_NOT_FOUND" },
        { status: 404 }
      );
    }

    const matches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!matches) {
      return NextResponse.json(
        { ok: false, code: "WRONG_CURRENT_PASSWORD" },
        { status: 400 }
      );
    }

    const nextHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: nextHash,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("CHANGE_PASSWORD_ERROR:", err);
    return NextResponse.json(
      { ok: false, code: "SERVER_ERROR" },
      { status: 500 }
    );
  }
}