import { HoneyThread } from "@/components/HoneyThread";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Honeys } from "@/components/sections/Honeys";
import { Products } from "@/components/sections/Products";
import { QueenBanner } from "@/components/sections/QueenBanner";
import { Story } from "@/components/sections/Story";
import { pageMeta } from "@/lib/meta";

export const metadata = {
  ...pageMeta({
    title: "Čebelarstvo Vidovič | Domač med iz Haloz in matice čebel",
    description:
      "Čebelarstvo Vidovič, Apače pri Kidričevem: domač med iz Haloz (cvetlični, akacijev, lipov, kostanjev, gozdni), državni prvak 2019, ter oplojene matice kranjske čebele, tudi po pošti. Pokličite Jožeta: 041 579 827.",
    path: "/",
  }),
  title: { absolute: "Čebelarstvo Vidovič | Domač med iz Haloz in matice čebel" },
};

// Customer first: what we sell (med), the one door for beekeepers (matice), what else, why trust us, who we are, how to reach us.
export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative" data-thread-root="">
        <HoneyThread />
        <Honeys />
        <QueenBanner />
        <Products />
        <Awards />
        <Story />
        <Contact />
      </div>
    </>
  );
}
