import { langParam } from "@/lib/route-lang";
import { ContactPage, meta } from "@/views/ContactPage";

export async function generateMetadata({ params }: PageProps<"/[lang]/kontakt">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/kontakt">) {
  return <ContactPage lang={await langParam(params)} />;
}
