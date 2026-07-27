import type { AudioPracticeItem } from "./types";
import { q, text } from "./helpers";

export const POLISH_AUDIO_PRACTICE_ITEMS: AudioPracticeItem[] = [
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
    id: "pl-a1-audio-01",
    slug: "zakupy-na-rynku",
    courseId: "pl",
    band: "a1",
    title: text("Zakupy na rynku", "Zakupy na rynku", "Zakupy na rynku"),
    description: text(
      "Польський A1 текст про покупки на ринку.",
      "Польский A1 текст о покупках на рынке.",
      "A Polish A1 text about shopping at a market.",
    ),
    audioSrc: "/audio/practice/pl/a1/pl-a1-audio-01-zakupy-na-rynku.mp3",
    transcript: `W sobotę rano Marta poszła na rynek.
Chciała kupić warzywa, owoce i coś na obiad.
Na rynku było dużo ludzi, ale pogoda była ładna i świeciło słońce.
Najpierw Marta kupiła kilogram ziemniaków, dwie marchewki i jedną cebulę.
Potem poszła do stoiska z owocami.
Wybrała jabłka, banany i małe pudełko truskawek.
Przy następnym stoisku sprzedawca miał świeży chleb i ser.
Marta kupiła jeden chleb i kawałek sera.
Za wszystkie zakupy zapłaciła trzydzieści osiem złotych.
Po zakupach spotkała swoją koleżankę Anię.
Razem poszły do małej kawiarni obok rynku.
Zamówiły kawę i ciasto czekoladowe.
Po południu Marta wróciła do domu.
Przygotowała zupę warzywną i sałatkę.
Była zadowolona, ponieważ kupiła wszystko, czego potrzebowała.`,
    questions: [
      q(
        text(
          "Куди Marta пішла в суботу вранці?",
          "Куда Marta пошла в субботу утром?",
          "Where did Marta go on Saturday morning?",
        ),
        [
          text("На ринок", "На рынок", "To the market"),
          text("До школи", "В школу", "To school"),
          text("У парк", "В парк", "To the park"),
        ],
        0,
      ),
      q(
        text(
          "Які овочі Marta купила спочатку?",
          "Какие овощи Marta купила сначала?",
          "Which vegetables did Marta buy first?",
        ),
        [
          text(
            "Картоплю, моркву та цибулю",
            "Картофель, морковь и лук",
            "Potatoes, carrots and an onion",
          ),
          text("Помідори та огірки", "Помидоры и огурцы", "Tomatoes and cucumbers"),
          text("Капусту та перець", "Капусту и перец", "Cabbage and peppers"),
        ],
        0,
      ),
      q(
        text(
          "Скільки Marta заплатила за всі покупки?",
          "Сколько Marta заплатила за все покупки?",
          "How much did Marta pay for all the shopping?",
        ),
        [
          text("28 злотих", "28 злотых", "28 zlotys"),
          text("38 злотих", "38 злотых", "38 zlotys"),
          text("48 злотих", "48 злотых", "48 zlotys"),
        ],
        1,
      ),
      q(
        text(
          "Кого Marta зустріла після покупок?",
          "Кого Marta встретила после покупок?",
          "Who did Marta meet after shopping?",
        ),
        [
          text("Свою сестру", "Свою сестру", "Her sister"),
          text("Свою подругу Anię", "Свою подругу Anię", "Her friend Ania"),
          text("Сусідку", "Соседку", "Her neighbour"),
        ],
        1,
      ),
      q(
        text(
          "Що Marta приготувала вдома?",
          "Что Marta приготовила дома?",
          "What did Marta prepare at home?",
        ),
        [
          text("Піцу та чай", "Пиццу и чай", "Pizza and tea"),
          text("Суп і салат", "Суп и салат", "Soup and a salad"),
          text("Рис і курку", "Рис и курицу", "Rice and chicken"),
        ],
        1,
      ),
    ],
  },
  {
    id: "pl-a1-audio-02",
    slug: "poranek-przed-praca",
    courseId: "pl",
    band: "a1",
    title: text(
      "Poranek przed pracą",
      "Poranek przed pracą",
      "Poranek przed pracą",
    ),
    description: text(
      "Польський A1 текст про ранок перед роботою.",
      "Польский A1 текст об утре перед работой.",
      "A Polish A1 text about a morning before work.",
    ),
    audioSrc: "/audio/practice/pl/a1/pl-a1-audio-02-poranek-przed-praca.mp3",
    transcript: `W poniedziałek rano Paweł wstał o szóstej trzydzieści.
Najpierw otworzył okno i sprawdził pogodę.
Na dworze było chłodno, ale nie padał deszcz.
Paweł poszedł do łazienki, umył zęby i wziął szybki prysznic.
Potem ubrał się i przygotował śniadanie.
Zjadł dwie kanapki z serem i pomidorem oraz wypił filiżankę kawy.
O siódmej piętnaście wyszedł z domu.
Zwykle jeździ do pracy autobusem, ale tego dnia autobus się spóźnił.
Paweł czekał na przystanku około dziesięciu minut.
W autobusie było dużo ludzi, dlatego musiał stać.
Po dwudziestu minutach wysiadł niedaleko biura.
Po drodze kupił butelkę wody i małą bułkę.
Do pracy przyszedł pięć minut przed ósmą.
Zdjął kurtkę, włączył komputer i przywitał się z kolegami.
Był trochę zmęczony, ale gotowy do pracy.`,
    questions: [
      q(
        text(
          "О котрій годині Paweł прокинувся?",
          "Во сколько Paweł проснулся?",
          "What time did Paweł get up?",
        ),
        [
          text("О 6:00", "В 6:00", "At 6:00"),
          text("О 6:30", "В 6:30", "At 6:30"),
          text("О 7:00", "В 7:00", "At 7:00"),
        ],
        1,
      ),
      q(
        text(
          "Що Paweł їв на сніданок?",
          "Что Paweł ел на завтрак?",
          "What did Paweł eat for breakfast?",
        ),
        [
          text(
            "Два бутерброди із сиром і помідором",
            "Два бутерброда с сыром и помидором",
            "Two sandwiches with cheese and tomato",
          ),
          text("Кашу з фруктами", "Кашу с фруктами", "Porridge with fruit"),
          text("Яєчню", "Яичницу", "Scrambled eggs"),
        ],
        0,
      ),
      q(
        text(
          "Чому Paweł чекав на зупинці?",
          "Почему Paweł ждал на остановке?",
          "Why did Paweł wait at the bus stop?",
        ),
        [
          text("Він забув квиток", "Он забыл билет", "He forgot his ticket"),
          text("Автобус запізнився", "Автобус опоздал", "The bus was late"),
          text("Він зустрів колегу", "Он встретил коллегу", "He met a colleague"),
        ],
        1,
      ),
      q(
        text(
          "Що Paweł купив дорогою до роботи?",
          "Что Paweł купил по дороге на работу?",
          "What did Paweł buy on the way to work?",
        ),
        [
          text("Каву та газету", "Кофе и газету", "Coffee and a newspaper"),
          text("Воду та маленьку булочку", "Воду и маленькую булочку", "Water and a small roll"),
          text("Яблуко та сік", "Яблоко и сок", "An apple and juice"),
        ],
        1,
      ),
      q(
        text(
          "Коли Paweł прийшов на роботу?",
          "Когда Paweł пришёл на работу?",
          "When did Paweł arrive at work?",
        ),
        [
          text("За пʼять хвилин до восьмої", "За пять минут до восьми", "Five minutes before eight"),
          text("О пів на восьму", "В половине восьмого", "At half past seven"),
          text("О десятій", "В десять", "At ten"),
        ],
        0,
      ),
    ],
  },
  {
    id: "pl-a2-audio-01",
    slug: "przeprowadzka-do-nowego-mieszkania",
    courseId: "pl",
    band: "a2",
    title: text(
      "Przeprowadzka do nowego mieszkania",
      "Przeprowadzka do nowego mieszkania",
      "Przeprowadzka do nowego mieszkania",
    ),
    description: text(
      "Польський A2 текст про переїзд до нової квартири.",
      "Польский A2 текст о переезде в новую квартиру.",
      "A Polish A2 text about moving to a new apartment.",
    ),
    audioSrc: "/audio/practice/pl/a2/pl-a2-audio-01-przeprowadzka-do-nowego-mieszkania.mp3",
    transcript: `W zeszłym miesiącu Karolina przeprowadziła się do nowego mieszkania.
Jej poprzednie mieszkanie było małe i znajdowało się daleko od pracy.
Codziennie musiała jechać autobusem prawie godzinę, dlatego postanowiła znaleźć coś bliżej centrum.
Nowe mieszkanie ma dwa pokoje, kuchnię, łazienkę i niewielki balkon.
Nie było całkowicie umeblowane, więc Karolina musiała kupić stół, krzesła oraz szafę do sypialni.
Kanapę i łóżko dostała od rodziców.
W dniu przeprowadzki pomogli jej brat i dwie koleżanki.
Najpierw przewieźli kartony z ubraniami i książkami, a później większe meble.
Niestety okazało się, że szafa nie mieści się w windzie.
Musieli więc wnieść ją po schodach na czwarte piętro.
Po kilku godzinach wszyscy byli zmęczeni i głodni.
Karolina zamówiła pizzę i przygotowała herbatę.
Wieczorem rozpakowała najważniejsze rzeczy i posprzątała kuchnię.
Następnego dnia poznała swoją sąsiadkę, która powiedziała jej, gdzie znajduje się najbliższy sklep, apteka i przystanek autobusowy.
Karolina jest zadowolona z nowego mieszkania, ponieważ ma teraz więcej miejsca i może chodzić do pracy pieszo.`,
    questions: [
      q(
        text(
          "Чому Karolina вирішила переїхати?",
          "Почему Karolina решила переехать?",
          "Why did Karolina decide to move?",
        ),
        [
          text(
            "Її стара квартира була маленькою і далеко від роботи",
            "Её старая квартира была маленькой и далеко от работы",
            "Her old apartment was small and far from work",
          ),
          text(
            "Вона хотіла жити біля батьків",
            "Она хотела жить рядом с родителями",
            "She wanted to live near her parents",
          ),
          text(
            "Власник підвищив орендну плату",
            "Владелец повысил арендную плату",
            "The owner raised the rent",
          ),
        ],
        0,
      ),
      q(
        text(
          "Що Karolina отримала від батьків?",
          "Что Karolina получила от родителей?",
          "What did Karolina receive from her parents?",
        ),
        [
          text("Стіл і стільці", "Стол и стулья", "A table and chairs"),
          text("Диван і ліжко", "Диван и кровать", "A sofa and a bed"),
          text("Шафу і лампу", "Шкаф и лампу", "A wardrobe and a lamp"),
        ],
        1,
      ),
      q(
        text(
          "Хто допомагав Karolinie з переїздом?",
          "Кто помогал Karolinie с переездом?",
          "Who helped Karolina with the move?",
        ),
        [
          text(
            "Її брат і дві подруги",
            "Её брат и две подруги",
            "Her brother and two friends",
          ),
          text("Тільки її батьки", "Только её родители", "Only her parents"),
          text("Колеги з роботи", "Коллеги с работы", "Her colleagues"),
        ],
        0,
      ),
      q(
        text(
          "Чому шафу довелося нести сходами?",
          "Почему шкаф пришлось нести по лестнице?",
          "Why did they have to carry the wardrobe upstairs?",
        ),
        [
          text("Ліфт не працював", "Лифт не работал", "The lift was broken"),
          text("Шафа не помістилася в ліфт", "Шкаф не поместился в лифт", "The wardrobe did not fit in the lift"),
          text("Вони забули ключ від ліфта", "Они забыли ключ от лифта", "They forgot the lift key"),
        ],
        1,
      ),
      q(
        text(
          "Чому Karolina задоволена новою квартирою?",
          "Почему Karolina довольна новой квартирой?",
          "Why is Karolina happy with the new apartment?",
        ),
        [
          text(
            "Вона має більше місця і може ходити на роботу пішки",
            "У неё больше места, и она может ходить на работу пешком",
            "She has more space and can walk to work",
          ),
          text(
            "Квартира повністю безкоштовна",
            "Квартира полностью бесплатная",
            "The apartment is completely free",
          ),
          text(
            "У будинку є великий басейн",
            "В доме есть большой бассейн",
            "The building has a large swimming pool",
          ),
        ],
        0,
      ),
    ],
  },
  {
    id: "pl-a2-audio-02",
    slug: "spozniony-pociag",
    courseId: "pl",
    band: "a2",
    title: text(
      "Spóźniony pociąg",
      "Spóźniony pociąg",
      "Spóźniony pociąg",
    ),
    description: text(
      "Польський A2 текст про затримку потяга та зміну маршруту.",
      "Польский A2 текст о задержке поезда и изменении маршрута.",
      "A Polish A2 text about a delayed train and a changed route.",
    ),
    audioSrc: "/audio/practice/pl/a2/pl-a2-audio-02-spozniony-pociag.mp3",
    transcript: `W piątek po południu Michał jechał pociągiem do Krakowa, gdzie miał spędzić weekend z przyjaciółmi.
Kupił bilet przez internet i przyjechał na dworzec pół godziny przed odjazdem.
Na tablicy informacyjnej zobaczył jednak, że jego pociąg jest opóźniony o czterdzieści minut.
Poszedł więc do kawiarni, zamówił herbatę i napisał do przyjaciół, że przyjedzie później.
Po godzinie pojawiła się informacja o kolejnym opóźnieniu.
Michał zaczął się martwić, ponieważ przyjaciele mieli czekać na niego przed dworcem.
Zapytał pracownika kolei, co się stało.
Dowiedział się, że z powodu awarii pociąg odjedzie dopiero wieczorem.
Pracownik zaproponował mu inne połączenie z przesiadką w Katowicach.
Michał zgodził się, chociaż podróż miała być dłuższa.
Pierwszy pociąg był zatłoczony, ale udało mu się znaleźć wolne miejsce przy oknie.
W Katowicach miał tylko piętnaście minut na przesiadkę.
Szybko znalazł właściwy peron i zdążył w ostatniej chwili.
Do Krakowa przyjechał prawie dwie godziny później niż planował.
Mimo problemów był zadowolony, że nie musiał odwoływać wyjazdu.
Przyjaciele czekali na niego przed dworcem i razem poszli na kolację.`,
    questions: [
      q(
        text(
          "Куди Michał їхав на вихідні?",
          "Куда Michał ехал на выходные?",
          "Where was Michał travelling for the weekend?",
        ),
        [
          text("До Warszawy", "В Warszawę", "To Warsaw"),
          text("До Krakowa", "В Kraków", "To Kraków"),
          text("До Katowic", "В Katowice", "To Katowice"),
        ],
        1,
      ),
      q(
        text(
          "На скільки хвилин потяг спочатку запізнювався?",
          "На сколько минут поезд сначала опаздывал?",
          "How many minutes was the train initially delayed?",
        ),
        [
          text("На 20 хвилин", "На 20 минут", "By 20 minutes"),
          text("На 40 хвилин", "На 40 минут", "By 40 minutes"),
          text("На 60 хвилин", "На 60 минут", "By 60 minutes"),
        ],
        1,
      ),
      q(
        text(
          "Чому потяг мав відправитися лише ввечері?",
          "Почему поезд должен был отправиться только вечером?",
          "Why was the train not going to leave until the evening?",
        ),
        [
          text("Через погану погоду", "Из-за плохой погоды", "Because of bad weather"),
          text("Через аварію", "Из-за поломки", "Because of a technical failure"),
          text("Через страйк", "Из-за забастовки", "Because of a strike"),
        ],
        1,
      ),
      q(
        text(
          "Де Michał мав зробити пересадку?",
          "Где Michał должен был сделать пересадку?",
          "Where did Michał have to change trains?",
        ),
        [
          text("У Katowicach", "В Katowicach", "In Katowice"),
          text("У Krakowie", "В Krakowie", "In Kraków"),
          text("У Warszawie", "В Warszawie", "In Warsaw"),
        ],
        0,
      ),
      q(
        text(
          "Наскільки пізніше Michał прибув до Krakowa?",
          "Насколько позже Michał прибыл в Kraków?",
          "How much later did Michał arrive in Kraków?",
        ),
        [
          text("Приблизно на 30 хвилин", "Примерно на 30 минут", "About 30 minutes later"),
          text("Приблизно на одну годину", "Примерно на один час", "About one hour later"),
          text("Майже на дві години", "Почти на два часа", "Almost two hours later"),
        ],
        2,
      ),
    ],
  },
];
