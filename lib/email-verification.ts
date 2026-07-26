import { NextResponse } from "next/server";

import {
  addTrialDuration,
  getTrialIpLimit,
  hashEmailVerificationToken,
} from "@/lib/premium-trial";
import { prisma } from "@/lib/prisma";

type VerificationResult =
  | "started"
  | "verified"
  | "used"
  | "expired"
  | "invalid";

function redirectToResult(req: Request, result: VerificationResult) {
  const url = new URL(req.url);
  const appUrl = (process.env.APP_URL || url.origin).replace(/\/$/, "");

  return NextResponse.redirect(`${appUrl}/?trial=${result}`);
}

export async function handleEmailVerification(req: Request) {
  const url = new URL(req.url);
  const rawToken = url.searchParams.get("token")?.trim();

  if (!rawToken || rawToken.length < 32) {
    return redirectToResult(req, "invalid");
  }

  const tokenHash = hashEmailVerificationToken(rawToken);
  const now = new Date();
  const ipLimit = getTrialIpLimit();
  const ipWindowStart = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const result = await prisma.$transaction(async (tx) => {
    const verification = await tx.emailVerificationToken.findUnique({
      where: { tokenHash },
      include: {
        user: {
          select: {
            id: true,
            emailVerifiedAt: true,
            isPremium: true,
            premiumUntil: true,
          },
        },
      },
    });

    if (!verification) return "invalid" as const;

    if (verification.expiresAt <= now && !verification.usedAt) {
      return "expired" as const;
    }

    if (verification.usedAt) {
      return verification.user.emailVerifiedAt
        ? ("verified" as const)
        : ("invalid" as const);
    }

    await tx.user.update({
      where: { id: verification.userId },
      data: {
        emailVerifiedAt: verification.user.emailVerifiedAt ?? now,
      },
    });

    const hasActivePremium =
      verification.user.isPremium === true &&
      (!verification.user.premiumUntil || verification.user.premiumUntil > now);

    if (hasActivePremium) {
      await tx.emailVerificationToken.update({
        where: { id: verification.id },
        data: { usedAt: now },
      });

      return "verified" as const;
    }

    const existingDeviceClaim = await tx.premiumTrialClaim.findUnique({
      where: { deviceHash: verification.deviceHash },
      select: { id: true },
    });

    const recentIpClaims = verification.ipHash
      ? await tx.premiumTrialClaim.count({
          where: {
            ipHash: verification.ipHash,
            claimedAt: { gte: ipWindowStart },
          },
        })
      : 0;

    let trialGranted = false;

    if (!existingDeviceClaim && recentIpClaims < ipLimit) {
      const claim = await tx.premiumTrialClaim.createMany({
        data: [
          {
            userId: verification.userId,
            deviceHash: verification.deviceHash,
            ipHash: verification.ipHash,
            claimedAt: now,
          },
        ],
        skipDuplicates: true,
      });

      trialGranted = claim.count === 1;
    }

    if (trialGranted) {
      const trialUntil = addTrialDuration(now);
      const existingUntil = verification.user.premiumUntil;
      const premiumUntil =
        existingUntil && existingUntil > trialUntil ? existingUntil : trialUntil;

      await tx.user.update({
        where: { id: verification.userId },
        data: {
          isPremium: true,
          premiumUntil,
          trialStartedAt: now,
        },
      });
    }

    await tx.emailVerificationToken.update({
      where: { id: verification.id },
      data: { usedAt: now },
    });

    return trialGranted ? ("started" as const) : ("used" as const);
  });

  return redirectToResult(req, result);
}
