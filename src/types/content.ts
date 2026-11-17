/**
 * Content model for the 재림마을 portal.
 * Mock data in src/data follows these types so a CMS or API can replace it
 * without touching components.
 */

export type Photo = {
  /** Unsplash photo id, e.g. "1519491050282-cf00c82424b4" */
  id: string;
  alt: string;
};

export type MenuItem = { label: string; slug: string };

export type MenuSection = {
  label: string;
  slug: string;
  description: string;
  items: MenuItem[];
};

export type NewsCategory = "교회" | "국제" | "종교계" | "시사" | "특별기획" | "기관" | "단체" | "종합";

export type NewsArticle = {
  id: string;
  title: string;
  category: NewsCategory;
  /** ISO date, e.g. "2026-11-16" */
  date: string;
  summary: string;
  author: string;
  photo: Photo;
  /** Paragraphs. Synthetic sample text. */
  body: string[];
};

export type Notice = { id: string; title: string; date: string; href: string };

export type BroadcastCategory = "예배" | "설교" | "교과해설" | "선교지소식" | "어린이" | "찬양" | "기획" | "강의";

export type Broadcast = {
  id: string;
  title: string;
  speaker?: string;
  program: string;
  category: BroadcastCategory;
  date: string;
  /** "42:18" */
  duration: string;
  photo: Photo;
  description: string;
};

export type DailyReading = {
  date: string;
  weekday: string;
  lesson: {
    quarter: string;
    number: number;
    title: string;
    dayTitle: string;
  };
  adultDevotional: string;
  childDevotional: string;
  verse: { ref: string; text: string };
};

export type BoardKey = "notice" | "prayer" | "jobs" | "seekers" | "market" | "realestate" | "business" | "marriage" | "obituary";

export type BoardPost = {
  id: string;
  board: BoardKey;
  title: string;
  tag?: string;
  date: string;
  author: string;
  views: number;
  body: string[];
};

export type Board = { key: BoardKey; label: string; description: string };

export type QuickService = { label: string; caption: string; href: string; icon: QuickServiceIcon };

export type QuickServiceIcon = "bible" | "hymn" | "lesson" | "spirit" | "devotional" | "address" | "study" | "commentary";

export type HeroSlide = {
  id: string;
  tabLabel: string;
  title: string;
  subtitle: string;
  meta: string;
  cta: { label: string; href: string };
  photo: Photo;
};

export type LinkGroup = { title: string; links: { label: string; href: string }[] };
