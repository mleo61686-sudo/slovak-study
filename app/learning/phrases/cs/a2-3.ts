import type { Phrase } from "../registry";
import { phraseKey } from "../phraseKey";

export const CS_A2_PHRASES_3: Record<string, Phrase> = {
  // =========================
  // LESSON A2-21 — Дім (проблеми та майстер)
  // =========================
  [phraseKey("porucha", "поломка/несправність", "a2-21")]: {
    sk: "V kuchyni došlo k poruše spotřebiče.",
    ua: "На кухні сталася поломка приладу.",
    ru: "На кухне произошла поломка прибора.",
    tokens: ["V", "kuchyni", "došlo", "k", "poruše", "spotřebiče", "."],
  },

  [phraseKey("instalatér", "сантехнік", "a2-21")]: {
    sk: "Zítra má přijít instalatér.",
    ua: "Завтра має прийти сантехнік.",
    ru: "Завтра должен прийти сантехник.",
    tokens: ["Zítra", "má", "přijít", "instalatér", "."],
  },

  [phraseKey("elektrikář", "електрик", "a2-21")]: {
    sk: "Elektrikář opraví zásuvku odpoledne.",
    ua: "Електрик відремонтує розетку після обіду.",
    ru: "Электрик починит розетку после обеда.",
    tokens: ["Elektrikář", "opraví", "zásuvku", "odpoledne", "."],
  },

  [phraseKey("opravit", "відремонтувати", "a2-21")]: {
    sk: "Musíme co nejdřív opravit kotel.",
    ua: "Нам треба якнайшвидше відремонтувати котел.",
    ru: "Нам нужно как можно скорее отремонтировать котёл.",
    tokens: ["Musíme", "co", "nejdřív", "opravit", "kotel", "."],
  },

  [phraseKey("vyměnit", "замінити", "a2-21")]: {
    sk: "Bude nutné vyměnit starou baterii.",
    ua: "Буде необхідно замінити старий кран.",
    ru: "Нужно будет заменить старый кран.",
    tokens: ["Bude", "nutné", "vyměnit", "starou", "baterii", "."],
  },

  [phraseKey("protékání", "протікання", "a2-21")]: {
    sk: "Protékání střechy je velký problém.",
    ua: "Протікання даху — велика проблема.",
    ru: "Протечка крыши — большая проблема.",
    tokens: ["Protékání", "střechy", "je", "velký", "problém", "."],
  },

  [phraseKey("upchání", "засмічення", "a2-21")]: {
    sk: "V koupelně je upchání odpadu.",
    ua: "У ванній є засмічення стоку.",
    ru: "В ванной засор в сливе.",
    tokens: ["V", "koupelně", "je", "upchání", "odpadu", "."],
  },

  [phraseKey("zatekat", "протікати", "a2-21")]: {
    sk: "Po dešti začalo do sklepa zatékat.",
    ua: "Після дощу в підвал почало протікати.",
    ru: "После дождя в подвал начало протекать.",
    tokens: ["Po", "dešti", "začalo", "do", "sklepa", "zatékat", "."],
  },

  [phraseKey("poškození", "пошкодження", "a2-21")]: {
    sk: "Na stěně je vidět poškození.",
    ua: "На стіні видно пошкодження.",
    ru: "На стене видно повреждение.",
    tokens: ["Na", "stěně", "je", "vidět", "poškození", "."],
  },

  [phraseKey("náhradní díl", "запасна частина", "a2-21")]: {
    sk: "Na náhradní díl budeme čekat týden.",
    ua: "На запасну частину ми чекатимемо тиждень.",
    ru: "Запасную часть мы будем ждать неделю.",
    tokens: ["Na", "náhradní", "díl", "budeme", "čekat", "týden", "."],
  },

  // =========================
  // LESSON A2-22 — Здоровʼя (аптека та лікування)
  // =========================
  [phraseKey("vedlejší účinky", "побічні ефекти", "a2-22")]: {
    sk: "Tyto léky mohou mít vedlejší účinky.",
    ua: "Ці ліки можуть мати побічні ефекти.",
    ru: "Эти лекарства могут иметь побочные эффекты.",
    tokens: ["Tyto", "léky", "mohou", "mít", "vedlejší", "účinky", "."],
  },

  [phraseKey("dávkování", "дозування", "a2-22")]: {
    sk: "Dodržujte doporučené dávkování.",
    ua: "Дотримуйтеся рекомендованого дозування.",
    ru: "Соблюдайте рекомендованную дозировку.",
    tokens: ["Dodržujte", "doporučené", "dávkování", "."],
  },

  [phraseKey("návod", "інструкція", "a2-22")]: {
    sk: "Nejdřív si přečtěte návod.",
    ua: "Спочатку прочитайте інструкцію.",
    ru: "Сначала прочитайте инструкцию.",
    tokens: ["Nejdřív", "si", "přečtěte", "návod", "."],
  },

  [phraseKey("lék proti bolesti", "знеболювальне", "a2-22")]: {
    sk: "Potřebuji silný lék proti bolesti.",
    ua: "Мені потрібне сильне знеболювальне.",
    ru: "Мне нужно сильное обезболивающее.",
    tokens: ["Potřebuji", "silný", "lék", "proti", "bolesti", "."],
  },

  [phraseKey("antibiotika", "антибіотики", "a2-22")]: {
    sk: "Lékař mi předepsal antibiotika.",
    ua: "Лікар призначив мені антибіотики.",
    ru: "Врач прописал мне антибиотики.",
    tokens: ["Lékař", "mi", "předepsal", "antibiotika", "."],
  },

  [phraseKey("ockování", "вакцинація", "a2-22")]: {
    sk: "Příští týden mám očkování.",
    ua: "Наступного тижня в мене вакцинація.",
    ru: "На следующей неделе у меня вакцинация.",
    tokens: ["Příští", "týden", "mám", "očkování", "."],
  },

  [phraseKey("recept", "рецепт", "a2-22")]: {
    sk: "Bez receptu to v lékárně nedostanu.",
    ua: "Без рецепта я цього в аптеці не отримаю.",
    ru: "Без рецепта я это в аптеке не получу.",
    tokens: ["Bez", "receptu", "to", "v", "lékárně", "nedostanu", "."],
  },

  [phraseKey("bez receptu", "без рецепта", "a2-22")]: {
    sk: "Tento sirup je bez receptu.",
    ua: "Цей сироп продається без рецепта.",
    ru: "Этот сироп продаётся без рецепта.",
    tokens: ["Tento", "sirup", "je", "bez", "receptu", "."],
  },

  [phraseKey("kontrola", "контроль/огляд", "a2-22")]: {
    sk: "Za týden půjdu na kontrolu.",
    ua: "За тиждень я піду на огляд.",
    ru: "Через неделю я пойду на осмотр.",
    tokens: ["Za", "týden", "půjdu", "na", "kontrolu", "."],
  },

  [phraseKey("uzdravovat se", "одужувати", "a2-22")]: {
    sk: "Po operaci se pomalu uzdravuje.",
    ua: "Після операції він повільно одужує.",
    ru: "После операции он медленно выздоравливает.",
    tokens: ["Po", "operaci", "se", "pomalu", "uzdravuje", "."],
  },

  // =========================
  // LESSON A2-23 — Місто (безпека та служби)
  // =========================
  [phraseKey("nehoda", "аварія/нещасний випадок", "a2-23")]: {
    sk: "Na křižovatce se stala nehoda.",
    ua: "На перехресті сталася аварія.",
    ru: "На перекрёстке произошла авария.",
    tokens: ["Na", "křižovatce", "se", "stala", "nehoda", "."],
  },

  [phraseKey("záchranka", "швидка допомога", "a2-23")]: {
    sk: "Někdo už zavolal záchranku.",
    ua: "Хтось уже викликав швидку допомогу.",
    ru: "Кто-то уже вызвал скорую помощь.",
    tokens: ["Někdo", "už", "zavolal", "záchranku", "."],
  },

  [phraseKey("hasiči", "пожежники", "a2-23")]: {
    sk: "Hasiči přijeli velmi rychle.",
    ua: "Пожежники приїхали дуже швидко.",
    ru: "Пожарные приехали очень быстро.",
    tokens: ["Hasiči", "přijeli", "velmi", "rychle", "."],
  },

  [phraseKey("policejní stanice", "відділок поліції", "a2-23")]: {
    sk: "Musíme jít na policejní stanici.",
    ua: "Нам треба піти до відділку поліції.",
    ru: "Нам нужно пойти в отделение полиции.",
    tokens: ["Musíme", "jít", "na", "policejní", "stanici", "."],
  },

  [phraseKey("svědek", "свідок", "a2-23")]: {
    sk: "Svědek všechno přesně popsal.",
    ua: "Свідок усе точно описав.",
    ru: "Свидетель всё точно описал.",
    tokens: ["Svědek", "všechno", "přesně", "popsal", "."],
  },

  [phraseKey("krádež", "крадіжка", "a2-23")]: {
    sk: "V centru došlo ke krádeži kola.",
    ua: "У центрі сталася крадіжка велосипеда.",
    ru: "В центре произошла кража велосипеда.",
    tokens: ["V", "centru", "došlo", "ke", "krádeži", "kola", "."],
  },

  [phraseKey("nahlásit", "повідомити/заявити", "a2-23")]: {
    sk: "Chci nahlásit ztrátu dokladů.",
    ua: "Я хочу заявити про втрату документів.",
    ru: "Я хочу сообщить о потере документов.",
    tokens: ["Chci", "nahlásit", "ztrátu", "dokladů", "."],
  },

  [phraseKey("doklady", "документи", "a2-23")]: {
    sk: "V peněžence jsem měl všechny doklady.",
    ua: "У гаманці в мене були всі документи.",
    ru: "В кошельке у меня были все документы.",
    tokens: ["V", "peněžence", "jsem", "měl", "všechny", "doklady", "."],
  },

  [phraseKey("ztratit", "загубити", "a2-23")]: {
    sk: "Nechci ztratit telefon ani klíče.",
    ua: "Я не хочу загубити телефон чи ключі.",
    ru: "Я не хочу потерять телефон или ключи.",
    tokens: ["Nechci", "ztratit", "telefon", "ani", "klíče", "."],
  },

  [phraseKey("najít", "знайти", "a2-23")]: {
    sk: "Doufám, že se to podaří najít.",
    ua: "Сподіваюся, що це вдасться знайти.",
    ru: "Надеюсь, что это удастся найти.",
    tokens: ["Doufám", ",", "že", "se", "to", "podaří", "najít", "."],
  },

  // =========================
  // LESSON A2-24 — Їжа (покупки та приготування)
  // =========================
  [phraseKey("ingredience", "інгредієнти", "a2-24")]: {
    sk: "Všechny ingredience už máme doma.",
    ua: "Усі інгредієнти вже є вдома.",
    ru: "Все ингредиенты уже есть дома.",
    tokens: ["Všechny", "ingredience", "už", "máme", "doma", "."],
  },

  [phraseKey("recept (kuchařský)", "рецепт (кулінарний)", "a2-24")]: {
    sk: "Našel jsem jednoduchý recept na polévku.",
    ua: "Я знайшов простий кулінарний рецепт на суп.",
    ru: "Я нашёл простой кулинарный рецепт супа.",
    tokens: ["Našel", "jsem", "jednoduchý", "recept", "na", "polévku", "."],
  },

  [phraseKey("nakrájet", "нарізати", "a2-24")]: {
    sk: "Nejdřív musíš nakrájet cibuli.",
    ua: "Спочатку ти маєш нарізати цибулю.",
    ru: "Сначала тебе нужно нарезать лук.",
    tokens: ["Nejdřív", "musíš", "nakrájet", "cibuli", "."],
  },

  [phraseKey("smíchat", "змішати", "a2-24")]: {
    sk: "Pak všechno dobře smíchej.",
    ua: "Потім добре все змішай.",
    ru: "Потом хорошо всё смешай.",
    tokens: ["Pak", "všechno", "dobře", "smíchej", "."],
  },

  [phraseKey("osmažit", "підсмажити", "a2-24")]: {
    sk: "Maso je potřeba lehce osmažit.",
    ua: "М’ясо потрібно трохи підсмажити.",
    ru: "Мясо нужно слегка обжарить.",
    tokens: ["Maso", "je", "potřeba", "lehce", "osmažit", "."],
  },

  [phraseKey("uvařit", "зварити", "a2-24")]: {
    sk: "Brambory se musí nejdřív uvařit.",
    ua: "Картоплю потрібно спочатку зварити.",
    ru: "Картошку нужно сначала сварить.",
    tokens: ["Brambory", "se", "musí", "nejdřív", "uvařit", "."],
  },

  [phraseKey("upéct", "спекти", "a2-24")]: {
    sk: "Chci dnes upéct koláč.",
    ua: "Я хочу сьогодні спекти пиріг.",
    ru: "Я хочу сегодня испечь пирог.",
    tokens: ["Chci", "dnes", "upéct", "koláč", "."],
  },

  [phraseKey("ochutit", "приправити", "a2-24")]: {
    sk: "Na konci to můžeš ochutit bylinkami.",
    ua: "Наприкінці ти можеш це приправити травами.",
    ru: "В конце можешь приправить это травами.",
    tokens: ["Na", "konci", "to", "můžeš", "ochutit", "bylinkami", "."],
  },

  [phraseKey("porce", "порція", "a2-24")]: {
    sk: "Tohle je velká porce pro dvě osoby.",
    ua: "Це велика порція на двох людей.",
    ru: "Это большая порция на двоих.",
    tokens: ["Tohle", "je", "velká", "porce", "pro", "dvě", "osoby", "."],
  },

  [phraseKey("zbytky", "залишки їжі", "a2-24")]: {
    sk: "Zbytky dáme do lednice.",
    ua: "Залишки їжі покладемо в холодильник.",
    ru: "Остатки еды положим в холодильник.",
    tokens: ["Zbytky", "dáme", "do", "lednice", "."],
  },

  // =========================
  // LESSON A2-25 — Подорожі (планування маршруту)
  // =========================
  [phraseKey("itinerář", "маршрут/план подорожі", "a2-25")]: {
    sk: "Připravil jsem si podrobný itinerář.",
    ua: "Я підготував детальний маршрут подорожі.",
    ru: "Я подготовил подробный план поездки.",
    tokens: ["Připravil", "jsem", "si", "podrobný", "itinerář", "."],
  },

  [phraseKey("přestup", "пересадка", "a2-25")]: {
    sk: "V Brně budeme mít krátký přestup.",
    ua: "У Брно в нас буде коротка пересадка.",
    ru: "В Брно у нас будет короткая пересадка.",
    tokens: ["V", "Brně", "budeme", "mít", "krátký", "přestup", "."],
  },

  [phraseKey("spoj", "рейс/сполучення", "a2-25")]: {
    sk: "Tento spoj jede přímo do Prahy.",
    ua: "Цей рейс їде прямо до Праги.",
    ru: "Этот рейс идёт прямо до Праги.",
    tokens: ["Tento", "spoj", "jede", "přímo", "do", "Prahy", "."],
  },

  [phraseKey("zpoždění", "затримка", "a2-25")]: {
    sk: "Na tabuli bylo napsáno zpoždění.",
    ua: "На табло було написано про затримку.",
    ru: "На табло было написано о задержке.",
    tokens: ["Na", "tabuli", "bylo", "napsáno", "zpoždění", "."],
  },

  [phraseKey("zrušený", "скасований", "a2-25")]: {
    sk: "Náš vlak byl bohužel zrušený.",
    ua: "Наш потяг, на жаль, був скасований.",
    ru: "Наш поезд, к сожалению, был отменён.",
    tokens: ["Náš", "vlak", "byl", "bohužel", "zrušený", "."],
  },

  [phraseKey("odbavení", "реєстрація / оформлення", "a2-25")]: {
    sk: "Odbavení začíná dvě hodiny před odletem.",
    ua: "Реєстрація починається за дві години до вильоту.",
    ru: "Регистрация начинается за два часа до вылета.",
    tokens: ["Odbavení", "začíná", "dvě", "hodiny", "před", "odletem", "."],
  },

  [phraseKey("cestovní řád", "розклад руху", "a2-25")]: {
    sk: "Cestovní řád najdeš na internetu.",
    ua: "Розклад руху ти знайдеш в інтернеті.",
    ru: "Расписание движения ты найдёшь в интернете.",
    tokens: ["Cestovní", "řád", "najdeš", "na", "internetu", "."],
  },

  [phraseKey("zpáteční lístek", "квиток туди-назад", "a2-25")]: {
    sk: "Prosím jeden zpáteční lístek do Olomouce.",
    ua: "Будь ласка, один квиток туди-назад до Оломоуца.",
    ru: "Пожалуйста, один билет туда-обратно до Оломоуца.",
    tokens: ["Prosím", "jeden", "zpáteční", "lístek", "do", "Olomouce", "."],
  },

  [phraseKey("jednosměrný lístek", "квиток в один бік", "a2-25")]: {
    sk: "Tentokrát potřebuji jen jednosměrný lístek.",
    ua: "Цього разу мені потрібен лише квиток в один бік.",
    ru: "В этот раз мне нужен только билет в одну сторону.",
    tokens: ["Tentokrát", "potřebuji", "jen", "jednosměrný", "lístek", "."],
  },

  [phraseKey("cestovní lístek", "квиток", "a2-25")]: {
    sk: "Nezapomeň si koupit cestovní lístek.",
    ua: "Не забудь купити квиток.",
    ru: "Не забудь купить билет.",
    tokens: ["Nezapomeň", "si", "koupit", "cestovní", "lístek", "."],
  },

  // =========================
  // LESSON A2-26 — Комунікація та інформація
  // =========================
  [phraseKey("zpráva", "повідомлення", "a2-26")]: {
    sk: "Poslal jsem ti důležitou zprávu.",
    ua: "Я надіслав тобі важливе повідомлення.",
    ru: "Я отправил тебе важное сообщение.",
    tokens: ["Poslal", "jsem", "ti", "důležitou", "zprávu", "."],
  },

  [phraseKey("oznámení", "оголошення", "a2-26")]: {
    sk: "Na dveřích viselo nové oznámení.",
    ua: "На дверях висіло нове оголошення.",
    ru: "На двери висело новое объявление.",
    tokens: ["Na", "dveřích", "viselo", "nové", "oznámení", "."],
  },

  [phraseKey("článek", "стаття", "a2-26")]: {
    sk: "Ráno jsem četl zajímavý článek.",
    ua: "Вранці я читав цікаву статтю.",
    ru: "Утром я читал интересную статью.",
    tokens: ["Ráno", "jsem", "četl", "zajímavý", "článek", "."],
  },

  [phraseKey("zdroj informací", "джерело інформації", "a2-26")]: {
    sk: "Internet není vždy spolehlivý zdroj informací.",
    ua: "Інтернет не завжди є надійним джерелом інформації.",
    ru: "Интернет не всегда является надёжным источником информации.",
    tokens: ["Internet", "není", "vždy", "spolehlivý", "zdroj", "informací", "."],
  },

  [phraseKey("uvedej", "опублікувати", "a2-26")]: {
    sk: "Tu zprávu chtějí uvést ještě dnes.",
    ua: "Це повідомлення хочуть опублікувати ще сьогодні.",
    ru: "Это сообщение хотят опубликовать ещё сегодня.",
    tokens: ["Tu", "zprávu", "chtějí", "uvést", "ještě", "dnes", "."],
  },

  [phraseKey("zveřejnit", "оприлюднити", "a2-26")]: {
    sk: "Výsledky budou zveřejněny zítra.",
    ua: "Результати будуть оприлюднені завтра.",
    ru: "Результаты будут опубликованы завтра.",
    tokens: ["Výsledky", "budou", "zveřejněny", "zítra", "."],
  },

  [phraseKey("reagovat", "реагувати", "a2-26")]: {
    sk: "Na kritiku musíme reagovat klidně.",
    ua: "На критику ми маємо реагувати спокійно.",
    ru: "На критику мы должны реагировать спокойно.",
    tokens: ["Na", "kritiku", "musíme", "reagovat", "klidně", "."],
  },

  [phraseKey("diskuze", "дискусія", "a2-26")]: {
    sk: "Po přednášce následovala diskuze.",
    ua: "Після лекції відбулася дискусія.",
    ru: "После лекции последовала дискуссия.",
    tokens: ["Po", "přednášce", "následovala", "diskuze", "."],
  },

  [phraseKey("názor", "думка", "a2-26")]: {
    sk: "Každý má na to jiný názor.",
    ua: "Кожен має на це іншу думку.",
    ru: "У каждого на это другое мнение.",
    tokens: ["Každý", "má", "na", "to", "jiný", "názor", "."],
  },

  [phraseKey("vliv", "вплив", "a2-26")]: {
    sk: "Reklama má velký vliv na lidi.",
    ua: "Реклама має великий вплив на людей.",
    ru: "Реклама оказывает большое влияние на людей.",
    tokens: ["Reklama", "má", "velký", "vliv", "na", "lidi", "."],
  },

  // =========================
  // LESSON A2-27 — Комунікація (заперечення та аргументи)
  // =========================
  [phraseKey("naopak", "навпаки", "a2-27")]: {
    sk: "Nemyslím si to, naopak mám jiný názor.",
    ua: "Я так не думаю, навпаки маю іншу думку.",
    ru: "Я так не думаю, наоборот у меня другое мнение.",
    tokens: ["Nemyslím", "si", "to", ",", "naopak", "mám", "jiný", "názor", "."],
  },

  [phraseKey("ve skutečnosti", "насправді", "a2-27")]: {
    sk: "Ve skutečnosti to bylo úplně jinak.",
    ua: "Насправді все було зовсім інакше.",
    ru: "На самом деле всё было совсем иначе.",
    tokens: ["Ve", "skutečnosti", "to", "bylo", "úplně", "jinak", "."],
  },

  [phraseKey("důkaz", "доказ", "a2-27")]: {
    sk: "Na to nemáme žádný důkaz.",
    ua: "На це в нас немає жодного доказу.",
    ru: "У нас нет на это никаких доказательств.",
    tokens: ["Na", "to", "nemáme", "žádný", "důkaz", "."],
  },

  [phraseKey("argument", "аргумент", "a2-27")]: {
    sk: "To je silný argument proti tomu.",
    ua: "Це сильний аргумент проти цього.",
    ru: "Это сильный аргумент против этого.",
    tokens: ["To", "je", "silný", "argument", "proti", "tomu", "."],
  },

  [phraseKey("důvod", "причина", "a2-27")]: {
    sk: "K tomu máme dobrý důvod.",
    ua: "Для цього в нас є добра причина.",
    ru: "Для этого у нас есть хорошая причина.",
    tokens: ["K", "tomu", "máme", "dobrý", "důvod", "."],
  },

  [phraseKey("výhoda", "перевага", "a2-27")]: {
    sk: "Hlavní výhodou je nižší cena.",
    ua: "Головна перевага — нижча ціна.",
    ru: "Главное преимущество — более низкая цена.",
    tokens: ["Hlavní", "výhodou", "je", "nižší", "cena", "."],
  },

  [phraseKey("nevýhoda", "недолік", "a2-27")]: {
    sk: "Nevýhodou je dlouhé čekání.",
    ua: "Недолік у довгому очікуванні.",
    ru: "Недостаток в долгом ожидании.",
    tokens: ["Nevýhodou", "je", "dlouhé", "čekání", "."],
  },

  [phraseKey("záleží", "залежить", "a2-27")]: {
    sk: "Záleží na tom, co potřebuješ.",
    ua: "Це залежить від того, що тобі потрібно.",
    ru: "Это зависит от того, что тебе нужно.",
    tokens: ["Záleží", "na", "tom", ",", "co", "potřebuješ", "."],
  },

  [phraseKey("přesvědčit", "переконати", "a2-27")]: {
    sk: "Nebude snadné ho přesvědčit.",
    ua: "Його буде непросто переконати.",
    ru: "Его будет непросто убедить.",
    tokens: ["Nebude", "snadné", "ho", "přesvědčit", "."],
  },

  [phraseKey("souhlasit s tím", "погодитися з цим", "a2-27")]: {
    sk: "Nemůžu s tím úplně souhlasit.",
    ua: "Я не можу з цим повністю погодитися.",
    ru: "Я не могу с этим полностью согласиться.",
    tokens: ["Nemůžu", "s", "tím", "úplně", "souhlasit", "."],
  },

  // =========================
  // LESSON A2-28 — Технології (інтернет та безпека)
  // =========================
  [phraseKey("soukromí", "приватність", "a2-28")]: {
    sk: "Na internetu je soukromí velmi důležité.",
    ua: "В інтернеті приватність дуже важлива.",
    ru: "В интернете приватность очень важна.",
    tokens: ["Na", "internetu", "je", "soukromí", "velmi", "důležité", "."],
  },

  [phraseKey("bezpečnost", "безпека", "a2-28")]: {
    sk: "Musíme myslet na bezpečnost dat.",
    ua: "Ми маємо думати про безпеку даних.",
    ru: "Мы должны думать о безопасности данных.",
    tokens: ["Musíme", "myslet", "na", "bezpečnost", "dat", "."],
  },

  [phraseKey("ověření", "підтвердження/верифікація", "a2-28")]: {
    sk: "Bez ověření se nepřihlásíš.",
    ua: "Без верифікації ти не увійдеш.",
    ru: "Без подтверждения ты не войдёшь.",
    tokens: ["Bez", "ověření", "se", "nepřihlásíš", "."],
  },

  [phraseKey("dvojfaktorové ověření", "2FA (двофакторна перевірка)", "a2-28")]: {
    sk: "Mám zapnuté dvojfaktorové ověření.",
    ua: "У мене ввімкнена двофакторна перевірка.",
    ru: "У меня включена двухфакторная проверка.",
    tokens: ["Mám", "zapnuté", "dvojfaktorové", "ověření", "."],
  },

  [phraseKey("podvod", "шахрайство", "a2-28")]: {
    sk: "Vypadalo to jako internetový podvod.",
    ua: "Це виглядало як інтернет-шахрайство.",
    ru: "Это выглядело как интернет-мошенничество.",
    tokens: ["Vypadalo", "to", "jako", "internetový", "podvod", "."],
  },

  [phraseKey("odkaz", "посилання", "a2-28")]: {
    sk: "Neklikej na podezřelý odkaz.",
    ua: "Не натискай на підозріле посилання.",
    ru: "Не нажимай на подозрительную ссылку.",
    tokens: ["Neklikej", "na", "podezřelý", "odkaz", "."],
  },

  [phraseKey("stáhnout soubor", "завантажити файл", "a2-28")]: {
    sk: "Nechci stáhnout neznámý soubor.",
    ua: "Я не хочу завантажувати невідомий файл.",
    ru: "Я не хочу скачивать неизвестный файл.",
    tokens: ["Nechci", "stáhnout", "neznámý", "soubor", "."],
  },

  [phraseKey("virus", "вірус", "a2-28")]: {
    sk: "Ten počítač možná napadl virus.",
    ua: "Можливо, цей комп’ютер атакував вірус.",
    ru: "Возможно, этот компьютер поразил вирус.",
    tokens: ["Ten", "počítač", "možná", "napadl", "virus", "."],
  },

  [phraseKey("zablokovat", "заблокувати", "a2-28")]: {
    sk: "Musel jsem ten účet zablokovat.",
    ua: "Мені довелося заблокувати той акаунт.",
    ru: "Мне пришлось заблокировать тот аккаунт.",
    tokens: ["Musel", "jsem", "ten", "účet", "zablokovat", "."],
  },

  [phraseKey("obnovit heslo", "відновити пароль", "a2-28")]: {
    sk: "Potřebuji obnovit heslo k e-mailu.",
    ua: "Мені потрібно відновити пароль до e-mail.",
    ru: "Мне нужно восстановить пароль к e-mail.",
    tokens: ["Potřebuji", "obnovit", "heslo", "k", "e-mailu", "."],
  },

  // =========================
  // LESSON A2-29 — Емоції (розширено)
  // =========================
  [phraseKey("zklamaný", "розчарований", "a2-29")]: {
    sk: "Byl jsem z výsledku dost zklamaný.",
    ua: "Я був досить розчарований результатом.",
    ru: "Я был довольно разочарован результатом.",
    tokens: ["Byl", "jsem", "z", "výsledku", "dost", "zklamaný", "."],
  },

  [phraseKey("naštvaný", "розлючений", "a2-29")]: {
    sk: "Kvůli té chybě byl hodně naštvaný.",
    ua: "Через ту помилку він був дуже злий.",
    ru: "Из-за той ошибки он был очень злой.",
    tokens: ["Kvůli", "té", "chybě", "byl", "hodně", "naštvaný", "."],
  },

  [phraseKey("nadšený", "захоплений", "a2-29")]: {
    sk: "Děti byly z výletu nadšené.",
    ua: "Діти були в захваті від поїздки.",
    ru: "Дети были в восторге от поездки.",
    tokens: ["Děti", "byly", "z", "výletu", "nadšené", "."],
  },

  [phraseKey("zmatený", "розгублений", "a2-29")]: {
    sk: "Po tom vysvětlení jsem byl zmatený.",
    ua: "Після того пояснення я був розгублений.",
    ru: "После того объяснения я был растерян.",
    tokens: ["Po", "tom", "vysvětlení", "jsem", "byl", "zmatený", "."],
  },

  [phraseKey("znepokojený", "стурбований", "a2-29")]: {
    sk: "Rodiče byli trochu znepokojení.",
    ua: "Батьки були трохи стурбовані.",
    ru: "Родители были немного обеспокоены.",
    tokens: ["Rodiče", "byli", "trochu", "znepokojení", "."],
  },

  [phraseKey("hrdý", "гордий", "a2-29")]: {
    sk: "Jsem na tebe opravdu hrdý.",
    ua: "Я справді тобою пишаюся.",
    ru: "Я действительно тобой горжусь.",
    tokens: ["Jsem", "na", "tebe", "opravdu", "hrdý", "."],
  },

  [phraseKey("vděčný", "вдячний", "a2-29")]: {
    sk: "Jsem ti za pomoc velmi vděčný.",
    ua: "Я дуже вдячний тобі за допомогу.",
    ru: "Я очень благодарен тебе за помощь.",
    tokens: ["Jsem", "ti", "za", "pomoc", "velmi", "vděčný", "."],
  },

  [phraseKey("stydět se", "соромитися", "a2-29")]: {
    sk: "Nemusíš se za to stydět.",
    ua: "Тобі не треба цього соромитися.",
    ru: "Тебе не нужно этого стыдиться.",
    tokens: ["Nemusíš", "se", "za", "to", "stydět", "."],
  },

  [phraseKey("litovat", "шкодувати", "a2-29")]: {
    sk: "Nechci později ničeho litovat.",
    ua: "Я не хочу потім ні про що шкодувати.",
    ru: "Я не хочу потом ни о чём жалеть.",
    tokens: ["Nechci", "později", "ničeho", "litovat", "."],
  },

  [phraseKey("ulevit se", "полегшало", "a2-29")]: {
    sk: "Po dobré zprávě se mi ulevilo.",
    ua: "Після доброї новини мені полегшало.",
    ru: "После хорошей новости мне стало легче.",
    tokens: ["Po", "dobré", "zprávě", "se", "mi", "ulevilo", "."],
  },

  // =========================
  // LESSON A2-30 — Повторення A2 (21–29)
  // =========================
  [phraseKey("náhradní díl", "запасна частина", "a2-30")]: {
    sk: "Bez náhradního dílu to nepůjde opravit.",
    ua: "Без запасної частини це не вдасться відремонтувати.",
    ru: "Без запасной части это не получится починить.",
    tokens: ["Bez", "náhradního", "dílu", "to", "nepůjde", "opravit", "."],
  },

  [phraseKey("dávkování", "дозування", "a2-30")]: {
    sk: "Správné dávkování je velmi důležité.",
    ua: "Правильне дозування дуже важливе.",
    ru: "Правильная дозировка очень важна.",
    tokens: ["Správné", "dávkování", "je", "velmi", "důležité", "."],
  },

  [phraseKey("krádež", "крадіжка", "a2-30")]: {
    sk: "Tu krádež už vyšetřuje policie.",
    ua: "Цю крадіжку вже розслідує поліція.",
    ru: "Эту кражу уже расследует полиция.",
    tokens: ["Tu", "krádež", "už", "vyšetřuje", "policie", "."],
  },

  [phraseKey("ingredience", "інгредієнти", "a2-30")]: {
    sk: "Na stole už byly všechny ingredience.",
    ua: "На столі вже були всі інгредієнти.",
    ru: "На столе уже были все ингредиенты.",
    tokens: ["Na", "stole", "už", "byly", "všechny", "ingredience", "."],
  },

  [phraseKey("itinerář", "маршрут", "a2-30")]: {
    sk: "Náš itinerář se trochu změnil.",
    ua: "Наш маршрут трохи змінився.",
    ru: "Наш маршрут немного изменился.",
    tokens: ["Náš", "itinerář", "se", "trochu", "změnil", "."],
  },

  [phraseKey("výplatní páska", "розрахунковий лист", "a2-30")]: {
    sk: "Výplatní pásku dostaneme e-mailem.",
    ua: "Розрахунковий лист ми отримаємо електронною поштою.",
    ru: "Расчётный листок мы получим по электронной почте.",
    tokens: ["Výplatní", "pásku", "dostaneme", "e-mailem", "."],
  },

  [phraseKey("argument", "аргумент", "a2-30")]: {
    sk: "Tohle není dost silný argument.",
    ua: "Це недостатньо сильний аргумент.",
    ru: "Это недостаточно сильный аргумент.",
    tokens: ["Tohle", "není", "dost", "silný", "argument", "."],
  },

  [phraseKey("podvod", "шахрайство", "a2-30")]: {
    sk: "Nakonec se ukázalo, že to byl podvod.",
    ua: "Зрештою виявилося, що це було шахрайство.",
    ru: "В итоге оказалось, что это было мошенничество.",
    tokens: ["Nakonec", "se", "ukázalo", ",", "že", "to", "byl", "podvod", "."],
  },

  [phraseKey("znepokojený", "стурбований", "a2-30")]: {
    sk: "Kvůli té situaci byl znepokojený.",
    ua: "Через ту ситуацію він був стурбований.",
    ru: "Из-за той ситуации он был обеспокоен.",
    tokens: ["Kvůli", "té", "situaci", "byl", "znepokojený", "."],
  },

  [phraseKey("záleží", "залежить", "a2-30")]: {
    sk: "Všechno záleží na správném rozhodnutí.",
    ua: "Усе залежить від правильного рішення.",
    ru: "Всё зависит от правильного решения.",
    tokens: ["Všechno", "záleží", "na", "správném", "rozhodnutí", "."],
  },
};