// "full" or "lite" effects, decided once per visit and kept in sessionStorage.
// lite: no 3D honeycomb (the SVG comb shows), honey drips drawn but still, no smooth scroll, no tilt / magnetic buttons /
// cursor dot. Bees and the page transition stay (they only move layers).
// Decided from what the device says (Save-Data, ≤2 CPU cores, ≤2 GB memory) and, if that looks fine, from a short
// measurement of real frame times. Motion.tsx also watches scrolling and switches to lite if it keeps stuttering.
// ?quality=lite or ?quality=full in the URL forces a mode (for testing).

export type Quality = "full" | "lite";

const KEY = "quality";
export const LITE_EVENT = "quality:lite";

type Nav = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };

function weakDevice() {
  const nav = navigator as Nav;
  return Boolean(nav.connection?.saveData) || (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
}

function measure(frames = 30): Promise<number> {
  return new Promise((resolve) => {
    const gaps: number[] = [];
    let last = performance.now();
    const tick = (t: number) => {
      gaps.push(t - last);
      last = t;
      if (gaps.length < frames) requestAnimationFrame(tick);
      else {
        const sorted = gaps.slice(3).sort((a, b) => a - b);
        resolve(sorted[Math.floor(sorted.length / 2)]);
      }
    };
    requestAnimationFrame(tick);
  });
}

export function setQuality(q: Quality) {
  document.documentElement.dataset.quality = q;
  try {
    window.sessionStorage.setItem(KEY, q);
  } catch {
    // storage blocked: decided again on the next page
  }
  if (q === "lite") window.dispatchEvent(new Event(LITE_EVENT));
}

let pending: Promise<Quality> | null = null;

export function detectQuality(): Promise<Quality> {
  if (pending) return pending;
  pending = (async () => {
    const forced = new URLSearchParams(window.location.search).get("quality");
    let q: Quality | null = forced === "lite" || forced === "full" ? forced : null;
    if (!q) {
      try {
        const saved = window.sessionStorage.getItem(KEY);
        if (saved === "lite" || saved === "full") q = saved;
      } catch {
        // no storage: measure
      }
    }
    if (!q) q = weakDevice() ? "lite" : (await measure()) > 22 ? "lite" : "full";
    document.documentElement.dataset.quality = q;
    try {
      window.sessionStorage.setItem(KEY, q);
    } catch {
      // ignore
    }
    return q;
  })();
  return pending;
}
