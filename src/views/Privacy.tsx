import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Legal } from "@/components/Legal";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

const T = {
  sl: { title: "Zasebnost", description: "Kako Čebelarstvo Vidovič ravna z osebnimi podatki obiskovalcev spletne strani.", heading: "Obvestilo o zasebnosti" },
  en: { title: "Privacy", description: "How Čebelarstvo Vidovič handles the personal data of website visitors.", heading: "Privacy notice" },
  de: { title: "Datenschutz", description: "Wie Čebelarstvo Vidovič mit den personenbezogenen Daten der Website-Besucher umgeht.", heading: "Datenschutzerklärung" },
} satisfies Record<Lang, Record<string, string>>;

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].title, description: T[lang].description, path: "/zasebnost/", lang });
}

function Mail() {
  return (
    <a className="link" href={`mailto:${site.email}`}>
      {site.email}
    </a>
  );
}

function Phone({ lang }: { lang: Lang }) {
  return (
    <a className="link" href={site.phone.href}>
      {ui[lang].phone}
    </a>
  );
}

function Ip() {
  return (
    <a className="link" href="https://www.ip-rs.si/" target="_blank" rel="noopener noreferrer">
      www.ip-rs.si
    </a>
  );
}

const who = `${site.name}, ${site.owner}, ${site.address.street}, ${site.address.postalCode} ${site.address.city}`;

const body: Record<Lang, ReactNode> = {
  sl: (
    <>
      <h2>Kdo je upravljavec podatkov</h2>
      <p>
        {who}. Pišete nam lahko na <Mail /> ali pokličete na <Phone lang="sl" />.
      </p>
      <h2>Katere podatke zbiramo</h2>
      <p>
        Spletna stran ne uporablja analitike ali oglaševalskih orodij. Edini piškotek je <code>lang</code>: nastavi se samo, ko v nogi strani izberete jezik, in si to
        izbiro zapomni eno leto. Ob prvem obisku stran glede na državo, iz katere se povezujete, odpre slovensko, angleško ali nemško različico; ta podatek se ne
        shrani. Druge podatke dobimo samo, če nam jih pošljete sami:
      </p>
      <ul>
        <li>prek obrazca za povpraševanje: ime in priimek, telefonsko številko in vsebino sporočila,</li>
        <li>po e-pošti ali telefonu: podatke, ki jih navedete v sporočilu ali pogovoru.</li>
      </ul>
      <h2>Zakaj jih uporabljamo</h2>
      <p>
        Samo zato, da odgovorimo na vaše povpraševanje in se dogovorimo za naročilo, prevzem ali dostavo. Pravna podlaga je izvedba ukrepov na vašo zahtevo pred
        sklenitvijo dogovora (člen 6(1)(b) Splošne uredbe o varstvu podatkov). Podatkov ne uporabljamo za oglaševanje in jih ne prodajamo.
      </p>
      <h2>Kdo podatke obdeluje za nas</h2>
      <ul>
        <li>Cloudflare, ki gosti spletno stran in pri tem obdeluje tehnične podatke o obisku (na primer naslov IP) zaradi varnosti in delovanja strani,</li>
        <li>Resend, prek katerega se sporočilo iz obrazca dostavi v naš e-poštni predal,</li>
        <li>ponudnik e-pošte, v katerem sporočila hranimo.</li>
      </ul>
      <h2>Kako dolgo jih hranimo</h2>
      <p>Sporočila hranimo, dokler je povpraševanje odprto, in jih nato izbrišemo najpozneje v enem letu, razen če moramo podatke hraniti dlje zaradi zakonskih obveznosti.</p>
      <h2>Vaše pravice</h2>
      <p>
        Kadar koli lahko zahtevate vpogled v svoje podatke, popravek, izbris ali omejitev obdelave. Pišite na zgornji e-poštni naslov. Če menite, da z vašimi podatki
        ne ravnamo pravilno, se lahko pritožite pri Informacijskem pooblaščencu Republike Slovenije (<Ip />
        ).
      </p>
      <h2>Povezave na druge strani</h2>
      <p>Stran vsebuje povezave na Facebook in Google Zemljevide. Ko jih odprete, veljajo pravila zasebnosti teh ponudnikov.</p>
    </>
  ),
  en: (
    <>
      <h2>Who is the data controller</h2>
      <p>
        {who}, Slovenia. You can write to us at <Mail /> or call <Phone lang="en" />.
      </p>
      <h2>What data we collect</h2>
      <p>
        The website does not use analytics or advertising tools. The only cookie is <code>lang</code>: it is set only when you choose a language in the footer and
        remembers that choice for one year. On your first visit the site opens the Slovenian, English or German version depending on the country you connect from;
        this is not stored. We only receive other data if you send it to us yourself:
      </p>
      <ul>
        <li>through the enquiry form: your name, phone number and the content of your message,</li>
        <li>by e-mail or phone: the data you give in your message or conversation.</li>
      </ul>
      <h2>Why we use it</h2>
      <p>
        Only to reply to your enquiry and to arrange an order, collection or delivery. The legal basis is taking steps at your request before entering into an
        agreement (Article 6(1)(b) of the General Data Protection Regulation). We do not use the data for advertising and we do not sell it.
      </p>
      <h2>Who processes data for us</h2>
      <ul>
        <li>Cloudflare, which hosts the website and processes technical data about visits (for example the IP address) for security and operation,</li>
        <li>Resend, through which a message from the form is delivered to our mailbox,</li>
        <li>the e-mail provider with which we keep messages.</li>
      </ul>
      <h2>How long we keep it</h2>
      <p>We keep messages while the enquiry is open and then delete them within one year at the latest, unless we have to keep the data longer because of legal obligations.</p>
      <h2>Your rights</h2>
      <p>
        You can at any time request access to your data, its correction, deletion or restriction of processing. Write to the e-mail address above. If you think we
        are not handling your data correctly, you can complain to the Information Commissioner of the Republic of Slovenia (<Ip />
        ).
      </p>
      <h2>Links to other sites</h2>
      <p>The site contains links to Facebook and Google Maps. When you open them, the privacy rules of those providers apply.</p>
    </>
  ),
  de: (
    <>
      <h2>Verantwortlicher</h2>
      <p>
        {who}, Slowenien. Sie können uns unter <Mail /> schreiben oder <Phone lang="de" /> anrufen.
      </p>
      <h2>Welche Daten wir erheben</h2>
      <p>
        Die Website verwendet keine Analyse- und keine Werbewerkzeuge. Das einzige Cookie ist <code>lang</code>: Es wird nur gesetzt, wenn Sie in der Fußzeile eine
        Sprache wählen, und merkt sich diese Wahl ein Jahr lang. Beim ersten Besuch öffnet die Website je nach dem Land, aus dem Sie sich verbinden, die
        slowenische, englische oder deutsche Fassung; das wird nicht gespeichert. Andere Daten erhalten wir nur, wenn Sie sie uns selbst schicken:
      </p>
      <ul>
        <li>über das Anfrageformular: Ihren Namen, Ihre Telefonnummer und den Inhalt Ihrer Nachricht,</li>
        <li>per E-Mail oder Telefon: die Daten, die Sie in Ihrer Nachricht oder im Gespräch angeben.</li>
      </ul>
      <h2>Wozu wir sie verwenden</h2>
      <p>
        Nur, um Ihre Anfrage zu beantworten und eine Bestellung, Abholung oder Lieferung zu vereinbaren. Rechtsgrundlage ist die Durchführung vorvertraglicher
        Maßnahmen auf Ihre Anfrage (Art. 6 Abs. 1 lit. b der Datenschutz-Grundverordnung). Wir verwenden die Daten nicht für Werbung und verkaufen sie nicht.
      </p>
      <h2>Wer Daten für uns verarbeitet</h2>
      <ul>
        <li>Cloudflare, das die Website hostet und dabei technische Daten über den Besuch (zum Beispiel die IP-Adresse) für Sicherheit und Betrieb verarbeitet,</li>
        <li>Resend, über das eine Nachricht aus dem Formular in unser Postfach zugestellt wird,</li>
        <li>der E-Mail-Anbieter, bei dem wir Nachrichten aufbewahren.</li>
      </ul>
      <h2>Wie lange wir sie speichern</h2>
      <p>
        Wir bewahren Nachrichten auf, solange die Anfrage offen ist, und löschen sie spätestens nach einem Jahr, außer wir müssen die Daten aufgrund gesetzlicher
        Pflichten länger aufbewahren.
      </p>
      <h2>Ihre Rechte</h2>
      <p>
        Sie können jederzeit Auskunft über Ihre Daten, deren Berichtigung, Löschung oder die Einschränkung der Verarbeitung verlangen. Schreiben Sie an die obige
        E-Mail-Adresse. Wenn Sie meinen, dass wir mit Ihren Daten nicht richtig umgehen, können Sie sich beim Informationsbeauftragten der Republik Slowenien
        beschweren (<Ip />
        ).
      </p>
      <h2>Links zu anderen Seiten</h2>
      <p>Die Website enthält Links zu Facebook und Google Maps. Wenn Sie diese öffnen, gelten die Datenschutzregeln dieser Anbieter.</p>
    </>
  ),
};

export function PrivacyPage({ lang }: { lang: Lang }) {
  return (
    <Legal lang={lang} title={T[lang].heading}>
      {body[lang]}
    </Legal>
  );
}
