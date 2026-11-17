import { MENU, menuHref } from "@/data/menu";
import { NEWS } from "@/data/news";
import type { NewsCategory } from "@/types/content";

export const newsMenu = MENU.find((section) => section.slug === "news")!;

export const categoryBySlug: Record<string, NewsCategory | undefined> = {
  church: "교회",
  world: "국제",
  religion: "종교계",
  current: "시사",
  feature: "특별기획",
  agency: "기관",
  group: "단체",
  general: "종합",
};

// Copy before sorting so other pages retain the source data's order.
// Stable sorting preserves the editorial order of articles with the same date.
export const latestNews = [...NEWS].sort((a, b) => b.date.localeCompare(a.date));

export function categoryHref(category: NewsCategory) {
  const slug = Object.keys(categoryBySlug).find((key) => categoryBySlug[key] === category);
  return menuHref("news", slug ?? "all");
}
