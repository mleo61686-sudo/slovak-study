import type { User } from "@prisma/client";

export function hasPremium(user: User | null | undefined): boolean {
  if (!user) return false;

  if (!user.isPremium) return false;

  // якщо є дата закінчення — перевіряємо
  if (user.premiumUntil) {
    return user.premiumUntil > new Date();
  }

  // якщо дата не задана — вважаємо безстроковим
  return true;
}
