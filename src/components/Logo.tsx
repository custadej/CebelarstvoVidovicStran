import logo from "@/data/logo.json";
import { site } from "@/lib/site";

// The bee's antennae make the image taller than the lettering, so a box-centred logo looks low next to text.
// `optical` lifts the image until the centre of the lettering sits on the centre line of its container.
export function Logo({ height, optical = false, className = "" }: { height: number; optical?: boolean; className?: string }) {
  const shift = optical ? `${((0.5 - logo.wordmarkCenter) * 100).toFixed(1)}%` : "0";
  return (
    <picture className={className}>
      <source srcSet="/img/logo-360.webp 360w, /img/logo.webp 883w" sizes={`${Math.round((height * logo.width) / logo.height)}px`} type="image/webp" />
      <img
        src="/img/logo.png"
        alt={site.name}
        width={logo.width}
        height={logo.height}
        data-logo-img=""
        style={{ height, width: "auto", transform: `translateY(${shift})` }}
      />
    </picture>
  );
}
