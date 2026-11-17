import {
  Baby,
  BadgeCheck,
  BookHeart,
  BookMarked,
  BookOpen,
  Building2,
  CalendarDays,
  Church,
  Clapperboard,
  Contact,
  FileText,
  Flame,
  Globe,
  GraduationCap,
  LayoutGrid,
  Library,
  Mail,
  MapPin,
  Megaphone,
  MessageSquareHeart,
  MessagesSquare,
  MonitorPlay,
  Music,
  Newspaper,
  NotebookPen,
  Palette,
  PenLine,
  Scroll,
  Send,
  Smartphone,
  Sparkles,
  Sunrise,
  Tv,
  Users,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type { Photo } from "@/types/content";
import { PHOTOS } from "@/data/photos";

/**
 * What makes each top-level section recognisable without changing the color system:
 * its own icon, a key photograph on the landing page and the three things people go there for.
 */
export type SectionIdentity = { icon: LucideIcon; photo: Photo; links: Array<{ label: string; href: string }> };

export const SECTION_IDENTITY: Record<string, SectionIdentity> = {
  news: {
    icon: Newspaper,
    photo: PHOTOS.community,
    links: [
      { label: "전체기사", href: "/news/all/" },
      { label: "특별기획", href: "/news/feature/" },
      { label: "지면보기", href: "/news/paper/" },
    ],
  },
  broadcast: {
    icon: MonitorPlay,
    photo: PHOTOS.sanctuary,
    links: [
      { label: "예배", href: "/broadcast/worship/" },
      { label: "교과해설", href: "/broadcast/lesson/" },
      { label: "어린이", href: "/broadcast/kids/" },
    ],
  },
  faith: {
    icon: BookOpen,
    photo: PHOTOS.bible,
    links: [
      { label: "오늘의 말씀", href: "/today/" },
      { label: "성경", href: "/faith/bible/" },
      { label: "찬미", href: "/faith/hymn/" },
    ],
  },
  mission: {
    icon: Send,
    photo: PHOTOS.children,
    links: [
      { label: "디지털 전도지", href: "/mission/tract/" },
      { label: "동영상 콘텐츠", href: "/mission/video/" },
      { label: "디자인 리소스", href: "/mission/design/" },
    ],
  },
  study: {
    icon: GraduationCap,
    photo: PHOTOS.smallGroup,
    links: [
      { label: "온라인 성경 공부", href: "/study/online/" },
      { label: "인기 강의", href: "/study/popular/" },
      { label: "서적 신청", href: "/study/books/" },
    ],
  },
  church: {
    icon: Church,
    photo: PHOTOS.sanctuary,
    links: [
      { label: "지역교회 소식", href: "/church/news/" },
      { label: "교회주소록", href: "/union/directory/" },
    ],
  },
  union: {
    icon: Building2,
    photo: PHOTOS.hands,
    links: [
      { label: "조직 및 연락처", href: "/union/organization/" },
      { label: "교회주소록", href: "/union/directory/" },
      { label: "연합회에 바란다", href: "/union/feedback/" },
    ],
  },
  community: {
    icon: Users,
    photo: PHOTOS.community,
    links: [
      { label: "공지사항", href: "/community/notice/" },
      { label: "공감기도", href: "/community/prayer/" },
      { label: "구인", href: "/community/jobs/" },
    ],
  },
};

/** Icon and one-line description for each sub-menu shown as a card on a section landing page. */
export const ITEM_META: Record<string, { icon: LucideIcon; description: string }> = {
  "faith/bible": { icon: BookOpen, description: "개역한글·개역개정 성경을 장과 절로 찾아 읽습니다." },
  "faith/hymn": { icon: Music, description: "찬미가를 번호나 제목으로 찾아 봅니다." },
  "faith/spirit-of-prophecy": { icon: NotebookPen, description: "엘렌 G. 화잇의 저작을 전집으로 읽습니다." },
  "faith/devotional": { icon: Sunrise, description: "장년·어린이 기도력을 날짜별로 읽습니다." },
  "faith/lesson": { icon: CalendarDays, description: "이번 분기 안식일학교 교과와 해설입니다." },
  "faith/magazine": { icon: Newspaper, description: "시조, 가정과 건강, 교회지남을 읽습니다." },
  "faith/books": { icon: Library, description: "전자책과 신앙 단행본을 모았습니다." },
  "faith/channel": { icon: Tv, description: "신앙 영상 채널을 한곳에서 봅니다." },
  "faith/transcribe": { icon: PenLine, description: "날마다 성경을 한 장씩 따라 씁니다." },
  "faith/community": { icon: MessagesSquare, description: "신앙 이야기를 나누는 공간입니다." },
  "mission/daily": { icon: Smartphone, description: "SNS로 나누기 좋은 일상 이야기입니다." },
  "mission/faith": { icon: BookHeart, description: "복음을 전하는 신앙 글과 카드입니다." },
  "mission/video": { icon: Clapperboard, description: "짧게 보고 나누는 선교 영상입니다." },
  "mission/tract": { icon: FileText, description: "휴대폰으로 보내는 디지털 전도지입니다." },
  "mission/user": { icon: UsersRound, description: "성도들이 직접 만든 선교 콘텐츠입니다." },
  "mission/design": { icon: Palette, description: "교회 홍보물에 쓰는 이미지와 서식입니다." },
  "study/smartbook": { icon: Smartphone, description: "휴대폰으로 읽는 성경공부 교재입니다." },
  "study/all": { icon: LayoutGrid, description: "모든 온라인 강의를 주제별로 봅니다." },
  "study/popular": { icon: Flame, description: "성도들이 많이 듣는 강의입니다." },
  "study/latest": { icon: Sparkles, description: "새로 올라온 강의입니다." },
  "study/youth": { icon: Baby, description: "청소년과 어린이를 위한 강의입니다." },
  "study/books": { icon: BookMarked, description: "성경공부 교재를 신청합니다." },
  "study/online": { icon: GraduationCap, description: "성경통신학교 과정에 등록합니다." },
  "church/news": { icon: Church, description: "전국 지역교회의 행사와 소식입니다." },
  "union/department-events": { icon: CalendarDays, description: "연합회 각 부서의 행사 안내입니다." },
  "union/events": { icon: Megaphone, description: "교회와 기관이 알리는 행사입니다." },
  "union/minutes": { icon: Scroll, description: "연합회 회의 의사록을 봅니다." },
  "union/feedback": { icon: MessageSquareHeart, description: "연합회에 의견과 제안을 남깁니다." },
  "union/petition": { icon: Mail, description: "연합회장에게 청원을 올립니다." },
  "union/metaverse": { icon: Globe, description: "가상 공간에서 만나는 한국연합회입니다." },
  "union/organization": { icon: Contact, description: "부서와 기관의 연락처를 찾습니다." },
  "union/directory": { icon: MapPin, description: "전국 교회와 기관의 주소와 예배 시간입니다." },
  "union/identity": { icon: BadgeCheck, description: "재림교회 공식 로고와 색 규정입니다." },
};

export function sectionIdentity(slug: string | undefined) {
  return slug ? SECTION_IDENTITY[slug] : undefined;
}
