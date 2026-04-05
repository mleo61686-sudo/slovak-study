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