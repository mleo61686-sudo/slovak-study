import type { AudioPracticeItem } from "./types";
import { q, text } from "./helpers";

export const CZECH_AUDIO_PRACTICE_ITEMS: AudioPracticeItem[] = [
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
  {
    id: "cs-a1-audio-01",
    slug: "sobota-v-centru-mesta",
    courseId: "cs",
    band: "a1",
    title: text(
      "Sobota v centru města",
      "Sobota v centru města",
      "Sobota v centru města",
    ),
    description: text(
      "Чеський A1 текст про суботній день у центрі міста.",
      "Чешский A1 текст о субботнем дне в центре города.",
      "A Czech A1 text about a Saturday in the city centre.",
    ),
    audioSrc: "/audio/practice/cs/a1/cs-a1-audio-01-sobota-v-centru-mesta.mp3",
    transcript: `V sobotu ráno vstala Anna v osm hodin.
Dala si snídani, vypila čaj a potom uklidila svůj pokoj.
Venku bylo hezky, proto se rozhodla jít do centra města.
Nejdřív šla do knihkupectví.
Chtěla koupit malý slovník češtiny.
Potom navštívila obchod s oblečením a koupila si modré tričko.
Tričko stálo tři sta korun.
V poledne měla hlad, a tak šla do malé kavárny.
Objednala si sendvič a kávu s mlékem.
V kavárně potkala svou kamarádku Kláru.
Chvíli spolu mluvily a potom se šly projít do parku.
Odpoledne začalo pršet.
Anna neměla deštník, proto jela domů autobusem.
Doma si připravila večeři a večer se dívala na film.
Byla unavená, ale měla radost, protože prožila pěkný den.`,
    questions: [
      q(
        text(
          "О котрій годині Anna прокинулася?",
          "Во сколько Anna проснулась?",
          "What time did Anna get up?",
        ),
        [
          text("О сьомій", "В семь", "At seven"),
          text("О восьмій", "В восемь", "At eight"),
          text("О девʼятій", "В девять", "At nine"),
        ],
        1,
      ),
      q(
        text(
          "Що Anna хотіла купити в книгарні?",
          "Что Anna хотела купить в книжном магазине?",
          "What did Anna want to buy in the bookshop?",
        ),
        [
          text(
            "Маленький словник чеської мови",
            "Маленький словарь чешского языка",
            "A small Czech dictionary",
          ),
          text("Кулінарну книгу", "Кулинарную книгу", "A cookery book"),
          text("Журнал", "Журнал", "A magazine"),
        ],
        0,
      ),
      q(
        text(
          "Скільки коштувала синя футболка?",
          "Сколько стоила синяя футболка?",
          "How much did the blue T-shirt cost?",
        ),
        [
          text("Двісті крон", "Двести крон", "Two hundred crowns"),
          text("Триста крон", "Триста крон", "Three hundred crowns"),
          text("Пʼятсот крон", "Пятьсот крон", "Five hundred crowns"),
        ],
        1,
      ),
      q(
        text(
          "Кого Anna зустріла в кавʼярні?",
          "Кого Anna встретила в кафе?",
          "Who did Anna meet in the café?",
        ),
        [
          text("Свою сестру", "Свою сестру", "Her sister"),
          text("Свого колегу", "Своего коллегу", "Her colleague"),
          text("Свою подругу Kláru", "Свою подругу Kláru", "Her friend Klára"),
        ],
        2,
      ),
      q(
        text(
          "Чому Anna повернулася додому автобусом?",
          "Почему Anna вернулась домой на автобусе?",
          "Why did Anna go home by bus?",
        ),
        [
          text(
            "Почався дощ, а в неї не було парасолі",
            "Начался дождь, а у неё не было зонта",
            "It started raining and she had no umbrella",
          ),
          text(
            "Вона запізнювалася на роботу",
            "Она опаздывала на работу",
            "She was late for work",
          ),
          text(
            "Вона купила важкі сумки",
            "Она купила тяжёлые сумки",
            "She bought heavy bags",
          ),
        ],
        0,
      ),
    ],
  },
  {
    id: "cs-a1-audio-02",
    slug: "cesta-vlakem-za-babickou",
    courseId: "cs",
    band: "a1",
    title: text(
      "Cesta vlakem za babičkou",
      "Cesta vlakem za babičkou",
      "Cesta vlakem za babičkou",
    ),
    description: text(
      "Чеський A1 текст про поїздку потягом до бабусі.",
      "Чешский A1 текст о поездке на поезде к бабушке.",
      "A Czech A1 text about travelling by train to visit a grandmother.",
    ),
    audioSrc: "/audio/practice/cs/a1/cs-a1-audio-02-cesta-vlakem-za-babickou.mp3",
    transcript: `V neděli ráno jel Tomáš vlakem za svou babičkou.
Babička bydlí v malém městě asi hodinu od Prahy.
Tomáš si večer připravil batoh, láhev vody a malý dárek.
Na nádraží přišel deset minut před odjezdem.
Koupil si jízdenku a našel správné nástupiště.
Vlak přijel včas a Tomáš si sedl k oknu.
Během cesty poslouchal hudbu a díval se ven.
Viděl pole, lesy a několik malých vesnic.
Po hodině vystoupil na nádraží, kde už na něj čekala babička.
Společně šli k ní domů.
Babička připravila kuře s bramborami a potom měli jablečný koláč.
Odpoledne se prošli v parku a dlouho si povídali.
Večer se Tomáš vrátil vlakem domů.
Byl unavený, ale měl radost, že strávil pěkný den se svou babičkou.`,
    questions: [
      q(
        text(
          "Куди Tomáš їхав у неділю вранці?",
          "Куда Tomáš ехал в воскресенье утром?",
          "Where was Tomáš going on Sunday morning?",
        ),
        [
          text("До бабусі", "К бабушке", "To visit his grandmother"),
          text("На роботу", "На работу", "To work"),
          text("До школи", "В школу", "To school"),
        ],
        0,
      ),
      q(
        text(
          "Як далеко бабуся живе від Prahy?",
          "Как далеко бабушка живёт от Prahy?",
          "How far does his grandmother live from Prague?",
        ),
        [
          text("Приблизно двадцять хвилин", "Примерно двадцать минут", "About twenty minutes"),
          text("Приблизно одну годину", "Примерно один час", "About one hour"),
          text("Приблизно три години", "Примерно три часа", "About three hours"),
        ],
        1,
      ),
      q(
        text(
          "Коли Tomáš прийшов на вокзал?",
          "Когда Tomáš пришёл на вокзал?",
          "When did Tomáš arrive at the station?",
        ),
        [
          text(
            "За десять хвилин до відправлення",
            "За десять минут до отправления",
            "Ten minutes before departure",
          ),
          text(
            "Через десять хвилин після відправлення",
            "Через десять минут после отправления",
            "Ten minutes after departure",
          ),
          text("За одну годину", "За один час", "One hour early"),
        ],
        0,
      ),
      q(
        text(
          "Що бабуся приготувала на обід?",
          "Что бабушка приготовила на обед?",
          "What did his grandmother prepare for lunch?",
        ),
        [
          text("Рибу з рисом", "Рыбу с рисом", "Fish with rice"),
          text(
            "Курку з картоплею та яблучний пиріг",
            "Курицу с картофелем и яблочный пирог",
            "Chicken with potatoes and apple pie",
          ),
          text("Суп і хліб", "Суп и хлеб", "Soup and bread"),
        ],
        1,
      ),
      q(
        text(
          "Як Tomáš повернувся додому ввечері?",
          "Как Tomáš вернулся домой вечером?",
          "How did Tomáš return home in the evening?",
        ),
        [
          text("Автобусом", "Автобусом", "By bus"),
          text("Автомобілем", "На машине", "By car"),
          text("Потягом", "На поезде", "By train"),
        ],
        2,
      ),
    ],
  },
  {
    id: "cs-a2-audio-01",
    slug: "ztraceny-telefon",
    courseId: "cs",
    band: "a2",
    title: text("Ztracený telefon", "Ztracený telefon", "Ztracený telefon"),
    description: text(
      "Чеський A2 текст про загублений у автобусі телефон.",
      "Чешский A2 текст о потерянном в автобусе телефоне.",
      "A Czech A2 text about a phone lost on a bus.",
    ),
    audioSrc: "/audio/practice/cs/a2/cs-a2-audio-01-ztraceny-telefon.mp3",
    transcript: `V pondělí odpoledne jel Petr autobusem z práce domů.
Byl unavený, a proto si sedl k oknu a poslouchal hudbu.
Když autobus zastavil u jeho domu, rychle vystoupil a šel do obchodu koupit něco k večeři.
U pokladny zjistil, že nemá telefon.
Prohledal všechny kapsy i batoh, ale telefon nikde nebyl.
Petr si vzpomněl, že ho naposledy držel v ruce v autobuse.
Požádal prodavačku, jestli může použít její telefon, a zavolal na své číslo.
Telefon několikrát zazvonil a potom ho zvedla neznámá žena.
Řekla, že telefon našla na sedadle v autobuse.
Právě vystoupila na konečné zastávce a čekala tam na další spoj.
Petr jí poděkoval a hned se vydal na konečnou.
Cesta mu trvala asi dvacet minut.
Žena stála u zastávky a držela jeho telefon v ruce.
Petr měl velkou radost, protože v telefonu měl důležité fotografie, kontakty a pracovní zprávy.
Chtěl ženě dát nějaké peníze jako poděkování, ale ona je odmítla.
Řekla, že by si přála, aby jí někdo pomohl stejně, kdyby něco ztratila ona.
Petr si od té doby vždy kontroluje kapsy, než vystoupí z autobusu.
Také si nastavil zámek obrazovky a zapnul možnost najít telefon pomocí internetu.`,
    questions: [
      q(
        text(
          "Де Petr загубив телефон?",
          "Где Petr потерял телефон?",
          "Where did Petr lose his phone?",
        ),
        [
          text("В автобусі", "В автобусе", "On the bus"),
          text("У магазині", "В магазине", "In the shop"),
          text("На роботі", "На работе", "At work"),
        ],
        0,
      ),
      q(
        text(
          "Як Petr зателефонував на свій номер?",
          "Как Petr позвонил на свой номер?",
          "How did Petr call his own number?",
        ),
        [
          text(
            "Скористався телефоном продавчині",
            "Воспользовался телефоном продавщицы",
            "He used the shop assistant's phone",
          ),
          text(
            "Зателефонував із робочого компʼютера",
            "Позвонил с рабочего компьютера",
            "He called from his work computer",
          ),
          text(
            "Попросив водія автобуса",
            "Попросил водителя автобуса",
            "He asked the bus driver",
          ),
        ],
        0,
      ),
      q(
        text(
          "Де чекала невідома жінка?",
          "Где ждала незнакомая женщина?",
          "Where was the unknown woman waiting for Petr?",
        ),
        [
          text("Біля його будинку", "Возле его дома", "Near his house"),
          text(
            "На кінцевій зупинці",
            "На конечной остановке",
            "At the final stop",
          ),
          text("У магазині", "В магазине", "In the shop"),
        ],
        1,
      ),
      q(
        text(
          "Чому телефон був для нього важливим?",
          "Почему телефон был для него важен?",
          "Why was the phone important to Petr?",
        ),
        [
          text(
            "У ньому були фотографії, контакти й робочі повідомлення",
            "В нём были фотографии, контакты и рабочие сообщения",
            "It contained photographs, contacts and work messages",
          ),
          text(
            "Він щойно купив його за великі гроші",
            "Он только что купил его за большие деньги",
            "He had just bought it for a lot of money",
          ),
          text(
            "У ньому був квиток на літак",
            "В нём был билет на самолёт",
            "It contained a plane ticket",
          ),
        ],
        0,
      ),
      q(
        text(
          "Що Petr почав робити після цієї події?",
          "Что Petr начал делать после этого случая?",
          "What did Petr start doing after this event?",
        ),
        [
          text(
            "Завжди перевіряти кишені перед виходом з автобуса",
            "Всегда проверять карманы перед выходом из автобуса",
            "Always check his pockets before leaving the bus",
          ),
          text(
            "Більше ніколи не їздити автобусом",
            "Больше никогда не ездить на автобусе",
            "Never travel by bus again",
          ),
          text(
            "Залишати телефон удома",
            "Оставлять телефон дома",
            "Leave his phone at home",
          ),
        ],
        0,
      ),
    ],
  },
  {
    id: "cs-a2-audio-02",
    slug: "prvni-den-v-nove-praci",
    courseId: "cs",
    band: "a2",
    title: text(
      "První den v nové práci",
      "První den v nové práci",
      "První den v nové práci",
    ),
    description: text(
      "Чеський A2 текст про перший день на новій роботі.",
      "Чешский A2 текст о первом дне на новой работе.",
      "A Czech A2 text about the first day at a new job.",
    ),
    audioSrc: "/audio/practice/cs/a2/cs-a2-audio-02-prvni-den-v-nove-praci.mp3",
    transcript: `V pondělí ráno nastoupila Jana do nové práce v malé cestovní kanceláři.
Byla trochu nervózní, protože nikoho neznala a nevěděla přesně, co bude dělat.
Do kanceláře přišla o deset minut dřív.
U dveří ji přivítala vedoucí paní Nováková a představila jí ostatní kolegy.
Potom jí ukázala pracovní stůl, kuchyňku a místnost, kde se konají porady.
Dopoledne se Jana učila pracovat s novým počítačovým programem.
Její kolega David jí vysvětlil, jak zapisovat rezervace a odpovídat zákazníkům na e-maily.
Některé věci byly složité, ale Jana si dělala poznámky a často se ptala.
V poledne šla s kolegy na oběd do restaurace blízko kanceláře.
Povídali si o práci, cestování a plánech na víkend.
Jana zjistila, že kolegové jsou milí a rádi jí pomohou.
Odpoledne už sama vyřídila první telefonát.
Zákazník se ptal na zájezd do Itálie.
Jana mu našla potřebné informace a poslala nabídku e-mailem.
Když večer odcházela domů, byla unavená, ale spokojená.
První den nebyl úplně jednoduchý, ale Jana měla dobrý pocit a těšila se na další pracovní den.`,
    questions: [
      q(
        text(
          "Де Jana почала працювати?",
          "Где Jana начала работать?",
          "Where did Jana start working?",
        ),
        [
          text(
            "У невеликій туристичній агенції",
            "В небольшом туристическом агентстве",
            "At a small travel agency",
          ),
          text("У ресторані", "В ресторане", "At a restaurant"),
          text("У школі", "В школе", "At a school"),
        ],
        0,
      ),
      q(
        text(
          "Хто пояснив Яні, як працювати з новою програмою?",
          "Кто объяснил Яне, как работать с новой программой?",
          "Who explained how to use the new program to Jana?",
        ),
        [
          text("Пані Nováková", "Госпожа Nováková", "Mrs Nováková"),
          text("Її колега David", "Её коллега David", "Her colleague David"),
          text("Один із клієнтів", "Один из клиентов", "One of the customers"),
        ],
        1,
      ),
      q(
        text(
          "Про що колеги розмовляли під час обіду?",
          "О чём коллеги разговаривали во время обеда?",
          "What did the colleagues talk about during lunch?",
        ),
        [
          text(
            "Про роботу, подорожі та плани на вихідні",
            "О работе, путешествиях и планах на выходные",
            "Work, travel and plans for the weekend",
          ),
          text(
            "Тільки про компʼютерну програму",
            "Только о компьютерной программе",
            "Only the computer program",
          ),
          text(
            "Про погану погоду",
            "О плохой погоде",
            "The bad weather",
          ),
        ],
        0,
      ),
      q(
        text(
          "Про що запитував перший клієнт Яни?",
          "О чём спрашивал первый клиент Яны?",
          "What did Jana's first customer ask about?",
        ),
        [
          text("Про готель у Praze", "Об отеле в Praze", "A hotel in Prague"),
          text("Про поїздку до Itálie", "О поездке в Itálie", "A trip to Italy"),
          text("Про оренду автомобіля", "Об аренде автомобиля", "Car rental"),
        ],
        1,
      ),
      q(
        text(
          "Як Jana почувалася наприкінці дня?",
          "Как Jana чувствовала себя в конце дня?",
          "How did Jana feel at the end of the day?",
        ),
        [
          text(
            "Втомленою, але задоволеною",
            "Уставшей, но довольной",
            "Tired but satisfied",
          ),
          text(
            "Сердитою і розчарованою",
            "Злой и разочарованной",
            "Angry and disappointed",
          ),
          text(
            "Зовсім не втомленою",
            "Совсем не уставшей",
            "Not tired at all",
          ),
        ],
        0,
      ),
    ],
  },
];
