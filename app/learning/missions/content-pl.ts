import type { Mission } from "./data";
/** Curated Polish practice; `sk` is the legacy target-text field. */
export const PL_MISSIONS: readonly Mission[] = [
  {
    "course": "pl",
    "slug": "pl-shop",
    "title": {
      "ua": "У магазині",
      "ru": "В магазине",
      "en": "At the shop"
    },
    "summary": {
      "ua": "Купи воду, уточни ціну та спосіб оплати.",
      "ru": "Купи воду, уточни цену и способ оплаты.",
      "en": "Buy water, ask the price and pay."
    },
    "goal": {
      "ua": "Попросити товар, запитати ціну й попрощатися.",
      "ru": "Попросить товар, узнать цену и попрощаться.",
      "en": "Ask for an item, check its price and say goodbye."
    },
    "level": "A0–A1",
    "icon": "🛒",
    "premium": false,
    "duration": 8,
    "steps": [
      {
        "id": "s1",
        "kind": "dialogue",
        "speaker": "Sprzedawczyni",
        "sk": "Dzień dobry! W czym mogę pomóc?",
        "translation": {
          "ua": "Добрий день! Чим можу допомогти?",
          "ru": "Добрый день! Чем могу помочь?",
          "en": "Hello! How can I help?"
        }
      },
      {
        "id": "s2",
        "kind": "choice",
        "speaker": "Sprzedawczyni",
        "sk": "W czym mogę pomóc?",
        "prompt": {
          "ua": "Попроси пляшку води.",
          "ru": "Попроси бутылку воды.",
          "en": "Ask for a bottle of water."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Poproszę butelkę wody."
          },
          {
            "id": "b",
            "sk": "Mieszkam niedaleko."
          },
          {
            "id": "c",
            "sk": "Jutro idę do pracy."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Poproszę» — ввічливе «прошу» під час покупки.",
          "ru": "«Poproszę» — вежливое «мне, пожалуйста».",
          "en": "«Poproszę» is a polite way to request an item."
        },
        "nextLine": "Oczywiście, proszę bardzo."
      },
      {
        "id": "s3",
        "kind": "dialogue",
        "speaker": "Sprzedawczyni",
        "sk": "Proszę bardzo. Coś jeszcze?",
        "translation": {
          "ua": "Ось, будь ласка. Ще щось?",
          "ru": "Вот, пожалуйста. Ещё что-нибудь?",
          "en": "Here you go. Anything else?"
        }
      },
      {
        "id": "s4",
        "kind": "choice",
        "speaker": "Sprzedawczyni",
        "sk": "Coś jeszcze?",
        "prompt": {
          "ua": "Скажи, що більше нічого не потрібно.",
          "ru": "Скажи, что больше ничего не нужно.",
          "en": "Say that is everything."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Gdzie jest przystanek?"
          },
          {
            "id": "b",
            "sk": "Nie, dziękuję, to wszystko."
          },
          {
            "id": "c",
            "sk": "Dziś mam wolne."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«To wszystko» — «це все».",
          "ru": "«To wszystko» — «это всё».",
          "en": "«To wszystko» means «that is all»."
        },
        "nextLine": "Dobrze, razem pięć złotych."
      },
      {
        "id": "s5",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади запитання «Скільки це коштує?»",
          "ru": "Составь вопрос «Сколько это стоит?»",
          "en": "Build «How much does this cost?»"
        },
        "solution": [
          "Ile",
          "to",
          "kosztuje?"
        ],
        "tokens": [
          "kosztuje?",
          "to",
          "Ile"
        ],
        "meaning": {
          "ua": "Ile to kosztuje? — Скільки це коштує?",
          "ru": "Ile to kosztuje? — Сколько это стоит?",
          "en": "Ile to kosztuje? — How much does it cost?"
        }
      },
      {
        "id": "s6",
        "kind": "dialogue",
        "speaker": "Sprzedawczyni",
        "sk": "To kosztuje pięć złotych. Płaci pan kartą?",
        "translation": {
          "ua": "Це коштує п’ять злотих. Платитимете карткою?",
          "ru": "Это стоит пять злотых. Будете платить картой?",
          "en": "It costs five zlotys. Are you paying by card?"
        }
      },
      {
        "id": "s7",
        "kind": "choice",
        "speaker": "Sprzedawczyni",
        "sk": "Płaci pan kartą?",
        "prompt": {
          "ua": "Підтвердь оплату карткою.",
          "ru": "Подтверди оплату картой.",
          "en": "Confirm that you are paying by card."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Dzisiaj jestem zmęczony."
          },
          {
            "id": "b",
            "sk": "Nie znam tego adresu."
          },
          {
            "id": "c",
            "sk": "Tak, kartą, proszę."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Kartą, proszę» — природна коротка відповідь.",
          "ru": "«Kartą, proszę» — короткий естественный ответ.",
          "en": "«Kartą, proszę» is a natural short reply."
        },
        "nextLine": "Proszę przyłożyć kartę."
      },
      {
        "id": "s8",
        "kind": "choice",
        "speaker": "Sprzedawczyni",
        "sk": "Czy potrzebuje pan torby?",
        "prompt": {
          "ua": "Скажи, що маєш свою сумку.",
          "ru": "Скажи, что у тебя своя сумка.",
          "en": "Say you brought your own bag."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Jestem dziś w pracy."
          },
          {
            "id": "b",
            "sk": "Nie, dziękuję, mam własną torbę."
          },
          {
            "id": "c",
            "sk": "Lubię tę kawę."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Mam własną torbę» — «у мене своя сумка».",
          "ru": "«Mam własną torbę» — «у меня своя сумка».",
          "en": "«Mam własną torbę» means «I have my own bag»."
        },
        "nextLine": "Dziękuję, do widzenia!"
      },
      {
        "id": "s9",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй і попрощайся польською.",
          "ru": "Поблагодари и попрощайся по-польски.",
          "en": "Thank the shop assistant and say goodbye in Polish."
        },
        "sample": "Dziękuję, do widzenia!",
        "translation": {
          "ua": "Дякую, до побачення!",
          "ru": "Спасибо, до свидания!",
          "en": "Thank you, goodbye!"
        },
        "hint": {
          "ua": "Пригадай ввічливе прощання.",
          "ru": "Вспомни вежливое прощание.",
          "en": "Recall a polite farewell."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-doctor",
    "title": {
      "ua": "Запис до лікаря",
      "ru": "Запись к врачу",
      "en": "Doctor appointment"
    },
    "summary": {
      "ua": "Зателефонуй до реєстратури та узгодь час прийому.",
      "ru": "Позвони в регистратуру и согласуй время.",
      "en": "Call reception and agree on an appointment time."
    },
    "goal": {
      "ua": "Записатися, описати симптоми, підтвердити запис.",
      "ru": "Записаться, описать симптомы и подтвердить запись.",
      "en": "Book an appointment, describe symptoms, confirm the visit."
    },
    "level": "A2",
    "icon": "🏥",
    "premium": true,
    "duration": 10,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Rejestratorka",
        "sk": "Dzień dobry, przychodnia. W czym mogę pomóc?",
        "translation": {
          "ua": "Добрий день, поліклініка. Чим можу допомогти?",
          "ru": "Добрый день, поликлиника. Чем могу помочь?",
          "en": "Hello, the clinic. How can I help?"
        }
      },
      {
        "id": "d2",
        "kind": "choice",
        "speaker": "Rejestratorka",
        "sk": "W czym mogę pomóc?",
        "prompt": {
          "ua": "Попроси записатися до лікаря.",
          "ru": "Попроси записаться к врачу.",
          "en": "Ask to book a doctor’s appointment."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Chciałbym umówić się do lekarza."
          },
          {
            "id": "b",
            "sk": "Chciałbym kupić bilet."
          },
          {
            "id": "c",
            "sk": "Mogę naprawić samochód."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Umówić się do lekarza» — записатися до лікаря.",
          "ru": "«Umówić się do lekarza» — записаться к врачу.",
          "en": "«Umówić się do lekarza» means to book an appointment."
        },
        "nextLine": "Co panu dolega?"
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Rejestratorka",
        "sk": "Co panu dolega?",
        "translation": {
          "ua": "Що вас турбує?",
          "ru": "Что вас беспокоит?",
          "en": "What seems to be the problem?"
        }
      },
      {
        "id": "d4",
        "kind": "choice",
        "speaker": "Rejestratorka",
        "sk": "Co panu dolega?",
        "prompt": {
          "ua": "Скажи, що горло болить уже три дні.",
          "ru": "Скажи, что горло болит уже три дня.",
          "en": "Say your throat has hurt for three days."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Jutro jadę autobusem."
          },
          {
            "id": "b",
            "sk": "Od trzech dni boli mnie gardło."
          },
          {
            "id": "c",
            "sk": "Kupiłem nowy telefon."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Boli mnie gardło» — «болить горло».",
          "ru": "«Boli mnie gardło» — «болит горло».",
          "en": "«Boli mnie gardło» means «my throat hurts»."
        },
        "nextLine": "Rozumiem. Mamy termin jutro rano."
      },
      {
        "id": "d5",
        "kind": "arrange",
        "prompt": {
          "ua": "Запитай, чи є вільний час завтра вранці.",
          "ru": "Спроси, есть ли свободное время завтра утром.",
          "en": "Ask about a free appointment tomorrow morning."
        },
        "solution": [
          "Czy",
          "jest",
          "wolny",
          "termin",
          "jutro",
          "rano?"
        ],
        "tokens": [
          "rano?",
          "wolny",
          "Czy",
          "jutro",
          "termin",
          "jest"
        ],
        "meaning": {
          "ua": "Czy jest wolny termin jutro rano? — Чи є вільний час завтра вранці?",
          "ru": "Это вопрос о свободном времени завтра утром.",
          "en": "This asks whether an appointment is available tomorrow morning."
        }
      },
      {
        "id": "d6",
        "kind": "dialogue",
        "speaker": "Rejestratorka",
        "sk": "Tak, o dziewiątej. Czy ta godzina panu odpowiada?",
        "translation": {
          "ua": "Так, о дев’ятій. Вам підходить?",
          "ru": "Да, в девять. Вам подходит?",
          "en": "Yes, at nine. Does that time suit you?"
        }
      },
      {
        "id": "d7",
        "kind": "choice",
        "speaker": "Rejestratorka",
        "sk": "Czy ta godzina panu odpowiada?",
        "prompt": {
          "ua": "Погодься на запропонований час.",
          "ru": "Согласись на предложенное время.",
          "en": "Agree to the proposed time."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Dziś pracuję do wieczora."
          },
          {
            "id": "b",
            "sk": "Nie mam prawa jazdy."
          },
          {
            "id": "c",
            "sk": "Tak, ta godzina mi odpowiada. Dziękuję."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Odpowiada mi» означає «мені підходить».",
          "ru": "«Odpowiada mi» означает «мне подходит».",
          "en": "«Odpowiada mi» means «that suits me»."
        },
        "nextLine": "Proszę przyjść kilka minut wcześniej."
      },
      {
        "id": "d8",
        "kind": "choice",
        "speaker": "Rejestratorka",
        "sk": "Proszę zabrać dokument tożsamości.",
        "prompt": {
          "ua": "Підтвердь, що візьмеш документ.",
          "ru": "Подтверди, что возьмёшь документ.",
          "en": "Confirm you will bring your ID."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zwykle chodzę pieszo."
          },
          {
            "id": "b",
            "sk": "Oczywiście, wezmę go ze sobą."
          },
          {
            "id": "c",
            "sk": "Nie lubię czekać."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Wezmę go ze sobą» — «візьму його із собою».",
          "ru": "«Wezmę go ze sobą» — «возьму его с собой».",
          "en": "«Wezmę go ze sobą» means «I will bring it»."
        },
        "nextLine": "Do widzenia!"
      },
      {
        "id": "d9",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй і попрощайся польською.",
          "ru": "Поблагодари и попрощайся по-польски.",
          "en": "Thank the receptionist and say goodbye in Polish."
        },
        "sample": "Dziękuję bardzo, do widzenia!",
        "translation": {
          "ua": "Дуже дякую, до побачення!",
          "ru": "Большое спасибо, до свидания!",
          "en": "Thank you very much, goodbye!"
        },
        "hint": {
          "ua": "Використай ввічливе прощання.",
          "ru": "Используй вежливое прощание.",
          "en": "Use a polite farewell."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-work",
    "title": {
      "ua": "Розмова на роботі",
      "ru": "Разговор на работе",
      "en": "Conversation at work"
    },
    "summary": {
      "ua": "Узгодь зміну графіка й обов’язки на зміні.",
      "ru": "Согласуй изменение графика и обязанности.",
      "en": "Agree on a schedule change and responsibilities."
    },
    "goal": {
      "ua": "Пояснити складність, запропонувати час і уточнити завдання.",
      "ru": "Объяснить сложность, предложить время и уточнить задачи.",
      "en": "Explain a difficulty, suggest a time and clarify duties."
    },
    "level": "B1",
    "icon": "🏭",
    "premium": true,
    "duration": 12,
    "steps": [
      {
        "id": "w1",
        "kind": "dialogue",
        "speaker": "Kierownik",
        "sk": "Jutro musimy zacząć wcześniej. Możesz przyjść na szóstą?",
        "translation": {
          "ua": "Завтра мусимо почати раніше. Можеш прийти на шосту?",
          "ru": "Завтра нужно начать раньше. Можешь прийти к шести?",
          "en": "Tomorrow we must start earlier. Can you come at six?"
        }
      },
      {
        "id": "w2",
        "kind": "choice",
        "speaker": "Kierownik",
        "sk": "Możesz przyjść na szóstą?",
        "prompt": {
          "ua": "Поясни, що перший автобус їде пізніше.",
          "ru": "Объясни, что первый автобус отправляется позже.",
          "en": "Explain that your first bus leaves later."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Nie zdążę na szóstą, pierwszy autobus jedzie później."
          },
          {
            "id": "b",
            "sk": "Wczoraj pracowałem długo."
          },
          {
            "id": "c",
            "sk": "Nie lubię rano kawy."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Nie zdążę» — «не встигну».",
          "ru": "«Nie zdążę» — «не успею».",
          "en": "«Nie zdążę» means «I won’t make it in time»."
        },
        "nextLine": "Rozumiem. O której możesz być?"
      },
      {
        "id": "w3",
        "kind": "dialogue",
        "speaker": "Kierownik",
        "sk": "O której możesz być w pracy?",
        "translation": {
          "ua": "О котрій можеш бути на роботі?",
          "ru": "Во сколько можешь быть на работе?",
          "en": "What time can you be at work?"
        }
      },
      {
        "id": "w4",
        "kind": "choice",
        "speaker": "Kierownik",
        "sk": "O której możesz być?",
        "prompt": {
          "ua": "Запропонуй прийти о сьомій.",
          "ru": "Предложи прийти к семи.",
          "en": "Offer to come at seven."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Pojadę tam w sobotę."
          },
          {
            "id": "b",
            "sk": "Mogę być o siódmej."
          },
          {
            "id": "c",
            "sk": "Dzisiaj mam wolne."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«O siódmej» — «о сьомій».",
          "ru": "«O siódmej» — «в семь».",
          "en": "«O siódmej» means «at seven»."
        },
        "nextLine": "Dobrze, tak się umówmy."
      },
      {
        "id": "w5",
        "kind": "arrange",
        "prompt": {
          "ua": "Уточни, хто підготує обладнання.",
          "ru": "Уточни, кто подготовит оборудование.",
          "en": "Ask who will prepare the equipment."
        },
        "solution": [
          "Kto",
          "przygotuje",
          "sprzęt?"
        ],
        "tokens": [
          "sprzęt?",
          "Kto",
          "przygotuje"
        ],
        "meaning": {
          "ua": "Kto przygotuje sprzęt? — Хто підготує обладнання?",
          "ru": "Kto przygotuje sprzęt? — Кто подготовит оборудование?",
          "en": "Who will prepare the equipment?"
        }
      },
      {
        "id": "w6",
        "kind": "dialogue",
        "speaker": "Kierownik",
        "sk": "Sprzęt przygotuje poranna zmiana. Ty sprawdź listę zadań.",
        "translation": {
          "ua": "Обладнання підготує ранкова зміна. Ти перевір список завдань.",
          "ru": "Оборудование подготовит утренняя смена. Проверь список задач.",
          "en": "The morning shift will prepare the equipment. You check the task list."
        }
      },
      {
        "id": "w7",
        "kind": "choice",
        "speaker": "Kierownik",
        "sk": "Sprawdzisz listę zadań?",
        "prompt": {
          "ua": "Підтвердь, що перевіриш список перед зміною.",
          "ru": "Подтверди, что проверишь список до смены.",
          "en": "Confirm you will check the list before your shift."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Muszę dziś zrobić zakupy."
          },
          {
            "id": "b",
            "sk": "Nie wiem, gdzie jest biuro."
          },
          {
            "id": "c",
            "sk": "Tak, sprawdzę ją przed rozpoczęciem zmiany."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Przed rozpoczęciem zmiany» — до початку зміни.",
          "ru": "«Przed rozpoczęciem zmiany» — до начала смены.",
          "en": "«Przed rozpoczęciem zmiany» means before the shift starts."
        },
        "nextLine": "Dobrze."
      },
      {
        "id": "w8",
        "kind": "choice",
        "speaker": "Kierownik",
        "sk": "Jeśli będzie problem, daj mi znać.",
        "prompt": {
          "ua": "Пообіцяй повідомити про проблему.",
          "ru": "Пообещай сообщить о проблеме.",
          "en": "Promise to report a problem."
        },
        "choices": [
          {
            "id": "a",
            "sk": "W weekend mam urlop."
          },
          {
            "id": "b",
            "sk": "Jasne, od razu dam panu znać."
          },
          {
            "id": "c",
            "sk": "Znam dobrą restaurację."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Dam panu znać» — «повідомлю вас».",
          "ru": "«Dam panu znać» — «дам вам знать».",
          "en": "«Dam panu znać» means «I’ll let you know»."
        },
        "nextLine": "Dziękuję za ustalenia."
      },
      {
        "id": "w9",
        "kind": "produce",
        "prompt": {
          "ua": "Підсумуй домовленість польською.",
          "ru": "Подведи итог договорённости по-польски.",
          "en": "Summarise the arrangement in Polish."
        },
        "sample": "Jutro przyjdę o siódmej i sprawdzę listę zadań.",
        "translation": {
          "ua": "Завтра прийду о сьомій і перевірю список завдань.",
          "ru": "Завтра приду в семь и проверю список задач.",
          "en": "Tomorrow I will come at seven and check the task list."
        },
        "hint": {
          "ua": "Скажи, коли прийдеш і що зробиш.",
          "ru": "Скажи, когда придёшь и что сделаешь.",
          "en": "Say when you will arrive and what you will do."
        }
      }
    ]
  }
];
