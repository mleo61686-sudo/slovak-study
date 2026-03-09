"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";
import { useActiveCourse } from "@/app/learning/courses/useActiveCourse";

export default function AlphabetSeo() {
  const { lang } = useLanguage();
  const { courseId } = useActiveCourse();

  const isRu = lang === "ru";
  const isCzech = courseId === "cs";

  return (
    <section className="space-y-10 text-slate-800">
      {!isRu ? (
        <>
          {!isCzech ? (
            <>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">
                  Словацький алфавіт для українців: повний гід з вимови
                </h2>

                <p>
                  Словацький алфавіт — це основа вивчення словацької мови. Якщо ти
                  хочеш правильно читати, говорити та розуміти словацьку, потрібно
                  знати літери, правила вимови та наголос.
                </p>

                <p>
                  На цій сторінці ти знайдеш пояснення букв словацького алфавіту,
                  особливості діакритики, правила читання, приклади та практичний
                  тренажер.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Скільки букв у словацькому алфавіті
                </h3>

                <p>
                  Словацька мова використовує латиницю з діакритичними знаками. Окрім
                  стандартних букв (a, b, c, d...), існують спеціальні літери: á, ä,
                  č, ď, é, í, ľ, ň, ó, ô, š, ť, ú, ý, ž.
                </p>

                <p>
                  Довгі голосні позначаються рискою над літерою (á, é, í, ó, ú, ý).
                  Вони вимовляються довше, ніж короткі голосні.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Діакритика в словацькій мові</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>č</b> — як українське «ч»</li>
                  <li><b>š</b> — як «ш»</li>
                  <li><b>ž</b> — як «ж»</li>
                  <li><b>ď, ť, ň</b> — м’які приголосні</li>
                  <li><b>ľ</b> — м’яке «ль»</li>
                  <li><b>ô</b> — вимовляється як «уо»</li>
                </ul>

                <p>
                  Ці літери часто викликають труднощі у початківців, але після
                  кількох вправ вимова стає природною.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Сполучення CH, DZ, DŽ</h3>

                <p>У словацькій мові існують особливі сполучення букв:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>ch</b> — вимовляється як «х» (chlieb)</li>
                  <li><b>dz</b> — як «дз» (medzi)</li>
                  <li><b>dž</b> — як «дж» (džús)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Наголос у словацькій мові</h3>

                <p>
                  У словацькій мові наголос майже завжди падає на перший склад.
                  Наприклад: PRÁ-ca, ŠKO-la, DO-mo-v.
                </p>

                <p>
                  Це правило значно спрощує навчання, адже не потрібно запам’ятовувати
                  наголос для кожного слова окремо.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Типові помилки українців</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Плутання i та y у письмі</li>
                  <li>Ігнорування довготи голосних</li>
                  <li>Неправильна вимова ch</li>
                  <li>Змішування č і c</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Що вивчати після алфавіту</h3>

                <p>Після засвоєння алфавіту переходь до:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/grammar/verbs-present" className="underline">
                      Дієслова теперішнього часу
                    </Link>
                  </li>
                  <li>
                    <Link href="/grammar/cases" className="underline">
                      Відмінки в словацькій мові
                    </Link>
                  </li>
                </ul>

                <p>
                  Нижче на сторінці ти можеш пройти вправи, послухати вимову та
                  закріпити знання на практиці.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">
                  Чеський алфавіт для українців: повний гід з вимови
                </h2>

                <p>
                  Чеський алфавіт — це основа вивчення чеської мови. Якщо ти хочеш
                  правильно читати, говорити та розуміти чеську, потрібно знати
                  літери, правила вимови та наголос.
                </p>

                <p>
                  На цій сторінці ти знайдеш пояснення букв чеського алфавіту,
                  особливості діакритики, правила читання, приклади та практичний
                  тренажер.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Скільки букв у чеському алфавіті
                </h3>

                <p>
                  Чеська мова використовує латиницю з діакритичними знаками. Окрім
                  стандартних букв, є спеціальні літери: á, č, ď, é, ě, í, ň, ó,
                  ř, š, ť, ú, ů, ý, ž.
                </p>

                <p>
                  Довгі голосні позначаються рискою над літерою або кружечком у
                  букві <b>ů</b>. Вони вимовляються довше, ніж короткі голосні.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Діакритика в чеській мові</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>č</b> — як українське «ч»</li>
                  <li><b>š</b> — як «ш»</li>
                  <li><b>ž</b> — як «ж»</li>
                  <li><b>ď, ť, ň</b> — м’які приголосні</li>
                  <li><b>ř</b> — особливий чеський звук між «р» і «ж»</li>
                  <li><b>ě</b> — пом’якшує попередній приголосний</li>
                </ul>

                <p>
                  Саме літери <b>ř</b>, <b>ě</b> і <b>ů</b> найчастіше викликають
                  труднощі у початківців.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Сполучення CH</h3>

                <p>У чеській мові є особливе сполучення букв:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>ch</b> — вимовляється як «х» (chléb)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Наголос у чеській мові</h3>

                <p>
                  У чеській мові наголос майже завжди падає на перший склад.
                  Наприклад: PRA-ha, ČES-ko, DO-mov.
                </p>

                <p>
                  Це правило теж сильно спрощує навчання, бо наголос у більшості
                  слів передбачуваний.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Типові помилки українців</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Плутання í / y / ý</li>
                  <li>Ігнорування різниці між ú та ů</li>
                  <li>Складна вимова ř</li>
                  <li>Неправильне читання ě</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Що вивчати після алфавіту</h3>

                <p>Після засвоєння алфавіту переходь до:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/grammar/verbs-present" className="underline">
                      Дієслова теперішнього часу
                    </Link>
                  </li>
                  <li>
                    <Link href="/grammar/cases" className="underline">
                      Відмінки в чеській мові
                    </Link>
                  </li>
                </ul>

                <p>
                  Нижче на сторінці ти можеш пройти вправи, послухати вимову та
                  закріпити знання на практиці.
                </p>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          {!isCzech ? (
            <>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">
                  Словацкий алфавит: полный гид по произношению
                </h2>

                <p>
                  Словацкий алфавит — основа изучения словацкого языка. Если ты
                  хочешь правильно читать, говорить и понимать словацкий, нужно знать
                  буквы, правила произношения и ударение.
                </p>

                <p>
                  На этой странице ты найдёшь объяснение букв словацкого алфавита,
                  особенности диакритики, правила чтения, примеры и практический
                  тренажёр.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Сколько букв в словацком алфавите
                </h3>

                <p>
                  Словацкий язык использует латиницу с диакритическими знаками. Кроме
                  стандартных букв (a, b, c, d...), есть специальные буквы: á, ä, č,
                  ď, é, í, ľ, ň, ó, ô, š, ť, ú, ý, ž.
                </p>

                <p>
                  Долгие гласные обозначаются чертой над буквой (á, é, í, ó, ú, ý).
                  Они произносятся дольше, чем краткие гласные.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Диакритика в словацком языке</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>č</b> — как «ч»</li>
                  <li><b>š</b> — как «ш»</li>
                  <li><b>ž</b> — как «ж»</li>
                  <li><b>ď, ť, ň</b> — мягкие согласные</li>
                  <li><b>ľ</b> — мягкое «ль»</li>
                  <li><b>ô</b> — произносится как «уо»</li>
                </ul>

                <p>
                  Эти буквы часто вызывают трудности у начинающих, но после нескольких
                  упражнений произношение становится естественным.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Сочетания CH, DZ, DŽ</h3>

                <p>В словацком языке есть особые сочетания букв:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>ch</b> — произносится как «х» (chlieb)</li>
                  <li><b>dz</b> — как «дз» (medzi)</li>
                  <li><b>dž</b> — как «дж» (džús)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Ударение в словацком языке</h3>

                <p>
                  В словацком языке ударение почти всегда падает на первый слог.
                  Например: PRÁ-ca, ŠKO-la, DO-mo-v.
                </p>

                <p>
                  Это правило сильно упрощает обучение: не нужно запоминать ударение
                  для каждого слова отдельно.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Типичные ошибки</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Путаница i и y на письме</li>
                  <li>Игнорирование долготы гласных</li>
                  <li>Неправильное произношение ch</li>
                  <li>Смешивание č и c</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Что учить после алфавита</h3>

                <p>После того как освоишь алфавит, переходи к:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/grammar/verbs-present" className="underline">
                      Глаголы настоящего времени
                    </Link>
                  </li>
                  <li>
                    <Link href="/grammar/cases" className="underline">
                      Падежи в словацком языке
                    </Link>
                  </li>
                  <li>
                    <Link href="/learning/a0" className="underline">
                      Уровень A0 — базовые слова
                    </Link>
                  </li>
                </ul>

                <p>
                  Ниже на странице ты можешь пройти упражнения, послушать произношение
                  и закрепить знания на практике.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">
                  Чешский алфавит: полный гид по произношению
                </h2>

                <p>
                  Чешский алфавит — основа изучения чешского языка. Если ты хочешь
                  правильно читать, говорить и понимать чешский, нужно знать буквы,
                  правила произношения и ударение.
                </p>

                <p>
                  На этой странице ты найдёшь объяснение букв чешского алфавита,
                  особенности диакритики, правила чтения, примеры и практический
                  тренажёр.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">
                  Сколько букв в чешском алфавите
                </h3>

                <p>
                  Чешский язык использует латиницу с диакритическими знаками. Кроме
                  стандартных букв, есть специальные: á, č, ď, é, ě, í, ň, ó, ř,
                  š, ť, ú, ů, ý, ž.
                </p>

                <p>
                  Долгие гласные обозначаются чертой над буквой или кружком в букве
                  <b> ů</b>. Они произносятся дольше, чем краткие гласные.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Диакритика в чешском языке</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>č</b> — как «ч»</li>
                  <li><b>š</b> — как «ш»</li>
                  <li><b>ž</b> — как «ж»</li>
                  <li><b>ď, ť, ň</b> — мягкие согласные</li>
                  <li><b>ř</b> — особый чешский звук</li>
                  <li><b>ě</b> — смягчает предыдущую согласную</li>
                </ul>

                <p>
                  Именно буквы <b>ř</b>, <b>ě</b> и <b>ů</b> чаще всего вызывают
                  трудности у начинающих.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Сочетание CH</h3>

                <p>В чешском языке есть особое сочетание букв:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li><b>ch</b> — произносится как «х» (chléb)</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Ударение в чешском языке</h3>

                <p>
                  В чешском языке ударение почти всегда падает на первый слог.
                  Например: PRA-ha, ČES-ko, DO-mov.
                </p>

                <p>
                  Это правило тоже сильно упрощает обучение.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Типичные ошибки</h3>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Путаница í / y / ý</li>
                  <li>Игнорирование различия между ú и ů</li>
                  <li>Сложное произношение ř</li>
                  <li>Неправильное чтение ě</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Что учить после алфавита</h3>

                <p>После того как освоишь алфавит, переходи к:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <Link href="/grammar/verbs-present" className="underline">
                      Глаголы настоящего времени
                    </Link>
                  </li>
                  <li>
                    <Link href="/grammar/cases" className="underline">
                      Падежи в чешском языке
                    </Link>
                  </li>
                </ul>

                <p>
                  Ниже на странице ты можешь пройти упражнения, послушать произношение
                  и закрепить знания на практике.
                </p>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}