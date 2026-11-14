"use client";

import { useEffect, useSyncExternalStore } from "react";

// TEMPORARY (remove before launch, see vault/todo.md): lets Tadej flip between the three hero photo candidates.
// The choice is kept in this browser only. Once he picks, keep that photo in Hero.tsx and delete this file,
// the two unused <Photo> blocks and the `[data-hero-choice]` rules in globals.css.
const KEY = "vidovic-hero-photo";
const EVENT = "vidovic-hero-photo";

const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  window.addEventListener(EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVENT, cb);
  };
};
const read = () => Number(window.localStorage.getItem(KEY)) || 1;

export function HeroPhotoSwitch({ count, labels }: { count: number; labels: string[] }) {
  const stored = useSyncExternalStore(subscribe, read, () => 1);
  const choice = stored >= 1 && stored <= count ? stored : 1;

  useEffect(() => {
    document.querySelector("[data-hero-choice]")?.setAttribute("data-hero-choice", String(choice));
  }, [choice]);

  return (
    <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-smola/80 p-1 text-[0.75rem] font-bold text-vosek backdrop-blur" role="group" aria-label="Začasno: izbira slike">
      <span className="px-2 opacity-80">Slika</span>
      {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
        <button
          key={n}
          type="button"
          aria-pressed={choice === n}
          aria-label={`Slika ${n}: ${labels[n - 1]}`}
          title={labels[n - 1]}
          onClick={() => {
            window.localStorage.setItem(KEY, String(n));
            window.dispatchEvent(new Event(EVENT));
          }}
          className="grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 ease-[var(--ease-ui)] aria-pressed:bg-med aria-pressed:text-smola"
        >
          {n}
        </button>
      ))}
    </div>
  );
}
