import manifest from "@/data/images.json";
import type { ImageSlug } from "@/data/content";
import { asset } from "@/lib/site";

type Props = {
  slug: ImageSlug;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  position?: string;
  parallax?: boolean;
};

export function Photo({ slug, alt, sizes, priority = false, className = "", imgClassName = "", position, parallax = false }: Props) {
  const m = manifest[slug];
  const set = (ext: string) => m.widths.map((w) => `${asset(`/img/${slug}-${w}.${ext}`)} ${w}w`).join(", ");
  const fallback = m.widths.filter((w) => w <= 1200).pop() ?? m.widths[0];
  return (
    <picture className={`photo block overflow-hidden ${className}`} data-parallax={parallax ? "" : undefined}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      <img
        src={asset(`/img/${slug}-${fallback}.webp`)}
        alt={alt}
        width={m.width}
        height={m.height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        className={imgClassName}
        style={{ backgroundImage: `url(${m.blur})`, objectPosition: position }}
      />
    </picture>
  );
}
