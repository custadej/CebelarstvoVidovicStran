import { HoneyThread } from "@/components/HoneyThread";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Honeys } from "@/components/sections/Honeys";
import { Products } from "@/components/sections/Products";
import { Queens } from "@/components/sections/Queens";
import { Reviews } from "@/components/sections/Reviews";
import { Story } from "@/components/sections/Story";
import { Trust } from "@/components/sections/Trust";
import { Where } from "@/components/sections/Where";
import { JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { faqSchema } from "@/lib/schema";

export const metadata = {
  ...pageMeta({
    title: "Čebelarstvo Vidovič | Med in matice iz Haloz",
    description:
      "Čebelarstvo Vidovič, Apače pri Kidričevem: oplojene in označene matice kranjske čebele, tudi po pošti, ter nagrajeni med iz Haloz. Državni prvak 2019. Pokličite Jožeta: 041 579 827.",
    path: "/",
  }),
  title: { absolute: "Čebelarstvo Vidovič | Med in matice iz Haloz" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <div className="relative" data-thread-root="">
        <HoneyThread />
        <Queens />
        <Honeys />
        <Products />
        <Story />
        <Awards />
        <Reviews />
        <Where />
        <Faq />
        <Contact />
      </div>
      <JsonLd data={faqSchema()} />
    </>
  );
}
