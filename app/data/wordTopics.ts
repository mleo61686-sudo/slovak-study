export type TopicId =
  | "basics"
  | "people"
  | "home"
  | "shop"
  | "food"
  | "city"
  | "transport"
  | "time"
  | "work"
  | "school"
  | "numbers"
  | "colors"
  | "clothes"
  | "body"
  | "health"
  | "weather"
  | "nature"
  | "daily"
  | "verbs"
  | "questions"
  | "places"
  | "emotions"
  | "hobby"
  | "communication"
  | "travel"
  | "hotel_restaurant"
  | "money"
  | "tech"
  | "phrases"
  | "review";

// ✅ Мапа: SK слово -> тема
// Додаєш поступово. Те, чого нема тут — не піде в уроки (щоб не було "сир" у "кольорах").
export const WORD_TOPIC_BY_SK: Record<string, TopicId> = {
  // COLORS
  "biely": "colors",
  "čierny": "colors",
  "červený": "colors",
  "modrý": "colors",
  "zelený": "colors",
  "žltý": "colors",
  "oranžový": "colors",
  "ružový": "colors",
  "fialový": "colors",
  "hnedý": "colors",

  // FOOD (приклад)
  "chlieb": "food",
  "voda": "food",
  "mlieko": "food",
  "syr": "food",
  "mäso": "food",

  // HOME (приклад)
  "byt": "home",
  "izba": "home",
  "kuchyňa": "home",
  "okno": "home",
  "dvere": "home",

  // SHOP (приклад)
  "obchod": "shop",
  "cena": "shop",
  "zľava": "shop",
  "účtenka": "shop",
  "pokladňa": "shop",

  // TIME (приклад)
  "čas": "time",
  "deň": "time",
};