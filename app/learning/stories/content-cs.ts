import type { Story } from "./data";
/** Authored Czech stories. `sk` is the legacy target-text field. */
export const CS_STORIES: Story[] = [
  {
    "course": "cs",
    "slug": "cs-lost-keys",
    "level": "A1",
    "premium": false,
    "title": {
      "ua": "Загублені ключі",
      "ru": "Потерянные ключи",
      "en": "Lost keys"
    },
    "summary": {
      "ua": "Після роботи не можеш знайти ключі.",
      "ru": "После работы не можешь найти ключи.",
      "en": "You cannot find your keys after work."
    },
    "goal": {
      "ua": "Зрозуміти розмову та три запитання.",
      "ru": "Понять разговор и три вопроса.",
      "en": "Understand the conversation and three questions."
    },
    "icon": "🔑",
    "duration": 6,
    "start": "start",
    "nodes": [
      {
        "kind": "scene",
        "id": "start",
        "speaker": "Vypravěč",
        "sk": "Eva se vrací z práce. Stojí před domem a hledá klíče, ale nemůže je najít.",
        "translation": {
          "ua": "Єва повертається з роботи. Стоїть перед будинком і шукає ключі, але не знаходить.",
          "ru": "Ева возвращается с работы. Стоит у дома и ищет ключи, но не находит.",
          "en": "Eva comes home from work. She stands in front of the building searching for her keys, but cannot find them."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "hledat",
            "meaning": {
              "ua": "шукати",
              "ru": "искать",
              "en": "search for"
            }
          },
          {
            "sk": "klíče",
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
          "ua": "Що шукає Єва?",
          "ru": "Что ищет Ева?",
          "en": "What is Eva looking for?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Klíče.",
            "translation": {
              "ua": "Ключі",
              "ru": "Ключи",
              "en": "Keys"
            }
          },
          {
            "id": "b",
            "sk": "Peněženku.",
            "translation": {
              "ua": "Гаманець",
              "ru": "Кошелёк",
              "en": "Wallet"
            }
          },
          {
            "id": "c",
            "sk": "Telefon.",
            "translation": {
              "ua": "Телефон",
              "ru": "Телефон",
              "en": "Phone"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Вона шукає ключі перед будинком.",
          "ru": "Она ищет ключи у дома.",
          "en": "She is searching for her keys at the building."
        },
        "next": "neighbor"
      },
      {
        "kind": "scene",
        "id": "neighbor",
        "speaker": "Soused",
        "sk": "Dobrý večer, Evo. Potřebujete pomoc? Možná jste klíče nechala v práci.",
        "translation": {
          "ua": "Добрий вечір, Єво. Потрібна допомога? Можливо, ти залишила ключі на роботі.",
          "ru": "Добрый вечер, Ева. Нужна помощь? Возможно, ты оставила ключи на работе.",
          "en": "Good evening, Eva. Do you need help? Perhaps you left the keys at work."
        },
        "next": "decision"
      },
      {
        "kind": "fork",
        "id": "decision",
        "prompt": {
          "ua": "Що зробить Єва?",
          "ru": "Что сделает Ева?",
          "en": "What will Eva do?"
        },
        "options": [
          {
            "id": "bag",
            "sk": "Nejdřív se podívám do tašky.",
            "translation": {
              "ua": "Спочатку подивлюся в сумці.",
              "ru": "Сначала посмотрю в сумке.",
              "en": "I will check my bag first."
            },
            "next": "bag-reply"
          },
          {
            "id": "call",
            "sk": "Zavolám kolegyni do práce.",
            "translation": {
              "ua": "Зателефоную колезі на роботу.",
              "ru": "Позвоню коллеге на работу.",
              "en": "I will call my colleague at work."
            },
            "next": "call-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "bag-reply",
        "speaker": "Eva",
        "sk": "Otevřela jsem tašku a našla jsem klíče v malé kapse. To je úleva!",
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
        "speaker": "Eva",
        "sk": "Kolegyně říká, že klíče v práci nejsou. Podívám se ještě do malé kapsy v tašce. Aha, jsou tady!",
        "translation": {
          "ua": "Колега каже, що ключів на роботі немає. Подивлюся в маленьку кишеню сумки. Ось вони!",
          "ru": "Коллега говорит, что ключей на работе нет. Посмотрю в маленьком кармане сумки. Вот они!",
          "en": "My colleague says the keys are not at work. I will check the small pocket in my bag. Here they are!"
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Де врешті знайшлися ключі?",
          "ru": "Где в итоге нашлись ключи?",
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
            "sk": "V malé kapse tašky.",
            "translation": {
              "ua": "У маленькій кишені сумки",
              "ru": "В маленьком кармане сумки",
              "en": "In the small pocket of the bag"
            }
          },
          {
            "id": "c",
            "sk": "U souseda.",
            "translation": {
              "ua": "У сусіда",
              "ru": "У соседа",
              "en": "At the neighbour’s place"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "В обох варіантах історії ключі були в сумці.",
          "ru": "В обеих ветках ключи были в сумке.",
          "en": "Both branches reveal the keys were in the bag."
        },
        "next": "thanks"
      },
      {
        "kind": "scene",
        "id": "thanks",
        "speaker": "Soused",
        "sk": "Tak to dobře dopadlo. Příště si je dejte na stejné místo.",
        "translation": {
          "ua": "Добре, що все вирішилося. Наступного разу кладіть їх в одне місце.",
          "ru": "Хорошо, что всё закончилось. В следующий раз кладите их в одно место.",
          "en": "I am glad it worked out. Next time, put them in the same place."
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
            "sk": "Koupit nové dveře.",
            "translation": {
              "ua": "Купити нові двері",
              "ru": "Купить новую дверь",
              "en": "Buy a new door"
            }
          },
          {
            "id": "b",
            "sk": "Zavolat policii.",
            "translation": {
              "ua": "Викликати поліцію",
              "ru": "Вызвать полицию",
              "en": "Call the police"
            }
          },
          {
            "id": "c",
            "sk": "Dávat klíče na stejné místo.",
            "translation": {
              "ua": "Класти ключі в одне місце",
              "ru": "Класть ключи в одно место",
              "en": "Keep the keys in the same place"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "Він радить постійно класти ключі в те саме місце.",
          "ru": "Он советует всегда класть ключи в одно место.",
          "en": "He advises keeping the keys in the same place."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Eva poděkovala sousedovi a konečně otevřela dveře svého bytu.",
        "translation": {
          "ua": "Єва подякувала сусідові й нарешті відчинила квартиру.",
          "ru": "Ева поблагодарила соседа и наконец открыла квартиру.",
          "en": "Eva thanked her neighbour and finally opened her flat."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-shift-change",
    "level": "B1",
    "premium": true,
    "title": {
      "ua": "Зміна графіка",
      "ru": "Изменение графика",
      "en": "Shift change"
    },
    "summary": {
      "ua": "Колега просить помінятися змінами.",
      "ru": "Коллега просит поменяться сменами.",
      "en": "A colleague asks to swap shifts."
    },
    "goal": {
      "ua": "Розрізняти прохання, умови й підтвердження.",
      "ru": "Различать просьбы, условия и подтверждения.",
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
        "sk": "Ahoj, Petro. Potřeboval bych si s tebou vyměnit páteční směnu. Mám důležitou schůzku na úřadě.",
        "translation": {
          "ua": "Привіт, Петро. Хотів би помінятися п’ятничною зміною. Маю важливу зустріч в установі.",
          "ru": "Привет, Пётр. Я хотел бы поменяться пятничной сменой. У меня встреча в учреждении.",
          "en": "Hi, Petr. I need to swap Friday’s shift with you. I have an important appointment at an office."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "vyměnit směnu",
            "meaning": {
              "ua": "помінятися змінами",
              "ru": "поменяться сменами",
              "en": "swap shifts"
            }
          },
          {
            "sk": "úřad",
            "meaning": {
              "ua": "установа",
              "ru": "учреждение",
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
          "ua": "Чого просить колега?",
          "ru": "О чём просит коллега?",
          "en": "What is the colleague asking for?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Vyměnit si směnu.",
            "translation": {
              "ua": "Помінятися змінами",
              "ru": "Поменяться сменами",
              "en": "Swap shifts"
            }
          },
          {
            "id": "b",
            "sk": "Koupit nový telefon.",
            "translation": {
              "ua": "Купити телефон",
              "ru": "Купить телефон",
              "en": "Buy a phone"
            }
          },
          {
            "id": "c",
            "sk": "Opravit stroj.",
            "translation": {
              "ua": "Полагодити машину",
              "ru": "Починить станок",
              "en": "Repair a machine"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Він просить помінятися п’ятничною зміною.",
          "ru": "Он просит поменяться пятничной сменой.",
          "en": "He wants to swap the Friday shift."
        },
        "next": "condition"
      },
      {
        "kind": "scene",
        "id": "condition",
        "speaker": "Petr",
        "sk": "V pátek můžu přijít ráno, ale v pondělí potřebuji skončit nejpozději ve tři.",
        "translation": {
          "ua": "У п’ятницю можу прийти вранці, але в понеділок мені потрібно закінчити не пізніше третьої.",
          "ru": "В пятницу могу прийти утром, но в понедельник мне нужно закончить не позднее трёх.",
          "en": "I can come in on Friday morning, but on Monday I need to finish by three at the latest."
        },
        "next": "decision"
      },
      {
        "kind": "fork",
        "id": "decision",
        "prompt": {
          "ua": "Яку умову уточнити?",
          "ru": "Какое условие уточнить?",
          "en": "Which detail should be clarified?"
        },
        "options": [
          {
            "id": "manager",
            "sk": "Potvrdí to vedoucí?",
            "translation": {
              "ua": "Чи підтвердить це керівник?",
              "ru": "Подтвердит ли это руководитель?",
              "en": "Will the manager approve it?"
            },
            "next": "manager-reply"
          },
          {
            "id": "hours",
            "sk": "Zůstanou nám stejné hodiny?",
            "translation": {
              "ua": "Чи залишиться в нас така сама кількість годин?",
              "ru": "Останется ли у нас то же число часов?",
              "en": "Will our hours stay the same?"
            },
            "next": "hours-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "manager-reply",
        "speaker": "Kolega",
        "sk": "Vedoucí s výměnou souhlasí, pokud oba potvrdíme nový rozpis ještě dnes.",
        "translation": {
          "ua": "Керівник погоджується, якщо ми обидва підтвердимо новий графік сьогодні.",
          "ru": "Руководитель согласен, если мы оба подтвердим новое расписание сегодня.",
          "en": "The manager agrees if we both confirm the new schedule today."
        },
        "next": "q2"
      },
      {
        "kind": "scene",
        "id": "hours-reply",
        "speaker": "Kolega",
        "sk": "Ano, počet hodin zůstane stejný. Vedoucímu ale musíme změnu ještě dnes potvrdit.",
        "translation": {
          "ua": "Так, кількість годин та сама. Але сьогодні ще треба підтвердити зміну керівнику.",
          "ru": "Да, часов будет столько же. Но сегодня ещё нужно подтвердить изменение руководителю.",
          "en": "Yes, the hours will stay the same. But we must confirm the change with the manager today."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Що ще потрібно зробити сьогодні?",
          "ru": "Что ещё нужно сделать сегодня?",
          "en": "What must still happen today?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Objednat oběd.",
            "translation": {
              "ua": "Замовити обід",
              "ru": "Заказать обед",
              "en": "Order lunch"
            }
          },
          {
            "id": "b",
            "sk": "Potvrdit změnu vedoucímu.",
            "translation": {
              "ua": "Підтвердити зміну керівнику",
              "ru": "Подтвердить изменение руководителю",
              "en": "Confirm the change with the manager"
            }
          },
          {
            "id": "c",
            "sk": "Koupit pracovní boty.",
            "translation": {
              "ua": "Купити робоче взуття",
              "ru": "Купить рабочую обувь",
              "en": "Buy work shoes"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "Обидва повинні підтвердити зміну керівнику.",
          "ru": "Оба должны подтвердить изменение руководителю.",
          "en": "They must confirm the change with the manager."
        },
        "next": "summary"
      },
      {
        "kind": "scene",
        "id": "summary",
        "speaker": "Petr",
        "sk": "Takže v pátek přijdu ráno a v pondělí skončím do tří. Jakmile bude rozpis potvrzený, napíšu ti.",
        "translation": {
          "ua": "Отже, у п’ятницю прийду вранці, а в понеділок закінчу до третьої. Як підтвердять графік — напишу.",
          "ru": "Итак, в пятницу приду утром, а в понедельник закончу до трёх. После подтверждения расписания напишу.",
          "en": "So I will come Friday morning and finish by three on Monday. I will message you once the rota is confirmed."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Коли Петро отримає повідомлення?",
          "ru": "Когда Пётр получит сообщение?",
          "en": "When will Petr receive a message?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Před rozhovorem.",
            "translation": {
              "ua": "До розмови",
              "ru": "До разговора",
              "en": "Before the conversation"
            }
          },
          {
            "id": "b",
            "sk": "Za týden bez potvrzení.",
            "translation": {
              "ua": "За тиждень без підтвердження",
              "ru": "Через неделю без подтверждения",
              "en": "In a week without confirmation"
            }
          },
          {
            "id": "c",
            "sk": "Až bude rozpis potvrzený.",
            "translation": {
              "ua": "Після підтвердження графіка",
              "ru": "После подтверждения расписания",
              "en": "After the schedule is confirmed"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "Колега напише після підтвердження нового графіка.",
          "ru": "Коллега напишет после подтверждения расписания.",
          "en": "The colleague will write once the schedule has been approved."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Oba kolegové se dohodli, ale změna začne platit až po potvrzení rozpisu.",
        "translation": {
          "ua": "Колеги домовилися, але зміна набуде чинності лише після підтвердження графіка.",
          "ru": "Коллеги договорились, но изменение вступит в силу после подтверждения расписания.",
          "en": "The colleagues agreed, but the change will take effect only after the rota is confirmed."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-building-meeting",
    "level": "B2",
    "premium": true,
    "title": {
      "ua": "Збори мешканців",
      "ru": "Собрание жильцов",
      "en": "Residents’ meeting"
    },
    "summary": {
      "ua": "Обговорення ремонту труб і строків повідомлення.",
      "ru": "Обсуждение ремонта труб и сроков уведомления.",
      "en": "Discuss pipe repairs and advance notice."
    },
    "goal": {
      "ua": "Розуміти непрямі заперечення та умови рішення.",
      "ru": "Понимать косвенные возражения и условия.",
      "en": "Understand indirect objections and conditions."
    },
    "icon": "🏢",
    "duration": 9,
    "start": "start",
    "nodes": [
      {
        "kind": "scene",
        "id": "start",
        "speaker": "Správce",
        "sk": "Výměna stoupaček je nutná. Práce by měly trvat dva dny, přesný termín však firma dosud nepotvrdila.",
        "translation": {
          "ua": "Заміна стояків необхідна. Роботи триватимуть приблизно два дні, але фірма ще не підтвердила дату.",
          "ru": "Замена стояков необходима. Работы займут около двух дней, но фирма пока не подтвердила дату.",
          "en": "Replacing the riser pipes is necessary. Work should take two days, but the contractor has not yet confirmed the date."
        },
        "next": "q1",
        "glossary": [
          {
            "sk": "stoupačky",
            "meaning": {
              "ua": "стояки",
              "ru": "стояки",
              "en": "riser pipes"
            }
          },
          {
            "sk": "dosud",
            "meaning": {
              "ua": "досі",
              "ru": "до сих пор",
              "en": "so far"
            }
          }
        ],
        "listenFirst": true
      },
      {
        "kind": "question",
        "id": "q1",
        "prompt": {
          "ua": "Що вже відомо напевно?",
          "ru": "Что уже известно точно?",
          "en": "What is already certain?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Oprava je nutná.",
            "translation": {
              "ua": "Ремонт необхідний",
              "ru": "Ремонт необходим",
              "en": "The repair is necessary"
            }
          },
          {
            "id": "b",
            "sk": "Datum je potvrzené.",
            "translation": {
              "ua": "Дату підтверджено",
              "ru": "Дата подтверждена",
              "en": "The date is confirmed"
            }
          },
          {
            "id": "c",
            "sk": "Práce potrvají týden.",
            "translation": {
              "ua": "Роботи триватимуть тиждень",
              "ru": "Работы займут неделю",
              "en": "The work will take a week"
            }
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Підтверджено необхідність заміни, але не точну дату.",
          "ru": "Подтверждена необходимость замены, но не дата.",
          "en": "The repair is necessary, but the date is not confirmed."
        },
        "next": "neighbor"
      },
      {
        "kind": "scene",
        "id": "neighbor",
        "speaker": "Sousedka",
        "sk": "Proti opravě nic nemám. Jen bych ocenila, kdybychom se o termínu dozvěděli aspoň několik dní předem. Ne každý může zůstat doma bez přípravy.",
        "translation": {
          "ua": "Я не проти ремонту. Але хотіла б дізнатися дату хоча б за кілька днів. Не всі можуть залишитися вдома без підготовки.",
          "ru": "Я не против ремонта, но хотелось бы знать дату за несколько дней. Не каждый может остаться дома без подготовки.",
          "en": "I do not object to the repair. I would appreciate a few days’ notice. Not everyone can stay home without planning."
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
            "sk": "Požádejme o dřívější oznámení termínu.",
            "translation": {
              "ua": "Попросімо повідомляти дату завчасно.",
              "ru": "Давайте попросим уведомлять заранее.",
              "en": "Let’s ask for earlier notice."
            },
            "next": "notice-reply"
          },
          {
            "id": "access",
            "sk": "Zeptejme se na možnost předání klíčů.",
            "translation": {
              "ua": "Запитаймо про можливість залишити ключі.",
              "ru": "Спросим о возможности оставить ключи.",
              "en": "Let’s ask about leaving keys."
            },
            "next": "access-reply"
          }
        ]
      },
      {
        "kind": "scene",
        "id": "notice-reply",
        "speaker": "Správce",
        "sk": "Uděláme maximum, abychom termín oznámili včas. Dokud ale firma neodpoví, nemohu slíbit konkrétní počet dní.",
        "translation": {
          "ua": "Спробуємо повідомити завчасно, але поки фірма не відповіла, не можу обіцяти певну кількість днів.",
          "ru": "Постараемся уведомить заранее, но пока фирма не ответила, число дней обещать не могу.",
          "en": "We will do our best to give notice, but cannot promise a specific number of days until the firm responds."
        },
        "next": "q2"
      },
      {
        "kind": "scene",
        "id": "access-reply",
        "speaker": "Správce",
        "sk": "Klíče může převzít pověřená osoba, pokud s tím vlastník souhlasí. Podmínky vám pošleme písemně.",
        "translation": {
          "ua": "Ключі може прийняти уповноважена людина за згодою власника. Умови надішлемо письмово.",
          "ru": "Ключи может принять уполномоченное лицо с согласия владельца. Условия пришлём письменно.",
          "en": "An authorised person may hold the keys if the owner agrees. We will send the conditions in writing."
        },
        "next": "q2"
      },
      {
        "kind": "question",
        "id": "q2",
        "prompt": {
          "ua": "Що найбільше непокоїть сусідку?",
          "ru": "Что больше всего беспокоит соседку?",
          "en": "What is the neighbour’s main concern?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Chce vybrat jinou firmu.",
            "translation": {
              "ua": "Хоче вибрати іншу фірму",
              "ru": "Хочет выбрать другую фирму",
              "en": "She wants another contractor"
            }
          },
          {
            "id": "b",
            "sk": "Potřebuje včasné upozornění.",
            "translation": {
              "ua": "Потребує завчасного повідомлення",
              "ru": "Нужно заблаговременное уведомление",
              "en": "She needs advance notice"
            }
          },
          {
            "id": "c",
            "sk": "Odmítá každou opravu.",
            "translation": {
              "ua": "Відмовляється від ремонту",
              "ru": "Отказывается от ремонта",
              "en": "She rejects all repairs"
            }
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "Вона не проти ремонту, їй потрібен час підготуватися.",
          "ru": "Она не против ремонта, ей нужно время подготовиться.",
          "en": "She does not reject the repair; she needs time to prepare."
        },
        "next": "summary"
      },
      {
        "kind": "scene",
        "id": "summary",
        "speaker": "Správce",
        "sk": "Předběžný termín rozešleme e-mailem. Jakmile ho dodavatel potvrdí, zveřejníme přesný harmonogram i pokyny pro zpřístupnění bytů.",
        "translation": {
          "ua": "Попередню дату надішлемо електронною поштою. Коли підрядник підтвердить її, опублікуємо графік і правила доступу.",
          "ru": "Предварительную дату отправим по почте. После подтверждения подрядчиком опубликуем график и правила доступа.",
          "en": "We will email a provisional date. Once the contractor confirms it, we will publish the timetable and access instructions."
        },
        "next": "q3"
      },
      {
        "kind": "question",
        "id": "q3",
        "prompt": {
          "ua": "Що означає «předběžný termín»?",
          "ru": "Что значит «předběžný termín»?",
          "en": "What does «předběžný termín» mean?"
        },
        "choices": [
          {
            "id": "a",
            "sk": "Neměnný termín.",
            "translation": {
              "ua": "Дата без можливості змін",
              "ru": "Неизменная дата",
              "en": "A fixed date"
            }
          },
          {
            "id": "b",
            "sk": "Zrušené práce.",
            "translation": {
              "ua": "Скасовані роботи",
              "ru": "Отменённые работы",
              "en": "Cancelled work"
            }
          },
          {
            "id": "c",
            "sk": "Termín, který se může změnit.",
            "translation": {
              "ua": "Дата, яка ще може змінитися",
              "ru": "Дата, которая ещё может измениться",
              "en": "A date that may still change"
            }
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Předběžný» означає попередній, не остаточний.",
          "ru": "«Předběžný» означает предварительный.",
          "en": "«Předběžný» means provisional."
        },
        "next": "end"
      },
      {
        "kind": "ending",
        "id": "end",
        "sk": "Schůze skončila s předběžnou dohodou. Obyvatelé nyní čekají na potvrzení termínu.",
        "translation": {
          "ua": "Збори завершилися попередньою домовленістю. Мешканці чекають підтвердження дати.",
          "ru": "Собрание закончилось предварительной договорённостью. Жильцы ждут подтверждения даты.",
          "en": "The meeting ended with a provisional agreement. The residents await the confirmed date."
        }
      }
    ]
  }
];
