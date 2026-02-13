import crypto from "crypto";
import bcrypt from "bcryptjs";

export function makeResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  return { token, tokenHash };
}

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

export function isStrongEnough(password: string) {
  return typeof password === "string" && password.trim().length >= 8;
}
