"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, HandHeart } from "lucide-react";
import { BOARDS, HOME_BOARDS, postsOf } from "@/data/community";
import { LOCAL_CHURCH_NEWS, PRAYER_OF_THE_DAY, UNION_NEWS } from "@/data/home";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListRow } from "@/components/ui/ListRow";
import { Tabs } from "@/components/ui/Tabs";
import { formatShortDate } from "@/lib/utils";

type Row = { key: string; href: string; title: string; tag?: string; meta?: string };
type Panel = { label: string; href: string; rows: Row[] };

/** 지역교회 · 연합회 소식 and the community boards share one tabbed list. */
const PANELS: Panel[] = [
  {
    label: "지역교회 소식",
    href: "/church/news/",
    rows: LOCAL_CHURCH_NEWS.map((n) => ({ key: n.title, href: "/church/news/", title: n.title, tag: n.church })),
  },
  {
    label: "연합회 소식",
    href: "/union/department-events/",
    rows: UNION_NEWS.map((n) => ({ key: n.title, href: "/union/department-events/", title: n.title, tag: n.department })),
  },
  ...HOME_BOARDS.map((k) => {
    const board = BOARDS.find((b) => b.key === k)!;
    return {
      label: board.label,
      href: `/community/${board.key}/`,
      rows: postsOf(board.key)
        .slice(0, 4)
        .map((p) => ({ key: p.id, href: `/community/${p.board}/${p.id}/`, title: p.title, tag: p.tag, meta: formatShortDate(p.date) })),
    };
  }),
];
const LABELS = PANELS.map((p) => p.label);

export function CommunitySection() {
  const [label, setLabel] = useState(LABELS[0]);
  const panel = PANELS.find((p) => p.label === label)!;
  const [prayed, setPrayed] = useState(false);

  return (
    <div className="wrap grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 py-12 max-lg:grid-cols-1 max-lg:gap-10 max-sm:py-10">
      <section aria-labelledby="community-title">
        <SectionHeading id="community-title" title="교회 소식 · 커뮤니티" more={{ href: "/community/" }} className="mb-3" />
        <Tabs label="교회 소식과 게시판" tabs={LABELS} value={label} onChange={setLabel} className="max-sm:[&>button]:flex-none" />
        <div role="tabpanel" aria-label={label} className="min-h-56 max-sm:min-h-0">
          <ul>
            {panel.rows.map((r) => (
              <ListRow key={r.key} href={r.href} title={r.title} tag={r.tag} meta={r.meta} />
            ))}
          </ul>
          <Link href={panel.href} className="mt-2 inline-flex min-h-12 items-center gap-2 text-muted hover:text-navy hover:underline">
            {label} 바로가기
            <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
          </Link>
        </div>
      </section>
      <aside aria-labelledby="prayer-title" className="flex flex-col items-start border border-line bg-soft p-6 max-sm:p-5">
        <div className="mb-3 flex w-full items-center justify-between">
          <h2 id="prayer-title" className="text-2xl">
            공감기도
          </h2>
          <HandHeart className="size-6 text-navy" strokeWidth={1.75} aria-hidden />
        </div>
        <p className="mb-4 leading-[1.8]">{PRAYER_OF_THE_DAY}</p>
        <button
          type="button"
          aria-pressed={prayed}
          onClick={() => setPrayed((v) => !v)}
          className="mt-auto inline-flex min-h-12 items-center gap-3 self-end rounded-[2px] border border-line bg-white px-5 font-semibold text-navy hover:bg-tint"
        >
          {prayed ? "기도에 마음을 모았습니다" : "함께 기도합니다"}
          <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
        </button>
        <span className="sr-only" aria-live="polite">
          {prayed ? "이 화면에서 기도에 마음을 모았습니다. 서버에는 저장되지 않습니다." : ""}
        </span>
      </aside>
    </div>
  );
}
