import type { Metadata } from "next";
import Link from "next/link";
import { Shell } from "@/components/Shell";
import { CallButton } from "@/components/ui";

// Unmatched URLs in any language land here (there is no single root layout to build a 404 from).
export const metadata: Metadata = {
  title: "Te strani ni v panju | Čebelarstvo Vidovič",
  robots: { index: false, follow: false },
};

export default function GlobalNotFound() {
  return (
    <Shell lang="sl" langPath="/">
      <section className="section !pt-44">
        <div className="wrap">
          <p className="eyebrow">Napaka 404</p>
          <h1 className="display h-page mt-4 max-w-[12ch]">
            Te strani <em>ni v panju.</em>
          </h1>
          <p className="lead mt-6 max-w-[36ch]">Morda je bila prestavljena. Vrnite se na začetek ali kar pokličite.</p>
          <p className="mt-4 max-w-[48ch] opacity-80" lang="en">
            Page not found. <Link href="/en/" className="link">English home page</Link>
          </p>
          <p className="mt-1 max-w-[48ch] opacity-80" lang="de">
            Seite nicht gefunden. <Link href="/de/" className="link">Deutsche Startseite</Link>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-smola">
              Na začetno stran
            </Link>
            <CallButton lang="sl" variant="ghost" />
          </div>
        </div>
      </section>
    </Shell>
  );
}
