import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 700 * 1024;

function isValidDataUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const allowedPrefixes = [
    "data:image/jpeg;base64,",
    "data:image/png;base64,",
    "data:image/webp;base64,",
  ];

  return allowedPrefixes.some((prefix) => value.startsWith(prefix));
}

function getBase64SizeBytes(dataUrl: string) {
  const base64 = dataUrl.split(",")[1] ?? "";
  return Math.ceil((base64.length * 3) / 4);
}

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json(
      { ok: false, code: "UNAUTHORIZED" },
      { status: 401 }
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
      { status: 401 }
    );
  }

  const body = (await req.json().catch(() => null)) as {
    avatarUrl?: string;
  } | null;

  const avatarUrl = body?.avatarUrl;

  if (!isValidDataUrl(avatarUrl)) {
    return NextResponse.json(
      { ok: false, code: "INVALID_IMAGE" },
      { status: 400 }
    );
  }

  if (getBase64SizeBytes(avatarUrl) > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { ok: false, code: "IMAGE_TOO_LARGE" },
      { status: 400 }
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