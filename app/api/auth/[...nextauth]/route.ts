/**
 * NextAuth API endpoint для аутентифікації у Flunio.
 *
 * Що робить:
 * Підключає стандартні обробники NextAuth (GET і POST) через auth.ts
 * і робить їх доступними за маршрутом /api/auth/*.
 *
 * Як працює:
 * Всі auth-запити (login, logout, session, callbacks) автоматично
 * передаються у handlers із конфігурації auth.
 *
 * Пов’язані файли:
 * - auth.ts (основна конфігурація NextAuth)
 * - компоненти логіну/реєстрації
 * - middleware / auth() виклики у серверних компонентах
 *
 * Роль у Flunio:
 * Центральна точка авторизації користувачів (NextAuth API route).
 */
import { handlers } from "@/auth";

export const GET = handlers.GET;
export const POST = handlers.POST;