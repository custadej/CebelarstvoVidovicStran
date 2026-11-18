import { langParam } from "@/lib/route-lang";
import { ProductsPage, meta } from "@/views/Products";

export async function generateMetadata({ params }: PageProps<"/[lang]/cebelji-pridelki">) {
  return meta(await langParam(params));
}

export default async function Page({ params }: PageProps<"/[lang]/cebelji-pridelki">) {
  return <ProductsPage lang={await langParam(params)} />;
}
