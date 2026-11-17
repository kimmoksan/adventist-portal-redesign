"use client";

import { useId, useRef } from "react";
import { cn } from "@/lib/utils";

type Props<T extends string> = {
  label: string;
  tabs: readonly T[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
};

/**
 * WAI-ARIA tabs with roving tabindex: arrow keys, Home and End move between tabs.
 * The panel below is rendered by the caller with role="tabpanel".
 */
export function Tabs<T extends string>({ label, tabs, value, onChange, className }: Props<T>) {
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function move(index: number) {
    const next = (index + tabs.length) % tabs.length;
    onChange(tabs[next]);
    refs.current[next]?.focus();
  }

  return (
    <div role="tablist" aria-label={label} className={cn("flex gap-1 overflow-x-auto border-b border-line", className)}>
      {tabs.map((tab, i) => {
        const selected = tab === value;
        return (
          <button
            key={tab}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${base}-tab-${i}`}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab)}
            onKeyDown={(e) => {
              if (e.key === "ArrowRight") move(i + 1);
              else if (e.key === "ArrowLeft") move(i - 1);
              else if (e.key === "Home") move(0);
              else if (e.key === "End") move(tabs.length - 1);
              else return;
              e.preventDefault();
            }}
            className={cn(
              "min-h-12 shrink-0 border-b-[3px] px-4 whitespace-nowrap transition-colors max-sm:flex-1 max-sm:px-3",
              selected ? "border-navy font-bold text-navy" : "border-transparent text-muted hover:text-ink",
            )}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
