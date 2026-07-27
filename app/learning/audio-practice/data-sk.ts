import type { AudioPracticeItem } from "./types";
import { q, text } from "./helpers";

export const SLOVAK_AUDIO_PRACTICE_ITEMS: AudioPracticeItem[] = [
  {
    id: "sk-a0-audio-01",
    slug: "moj-den",
    courseId: "sk",
    band: "a0",
    title: text("Môj deň", "Môj deň", "Môj deň"),
    description: text(
      "Простий словацький текст про звичайний день.",
      "Простой словацкий текст про обычный день.",
      "A simple Slovak text about an ordinary day.",
    ),
    audioSrc: "/audio/practice/sk/a0/sk-a0-listening-01-my-day.mp3",
    durationLabel: "0:39",
    transcript: `Dobrý deň.
Volám sa Adam.
Som doma.
Dnes je pondelok.
Ráno vstávam o siedmej.
Najprv pijem vodu.
Potom jem chlieb so syrom.
Moja mama je v kuchyni.
Môj otec je v práci.
Mám malú izbu.
V izbe je stôl, stolička a posteľ.
Na stole je kniha.
Dnes idem do školy.
V škole mám slovenčinu.
Učiteľ hovorí pomaly.
Ja počúvam a opakujem.
Po škole idem domov.
Večer jem polievku.
Potom čítam krátky text.
Toto je môj deň.`,
    questions: [
      q(
        text(
          "Як звати героя тексту?",
          "Как зовут героя текста?",
          "What is the speaker's name?",
        ),
        [
          text("Peter", "Peter", "Peter"),
          text("Adam", "Adam", "Adam"),
          text("Marek", "Marek", "Marek"),
        ],
        1,
      ),
      q(
        text(
          "Де Adam на початку тексту?",
          "Где Adam в начале текста?",
          "Where is Adam at the beginning?",
        ),
        [
          text("У магазині", "В магазине", "In a shop"),
          text("У школі", "В школе", "At school"),
          text("Вдома", "Дома", "At home"),
        ],
        2,
      ),
      q(
        text(
          "Що Adam робить у школі?",
          "Что Adam делает в школе?",
          "What does Adam do at school?",
        ),
        [
          text("Слухає і повторює", "Слушает и повторяет", "Listens and repeats"),
          text("Купує яблука", "Покупает яблоки", "Buys apples"),
          text("Читає меню", "Читает меню", "Reads a menu"),
        ],
        0,
      ),
      q(
        text(
          "Що є на столі?",
          "Что лежит на столе?",
          "What is on the table?",
        ),
        [
          text("Телефон", "Телефон", "A phone"),
          text("Книга", "Книга", "A book"),
          text("Сир", "Сыр", "Cheese"),
        ],
        1,
      ),
    ],
  },
  {
    id: "sk-a0-audio-02",
    slug: "v-obchode",
    courseId: "sk",
    band: "a0",
    title: text("V obchode", "V obchode", "V obchode"),
    description: text(
      "Словацький A0 текст про покупки в магазині.",
      "Словацкий A0 текст о покупках в магазине.",
      "A Slovak A0 text about shopping in a store.",
    ),
    audioSrc: "/audio/practice/sk/a0/sk-a0-audio-02-v-obchode.mp3",
    durationLabel: "1:12",
    transcript: `Dnes idem do obchodu.
Obchod je blízko môjho domu.
Ráno si beriem tašku.
V taške mám peňaženku.
Na ulici je ticho.
Idem pomaly a pozerám sa okolo seba.
Pred obchodom stojí jedna žena.
Vchádzam do obchodu.
V obchode je veľa ľudí.
Najprv hľadám chlieb.
Chlieb je na polici vľavo.
Potom beriem mlieko.
Mlieko je v chladničke.
Chcem kúpiť aj syr.
Syr je vedľa masla.
Potom vidím jablká.
Jablká sú červené a zelené.
Beriem tri jablká.
Potrebujem ešte vodu.
Voda je na konci obchodu.
Mám chlieb, mlieko, syr, jablká a vodu.
Idem k pokladni.
Predo mnou stojí starý muž.
Čakám a počúvam.
Predavačka hovorí dobrý deň.
Ja hovorím dobrý deň.
Platím kartou.
Predavačka mi dáva bloček.
Dávam veci do tašky.
Potom idem domov.
Doma dávam jedlo na stôl.
Som spokojný.
Dnes mám všetko, čo potrebujem.`,
    questions: [
      q(
        text(
          "Куди йде герой?",
          "Куда идёт герой?",
          "Where is the speaker going?",
        ),
        [
          text("До школи", "В школу", "To school"),
          text("До магазину", "В магазин", "To the shop"),
          text("До парку", "В парк", "To the park"),
        ],
        1,
      ),
      q(
        text(
          "Що герой шукає спочатку?",
          "Что герой ищет сначала?",
          "What does the speaker look for first?",
        ),
        [
          text("Хліб", "Хлеб", "Bread"),
          text("Масло", "Масло", "Butter"),
          text("Каву", "Кофе", "Coffee"),
        ],
        0,
      ),
      q(
        text(
          "Скільки яблук бере герой?",
          "Сколько яблок берёт герой?",
          "How many apples does the speaker take?",
        ),
        [
          text("Одне яблуко", "Одно яблоко", "One apple"),
          text("Пʼять яблук", "Пять яблок", "Five apples"),
          text("Три яблука", "Три яблока", "Three apples"),
        ],
        2,
      ),
      q(
        text(
          "Як герой платить?",
          "Как герой платит?",
          "How does the speaker pay?",
        ),
        [
          text("Готівкою", "Наличными", "In cash"),
          text("Карткою", "Картой", "By card"),
          text("Він не платить", "Он не платит", "He does not pay"),
        ],
        1,
      ),
    ],
  },
  {
    id: "sk-a1-audio-01",
    slug: "novy-sused",
    courseId: "sk",
    band: "a1",
    title: text("Nový sused", "Nový sused", "Nový sused"),
    description: text(
      "Словацький A1 текст про нового сусіда.",
      "Словацкий A1 текст о новом соседе.",
      "A Slovak A1 text about a new neighbour.",
    ),
    audioSrc: "/audio/practice/sk/a1/sk-a1-audio-01-novy-sused.mp3",
    durationLabel: "1:00",
    transcript: `Včera večer sa do nášho domu prisťahoval nový sused.
Volá sa Peter a má dvadsaťosem rokov.
Prišiel z menšieho mesta na východe Slovenska, pretože tu našiel novú prácu.
Keď som ho stretol pri vchode, niesol veľkú tašku a dve ťažké krabice.
Spýtal som sa ho, či nepotrebuje pomoc.
Peter sa usmial a povedal, že bude rád.
Spolu sme odniesli krabice na tretie poschodie.
Výťah nefungoval, takže sme išli po schodoch.
V jednej krabici mal knihy, v druhej riad do kuchyne.
Byt ešte nebol úplne pripravený.
V izbe stál iba stôl, stará stolička a malá posteľ.
Peter povedal, že cez víkend kúpi skriňu, lampu a koberec.
Potom mi ukázal fotku svojho psa.
Pes sa volá Max a príde o týždeň, keď bude byt hotový.
Peter má rád tiché miesta, dobrú kávu a dlhé prechádzky.
Povedal, že ešte nepozná naše mesto.
Navrhol som mu, že mu v sobotu ukážem park, obchod, lekáreň a autobusovú zastávku.
Peter povedal, že to bude pre neho veľmi užitočné.
Na konci večera mi poďakoval.
Myslím, že bude dobrý sused.`,
    questions: [
      q(
        text(
          "Як звати нового сусіда?",
          "Как зовут нового соседа?",
          "What is the new neighbour's name?",
        ),
        [
          text("Max", "Max", "Max"),
          text("Peter", "Peter", "Peter"),
          text("Adam", "Adam", "Adam"),
        ],
        1,
      ),
      q(
        text(
          "Скільки років Peter?",
          "Сколько лет Peter?",
          "How old is Peter?",
        ),
        [
          text("18", "18", "18"),
          text("28", "28", "28"),
          text("38", "38", "38"),
        ],
        1,
      ),
      q(
        text(
          "Чому вони йшли сходами?",
          "Почему они шли по лестнице?",
          "Why did they use the stairs?",
        ),
        [
          text("Ліфт не працював", "Лифт не работал", "The lift did not work"),
          text("Не було ключа", "Не было ключа", "There was no key"),
          text("Було темно", "Было темно", "It was dark"),
        ],
        0,
      ),
      q(
        text(
          "Що було в одній коробці?",
          "Что было в одной коробке?",
          "What was in one box?",
        ),
        [
          text("Одяг", "Одежда", "Clothes"),
          text("Книги", "Книги", "Books"),
          text("Іграшки", "Игрушки", "Toys"),
        ],
        1,
      ),
      q(
        text(
          "Як звати собаку Peterа?",
          "Как зовут собаку Peterа?",
          "What is Peter's dog's name?",
        ),
        [
          text("Marek", "Marek", "Marek"),
          text("Peter", "Peter", "Peter"),
          text("Max", "Max", "Max"),
        ],
        2,
      ),
    ],
  },
  {
    id: "sk-a1-audio-02",
    slug: "vylet-vlakom",
    courseId: "sk",
    band: "a1",
    title: text("Výlet vlakom", "Výlet vlakom", "Výlet vlakom"),
    description: text(
      "Словацький A1 текст про коротку поїздку потягом.",
      "Словацкий A1 текст о короткой поездке на поезде.",
      "A Slovak A1 text about a short train trip.",
    ),
    audioSrc: "/audio/practice/sk/a1/sk-a1-audio-02-vylet-vlakom.mp3",
    durationLabel: "1:05",
    transcript: `V sobotu chce Lucia navštíviť svoju kamarátku v inom meste.
Ráno si pripraví batoh a skontroluje cestovný lístok.
Do batohu dá vodu, sendvič, slúchadlá a malý zošit.
Na stanicu ide pešo, pretože býva blízko centra.
Na stanici je veľa ľudí, ale Lucia má dosť času.
Najprv sa pozrie na tabuľu s odchodmi.
Jej vlak ide z druhej koľaje o deviatej pätnásť.
Lucia si kúpi kávu a čaká na nástupišti.
Keď vlak príde, nájde si miesto pri okne.
Vedľa nej sedí staršia pani s malým kufrom.
Počas cesty Lucia počúva hudbu a pozerá sa von.
Vidí polia, dediny, les a malé rieky.
Po jednej hodine vystúpi v centre mesta.
Kamarátka Eva ju čaká pred stanicou.
Spolu idú do malej kaviarne pri námestí.
Objednajú si čaj a čokoládový koláč.
Potom sa prechádzajú po meste a rozprávajú sa o škole, práci a plánoch na leto.
Eva ukáže Lucii starý most a peknú ulicu s farebnými domami.
Lucia si urobí niekoľko fotiek, aby si výlet zapamätala.
Večer sa Lucia vracia domov unavená, ale spokojná.
Bol to krátky, ale veľmi príjemný výlet.`,
    questions: [
      q(
        text(
          "Кого Lucia хоче відвідати?",
          "Кого Lucia хочет навестить?",
          "Who does Lucia want to visit?",
        ),
        [
          text("Подругу", "Подругу", "Her friend"),
          text("Маму", "Маму", "Her mother"),
          text("Вчителя", "Учителя", "Her teacher"),
        ],
        0,
      ),
      q(
        text(
          "Що Lucia кладе в рюкзак?",
          "Что Lucia кладёт в рюкзак?",
          "What does Lucia put in her backpack?",
        ),
        [
          text("Парасольку", "Зонт", "An umbrella"),
          text("Воду, сендвіч і навушники", "Воду, сэндвич и наушники", "Water, a sandwich and headphones"),
          text("Тільки телефон", "Только телефон", "Only a phone"),
        ],
        1,
      ),
      q(
        text(
          "З якої колії їде її потяг?",
          "С какого пути едет её поезд?",
          "Which track does her train leave from?",
        ),
        [
          text("З першої", "С первого", "From the first"),
          text("З третьої", "С третьего", "From the third"),
          text("З другої", "Со второго", "From the second"),
        ],
        2,
      ),
      q(
        text(
          "Де Eva чекає Luciu?",
          "Где Eva ждёт Luciu?",
          "Where is Eva waiting for Lucia?",
        ),
        [
          text("Перед станцією", "Перед станцией", "In front of the station"),
          text("У школі", "В школе", "At school"),
          text("У магазині", "В магазине", "In the shop"),
        ],
        0,
      ),
      q(
        text(
          "Що Lucia фотографує?",
          "Что Lucia фотографирует?",
          "What does Lucia take photos of?",
        ),
        [
          text("Потяг і квиток", "Поезд и билет", "The train and ticket"),
          text("Старий міст і гарну вулицю", "Старый мост и красивую улицу", "An old bridge and a nice street"),
          text("Тільки каву", "Только кофе", "Only coffee"),
        ],
        1,
      ),
    ],
  },
  {
    id: "sk-a2-audio-01",
    slug: "hladanie-noveho-bytu",
    courseId: "sk",
    band: "a2",
    title: text(
      "Hľadanie nového bytu",
      "Hľadanie nového bytu",
      "Hľadanie nového bytu",
    ),
    description: text(
      "Словацький A2 текст про пошук нового житла.",
      "Словацкий A2 текст о поиске нового жилья.",
      "A Slovak A2 text about looking for a new home.",
    ),
    audioSrc: "/audio/practice/sk/a2/sk-a2-audio-01-hladanie-noveho-bytu.mp3",
    transcript: `Minulý týždeň sa Martin rozhodol nájsť si nový byt, pretože jeho súčasný byt bol ďaleko od práce.
Každý deň cestoval autobusom skoro štyridsať minút a večer sa často vracal unavený.
Na internete našiel inzerát na dvojizbový byt blízko centra.
Byt bol zariadený a cena bola päťsto dvadsať eur mesačne vrátane energií.
Internet však nebol v cene.
Martin zavolal majiteľovi a dohodol si obhliadku na nasledujúci deň o šiestej večer.
Keď prišiel na adresu, majiteľ mu ukázal kuchyňu, obývačku, spálňu aj malý balkón.
Byt bol čistý a svetlý, ale práčka bola dosť stará a chladnička bola trochu hlučná.
Martin sa spýtal, či je možné pripojiť rýchly internet a či môže mať v byte psa.
Majiteľ povedal, že internet si môže objednať sám a pes nie je problém, ak nebude ničiť nábytok.
Pred nasťahovaním bolo potrebné zaplatiť depozit a nájomné za prvý mesiac.
Martinovi sa byt páčil, ale chcel si všetko ešte premyslieť.
Cestou domov porovnal túto ponuku s iným bytom, ktorý bol lacnejší, ale nachádzal sa ďaleko od práce a nemal balkón.
Nakoniec si uvedomil, že prvý byt je pre neho praktickejší.
Na druhý deň ráno zavolal majiteľovi a povedal, že má o byt záujem.
Dohodli sa, že v piatok podpíšu zmluvu a Martin sa nasťahuje na začiatku budúceho mesiaca.`,
    questions: [
      q(
        text(
          "Чому Martin шукав нову квартиру?",
          "Почему Martin искал новую квартиру?",
          "Why was Martin looking for a new apartment?",
        ),
        [
          text(
            "Його квартира була далеко від роботи",
            "Его квартира была далеко от работы",
            "His apartment was far from work",
          ),
          text(
            "Йому не подобався центр",
            "Ему не нравился центр",
            "He did not like the city centre",
          ),
          text(
            "Він хотів жити з другом",
            "Он хотел жить с другом",
            "He wanted to live with a friend",
          ),
        ],
        0,
      ),
      q(
        text(
          "Скільки коштувала квартира на місяць?",
          "Сколько стоила квартира в месяц?",
          "How much did the apartment cost per month?",
        ),
        [
          text("420 євро", "420 евро", "420 euros"),
          text("520 євро", "520 евро", "520 euros"),
          text("620 євро", "620 евро", "620 euros"),
        ],
        1,
      ),
      q(
        text(
          "Що не входило у вартість оренди?",
          "Что не входило в стоимость аренды?",
          "What was not included in the rent?",
        ),
        [
          text("Електроенергія", "Электроэнергия", "Electricity"),
          text("Вода", "Вода", "Water"),
          text("Інтернет", "Интернет", "Internet"),
        ],
        2,
      ),
      q(
        text(
          "За якої умови Martin міг тримати в квартирі собаку?",
          "При каком условии Martin мог держать в квартире собаку?",
          "Under what condition could Martin keep a dog in the apartment?",
        ),
        [
          text(
            "Якщо собака не псуватиме меблі",
            "Если собака не будет портить мебель",
            "If the dog did not damage the furniture",
          ),
          text(
            "Якщо собака житиме на балконі",
            "Если собака будет жить на балконе",
            "If the dog lived on the balcony",
          ),
          text(
            "Якщо Martin платитиме більше",
            "Если Martin будет платить больше",
            "If Martin paid more",
          ),
        ],
        0,
      ),
      q(
        text(
          "Коли Martin мав підписати договір?",
          "Когда Martin должен был подписать договор?",
          "When was Martin going to sign the contract?",
        ),
        [
          text("У понеділок", "В понедельник", "On Monday"),
          text("У пʼятницю", "В пятницу", "On Friday"),
          text("На початку місяця", "В начале месяца", "At the beginning of the month"),
        ],
        1,
      ),
    ],
  },
  {
    id: "sk-a2-audio-02",
    slug: "vylet-ktory-nevysiel-podla-planu",
    courseId: "sk",
    band: "a2",
    title: text(
      "Výlet, ktorý nevyšiel podľa plánu",
      "Výlet, ktorý nevyšiel podľa plánu",
      "Výlet, ktorý nevyšiel podľa plánu",
    ),
    description: text(
      "Словацький A2 текст про поїздку в гори, яка пішла не за планом.",
      "Словацкий A2 текст о поездке в горы, которая пошла не по плану.",
      "A Slovak A2 text about a mountain trip that did not go as planned.",
    ),
    audioSrc: "/audio/practice/sk/a2/sk-a2-audio-02-vylet-ktory-nevysiel-podla-planu.mp3",
    transcript: `V sobotu ráno sa Lucia rozhodla ísť s kamarátkou na výlet do hôr.
Počasie malo byť pekné, preto si pripravili malé batohy, vodu, jedlo a ľahké bundy.
Na autobusovej stanici sa stretli o pol ôsmej a o chvíľu už cestovali do malej dediny pod horami.
Keď vystúpili z autobusu, slnko svietilo a bolo príjemne teplo.
Najprv išli po širokej ceste popri rieke.
Neskôr však začala byť cesta strmšia a Lucia si uvedomila, že zabudla doma mapu.
Našťastie mala v telefóne aplikáciu, ktorá im ukázala správny smer.
Asi po hodine sa obloha zatiahla a začalo slabo pršať.
Dievčatá si obliekli bundy a pokračovali ďalej.
Chceli sa dostať k malej horskej chate, kde si plánovali dať teplý čaj.
Keď prišli k chate, zistili, že je zatvorená.
Na dverách bol oznam, že majiteľ je chorý.
Lucia a jej kamarátka boli sklamané, ale rozhodli sa, že sa vrátia späť do dediny.
Cestou dole pršať prestalo a medzi stromami sa objavila krásna dúha.
Hoci výlet nevyšiel podľa plánu, obe sa zhodli, že to bol zaujímavý deň.
Večer si ešte dali večeru v malej reštaurácii pri stanici a domov sa vrátili unavené, ale spokojné.`,
    questions: [
      q(
        text(
          "З ким Lucia поїхала в гори?",
          "С кем Lucia поехала в горы?",
          "Who did Lucia go to the mountains with?",
        ),
        [
          text("З сестрою", "С сестрой", "With her sister"),
          text("З подругою", "С подругой", "With her friend"),
          text("З колегою", "С коллегой", "With her colleague"),
        ],
        1,
      ),
      q(
        text(
          "Що Lucia забула вдома?",
          "Что Lucia забыла дома?",
          "What did Lucia forget at home?",
        ),
        [
          text("Мапу", "Карту", "A map"),
          text("Телефон", "Телефон", "Her phone"),
          text("Куртку", "Куртку", "A jacket"),
        ],
        0,
      ),
      q(
        text(
          "Що сталося з погодою приблизно через годину?",
          "Что случилось с погодой примерно через час?",
          "What happened to the weather after about an hour?",
        ),
        [
          text(
            "Почав падати сніг",
            "Начал падать снег",
            "It started snowing",
          ),
          text(
            "Стало дуже спекотно",
            "Стало очень жарко",
            "It became very hot",
          ),
          text(
            "Небо затягнулося і почався слабкий дощ",
            "Небо затянуло и начался небольшой дождь",
            "The sky clouded over and it started raining lightly",
          ),
        ],
        2,
      ),
      q(
        text(
          "Чому гірська хата була зачинена?",
          "Почему горный домик был закрыт?",
          "Why was the mountain hut closed?",
        ),
        [
          text(
            "Власник був хворий",
            "Владелец был болен",
            "The owner was ill",
          ),
          text(
            "У них не було грошей",
            "У них не было денег",
            "They had no money",
          ),
          text(
            "Вони прийшли надто пізно",
            "Они пришли слишком поздно",
            "They arrived too late",
          ),
        ],
        0,
      ),
      q(
        text(
          "Що дівчата побачили дорогою назад?",
          "Что девушки увидели по дороге обратно?",
          "What did the girls see on the way back?",
        ),
        [
          text("Водоспад", "Водопад", "A waterfall"),
          text("Веселку", "Радугу", "A rainbow"),
          text("Оленя", "Оленя", "A deer"),
        ],
        1,
      ),
    ],
  },
];
