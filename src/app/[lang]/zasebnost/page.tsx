import { langParam } from "@/lib/route-lang";
import { PrivacyPage, meta } from "@/views/Privacy";

export async function generateMetadata({ params }: PageProps<"/[lang]/zasebnost">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/zasebnost">) {
  return <PrivacyPage lang={await langParam(params)} />;
}
