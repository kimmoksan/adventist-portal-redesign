import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BROADCASTS } from "@/data/broadcasts";
import { menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { BroadcastGrid } from "@/components/broadcast/BroadcastGrid";
import { broadcastCategories, broadcastMenu } from "@/components/broadcast/categories";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return broadcastMenu.items.map((item) => ({ category: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = broadcastMenu.items.find((entry) => entry.slug === category);
  if (!item) notFound();
  return { title: `${item.label} · 방송`, description: `${item.label} 방송을 모았습니다.` };
}

export default async function BroadcastCategoryPage({ params }: Props) {
  const { category } = await params;
  const item = broadcastMenu.items.find((entry) => entry.slug === category);
  if (!item) notFound();
  const items = BROADCASTS.filter((video) => video.category === broadcastCategories[category]);

  return (
    <>
      <PageHeader title={item.label} description={`${item.label} 방송을 모았습니다.`} crumbs={[{ label: "방송", href: menuHref("broadcast") }, { label: item.label }]} section={broadcastMenu} />
      <div className="wrap py-12">
        <BroadcastGrid items={items} />
      </div>
    </>
  );
}
