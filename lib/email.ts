import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendResetEmail(to: string, link: string) {
  const subject = "Відновлення пароля / Сброс пароля";

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.4">
      <h2>Відновлення пароля</h2>
      <p>Натисни на посилання, щоб встановити новий пароль:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Посилання дійсне 30 хвилин. Якщо ти не робив запит — просто ігноруй лист.</p>
      <hr/>
      <h2>Сброс пароля</h2>
      <p>Нажми на ссылку, чтобы установить новый пароль:</p>
      <p><a href="${link}">${link}</a></p>
      <p>Ссылка действует 30 минут. Если это был не ты — просто проигнорируй письмо.</p>
    </div>
  `;

  await resend.emails.send({
    from: "Slovak Study <no-reply@slovak-study.com>",
    to,
    subject,
    html,
  });
}
