import type { NewsArticle, NewsCategory, Notice } from "@/types/content";
import { PHOTOS } from "./photos";

const SAMPLE_BODY = (topic: string) => [
  `${topic}에 관한 기사의 샘플 본문입니다. 실제 기사는 재림마을 뉴스에서 확인하실 수 있습니다.`,
  "이 단락은 기사 본문의 길이와 읽기 흐름을 보여 주기 위한 예시 문장입니다. 한 줄에 너무 많은 글자가 들어가지 않도록 본문 폭을 제한하고, 줄 간격을 넉넉하게 두어 오래 읽어도 눈이 피로하지 않게 했습니다.",
  "관계자 인터뷰, 행사 일정, 참여 방법 같은 구체적인 내용이 이 자리에 들어갑니다.",
];

/** Titles and categories are real headlines from adventist.or.kr (2026-11-16). Bodies are samples. */
export const NEWS: NewsArticle[] = [
  {
    id: "sda-edu-laroche-mou",
    title: "SDA교육, 美 라로슈대학과 MOU 체결",
    category: "교회",
    date: "2026-11-16",
    summary: "삼육교육이 미국 라로슈대학과 교류 협약을 맺고 학생 교류와 공동 프로그램을 추진합니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.smallGroup,
    body: SAMPLE_BODY("삼육교육과 라로슈대학의 협약"),
  },
  {
    id: "nsd-370k-members",
    title: "북아태지회 교인 37만 명 눈앞 ... 침례자 33% ↑",
    category: "국제",
    date: "2026-11-15",
    summary: "북아시아태평양지회 연례행정위원회 보고에서 올해 침례자 수가 전년보다 크게 늘었다는 소식이 전해졌습니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.children,
    body: SAMPLE_BODY("북아태지회 연례 보고"),
  },
  {
    id: "digital-mission-week-2026",
    title: "한국연합회, ‘2026 디지털미션위크’ 개최 예정",
    category: "교회",
    date: "2026-11-14",
    summary: "11월 15일부터 21일까지 ‘새로운 세상, 함께 전해요’를 주제로 디지털미션위크가 열립니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.hands,
    body: SAMPLE_BODY("2026 디지털미션위크"),
  },
  {
    id: "sda-edu-konexion",
    title: "SDA교육 KONEXION, 글로벌 교육망 확대",
    category: "교회",
    date: "2026-11-16",
    summary: "삼육교육 국제 교류망 KONEXION이 참여 학교를 넓혀 갑니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.smallGroup,
    body: SAMPLE_BODY("KONEXION 교육망 확대"),
  },
  {
    id: "sahmyook-foods-revival",
    title: "삼육식품, 이정완 목사 초청 ‘직원 신앙부흥회’",
    category: "기관",
    date: "2026-11-16",
    summary: "삼육식품이 임직원을 대상으로 신앙부흥회를 열었습니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.sanctuary,
    body: SAMPLE_BODY("삼육식품 직원 신앙부흥회"),
  },
  {
    id: "annual-council-closing",
    title: "연례행정위 폐회 ... 재정교역자 인사관리 규정 신설",
    category: "시사",
    date: "2026-11-15",
    summary: "연례행정위원회가 폐회하며 재정교역자 인사관리 규정을 새로 마련했습니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.bible,
    body: SAMPLE_BODY("연례행정위원회 결의"),
  },
  {
    id: "creation-insight",
    title: "‘Creation Insight’ 창조신앙지도자 과정 수강생 모집",
    category: "종교계",
    date: "2026-11-14",
    summary: "창조신앙지도자 양성 과정 ‘Creation Insight’가 수강생을 모집합니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.community,
    body: SAMPLE_BODY("창조신앙지도자 과정"),
  },
  {
    id: "seoul-sahmyook-mukdong",
    title: "서울삼육고, 묵동교회를 찾아가다: 대입 변화에 발맞춰 가는 삼육교육",
    category: "교회",
    date: "2026-11-13",
    summary: "서울삼육고가 묵동교회를 찾아 학부모와 함께 대입 변화와 삼육교육을 나눴습니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.smallGroup,
    body: SAMPLE_BODY("서울삼육고 교회 방문 설명회"),
  },
  {
    id: "seoul-sahmyook-masil",
    title: "서울삼육고 학교 카페 동아리 '마실:터', 2년째 이웃 어르신께 삼육두유 나눔",
    category: "교회",
    date: "2026-11-13",
    summary: "학교 카페 동아리 학생들이 이웃 어르신께 두유를 전하는 나눔을 이어 가고 있습니다.",
    author: "재림마을 뉴스센터",
    photo: PHOTOS.hands,
    body: SAMPLE_BODY("마실:터 동아리 나눔"),
  },
];

export const NEWS_CATEGORIES: Array<"전체" | NewsCategory> = ["전체", "교회", "국제", "종교계", "시사"];

export function newsByCategory(category: "전체" | NewsCategory) {
  return category === "전체" ? NEWS : NEWS.filter((n) => n.category === category);
}

export function getArticle(id: string) {
  return NEWS.find((n) => n.id === id);
}

export const NOTICES: Notice[] = [
  { id: "n1", title: "2026 디지털 미션위크 #AllThingsNew", date: "2026-11-16", href: "/community/notice/" },
  { id: "n2", title: "OneVoice27 홍보 영상", date: "2026-11-13", href: "/broadcast/" },
  { id: "n3", title: "제37회기 한국연합회 선교전략", date: "2026-11-12", href: "/union/" },
];

export const EVENTS: Notice[] = [
  { id: "e1", title: "디지털선교 강조 안식일", date: "2026-11-21", href: "/union/department-events/" },
  { id: "e2", title: "2026 세계 북한선교 기도 안식일", date: "2026-11-28", href: "/union/department-events/" },
  { id: "e3", title: "창조신앙지도자 과정 수강생 모집", date: "2026-11-30", href: articleHref("creation-insight") },
];

/** Articles live under /news/article/ so /news/<category>/ stays free for the menu's category pages. */
export function articleHref(id: string) {
  return `/news/article/${id}/`;
}
