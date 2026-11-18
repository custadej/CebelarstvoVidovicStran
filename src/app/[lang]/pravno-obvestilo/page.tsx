import { langParam } from "@/lib/route-lang";
import { LegalNoticePage, meta } from "@/views/LegalNotice";

export async function generateMetadata({ params }: PageProps<"/[lang]/pravno-obvestilo">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/pravno-obvestilo">) {
  return <LegalNoticePage lang={await langParam(params)} />;
}
