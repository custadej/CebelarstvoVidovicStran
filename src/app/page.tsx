import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <p className="text-sm tracking-[0.14em] text-kostanj uppercase">Ogrodje projekta</p>
      <h1 className="font-display text-5xl leading-[1.05] sm:text-7xl">{site.name}</h1>
      <p>
        Nova spletna stran je v pripravi. {site.address.street}, {site.address.postalCode} {site.address.city}.
      </p>
      <a
        href={site.phone.href}
        className="inline-flex min-h-12 w-fit items-center rounded-full bg-smola px-6 font-semibold text-papir"
      >
        Pokličite Jožeta · {site.phone.display}
      </a>
    </main>
  );
}
