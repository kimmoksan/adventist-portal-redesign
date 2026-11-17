import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BROADCASTS, broadcastHref, getBroadcast } from "@/data/broadcasts";
import { menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BroadcastMeta } from "@/components/broadcast/BroadcastMeta";
import { CopyLinkButton } from "@/components/broadcast/CopyLinkButton";
import { VideoPlayer } from "@/components/broadcast/VideoPlayer";
import { broadcastMenu, categoryMenuItem } from "@/components/broadcast/categories";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return BROADCASTS.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const item = getBroadcast(id);
  if (!item) notFound();
  return { title: `${item.title} · 방송`, description: item.description };
}

export default async function WatchPage({ params }: Props) {
  const { id } = await params;
  const item = getBroadcast(id);
  if (!item) notFound();
  const category = categoryMenuItem(item.category);
  const playlist = BROADCASTS.filter((video) => video.id !== id);

  return (
    <>
      <PageHeader title={item.title} description={item.program} crumbs={[{ label: "방송", href: menuHref("broadcast") }, { label: category.label, href: menuHref("broadcast", category.slug) }, { label: "시청" }]} section={broadcastMenu} activeHref={menuHref("broadcast", category.slug)} />
      <div className="wrap py-12">
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-start gap-12 max-lg:grid-cols-1">
          <section aria-label="영상 시청 및 정보" className="min-w-0">
            <VideoPlayer item={item} />
            <div className="border-b border-line py-6">
              <BroadcastMeta item={item} />
              <p className="mt-5 max-w-[68ch] leading-[1.8]">{item.description}</p>
            </div>
            <div className="pt-6"><CopyLinkButton /></div>
          </section>
          <aside aria-labelledby="playlist-title" className="min-w-0">
            <SectionHeading id="playlist-title" title="다음 영상" size="md" />
            <ul className="border-t-2 border-navy">
              {playlist.map((video) => (
                <li key={video.id} className="border-b border-line">
                  <Link href={broadcastHref(video.id)} className="group grid min-h-12 grid-cols-[8rem_minmax(0,1fr)] items-start gap-4 py-5">
                    <span className="block min-w-0"><Photo photo={video.photo} width={256} ratio="16/9" decorative sizes="128px" /></span>
                    <span className="min-w-0">
                      <span className="block font-bold text-ink group-hover:text-navy group-hover:underline">{video.title}</span>
                      <span className="mt-1 block text-muted">{video.program}</span>
                      <span className="mt-1 block text-muted tabular"><span className="sr-only">재생 시간 </span>{video.duration}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
