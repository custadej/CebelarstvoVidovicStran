import { langParam } from "@/lib/route-lang";
import { AwardsPage, meta } from "@/views/Awards";

export async function generateMetadata({ params }: PageProps<"/[lang]/priznanja">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/priznanja">) {
  return <AwardsPage lang={await langParam(params)} />;
}
