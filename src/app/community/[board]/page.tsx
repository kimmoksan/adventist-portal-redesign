import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BOARD_KIND, getBoard, postsOf } from "@/data/community";
import { findMenu, menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { BoardList } from "@/components/community/BoardList";

export const dynamicParams = false;
export function generateStaticParams() {
  return findMenu("community").section!.items.map((item) => ({ board: item.slug }));
}
type Props = { params: Promise<{ board: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board } = await params;
  return { title: findMenu("community", board).item?.label ?? "게시판" };
}
export default async function BoardPage({ params }: Props) {
  const { board: slug } = await params;
  const { section, item } = findMenu("community", slug);
  if (!item) notFound();
  const board = getBoard(slug);
  return (
    <>
      <PageHeader title={item.label} description={board?.description ?? `${item.label}에서 성도들의 이야기를 나눕니다.`} crumbs={[{ label: "커뮤니티", href: menuHref("community") }, { label: item.label }]} section={section} />
      <div className="wrap py-12">
        {board ? <BoardList kind={BOARD_KIND[board.key]} posts={[...postsOf(board.key)].sort((a, b) => b.date.localeCompare(a.date))} /> : <EmptyState title="공식 사이트에서 함께 나누세요" description={`이 콘셉트에서는 ${item.label} 메뉴를 안내합니다. 실제 콘텐츠는 재림마을 공식 사이트에서 이용해 주세요.`} />}
      </div>
    </>
  );
}
