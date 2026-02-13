import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { hashPassword, isStrongEnough } from "@/lib/src/passwordReset";

export const runtime = "nodejs";

function tokenToHash(token: string) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export async function POST(req: Request) {
    console.log("[reset-password] HIT");

    let body: any = {};
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ ok: false, code: "INVALID_JSON" }, { status: 400 });
    }

    const token = String(body?.token || "").trim();
    const password = String(body?.password || "");
    const password2 = String(body?.password2 || "");

    if (!token) {
        return NextResponse.json({ ok: false, code: "NO_TOKEN" }, { status: 400 });
    }

    if (password !== password2) {
        return NextResponse.json({ ok: false, code: "PASSWORD_MISMATCH" }, { status: 400 });
    }

    if (!isStrongEnough(password)) {
        return NextResponse.json({ ok: false, code: "WEAK_PASSWORD" }, { status: 400 });
    }
    const tokenHash = tokenToHash(token);

    const row = await prisma.passwordResetToken.findUnique({
        where: { tokenHash },
    });

    if (!row) {
        return NextResponse.json({ ok: false, code: "BAD_TOKEN" }, { status: 400 });
    }

    if (row.expiresAt.getTime() < Date.now()) {
        await prisma.passwordResetToken.delete({ where: { id: row.id } });
        return NextResponse.json({ ok: false, code: "EXPIRED" }, { status: 400 });
    }

    if (row.usedAt) {
        return NextResponse.json({ ok: false, code: "USED" }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    await prisma.$transaction([
        prisma.user.update({
            where: { id: row.userId },
            data: { passwordHash },
        }),
        prisma.passwordResetToken.deleteMany({
            where: { userId: row.userId },
        }),
    ]);

    return NextResponse.json({ ok: true }, { status: 200 });
}