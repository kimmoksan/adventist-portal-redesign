"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="#main"
      aria-label="맨 위로 이동"
      tabIndex={show ? 0 : -1}
      className={cn(
        "fixed right-6 bottom-6 z-40 flex size-14 flex-col items-center justify-center rounded-full bg-navy text-xs font-bold text-white shadow-[0_4px_12px_rgba(17,28,39,0.25)] transition-[opacity,transform] duration-200 hover:bg-navy-deep max-sm:right-4 max-sm:bottom-4 max-sm:size-13",
        show ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0",
      )}
    >
      <ArrowUp className="size-5" strokeWidth={1.75} />
      위로
    </a>
  );
}
