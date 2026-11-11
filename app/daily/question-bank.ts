/** Curated, static phrases. No AI calls or per-visit API costs. */
export type DailyCourse = "sk" | "cs" | "pl";
export type DailyUiLang = "ua" | "ru" | "en";

export type DailyQuestion = {
  phrase: string;
  answer: string;
  wrong: readonly [string, string];
  example: string;
  meaning: Record<DailyUiLang, string>;
};

const question = (
  phrase: string,
  answer: string,
  wrong1: string,
  wrong2: string,
  example: string,
  ua: string,
  ru: string,
  en: string
): DailyQuestion => ({ phrase, answer, wrong: [wrong1, wrong2], example, meaning: { ua, ru, en } });

export const DAILY_BANK: Record<DailyCourse, readonly DailyQuestion[]> = {
  sk: [
    question("byť na figu", "byť nanič", "byť výborný", "byť veľmi drahý", "Ten nápad je na figu.", "Бути поганим або нікудишнім.", "Быть плохим, никудышным.", "To be lousy or no good."),
    question("mať niečo na háku", "nezaujímať sa o to", "dávať si pozor", "niečo opravovať", "On má všetko na háku.", "Не перейматися чимось.", "Не переживать из-за чего-то.", "Not to care about something."),
    question("ísť do tuhého", "situácia sa stáva vážnou", "všetko je jednoduchšie", "niečo sa odkladá", "Teraz už ide do tuhého.", "Ситуація стає серйозною.", "Ситуация становится серьёзной.", "Things are getting serious."),
    question("byť za vodou", "mať zabezpečenú budúcnosť", "byť na výlete", "mať smolu", "Po tej výhre je za vodou.", "Бути матеріально забезпеченим.", "Быть материально обеспеченным.", "To be financially secure."),
    question("robiť z komára somára", "zveličovať maličkosť", "konať veľmi rýchlo", "niekoho pochváliť", "Nerob z komára somára.", "Робити з мухи слона.", "Делать из мухи слона.", "To blow something out of proportion."),
    question("dať niekomu košom", "odmietnuť niekoho", "pozvať niekoho", "pomôcť niekomu", "Pozval ju von, ale dala mu košom.", "Відмовити комусь, часто романтично.", "Отказать кому-то, часто в свидании.", "To turn someone down."),
    question("mať ťažkú hlavu", "robiť si starosti", "byť ospalý", "mať veľa nápadov", "Nerob si z toho ťažkú hlavu.", "Сильно хвилюватися через щось.", "Сильно переживать из-за чего-то.", "To worry about something."),
    question("prísť na bubon", "prísť o majetok", "stať sa slávnym", "začať hrať hudbu", "Riskoval priveľa a prišiel na bubon.", "Збанкрутувати, втратити статки.", "Разориться, потерять состояние.", "To go broke."),
    question("nemať ani páru", "vôbec nevedieť", "vedieť všetko", "byť veľmi unavený", "Nemám ani páru, kde je.", "Не мати жодного уявлення.", "Не иметь ни малейшего понятия.", "To have no idea."),
    question("vziať nohy na plecia", "rýchlo utiecť", "ísť pomaly", "začať trénovať", "Keď ho uvideli, vzali nohy na plecia.", "Дати драла, швидко втекти.", "Дать дёру, быстро убежать.", "To run away quickly."),
    question("ísť niekomu na nervy", "otravovať niekoho", "niekoho rozosmiať", "niekomu dôverovať", "Ten hluk mi ide na nervy.", "Діяти комусь на нерви.", "Действовать кому-то на нервы.", "To get on someone's nerves."),
    question("kašľať na to", "prestať sa tým zaoberať", "začať odznova", "zabudnúť niekoho meno", "Kašli na to, nestojí to za to.", "Махнути на це рукою.", "Махнуть на это рукой.", "To give up on it / not bother."),
    question("povedať na rovinu", "povedať otvorene", "povedať potichu", "povedať zo žartu", "Poviem ti to na rovinu.", "Сказати прямо, без натяків.", "Сказать прямо, без намёков.", "To say it straight."),
    question("mať voľné ruky", "môcť rozhodovať samostatne", "mať prázdnu tašku", "nemôcť nič urobiť", "V tomto projekte máš voľné ruky.", "Мати свободу дій.", "Иметь свободу действий.", "To have a free hand."),
    question("byť v jednom kole", "byť veľmi zaneprázdnený", "chodiť dookola", "byť bez práce", "Celý týždeň som v jednom kole.", "Бути постійно зайнятим.", "Быть постоянно занятым.", "To be extremely busy."),
    question("pustiť niečo z hlavy", "prestať na to myslieť", "poriadne si to zapamätať", "niečo rýchlo pochopiť", "Pusti to z hlavy a oddýchni si.", "Викинути щось із голови.", "Выкинуть что-то из головы.", "To stop thinking about something."),
    question("byť pod psa", "byť veľmi zlé", "byť nebezpečné", "byť príliš hlučné", "Dnes je počasie pod psa.", "Бути дуже поганим.", "Быть очень плохим.", "To be really awful."),
    question("mať niečo v malíčku", "dokonale to ovládať", "vôbec to nepoznať", "nechcieť to robiť", "Slovenčinu má už v malíčku.", "Досконало щось знати.", "Знать что-то как свои пять пальцев.", "To know something inside out."),
    question("dať si pozor", "byť opatrný", "niečo ignorovať", "dopriať si odmenu", "Daj si pozor na cestu.", "Бути обережним.", "Быть осторожным.", "To be careful."),
    question("nemať hlavu ani pätu", "nedávať zmysel", "byť veľmi stručné", "byť nečakane vtipné", "Jeho vysvetlenie nemá hlavu ani pätu.", "Не мати логіки чи сенсу.", "Не иметь логики или смысла.", "To make no sense."),
    question("vyjsť s pravdou von", "priznať pravdu", "povedať vtip", "zmeniť názor", "Nakoniec vyšiel s pravdou von.", "Зізнатися, розповісти правду.", "Признаться, рассказать правду.", "To come clean."),
    question("ísť si svoje", "robiť veci po svojom", "nasledovať väčšinu", "nič nezačať", "Nedá si poradiť, ide si svoje.", "Робити по-своєму, не зважати на інших.", "Делать по-своему, не слушая других.", "To do things one's own way."),
    question("jedným uchom dnu, druhým von", "vôbec nepočúvať", "dobre si pamätať", "zle počuť", "Všetko mu ide jedným uchom dnu a druhým von.", "Пропускати повз вуха.", "Пропускать мимо ушей.", "To let it go in one ear and out the other."),
    question("na poslednú chvíľu", "tesne pred termínom", "s veľkým predstihom", "úplne náhodou", "Kúpil lístok na poslednú chvíľu.", "В останній момент.", "В последний момент.", "At the last minute."),
    question("ťahať niekoho za nos", "klamať a zavádzať", "niekomu pomáhať", "presviedčať o pravde", "Už ma prestaň ťahať za nos.", "Водити когось за ніс.", "Водить кого-то за нос.", "To deceive or string someone along."),
    question("mať šťastnú ruku", "dobre si vybrať", "byť silný", "mať dosť času", "Pri výbere auta mal šťastnú ruku.", "Вдало щось вибрати.", "Удачно что-то выбрать.", "To make a lucky choice."),
    question("držať palce", "želať úspech", "niekoho obviňovať", "na niečo zabudnúť", "Na skúške ti držím palce.", "Тримати кулаки, бажати успіху.", "Держать кулачки, желать удачи.", "To keep one's fingers crossed."),
    question("nechať niečo tak", "prestať to riešiť", "začať to znova", "hneď to vysvetliť", "Nechaj to tak, už je neskoro.", "Облишити це, не чіпати.", "Оставить это, не трогать.", "To leave it alone."),
    question("mať niečoho plné zuby", "mať toho dosť", "byť nadšený", "byť hladný", "Mám tých výhovoriek plné zuby.", "Мати щось по горло.", "Быть сытым чем-то по горло.", "To be fed up with something."),
    question("vziať rozum do hrsti", "začať uvažovať rozumne", "prestať premýšľať", "začať sa hádať", "Vezmi rozum do hrsti a neponáhľaj sa.", "Взятися за розум.", "Взяться за ум.", "To start thinking sensibly."),
  ],
  cs: [
    question("být na nic", "být špatný", "být skvělý", "být drahý", "Ten plán je na nic.", "Бути нікудишнім.", "Быть никудышным.", "To be useless or no good."),
    question("mít něco na háku", "nestarat se o to", "pečlivě hlídat", "rychle dokončit", "On to má úplně na háku.", "Не перейматися чимось.", "Не переживать из-за чего-то.", "Not to care about it."),
    question("jít do tuhého", "situace je vážná", "situace se zlepšuje", "někdo odchází", "Teď už jde do tuhého.", "Справа стає серйозною.", "Дело становится серьёзным.", "Things are getting serious."),
    question("být za vodou", "být finančně zajištěný", "být na dovolené", "mít potíže", "Po úspěchu je konečně za vodou.", "Бути матеріально забезпеченим.", "Быть материально обеспеченным.", "To be financially secure."),
    question("dělat z komára velblouda", "zveličovat maličkost", "udělat kompromis", "rychle se rozhodnout", "Nedělej z komára velblouda.", "Робити з мухи слона.", "Делать из мухи слона.", "To make a mountain out of a molehill."),
    question("dát někomu košem", "někoho odmítnout", "někoho pozvat", "někoho potěšit", "Pozval ji na rande, ale dala mu košem.", "Відмовити комусь у побаченні.", "Отказать кому-то в свидании.", "To turn someone down."),
    question("mít těžkou hlavu", "dělat si starosti", "hodně se smát", "být rozespalý", "Nedělej si s tím těžkou hlavu.", "Сильно хвилюватися.", "Сильно переживать.", "To worry about something."),
    question("přijít na buben", "přijít o majetek", "stát se slavným", "začít zpívat", "Nakonec přišel na buben.", "Збанкрутувати.", "Разориться.", "To go broke."),
    question("nemít ani páru", "vůbec nevědět", "všechno vědět", "nic neslyšet", "Nemám ani páru, co tím myslí.", "Не мати жодного уявлення.", "Не иметь ни малейшего понятия.", "To have no idea."),
    question("vzít nohy na ramena", "rychle utéct", "pomalu se vracet", "jít si zaběhat", "Když ho uviděli, vzali nohy na ramena.", "Дати драла.", "Дать дёру.", "To run away fast."),
    question("lézt někomu na nervy", "někoho otravovat", "někoho pobavit", "někoho obdivovat", "Ten hluk mi leze na nervy.", "Діяти на нерви.", "Действовать на нервы.", "To get on someone's nerves."),
    question("vykašlat se na to", "přestat to řešit", "udělat to pečlivě", "udělat to znovu", "Vykašli se na to, nestojí to za to.", "Махнути на це рукою.", "Махнуть на это рукой.", "Not to bother with it."),
    question("říct něco na rovinu", "říct to přímo", "říct to potichu", "říct to ze srandy", "Řeknu ti to na rovinu.", "Сказати прямо.", "Сказать прямо.", "To say it straight."),
    question("mít volné ruce", "moci rozhodovat samostatně", "být bez práce", "nemoci nic dělat", "V projektu máš volné ruce.", "Мати свободу дій.", "Иметь свободу действий.", "To have a free hand."),
    question("být v jednom kole", "mít pořád co dělat", "chodit pořád dokola", "mít spoustu volna", "Celý týden jsem v jednom kole.", "Бути постійно зайнятим.", "Быть постоянно занятым.", "To be constantly busy."),
    question("pustit to z hlavy", "přestat na to myslet", "dobře si to zapamatovat", "začít to řešit", "Pusť to z hlavy a odpočiň si.", "Викинути з голови.", "Выкинуть из головы.", "To put it out of your mind."),
    question("být pod psa", "být velmi špatný", "být náročný", "být nečekaný", "Dnes je počasí pod psa.", "Бути дуже поганим.", "Быть очень плохим.", "To be awful."),
    question("mít něco v malíku", "perfektně to ovládat", "vůbec to neumět", "mít toho málo", "Gramatiku už má v malíku.", "Досконало розбиратися в чомусь.", "Прекрасно в чём-то разбираться.", "To know it inside out."),
    question("dávat si pozor", "být opatrný", "dělat si legraci", "být bezstarostný", "Dávej si pozor na cestu.", "Бути обережним.", "Быть осторожным.", "To be careful."),
    question("nemít hlavu ani patu", "nedávat smysl", "být velmi krátký", "být velmi přesný", "Jeho vysvětlení nemá hlavu ani patu.", "Не мати логіки.", "Не иметь логики.", "To make no sense."),
    question("jít s pravdou ven", "přiznat pravdu", "začít se hádat", "změnit názor", "Nakonec šel s pravdou ven.", "Розповісти правду, зізнатися.", "Рассказать правду, признаться.", "To come clean."),
    question("jet si svoje", "dělat věci po svém", "poslouchat každého", "nedělat nic", "Nedá si poradit, jede si svoje.", "Робити все по-своєму.", "Делать всё по-своему.", "To do things one's own way."),
    question("jedním uchem tam, druhým ven", "vůbec neposlouchat", "dobře si pamatovat", "špatně slyšet", "Jde mu to jedním uchem tam, druhým ven.", "Пропускати повз вуха.", "Пропускать мимо ушей.", "To let it go in one ear and out the other."),
    question("na poslední chvíli", "těsně před termínem", "s velkým předstihem", "jen náhodou", "Přihlásil se na poslední chvíli.", "В останню мить.", "В последний момент.", "At the last minute."),
    question("vodit někoho za nos", "někoho klamat", "někomu pomáhat", "někoho obdivovat", "Přestaň mě vodit za nos.", "Водити за ніс.", "Водить за нос.", "To string someone along."),
    question("mít šťastnou ruku", "dobře si vybrat", "být fyzicky silný", "být připravený", "S tou koupí měl šťastnou ruku.", "Зробити вдалий вибір.", "Сделать удачный выбор.", "To make a lucky choice."),
    question("držet palce", "přát úspěch", "někoho kritizovat", "něco ztratit", "Zítra ti budu držet palce.", "Тримати кулаки.", "Держать кулачки.", "To keep one's fingers crossed."),
    question("nechat to být", "přestat to řešit", "začít znova", "zopakovat to", "Nech to být, to nemá cenu.", "Облишити, не чіпати.", "Оставить, не трогать.", "To leave it alone."),
    question("mít něčeho plné zuby", "mít toho dost", "být z toho nadšený", "mít hlad", "Mám těch slibů plné zuby.", "Мати щось по горло.", "Быть сытым этим по горло.", "To be fed up with it."),
    question("vzít rozum do hrsti", "začít jednat rozumně", "přestat přemýšlet", "začít riskovat", "Vezmi rozum do hrsti.", "Взятися за розум.", "Взяться за ум.", "To start being sensible."),
  ],
  pl: [
    question("mieć coś gdzieś", "nie przejmować się tym", "pilnować czegoś", "często to wspominać", "Mam to gdzieś, nie obchodzi mnie to.", "Не перейматися цим.", "Не переживать из-за этого.", "Not to care about it."),
    question("robić z igły widły", "wyolbrzymiać drobiazg", "robić coś dokładnie", "szybko pracować", "Nie rób z igły wideł.", "Робити з мухи слона.", "Делать из мухи слона.", "To blow something out of proportion."),
    question("dać komuś kosza", "odrzucić czyjeś zaloty", "zaprosić na randkę", "pomóc koledze", "Zaprosił ją, ale dała mu kosza.", "Відмовити комусь у романтичному сенсі.", "Отказать кому-то в романтическом смысле.", "To turn someone down romantically."),
    question("mieć muchy w nosie", "być w złym humorze", "mieć katar", "być bardzo wesołym", "Od rana ma muchy w nosie.", "Бути не в гуморі.", "Быть не в духе.", "To be grumpy."),
    question("mieć ręce pełne roboty", "być bardzo zajętym", "nie mieć pracy", "potrzebować pomocy", "Dzisiaj mam ręce pełne roboty.", "Мати купу роботи.", "Иметь кучу дел.", "To have one's hands full."),
    question("bujać w obłokach", "marzyć i nie myśleć o rzeczywistości", "bardzo się spieszyć", "podejmować decyzje", "Zamiast słuchać, buja w obłokach.", "Витати в хмарах.", "Витать в облаках.", "To have one's head in the clouds."),
    question("być w kropce", "nie wiedzieć, co zrobić", "mieć świetny pomysł", "być bardzo punktualnym", "Nie wiem, co dalej, jestem w kropce.", "Бути в скрутному становищі.", "Быть в затруднительном положении.", "To be at a loss."),
    question("wyjść na swoje", "osiągnąć korzyść", "wrócić do domu", "kogoś przeprosić", "Po latach pracy wreszcie wyszedł na swoje.", "Вийти в плюс, отримати вигоду.", "Выйти в плюс, получить выгоду.", "To come out ahead."),
    question("nie mieć zielonego pojęcia", "zupełnie nie wiedzieć", "znać każdy szczegół", "być bardzo zmęczonym", "Nie mam zielonego pojęcia.", "Не мати жодного уявлення.", "Не иметь ни малейшего понятия.", "To have no idea whatsoever."),
    question("wziąć nogi za pas", "szybko uciec", "pójść na spacer", "zacząć ćwiczyć", "Gdy go zobaczyli, wzięli nogi za pas.", "Дати драла.", "Дать дёру.", "To take to one's heels."),
    question("działać komuś na nerwy", "irytować kogoś", "rozśmieszać kogoś", "wspierać kogoś", "Ten hałas działa mi na nerwy.", "Діяти комусь на нерви.", "Действовать кому-то на нервы.", "To get on someone's nerves."),
    question("machnąć na coś ręką", "przestać się czymś przejmować", "zacząć pracować", "poprosić o pomoc", "Machnąłem na to ręką.", "Махнути на щось рукою.", "Махнуть на что-то рукой.", "To stop worrying about it."),
    question("prosto z mostu", "powiedzieć bez ogródek", "powiedzieć szeptem", "powiedzieć nieprawdę", "Powiem ci prosto z mostu.", "Сказати прямо, без натяків.", "Сказать прямо, без намёков.", "To say it bluntly."),
    question("mieć wolną rękę", "móc decydować samodzielnie", "nie mieć pieniędzy", "być na urlopie", "W tej sprawie masz wolną rękę.", "Мати свободу дій.", "Иметь свободу действий.", "To have a free hand."),
    question("być na pełnych obrotach", "pracować bardzo intensywnie", "jechać powoli", "odpoczywać cały dzień", "Firma działa na pełnych obrotach.", "Працювати на повну потужність.", "Работать на полную мощность.", "To be operating at full speed."),
    question("wyrzucić coś z głowy", "przestać o tym myśleć", "dobrze to zapamiętać", "zacząć to planować", "Wyrzuć to z głowy.", "Викинути щось із голови.", "Выкинуть что-то из головы.", "To put something out of your mind."),
    question("pogoda pod psem", "bardzo zła pogoda", "piękna pogoda", "upalna pogoda", "Dziś pogoda jest pod psem.", "Дуже погана погода.", "Очень плохая погода.", "Really bad weather."),
    question("mieć coś w małym palcu", "znać coś doskonale", "wcale czegoś nie znać", "nie chcieć tego robić", "Ma gramatykę w małym palcu.", "Знати щось як свої п'ять пальців.", "Знать как свои пять пальцев.", "To know something inside out."),
    question("uważać na siebie", "być ostrożnym", "nie dbać o siebie", "być punktualnym", "Uważaj na siebie w drodze.", "Бути обережним, берегти себе.", "Быть осторожным, беречь себя.", "To take care of yourself."),
    question("bez ładu i składu", "bez sensu i porządku", "bardzo dokładnie", "bardzo krótko", "Opowiadał bez ładu i składu.", "Безладно, без жодної логіки.", "Бессвязно, без логики.", "Without rhyme or reason."),
    question("wyłożyć karty na stół", "powiedzieć otwarcie o zamiarach", "zacząć grać w karty", "ukryć swoje plany", "Czas wyłożyć karty na stół.", "Відкрити карти, сказати все прямо.", "Раскрыть карты, сказать всё прямо.", "To lay one's cards on the table."),
    question("iść własną drogą", "postępować po swojemu", "naśladować innych", "zrezygnować z celu", "Postanowiła iść własną drogą.", "Йти своїм шляхом.", "Идти своим путём.", "To go one's own way."),
    question("jednym uchem wpada, drugim wypada", "wcale nie zapamiętywać", "uważnie słuchać", "słabo słyszeć", "Tobie jednym uchem wpada, drugim wypada.", "Пропускати повз вуха.", "Пропускать мимо ушей.", "To let it go in one ear and out the other."),
    question("na ostatnią chwilę", "tuż przed terminem", "dużo wcześniej", "całkiem przypadkiem", "Zrobił to na ostatnią chwilę.", "В останній момент.", "В последний момент.", "At the last minute."),
    question("wodzić kogoś za nos", "oszukiwać kogoś", "pomagać komuś", "doceniać kogoś", "Nie wódź mnie za nos.", "Водити за ніс.", "Водить за нос.", "To lead someone on."),
    question("mieć dobrą rękę do czegoś", "mieć talent do czegoś", "szybko się męczyć", "robić coś przypadkiem", "Ona ma dobrą rękę do roślin.", "Мати хист до чогось.", "Иметь талант к чему-то.", "To have a knack for something."),
    question("trzymać kciuki", "życzyć powodzenia", "kogoś obwiniać", "o coś się kłócić", "Trzymam za ciebie kciuki.", "Тримати кулаки, бажати удачі.", "Держать кулачки, желать удачи.", "To keep your fingers crossed."),
    question("dać sobie spokój", "zrezygnować z czegoś", "zacząć od nowa", "pracować ciężej", "Daj sobie z tym spokój.", "Облишити це.", "Оставить это.", "To give it a rest."),
    question("mieć czegoś po dziurki w nosie", "mieć tego dość", "bardzo to lubić", "nic o tym nie wiedzieć", "Mam tego po dziurki w nosie.", "Мати щось по горло.", "Быть сытым этим по горло.", "To be fed up with it."),
    question("wziąć się w garść", "opanować się i zacząć działać", "przestać się starać", "schować coś do torby", "Weź się w garść i spróbuj jeszcze raz.", "Опанувати себе й узятися до справи.", "Взять себя в руки.", "To pull yourself together."),
  ],
};

export const DAILY_COURSES: Record<DailyCourse, { flag: string; nativeName: string }> = {
  sk: { flag: "🇸🇰", nativeName: "Slovenčina" },
  cs: { flag: "🇨🇿", nativeName: "Čeština" },
  pl: { flag: "🇵🇱", nativeName: "Polski" },
};

/** Stable UTC days: the same three cards for all visitors on a given date. */
export function utcDayIndex(isoDay: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDay)) throw new Error("Invalid day");
  const date = new Date(`${isoDay}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== isoDay) {
    throw new Error("Invalid day");
  }
  return Math.floor(date.getTime() / 86400000);
}

export function dailyQuestionIndexes(course: DailyCourse, isoDay: string): number[] {
  const n = DAILY_BANK[course].length;
  const day = utcDayIndex(isoDay);
  const seed = ((day % n) + n) % n;
  const spacing = Math.floor(n / 3);
  return [seed, (seed + spacing) % n, (seed + spacing * 2) % n];
}

export function dailyChoiceIndexes(day: string, quizPosition: number): number[] {
  const offset = (utcDayIndex(day) + quizPosition) % 3;
  return [0, 1, 2].map((n) => (n + offset + 3) % 3);
}
