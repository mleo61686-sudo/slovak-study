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
    title: lang === "ru" ? "Поддержка" : "Підтримка",
    emailPlaceholder: lang === "ru" ? "Ваш email *" : "Ваш email *",
    topicProblem: lang === "ru" ? "Проблема" : "Проблема",
    topicQuestion: lang === "ru" ? "Вопрос" : "Питання",
    topicIdea: lang === "ru" ? "Идея" : "Ідея",
    topicPayment: lang === "ru" ? "Оплата" : "Оплата",
    messagePlaceholder: lang === "ru" ? "Опишите проблему..." : "Опиши проблему...",
    send: lang === "ru" ? "Отправить" : "Надіслати",
    sending: lang === "ru" ? "Отправляю..." : "Відправляю...",
    emailRequired: lang === "ru" ? "Укажите email" : "Вкажіть email",
    messageShort:
      lang === "ru"
        ? "Опишите проблему подробнее (минимум 10 символов)"
        : "Опиши проблему детальніше (мінімум 10 символів)",
    sendError: lang === "ru" ? "Ошибка отправки" : "Помилка відправки",
    serverError: lang === "ru" ? "Серверная ошибка" : "Серверна помилка",
    sent: lang === "ru" ? "Сообщение отправлено ✅" : "Повідомлення відправлено ✅",
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