/** Flunio Interactive Stories: curated target-language text and deterministic reading checks.
 * The browser's optional speech synthesis is NOT a recorded native speaker or
 * a validated listening/speaking assessment. Score = reading comprehension only.
 */
import { CS_STORIES } from "./content-cs";
import { PL_STORIES } from "./content-pl";
import type { Course } from "../personal-plan/planner";
export type UiLang = "ua" | "ru" | "en";
export type Tr = Record<UiLang, string>;
export type Gloss = { sk: string; meaning: Tr };
export type Scene = {
  kind: "scene";
  id: string;
  speaker: string;
  sk: string;
  audioSrc?: string;
  translation: Tr;
  glossary?: Gloss[];
  listenFirst?: boolean;
  next: string;
};
export type Choice = { id: string; sk: string; translation: Tr };
export type Fork = { kind: "fork"; id: string; prompt: Tr; options: (Choice & { next: string })[] };
export type Question = {
  kind: "question";
  id: string;
  prompt: Tr;
  choices: Choice[];
  correctId: string;
  explanation: Tr;
  next: string;
};
export type Ending = { kind: "ending"; id: string; sk: string; translation: Tr };
export type StoryNode = Scene | Fork | Question | Ending;
export type Story = {
  course: Course;
  slug: string;
  level: "A1" | "B1" | "B2";
  premium: boolean;
  icon: string;
  duration: number;
  title: Tr;
  summary: Tr;
  goal: Tr;
  start: string;
  nodes: StoryNode[];
};
const tr = (ua: string, ru: string, en: string): Tr => ({ ua, ru, en });
const glossary = (sk: string, ua: string, ru: string, en: string): Gloss => ({ sk, meaning: tr(ua, ru, en) });
const answer = (id: string, sk: string, ua: string, ru: string, en: string): Choice => ({ id, sk, translation: tr(ua, ru, en) });

export const STORIES: Story[] = [
  {
    course: "sk", slug: "lost-keys", level: "A1", premium: false, icon: "🔑", duration: 6,
    title: tr("Загублені ключі", "Потерянные ключи", "The Lost Keys"),
    summary: tr("Ти повертаєшся додому, але не можеш знайти ключі. Попроси допомоги й з'ясуй, що сталося.", "Ты возвращаешься домой, но не можешь найти ключи. Попроси помощи и разберись, что случилось.", "You come home but can't find your keys. Ask for help and work out what happened."),
    goal: tr("Зрозуміти коротку побутову розмову та правильно відповісти на три запитання.", "Понять короткий бытовой разговор и ответить на три вопроса.", "Understand an everyday conversation and answer three questions."),
    start: "arrival",
    nodes: [
      { kind: "scene", id: "arrival", speaker: "Rozprávač", sk: "Martin prišiel domov po práci. Pred dverami hľadá kľúče vo vreckách, ale nikde ich nemá.", translation: tr("Мартін прийшов додому після роботи. Перед дверима шукає ключі в кишенях, але ніде їх немає.", "Мартин пришёл домой после работы. У двери ищет ключи в карманах, но нигде их нет.", "Martin came home after work. At the door he searches his pockets, but his keys are nowhere to be found."), glossary: [glossary("vrecko", "кишеня", "карман", "pocket"), glossary("nikde", "ніде", "нигде", "nowhere")], next: "first-check" },
      { kind: "question", id: "first-check", prompt: tr("Чого Мартін не може знайти?", "Что Мартин не может найти?", "What can't Martin find?"), choices: [answer("a", "Telefón.", "Телефон", "Телефон", "Phone"), answer("b", "Kľúče.", "Ключі", "Ключи", "Keys"), answer("c", "Tašku.", "Сумку", "Сумку", "Bag")], correctId: "b", explanation: tr("У тексті сказано, що він шукає ключі у кишенях.", "В тексте сказано, что он ищет ключи в карманах.", "The text says he is looking for his keys in his pockets."), next: "neighbor" },
      { kind: "scene", id: "neighbor", speaker: "Susedka", sk: "Dobrý večer, Martin. Vyzeráš unavene. Stalo sa niečo?", translation: tr("Добрий вечір, Мартіне. Виглядаєш втомленим. Щось сталося?", "Добрый вечер, Мартин. Выглядишь уставшим. Что-то случилось?", "Good evening, Martin. You look tired. Did something happen?"), glossary: [glossary("stalo sa niečo?", "щось сталося?", "что-то случилось?", "did something happen?")], listenFirst: true, next: "reply" },
      { kind: "fork", id: "reply", prompt: tr("Як Мартін відповість сусідці? Вибери напрямок історії.", "Как Мартин ответит соседке? Выбери развитие истории.", "How will Martin answer the neighbour? Choose a path."), options: [
        { ...answer("ask", "Nemám kľúče. Môžete mi, prosím, pomôcť?", "У мене немає ключів. Допоможете, будь ласка?", "У меня нет ключей. Поможете, пожалуйста?", "I don't have my keys. Could you please help me?"), next: "neighbor-help" },
        { ...answer("search", "Asi som ich nechal v práci. Najprv zavolám kolegovi.", "Мабуть, залишив їх на роботі. Спочатку подзвоню колезі.", "Наверное, оставил их на работе. Сначала позвоню коллеге.", "I may have left them at work. I'll call a coworker first."), next: "coworker" },
      ] },
      { kind: "scene", id: "neighbor-help", speaker: "Susedka", sk: "Jasné. Skús sa pozrieť do tašky. Niekedy tam kľúče zapadnú.", translation: tr("Звичайно. Спробуй подивитися в сумці. Іноді ключі туди провалюються.", "Конечно. Попробуй посмотреть в сумке. Иногда ключи туда проваливаются.", "Of course. Try checking your bag. Sometimes keys slip into it."), next: "find" },
      { kind: "scene", id: "coworker", speaker: "Kolega (telefonát)", sk: "Ahoj, Martin. Tvoje kľúče som v práci nevidel. Pozri sa ešte do tašky.", translation: tr("Привіт, Мартіне. Твоїх ключів на роботі я не бачив. Подивись ще в сумці.", "Привет, Мартин. Твоих ключей на работе я не видел. Посмотри ещё в сумке.", "Hi, Martin. I didn't see your keys at work. Check your bag again."), next: "find" },
      { kind: "scene", id: "find", speaker: "Rozprávač", sk: "Martin otvorí tašku. Kľúče sú na dne pod fľašou vody. Konečne môže ísť domov.", translation: tr("Мартін відкриває сумку. Ключі лежать на дні під пляшкою води. Нарешті він може зайти додому.", "Мартин открывает сумку. Ключи лежат на дне под бутылкой воды. Наконец он может войти домой.", "Martin opens his bag. The keys are at the bottom under a water bottle. At last he can go inside."), glossary: [glossary("na dne", "на дні", "на дне", "at the bottom")], next: "where" },
      { kind: "question", id: "where", prompt: tr("Де були ключі?", "Где были ключи?", "Where were the keys?"), choices: [answer("a", "Pod fľašou vody v taške.", "Під пляшкою води в сумці", "Под бутылкой воды в сумке", "Under a bottle of water in the bag"), answer("b", "Na stole v práci.", "На столі на роботі", "На столе на работе", "On a table at work"), answer("c", "U susedky.", "У сусідки", "У соседки", "At the neighbour's place")], correctId: "a", explanation: tr("Ключі були на дні сумки під пляшкою води.", "Ключи были на дне сумки под бутылкой воды.", "They were at the bottom of the bag under a water bottle."), next: "thanks" },
      { kind: "scene", id: "thanks", speaker: "Martin", sk: "Ďakujem za pomoc. Nabudúce si ich dám do jedného vrecka.", translation: tr("Дякую за допомогу. Наступного разу покладу їх в одну кишеню.", "Спасибо за помощь. В следующий раз положу их в один карман.", "Thanks for the help. Next time I'll keep them in one pocket."), next: "last-check" },
      { kind: "question", id: "last-check", prompt: tr("Що Мартін планує робити наступного разу?", "Что Мартин собирается делать в следующий раз?", "What will Martin do next time?"), choices: [answer("a", "Nechá kľúče v práci.", "Залишить ключі на роботі", "Оставит ключи на работе", "Leave the keys at work"), answer("b", "Kúpi si novú tašku.", "Купить нову сумку", "Купить новую сумку", "Buy a new bag"), answer("c", "Dá si kľúče do jedného vrecka.", "Класти ключі в одну кишеню", "Класть ключи в один карман", "Keep his keys in one pocket")], correctId: "c", explanation: tr("«Nabudúce» означає «наступного разу»; він говоритиме про одну кишеню.", "«Nabudúce» значит «в следующий раз»; он говорит об одном кармане.", "'Nabudúce' means 'next time'; he plans to use one pocket."), next: "end" },
      { kind: "ending", id: "end", sk: "Martin si odomkol dvere a konečne si oddýchol. Malý problém vyriešil pokojne.", translation: tr("Мартін відімкнув двері й нарешті відпочив. Невелику проблему вирішив спокійно.", "Мартин открыл дверь и наконец отдохнул. Небольшую проблему он решил спокойно.", "Martin unlocked the door and finally rested. He solved a small problem calmly.") },
    ],
  },
  {
    course: "sk", slug: "shift-change", level: "B1", premium: true, icon: "🏭", duration: 8,
    title: tr("Несподівана зміна", "Неожиданная смена", "A Last-Minute Shift Change"),
    summary: tr("На роботі змінюють графік. Зрозумій причину, запропонуй рішення та збережи хороші стосунки з колегами.", "На работе меняют график. Выясни причину, предложи решение и сохрани хорошие отношения с коллегами.", "The schedule changes at work. Understand why, suggest a solution and keep good relations with your colleagues."),
    goal: tr("Розпізнавати наміри в робочій розмові, умови й компроміси.", "Распознавать намерения, условия и компромиссы в рабочем разговоре.", "Follow intentions, conditions and compromises in a workplace conversation."),
    start: "meeting",
    nodes: [
      { kind: "scene", id: "meeting", speaker: "Vedúca", sk: "V piatok potrebujeme dokončiť čistenie linky skôr. Kolega ochorel a na poobednej zmene budeme iba traja.", translation: tr("У п’ятницю потрібно раніше закінчити очищення лінії. Колега захворів, і на післяобідній зміні нас буде лише троє.", "В пятницу нужно закончить очистку линии раньше. Коллега заболел, и на вечерней смене нас будет только трое.", "On Friday we need to finish cleaning the line earlier. A colleague is ill and only three of us will be on the afternoon shift."), glossary: [glossary("poobedná zmena", "післяобідня зміна", "послеобеденная смена", "afternoon shift"), glossary("linka", "виробнича лінія", "производственная линия", "production line")], next: "why" },
      { kind: "question", id: "why", prompt: tr("Чому на зміні буде менше людей?", "Почему людей на смене будет меньше?", "Why will there be fewer people on the shift?"), choices: [answer("a", "Kolega má dovolenku.", "Колега у відпустці", "Коллега в отпуске", "A colleague is on holiday"), answer("b", "Kolega ochorel.", "Колега захворів", "Коллега заболел", "A colleague is ill"), answer("c", "Linka je pokazená.", "Лінія зламана", "Линия сломана", "The line is broken")], correctId: "b", explanation: tr("Керівниця прямо сказала «Kolega ochorel».", "Руководительница прямо сказала «Kolega ochorel».", "The supervisor explicitly says 'Kolega ochorel'."), next: "offer" },
      { kind: "scene", id: "offer", speaker: "Kolega", sk: "Môžem prísť o hodinu skôr, ale potom potrebujem odísť načas. Večer mám už dohodnutý program.", translation: tr("Можу прийти на годину раніше, але потім мушу піти вчасно. На вечір уже маю плани.", "Могу прийти на час раньше, но потом должен уйти вовремя. На вечер уже есть планы.", "I can come an hour early, but then I need to leave on time. I already have plans tonight."), glossary: [glossary("načas", "вчасно", "вовремя", "on time"), glossary("dohodnutý", "домовлений", "согласованный", "agreed")], listenFirst: true, next: "respond" },
      { kind: "fork", id: "respond", prompt: tr("Що ти запропонуєш команді? Вибери рішення.", "Что ты предложишь команде? Выбери решение.", "What would you suggest to the team? Choose a response."), options: [
        { ...answer("plan", "Rozdeľme si úlohy, aby sme všetko stihli.", "Розподілімо завдання, щоб усе встигнути.", "Давайте разделим задачи, чтобы всё успеть.", "Let's divide the tasks so we can finish everything."), next: "tasks" },
        { ...answer("ask", "Skúsme sa dohodnúť, čo je dnes najdôležitejšie.", "Домовмося, що сьогодні найважливіше.", "Давайте договоримся, что сегодня важнее всего.", "Let's agree on what's most important today."), next: "priority" },
      ] },
      { kind: "scene", id: "tasks", speaker: "Vedúca", sk: "Dobrý nápad. Ty pripravíš stroje, ja skontrolujem odtok a ostatní dokončia podlahu.", translation: tr("Гарна ідея. Ти підготуєш машини, я перевірю злив, а інші закінчать підлогу.", "Хорошая идея. Ты подготовишь машины, я проверю слив, а остальные закончат пол.", "Good idea. You'll prepare the machines, I'll check the drain and the others will finish the floor."), next: "condition" },
      { kind: "scene", id: "priority", speaker: "Vedúca", sk: "Najprv musí byť čistá linka. Podlahu môžeme dokončiť potom, ak zostane čas.", translation: tr("Насамперед лінія має бути чистою. Підлогу можемо закінчити потім, якщо залишиться час.", "Сначала линия должна быть чистой. Пол закончим потом, если останется время.", "The line must be clean first. We can finish the floor afterwards if there's time."), next: "condition" },
      { kind: "question", id: "condition", prompt: tr("Яка умова є для колеги важливою?", "Какое условие важно для коллеги?", "What condition matters to the colleague?"), choices: [answer("a", "Odísť načas.", "Піти вчасно", "Уйти вовремя", "Leave on time"), answer("b", "Prísť zajtra neskôr.", "Завтра прийти пізніше", "Прийти завтра позже", "Come later tomorrow"), answer("c", "Pracovať celú noc.", "Працювати всю ніч", "Работать всю ночь", "Work all night")], correctId: "a", explanation: tr("Він може прийти раніше, але просить піти вчасно.", "Он может прийти раньше, но просит уйти вовремя.", "They can start earlier but need to leave on time."), next: "conclusion" },
      { kind: "scene", id: "conclusion", speaker: "Vedúca", sk: "Dohodnuté. Ak narazíte na problém, dajte mi hneď vedieť. Nechcem, aby ste sa zbytočne ponáhľali.", translation: tr("Домовилися. Якщо виникне проблема, одразу дайте мені знати. Не хочу, щоб ви марно поспішали.", "Договорились. Если возникнет проблема, сразу сообщите. Не хочу, чтобы вы напрасно спешили.", "Agreed. If you run into a problem, tell me immediately. I don't want you rushing unnecessarily."), glossary: [glossary("naraziť na problém", "зіткнутися з проблемою", "столкнуться с проблемой", "run into a problem"), glossary("zbytočne", "даремно", "зря", "unnecessarily")], next: "intention" },
      { kind: "question", id: "intention", prompt: tr("Що керівниця має на увазі наприкінці?", "Что руководительница имеет в виду в конце?", "What does the supervisor mean at the end?"), choices: [answer("a", "Problémy majú tajiť.", "Проблеми потрібно приховувати", "Проблемы нужно скрывать", "Problems should be hidden"), answer("b", "Všetci musia zostať dlhšie.", "Усі мають залишитися довше", "Все должны остаться дольше", "Everyone must stay later"), answer("c", "Majú jej hneď hlásiť komplikácie.", "Треба одразу повідомляти про ускладнення", "Надо сразу сообщать о трудностях", "They should report complications immediately")], correctId: "c", explanation: tr("Вона просить негайно повідомляти про проблеми, а не поспішати будь-якою ціною.", "Она просит сразу сообщать о проблемах, а не торопиться любой ценой.", "She wants problems reported promptly, rather than rushing at any cost."), next: "end" },
      { kind: "ending", id: "end", sk: "Zmena prebehla pokojne. Tím si jasne rozdelil úlohy a každý vedel, čo má robiť.", translation: tr("Зміна минула спокійно. Команда чітко розподілила завдання, і кожен знав, що робити.", "Смена прошла спокойно. Команда чётко разделила задачи, и все знали, что делать.", "The shift went smoothly. The team clearly divided the tasks and everyone knew what to do.") },
    ],
  },
  {
    course: "sk", slug: "building-meeting", level: "B2", premium: true, icon: "🏢", duration: 9,
    title: tr("Збори мешканців", "Собрание жильцов", "The Residents' Meeting"),
    summary: tr("Мешканці обговорюють ремонт труб. Навчись розуміти непрямі заперечення та знаходити компроміс.", "Жильцы обсуждают ремонт труб. Учись понимать косвенные возражения и находить компромисс.", "Residents discuss pipe repairs. Follow indirect objections and negotiate a compromise."),
    goal: tr("Зрозуміти підтекст, аргументи та обмеження в складнішій дискусії.", "Понять подтекст, аргументы и ограничения в более сложной дискуссии.", "Understand nuance, arguments and constraints in a more complex discussion."),
    start: "announcement",
    nodes: [
      { kind: "scene", id: "announcement", speaker: "Správca domu", sk: "Výmena stúpačiek je nevyhnutná. Práce by mali trvať dva dni, no presný harmonogram dostanete až po potvrdení od dodávateľa.", translation: tr("Заміна стояків необхідна. Роботи мають тривати два дні, але точний графік отримаєте лише після підтвердження від підрядника.", "Замена стояков необходима. Работы должны длиться два дня, но точный график будет после подтверждения подрядчика.", "Replacing the riser pipes is necessary. The work should take two days, but the exact schedule will come only after the contractor confirms it."), glossary: [glossary("stúpačky", "стояки (труби)", "стояки (трубы)", "riser pipes"), glossary("dodávateľ", "підрядник", "подрядчик", "contractor"), glossary("nevyhnutná", "необхідна", "необходимая", "necessary")], next: "certainty" },
      { kind: "question", id: "certainty", prompt: tr("Що вже відомо точно?", "Что уже известно наверняка?", "What is already certain?"), choices: [answer("a", "Presné hodiny prác.", "Точні години робіт", "Точные часы работ", "Exact working hours"), answer("b", "Že výmena je nevyhnutná.", "Що заміна необхідна", "Что замена необходима", "That replacement is necessary"), answer("c", "Že dodávateľ príde zajtra.", "Що підрядник прийде завтра", "Что подрядчик придёт завтра", "That the contractor will arrive tomorrow")], correctId: "b", explanation: tr("Необхідність заміни стверджено однозначно, але графік іще не підтверджений.", "Необходимость замены подтверждена, но график ещё не согласован.", "The need for replacement is confirmed, but the timing is not."), next: "objection" },
      { kind: "scene", id: "objection", speaker: "Suseda", sk: "Rozumiem, že opravu nemožno odkladať. Bolo by však dobré, keby sme sa o termíne dozvedeli skôr než deň vopred. Nie každý si môže vziať voľno na poslednú chvíľu.", translation: tr("Розумію, що ремонт не можна відкладати. Але було б добре дізнатися дату раніше ніж за день. Не кожен може взяти вихідний в останню хвилину.", "Понимаю, что ремонт нельзя откладывать. Но хорошо бы узнать дату раньше, чем за день. Не каждый может взять выходной в последний момент.", "I understand the repair can't be delayed. Still, it would help to know the date more than a day beforehand. Not everyone can take leave at the last minute."), glossary: [glossary("odkladať", "відкладати", "откладывать", "postpone"), glossary("na poslednú chvíľu", "в останню мить", "в последний момент", "at the last minute")], listenFirst: true, next: "react" },
      { kind: "fork", id: "react", prompt: tr("Як ти хочеш відповісти на зауваження сусідки?", "Как ты хочешь ответить на замечание соседки?", "How would you respond to the neighbour's concern?"), options: [
        { ...answer("notice", "Navrhnime, aby nás správca informoval aspoň tri dni vopred.", "Запропонуймо повідомляти нас хоча б за три дні.", "Давайте предложим уведомлять нас хотя бы за три дня.", "Let's propose that the manager give at least three days' notice."), next: "notice-reply" },
        { ...answer("access", "Spýtajme sa, či môžeme v neprítomnosti poveriť niekoho kľúčmi.", "З'ясуймо, чи можна на час відсутності довірити комусь ключі.", "Давайте узнаем, можно ли оставить кому-то ключи на время отсутствия.", "Let's ask if someone can hold our keys while we're away."), next: "access-reply" },
      ] },
      { kind: "scene", id: "notice-reply", speaker: "Správca domu", sk: "Pokúsime sa oznámiť termín čo najskôr. Tri dni však neviem zaručiť, kým nemáme potvrdenie od firmy.", translation: tr("Спробуємо повідомити дату якомога раніше. Але три дні я не можу гарантувати, поки немає підтвердження від фірми.", "Постараемся сообщить дату как можно раньше. Но три дня не могу гарантировать, пока нет подтверждения фирмы.", "We'll try to announce the date as early as possible. But I can't guarantee three days until the firm confirms."), next: "meaning" },
      { kind: "scene", id: "access-reply", speaker: "Správca domu", sk: "Je to možné, ak s tým vlastník súhlasí a vopred určí, kto byt sprístupní. Podrobnosti vám pošleme písomne.", translation: tr("Це можливо, якщо власник погодиться й заздалегідь визначить, хто надасть доступ до квартири. Деталі надішлемо письмово.", "Это возможно, если собственник согласится и заранее назначит того, кто предоставит доступ в квартиру. Детали пришлём письменно.", "That's possible if the owner agrees and designates who will provide access to the flat. We'll send the details in writing."), next: "meaning" },
      { kind: "question", id: "meaning", prompt: tr("Яка головна проблема, про яку говорить сусідка?", "В чём главная проблема, о которой говорит соседка?", "What is the neighbour's main concern?"), choices: [answer("a", "Potrebuje vedieť termín s predstihom.", "Їй потрібне завчасне повідомлення", "Ей нужно заблаговременное уведомление", "She needs advance notice"), answer("b", "Odmieta každú opravu.", "Вона відмовляється від будь-якого ремонту", "Она отказывается от любого ремонта", "She rejects all repairs"), answer("c", "Chce si vybrať dodávateľa.", "Вона хоче вибрати підрядника", "Она хочет выбрать подрядчика", "She wants to select the contractor")], correctId: "a", explanation: tr("Вона не заперечує ремонт; її непокоїть короткий термін попередження.", "Она не против ремонта; её беспокоит короткий срок уведомления.", "She isn't rejecting the repair; she needs sufficient notice."), next: "proposal" },
      { kind: "scene", id: "proposal", speaker: "Správca domu", sk: "Pošleme vám predbežný termín ešte dnes. Keď ho firma potvrdí, dáme vedieť aj o tom, ako zabezpečiť prístup do bytov. Zároveň prosíme, aby ste nám zmeny nahlásili včas.", translation: tr("Сьогодні надішлемо попередню дату. Коли фірма підтвердить її, повідомимо також, як забезпечити доступ до квартир. Просимо завчасно повідомляти про зміни.", "Сегодня пришлём предварительную дату. После подтверждения фирмой сообщим и порядок доступа в квартиры. Также просим заранее сообщать об изменениях.", "We'll send a tentative date today. Once the firm confirms it, we'll explain how to arrange access to flats. Please tell us about any changes in good time."), glossary: [glossary("predbežný", "попередній", "предварительный", "tentative"), glossary("zabezpečiť prístup", "забезпечити доступ", "обеспечить доступ", "arrange access")], next: "final-check" },
      { kind: "question", id: "final-check", prompt: tr("Що означає «predbežný termín» у цьому контексті?", "Что значит «predbežný termín» в этом контексте?", "What does 'predbežný termín' mean here?"), choices: [answer("a", "Termín, ktorý už nemožno zmeniť.", "Дата, яку не можна змінити", "Дата, которую нельзя изменить", "A date that cannot change"), answer("b", "Termín bez akéhokoľvek plánu.", "Дата без будь-якого плану", "Дата без всякого плана", "A date with no planning at all"), answer("c", "Termín, ktorý sa ešte môže zmeniť.", "Дата, яка ще може змінитися", "Дата, которая ещё может измениться", "A date that could still change")], correctId: "c", explanation: tr("«Predbežný» — це попередній, ще не остаточно підтверджений.", "«Predbežný» означает предварительный, ещё не окончательно подтверждённый.", "'Predbežný' is tentative, not yet fully confirmed."), next: "end" },
      { kind: "ending", id: "end", sk: "Obyvatelia sa zatiaľ dohodli na predbežnom postupe. Otázky zostali otvorené, ale už vedia, kto a kedy ich bude informovať.", translation: tr("Мешканці поки погодили попередній порядок дій. Не всі питання вирішено, але вже відомо, хто й коли повідомлятиме новини.", "Жильцы пока согласовали предварительный порядок действий. Не все вопросы решены, но теперь понятно, кто и когда сообщит новости.", "The residents have agreed on a provisional plan. Some questions remain, but they know who will keep them informed and when.") },
    ],
  },
];

export const ALL_STORIES: readonly Story[] = [...STORIES, ...CS_STORIES, ...PL_STORIES];
export function getStoriesForCourse(course: Course): readonly Story[] { return ALL_STORIES.filter(story => story.course === course); }
export function getStory(slug: string): Story | undefined { return ALL_STORIES.find(s => s.slug === slug); }
export function getNode(story: Story, id: string): StoryNode | undefined { return story.nodes.find(n => n.id === id); }

/** Replay a completed journey on trusted story content. A partial or forged
 * answer set cannot be recorded as a completed story. Forks are choices, not graded.
 */
export function gradeStory(story: Story, selections: Record<string, string>): { correct: number; total: number; percent: number; path: string[] } | null {
  const seen = new Set<string>();
  const path: string[] = [];
  let id = story.start;
  let correct = 0;
  let total = 0;
  const consumed = new Set<string>();
  for (let count = 0; count <= story.nodes.length; count++) {
    const node = getNode(story, id);
    if (!node || seen.has(id)) return null;
    seen.add(id); path.push(id);
    if (node.kind === "ending") {
      if (Object.keys(selections).length !== consumed.size) return null;
      return total > 0 ? { correct, total, percent: Math.round((correct / total) * 100), path } : null;
    }
    if (node.kind === "fork") {
      const chosen = selections[id];
      if (typeof chosen !== "string") return null;
      const opt = node.options.find(c => c.id === chosen);
      if (!opt) return null;
      consumed.add(id);
      id = opt.next;
    } else if (node.kind === "question") {
      const chosen = selections[id];
      if (typeof chosen !== "string" || !node.choices.some(c => c.id === chosen)) return null;
      consumed.add(id);
      total += 1;
      if (chosen === node.correctId) correct += 1;
      id = node.next;
    } else { id = node.next; }
  }
  return null;
}
