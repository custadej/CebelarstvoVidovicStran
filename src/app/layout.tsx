import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Motion } from "@/components/Motion";
import { StickyCall } from "@/components/StickyCall";
import { JsonLd } from "@/components/ui";
import { businessSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

// Self-hosted Slovenian subsets (see src/fonts/README.md): three files, 129 KB in total, all preloaded.
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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Med in matice iz Haloz`, template: `%s | ${site.name}` },
  applicationName: site.name,
  authors: [{ name: site.owner }],
  formatDetection: { telephone: true, address: true, email: true },
  robots: live ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1f1711",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="sl" className={`${fraunces.variable} ${frauncesItalic.variable} ${source.variable} antialiased`}>
      <body className="min-h-dvh">
        <a
          href="#vsebina"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-smola focus:px-5 focus:py-3 focus:text-papir"
        >
          Preskoči na vsebino
        </a>
        <Header />
        <main id="vsebina">{children}</main>
        <Footer />
        <StickyCall />
        <Motion />
        <JsonLd data={businessSchema} />
      </body>
    </html>
  );
}
