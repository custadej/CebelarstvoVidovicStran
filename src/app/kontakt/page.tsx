import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { breadcrumbSchema } from "@/lib/schema";

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
      <JsonLd data={breadcrumbSchema([{ name: "Kontakt", path: "/kontakt/" }])} />
    </>
  );
}
