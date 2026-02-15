"use client";

import { useRouter } from "next/navigation";

export default function PremiumButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/premium")}
      className="rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-black hover:bg-yellow-400 transition"
    >
      Premium ⭐
    </button>
  );
}
