import { layoutMeta, Shell } from "@/components/Shell";
import { foreignLangs } from "@/i18n";
import { langParam } from "@/lib/route-lang";

export { viewport } from "@/components/Shell";
export const dynamicParams = false;

export function generateStaticParams() {
  return foreignLangs.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">) {
  return layoutMeta(await langParam(params));
}

export default async function Layout({ children, params }: LayoutProps<"/[lang]">) {
  return <Shell lang={await langParam(params)}>{children}</Shell>;
}
