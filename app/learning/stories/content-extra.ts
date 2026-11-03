import type { Story } from "./data";
/** Additional authored scenarios for SK, CS and PL. */
export const EXTRA_STORIES: readonly Story[] = [
  {
    "course": "sk",
    "slug": "train",
    "title": {
      "ua": "Поїзд із запізненням",
      "ru": "Поезд с опозданием",
      "en": "The delayed train"
    },
    "summary": {
      "ua": "Поїзд запізнюється, а пересадка під загрозою. Вибери, як діяти.",
      "ru": "Поезд опаздывает, а пересадка под угрозой. Выбери, как поступить.",
      "en": "Your train is late and a connection is uncertain. Decide what to do."
    },
    "goal": {
      "ua": "Розуміти оголошення, зміни маршруту та вказівки.",
      "ru": "Понимать объявления, изменения маршрута и указания.",
      "en": "Understand announcements, changes and directions."
    },
    "icon": "🚆",
    "premium": false,
    "duration": 7,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Sprievodca",
        "sk": "Na stanici hlásia, že vlak do Žiliny mešká dvadsať minút.",
        "translation": {
          "ua": "На станції оголошують про затримку поїзда на двадцять хвилин.",
          "ru": "На вокзале объявляют о задержке поезда на двадцать минут.",
          "en": "The station announces a twenty-minute train delay."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що сталося з поїздом?",
          "ru": "Что случилось с поездом?",
          "en": "What happened to the train?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Vlak odišiel skôr.",
            "translation": {
              "ua": "Поїзд виїхав раніше",
              "ru": "Поезд отправился раньше",
              "en": "The train left early"
            }
          },
          {
            "id": "c",
            "sk": "Stanica je zatvorená.",
            "translation": {
              "ua": "Вокзал зачинений",
              "ru": "Вокзал закрыт",
              "en": "The station is closed"
            }
          },
          {
            "id": "a",
            "sk": "Vlak mešká dvadsať minút.",
            "translation": {
              "ua": "Поїзд запізнюється на двадцять хвилин",
              "ru": "Поезд задерживается на двадцать минут",
              "en": "The train is twenty minutes late"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Cestujúca",
        "sk": "Cestujúca sa pýta sprievodcu, či stihne prestup v Trenčíne.",
        "translation": {
          "ua": "Пасажирка питає провідника, чи встигне на пересадку.",
          "ru": "Пассажирка спрашивает проводника, успеет ли на пересадку.",
          "en": "A passenger asks the conductor whether she can make her connection."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Як попросити допомогу? Обери реакцію.",
          "ru": "Как попросить помощь? Выбери реакцию.",
          "en": "How should she respond? Choose an approach."
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Môžete mi povedať, kde nájdem informácie?",
            "translation": {
              "ua": "Запитати, де отримати інформацію",
              "ru": "Спросить, где узнать информацию",
              "en": "Ask where to get information"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Počkám na ďalšie hlásenie.",
            "translation": {
              "ua": "Почекати наступного оголошення",
              "ru": "Подождать следующего объявления",
              "en": "Wait for the next announcement"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Sprievodca",
        "sk": "Informácie vám poskytnú pri pokladnici.",
        "translation": {
          "ua": "Інформацію можна отримати біля каси.",
          "ru": "Информацию можно получить у кассы.",
          "en": "You can get information at the ticket office."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Sprievodca",
        "sk": "Dobre, ale sledujte tabuľu s odchodmi.",
        "translation": {
          "ua": "Добре, але стеж за табло відправлення.",
          "ru": "Хорошо, но следи за табло отправлений.",
          "en": "All right, but watch the departure board."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Sprievodca",
        "sk": "Sprievodca odporúča overiť si spojenie v informačnom centre.",
        "translation": {
          "ua": "Провідник радить перевірити інформацію про пересадку.",
          "ru": "Проводник советует уточнить информацию о пересадке.",
          "en": "The conductor recommends checking the connection information."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Sprievodca",
        "sk": "Na tabuli sa napokon objaví nové nástupište číslo štyri.",
        "translation": {
          "ua": "На табло з’являється нова платформа номер чотири.",
          "ru": "На табло появляется новая платформа номер четыре.",
          "en": "A new platform, number four, appears on the board."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Куди треба перейти пасажирці?",
          "ru": "Куда должна перейти пассажирка?",
          "en": "Where should the passenger go?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Na parkovisko.",
            "translation": {
              "ua": "На парковку",
              "ru": "На парковку",
              "en": "To the parking lot"
            }
          },
          {
            "id": "a",
            "sk": "Na štvrté nástupište.",
            "translation": {
              "ua": "На четверту платформу",
              "ru": "На четвёртую платформу",
              "en": "To platform four"
            }
          },
          {
            "id": "b",
            "sk": "Do čakárne.",
            "translation": {
              "ua": "До зали очікування",
              "ru": "В зал ожидания",
              "en": "To the waiting room"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Cestujúca",
        "sk": "Cestujúca si skontroluje lístok a presunie sa na správne nástupište.",
        "translation": {
          "ua": "Пасажирка перевіряє квиток і переходить на правильну платформу.",
          "ru": "Пассажирка проверяет билет и переходит на нужную платформу.",
          "en": "The passenger checks her ticket and moves to the right platform."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що пасажирка робить наприкінці?",
          "ru": "Что пассажирка делает в конце?",
          "en": "What does the passenger do at the end?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Skontroluje si lístok.",
            "translation": {
              "ua": "Перевіряє квиток",
              "ru": "Проверяет билет",
              "en": "Checks the ticket"
            }
          },
          {
            "id": "b",
            "sk": "Kúpi si bicykel.",
            "translation": {
              "ua": "Купує велосипед",
              "ru": "Покупает велосипед",
              "en": "Buys a bicycle"
            }
          },
          {
            "id": "c",
            "sk": "Vráti sa domov.",
            "translation": {
              "ua": "Повертається додому",
              "ru": "Возвращается домой",
              "en": "Returns home"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Cestujúca si skontroluje lístok a presunie sa na správne nástupište. Informácie vám poskytnú pri pokladnici.",
        "translation": {
          "ua": "Завдяки перевіреній інформації пасажирка знаходить правильну платформу й продовжує подорож.",
          "ru": "Благодаря проверенной информации пассажирка находит нужную платформу и продолжает путь.",
          "en": "Using the updated information, the passenger finds the right platform and continues her trip."
        }
      }
    ],
    "level": "A1"
  },
  {
    "course": "sk",
    "slug": "interview",
    "title": {
      "ua": "Співбесіда з умовами",
      "ru": "Собеседование с условиями",
      "en": "A job interview with conditions"
    },
    "summary": {
      "ua": "На співбесіді обговорюють розвиток, графік та умови роботи.",
      "ru": "На собеседовании обсуждают развитие, график и условия работы.",
      "en": "Discuss career growth, schedules and conditions at an interview."
    },
    "goal": {
      "ua": "Розрізняти мотиви, умови та домовленості в професійному діалозі.",
      "ru": "Различать мотивы, условия и договорённости в профессиональном диалоге.",
      "en": "Understand motives, conditions and agreements in professional dialogue."
    },
    "icon": "💼",
    "premium": true,
    "duration": 9,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Personalistka",
        "sk": "Na pracovnom pohovore sa personalistka pýta, prečo chce uchádzač zmeniť prácu.",
        "translation": {
          "ua": "На співбесіді рекрутерка запитує, чому кандидат хоче змінити роботу.",
          "ru": "На собеседовании рекрутер спрашивает, почему кандидат хочет сменить работу.",
          "en": "The recruiter asks why the candidate wants to change jobs."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Чому кандидат хоче змінити роботу?",
          "ru": "Почему кандидат хочет сменить работу?",
          "en": "Why does the candidate want to change jobs?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Nemá rád cestovanie.",
            "translation": {
              "ua": "Не любить подорожі",
              "ru": "Не любит путешествовать",
              "en": "Dislikes travelling"
            }
          },
          {
            "id": "c",
            "sk": "Hľadá kratšiu cestu domov.",
            "translation": {
              "ua": "Шукає коротшу дорогу додому",
              "ru": "Ищет более короткую дорогу домой",
              "en": "Seeks a shorter route home"
            }
          },
          {
            "id": "a",
            "sk": "Chce sa odborne rozvíjať.",
            "translation": {
              "ua": "Хоче професійно розвиватися",
              "ru": "Хочет профессионально развиваться",
              "en": "Wants to grow professionally"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Uchádzač",
        "sk": "Uchádzač vysvetľuje, že hľadá viac príležitostí na odborný rast.",
        "translation": {
          "ua": "Кандидат шукає більше можливостей професійного розвитку.",
          "ru": "Кандидат ищет больше возможностей профессионального развития.",
          "en": "The candidate wants more opportunities for professional growth."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Яке уточнення поставить кандидат?",
          "ru": "Какой уточняющий вопрос задаст кандидат?",
          "en": "Which follow-up question will the candidate ask?"
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Môžete mi bližšie vysvetliť rozpis služieb?",
            "translation": {
              "ua": "Запитати про графік чергувань",
              "ru": "Спросить о графике дежурств",
              "en": "Ask about the shift schedule"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Ako často bývajú víkendové služby?",
            "translation": {
              "ua": "Уточнити частоту роботи у вихідні",
              "ru": "Уточнить частоту работы в выходные",
              "en": "Ask how often weekend work is required"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Personalistka",
        "sk": "Rozpis sa pripravuje mesiac vopred.",
        "translation": {
          "ua": "Графік складають за місяць наперед.",
          "ru": "График составляют за месяц вперёд.",
          "en": "Schedules are prepared a month in advance."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Personalistka",
        "sk": "V priemere ide o jednu sobotu mesačne.",
        "translation": {
          "ua": "У середньому одна субота на місяць.",
          "ru": "В среднем одна суббота в месяц.",
          "en": "About one Saturday per month."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Personalistka",
        "sk": "Personalistka upozorňuje, že súčasťou pozície sú aj občasné víkendové služby.",
        "translation": {
          "ua": "Рекрутерка попереджає, що іноді потрібні чергування у вихідні.",
          "ru": "Рекрутер предупреждает, что иногда требуются дежурства по выходным.",
          "en": "The recruiter warns that occasional weekend shifts are required."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Personalistka",
        "sk": "Na konci stretnutia sa dohodnú, že výsledok výberu príde e-mailom do piatku.",
        "translation": {
          "ua": "Вони домовляються повідомити результат електронною поштою до п’ятниці.",
          "ru": "Они договариваются сообщить результат по электронной почте до пятницы.",
          "en": "They agree that the outcome will be sent by email by Friday."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Яка умова роботи згадується?",
          "ru": "Какое условие работы упоминается?",
          "en": "What working condition is mentioned?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Práca iba z domu.",
            "translation": {
              "ua": "Лише дистанційна робота",
              "ru": "Только удалённая работа",
              "en": "Remote work only"
            }
          },
          {
            "id": "a",
            "sk": "Občasné víkendové služby.",
            "translation": {
              "ua": "Іноді працювати у вихідні",
              "ru": "Иногда работать по выходным",
              "en": "Occasional weekend shifts"
            }
          },
          {
            "id": "b",
            "sk": "Povinné nočné cestovanie.",
            "translation": {
              "ua": "Обов’язкові нічні поїздки",
              "ru": "Обязательные ночные поездки",
              "en": "Mandatory overnight travel"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Uchádzač",
        "sk": "Uchádzač si zapíše termín a poďakuje za otvorený rozhovor.",
        "translation": {
          "ua": "Кандидат записує термін і дякує за відверту розмову.",
          "ru": "Кандидат записывает срок и благодарит за откровенный разговор.",
          "en": "The candidate notes the deadline and thanks the recruiter for the candid conversation."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Коли й як повідомлять результат?",
          "ru": "Когда и как сообщат результат?",
          "en": "When and how will the outcome be communicated?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Do piatku e-mailom.",
            "translation": {
              "ua": "До п’ятниці електронною поштою",
              "ru": "До пятницы по электронной почте",
              "en": "By Friday via email"
            }
          },
          {
            "id": "b",
            "sk": "Dnes telefonicky.",
            "translation": {
              "ua": "Сьогодні телефоном",
              "ru": "Сегодня по телефону",
              "en": "Today by phone"
            }
          },
          {
            "id": "c",
            "sk": "O mesiac poštou.",
            "translation": {
              "ua": "За місяць поштою",
              "ru": "Через месяц по почте",
              "en": "By post in a month"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Uchádzač si zapíše termín a poďakuje za otvorený rozhovor. Rozpis sa pripravuje mesiac vopred.",
        "translation": {
          "ua": "Кандидат краще розуміє умови й очікує рішення до п’ятниці.",
          "ru": "Кандидат лучше понимает условия и ждёт решения до пятницы.",
          "en": "The candidate understands the terms better and expects a decision by Friday."
        }
      }
    ],
    "level": "B1"
  },
  {
    "course": "cs",
    "slug": "cs-train",
    "title": {
      "ua": "Поїзд із запізненням",
      "ru": "Поезд с опозданием",
      "en": "The delayed train"
    },
    "summary": {
      "ua": "Поїзд запізнюється, а пересадка під загрозою. Вибери, як діяти.",
      "ru": "Поезд опаздывает, а пересадка под угрозой. Выбери, как поступить.",
      "en": "Your train is late and a connection is uncertain. Decide what to do."
    },
    "goal": {
      "ua": "Розуміти оголошення, зміни маршруту та вказівки.",
      "ru": "Понимать объявления, изменения маршрута и указания.",
      "en": "Understand announcements, changes and directions."
    },
    "icon": "🚆",
    "premium": false,
    "duration": 7,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Průvodčí",
        "sk": "Na nádraží hlásí, že vlak do Brna má dvacet minut zpoždění.",
        "translation": {
          "ua": "На станції оголошують про затримку поїзда на двадцять хвилин.",
          "ru": "На вокзале объявляют о задержке поезда на двадцать минут.",
          "en": "The station announces a twenty-minute train delay."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що сталося з поїздом?",
          "ru": "Что случилось с поездом?",
          "en": "What happened to the train?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Vlak odjel dřív.",
            "translation": {
              "ua": "Поїзд виїхав раніше",
              "ru": "Поезд отправился раньше",
              "en": "The train left early"
            }
          },
          {
            "id": "c",
            "sk": "Nádraží je zavřené.",
            "translation": {
              "ua": "Вокзал зачинений",
              "ru": "Вокзал закрыт",
              "en": "The station is closed"
            }
          },
          {
            "id": "a",
            "sk": "Vlak má dvacet minut zpoždění.",
            "translation": {
              "ua": "Поїзд запізнюється на двадцять хвилин",
              "ru": "Поезд задерживается на двадцать минут",
              "en": "The train is twenty minutes late"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Cestující",
        "sk": "Cestující se ptá průvodčího, jestli stihne přestup v Pardubicích.",
        "translation": {
          "ua": "Пасажирка питає провідника, чи встигне на пересадку.",
          "ru": "Пассажирка спрашивает проводника, успеет ли на пересадку.",
          "en": "A passenger asks the conductor whether she can make her connection."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Як попросити допомогу? Обери реакцію.",
          "ru": "Как попросить помощь? Выбери реакцию.",
          "en": "How should she respond? Choose an approach."
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Můžete mi říct, kde najdu informace?",
            "translation": {
              "ua": "Запитати, де отримати інформацію",
              "ru": "Спросить, где узнать информацию",
              "en": "Ask where to get information"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Počkám na další hlášení.",
            "translation": {
              "ua": "Почекати наступного оголошення",
              "ru": "Подождать следующего объявления",
              "en": "Wait for the next announcement"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Průvodčí",
        "sk": "Informace vám dají u pokladny.",
        "translation": {
          "ua": "Інформацію можна отримати біля каси.",
          "ru": "Информацию можно получить у кассы.",
          "en": "You can get information at the ticket office."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Průvodčí",
        "sk": "Dobře, ale sledujte odjezdovou tabuli.",
        "translation": {
          "ua": "Добре, але стеж за табло відправлення.",
          "ru": "Хорошо, но следи за табло отправлений.",
          "en": "All right, but watch the departure board."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Průvodčí",
        "sk": "Průvodčí doporučuje ověřit spojení v informačním centru.",
        "translation": {
          "ua": "Провідник радить перевірити інформацію про пересадку.",
          "ru": "Проводник советует уточнить информацию о пересадке.",
          "en": "The conductor recommends checking the connection information."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Průvodčí",
        "sk": "Na tabuli se nakonec objeví nové nástupiště číslo čtyři.",
        "translation": {
          "ua": "На табло з’являється нова платформа номер чотири.",
          "ru": "На табло появляется новая платформа номер четыре.",
          "en": "A new platform, number four, appears on the board."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Куди треба перейти пасажирці?",
          "ru": "Куда должна перейти пассажирка?",
          "en": "Where should the passenger go?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Na parkoviště.",
            "translation": {
              "ua": "На парковку",
              "ru": "На парковку",
              "en": "To the parking lot"
            }
          },
          {
            "id": "a",
            "sk": "Na čtvrté nástupiště.",
            "translation": {
              "ua": "На четверту платформу",
              "ru": "На четвёртую платформу",
              "en": "To platform four"
            }
          },
          {
            "id": "b",
            "sk": "Do čekárny.",
            "translation": {
              "ua": "До зали очікування",
              "ru": "В зал ожидания",
              "en": "To the waiting room"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Cestující",
        "sk": "Cestující si zkontroluje jízdenku a přejde na správné nástupiště.",
        "translation": {
          "ua": "Пасажирка перевіряє квиток і переходить на правильну платформу.",
          "ru": "Пассажирка проверяет билет и переходит на нужную платформу.",
          "en": "The passenger checks her ticket and moves to the right platform."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що пасажирка робить наприкінці?",
          "ru": "Что пассажирка делает в конце?",
          "en": "What does the passenger do at the end?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zkontroluje si jízdenku.",
            "translation": {
              "ua": "Перевіряє квиток",
              "ru": "Проверяет билет",
              "en": "Checks the ticket"
            }
          },
          {
            "id": "b",
            "sk": "Koupí si kolo.",
            "translation": {
              "ua": "Купує велосипед",
              "ru": "Покупает велосипед",
              "en": "Buys a bicycle"
            }
          },
          {
            "id": "c",
            "sk": "Vrátí se domů.",
            "translation": {
              "ua": "Повертається додому",
              "ru": "Возвращается домой",
              "en": "Returns home"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Cestující si zkontroluje jízdenku a přejde na správné nástupiště. Informace vám dají u pokladny.",
        "translation": {
          "ua": "Завдяки перевіреній інформації пасажирка знаходить правильну платформу й продовжує подорож.",
          "ru": "Благодаря проверенной информации пассажирка находит нужную платформу и продолжает путь.",
          "en": "Using the updated information, the passenger finds the right platform and continues her trip."
        }
      }
    ],
    "level": "A1"
  },
  {
    "course": "cs",
    "slug": "cs-interview",
    "title": {
      "ua": "Співбесіда з умовами",
      "ru": "Собеседование с условиями",
      "en": "A job interview with conditions"
    },
    "summary": {
      "ua": "На співбесіді обговорюють розвиток, графік та умови роботи.",
      "ru": "На собеседовании обсуждают развитие, график и условия работы.",
      "en": "Discuss career growth, schedules and conditions at an interview."
    },
    "goal": {
      "ua": "Розрізняти мотиви, умови та домовленості в професійному діалозі.",
      "ru": "Различать мотивы, условия и договорённости в профессиональном диалоге.",
      "en": "Understand motives, conditions and agreements in professional dialogue."
    },
    "icon": "💼",
    "premium": true,
    "duration": 9,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Personalistka",
        "sk": "Při pracovním pohovoru se personalistka ptá, proč chce uchazeč změnit práci.",
        "translation": {
          "ua": "На співбесіді рекрутерка запитує, чому кандидат хоче змінити роботу.",
          "ru": "На собеседовании рекрутер спрашивает, почему кандидат хочет сменить работу.",
          "en": "The recruiter asks why the candidate wants to change jobs."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Чому кандидат хоче змінити роботу?",
          "ru": "Почему кандидат хочет сменить работу?",
          "en": "Why does the candidate want to change jobs?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Nemá rád cestování.",
            "translation": {
              "ua": "Не любить подорожі",
              "ru": "Не любит путешествовать",
              "en": "Dislikes travelling"
            }
          },
          {
            "id": "c",
            "sk": "Hledá kratší cestu domů.",
            "translation": {
              "ua": "Шукає коротшу дорогу додому",
              "ru": "Ищет более короткую дорогу домой",
              "en": "Seeks a shorter route home"
            }
          },
          {
            "id": "a",
            "sk": "Chce se profesně rozvíjet.",
            "translation": {
              "ua": "Хоче професійно розвиватися",
              "ru": "Хочет профессионально развиваться",
              "en": "Wants to grow professionally"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Uchazeč",
        "sk": "Uchazeč vysvětluje, že hledá více příležitostí k profesnímu růstu.",
        "translation": {
          "ua": "Кандидат шукає більше можливостей професійного розвитку.",
          "ru": "Кандидат ищет больше возможностей профессионального развития.",
          "en": "The candidate wants more opportunities for professional growth."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Яке уточнення поставить кандидат?",
          "ru": "Какой уточняющий вопрос задаст кандидат?",
          "en": "Which follow-up question will the candidate ask?"
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Můžete mi blíže vysvětlit rozpis služeb?",
            "translation": {
              "ua": "Запитати про графік чергувань",
              "ru": "Спросить о графике дежурств",
              "en": "Ask about the shift schedule"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Jak často bývají víkendové služby?",
            "translation": {
              "ua": "Уточнити частоту роботи у вихідні",
              "ru": "Уточнить частоту работы в выходные",
              "en": "Ask how often weekend work is required"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Personalistka",
        "sk": "Rozpis se připravuje měsíc dopředu.",
        "translation": {
          "ua": "Графік складають за місяць наперед.",
          "ru": "График составляют за месяц вперёд.",
          "en": "Schedules are prepared a month in advance."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Personalistka",
        "sk": "V průměru jde o jednu sobotu měsíčně.",
        "translation": {
          "ua": "У середньому одна субота на місяць.",
          "ru": "В среднем одна суббота в месяц.",
          "en": "About one Saturday per month."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Personalistka",
        "sk": "Personalistka upozorňuje, že součástí pozice jsou i občasné víkendové služby.",
        "translation": {
          "ua": "Рекрутерка попереджає, що іноді потрібні чергування у вихідні.",
          "ru": "Рекрутер предупреждает, что иногда требуются дежурства по выходным.",
          "en": "The recruiter warns that occasional weekend shifts are required."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Personalistka",
        "sk": "Na konci schůzky se dohodnou, že výsledek výběru přijde e-mailem do pátku.",
        "translation": {
          "ua": "Вони домовляються повідомити результат електронною поштою до п’ятниці.",
          "ru": "Они договариваются сообщить результат по электронной почте до пятницы.",
          "en": "They agree that the outcome will be sent by email by Friday."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Яка умова роботи згадується?",
          "ru": "Какое условие работы упоминается?",
          "en": "What working condition is mentioned?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Práce pouze z domova.",
            "translation": {
              "ua": "Лише дистанційна робота",
              "ru": "Только удалённая работа",
              "en": "Remote work only"
            }
          },
          {
            "id": "a",
            "sk": "Občasné víkendové služby.",
            "translation": {
              "ua": "Іноді працювати у вихідні",
              "ru": "Иногда работать по выходным",
              "en": "Occasional weekend shifts"
            }
          },
          {
            "id": "b",
            "sk": "Povinné noční cestování.",
            "translation": {
              "ua": "Обов’язкові нічні поїздки",
              "ru": "Обязательные ночные поездки",
              "en": "Mandatory overnight travel"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Uchazeč",
        "sk": "Uchazeč si zapíše termín a poděkuje za otevřený rozhovor.",
        "translation": {
          "ua": "Кандидат записує термін і дякує за відверту розмову.",
          "ru": "Кандидат записывает срок и благодарит за откровенный разговор.",
          "en": "The candidate notes the deadline and thanks the recruiter for the candid conversation."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Коли й як повідомлять результат?",
          "ru": "Когда и как сообщат результат?",
          "en": "When and how will the outcome be communicated?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Do pátku e-mailem.",
            "translation": {
              "ua": "До п’ятниці електронною поштою",
              "ru": "До пятницы по электронной почте",
              "en": "By Friday via email"
            }
          },
          {
            "id": "b",
            "sk": "Dnes telefonicky.",
            "translation": {
              "ua": "Сьогодні телефоном",
              "ru": "Сегодня по телефону",
              "en": "Today by phone"
            }
          },
          {
            "id": "c",
            "sk": "Za měsíc poštou.",
            "translation": {
              "ua": "За місяць поштою",
              "ru": "Через месяц по почте",
              "en": "By post in a month"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Uchazeč si zapíše termín a poděkuje za otevřený rozhovor. Rozpis se připravuje měsíc dopředu.",
        "translation": {
          "ua": "Кандидат краще розуміє умови й очікує рішення до п’ятниці.",
          "ru": "Кандидат лучше понимает условия и ждёт решения до пятницы.",
          "en": "The candidate understands the terms better and expects a decision by Friday."
        }
      }
    ],
    "level": "B1"
  },
  {
    "course": "pl",
    "slug": "pl-train",
    "title": {
      "ua": "Поїзд із запізненням",
      "ru": "Поезд с опозданием",
      "en": "The delayed train"
    },
    "summary": {
      "ua": "Поїзд запізнюється, а пересадка під загрозою. Вибери, як діяти.",
      "ru": "Поезд опаздывает, а пересадка под угрозой. Выбери, как поступить.",
      "en": "Your train is late and a connection is uncertain. Decide what to do."
    },
    "goal": {
      "ua": "Розуміти оголошення, зміни маршруту та вказівки.",
      "ru": "Понимать объявления, изменения маршрута и указания.",
      "en": "Understand announcements, changes and directions."
    },
    "icon": "🚆",
    "premium": false,
    "duration": 7,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Konduktor",
        "sk": "Na dworcu ogłaszają, że pociąg do Krakowa jest opóźniony o dwadzieścia minut.",
        "translation": {
          "ua": "На станції оголошують про затримку поїзда на двадцять хвилин.",
          "ru": "На вокзале объявляют о задержке поезда на двадцать минут.",
          "en": "The station announces a twenty-minute train delay."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що сталося з поїздом?",
          "ru": "Что случилось с поездом?",
          "en": "What happened to the train?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Pociąg odjechał wcześniej.",
            "translation": {
              "ua": "Поїзд виїхав раніше",
              "ru": "Поезд отправился раньше",
              "en": "The train left early"
            }
          },
          {
            "id": "c",
            "sk": "Dworzec jest zamknięty.",
            "translation": {
              "ua": "Вокзал зачинений",
              "ru": "Вокзал закрыт",
              "en": "The station is closed"
            }
          },
          {
            "id": "a",
            "sk": "Pociąg jest opóźniony o dwadzieścia minut.",
            "translation": {
              "ua": "Поїзд запізнюється на двадцять хвилин",
              "ru": "Поезд задерживается на двадцать минут",
              "en": "The train is twenty minutes late"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Pasażerka",
        "sk": "Pasażerka pyta konduktora, czy zdąży na przesiadkę w Katowicach.",
        "translation": {
          "ua": "Пасажирка питає провідника, чи встигне на пересадку.",
          "ru": "Пассажирка спрашивает проводника, успеет ли на пересадку.",
          "en": "A passenger asks the conductor whether she can make her connection."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Як попросити допомогу? Обери реакцію.",
          "ru": "Как попросить помощь? Выбери реакцию.",
          "en": "How should she respond? Choose an approach."
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Czy może mi pan powiedzieć, gdzie znajdę informację?",
            "translation": {
              "ua": "Запитати, де отримати інформацію",
              "ru": "Спросить, где узнать информацию",
              "en": "Ask where to get information"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Poczekam na kolejny komunikat.",
            "translation": {
              "ua": "Почекати наступного оголошення",
              "ru": "Подождать следующего объявления",
              "en": "Wait for the next announcement"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Konduktor",
        "sk": "Informacji udzielą pani przy kasie.",
        "translation": {
          "ua": "Інформацію можна отримати біля каси.",
          "ru": "Информацию можно получить у кассы.",
          "en": "You can get information at the ticket office."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Konduktor",
        "sk": "Dobrze, ale proszę śledzić tablicę odjazdów.",
        "translation": {
          "ua": "Добре, але стеж за табло відправлення.",
          "ru": "Хорошо, но следи за табло отправлений.",
          "en": "All right, but watch the departure board."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Konduktor",
        "sk": "Konduktor radzi sprawdzić połączenie w punkcie informacji.",
        "translation": {
          "ua": "Провідник радить перевірити інформацію про пересадку.",
          "ru": "Проводник советует уточнить информацию о пересадке.",
          "en": "The conductor recommends checking the connection information."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Konduktor",
        "sk": "Na tablicy w końcu pojawia się nowy peron numer cztery.",
        "translation": {
          "ua": "На табло з’являється нова платформа номер чотири.",
          "ru": "На табло появляется новая платформа номер четыре.",
          "en": "A new platform, number four, appears on the board."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Куди треба перейти пасажирці?",
          "ru": "Куда должна перейти пассажирка?",
          "en": "Where should the passenger go?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Na parking.",
            "translation": {
              "ua": "На парковку",
              "ru": "На парковку",
              "en": "To the parking lot"
            }
          },
          {
            "id": "a",
            "sk": "Na peron czwarty.",
            "translation": {
              "ua": "На четверту платформу",
              "ru": "На четвёртую платформу",
              "en": "To platform four"
            }
          },
          {
            "id": "b",
            "sk": "Do poczekalni.",
            "translation": {
              "ua": "До зали очікування",
              "ru": "В зал ожидания",
              "en": "To the waiting room"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Pasażerka",
        "sk": "Pasażerka sprawdza bilet i przechodzi na właściwy peron.",
        "translation": {
          "ua": "Пасажирка перевіряє квиток і переходить на правильну платформу.",
          "ru": "Пассажирка проверяет билет и переходит на нужную платформу.",
          "en": "The passenger checks her ticket and moves to the right platform."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що пасажирка робить наприкінці?",
          "ru": "Что пассажирка делает в конце?",
          "en": "What does the passenger do at the end?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Sprawdza bilet.",
            "translation": {
              "ua": "Перевіряє квиток",
              "ru": "Проверяет билет",
              "en": "Checks the ticket"
            }
          },
          {
            "id": "b",
            "sk": "Kupuje rower.",
            "translation": {
              "ua": "Купує велосипед",
              "ru": "Покупает велосипед",
              "en": "Buys a bicycle"
            }
          },
          {
            "id": "c",
            "sk": "Wraca do domu.",
            "translation": {
              "ua": "Повертається додому",
              "ru": "Возвращается домой",
              "en": "Returns home"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Pasażerka sprawdza bilet i przechodzi na właściwy peron. Informacji udzielą pani przy kasie.",
        "translation": {
          "ua": "Завдяки перевіреній інформації пасажирка знаходить правильну платформу й продовжує подорож.",
          "ru": "Благодаря проверенной информации пассажирка находит нужную платформу и продолжает путь.",
          "en": "Using the updated information, the passenger finds the right platform and continues her trip."
        }
      }
    ],
    "level": "A1"
  },
  {
    "course": "pl",
    "slug": "pl-interview",
    "title": {
      "ua": "Співбесіда з умовами",
      "ru": "Собеседование с условиями",
      "en": "A job interview with conditions"
    },
    "summary": {
      "ua": "На співбесіді обговорюють розвиток, графік та умови роботи.",
      "ru": "На собеседовании обсуждают развитие, график и условия работы.",
      "en": "Discuss career growth, schedules and conditions at an interview."
    },
    "goal": {
      "ua": "Розрізняти мотиви, умови та домовленості в професійному діалозі.",
      "ru": "Различать мотивы, условия и договорённости в профессиональном диалоге.",
      "en": "Understand motives, conditions and agreements in professional dialogue."
    },
    "icon": "💼",
    "premium": true,
    "duration": 9,
    "start": "opening",
    "nodes": [
      {
        "kind": "scene",
        "id": "opening",
        "speaker": "Rekruterka",
        "sk": "Podczas rozmowy kwalifikacyjnej rekruterka pyta, dlaczego kandydat chce zmienić pracę.",
        "translation": {
          "ua": "На співбесіді рекрутерка запитує, чому кандидат хоче змінити роботу.",
          "ru": "На собеседовании рекрутер спрашивает, почему кандидат хочет сменить работу.",
          "en": "The recruiter asks why the candidate wants to change jobs."
        },
        "next": "q1"
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Чому кандидат хоче змінити роботу?",
          "ru": "Почему кандидат хочет сменить работу?",
          "en": "Why does the candidate want to change jobs?"
        },
        "choices": [
          {
            "id": "b",
            "sk": "Nie lubi podróżować.",
            "translation": {
              "ua": "Не любить подорожі",
              "ru": "Не любит путешествовать",
              "en": "Dislikes travelling"
            }
          },
          {
            "id": "c",
            "sk": "Szuka krótszej drogi do domu.",
            "translation": {
              "ua": "Шукає коротшу дорогу додому",
              "ru": "Ищет более короткую дорогу домой",
              "en": "Seeks a shorter route home"
            }
          },
          {
            "id": "a",
            "sk": "Chce się rozwijać zawodowo.",
            "translation": {
              "ua": "Хоче професійно розвиватися",
              "ru": "Хочет профессионально развиваться",
              "en": "Wants to grow professionally"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "context"
      },
      {
        "kind": "scene",
        "id": "context",
        "speaker": "Kandydat",
        "sk": "Kandydat wyjaśnia, że szuka większych możliwości rozwoju zawodowego.",
        "translation": {
          "ua": "Кандидат шукає більше можливостей професійного розвитку.",
          "ru": "Кандидат ищет больше возможностей профессионального развития.",
          "en": "The candidate wants more opportunities for professional growth."
        },
        "next": "ask"
      },
      {
        "kind": "fork",
        "id": "ask",
        "prompt": {
          "ua": "Яке уточнення поставить кандидат?",
          "ru": "Какой уточняющий вопрос задаст кандидат?",
          "en": "Which follow-up question will the candidate ask?"
        },
        "options": [
          {
            "id": "ask-info",
            "sk": "Czy może pani dokładniej wyjaśnić grafik dyżurów?",
            "translation": {
              "ua": "Запитати про графік чергувань",
              "ru": "Спросить о графике дежурств",
              "en": "Ask about the shift schedule"
            },
            "next": "answer-one"
          },
          {
            "id": "wait",
            "sk": "Jak często wypadają dyżury weekendowe?",
            "translation": {
              "ua": "Уточнити частоту роботи у вихідні",
              "ru": "Уточнить частоту работы в выходные",
              "en": "Ask how often weekend work is required"
            },
            "next": "answer-two"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "answer-one",
        "speaker": "Rekruterka",
        "sk": "Grafik przygotowujemy z miesięcznym wyprzedzeniem.",
        "translation": {
          "ua": "Графік складають за місяць наперед.",
          "ru": "График составляют за месяц вперёд.",
          "en": "Schedules are prepared a month in advance."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "answer-two",
        "speaker": "Rekruterka",
        "sk": "Średnio jest to jedna sobota w miesiącu.",
        "translation": {
          "ua": "У середньому одна субота на місяць.",
          "ru": "В среднем одна суббота в месяц.",
          "en": "About one Saturday per month."
        },
        "next": "development"
      },
      {
        "kind": "scene",
        "id": "development",
        "speaker": "Rekruterka",
        "sk": "Rekruterka zaznacza, że stanowisko wymaga czasem dyżurów w weekendy.",
        "translation": {
          "ua": "Рекрутерка попереджає, що іноді потрібні чергування у вихідні.",
          "ru": "Рекрутер предупреждает, что иногда требуются дежурства по выходным.",
          "en": "The recruiter warns that occasional weekend shifts are required."
        },
        "next": "change"
      },
      {
        "kind": "scene",
        "id": "change",
        "speaker": "Rekruterka",
        "sk": "Na koniec spotkania ustalają, że wynik rekrutacji przyjdzie e-mailem do piątku.",
        "translation": {
          "ua": "Вони домовляються повідомити результат електронною поштою до п’ятниці.",
          "ru": "Они договариваются сообщить результат по электронной почте до пятницы.",
          "en": "They agree that the outcome will be sent by email by Friday."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Яка умова роботи згадується?",
          "ru": "Какое условие работы упоминается?",
          "en": "What working condition is mentioned?"
        },
        "choices": [
          {
            "id": "c",
            "sk": "Wyłącznie pracy zdalnej.",
            "translation": {
              "ua": "Лише дистанційна робота",
              "ru": "Только удалённая работа",
              "en": "Remote work only"
            }
          },
          {
            "id": "a",
            "sk": "Sporadycznych dyżurów w weekendy.",
            "translation": {
              "ua": "Іноді працювати у вихідні",
              "ru": "Иногда работать по выходным",
              "en": "Occasional weekend shifts"
            }
          },
          {
            "id": "b",
            "sk": "Obowiązkowych nocnych podróży.",
            "translation": {
              "ua": "Обов’язкові нічні поїздки",
              "ru": "Обязательные ночные поездки",
              "en": "Mandatory overnight travel"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "conclusion"
      },
      {
        "kind": "scene",
        "id": "conclusion",
        "speaker": "Kandydat",
        "sk": "Kandydat zapisuje termin i dziękuje za szczerą rozmowę.",
        "translation": {
          "ua": "Кандидат записує термін і дякує за відверту розмову.",
          "ru": "Кандидат записывает срок и благодарит за откровенный разговор.",
          "en": "The candidate notes the deadline and thanks the recruiter for the candid conversation."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Коли й як повідомлять результат?",
          "ru": "Когда и как сообщат результат?",
          "en": "When and how will the outcome be communicated?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Do piątku e-mailem.",
            "translation": {
              "ua": "До п’ятниці електронною поштою",
              "ru": "До пятницы по электронной почте",
              "en": "By Friday via email"
            }
          },
          {
            "id": "b",
            "sk": "Dziś przez telefon.",
            "translation": {
              "ua": "Сьогодні телефоном",
              "ru": "Сегодня по телефону",
              "en": "Today by phone"
            }
          },
          {
            "id": "c",
            "sk": "Za miesiąc pocztą.",
            "translation": {
              "ua": "За місяць поштою",
              "ru": "Через месяц по почте",
              "en": "By post in a month"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Це прямо випливає з розмови.",
          "ru": "Это прямо следует из разговора.",
          "en": "This is stated in the conversation."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Kandydat zapisuje termin i dziękuje za szczerą rozmowę. Grafik przygotowujemy z miesięcznym wyprzedzeniem.",
        "translation": {
          "ua": "Кандидат краще розуміє умови й очікує рішення до п’ятниці.",
          "ru": "Кандидат лучше понимает условия и ждёт решения до пятницы.",
          "en": "The candidate understands the terms better and expects a decision by Friday."
        }
      }
    ],
    "level": "B1"
  }
];
