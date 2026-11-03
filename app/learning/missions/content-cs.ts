import type { Mission } from "./data";
/** Curated Czech practice; `sk` is the legacy target-text field. */
export const CS_MISSIONS: readonly Mission[] = [
  {
    "course": "cs",
    "slug": "cs-shop",
    "title": {
      "ua": "У магазині",
      "ru": "В магазине",
      "en": "At the shop"
    },
    "summary": {
      "ua": "Купи воду, запитай ціну та розрахуйся.",
      "ru": "Купи воду, узнай цену и расплатись.",
      "en": "Buy water, ask for the price and pay."
    },
    "goal": {
      "ua": "Ввічливо попросити товар, уточнити ціну й попрощатися.",
      "ru": "Вежливо попросить товар, уточнить цену и попрощаться.",
      "en": "Politely request an item, check the price and say goodbye."
    },
    "level": "A0–A1",
    "icon": "🛒",
    "premium": false,
    "duration": 8,
    "steps": [
      {
        "id": "s1",
        "kind": "dialogue",
        "speaker": "Prodavačka",
        "sk": "Dobrý den! Co si přejete?",
        "translation": {
          "ua": "Добрий день! Що бажаєте?",
          "ru": "Добрый день! Что желаете?",
          "en": "Hello! What would you like?"
        }
      },
      {
        "id": "s2",
        "kind": "choice",
        "speaker": "Prodavačka",
        "sk": "Co si přejete?",
        "prompt": {
          "ua": "Попроси пляшку води.",
          "ru": "Попроси бутылку воды.",
          "en": "Ask for a bottle of water."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Prosím jednu láhev vody."
          },
          {
            "id": "b",
            "sk": "Nevím, kde bydlíte."
          },
          {
            "id": "c",
            "sk": "Mám zítra dovolenou."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Prosím jednu láhev vody» — ввічливе прохання.",
          "ru": "Это вежливая просьба о бутылке воды.",
          "en": "A polite way to ask for a bottle of water."
        },
        "nextLine": "Samozřejmě, tady máte."
      },
      {
        "id": "s3",
        "kind": "dialogue",
        "speaker": "Prodavačka",
        "sk": "Tady máte. Ještě něco?",
        "translation": {
          "ua": "Ось, будь ласка. Ще щось?",
          "ru": "Вот, пожалуйста. Что-нибудь ещё?",
          "en": "Here you are. Anything else?"
        }
      },
      {
        "id": "s4",
        "kind": "choice",
        "speaker": "Prodavačka",
        "sk": "Ještě něco?",
        "prompt": {
          "ua": "Відповідай, що це все.",
          "ru": "Скажи, что это всё.",
          "en": "Say that is all."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zítra zavolám."
          },
          {
            "id": "b",
            "sk": "Ne, děkuji, to je všechno."
          },
          {
            "id": "c",
            "sk": "Kde je nádraží?"
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«To je všechno» — «це все».",
          "ru": "«To je všechno» — «это всё».",
          "en": "«To je všechno» means «that is all»."
        },
        "nextLine": "Dobře, bude to dvacet korun."
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
          "Kolik",
          "to",
          "stojí?"
        ],
        "tokens": [
          "stojí?",
          "Kolik",
          "to"
        ],
        "meaning": {
          "ua": "Kolik to stojí? — Скільки це коштує?",
          "ru": "Kolik to stojí? — Сколько это стоит?",
          "en": "Kolik to stojí? — How much does it cost?"
        }
      },
      {
        "id": "s6",
        "kind": "dialogue",
        "speaker": "Prodavačka",
        "sk": "Stojí to dvacet korun. Budete platit kartou?",
        "translation": {
          "ua": "Це коштує двадцять крон. Платитимете карткою?",
          "ru": "Это стоит двадцать крон. Будете платить картой?",
          "en": "It costs twenty crowns. Will you pay by card?"
        }
      },
      {
        "id": "s7",
        "kind": "choice",
        "speaker": "Prodavačka",
        "sk": "Budete platit kartou?",
        "prompt": {
          "ua": "Підтвердь оплату карткою.",
          "ru": "Подтверди оплату картой.",
          "en": "Confirm that you will pay by card."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Přišel jsem včera."
          },
          {
            "id": "b",
            "sk": "Nemám čas na oběd."
          },
          {
            "id": "c",
            "sk": "Ano, kartou, prosím."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Kartou, prosím» — природна коротка відповідь.",
          "ru": "«Kartou, prosím» — короткий естественный ответ.",
          "en": "«Kartou, prosím» is a natural short reply."
        },
        "nextLine": "Dobře, přiložte kartu."
      },
      {
        "id": "s8",
        "kind": "choice",
        "speaker": "Prodavačka",
        "sk": "Potřebujete tašku?",
        "prompt": {
          "ua": "Скажи, що маєш свою сумку.",
          "ru": "Скажи, что у тебя своя сумка.",
          "en": "Say you have your own bag."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Koupím si nové boty."
          },
          {
            "id": "b",
            "sk": "Ne, děkuji, mám vlastní tašku."
          },
          {
            "id": "c",
            "sk": "Ano, mám rád čaj."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Mám vlastní tašku» — «у мене власна сумка».",
          "ru": "«Mám vlastní tašku» — «у меня своя сумка».",
          "en": "«Mám vlastní tašku» means «I have my own bag»."
        },
        "nextLine": "Tak dobře. Na shledanou!"
      },
      {
        "id": "s9",
        "kind": "produce",
        "prompt": {
          "ua": "Попрощайся чеською та подякуй.",
          "ru": "Попрощайся по-чешски и поблагодари.",
          "en": "Thank the shop assistant and say goodbye in Czech."
        },
        "sample": "Děkuji, na shledanou!",
        "translation": {
          "ua": "Дякую, до побачення!",
          "ru": "Спасибо, до свидания!",
          "en": "Thank you, goodbye!"
        },
        "hint": {
          "ua": "Пригадай «дякую» та ввічливе прощання.",
          "ru": "Вспомни «спасибо» и вежливое прощание.",
          "en": "Recall thanks and a polite farewell."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-doctor",
    "title": {
      "ua": "Запис до лікаря",
      "ru": "Запись к врачу",
      "en": "Doctor appointment"
    },
    "summary": {
      "ua": "Зателефонуй до лікаря й домовся про час.",
      "ru": "Позвони врачу и договорись о времени.",
      "en": "Call the doctor and agree on a time."
    },
    "goal": {
      "ua": "Записатися, описати симптом і підтвердити час.",
      "ru": "Записаться, описать симптом и подтвердить время.",
      "en": "Book an appointment, describe a symptom and confirm the time."
    },
    "level": "A2",
    "icon": "🏥",
    "premium": true,
    "duration": 10,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Recepční",
        "sk": "Dobrý den, ordinace doktorky Novotné. Jak vám mohu pomoci?",
        "translation": {
          "ua": "Добрий день, кабінет лікарки Новотної. Чим допомогти?",
          "ru": "Добрый день, кабинет врача Новотной. Чем помочь?",
          "en": "Hello, Dr Novotná’s surgery. How can I help?"
        }
      },
      {
        "id": "d2",
        "kind": "choice",
        "speaker": "Recepční",
        "sk": "Jak vám mohu pomoci?",
        "prompt": {
          "ua": "Попроси записати тебе на прийом.",
          "ru": "Попроси записать тебя на приём.",
          "en": "Ask for an appointment."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Chtěl bych se objednat na vyšetření."
          },
          {
            "id": "b",
            "sk": "Chci zaplatit nájem."
          },
          {
            "id": "c",
            "sk": "Můžete mi opravit kolo?"
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Objednat se» означає записатися.",
          "ru": "«Objednat se» — записаться на приём.",
          "en": "«Objednat se» means to make an appointment."
        },
        "nextLine": "Co vás trápí?"
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Recepční",
        "sk": "Co vás trápí?",
        "translation": {
          "ua": "Що вас турбує?",
          "ru": "Что вас беспокоит?",
          "en": "What seems to be the problem?"
        }
      },
      {
        "id": "d4",
        "kind": "choice",
        "speaker": "Recepční",
        "sk": "Co vás trápí?",
        "prompt": {
          "ua": "Скажи, що вже три дні болить горло.",
          "ru": "Скажи, что горло болит уже три дня.",
          "en": "Say your throat has hurt for three days."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zítra odjedu vlakem."
          },
          {
            "id": "b",
            "sk": "Už tři dny mě bolí v krku."
          },
          {
            "id": "c",
            "sk": "Koupil jsem nový telefon."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Bolí mě v krku» — «болить горло».",
          "ru": "«Bolí mě v krku» — «болит горло».",
          "en": "«Bolí mě v krku» describes a sore throat."
        },
        "nextLine": "Rozumím. Máme volno zítra ráno."
      },
      {
        "id": "d5",
        "kind": "arrange",
        "prompt": {
          "ua": "Запитай, чи є вільний час завтра вранці.",
          "ru": "Спроси, есть ли свободное время завтра утром.",
          "en": "Ask if an appointment is available tomorrow morning."
        },
        "solution": [
          "Máte",
          "volný",
          "termín",
          "zítra",
          "ráno?"
        ],
        "tokens": [
          "ráno?",
          "volný",
          "Máte",
          "zítra",
          "termín"
        ],
        "meaning": {
          "ua": "«Máte volný termín zítra ráno?» — є час завтра вранці?",
          "ru": "Это вопрос о свободном времени завтра утром.",
          "en": "This asks about an appointment tomorrow morning."
        }
      },
      {
        "id": "d6",
        "kind": "dialogue",
        "speaker": "Recepční",
        "sk": "Ano, v devět hodin. Vyhovuje vám to?",
        "translation": {
          "ua": "Так, о дев’ятій. Вам підходить?",
          "ru": "Да, в девять. Вам подходит?",
          "en": "Yes, at nine o’clock. Does that work for you?"
        }
      },
      {
        "id": "d7",
        "kind": "choice",
        "speaker": "Recepční",
        "sk": "Vyhovuje vám to?",
        "prompt": {
          "ua": "Погодься на запропонований час.",
          "ru": "Согласись на предложенное время.",
          "en": "Agree to the proposed time."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Budu doma o víkendu."
          },
          {
            "id": "b",
            "sk": "Nevím, kde je zastávka."
          },
          {
            "id": "c",
            "sk": "Ano, to mi vyhovuje. Děkuji."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«To mi vyhovuje» — «мені це підходить».",
          "ru": "«To mi vyhovuje» — «мне это подходит».",
          "en": "«To mi vyhovuje» means «that works for me»."
        },
        "nextLine": "Výborně, těšíme se na vás."
      },
      {
        "id": "d8",
        "kind": "choice",
        "speaker": "Recepční",
        "sk": "Vezměte si kartičku pojištěnce.",
        "prompt": {
          "ua": "Підтвердь, що візьмеш картку страхування.",
          "ru": "Подтверди, что возьмёшь страховую карточку.",
          "en": "Confirm you will bring your insurance card."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Nemám rád čekání."
          },
          {
            "id": "b",
            "sk": "Ano, vezmu si ji s sebou."
          },
          {
            "id": "c",
            "sk": "Musím koupit chleba."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Vezmu si ji s sebou» — «візьму її із собою».",
          "ru": "«Vezmu si ji s sebou» — «возьму её с собой».",
          "en": "«Vezmu si ji s sebou» means «I will bring it with me»."
        },
        "nextLine": "Na shledanou."
      },
      {
        "id": "d9",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй і попрощайся чеською.",
          "ru": "Поблагодари и попрощайся по-чешски.",
          "en": "Thank the receptionist and say goodbye in Czech."
        },
        "sample": "Děkuji vám, na shledanou!",
        "translation": {
          "ua": "Дуже дякую, до побачення!",
          "ru": "Большое спасибо, до свидания!",
          "en": "Thank you, goodbye!"
        },
        "hint": {
          "ua": "Використай ввічливу форму.",
          "ru": "Используй вежливую форму.",
          "en": "Use a polite form."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-work",
    "title": {
      "ua": "Розмова на роботі",
      "ru": "Разговор на работе",
      "en": "Conversation at work"
    },
    "summary": {
      "ua": "Домовся про зміну графіка й розподіл роботи.",
      "ru": "Согласуй изменение графика и задачи.",
      "en": "Discuss a schedule change and responsibilities."
    },
    "goal": {
      "ua": "Пояснити причину, запропонувати рішення й уточнити домовленість.",
      "ru": "Объяснить причину, предложить решение и уточнить договорённость.",
      "en": "Explain the issue, propose a solution and confirm the agreement."
    },
    "level": "B1",
    "icon": "🏭",
    "premium": true,
    "duration": 12,
    "steps": [
      {
        "id": "w1",
        "kind": "dialogue",
        "speaker": "Vedoucí",
        "sk": "Zítra potřebujeme dokončit zakázku dřív. Můžeš přijít už v šest?",
        "translation": {
          "ua": "Завтра потрібно раніше закінчити замовлення. Можеш прийти о шостій?",
          "ru": "Завтра нужно раньше закончить заказ. Можешь прийти в шесть?",
          "en": "Tomorrow we need to finish the order earlier. Can you come at six?"
        }
      },
      {
        "id": "w2",
        "kind": "choice",
        "speaker": "Vedoucí",
        "sk": "Můžeš přijít už v šest?",
        "prompt": {
          "ua": "Поясни, що о шостій не встигнеш через автобус.",
          "ru": "Объясни, что не успеешь к шести из-за автобуса.",
          "en": "Explain that the bus prevents you arriving by six."
        },
        "choices": [
          {
            "id": "a",
            "sk": "V šest to nestihnu, první autobus jede později."
          },
          {
            "id": "b",
            "sk": "Včera bylo moc práce."
          },
          {
            "id": "c",
            "sk": "V šest mám vždy oběd."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "«Nestihnu to» означає «не встигну».",
          "ru": "«Nestihnu to» означает «не успею».",
          "en": "«Nestihnu to» means «I won’t make it in time»."
        },
        "nextLine": "Rozumím. V kolik můžeš dorazit?"
      },
      {
        "id": "w3",
        "kind": "dialogue",
        "speaker": "Vedoucí",
        "sk": "V kolik tedy můžeš dorazit?",
        "translation": {
          "ua": "Тоді о котрій можеш прийти?",
          "ru": "Тогда во сколько можешь прийти?",
          "en": "So what time can you arrive?"
        }
      },
      {
        "id": "w4",
        "kind": "choice",
        "speaker": "Vedoucí",
        "sk": "V kolik můžeš dorazit?",
        "prompt": {
          "ua": "Запропонуй прийти о сьомій.",
          "ru": "Предложи прийти в семь.",
          "en": "Offer to arrive at seven."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Zítra mám volno."
          },
          {
            "id": "b",
            "sk": "Můžu dorazit v sedm hodin."
          },
          {
            "id": "c",
            "sk": "Všichni už odešli."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Dorazit v sedm» — «прибути о сьомій».",
          "ru": "«Dorazit v sedm» — «прийти в семь».",
          "en": "«Dorazit v sedm» means «arrive at seven»."
        },
        "nextLine": "Dobře, to by šlo."
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
          "Kdo",
          "připraví",
          "vybavení?"
        ],
        "tokens": [
          "vybavení?",
          "Kdo",
          "připraví"
        ],
        "meaning": {
          "ua": "Kdo připraví vybavení? — Хто підготує обладнання?",
          "ru": "Kdo připraví vybavení? — Кто подготовит оборудование?",
          "en": "Who will prepare the equipment?"
        }
      },
      {
        "id": "w6",
        "kind": "dialogue",
        "speaker": "Vedoucí",
        "sk": "Vybavení připraví ranní směna. Ty prosím zkontroluj seznam úkolů.",
        "translation": {
          "ua": "Обладнання підготує ранкова зміна. Перевір список завдань.",
          "ru": "Оборудование подготовит утренняя смена. Проверь список задач.",
          "en": "The morning shift will prepare the equipment. Please check the task list."
        }
      },
      {
        "id": "w7",
        "kind": "choice",
        "speaker": "Vedoucí",
        "sk": "Zkontroluješ seznam úkolů?",
        "prompt": {
          "ua": "Підтвердь, що перевіриш список до початку роботи.",
          "ru": "Подтверди, что проверишь список до начала работы.",
          "en": "Confirm you will check the list before work."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Ano, zítra možná zaprší."
          },
          {
            "id": "b",
            "sk": "Ne, nikdo nepřijde."
          },
          {
            "id": "c",
            "sk": "Ano, podívám se na něj před začátkem směny."
          }
        ],
        "correctId": "c",
        "explanation": {
          "ua": "«Před začátkem směny» — до початку зміни.",
          "ru": "«Před začátkem směny» — до начала смены.",
          "en": "«Před začátkem směny» means before the shift begins."
        },
        "nextLine": "Skvělé."
      },
      {
        "id": "w8",
        "kind": "choice",
        "speaker": "Vedoucí",
        "sk": "Když bude nějaký problém, dej mi vědět.",
        "prompt": {
          "ua": "Пообіцяй повідомити, якщо виникне проблема.",
          "ru": "Пообещай сообщить, если возникнет проблема.",
          "en": "Promise to report any problem."
        },
        "choices": [
          {
            "id": "a",
            "sk": "O víkendu si odpočinu."
          },
          {
            "id": "b",
            "sk": "Určitě, hned vám dám vědět."
          },
          {
            "id": "c",
            "sk": "Zítra přijde moje rodina."
          }
        ],
        "correctId": "b",
        "explanation": {
          "ua": "«Dám vám vědět» — «повідомлю вас».",
          "ru": "«Dám vám vědět» — «дам вам знать».",
          "en": "«Dám vám vědět» means «I will let you know»."
        },
        "nextLine": "Díky za domluvu."
      },
      {
        "id": "w9",
        "kind": "produce",
        "prompt": {
          "ua": "Підсумуй домовленість чеською.",
          "ru": "Подведи итог договорённости по-чешски.",
          "en": "Summarise the arrangement in Czech."
        },
        "sample": "Zítra přijdu v sedm a zkontroluji seznam úkolů.",
        "translation": {
          "ua": "Завтра прийду о сьомій і перевірю список завдань.",
          "ru": "Завтра приду в семь и проверю список задач.",
          "en": "Tomorrow I will arrive at seven and check the task list."
        },
        "hint": {
          "ua": "Використай майбутній час.",
          "ru": "Используй будущее время.",
          "en": "Use the future tense."
        }
      }
    ]
  }
];
