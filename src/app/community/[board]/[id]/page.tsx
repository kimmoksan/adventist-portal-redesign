import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getBoard, postsOf } from "@/data/community";
import { findMenu, menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { ListRow, Tag } from "@/components/ui/ListRow";
import { formatDate } from "@/lib/utils";

export const dynamicParams = false;
export function generateStaticParams() {
  return POSTS.map((post) => ({ board: post.board, id: post.id }));
}
type Props = { params: Promise<{ board: string; id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { board, id } = await params;
  return { title: POSTS.find((post) => post.board === board && post.id === id)?.title ?? "게시글" };
}
export default async function PostPage({ params }: Props) {
  const { board: slug, id } = await params;
  const board = getBoard(slug);
  const post = POSTS.find((entry) => entry.id === id && entry.board === slug);
  if (!board || !post) notFound();
  const posts = [...postsOf(board.key)].sort((a, b) => b.date.localeCompare(a.date));
  const index = posts.findIndex((entry) => entry.id === id);
  const previous = posts[index + 1];
  const next = posts[index - 1];
  return (
    <>
      <PageHeader title={post.title} description={board.label} crumbs={[{ label: "커뮤니티", href: menuHref("community") }, { label: board.label, href: menuHref("community", board.key) }, { label: "게시글" }]} section={findMenu("community").section} />
      <div className="wrap py-12">
        <article aria-label={`${board.label} 게시글`} className="mx-auto max-w-[68ch]">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line pb-5 text-muted">
            {(post.tag || board.key === "obituary") && <Tag tone={board.key === "obituary" ? "grape" : "navy"}>{post.tag ?? "부고"}</Tag>}
            <span>작성자 {post.author}</span><span aria-hidden>·</span><time dateTime={post.date}>{formatDate(post.date)}</time><span aria-hidden>·</span><span className="tabular">조회 {post.views.toLocaleString("ko-KR")}</span>
          </div>
          <div className="space-y-6 py-10 text-lg leading-[1.8]">{post.body.map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
          <p className="border border-line bg-soft p-5 text-muted">샘플 게시글입니다. 작성자·조회 수·본문은 화면 구성을 위한 예시이며 실제 글은 공식 사이트에서 확인해 주세요.</p>
          <nav aria-label="같은 게시판의 이전 글과 다음 글" className="mt-10">
            <ul className="border-t border-line">
              {previous ? <ListRow href={`${menuHref("community", board.key)}${previous.id}/`} title={`이전 글 · ${previous.title}`} clamp /> : <li className="border-b border-line py-4 text-muted">이전 글이 없습니다.</li>}
              {next ? <ListRow href={`${menuHref("community", board.key)}${next.id}/`} title={`다음 글 · ${next.title}`} clamp /> : <li className="border-b border-line py-4 text-muted">다음 글이 없습니다.</li>}
            </ul>
          </nav>
          <Link href={menuHref("community", board.key)} className="mt-6 inline-flex min-h-12 items-center rounded-[2px] border border-navy px-5 font-semibold text-navy hover:bg-tint">{board.label} 목록으로</Link>
        </article>
      </div>
    </>
  );
}
