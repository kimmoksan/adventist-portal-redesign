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
                  <Link
                    href={m.href}
                    className={`${box} p-4 max-sm:flex-row max-sm:items-center max-sm:gap-4 max-sm:p-3`}
                  >
                    <span className="relative mb-4 block overflow-hidden rounded-[2px] bg-navy max-sm:mb-0 max-sm:w-28 max-sm:shrink-0">
                      <Photo
                        photo={m.photo}
                        width={360}
                        ratio="16/9"
                        decorative
                        sizes="(max-width: 640px) 7rem, 20vw"
                        className="transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                      <span className="absolute bottom-0 left-0 bg-navy px-2.5 py-1 text-sm font-bold text-white max-sm:hidden">
                        {m.magazine}
                      </span>
                    </span>
                    <span className="min-w-0">
                      <span className="mb-1 hidden text-sm font-bold text-navy max-sm:block">
                        {m.magazine}
                      </span>
                      <span className="line-clamp-2 font-semibold text-ink group-hover:text-navy group-hover:underline">
                        {m.title}
                      </span>
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
            className="group relative block min-h-80 overflow-hidden rounded-[3px] bg-navy-deep max-md:min-h-0"
          >
            {lead.photo && (
              <Photo
                photo={lead.photo}
                width={1200}
                fill
                decorative
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="transition-transform duration-500 group-hover:scale-[1.03] max-md:hidden"
              />
            )}
            <span className="absolute inset-x-0 bottom-0 bg-navy-deep/90 p-6 text-white max-md:static max-md:block max-md:p-5">
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
          <ul className="grid grid-cols-3 gap-4 max-md:grid-cols-1">
            {UNION_NEWS.map((n) => (
              <li key={n.title}>
                <Link
                  href="/union/department-events/"
                  className={`${box} overflow-hidden max-md:flex-row max-md:items-center max-md:gap-4 max-md:p-3`}
                >
                  <span className="block overflow-hidden max-md:w-28 max-md:shrink-0 max-md:rounded-[2px]">
                    <Photo
                      photo={n.photo}
                      width={360}
                      ratio="16/9"
                      decorative
                      sizes="(max-width: 768px) 7rem, 30vw"
                      className="transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="block min-w-0 p-4 max-md:p-0">
                    <span className="block text-[0.9375rem] font-semibold text-navy">
                      {n.department}
                    </span>
                    <span className="mt-1 line-clamp-2 font-semibold text-ink group-hover:underline">
                      {n.title}
                    </span>
                  </span>
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
