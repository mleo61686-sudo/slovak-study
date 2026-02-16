import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import crypto from "crypto";

import { prisma } from "@/lib/prisma"; // якщо у тебе інший шлях — скажи, я підлаштую

export const runtime = "nodejs";

function sha1(s: string) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

export async function POST(req: Request) {
  try {
    const { text } = (await req.json()) as { text?: string };
    const input = String(text ?? "").trim();

    if (!input) {
      return NextResponse.json({ error: "No text" }, { status: 400 });
    }

    const voice = "alloy";
    const key = sha1(`sk-SK::${voice}::${input}`);

    // ✅ 1) якщо вже є в БД — віддаємо готовий url
    const existing = await prisma.ttsAudio.findUnique({ where: { key } });
    if (existing?.url) {
      return NextResponse.json({ url: existing.url });
    }

    // ✅ 2) генеруємо mp3 через OpenAI
    const r = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice,
        format: "mp3",
        input,
      }),
    });

    if (!r.ok) {
      const errText = await r.text().catch(() => "");
      return NextResponse.json(
        { error: `OpenAI TTS error: ${r.status} ${errText}` },
        { status: 500 }
      );
    }

    const arrayBuffer = await r.arrayBuffer();
    const buf = Buffer.from(arrayBuffer);

    // ✅ 3) зберігаємо в Blob
    const blob = await put(`tts/${key}.mp3`, buf, {
      access: "public",
      contentType: "audio/mpeg",
    });

    // ✅ 4) записуємо в БД (щоб більше не генерувати)
    await prisma.ttsAudio.create({
      data: {
        key,
        text: input,
        url: blob.url,
        voice,
      },
    });

    return NextResponse.json({ url: blob.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "TTS error" },
      { status: 500 }
    );
  }
}
