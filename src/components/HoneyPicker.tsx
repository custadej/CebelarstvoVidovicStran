"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Tab = { slug: string; label: string; color: string };

// Accessible tabs (roving tabindex, arrow keys, Home/End). Panels are rendered on the server and passed in,
// so all six honeys are in the HTML; only the selected one is shown.
export function HoneyPicker({ tabs, panels, initial = 0 }: { tabs: Tab[]; panels: ReactNode[]; initial?: number }) {
  const [active, setActive] = useState(initial);
  const id = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const go = (i: number) => {
    const next = (i + tabs.length) % tabs.length;
    setActive(next);
    refs.current[next]?.focus();
    refs.current[next]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") go(active + 1);
    else if (e.key === "ArrowLeft") go(active - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(tabs.length - 1);
    else return;
    e.preventDefault();
  };

  return (
    <>
      <div role="tablist" aria-label="Vrste medu" className="rail -mx-6 px-6 md:mx-0 md:flex-wrap md:px-0">
        {tabs.map((t, i) => (
          <button
            key={t.slug}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${t.slug}`}
            aria-selected={i === active}
            aria-controls={`${id}-panel-${t.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="tab"
            onClick={() => setActive(i)}
            onKeyDown={onKey}
          >
            <span aria-hidden="true" className="hex h-4 w-3.5 flex-none" style={{ background: t.color, boxShadow: "inset 0 0 0 1px rgb(255 255 255 / .3)" }} />
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, i) => (
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
    </>
  );
}
