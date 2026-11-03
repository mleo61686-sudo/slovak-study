import type { Mission } from "./data";
/** Additional authored scenarios for SK, CS and PL. */
export const EXTRA_MISSIONS: readonly Mission[] = [
  {
    "course": "sk",
    "slug": "cafe",
    "title": {
      "ua": "Замовлення в кав’ярні",
      "ru": "Заказ в кофейне",
      "en": "Ordering at a café"
    },
    "summary": {
      "ua": "Замов каву й десерт, уточни спосіб оплати.",
      "ru": "Закажи кофе и десерт, уточни способ оплаты.",
      "en": "Order coffee and cake and choose how to pay."
    },
    "goal": {
      "ua": "Зробити замовлення, відповісти на питання та ввічливо попрощатися.",
      "ru": "Сделать заказ, ответить на вопросы и вежливо попрощаться.",
      "en": "Order, answer questions and say goodbye politely."
    },
    "level": "A0–A1",
    "icon": "☕",
    "premium": false,
    "duration": 8,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Čašníčka",
        "sk": "Dobrý deň, čo si dáte?",
        "translation": {
          "ua": "Добрий день! Що замовите?",
          "ru": "Добрый день! Что будете заказывать?",
          "en": "Hello! What would you like?"
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Čašníčka",
        "sk": "Dobrý deň, čo si dáte?",
        "prompt": {
          "ua": "Замов невелике капучино.",
          "ru": "Закажи небольшое капучино.",
          "en": "Order a small cappuccino."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Kde je zastávka?"
          },
          {
            "id": "c",
            "sk": "Bývam na treťom poschodí."
          },
          {
            "id": "a",
            "sk": "Prosím si malé cappuccino."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Máme aj čaj a domácu limonádu."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Čašníčka",
        "sk": "Máme aj čaj a domácu limonádu.",
        "translation": {
          "ua": "У нас також є чай і домашній лимонад.",
          "ru": "У нас также есть чай и домашний лимонад.",
          "en": "We also have tea and homemade lemonade."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Čašníčka",
        "sk": "Máme aj čaj a domácu limonádu.",
        "prompt": {
          "ua": "Попроси ще й шматочок пирога.",
          "ru": "Попроси ещё кусочек пирога.",
          "en": "Ask for a slice of cake too."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Nemám žiadne kľúče."
          },
          {
            "id": "a",
            "sk": "Áno, dám si aj kúsok koláča."
          },
          {
            "id": "b",
            "sk": "Včera som bol doma."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Koláč stojí tri eurá. Chcete ho so sebou?"
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Čašníčka",
        "sk": "Koláč stojí tri eurá. Chcete ho so sebou?",
        "translation": {
          "ua": "Десерт коштує три євро. Із собою?",
          "ru": "Десерт стоит три евро. С собой?",
          "en": "The cake costs three euros. To go?"
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Čašníčka",
        "sk": "Koláč stojí tri eurá. Chcete ho so sebou?",
        "prompt": {
          "ua": "Скажи, що їстимеш тут.",
          "ru": "Скажи, что съешь здесь.",
          "en": "Say you will eat here."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Nie, zjem ho tu."
          },
          {
            "id": "b",
            "sk": "Zajtra nastúpim do práce."
          },
          {
            "id": "c",
            "sk": "Kde je moja batožina?"
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Samozrejme. Prajem pekný deň!"
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "kartou?",
          "zaplatiť",
          "Môžem"
        ],
        "solution": [
          "Môžem",
          "zaplatiť",
          "kartou?"
        ],
        "meaning": {
          "ua": "Чи можу я заплатити карткою?",
          "ru": "Могу я заплатить картой?",
          "en": "Can I pay by card?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Čašníčka",
        "sk": "Budete platiť kartou?",
        "translation": {
          "ua": "Платитимете карткою?",
          "ru": "Будете платить картой?",
          "en": "Will you pay by card?"
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Čašníčka",
        "sk": "Budete platiť kartou?",
        "prompt": {
          "ua": "Скажи, що платитимеш карткою.",
          "ru": "Скажи, что оплатишь картой.",
          "en": "Say you will pay by card."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Vlak má meškanie."
          },
          {
            "id": "c",
            "sk": "Bývam pri parku."
          },
          {
            "id": "a",
            "sk": "Kartou, prosím."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Ďakujem, dovidenia!"
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "sample": "Ďakujem, dovidenia!",
        "translation": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  },
  {
    "course": "sk",
    "slug": "apartment",
    "title": {
      "ua": "Ремонт у квартирі",
      "ru": "Ремонт в квартире",
      "en": "A repair in your apartment"
    },
    "summary": {
      "ua": "Домовся з власницею про ремонт і доступ до житла.",
      "ru": "Договорись с хозяйкой о ремонте и доступе в квартиру.",
      "en": "Arrange a repair and access to your apartment."
    },
    "goal": {
      "ua": "Пояснити несправність, обговорити час та узгодити доступ.",
      "ru": "Объяснить неисправность, обсудить время и согласовать доступ.",
      "en": "Describe a problem, discuss timing and arrange access."
    },
    "level": "A2",
    "icon": "🔧",
    "premium": true,
    "duration": 11,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Majiteľka bytu",
        "sk": "Dobrý deň, volám vám kvôli oprave v kúpeľni.",
        "translation": {
          "ua": "Телефоную щодо ремонту у ванній.",
          "ru": "Звоню по поводу ремонта в ванной.",
          "en": "I am calling about a bathroom repair."
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Majiteľka bytu",
        "sk": "Dobrý deň, volám vám kvôli oprave v kúpeľni.",
        "prompt": {
          "ua": "Поясни, що вода протікає під умивальником.",
          "ru": "Объясни, что вода течёт под раковиной.",
          "en": "Explain that water is leaking under the sink."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Prosím si dve kávy."
          },
          {
            "id": "c",
            "sk": "Kde prestupuje vlak?"
          },
          {
            "id": "a",
            "sk": "V kúpeľni mi tečie voda pod umývadlom."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Inštalatér môže prísť vo štvrtok poobede."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Majiteľka bytu",
        "sk": "Inštalatér môže prísť vo štvrtok poobede.",
        "translation": {
          "ua": "Сантехнік може прийти в четвер після обіду.",
          "ru": "Сантехник может прийти в четверг после обеда.",
          "en": "The plumber can come on Thursday afternoon."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Majiteľka bytu",
        "sk": "Inštalatér môže prísť vo štvrtok poobede.",
        "prompt": {
          "ua": "Скажи, що будеш удома тільки після четвертої.",
          "ru": "Скажи, что будешь дома только после четырёх.",
          "en": "Say you will be home only after four."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Môžem si kúpiť lístok?"
          },
          {
            "id": "a",
            "sk": "Vo štvrtok budem doma až po štvrtej."
          },
          {
            "id": "b",
            "sk": "Rád plávam v bazéne."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Potrebujeme zabezpečiť prístup do bytu."
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Majiteľka bytu",
        "sk": "Potrebujeme zabezpečiť prístup do bytu.",
        "translation": {
          "ua": "Потрібно забезпечити доступ до квартири.",
          "ru": "Нужно обеспечить доступ в квартиру.",
          "en": "We need access to the apartment."
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Majiteľka bytu",
        "sk": "Potrebujeme zabezpečiť prístup do bytu.",
        "prompt": {
          "ua": "Запропонуй залишити ключі за домовленістю.",
          "ru": "Предложи оставить ключи по договорённости.",
          "en": "Offer to leave the keys by prior arrangement."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Môžem vám nechať kľúče po dohode."
          },
          {
            "id": "b",
            "sk": "Vezmem si ešte jeden koláč."
          },
          {
            "id": "c",
            "sk": "Zajtra si kúpim topánky."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobre, pošlem vám potvrdenie správou."
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "inštalatér?",
          "príde",
          "Kedy"
        ],
        "solution": [
          "Kedy",
          "príde",
          "inštalatér?"
        ],
        "meaning": {
          "ua": "Коли прийде сантехнік?",
          "ru": "Когда придёт сантехник?",
          "en": "When will the plumber arrive?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Majiteľka bytu",
        "sk": "Dobre, pošlem vám potvrdenie správou.",
        "translation": {
          "ua": "Добре, надішлю підтвердження повідомленням.",
          "ru": "Хорошо, пришлю подтверждение сообщением.",
          "en": "All right, I will send confirmation by message."
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Majiteľka bytu",
        "sk": "Dobre, pošlem vám potvrdenie správou.",
        "prompt": {
          "ua": "Подякуй і скажи, що чекатимеш повідомлення.",
          "ru": "Поблагодари и скажи, что будешь ждать сообщение.",
          "en": "Thank her and say you will wait for the message."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Stojím na nástupišti."
          },
          {
            "id": "c",
            "sk": "Moje jedlo je studené."
          },
          {
            "id": "a",
            "sk": "Ďakujem, budem čakať na správu."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobre, pošlem vám potvrdenie správou."
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "sample": "Prosím, dajte mi vedieť vopred.",
        "translation": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-cafe",
    "title": {
      "ua": "Замовлення в кав’ярні",
      "ru": "Заказ в кофейне",
      "en": "Ordering at a café"
    },
    "summary": {
      "ua": "Замов каву й десерт, уточни спосіб оплати.",
      "ru": "Закажи кофе и десерт, уточни способ оплаты.",
      "en": "Order coffee and cake and choose how to pay."
    },
    "goal": {
      "ua": "Зробити замовлення, відповісти на питання та ввічливо попрощатися.",
      "ru": "Сделать заказ, ответить на вопросы и вежливо попрощаться.",
      "en": "Order, answer questions and say goodbye politely."
    },
    "level": "A0–A1",
    "icon": "☕",
    "premium": false,
    "duration": 8,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Číšnice",
        "sk": "Dobrý den, co si dáte?",
        "translation": {
          "ua": "Добрий день! Що замовите?",
          "ru": "Добрый день! Что будете заказывать?",
          "en": "Hello! What would you like?"
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Číšnice",
        "sk": "Dobrý den, co si dáte?",
        "prompt": {
          "ua": "Замов невелике капучино.",
          "ru": "Закажи небольшое капучино.",
          "en": "Order a small cappuccino."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Kde je zastávka?"
          },
          {
            "id": "c",
            "sk": "Bydlím ve třetím patře."
          },
          {
            "id": "a",
            "sk": "Prosím malé cappuccino."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Máme také čaj a domácí limonádu."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Číšnice",
        "sk": "Máme také čaj a domácí limonádu.",
        "translation": {
          "ua": "У нас також є чай і домашній лимонад.",
          "ru": "У нас также есть чай и домашний лимонад.",
          "en": "We also have tea and homemade lemonade."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Číšnice",
        "sk": "Máme také čaj a domácí limonádu.",
        "prompt": {
          "ua": "Попроси ще й шматочок пирога.",
          "ru": "Попроси ещё кусочек пирога.",
          "en": "Ask for a slice of cake too."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Nemám žádné klíče."
          },
          {
            "id": "a",
            "sk": "Ano, dám si i kousek koláče."
          },
          {
            "id": "b",
            "sk": "Včera jsem byl doma."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Koláč stojí sedmdesát korun. Chcete ho s sebou?"
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Číšnice",
        "sk": "Koláč stojí sedmdesát korun. Chcete ho s sebou?",
        "translation": {
          "ua": "Десерт коштує сімдесят крон. Із собою?",
          "ru": "Десерт стоит семьдесят крон. С собой?",
          "en": "The cake costs seventy crowns. To go?"
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Číšnice",
        "sk": "Koláč stojí sedmdesát korun. Chcete ho s sebou?",
        "prompt": {
          "ua": "Скажи, що їстимеш тут.",
          "ru": "Скажи, что съешь здесь.",
          "en": "Say you will eat here."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Ne, sním ho tady."
          },
          {
            "id": "b",
            "sk": "Zítra nastoupím do práce."
          },
          {
            "id": "c",
            "sk": "Kde je moje zavazadlo?"
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Samozřejmě. Přeji hezký den!"
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "kartou?",
          "zaplatit",
          "Můžu"
        ],
        "solution": [
          "Můžu",
          "zaplatit",
          "kartou?"
        ],
        "meaning": {
          "ua": "Чи можу я заплатити карткою?",
          "ru": "Могу я заплатить картой?",
          "en": "Can I pay by card?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Číšnice",
        "sk": "Budete platit kartou?",
        "translation": {
          "ua": "Платитимете карткою?",
          "ru": "Будете платить картой?",
          "en": "Will you pay by card?"
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Číšnice",
        "sk": "Budete platit kartou?",
        "prompt": {
          "ua": "Скажи, що платитимеш карткою.",
          "ru": "Скажи, что оплатишь картой.",
          "en": "Say you will pay by card."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Vlak má zpoždění."
          },
          {
            "id": "c",
            "sk": "Bydlím u parku."
          },
          {
            "id": "a",
            "sk": "Kartou, prosím."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Děkuji, na shledanou!"
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "sample": "Děkuji, na shledanou!",
        "translation": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  },
  {
    "course": "cs",
    "slug": "cs-apartment",
    "title": {
      "ua": "Ремонт у квартирі",
      "ru": "Ремонт в квартире",
      "en": "A repair in your apartment"
    },
    "summary": {
      "ua": "Домовся з власницею про ремонт і доступ до житла.",
      "ru": "Договорись с хозяйкой о ремонте и доступе в квартиру.",
      "en": "Arrange a repair and access to your apartment."
    },
    "goal": {
      "ua": "Пояснити несправність, обговорити час та узгодити доступ.",
      "ru": "Объяснить неисправность, обсудить время и согласовать доступ.",
      "en": "Describe a problem, discuss timing and arrange access."
    },
    "level": "A2",
    "icon": "🔧",
    "premium": true,
    "duration": 11,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Majitelka bytu",
        "sk": "Dobrý den, volám vám kvůli opravě v koupelně.",
        "translation": {
          "ua": "Телефоную щодо ремонту у ванній.",
          "ru": "Звоню по поводу ремонта в ванной.",
          "en": "I am calling about a bathroom repair."
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Majitelka bytu",
        "sk": "Dobrý den, volám vám kvůli opravě v koupelně.",
        "prompt": {
          "ua": "Поясни, що вода протікає під умивальником.",
          "ru": "Объясни, что вода течёт под раковиной.",
          "en": "Explain that water is leaking under the sink."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Prosím dvě kávy."
          },
          {
            "id": "c",
            "sk": "Kde přestupuje vlak?"
          },
          {
            "id": "a",
            "sk": "V koupelně mi teče voda pod umyvadlem."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Instalatér může přijít ve čtvrtek odpoledne."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Majitelka bytu",
        "sk": "Instalatér může přijít ve čtvrtek odpoledne.",
        "translation": {
          "ua": "Сантехнік може прийти в четвер після обіду.",
          "ru": "Сантехник может прийти в четверг после обеда.",
          "en": "The plumber can come on Thursday afternoon."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Majitelka bytu",
        "sk": "Instalatér může přijít ve čtvrtek odpoledne.",
        "prompt": {
          "ua": "Скажи, що будеш удома тільки після четвертої.",
          "ru": "Скажи, что будешь дома только после четырёх.",
          "en": "Say you will be home only after four."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Můžu si koupit jízdenku?"
          },
          {
            "id": "a",
            "sk": "Ve čtvrtek budu doma až po čtvrté."
          },
          {
            "id": "b",
            "sk": "Rád plavu v bazénu."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Potřebujeme zajistit přístup do bytu."
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Majitelka bytu",
        "sk": "Potřebujeme zajistit přístup do bytu.",
        "translation": {
          "ua": "Потрібно забезпечити доступ до квартири.",
          "ru": "Нужно обеспечить доступ в квартиру.",
          "en": "We need access to the apartment."
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Majitelka bytu",
        "sk": "Potřebujeme zajistit přístup do bytu.",
        "prompt": {
          "ua": "Запропонуй залишити ключі за домовленістю.",
          "ru": "Предложи оставить ключи по договорённости.",
          "en": "Offer to leave the keys by prior arrangement."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Můžu vám po domluvě nechat klíče."
          },
          {
            "id": "b",
            "sk": "Dám si ještě jeden koláč."
          },
          {
            "id": "c",
            "sk": "Zítra si koupím boty."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobře, pošlu vám potvrzení zprávou."
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "instalatér?",
          "přijde",
          "Kdy"
        ],
        "solution": [
          "Kdy",
          "přijde",
          "instalatér?"
        ],
        "meaning": {
          "ua": "Коли прийде сантехнік?",
          "ru": "Когда придёт сантехник?",
          "en": "When will the plumber arrive?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Majitelka bytu",
        "sk": "Dobře, pošlu vám potvrzení zprávou.",
        "translation": {
          "ua": "Добре, надішлю підтвердження повідомленням.",
          "ru": "Хорошо, пришлю подтверждение сообщением.",
          "en": "All right, I will send confirmation by message."
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Majitelka bytu",
        "sk": "Dobře, pošlu vám potvrzení zprávou.",
        "prompt": {
          "ua": "Подякуй і скажи, що чекатимеш повідомлення.",
          "ru": "Поблагодари и скажи, что будешь ждать сообщение.",
          "en": "Thank her and say you will wait for the message."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Stojím na nástupišti."
          },
          {
            "id": "c",
            "sk": "Moje jídlo je studené."
          },
          {
            "id": "a",
            "sk": "Děkuji, budu čekat na zprávu."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobře, pošlu vám potvrzení zprávou."
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "sample": "Prosím, dejte mi vědět předem.",
        "translation": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-cafe",
    "title": {
      "ua": "Замовлення в кав’ярні",
      "ru": "Заказ в кофейне",
      "en": "Ordering at a café"
    },
    "summary": {
      "ua": "Замов каву й десерт, уточни спосіб оплати.",
      "ru": "Закажи кофе и десерт, уточни способ оплаты.",
      "en": "Order coffee and cake and choose how to pay."
    },
    "goal": {
      "ua": "Зробити замовлення, відповісти на питання та ввічливо попрощатися.",
      "ru": "Сделать заказ, ответить на вопросы и вежливо попрощаться.",
      "en": "Order, answer questions and say goodbye politely."
    },
    "level": "A0–A1",
    "icon": "☕",
    "premium": false,
    "duration": 8,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Kelnerka",
        "sk": "Dzień dobry, co podać?",
        "translation": {
          "ua": "Добрий день! Що замовите?",
          "ru": "Добрый день! Что будете заказывать?",
          "en": "Hello! What would you like?"
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Kelnerka",
        "sk": "Dzień dobry, co podać?",
        "prompt": {
          "ua": "Замов невелике капучино.",
          "ru": "Закажи небольшое капучино.",
          "en": "Order a small cappuccino."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Gdzie jest przystanek?"
          },
          {
            "id": "c",
            "sk": "Mieszkam na trzecim piętrze."
          },
          {
            "id": "a",
            "sk": "Poproszę małe cappuccino."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Mamy też herbatę i domową lemoniadę."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Kelnerka",
        "sk": "Mamy też herbatę i domową lemoniadę.",
        "translation": {
          "ua": "У нас також є чай і домашній лимонад.",
          "ru": "У нас также есть чай и домашний лимонад.",
          "en": "We also have tea and homemade lemonade."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Kelnerka",
        "sk": "Mamy też herbatę i domową lemoniadę.",
        "prompt": {
          "ua": "Попроси ще й шматочок пирога.",
          "ru": "Попроси ещё кусочек пирога.",
          "en": "Ask for a slice of cake too."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Nie mam żadnych kluczy."
          },
          {
            "id": "a",
            "sk": "Tak, poproszę też kawałek ciasta."
          },
          {
            "id": "b",
            "sk": "Wczoraj byłem w domu."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Ciasto kosztuje piętnaście złotych. Na wynos?"
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Kelnerka",
        "sk": "Ciasto kosztuje piętnaście złotych. Na wynos?",
        "translation": {
          "ua": "Десерт коштує п’ятнадцять злотих. Із собою?",
          "ru": "Десерт стоит пятнадцать злотых. С собой?",
          "en": "The cake costs fifteen zlotys. To go?"
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Kelnerka",
        "sk": "Ciasto kosztuje piętnaście złotych. Na wynos?",
        "prompt": {
          "ua": "Скажи, що їстимеш тут.",
          "ru": "Скажи, что съешь здесь.",
          "en": "Say you will eat here."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Nie, zjem tutaj."
          },
          {
            "id": "b",
            "sk": "Jutro idę do pracy."
          },
          {
            "id": "c",
            "sk": "Gdzie jest mój bagaż?"
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Oczywiście. Życzę miłego dnia!"
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "kartą?",
          "zapłacić",
          "mogę",
          "Czy"
        ],
        "solution": [
          "Czy",
          "mogę",
          "zapłacić",
          "kartą?"
        ],
        "meaning": {
          "ua": "Чи можу я заплатити карткою?",
          "ru": "Могу я заплатить картой?",
          "en": "Can I pay by card?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Kelnerka",
        "sk": "Czy będzie płatność kartą?",
        "translation": {
          "ua": "Платитимете карткою?",
          "ru": "Будете платить картой?",
          "en": "Will you pay by card?"
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Kelnerka",
        "sk": "Czy będzie płatność kartą?",
        "prompt": {
          "ua": "Скажи, що платитимеш карткою.",
          "ru": "Скажи, что оплатишь картой.",
          "en": "Say you will pay by card."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Pociąg jest opóźniony."
          },
          {
            "id": "c",
            "sk": "Mieszkam przy parku."
          },
          {
            "id": "a",
            "sk": "Kartą, poproszę."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dziękuję, do widzenia!"
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "sample": "Dziękuję, do widzenia!",
        "translation": {
          "ua": "Подякуй та попрощайся.",
          "ru": "Поблагодари и попрощайся.",
          "en": "Thank the server and say goodbye."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  },
  {
    "course": "pl",
    "slug": "pl-apartment",
    "title": {
      "ua": "Ремонт у квартирі",
      "ru": "Ремонт в квартире",
      "en": "A repair in your apartment"
    },
    "summary": {
      "ua": "Домовся з власницею про ремонт і доступ до житла.",
      "ru": "Договорись с хозяйкой о ремонте и доступе в квартиру.",
      "en": "Arrange a repair and access to your apartment."
    },
    "goal": {
      "ua": "Пояснити несправність, обговорити час та узгодити доступ.",
      "ru": "Объяснить неисправность, обсудить время и согласовать доступ.",
      "en": "Describe a problem, discuss timing and arrange access."
    },
    "level": "A2",
    "icon": "🔧",
    "premium": true,
    "duration": 11,
    "steps": [
      {
        "id": "d1",
        "kind": "dialogue",
        "speaker": "Właścicielka mieszkania",
        "sk": "Dzień dobry, dzwonię w sprawie naprawy w łazience.",
        "translation": {
          "ua": "Телефоную щодо ремонту у ванній.",
          "ru": "Звоню по поводу ремонта в ванной.",
          "en": "I am calling about a bathroom repair."
        }
      },
      {
        "id": "c1",
        "kind": "choice",
        "speaker": "Właścicielka mieszkania",
        "sk": "Dzień dobry, dzwonię w sprawie naprawy w łazience.",
        "prompt": {
          "ua": "Поясни, що вода протікає під умивальником.",
          "ru": "Объясни, что вода течёт под раковиной.",
          "en": "Explain that water is leaking under the sink."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Poproszę dwie kawy."
          },
          {
            "id": "c",
            "sk": "Gdzie przesiada się pociąg?"
          },
          {
            "id": "a",
            "sk": "W łazience cieknie woda pod umywalką."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Hydraulik może przyjść w czwartek po południu."
      },
      {
        "id": "d2",
        "kind": "dialogue",
        "speaker": "Właścicielka mieszkania",
        "sk": "Hydraulik może przyjść w czwartek po południu.",
        "translation": {
          "ua": "Сантехнік може прийти в четвер після обіду.",
          "ru": "Сантехник может прийти в четверг после обеда.",
          "en": "The plumber can come on Thursday afternoon."
        }
      },
      {
        "id": "c2",
        "kind": "choice",
        "speaker": "Właścicielka mieszkania",
        "sk": "Hydraulik może przyjść w czwartek po południu.",
        "prompt": {
          "ua": "Скажи, що будеш удома тільки після четвертої.",
          "ru": "Скажи, что будешь дома только после четырёх.",
          "en": "Say you will be home only after four."
        },
        "choices": [
          {
            "id": "c",
            "sk": "Czy mogę kupić bilet?"
          },
          {
            "id": "a",
            "sk": "W czwartek będę w domu dopiero po szesnastej."
          },
          {
            "id": "b",
            "sk": "Lubię pływać w basenie."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Musimy zapewnić dostęp do mieszkania."
      },
      {
        "id": "d3",
        "kind": "dialogue",
        "speaker": "Właścicielka mieszkania",
        "sk": "Musimy zapewnić dostęp do mieszkania.",
        "translation": {
          "ua": "Потрібно забезпечити доступ до квартири.",
          "ru": "Нужно обеспечить доступ в квартиру.",
          "en": "We need access to the apartment."
        }
      },
      {
        "id": "c3",
        "kind": "choice",
        "speaker": "Właścicielka mieszkania",
        "sk": "Musimy zapewnić dostęp do mieszkania.",
        "prompt": {
          "ua": "Запропонуй залишити ключі за домовленістю.",
          "ru": "Предложи оставить ключи по договорённости.",
          "en": "Offer to leave the keys by prior arrangement."
        },
        "choices": [
          {
            "id": "a",
            "sk": "Mogę po uzgodnieniu zostawić pani klucze."
          },
          {
            "id": "b",
            "sk": "Poproszę jeszcze ciasto."
          },
          {
            "id": "c",
            "sk": "Jutro kupię buty."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobrze, wyślę potwierdzenie wiadomością."
      },
      {
        "id": "arrange",
        "kind": "arrange",
        "prompt": {
          "ua": "Склади коректне запитання.",
          "ru": "Составь правильный вопрос.",
          "en": "Put the question in the right order."
        },
        "tokens": [
          "hydraulik?",
          "przyjdzie",
          "Kiedy"
        ],
        "solution": [
          "Kiedy",
          "przyjdzie",
          "hydraulik?"
        ],
        "meaning": {
          "ua": "Коли прийде сантехнік?",
          "ru": "Когда придёт сантехник?",
          "en": "When will the plumber arrive?"
        }
      },
      {
        "id": "d4",
        "kind": "dialogue",
        "speaker": "Właścicielka mieszkania",
        "sk": "Dobrze, wyślę potwierdzenie wiadomością.",
        "translation": {
          "ua": "Добре, надішлю підтвердження повідомленням.",
          "ru": "Хорошо, пришлю подтверждение сообщением.",
          "en": "All right, I will send confirmation by message."
        }
      },
      {
        "id": "c4",
        "kind": "choice",
        "speaker": "Właścicielka mieszkania",
        "sk": "Dobrze, wyślę potwierdzenie wiadomością.",
        "prompt": {
          "ua": "Подякуй і скажи, що чекатимеш повідомлення.",
          "ru": "Поблагодари и скажи, что будешь ждать сообщение.",
          "en": "Thank her and say you will wait for the message."
        },
        "choices": [
          {
            "id": "b",
            "sk": "Stoję na peronie."
          },
          {
            "id": "c",
            "sk": "Moje jedzenie jest zimne."
          },
          {
            "id": "a",
            "sk": "Dziękuję, będę czekać na wiadomość."
          }
        ],
        "correctId": "a",
        "explanation": {
          "ua": "Перша відповідь відповідає ситуації та звучить природно.",
          "ru": "Первый вариант соответствует ситуации и звучит естественно.",
          "en": "The first reply is appropriate and natural in this context."
        },
        "nextLine": "Dobrze, wyślę potwierdzenie wiadomością."
      },
      {
        "id": "produce",
        "kind": "produce",
        "prompt": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "sample": "Proszę dać mi znać wcześniej.",
        "translation": {
          "ua": "Попроси попередити тебе завчасно.",
          "ru": "Попроси предупредить тебя заранее.",
          "en": "Ask to be notified in advance."
        },
        "hint": {
          "ua": "Спробуй сформулювати самостійно, а потім порівняй зі зразком.",
          "ru": "Попробуй сформулировать самостоятельно, затем сравни с образцом.",
          "en": "Try your own wording, then compare it with the sample."
        }
      }
    ]
  }
];
