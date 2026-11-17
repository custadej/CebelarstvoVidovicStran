"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode, type TouchEvent } from "react";
import { HoneycombCanvas } from "@/components/HoneycombCanvas";
import { Rail } from "@/components/Rail";
import type { Lang } from "@/i18n";

const T = {
  sl: { group: "Izberite med po barvi", hint: "Tapnite barvo ali izberite vrsto:", selected: "Izbran med ", prev: "Prejšnja vrsta medu", next: "Naslednja vrsta medu", kinds: "Vrste medu" },
  en: { group: "Choose a honey by colour", hint: "Tap a colour or choose a kind:", selected: "Selected honey ", prev: "Previous honey", next: "Next honey", kinds: "Kinds of honey" },
  de: { group: "Honig nach Farbe wählen", hint: "Tippen Sie auf eine Farbe oder wählen Sie eine Sorte:", selected: "Gewählter Honig ", prev: "Vorherige Sorte", next: "Nächste Sorte", kinds: "Honigsorten" },
} satisfies Record<Lang, Record<string, string>>;

type Item = { slug: string; label: string; name: string; color: string };

const R = 46;
const COLS = 9;
const ROWS = 3;
const W = Math.sqrt(3) * R;

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
  }).join(" ");
}

// One piece of state drives three views of the same choice: the honeycomb (tap a colour), the chips and the card.
// Panels are rendered on the server and passed in, so all six honeys are in the HTML.
export function HoneyExplorer({ lang, items, panels, initial = 0 }: { lang: Lang; items: Item[]; panels: ReactNode[]; initial?: number }) {
  const t = T[lang];
  const [active, setActive] = useState(initial);
  const id = useId();
  const panelsRef = useRef<HTMLDivElement>(null);
  const fromComb = useRef(false);
  const colors = useMemo(() => items.map((i) => i.color), [items]);

  const cells = useMemo(
    () =>
      Array.from({ length: ROWS * COLS }, (_, i) => {
        const r = Math.floor(i / COLS);
        const c = i % COLS;
        const t = (c + (r % 2 ? 0.5 : 0)) / (COLS - 0.5);
        return { x: 60 + c * W + (r % 2 ? W / 2 : 0), y: 60 + r * 1.5 * R, index: Math.min(items.length - 1, Math.round(t * (items.length - 1))) };
      }),
    [items.length],
  );
  const width = 60 * 2 + (COLS - 0.5) * W;
  const height = 60 * 2 + (ROWS - 1) * 1.5 * R;

  const go = useCallback((i: number) => setActive((i + items.length) % items.length), [items.length]);
  const selectFromComb = useCallback((i: number) => {
    fromComb.current = true;
    setActive(i);
  }, []);

  // Keep the selected chip visible inside its rail (scrolls the rail, never the page).
  useEffect(() => {
    const chip = document.getElementById(`${id}-tab-${items[active].slug}`);
    const rail = chip?.parentElement;
    if (!chip || !rail || rail.scrollWidth <= rail.clientWidth + 4) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: chip.offsetLeft - rail.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, id, items]);

  // After choosing on the honeycomb, bring the card into view if it is below the fold. Short and gentle.
  useEffect(() => {
    if (!fromComb.current) return;
    fromComb.current = false;
    const box = panelsRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const vh = window.innerHeight;
    if (rect.top < vh * 0.62) return;
    const delta = rect.top - vh * 0.36;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.__lenis) window.__lenis.scrollTo(window.scrollY + delta, { duration: reduce ? 0 : 0.7, immediate: reduce });
    else window.scrollBy({ top: delta, behavior: reduce ? "auto" : "smooth" });
  }, [active]);

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = active + 1;
    else if (e.key === "ArrowLeft") next = active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else return;
    e.preventDefault();
    const n = (next + items.length) % items.length;
    setActive(n);
    document.getElementById(`${id}-tab-${items[n].slug}`)?.focus({ preventScroll: true });
  };

  // Swipe the card left / right to move to the next honey.
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const dx = e.changedTouches[0].clientX - start.x;
    const dy = e.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5) go(active + (dx < 0 ? 1 : -1));
  };

  return (
    <>
      <div className="comb honeycomb relative aspect-[5/2] w-full md:aspect-[4/1]" data-has-active="" data-bee-source="">
        <svg viewBox={`0 0 ${width.toFixed(0)} ${height.toFixed(0)}`} className="honeycomb-svg absolute inset-0 h-full w-full" aria-hidden="true">
          {cells.map((cell, i) => (
            <g key={i} className="comb-hex" data-on={cell.index === active ? "" : undefined} onClick={() => selectFromComb(cell.index)}>
              <polygon points={hexPoints(cell.x, cell.y, R - 2)} fill="#f0d9a0" />
              <polygon points={hexPoints(cell.x, cell.y, R - 8)} fill={items[cell.index].color} />
              <polygon points={hexPoints(cell.x - 6, cell.y - 8, R * 0.34)} fill="#fff" opacity="0.14" />
            </g>
          ))}
        </svg>
        <HoneycombCanvas colors={colors} active={active} onSelect={selectFromComb} />
        {/* Keyboard and screen-reader access to the same choice; the visible focus is the ring around the honeycomb. */}
        <div role="group" aria-label={t.group}>
          {items.map((it, i) => (
            <button key={it.slug} type="button" className="comb-key sr-only" aria-pressed={i === active} onClick={() => selectFromComb(i)}>
              {it.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 mb-4 flex items-center justify-between gap-4">
        <p className="text-[1.0625rem]">{t.hint}</p>
        <div className="flex flex-none items-center gap-2">
          <p className="num text-[1.05rem] text-akacija" aria-live="polite">
            <span className="sr-only">{t.selected}</span>
            {active + 1} <span className="opacity-60">/ {items.length}</span>
          </p>
          <button type="button" className="rail-arrow hidden md:grid" onClick={() => go(active - 1)} aria-label={t.prev}>
            <svg width="18" height="12" viewBox="0 0 22 14" aria-hidden="true">
              <path d="M21 7H2m0 0 5.5-5.5M2 7l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
          <button type="button" className="rail-arrow hidden md:grid" onClick={() => go(active + 1)} aria-label={t.next}>
            <svg width="18" height="12" viewBox="0 0 22 14" aria-hidden="true">
              <path d="M1 7h19m0 0-5.5-5.5M20 7l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </button>
        </div>
      </div>

      <Rail lang={lang} role="tablist" label={t.kinds} indicator="none" className="-mr-5 pr-5 md:mr-0 md:flex-wrap md:pr-0">
        {items.map((t, i) => (
          <button
            key={t.slug}
            type="button"
            role="tab"
            id={`${id}-tab-${t.slug}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${t.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
            onKeyDown={onTabKey}
          >
            <span aria-hidden="true" className="hex h-4 w-3.5 flex-none" style={{ background: t.color, boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .3)" }} />
            {t.label}
          </button>
        ))}
      </Rail>

      <div ref={panelsRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className="touch-pan-y">
        {items.map((t, i) => (
          <div
            key={t.slug}
            role="tabpanel"
            id={`${id}-panel-${t.slug}`}
            aria-labelledby={`${id}-tab-${t.slug}`}
            hidden={i !== active}
            tabIndex={0}
            className="panel mt-6 rounded-[1.5rem] bg-vosek text-smola focus-visible:outline-offset-4"
          >
            {panels[i]}
          </div>
        ))}
      </div>
    </>
  );
}
