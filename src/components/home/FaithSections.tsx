import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BOOKS, COURSES, LOCAL_CHURCH_NEWS, MAGAZINES, MISSION_CONTENT, UNION_NEWS } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";

const buttonBase = "inline-flex min-h-12 items-center justify-center gap-3 rounded-[2px] border px-5 font-semibold";

export function FaithSection() {
  return (
    <section aria-labelledby="faith-title" className="wrap py-12 max-sm:py-10">
      <SectionHeading id="faith-title" title="신앙과 생활" more={{ href: "/faith/" }} />
      <ul className="grid grid-cols-3 border-y border-line max-sm:grid-cols-1">
        {MAGAZINES.map((m, i) => (
          <li key={m.title} className={i < MAGAZINES.length - 1 ? "border-r border-line max-sm:border-r-0 max-sm:border-b" : ""}>
            <Link href={m.href} className="group flex h-full flex-col p-6 hover:bg-soft max-sm:px-0">
              <span className="font-semibold text-navy">{m.magazine}</span>
              <span className="mt-1.5 mb-3 text-xl font-bold text-ink group-hover:underline">{m.title}</span>
              <span className="mt-auto flex min-h-12 items-center justify-between">
                월간지 읽기
                <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap items-center gap-x-6">
        <strong className="text-navy">전자책·단행본</strong>
        {BOOKS.map((b) => (
          <Link key={b.title} href="/faith/books/" className="flex min-h-12 items-center text-muted hover:text-navy hover:underline">
            {b.title}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StudyMissionSection() {
  return (
    <div className="wrap grid grid-cols-2 gap-12 pb-12 max-lg:grid-cols-1 max-lg:gap-10">
      <section aria-labelledby="study-title">
        <SectionHeading id="study-title" title="성경공부" more={{ href: "/study/" }} />
        <div className="grid grid-cols-[9rem_minmax(0,1fr)] gap-6 max-sm:grid-cols-1">
          <Photo photo={COURSES[0].photo} width={480} ratio="3/4" sizes="144px" className="max-sm:hidden" />
          <ul>
            {COURSES.map((c, i) => (
              <li key={c.title} className={i > 0 ? "border-t border-line" : ""}>
                <Link href={c.href} className="group block py-3 first:pt-0">
                  <strong className="block text-xl text-navy group-hover:underline">{c.title}</strong>
                  <span className="mt-1 block text-muted">{c.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/study/online/" className={`${buttonBase} border-navy bg-navy text-white hover:bg-navy-deep`}>
            온라인 성경 공부
            <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
          </Link>
          <Link href="/study/books/" className={`${buttonBase} border-line bg-white text-navy hover:bg-soft`}>
            서적 신청
          </Link>
        </div>
      </section>
      <section aria-labelledby="mission-title">
        <SectionHeading id="mission-title" title="함께하는 선교" more={{ href: "/mission/" }} />
        <ul>
          {MISSION_CONTENT.map((m) => (
            <li key={m.title}>
              <Link href="/mission/" className="group flex min-h-21 items-center gap-4 border-b border-line py-3">
                {m.photo && (
                  <span className="w-24 shrink-0">
                    <Photo photo={m.photo} width={240} ratio="3/2" sizes="96px" />
                  </span>
                )}
                <span>
                  <span className="block text-muted">{m.source}</span>
                  <strong className="font-semibold text-text group-hover:underline">{m.title}</strong>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export function LocalUnionSection() {
  return (
    <div className="border-y border-line bg-soft py-12 max-sm:py-10">
      <div className="wrap grid grid-cols-2 gap-12 max-lg:grid-cols-1 max-lg:gap-10">
        <LabeledList
          id="church-title"
          title="지역교회 소식"
          href="/church/news/"
          rows={LOCAL_CHURCH_NEWS.map((n) => ({ label: n.church, title: n.title }))}
          actions={[
            { label: "교회 찾기", href: "/union/directory/" },
            { label: "우리 교회 소식 전하기", href: "/church/news/" },
          ]}
        />
        <LabeledList
          id="union-title"
          title="한국연합회 소식"
          href="/union/department-events/"
          rows={UNION_NEWS.map((n) => ({ label: n.department, title: n.title }))}
          actions={[
            { label: "조직 및 연락처", href: "/union/organization/" },
            { label: "연합회에 바란다", href: "/union/feedback/" },
          ]}
        />
      </div>
    </div>
  );
}

function LabeledList({
  id,
  title,
  href,
  rows,
  actions,
}: {
  id: string;
  title: string;
  href: string;
  rows: Array<{ label: string; title: string }>;
  actions: Array<{ label: string; href: string }>;
}) {
  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} title={title} more={{ href }} />
      <ul className="border-t-2 border-navy">
        {rows.map((r) => (
          <li key={r.title} className="flex items-start gap-4 border-b border-line py-3 max-sm:block">
            <span className="w-30 shrink-0 font-semibold text-navy max-sm:block max-sm:w-auto max-sm:pb-1">{r.label}</span>
            <Link href={href} className="hover:text-navy hover:underline">
              {r.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-4 max-sm:gap-2">
        {actions.map((a) => (
          <Link key={a.label} href={a.href} className={`${buttonBase} border-line bg-white text-navy hover:bg-soft max-sm:w-full`}>
            {a.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
