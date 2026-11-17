import type { HeroSlide, LinkGroup, Photo, QuickService } from "@/types/content";
import { PHOTOS } from "./photos";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "mission-week",
    tabLabel: "디지털 미션위크",
    title: "2026 디지털\n미션위크",
    subtitle: "#AllThingsNew\n새로운 세상, 함께 전해요",
    meta: "11.15(일) ~ 11.21(토)",
    cta: { label: "자세히 보기", href: "/news/article/digital-mission-week-2026/" },
    photo: PHOTOS.sanctuary,
  },
  {
    id: "onevoice27",
    tabLabel: "OneVoice27",
    title: "OneVoice27\n홍보 영상",
    subtitle: "52주 챌린지 참여방법 안내",
    meta: "한국연합회 · 디지털선교부",
    cta: { label: "방송 보기", href: "/broadcast/" },
    photo: PHOTOS.community,
  },
  {
    id: "strategy",
    tabLabel: "선교전략",
    title: "제37회기 한국연합회\n선교전략",
    subtitle: "한국연합회의 선교 소식을 전합니다",
    meta: "한국연합회 · 선교 자료",
    cta: { label: "자세히 보기", href: "/union/" },
    photo: PHOTOS.smallGroup,
  },
];

export const QUICK_SERVICES: QuickService[] = [
  { label: "성경", caption: "개역한글 · 개역개정", href: "/faith/bible/", icon: "bible" },
  { label: "찬미가", caption: "번호로 바로 찾기", href: "/faith/hymn/", icon: "hymn" },
  { label: "안교교과", caption: "2026년 4기 8과", href: "/today/", icon: "lesson" },
  { label: "예언의 신", caption: "화잇 저작 전집", href: "/faith/spirit-of-prophecy/", icon: "spirit" },
  { label: "기도력", caption: "장년 · 어린이", href: "/today/", icon: "devotional" },
  { label: "교회주소록", caption: "전국 교회 · 기관", href: "/union/directory/", icon: "address" },
  { label: "성경공부 신청", caption: "온라인 · 통신", href: "/study/online/", icon: "study" },
  { label: "재림성경", caption: "주석과 함께 읽기", href: "/faith/bible/", icon: "commentary" },
];

export const MAGAZINES = [
  { magazine: "시조", title: "AI 시대의 소명", href: "/faith/magazine/" },
  { magazine: "가정과 건강", title: "고령층 낙상 주의보", href: "/faith/magazine/" },
  { magazine: "교회지남", title: "영남합회 제14기 SOS 청소년 선교사들의 도전과 성장", href: "/faith/magazine/" },
];

export const BOOKS = [
  { title: "세 천사의 기별", author: "엘렌 G. 화잇", kind: "전자책" },
  { title: "대쟁투 사관으로 읽는 다니엘서 새 연구", author: "신계훈", kind: "단행본" },
  { title: "나의 성경 친구들1(영한대역)", author: "에타 B. 데저링", kind: "전자책" },
];

export const COURSES: Array<{ title: string; description: string; photo: Photo; href: string }> = [
  { title: "말씀 향기", description: "세상의 누구보다 소중한 당신에게 생명의 등불을 비춰 드립니다.", photo: PHOTOS.bible, href: "/study/popular/" },
  { title: "다니엘서 연구", description: "당신의 영적 여정에 깊이와 통찰을 더해보세요.", photo: PHOTOS.smallGroup, href: "/study/popular/" },
  { title: "건강 새 출발", description: "건강한 삶을 열어갈 기회, 지금부터 시작해도 늦지 않아요.", photo: PHOTOS.community, href: "/study/popular/" },
];

export const MISSION_CONTENT = [
  { source: "한국연합회 디지털선교전략부", title: "답장 없던 3년, 그리고 “저 지금 교회에 나갑니다”", photo: PHOTOS.hands },
  { source: "호프채널 프레이즈", title: "[S soloist ensemble] God will take care of you 너 근심 걱정 말아라" },
  { source: "남대극 목사 성경 어휘연구", title: "199편 “매월 초하루와 매 안식일에”" },
  { source: "성경통신학교", title: "에덴동산에는 헬스장이 필요 없었습니다" },
];

export const LOCAL_CHURCH_NEWS = [
  { church: "마석교회", title: "뫼울림 정기 공연 참여" },
  { church: "답십리교회", title: "김장 140포기를 무사히 마쳤습니다" },
  { church: "공릉동교회", title: "건강 걷기 소그룹 26년도 마지막 모임" },
  { church: "원주하늘숲교회", title: "원주삼육초 글로리 오케스트라 정기연주회 안내" },
];

export const UNION_NEWS = [
  { department: "디지털선교부", title: "디지털선교 강조 안식일" },
  { department: "아드라", title: "이웃의 겨울, 김치와 식료품 한 상자로 든든하게 채워 주세요." },
  { department: "북한선교부", title: "2026 세계 북한선교 기도 안식일" },
];

export const PRAYER_OF_THE_DAY =
  "홀로 하나님이신 아버지, 감당하기 어려운 일을 주님 앞에 펼쳐 놓습니다. 우리를 건져 주시고, 그 일로 아버지의 이름이 드러나게 해 주세요.";

export const REGIONS = ["서울", "경기", "강원", "충청", "전라", "경상", "제주"];

export const LINK_GROUPS: LinkGroup[] = [
  {
    title: "기관·부서",
    links: [
      "안교·선교·보건부", "성경통신학교", "디지털선교부", "홍보부", "어린이부", "청소년·군봉사부",
      "여성전도·가정봉사부", "종교자유부", "출판전도·예언의신부", "성경연구소", "세계선교본부",
      "호프채널코리아", "재단법인", "학교법인", "복지법인", "아드라코리아",
    ].map((label) => ({ label, href: "/union/organization/" })),
  },
  {
    title: "합회",
    links: ["동중한합회", "서중한합회", "영남합회", "충청합회", "호남합회", "제주대회"].map((label) => ({ label, href: "/church/news/" })),
  },
  {
    title: "관련 서비스",
    links: [
      { label: "재림교회 이러닝센터", href: "/study/" },
      { label: "재림군인 등록", href: "/union/" },
      { label: "교회 찾기(네이버 지도)", href: "https://map.naver.com/p/search/재림교회" },
    ],
  },
];

export const SNS = ["블로그", "페이스북", "유튜브", "인스타그램", "카카오스토리", "네이버TV"];

export const FOOTER_LINKS = [
  "재림마을 소개", "운영센터", "서비스 약관", "배너광고 안내", "인터넷 윤리강령", "이메일주소 무단수집 거부",
];

export const ORG = {
  name: "제칠일안식일예수재림교 한국연합회",
  registration: "204-82-62040",
  representative: "남수명",
  phone: "02-3299-5294",
};
