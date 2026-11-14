import Link from "next/link";
import { CallButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="section !pt-44">
      <div className="wrap">
        <p className="eyebrow">Napaka 404</p>
        <h1 className="display h-page mt-4 max-w-[12ch]">
          Te strani <em>ni v panju.</em>
        </h1>
        <p className="lead mt-6 max-w-[36ch]">Morda je bila prestavljena. Vrnite se na začetek ali kar pokličite.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-smola">
            Na začetno stran
          </Link>
          <CallButton variant="ghost" />
        </div>
      </div>
    </section>
  );
}
