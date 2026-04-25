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
    title: "Повторення слів",
    subtitle: "Flunio показує слова тоді, коли їх найкраще повторити.",
    today: "На сьогодні",
    back: "Назад",
    add30: "Додати 30 нових слів",
    total: "Всього слів",
    mastered: "Вивчив",
    learned: "Вчив",
    due: "На сьогодні",
    left: "Залишилось",
    progress: "Прогрес сеансу",
    showAnswer: "Показати відповідь",
    tapToReveal: "Натисни на картку, щоб побачити переклад",
    noDueTitle: "🎉 Слів для повторення поки немає",
    noDueText:
      "Додай перші 30 слів, і Flunio почне показувати їх для повторення у правильний час.",
    sessionDone: "🎉 Сеанс завершено",
    sessionDoneText: "Круто! Ти закріпив слова на сьогодні.",
    nextSession: "Взяти наступні",
    skip: "Пропустити",
    skipHint: "показати пізніше",
    forgot: "Забув",
    hard: "Важко",
    good: "Добре",
    easy: "Легко",
    dailyLimit: "Ліміт нових слів на сьогодні вичерпано 🙂",
    noNew: "Немає нових слів 🙂",
    repeatAgainThisSession: "🔁 Повторимо ще раз у цьому сеансі",
    nextTomorrow: "✅ Добре! Наступне повторення — завтра",
    nextIn: (days) => `🚀 Чудово! Наступне повторення через ${days} днів`,
    nextSoon: `⏳ Наступне повторення через ${FORGOT_MINUTES} хв`,
    almostDone: (left) => `🔥 Майже готово — залишилось ${left}`,
    needLoginTitle: "Потрібен вхід",
    needLoginText:
      "Прогрес повторення слів зберігається по акаунту. Увійди, щоб продовжити.",
    login: "Увійти →",
  },
  ru: {
    title: "Повторение слов",
    subtitle: "Flunio показывает слова тогда, когда их лучше всего повторить.",
    today: "На сегодня",
    back: "Назад",
    add30: "Добавить 30 новых слов",
    total: "Всего слов",
    learned: "Учил",
    mastered: "Выучил",
    due: "На сегодня",
    left: "Осталось",
    progress: "Прогресс сеанса",
    showAnswer: "Показать ответ",
    tapToReveal: "Нажми на карточку, чтобы увидеть перевод",
    noDueTitle: "🎉 Слов для повторения пока нет",
    noDueText:
      "Добавь первые 30 слов, и Flunio начнёт показывать их для повторения в нужное время.",
    sessionDone: "🎉 Сеанс завершён",
    sessionDoneText: "Отлично! Ты закрепил слова на сегодня.",
    nextSession: "Взять следующие",
    skip: "Пропустить",
    skipHint: "показать позже",
    forgot: "Забыл",
    hard: "Сложно",
    good: "Хорошо",
    easy: "Легко",
    dailyLimit: "Лимит новых слов на сегодня исчерпан 🙂",
    noNew: "Нет новых слов 🙂",
    repeatAgainThisSession: "🔁 Повторим ещё раз в этом сеансе",
    nextTomorrow: "✅ Хорошо! Следующее повторение — завтра",
    nextIn: (days) => `🚀 Отлично! Следующее повторение через ${days} дней`,
    nextSoon: `⏳ Следующее повторение через ${FORGOT_MINUTES} мин`,
    almostDone: (left) => `🔥 Почти готово — осталось ${left}`,
    needLoginTitle: "Нужен вход",
    needLoginText:
      "Прогресс повторения слов сохраняется по аккаунту. Войдите, чтобы продолжить.",
    login: "Войти →",
  },
  en: {
    title: "Word review",
    subtitle: "Flunio shows words when it is the best time to review them.",
    today: "Today",
    back: "Back",
    add30: "Add 30 new words",
    total: "Total words",
    learned: "Learned",
    mastered: "Mastered",
    due: "Due today",
    left: "Remaining",
    progress: "Session progress",
    showAnswer: "Show answer",
    tapToReveal: "Tap the card to reveal the translation",
    noDueTitle: "🎉 No words to review yet",
    noDueText:
      "Add your first 30 words, and Flunio will start showing them at the right time for review.",
    sessionDone: "🎉 Session completed",
    sessionDoneText: "Great job! You reviewed your words for today.",
    nextSession: "Take next batch",
    skip: "Skip",
    skipHint: "show later",
    forgot: "Forgot",
    hard: "Hard",
    good: "Good",
    easy: "Easy",
    dailyLimit: "Daily limit of new words reached 🙂",
    noNew: "No new words 🙂",
    repeatAgainThisSession: "🔁 We’ll repeat it again in this session",
    nextTomorrow: "✅ Good! Next review — tomorrow",
    nextIn: (days) => `🚀 Great! Next review in ${days} days`,
    nextSoon: `⏳ Next review in ${FORGOT_MINUTES} min`,
    almostDone: (left) => `🔥 Almost done — ${left} left`,
    needLoginTitle: "Login required",
    needLoginText:
      "Word review progress is saved per account. Log in to continue.",
    login: "Log in →",
  },
};