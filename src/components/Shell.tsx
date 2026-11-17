import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { ScrollManager } from "@/components/ScrollManager";
import { JsonLd } from "@/components/ui";
import type { Lang } from "@/i18n";
import { ui } from "@/i18n/ui";
import { businessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "@/app/globals.css";

// Self-hosted subsets (see src/fonts/README.md): three files, all preloaded. They include German umlauts and ß.
const fraunces = localFont({
  src: [{ path: "../fonts/fraunces-roman.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-fraunces",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const frauncesItalic = localFont({
  src: [{ path: "../fonts/fraunces-italic.woff2", weight: "300 700", style: "italic" }],
  variable: "--font-fraunces-italic",
  display: "swap",
  fallback: ["ui-serif", "Georgia", "serif"],
});

const source = localFont({
  src: [{ path: "../fonts/vidovic-sans.woff2", weight: "400 700", style: "normal" }],
  variable: "--font-source",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const live = process.env.NEXT_PUBLIC_SITE_LIVE === "1";

const defaultTitle: Record<Lang, string> = {
  sl: `${site.name} | Domač med in matice čebel`,
  en: `${site.name} | Honey and queen bees`,
  de: `${site.name} | Honig und Bienenköniginnen`,
};

export function layoutMeta(lang: Lang): Metadata {
  return {
    metadataBase: new URL(site.url),
    title: { default: defaultTitle[lang], template: `%s | ${site.name}` },
    applicationName: site.name,
    authors: [{ name: site.owner }],
    formatDetection: { telephone: true, address: true, email: true },
    robots: live ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#1f1711",
};

// The document for one language. Each language tree (Slovenian at the root, /en and /de) has its own root layout
// that renders this, so <html lang> is right on every page.
export function Shell({ lang, langPath, children }: { lang: Lang; langPath?: string; children: ReactNode }) {
  return (
    <html lang={lang} className={`${fraunces.variable} ${frauncesItalic.variable} ${source.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#vsebina"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-smola focus:px-5 focus:py-3 focus:text-papir"
        >
          {ui[lang].skip}
        </a>
        <Header lang={lang} />
        <main id="vsebina">{children}</main>
        <Footer lang={lang} langPath={langPath} />
        <ScrollManager />
        <Motion />
        <JsonLd data={businessSchema(lang)} />
      </body>
    </html>
  );
}
