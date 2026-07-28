import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const MIN_AGE = 13;
const MAX_AGE = 100;

function normalizeAge(value: unknown): number | null | "INVALID" {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const age =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number(value)
        : Number.NaN;

  if (!Number.isInteger(age) || age < MIN_AGE || age > MAX_AGE) {
    return "INVALID";
  }

  return age;
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
    select: {
      age: true,
    },
  });

  if (!user) {
    return NextResponse.json(
      { ok: false, code: "USER_NOT_FOUND" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    ok: true,
    age: user.age,
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
    age?: unknown;
  } | null;

  const age = normalizeAge(body?.age);

  if (age === "INVALID") {
    return NextResponse.json(
      { ok: false, code: "INVALID_AGE" },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      age,
    },
    select: {
      age: true,
    },
  });

  return NextResponse.json({
    ok: true,
    age: user.age,
  });
}
