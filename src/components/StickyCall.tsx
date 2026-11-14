import { PhoneIcon, Strip } from "@/components/ui";
import { site } from "@/lib/site";

export function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <Strip className="!h-1" />
      <a
        href={site.phone.href}
        className="flex min-h-16 items-center justify-center gap-3 bg-smola px-4 pb-[env(safe-area-inset-bottom)] text-papir active:bg-smola-2"
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-med text-smola">
          <PhoneIcon size={20} />
        </span>
        <span className="text-[1.0625rem] font-bold">
          Pokličite Jožeta <span className="tel num ml-1 text-[1.2rem] text-akacija">{site.phone.display}</span>
        </span>
      </a>
    </div>
  );
}
