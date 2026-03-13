/**
 * API route для завершення скидання пароля (Reset Password).
 *
 * Що робить:
 * Приймає reset-token і новий пароль, перевіряє валідність токена
 * і оновлює passwordHash користувача у базі даних.
 *
 * Як працює:
 * 1. Отримує token, password і password2 з body
 * 2. Перевіряє збіг паролів і їхню складність (isStrongEnough)
 * 3. Хешує token (sha256) і шукає passwordResetToken у Prisma
 * 4. Перевіряє: існування, термін дії, чи не використаний
 * 5. Через Prisma transaction оновлює пароль і видаляє всі reset-токени користувача
 *
 * Пов’язані файли:
 * - lib/src/passwordReset.ts (hashPassword, isStrongEnough)
 * - app/api/auth/forgot-password/route.ts
 * - Prisma models: user, passwordResetToken
 */

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