import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COURSES, MAGAZINES, MISSION_CONTENT } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * 신앙과 생활 · 성경공부 · 함께하는 선교 in one band of three equal columns.
 * Each column is a short labelled list; the full content lives behind 더보기.
 */
export function FaithStudySection() {
  const columns = [
    {
      id: "faith-title",
      title: "신앙과 생활",
      href: "/faith/",
      rows: MAGAZINES.map((m) => ({ label: m.magazine, title: m.title, href: m.href })),
      action: { label: "전자책·단행본", href: "/faith/books/" },
    },
    {
      id: "study-title",
      title: "성경공부",
      href: "/study/",
      rows: COURSES.map((c) => ({ label: "통신 과정", title: c.title, href: c.href })),
      action: { label: "온라인 성경공부 신청", href: "/study/online/" },
    },
    {
      id: "mission-title",
      title: "함께하는 선교",
      href: "/mission/",
      rows: MISSION_CONTENT.slice(0, 3).map((m) => ({ label: m.source, title: m.title, href: "/mission/" })),
      action: { label: "선교 이야기 더 보기", href: "/mission/" },
    },
  ];

  return (
    <div className="border-y border-line bg-soft py-12 max-sm:py-10">
      <div className="wrap grid grid-cols-3 gap-10 max-lg:grid-cols-1 max-lg:gap-10">
        {columns.map((col) => (
          <section key={col.id} aria-labelledby={col.id} className="flex flex-col">
            <SectionHeading id={col.id} title={col.title} size="md" more={{ href: col.href }} className="mb-3" />
            <ul className="border-t-2 border-navy">
              {col.rows.map((r) => (
                <li key={r.title} className="border-b border-line">
                  <Link href={r.href} className="group block py-3">
                    <span className="block text-[0.9375rem] font-semibold text-navy">{r.label}</span>
                    <span className="line-clamp-2 text-text group-hover:underline">{r.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={col.action.href} className="mt-3 inline-flex min-h-12 items-center gap-2 self-start font-semibold text-navy hover:underline">
              {col.action.label}
              <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
            </Link>
          </section>
        ))}
      </div>
    </div>
  );
}
