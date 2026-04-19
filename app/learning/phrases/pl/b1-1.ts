import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const PL_B1_PHRASES_1: Record<string, Phrase> = {
    // =========================
    // LESSON 1 — Робота та кар’єра
    // =========================
    [phraseKey("czas pracy", "b1-1")]: {
        sk: "Mój czas pracy zaczyna się o ósmej, dlatego wstaję bardzo wcześnie.",
        ua: "Мій робочий час починається о восьмій, тому я встаю дуже рано.",
        ru: "Моё рабочее время начинается в восемь, поэтому я встаю очень рано.",
        en: "My working hours start at eight, so I wake up very early.",
        tokens: ["Mój", "czas", "pracy", "zaczyna", "się", "o", "ósmej", ",", "dlatego", "wstaję", "bardzo", "wcześnie", "."],
    },

    [phraseKey("rozpoczęcie", "b1-1")]: {
        sk: "Rozpoczęcie pracy zostało przesunięte, ponieważ firma nie była gotowa.",
        ua: "Початок роботи перенесли, оскільки компанія не була готова.",
        ru: "Начало работы перенесли, так как компания не была готова.",
        en: "The start date was postponed because the company was not ready.",
        tokens: ["Rozpoczęcie", "pracy", "zostało", "przesunięte", ",", "ponieważ", "firma", "nie", "była", "gotowa", "."],
    },

    [phraseKey("okres próbny", "b1-1")]: {
        sk: "Podczas okresu próbnego musisz pokazać swoje umiejętności.",
        ua: "Під час випробувального терміну ти повинен показати свої навички.",
        ru: "Во время испытательного срока ты должен показать свои навыки.",
        en: "During the probation period, you have to show your skills.",
        tokens: ["Podczas", "okresu", "próbnego", "musisz", "pokazać", "swoje", "umiejętności", "."],
    },

    [phraseKey("stosunek pracy", "b1-1")]: {
        sk: "Stosunek pracy reguluje umowa, dlatego trzeba ją dokładnie przeczytać.",
        ua: "Трудові відносини регулює договір, тому його треба уважно прочитати.",
        ru: "Трудовые отношения регулирует договор, поэтому его нужно внимательно прочитать.",
        en: "The employment relationship is regulated by the contract, so it should be read carefully.",
        tokens: ["Stosunek", "pracy", "reguluje", "umowa", ",", "dlatego", "trzeba", "ją", "dokładnie", "przeczytać", "."],
    },

    [phraseKey("wypłata", "b1-1")]: {
        sk: "Wypłata przyszła późno, więc nie mogłem zapłacić rachunków na czas.",
        ua: "Зарплата прийшла пізно, тому я не зміг вчасно оплатити рахунки.",
        ru: "Зарплата пришла поздно, поэтому я не смог вовремя оплатить счета.",
        en: "The salary came late, so I couldn't pay the bills on time.",
        tokens: ["Wypłata", "przyszła", "późno", ",", "więc", "nie", "mogłem", "zapłacić", "rachunków", "na", "czas", "."],
    },

    [phraseKey("wkład", "b1-1")]: {
        sk: "Twój wkład w projekt był bardzo ważny, dlatego dziękujemy za pomoc.",
        ua: "Твій внесок у проєкт був дуже важливим, тому дякуємо за допомогу.",
        ru: "Твой вклад в проект был очень важен, поэтому спасибо за помощь.",
        en: "Your contribution to the project was very important, so thank you for your help.",
        tokens: ["Twój", "wkład", "w", "projekt", "był", "bardzo", "ważny", ",", "dlatego", "dziękujemy", "za", "pomoc", "."],
    },

    [phraseKey("frekwencja", "b1-1")]: {
        sk: "Frekwencja w pracy jest ważna, ponieważ wpływa na ocenę pracownika.",
        ua: "Відвідуваність на роботі важлива, оскільки впливає на оцінку працівника.",
        ru: "Посещаемость на работе важна, так как влияет на оценку сотрудника.",
        en: "Attendance at work is important because it affects employee evaluation.",
        tokens: ["Frekwencja", "w", "pracy", "jest", "ważna", ",", "ponieważ", "wpływa", "na", "ocenę", "pracownika", "."],
    },

    [phraseKey("benefit", "b1-1")]: {
        sk: "Firma oferuje wiele benefitów, dlatego praca tutaj jest atrakcyjna.",
        ua: "Компанія пропонує багато бонусів, тому робота тут приваблива.",
        ru: "Компания предлагает много бонусов, поэтому работа здесь привлекательна.",
        en: "The company offers many benefits, so working here is attractive.",
        tokens: ["Firma", "oferuje", "wiele", "benefitów", ",", "dlatego", "praca", "tutaj", "jest", "atrakcyjna", "."],
    },

    [phraseKey("przełożony", "b1-1")]: {
        sk: "Mój przełożony zawsze pomaga, gdy mam problem w pracy.",
        ua: "Мій керівник завжди допомагає, коли в мене є проблема на роботі.",
        ru: "Мой начальник всегда помогает, когда у меня есть проблема на работе.",
        en: "My supervisor always helps when I have a problem at work.",
        tokens: ["Mój", "przełożony", "zawsze", "pomaga", ",", "gdy", "mam", "problem", "w", "pracy", "."],
    },

    [phraseKey("podwładny", "b1-1")]: {
        sk: "Dobry szef powinien słuchać swoich podwładnych.",
        ua: "Хороший начальник повинен слухати своїх підлеглих.",
        ru: "Хороший начальник должен слушать своих подчинённых.",
        en: "A good boss should listen to his subordinates.",
        tokens: ["Dobry", "szef", "powinien", "słuchać", "swoich", "podwładnych", "."],
    },

    // =========================
    // LESSON 2 — Комунікація в команді
    // =========================
    [phraseKey("nieporozumienie", "b1-2")]: {
        sk: "Doszło do nieporozumienia, ponieważ źle zrozumieliśmy wiadomość.",
        ua: "Сталося непорозуміння, оскільки ми неправильно зрозуміли повідомлення.",
        ru: "Произошло недоразумение, потому что мы неправильно поняли сообщение.",
        en: "There was a misunderstanding because we misunderstood the message.",
        tokens: ["Doszło", "do", "nieporozumienia", ",", "ponieważ", "źle", "zrozumieliśmy", "wiadomość", "."],
    },

    [phraseKey("współpraca", "b1-2")]: {
        sk: "Dobra współpraca w zespole jest kluczem do sukcesu.",
        ua: "Хороша співпраця в команді є ключем до успіху.",
        ru: "Хорошее сотрудничество в команде — ключ к успеху.",
        en: "Good teamwork is the key to success.",
        tokens: ["Dobra", "współpraca", "w", "zespole", "jest", "kluczem", "do", "sukcesu", "."],
    },

    [phraseKey("komunikacja", "b1-2")]: {
        sk: "Komunikacja między pracownikami musi być jasna i zrozumiała.",
        ua: "Комунікація між працівниками повинна бути чіткою і зрозумілою.",
        ru: "Коммуникация между сотрудниками должна быть ясной и понятной.",
        en: "Communication between employees must be clear and understandable.",
        tokens: ["Komunikacja", "między", "pracownikami", "musi", "być", "jasna", "i", "zrozumiała", "."],
    },

    [phraseKey("wypowiedzieć się", "b1-2")]: {
        sk: "Każdy ma prawo wypowiedzieć się na spotkaniu.",
        ua: "Кожен має право висловитися на зустрічі.",
        ru: "Каждый имеет право высказаться на встрече.",
        en: "Everyone has the right to express themselves at the meeting.",
        tokens: ["Każdy", "ma", "prawo", "wypowiedzieć", "się", "na", "spotkaniu", "."],
    },

    [phraseKey("zaproponować", "b1-2")]: {
        sk: "Chcę zaproponować nowe rozwiązanie, które może pomóc zespołowi.",
        ua: "Я хочу запропонувати нове рішення, яке може допомогти команді.",
        ru: "Я хочу предложить новое решение, которое может помочь команде.",
        en: "I want to suggest a new solution that can help the team.",
        tokens: ["Chcę", "zaproponować", "nowe", "rozwiązanie", ",", "które", "może", "pomóc", "zespołowi", "."],
    },

    [phraseKey("zgoda", "b1-2")]: {
        sk: "Doszliśmy do zgody po długiej rozmowie.",
        ua: "Ми дійшли згоди після довгої розмови.",
        ru: "Мы пришли к согласию после долгого разговора.",
        en: "We reached an agreement after a long conversation.",
        tokens: ["Doszliśmy", "do", "zgody", "po", "długiej", "rozmowie", "."],
    },

    [phraseKey("brak zgody", "b1-2")]: {
        sk: "Brak zgody może prowadzić do konfliktów w pracy.",
        ua: "Незгода може призвести до конфліктів на роботі.",
        ru: "Несогласие может привести к конфликтам на работе.",
        en: "Disagreement can lead to conflicts at work.",
        tokens: ["Brak", "zgody", "może", "prowadzić", "do", "konfliktów", "w", "pracy", "."],
    },

    [phraseKey("wyjaśnienie", "b1-2")]: {
        sk: "Poprosiłem o wyjaśnienie, ponieważ sytuacja była niejasna.",
        ua: "Я попросив пояснення, оскільки ситуація була незрозумілою.",
        ru: "Я попросил объяснение, так как ситуация была неясной.",
        en: "I asked for an explanation because the situation was unclear.",
        tokens: ["Poprosiłem", "o", "wyjaśnienie", ",", "ponieważ", "sytuacja", "była", "niejasna", "."],
    },

    [phraseKey("powiadomić", "b1-2")]: {
        sk: "Musisz powiadomić zespół o zmianach.",
        ua: "Ти повинен повідомити команду про зміни.",
        ru: "Ты должен уведомить команду об изменениях.",
        en: "You need to inform the team about the changes.",
        tokens: ["Musisz", "powiadomić", "zespół", "o", "zmianach", "."],
    },

    [phraseKey("reagować", "b1-2")]: {
        sk: "Trzeba szybko reagować na problemy.",
        ua: "Треба швидко реагувати на проблеми.",
        ru: "Нужно быстро реагировать на проблемы.",
        en: "You need to react quickly to problems.",
        tokens: ["Trzeba", "szybko", "reagować", "na", "problemy", "."],
    },

    // =========================
    // LESSON 3 — Подорожі та транспорт
    // =========================
    [phraseKey("bagaż podręczny", "b1-3")]: {
        sk: "Mój bagaż podręczny był za duży, dlatego musiałem go nadać.",
        ua: "Моя ручна поклажа була занадто великою, тому мені довелося її здати.",
        ru: "Моя ручная кладь была слишком большой, поэтому мне пришлось её сдать.",
        en: "My carry-on luggage was too big, so I had to check it in.",
        tokens: ["Mój", "bagaż", "podręczny", "był", "za", "duży", ",", "dlatego", "musiałem", "go", "nadać", "."],
    },
    [phraseKey("rozpoczęcie", "b1-3")]: {
        sk: "Rozpoczęcie boardingu zostało opóźnione, ponieważ samolot przyleciał późno.",
        ua: "Посадку затримали, оскільки літак прибув пізно.",
        ru: "Посадку задержали, так как самолёт прибыл поздно.",
        en: "Boarding was delayed because the plane arrived late.",
        tokens: ["Rozpoczęcie", "boardingu", "zostało", "opóźnione", ",", "ponieważ", "samolot", "przyleciał", "późno", "."],
    },

    [phraseKey("pasażer", "b1-3")]: {
        sk: "Każdy pasażer musi mieć ważny dokument podróży.",
        ua: "Кожен пасажир повинен мати дійсний проїзний документ.",
        ru: "Каждый пассажир должен иметь действительный проездной документ.",
        en: "Every passenger must have a valid travel document.",
        tokens: ["Każdy", "pasażer", "musi", "mieć", "ważny", "dokument", "podróży", "."],
    },

    [phraseKey("anulowanie", "b1-3")]: {
        sk: "Anulowanie lotu spowodowało duże problemy dla pasażerów.",
        ua: "Скасування рейсу спричинило великі проблеми для пасажирів.",
        ru: "Отмена рейса вызвала большие проблемы для пассажиров.",
        en: "The cancellation of the flight caused major problems for passengers.",
        tokens: ["Anulowanie", "lotu", "spowodowało", "duże", "problemy", "dla", "pasażerów", "."],
    },

    [phraseKey("przesiadać się", "b1-3")]: {
        sk: "Musiałem przesiadać się w innym mieście, dlatego podróż trwała dłużej.",
        ua: "Мені довелося робити пересадку в іншому місті, тому подорож тривала довше.",
        ru: "Мне пришлось делать пересадку в другом городе, поэтому поездка длилась дольше.",
        en: "I had to transfer in another city, so the trip took longer.",
        tokens: ["Musiałem", "przesiadać", "się", "w", "innym", "mieście", ",", "dlatego", "podróż", "trwała", "dłużej", "."],
    },

    [phraseKey("dokument podróży", "b1-3")]: {
        sk: "Bez dokumentu podróży nie możesz przekroczyć granicy.",
        ua: "Без проїзного документа ти не можеш перетнути кордон.",
        ru: "Без проездного документа ты не можешь пересечь границу.",
        en: "Without a travel document, you cannot cross the border.",
        tokens: ["Bez", "dokumentu", "podróży", "nie", "możesz", "przekroczyć", "granicy", "."],
    },

    [phraseKey("kontrola bezpieczeństwa", "b1-3")]: {
        sk: "Kontrola bezpieczeństwa była bardzo dokładna, dlatego trwała długo.",
        ua: "Контроль безпеки був дуже ретельним, тому тривав довго.",
        ru: "Контроль безопасности был очень тщательным, поэтому длился долго.",
        en: "The security check was very thorough, so it took a long time.",
        tokens: ["Kontrola", "bezpieczeństwa", "była", "bardzo", "dokładna", ",", "dlatego", "trwała", "długo", "."],
    },

    [phraseKey("karta pokładowa", "b1-3")]: {
        sk: "Zapomniałem wydrukować kartę pokładową, więc musiałem to zrobić na lotnisku.",
        ua: "Я забув роздрукувати посадковий талон, тому мусив зробити це в аеропорту.",
        ru: "Я забыл распечатать посадочный талон, поэтому сделал это в аэропорту.",
        en: "I forgot to print my boarding pass, so I had to do it at the airport.",
        tokens: ["Zapomniałem", "wydrukować", "kartę", "pokładową", ",", "więc", "musiałem", "to", "zrobić", "na", "lotnisku", "."],
    },

    [phraseKey("nadać bagaż", "b1-3")]: {
        sk: "Musiałem nadać bagaż, ponieważ był zbyt ciężki.",
        ua: "Мені довелося здати багаж, оскільки він був занадто важкий.",
        ru: "Мне пришлось сдать багаж, так как он был слишком тяжёлый.",
        en: "I had to check in my luggage because it was too heavy.",
        tokens: ["Musiałem", "nadać", "bagaż", ",", "ponieważ", "był", "zbyt", "ciężki", "."],
    },

    [phraseKey("kontrola celna", "b1-3")]: {
        sk: "Kontrola celna przebiegła szybko, ponieważ nie miałem nic do zgłoszenia.",
        ua: "Митний контроль пройшов швидко, оскільки я не мав нічого декларувати.",
        ru: "Таможенный контроль прошёл быстро, так как у меня не было ничего для декларации.",
        en: "Customs control went quickly because I had nothing to declare.",
        tokens: ["Kontrola", "celna", "przebiegła", "szybko", ",", "ponieważ", "nie", "miałem", "nic", "do", "zgłoszenia", "."],
    },

    // =========================
    // LESSON 4 — Здоров’я та лікар
    // =========================
    [phraseKey("leczenie", "b1-4")]: {
        sk: "Leczenie trwało długo, ale w końcu poczułem się lepiej.",
        ua: "Лікування тривало довго, але врешті я відчув себе краще.",
        ru: "Лечение длилось долго, но в конце я почувствовал себя лучше.",
        en: "The treatment lasted long, but in the end I felt better.",
        tokens: ["Leczenie", "trwało", "długo", ",", "ale", "w", "końcu", "poczułem", "się", "lepiej", "."],
    },

    [phraseKey("zbadać", "b1-4")]: {
        sk: "Lekarz musi cię zbadać, zanim postawi diagnozę.",
        ua: "Лікар повинен тебе оглянути, перш ніж поставити діагноз.",
        ru: "Врач должен тебя осмотреть, прежде чем поставить диагноз.",
        en: "The doctor has to examine you before making a diagnosis.",
        tokens: ["Lekarz", "musi", "cię", "zbadać", ",", "zanim", "postawi", "diagnozę", "."],
    },

    [phraseKey("przepisać", "b1-4")]: {
        sk: "Lekarz przepisał mi leki, które muszę brać codziennie.",
        ua: "Лікар призначив мені ліки, які я повинен приймати щодня.",
        ru: "Врач назначил мне лекарства, которые я должен принимать каждый день.",
        en: "The doctor prescribed me medicine that I must take every day.",
        tokens: ["Lekarz", "przepisał", "mi", "leki", ",", "które", "muszę", "brać", "codziennie", "."],
    },

    [phraseKey("pogorszyć się", "b1-4")]: {
        sk: "Mój stan zdrowia pogorszył się, dlatego poszedłem do lekarza.",
        ua: "Мій стан здоров’я погіршився, тому я пішов до лікаря.",
        ru: "Моё состояние здоровья ухудшилось, поэтому я пошёл к врачу.",
        en: "My health got worse, so I went to the doctor.",
        tokens: ["Mój", "stan", "zdrowia", "pogorszył", "się", ",", "dlatego", "poszedłem", "do", "lekarza", "."],
    },

    [phraseKey("poprawić się", "b1-4")]: {
        sk: "Po kilku dniach mój stan poprawił się, więc mogłem wrócić do pracy.",
        ua: "Через кілька днів мій стан покращився, тому я зміг повернутися до роботи.",
        ru: "Через несколько дней моё состояние улучшилось, поэтому я смог вернуться к работе.",
        en: "After a few days, my condition improved, so I could return to work.",
        tokens: ["Po", "kilku", "dniach", "mój", "stan", "poprawił", "się", ",", "więc", "mogłem", "wrócić", "do", "pracy", "."],
    },

    [phraseKey("hospitalizacja", "b1-4")]: {
        sk: "Hospitalizacja była konieczna, ponieważ stan pacjenta był poważny.",
        ua: "Госпіталізація була необхідна, оскільки стан пацієнта був серйозний.",
        ru: "Госпитализация была необходима, так как состояние пациента было серьёзным.",
        en: "Hospitalization was necessary because the patient's condition was serious.",
        tokens: ["Hospitalizacja", "była", "konieczna", ",", "ponieważ", "stan", "pacjenta", "był", "poważny", "."],
    },

    [phraseKey("objaw", "b1-4")]: {
        sk: "Pierwszym objawem była gorączka, dlatego zacząłem się martwić.",
        ua: "Першим симптомом була температура, тому я почав хвилюватися.",
        ru: "Первым симптомом была температура, поэтому я начал волноваться.",
        en: "The first symptom was a fever, so I started to worry.",
        tokens: ["Pierwszym", "objawem", "była", "gorączka", ",", "dlatego", "zacząłem", "się", "martwić", "."],
    },

    [phraseKey("stan zdrowia", "b1-4")]: {
        sk: "Jego stan zdrowia poprawia się z dnia na dzień.",
        ua: "Його стан здоров’я покращується з кожним днем.",
        ru: "Его состояние здоровья улучшается с каждым днём.",
        en: "His health condition is improving day by day.",
        tokens: ["Jego", "stan", "zdrowia", "poprawia", "się", "z", "dnia", "na", "dzień", "."],
    },

    [phraseKey("powrót do zdrowia", "b1-4")]: {
        sk: "Powrót do zdrowia może potrwać kilka tygodni.",
        ua: "Одужання може тривати кілька тижнів.",
        ru: "Выздоровление может занять несколько недель.",
        en: "Recovery may take a few weeks.",
        tokens: ["Powrót", "do", "zdrowia", "może", "potrwać", "kilka", "tygodni", "."],
    },

    [phraseKey("przepis", "b1-4")]: {
        sk: "Lekarz wystawił mi przepis na nowe lekarstwo.",
        ua: "Лікар виписав мені рецепт на нові ліки.",
        ru: "Врач выписал мне рецепт на новое лекарство.",
        en: "The doctor issued me a prescription for a new medicine.",
        tokens: ["Lekarz", "wystawił", "mi", "przepis", "na", "nowe", "lekarstwo", "."]
    },

    // =========================
    // LESSON 5 — Емоції та стосунки
    // =========================
    [phraseKey("kłótnia", "b1-5")]: {
        sk: "Mieliśmy kłótnię, ale szybko się pogodziliśmy.",
        ua: "У нас була сварка, але ми швидко помирилися.",
        ru: "У нас была ссора, но мы быстро помирились.",
        en: "We had an argument, but we quickly made up.",
        tokens: ["Mieliśmy", "kłótnię", ",", "ale", "szybko", "się", "pogodziliśmy", "."],
    },

    [phraseKey("pojednanie", "b1-5")]: {
        sk: "Pojednanie było trudne, ponieważ obie strony były zranione.",
        ua: "Примирення було складним, оскільки обидві сторони були ображені.",
        ru: "Примирение было сложным, так как обе стороны были обижены.",
        en: "Reconciliation was difficult because both sides were hurt.",
        tokens: ["Pojednanie", "było", "trudne", ",", "ponieważ", "obie", "strony", "były", "zranione", "."],
    },

    [phraseKey("rozczarować", "b1-5")]: {
        sk: "Nie chciałem cię rozczarować, dlatego starałem się bardziej.",
        ua: "Я не хотів тебе розчарувати, тому старався більше.",
        ru: "Я не хотел тебя разочаровать, поэтому старался больше.",
        en: "I didn't want to disappoint you, so I tried harder.",
        tokens: ["Nie", "chciałem", "cię", "rozczarować", ",", "dlatego", "starałem", "się", "bardziej", "."],
    },

    [phraseKey("docenić", "b1-5")]: {
        sk: "Zacząłem doceniać jego pomoc dopiero po czasie.",
        ua: "Я почав цінувати його допомогу лише з часом.",
        ru: "Я начал ценить его помощь только со временем.",
        en: "I started to appreciate his help only later.",
        tokens: ["Zacząłem", "doceniać", "jego", "pomoc", "dopiero", "po", "czasie", "."],
    },

    [phraseKey("zazdrość", "b1-5")]: {
        sk: "Zazdrość może zniszczyć relację, jeśli nie potrafisz jej kontrolować.",
        ua: "Ревнощі можуть зруйнувати стосунки, якщо ти не вмієш їх контролювати.",
        ru: "Ревность может разрушить отношения, если ты не умеешь её контролировать.",
        en: "Jealousy can destroy a relationship if you can't control it.",
        tokens: ["Zazdrość", "może", "zniszczyć", "relację", ",", "jeśli", "nie", "potrafisz", "jej", "kontrolować", "."],
    },

    [phraseKey("wybaczyć", "b1-5")]: {
        sk: "Postanowiłem wybaczyć, ponieważ każdy popełnia błędy.",
        ua: "Я вирішив пробачити, оскільки кожен робить помилки.",
        ru: "Я решил простить, так как каждый совершает ошибки.",
        en: "I decided to forgive because everyone makes mistakes.",
        tokens: ["Postanowiłem", "wybaczyć", ",", "ponieważ", "każdy", "popełnia", "błędy", "."],
    },

    [phraseKey("szacunek", "b1-5")]: {
        sk: "Szacunek jest podstawą każdej dobrej relacji.",
        ua: "Повага є основою будь-яких хороших стосунків.",
        ru: "Уважение — основа любых хороших отношений.",
        en: "Respect is the foundation of every good relationship.",
        tokens: ["Szacunek", "jest", "podstawą", "każdej", "dobrej", "relacji", "."],
    },

    [phraseKey("obrazić się", "b1-5")]: {
        sk: "Nie obrażaj się, chciałem tylko pomóc.",
        ua: "Не ображайся, я лише хотів допомогти.",
        ru: "Не обижайся, я просто хотел помочь.",
        en: "Don't get offended, I just wanted to help.",
        tokens: ["Nie", "obrażaj", "się", ",", "chciałem", "tylko", "pomóc", "."],
    },

    [phraseKey("zbliżyć się", "b1-5")]: {
        sk: "Dzięki wspólnym doświadczeniom bardzo się zbliżyliśmy.",
        ua: "Завдяки спільному досвіду ми дуже зблизилися.",
        ru: "Благодаря общему опыту мы сильно сблизились.",
        en: "Thanks to shared experiences, we got much closer.",
        tokens: ["Dzięki", "wspólnym", "doświadczeniom", "bardzo", "się", "zbliżyliśmy", "."],
    },

    [phraseKey("relacja", "b1-5")]: {
        sk: "Nasza relacja zmieniła się z czasem, ponieważ lepiej się poznaliśmy.",
        ua: "Наші стосунки змінилися з часом, оскільки ми краще пізнали одне одного.",
        ru: "Наши отношения изменились со временем, так как мы лучше узнали друг друга.",
        en: "Our relationship changed over time because we got to know each other better.",
        tokens: ["Nasza", "relacja", "zmieniła", "się", "z", "czasem", ",", "ponieważ", "lepiej", "się", "poznaliśmy", "."],
    },

    // =========================
    // LESSON 6 — Освіта та навчання
    // =========================
    [phraseKey("seminarium", "b1-6")]: {
        sk: "Seminarium było bardzo interesujące, ponieważ poruszono ważne tematy.",
        ua: "Семінар був дуже цікавим, оскільки підняли важливі теми.",
        ru: "Семинар был очень интересным, так как затронули важные темы.",
        en: "The seminar was very interesting because important topics were discussed.",
        tokens: ["Seminarium", "było", "bardzo", "interesujące", ",", "ponieważ", "poruszono", "ważne", "tematy", "."],
    },

    [phraseKey("zadanie", "b1-6")]: {
        sk: "To zadanie było trudne, dlatego musiałem poświęcić więcej czasu.",
        ua: "Це завдання було складним, тому мені довелося витратити більше часу.",
        ru: "Это задание было сложным, поэтому мне пришлось потратить больше времени.",
        en: "This task was difficult, so I had to spend more time on it.",
        tokens: ["To", "zadanie", "było", "trudne", ",", "dlatego", "musiałem", "poświęcić", "więcej", "czasu", "."],
    },

    [phraseKey("ocena", "b1-6")]: {
        sk: "Moja ocena była dobra, chociaż mogłem zrobić to lepiej.",
        ua: "Моя оцінка була хорошою, хоча я міг зробити це краще.",
        ru: "Моя оценка была хорошей, хотя я мог сделать это лучше.",
        en: "My grade was good, although I could have done better.",
        tokens: ["Moja", "ocena", "była", "dobra", ",", "chociaż", "mogłem", "zrobić", "to", "lepiej", "."],
    },

    [phraseKey("koncentracja", "b1-6")]: {
        sk: "Brak koncentracji sprawił, że popełniłem kilka błędów.",
        ua: "Відсутність концентрації призвела до того, що я зробив кілька помилок.",
        ru: "Отсутствие концентрации привело к тому, что я сделал несколько ошибок.",
        en: "Lack of concentration caused me to make several mistakes.",
        tokens: ["Brak", "koncentracji", "sprawił", ",", "że", "popełniłem", "kilka", "błędów", "."],
    },

    [phraseKey("poprawa", "b1-6")]: {
        sk: "Poprawa wyników wymaga regularnej pracy.",
        ua: "Покращення результатів вимагає регулярної роботи.",
        ru: "Улучшение результатов требует регулярной работы.",
        en: "Improving results requires regular work.",
        tokens: ["Poprawa", "wyników", "wymaga", "regularnej", "pracy", "."],
    },

    [phraseKey("znaczek", "b1-6")]: {
        sk: "Na zeszycie był znaczek, który potwierdzał oddanie pracy na czas.",
        ua: "На зошиті була позначка, яка підтверджувала здачу роботи вчасно.",
        ru: "На тетради была отметка, которая подтверждала сдачу работы вовремя.",
        en: "There was a mark on the notebook confirming the work was submitted on time.",
        tokens: ["Na", "zeszycie", "był", "znaczek", ",", "który", "potwierdzał", "oddanie", "pracy", "na", "czas", "."],
    },

    [phraseKey("rocznik", "b1-6")]: {
        sk: "Mój rocznik organizuje spotkanie po latach.",
        ua: "Мій курс організовує зустріч через багато років.",
        ru: "Мой курс организует встречу спустя годы.",
        en: "My year group is organizing a reunion.",
        tokens: ["Mój", "rocznik", "organizuje", "spotkanie", "po", "latach", "."],
    },

    [phraseKey("wykładać", "b1-6")]: {
        sk: "Profesor wykłada bardzo ciekawie, dlatego studenci chętnie go słuchają.",
        ua: "Професор дуже цікаво читає лекції, тому студенти охоче його слухають.",
        ru: "Профессор очень интересно читает лекции, поэтому студенты охотно его слушают.",
        en: "The professor lectures very interestingly, so students enjoy listening to him.",
        tokens: ["Profesor", "wykłada", "bardzo", "ciekawie", ",", "dlatego", "studenci", "chętnie", "go", "słuchają", "."],
    },

    [phraseKey("opracować", "b1-6")]: {
        sk: "Muszę opracować ten temat przed zajęciami.",
        ua: "Мені потрібно опрацювати цю тему перед заняттями.",
        ru: "Мне нужно проработать эту тему перед занятиями.",
        en: "I need to work through this topic before class.",
        tokens: ["Muszę", "opracować", "ten", "temat", "przed", "zajęciami", "."],
    },

    [phraseKey("termin oddania", "b1-6")]: {
        sk: "Termin oddania pracy jest jutro, więc muszę się pospieszyć.",
        ua: "Термін здачі роботи завтра, тому мені треба поспішити.",
        ru: "Срок сдачи работы завтра, поэтому мне нужно поторопиться.",
        en: "The submission deadline is tomorrow, so I need to hurry.",
        tokens: ["Termin", "oddania", "pracy", "jest", "jutro", ",", "więc", "muszę", "się", "pospieszyć", "."],
    },

    // =========================
    // LESSON 7 — Технології та інтернет
    // =========================
    [phraseKey("ustawienie", "b1-7")]: {
        sk: "Zmieniłem ustawienia, ponieważ aplikacja działała nieprawidłowo.",
        ua: "Я змінив налаштування, оскільки додаток працював неправильно.",
        ru: "Я изменил настройки, потому что приложение работало неправильно.",
        en: "I changed the settings because the app was not working properly.",
        tokens: ["Zmieniłem", "ustawienia", ",", "ponieważ", "aplikacja", "działała", "nieprawidłowo", "."],
    },

    [phraseKey("hasło", "b1-7")]: {
        sk: "Zapomniałem hasła, dlatego musiałem je zresetować.",
        ua: "Я забув пароль, тому мені довелося його скинути.",
        ru: "Я забыл пароль, поэтому мне пришлось его сбросить.",
        en: "I forgot my password, so I had to reset it.",
        tokens: ["Zapomniałem", "hasła", ",", "dlatego", "musiałem", "je", "zresetować", "."],
    },

    [phraseKey("logowanie", "b1-7")]: {
        sk: "Logowanie zajęło więcej czasu, ponieważ system był przeciążony.",
        ua: "Вхід зайняв більше часу, оскільки система була перевантажена.",
        ru: "Вход занял больше времени, так как система была перегружена.",
        en: "Logging in took longer because the system was overloaded.",
        tokens: ["Logowanie", "zajęło", "więcej", "czasu", ",", "ponieważ", "system", "był", "przeciążony", "."],
    },

    [phraseKey("prywatność", "b1-7")]: {
        sk: "Dbam o swoją prywatność, dlatego nie udostępniam danych osobowych.",
        ua: "Я дбаю про свою приватність, тому не поширюю особисті дані.",
        ru: "Я забочусь о своей приватности, поэтому не делюсь личными данными.",
        en: "I care about my privacy, so I don't share personal data.",
        tokens: ["Dbam", "o", "swoją", "prywatność", ",", "dlatego", "nie", "udostępniam", "danych", "osobowych", "."],
    },

    [phraseKey("nagrać", "b1-7")]: {
        sk: "Muszę nagrać wiadomość, żeby wysłać ją dalej.",
        ua: "Мені потрібно записати повідомлення, щоб відправити його далі.",
        ru: "Мне нужно записать сообщение, чтобы отправить его дальше.",
        en: "I need to record a message to send it further.",
        tokens: ["Muszę", "nagrać", "wiadomość", ",", "żeby", "wysłać", "ją", "dalej", "."],
    },

    [phraseKey("dzielić się", "b1-7")]: {
        sk: "Lubię dzielić się wiedzą, ponieważ pomaga to innym.",
        ua: "Я люблю ділитися знаннями, оскільки це допомагає іншим.",
        ru: "Я люблю делиться знаниями, потому что это помогает другим.",
        en: "I like sharing knowledge because it helps others.",
        tokens: ["Lubię", "dzielić", "się", "wiedzą", ",", "ponieważ", "pomaga", "to", "innym", "."],
    },

    [phraseKey("przeglądarka", "b1-7")]: {
        sk: "Moja przeglądarka działa wolno, więc muszę ją zaktualizować.",
        ua: "Мій браузер працює повільно, тому мені потрібно його оновити.",
        ru: "Мой браузер работает медленно, поэтому мне нужно его обновить.",
        en: "My browser is slow, so I need to update it.",
        tokens: ["Moja", "przeglądarka", "działa", "wolno", ",", "więc", "muszę", "ją", "zaktualizować", "."],
    },

    [phraseKey("aplikacja", "b1-7")]: {
        sk: "Ta aplikacja jest bardzo przydatna, dlatego używam jej codziennie.",
        ua: "Цей додаток дуже корисний, тому я використовую його щодня.",
        ru: "Это приложение очень полезное, поэтому я использую его каждый день.",
        en: "This app is very useful, so I use it every day.",
        tokens: ["Ta", "aplikacja", "jest", "bardzo", "przydatna", ",", "dlatego", "używam", "jej", "codziennie", "."],
    },

    [phraseKey("wyszukiwać", "b1-7")]: {
        sk: "Potrafię szybko wyszukiwać informacje w internecie.",
        ua: "Я вмію швидко знаходити інформацію в інтернеті.",
        ru: "Я умею быстро искать информацию в интернете.",
        en: "I can quickly search for information on the internet.",
        tokens: ["Potrafię", "szybko", "wyszukiwać", "informacje", "w", "internecie", "."],
    },

    [phraseKey("ochrona danych", "b1-7")]: {
        sk: "Ochrona danych jest ważna, dlatego trzeba uważać w sieci.",
        ua: "Захист даних важливий, тому потрібно бути обережним в інтернеті.",
        ru: "Защита данных важна, поэтому нужно быть осторожным в интернете.",
        en: "Data protection is important, so you should be careful online.",
        tokens: ["Ochrona", "danych", "jest", "ważna", ",", "dlatego", "trzeba", "uważać", "w", "sieci", "."],
    },

    // =========================
    // LESSON 8 — Фінанси та покупки
    // =========================
    [phraseKey("rata", "b1-8")]: {
        sk: "Płacę za to w ratach, ponieważ nie mam całej kwoty.",
        ua: "Я плачу за це частинами, оскільки не маю всієї суми.",
        ru: "Я плачу за это в рассрочку, потому что у меня нет всей суммы.",
        en: "I pay for it in installments because I don't have the full amount.",
        tokens: ["Płacę", "za", "to", "w", "ratach", ",", "ponieważ", "nie", "mam", "całej", "kwoty", "."],
    },

    [phraseKey("dowód zakupu", "b1-8")]: {
        sk: "Zachowaj dowód zakupu, żeby móc zwrócić towar.",
        ua: "Збережи чек, щоб мати можливість повернути товар.",
        ru: "Сохрани чек, чтобы можно было вернуть товар.",
        en: "Keep the receipt to be able to return the product.",
        tokens: ["Zachowaj", "dowód", "zakupu", ",", "żeby", "móc", "zwrócić", "towar", "."],
    },

    [phraseKey("sprzedawca", "b1-8")]: {
        sk: "Sprzedawca pomógł mi wybrać odpowiedni produkt.",
        ua: "Продавець допоміг мені обрати відповідний товар.",
        ru: "Продавец помог мне выбрать подходящий товар.",
        en: "The seller helped me choose the right product.",
        tokens: ["Sprzedawca", "pomógł", "mi", "wybrać", "odpowiedni", "produkt", "."],
    },

    [phraseKey("pożyczka", "b1-8")]: {
        sk: "Wziąłem pożyczkę, ponieważ potrzebowałem pieniędzy.",
        ua: "Я взяв позику, оскільки мені потрібні були гроші.",
        ru: "Я взял заём, потому что мне нужны были деньги.",
        en: "I took a loan because I needed money.",
        tokens: ["Wziąłem", "pożyczkę", ",", "ponieważ", "potrzebowałem", "pieniędzy", "."],
    },

    [phraseKey("odsetki", "b1-8")]: {
        sk: "Odsetki są wysokie, dlatego trzeba uważać przy kredycie.",
        ua: "Відсотки високі, тому потрібно бути обережним із кредитом.",
        ru: "Проценты высокие, поэтому нужно быть осторожным с кредитом.",
        en: "Interest rates are high, so you need to be careful with loans.",
        tokens: ["Odsetki", "są", "wysokie", ",", "dlatego", "trzeba", "uważać", "przy", "kredycie", "."],
    },

    [phraseKey("dług", "b1-8")]: {
        sk: "Nie chcę mieć długów, dlatego staram się oszczędzać.",
        ua: "Я не хочу мати боргів, тому намагаюся економити.",
        ru: "Я не хочу иметь долгов, поэтому стараюсь экономить.",
        en: "I don't want to have debts, so I try to save money.",
        tokens: ["Nie", "chcę", "mieć", "długów", ",", "dlatego", "staram", "się", "oszczędzać", "."],
    },

    [phraseKey("wyciąg z konta", "b1-8")]: {
        sk: "Sprawdziłem wyciąg z konta, żeby zobaczyć wydatki.",
        ua: "Я перевірив виписку з рахунку, щоб побачити витрати.",
        ru: "Я проверил выписку со счёта, чтобы увидеть расходы.",
        en: "I checked the bank statement to see my expenses.",
        tokens: ["Sprawdziłem", "wyciąg", "z", "konta", ",", "żeby", "zobaczyć", "wydatki", "."],
    },

    [phraseKey("saldo", "b1-8")]: {
        sk: "Saldo na koncie jest niskie, więc muszę uważać z wydatkami.",
        ua: "Залишок на рахунку низький, тому мені потрібно бути обережним із витратами.",
        ru: "Баланс на счёте низкий, поэтому нужно быть осторожным с расходами.",
        en: "The account balance is low, so I need to be careful with spending.",
        tokens: ["Saldo", "na", "koncie", "jest", "niskie", ",", "więc", "muszę", "uważać", "z", "wydatkami", "."],
    },

    [phraseKey("odrzucić", "b1-8")]: {
        sk: "Bank odrzucił wniosek, ponieważ nie spełniałem warunków.",
        ua: "Банк відхилив заявку, оскільки я не відповідав умовам.",
        ru: "Банк отклонил заявку, потому что я не соответствовал условиям.",
        en: "The bank rejected the application because I didn't meet the requirements.",
        tokens: ["Bank", "odrzucił", "wniosek", ",", "ponieważ", "nie", "spełniałem", "warunków", "."],
    },

    [phraseKey("termin płatności", "b1-8")]: {
        sk: "Termin płatności minął, dlatego naliczono dodatkową opłatę.",
        ua: "Термін оплати минув, тому нарахували додаткову плату.",
        ru: "Срок оплаты истёк, поэтому начислили дополнительную плату.",
        en: "The payment deadline passed, so an extra fee was charged.",
        tokens: ["Termin", "płatności", "minął", ",", "dlatego", "naliczono", "dodatkową", "opłatę", "."],
    },

    // =========================
    // LESSON 9 — Дім: ремонти та послуги
    // =========================
    [phraseKey("montaż", "b1-9")]: {
        sk: "Montaż urządzenia trwał dłużej, niż się spodziewaliśmy.",
        ua: "Монтаж пристрою тривав довше, ніж ми очікували.",
        ru: "Установка устройства длилась дольше, чем мы ожидали.",
        en: "The installation took longer than we expected.",
        tokens: ["Montaż", "urządzenia", "trwał", "dłużej", ",", "niż", "się", "spodziewaliśmy", "."],
    },

    [phraseKey("wsparcie techniczne", "b1-9")]: {
        sk: "Skontaktowałem się ze wsparciem technicznym, ponieważ miałem problem.",
        ua: "Я зв’язався з техпідтримкою, оскільки мав проблему.",
        ru: "Я связался с техподдержкой, потому что у меня была проблема.",
        en: "I contacted technical support because I had a problem.",
        tokens: ["Skontaktowałem", "się", "ze", "wsparciem", "technicznym", ",", "ponieważ", "miałem", "problem", "."],
    },

    [phraseKey("utrzymanie", "b1-9")]: {
        sk: "Regularne utrzymanie sprzętu zapobiega awariom.",
        ua: "Регулярне обслуговування техніки запобігає поломкам.",
        ru: "Регулярное обслуживание техники предотвращает поломки.",
        en: "Regular maintenance prevents breakdowns.",
        tokens: ["Regularne", "utrzymanie", "sprzętu", "zapobiega", "awariom", "."],
    },

    [phraseKey("zamówić serwis", "b1-9")]: {
        sk: "Muszę zamówić serwis, ponieważ urządzenie nie działa.",
        ua: "Мені потрібно замовити сервіс, оскільки пристрій не працює.",
        ru: "Мне нужно заказать сервис, потому что устройство не работает.",
        en: "I need to order a service because the device is not working.",
        tokens: ["Muszę", "zamówić", "serwis", ",", "ponieważ", "urządzenie", "nie", "działa", "."],
    },

    [phraseKey("serwis umowny", "b1-9")]: {
        sk: "Serwis umowny obejmuje naprawy zapisane w warunkach umowy.",
        ua: "Сервіс за договором охоплює ремонти, зазначені в умовах договору.",
        ru: "Сервис по договору охватывает ремонты, указанные в условиях договора.",
        en: "Contract service covers repairs specified in the terms of the agreement.",
        tokens: ["Serwis", "umowny", "obejmuje", "naprawy", "zapisane", "w", "warunkach", "umowy", "."],
    },

    [phraseKey("awaria urządzenia", "b1-9")]: {
        sk: "Awaria urządzenia spowodowała przerwę w pracy.",
        ua: "Поломка пристрою спричинила перерву в роботі.",
        ru: "Поломка устройства вызвала перерыв в работе.",
        en: "The device malfunction caused a break in work.",
        tokens: ["Awaria", "urządzenia", "spowodowała", "przerwę", "w", "pracy", "."],
    },

    [phraseKey("naprawa na miejscu", "b1-9")]: {
        sk: "Naprawa na miejscu była szybka i skuteczna.",
        ua: "Ремонт на місці був швидким і ефективним.",
        ru: "Ремонт на месте был быстрым и эффективным.",
        en: "On-site repair was quick and effective.",
        tokens: ["Naprawa", "na", "miejscu", "była", "szybka", "i", "skuteczna", "."],
    },

    [phraseKey("interwencja technika", "b1-9")]: {
        sk: "Interwencja technika była konieczna, ponieważ problem był poważny.",
        ua: "Виїзд майстра був необхідний, оскільки проблема була серйозна.",
        ru: "Выезд техника был необходим, так как проблема была серьёзной.",
        en: "A technician visit was necessary because the problem was serious.",
        tokens: ["Interwencja", "technika", "była", "konieczna", ",", "ponieważ", "problem", "był", "poważny", "."],
    },

    [phraseKey("procedura pracy", "b1-9")]: {
        sk: "Procedura pracy musi być przestrzegana przez wszystkich pracowników.",
        ua: "Робоча процедура повинна дотримуватися всіма працівниками.",
        ru: "Рабочая процедура должна соблюдаться всеми сотрудниками.",
        en: "Work procedures must be followed by all employees.",
        tokens: ["Procedura", "pracy", "musi", "być", "przestrzegana", "przez", "wszystkich", "pracowników", "."],
    },

    [phraseKey("usunąć błąd", "b1-9")]: {
        sk: "Udało się usunąć błąd, dlatego system działa poprawnie.",
        ua: "Вдалося усунути помилку, тому система працює правильно.",
        ru: "Удалось устранить ошибку, поэтому система работает корректно.",
        en: "We managed to fix the error, so the system works correctly.",
        tokens: ["Udało", "się", "usunąć", "błąd", ",", "dlatego", "system", "działa", "poprawnie", "."],
    },

    // =========================
    // LESSON 10 — Комунікація та медіа
    // =========================
    [phraseKey("rozmowa", "b1-10")]: {
        sk: "Rozmowa była bardzo ciekawa, ponieważ poruszono ważne tematy.",
        ua: "Розмова була дуже цікавою, оскільки підняли важливі теми.",
        ru: "Разговор был очень интересным, так как затронули важные темы.",
        en: "The conversation was very interesting because important topics were discussed.",
        tokens: ["Rozmowa", "była", "bardzo", "ciekawa", ",", "ponieważ", "poruszono", "ważne", "tematy", "."],
    },

    [phraseKey("reportaż", "b1-10")]: {
        sk: "Reportaż pokazał prawdziwą sytuację w kraju.",
        ua: "Репортаж показав реальну ситуацію в країні.",
        ru: "Репортаж показал реальную ситуацию в стране.",
        en: "The report showed the real situation in the country.",
        tokens: ["Reportaż", "pokazał", "prawdziwą", "sytuację", "w", "kraju", "."],
    },

    [phraseKey("komunikat prasowy", "b1-10")]: {
        sk: "Firma wydała komunikat prasowy, aby poinformować o zmianach.",
        ua: "Компанія опублікувала пресреліз, щоб повідомити про зміни.",
        ru: "Компания выпустила пресс-релиз, чтобы сообщить об изменениях.",
        en: "The company issued a press release to inform about the changes.",
        tokens: ["Firma", "wydała", "komunikat", "prasowy", ",", "aby", "poinformować", "o", "zmianach", "."],
    },

    [phraseKey("śledzić", "b1-10")]: {
        sk: "Śledzę wiadomości codziennie, ponieważ chcę być na bieżąco.",
        ua: "Я щодня слідкую за новинами, оскільки хочу бути в курсі.",
        ru: "Я слежу за новостями каждый день, потому что хочу быть в курсе.",
        en: "I follow the news every day because I want to stay informed.",
        tokens: ["Śledzę", "wiadomości", "codziennie", ",", "ponieważ", "chcę", "być", "na", "bieżąco", "."],
    },

    [phraseKey("wpłynąć", "b1-10")]: {
        sk: "Ta decyzja może wpłynąć na przyszłość firmy.",
        ua: "Це рішення може вплинути на майбутнє компанії.",
        ru: "Это решение может повлиять на будущее компании.",
        en: "This decision may influence the company's future.",
        tokens: ["Ta", "decyzja", "może", "wpłynąć", "na", "przyszłość", "firmy", "."],
    },

    [phraseKey("wiarygodny", "b1-10")]: {
        sk: "Źródło informacji musi być wiarygodne.",
        ua: "Джерело інформації повинно бути достовірним.",
        ru: "Источник информации должен быть достоверным.",
        en: "The source of information must be credible.",
        tokens: ["Źródło", "informacji", "musi", "być", "wiarygodne", "."],
    },

    [phraseKey("informować", "b1-10")]: {
        sk: "Media informują o ważnych wydarzeniach na świecie.",
        ua: "Медіа інформують про важливі події у світі.",
        ru: "Медиа информируют о важных событиях в мире.",
        en: "The media inform about important events in the world.",
        tokens: ["Media", "informują", "o", "ważnych", "wydarzeniach", "na", "świecie", "."],
    },

    [phraseKey("wyrazić opinię", "b1-10")]: {
        sk: "Chcę wyrazić opinię, ponieważ mam inne zdanie.",
        ua: "Я хочу висловити думку, оскільки маю іншу позицію.",
        ru: "Я хочу выразить мнение, потому что у меня другая точка зрения.",
        en: "I want to express my opinion because I have a different view.",
        tokens: ["Chcę", "wyrazić", "opinię", ",", "ponieważ", "mam", "inne", "zdanie", "."],
    },

    [phraseKey("komentarz", "b1-10")]: {
        sk: "Jego komentarz był bardzo trafny i pomocny.",
        ua: "Його коментар був дуже влучний і корисний.",
        ru: "Его комментарий был очень точным и полезным.",
        en: "His comment was very accurate and helpful.",
        tokens: ["Jego", "komentarz", "był", "bardzo", "trafny", "i", "pomocny", "."],
    },

    [phraseKey("społeczeństwo", "b1-10")]: {
        sk: "Społeczeństwo reaguje na zmiany w różny sposób.",
        ua: "Суспільство реагує на зміни по-різному.",
        ru: "Общество реагирует на изменения по-разному.",
        en: "Society reacts to changes in different ways.",
        tokens: ["Społeczeństwo", "reaguje", "na", "zmiany", "w", "różny", "sposób", "."],
    },
};
