import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, link: string) {
  const subject = "Відновлення пароля / Сброс пароля / Password reset";

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <h2>Відновлення пароля</h2>
      <p>Натисни на посилання, щоб встановити новий пароль:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Посилання дійсне 30 хвилин. Якщо ти не робив запит — просто ігноруй лист.</p>

      <hr style="margin:24px 0" />

      <h2>Сброс пароля</h2>
      <p>Нажми на ссылку, чтобы установить новый пароль:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Ссылка действует 30 минут. Если это был не ты — просто проигнорируй письмо.</p>

      <hr style="margin:24px 0" />

      <h2>Password reset</h2>
      <p>Click the link below to set a new password:</p>
      <p><a href="${link}">${link}</a></p>
      <p>This link is valid for 30 minutes. If you did not request it, you can safely ignore this email.</p>
    </div>
  `;

  await resend.emails.send({
    from: "Flunio <support@flunio.com>",
    to,
    subject,
    html,
  });
}
export async function sendEmailVerification(
  to: string,
  link: string,
  lang: "ua" | "ru" | "en" = "ua",
) {
  const copy = {
    ua: {
      subject: "Підтвердь email і отримай Premium на 24 години",
      title: "Залишився один крок",
      body: "Підтвердь email — і Flunio автоматично активує Premium на 24 години.",
      button: "Підтвердити email",
      footer: "Посилання дійсне 24 години. Якщо це був не ти, просто проігноруй лист.",
    },
    ru: {
      subject: "Подтвердите email и получите Premium на 24 часа",
      title: "Остался один шаг",
      body: "Подтвердите email — и Flunio автоматически активирует Premium на 24 часа.",
      button: "Подтвердить email",
      footer: "Ссылка действует 24 часа. Если это были не вы, просто проигнорируйте письмо.",
    },
    en: {
      subject: "Confirm your email and get 24 hours of Premium",
      title: "One last step",
      body: "Confirm your email and Flunio will automatically activate Premium for 24 hours.",
      button: "Confirm email",
      footer: "The link is valid for 24 hours. If this was not you, you can ignore this email.",
    },
  }[lang];

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#e2e8f0;background:#070b1d;padding:32px 18px">
      <div style="max-width:560px;margin:0 auto;background:#11182f;border:1px solid #24335f;border-radius:22px;padding:28px">
        <div style="font-size:13px;font-weight:700;color:#67e8f9;letter-spacing:.08em;text-transform:uppercase">Flunio</div>
        <h1 style="margin:10px 0 8px;font-size:26px;color:#ffffff">${copy.title}</h1>
        <p style="margin:0 0 22px;color:#cbd5e1">${copy.body}</p>
        <p style="margin:0 0 22px">
          <a href="${link}" style="display:inline-block;background:linear-gradient(135deg,#22d3ee,#8b5cf6);color:#ffffff;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:14px">${copy.button}</a>
        </p>
        <p style="margin:0 0 12px;color:#94a3b8;font-size:13px">${copy.footer}</p>
        <p style="margin:0;color:#64748b;font-size:12px;word-break:break-all">${link}</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: process.env.EMAIL_FROM || "Flunio <support@flunio.com>",
    to,
    subject: copy.subject,
    html,
  });
}
