// app/learning/phrases/a2-5.ts
import type { Phrase } from "./a2";
import { phraseKey } from "./phraseKey";

export const A2_PHRASES_5: Record<string, Phrase> = {
  // =========================
  // LESSON 41 — Plány a ciele
  // =========================
  [phraseKey("ambícia", "амбіція", "a2-41")]: {
    sk: "Moja ambícia je zlepšiť sa v práci.",
    ua: "Моя амбіція — стати кращим у роботі.",
    ru: "Моя амбиция — стать лучше в работе.",
    tokens: ["Moja", "ambícia", "je", "zlepšiť", "sa", "v", "práci", "."],
  },

  [phraseKey("stratégia", "стратегія", "a2-41")]: {
    sk: "Potrebujeme jasnú stratégiu.",
    ua: "Нам потрібна чітка стратегія.",
    ru: "Нам нужна чёткая стратегия.",
    tokens: ["Potrebujeme", "jasnú", "stratégiu", "."],
  },

  [phraseKey("odhodlanie", "рішучість", "a2-41")]: {
    sk: "Bez odhodlania to nepôjde.",
    ua: "Без рішучості це не вийде.",
    ru: "Без решимости это не получится.",
    tokens: ["Bez", "odhodlania", "to", "nepôjde", "."],
  },

  [phraseKey("zvážiť", "зважити/розглянути", "a2-41")]: {
    sk: "Musím zvážiť všetky možnosti.",
    ua: "Мені треба зважити всі варіанти.",
    ru: "Мне нужно взвесить все варианты.",
    tokens: ["Musím", "zvážiť", "všetky", "možnosti", "."],
  },

  [phraseKey("prispôsobiť sa", "пристосуватися", "a2-41")]: {
    sk: "Viem sa prispôsobiť novým podmienkam.",
    ua: "Я вмію пристосуватися до нових умов.",
    ru: "Я умею приспособиться к новым условиям.",
    tokens: ["Viem", "sa", "prispôsobiť", "novým", "podmienkam", "."],
  },

  [phraseKey("priorita", "пріоритет", "a2-41")]: {
    sk: "Moja priorita je zdravie.",
    ua: "Мій пріоритет — здоров’я.",
    ru: "Мой приоритет — здоровье.",
    tokens: ["Moja", "priorita", "je", "zdravie", "."],
  },

  [phraseKey("dosiahnuť", "досягти", "a2-41")]: {
    sk: "Chcem dosiahnuť lepšie výsledky.",
    ua: "Я хочу досягти кращих результатів.",
    ru: "Я хочу достичь лучших результатов.",
    tokens: ["Chcem", "dosiahnuť", "lepšie", "výsledky", "."],
  },

  [phraseKey("pokrok", "прогрес", "a2-41")]: {
    sk: "Vidím pokrok každý týždeň.",
    ua: "Я бачу прогрес щотижня.",
    ru: "Я вижу прогресс каждую неделю.",
    tokens: ["Vidím", "pokrok", "každý", "týždeň", "."],
  },

  [phraseKey("vytrvať", "витримати / не здатися", "a2-41")]: {
    sk: "Musíš vytrvať a nevzdať sa.",
    ua: "Треба витримати й не здатися.",
    ru: "Нужно выдержать и не сдаться.",
    tokens: ["Musíš", "vytrvať", "a", "nevzdať", "sa", "."],
  },

  [phraseKey("pokračovať", "продовжити", "a2-41")]: {
    sk: "Môžeme pokračovať zajtra.",
    ua: "Можемо продовжити завтра.",
    ru: "Мы можем продолжить завтра.",
    tokens: ["Môžeme", "pokračovať", "zajtra", "."],
  },

  // =========================
  // LESSON 42 — V meste (orientácia)
  // =========================
  [phraseKey("smer", "напрямок", "a2-42")]: {
    sk: "Ktorým smerom je stanica?",
    ua: "У якому напрямку вокзал?",
    ru: "В каком направлении вокзал?",
    tokens: ["Ktorým", "smerom", "je", "stanica", "?"],
  },

  [phraseKey("odbočiť", "повернути", "a2-42")]: {
    sk: "Na križovatke odbočte doprava.",
    ua: "На перехресті поверніть праворуч.",
    ru: "На перекрёстке поверните направо.",
    tokens: ["Na", "križovatke", "odbočte", "doprava", "."],
  },

  [phraseKey("kruhový objazd", "кільце", "a2-42")]: {
    sk: "Na kruhovom objazde choďte druhým výjazdom.",
    ua: "На кільці їдьте другим виїздом.",
    ru: "На круговом перекрёстке езжайте вторым съездом.",
    tokens: ["Na", "kruhovom", "objazde", "choďte", "druhým", "výjazdom", "."],
  },

  [phraseKey("prechod pre chodcov", "пішохідний перехід", "a2-42")]: {
    sk: "Prejdite cez prechod pre chodcov.",
    ua: "Перейдіть через пішохідний перехід.",
    ru: "Перейдите через пешеходный переход.",
    tokens: ["Prejdite", "cez", "prechod", "pre", "chodcov", "."],
  },

  [phraseKey("zákaz", "заборона", "a2-42")]: {
    sk: "Tu je zákaz parkovania.",
    ua: "Тут заборона паркування.",
    ru: "Здесь запрет парковки.",
    tokens: ["Tu", "je", "zákaz", "parkovania", "."],
  },

  [phraseKey("povolené", "дозволено", "a2-42")]: {
    sk: "Tu je povolené odbočiť vľavo.",
    ua: "Тут дозволено повернути ліворуч.",
    ru: "Здесь разрешено повернуть налево.",
    tokens: ["Tu", "je", "povolené", "odbočiť", "vľavo", "."],
  },

  [phraseKey("obchádzka", "об’їзд", "a2-42")]: {
    sk: "Cesta je uzavretá, je tu obchádzka.",
    ua: "Дорога закрита, тут об’їзд.",
    ru: "Дорога закрыта, здесь объезд.",
    tokens: ["Cesta", "je", "uzavretá", ",", "je", "tu", "obchádzka", "."],
  },

  [phraseKey("zablúdiť", "заблукати", "a2-42")]: {
    sk: "Myslím, že som zablúdil.",
    ua: "Мені здається, що я заблукав.",
    ru: "Кажется, я заблудился.",
    tokens: ["Myslím", ",", "že", "som", "zablúdil", "."],
  },

  [phraseKey("nasledovať", "слідувати", "a2-42")]: {
    sk: "Nasledujte túto ulicu až po most.",
    ua: "Слідуйте цією вулицею аж до мосту.",
    ru: "Следуйте по этой улице до моста.",
    tokens: ["Nasledujte", "túto", "ulicu", "až", "po", "most", "."],
  },

  [phraseKey("orientovať sa", "орієнтуватися", "a2-42")]: {
    sk: "Neviem sa tu dobre orientovať.",
    ua: "Я тут погано орієнтуюся.",
    ru: "Я здесь плохо ориентируюсь.",
    tokens: ["Neviem", "sa", "tu", "dobre", "orientovať", "."],
  },

  // =========================
  // LESSON 43 — Zvyky a rutina
  // =========================
  [phraseKey("zvyk", "звичка", "a2-43")]: {
    sk: "Mám zvyk vstávať skoro.",
    ua: "Я маю звичку вставати рано.",
    ru: "У меня привычка вставать рано.",
    tokens: ["Mám", "zvyk", "vstávať", "skoro", "."],
  },

  [phraseKey("rutina", "рутина", "a2-43")]: {
    sk: "Moja ranná rutina trvá desať minút.",
    ua: "Моя ранкова рутина триває десять хвилин.",
    ru: "Моя утренняя рутина длится десять минут.",
    tokens: ["Moja", "ranná", "rutina", "trvá", "desať", "minút", "."],
  },

  [phraseKey("zvyknúť si", "звикнути", "a2-43")]: {
    sk: "Musel som si zvyknúť na nový režim.",
    ua: "Мені довелося звикнути до нового режиму.",
    ru: "Мне пришлось привыкнуть к новому режиму.",
    tokens: ["Musel", "som", "si", "zvyknúť", "na", "nový", "režim", "."],
  },

  [phraseKey("odvyknúť si", "відвикнути", "a2-43")]: {
    sk: "Chcem si odvyknúť od sladkého.",
    ua: "Я хочу відвикнути від солодкого.",
    ru: "Я хочу отвыкнуть от сладкого.",
    tokens: ["Chcem", "si", "odvyknúť", "od", "sladkého", "."],
  },

  [phraseKey("pravidelne", "регулярно", "a2-43")]: {
    sk: "Snažím sa cvičiť pravidelne.",
    ua: "Я намагаюся тренуватися регулярно.",
    ru: "Я стараюсь тренироваться регулярно.",
    tokens: ["Snažím", "sa", "cvičiť", "pravidelne", "."],
  },

  [phraseKey("výnimka", "виняток", "a2-43")]: {
    sk: "Dnes urobím výnimku.",
    ua: "Сьогодні зроблю виняток.",
    ru: "Сегодня сделаю исключение.",
    tokens: ["Dnes", "urobím", "výnimku", "."],
  },

  [phraseKey("zlepšiť", "покращити", "a2-43")]: {
    sk: "Chcem zlepšiť svoju kondíciu.",
    ua: "Я хочу покращити свою фізичну форму.",
    ru: "Я хочу улучшить свою физическую форму.",
    tokens: ["Chcem", "zlepšiť", "svoju", "kondíciu", "."],
  },

  [phraseKey("zhoršiť", "погіршити", "a2-43")]: {
    sk: "Stres môže zhoršiť spánok.",
    ua: "Стрес може погіршити сон.",
    ru: "Стресс может ухудшить сон.",
    tokens: ["Stres", "môže", "zhoršiť", "spánok", "."],
  },

  [phraseKey("zdravý štýl", "здоровий стиль життя", "a2-43")]: {
    sk: "Zdravý štýl je pre mňa dôležitý.",
    ua: "Здоровий стиль життя для мене важливий.",
    ru: "Здоровый образ жизни для меня важен.",
    tokens: ["Zdravý", "štýl", "je", "pre", "mňa", "dôležitý", "."],
  },

  [phraseKey("disciplína", "дисципліна", "a2-43")]: {
    sk: "Bez disciplíny to nejde.",
    ua: "Без дисципліни це не працює.",
    ru: "Без дисциплины это не работает.",
    tokens: ["Bez", "disciplíny", "to", "nejde", "."],
  },

  // =========================
  // LESSON 44 — Charakter a správanie
  // =========================
  [phraseKey("správanie", "поведінка", "a2-44")]: {
    sk: "Jeho správanie ma prekvapilo.",
    ua: "Його поведінка мене здивувала.",
    ru: "Его поведение меня удивило.",
    tokens: ["Jeho", "správanie", "ma", "prekvapilo", "."],
  },

  [phraseKey("zdvorilý", "ввічливий", "a2-44")]: {
    sk: "Bol veľmi zdvorilý k zákazníkom.",
    ua: "Він був дуже ввічливий до клієнтів.",
    ru: "Он был очень вежлив с клиентами.",
    tokens: ["Bol", "veľmi", "zdvorilý", "k", "zákazníkom", "."],
  },

  [phraseKey("drzý", "зухвалий", "a2-44")]: {
    sk: "Nemusíš byť taký drzý.",
    ua: "Не треба бути таким зухвалим.",
    ru: "Не нужно быть таким дерзким.",
    tokens: ["Nemusíš", "byť", "taký", "drzý", "."],
  },

  [phraseKey("trpezlivý", "терплячий", "a2-44")]: {
    sk: "Buď trpezlivý, prosím.",
    ua: "Будь терплячим, будь ласка.",
    ru: "Будь терпеливым, пожалуйста.",
    tokens: ["Buď", "trpezlivý", ",", "prosím", "."],
  },

  [phraseKey("netrpezlivý", "нетерплячий", "a2-44")]: {
    sk: "Je netrpezlivý, keď musí čakať.",
    ua: "Він нетерплячий, коли треба чекати.",
    ru: "Он нетерпелив, когда нужно ждать.",
    tokens: ["Je", "netrpezlivý", ",", "keď", "musí", "čakať", "."],
  },

  [phraseKey("ochotný", "готовий допомогти", "a2-44")]: {
    sk: "Personál bol ochotný pomôcť.",
    ua: "Персонал був готовий допомогти.",
    ru: "Персонал был готов помочь.",
    tokens: ["Personál", "bol", "ochotný", "pomôcť", "."],
  },

  [phraseKey("tvrdohlavý", "впертий", "a2-44")]: {
    sk: "Niekedy som až príliš tvrdohlavý.",
    ua: "Іноді я аж занадто впертий.",
    ru: "Иногда я слишком упрямый.",
    tokens: ["Niekedy", "som", "až", "príliš", "tvrdohlavý", "."],
  },

  [phraseKey("priateľský", "дружній", "a2-44")]: {
    sk: "Má priateľský prístup.",
    ua: "Він має дружній підхід.",
    ru: "У него дружелюбный подход.",
    tokens: ["Má", "priateľský", "prístup", "."],
  },

  [phraseKey("zodpovedný", "відповідальний", "a2-44")]: {
    sk: "Je zodpovedný za výsledok.",
    ua: "Він відповідальний за результат.",
    ru: "Он отвечает за результат.",
    tokens: ["Je", "zodpovedný", "za", "výsledok", "."],
  },

  [phraseKey("lenivý", "ледачий", "a2-44")]: {
    sk: "Nechcem byť lenivý, chcem sa zlepšiť.",
    ua: "Я не хочу бути ледачим, хочу покращитися.",
    ru: "Я не хочу быть ленивым, хочу улучшиться.",
    tokens: ["Nechcem", "byť", "lenivý", ",", "chcem", "sa", "zlepšiť", "."],
  },

  // =========================
  // LESSON 45 — Problémy a riešenia
  // =========================
  [phraseKey("situácia", "ситуація", "a2-45")]: {
    sk: "Situácia sa zmenila.",
    ua: "Ситуація змінилася.",
    ru: "Ситуация изменилась.",
    tokens: ["Situácia", "sa", "zmenila", "."],
  },

  [phraseKey("problém", "проблема", "a2-45")]: {
    sk: "Máme problém s termínom.",
    ua: "У нас проблема з терміном.",
    ru: "У нас проблема со сроком.",
    tokens: ["Máme", "problém", "s", "termínom", "."],
  },

  [phraseKey("riešenie", "рішення", "a2-45")]: {
    sk: "Hľadáme najlepšie riešenie.",
    ua: "Ми шукаємо найкраще рішення.",
    ru: "Мы ищем лучшее решение.",
    tokens: ["Hľadáme", "najlepšie", "riešenie", "."],
  },

  [phraseKey("možnosť", "варіант", "a2-45")]: {
    sk: "Je to jedna z možností.",
    ua: "Це один із варіантів.",
    ru: "Это один из вариантов.",
    tokens: ["Je", "to", "jedna", "z", "možností", "."],
  },

  [phraseKey("riziko", "ризик", "a2-45")]: {
    sk: "Je tu určité riziko.",
    ua: "Тут є певний ризик.",
    ru: "Здесь есть определённый риск.",
    tokens: ["Je", "tu", "určité", "riziko", "."],
  },

  [phraseKey("dôsledok", "наслідок", "a2-45")]: {
    sk: "Každé rozhodnutie má dôsledok.",
    ua: "Кожне рішення має наслідок.",
    ru: "Каждое решение имеет последствия.",
    tokens: ["Každé", "rozhodnutie", "má", "dôsledok", "."],
  },

  [phraseKey("výsledok", "результат", "a2-45")]: {
    sk: "Výsledok uvidíme čoskoro.",
    ua: "Результат побачимо скоро.",
    ru: "Результат увидим скоро.",
    tokens: ["Výsledok", "uvidíme", "čoskoro", "."],
  },

  [phraseKey("zvládnuť", "впоратися", "a2-45")]: {
    sk: "Spolu to zvládneme.",
    ua: "Разом ми з цим впораємося.",
    ru: "Вместе мы с этим справимся.",
    tokens: ["Spolu", "to", "zvládneme", "."],
  },

  [phraseKey("poradiť si", "дати собі раду", "a2-45")]: {
    sk: "Musím si s tým nejako poradiť.",
    ua: "Мені треба якось із цим дати собі раду.",
    ru: "Мне нужно как-то с этим справиться.",
    tokens: ["Musím", "si", "s", "tým", "nejako", "poradiť", "."],
  },

  [phraseKey("pokus", "спроба", "a2-45")]: {
    sk: "Dáme tomu ešte jeden pokus.",
    ua: "Дамо цьому ще одну спробу.",
    ru: "Дадим этому ещё одну попытку.",
    tokens: ["Dáme", "tomu", "ešte", "jeden", "pokus", "."],
  },

  // =========================
  // LESSON 46 — Myšlienky a rozhodnutia
  // =========================
  [phraseKey("rozhodnutie", "рішення", "a2-46")]: {
    sk: "Bolo to ťažké rozhodnutie.",
    ua: "Це було важке рішення.",
    ru: "Это было трудное решение.",
    tokens: ["Bolo", "to", "ťažké", "rozhodnutie", "."],
  },

  [phraseKey("zvoliť", "обрати", "a2-46")]: {
    sk: "Musím si zvoliť jednu možnosť.",
    ua: "Мені треба обрати один варіант.",
    ru: "Мне нужно выбрать один вариант.",
    tokens: ["Musím", "si", "zvoliť", "jednu", "možnosť", "."],
  },

  [phraseKey("zmeniť názor", "змінити думку", "a2-46")]: {
    sk: "Môžem zmeniť názor, keď mám nové informácie.",
    ua: "Я можу змінити думку, коли маю нову інформацію.",
    ru: "Я могу изменить мнение, когда у меня есть новая информация.",
    tokens: ["Môžem", "zmeniť", "názor", ",", "keď", "mám", "nové", "informácie", "."],
  },

  [phraseKey("pochybovať", "сумніватися", "a2-46")]: {
    sk: "Nechcem pochybovať o tebe.",
    ua: "Я не хочу сумніватися в тобі.",
    ru: "Я не хочу сомневаться в тебе.",
    tokens: ["Nechcem", "pochybovať", "o", "tebe", "."],
  },

  [phraseKey("istota", "впевненість", "a2-46")]: {
    sk: "Potrebujem istotu, že je to správne.",
    ua: "Мені потрібна впевненість, що це правильно.",
    ru: "Мне нужна уверенность, что это правильно.",
    tokens: ["Potrebujem", "istotu", ",", "že", "je", "to", "správne", "."],
  },

  [phraseKey("neistota", "невпевненість", "a2-46")]: {
    sk: "Cítim neistotu pred skúškou.",
    ua: "Я відчуваю невпевненість перед іспитом.",
    ru: "Я чувствую неуверенность перед экзаменом.",
    tokens: ["Cítim", "neistotu", "pred", "skúškou", "."],
  },

  [phraseKey("uvedomiť si", "усвідомити", "a2-46")]: {
    sk: "Uvedomil som si, že som sa mýlil.",
    ua: "Я усвідомив, що помилявся.",
    ru: "Я осознал, что ошибался.",
    tokens: ["Uvedomil", "som", "si", ",", "že", "som", "sa", "mýlil", "."],
  },

  [phraseKey("predpokladať", "припускати", "a2-46")]: {
    sk: "Nemôžem len predpokladať, musím to vedieť.",
    ua: "Я не можу лише припускати — мушу це знати.",
    ru: "Я не могу просто предполагать — я должен это знать.",
    tokens: ["Nemôžem", "len", "predpokladať", ",", "musím", "to", "vedieť", "."],
  },

  [phraseKey("zistiť", "з’ясувати", "a2-46")]: {
    sk: "Potrebujem zistiť, čo sa stalo.",
    ua: "Мені треба з’ясувати, що сталося.",
    ru: "Мне нужно выяснить, что случилось.",
    tokens: ["Potrebujem", "zistiť", ",", "čo", "sa", "stalo", "."],
  },

  [phraseKey("záver", "висновок", "a2-46")]: {
    sk: "Záver je jasný.",
    ua: "Висновок очевидний.",
    ru: "Вывод очевиден.",
    tokens: ["Záver", "je", "jasný", "."],
  },

  // =========================
  // LESSON 47 — Kultúra a médiá
  // =========================
  [phraseKey("kultúra", "культура", "a2-47")]: {
    sk: "Kultúra je dôležitá súčasť spoločnosti.",
    ua: "Культура — важлива частина суспільства.",
    ru: "Культура — важная часть общества.",
    tokens: ["Kultúra", "je", "dôležitá", "súčasť", "spoločnosti", "."],
  },

  [phraseKey("tradícia", "традиція", "a2-47")]: {
    sk: "Na Slovensku je veľa tradícií.",
    ua: "У Словаччині багато традицій.",
    ru: "В Словакии много традиций.",
    tokens: ["Na", "Slovensku", "je", "veľa", "tradícií", "."],
  },

  [phraseKey("zvyk", "звичай", "a2-47")]: {
    sk: "Je to miestny zvyk.",
    ua: "Це місцевий звичай.",
    ru: "Это местный обычай.",
    tokens: ["Je", "to", "miestny", "zvyk", "."],
  },

  [phraseKey("správy", "новини", "a2-47")]: {
    sk: "Pozerám správy každý večer.",
    ua: "Я дивлюся новини щовечора.",
    ru: "Я смотрю новости каждый вечер.",
    tokens: ["Pozerám", "správy", "každý", "večer", "."],
  },

  [phraseKey("článok", "стаття", "a2-47")]: {
    sk: "Čítal som zaujímavý článok.",
    ua: "Я прочитав цікаву статтю.",
    ru: "Я прочитал интересную статью.",
    tokens: ["Čítal", "som", "zaujímavý", "článok", "."],
  },

  [phraseKey("diskusia", "обговорення", "a2-47")]: {
    sk: "Diskusia bola veľmi živá.",
    ua: "Обговорення було дуже жвавим.",
    ru: "Обсуждение было очень оживлённым.",
    tokens: ["Diskusia", "bola", "veľmi", "živá", "."],
  },

  [phraseKey("názor", "думка", "a2-47")]: {
    sk: "Môj názor je trochu iný.",
    ua: "Моя думка трохи інша.",
    ru: "Моё мнение немного другое.",
    tokens: ["Môj", "názor", "je", "trochu", "iný", "."],
  },

  [phraseKey("reklama", "реклама", "a2-47")]: {
    sk: "Tá reklama ma otravuje.",
    ua: "Ця реклама мене дратує.",
    ru: "Эта реклама меня раздражает.",
    tokens: ["Tá", "reklama", "ma", "otravuje", "."],
  },

  [phraseKey("vplyv", "вплив", "a2-47")]: {
    sk: "Médiá majú veľký vplyv na ľudí.",
    ua: "Медіа мають великий вплив на людей.",
    ru: "СМИ имеют большое влияние на людей.",
    tokens: ["Médiá", "majú", "veľký", "vplyv", "na", "ľudí", "."],
  },

  [phraseKey("zdroj", "джерело", "a2-47")]: {
    sk: "Aký je zdroj tejto informácie?",
    ua: "Яке джерело цієї інформації?",
    ru: "Какой источник этой информации?",
    tokens: ["Aký", "je", "zdroj", "tejto", "informácie", "?"],
  },

  // =========================
  // LESSON 48 — Príroda a cestovanie (aktivity)
  // =========================
  [phraseKey("turistika", "похід/туризм", "a2-48")]: {
    sk: "Cez víkend pôjdeme na turistiku.",
    ua: "На вихідних ми підемо в похід.",
    ru: "На выходных мы пойдём в поход.",
    tokens: ["Cez", "víkend", "pôjdeme", "na", "turistiku", "."],
  },

  [phraseKey("trasa", "маршрут", "a2-48")]: {
    sk: "Ktorá trasa je najbezpečnejšia?",
    ua: "Який маршрут найбезпечніший?",
    ru: "Какой маршрут самый безопасный?",
    tokens: ["Ktorá", "trasa", "je", "najbezpečnejšia", "?"],
  },

  [phraseKey("výstup", "підйом", "a2-48")]: {
    sk: "Výstup je dosť náročný.",
    ua: "Підйом досить складний.",
    ru: "Подъём довольно сложный.",
    tokens: ["Výstup", "je", "dosť", "náročný", "."],
  },

  [phraseKey("zostup", "спуск", "a2-48")]: {
    sk: "Pri zostupe buďte opatrní.",
    ua: "На спуску будьте обережні.",
    ru: "На спуске будьте осторожны.",
    tokens: ["Pri", "zostupe", "buďte", "opatrní", "."],
  },

  [phraseKey("výhľad", "краєвид", "a2-48")]: {
    sk: "Z vrcholu je krásny výhľad.",
    ua: "З вершини відкривається гарний краєвид.",
    ru: "С вершины открывается красивый вид.",
    tokens: ["Z", "vrcholu", "je", "krásny", "výhľad", "."],
  },

  [phraseKey("príroda", "природа", "a2-48")]: {
    sk: "Táto príroda je úžasná.",
    ua: "Ця природа неймовірна.",
    ru: "Эта природа потрясающая.",
    tokens: ["Táto", "príroda", "je", "úžasná", "."],
  },

  [phraseKey("chránená oblasť", "заповідна зона", "a2-48")]: {
    sk: "Toto je chránená oblasť, prosím, nerobte hluk.",
    ua: "Це заповідна зона, будь ласка, не шуміть.",
    ru: "Это охраняемая территория, пожалуйста, не шумите.",
    tokens: ["Toto", "je", "chránená", "oblasť", ",", "prosím", ",", "nerobte", "hluk", "."],
  },

  [phraseKey("tábor", "табір", "a2-48")]: {
    sk: "Tábor si postavíme pri lese.",
    ua: "Табір поставимо біля лісу.",
    ru: "Лагерь поставим возле леса.",
    tokens: ["Tábor", "si", "postavíme", "pri", "lese", "."],
  },

  [phraseKey("výbava", "спорядження", "a2-48")]: {
    sk: "Nezabudni si vziať výbavu.",
    ua: "Не забудь взяти спорядження.",
    ru: "Не забудь взять снаряжение.",
    tokens: ["Nezabudni", "si", "vziať", "výbavu", "."],
  },

  [phraseKey("bezpečnosť", "безпека", "a2-48")]: {
    sk: "Bezpečnosť je na prvom mieste.",
    ua: "Безпека — на першому місці.",
    ru: "Безопасность — на первом месте.",
    tokens: ["Bezpečnosť", "je", "na", "prvom", "mieste", "."],
  },

  // =========================
  // LESSON 49 — Počasie (podmienky a rady)
  // =========================
  [phraseKey("výstraha", "попередження", "a2-49")]: {
    sk: "Platí výstraha pred búrkou.",
    ua: "Діє попередження про бурю.",
    ru: "Действует предупреждение о буре.",
    tokens: ["Platí", "výstraha", "pred", "búrkou", "."],
  },

  [phraseKey("silný vietor", "сильний вітер", "a2-49")]: {
    sk: "Dnes bude silný vietor.",
    ua: "Сьогодні буде сильний вітер.",
    ru: "Сегодня будет сильный ветер.",
    tokens: ["Dnes", "bude", "silný", "vietor", "."],
  },

  [phraseKey("hmla", "туман", "a2-49")]: {
    sk: "Ráno bude hmla, jazdite opatrne.",
    ua: "Вранці буде туман, їдьте обережно.",
    ru: "Утром будет туман, езжайте осторожно.",
    tokens: ["Ráno", "bude", "hmla", ",", "jazdite", "opatrne", "."],
  },

  [phraseKey("poľadovica", "ожеледиця", "a2-49")]: {
    sk: "Na cestách môže byť poľadovica.",
    ua: "На дорогах може бути ожеледиця.",
    ru: "На дорогах может быть гололёд.",
    tokens: ["Na", "cestách", "môže", "byť", "poľadovica", "."],
  },

  [phraseKey("zrážky", "опади", "a2-49")]: {
    sk: "Očakávajú sa zrážky popoludní.",
    ua: "Опади очікуються після обіду.",
    ru: "Осадки ожидаются после обеда.",
    tokens: ["Očakávajú", "sa", "zrážky", "popoludní", "."],
  },

  [phraseKey("vlna horúčav", "хвиля спеки", "a2-49")]: {
    sk: "Prichádza vlna horúčav, pite viac vody.",
    ua: "Наближається хвиля спеки — пийте більше води.",
    ru: "Приходит волна жары — пейте больше воды.",
    tokens: ["Prichádza", "vlna", "horúčav", ",", "pite", "viac", "vody", "."],
  },

  [phraseKey("ochladenie", "похолодання", "a2-49")]: {
    sk: "Večer príde ochladenie.",
    ua: "Увечері прийде похолодання.",
    ru: "Вечером придёт похолодание.",
    tokens: ["Večer", "príde", "ochladenie", "."],
  },

  [phraseKey("odporúčanie", "порада/рекомендація", "a2-49")]: {
    sk: "Moje odporúčanie je oddýchnuť si.",
    ua: "Моя порада — відпочити.",
    ru: "Мой совет — отдохнуть.",
    tokens: ["Moje", "odporúčanie", "je", "oddýchnuť", "si", "."],
  },

  [phraseKey("zobrať si dáždnik", "взяти парасолю", "a2-49")]: {
    sk: "Radšej si zober dáždnik.",
    ua: "Краще візьми парасолю.",
    ru: "Лучше возьми зонт.",
    tokens: ["Radšej", "si", "zober", "dáždnik", "."],
  },

  [phraseKey("teplo sa obliecť", "тепло одягтися", "a2-49")]: {
    sk: "Zajtra sa teplo obleč.",
    ua: "Завтра тепло одягнися.",
    ru: "Завтра тепло оденься.",
    tokens: ["Zajtra", "sa", "teplo", "obleč", "."],
  },

  // =========================
  // LESSON 50 — Opakovanie A2 (41–49)
  // =========================
  [phraseKey("dosiahnuť", "досягти", "a2-50")]: {
    sk: "Ak chceš dosiahnuť cieľ, musíš pracovať pravidelne.",
    ua: "Якщо хочеш досягти цілі, треба працювати регулярно.",
    ru: "Если хочешь достичь цели, нужно работать регулярно.",
    tokens: ["Ak", "chceš", "dosiahnuť", "cieľ", ",", "musíš", "pracovať", "pravidelne", "."],
  },

  [phraseKey("obchádzka", "об’їзд", "a2-50")]: {
    sk: "Kvôli nehode je obchádzka.",
    ua: "Через аварію є об’їзд.",
    ru: "Из-за аварии есть объезд.",
    tokens: ["Kvôli", "nehode", "je", "obchádzka", "."],
  },

  [phraseKey("disciplína", "дисципліна", "a2-50")]: {
    sk: "Disciplína je kľúč k úspechu.",
    ua: "Дисципліна — ключ до успіху.",
    ru: "Дисциплина — ключ к успеху.",
    tokens: ["Disciplína", "je", "kľúč", "k", "úspechu", "."],
  },

  [phraseKey("tvrdohlavý", "впертий", "a2-50")]: {
    sk: "Niekedy je lepšie nebyť tvrdohlavý.",
    ua: "Іноді краще не бути впертим.",
    ru: "Иногда лучше не быть упрямым.",
    tokens: ["Niekedy", "je", "lepšie", "nebyť", "tvrdohlavý", "."],
  },

  [phraseKey("poradiť si", "дати собі раду", "a2-50")]: {
    sk: "Poradím si, aj keď to bude ťažké.",
    ua: "Я дам собі раду, навіть якщо буде важко.",
    ru: "Я справлюсь, даже если будет трудно.",
    tokens: ["Poradím", "si", ",", "aj", "keď", "to", "bude", "ťažké", "."],
  },

  [phraseKey("pochybovať", "сумніватися", "a2-50")]: {
    sk: "Niekedy je normálne pochybovať.",
    ua: "Іноді нормально сумніватися.",
    ru: "Иногда нормально сомневаться.",
    tokens: ["Niekedy", "je", "normálne", "pochybovať", "."],
  },

  [phraseKey("zdroj", "джерело", "a2-50")]: {
    sk: "Overme si zdroj, aby sme mali istotu.",
    ua: "Перевірмо джерело, щоб бути впевненими.",
    ru: "Проверим источник, чтобы быть уверенными.",
    tokens: ["Overme", "si", "zdroj", ",", "aby", "sme", "mali", "istotu", "."],
  },

  [phraseKey("výbava", "спорядження", "a2-50")]: {
    sk: "Bez dobrej výbavy je turistika riskantná.",
    ua: "Без хорошого спорядження похід ризикований.",
    ru: "Без хорошего снаряжения поход рискован.",
    tokens: ["Bez", "dobrej", "výbavy", "je", "turistika", "riskantná", "."],
  },

  [phraseKey("výstraha", "попередження", "a2-50")]: {
    sk: "Výstraha platí až do večera.",
    ua: "Попередження діє до вечора.",
    ru: "Предупреждение действует до вечера.",
    tokens: ["Výstraha", "platí", "až", "do", "večera", "."],
  },

  [phraseKey("orientovať sa", "орієнтуватися", "a2-50")]: {
    sk: "S mapou sa budem orientovať ľahšie.",
    ua: "З картою я буду орієнтуватися легше.",
    ru: "С картой я буду ориентироваться легче.",
    tokens: ["S", "mapou", "sa", "budem", "orientovať", "ľahšie", "."],
  },
};