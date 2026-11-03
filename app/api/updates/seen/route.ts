import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { latestAnnouncedUpdateKey } from "@/lib/updates/announcement";

export const dynamic = "force-dynamic";

function noCache(data: object, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "Cache-Control": "private, no-store" },
  });
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return noCache({ ok: false }, 401);

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { lastSeenUpdateKey: true },
  });
  if (!user) return noCache({ ok: false }, 404);

  return noCache({ ok: true, seenKey: user.lastSeenUpdateKey });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return noCache({ ok: false }, 401);

  const body = await request.json().catch(() => null) as { key?: unknown } | null;
  const latestKey = latestAnnouncedUpdateKey();
  if (!latestKey || body?.key !== latestKey) {
    return noCache({ ok: false, error: "STALE_UPDATE" }, 409);
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { lastSeenUpdateKey: latestKey },
  });

  return noCache({ ok: true, seenKey: latestKey });
}
