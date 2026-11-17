"use client";

import { FONT_SIZES, useFontSize } from "@/components/providers/FontSizeProvider";
import { cn } from "@/lib/utils";

const GLYPH_SIZE = ["text-sm", "text-[1.0625rem]", "text-xl"];

export function FontSizeControl() {
  const { size, setSize } = useFontSize();
  return (
    <div role="group" aria-label="글자 크기" className="flex h-11 items-center rounded border border-line pl-2.5">
      <span className="mr-1 text-sm text-muted max-xl:hidden">글자</span>
      {FONT_SIZES.map((s, i) => (
        <button
          key={s.value}
          type="button"
          aria-pressed={size === s.value}
          aria-label={`글자 크기 ${s.label}`}
          onClick={() => setSize(s.value)}
          className={cn(
            "h-[2.625rem] min-w-10 font-bold transition-colors",
            GLYPH_SIZE[i],
            size === s.value ? "bg-navy text-white" : "text-text hover:bg-soft",
            i === FONT_SIZES.length - 1 && "rounded-r-[3px]",
          )}
        >
          가
        </button>
      ))}
    </div>
  );
}
