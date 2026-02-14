"use client";

export default function PremiumButton() {
  const handleClick = async () => {
    const res = await fetch("/api/stripe/checkout", {
      method: "POST",
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.url) {
      alert("Stripe checkout error");
      return;
    }

    window.location.href = data.url;
  };

  return (
    <button
      onClick={handleClick}
      className="rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-400 transition"
    >
      Premium ⭐
    </button>
  );
}
