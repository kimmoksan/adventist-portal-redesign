import type { MenuSection } from "@/types/content";

/** Full sitemap of adventist.or.kr as of 2026-11-16. Every item is reachable from the mega menu. */
export const MENU: MenuSection[] = [
  {
    label: "뉴스",
    slug: "news",
    description: "교단과 교회, 국제 재림교회 소식",
    items: [
      { label: "교회", slug: "church" },
      { label: "국제", slug: "world" },
      { label: "종교계", slug: "religion" },
      { label: "시사", slug: "current" },
      { label: "특별기획", slug: "feature" },
      { label: "기관", slug: "agency" },
      { label: "단체", slug: "group" },
      { label: "종합", slug: "general" },
      { label: "전체기사", slug: "all" },
      { label: "지면보기", slug: "paper" },
    ],
  },
  {
    label: "방송",
    slug: "broadcast",
    description: "예배·설교·교과해설과 어린이 방송",
    items: [
      { label: "예배", slug: "worship" },
      { label: "설교", slug: "sermon" },
      { label: "교과해설", slug: "lesson" },
      { label: "선교지소식", slug: "mission-news" },
      { label: "어린이", slug: "kids" },
      { label: "기획", slug: "special" },
      { label: "기도주일", slug: "prayer-week" },
      { label: "집회", slug: "meeting" },
      { label: "찬양", slug: "praise" },
      { label: "공연", slug: "concert" },
      { label: "홍보", slug: "promo" },
      { label: "지역교회설교", slug: "local-sermon" },
      { label: "강의", slug: "lecture" },
    ],
  },
  {
    label: "신앙",
    slug: "faith",
    description: "성경, 찬미가, 교과, 기도력과 출판물",
    items: [
      { label: "성경", slug: "bible" },
      { label: "찬미", slug: "hymn" },
      { label: "예언의 신", slug: "spirit-of-prophecy" },
      { label: "기도력", slug: "devotional" },
      { label: "교과", slug: "lesson" },
      { label: "월간지", slug: "magazine" },
      { label: "단행본", slug: "books" },
      { label: "채널", slug: "channel" },
      { label: "성경필사", slug: "transcribe" },
      { label: "커뮤니티", slug: "community" },
    ],
  },
  {
    label: "선교",
    slug: "mission",
    description: "함께 나누는 디지털 선교 콘텐츠",
    items: [
      { label: "일상형 콘텐츠", slug: "daily" },
      { label: "신앙형 콘텐츠", slug: "faith" },
      { label: "동영상 콘텐츠", slug: "video" },
      { label: "디지털 전도지", slug: "tract" },
      { label: "사용자 콘텐츠", slug: "user" },
      { label: "디자인 리소스", slug: "design" },
    ],
  },
  {
    label: "성경공부",
    slug: "study",
    description: "온라인 강의와 성경통신학교",
    items: [
      { label: "스마트북", slug: "smartbook" },
      { label: "전체 강의", slug: "all" },
      { label: "인기 강의", slug: "popular" },
      { label: "최신 강의", slug: "latest" },
      { label: "청소년·어린이", slug: "youth" },
      { label: "서적 신청", slug: "books" },
      { label: "온라인 성경 공부", slug: "online" },
    ],
  },
  {
    label: "지역교회",
    slug: "church",
    description: "전국 지역교회의 소식",
    items: [{ label: "지역교회 소식", slug: "news" }],
  },
  {
    label: "한국연합회",
    slug: "union",
    description: "제칠일안식일예수재림교 한국연합회",
    items: [
      { label: "각 부 행사", slug: "department-events" },
      { label: "교회 및 기관 행사", slug: "events" },
      { label: "의사록", slug: "minutes" },
      { label: "연합회에 바란다", slug: "feedback" },
      { label: "연합회장 청원", slug: "petition" },
      { label: "한국연합회 메타버스", slug: "metaverse" },
      { label: "조직 및 연락처", slug: "organization" },
      { label: "교회주소록", slug: "directory" },
      { label: "재림교회 CI", slug: "identity" },
    ],
  },
  {
    label: "커뮤니티",
    slug: "community",
    description: "공지, 공감기도와 성도 게시판",
    items: [
      { label: "공지사항", slug: "notice" },
      { label: "공감기도", slug: "prayer" },
      { label: "게시판", slug: "board" },
      { label: "자료실", slug: "library" },
      { label: "토론방", slug: "forum" },
      { label: "구인", slug: "jobs" },
      { label: "구직", slug: "seekers" },
      { label: "부동산", slug: "realestate" },
      { label: "알뜰시장", slug: "market" },
      { label: "교우사업체", slug: "business" },
      { label: "결혼/중매", slug: "marriage" },
      { label: "부고", slug: "obituary" },
    ],
  },
];

export function menuHref(section: string, item?: string) {
  return item ? `/${section}/${item}/` : `/${section}/`;
}

export function findMenu(section: string, item?: string) {
  const s = MENU.find((m) => m.slug === section);
  return { section: s, item: s?.items.find((i) => i.slug === item) };
}
