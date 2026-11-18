import { langParam } from "@/lib/route-lang";
import { QueensPage, meta } from "@/views/Queens";

export async function generateMetadata({ params }: PageProps<"/[lang]/matice">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/matice">) {
  return <QueensPage lang={await langParam(params)} />;
}
