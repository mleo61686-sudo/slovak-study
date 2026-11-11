import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DailyClient from "../DailyClient";
import "../daily.css";

const LANGUAGES = {
  slovak: {
    lang: "sk", title: "Denné cvičenia slovenčiny – jazyková hra", name: "slovenčinu",
    description: "Precvičuj slovenčinu každý deň v jazykovej hre Flunio: denná misia, skladanie viet, slovné hádanky a opakovanie chýb. Tri úrovne A0–C1.",
    section: "Slovenčina, ktorá zostáva v hlave.", about: "Nestačí si nové slová iba prečítať. Vyskúšaj ich v hre: poskladaj vetu, nájdi správny význam, spoj dvojice a zapamätaj si výrazy, ktoré využiješ v rozhovore.",
    items: [
      { no: "01", icon: "✦", title: "Denná misia", text: "Každý deň jedna výzva s dvanástimi kolami. Sleduj svoje výsledky a buduj sériu dní." },
      { no: "02", icon: "◈", title: "Voľný tréning", text: "Pokračuj po dennej misii ďalšími kolami. Precvič si jazyk vlastným tempom." },
      { no: "03", icon: "◎", title: "Opakovanie chýb", text: "Vraciaš sa k slovám, ktoré ti robili problémy, namiesto opakovania všetkého odznova." },
    ],
    heading: "Čo si v aréne precvičíš?", details: "Významy slovenských fráz, slovosled, dopĺňanie slov, pravdu alebo lož, spájanie dvojíc a písanie odpovedí. Úrovne A0–A1, A2–B1 a B2–C1. Hra rešpektuje jazyk zvolený v tvojom profile.",
    next: "Prejsť na kurzy slovenčiny", courseLink: "/learn-slovak",
  },
  czech: {
    lang: "cs", title: "Denní cvičení češtiny – jazyková hra", name: "češtinu",
    description: "Procvičuj češtinu každý den ve hře Flunio: denní mise, skládání vět, slovní hádanky a opakování chyb. Tři úrovně A0–C1.",
    section: "Čeština, kterou si zapamatuješ.", about: "Nestačí se jen dívat na nová slova. Zahraj si s nimi: slož větu, odhal význam, spoj dvojice a vyzkoušej fráze, které se hodí v běžném rozhovoru.",
    items: [
      { no: "01", icon: "✦", title: "Denní mise", text: "Každý den jedna výzva o dvanácti kolech. Sleduj výsledky a buduj sérii dnů." },
      { no: "02", icon: "◈", title: "Volný trénink", text: "Po denní misi pokračuj dalšími koly. Procvičuj si češtinu svým tempem." },
      { no: "03", icon: "◎", title: "Opakování chyb", text: "Vracej se k výrazům, které ti ještě nejdou, místo neustálého začínání od nuly." },
    ],
    heading: "Co si v aréně procvičíš?", details: "Významy českých frází, slovosled, doplňování slov, pravdu nebo lež, spojování dvojic a psaní odpovědí. Úrovně A0–A1, A2–B1 a B2–C1. Hra používá jazyk zvolený v tvém profilu.",
    next: "Přejít na kurzy češtiny", courseLink: "/learn-czech",
  },
  polish: {
    lang: "pl", title: "Codzienne ćwiczenia z polskiego – gra językowa", name: "polski",
    description: "Ćwicz polski codziennie w grze Flunio: wyzwanie dnia, układanie zdań, zagadki słowne i powtórki błędów. Trzy poziomy A0–C1.",
    section: "Polski, który zostaje w pamięci.", about: "Samo czytanie nowych słów nie wystarczy. Wykorzystaj je w grze: ułóż zdanie, odkryj znaczenie, połącz pary i przećwicz zwroty przydatne w rozmowie.",
    items: [
      { no: "01", icon: "✦", title: "Wyzwanie dnia", text: "Codziennie jedna misja z dwunastoma rundami. Sprawdzaj wyniki i buduj serię dni." },
      { no: "02", icon: "◈", title: "Trening swobodny", text: "Po wyzwaniu dnia kontynuuj kolejne rundy. Ćwicz we własnym tempie." },
      { no: "03", icon: "◎", title: "Powtórka błędów", text: "Wracaj do zwrotów, które sprawiały ci trudności, zamiast zaczynać wszystko od początku." },
    ],
    heading: "Co ćwiczysz w arenie?", details: "Znaczenie polskich zwrotów, szyk zdań, uzupełnianie słów, prawdę lub fałsz, łączenie par i wpisywanie odpowiedzi. Poziomy A0–A1, A2–B1 i B2–C1. Gra używa języka wybranego w profilu.",
    next: "Przejdź do kursów polskiego", courseLink: "/learn-polish",
  },
} as const;

type Slug = keyof typeof LANGUAGES;
export const dynamicParams = false;
export function generateStaticParams() { return (Object.keys(LANGUAGES) as Slug[]).map(course => ({ course })); }
export async function generateMetadata({ params }: { params: Promise<{ course: string }> }): Promise<Metadata> {
  const { course } = await params;
  const info = LANGUAGES[course as Slug];
  if (!info) return {};
  return {
    title: `${info.title} | Flunio`, description: info.description,
    alternates: { canonical: `https://flunio.com/daily/${course}` },
    openGraph: { title: info.title, description: info.description, url: `https://flunio.com/daily/${course}`, siteName: "Flunio", type: "website", locale: info.lang },
    robots: { index: true, follow: true },
  };
}
export default async function CourseDailyPage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  const info = LANGUAGES[course as Slug];
  if (!info) notFound();
  return <>
    <DailyClient />
    <section className="daily-arcade daily-seo" lang={info.lang} aria-label={info.section}>
      <div className="daily-seo-heading"><span className="daily-seo-tag">FLUNIO / PRACTICE</span><h2>{info.section}</h2><p>{info.about}</p></div>
      <div className="daily-seo-grid">
        {info.items.map(item => <article key={item.no} className="daily-seo-card"><div className="daily-seo-card-head"><span>{item.no} / 03</span><strong aria-hidden="true">{item.icon}</strong></div><h3>{item.title}</h3><p>{item.text}</p></article>)}
      </div>
      <div className="daily-seo-bottom"><div><h3>{info.heading}</h3><p>{info.details}</p></div><Link href={info.courseLink}>{info.next} <span aria-hidden="true">↗</span></Link></div>
    </section>
  </>;
}
