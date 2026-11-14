import { Legal } from "@/components/Legal";
import { pageMeta } from "@/lib/meta";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Zasebnost",
  description: "Kako Čebelarstvo Vidovič ravna z osebnimi podatki obiskovalcev spletne strani.",
  path: "/zasebnost/",
});

export default function Page() {
  return (
    <Legal title="Obvestilo o zasebnosti" updated="14. 11. 2026">
      <h2>Kdo je upravljavec podatkov</h2>
      <p>
        {site.name}, {site.owner}, {site.address.street}, {site.address.postalCode} {site.address.city}. Pišete nam lahko na{" "}
        <a className="link" href={`mailto:${site.email}`}>
          {site.email}
        </a>{" "}
        ali pokličete na{" "}
        <a className="link" href={site.phone.href}>
          {site.phone.display}
        </a>
        .
      </p>

      <h2>Katere podatke zbiramo</h2>
      <p>Spletna stran ne uporablja piškotkov, analitike ali oglaševalskih orodij. Podatke dobimo samo, če nam jih pošljete sami:</p>
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
        ne ravnamo pravilno, se lahko pritožite pri Informacijskem pooblaščencu Republike Slovenije (
        <a className="link" href="https://www.ip-rs.si/" target="_blank" rel="noopener noreferrer">
          www.ip-rs.si
        </a>
        ).
      </p>

      <h2>Povezave na druge strani</h2>
      <p>Stran vsebuje povezave na Facebook in Google Zemljevide. Ko jih odprete, veljajo pravila zasebnosti teh ponudnikov.</p>
    </Legal>
  );
}
