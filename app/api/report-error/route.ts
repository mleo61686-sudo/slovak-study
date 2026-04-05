/**
 * API route для надсилання bug-репорту від користувача.
 *
 * Що робить:
 * Приймає дані про помилку з уроку/вправи, зберігає їх у таблицю errorReport
 * через Prisma і за наявності env налаштувань дублює репорт на email через Resend.
 *
 * Як працює:
 * Читає session через auth(), валідовує message, записує контекст
 * (page, lessonId, exercise, actionIdx, sk/ua/ru, key, category, userAgent)
 * у БД, а потім формує текст листа для адміна.
 *
 * Пов’язані файли:
 * - app/admin/reports/page.tsx
 * - app/admin/reports/StatusPills.tsx
 * - Prisma model: errorReport
 * - auth.ts
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Resend } from "resend";

type Body = {
  page?: string;
  lessonId?: string;
  exercise?: string;
  actionIdx?: number;

  sk?: string;
  ua?: string;
  ru?: string;
  key?: string;

  category?: string;
  message: string;
  userAgent?: string;
};

type SessionUserLike = {
  id?: string | null;
};

type SessionLike = {
  user?: SessionUserLike | null;
};

export async function POST(req: Request) {
  try {
    const session = (await auth().catch(() => null)) as SessionLike | null;

    let data: Body;
    try {
      data = (await req.json()) as Body;
    } catch {
      return NextResponse.json(
        { ok: false, error: "INVALID_JSON" },
        { status: 400 }
      );
    }

    if (!data?.message || data.message.trim().length < 3) {
      return NextResponse.json(
        { ok: false, error: "Message too short" },
        { status: 400 }
      );
    }

    const created = await prisma.errorReport.create({
      data: {
        userId: session?.user?.id ?? null,

        page: data.page ?? null,
        lessonId: data.lessonId ?? null,
        exercise: data.exercise ?? null,
        actionIdx: Number.isFinite(data.actionIdx) ? data.actionIdx : null,

        sk: data.sk ?? null,
        ua: data.ua ?? null,
        ru: data.ru ?? null,
        key: data.key ?? null,

        category: data.category ?? null,
        message: data.message.trim(),
        userAgent: data.userAgent ?? null,
      },
    });

    const to = process.env.REPORT_TO_EMAIL;
    const from = process.env.REPORT_FROM_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (to && from && apiKey) {
      try {
        const resend = new Resend(apiKey);

        const subject = `🛠️ Bug report: ${data.lessonId ?? "unknown"} • ${data.exercise ?? "unknown"}`;

        const lines = [
          `Time: ${new Date().toISOString()}`,
          `Page: ${data.page ?? "-"}`,
          `Lesson: ${data.lessonId ?? "-"}`,
          `Exercise: ${data.exercise ?? "-"}`,
          `ActionIdx: ${data.actionIdx ?? "-"}`,
          `Category: ${data.category ?? "-"}`,
          "",
          `SK: ${data.sk ?? "-"}`,
          `UA: ${data.ua ?? "-"}`,
          `RU: ${data.ru ?? "-"}`,
          `Key: ${data.key ?? "-"}`,
          "",
          "Message:",
          data.message ?? "",
          "",
          `UserAgent: ${data.userAgent ?? "-"}`,
          `ReportId: ${created.id}`,
        ];

        await resend.emails.send({
          from,
          to,
          subject,
          text: lines.join("\n"),
        });
      } catch (e) {
        // не ламаємо репорт, навіть якщо пошта не відправилась
        console.error("Resend send error:", e);
      }
    }

    return NextResponse.json({ ok: true, id: created.id });
  } catch (e) {
    console.error("report-error POST error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}