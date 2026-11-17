import type { DailyReading } from "@/types/content";
import { CONTENT_TODAY, weekdayOf } from "@/lib/utils";

const QUARTER = "2026년 4기";
const LESSON = { number: 8, title: "예언 기록의 해석" };
const VERSE = {
  ref: "이사야 49장 6절",
  text: "내가 또 너를 이방의 빛으로 삼아 나의 구원을 베풀어서 땅 끝까지 이르게 하리라",
};

/**
 * One week of readings around the snapshot date.
 * 11-16 is real (adventist.or.kr). The other days are sample titles that show the weekly structure.
 */
const WEEK: Array<Omit<DailyReading, "weekday" | "lesson" | "verse"> & { dayTitle: string }> = [
  { date: "2026-11-14", dayTitle: "이번 주 공부 안내", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
  { date: "2026-11-15", dayTitle: "도입: 예언을 읽는 자세", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
  { date: "2026-11-16", dayTitle: "역사·문화적 배경", adultDevotional: "하나님을 불신한 대가", childDevotional: "암탉이 품는 것처럼" },
  { date: "2026-11-17", dayTitle: "본문 살펴보기", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
  { date: "2026-11-18", dayTitle: "오늘의 적용", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
  { date: "2026-11-19", dayTitle: "더 깊은 묵상", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
  { date: "2026-11-20", dayTitle: "정리와 토의", adultDevotional: "샘플 기도력 제목", childDevotional: "샘플 어린이기도력 제목" },
];

export const READINGS: DailyReading[] = WEEK.map(({ dayTitle, ...rest }) => ({
  ...rest,
  weekday: weekdayOf(rest.date),
  lesson: { quarter: QUARTER, ...LESSON, dayTitle },
  verse: VERSE,
}));

export function getReading(date: string = CONTENT_TODAY): DailyReading {
  return READINGS.find((r) => r.date === date) ?? READINGS.find((r) => r.date === CONTENT_TODAY)!;
}
