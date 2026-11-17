import type { Photo } from "@/types/content";

/**
 * The content set is a snapshot of adventist.or.kr on 2026-11-16, so "today"
 * is pinned to that date instead of the visitor's clock.
 */
export const CONTENT_TODAY = "2026-11-16";

export function unsplash(photo: Photo, width: number) {
  return `https://images.unsplash.com/photo-${photo.id}?w=${width}&q=80&auto=format&fit=crop`;
}

/** "2026-11-16" -> "2026.11.16" */
export function formatDate(iso: string) {
  return iso.replaceAll("-", ".");
}

/** "2026-11-16" -> "11.16" */
export function formatShortDate(iso: string) {
  return iso.slice(5).replace("-", ".");
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

/** Weekday of a calendar date, independent of the runtime's timezone. */
export function weekdayOf(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
