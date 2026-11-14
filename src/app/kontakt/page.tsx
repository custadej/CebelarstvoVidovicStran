import { Contact } from "@/components/sections/Contact";
import { FaqList } from "@/components/sections/Faq";
import { JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata = pageMeta({
  title: "Kontakt: 041 579 827, Apače 300, Lovrenc na Dravskem polju",
  description:
    "Čebelarstvo Vidovič, Jože Vidovič, Apače 300, 2324 Lovrenc na Dravskem polju. Telefon 041 579 827. Obiski po dogovoru, pred prihodom pokličite.",
  path: "/kontakt/",
});

export default function Page() {
  return (
    <>
      <Contact as="h1" />
      <section className="section bg-papir">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <h2 className="display h-section" data-split="">
            Pogosta <em>vprašanja.</em>
          </h2>
          <FaqList />
        </div>
      </section>
      <JsonLd data={[faqSchema(), breadcrumbSchema([{ name: "Kontakt", path: "/kontakt/" }])]} />
    </>
  );
}
