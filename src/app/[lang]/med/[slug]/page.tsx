import { langParam } from "@/lib/route-lang";
import { detailMeta, HoneyDetail, honeySlugs } from "@/views/Honey";

export const dynamicParams = false;
export const generateStaticParams = honeySlugs;

export async function generateMetadata({ params }: PageProps<"/[lang]/med/[slug]">) {
  const { slug } = await params;
  return detailMeta(await langParam(params), slug);
}

export default async function Page({ params }: PageProps<"/[lang]/med/[slug]">) {
  const { slug } = await params;
  return <HoneyDetail lang={await langParam(params)} slug={slug} />;
}
