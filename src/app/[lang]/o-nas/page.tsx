import { langParam } from "@/lib/route-lang";
import { AboutPage, meta } from "@/views/About";

export async function generateMetadata({ params }: PageProps<"/[lang]/o-nas">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/o-nas">) {
  return <AboutPage lang={await langParam(params)} />;
}
