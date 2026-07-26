import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { sendEmailVerification } from "@/lib/email";
import {
  createEmailVerificationToken,
  getRequestIp,
  hashRequestIp,
  hashTrialDeviceId,
  normalizeTrialDeviceId,
  VERIFICATION_TOKEN_TTL_MS,
} from "@/lib/premium-trial";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json({ ok: false, code: "UNAUTHORIZED" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const trialDeviceId = normalizeTrialDeviceId(body?.trialDeviceId);

  if (!trialDeviceId) {
    return NextResponse.json(
      { ok: false, code: "DEVICE_ID_REQUIRED" },
      { status: 400 },
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      email: true,
      emailLanguage: true,
      emailVerifiedAt: true,
      verificationTokens: {
        where: { usedAt: null },
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { createdAt: true },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ ok: false, code: "NOT_FOUND" }, { status: 404 });
  }

  if (user.emailVerifiedAt) {
    return NextResponse.json({ ok: true, alreadyVerified: true });
  }

  const latest = user.verificationTokens[0]?.createdAt;
  if (latest && Date.now() - latest.getTime() < 60_000) {
    return NextResponse.json({ ok: false, code: "TOO_SOON" }, { status: 429 });
  }

  const now = new Date();
  const { token, tokenHash } = createEmailVerificationToken();
  const expiresAt = new Date(now.getTime() + VERIFICATION_TOKEN_TTL_MS);
  const deviceHash = hashTrialDeviceId(trialDeviceId);
  const ipHash = hashRequestIp(getRequestIp(req));

  await prisma.$transaction([
    prisma.emailVerificationToken.deleteMany({
      where: { userId, usedAt: null },
    }),
    prisma.emailVerificationToken.create({
      data: {
        userId,
        tokenHash,
        deviceHash,
        ipHash,
        expiresAt,
      },
    }),
  ]);

  const appUrl = (process.env.APP_URL || "http://localhost:3000").replace(/\/$/, "");
  const link = `${appUrl}/api/verify-email?token=${encodeURIComponent(token)}`;
  const language =
    user.emailLanguage === "ru"
      ? "ru"
      : user.emailLanguage === "en"
        ? "en"
        : "ua";

  try {
    await sendEmailVerification(user.email, link, language);
  } catch (error) {
    console.error("RESEND VERIFICATION EMAIL ERROR:", error);
    return NextResponse.json(
      { ok: false, code: "EMAIL_SEND_FAILED" },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true });
}
