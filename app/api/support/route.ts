import { NextResponse } from "next/server";
import { Resend } from "resend";
import { headers } from "next/headers";
import { auth } from "@/auth";

export const runtime = "nodejs";

const resend = new Resend(process.env.RESEND_API_KEY);

function getIp(h: Headers) {
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown"
  );
}

function isValidEmail(x: string) {
  // проста перевірка (достатньо для UI+API)
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
}

export async function POST(req: Request) {
  try {
    // session не обов’язкова, але корисно для userId
    const session = await auth().catch(() => null);

    const h = await headers();
    const ip = getIp(h);

    const body = await req.json().catch(() => ({} as any));

    const email = String(body?.email ?? "").trim().slice(0, 200);
    const topic = String(body?.topic ?? "Підтримка").slice(0, 120);
    const message = String(body?.message ?? "").trim().slice(0, 6000);
    const page = body?.page ? String(body.page).slice(0, 500) : "";
    const ua = body?.ua ? String(body.ua).slice(0, 500) : "";

    // ✅ email ОБОВ’ЯЗКОВИЙ
    if (!email) {
      return NextResponse.json(
        { ok: false, error: "Email is required" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { ok: false, error: "Message too short" },
        { status: 400 }
      );
    }

    const subject = `Slovak Study — Support: ${topic}`;

    const text = `New support message

From: ${email}
UserId: ${(session as any)?.user?.id ?? "guest"}
IP: ${ip}

Topic: ${topic}

Message:
${message}

Context:
Page: ${page}
User-Agent: ${ua}
`;

    await resend.emails.send({
      // ✅ той самий FROM, що й у reset-password
      from: "Slovak Study <no-reply@slovak-study.com>",
      // ✅ куди ти хочеш отримувати (Vercel env)
      to: [process.env.SUPPORT_TO_EMAIL!],
      subject,
      text,
      // ✅ щоб ти міг натиснути Reply і відповісти користувачу
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
