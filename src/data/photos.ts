import type { Photo } from "@/types/content";

/**
 * Photographs from adventist.or.kr (재림마을 뉴스, 호프채널, 성경통신학교, 한국연합회 게시판), resized for the web
 * and stored in /public/photos. This is a redesign proposal for the same organisation, so its own pictures are used.
 */
const p = (file: string, alt: string): Photo => ({ src: `/photos/${file}.jpg`, alt });

/** General scenes used for section headers, the hero and the church finder. */
export const PHOTOS = {
  prayer: p("prayer", "촛불을 들고 함께 기도하는 성도들"),
  worship: p("worship", "강단에서 말씀을 전하는 목회자"),
  missionaries: p("missionaries", "파송예배를 마치고 함께 선 해외선교사들"),
  meeting: p("meeting", "연례행정위원회에 참석한 대표들"),
  meeting2: p("meeting-2", "회의 중 함께 기도하는 대표들"),
  gathering: p("gathering", "운동장에 모인 삼육식품 직원들"),
  choir: p("choir", "공연장 무대에 선 뫼울림남성합창단"),
  baptism: p("baptism", "야외 수조에서 침례를 받는 사람들"),
} satisfies Record<string, Photo>;

/** Pictures that belong to one news article, programme, course or notice. */
export const ITEM_PHOTOS = {
  newsLaroche: p("news-laroche", "라로슈대학교 교정 표지석"),
  newsDigitalMissionWeek: p("news-digital-mission-week", "2026 디지털 미션위크 안내 포스터"),
  newsKonexion: p("news-konexion", "KONEXION 협력 대학 건물"),
  newsCreation: p("news-creation-insight", "창조신앙 사업계획 발표 화면"),
  newsMukdong: p("news-mukdong", "묵동교회에서 진학 설명을 하는 서울삼육고 교사"),
  newsMasil: p("news-masil", "삼육두유를 나누는 서울삼육고 동아리 학생들"),
  bcLesson8: p("bc-lesson8", "8과 예언 기록의 해석 교과 해설 방송 화면"),
  bcWhoToMeet: p("bc-who-to-meet", "누구를 만나야 할까 예배 방송 화면"),
  bcMangu: p("bc-mangu", "OneVoice27 주제가 콘테스트에 참가한 망우동교회 성가대"),
  bcKids298: p("bc-kids298", "어린이예배 298화 몹시 분주한 밤 화면"),
  bcJunior7: p("bc-junior7", "유년교과 7과 진흙으로 만든 그릇 화면"),
  bc52Weeks: p("bc-52weeks", "OneVoice27 52주 챌린지 안내 화면"),
  bcMission6: p("bc-mission6", "해외선교지소식 6화 멈추지 않는 마음 화면"),
  courseWord: p("course-word", "말씀 향기 강의 표지"),
  courseDaniel: p("course-daniel", "청소년 다니엘서 강의 표지"),
  courseHealth: p("course-health", "건강 새 출발 강의 표지"),
  magAi: p("mag-ai", "AI 시대의 소명 기사 그림"),
  magFall: p("mag-fall", "지팡이를 짚은 어르신의 손"),
  magSos: p("mag-sos", "영남합회 SOS 청소년 선교사 단체 사진"),
  evDigital: p("ev-digital", "디지털선교 강조 안식일 안내"),
  evAdra: p("ev-adra", "김치와 식료품 상자를 나르는 아드라 봉사자들"),
  evNorthKorea: p("ev-nk", "세계 북한선교 기도 안식일 안내"),
} satisfies Record<string, Photo>;
