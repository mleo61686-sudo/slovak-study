import type { Lang } from "@/lib/src/language";

export type LocalizedText = Partial<Record<Lang, string>>;

export const UI: Record<string, LocalizedText> = {
  titleSk: {
    ua: "Відмінки у словацькій мові",
    ru: "Падежи в словацком языке",
    en: "Cases in Slovak",
  },
  titleCs: {
    ua: "Відмінки у чеській мові",
    ru: "Падежи в чешском языке",
    en: "Cases in Czech",
  },
  titlePl: {
    ua: "Відмінки у польській мові",
    ru: "Падежи в польском языке",
    en: "Cases in Polish",
  },

  introSk: {
    ua: "У словацькій мові активно використовується 6 відмінків. Вони показують роль слова в реченні: хто виконує дію, кого або що бачимо, кому допомагаємо, де знаходимось, з ким ідемо тощо.",
    ru: "В словацком языке активно используется 6 падежей. Они показывают роль слова в предложении: кто выполняет действие, кого или что видим, кому помогаем, где находимся, с кем идём и так далее.",
    en: "Slovak actively uses 6 cases. They show the role of a word in a sentence: who performs the action, whom or what we see, whom we help, where we are, who we go with, and so on.",
  },
  introCs: {
    ua: "У чеській мові 7 відмінків. Вони змінюють закінчення слів і допомагають зрозуміти, яку роль слово має в реченні. Окремо важливий кличний відмінок для звертання.",
    ru: "В чешском языке 7 падежей. Они меняют окончания слов и помогают понять, какую роль слово выполняет в предложении. Отдельно важен звательный падеж для обращения.",
    en: "Czech has 7 cases. They change word endings and help show the role of a word in a sentence. The vocative case is especially important for addressing someone.",
  },
  introPl: {
    ua: "У польській мові 7 відмінків. Вони часто впливають на закінчення іменників, прикметників і займенників. Для початківця головне — спочатку зрозуміти функцію кожного відмінка, а вже потім вчити таблиці закінчень.",
    ru: "В польском языке 7 падежей. Они часто влияют на окончания существительных, прилагательных и местоимений. Для начинающего главное — сначала понять функцию каждого падежа, а уже потом учить таблицы окончаний.",
    en: "Polish has 7 cases. They often affect the endings of nouns, adjectives, and pronouns. For beginners, the first step is to understand what each case does before memorizing ending tables.",
  },

  section1: {
    ua: "1) Швидка таблиця",
    ru: "1) Быстрая таблица",
    en: "1) Quick table",
  },
  section2: {
    ua: "2) Приклади",
    ru: "2) Примеры",
    en: "2) Examples",
  },
  section3: {
    ua: "3) Практика 🧠",
    ru: "3) Практика 🧠",
    en: "3) Practice 🧠",
  },
  section4: {
    ua: "4) Шпаргалка",
    ru: "4) Шпаргалка",
    en: "4) Cheat sheet",
  },

  score: {
    ua: "Рахунок:",
    ru: "Счёт:",
    en: "Score:",
  },
  reset: {
    ua: "Скинути",
    ru: "Сбросить",
    en: "Reset",
  },
  quizTitle: {
    ua: "A) Вибери правильний приклад",
    ru: "A) Выбери правильный пример",
    en: "A) Choose the correct example",
  },
  builderTitle: {
    ua: "B) Збери речення",
    ru: "B) Собери предложение",
    en: "B) Build the sentence",
  },
  target: {
    ua: "Ціль:",
    ru: "Цель:",
    en: "Target:",
  },
  clear: {
    ua: "Очистити",
    ru: "Очистить",
    en: "Clear",
  },
  next: {
    ua: "Наступне",
    ru: "Следующее",
    en: "Next",
  },
  yourSentence: {
    ua: "Твоє речення:",
    ru: "Твоё предложение:",
    en: "Your sentence:",
  },
  correct: {
    ua: "✅ Правильно!",
    ru: "✅ Правильно!",
    en: "✅ Correct!",
  },
  compare: {
    ua: "Порівняй із ціллю 👆",
    ru: "Сравни с целью 👆",
    en: "Compare it with the target 👆",
  },
  clickWords: {
    ua: "Натискай слова нижче.",
    ru: "Нажимай слова ниже.",
    en: "Click the words below.",
  },
  removeLast: {
    ua: "← Забрати останнє слово",
    ru: "← Убрать последнее слово",
    en: "← Remove last word",
  },
  correctShort: {
    ua: "✅ Правильно",
    ru: "✅ Правильно",
    en: "✅ Correct",
  },
  wrongPrefix: {
    ua: "❌ Неправильно. Правильно:",
    ru: "❌ Неправильно. Правильно:",
    en: "❌ Incorrect. Correct answer:",
  },

  tip1Sk: {
    ua: "Lokál завжди вживається з прийменником: v/vo, na, o, po.",
    ru: "Lokál всегда употребляется с предлогом: v/vo, na, o, po.",
    en: "Lokál is always used with a preposition: v/vo, na, o, po.",
  },
  tip2Sk: {
    ua: "Genitív часто стоїть після bez, do, z/zo, od, u: bez vody, do práce, z domu.",
    ru: "Genitív часто стоит после bez, do, z/zo, od, u: bez vody, do práce, z domu.",
    en: "Genitív often follows bez, do, z/zo, od, u: bez vody, do práce, z domu.",
  },
  tip3Sk: {
    ua: "Inštrumentál часто вживається з s/so: s kamarátom, so sestrou.",
    ru: "Inštrumentál часто употребляется с s/so: s kamarátom, so sestrou.",
    en: "Inštrumentál is often used with s/so: s kamarátom, so sestrou.",
  },

  tip1Cs: {
    ua: "Lokál у чеській завжди вживається з прийменником: v/ve, na, o, po.",
    ru: "Lokál в чешском всегда употребляется с предлогом: v/ve, na, o, po.",
    en: "Lokál in Czech is always used with a preposition: v/ve, na, o, po.",
  },
  tip2Cs: {
    ua: "Genitiv часто стоїть після bez, do, z/ze, od, u: bez vody, do práce, z domu.",
    ru: "Genitiv часто стоит после bez, do, z/ze, od, u: bez vody, do práce, z domu.",
    en: "Genitiv often follows bez, do, z/ze, od, u: bez vody, do práce, z domu.",
  },
  tip3Cs: {
    ua: "Instrumentál часто вживається з s/se: s kamarádem, se sestrou.",
    ru: "Instrumentál часто употребляется с s/se: s kamarádem, se sestrou.",
    en: "Instrumentál is often used with s/se: s kamarádem, se sestrou.",
  },
  tip4Cs: {
    ua: "Vokativ використовується для звертання: Petře!, pane!, Jano!",
    ru: "Vokativ используется для обращения: Petře!, pane!, Jano!",
    en: "Vokativ is used for addressing someone: Petře!, pane!, Jano!",
  },

  tip1Pl: {
    ua: "Miejscownik у польській завжди вживається з прийменником: w/we, na, o, po.",
    ru: "Miejscownik в польском всегда употребляется с предлогом: w/we, na, o, po.",
    en: "Miejscownik in Polish is always used with a preposition: w/we, na, o, po.",
  },
  tip2Pl: {
    ua: "Dopełniacz часто стоїть після bez, do, z/ze, od, u: bez wody, do pracy, z domu.",
    ru: "Dopełniacz часто стоит после bez, do, z/ze, od, u: bez wody, do pracy, z domu.",
    en: "Dopełniacz often follows bez, do, z/ze, od, u: bez wody, do pracy, z domu.",
  },
  tip3Pl: {
    ua: "Narzędnik часто вживається з z/ze: z kolegą, ze siostrą.",
    ru: "Narzędnik часто употребляется с z/ze: z kolegą, ze siostrą.",
    en: "Narzędnik is often used with z/ze: z kolegą, ze siostrą.",
  },
  tip4Pl: {
    ua: "Wołacz використовується для звертання: Piotrze!, Anno!, panie!",
    ru: "Wołacz используется для обращения: Piotrze!, Anno!, panie!",
    en: "Wołacz is used for addressing someone: Piotrze!, Anno!, panie!",
  },
};