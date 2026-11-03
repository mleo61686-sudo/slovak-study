import type { Story } from "./data";
/** Authored Polish stories. `sk` is the legacy target-text field. */
export const PL_STORIES: Story[] = [
  {
    "course": "pl",
    "slug": "pl-lost-keys",
    "level": "A1",
    "premium": false,
    "title": {
      "ua": "Загублені ключі",
      "ru": "Потерянные ключи",
      "en": "Lost keys"
    },
    "summary": {
      "ua": "Повернувшись додому, не можеш знайти ключі.",
      "ru": "Вернувшись домой, не можешь найти ключи.",
      "en": "You return home and cannot find your keys."
    },
    "goal": {
      "ua": "Зрозуміти короткий діалог та три запитання.",
      "ru": "Понять короткий диалог и три вопроса.",
      "en": "Understand a short dialogue and three questions."
    },
    "icon": "🔑",
    "duration": 6,
    "start": "start",
    "nodes": [
      {
        "kind": "scene",
        "id": "start",
        "speaker": "Narrator",
        "sk": "Kasia wraca z pracy. Stoi przed drzwiami i szuka kluczy, ale nie może ich znaleźć.",
        "translation": {
          "ua": "Кася повертається з роботи. Стоїть перед дверима й шукає ключі, але не знаходить.",
          "ru": "Кася возвращается с работы. Стоит перед дверью и ищет ключи, но не находит.",
          "en": "Kasia returns from work. She stands by the door and searches for her keys, but cannot find them."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "szukać",
            "meaning": {
              "ua": "шукати",
              "ru": "искать",
              "en": "search for"
            }
          },
          {
            "sk": "klucze",
            "meaning": {
              "ua": "ключі",
              "ru": "ключи",
              "en": "keys"
            }
          }
        ]
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що шукає Кася?",
          "ru": "Что ищет Кася?",
          "en": "What is Kasia looking for?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Kluczy.",
            "translation": {
              "ua": "Ключі",
              "ru": "Ключи",
              "en": "Keys"
            }
          },
          {
            "id": "b",
            "sk": "Portfela.",
            "translation": {
              "ua": "Гаманець",
              "ru": "Кошелёк",
              "en": "Wallet"
            }
          },
          {
            "id": "c",
            "sk": "Telefonu.",
            "translation": {
              "ua": "Телефон",
              "ru": "Телефон",
              "en": "Phone"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Кася шукає ключі біля дверей.",
          "ru": "Кася ищет ключи у двери.",
          "en": "Kasia is looking for her keys at the door."
        },
        "next": "neighbor"
      },
      {
        "kind": "scene",
        "id": "neighbor",
        "speaker": "Sąsiad",
        "sk": "Dobry wieczór, Kasiu. Co się stało? Może zostawiłaś klucze w pracy?",
        "translation": {
          "ua": "Добрий вечір, Касю. Що трапилося? Може, залишила ключі на роботі?",
          "ru": "Добрый вечер, Кася. Что случилось? Может, оставила ключи на работе?",
          "en": "Good evening, Kasia. What happened? Perhaps you left your keys at work?"
        },
        "next": "decision"
      },
      {
        "kind": "fork",
        "id": "decision",
        "prompt": {
          "ua": "Що зробить Кася?",
          "ru": "Что сделает Кася?",
          "en": "What will Kasia do?"
        },
        "options": [
          {
            "id": "bag",
            "sk": "Najpierw sprawdzę torbę.",
            "translation": {
              "ua": "Спочатку перевірю сумку.",
              "ru": "Сначала проверю сумку.",
              "en": "I’ll check my bag first."
            },
            "next": "bag-reply"
          },
          {
            "id": "call",
            "sk": "Zadzwonię do koleżanki z pracy.",
            "translation": {
              "ua": "Зателефоную колезі з роботи.",
              "ru": "Позвоню коллеге с работы.",
              "en": "I’ll call my colleague at work."
            },
            "next": "call-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "bag-reply",
        "speaker": "Kasia",
        "sk": "Otworzyłam torbę i znalazłam klucze w małej kieszeni. Co za ulga!",
        "translation": {
          "ua": "Я відкрила сумку й знайшла ключі в маленькій кишені. Яке полегшення!",
          "ru": "Я открыла сумку и нашла ключи в маленьком кармане. Какое облегчение!",
          "en": "I opened my bag and found the keys in a small pocket. What a relief!"
        },
        "next": "q2"
      },
      {
        "kind": "scene",
        "id": "call-reply",
        "speaker": "Kasia",
        "sk": "Koleżanka mówi, że kluczy nie ma w pracy. Sprawdzę jeszcze małą kieszeń torby. O, są tutaj!",
        "translation": {
          "ua": "Колега каже, що на роботі ключів немає. Перевірю маленьку кишеню сумки. Ось вони!",
          "ru": "Коллега говорит, что ключей на работе нет. Проверю маленький карман сумки. Вот они!",
          "en": "My colleague says the keys aren’t at work. I’ll check the small pocket in my bag. Here they are!"
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Де знайшлися ключі?",
          "ru": "Где нашлись ключи?",
          "en": "Where were the keys found?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Na stole.",
            "translation": {
              "ua": "На столі",
              "ru": "На столе",
              "en": "On the table"
            }
          },
          {
            "id": "b",
            "sk": "W małej kieszeni torby.",
            "translation": {
              "ua": "У маленькій кишені сумки",
              "ru": "В маленьком кармане сумки",
              "en": "In the small pocket of the bag"
            }
          },
          {
            "id": "c",
            "sk": "U sąsiada.",
            "translation": {
              "ua": "У сусіда",
              "ru": "У соседа",
              "en": "At the neighbour’s place"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "В обох варіантах ключі були в сумці.",
          "ru": "В обеих ветках ключи были в сумке.",
          "en": "Both branches reveal the keys were in the bag."
        },
        "next": "advice"
      },
      {
        "kind": "scene",
        "id": "advice",
        "speaker": "Sąsiad",
        "sk": "Dobrze, że się znalazły. Następnym razem odkładaj klucze w to samo miejsce.",
        "translation": {
          "ua": "Добре, що знайшлися. Наступного разу клади ключі в одне місце.",
          "ru": "Хорошо, что нашлись. В следующий раз клади ключи в одно место.",
          "en": "Glad you found them. Next time, put your keys in the same place."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що радить сусід?",
          "ru": "Что советует сосед?",
          "en": "What does the neighbour advise?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Kupić nowe drzwi.",
            "translation": {
              "ua": "Купити нові двері",
              "ru": "Купить новую дверь",
              "en": "Buy a new door"
            }
          },
          {
            "id": "b",
            "sk": "Zadzwonić na policję.",
            "translation": {
              "ua": "Викликати поліцію",
              "ru": "Позвонить в полицию",
              "en": "Call the police"
            }
          },
          {
            "id": "c",
            "sk": "Odkładać klucze w to samo miejsce.",
            "translation": {
              "ua": "Класти ключі в одне місце",
              "ru": "Класть ключи в одно место",
              "en": "Put the keys in the same place"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "Він радить завжди класти ключі на те саме місце.",
          "ru": "Он советует всегда класть ключи в одно место.",
          "en": "He advises keeping the keys in the same place."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Kasia podziękowała sąsiadowi i wreszcie otworzyła drzwi do mieszkania.",
        "translation": {
          "ua": "Кася подякувала сусідові й нарешті відчинила двері квартири.",
          "ru": "Кася поблагодарила соседа и наконец открыла дверь квартиры.",
          "en": "Kasia thanked her neighbour and finally opened her flat."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-shift-change",
    "level": "B1",
    "premium": true,
    "title": {
      "ua": "Зміна графіка",
      "ru": "Изменение графика",
      "en": "Shift change"
    },
    "summary": {
      "ua": "Колега просить помінятися робочими змінами.",
      "ru": "Коллега просит поменяться сменами.",
      "en": "A colleague asks to swap shifts."
    },
    "goal": {
      "ua": "Розуміти прохання, умови та підтвердження.",
      "ru": "Понимать просьбы, условия и подтверждения.",
      "en": "Understand requests, conditions and confirmation."
    },
    "icon": "🏭",
    "duration": 8,
    "start": "start",
    "nodes": [
      {
        "kind": "scene",
        "id": "start",
        "speaker": "Kolega",
        "sk": "Cześć, Piotrze. Czy możemy zamienić się zmianami w piątek? Mam ważną wizytę w urzędzie.",
        "translation": {
          "ua": "Привіт, Петре. Можемо помінятися змінами в п’ятницю? Маю важливий візит до установи.",
          "ru": "Привет, Пётр. Можем поменяться сменами в пятницу? У меня важный визит в учреждение.",
          "en": "Hi, Piotr. Can we swap shifts on Friday? I have an important appointment at an office."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "zamienić się zmianami",
            "meaning": {
              "ua": "помінятися змінами",
              "ru": "поменяться сменами",
              "en": "swap shifts"
            }
          },
          {
            "sk": "urząd",
            "meaning": {
              "ua": "державна установа",
              "ru": "госучреждение",
              "en": "public office"
            }
          }
        ],
        "listenFirst": true
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Про що просить колега?",
          "ru": "О чём просит коллега?",
          "en": "What does the colleague request?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "O zamianę zmian.",
            "translation": {
              "ua": "Помінятися змінами",
              "ru": "Поменяться сменами",
              "en": "Swap shifts"
            }
          },
          {
            "id": "b",
            "sk": "O nowy telefon.",
            "translation": {
              "ua": "Новий телефон",
              "ru": "Новый телефон",
              "en": "A new phone"
            }
          },
          {
            "id": "c",
            "sk": "O naprawę maszyny.",
            "translation": {
              "ua": "Ремонт машини",
              "ru": "Ремонт станка",
              "en": "A machine repair"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Він просить обмінятися змінами в п’ятницю.",
          "ru": "Он просит поменяться сменами в пятницу.",
          "en": "He wants to swap Friday’s shift."
        },
        "next": "condition"
      },
      {
        "kind": "scene",
        "id": "condition",
        "speaker": "Piotr",
        "sk": "W piątek mogę pracować rano, ale w poniedziałek muszę wyjść najpóźniej o piętnastej.",
        "translation": {
          "ua": "У п’ятницю можу працювати вранці, але в понеділок треба піти не пізніше 15:00.",
          "ru": "В пятницу могу работать утром, но в понедельник должен уйти не позже трёх.",
          "en": "I can work Friday morning, but on Monday I must leave by three at the latest."
        },
        "next": "decision"
      },
      {
        "kind": "fork",
        "id": "decision",
        "prompt": {
          "ua": "Що потрібно уточнити?",
          "ru": "Что нужно уточнить?",
          "en": "What should be clarified?"
        },
        "options": [
          {
            "id": "manager",
            "sk": "Czy kierownik się zgodzi?",
            "translation": {
              "ua": "Чи погодиться керівник?",
              "ru": "Согласится ли руководитель?",
              "en": "Will the manager agree?"
            },
            "next": "manager-reply"
          },
          {
            "id": "hours",
            "sk": "Czy liczba godzin się nie zmieni?",
            "translation": {
              "ua": "Чи не зміниться кількість годин?",
              "ru": "Не изменится ли количество часов?",
              "en": "Will the number of hours remain unchanged?"
            },
            "next": "hours-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "manager-reply",
        "speaker": "Kolega",
        "sk": "Kierownik nie ma nic przeciwko, jeśli obaj potwierdzimy nowy grafik jeszcze dzisiaj.",
        "translation": {
          "ua": "Керівник не проти, якщо ми обидва підтвердимо новий графік сьогодні.",
          "ru": "Руководитель не против, если оба подтвердим новый график сегодня.",
          "en": "The manager has no objection if we both confirm the new rota today."
        },
        "next": "q2"
      },
      {
        "kind": "scene",
        "id": "hours-reply",
        "speaker": "Kolega",
        "sk": "Tak, liczba godzin będzie taka sama. Musimy jednak jeszcze dzisiaj potwierdzić zmianę u kierownika.",
        "translation": {
          "ua": "Так, годин буде стільки ж. Але сьогодні треба підтвердити зміну керівнику.",
          "ru": "Да, часов будет столько же. Но сегодня нужно подтвердить изменение руководителю.",
          "en": "Yes, the hours will stay the same. But we must confirm the change with the manager today."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Що треба зробити сьогодні?",
          "ru": "Что нужно сделать сегодня?",
          "en": "What must be done today?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zamówić obiad.",
            "translation": {
              "ua": "Замовити обід",
              "ru": "Заказать обед",
              "en": "Order lunch"
            }
          },
          {
            "id": "b",
            "sk": "Potwierdzić zmianę u kierownika.",
            "translation": {
              "ua": "Підтвердити зміну керівнику",
              "ru": "Подтвердить изменение руководителю",
              "en": "Confirm the change with the manager"
            }
          },
          {
            "id": "c",
            "sk": "Kupić nowe ubrania.",
            "translation": {
              "ua": "Купити новий одяг",
              "ru": "Купить новую одежду",
              "en": "Buy new clothes"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "Домовленість потрібно підтвердити керівнику.",
          "ru": "Договорённость нужно подтвердить руководителю.",
          "en": "The arrangement must be confirmed with the manager."
        },
        "next": "summary"
      },
      {
        "kind": "scene",
        "id": "summary",
        "speaker": "Piotr",
        "sk": "Czyli w piątek przyjdę rano, a w poniedziałek wyjdę do piętnastej. Napisz do mnie, gdy grafik będzie zatwierdzony.",
        "translation": {
          "ua": "Отже, у п’ятницю прийду вранці, а в понеділок піду до 15:00. Напиши, коли графік затвердять.",
          "ru": "Итак, в пятницу приду утром, а в понедельник уйду до трёх. Напиши, когда график утвердят.",
          "en": "So I will work Friday morning and leave by three on Monday. Message me when the schedule is approved."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Коли колега має написати Петрові?",
          "ru": "Когда коллега должен написать Петру?",
          "en": "When should the colleague message Piotr?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Przed rozmową.",
            "translation": {
              "ua": "До розмови",
              "ru": "До разговора",
              "en": "Before the conversation"
            }
          },
          {
            "id": "b",
            "sk": "Za tydzień bez potwierdzenia.",
            "translation": {
              "ua": "За тиждень без підтвердження",
              "ru": "Через неделю без подтверждения",
              "en": "In a week, without confirmation"
            }
          },
          {
            "id": "c",
            "sk": "Po zatwierdzeniu grafiku.",
            "translation": {
              "ua": "Після затвердження графіка",
              "ru": "После утверждения расписания",
              "en": "After the rota is approved"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "Петро просить написати після затвердження графіка.",
          "ru": "Пётр просит написать после утверждения расписания.",
          "en": "Piotr requests a message after the schedule is approved."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Koledzy uzgodnili zmianę, ale nowy grafik zacznie obowiązywać dopiero po potwierdzeniu.",
        "translation": {
          "ua": "Колеги домовилися, але новий графік діятиме лише після підтвердження.",
          "ru": "Коллеги договорились, но новый график вступит в силу только после подтверждения.",
          "en": "The colleagues have agreed, but the new rota takes effect only after confirmation."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-building-meeting",
    "level": "B2",
    "premium": true,
    "title": {
      "ua": "Збори мешканців",
      "ru": "Собрание жильцов",
      "en": "Residents’ meeting"
    },
    "summary": {
      "ua": "Обговорення ремонту труб і завчасного повідомлення.",
      "ru": "Обсуждение ремонта труб и уведомлений.",
      "en": "Discuss pipe repairs and advance notice."
    },
    "goal": {
      "ua": "Розуміти умови, підтекст і компроміси.",
      "ru": "Понимать условия, подтекст и компромиссы.",
      "en": "Understand conditions, nuance and compromises."
    },
    "icon": "🏢",
    "duration": 9,
    "start": "start",
    "nodes": [
      {
        "kind": "scene",
        "id": "start",
        "speaker": "Zarządca",
        "sk": "Wymiana pionów instalacyjnych jest konieczna. Prace powinny potrwać dwa dni, ale wykonawca nie potwierdził jeszcze terminu.",
        "translation": {
          "ua": "Заміна стояків необхідна. Роботи мають тривати два дні, але виконавець ще не підтвердив дату.",
          "ru": "Замена стояков необходима. Работы займут два дня, но подрядчик не подтвердил дату.",
          "en": "Replacing the riser pipes is necessary. Work should take two days, but the contractor has not confirmed the date."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "wykonawca",
            "meaning": {
              "ua": "підрядник",
              "ru": "подрядчик",
              "en": "contractor"
            }
          },
          {
            "sk": "konieczna",
            "meaning": {
              "ua": "необхідна",
              "ru": "необходимая",
              "en": "necessary"
            }
          }
        ],
        "listenFirst": true
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що вже підтверджено?",
          "ru": "Что уже подтверждено?",
          "en": "What has already been established?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Wymiana jest konieczna.",
            "translation": {
              "ua": "Заміна необхідна",
              "ru": "Замена необходима",
              "en": "Replacement is necessary"
            }
          },
          {
            "id": "b",
            "sk": "Termin jest ostateczny.",
            "translation": {
              "ua": "Дата остаточна",
              "ru": "Дата окончательная",
              "en": "The date is final"
            }
          },
          {
            "id": "c",
            "sk": "Prace potrwają tydzień.",
            "translation": {
              "ua": "Роботи триватимуть тиждень",
              "ru": "Работы займут неделю",
              "en": "Work will take a week"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Необхідність заміни відома, але дата ще не підтверджена.",
          "ru": "Необходимость замены известна, но дата не подтверждена.",
          "en": "The need for replacement is clear, but the date is not final."
        },
        "next": "neighbor"
      },
      {
        "kind": "scene",
        "id": "neighbor",
        "speaker": "Sąsiadka",
        "sk": "Nie kwestionuję potrzeby remontu. Wolałabym jednak, żebyśmy poznali termin z kilkudniowym wyprzedzeniem. Nie każdy może zorganizować sobie wolne z dnia na dzień.",
        "translation": {
          "ua": "Не заперечую необхідність ремонту. Але хотіла б знати дату за кілька днів. Не всі можуть одразу організувати вихідний.",
          "ru": "Я не оспариваю необходимость ремонта, но хотела бы знать дату за несколько дней. Не каждый может сразу взять выходной.",
          "en": "I do not question the need for repairs. Still, I would prefer several days’ notice. Not everyone can arrange time off overnight."
        },
        "next": "decision"
      },
      {
        "kind": "fork",
        "id": "decision",
        "prompt": {
          "ua": "Що запропонуєш?",
          "ru": "Что предложишь?",
          "en": "What would you suggest?"
        },
        "options": [
          {
            "id": "notice",
            "sk": "Poprośmy o wcześniejsze powiadomienie.",
            "translation": {
              "ua": "Попросімо повідомляти завчасно.",
              "ru": "Попросим уведомлять заранее.",
              "en": "Let’s request earlier notice."
            },
            "next": "notice-reply"
          },
          {
            "id": "access",
            "sk": "Zapytajmy, czy można zostawić klucze.",
            "translation": {
              "ua": "Запитаймо, чи можна залишити ключі.",
              "ru": "Спросим, можно ли оставить ключи.",
              "en": "Let’s ask whether keys can be left."
            },
            "next": "access-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "notice-reply",
        "speaker": "Zarządca",
        "sk": "Postaramy się przekazać wiadomość jak najwcześniej. Nie mogę jednak obiecać trzech dni, dopóki wykonawca nie potwierdzi terminu.",
        "translation": {
          "ua": "Спробуємо повідомити якомога раніше, але не можу обіцяти три дні, поки підрядник не підтвердить дату.",
          "ru": "Постараемся сообщить как можно раньше, но не могу обещать три дня, пока подрядчик не подтвердит дату.",
          "en": "We will try to notify you early, but cannot promise three days until the contractor confirms the date."
        },
        "next": "q2"
      },
      {
        "kind": "scene",
        "id": "access-reply",
        "speaker": "Zarządca",
        "sk": "Można upoważnić inną osobę do udostępnienia mieszkania, ale potrzebna jest zgoda właściciela. Szczegóły wyślemy na piśmie.",
        "translation": {
          "ua": "Можна уповноважити іншу людину надати доступ, але потрібна згода власника. Деталі надішлемо письмово.",
          "ru": "Можно уполномочить другого человека предоставить доступ, но требуется согласие владельца. Детали пришлём письменно.",
          "en": "Someone else may be authorised to provide access, but the owner must agree. We will send details in writing."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Що найбільше непокоїть сусідку?",
          "ru": "Что больше всего беспокоит соседку?",
          "en": "What concerns the neighbour most?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Chce wybrać inną firmę.",
            "translation": {
              "ua": "Хоче обрати іншу компанію",
              "ru": "Хочет выбрать другую фирму",
              "en": "She wants another contractor"
            }
          },
          {
            "id": "b",
            "sk": "Potrzebuje informacji z wyprzedzeniem.",
            "translation": {
              "ua": "Потребує завчасної інформації",
              "ru": "Ей нужна информация заранее",
              "en": "She needs advance notice"
            }
          },
          {
            "id": "c",
            "sk": "Odrzuca wszelkie remonty.",
            "translation": {
              "ua": "Відкидає всі ремонти",
              "ru": "Отвергает любой ремонт",
              "en": "She opposes all repairs"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "Вона не проти ремонту, але потребує часу на підготовку.",
          "ru": "Она не против ремонта, но ей нужно время на подготовку.",
          "en": "She accepts the repair but needs time to prepare."
        },
        "next": "summary"
      },
      {
        "kind": "scene",
        "id": "summary",
        "speaker": "Zarządca",
        "sk": "Jeszcze dziś prześlemy wstępny termin. Po jego potwierdzeniu opublikujemy dokładny harmonogram oraz zasady dostępu do mieszkań.",
        "translation": {
          "ua": "Ще сьогодні надішлемо попередню дату. Після підтвердження опублікуємо графік і правила доступу.",
          "ru": "Сегодня отправим предварительную дату. После подтверждения опубликуем график и правила доступа.",
          "en": "Today we will send a provisional date. Once confirmed, we will publish the timetable and access instructions."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що означає «wstępny termin»?",
          "ru": "Что означает «wstępny termin»?",
          "en": "What does «wstępny termin» mean?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Termin niezmienny.",
            "translation": {
              "ua": "Незмінна дата",
              "ru": "Неизменная дата",
              "en": "An unchangeable date"
            }
          },
          {
            "id": "b",
            "sk": "Odwołane prace.",
            "translation": {
              "ua": "Скасовані роботи",
              "ru": "Отменённые работы",
              "en": "Cancelled work"
            }
          },
          {
            "id": "c",
            "sk": "Termin, który może się zmienić.",
            "translation": {
              "ua": "Дата, яка ще може змінитися",
              "ru": "Дата, которая ещё может измениться",
              "en": "A date that could still change"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Wstępny» — попередній, ще не остаточний.",
          "ru": "«Wstępny» — предварительный, ещё не окончательный.",
          "en": "«Wstępny» means provisional."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Mieszkańcy uzgodnili wstępne zasady. Ostateczny termin remontu zostanie podany później.",
        "translation": {
          "ua": "Мешканці погодили попередні правила. Остаточну дату ремонту повідомлять пізніше.",
          "ru": "Жильцы согласовали предварительные правила. Окончательную дату ремонта сообщат позже.",
          "en": "Residents agreed on provisional arrangements. The final repair date will be announced later."
        }
      }
    ]
  }
];
