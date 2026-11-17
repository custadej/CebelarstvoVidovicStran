import { HoneyThread } from "@/components/HoneyThread";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Honeys } from "@/components/sections/Honeys";
import { Products } from "@/components/sections/Products";
import { Story } from "@/components/sections/Story";
import { pageMeta } from "@/lib/meta";

export const metadata = {
  ...pageMeta({
    title: "Čebelarstvo Vidovič | Domač med in matice čebel z Dravskega polja",
    description:
      "Čebelarstvo Vidovič, Apače pri Kidričevem na Dravskem polju: domač med iz naših čebelnjakov na Dravskem polju, v Halozah in v Prekmurju (cvetlični, akacijev, lipov, kostanjev, gozdni) ter oplojene matice kranjske čebele, tudi po pošti. Pokličite Jožeta: 041 579 827.",
    path: "/",
  }),
  title: { absolute: "Čebelarstvo Vidovič | Domač med in matice čebel z Dravskega polja" },
};

// Customer first: what we sell (med), what else, why trust us, who we are, how to reach us. Queens live on /matice (nav, hero line, footer).
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative" data-thread-root="">
        <HoneyThread />
        <Honeys />
        <Products />
        <Awards />
        <Story />
        <Contact />
      </div>
    </>
  );
}
