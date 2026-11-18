import { langParam } from "@/lib/route-lang";
import { Home, meta } from "@/views/Home";

export async function generateMetadata({ params }: PageProps<"/[lang]">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  return <Home lang={await langParam(params)} />;
}
