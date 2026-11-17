import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Flower2,
  HandHeart,
  MapPin,
  Megaphone,
  Music,
  Phone,
  Play,
  ShoppingBag,
  Sunrise,
  UserSearch,
  type LucideIcon,
} from "lucide-react";
import type { SectionIdentity } from "./sectionIdentity";
import { Photo } from "@/components/ui/Photo";
import { NEWS } from "@/data/news";
import { BROADCASTS } from "@/data/broadcasts";
import { ORG, REGIONS } from "@/data/home";
import { postsOf } from "@/data/community";
import type { BoardKey } from "@/types/content";
import { CONTENT_TODAY, weekdayOf } from "@/lib/utils";

type HeroProps = { slug: string; title: string; description?: string; breadcrumb: ReactNode; identity: SectionIdentity };

/**
 * Each section's landing header has its own *form*, chosen from what the section is, while the
 * colours stay navy and gold: 뉴스 is a newspaper masthead, 방송 a dark screen, 신앙 a quiet centred
 * page, 선교 leads with a photograph, 성경공부 shows the steps of study, 지역교회 starts a church
 * search, 한국연합회 reads like a letterhead and 커뮤니티 opens on its boards.
 */
export function SectionHero(props: HeroProps) {
  switch (props.slug) {
    case "news":
      return <NewsHero {...props} />;
    case "broadcast":
      return <BroadcastHero {...props} />;
    case "faith":
      return <FaithHero {...props} />;
    case "mission":
      return <MissionHero {...props} />;
    case "study":
      return <StudyHero {...props} />;
    case "church":
      return <ChurchHero {...props} />;
    case "union":
      return <UnionHero {...props} />;
    case "community":
      return <CommunityHero {...props} />;
    default:
      return null;
  }
}

function koreanDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${y}년 ${m}월 ${d}일 ${weekdayOf(iso)}요일`;
}

/* 뉴스: masthead with heavy rules, the date line and links set like a paper's index. */
function NewsHero({ title, description, breadcrumb, identity }: HeroProps) {
  return (
    <div className="wrap pt-6 pb-8 max-sm:pt-4">
      {breadcrumb}
      <div className="border-t-4 border-navy">
        <div className="flex items-end justify-between gap-8 border-b border-navy py-6 max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <h1 className="text-[3rem] leading-none font-extrabold tracking-tight max-sm:text-[2.25rem]">{title}</h1>
            {description && <p className="mt-3 text-lg text-muted">{description}</p>}
          </div>
          <p className="text-right font-semibold text-ink tabular max-md:text-left">
            {koreanDate(CONTENT_TODAY)}
            <span className="block font-normal text-muted">오늘 올라온 기사 {NEWS.length}건</span>
          </p>
        </div>
        <ul className="flex flex-wrap border-b border-line-soft">
          {identity.links.map((l) => (
            <li key={l.href} className="border-r border-line-soft last:border-r-0 first:[&>a]:pl-0">
              <Link href={l.href} className="group inline-flex min-h-12 items-center gap-1.5 px-4 font-semibold text-navy hover:underline">
                {l.label}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 방송: a dark screen with the key photo behind a play mark. */
function BroadcastHero({ title, description, breadcrumb, identity }: HeroProps) {
  return (
    <div className="relative overflow-hidden bg-navy-deep text-white">
      <div className="absolute inset-y-0 right-0 w-[55%] max-md:hidden">
        <Photo photo={identity.photo} width={1200} fill decorative priority sizes="55vw" className="opacity-60" />
        <span aria-hidden className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/40 to-transparent" />
        <span aria-hidden className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white/80 bg-navy-deep/40">
          <Play className="ml-1 size-8 fill-white text-white" strokeWidth={1.5} />
        </span>
      </div>
      <div className="wrap relative pt-6 pb-12 max-sm:pt-4 max-sm:pb-9 [&_nav_*]:text-[#c9d4e3] [&_nav_[aria-current]]:text-white">
        {breadcrumb}
        <p className="mb-2 inline-flex items-center gap-2 font-semibold text-gold-soft">
          <span aria-hidden className="size-2 rounded-full bg-gold" />
          방송 {BROADCASTS.length}편 · 매주 새 방송
        </p>
        <h1 className="text-[2.75rem] leading-tight text-white max-sm:text-[2rem]">{title}</h1>
        {description && <p className="mt-3 max-w-[40ch] text-lg text-[#dbe6f1]">{description}</p>}
        <ul className="mt-7 flex flex-wrap gap-2">
          {identity.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/50 px-5 font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-navy">
                <Play className="size-4 fill-current" strokeWidth={1.5} aria-hidden />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 신앙: quiet and centred, three large tiles for what people read every day. */
const FAITH_ICONS: LucideIcon[] = [Sunrise, BookOpen, Music];
function FaithHero({ title, description, breadcrumb, identity }: HeroProps) {
  const Icon = identity.icon;
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="mx-auto max-w-3xl text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-line bg-white text-navy">
          <Icon className="size-8" strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="mt-4 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">{title}</h1>
        {description && <p className="mt-2 text-lg text-muted">{description}</p>}
        <span aria-hidden className="mx-auto mt-5 block h-0.5 w-12 bg-gold" />
        <ul className="mt-7 grid grid-cols-3 gap-4 max-sm:gap-2">
          {identity.links.map((l, i) => {
            const LinkIcon = FAITH_ICONS[i] ?? Icon;
            return (
              <li key={l.href}>
                <Link href={l.href} className="group flex h-full flex-col items-center gap-3 rounded-[3px] border border-line bg-white px-3 py-6 font-semibold text-ink transition-[border-color,box-shadow] hover:border-navy hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)] max-sm:py-4">
                  <LinkIcon className="size-7 text-navy" strokeWidth={1.5} aria-hidden />
                  <span className="group-hover:text-navy group-hover:underline">{l.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* 선교: the photograph leads, the text follows on the right. */
function MissionHero({ title, description, breadcrumb, identity }: HeroProps) {
  const Icon = identity.icon;
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="grid grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] items-center gap-12 max-md:grid-cols-1 max-md:gap-6">
        <div className="relative">
          <Photo photo={identity.photo} width={1200} ratio="16/9" decorative priority sizes="(max-width: 768px) 100vw, 55vw" className="rounded-[3px]" />
          <span aria-hidden className="absolute -bottom-3 left-6 h-1.5 w-28 bg-gold" />
        </div>
        <div>
          <p className="flex items-center gap-2 font-semibold text-navy">
            <Icon className="size-5" strokeWidth={1.75} aria-hidden />
            복음을 나누는 콘텐츠
          </p>
          <h1 className="mt-2 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">{title}</h1>
          {description && <p className="mt-3 text-lg text-muted">{description}</p>}
          <ul className="mt-6 border-t-2 border-navy">
            {identity.links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link href={l.href} className="group flex min-h-13 items-center justify-between gap-4 font-semibold text-ink hover:text-navy">
                  <span className="group-hover:underline">{l.label}</span>
                  <ArrowRight className="size-5 text-navy transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* 성경공부: the three steps of studying, each one a link. */
const STUDY_STEPS = [
  { step: "과정 고르기", note: "통신학교 과정에 등록합니다" },
  { step: "강의 듣기", note: "많이 듣는 강의부터 시작해요" },
  { step: "교재 받기", note: "집으로 교재를 보내 드립니다" },
];
function StudyHero({ title, description, breadcrumb, identity }: HeroProps) {
  const Icon = identity.icon;
  const [online, popular, books] = identity.links;
  const links = [online, popular, books];
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-center gap-12 max-lg:grid-cols-1 max-lg:gap-6">
        <div>
          <span className="grid size-14 place-items-center rounded-md bg-navy text-white">
            <Icon className="size-7" strokeWidth={1.6} aria-hidden />
          </span>
          <h1 className="mt-4 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">{title}</h1>
          {description && <p className="mt-3 text-lg text-muted">{description}</p>}
        </div>
        <ol className="grid grid-cols-3 rounded-[3px] border border-line bg-white max-sm:grid-cols-1">
          {STUDY_STEPS.map((s, i) => (
            <li key={s.step} className="border-line not-last:border-r max-sm:not-last:border-r-0 max-sm:not-last:border-b">
              <Link href={links[i]?.href ?? "/study/"} className="group flex h-full flex-col p-5 hover:bg-tint">
                <span className="flex items-center gap-3">
                  <span className="grid size-9 place-items-center rounded-full bg-navy font-bold text-white tabular">{i + 1}</span>
                  {i < STUDY_STEPS.length - 1 && <span aria-hidden className="h-px flex-1 bg-line max-sm:hidden" />}
                </span>
                <strong className="mt-4 block text-lg text-ink group-hover:text-navy group-hover:underline">{s.step}</strong>
                <span className="mt-1 block text-[0.9375rem] text-muted">{s.note}</span>
                <span className="mt-auto pt-3 font-semibold text-navy">{links[i]?.label}</span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* 지역교회: starts a search — pick a region and go straight to the directory. */
function ChurchHero({ title, description, breadcrumb, identity }: HeroProps) {
  const Icon = identity.icon;
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,26rem)] items-end gap-12 max-md:grid-cols-1">
        <div>
          <h1 className="flex items-center gap-3 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">
            <Icon className="size-9 text-navy max-sm:size-7" strokeWidth={1.5} aria-hidden />
            {title}
          </h1>
          {description && <p className="mt-3 text-lg text-muted">{description}</p>}
          <div className="mt-6 rounded-[3px] border border-line bg-white p-5">
            <p className="flex items-center gap-2 font-semibold text-ink">
              <MapPin className="size-5 text-navy" strokeWidth={1.75} aria-hidden />
              지역으로 교회 찾기
            </p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {REGIONS.map((r) => (
                <li key={r}>
                  <Link href={{ pathname: "/union/directory/", query: { region: r } }} className="inline-flex min-h-11 items-center rounded-full border border-line px-4 font-semibold text-navy hover:border-navy hover:bg-navy hover:text-white">
                    {r}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Photo photo={identity.photo} width={900} ratio="4/3" decorative priority sizes="26rem" className="rounded-[3px] max-md:hidden" />
      </div>
    </div>
  );
}

/* 한국연합회: reads like a letterhead — the official name, the contact facts, then the links. */
function UnionHero({ title, breadcrumb, identity }: HeroProps) {
  const facts = [
    { label: "대표전화", value: ORG.phone, href: `tel:${ORG.phone}`, icon: Phone },
    { label: "대표자", value: ORG.representative },
    { label: "사업자등록번호", value: ORG.registration },
  ];
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="border-l-4 border-gold pl-6 max-sm:pl-4">
        <p className="font-semibold text-muted">{ORG.name}</p>
        <h1 className="mt-1 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">{title}</h1>
        <p className="mt-2 text-lg text-muted">한국 재림교회의 행정과 부서, 기관을 안내합니다.</p>
      </div>
      <div className="mt-7 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 max-lg:grid-cols-1">
        <dl className="grid grid-cols-3 self-start rounded-[3px] border border-line bg-white max-sm:grid-cols-1">
          {facts.map((f) => (
            <div key={f.label} className="border-line px-5 py-4 not-last:border-r max-sm:not-last:border-r-0 max-sm:not-last:border-b">
              <dt className="text-[0.9375rem] text-muted">{f.label}</dt>
              <dd className="mt-1 text-lg font-bold text-ink tabular">
                {f.href ? (
                  <a href={f.href} className="text-navy hover:underline">
                    {f.value}
                  </a>
                ) : (
                  f.value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <ul className="grid content-center gap-x-6 sm:grid-cols-3 lg:grid-cols-1">
          {identity.links.map((l) => (
            <li key={l.href} className="border-b border-line">
              <Link href={l.href} className="group flex min-h-12 items-center justify-between gap-3 font-semibold text-navy">
                <span className="group-hover:underline">{l.label}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* 커뮤니티: opens straight onto its boards with how many posts each has. */
const COMMUNITY_TILES: Array<{ key: BoardKey; label: string; icon: LucideIcon }> = [
  { key: "notice", label: "공지사항", icon: Megaphone },
  { key: "prayer", label: "공감기도", icon: HandHeart },
  { key: "jobs", label: "구인", icon: Briefcase },
  { key: "seekers", label: "구직", icon: UserSearch },
  { key: "market", label: "알뜰시장", icon: ShoppingBag },
  { key: "obituary", label: "부고", icon: Flower2 },
];
function CommunityHero({ title, description, breadcrumb, identity }: HeroProps) {
  const Icon = identity.icon;
  return (
    <div className="wrap pt-6 pb-10 max-sm:pt-4">
      {breadcrumb}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] items-center gap-12 max-lg:grid-cols-1 max-lg:gap-6">
        <div>
          <h1 className="flex items-center gap-3 text-[2.5rem] leading-tight max-sm:text-[1.875rem]">
            <Icon className="size-9 text-navy max-sm:size-7" strokeWidth={1.5} aria-hidden />
            {title}
          </h1>
          {description && <p className="mt-3 text-lg text-muted">{description}</p>}
        </div>
        <ul className="grid grid-cols-3 gap-3 max-sm:grid-cols-2">
          {COMMUNITY_TILES.map((t) => {
            const TileIcon = t.icon;
            return (
              <li key={t.key}>
                <Link href={`/community/${t.key}/`} className="group flex items-center gap-3 rounded-[3px] border border-line bg-white p-4 transition-[border-color,box-shadow] hover:border-navy hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)]">
                  <TileIcon className="size-6 shrink-0 text-navy" strokeWidth={1.6} aria-hidden />
                  <span className="min-w-0">
                    <strong className="block text-ink group-hover:text-navy group-hover:underline">{t.label}</strong>
                    <span className="text-[0.9375rem] text-muted tabular">글 {postsOf(t.key).length}건</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
