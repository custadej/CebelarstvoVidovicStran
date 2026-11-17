import { detailMeta, HoneyDetail, honeySlugs } from "@/views/Honey";

export const dynamicParams = false;
export const generateStaticParams = honeySlugs;

export async function generateMetadata({ params }: PageProps<"/med/[slug]">) {
  return detailMeta("sl", (await params).slug);
}

export default async function Page({ params }: PageProps<"/med/[slug]">) {
  return <HoneyDetail lang="sl" slug={(await params).slug} />;
}
