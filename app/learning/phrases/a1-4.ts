import type { Phrase } from "./a1";
import { phraseKey } from "./phraseKey";

export const A1_PHRASES_4: Record<string, Phrase> = {
  // =========================
  // A1-31 — Почуття
  // =========================

  [phraseKey("radosť", "радість", "a1-31")]: {
    sk: "Cítim radosť.",
    ua: "Я відчуваю радість.",
    ru: "Я чувствую радость.",
    tokens: ["Cítim", "radosť", "."],
  },

  [phraseKey("smútok", "смуток", "a1-31")]: {
    sk: "Cítim smútok.",
    ua: "Я відчуваю смуток.",
    ru: "Я чувствую грусть.",
    tokens: ["Cítim", "smútok", "."],
  },

  [phraseKey("strach", "страх", "a1-31")]: {
    sk: "Mám strach.",
    ua: "Мені страшно.",
    ru: "Мне страшно.",
    tokens: ["Mám", "strach", "."],
  },

  [phraseKey("hnev", "злість", "a1-31")]: {
    sk: "Cítim hnev.",
    ua: "Я відчуваю злість.",
    ru: "Я чувствую злость.",
    tokens: ["Cítim", "hnev", "."],
  },

  [phraseKey("láska", "любов", "a1-31")]: {
    sk: "Láska je dôležitá.",
    ua: "Любов важлива.",
    ru: "Любовь важна.",
    tokens: ["Láska", "je", "dôležitá", "."],
  },

  [phraseKey("únava", "втома", "a1-31")]: {
    sk: "Cítim únavu.",
    ua: "Я відчуваю втому.",
    ru: "Я чувствую усталость.",
    tokens: ["Cítim", "únavu", "."],
  },

  [phraseKey("stres", "стрес", "a1-31")]: {
    sk: "Mám stres.",
    ua: "У мене стрес.",
    ru: "У меня стресс.",
    tokens: ["Mám", "stres", "."],
  },

  [phraseKey("pokoj", "спокій", "a1-31")]: {
    sk: "Potrebujem pokoj.",
    ua: "Мені потрібен спокій.",
    ru: "Мне нужен покой.",
    tokens: ["Potrebujem", "pokoj", "."],
  },

  [phraseKey("prekvapenie", "здивування", "a1-31")]: {
    sk: "To bolo prekvapenie.",
    ua: "Це було здивування.",
    ru: "Это было удивление.",
    tokens: ["To", "bolo", "prekvapenie", "."],
  },

  [phraseKey("nadšenie", "захоплення", "a1-31")]: {
    sk: "Cítim nadšenie.",
    ua: "Я відчуваю захоплення.",
    ru: "Я чувствую восторг.",
    tokens: ["Cítim", "nadšenie", "."],
  },

  // =========================
  // A1-32 — Опис речей
  // =========================

  [phraseKey("nový", "новий", "a1-32")]: {
    sk: "Mám nový telefón.",
    ua: "У мене новий телефон.",
    ru: "У меня новый телефон.",
    tokens: ["Mám", "nový", "telefón", "."],
  },

  [phraseKey("starý", "старий", "a1-32")]: {
    sk: "Toto je staré auto.",
    ua: "Це старе авто.",
    ru: "Это старая машина.",
    tokens: ["Toto", "je", "staré", "auto", "."],
  },

  [phraseKey("veľký", "великий", "a1-32")]: {
    sk: "To je veľký problém.",
    ua: "Це велика проблема.",
    ru: "Это большая проблема.",
    tokens: ["To", "je", "veľký", "problém", "."],
  },

  [phraseKey("malý", "малий", "a1-32")]: {
    sk: "To je malá taška.",
    ua: "Це маленька сумка.",
    ru: "Это маленькая сумка.",
    tokens: ["To", "je", "malá", "taška", "."],
  },

  [phraseKey("ťažký", "важкий", "a1-32")]: {
    sk: "Tento kufor je ťažký.",
    ua: "Ця валіза важка.",
    ru: "Этот чемодан тяжёлый.",
    tokens: ["Tento", "kufor", "je", "ťažký", "."],
  },

  [phraseKey("ľahký", "легкий", "a1-32")]: {
    sk: "Batoh je ľahký.",
    ua: "Рюкзак легкий.",
    ru: "Рюкзак лёгкий.",
    tokens: ["Batoh", "je", "ľahký", "."],
  },

  [phraseKey("rýchly", "швидкий", "a1-32")]: {
    sk: "Je to rýchly vlak.",
    ua: "Це швидкий поїзд.",
    ru: "Это быстрый поезд.",
    tokens: ["Je", "to", "rýchly", "vlak", "."],
  },

  [phraseKey("pomalý", "повільний", "a1-32")]: {
    sk: "Internet je dnes pomalý.",
    ua: "Інтернет сьогодні повільний.",
    ru: "Интернет сегодня медленный.",
    tokens: ["Internet", "je", "dnes", "pomalý", "."],
  },

  [phraseKey("drahý", "дорогий", "a1-32")]: {
    sk: "Toto je drahé.",
    ua: "Це дороге.",
    ru: "Это дорого.",
    tokens: ["Toto", "je", "drahé", "."],
  },

  [phraseKey("lacný", "дешевий", "a1-32")]: {
    sk: "Toto je lacné.",
    ua: "Це дешеве.",
    ru: "Это дешёво.",
    tokens: ["Toto", "je", "lacné", "."],
  },

  // =========================
  // A1-33 — Дім (дії)
  // =========================

  [phraseKey("variť", "готувати", "a1-33")]: {
    sk: "Varím večeru.",
    ua: "Я готую вечерю.",
    ru: "Я готовлю ужин.",
    tokens: ["Varím", "večeru", "."],
  },

  [phraseKey("vysávať", "пилососити", "a1-33")]: {
    sk: "Vysávam izbu.",
    ua: "Я пилосошу кімнату.",
    ru: "Я пылесошу комнату.",
    tokens: ["Vysávam", "izbu", "."],
  },

  [phraseKey("umyť", "помити", "a1-33")]: {
    sk: "Umyjem riad.",
    ua: "Я помию посуд.",
    ru: "Я помою посуду.",
    tokens: ["Umyjem", "riad", "."],
  },

  [phraseKey("zatvoriť", "закрити", "a1-33")]: {
    sk: "Zatvorím okno.",
    ua: "Я закрию вікно.",
    ru: "Я закрою окно.",
    tokens: ["Zatvorím", "okno", "."],
  },

  [phraseKey("opraviť", "відремонтувати", "a1-33")]: {
    sk: "Musím to opraviť.",
    ua: "Мені треба це відремонтувати.",
    ru: "Мне нужно это отремонтировать.",
    tokens: ["Musím", "to", "opraviť", "."],
  },

  [phraseKey("postaviť", "побудувати", "a1-33")]: {
    sk: "Chcem postaviť dom.",
    ua: "Я хочу побудувати будинок.",
    ru: "Я хочу построить дом.",
    tokens: ["Chcem", "postaviť", "dom", "."],
  },

  [phraseKey("presťahovať sa", "переїхати", "a1-33")]: {
    sk: "Chceme sa presťahovať.",
    ua: "Ми хочемо переїхати.",
    ru: "Мы хотим переехать.",
    tokens: ["Chceme", "sa", "presťahovať", "."],
  },

  [phraseKey("zavesiť", "повісити", "a1-33")]: {
    sk: "Zavesím obraz na stenu.",
    ua: "Я повішу картину на стіну.",
    ru: "Я повешу картину на стену.",
    tokens: ["Zavesím", "obraz", "na", "stenu", "."],
  },

  [phraseKey("poskladať", "скласти (речі)", "a1-33")]: {
    sk: "Poskladám oblečenie.",
    ua: "Я складу одяг.",
    ru: "Я сложу одежду.",
    tokens: ["Poskladám", "oblečenie", "."],
  },

  [phraseKey("zariadiť", "облаштувати", "a1-33")]: {
    sk: "Chcem si zariadiť byt.",
    ua: "Я хочу облаштувати квартиру.",
    ru: "Я хочу обустроить квартиру.",
    tokens: ["Chcem", "si", "zariadiť", "byt", "."],
  },

  // =========================
  // A1-34 — Комунікація
  // =========================

  [phraseKey("opísať", "описати", "a1-34")]: {
    sk: "Môžete to opísať?",
    ua: "Можете це описати?",
    ru: "Можете это описать?",
    tokens: ["Môžete", "to", "opísať", "?"],
  },

  [phraseKey("navrhnúť", "запропонувати", "a1-34")]: {
    sk: "Chcem navrhnúť riešenie.",
    ua: "Я хочу запропонувати рішення.",
    ru: "Я хочу предложить решение.",
    tokens: ["Chcem", "navrhnúť", "riešenie", "."],
  },

  [phraseKey("rozprávať", "розповідати", "a1-34")]: {
    sk: "Rozprávam príbeh.",
    ua: "Я розповідаю історію.",
    ru: "Я рассказываю историю.",
    tokens: ["Rozprávam", "príbeh", "."],
  },

  [phraseKey("oznámiť", "повідомити", "a1-34")]: {
    sk: "Musím vám to oznámiť.",
    ua: "Мені треба вам це повідомити.",
    ru: "Мне нужно вам это сообщить.",
    tokens: ["Musím", "vám", "to", "oznámiť", "."],
  },

  [phraseKey("požiadať", "попросити", "a1-34")]: {
    sk: "Chcem vás požiadať o pomoc.",
    ua: "Я хочу попросити вас про допомогу.",
    ru: "Я хочу попросить вас о помощи.",
    tokens: ["Chcem", "vás", "požiadať", "o", "pomoc", "."],
  },

  [phraseKey("odpísať", "відписати", "a1-34")]: {
    sk: "Odpíšem ti neskôr.",
    ua: "Я відповім тобі пізніше.",
    ru: "Я отвечу тебе позже.",
    tokens: ["Odpíšem", "ti", "neskôr", "."],
  },

  [phraseKey("zavolať", "подзвонити", "a1-34")]: {
    sk: "Zavolám ti večer.",
    ua: "Я подзвоню тобі ввечері.",
    ru: "Я позвоню тебе вечером.",
    tokens: ["Zavolám", "ti", "večer", "."],
  },

  [phraseKey("pozdraviť", "привітати", "a1-34")]: {
    sk: "Pozdravím kolegu.",
    ua: "Я привітаю колегу.",
    ru: "Я поздороваюсь с коллегой.",
    tokens: ["Pozdravím", "kolegu", "."],
  },

  [phraseKey("spýtať sa", "запитати", "a1-34")]: {
    sk: "Chcem sa spýtať.",
    ua: "Я хочу запитати.",
    ru: "Я хочу спросить.",
    tokens: ["Chcem", "sa", "spýtať", "."],
  },

  [phraseKey("dohodnúť sa", "домовитися", "a1-34")]: {
    sk: "Musíme sa dohodnúť.",
    ua: "Нам потрібно домовитися.",
    ru: "Нам нужно договориться.",
    tokens: ["Musíme", "sa", "dohodnúť", "."],
  },

  // =========================
  // A1-35 — Місто (ситуації)
  // =========================

  [phraseKey("úrad", "установа", "a1-35")]: {
    sk: "Idem na úrad.",
    ua: "Я йду в установу.",
    ru: "Я иду в учреждение.",
    tokens: ["Idem", "na", "úrad", "."],
  },

  [phraseKey("kaderníctvo", "перукарня", "a1-35")]: {
    sk: "Idem do kaderníctva.",
    ua: "Я йду в перукарню.",
    ru: "Я иду в парикмахерскую.",
    tokens: ["Idem", "do", "kaderníctva", "."],
  },

  [phraseKey("pekáreň", "пекарня", "a1-35")]: {
    sk: "Kupujem chlieb v pekárni.",
    ua: "Я купую хліб у пекарні.",
    ru: "Я покупаю хлеб в пекарне.",
    tokens: ["Kupujem", "chlieb", "v", "pekárni", "."],
  },

  [phraseKey("cukráreň", "кондитерська", "a1-35")]: {
    sk: "Ideme do cukrárne.",
    ua: "Ми йдемо в кондитерську.",
    ru: "Мы идём в кондитерскую.",
    tokens: ["Ideme", "do", "cukrárne", "."],
  },

  [phraseKey("čerpacia stanica", "заправка", "a1-35")]: {
    sk: "Kde je čerpacia stanica?",
    ua: "Де заправка?",
    ru: "Где заправка?",
    tokens: ["Kde", "je", "čerpacia", "stanica", "?"],
  },

  [phraseKey("autobusová stanica", "автовокзал", "a1-35")]: {
    sk: "Kde je autobusová stanica?",
    ua: "Де автовокзал?",
    ru: "Где автовокзал?",
    tokens: ["Kde", "je", "autobusová", "stanica", "?"],
  },

  [phraseKey("železničná stanica", "залізничний вокзал", "a1-35")]: {
    sk: "Idem na železničnú stanicu.",
    ua: "Я йду на залізничний вокзал.",
    ru: "Я иду на железнодорожный вокзал.",
    tokens: ["Idem", "na", "železničnú", "stanicu", "."],
  },

  [phraseKey("križovatka", "перехрестя", "a1-35")]: {
    sk: "Na križovatke odbočte vľavo.",
    ua: "На перехресті поверніть ліворуч.",
    ru: "На перекрёстке поверните налево.",
    tokens: ["Na", "križovatke", "odbočte", "vľavo", "."],
  },

  [phraseKey("chodník", "тротуар", "a1-35")]: {
    sk: "Choďte po chodníku.",
    ua: "Ідіть по тротуару.",
    ru: "Идите по тротуару.",
    tokens: ["Choďte", "po", "chodníku", "."],
  },

  [phraseKey("podchod", "підземний перехід", "a1-35")]: {
    sk: "Prejdite cez podchod.",
    ua: "Перейдіть через підземний перехід.",
    ru: "Пройдите через подземный переход.",
    tokens: ["Prejdite", "cez", "podchod", "."],
  },

  // =========================
  // A1-36 — Транспорт (дії)
  // =========================

  [phraseKey("nastúpiť", "сісти", "a1-36")]: {
    sk: "Nastúpim do autobusu.",
    ua: "Я сяду в автобус.",
    ru: "Я сяду в автобус.",
    tokens: ["Nastúpim", "do", "autobusu", "."],
  },

  [phraseKey("vystúpiť", "вийти", "a1-36")]: {
    sk: "Vystúpim na ďalšej zastávke.",
    ua: "Я вийду на наступній зупинці.",
    ru: "Я выйду на следующей остановке.",
    tokens: ["Vystúpim", "na", "ďalšej", "zastávke", "."],
  },

  [phraseKey("prestúpiť", "пересісти", "a1-36")]: {
    sk: "Musím prestúpiť.",
    ua: "Мені треба пересісти.",
    ru: "Мне нужно пересесть.",
    tokens: ["Musím", "prestúpiť", "."],
  },

  [phraseKey("meškať", "запізнюватися", "a1-36")]: {
    sk: "Autobus mešká.",
    ua: "Автобус запізнюється.",
    ru: "Автобус опаздывает.",
    tokens: ["Autobus", "mešká", "."],
  },

  [phraseKey("čakať", "чекати", "a1-36")]: {
    sk: "Čakám na vlak.",
    ua: "Я чекаю на поїзд.",
    ru: "Я жду поезд.",
    tokens: ["Čakám", "na", "vlak", "."],
  },

  [phraseKey("odísť", "піти", "a1-36")]: {
    sk: "Musím odísť.",
    ua: "Мені треба піти.",
    ru: "Мне нужно уйти.",
    tokens: ["Musím", "odísť", "."],
  },

  [phraseKey("prísť", "прийти", "a1-36")]: {
    sk: "Prídem o piatej.",
    ua: "Я прийду о п’ятій.",
    ru: "Я приду в пять.",
    tokens: ["Prídem", "o", "piatej", "."],
  },

  [phraseKey("riadiť", "керувати", "a1-36")]: {
    sk: "Neviem riadiť auto.",
    ua: "Я не вмію керувати авто.",
    ru: "Я не умею водить машину.",
    tokens: ["Neviem", "riadiť", "auto", "."],
  },

  [phraseKey("parkovať", "паркувати", "a1-36")]: {
    sk: "Parkujem tu.",
    ua: "Я паркуюсь тут.",
    ru: "Я паркуюсь здесь.",
    tokens: ["Parkujem", "tu", "."],
  },

  [phraseKey("zastaviť", "зупинити", "a1-36")]: {
    sk: "Zastavte, prosím.",
    ua: "Зупиніться, будь ласка.",
    ru: "Остановитесь, пожалуйста.",
    tokens: ["Zastavte", ",", "prosím", "."],
  },

  // =========================
  // A1-37 — Плани
  // =========================

  [phraseKey("plán", "план", "a1-37")]: {
    sk: "Mám plán.",
    ua: "У мене є план.",
    ru: "У меня есть план.",
    tokens: ["Mám", "plán", "."],
  },

  [phraseKey("cieľ", "ціль", "a1-37")]: {
    sk: "Môj cieľ je jasný.",
    ua: "Моя ціль ясна.",
    ru: "Моя цель ясна.",
    tokens: ["Môj", "cieľ", "je", "jasný", "."],
  },

  [phraseKey("budúcnosť", "майбутнє", "a1-37")]: {
    sk: "Myslím na budúcnosť.",
    ua: "Я думаю про майбутнє.",
    ru: "Я думаю о будущем.",
    tokens: ["Myslím", "na", "budúcnosť", "."],
  },

  [phraseKey("pripraviť", "підготувати", "a1-37")]: {
    sk: "Musím sa pripraviť.",
    ua: "Мені треба підготуватися.",
    ru: "Мне нужно подготовиться.",
    tokens: ["Musím", "sa", "pripraviť", "."],
  },

  [phraseKey("budúci týždeň", "наступного тижня", "a1-37")]: {
    sk: "Uvidíme sa budúci týždeň.",
    ua: "Побачимось наступного тижня.",
    ru: "Увидимся на следующей неделе.",
    tokens: ["Uvidíme", "sa", "budúci", "týždeň", "."],
  },

  [phraseKey("dúfať", "сподіватися", "a1-37")]: {
    sk: "Dúfam, že to vyjde.",
    ua: "Сподіваюсь, що вийде.",
    ru: "Надеюсь, что получится.",
    tokens: ["Dúfam", ",", "že", "to", "vyjde", "."],
  },

  [phraseKey("rozhodnúť sa", "вирішити", "a1-37")]: {
    sk: "Rozhodol som sa.",
    ua: "Я вирішив.",
    ru: "Я решил.",
    tokens: ["Rozhodol", "som", "sa", "."],
  },

  [phraseKey("naplánovať", "запланувати", "a1-37")]: {
    sk: "Chcem to naplánovať.",
    ua: "Я хочу це запланувати.",
    ru: "Я хочу это запланировать.",
    tokens: ["Chcem", "to", "naplánovať", "."],
  },

  [phraseKey("termín", "термін", "a1-37")]: {
    sk: "Aký je termín?",
    ua: "Який термін?",
    ru: "Какой срок?",
    tokens: ["Aký", "je", "termín", "?"],
  },

  [phraseKey("pokračovať", "продовжити", "a1-37")]: {
    sk: "Môžeme pokračovať.",
    ua: "Можемо продовжити.",
    ru: "Можем продолжить.",
    tokens: ["Môžeme", "pokračovať", "."],
  },

  // =========================
  // A1-38 — Ситуації в магазині
  // =========================

  [phraseKey("reklamácia", "скарга / повернення", "a1-38")]: {
    sk: "Chcem urobiť reklamáciu.",
    ua: "Я хочу зробити рекламацію.",
    ru: "Я хочу сделать рекламацию.",
    tokens: ["Chcem", "urobiť", "reklamáciu", "."],
  },

  [phraseKey("tovar", "товар", "a1-38")]: {
    sk: "Tento tovar je poškodený.",
    ua: "Цей товар пошкоджений.",
    ru: "Этот товар повреждён.",
    tokens: ["Tento", "tovar", "je", "poškodený", "."],
  },

  [phraseKey("sklad", "склад", "a1-38")]: {
    sk: "Je to na sklade.",
    ua: "Це є на складі.",
    ru: "Это есть на складе.",
    tokens: ["Je", "to", "na", "sklade", "."],
  },

  [phraseKey("účtenka", "чек", "a1-38")]: {
    sk: "Máte účtenku?",
    ua: "У вас є чек?",
    ru: "У вас есть чек?",
    tokens: ["Máte", "účtenku", "?"],
  },

  [phraseKey("záruka", "гарантія", "a1-38")]: {
    sk: "Je na to záruka.",
    ua: "На це є гарантія.",
    ru: "На это есть гарантия.",
    tokens: ["Je", "na", "to", "záruka", "."],
  },

  [phraseKey("poškodený", "пошкоджений", "a1-38")]: {
    sk: "Je to poškodené.",
    ua: "Це пошкоджене.",
    ru: "Это повреждено.",
    tokens: ["Je", "to", "poškodené", "."],
  },

  [phraseKey("predavač", "продавець", "a1-38")]: {
    sk: "Predavač mi pomohol.",
    ua: "Продавець мені допоміг.",
    ru: "Продавец мне помог.",
    tokens: ["Predavač", "mi", "pomohol", "."],
  },

  [phraseKey("zákazník", "клієнт", "a1-38")]: {
    sk: "Zákazník čaká pri pokladni.",
    ua: "Клієнт чекає біля каси.",
    ru: "Клиент ждёт у кассы.",
    tokens: ["Zákazník", "čaká", "pri", "pokladni", "."],
  },

  [phraseKey("reklamovať", "рекламувати / подавати скаргу", "a1-38")]: {
    sk: "Chcem reklamovať tento tovar.",
    ua: "Я хочу поскаржитися на цей товар.",
    ru: "Я хочу подать рекламацию на этот товар.",
    tokens: ["Chcem", "reklamovať", "tento", "tovar", "."],
  },

  [phraseKey("výmena", "обмін", "a1-38")]: {
    sk: "Chcem výmenu.",
    ua: "Я хочу обмін.",
    ru: "Я хочу обмен.",
    tokens: ["Chcem", "výmenu", "."],
  },

  // =========================
  // A1-39 — Абстрактні слова
  // =========================

  [phraseKey("život", "життя", "a1-39")]: {
    sk: "Život je krátky.",
    ua: "Життя коротке.",
    ru: "Жизнь короткая.",
    tokens: ["Život", "je", "krátky", "."],
  },

  [phraseKey("čas", "час", "a1-39")]: {
    sk: "Nemám čas.",
    ua: "У мене немає часу.",
    ru: "У меня нет времени.",
    tokens: ["Nemám", "čas", "."],
  },

  [phraseKey("možnosť", "можливість", "a1-39")]: {
    sk: "Mám možnosť vybrať si.",
    ua: "У мене є можливість вибрати.",
    ru: "У меня есть возможность выбрать.",
    tokens: ["Mám", "možnosť", "vybrať", "si", "."],
  },

  [phraseKey("dôvod", "причина", "a1-39")]: {
    sk: "Aký je dôvod?",
    ua: "Яка причина?",
    ru: "Какая причина?",
    tokens: ["Aký", "je", "dôvod", "?"],
  },

  [phraseKey("význam", "значення", "a1-39")]: {
    sk: "Aký to má význam?",
    ua: "Яке це має значення?",
    ru: "Какое это имеет значение?",
    tokens: ["Aký", "to", "má", "význam", "?"],
  },

  [phraseKey("pravda", "правда", "a1-39")]: {
    sk: "To je pravda.",
    ua: "Це правда.",
    ru: "Это правда.",
    tokens: ["To", "je", "pravda", "."],
  },

  // ⚠️ ВАЖЛИВО: у словнику в тебе "lož" (без ť) — це не стандартно.
  // Правильно слово: "lož" = "постіль/ложе", а "брехня" = "lož" у чеській, але в словацькій — "lož" як "lož" (archaic) / краще "lož" не використовувати.
  // Найкраще замінити sk на "lož" -> "lož" ??? або виправити на "lož" / "lož"? Нормально по-словацьки: "lož" не те.
  // Я роблю фразу під ТВОЄ sk (щоб ключі не зламались), але рекомендую виправити sk на "lož" -> "lož" НЕ ОК. Найкраще: "lož" замінити на "lož"?? (дивись нижче).
  [phraseKey("lož", "брехня", "a1-39")]: {
    sk: "To nie je pravda, je to lož.",
    ua: "Це не правда, це брехня.",
    ru: "Это не правда, это ложь.",
    tokens: ["To", "nie", "je", "pravda", ",", "je", "to", "lož", "."],
  },

  [phraseKey("úspech", "успіх", "a1-39")]: {
    sk: "To je úspech.",
    ua: "Це успіх.",
    ru: "Это успех.",
    tokens: ["To", "je", "úspech", "."],
  },

  [phraseKey("neúspech", "невдача", "a1-39")]: {
    sk: "To bol neúspech.",
    ua: "Це була невдача.",
    ru: "Это была неудача.",
    tokens: ["To", "bol", "neúspech", "."],
  },

  [phraseKey("skúsenosť", "досвід", "a1-39")]: {
    sk: "Mám skúsenosť.",
    ua: "У мене є досвід.",
    ru: "У меня есть опыт.",
    tokens: ["Mám", "skúsenosť", "."],
  },

  // =========================
  // A1-40 — Повторення A1
  // =========================

  [phraseKey("učiť sa", "вчитися", "a1-40")]: {
    sk: "Učím sa po slovensky.",
    ua: "Я вчуся словацької.",
    ru: "Я учу словацкий.",
    tokens: ["Učím", "sa", "po", "slovensky", "."],
  },

  [phraseKey("cestovať", "подорожувати", "a1-40")]: {
    sk: "Rád cestujem.",
    ua: "Я люблю подорожувати.",
    ru: "Я люблю путешествовать.",
    tokens: ["Rád", "cestujem", "."],
  },

  [phraseKey("pomôcť", "допомогти", "a1-40")]: {
    sk: "Môžem vám pomôcť?",
    ua: "Можу вам допомогти?",
    ru: "Могу вам помочь?",
    tokens: ["Môžem", "vám", "pomôcť", "?"],
  },

  [phraseKey("písať", "писати", "a1-40")]: {
    sk: "Píšem správu.",
    ua: "Я пишу повідомлення.",
    ru: "Я пишу сообщение.",
    tokens: ["Píšem", "správu", "."],
  },

  [phraseKey("vrátiť sa", "повернутися", "a1-40")]: {
    sk: "Vrátim sa domov.",
    ua: "Я повернуся додому.",
    ru: "Я вернусь домой.",
    tokens: ["Vrátim", "sa", "domov", "."],
  },

  [phraseKey("zostať", "залишитися", "a1-40")]: {
    sk: "Zostanem tu.",
    ua: "Я залишуся тут.",
    ru: "Я останусь здесь.",
    tokens: ["Zostanem", "tu", "."],
  },

  [phraseKey("zmeniť", "змінити", "a1-40")]: {
    sk: "Chcem to zmeniť.",
    ua: "Я хочу це змінити.",
    ru: "Я хочу это изменить.",
    tokens: ["Chcem", "to", "zmeniť", "."],
  },

  [phraseKey("ukázať", "показати", "a1-40")]: {
    sk: "Ukážem vám to.",
    ua: "Я покажу вам це.",
    ru: "Я покажу вам это.",
    tokens: ["Ukážem", "vám", "to", "."],
  },

  [phraseKey("niesť", "нести", "a1-40")]: {
    sk: "Nesiem tašku.",
    ua: "Я несу сумку.",
    ru: "Я несу сумку.",
    tokens: ["Nesiem", "tašku", "."],
  },

  [phraseKey("sedieť", "сидіти", "a1-40")]: {
    sk: "Sedím na stoličke.",
    ua: "Я сиджу на стільці.",
    ru: "Я сижу на стуле.",
    tokens: ["Sedím", "na", "stoličke", "."],
  },
};
