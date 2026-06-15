import type { CefrBandId, LocalizedText } from "@/app/learning/data";
import type { CourseId } from "@/app/learning/courses/registry";

export type AudioPracticeQuestion = {
  question: LocalizedText;
  answers: LocalizedText[];
  correctIndex: number;
};

export type AudioPracticeItem = {
  id: string;
  slug: string;
  courseId: CourseId;
  band: CefrBandId;
  title: LocalizedText;
  description: LocalizedText;
  audioSrc: string;
  durationLabel?: string;
  transcript: string;
  questions: AudioPracticeQuestion[];
};

const COURSE_IDS = ["sk", "cs", "pl"] as const;
const BAND_IDS = ["a0", "a1", "a2", "b1", "b2"] as const;

export function isAudioCourseId(value: string): value is CourseId {
  return (COURSE_IDS as readonly string[]).includes(value);
}

export function isAudioBandId(value: string): value is CefrBandId {
  return (BAND_IDS as readonly string[]).includes(value);
}

function text(ua: string, ru: string, en: string): LocalizedText {
  return { ua, ru, en };
}

function q(
  question: LocalizedText,
  answers: LocalizedText[],
  correctIndex: number,
): AudioPracticeQuestion {
  return { question, answers, correctIndex };
}

export const AUDIO_PRACTICE_ITEMS: AudioPracticeItem[] = [
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
    id: "pl-a0-audio-01",
    slug: "moj-dzien",
    courseId: "pl",
    band: "a0",
    title: text("Mój dzień", "Mój dzień", "Mój dzień"),
    description: text(
      "Простий польський A0 текст про день.",
      "Простой польский A0 текст про день.",
      "A simple Polish A0 text about a day.",
    ),
    audioSrc: "/audio/practice/pl/a0/pl-a0-audio-01-moj-dzien.mp3",
    durationLabel: "0:42",
    transcript: `Dzień dobry.
Mam na imię Adam.
Jestem w domu.
Dzisiaj jest poniedziałek.
Rano wstaję o siódmej.
Najpierw piję wodę.
Potem jem chleb z serem.
Moja mama jest w kuchni.
Mój tata jest w pracy.
Mam mały pokój.
W pokoju jest stół, krzesło i łóżko.
Na stole leży książka.
Dzisiaj idę do szkoły.
W szkole uczę się polskiego.
Nauczyciel mówi powoli.
Ja słucham i powtarzam.
Po szkole idę do domu.
Wieczorem jem zupę.
Potem czytam krótki tekst.
To jest mój dzień.`,
    questions: [
      q(
        text(
          "Як звати героя тексту?",
          "Как зовут героя текста?",
          "What is the speaker's name?",
        ),
        [
          text("Adam", "Adam", "Adam"),
          text("Marek", "Marek", "Marek"),
          text("Tomáš", "Tomáš", "Tomáš"),
        ],
        0,
      ),
      q(
        text(
          "Який сьогодні день?",
          "Какой сегодня день?",
          "What day is it today?",
        ),
        [
          text("Субота", "Суббота", "Saturday"),
          text("Понеділок", "Понедельник", "Monday"),
          text("Неділя", "Воскресенье", "Sunday"),
        ],
        1,
      ),
      q(
        text(
          "Що лежить на столі?",
          "Что лежит на столе?",
          "What is on the table?",
        ),
        [
          text("Книга", "Книга", "A book"),
          text("Телефон", "Телефон", "A phone"),
          text("Яблуко", "Яблоко", "An apple"),
        ],
        0,
      ),
      q(
        text(
          "Що Adam робить у школі?",
          "Что Adam делает в школе?",
          "What does Adam do at school?",
        ),
        [
          text("Купує хліб", "Покупает хлеб", "Buys bread"),
          text("Грає у футбол", "Играет в футбол", "Plays football"),
          text("Вчить польську", "Учит польский", "Learns Polish"),
        ],
        2,
      ),
    ],
  },
  {
    id: "pl-a0-audio-02",
    slug: "w-parku",
    courseId: "pl",
    band: "a0",
    title: text("W parku", "W parku", "W parku"),
    description: text(
      "Польський A0 текст про прогулянку в парку.",
      "Польский A0 текст о прогулке в парке.",
      "A Polish A0 text about a walk in the park.",
    ),
    audioSrc: "/audio/practice/pl/a0/pl-a0-audio-02-w-parku.mp3",
    durationLabel: "1:05",
    transcript: `Dzisiaj idę do parku.
Park jest duży i zielony.
Niebo jest jasne.
Jest ciepły dzień.
Mam na sobie kurtkę i wygodne buty.
Idę wolno ścieżką.
Po lewej stronie widzę drzewa.
Po prawej stronie jest małe jezioro.
Na ławce siedzi starsza pani.
Ona czyta książkę.
Obok niej leży mała torba.
Dalej widzę chłopca.
Chłopiec ma czerwony rower.
Jego tata stoi obok niego.
Oni rozmawiają i śmieją się.
Przy jeziorze są kaczki.
Jedna kaczka pływa blisko brzegu.
Dzieci patrzą na kaczki.
Ja też patrzę i uśmiecham się.
Potem spotykam mojego kolegę.
On ma na imię Marek.
Marek ma psa.
Pies jest mały i bardzo szybki.
Pies biega po trawie.
Marek mówi, że pies lubi park.
My idziemy razem dalej.
Rozmawiamy po polsku.
Ja mówię powoli.
Marek słucha i pomaga mi.
Potem siadamy na ławce.
Piję wodę z małej butelki.
Marek je jabłko.
W parku jest spokojnie.
Lubię ten park.
To jest dobre miejsce na spacer.`,
    questions: [
      q(
        text(
          "Куди йде герой?",
          "Куда идёт герой?",
          "Where is the speaker going?",
        ),
        [
          text("До магазину", "В магазин", "To the shop"),
          text("До парку", "В парк", "To the park"),
          text("До школи", "В школу", "To school"),
        ],
        1,
      ),
      q(
        text(
          "Що є праворуч від героя?",
          "Что находится справа от героя?",
          "What is on the speaker's right side?",
        ),
        [
          text("Мале озеро", "Маленькое озеро", "A small lake"),
          text("Великий вокзал", "Большой вокзал", "A big station"),
          text("Старий міст", "Старый мост", "An old bridge"),
        ],
        0,
      ),
      q(
        text(
          "Що робить старша пані на лавці?",
          "Что делает пожилая женщина на лавочке?",
          "What is the older woman doing on the bench?",
        ),
        [
          text("Пʼє воду", "Пьёт воду", "Drinks water"),
          text("Читає книгу", "Читает книгу", "Reads a book"),
          text("Говорить телефоном", "Говорит по телефону", "Talks on the phone"),
        ],
        1,
      ),
      q(
        text(
          "Як звати друга героя?",
          "Как зовут друга героя?",
          "What is the speaker's friend's name?",
        ),
        [
          text("Adam", "Adam", "Adam"),
          text("Tomáš", "Tomáš", "Tomáš"),
          text("Marek", "Marek", "Marek"),
        ],
        2,
      ),
      q(
        text(
          "Що Marek їсть?",
          "Что ест Marek?",
          "What does Marek eat?",
        ),
        [
          text("Яблуко", "Яблоко", "An apple"),
          text("Хліб", "Хлеб", "Bread"),
          text("Сир", "Сыр", "Cheese"),
        ],
        0,
      ),
    ],
  },
  {
    id: "cs-a0-audio-01",
    slug: "v-knihovne",
    courseId: "cs",
    band: "a0",
    title: text("V knihovně", "V knihovně", "V knihovně"),
    description: text(
      "Чеський A0 текст про похід до бібліотеки.",
      "Чешский A0 текст о походе в библиотеку.",
      "A Czech A0 text about going to the library.",
    ),
    audioSrc: "/audio/practice/cs/a0/cs-a0-audio-01-v-knihovne.mp3",
    durationLabel: "0:55",
    transcript: `Dnes je sobota.
Jana je doma.
Chce jít ven.
Bere si kabát a boty.
Venku je trochu zima.
Na ulici je autobusová zastávka.
Jana čeká na autobus.
Vedle ní stojí mladý muž.
V ruce má telefon.
Autobus přijíždí.
Jana nastupuje do autobusu.
Sedí u okna.
Dívá se na město.
Vidí školu, obchod a malý park.
Po deseti minutách vystupuje.
Jde do knihovny.
Knihovna je tichá a světlá.
Jana hledá jednoduchou knihu.
Paní v knihovně jí pomáhá.
Jana říká děkuji.
Potom sedí u stolu.
Čte krátký text česky.
Některá slova jsou nová.
Jana píše slova do sešitu.
Pak jde domů.
Doma pije čaj.
Večer opakuje nová slova.
Jana má radost.
Čeština je pro ni zajímavá.`,
    questions: [
      q(
        text(
          "Який сьогодні день?",
          "Какой сегодня день?",
          "What day is it today?",
        ),
        [
          text("Понеділок", "Понедельник", "Monday"),
          text("Субота", "Суббота", "Saturday"),
          text("Пʼятниця", "Пятница", "Friday"),
        ],
        1,
      ),
      q(
        text(
          "На що Jana чекає?",
          "Чего ждёт Jana?",
          "What is Jana waiting for?",
        ),
        [
          text("На автобус", "Автобус", "A bus"),
          text("На поїзд", "Поезд", "A train"),
          text("На подругу", "Подругу", "A friend"),
        ],
        0,
      ),
      q(
        text(
          "Куди Jana йде після автобуса?",
          "Куда Jana идёт после автобуса?",
          "Where does Jana go after the bus?",
        ),
        [
          text("До ресторану", "В ресторан", "To a restaurant"),
          text("До бібліотеки", "В библиотеку", "To the library"),
          text("На вокзал", "На вокзал", "To the station"),
        ],
        1,
      ),
      q(
        text(
          "Що Jana записує в зошит?",
          "Что Jana записывает в тетрадь?",
          "What does Jana write in her notebook?",
        ),
        [
          text("Нові слова", "Новые слова", "New words"),
          text("Ціни", "Цены", "Prices"),
          text("Розклад автобусів", "Расписание автобусов", "A bus schedule"),
        ],
        0,
      ),
    ],
  },
  {
    id: "cs-a0-audio-02",
    slug: "na-nadrazi",
    courseId: "cs",
    band: "a0",
    title: text("Na nádraží", "Na nádraží", "Na nádraží"),
    description: text(
      "Чеський A0 текст про вокзал і поїзд.",
      "Чешский A0 текст о вокзале и поезде.",
      "A Czech A0 text about a station and a train.",
    ),
    audioSrc: "/audio/practice/cs/a0/cs-a0-audio-02-na-nadrazi.mp3",
    durationLabel: "1:05",
    transcript: `Dnes ráno jedu vlakem.
Jmenuji se Tomáš.
Mám malý batoh.
V batohu mám vodu, knihu a svačinu.
Jdu na nádraží.
Nádraží je blízko centra.
Před budovou stojí hodně lidí.
Někteří lidé čekají.
Někteří lidé kupují lístek.
Já také potřebuji lístek.
Jdu k pokladně.
Paní za oknem se usmívá.
Říkám dobrý den.
Chci jeden lístek do Brna.
Paní říká cenu.
Platím kartou.
Dostávám lístek.
Na lístku je čas a číslo vlaku.
Můj vlak jede v devět hodin.
Ještě mám deset minut.
Dívám se na velkou tabuli.
Na tabuli jsou města a čísla kolejí.
Můj vlak je na druhé koleji.
Jdu pomalu na nástupiště.
Na nástupišti fouká vítr.
Vedle mě stojí rodina s dítětem.
Dítě má modrou čepici.
Potom přijíždí vlak.
Dveře se otevírají.
Nastupuji do vlaku.
Najdu volné místo u okna.
Sedím a dívám se ven.
Vlak se pomalu rozjíždí.
Venku vidím domy, stromy a pole.
Cesta je klidná.
Jsem rád.
Dnes jedu do nového města.`,
    questions: [
      q(
        text(
          "Чим Tomáš їде сьогодні вранці?",
          "На чём Tomáš едет сегодня утром?",
          "What does Tomáš travel by this morning?",
        ),
        [
          text("Автобусом", "Автобусом", "By bus"),
          text("Потягом", "Поездом", "By train"),
          text("Автомобілем", "Машиной", "By car"),
        ],
        1,
      ),
      q(
        text(
          "Що Tomáš має в рюкзаку?",
          "Что у Tomášа в рюкзаке?",
          "What does Tomáš have in his backpack?",
        ),
        [
          text("Воду, книгу і перекус", "Воду, книгу и перекус", "Water, a book and a snack"),
          text("Каву, сир і яблука", "Кофе, сыр и яблоки", "Coffee, cheese and apples"),
          text("Тільки телефон", "Только телефон", "Only a phone"),
        ],
        0,
      ),
      q(
        text(
          "Куди Tomáš купує квиток?",
          "Куда Tomáš покупает билет?",
          "Where does Tomáš buy a ticket to?",
        ),
        [
          text("До Prahy", "До Prahy", "To Prague"),
          text("До školy", "До školy", "To school"),
          text("До Brna", "До Brna", "To Brno"),
        ],
        2,
      ),
      q(
        text(
          "З якої колії їде його потяг?",
          "С какого пути едет его поезд?",
          "Which track does his train leave from?",
        ),
        [
          text("З другої", "Со второго", "From the second"),
          text("З першої", "С первого", "From the first"),
          text("З третьої", "С третьего", "From the third"),
        ],
        0,
      ),
      q(
        text(
          "Де Tomáš знаходить місце?",
          "Где Tomáš находит место?",
          "Where does Tomáš find a seat?",
        ),
        [
          text("Біля дверей", "У двери", "Near the door"),
          text("Біля вікна", "У окна", "By the window"),
          text("Біля каси", "У кассы", "Near the ticket office"),
        ],
        1,
      ),
    ],
  },
  {
    id: "cs-a0-audio-03",
    slug: "v-zoo",
    courseId: "cs",
    band: "a0",
    title: text("V zoo", "V zoo", "V zoo"),
    description: text(
      "Чеський A0 текст про зоопарк і тварин.",
      "Чешский A0 текст о зоопарке и животных.",
      "A Czech A0 text about a zoo and animals.",
    ),
    audioSrc: "/audio/practice/cs/a0/cs-a0-audio-03-v-zoo.mp3",
    durationLabel: "1:05",
    transcript: `Dnes jde Klára do zoo.
Jde tam se svým bratrem.
Je pěkný den.
Svítí slunce.
Klára má malý batoh.
V batohu má vodu, jablko a mapu zoo.
U vchodu stojí hodně lidí.
Klára kupuje dva lístky.
Potom jde se svým bratrem dovnitř.
Nejdřív vidí opice.
Opice skáčou a dělají hluk.
Děti se smějí.
Potom Klára vidí slona.
Slon je velký a klidný.
Stojí u vody.
Vedle slona je malý pták.
Bratr chce vidět lva.
Lev leží ve stínu.
Má velkou hlavu a dlouhou hřívu.
Klára se dívá potichu.
Potom jdou k žirafám.
Žirafa má dlouhý krk.
Jí zelené listy ze stromu.
Klára říká, že žirafa je krásná.
Bratr má hlad.
Sednou si na lavičku.
Klára jí jablko.
Bratr pije vodu.
Potom se dívají na mapu.
Ještě chtějí vidět tučňáky.
Tučňáci chodí pomalu.
Jeden tučňák skočí do vody.
Klára se směje.
V zoo je hodně zvířat.
Klára je unavená, ale spokojená.
Domů jde pomalu.
Dnes má krásný den.`,
    questions: [
      q(
        text(
          "З ким Klára йде до zoo?",
          "С кем Klára идёт в zoo?",
          "Who does Klára go to the zoo with?",
        ),
        [
          text("З мамою", "С мамой", "With her mother"),
          text("З братом", "С братом", "With her brother"),
          text("З подругою", "С подругой", "With her friend"),
        ],
        1,
      ),
      q(
        text(
          "Що Klára має в рюкзаку?",
          "Что у Klára в рюкзаке?",
          "What does Klára have in her backpack?",
        ),
        [
          text("Воду, яблуко і мапу zoo", "Воду, яблоко и карту zoo", "Water, an apple and a zoo map"),
          text("Книгу і телефон", "Книгу и телефон", "A book and a phone"),
          text("Хліб і сир", "Хлеб и сыр", "Bread and cheese"),
        ],
        0,
      ),
      q(
        text(
          "Яку тварину брат хоче побачити?",
          "Какое животное брат хочет увидеть?",
          "Which animal does her brother want to see?",
        ),
        [
          text("Слона", "Слона", "An elephant"),
          text("Лева", "Льва", "A lion"),
          text("Собаку", "Собаку", "A dog"),
        ],
        1,
      ),
      q(
        text(
          "Що їсть жирафа?",
          "Что ест жираф?",
          "What does the giraffe eat?",
        ),
        [
          text("Зелене листя", "Зелёные листья", "Green leaves"),
          text("Яблуко", "Яблоко", "An apple"),
          text("Хліб", "Хлеб", "Bread"),
        ],
        0,
      ),
      q(
        text(
          "Що робить один пінгвін?",
          "Что делает один пингвин?",
          "What does one penguin do?",
        ),
        [
          text("Купує квиток", "Покупает билет", "Buys a ticket"),
          text("Читає книгу", "Читает книгу", "Reads a book"),
          text("Стрибає у воду", "Прыгает в воду", "Jumps into the water"),
        ],
        2,
      ),
    ],
  },
];

export function getAudioPracticeItems(
  courseId: CourseId,
  band: CefrBandId,
): AudioPracticeItem[] {
  return AUDIO_PRACTICE_ITEMS.filter(
    (item) => item.courseId === courseId && item.band === band,
  );
}

export function getAudioPracticeItem(
  courseId: CourseId,
  band: CefrBandId,
  slug: string,
): AudioPracticeItem | undefined {
  return AUDIO_PRACTICE_ITEMS.find(
    (item) => item.courseId === courseId && item.band === band && item.slug === slug,
  );
}