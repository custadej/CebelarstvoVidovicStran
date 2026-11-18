"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { detectQuality, LITE_EVENT, setQuality } from "@/lib/quality";

// A small bee facing right (+x), so autoRotate along a motion path points its head forward.
const BEE_SVG = `<svg viewBox="-20 -20 40 40"><defs><clipPath id="bee-clip"><ellipse cx="-1" cy="0" rx="10.5" ry="7.2"/></clipPath></defs><g class="bee-body">
<ellipse class="bee-wing" cx="-3" cy="-8" rx="5" ry="8.5" fill="#fff" fill-opacity=".5" stroke="#fff" stroke-opacity=".85" stroke-width=".8"/>
<path d="M-15.5 0 -10.5 -1.7v3.4z" fill="#1f1711"/>
<ellipse cx="-1" cy="0" rx="10.5" ry="7.2" fill="#f2b90f"/>
<g clip-path="url(#bee-clip)" fill="#1f1711"><rect x="-6.5" y="-8" width="3" height="16"/><rect x="-0.5" y="-8" width="3" height="16"/></g>
<circle cx="10" cy="0" r="5" fill="#1f1711"/><circle cx="12" cy="-1.6" r="1.2" fill="#fff"/>
<path d="M12 -4q3 -5 6.5 -5M10 -4.6q1 -5.4 4 -6.6" stroke="#1f1711" stroke-width="1.1" fill="none" stroke-linecap="round"/>
<ellipse class="bee-wing" cx="2" cy="-8.5" rx="5.5" ry="9" fill="#fff" fill-opacity=".7" stroke="#fff" stroke-width=".8"/>
</g></svg>`;

// Bottom edge of the page-change curtain: honey running down in a few long drips.
const CURTAIN_SVG = `<svg viewBox="0 0 1440 121" preserveAspectRatio="none"><defs><linearGradient id="curtain-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b46a10"/><stop offset="1" stop-color="#985609"/></linearGradient></defs><path fill="url(#curtain-fill)" d="M0 0H1440V40C1400 40 1395 52 1390 70C1386 86 1372 86 1370 70C1366 50 1350 42 1300 42H1120C1080 42 1076 58 1072 92C1068 114 1048 114 1046 92C1042 58 1030 44 990 44H760C730 44 724 60 721 78C718 96 700 96 698 78C694 58 680 46 640 46H420C380 46 376 64 372 100C369 120 348 120 346 100C342 62 330 48 290 48H140C110 48 104 60 101 74C98 88 82 88 80 74C76 56 60 44 30 44H0Z"/></svg>`;

type Curtain = { el: HTMLElement; covering: boolean; reveal: () => void };

// Lenis' ticker callback, kept so a switch to lite mode can stop smooth scrolling for good.
let lenisTick: ((time: number) => void) | null = null;

// All scroll and pointer motion lives here. Markup is complete and visible without it:
// with reduced motion (or no JS) nothing in this file runs and the page is static.
export function Motion() {
  const pathname = usePathname();
  const router = useRouter();
  const curtain = useRef<Curtain | null>(null);

  // Page change: a click on an internal link lets honey run down over the page (about 0.4 s), the route changes
  // underneath, and the honey runs off to show the new page. Other languages are a full page load and keep the default.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let alive = true;
    let onClick: ((e: MouseEvent) => void) | undefined;
    void import("gsap").then(({ gsap }) => {
      if (!alive) return;
      const el = document.createElement("div");
      el.className = "curtain";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<div class="curtain-body"></div>${CURTAIN_SVG}<div class="curtain-bee">${BEE_SVG}</div>`;
      document.body.appendChild(el);
      gsap.set(el, { yPercent: -100, autoAlpha: 0 });
      const root = document.documentElement;
      const state: Curtain = {
        el,
        covering: false,
        reveal: () => {
          state.covering = false;
          // the new page's own entrance (hero rise, photo unveil) starts as the honey runs off
          root.classList.remove("curtain-hold");
          gsap.to(el, { yPercent: 100, duration: 0.9, ease: "power3.inOut", overwrite: true, onComplete: () => void gsap.set(el, { yPercent: -100, autoAlpha: 0 }) });
        },
      };
      curtain.current = state;
      const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
      const strip = (p: string) => (base && p.startsWith(base) ? p.slice(base.length) || "/" : p);
      const tree = (p: string) => /^\/(en|de)(\/|$)/.exec(p)?.[1] ?? "sl";
      onClick = (e: MouseEvent) => {
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        const a = (e.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
        if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
        const url = new URL(a.href, window.location.href);
        if (url.origin !== window.location.origin) return;
        const to = strip(url.pathname);
        const from = strip(window.location.pathname);
        if (to === from || tree(to) !== tree(from) || /\.[a-z0-9]+$/i.test(to)) return;
        e.preventDefault();
        if (state.covering) return;
        state.covering = true;
        gsap.fromTo(
          el,
          { yPercent: -100, autoAlpha: 1 },
          {
            yPercent: 0,
            duration: 0.7,
            ease: "power3.inOut",
            overwrite: true,
            onComplete: () => {
              root.classList.add("curtain-hold");
              router.push(to + url.search + url.hash);
            },
          },
        );
        window.setTimeout(() => {
          if (state.covering) state.reveal();
        }, 4000);
      };
      document.addEventListener("click", onClick, true);
    });
    return () => {
      alive = false;
      if (onClick) document.removeEventListener("click", onClick, true);
      curtain.current?.el.remove();
      curtain.current = null;
    };
  }, [router]);

  // The new route is in: wait until it is painted with its fonts and first photo (at most 0.7 s), then let the honey run off.
  useEffect(() => {
    const c = curtain.current;
    if (!c?.covering) return;
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      c.reveal();
    };
    const first = document.querySelector<HTMLImageElement>("main img");
    const ready = Promise.all([
      document.fonts.ready,
      first && !first.complete ? first.decode().catch(() => undefined) : Promise.resolve(),
      new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      new Promise((r) => window.setTimeout(r, 180)),
    ]);
    void ready.then(go);
    const cap = window.setTimeout(go, 700);
    return () => {
      done = true;
      window.clearTimeout(cap);
    };
  }, [pathname]);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const start = async () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [{ gsap }, { ScrollTrigger }, { SplitText }, { MotionPathPlugin }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
        import("gsap/SplitText"),
        import("gsap/MotionPathPlugin"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);
      await document.fonts.ready;
      const quality = await detectQuality();
      if (cancelled) return;

      const root = document.documentElement;
      const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      // lite (weak device or measured stutter, see src/lib/quality.ts): no smooth scroll, still drips, no pointer effects
      const full = quality === "full";
      const undo: (() => void)[] = [];
      root.classList.add("motion");
      undo.push(() => root.classList.remove("motion"));

      if (fine && full && !window.__lenis) {
        // One Lenis for the lifetime of the app. Recreating it per route left a gap in which the page
        // could be scrolled by something else; ScrollManager resets it on navigation instead.
        const { default: Lenis } = await import("lenis");
        if (cancelled) return;
        const lenis = new Lenis({ anchors: true, lerp: 0.11 });
        lenis.on("scroll", ScrollTrigger.update);
        lenisTick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(lenisTick);
        gsap.ticker.lagSmoothing(0);
        window.__lenis = lenis;
      }
      window.__lenis?.resize?.();

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

        // Honey thread: drawn by scroll, with a drop riding its tip. The line and the drop are driven by the same
        // progress value in the same frame (no extra scrub lag on top of Lenis), and the reveal only moves two
        // layers, so nothing is repainted while scrolling.
        const thread = document.querySelector<HTMLElement>("[data-thread]");
        const threadRoot = document.querySelector<HTMLElement>("[data-thread-root]");
        if (thread && threadRoot) {
          const path = thread.querySelector<SVGPathElement>("[data-thread-path]");
          const clip = thread.querySelector<HTMLElement>("[data-thread-clip]");
          const inner = thread.querySelector<HTMLElement>("[data-thread-inner]");
          const drop = thread.querySelector<HTMLElement>("[data-thread-drop]");
          if (path && clip && inner && drop) {
            // x of the path at each of N steps down its height, sampled once
            const N = 240;
            const total = path.getTotalLength();
            const xs = new Float32Array(N + 1);
            for (let i = 0, len = 0; i <= N; i++) {
              const y = (i / N) * 1000;
              let lo = len;
              let hi = total;
              for (let k = 0; k < 16; k++) {
                const mid = (lo + hi) / 2;
                if (path.getPointAtLength(mid).y < y) lo = mid;
                else hi = mid;
              }
              len = lo;
              xs[i] = path.getPointAtLength(lo).x / 20;
            }
            const setClip = gsap.quickSetter(clip, "y", "px");
            const setInner = gsap.quickSetter(inner, "y", "px");
            const setX = gsap.quickSetter(drop, "x", "px");
            const setY = gsap.quickSetter(drop, "y", "px");
            let h = thread.offsetHeight;
            let w = thread.offsetWidth;
            const render = (p: number) => {
              const hidden = (1 - p) * h;
              setClip(-hidden);
              setInner(hidden);
              const f = p * N;
              const i = Math.floor(f);
              const x = i >= N ? xs[N] : xs[i] + (xs[i + 1] - xs[i]) * (f - i);
              setY(p * h);
              setX(x * w);
            };
            gsap.set(drop, { opacity: 1 });
            render(0);
            ScrollTrigger.create({
              trigger: threadRoot,
              start: "top 62%",
              end: "bottom 78%",
              onRefresh: (self) => {
                h = thread.offsetHeight;
                w = thread.offsetWidth;
                render(self.progress);
              },
              onUpdate: (self) => render(self.progress),
            });
            undo.push(() => gsap.set([clip, inner], { clearProps: "transform" }));
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

      // Honey drips animate only while on screen (each frame re-runs their SVG filter).
      const dripIo = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle("is-live", e.isIntersecting)), { rootMargin: "60px 0px" });
      if (full) document.querySelectorAll("[data-drip]").forEach((el) => dripIo.observe(el));
      const stopDrips = () => {
        dripIo.disconnect();
        document.querySelectorAll(".is-live").forEach((el) => el.classList.remove("is-live"));
      };
      undo.push(stopDrips);

      // Stutter watch: while scrolling, if more than a fifth of 120 frames take over 34 ms (under 30 fps), switch to lite for the
      // rest of the visit: drips stop, smooth scroll ends, the 3D honeycomb hands over to its SVG (HoneycombCanvas).
      const onLite = () => {
        stopDrips();
        if (lenisTick) gsap.ticker.remove(lenisTick);
        lenisTick = null;
        window.__lenis?.destroy?.();
        window.__lenis = undefined;
      };
      window.addEventListener(LITE_EVENT, onLite);
      undo.push(() => window.removeEventListener(LITE_EVENT, onLite));
      if (full) {
        let scrollingUntil = 0;
        let frames = 0;
        let slow = 0;
        const onScrollWatch = () => (scrollingUntil = performance.now() + 250);
        const watch = (_t: number, dt: number) => {
          if (performance.now() > scrollingUntil) return;
          frames++;
          if (dt > 34) slow++;
          if (frames < 120) return;
          if (slow / frames > 0.2) {
            gsap.ticker.remove(watch);
            setQuality("lite");
          }
          frames = 0;
          slow = 0;
        };
        window.addEventListener("scroll", onScrollWatch, { passive: true });
        gsap.ticker.add(watch);
        undo.push(() => {
          window.removeEventListener("scroll", onScrollWatch);
          gsap.ticker.remove(watch);
        });
      }

      // Bees. One drifts through the hero now and then (over the photo, never more than a few times per visit);
      // tapping the honeycomb lets one out of the cell. The bee turns along its path and never flies upside down.
      const rand = gsap.utils.random;
      const flights = new Set<gsap.core.Tween>();
      const makeBee = (host?: HTMLElement) => {
        const el = document.createElement("div");
        el.className = host ? "bee bee-local" : "bee";
        el.setAttribute("aria-hidden", "true");
        el.innerHTML = BEE_SVG;
        (host ?? document.body).appendChild(el);
        return el;
      };
      const fly = (el: HTMLElement, path: { x: number; y: number }[], duration: number, done?: () => void) => {
        const body = el.querySelector<SVGGElement>(".bee-body");
        gsap.set(el, { x: path[0].x, y: path[0].y });
        const tween = gsap.to(el, {
          motionPath: { path, curviness: 1.3, autoRotate: true },
          duration,
          ease: "sine.inOut",
          onUpdate: () => {
            const angle = (Number(gsap.getProperty(el, "rotation")) * Math.PI) / 180;
            if (body) body.style.transform = Math.cos(angle) < 0 ? "scaleY(-1)" : "";
          },
          onComplete: () => {
            flights.delete(tween);
            el.remove();
            done?.();
          },
        });
        flights.add(tween);
        return tween;
      };
      undo.push(() => {
        flights.forEach((t) => t.kill());
        flights.clear();
        document.querySelectorAll(".bee").forEach((b) => b.remove());
      });

      // Ambient bees share one budget for the whole visit (sessionStorage, so it survives page changes): at least
      // 45 s between two of them and at most 6 per visit, so they stay a small surprise and never get in the way.
      // The honeycomb bee is the visitor's own doing and is not counted.
      const BEE_GAP = 45000;
      const BEE_MAX = 6;
      const store = {
        get: (k: string) => {
          try {
            return Number(window.sessionStorage.getItem(k) ?? 0);
          } catch {
            return Number.POSITIVE_INFINITY;
          }
        },
        set: (k: string, v: number) => {
          try {
            window.sessionStorage.setItem(k, String(v));
          } catch {
            // storage blocked: ambient bees simply stay off
          }
        },
      };
      const canFly = () =>
        document.visibilityState === "visible" && flights.size === 0 && Date.now() - store.get("bee-last") >= BEE_GAP && store.get("bee-count") < BEE_MAX;
      const spend = () => {
        store.set("bee-last", Date.now());
        store.set("bee-count", store.get("bee-count") + 1);
      };

      // In from the right, one loop, out again (fast scrolling, or a minute of reading).
      const loopIn = () => {
        spend();
        const w = window.innerWidth;
        const h = window.innerHeight;
        const cx = w * (w >= 1024 ? 0.8 : 0.62);
        const cy = h * 0.46;
        const r = Math.min(95, w * 0.15);
        fly(
          makeBee(),
          [
            { x: w + 50, y: h * 0.3 },
            { x: cx + r * 1.5, y: cy - r * 0.7 },
            { x: cx, y: cy - r },
            { x: cx - r, y: cy },
            { x: cx, y: cy + r },
            { x: cx + r, y: cy },
            { x: cx + r * 0.3, y: cy - r * 0.9 },
            { x: w + 60, y: h * 0.2 },
          ],
          4.2,
        );
      };

      // Over the hero photo: the first one shortly after arriving, then now and then while the hero is in view.
      const sky = document.querySelector<HTMLElement>("[data-bee-sky]");
      if (sky) {
        let inView = true;
        let timer = 0;
        const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0.3 });
        io.observe(sky);
        const launch = () => {
          if (inView && canFly()) {
            spend();
            const w = sky.clientWidth;
            const h = sky.clientHeight;
            const wide = w >= 1280;
            // stay over the photo: the right half on wide screens, the top band on phones and tablets
            const x0 = wide ? w * 0.52 : w * 0.08;
            const x1 = wide ? w - 60 : w * 0.92;
            const y0 = wide ? h * 0.18 : h * 0.07;
            const y1 = wide ? h * 0.72 : h * 0.36;
            const fromRight = wide || Math.random() < 0.5;
            const path = [
              { x: fromRight ? w + 40 : -40, y: rand(y0, y1) },
              { x: rand(x0, x1), y: rand(y0, y1) },
              { x: rand(x0, x1), y: rand(y0, y1) },
              { x: rand(x0, x1), y: rand(y0, y1) },
              wide ? { x: rand(x0, x1), y: -60 } : { x: fromRight ? -40 : w + 40, y: rand(y0, y1) },
            ];
            fly(makeBee(sky), path, rand(7, 9.5));
          }
          timer = window.setTimeout(launch, rand(50000, 70000));
        };
        timer = window.setTimeout(launch, 2400);
        undo.push(() => {
          window.clearTimeout(timer);
          io.disconnect();
        });
      }

      let combBusy = false;
      const onCombClick = (e: MouseEvent) => {
        if (e.detail === 0 || combBusy) return; // keyboard activation, or a bee is already on its way
        if (!(e.target as Element | null)?.closest("[data-bee-source]")) return;
        combBusy = true;
        const { clientX: x, clientY: y } = e;
        const dir = Math.random() < 0.5 ? -1 : 1;
        const bee = makeBee();
        const svg = bee.querySelector("svg");
        if (svg) gsap.fromTo(svg, { scale: 0.15 }, { scale: 1, duration: 0.45, ease: "back.out(2.2)" });
        fly(
          bee,
          [
            { x, y },
            { x: x + dir * rand(30, 70), y: y - rand(50, 90) },
            { x: x + dir * rand(110, 200), y: y - rand(30, 140) },
            { x: x + dir * rand(240, 380), y: -60 },
          ],
          rand(2.4, 3.1),
          () => (combBusy = false),
        );
      };
      document.addEventListener("click", onCombClick);
      undo.push(() => document.removeEventListener("click", onCombClick));

      // Racing down the page brings a visitor.
      const racer = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          if (Math.abs(self.getVelocity()) > 3200 && canFly()) loopIn();
        },
      });
      undo.push(() => racer.kill());

      // A minute of reading (scrolling, no clicks) brings one too.
      let quietSince = Date.now();
      let scrolled = false;
      const onRead = () => (scrolled = true);
      const onAct = () => {
        quietSince = Date.now();
        scrolled = false;
      };
      const reader = window.setInterval(() => {
        if (!scrolled || Date.now() - quietSince < 60000 || !canFly()) return;
        loopIn();
        onAct();
      }, 5000);
      window.addEventListener("scroll", onRead, { passive: true });
      document.addEventListener("pointerdown", onAct);
      document.addEventListener("keydown", onAct);
      undo.push(() => {
        window.clearInterval(reader);
        window.removeEventListener("scroll", onRead);
        document.removeEventListener("pointerdown", onAct);
        document.removeEventListener("keydown", onAct);
      });

      // Header that steps aside while reading down and comes back on the first scroll up (flag in src/lib/site.ts).
      const bar = document.querySelector<HTMLElement>("[data-autohide]");
      if (bar) {
        let last = window.scrollY;
        let raf = 0;
        const check = () => {
          raf = 0;
          const y = window.scrollY;
          const dy = y - last;
          if (y > 140 && Math.abs(dy) < 8) return;
          const busy = bar.querySelector('[aria-expanded="true"], :focus-visible') !== null;
          bar.toggleAttribute("data-hidden", y > 140 && dy > 0 && !busy);
          last = y;
        };
        const onScroll = () => {
          if (!raf) raf = requestAnimationFrame(check);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        undo.push(() => {
          window.removeEventListener("scroll", onScroll);
          cancelAnimationFrame(raf);
          bar.removeAttribute("data-hidden");
        });
      }

      if (fine && full) {
        // Hero photo leans a little towards the pointer
        document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
          const host = el.closest("section") ?? el;
          const rx = gsap.quickTo(el, "rotationX", { duration: 0.9, ease: "power3.out" });
          const ry = gsap.quickTo(el, "rotationY", { duration: 0.9, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            ry(((e.clientX - (r.left + r.width / 2)) / r.width) * 7);
            rx(((e.clientY - (r.top + r.height / 2)) / r.height) * -5);
          };
          const leave = () => {
            rx(0);
            ry(0);
          };
          host.addEventListener("pointermove", move);
          host.addEventListener("pointerleave", leave);
          undo.push(() => {
            host.removeEventListener("pointermove", move);
            host.removeEventListener("pointerleave", leave);
            gsap.set(el, { clearProps: "transform" });
          });
        });

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
