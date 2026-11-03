import { EXTRA_MISSIONS } from "./content-extra";
/** Curated real-life scenarios. `sk` is a backwards-compatible target-text property for all course languages. */
import { CS_MISSIONS } from "./content-cs";
import { PL_MISSIONS } from "./content-pl";
import type { Course } from "../personal-plan/planner";
export type UiLang = "ua" | "ru" | "en";
export type Localized = Record<UiLang, string>;
export type MissionStep =
  | {
      id: string;
      kind: "dialogue";
      speaker: string;
      sk: string;
      audioSrc?: string;
      translation: Localized;
      tip?: Localized;
    }
  | {
      id: string;
      kind: "choice";
      speaker: string;
      sk: string;
      prompt: Localized;
      choices: { id: string; sk: string }[];
      correctId: string;
      explanation: Localized;
      nextLine: string;
      nextAudioSrc?: string;
    }
  | {
      id: string;
      kind: "arrange";
      prompt: Localized;
      tokens: string[];
      solution: string[];
      meaning: Localized;
    }
  | {
      id: string;
      kind: "produce";
      prompt: Localized;
      sample: string;
      translation: Localized;
      hint: Localized;
    };

export type Mission = {
  course: Course;
  slug: string;
  title: Localized;
  summary: Localized;
  goal: Localized;
  level: "A0–A1" | "A2" | "B1";
  icon: string;
  premium: boolean;
  duration: number;
  steps: MissionStep[];
};

export const MISSIONS: readonly Mission[] = [
  {
    course: "sk", slug: "shop",
    title: { ua: "У магазині", ru: "В магазине", en: "At the shop" },
    summary: { ua: "Купи потрібний товар і запитай про ціну.", ru: "Купи нужный товар и спроси о цене.", en: "Buy what you need and ask about the price." },
    goal: { ua: "Привітатися, попросити товар, уточнити ціну та подякувати.", ru: "Поздороваться, попросить товар, уточнить цену и поблагодарить.", en: "Greet the assistant, ask for an item, check its price and say thanks." },
    level: "A0–A1", icon: "🛒", premium: false, duration: 8,
    steps: [
      { id: "s1", kind: "dialogue", speaker: "Predavačka", sk: "Dobrý deň! Čo si prosíte?", translation: { ua: "Добрий день! Що бажаєте?", ru: "Добрый день! Что желаете?", en: "Hello! What would you like?" }, tip: { ua: "«Prosím si» — ввічливий спосіб попросити товар.", ru: "«Prosím si» — вежливый способ попросить товар.", en: "«Prosím si» is a polite way to ask for something." } },
      { id: "s2", kind: "choice", speaker: "Predavačka", sk: "Čo si prosíte?", prompt: { ua: "Попроси пляшку води.", ru: "Попроси бутылку воды.", en: "Ask for a bottle of water." }, choices: [{ id: "a", sk: "Prosím si fľašu vody." }, { id: "b", sk: "Voda je zatvorená." }, { id: "c", sk: "Kde bývate?" }], correctId: "a", explanation: { ua: "«Prosím si fľašu vody» — природне ввічливе прохання.", ru: "«Prosím si fľašu vody» — естественная вежливая просьба.", en: "«Prosím si fľašu vody» is a natural, polite request." }, nextLine: "Samozrejme, nech sa páči." },
      { id: "s3", kind: "dialogue", speaker: "Predavačka", sk: "Nech sa páči. Ešte niečo?", translation: { ua: "Будь ласка (ось товар). Ще щось?", ru: "Пожалуйста (вот товар). Что-нибудь ещё?", en: "Here you go. Anything else?" } },
      { id: "s4", kind: "choice", speaker: "Predavačka", sk: "Ešte niečo?", prompt: { ua: "Скажи, що більше нічого не потрібно.", ru: "Скажи, что больше ничего не нужно.", en: "Say you don't need anything else." }, choices: [{ id: "a", sk: "Áno, bývam tu." }, { id: "b", sk: "Nie, ďakujem, to je všetko." }, { id: "c", sk: "Koľko je hodín?" }], correctId: "b", explanation: { ua: "«To je všetko» означає «це все».", ru: "«To je všetko» означает «это всё».", en: "«To je všetko» means «that's everything»." }, nextLine: "Dobre, sú to dve eurá." },
      { id: "s5", kind: "arrange", prompt: { ua: "Склади запитання «Скільки це коштує?»", ru: "Составь вопрос «Сколько это стоит?»", en: "Build the question «How much does it cost?»" }, tokens: ["stojí?", "to", "Koľko"], solution: ["Koľko", "to", "stojí?"], meaning: { ua: "Koľko to stojí? — Скільки це коштує?", ru: "Koľko to stojí? — Сколько это стоит?", en: "Koľko to stojí? — How much does it cost?" } },
      { id: "s6", kind: "dialogue", speaker: "Predavačka", sk: "Stojí to dve eurá. Budete platiť kartou?", translation: { ua: "Це коштує два євро. Платитимете карткою?", ru: "Это стоит два евро. Будете платить картой?", en: "It's two euros. Will you pay by card?" } },
      { id: "s7", kind: "choice", speaker: "Predavačka", sk: "Budete platiť kartou?", prompt: { ua: "Підтвердь, що заплатиш карткою.", ru: "Подтверди, что заплатишь картой.", en: "Confirm you'll pay by card." }, choices: [{ id: "a", sk: "Nie, som doma." }, { id: "b", sk: "Chcem ísť von." }, { id: "c", sk: "Áno, kartou, prosím." }], correctId: "c", explanation: { ua: "«Áno, kartou, prosím» — коротка й природна відповідь.", ru: "«Áno, kartou, prosím» — короткий и естественный ответ.", en: "«Áno, kartou, prosím» is short and natural." }, nextLine: "Ďakujem, dovidenia!" },
      { id: "s7b", kind: "choice", speaker: "Predavačka", sk: "Potrebujete tašku?", prompt: { ua: "Тобі пропонують пакет. Скажи, що маєш власну торбу.", ru: "Тебе спрашивают, нужен ли пакет. Скажи, что у тебя своя сумка.", en: "You're offered a bag. Say you brought your own." }, choices: [{ id: "a", sk: "Áno, včera som bol v práci." }, { id: "b", sk: "Nie, ďakujem, mám vlastnú tašku." }, { id: "c", sk: "Táto voda je veľmi studená." }], correctId: "b", explanation: { ua: "«Mám vlastnú tašku» — «у мене є власна торба».", ru: "«Mám vlastnú tašku» — «у меня своя сумка».", en: "«Mám vlastnú tašku» means «I've got my own bag»." }, nextLine: "Výborne, dovidenia!" },
      { id: "s8", kind: "produce", prompt: { ua: "Скажи продавчині «Дякую, до побачення!» своїми словами словацькою.", ru: "Скажи продавщице «Спасибо, до свидания!» своими словами по-словацки.", en: "Say «Thanks, goodbye!» in Slovak, using your own words." }, sample: "Ďakujem, dovidenia!", translation: { ua: "Дякую, до побачення!", ru: "Спасибо, до свидания!", en: "Thank you, goodbye!" }, hint: { ua: "Пригадай ввічливе прощання.", ru: "Вспомни вежливое прощание.", en: "Recall a polite farewell." } },
    ],
  },
  {
    course: "sk", slug: "doctor",
    title: { ua: "Запис до лікаря", ru: "Запись к врачу", en: "Booking a doctor" },
    summary: { ua: "Телефонна розмова з реєстратурою та опис симптомів.", ru: "Телефонный разговор с регистратурой и описание симптомов.", en: "Call reception and describe your symptoms." },
    goal: { ua: "Попросити запис, пояснити проблему, домовитися про час.", ru: "Попросить о записи, объяснить проблему, договориться о времени.", en: "Request an appointment, explain a problem and agree on a time." },
    level: "A2", icon: "🏥", premium: true, duration: 10,
    steps: [
      { id: "d1", kind: "dialogue", speaker: "Recepcia", sk: "Dobrý deň, ambulancia doktorky Novákovej. Ako vám môžem pomôcť?", translation: { ua: "Добрий день, амбулаторія лікарки Новакової. Чим можу допомогти?", ru: "Добрый день, кабинет доктора Новаковой. Чем могу помочь?", en: "Hello, Dr Nováková's office. How can I help?" } },
      { id: "d2", kind: "choice", speaker: "Recepcia", sk: "Ako vám môžem pomôcť?", prompt: { ua: "Попроси записати тебе на прийом.", ru: "Попроси записать тебя на приём.", en: "Ask to book an appointment." }, choices: [{ id: "a", sk: "Chcel by som sa objednať k lekárke." }, { id: "b", sk: "Chcel by som zaplatiť nájom." }, { id: "c", sk: "Zavolám vám autobus." }], correctId: "a", explanation: { ua: "«Objednať sa» — записатися на прийом.", ru: "«Objednať sa» — записаться на приём.", en: "«Objednať sa» means to make an appointment." }, nextLine: "Samozrejme. Čo vás trápi?" },
      { id: "d3", kind: "dialogue", speaker: "Recepcia", sk: "Čo vás trápi?", translation: { ua: "Що вас турбує?", ru: "Что вас беспокоит?", en: "What's troubling you?" }, tip: { ua: "Це поширений спосіб запитати про скарги на здоров’я.", ru: "Так часто спрашивают о жалобах на здоровье.", en: "This is a common way to ask about symptoms." } },
      { id: "d4", kind: "choice", speaker: "Recepcia", sk: "Čo vás trápi?", prompt: { ua: "Скажи, що в тебе три дні болить горло.", ru: "Скажи, что у тебя три дня болит горло.", en: "Say your throat has been sore for three days." }, choices: [{ id: "a", sk: "Prídem zajtra autom." }, { id: "b", sk: "Už tri dni ma bolí hrdlo." }, { id: "c", sk: "Nechcem ísť do obchodu." }], correctId: "b", explanation: { ua: "«Už tri dni ma bolí hrdlo» — природний опис тривалості симптому.", ru: "«Už tri dni ma bolí hrdlo» — естественный способ описать длительность симптома.", en: "«Už tri dni ma bolí hrdlo» naturally expresses how long you've had the symptom." }, nextLine: "Rozumiem. Máme termín zajtra ráno." },
      { id: "d5", kind: "arrange", prompt: { ua: "Запитай «У вас є вільний час завтра вранці?»", ru: "Спроси «У вас есть свободное время завтра утром?»", en: "Ask «Do you have an available appointment tomorrow morning?»" }, tokens: ["zajtra", "termín", "Máte", "ráno?", "voľný"], solution: ["Máte", "voľný", "termín", "zajtra", "ráno?"], meaning: { ua: "Máte voľný termín zajtra ráno? — У вас є вільний час на прийом завтра вранці?", ru: "Máte voľný termín zajtra ráno? — Есть свободное время на приём завтра утром?", en: "Máte voľný termín zajtra ráno? — Do you have an available appointment tomorrow morning?" } },
      { id: "d6", kind: "dialogue", speaker: "Recepcia", sk: "Áno, o deviatej. Vyhovuje vám to?", translation: { ua: "Так, о дев'ятій. Вам підходить?", ru: "Да, в девять. Вам подходит?", en: "Yes, at nine. Does that work for you?" } },
      { id: "d7", kind: "choice", speaker: "Recepcia", sk: "Vyhovuje vám to?", prompt: { ua: "Погодься на запропонований час.", ru: "Согласись на предложенное время.", en: "Agree to the suggested time." }, choices: [{ id: "a", sk: "Nie, dnes som bol v práci." }, { id: "b", sk: "Nepoznám túto ulicu." }, { id: "c", sk: "Áno, vyhovuje mi to. Ďakujem." }], correctId: "c", explanation: { ua: "«Vyhovuje mi to» — «мені це підходить».", ru: "«Vyhovuje mi to» — «мне это подходит».", en: "«Vyhovuje mi to» means «that works for me»." }, nextLine: "Dobre, tešíme sa na vás zajtra." },
      { id: "d7b", kind: "choice", speaker: "Recepcia", sk: "Máte kartičku poistenca?", prompt: { ua: "Підтвердь, що маєш із собою картку медичного страхування.", ru: "Подтверди, что у тебя с собой карта медицинской страховки.", en: "Confirm you have your health insurance card with you." }, choices: [{ id: "a", sk: "Nie, ešte neviem, kde bývam." }, { id: "b", sk: "Asi prídem až budúci rok." }, { id: "c", sk: "Áno, mám ju so sebou." }], correctId: "c", explanation: { ua: "«Mám ju so sebou» — «маю її з собою».", ru: "«Mám ju so sebou» — «она у меня с собой».", en: "«Mám ju so sebou» means «I have it with me»." }, nextLine: "Dobre, dovidenia zajtra." },
      { id: "d8", kind: "produce", prompt: { ua: "Самостійно підтвердь, що прийдеш завтра о дев'ятій.", ru: "Самостоятельно подтверди, что придёшь завтра в девять.", en: "Say in Slovak that you will come tomorrow at nine." }, sample: "Prídem zajtra o deviatej.", translation: { ua: "Прийду завтра о дев'ятій.", ru: "Приду завтра в девять.", en: "I'll come tomorrow at nine." }, hint: { ua: "Почни з «Prídem…».", ru: "Начни с «Prídem…».", en: "You can begin with «Prídem…»." } },
    ],
  },
  {
    course: "sk", slug: "work",
    title: { ua: "Проблема на роботі", ru: "Проблема на работе", en: "A problem at work" },
    summary: { ua: "Повідом про несправність, поясни ситуацію та попроси допомогу.", ru: "Сообщи о неисправности, объясни ситуацию и попроси помощи.", en: "Report a problem, explain it and ask for help." },
    goal: { ua: "Описати несправність та узгодити наступні дії з колегою.", ru: "Описать неисправность и согласовать дальнейшие действия с коллегой.", en: "Describe a fault and agree on next steps with a colleague." },
    level: "B1", icon: "🛠️", premium: true, duration: 11,
    steps: [
      { id: "w1", kind: "dialogue", speaker: "Kolega", sk: "Ahoj, prečo stojí linka? Stalo sa niečo?", translation: { ua: "Привіт, чому лінія стоїть? Щось сталося?", ru: "Привет, почему линия стоит? Что-то случилось?", en: "Hi, why has the line stopped? Did something happen?" } },
      { id: "w2", kind: "choice", speaker: "Kolega", sk: "Prečo stojí linka?", prompt: { ua: "Поясни, що мийна машина зупинилася.", ru: "Объясни, что моечная машина остановилась.", en: "Explain that the washing machine on the line has stopped." }, choices: [{ id: "a", sk: "Umývačka sa zastavila." }, { id: "b", sk: "Umyjem auto cez víkend." }, { id: "c", sk: "Včera som išiel domov." }], correctId: "a", explanation: { ua: "«Sa zastavila» — зупинилася (сама або внаслідок несправності).", ru: "«Sa zastavila» — остановилась (сама или из-за неисправности).", en: "«Sa zastavila» means it has stopped." }, nextLine: "Vieš, čo sa pokazilo?" },
      { id: "w3", kind: "dialogue", speaker: "Kolega", sk: "Vieš, čo sa pokazilo?", translation: { ua: "Знаєш, що зламалося?", ru: "Знаешь, что сломалось?", en: "Do you know what's broken?" }, tip: { ua: "Якщо причина невідома, краще прямо сказати, що це лише припущення.", ru: "Если причина неизвестна, лучше прямо сказать, что это лишь предположение.", en: "If the cause is unknown, say clearly that it's only a possibility." } },
      { id: "w4", kind: "choice", speaker: "Kolega", sk: "Vieš, čo sa pokazilo?", prompt: { ua: "Ти не впевнений. Скажи, що, можливо, проблема зі шлангом біля зливу.", ru: "Ты не уверен. Скажи, что, возможно, проблема со шлангом у слива.", en: "You're not sure. Say the problem may be the hose by the drain." }, choices: [{ id: "a", sk: "Viem presne, že je všetko v poriadku." }, { id: "b", sk: "Nie som si istý, možno je problém s hadicou pri odtoku." }, { id: "c", sk: "Zajtra si kúpim novú hadicu do záhrady." }], correctId: "b", explanation: { ua: "«Nie som si istý, možno…» чітко позначає припущення.", ru: "«Nie som si istý, možno…» ясно показывает, что это предположение.", en: "«Nie som si istý, možno…» signals uncertainty clearly." }, nextLine: "Dobre, radšej zavoláme údržbu." },
      { id: "w5", kind: "arrange", prompt: { ua: "Попроси колегу викликати технічне обслуговування.", ru: "Попроси коллегу вызвать техническую службу.", en: "Ask your colleague to call maintenance." }, tokens: ["zavolať", "údržbu?", "Môžeš"], solution: ["Môžeš", "zavolať", "údržbu?"], meaning: { ua: "Môžeš zavolať údržbu? — Можеш викликати технічну службу?", ru: "Môžeš zavolať údržbu? — Можешь вызвать техническую службу?", en: "Môžeš zavolať údržbu? — Can you call maintenance?" } },
      { id: "w6", kind: "dialogue", speaker: "Kolega", sk: "Technik sa pýta, ako často sa to stáva.", translation: { ua: "Технік запитує, як часто це трапляється.", ru: "Техник спрашивает, как часто это случается.", en: "The technician is asking how often it happens." } },
      { id: "w7", kind: "choice", speaker: "Kolega", sk: "Ako často sa to stáva?", prompt: { ua: "Скажи, що це трапляється один раз за цикл.", ru: "Скажи, что это случается раз за цикл.", en: "Say it happens once per cycle." }, choices: [{ id: "a", sk: "Pred týždňom sme boli na dovolenke." }, { id: "b", sk: "Stáva sa to raz za cyklus." }, { id: "c", sk: "Po každom cykle idem domov." }], correctId: "b", explanation: { ua: "«Raz za cyklus» — один раз за цикл.", ru: "«Raz za cyklus» — один раз за цикл.", en: "«Raz za cyklus» means once per cycle." }, nextLine: "Rozumiem. Technik sa na to príde pozrieť." },
      { id: "w7b", kind: "choice", speaker: "Kolega", sk: "Môžeme znova spustiť linku?", prompt: { ua: "Запропонуй почекати, поки технік її перевірить.", ru: "Предложи подождать, пока техник её проверит.", en: "Suggest waiting until the technician checks it." }, choices: [{ id: "a", sk: "Radšej počkajme, kým ju technik skontroluje." }, { id: "b", sk: "Áno, zapnime ju bez kontroly." }, { id: "c", sk: "Dnes som prišiel do práce skoro." }], correctId: "a", explanation: { ua: "«Radšej počkajme, kým…» — обережна пропозиція зачекати.", ru: "«Radšej počkajme, kým…» — осторожное предложение подождать.", en: "«Radšej počkajme, kým…» suggests waiting as the safer option." }, nextLine: "Súhlasím, zavolám údržbu." },
      { id: "w8", kind: "produce", prompt: { ua: "Самостійно поясни колезі, що зачекаєте, поки технік перевірить злив.", ru: "Самостоятельно объясни коллеге, что подождёте, пока техник проверит слив.", en: "Tell your colleague you'll wait until the technician checks the drain." }, sample: "Počkáme, kým technik skontroluje odtok.", translation: { ua: "Почекаємо, поки технік перевірить злив.", ru: "Подождём, пока техник проверит слив.", en: "We'll wait until the technician checks the drain." }, hint: { ua: "Використай «Počkáme, kým…».", ru: "Используй «Počkáme, kým…».", en: "Try «Počkáme, kým…»." } },
    ],
  },
];

export const ALL_MISSIONS: readonly Mission[] = [...MISSIONS, ...CS_MISSIONS, ...PL_MISSIONS, ...EXTRA_MISSIONS];
export function getMissionsForCourse(course: Course): readonly Mission[] {
  return ALL_MISSIONS.filter(mission => mission.course === course);
}

export function getMission(slug: string): Mission | undefined {
  return ALL_MISSIONS.find((mission) => mission.slug === slug);
}

export function isMissionSlug(slug: string): boolean {
  return Boolean(getMission(slug));
}

export function objectiveSteps(mission: Mission) {
  return mission.steps.filter((s) => s.kind === "choice" || s.kind === "arrange");
}

function norm(text: string, course: Course) {
  const locale = { sk: "sk-SK", cs: "cs-CZ", pl: "pl-PL" }[course];
  return text.normalize("NFC").toLocaleLowerCase(locale).replace(/[.!?,;:]/g, "").replace(/\s+/g, " ").trim();
}

export function gradeMission(mission: Mission, answers: Record<string, string>) {
  let correct = 0;
  const questions = objectiveSteps(mission);
  for (const step of questions) {
    const answer = typeof answers[step.id] === "string" ? answers[step.id] : "";
    if (step.kind === "choice" && answer === step.correctId) correct++;
    if (step.kind === "arrange" && norm(answer, mission.course) === norm(step.solution.join(" "), mission.course)) correct++;
  }
  return { correct, total: questions.length, percent: Math.round((correct / Math.max(1, questions.length)) * 100) };
}
