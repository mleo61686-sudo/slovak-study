import {
  createHash,
  randomBytes,
} from "crypto";
import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const DAY_MS = 24 * 60 * 60 * 1000;
const UPDATES_INTERVAL_MS = 3 * DAY_MS;
const INACTIVITY_INTERVAL_MS = 5 * DAY_MS;
const BATCH_SIZE = 100;

type EmailLanguage = "ua" | "ru" | "en";
type ReminderKind = "updates" | "inactivity";

type ReminderUser = {
  id: string;
  email: string;
  name: string | null;
  emailLanguage: string;
  preferredCourse: string;
  lastActiveAt: Date;
  inactivityReminderSentAt: Date | null;
  updatesEmailSentAt: Date | null;
  unsubscribeToken: string | null;
};

type ReminderCandidate = {
  user: ReminderUser;
  kind: ReminderKind;
};

type ResendBatchResponse = {
  data?: Array<{
    id: string;
  }>;
  error?: {
    message?: string;
  };
};

function normalizeLanguage(value: string): EmailLanguage {
  if (value === "ru" || value === "en") {
    return value;
  }

  return "ua";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getGreeting(
  lang: EmailLanguage,
  name: string | null,
): string {
  const cleanName = name?.trim();

  if (!cleanName) {
    if (lang === "ru") return "Привет!";
    if (lang === "en") return "Hi!";
    return "Привіт!";
  }

  const safeName = escapeHtml(cleanName);

  if (lang === "ru") return `Привет, ${safeName}!`;
  if (lang === "en") return `Hi, ${safeName}!`;

  return `Привіт, ${safeName}!`;
}

function getEmailCopy(
  lang: EmailLanguage,
  kind: ReminderKind,
  name: string | null,
) {
  const greeting = getGreeting(lang, name);

  if (lang === "ru") {
    if (kind === "inactivity") {
      return {
        subject: "Твой курс ждёт тебя 💙",
        preheader:
          "Небольшое занятие поможет не потерять учебный ритм.",
        greeting,
        title: "Давай продолжим?",
        body:
          "Прошло уже несколько дней без обучения. " +
          "Даже 5–10 минут практики помогут освежить знания " +
          "и не потерять темп.",
        button: "Вернуться к обучению",
        path: "/learning",
        unsubscribe: "Отписаться от писем",
        footer:
          "Ты получил это письмо, потому что включил письма от Flunio.",
      };
    }

    return {
      subject: "Загляни во Flunio — возможно, появилось что-то новое 👀",
      preheader:
        "Проверь новые возможности, материалы и обновления Flunio.",
      greeting,
      title: "Что нового во Flunio?",
      body:
        "Во Flunio регулярно появляются улучшения, новые материалы " +
        "и полезные возможности. Загляни и проверь, не добавилось ли " +
        "что-нибудь новое для твоего обучения.",
      button: "Проверить Flunio",
      path: "/updates",
      unsubscribe: "Отписаться от писем",
      footer:
        "Ты получил это письмо, потому что включил письма от Flunio.",
    };
  }

  if (lang === "en") {
    if (kind === "inactivity") {
      return {
        subject: "Your course is waiting for you 💙",
        preheader:
          "A short practice session can help you stay on track.",
        greeting,
        title: "Ready to continue?",
        body:
          "It has been a few days since your last learning session. " +
          "Even 5–10 minutes of practice can refresh your knowledge " +
          "and help you keep your momentum.",
        button: "Continue learning",
        path: "/learning",
        unsubscribe: "Unsubscribe from emails",
        footer:
          "You received this email because you enabled emails from Flunio.",
      };
    }

    return {
      subject: "Check Flunio — there may be something new 👀",
      preheader:
        "See the latest Flunio improvements, materials, and features.",
      greeting,
      title: "What’s new on Flunio?",
      body:
        "Flunio regularly gets improvements, new learning materials, " +
        "and useful features. Take a look and see whether something new " +
        "has been added for your learning.",
      button: "Check Flunio",
      path: "/updates",
      unsubscribe: "Unsubscribe from emails",
      footer:
        "You received this email because you enabled emails from Flunio.",
    };
  }

  if (kind === "inactivity") {
    return {
      subject: "Твій курс чекає на тебе 💙",
      preheader:
        "Коротке заняття допоможе не втратити навчальний ритм.",
      greeting,
      title: "Продовжимо навчання?",
      body:
        "Минуло вже кілька днів без навчання. Навіть 5–10 хвилин " +
        "практики допоможуть освіжити знання та не втратити темп.",
      button: "Повернутися до навчання",
      path: "/learning",
      unsubscribe: "Відписатися від листів",
      footer:
        "Ти отримав цей лист, бо ввімкнув листи від Flunio.",
    };
  }

  return {
    subject: "Зазирни у Flunio — можливо, з’явилося щось нове 👀",
    preheader:
      "Перевір нові можливості, матеріали й оновлення Flunio.",
    greeting,
    title: "Що нового у Flunio?",
    body:
      "У Flunio регулярно з’являються покращення, нові матеріали " +
      "та корисні можливості. Зазирни й перевір, чи не додалося " +
      "чогось нового для твого навчання.",
    button: "Перевірити Flunio",
    path: "/updates",
    unsubscribe: "Відписатися від листів",
    footer:
      "Ти отримав цей лист, бо ввімкнув листи від Flunio.",
  };
}

function buildEmail({
  user,
  kind,
  appUrl,
}: {
  user: ReminderUser;
  kind: ReminderKind;
  appUrl: string;
}) {
  if (!user.unsubscribeToken) {
    throw new Error(`Missing unsubscribe token for user ${user.id}`);
  }

  const lang = normalizeLanguage(user.emailLanguage);
  const copy = getEmailCopy(lang, kind, user.name);

  const actionUrl = `${appUrl}${copy.path}`;
  const unsubscribeUrl =
    `${appUrl}/api/email-unsubscribe` +
    `?token=${encodeURIComponent(user.unsubscribeToken)}`;

  const html = `<!doctype html>
<html lang="${lang === "ua" ? "uk" : lang}">
<head>
  <meta charset="utf-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1"
  />
  <title>${escapeHtml(copy.subject)}</title>
</head>

<body
  style="
    margin:0;
    padding:0;
    background:#050816;
    font-family:Arial,Helvetica,sans-serif;
  "
>
  <div
    style="
      display:none;
      max-height:0;
      overflow:hidden;
      opacity:0;
      color:transparent;
    "
  >
    ${escapeHtml(copy.preheader)}
  </div>

  <table
    role="presentation"
    width="100%"
    cellspacing="0"
    cellpadding="0"
    border="0"
    style="background:#050816"
  >
    <tr>
      <td align="center" style="padding:28px 14px">
        <table
          role="presentation"
          width="100%"
          cellspacing="0"
          cellpadding="0"
          border="0"
          style="
            width:100%;
            max-width:620px;
            overflow:hidden;
            border:1px solid rgba(255,255,255,0.12);
            border-radius:26px;
            background:#111827;
          "
        >
          <tr>
            <td
              style="
                padding:22px 28px;
                background:linear-gradient(
                  135deg,
                  rgba(34,211,238,0.18),
                  rgba(59,130,246,0.14),
                  rgba(217,70,239,0.14)
                );
              "
            >
              <div
                style="
                  color:#67e8f9;
                  font-size:20px;
                  font-weight:800;
                  letter-spacing:0.2px;
                "
              >
                Flunio
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding:34px 28px 22px">
              <div
                style="
                  color:#cbd5e1;
                  font-size:16px;
                  line-height:1.6;
                "
              >
                ${copy.greeting}
              </div>

              <h1
                style="
                  margin:12px 0 0;
                  color:#f8fafc;
                  font-size:29px;
                  line-height:1.25;
                "
              >
                ${escapeHtml(copy.title)}
              </h1>

              <p
                style="
                  margin:18px 0 0;
                  color:#cbd5e1;
                  font-size:16px;
                  line-height:1.75;
                "
              >
                ${escapeHtml(copy.body)}
              </p>

              <table
                role="presentation"
                cellspacing="0"
                cellpadding="0"
                border="0"
                style="margin-top:26px"
              >
                <tr>
                  <td
                    style="
                      border-radius:14px;
                      background:#22d3ee;
                    "
                  >
                    <a
                      href="${actionUrl}"
                      style="
                        display:inline-block;
                        padding:14px 23px;
                        color:#082f49;
                        font-size:15px;
                        font-weight:800;
                        text-decoration:none;
                      "
                    >
                      ${escapeHtml(copy.button)} →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td
              style="
                padding:20px 28px 28px;
                border-top:1px solid rgba(255,255,255,0.08);
              "
            >
              <p
                style="
                  margin:0;
                  color:#64748b;
                  font-size:12px;
                  line-height:1.6;
                "
              >
                ${escapeHtml(copy.footer)}
              </p>

              <a
                href="${unsubscribeUrl}"
                style="
                  display:inline-block;
                  margin-top:9px;
                  color:#94a3b8;
                  font-size:12px;
                  text-decoration:underline;
                "
              >
                ${escapeHtml(copy.unsubscribe)}
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = [
    copy.greeting,
    "",
    copy.title,
    "",
    copy.body,
    "",
    `${copy.button}: ${actionUrl}`,
    "",
    copy.footer,
    `${copy.unsubscribe}: ${unsubscribeUrl}`,
  ].join("\n");

  return {
    subject: copy.subject,
    html,
    text,
    unsubscribeUrl,
  };
}

function splitIntoChunks<T>(
  items: T[],
  size: number,
): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }

  return chunks;
}

function getCandidate(
  user: ReminderUser,
  now: Date,
): ReminderCandidate | null {
  const threeDaysAgo = new Date(
    now.getTime() - UPDATES_INTERVAL_MS,
  );

  const fiveDaysAgo = new Date(
    now.getTime() - INACTIVITY_INTERVAL_MS,
  );

  const isInactive =
    user.lastActiveAt.getTime() <= fiveDaysAgo.getTime();

  if (isInactive) {
    const reminderAlreadySentForCurrentInactivity =
      user.inactivityReminderSentAt !== null &&
      user.inactivityReminderSentAt.getTime() >=
        user.lastActiveAt.getTime();

    if (reminderAlreadySentForCurrentInactivity) {
      return null;
    }

    return {
      user,
      kind: "inactivity",
    };
  }

  const updatesDue =
    user.updatesEmailSentAt === null ||
    user.updatesEmailSentAt.getTime() <=
      threeDaysAgo.getTime();

  if (!updatesDue) {
    return null;
  }

  return {
    user,
    kind: "updates",
  };
}

async function ensureUnsubscribeTokens(
  candidates: ReminderCandidate[],
): Promise<ReminderCandidate[]> {
  return Promise.all(
    candidates.map(async (candidate) => {
      if (candidate.user.unsubscribeToken) {
        return candidate;
      }

      const unsubscribeToken =
        randomBytes(32).toString("hex");

      await prisma.user.update({
        where: {
          id: candidate.user.id,
        },
        data: {
          unsubscribeToken,
        },
      });

      return {
        ...candidate,
        user: {
          ...candidate.user,
          unsubscribeToken,
        },
      };
    }),
  );
}

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");

  if (
    !cronSecret ||
    authorization !== `Bearer ${cronSecret}`
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  const emailReplyTo = process.env.EMAIL_REPLY_TO;
  const appUrl = (
    process.env.APP_URL ?? "https://flunio.com"
  ).replace(/\/+$/, "");

  if (!resendApiKey || !emailFrom) {
    console.error(
      "Missing RESEND_API_KEY or EMAIL_FROM environment variable",
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Email configuration is missing",
      },
      {
        status: 500,
      },
    );
  }

  try {
    const now = new Date();

    const users = await prisma.user.findMany({
      where: {
        emailRemindersEnabled: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        emailLanguage: true,
        preferredCourse: true,
        lastActiveAt: true,
        inactivityReminderSentAt: true,
        updatesEmailSentAt: true,
        unsubscribeToken: true,
      },
    });

    const initialCandidates = users
      .map((user) => getCandidate(user, now))
      .filter(
        (
          candidate,
        ): candidate is ReminderCandidate =>
          candidate !== null,
      );

    if (initialCandidates.length === 0) {
      return NextResponse.json({
        ok: true,
        checkedUsers: users.length,
        sent: 0,
        updatesSent: 0,
        inactivitySent: 0,
      });
    }

    const candidates =
      await ensureUnsubscribeTokens(initialCandidates);

    const chunks = splitIntoChunks(
      candidates,
      BATCH_SIZE,
    );

    let sent = 0;
    let updatesSent = 0;
    let inactivitySent = 0;

    for (
      let chunkIndex = 0;
      chunkIndex < chunks.length;
      chunkIndex += 1
    ) {
      const chunk = chunks[chunkIndex];

      const emails = chunk.map((candidate) => {
        const built = buildEmail({
          user: candidate.user,
          kind: candidate.kind,
          appUrl,
        });

        return {
          from: emailFrom,
          to: [candidate.user.email],

          ...(emailReplyTo
            ? {
                reply_to: emailReplyTo,
              }
            : {}),

          subject: built.subject,
          html: built.html,
          text: built.text,

          headers: {
            "List-Unsubscribe":
              `<${built.unsubscribeUrl}>`,
            "List-Unsubscribe-Post":
              "List-Unsubscribe=One-Click",
          },

          tags: [
            {
              name: "email_type",
              value: candidate.kind,
            },
            {
              name: "language",
              value: normalizeLanguage(
                candidate.user.emailLanguage,
              ),
            },
          ],
        };
      });

      const dayKey = now
        .toISOString()
        .slice(0, 10);

      const signature = createHash("sha256")
        .update(
          chunk
            .map(
              (candidate) =>
                `${candidate.user.id}:${candidate.kind}`,
            )
            .sort()
            .join("|"),
        )
        .digest("hex")
        .slice(0, 32);

      const idempotencyKey =
        `flunio-reminders-${dayKey}-${chunkIndex}-${signature}`;

      const response = await fetch(
        "https://api.resend.com/emails/batch",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(emails),
        },
      );

      const result =
        (await response.json().catch(() => ({}))) as
          ResendBatchResponse;

      if (!response.ok || result.error) {
        const message =
          result.error?.message ??
          `Resend returned ${response.status}`;

        console.error(
          "Resend batch send failed:",
          message,
        );

        throw new Error(message);
      }

      await prisma.$transaction(
        chunk.map((candidate) =>
          prisma.user.update({
            where: {
              id: candidate.user.id,
            },
            data:
              candidate.kind === "inactivity"
                ? {
                    inactivityReminderSentAt: now,

                    /*
                     * Щоб одразу після листа про неактивність
                     * не прийшов ще й лист про оновлення.
                     */
                    updatesEmailSentAt: now,
                  }
                : {
                    updatesEmailSentAt: now,
                  },
          }),
        ),
      );

      sent += chunk.length;

      updatesSent += chunk.filter(
        (candidate) =>
          candidate.kind === "updates",
      ).length;

      inactivitySent += chunk.filter(
        (candidate) =>
          candidate.kind === "inactivity",
      ).length;
    }

    return NextResponse.json({
      ok: true,
      checkedUsers: users.length,
      sent,
      updatesSent,
      inactivitySent,
    });
  } catch (error) {
    console.error(
      "GET /api/cron/email-reminders failed:",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error: "Email reminder cron failed",
      },
      {
        status: 500,
      },
    );
  }
}