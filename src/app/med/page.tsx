import { CallBand, PageHero } from "@/components/PageHero";
import { Photo } from "@/components/Photo";
import { HoneyGrid, Packaging } from "@/components/sections/Honeys";
import { CallButton, JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Domač med: cvetlični, akacijev, lipov, kostanjev, gozdni, hojev",
  description:
    "Domač slovenski med neposredno od čebelarja: cvetlični (državni prvak 2019), akacijev, lipov, kostanjev, gozdni in hojev. Kozarci 250 g, 450 g in 900 g. Apače pri Kidričevem, dostava Ptuj in Maribor po dogovoru.",
  path: "/med/",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Med"
        title={
          <>
            Med iz naših <em>čebelnjakov.</em>
          </>
        }
        lead="Šest vrst medu iz čebelnjakov doma na Dravskem polju, v Halozah in v Prekmurju. Točim in polnim ga sam."
        image="medovi-pet"
        imageAlt="Pet kozarcev medu Čebelarstva Vidovič v vrsti"
        crumbs={[{ href: "/", label: "Domov" }, { label: "Med" }]}
      >
        <CallButton label="Pokličite za med" magnetic />
      </PageHero>

      <section className="section">
        <div className="wrap">
          <h2 className="display h-section max-w-[14ch]" data-split="">
            Izberite <em>svojega.</em>
          </h2>
          <div className="mt-10">
            <HoneyGrid />
          </div>
          <div className="mt-6">
            <Packaging />
          </div>
        </div>
      </section>

      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo slug="tocenje-medu" alt="Točenje gozdnega medu v kozarec na tehtnici" sizes="(min-width: 1024px) 480px, 92vw" className="frame mx-auto aspect-[3/4] w-full max-w-[480px]" parallax />
          <div>
            <p className="eyebrow">Dobro je vedeti</p>
            <h2 className="display h-section mt-4" data-split="">
              Zakaj med <em>kristalizira.</em>
            </h2>
            <div className="prose mt-6" data-reveal="">
              <p>
                Kristalizacija je naraven pojav, ki se v medu zgodi prej ali slej, in ne povzroča nobenih kemičnih sprememb. Zaradi strjevanja je med nekoč dobil ime strd.
              </p>
              <p>
                Kako hitro med kristalizira, je odvisno od razmerja sladkorjev v njem, količine vode in temperature hranjenja. Cvetlični kristalizira hitro, akacijev ostane dolgo tekoč.
              </p>
              <p>
                Kozarec s kristaliziranim medom postavite v toplo vodo in kristali se bodo utekočinili. Medu ne segrevajte nad 40 °C.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CallBand
        title={
          <>
            Kateri med <em>imate radi?</em>
          </>
        }
      >
        <CallButton magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema([{ name: "Med", path: "/med/" }])} />
    </>
  );
}
