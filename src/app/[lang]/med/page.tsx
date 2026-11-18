import { langParam } from "@/lib/route-lang";
import { HoneyList, listMeta } from "@/views/Honey";

export async function generateMetadata({ params }: PageProps<"/[lang]/med">) {
  return listMeta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/med">) {
  return <HoneyList lang={await langParam(params)} />;
}
