import { CallBand, PageHero } from "@/components/PageHero";
import { ProductList } from "@/components/sections/Products";
import { CallButton, JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Čebelji pridelki: matični mleček, cvetni prah, propolis, vosek",
  description:
    "Svež matični mleček naravnost iz panja, cvetni prah, propolis v granulatu, čebelji vosek in darilni paketi z medom. Čebelarstvo Vidovič, Apače pri Kidričevem. Pokličite 041 579 827.",
  path: "/cebelji-pridelki/",
});

export default function Page() {
  return (
    <>
      <PageHero
        eyebrow="Čebelji pridelki"
        title={
          <>
            Vse, kar da <em>panj.</em>
          </>
        }
        lead="Poleg medu pri nas dobite svež matični mleček, cvetni prah, propolis, voščene izdelke in darilne pakete."
        image="maticni-mlecek"
        imageAlt="Svež matični mleček v kozarčku z žličko"
        position="50% 35%"
        crumbs={[{ href: "/", label: "Domov" }, { label: "Čebelji pridelki" }]}
      >
        <CallButton magnetic />
      </PageHero>
      <section className="section">
        <div className="wrap">
          <ProductList detailed />
        </div>
      </section>
      <CallBand
        title={
          <>
            Vprašajte, kaj je <em>trenutno na voljo.</em>
          </>
        }
      >
        <CallButton magnetic />
      </CallBand>
      <JsonLd data={breadcrumbSchema([{ name: "Čebelji pridelki", path: "/cebelji-pridelki/" }])} />
    </>
  );
}
