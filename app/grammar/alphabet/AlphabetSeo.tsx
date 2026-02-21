"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/src/useLanguage";

export default function AlphabetSeo() {
  const { lang } = useLanguage();
  const isRu = lang === "ru";

  return (
    <section className="space-y-10 text-slate-800">
      {!isRu ? (
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
              <li>
                <Link href="/learning/a0" className="underline">
                  Рівень A0 — базові слова
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
      )}
    </section>
  );
}