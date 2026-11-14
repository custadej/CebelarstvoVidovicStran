import { CallBand, PageHero } from "@/components/PageHero";
import { AwardLeads, AwardYears } from "@/components/sections/Awards";
import { CallButton, JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Priznanja in nagrade za med",
  description:
    "Državni prvak za cvetlični med 2019, znak kakovosti Dobrote slovenskih kmetij in več kot 15 zlatih medalj na sejmu AGRA in Dobrotah slovenskih kmetij od leta 2017 do 2026.",
  path: "/priznanja/",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Priznanja in nagrade"
        title={
          <>
            Več kot 15 zlatih <em>za naš med.</em>
          </>
        }
        lead="Vsa priznanja na tej strani so dokumentirana z listinami. Tu so zbrana po letih."
        image="trofeja-drzavni-prvak"
        imageAlt="Steklena plaketa: državni prvak za cvetlični med 2019"
        position="50% 40%"
        crumbs={[{ href: "/", label: "Domov" }, { label: "Priznanja" }]}
      />
      <section className="section on-dark bg-smola">
        <div className="wrap">
          {/* lg and up: the three big ones as a card row, as before. Below lg they sit in the list at their year. */}
          <div className="hidden lg:block">
            <AwardLeads />
          </div>
          <h2 className="display h-section lg:mt-20" data-split="">
            Po <em>letih.</em>
          </h2>
          <div className="mt-8 lg:mt-10">
            <AwardYears withImages inlineLeads />
          </div>
          <p className="muted mt-6 max-w-[60ch] text-[0.95rem]">
            AGRA: ocenjevanje medu z mednarodno udeležbo na mednarodnem kmetijsko-živilskem sejmu v Gornji Radgoni. Dobrote slovenskih kmetij: državno ocenjevanje na Ptuju.
          </p>
        </div>
      </section>
      <CallBand
        title={
          <>
            Poskusite <em>nagrajeni med.</em>
          </>
        }
      >
        <CallButton magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema([{ name: "Priznanja", path: "/priznanja/" }])} />
    </>
  );
}
