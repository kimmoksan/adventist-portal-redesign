import type { Metadata } from "next";
import Link from "next/link";
import { Play } from "lucide-react";
import { BROADCASTS, broadcastHref } from "@/data/broadcasts";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { Tag } from "@/components/ui/ListRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BroadcastGrid } from "@/components/broadcast/BroadcastGrid";
import { BroadcastMeta } from "@/components/broadcast/BroadcastMeta";
import { broadcastMenu } from "@/components/broadcast/categories";

export const metadata: Metadata = { title: "방송", description: broadcastMenu.description };

export default function BroadcastPage() {
  const latest = [...BROADCASTS].sort((a, b) => b.date.localeCompare(a.date))[0];

  return (
    <>
      <PageHeader title="방송" description={broadcastMenu.description} crumbs={[{ label: "방송" }]} section={broadcastMenu} />
      <div className="wrap py-12">
        {latest && (
          <section aria-labelledby="featured-video-title" className="mb-12 grid grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center gap-8 border-b border-line pb-12 max-lg:grid-cols-1">
            <Link href={broadcastHref(latest.id)} aria-label={`${latest.title} 시청하기`} className="group relative block min-w-0 bg-ink">
              <Photo photo={latest.photo} width={1200} ratio="16/9" priority sizes="(max-width: 1024px) 100vw, 60vw" />
              <span aria-hidden className="absolute top-1/2 left-1/2 grid size-16 -translate-1/2 place-items-center rounded-[4px] bg-white text-navy group-hover:bg-navy group-hover:text-white sm:size-20">
                <Play className="ml-1 size-8 fill-current" strokeWidth={1.75} />
              </span>
            </Link>
            <div className="min-w-0">
              <Tag>최신 방송</Tag>
              <h2 id="featured-video-title" className="section-title mt-5 text-[1.75rem] max-sm:text-2xl">
                <Link href={broadcastHref(latest.id)} className="inline-block min-h-12 hover:text-navy hover:underline">{latest.title}</Link>
              </h2>
              <p className="mt-3 mb-5 font-semibold text-navy">{latest.program}</p>
              <BroadcastMeta item={latest} />
              <p className="mt-5 max-w-[68ch] leading-[1.8]">{latest.description}</p>
            </div>
          </section>
        )}
        <section aria-labelledby="all-videos-title">
          <SectionHeading id="all-videos-title" title="전체 방송" />
          <BroadcastGrid items={BROADCASTS} />
        </section>
      </div>
    </>
  );
}
