"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Auto-advancing index for carousels and rotating lists.
 *
 * Pauses when the user pauses, while the pointer or focus is inside the region,
 * while the tab is hidden, and always under prefers-reduced-motion.
 * `bind` spreads the hover/focus handlers onto the region element.
 */
export function useRotation(count: number, intervalMs: number) {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  // Bumps on every manual or automatic change so CSS progress bars restart.
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      mq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const paused = userPaused || interacting || hidden || reducedMotion || count < 2;

  const go = useCallback(
    (next: number) => {
      setIndex(((next % count) + count) % count);
      setCycle((c) => c + 1);
    },
    [count],
  );

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), intervalMs);
    return () => clearTimeout(t);
  }, [paused, index, cycle, intervalMs, go]);

  // On resume the timer starts over, so restart the progress bar with it.
  useEffect(() => {
    if (!paused) setCycle((c) => c + 1);
  }, [paused]);

  // Reset when the item set changes (e.g. switching news tabs)
  useEffect(() => {
    setIndex(0);
    setCycle((c) => c + 1);
  }, [count]);

  const bind = {
    onMouseEnter: () => setInteracting(true),
    onMouseLeave: () => setInteracting(false),
    onFocus: () => setInteracting(true),
    onBlur: (e: React.FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setInteracting(false);
    },
  };

  return {
    index,
    cycle,
    paused,
    userPaused: userPaused || reducedMotion,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    togglePause: () => setUserPaused((p) => !p),
    bind,
  };
}
