import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  COURSES,
  LOCAL_CHURCH_NEWS,
  MAGAZINES,
  MISSION_CONTENT,
  UNION_NEWS,
} from "@/data/home";
import { getReading } from "@/data/today";
import { TodayPanel } from "@/components/home/TodayPanel";
import { ChurchFinder } from "@/components/home/ChurchFinder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";

const box =
  "group flex h-full flex-col rounded-[3px] border border-line bg-white transition-[border-color,box-shadow] hover:border-[#b9c6d6] hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)]";

/**
 * The block that opens each section landing page. It is what the section is *for*, so it differs
 * per section: 신앙 opens on today's readings, 성경공부 on courses, 선교 on content to share,
 * 지역교회 on church news, 한국연합회 on its news.
 */
export function SectionFeature({ slug }: { slug: string }) {
  switch (slug) {
    case "faith":
      return (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-10 max-lg:grid-cols-1">
          <TodayPanel reading={getReading()} />
          <section aria-labelledby="feature-magazine">
            <SectionHeading
              id="feature-magazine"
              title="이달의 월간지"
              size="md"
              more={{ href: "/faith/magazine/" }}
              className="mb-3"
            />
            <ul className="grid grid-cols-3 gap-4 max-sm:grid-cols-1">
              {MAGAZINES.map((m) => (
                <li key={m.title}>
                  <Link href={m.href} className={`${box} p-4`}>
                    <span className="mb-4 flex aspect-[4/3] flex-col justify-between rounded-[2px] bg-navy p-4 text-white max-sm:aspect-[5/2]">
                      <span className="text-xl font-bold">{m.magazine}</span>
                      <span aria-hidden className="h-1 w-10 bg-gold" />
                    </span>
                    <span className="line-clamp-2 font-semibold text-ink group-hover:text-navy group-hover:underline">
                      {m.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>
      );
    case "study":
      return (
        <section aria-labelledby="feature-courses">
          <SectionHeading
            id="feature-courses"
            title="지금 시작할 수 있는 과정"
            size="md"
            more={{ href: "/study/all/", label: "전체 강의" }}
            className="mb-3"
          />
          <ul className="grid grid-cols-3 gap-6 max-lg:grid-cols-1">
            {COURSES.map((c) => (
              <li key={c.title}>
                <Link href={c.href} className={`${box} overflow-hidden`}>
                  <span className="block overflow-hidden">
                    <Photo
                      photo={c.photo}
                      width={720}
                      ratio="16/9"
                      decorative
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="flex flex-1 flex-col p-5">
                    <strong className="block text-xl text-ink group-hover:text-navy">
                      {c.title}
                    </strong>
                    <span className="mt-1.5 block text-muted">
                      {c.description}
                    </span>
                    <span className="mt-auto flex items-center gap-2 pt-4 font-semibold text-navy">
                      과정 보기
                      <ArrowRight
                        className="size-5 transition-transform group-hover:translate-x-1"
                        strokeWidth={1.75}
                        aria-hidden
                      />
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      );
    case "mission": {
      const [lead, ...rest] = MISSION_CONTENT;
      return (
        <section
          aria-labelledby="feature-mission"
          className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 max-lg:grid-cols-1"
        >
          <Link
            href="/mission/daily/"
            className="group relative block min-h-80 overflow-hidden rounded-[3px] bg-navy-deep"
          >
            {lead.photo && (
              <Photo
                photo={lead.photo}
                width={1200}
                fill
                decorative
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="transition-transform duration-500 group-hover:scale-[1.03]"
              />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-navy-deep/90 p-6 text-white">
              <span className="block font-semibold text-gold-soft">
                {lead.source}
              </span>
              <strong className="mt-1 block text-2xl leading-snug group-hover:underline">
                {lead.title}
              </strong>
            </span>
          </Link>
          <div>
            <SectionHeading
              id="feature-mission"
              title="나누기 좋은 콘텐츠"
              size="md"
              more={{ href: "/mission/daily/" }}
              className="mb-3"
            />
            <ul className="border-t-2 border-navy">
              {rest.map((m) => (
                <li key={m.title} className="border-b border-line">
                  <Link href="/mission/daily/" className="group block py-4">
                    <span className="block text-[0.9375rem] font-semibold text-navy">
                      {m.source}
                    </span>
                    <span className="line-clamp-2 group-hover:underline">
                      {m.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    }
    case "church":
      return (
        <section aria-labelledby="feature-church">
          <SectionHeading
            id="feature-church"
            title="최근 지역교회 소식"
            size="md"
            more={{ href: "/church/news/" }}
            className="mb-3"
          />
          <ul className="grid grid-cols-4 gap-4 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {LOCAL_CHURCH_NEWS.map((n) => (
              <li key={n.title}>
                <Link href="/church/news/" className={`${box} p-5`}>
                  <span className="inline-flex self-start rounded-[2px] bg-tint px-2 py-0.5 text-[0.9375rem] font-bold text-navy">
                    {n.church}
                  </span>
                  <span className="mt-3 font-semibold text-ink group-hover:underline">
                    {n.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      );
    case "union":
      return (
        <section aria-labelledby="feature-union">
          <SectionHeading
            id="feature-union"
            title="연합회 소식"
            size="md"
            more={{ href: "/union/department-events/" }}
            className="mb-3"
          />
          <ul className="border-t-2 border-navy">
            {UNION_NEWS.map((n) => (
              <li
                key={n.title}
                className="flex items-start gap-4 border-b border-line py-3.5 max-sm:block"
              >
                <span className="w-28 shrink-0 font-semibold text-navy">
                  {n.department}
                </span>
                <Link
                  href="/union/department-events/"
                  className="hover:text-navy hover:underline"
                >
                  {n.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      );
    default:
      return null;
  }
}

/** 지역교회 and 한국연합회 end with the full-width church finder, the action people most often come for. */
export function SectionClosingBand({ slug }: { slug: string }) {
  return slug === "church" || slug === "union" ? <ChurchFinder /> : null;
}
