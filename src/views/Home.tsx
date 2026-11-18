import type { Metadata } from "next";
import { HoneyThread } from "@/components/HoneyThread";
import { Awards } from "@/components/sections/Awards";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Honeys } from "@/components/sections/Honeys";
import { Products } from "@/components/sections/Products";
import { Story } from "@/components/sections/Story";
import type { Lang } from "@/i18n";
import { pageMeta } from "@/lib/meta";

const T = {
  sl: {
    title: "Čebelarstvo Vidovič | Domač med in matice čebel z Dravskega polja",
    description:
      "Čebelarstvo Vidovič, Apače pri Kidričevem na Dravskem polju: domač med iz naših čebelnjakov na Dravskem polju, v Halozah in v Prekmurju (cvetlični, akacijev, lipov, kostanjev, gozdni) ter oplojene matice kranjske čebele, tudi po pošti. Pokličite Jožeta: 041 579 827.",
  },
  en: {
    title: "Čebelarstvo Vidovič | Honey and queen bees from Dravsko polje, Slovenia",
    description:
      "Čebelarstvo Vidovič, a family beekeeping business in Apače near Kidričevo, Slovenia: honey from our apiaries on Dravsko polje, in Haloze and in Prekmurje (wildflower, acacia, linden, chestnut, forest) and mated Carniolan queen bees. Call Jože: +386 41 579 827.",
  },
  de: {
    title: "Čebelarstvo Vidovič | Honig und Bienenköniginnen aus dem Dravsko polje, Slowenien",
    description:
      "Čebelarstvo Vidovič, eine Familienimkerei in Apače bei Kidričevo, Slowenien: Honig von unseren Bienenständen im Dravsko polje, in den Haloze und im Prekmurje (Blüten, Akazie, Linde, Kastanie, Wald) sowie begattete Königinnen der Krainer Biene. Rufen Sie Jože an: +386 41 579 827.",
  },
} satisfies Record<Lang, { title: string; description: string }>;

export function meta(lang: Lang): Metadata {
  return { ...pageMeta({ ...T[lang], path: "/", lang }), title: { absolute: T[lang].title } };
}

// Customer first: what we sell (med), what else, why trust us, who we are, how to reach us. Queens live on /matice (nav, footer).
export function Home({ lang }: { lang: Lang }) {
  return (
    <>
      <Hero lang={lang} />
      <div className="relative" data-thread-root="">
        <HoneyThread />
        <Honeys lang={lang} />
        <Products lang={lang} />
        <Awards lang={lang} />
        <Story lang={lang} />
        <Contact lang={lang} />
      </div>
    </>
  );
}
