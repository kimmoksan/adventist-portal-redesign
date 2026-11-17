import type { Board, BoardKey, BoardPost } from "@/types/content";

export const BOARDS: Board[] = [
  { key: "notice", label: "공지사항", description: "재림마을과 한국연합회의 공지" },
  { key: "prayer", label: "공감기도", description: "기도 제목을 나누고 함께 기도합니다" },
  { key: "jobs", label: "구인", description: "교우 기관과 사업체의 채용 소식" },
  { key: "seekers", label: "구직", description: "일자리를 찾는 성도의 글" },
  { key: "market", label: "알뜰시장", description: "성도 간 나눔과 중고 거래" },
  { key: "realestate", label: "부동산", description: "매매·임대 정보" },
  { key: "business", label: "교우사업체", description: "성도가 운영하는 사업체 소개" },
  { key: "marriage", label: "결혼/중매", description: "믿음의 동반자를 찾는 글" },
  { key: "obituary", label: "부고", description: "삼가 고인의 명복을 빕니다" },
];

const SAMPLE = ["샘플 게시글 본문입니다. 실제 게시판의 글이 이 자리에 표시됩니다."];

/** Titles from adventist.or.kr (2026-11-16). Authors, views and bodies are samples. */
export const POSTS: BoardPost[] = [
  { id: "notice-1", board: "notice", title: "2026 디지털 미션위크 #AllThingsNew 안내", date: "2026-11-16", author: "운영센터", views: 1204, body: SAMPLE },
  { id: "notice-2", board: "notice", title: "제37회기 한국연합회 선교전략", date: "2026-11-12", author: "운영센터", views: 892, body: SAMPLE },
  { id: "prayer-1", board: "prayer", title: "홀로 하나님이신 아버지, 감당하기 어려운 일을 주님 앞에 펼쳐 놓습니다", date: "2026-11-16", author: "익명", views: 341, body: ["홀로 하나님이신 아버지, 감당하기 어려운 일을 주님 앞에 펼쳐 놓습니다. 우리를 건져 주시고, 그 일로 아버지의 이름이 드러나게 해 주세요. 오늘 우리 가족의 하루가 하나님이 살아 계심을 보여 주는 하루가 되기를 원합니다. 예수님의 이름으로 기도합니다. 아멘."] },
  { id: "jobs-1", board: "jobs", tag: "공공기관", title: "물리치료사 및 작업치료사", date: "2026-11-16", author: "샘플", views: 210, body: SAMPLE },
  { id: "jobs-2", board: "jobs", tag: "교육·학원", title: "삼육보건대학교 간호학부 조교 채용 공고", date: "2026-11-15", author: "샘플", views: 388, body: SAMPLE },
  { id: "jobs-3", board: "jobs", tag: "기타", title: "사회복지생활시설 조리사", date: "2026-11-14", author: "샘플", views: 97, body: SAMPLE },
  { id: "jobs-4", board: "jobs", tag: "기타", title: "힐링센터 숙소청소", date: "2026-11-13", author: "샘플", views: 64, body: SAMPLE },
  { id: "seekers-1", board: "seekers", tag: "일반기업체", title: "일자리 구합니다", date: "2026-11-16", author: "샘플", views: 88, body: SAMPLE },
  { id: "seekers-2", board: "seekers", tag: "방송·문화", title: "SNS 광고, 퍼포먼스 마케터 및 PD 입니다.", date: "2026-11-15", author: "샘플", views: 120, body: SAMPLE },
  { id: "seekers-3", board: "seekers", tag: "개인사업자", title: "열쇠가게를 운영하실 분을 찾습니다", date: "2026-11-14", author: "샘플", views: 73, body: SAMPLE },
  { id: "market-1", board: "market", title: "(새상품) 실링 벌집꿀 선물세트", date: "2026-11-16", author: "샘플", views: 156, body: SAMPLE },
  { id: "market-2", board: "market", title: "서리태와 들깨", date: "2026-11-15", author: "샘플", views: 132, body: SAMPLE },
  { id: "market-3", board: "market", title: "코팅 책갈피", date: "2026-11-14", author: "샘플", views: 45, body: SAMPLE },
  { id: "realestate-1", board: "realestate", title: "서울 성북구 장위동 매물", date: "2026-11-15", author: "샘플", views: 77, body: SAMPLE },
  { id: "marriage-1", board: "marriage", title: "안식일을 지키며 좋은 사람과 함께하고 싶습니다", date: "2026-11-14", author: "샘플", views: 260, body: SAMPLE },
  { id: "obituary-1", board: "obituary", title: "故 강관구 장로", date: "2026-11-16", author: "운영센터", views: 512, body: SAMPLE },
];

export function postsOf(board: BoardKey) {
  return POSTS.filter((p) => p.board === board);
}

export function getBoard(key: string) {
  return BOARDS.find((b) => b.key === key);
}

export function getPost(id: string) {
  return POSTS.find((p) => p.id === id);
}

/** Boards shown as tabs on the home page */
export const HOME_BOARDS: BoardKey[] = ["jobs", "seekers", "market", "obituary"];

/**
 * Boards grouped by what they are for. The group decides the list layout, not the color:
 * notices get a 공지 badge, prayer and fellowship boards read as cards with an excerpt,
 * life-info boards stay a dense table, and 부고 stays quiet in gray.
 */
export type BoardKind = "notice" | "fellowship" | "life" | "condolence";

export const BOARD_KIND: Record<BoardKey, BoardKind> = {
  notice: "notice",
  obituary: "condolence",
  prayer: "fellowship",
  marriage: "fellowship",
  jobs: "life",
  seekers: "life",
  realestate: "life",
  market: "life",
  business: "life",
};

export const BOARD_GROUPS: Array<{ title: string; description: string; keys: BoardKey[] }> = [
  { title: "알림", description: "공지와 부고", keys: ["notice", "obituary"] },
  { title: "기도와 교제", description: "마음을 나누는 게시판", keys: ["prayer", "marriage"] },
  { title: "생활 정보", description: "일자리 · 거래 · 사업체", keys: ["jobs", "seekers", "realestate", "market", "business"] },
];

/** Badge shown before a title when the post itself has no category tag. */
export function boardBadge(key: BoardKey): { label: string; tone: "solid" | "muted" } | null {
  if (key === "notice") return { label: "공지", tone: "solid" };
  if (key === "obituary") return { label: "부고", tone: "muted" };
  return null;
}
