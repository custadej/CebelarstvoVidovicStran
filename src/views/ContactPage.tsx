import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { FaqList } from "@/components/sections/Faq";
import { JsonLd } from "@/components/ui";
import type { Lang } from "@/i18n";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

const T = {
  sl: {
    metaTitle: "Kontakt: 041 579 827, Apače 300, Lovrenc na Dravskem polju",
    metaDescription:
      "Čebelarstvo Vidovič, Jože Vidovič, Apače 300, 2324 Lovrenc na Dravskem polju. Telefon 041 579 827. Obiski po dogovoru, pred prihodom pokličite.",
    crumb: "Kontakt",
    faq: (
      <>
        Pogosta <em>vprašanja.</em>
      </>
    ),
  },
  en: {
    metaTitle: "Contact: +386 41 579 827, Apače 300, Lovrenc na Dravskem polju",
    metaDescription:
      "Čebelarstvo Vidovič, Jože Vidovič, Apače 300, 2324 Lovrenc na Dravskem polju, Slovenia. Phone +386 41 579 827. Visits by arrangement, please call before you come.",
    crumb: "Contact",
    faq: (
      <>
        Frequently asked <em>questions.</em>
      </>
    ),
  },
  de: {
    metaTitle: "Kontakt: +386 41 579 827, Apače 300, Lovrenc na Dravskem polju",
    metaDescription:
      "Čebelarstvo Vidovič, Jože Vidovič, Apače 300, 2324 Lovrenc na Dravskem polju, Slowenien. Telefon +386 41 579 827. Besuche nach Vereinbarung, bitte rufen Sie vorher an.",
    crumb: "Kontakt",
    faq: (
      <>
        Häufige <em>Fragen.</em>
      </>
    ),
  },
};

export function meta(lang: Lang): Metadata {
  return pageMeta({ title: T[lang].metaTitle, description: T[lang].metaDescription, path: "/kontakt/", lang });
}

export function ContactPage({ lang }: { lang: Lang }) {
  const t = T[lang];
  return (
    <>
      <Contact lang={lang} as="h1" />
      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display h-section" data-split="">
            {t.faq}
          </h2>
          <FaqList lang={lang} />
        </div>
      </section>
      <JsonLd data={[faqSchema(lang), breadcrumbSchema(lang, [{ name: t.crumb, path: "/kontakt/" }])]} />
    </>
  );
}
