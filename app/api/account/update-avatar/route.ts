import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

// The original file can be much larger. The browser crops and compresses it
// to a 384×384 WebP/JPEG/PNG before this endpoint receives it.
const MAX_STORED_SIZE_BYTES = 500 * 1024;

function isValidDataUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  return /^data:image\/(?:jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(value);
}

function getBase64SizeBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;

  return Math.max(0, Math.floor((base64.length * 3) / 4) - padding);
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { avatarUrl: true },
  });

  return NextResponse.json({
    ok: true,
    avatarUrl: user?.avatarUrl ?? null,
  });
}

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 },
    );
  }

  const body = (await req.json().catch(() => null)) as {
    avatarUrl?: string;
  } | null;

  const avatarUrl = body?.avatarUrl;

  if (!isValidDataUrl(avatarUrl)) {
    return NextResponse.json(
      { ok: false, code: "INVALID_IMAGE" },
      { status: 400 },
    );
  }

  if (getBase64SizeBytes(avatarUrl) > MAX_STORED_SIZE_BYTES) {
    return NextResponse.json(
      { ok: false, code: "IMAGE_TOO_LARGE" },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { avatarUrl },
    select: { avatarUrl: true },
  });

  return NextResponse.json({
    ok: true,
    avatarUrl: user.avatarUrl,
  });
}
