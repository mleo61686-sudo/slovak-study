import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const PL_A2_PHRASES_3: Record<string, Phrase> = {
    // =========================
    // LESSON 21 — Дім (проблеми та майстер)
    // =========================
    [phraseKey("awaria", "a2-21")]: {
        sk: "Mieliśmy awarię ogrzewania w środku zimy.",
        ua: "У нас була поломка опалення посеред зими.",
        ru: "У нас была поломка отопления посреди зимы.",
        en: "We had a heating breakdown in the middle of winter.",
        tokens: ["Mieliśmy", "awarię", "ogrzewania", "w", "środku", "zimy", "."],
    },

    [phraseKey("hydraulik", "a2-21")]: {
        sk: "Hydraulik ma przyjść jutro rano.",
        ua: "Сантехнік має прийти завтра вранці.",
        ru: "Сантехник должен прийти завтра утром.",
        en: "The plumber is supposed to come tomorrow morning.",
        tokens: ["Hydraulik", "ma", "przyjść", "jutro", "rano", "."],
    },

    [phraseKey("elektryk", "a2-21")]: {
        sk: "Musieliśmy wezwać elektryka.",
        ua: "Нам довелося викликати електрика.",
        ru: "Нам пришлось вызвать электрика.",
        en: "We had to call an electrician.",
        tokens: ["Musieliśmy", "wezwać", "elektryka", "."],
    },

    [phraseKey("naprawić", "a2-21")]: {
        sk: "Trzeba jak najszybciej naprawić pralkę.",
        ua: "Треба якнайшвидше відремонтувати пральну машину.",
        ru: "Нужно как можно скорее починить стиральную машину.",
        en: "The washing machine needs to be repaired as soon as possible.",
        tokens: ["Trzeba", "jak", "najszybciej", "naprawić", "pralkę", "."],
    },

    [phraseKey("wymienić", "a2-21")]: {
        sk: "Musimy wymienić uszkodzony kabel.",
        ua: "Ми повинні замінити пошкоджений кабель.",
        ru: "Мы должны заменить повреждённый кабель.",
        en: "We need to replace the damaged cable.",
        tokens: ["Musimy", "wymienić", "uszkodzony", "kabel", "."],
    },

    [phraseKey("przepływ", "a2-21")]: {
        sk: "Przepływ wody jest za słaby.",
        ua: "Протікання води занадто слабке.",
        ru: "Поток воды слишком слабый.",
        en: "The water flow is too weak.",
        tokens: ["Przepływ", "wody", "jest", "za", "słaby", "."],
    },

    [phraseKey("zatkanie", "a2-21")]: {
        sk: "Zatkanie rury spowodowało duży problem.",
        ua: "Засмічення труби спричинило велику проблему.",
        ru: "Засор трубы вызвал большую проблему.",
        en: "The blockage in the pipe caused a big problem.",
        tokens: ["Zatkanie", "rury", "spowodowało", "duży", "problem", "."],
    },

    [phraseKey("przeciekać", "a2-21")]: {
        sk: "Krąn zaczął przeciekać w nocy.",
        ua: "Кран почав протікати вночі.",
        ru: "Кран начал протекать ночью.",
        en: "The tap started leaking at night.",
        tokens: ["Krąn", "zaczął", "przeciekać", "w", "nocy", "."],
    },

    [phraseKey("uszkodzenie", "a2-21")]: {
        sk: "Uszkodzenie było poważniejsze, niż myśleliśmy.",
        ua: "Пошкодження було серйознішим, ніж ми думали.",
        ru: "Повреждение оказалось серьёзнее, чем мы думали.",
        en: "The damage was more serious than we thought.",
        tokens: ["Uszkodzenie", "było", "poważniejsze", ",", "niż", "myśleliśmy", "."],
    },

    [phraseKey("część zamienna", "a2-21")]: {
        sk: "Serwisant zamówił nową część zamienną.",
        ua: "Майстер замовив нову запасну частину.",
        ru: "Мастер заказал новую запасную часть.",
        en: "The technician ordered a new spare part.",
        tokens: ["Serwisant", "zamówił", "nową", "część", "zamienną", "."],
    },

    // =========================
    // LESSON 22 — Здоровʼя (аптека та лікування)
    // =========================
    [phraseKey("skutki uboczne", "a2-22")]: {
        sk: "Ten lek może powodować skutki uboczne.",
        ua: "Ці ліки можуть викликати побічні ефекти.",
        ru: "Это лекарство может вызывать побочные эффекты.",
        en: "This medicine may cause side effects.",
        tokens: ["Ten", "lek", "może", "powodować", "skutki", "uboczne", "."],
    },

    [phraseKey("dawkowanie", "a2-22")]: {
        sk: "Proszę dokładnie przeczytać dawkowanie.",
        ua: "Будь ласка, уважно прочитайте дозування.",
        ru: "Пожалуйста, внимательно прочитайте дозировку.",
        en: "Please read the dosage instructions carefully.",
        tokens: ["Proszę", "dokładnie", "przeczytać", "dawkowanie", "."],
    },

    [phraseKey("instrukcja", "a2-22")]: {
        sk: "Instrukcja jest dołączona do opakowania.",
        ua: "Інструкція додається до упаковки.",
        ru: "Инструкция прилагается к упаковке.",
        en: "The instructions are attached to the package.",
        tokens: ["Instrukcja", "jest", "dołączona", "do", "opakowania", "."],
    },

    [phraseKey("lek przeciwbólowy", "a2-22")]: {
        sk: "Wziąłem lek przeciwbólowy po obiedzie.",
        ua: "Я прийняв знеболювальне після обіду.",
        ru: "Я принял обезболивающее после обеда.",
        en: "I took a painkiller after lunch.",
        tokens: ["Wziąłem", "lek", "przeciwbólowy", "po", "obiedzie", "."],
    },

    [phraseKey("antybiotyki", "a2-22")]: {
        sk: "Lekarz przepisał mi antybiotyki na tydzień.",
        ua: "Лікар прописав мені антибіотики на тиждень.",
        ru: "Врач прописал мне антибиотики на неделю.",
        en: "The doctor prescribed antibiotics for a week.",
        tokens: ["Lekarz", "przepisał", "mi", "antybiotyki", "na", "tydzień", "."],
    },

    [phraseKey("szczepienie", "a2-22")]: {
        sk: "Szczepienie odbyło się bez problemów.",
        ua: "Вакцинація пройшла без проблем.",
        ru: "Вакцинация прошла без проблем.",
        en: "The vaccination went without problems.",
        tokens: ["Szczepienie", "odbyło", "się", "bez", "problemów", "."],
    },

    [phraseKey("recepta", "a2-22")]: {
        sk: "Bez recepty nie dostanę tego leku.",
        ua: "Без рецепта я не отримаю ці ліки.",
        ru: "Без рецепта я не получу это лекарство.",
        en: "I will not get this medicine without a prescription.",
        tokens: ["Bez", "recepty", "nie", "dostanę", "tego", "leku", "."],
    },

    [phraseKey("bez recepty", "a2-22")]: {
        sk: "Ten syrop można kupić bez recepty.",
        ua: "Цей сироп можна купити без рецепта.",
        ru: "Этот сироп можно купить без рецепта.",
        en: "This syrup can be bought without a prescription.",
        tokens: ["Ten", "syrop", "można", "kupić", "bez", "recepty", "."],
    },

    [phraseKey("kontrola", "a2-22")]: {
        sk: "Mam kontrolę u lekarza za dwa tygodnie.",
        ua: "У мене контрольний огляд у лікаря через два тижні.",
        ru: "У меня контрольный осмотр у врача через две недели.",
        en: "I have a check-up with the doctor in two weeks.",
        tokens: ["Mam", "kontrolę", "u", "lekarza", "za", "dwa", "tygodnie", "."],
    },

    [phraseKey("dochodzić do zdrowia", "a2-22")]: {
        sk: "Po operacji powoli dochodzę do zdrowia.",
        ua: "Після операції я повільно одужую.",
        ru: "После операции я медленно выздоравливаю.",
        en: "I am slowly recovering after the operation.",
        tokens: ["Po", "operacji", "powoli", "dochodzę", "do", "zdrowia", "."],
    },

    // =========================
    // LESSON 23 — Місто (безпека та служби)
    // =========================
    [phraseKey("wypadek", "a2-23")]: {
        sk: "Na skrzyżowaniu wydarzył się wypadek.",
        ua: "На перехресті стався нещасний випадок.",
        ru: "На перекрёстке произошла авария.",
        en: "There was an accident at the intersection.",
        tokens: ["Na", "skrzyżowaniu", "wydarzył", "się", "wypadek", "."],
    },

    [phraseKey("karetka", "a2-23")]: {
        sk: "Karetka przyjechała bardzo szybko.",
        ua: "Швидка допомога приїхала дуже швидко.",
        ru: "Скорая помощь приехала очень быстро.",
        en: "The ambulance arrived very quickly.",
        tokens: ["Karetka", "przyjechała", "bardzo", "szybko", "."],
    },

    [phraseKey("strażacy", "a2-23")]: {
        sk: "Strażacy ugasili pożar w kilka minut.",
        ua: "Пожежники загасили пожежу за кілька хвилин.",
        ru: "Пожарные потушили пожар за несколько минут.",
        en: "The firefighters put out the fire in a few minutes.",
        tokens: ["Strażacy", "ugasili", "pożar", "w", "kilka", "minut", "."],
    },

    [phraseKey("komisariat policji", "a2-23")]: {
        sk: "Muszę iść na komisariat policji złożyć zgłoszenie.",
        ua: "Мені треба піти у відділок поліції й подати заяву.",
        ru: "Мне нужно пойти в отделение полиции и подать заявление.",
        en: "I need to go to the police station and file a report.",
        tokens: ["Muszę", "iść", "na", "komisariat", "policji", "złożyć", "zgłoszenie", "."],
    },

    [phraseKey("świadek", "a2-23")]: {
        sk: "Świadek opisał całe zdarzenie.",
        ua: "Свідок описав усю подію.",
        ru: "Свидетель описал всё происшествие.",
        en: "The witness described the whole incident.",
        tokens: ["Świadek", "opisał", "całe", "zdarzenie", "."],
    },

    [phraseKey("kradzież", "a2-23")]: {
        sk: "Muszę zgłosić kradzież telefonu.",
        ua: "Мені треба заявити про крадіжку телефону.",
        ru: "Мне нужно сообщить о краже телефона.",
        en: "I need to report the theft of my phone.",
        tokens: ["Muszę", "zgłosić", "kradzież", "telefonu", "."],
    },

    [phraseKey("zgłosić", "a2-23")]: {
        sk: "Proszę natychmiast zgłosić ten problem.",
        ua: "Будь ласка, негайно повідомте про цю проблему.",
        ru: "Пожалуйста, немедленно сообщите об этой проблеме.",
        en: "Please report this problem immediately.",
        tokens: ["Proszę", "natychmiast", "zgłosić", "ten", "problem", "."],
    },

    [phraseKey("dokumenty", "a2-23")]: {
        sk: "Straciłem wszystkie dokumenty.",
        ua: "Я загубив усі документи.",
        ru: "Я потерял все документы.",
        en: "I lost all my documents.",
        tokens: ["Straciłem", "wszystkie", "dokumenty", "."],
    },

    [phraseKey("stracić", "a2-23")]: {
        sk: "Nie chcę znowu stracić portfela.",
        ua: "Я не хочу знову загубити гаманець.",
        ru: "Я не хочу снова потерять кошелёк.",
        en: "I do not want to lose my wallet again.",
        tokens: ["Nie", "chcę", "znowu", "stracić", "portfela", "."],
    },

    [phraseKey("znaleźć", "a2-23")]: {
        sk: "Mam nadzieję, że uda się znaleźć właściciela.",
        ua: "Я сподіваюся, що вдасться знайти власника.",
        ru: "Я надеюсь, что удастся найти владельца.",
        en: "I hope it will be possible to find the owner.",
        tokens: ["Mam", "nadzieję", ",", "że", "uda", "się", "znaleźć", "właściciela", "."],
    },

    // =========================
    // LESSON 24 — Їжа (покупки та приготування)
    // =========================
    [phraseKey("składniki", "a2-24")]: {
        sk: "Najpierw musimy kupić wszystkie składniki.",
        ua: "Спочатку ми повинні купити всі інгредієнти.",
        ru: "Сначала мы должны купить все ингредиенты.",
        en: "First we need to buy all the ingredients.",
        tokens: ["Najpierw", "musimy", "kupić", "wszystkie", "składniki", "."],
    },

    [phraseKey("przepis", "a2-24")]: {
        sk: "Ten przepis jest bardzo prosty.",
        ua: "Цей рецепт дуже простий.",
        ru: "Этот рецепт очень простой.",
        en: "This recipe is very simple.",
        tokens: ["Ten", "przepis", "jest", "bardzo", "prosty", "."],
    },

    [phraseKey("pokroić", "a2-24")]: {
        sk: "Trzeba pokroić cebulę i pomidory.",
        ua: "Треба нарізати цибулю і помідори.",
        ru: "Нужно нарезать лук и помидоры.",
        en: "You need to chop the onion and tomatoes.",
        tokens: ["Trzeba", "pokroić", "cebulę", "i", "pomidory", "."],
    },

    [phraseKey("wymieszać", "a2-24")]: {
        sk: "Dokładnie wymieszaj wszystkie składniki.",
        ua: "Ретельно змішай усі інгредієнти.",
        ru: "Тщательно смешай все ингредиенты.",
        en: "Mix all the ingredients thoroughly.",
        tokens: ["Dokładnie", "wymieszaj", "wszystkie", "składniki", "."],
    },

    [phraseKey("usmażyć", "a2-24")]: {
        sk: "Najpierw trzeba usmażyć mięso.",
        ua: "Спочатку треба підсмажити м’ясо.",
        ru: "Сначала нужно обжарить мясо.",
        en: "First you need to fry the meat.",
        tokens: ["Najpierw", "trzeba", "usmażyć", "mięso", "."],
    },

    [phraseKey("ugotować", "a2-24")]: {
        sk: "Muszę ugotować ziemniaki na obiad.",
        ua: "Мені треба зварити картоплю на обід.",
        ru: "Мне нужно сварить картошку на обед.",
        en: "I need to cook potatoes for lunch.",
        tokens: ["Muszę", "ugotować", "ziemniaki", "na", "obiad", "."],
    },

    [phraseKey("upiec", "a2-24")]: {
        sk: "Chcę upiec ciasto na weekend.",
        ua: "Я хочу спекти торт на вихідні.",
        ru: "Я хочу испечь пирог на выходные.",
        en: "I want to bake a cake for the weekend.",
        tokens: ["Chcę", "upiec", "ciasto", "na", "weekend", "."],
    },

    [phraseKey("doprawić", "a2-24")]: {
        sk: "Na końcu trzeba doprawić zupę.",
        ua: "Наприкінці треба приправити суп.",
        ru: "В конце нужно приправить суп.",
        en: "At the end you need to season the soup.",
        tokens: ["Na", "końcu", "trzeba", "doprawić", "zupę", "."],
    },

    [phraseKey("porcja", "a2-24")]: {
        sk: "Ta porcja jest dla mnie za duża.",
        ua: "Ця порція для мене занадто велика.",
        ru: "Эта порция для меня слишком большая.",
        en: "This portion is too big for me.",
        tokens: ["Ta", "porcja", "jest", "dla", "mnie", "za", "duża", "."],
    },

    [phraseKey("resztki", "a2-24")]: {
        sk: "Resztki z obiadu włożyłem do lodówki.",
        ua: "Залишки після обіду я поклав у холодильник.",
        ru: "Остатки после обеда я положил в холодильник.",
        en: "I put the leftovers from lunch into the fridge.",
        tokens: ["Resztki", "z", "obiadu", "włożyłem", "do", "lodówki", "."],
    },

    // =========================
    // LESSON 25 — Подорожі (планування маршруту)
    // =========================
    [phraseKey("plan podróży", "a2-25")]: {
        sk: "Przygotowałem dokładny plan podróży.",
        ua: "Я підготував детальний план подорожі.",
        ru: "Я подготовил подробный план поездки.",
        en: "I prepared a detailed itinerary.",
        tokens: ["Przygotowałem", "dokładny", "plan", "podróży", "."],
    },

    [phraseKey("przesiadka", "a2-25")]: {
        sk: "W Berlinie mamy krótką przesiadkę.",
        ua: "У Берліні в нас коротка пересадка.",
        ru: "В Берлине у нас короткая пересадка.",
        en: "We have a short transfer in Berlin.",
        tokens: ["W", "Berlinie", "mamy", "krótką", "przesiadkę", "."],
    },

    [phraseKey("połączenie", "a2-25")]: {
        sk: "To połączenie jest najszybsze.",
        ua: "Це сполучення найшвидше.",
        ru: "Это сообщение самое быстрое.",
        en: "This connection is the fastest.",
        tokens: ["To", "połączenie", "jest", "najszybsze", "."],
    },

    [phraseKey("opóźnienie", "a2-25")]: {
        sk: "Przez opóźnienie nie zdążyliśmy na następny pociąg.",
        ua: "Через затримку ми не встигли на наступний поїзд.",
        ru: "Из-за задержки мы не успели на следующий поезд.",
        en: "Because of the delay we did not catch the next train.",
        tokens: ["Przez", "opóźnienie", "nie", "zdążyliśmy", "na", "następny", "pociąg", "."],
    },

    [phraseKey("anulowany", "a2-25")]: {
        sk: "Nasz lot został anulowany.",
        ua: "Наш рейс скасували.",
        ru: "Наш рейс был отменён.",
        en: "Our flight was cancelled.",
        tokens: ["Nasz", "lot", "został", "anulowany", "."],
    },

    [phraseKey("odprawa", "a2-25")]: {
        sk: "Odprawa zaczyna się dwie godziny przed lotem.",
        ua: "Реєстрація починається за дві години до рейсу.",
        ru: "Регистрация начинается за два часа до рейса.",
        en: "Check-in starts two hours before the flight.",
        tokens: ["Odprawa", "zaczyna", "się", "dwie", "godziny", "przed", "lotem", "."],
    },

    [phraseKey("rozkład jazdy", "a2-25")]: {
        sk: "Sprawdziłem rozkład jazdy w aplikacji.",
        ua: "Я перевірив розклад руху в додатку.",
        ru: "Я проверил расписание движения в приложении.",
        en: "I checked the timetable in the app.",
        tokens: ["Sprawdziłem", "rozkład", "jazdy", "w", "aplikacji", "."],
    },

    [phraseKey("bilet powrotny", "a2-25")]: {
        sk: "Potrzebuję biletu powrotnego na poniedziałek.",
        ua: "Мені потрібен квиток туди-назад на понеділок.",
        ru: "Мне нужен обратный билет на понедельник.",
        en: "I need a return ticket for Monday.",
        tokens: ["Potrzebuję", "biletu", "powrotnego", "na", "poniedziałek", "."],
    },

    [phraseKey("bilet w jedną stronę", "a2-25")]: {
        sk: "Na razie kupuję tylko bilet w jedną stronę.",
        ua: "Поки що я купую лише квиток в один бік.",
        ru: "Пока я покупаю только билет в одну сторону.",
        en: "For now I am buying only a one-way ticket.",
        tokens: ["Na", "razie", "kupuję", "tylko", "bilet", "w", "jedną", "stronę", "."],
    },

    [phraseKey("bilet", "a2-25")]: {
        sk: "Muszę jeszcze kupić bilet na autobus.",
        ua: "Мені ще треба купити квиток на автобус.",
        ru: "Мне ещё нужно купить билет на автобус.",
        en: "I still need to buy a ticket for the bus.",
        tokens: ["Muszę", "jeszcze", "kupić", "bilet", "na", "autobus", "."],
    },
    // =========================
    // LESSON 26 — Комунікація та інформація
    // =========================
    [phraseKey("wiadomość", "a2-26")]: {
        sk: "Dostałem ważną wiadomość od szefa.",
        ua: "Я отримав важливе повідомлення від начальника.",
        ru: "Я получил важное сообщение от начальника.",
        en: "I received an important message from my boss.",
        tokens: ["Dostałem", "ważną", "wiadomość", "od", "szefa", "."],
    },

    [phraseKey("ogłoszenie", "a2-26")]: {
        sk: "Widziałeś nowe ogłoszenie na stronie?",
        ua: "Ти бачив нове оголошення на сайті?",
        ru: "Ты видел новое объявление на сайте?",
        en: "Did you see the new announcement on the website?",
        tokens: ["Widziałeś", "nowe", "ogłoszenie", "na", "stronie", "?"],
    },

    [phraseKey("artykuł", "a2-26")]: {
        sk: "Przeczytałem ciekawy artykuł o zdrowiu.",
        ua: "Я прочитав цікаву статтю про здоров’я.",
        ru: "Я прочитал интересную статью о здоровье.",
        en: "I read an interesting article about health.",
        tokens: ["Przeczytałem", "ciekawy", "artykuł", "o", "zdrowiu", "."],
    },

    [phraseKey("źródło informacji", "a2-26")]: {
        sk: "To nie jest wiarygodne źródło informacji.",
        ua: "Це не є надійним джерелом інформації.",
        ru: "Это не является надёжным источником информации.",
        en: "This is not a reliable source of information.",
        tokens: ["To", "nie", "jest", "wiarygodne", "źródło", "informacji", "."],
    },

    [phraseKey("opublikować", "a2-26")]: {
        sk: "Gazeta opublikowała nowy artykuł rano.",
        ua: "Газета опублікувала нову статтю вранці.",
        ru: "Газета опубликовала новую статью утром.",
        en: "The newspaper published a new article in the morning.",
        tokens: ["Gazeta", "opublikowała", "nowy", "artykuł", "rano", "."],
    },

    [phraseKey("ujawnić", "a2-26")]: {
        sk: "Rząd ujawnił nowe informacje wczoraj.",
        ua: "Уряд оприлюднив нову інформацію вчора.",
        ru: "Правительство обнародовало новую информацию вчера.",
        en: "The government revealed new information yesterday.",
        tokens: ["Rząd", "ujawnił", "nowe", "informacje", "wczoraj", "."],
    },

    [phraseKey("reagować", "a2-26")]: {
        sk: "Trzeba szybko reagować na takie wiadomości.",
        ua: "На такі повідомлення треба швидко реагувати.",
        ru: "На такие сообщения нужно быстро реагировать.",
        en: "You need to react quickly to such messages.",
        tokens: ["Trzeba", "szybko", "reagować", "na", "takie", "wiadomości", "."],
    },

    [phraseKey("dyskusja", "a2-26")]: {
        sk: "Po artykule rozpoczęła się długa dyskusja.",
        ua: "Після статті почалася довга дискусія.",
        ru: "После статьи началась долгая дискуссия.",
        en: "A long discussion started after the article.",
        tokens: ["Po", "artykule", "rozpoczęła", "się", "długa", "dyskusja", "."],
    },

    [phraseKey("opinia", "a2-26")]: {
        sk: "Każdy ma prawo do własnej opinii.",
        ua: "Кожен має право на власну думку.",
        ru: "Каждый имеет право на собственное мнение.",
        en: "Everyone has the right to their own opinion.",
        tokens: ["Każdy", "ma", "prawo", "do", "własnej", "opinii", "."],
    },

    [phraseKey("wpływ", "a2-26")]: {
        sk: "Media mają duży wpływ na ludzi.",
        ua: "Медіа мають великий вплив на людей.",
        ru: "Медиа оказывают большое влияние на людей.",
        en: "Media have a big influence on people.",
        tokens: ["Media", "mają", "duży", "wpływ", "na", "ludzi", "."],
    },

    // =========================
    // LESSON 27 — Комунікація (заперечення та аргументи)
    // =========================
    [phraseKey("wręcz przeciwnie", "a2-27")]: {
        sk: "Wręcz przeciwnie, to był bardzo dobry pomysł.",
        ua: "Навпаки, це була дуже хороша ідея.",
        ru: "Наоборот, это была очень хорошая идея.",
        en: "On the contrary, it was a very good idea.",
        tokens: ["Wręcz", "przeciwnie", ",", "to", "był", "bardzo", "dobry", "pomysł", "."],
    },

    [phraseKey("w rzeczywistości", "a2-27")]: {
        sk: "W rzeczywistości wszystko wygląda inaczej.",
        ua: "Насправді все виглядає інакше.",
        ru: "На самом деле всё выглядит иначе.",
        en: "In reality everything looks different.",
        tokens: ["W", "rzeczywistości", "wszystko", "wygląda", "inaczej", "."],
    },

    [phraseKey("dowód", "a2-27")]: {
        sk: "Masz na to jakiś dowód?",
        ua: "У тебе є якийсь доказ цього?",
        ru: "У тебя есть какое-нибудь доказательство этого?",
        en: "Do you have any proof of that?",
        tokens: ["Masz", "na", "to", "jakiś", "dowód", "?"],
    },

    [phraseKey("argument", "a2-27")]: {
        sk: "To był najmocniejszy argument w tej dyskusji.",
        ua: "Це був найсильніший аргумент у цій дискусії.",
        ru: "Это был самый сильный аргумент в этой дискуссии.",
        en: "That was the strongest argument in this discussion.",
        tokens: ["To", "był", "najmocniejszy", "argument", "w", "tej", "dyskusji", "."],
    },

    [phraseKey("powód", "a2-27")]: {
        sk: "Jaki jest powód tej decyzji?",
        ua: "Яка причина цього рішення?",
        ru: "Какова причина этого решения?",
        en: "What is the reason for this decision?",
        tokens: ["Jaki", "jest", "powód", "tej", "decyzji", "?"],
    },

    [phraseKey("zaleta", "a2-27")]: {
        sk: "Największą zaletą tej pracy jest elastyczny grafik.",
        ua: "Найбільшою перевагою цієї роботи є гнучкий графік.",
        ru: "Самое большое преимущество этой работы — гибкий график.",
        en: "The biggest advantage of this job is a flexible schedule.",
        tokens: ["Największą", "zaletą", "tej", "pracy", "jest", "elastyczny", "grafik", "."],
    },

    [phraseKey("wada", "a2-27")]: {
        sk: "Jedyną wadą jest wysoka cena.",
        ua: "Єдиним недоліком є висока ціна.",
        ru: "Единственный недостаток — высокая цена.",
        en: "The only disadvantage is the high price.",
        tokens: ["Jedyną", "wadą", "jest", "wysoka", "cena", "."],
    },

    [phraseKey("zależy", "a2-27")]: {
        sk: "To zależy od sytuacji.",
        ua: "Це залежить від ситуації.",
        ru: "Это зависит от ситуации.",
        en: "It depends on the situation.",
        tokens: ["To", "zależy", "od", "sytuacji", "."],
    },

    [phraseKey("przekonać", "a2-27")]: {
        sk: "Niełatwo było mnie przekonać.",
        ua: "Мене було нелегко переконати.",
        ru: "Меня было нелегко убедить.",
        en: "It was not easy to convince me.",
        tokens: ["Niełatwo", "było", "mnie", "przekonać", "."],
    },

    [phraseKey("zgadzać się z tym", "a2-27")]: {
        sk: "Nie mogę się z tym zgadzać.",
        ua: "Я не можу з цим погодитися.",
        ru: "Я не могу с этим согласиться.",
        en: "I cannot agree with that.",
        tokens: ["Nie", "mogę", "się", "z", "tym", "zgadzać", "."],
    },

    // =========================
    // LESSON 28 — Технології (інтернет та безпека)
    // =========================
    [phraseKey("prywatność", "a2-28")]: {
        sk: "W internecie trzeba dbać o prywatność.",
        ua: "В інтернеті треба дбати про приватність.",
        ru: "В интернете нужно заботиться о приватности.",
        en: "You need to care about privacy on the internet.",
        tokens: ["W", "internecie", "trzeba", "dbać", "o", "prywatność", "."],
    },

    [phraseKey("bezpieczeństwo", "a2-28")]: {
        sk: "Bezpieczeństwo danych jest bardzo ważne.",
        ua: "Безпека даних є дуже важливою.",
        ru: "Безопасность данных очень важна.",
        en: "Data security is very important.",
        tokens: ["Bezpieczeństwo", "danych", "jest", "bardzo", "ważne", "."],
    },

    [phraseKey("weryfikacja", "a2-28")]: {
        sk: "Weryfikacja konta zajęła kilka minut.",
        ua: "Верифікація акаунта зайняла кілька хвилин.",
        ru: "Проверка аккаунта заняла несколько минут.",
        en: "The account verification took a few minutes.",
        tokens: ["Weryfikacja", "konta", "zajęła", "kilka", "minut", "."],
    },

    [phraseKey("uwierzytelnianie dwuskładnikowe", "a2-28")]: {
        sk: "Włączyłem uwierzytelnianie dwuskładnikowe dla większego bezpieczeństwa.",
        ua: "Я увімкнув двофакторну перевірку для більшої безпеки.",
        ru: "Я включил двухфакторную аутентификацию для большей безопасности.",
        en: "I turned on two-factor authentication for greater security.",
        tokens: ["Włączyłem", "uwierzytelnianie", "dwuskładnikowe", "dla", "większego", "bezpieczeństwa", "."],
    },

    [phraseKey("oszustwo", "a2-28")]: {
        sk: "To może być internetowe oszustwo.",
        ua: "Це може бути інтернет-шахрайство.",
        ru: "Это может быть интернет-мошенничество.",
        en: "This may be online fraud.",
        tokens: ["To", "może", "być", "internetowe", "oszustwo", "."],
    },

    [phraseKey("link", "a2-28")]: {
        sk: "Nie klikaj w podejrzany link.",
        ua: "Не натискай на підозріле посилання.",
        ru: "Не нажимай на подозрительную ссылку.",
        en: "Do not click on a suspicious link.",
        tokens: ["Nie", "klikaj", "w", "podejrzany", "link", "."],
    },

    [phraseKey("pobrać plik", "a2-28")]: {
        sk: "Nie chcę pobrać pliku z nieznanej strony.",
        ua: "Я не хочу завантажувати файл з невідомого сайту.",
        ru: "Я не хочу скачивать файл с неизвестного сайта.",
        en: "I do not want to download a file from an unknown site.",
        tokens: ["Nie", "chcę", "pobrać", "pliku", "z", "nieznanej", "strony", "."],
    },

    [phraseKey("wirus", "a2-28")]: {
        sk: "Komputer może mieć wirusa.",
        ua: "Комп’ютер може мати вірус.",
        ru: "В компьютере может быть вирус.",
        en: "The computer may have a virus.",
        tokens: ["Komputer", "może", "mieć", "wirusa", "."],
    },

    [phraseKey("zablokować", "a2-28")]: {
        sk: "Musiałem zablokować to konto.",
        ua: "Мені довелося заблокувати цей акаунт.",
        ru: "Мне пришлось заблокировать этот аккаунт.",
        en: "I had to block this account.",
        tokens: ["Musiałem", "zablokować", "to", "konto", "."],
    },

    [phraseKey("zresetować hasło", "a2-28")]: {
        sk: "Muszę zresetować hasło do poczty.",
        ua: "Мені треба відновити пароль до пошти.",
        ru: "Мне нужно сбросить пароль от почты.",
        en: "I need to reset the email password.",
        tokens: ["Muszę", "zresetować", "hasło", "do", "poczty", "."],
    },

    // =========================
    // LESSON 29 — Емоції (розширено)
    // =========================
    [phraseKey("rozczarowany", "a2-29")]: {
        sk: "Byłem naprawdę rozczarowany wynikiem.",
        ua: "Я був справді розчарований результатом.",
        ru: "Я был действительно разочарован результатом.",
        en: "I was really disappointed with the result.",
        tokens: ["Byłem", "naprawdę", "rozczarowany", "wynikiem", "."],
    },

    [phraseKey("zdenerwowany", "a2-29")]: {
        sk: "Byłem bardzo zdenerwowany przed rozmową.",
        ua: "Я був дуже злий перед розмовою.",
        ru: "Я был очень раздражён перед разговором.",
        en: "I was very angry before the conversation.",
        tokens: ["Byłem", "bardzo", "zdenerwowany", "przed", "rozmową", "."],
    },

    [phraseKey("zachwycony", "a2-29")]: {
        sk: "Byłem zachwycony tym miejscem.",
        ua: "Я був захоплений цим місцем.",
        ru: "Я был в восторге от этого места.",
        en: "I was delighted with this place.",
        tokens: ["Byłem", "zachwycony", "tym", "miejscem", "."],
    },

    [phraseKey("zdezorientowany", "a2-29")]: {
        sk: "Po tej informacji byłem trochę zdezorientowany.",
        ua: "Після цієї інформації я був трохи розгублений.",
        ru: "После этой информации я был немного растерян.",
        en: "After this information I was a little confused.",
        tokens: ["Po", "tej", "informacji", "byłem", "trochę", "zdezorientowany", "."],
    },

    [phraseKey("zaniepokojony", "a2-29")]: {
        sk: "Rodzice byli zaniepokojeni moim stanem.",
        ua: "Батьки були стурбовані моїм станом.",
        ru: "Родители были обеспокоены моим состоянием.",
        en: "My parents were worried about my condition.",
        tokens: ["Rodzice", "byli", "zaniepokojeni", "moim", "stanem", "."],
    },

    [phraseKey("dumny", "a2-29")]: {
        sk: "Jestem dumny z moich postępów.",
        ua: "Я пишаюся своїм прогресом.",
        ru: "Я горжусь своим прогрессом.",
        en: "I am proud of my progress.",
        tokens: ["Jestem", "dumny", "z", "moich", "postępów", "."],
    },

    [phraseKey("wdzięczny", "a2-29")]: {
        sk: "Jestem ci bardzo wdzięczny za pomoc.",
        ua: "Я дуже вдячний тобі за допомогу.",
        ru: "Я очень благодарен тебе за помощь.",
        en: "I am very grateful to you for your help.",
        tokens: ["Jestem", "ci", "bardzo", "wdzięczny", "za", "pomoc", "."],
    },

    [phraseKey("wstydzić się", "a2-29")]: {
        sk: "Nie powinieneś się tego wstydzić.",
        ua: "Тобі не варто цього соромитися.",
        ru: "Тебе не должно быть стыдно за это.",
        en: "You should not be ashamed of it.",
        tokens: ["Nie", "powinieneś", "się", "tego", "wstydzić", "."],
    },

    [phraseKey("żałować", "a2-29")]: {
        sk: "Nie chcę później tego żałować.",
        ua: "Я не хочу потім про це шкодувати.",
        ru: "Я не хочу потом об этом жалеть.",
        en: "I do not want to regret it later.",
        tokens: ["Nie", "chcę", "później", "tego", "żałować", "."],
    },

    [phraseKey("poczuć ulgę", "a2-29")]: {
        sk: "Po egzaminie poczułem wielką ulgę.",
        ua: "Після іспиту я відчув велике полегшення.",
        ru: "После экзамена я почувствовал большое облегчение.",
        en: "After the exam I felt great relief.",
        tokens: ["Po", "egzaminie", "poczułem", "wielką", "ulgę", "."],
    },

    // =========================
    // LESSON 30 — Повторення A2 (21–29)
    // =========================
    [phraseKey("część zamienna", "a2-30")]: {
        sk: "Bez tej części zamiennej naprawa nie będzie możliwa.",
        ua: "Без цієї запасної частини ремонт буде неможливий.",
        ru: "Без этой запасной части ремонт будет невозможен.",
        en: "Without this spare part the repair will not be possible.",
        tokens: ["Bez", "tej", "części", "zamiennej", "naprawa", "nie", "będzie", "możliwa", "."],
    },

    [phraseKey("dawkowanie", "a2-30")]: {
        sk: "Musisz przestrzegać zalecanego dawkowania.",
        ua: "Ти повинен дотримуватися рекомендованого дозування.",
        ru: "Ты должен соблюдать рекомендованную дозировку.",
        en: "You must follow the recommended dosage.",
        tokens: ["Musisz", "przestrzegać", "zalecanego", "dawkowania", "."],
    },

    [phraseKey("kradzież", "a2-30")]: {
        sk: "Kradzież została zgłoszona na policję.",
        ua: "Про крадіжку було повідомлено в поліцію.",
        ru: "О краже сообщили в полицию.",
        en: "The theft was reported to the police.",
        tokens: ["Kradzież", "została", "zgłoszona", "na", "policję", "."],
    },

    [phraseKey("składniki", "a2-30")]: {
        sk: "Wszystkie składniki są już przygotowane.",
        ua: "Усі інгредієнти вже підготовлені.",
        ru: "Все ингредиенты уже подготовлены.",
        en: "All the ingredients are already prepared.",
        tokens: ["Wszystkie", "składniki", "są", "już", "przygotowane", "."],
    },

    [phraseKey("plan podróży", "a2-30")]: {
        sk: "Musimy jeszcze sprawdzić plan podróży.",
        ua: "Нам ще треба перевірити план подорожі.",
        ru: "Нам ещё нужно проверить план поездки.",
        en: "We still need to check the itinerary.",
        tokens: ["Musimy", "jeszcze", "sprawdzić", "plan", "podróży", "."],
    },

    [phraseKey("pasek wynagrodzenia", "a2-30")]: {
        sk: "Dostałem dziś pasek wynagrodzenia.",
        ua: "Сьогодні я отримав розрахунковий лист.",
        ru: "Сегодня я получил расчётный листок.",
        en: "I received my pay slip today.",
        tokens: ["Dostałem", "dziś", "pasek", "wynagrodzenia", "."],
    },

    [phraseKey("argument", "a2-30")]: {
        sk: "To był przekonujący argument.",
        ua: "Це був переконливий аргумент.",
        ru: "Это был убедительный аргумент.",
        en: "That was a convincing argument.",
        tokens: ["To", "był", "przekonujący", "argument", "."],
    },

    [phraseKey("oszustwo", "a2-30")]: {
        sk: "To wyglądało jak zwykłe oszustwo.",
        ua: "Це виглядало як звичайне шахрайство.",
        ru: "Это выглядело как обычное мошенничество.",
        en: "It looked like ordinary fraud.",
        tokens: ["To", "wyglądało", "jak", "zwykłe", "oszustwo", "."],
    },

    [phraseKey("zaniepokojony", "a2-30")]: {
        sk: "Byłem zaniepokojony tą wiadomością.",
        ua: "Я був стурбований цією новиною.",
        ru: "Я был обеспокоен этой новостью.",
        en: "I was worried by this news.",
        tokens: ["Byłem", "zaniepokojony", "tą", "wiadomością", "."],
    },

    [phraseKey("zależy", "a2-30")]: {
        sk: "To naprawdę zależy od okoliczności.",
        ua: "Це справді залежить від обставин.",
        ru: "Это действительно зависит от обстоятельств.",
        en: "It really depends on the circumstances.",
        tokens: ["To", "naprawdę", "zależy", "od", "okoliczności", "."],
    },
};
