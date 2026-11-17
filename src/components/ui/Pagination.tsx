"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Client-side pagination (the site is a static export, so pages are sliced in the browser). */
export function Pagination({ page, total, onChange }: { page: number; total: number; onChange: (page: number) => void }) {
  if (total <= 1) return null;
  const pages = Array.from({ length: total }, (_, i) => i + 1);
  const btn = "grid size-12 place-items-center rounded border";
  return (
    <nav aria-label="페이지" className="mt-8 flex items-center justify-center gap-1.5">
      <button type="button" className={cn(btn, "border-line disabled:opacity-40")} onClick={() => onChange(page - 1)} disabled={page === 1} aria-label="이전 페이지">
        <ChevronLeft className="size-5" strokeWidth={1.75} />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          aria-label={`${p}페이지`}
          className={cn(btn, "tabular", p === page ? "border-navy bg-navy font-bold text-white" : "border-line hover:bg-soft")}
        >
          {p}
        </button>
      ))}
      <button type="button" className={cn(btn, "border-line disabled:opacity-40")} onClick={() => onChange(page + 1)} disabled={page === total} aria-label="다음 페이지">
        <ChevronRight className="size-5" strokeWidth={1.75} />
      </button>
    </nav>
  );
}
