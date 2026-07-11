import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

function pageHtml({
  title,
  text,
  button,
  action,
}: {
  title: string;
  text: string;
  button?: string;
  action?: string;
}) {
  return `<!doctype html>
<html lang="uk">
<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
  <title>${title}</title>
</head>

<body
  style="
    margin:0;
    padding:24px;
    background:#050816;
    color:#f8fafc;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <main
    style="
      max-width:560px;
      margin:60px auto;
      padding:32px;
      border:1px solid rgba(255,255,255,0.12);
      border-radius:24px;
      background:#111827;
      text-align:center;
    "
  >
    <div
      style="
        display:inline-block;
        margin-bottom:18px;
        padding:8px 14px;
        border-radius:999px;
        background:rgba(34,211,238,0.12);
        color:#67e8f9;
        font-size:13px;
        font-weight:700;
      "
    >
      Flunio
    </div>

    <h1
      style="
        margin:0;
        font-size:28px;
        line-height:1.25;
      "
    >
      ${title}
    </h1>

    <p
      style="
        margin:16px 0 0;
        color:#cbd5e1;
        font-size:16px;
        line-height:1.7;
      "
    >
      ${text}
    </p>

    ${
      button && action
        ? `
          <form
            method="post"
            action="${action}"
            style="margin-top:26px"
          >
            <button
              type="submit"
              style="
                border:0;
                border-radius:14px;
                padding:13px 22px;
                background:#22d3ee;
                color:#082f49;
                font-size:15px;
                font-weight:700;
                cursor:pointer;
              "
            >
              ${button}
            </button>
          </form>
        `
        : ""
    }

    <a
      href="https://flunio.com"
      style="
        display:inline-block;
        margin-top:22px;
        color:#67e8f9;
        font-size:14px;
        text-decoration:none;
      "
    >
      Повернутися на Flunio
    </a>
  </main>
</body>
</html>`;
}

function getToken(request: Request): string {
  const url = new URL(request.url);
  return url.searchParams.get("token")?.trim() ?? "";
}

export async function GET(request: Request) {
  const token = getToken(request);

  if (!token) {
    return new NextResponse(
      pageHtml({
        title: "Посилання недійсне",
        text: "У посиланні відсутній токен відписки.",
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      unsubscribeToken: token,
    },
    select: {
      id: true,
      emailRemindersEnabled: true,
    },
  });

  if (!user) {
    return new NextResponse(
      pageHtml({
        title: "Посилання недійсне",
        text: "Ми не знайшли налаштування листів для цього посилання.",
      }),
      {
        status: 404,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  }

  if (!user.emailRemindersEnabled) {
    return new NextResponse(
      pageHtml({
        title: "Листи вже вимкнено",
        text: "Ти більше не отримуєш новини та нагадування від Flunio.",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      },
    );
  }

  const url = new URL(request.url);
  const action = `${url.pathname}?token=${encodeURIComponent(token)}`;

  return new NextResponse(
    pageHtml({
      title: "Вимкнути листи від Flunio?",
      text:
        "Після підтвердження ти більше не отримуватимеш інформацію " +
        "про оновлення, корисні пропозиції та нагадування.",
      button: "Вимкнути листи",
      action,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}

export async function POST(request: Request) {
  const token = getToken(request);

  if (!token) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing unsubscribe token",
      },
      {
        status: 400,
      },
    );
  }

  const result = await prisma.user.updateMany({
    where: {
      unsubscribeToken: token,
    },
    data: {
      emailRemindersEnabled: false,
    },
  });

  if (result.count === 0) {
    return NextResponse.json(
      {
        ok: false,
        error: "Invalid unsubscribe token",
      },
      {
        status: 404,
      },
    );
  }

  return new NextResponse(
    pageHtml({
      title: "Листи вимкнено",
      text:
        "Ти більше не отримуватимеш новини, пропозиції " +
        "та навчальні нагадування від Flunio.",
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
      },
    },
  );
}