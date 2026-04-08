"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/src/useLanguage";

export default function SupportPage() {
  const { lang } = useLanguage();

  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("problem");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const t = {
    title:
      lang === "ru"
        ? "Поддержка"
        : lang === "en"
        ? "Support"
        : "Підтримка",

    emailPlaceholder:
      lang === "ru"
        ? "Ваш email *"
        : lang === "en"
        ? "Your email *"
        : "Ваш email *",

    topicProblem:
      lang === "ru"
        ? "Проблема"
        : lang === "en"
        ? "Problem"
        : "Проблема",

    topicQuestion:
      lang === "ru"
        ? "Вопрос"
        : lang === "en"
        ? "Question"
        : "Питання",

    topicIdea:
      lang === "ru"
        ? "Идея"
        : lang === "en"
        ? "Idea"
        : "Ідея",

    topicPayment:
      lang === "ru"
        ? "Оплата"
        : lang === "en"
        ? "Payment"
        : "Оплата",

    messagePlaceholder:
      lang === "ru"
        ? "Опишите проблему..."
        : lang === "en"
        ? "Describe the problem..."
        : "Опиши проблему...",

    send:
      lang === "ru"
        ? "Отправить"
        : lang === "en"
        ? "Send"
        : "Надіслати",

    sending:
      lang === "ru"
        ? "Отправляю..."
        : lang === "en"
        ? "Sending..."
        : "Відправляю...",

    emailRequired:
      lang === "ru"
        ? "Укажите email"
        : lang === "en"
        ? "Enter your email"
        : "Вкажіть email",

    messageShort:
      lang === "ru"
        ? "Опишите проблему подробнее (минимум 10 символов)"
        : lang === "en"
        ? "Describe the problem in more detail (minimum 10 characters)"
        : "Опиши проблему детальніше (мінімум 10 символів)",

    sendError:
      lang === "ru"
        ? "Ошибка отправки"
        : lang === "en"
        ? "Failed to send"
        : "Помилка відправки",

    serverError:
      lang === "ru"
        ? "Серверная ошибка"
        : lang === "en"
        ? "Server error"
        : "Серверна помилка",

    sent:
      lang === "ru"
        ? "Сообщение отправлено ✅"
        : lang === "en"
        ? "Message sent ✅"
        : "Повідомлення відправлено ✅",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!email.trim()) {
      setStatus(t.emailRequired);
      return;
    }

    if (message.trim().length < 10) {
      setStatus(t.messageShort);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          topic,
          message,
          page: window.location.href,
          ua: navigator.userAgent,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus(data.error || t.sendError);
      } else {
        setStatus(t.sent);
        setMessage("");
        setEmail("");
      }
    } catch {
      setStatus(t.serverError);
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">{t.title}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option value="problem">{t.topicProblem}</option>
          <option value="question">{t.topicQuestion}</option>
          <option value="idea">{t.topicIdea}</option>
          <option value="payment">{t.topicPayment}</option>
        </select>

        <textarea
          required
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          className="w-full border rounded-xl px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white rounded-xl px-5 py-2"
        >
          {loading ? t.sending : t.send}
        </button>

        {status && <p className="text-sm mt-2">{status}</p>}
      </form>
    </div>
  );
}