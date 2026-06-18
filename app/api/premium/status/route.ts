import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return NextResponse.json(
      {
        isPremium: false,
        premiumUntil: null,
      },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      isPremium: true,
      premiumUntil: true,
    },
  });

  const premiumUntil = user?.premiumUntil ?? null;
  const isPremium =
    user?.isPremium === true && (!premiumUntil || premiumUntil > new Date());

  return NextResponse.json({
    isPremium,
    premiumUntil,
  });
}