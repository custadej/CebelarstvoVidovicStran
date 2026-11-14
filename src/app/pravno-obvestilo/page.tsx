import { Legal } from "@/components/Legal";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Pravno obvestilo",
  description: "Podatki o ponudniku spletne strani Čebelarstvo Vidovič in pogoji uporabe vsebin.",
  path: "/pravno-obvestilo/",
});

export default function Page() {
  return (
    <Legal title="Pravno obvestilo" updated="14. 11. 2026">
      <h2>Ponudnik</h2>
      <p>
        {site.name}
        <br />
        {site.owner}
        <br />
        {site.address.street}, {site.address.postalCode} {site.address.city}
        <br />
        Telefon:{" "}
        <a className="link" href={site.phone.href}>
          {site.phone.display}
        </a>
        <br />
        E-pošta:{" "}
        <a className="link" href={`mailto:${site.email}`}>
          {site.email}
        </a>
      </p>

      <h2>Namen strani</h2>
      <p>
        Stran predstavlja čebelarstvo in njegove pridelke. Ni spletna trgovina: prek nje ni mogoče oddati zavezujočega naročila ali plačati. O ceni, razpoložljivosti,
        prevzemu in dostavi se dogovorimo po telefonu ali e-pošti.
      </p>

      <h2>Vsebina</h2>
      <p>
        Opisi pridelkov so informativni. Čebelji pridelki so živila in niso zdravila; opisi ne nadomeščajo nasveta zdravnika ali farmacevta. Za točnost podatkov se
        trudimo, a se lahko ponudba med sezono spremeni.
      </p>

      <h2>Priznanja in mnenja</h2>
      <p>
        Navedena priznanja so dokumentirana z listinami organizatorjev ocenjevanj. Mnenja kupcev so povzeta po javnih ocenah na Googlu in po sporočilih, ki smo jih
        prejeli; navedena so z imenom in začetnico priimka.
      </p>

      <h2>Avtorske pravice</h2>
      <p>Besedila, fotografije in logotip so last Čebelarstva Vidovič. Brez pisnega dovoljenja jih ni dovoljeno uporabljati v komercialne namene.</p>
    </Legal>
  );
}
