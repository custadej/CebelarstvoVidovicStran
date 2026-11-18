import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

const T = {
  sl: {
    title: "Pravno obvestilo",
    description: "Podatki o ponudniku spletne strani Čebelarstvo Vidovič in pogoji uporabe vsebin.",
    provider: "Ponudnik",
    country: "",
    phone: "Telefon",
    email: "E-pošta",
    sections: [
      {
        h: "Namen strani",
        p: "Stran predstavlja čebelarstvo in njegove pridelke. Ni spletna trgovina: prek nje ni mogoče oddati zavezujočega naročila ali plačati. O ceni, razpoložljivosti, prevzemu in dostavi se dogovorimo po telefonu ali e-pošti.",
      },
      {
        h: "Vsebina",
        p: "Opisi pridelkov so informativni. Čebelji pridelki so živila in niso zdravila; opisi ne nadomeščajo nasveta zdravnika ali farmacevta. Za točnost podatkov se trudimo, a se lahko ponudba med sezono spremeni.",
      },
      {
        h: "Priznanja in mnenja",
        p: "Navedena priznanja so dokumentirana z listinami organizatorjev ocenjevanj. Mnenja kupcev so povzeta po javnih ocenah na Googlu in po sporočilih, ki smo jih prejeli; navedena so z imenom in začetnico priimka.",
      },
      {
        h: "Avtorske pravice",
        p: "Besedila, fotografije in logotip so last Čebelarstva Vidovič. Brez pisnega dovoljenja jih ni dovoljeno uporabljati v komercialne namene.",
      },
    ],
  },
  en: {
    title: "Legal notice",
    description: "Details of the provider of the Čebelarstvo Vidovič website and terms of use of its content.",
    provider: "Provider",
    country: ", Slovenia",
    phone: "Phone",
    email: "E-mail",
    sections: [
      {
        h: "Purpose of the site",
        p: "The site presents the beekeeping business and its products. It is not an online shop: you cannot place a binding order or pay through it. We agree on price, availability, collection and delivery by phone or e-mail.",
      },
      {
        h: "Content",
        p: "Product descriptions are for information. Bee products are foods, not medicines; the descriptions do not replace the advice of a doctor or pharmacist. We do our best to keep the information accurate, but what we offer can change during the season.",
      },
      {
        h: "Awards and reviews",
        p: "The awards listed are documented with certificates from the organisers of the evaluations. Customer reviews are taken from public Google ratings and from messages we received; they are given with the first name and the initial of the surname. On the English and German pages they are translated from Slovenian.",
      },
      {
        h: "Copyright",
        p: "Texts, photographs and the logo belong to Čebelarstvo Vidovič. They may not be used for commercial purposes without written permission.",
      },
    ],
  },
  de: {
    title: "Impressum",
    description: "Angaben zum Anbieter der Website Čebelarstvo Vidovič und Nutzungsbedingungen der Inhalte.",
    provider: "Anbieter",
    country: ", Slowenien",
    phone: "Telefon",
    email: "E-Mail",
    sections: [
      {
        h: "Zweck der Website",
        p: "Die Website stellt die Imkerei und ihre Erzeugnisse vor. Sie ist kein Onlineshop: Über sie kann keine verbindliche Bestellung aufgegeben und nicht bezahlt werden. Preis, Verfügbarkeit, Abholung und Lieferung vereinbaren wir telefonisch oder per E-Mail.",
      },
      {
        h: "Inhalt",
        p: "Die Produktbeschreibungen dienen der Information. Bienenprodukte sind Lebensmittel und keine Arzneimittel; die Beschreibungen ersetzen nicht den Rat eines Arztes oder Apothekers. Wir bemühen uns um genaue Angaben, das Angebot kann sich während der Saison jedoch ändern.",
      },
      {
        h: "Auszeichnungen und Bewertungen",
        p: "Die genannten Auszeichnungen sind durch Urkunden der Veranstalter belegt. Kundenmeinungen stammen aus öffentlichen Google-Bewertungen und aus Nachrichten, die wir erhalten haben; sie sind mit Vornamen und Anfangsbuchstaben des Nachnamens angegeben. Auf den englischen und deutschen Seiten sind sie aus dem Slowenischen übersetzt.",
      },
      {
        h: "Urheberrecht",
        p: "Texte, Fotos und Logo gehören Čebelarstvo Vidovič. Ohne schriftliche Genehmigung dürfen sie nicht für kommerzielle Zwecke verwendet werden.",
      },
    ],
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].title, description: T[lang].description, path: "/pravno-obvestilo/", lang });
}

export function LegalNoticePage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <Legal lang={lang} title={t.title}>
      <h2>{t.provider}</h2>
      <p>
        {site.name}
        <br />
        {site.owner}
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}
        {t.country}
        <br />
        {t.phone}:{" "}
        <a className="link" href={site.phone.href}>
          {ui[lang].phone}
        </a>
        <br />
        {t.email}:{" "}
        <a className="link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>
      {t.sections.map((s) => (
        <section key={s.h}>
          <h2>{s.h}</h2>
          <p>{s.p}</p>
        </section>
      ))}
    </Legal>
  );
}
