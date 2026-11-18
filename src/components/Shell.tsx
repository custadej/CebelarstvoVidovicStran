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

// Browser fallback for hosts without the Cloudflare middleware (e.g. the GitHub Pages preview), where the country is not
// known. On a Slovenian page with no saved choice and no data-geo mark, the device's time zone stands in for the location
// (no request to any outside service): Europe/Ljubljana or a Slovenian browser stays; a German-speaking time zone or a
// German browser goes to /de; anything else to /en. Bots stay. Runs before paint, once per tab.
const geoFallback = (base: string) => `(function(){try{var d=document.documentElement;if(d.dataset.geo||sessionStorage.getItem("lang-redirect"))return;
var m=document.cookie.match(/(?:^|; )lang=(sl|en|de)/);var l=m?m[1]:null;
if(!l){if(/bot|crawl|spider|slurp|preview|lighthouse|headless/i.test(navigator.userAgent))return;
var tz="";try{tz=Intl.DateTimeFormat().resolvedOptions().timeZone||"";}catch(e){}
var b=((navigator.languages&&navigator.languages[0])||navigator.language||"").toLowerCase();
l=tz==="Europe/Ljubljana"||b.indexOf("sl")===0?"sl":/^Europe\\/(Berlin|Vienna|Zurich|Vaduz|Busingen)$/.test(tz)||b.indexOf("de")===0?"de":"en";}
if(l==="sl")return;sessionStorage.setItem("lang-redirect","1");var p=location.pathname;var base=${JSON.stringify(base)};if(base&&p.indexOf(base)===0)p=p.slice(base.length)||"/";
location.replace(base+"/"+l+p+location.search+location.hash);}catch(e){}})();`;

// The document for one language. Each language tree (Slovenian at the root, /en and /de) has its own root layout
// that renders this, so <html lang> is right on every page.
export function Shell({ lang, langPath, children }: { lang: Lang; langPath?: string; children: ReactNode }) {
  return (
    <html lang={lang} className={`${fraunces.variable} ${frauncesItalic.variable} ${source.variable} antialiased`}>
      <body className="min-h-dvh">
        {lang === "sl" ? <script dangerouslySetInnerHTML={{ __html: geoFallback(process.env.NEXT_PUBLIC_BASE_PATH ?? "") }} /> : null}
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
