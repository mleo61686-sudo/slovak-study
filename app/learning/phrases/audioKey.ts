import crypto from "node:crypto";

export function audioPhraseKey(sk: string) {
  return crypto
    .createHash("sha1")
    .update(sk.trim(), "utf8")
    .digest("hex")
    .slice(0, 13); // як у твоєму прикладі 08e6b18505b43
}
