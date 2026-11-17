"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export const FONT_SIZES = [
  { value: "100", label: "보통" },
  { value: "112.5", label: "크게" },
  { value: "125", label: "아주 크게" },
] as const;

export type FontSize = (typeof FONT_SIZES)[number]["value"];

const STORAGE_KEY = "jm-font-size";

type Ctx = { size: FontSize; setSize: (s: FontSize) => void };
const FontSizeContext = createContext<Ctx | null>(null);

function isFontSize(v: string | null): v is FontSize {
  return FONT_SIZES.some((s) => s.value === v);
}

/**
 * Root font scale for the whole site. Every size in the UI is in rem,
 * so changing the root size scales text, spacing and touch targets together.
 */
export function FontSizeProvider({ children }: { children: React.ReactNode }) {
  const [size, setSizeState] = useState<FontSize>("100");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isFontSize(saved)) setSizeState(saved);
    } catch {
      /* storage blocked: keep default */
    }
  }, []);

  const setSize = useCallback((s: FontSize) => {
    setSizeState(s);
    document.documentElement.style.fontSize = `${s}%`;
    try {
      localStorage.setItem(STORAGE_KEY, s);
    } catch {
      /* storage blocked: setting still applies for this visit */
    }
  }, []);

  return <FontSizeContext.Provider value={{ size, setSize }}>{children}</FontSizeContext.Provider>;
}

export function useFontSize() {
  const ctx = useContext(FontSizeContext);
  if (!ctx) throw new Error("useFontSize must be used inside FontSizeProvider");
  return ctx;
}

/** Inline script for <head>: applies the saved size before first paint so text never jumps. */
export const fontSizeBootScript = `try{var s=localStorage.getItem("${STORAGE_KEY}");if(s==="112.5"||s==="125")document.documentElement.style.fontSize=s+"%"}catch(e){}`;
