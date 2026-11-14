"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  label: string;
  role?: "tablist" | "list";
  className?: string;
  /** what to show under the rail while it overflows */
  indicator?: "dots" | "none";
  /** nudge once when first seen, to show it scrolls */
  nudge?: boolean;
};

// A horizontal rail that makes it obvious it scrolls: the next item peeks in, the edges fade, it snaps,
// it nudges once when first seen, it has dots, arrows on wider screens and mouse drag.
// All of that only appears while the content actually overflows; when everything fits (desktop grid) it is inert.
export function Rail({ children, label, role = "list", className = "", indicator = "dots", nudge = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ overflow: false, start: true, end: false, index: 0, count: 0 });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const overflow = el.scrollWidth > el.clientWidth + 4;
    const max = el.scrollWidth - el.clientWidth;
    let index = 0;
    let best = Infinity;
    items.forEach((it, i) => {
      const d = Math.abs(it.offsetLeft - el.offsetLeft - el.scrollLeft);
      if (d < best) {
        best = d;
        index = i;
      }
    });
    if (el.scrollLeft >= max - 2) index = items.length - 1;
    setState((s) => {
      const next = { overflow, start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, index, count: items.length };
      return s.overflow === next.overflow && s.start === next.start && s.end === next.end && s.index === next.index && s.count === next.count ? s : next;
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();

    // One-time nudge
    let io: IntersectionObserver | undefined;
    let t1 = 0;
    let t2 = 0;
    if (nudge && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting) || el.scrollWidth <= el.clientWidth + 4 || el.scrollLeft > 2) return;
          io?.disconnect();
          t1 = window.setTimeout(() => {
            el.style.scrollSnapType = "none";
            el.scrollTo({ left: 56, behavior: "smooth" });
            t2 = window.setTimeout(() => {
              el.scrollTo({ left: 0, behavior: "smooth" });
              window.setTimeout(() => {
                el.style.scrollSnapType = "";
              }, 500);
            }, 520);
          }, 450);
        },
        { threshold: 0.7 },
      );
      io.observe(el);
    }

    // Mouse drag
    let down = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0 || el.scrollWidth <= el.clientWidth + 4) return;
      down = true;
      moved = 0;
      startX = e.clientX;
      startLeft = el.scrollLeft;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      moved = Math.max(moved, Math.abs(dx));
      if (moved > 5) {
        el.dataset.dragging = "1";
        el.scrollLeft = startLeft - dx;
      }
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      window.setTimeout(() => delete el.dataset.dragging, 0);
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved > 5) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };
    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClickCapture, true);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      io?.disconnect();
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, [measure, nudge]);

  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const target = items[Math.min(items.length - 1, Math.max(0, state.index + dir))];
    if (target) el.scrollTo({ left: target.offsetLeft - el.offsetLeft, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const fade = !state.overflow ? "none" : state.start ? "end" : state.end ? "start" : "both";

  return (
    <div className="rail-wrap">
      <div ref={ref} role={role} aria-label={label} className={`rail ${className}`} data-fade={fade}>
        {children}
      </div>
      {state.overflow && indicator === "dots" ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {Array.from({ length: state.count }, (_, i) => (
              <span key={i} className="rail-dot" data-on={i === state.index ? "" : undefined} />
            ))}
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button type="button" className="rail-arrow" onClick={() => step(-1)} disabled={state.start} aria-label="Prejšnji">
              <svg width="18" height="12" viewBox="0 0 22 14" aria-hidden="true">
                <path d="M21 7H2m0 0 5.5-5.5M2 7l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
            <button type="button" className="rail-arrow" onClick={() => step(1)} disabled={state.end} aria-label="Naslednji">
              <svg width="18" height="12" viewBox="0 0 22 14" aria-hidden="true">
                <path d="M1 7h19m0 0-5.5-5.5M20 7l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
