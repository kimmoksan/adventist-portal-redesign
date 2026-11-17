import { MENU } from "@/data/menu";
import type { BroadcastCategory } from "@/types/content";

export const broadcastMenu = MENU.find((section) => section.slug === "broadcast")!;

export const broadcastCategories: Record<string, BroadcastCategory | undefined> = {
  worship: "예배",
  sermon: "설교",
  lesson: "교과해설",
  "mission-news": "선교지소식",
  kids: "어린이",
  special: "기획",
  praise: "찬양",
  lecture: "강의",
};

export function categoryMenuItem(category: BroadcastCategory) {
  return broadcastMenu.items.find((item) => broadcastCategories[item.slug] === category)!;
}
