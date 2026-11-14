import { Photo } from "@/components/Photo";
import { CallButton, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";

export function Where() {
  return (
    <section id="kje" className="section">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Photo
            slug="koticek"
            alt="Prodajni kotiček s šesterokotnimi policami, polnimi kozarcev medu"
            sizes="(min-width: 1024px) 560px, 92vw"
            className="frame order-2 aspect-[3/2] lg:order-1"
            parallax
          />
          <div className="order-1 lg:order-2">
            <SectionHead
              n="06"
              eyebrow="Kje nas najdete"
              title={
                <>
                  Doma, v našem <em>medenem kotičku.</em>
                </>
              }
              lead={`${site.address.street}, ${site.address.city}. Obiski so po dogovoru, zato pred prihodom pokličite.`}
            />
            <ul className="mt-8 grid gap-4" data-reveal="">
              <li className="border-t border-crta pt-4">
                <strong>Dostava medu.</strong> Po dogovoru na območju Ptuja in Maribora.
              </li>
              <li className="border-t border-crta pt-4">
                <strong>Matice po pošti.</strong> Po vsej Sloveniji, dostava naslednji dan.
              </li>
              <li className="border-t border-crta pt-4">
                <strong>Ocenjevanja.</strong> Naš med redno ocenjujejo na sejmu AGRA v Gornji Radgoni in na Dobrotah slovenskih kmetij na Ptuju.
              </li>
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <CallButton label="Pokličite" variant="smola" />
              <a href={site.maps} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                Pot do nas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
