import type { Broadcast } from "@/types/content";
import { PHOTOS } from "./photos";

/** Titles, speakers and programs from adventist.or.kr (2026-11-16). Durations and descriptions are samples. */
export const BROADCASTS: Broadcast[] = [
  {
    id: "lesson-8-interpretation",
    title: "8과 예언 기록의 해석",
    speaker: "박정규 목사",
    program: "2026년 장년 안교교과 해설 방송",
    category: "교과해설",
    date: "2026-11-15",
    duration: "28:42",
    photo: PHOTOS.bible,
    description: "이번 주 장년 안교교과 8과를 요일별로 풀어 주는 해설 방송입니다.",
  },
  {
    id: "who-to-meet",
    title: "누구를 만나야 할까?",
    speaker: "정영수 목사",
    program: "안식일 예배 설교",
    category: "설교",
    date: "2026-11-14",
    duration: "36:15",
    photo: PHOTOS.sanctuary,
    description: "안식일 예배 설교 영상입니다.",
  },
  {
    id: "onevoice27-byeollae",
    title: "[OneVoice27 주제가 콘테스트] 별내행복교회 - 마할랄렐",
    program: "OneVoice27 주제가 콘테스트",
    category: "찬양",
    date: "2026-11-13",
    duration: "04:32",
    photo: PHOTOS.community,
    description: "OneVoice27 주제가 콘테스트 참가 영상입니다.",
  },
  {
    id: "kids-298",
    title: "298화 몹시 분주한 밤",
    program: "어린이예배",
    category: "어린이",
    date: "2026-11-14",
    duration: "12:08",
    photo: PHOTOS.children,
    description: "어린이예배 298화입니다.",
  },
  {
    id: "junior-lesson-7",
    title: "7과 진흙으로 만든 그릇",
    program: "유년교과 영상",
    category: "어린이",
    date: "2026-11-12",
    duration: "09:51",
    photo: PHOTOS.hands,
    description: "유년반 교과 7과 영상입니다.",
  },
  {
    id: "onevoice27-52-weeks",
    title: "[Onevoice27] 52주 챌린지 참여방법 안내",
    program: "Onevoice27",
    category: "기획",
    date: "2026-11-11",
    duration: "03:20",
    photo: PHOTOS.smallGroup,
    description: "OneVoice27 52주 챌린지 참여 방법을 안내합니다.",
  },
  {
    id: "mission-6",
    title: "6화 멈추지 않는 마음",
    program: "해외선교지소식",
    category: "선교지소식",
    date: "2026-11-10",
    duration: "15:04",
    photo: PHOTOS.children,
    description: "해외 선교지의 소식을 전합니다.",
  },
];

/** Videos live under /broadcast/watch/ so /broadcast/<category>/ stays free for the menu's category pages. */
export function broadcastHref(id: string) {
  return `/broadcast/watch/${id}/`;
}

export function getBroadcast(id: string) {
  return BROADCASTS.find((b) => b.id === id);
}
