import type { Photo } from "@/types/content";

/** Licensed stand-in photography (Unsplash License). Replace with the church's own photos. */
export const PHOTOS = {
  sanctuary: { id: "1519491050282-cf00c82424b4", alt: "나무 장의자와 창으로 빛이 들어오는 예배당" },
  community: { id: "1511632765486-a01980e01a18", alt: "노을 진 언덕에서 어깨동무한 사람들" },
  smallGroup: { id: "1529070538774-1843cb3265df", alt: "책을 펼치고 함께 배우는 소그룹" },
  bible: { id: "1504052434569-70ad5836ab65", alt: "손에 든 펼친 성경" },
  children: { id: "1509099836639-18ba1795216d", alt: "환하게 웃는 아이들" },
  hands: { id: "1544027993-37dbfe43562a", alt: "서로를 향해 내미는 두 손" },
} satisfies Record<string, Photo>;
