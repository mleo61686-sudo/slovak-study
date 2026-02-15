"use client";

import { useState } from "react";

export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("Проблема");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (!email.trim()) {
      setStatus("Вкажіть email");
      return;
    }

    if (message.trim().length < 10) {
      setStatus("Опиши проблему детальніше (мінімум 10 символів)");
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
        setStatus(data.error || "Помилка відправки");
      } else {
        setStatus("Повідомлення відправлено ✅");
        setMessage("");
        setEmail("");
      }
    } catch {
      setStatus("Серверна помилка");
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Підтримка</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          required
          placeholder="Ваш email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        />

        <select
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full border rounded-xl px-3 py-2"
        >
          <option value="Проблема">Проблема</option>
          <option value="Питання">Питання</option>
          <option value="Ідея">Ідея</option>
          <option value="Оплата">Оплата</option>
        </select>

        <textarea
          required
          placeholder="Опиши проблему..."
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
          {loading ? "Відправляю..." : "Надіслати"}
        </button>

        {status && (
          <p className="text-sm mt-2">{status}</p>
        )}
      </form>
    </div>
  );
}
