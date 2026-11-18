"use client";

import { useEffect, useSyncExternalStore } from "react";

// Temporary: compare the three hero looks on the preview. Not rendered on the live site. Remove once one is chosen.
const KEY = "hero-variant";
const options = ["1", "2", "3"];
const listeners = new Set<() => void>();

const read = () => {
  try {
    const v = window.localStorage.getItem(KEY);
    return v && options.includes(v) ? v : "1";
  } catch {
    return "1";
  }
};

const subscribe = (fn: () => void) => {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
};

export function HeroSwitch() {
  const variant = useSyncExternalStore(subscribe, read, () => null);

  useEffect(() => {
    if (variant) document.querySelector<HTMLElement>("[data-hero]")?.setAttribute("data-hero", variant);
  }, [variant]);

  if (process.env.NEXT_PUBLIC_SITE_LIVE === "1" || !variant) return null;

  const pick = (v: string) => {
    try {
      window.localStorage.setItem(KEY, v);
    } catch {
      // private mode: the choice just isn't remembered
    }
    listeners.forEach((fn) => fn());
  };

  return (
    <div
      className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-1 rounded-full bg-papir p-1 text-smola shadow-[0_10px_30px_-10px_rgb(0_0_0/0.6)]"
      role="group"
      data-temp=""
      aria-label="Izbira videza naslovne fotografije (začasno)"
    >
      <span className="px-3 text-[0.8125rem] font-semibold">Slika</span>
      {options.map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => pick(v)}
          aria-pressed={variant === v}
          className="grid h-9 w-9 place-items-center rounded-full text-[0.95rem] font-bold aria-pressed:bg-smola aria-pressed:text-papir"
        >
          {v}
        </button>
      ))}
    </div>
  );
}
