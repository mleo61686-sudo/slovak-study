import type { Lang } from "@/lib/src/language";
import { FORGOT_MINUTES } from "./words-srs-logic";

export type WordsSrsTexts = {
  title: string;
  subtitle: string;
  today: string;
  back: string;
  add30: string;
  total: string;
  mastered: string;
  learned: string;
  due: string;
  left: string;
  progress: string;
  showAnswer: string;
  tapToReveal: string;
  noDueTitle: string;
  noDueText: string;
  sessionDone: string;
  sessionDoneText: string;
  nextSession: string;
  skip: string;
  skipHint: string;
  forgot: string;
  hard: string;
  good: string;
  easy: string;
  dailyLimit: string;
  noNew: string;
  repeatAgainThisSession: string;
  nextTomorrow: string;
  nextIn: (days: number) => string;
  nextSoon: string;
  almostDone: (left: number) => string;
  needLoginTitle: string;
  needLoginText: string;
  login: string;
};

export const WORDS_SRS_TEXTS: Record<Lang, WordsSrsTexts> = {
  ua: {
    title: "Тренер слів",
    subtitle:
      "Flunio повертає слова саме тоді, коли мозок починає їх забувати.",
    today: "Сьогодні",
    back: "Назад",
    add30: "Додати 30 слів у тренер",
    total: "Всього слів",
    mastered: "Закріплено",
    learned: "У тренері",
    due: "До тренування",
    left: "Залишилось",
    progress: "Прогрес тренування",
    showAnswer: "Показати відповідь",
    tapToReveal: "Натисни на картку, щоб побачити переклад",
    noDueTitle: "🎉 На зараз тренування завершене",
    noDueText:
      "Додай нові слова в тренер, і Flunio почне повертати їх у правильний момент для повторення.",
    sessionDone: "🎉 Тренування завершено",
    sessionDoneText:
      "Круто! Ти закріпив сьогоднішні слова й отримав XP за прогрес.",
    nextSession: "Перевірити наступні слова",
    skip: "Пропустити",
    skipHint: "показати пізніше",
    forgot: "Забув",
    hard: "Важко",
    good: "Добре",
    easy: "Легко",
    dailyLimit: "Ліміт нових слів на сьогодні вичерпано 🙂",
    noNew: "Немає нових слів 🙂",
    repeatAgainThisSession: "🔁 Це слабке слово — повторимо ще раз у цьому тренуванні",
    nextTomorrow: "✅ Добре! Наступне повторення — завтра",
    nextIn: (days) => `🚀 Чудово! Наступне повторення через ${days} днів`,
    nextSoon: `⏳ Наступне повторення через ${FORGOT_MINUTES} хв`,
    almostDone: (left) => `🔥 Майже готово — залишилось ${left}`,
    needLoginTitle: "Потрібен вхід",
    needLoginText:
      "Тренер слів зберігає прогрес по акаунту. Увійди, щоб продовжити.",
    login: "Увійти →",
  },
  ru: {
    title: "Тренер слов",
    subtitle:
      "Flunio возвращает слова именно тогда, когда мозг начинает их забывать.",
    today: "Сегодня",
    back: "Назад",
    add30: "Добавить 30 слов в тренер",
    total: "Всего слов",
    learned: "В тренере",
    mastered: "Закреплено",
    due: "К тренировке",
    left: "Осталось",
    progress: "Прогресс тренировки",
    showAnswer: "Показать ответ",
    tapToReveal: "Нажми на карточку, чтобы увидеть перевод",
    noDueTitle: "🎉 На сейчас тренировка завершена",
    noDueText:
      "Добавь новые слова в тренер, и Flunio начнёт возвращать их в правильный момент для повторения.",
    sessionDone: "🎉 Тренировка завершена",
    sessionDoneText:
      "Отлично! Ты закрепил сегодняшние слова и получил XP за прогресс.",
    nextSession: "Проверить следующие слова",
    skip: "Пропустить",
    skipHint: "показать позже",
    forgot: "Забыл",
    hard: "Сложно",
    good: "Хорошо",
    easy: "Легко",
    dailyLimit: "Лимит новых слов на сегодня исчерпан 🙂",
    noNew: "Нет новых слов 🙂",
    repeatAgainThisSession:
      "🔁 Это слабое слово — повторим ещё раз в этой тренировке",
    nextTomorrow: "✅ Хорошо! Следующее повторение — завтра",
    nextIn: (days) => `🚀 Отлично! Следующее повторение через ${days} дней`,
    nextSoon: `⏳ Следующее повторение через ${FORGOT_MINUTES} мин`,
    almostDone: (left) => `🔥 Почти готово — осталось ${left}`,
    needLoginTitle: "Нужен вход",
    needLoginText:
      "Тренер слов сохраняет прогресс по аккаунту. Войдите, чтобы продолжить.",
    login: "Войти →",
  },
  en: {
    title: "Word Trainer",
    subtitle:
      "Flunio brings words back right when your brain starts to forget them.",
    today: "Today",
    back: "Back",
    add30: "Add 30 words to trainer",
    total: "Total words",
    learned: "In trainer",
    mastered: "Mastered",
    due: "To train",
    left: "Remaining",
    progress: "Training progress",
    showAnswer: "Show answer",
    tapToReveal: "Tap the card to reveal the translation",
    noDueTitle: "🎉 Training is complete for now",
    noDueText:
      "Add new words to the trainer, and Flunio will bring them back at the right time for review.",
    sessionDone: "🎉 Training completed",
    sessionDoneText:
      "Great job! You reinforced today’s words and earned XP for your progress.",
    nextSession: "Check next words",
    skip: "Skip",
    skipHint: "show later",
    forgot: "Forgot",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    dailyLimit: "Daily limit of new words reached 🙂",
    noNew: "No new words 🙂",
    repeatAgainThisSession:
      "🔁 This is a weak word — we’ll repeat it again in this training",
    nextTomorrow: "✅ Good! Next review — tomorrow",
    nextIn: (days) => `🚀 Great! Next review in ${days} days`,
    nextSoon: `⏳ Next review in ${FORGOT_MINUTES} min`,
    almostDone: (left) => `🔥 Almost done — ${left} left`,
    needLoginTitle: "Login required",
    needLoginText:
      "Word Trainer progress is saved per account. Log in to continue.",
    login: "Log in →",
  },
};