"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

type LenisLike = { scrollTo: (target: number | HTMLElement, opts?: Record<string, unknown>) => void; resize?: () => void; destroy?: () => void };
declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Scroll contract for route changes (see tests/scroll.spec.ts):
//  - a link or menu navigation to a new route lands at the very top, instantly;
//  - back / forward is left to the browser and Next, which restore the previous position;
//  - same-page hash links scroll smoothly to the section (the header offset comes from scroll-padding-top).
// There is deliberately no `scroll-behavior: smooth` in the CSS: Next 16 no longer switches it off during
// navigation, so the jump to the top became an animation that other scripts could interrupt half way.
export function ScrollManager() {
  const pathname = usePathname();
  const isPop = useRef(false);
  const first = useRef(true);

  useEffect(() => {
    const onPop = () => {
      isPop.current = true;
    };
    window.addEventListener("popstate", onPop);

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || window.__lenis) return; // with Lenis running, Lenis handles anchors itself
      const id = decodeURIComponent(a.getAttribute("href")!.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.pushState(history.state, "", `#${id}`);
    };
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("click", onClick);
    };
  }, []);

  useIsoLayoutEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (isPop.current) {
      isPop.current = false;
      return;
    }
    const hash = window.location.hash ? document.getElementById(decodeURIComponent(window.location.hash.slice(1))) : null;
    if (hash) {
      hash.scrollIntoView({ behavior: "auto", block: "start" });
      return;
    }
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
