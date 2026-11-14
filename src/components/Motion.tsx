"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// All scroll and pointer motion lives here. Markup is complete and visible without it:
// with reduced motion (or no JS) nothing in this file runs and the page is static.
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText);
      await document.fonts.ready;
      if (cancelled) return;

      const root = document.documentElement;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const undo: (() => void)[] = [];
      root.classList.add("motion");
      undo.push(() => root.classList.remove("motion"));

      if (fine) {
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        const lenis = new Lenis({ anchors: true, lerp: 0.11 });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        undo.push(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        });
      }

      const ctx = gsap.context(() => {
        // Headings: line-by-line mask reveal
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            linesClass: "line",
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 112,
                duration: 1.05,
                ease: "expo.out",
                stagger: 0.09,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }),
          });
        });

        // Generic reveal, batched so neighbours stagger
        gsap.set("[data-reveal]", { opacity: 0, y: 26 });
        ScrollTrigger.batch("[data-reveal]", {
          start: "top 90%",
          once: true,
          onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.85, ease: "expo.out", stagger: 0.08, overwrite: true }),
        });

        // Photo parallax (transform only)
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((wrap) => {
          const img = wrap.querySelector("img");
          if (!img) return;
          gsap.fromTo(
            img,
            { yPercent: -5, scale: 1.12 },
            { yPercent: 5, scale: 1.12, ease: "none", scrollTrigger: { trigger: wrap, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });

        // Counters, once
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const target = Number(el.dataset.count);
          const decimals = Number(el.dataset.decimals ?? 0);
          const from = Number(el.dataset.from ?? 0);
          const state = { v: from };
          const fmt = (v: number) => v.toFixed(decimals).replace(".", ",");
          gsap.to(state, {
            v: target,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = fmt(state.v);
            },
          });
        });

        // Honey thread: drawn by scroll, with a drop riding its tip
        const thread = document.querySelector<HTMLElement>("[data-thread]");
        const threadRoot = document.querySelector<HTMLElement>("[data-thread-root]");
        if (thread && threadRoot) {
          const svg = thread.querySelector("svg");
          const path = thread.querySelector<SVGPathElement>("[data-thread-path]");
          const drop = thread.querySelector<HTMLElement>("[data-thread-drop]");
          if (svg && path && drop) {
            const total = path.getTotalLength();
            const xAt = (yUnit: number) => {
              let lo = 0;
              let hi = total;
              for (let i = 0; i < 14; i++) {
                const mid = (lo + hi) / 2;
                if (path.getPointAtLength(mid).y < yUnit) lo = mid;
                else hi = mid;
              }
              return path.getPointAtLength(lo).x;
            };
            const setX = gsap.quickSetter(drop, "x", "px");
            const setY = gsap.quickSetter(drop, "y", "px");
            gsap.set(drop, { opacity: 1 });
            gsap.fromTo(
              svg,
              { clipPath: "inset(0 0 100% 0)" },
              {
                clipPath: "inset(0 0 0% 0)",
                ease: "none",
                scrollTrigger: {
                  trigger: threadRoot,
                  start: "top 62%",
                  end: "bottom 78%",
                  scrub: 0.5,
                  onUpdate: (self) => {
                    const rect = thread.getBoundingClientRect();
                    setY(self.progress * rect.height);
                    setX((xAt(self.progress * 1000) / 20) * rect.width);
                  },
                },
              },
            );
          }
        }

        // Section nodes fill when the thread reaches them
        gsap.utils.toArray<HTMLElement>(".node").forEach((node) => {
          ScrollTrigger.create({
            trigger: node,
            start: "top 62%",
            onEnter: () => node.classList.add("is-filled"),
            onLeaveBack: () => node.classList.remove("is-filled"),
          });
        });

        // Queen story: sticky photo that follows the active step (desktop)
        const story = document.querySelector<HTMLElement>("[data-story]");
        if (story && window.matchMedia("(min-width: 1024px)").matches) {
          const imgs = gsap.utils.toArray<HTMLElement>("[data-step-img]", story);
          const steps = gsap.utils.toArray<HTMLElement>("[data-step]", story);
          gsap.set(imgs, { autoAlpha: 0, scale: 1.06 });
          gsap.set(imgs[0], { autoAlpha: 1, scale: 1 });
          const show = (i: number) => {
            imgs.forEach((img, j) =>
              gsap.to(img, { autoAlpha: j === i ? 1 : 0, scale: j === i ? 1 : 1.06, duration: 0.7, ease: "expo.out", overwrite: true }),
            );
            steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
          };
          steps.forEach((step, i) => {
            ScrollTrigger.create({
              trigger: step,
              start: "top 58%",
              end: "bottom 58%",
              onToggle: (self) => {
                if (self.isActive) show(i);
              },
            });
          });
        }
      });
      undo.push(() => ctx.revert());

      if (fine) {
        // Magnetic CTAs
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "expo.out" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "expo.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            xTo((e.clientX - (r.left + r.width / 2)) * 0.18);
            yTo((e.clientY - (r.top + r.height / 2)) * 0.28);
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          undo.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
            gsap.set(el, { clearProps: "x,y" });
          });
        });

        // Honey dot that follows the cursor
        const dot = document.createElement("div");
        dot.className = "cursor-dot";
        dot.setAttribute("aria-hidden", "true");
        document.body.appendChild(dot);
        const dx = gsap.quickTo(dot, "x", { duration: 0.35, ease: "power3.out" });
        const dy = gsap.quickTo(dot, "y", { duration: 0.35, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          dx(e.clientX);
          dy(e.clientY);
          const interactive = (e.target as Element | null)?.closest("a, button, summary, input, textarea");
          gsap.to(dot, { opacity: 1, scale: interactive ? 3.2 : 1, duration: 0.25, ease: "power3.out", overwrite: "auto" });
        };
        const onOut = () => gsap.to(dot, { opacity: 0, duration: 0.2 });
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onOut);
        undo.push(() => {
          window.removeEventListener("pointermove", onMove);
          document.removeEventListener("pointerleave", onOut);
          dot.remove();
        });
      }

      ScrollTrigger.refresh();
      cleanup = () => undo.reverse().forEach((fn) => fn());
    };

    void start();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
