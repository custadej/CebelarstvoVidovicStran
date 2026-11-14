import type { Metadata } from "next";
import { site } from "@/lib/site";

export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: { "sl-SI": url } },
    openGraph: { title, description, url, siteName: site.name, locale: "sl_SI", type: "website", images: [{ url: "/og.jpg", width: 1200, height: 630, alt: site.name }] },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
