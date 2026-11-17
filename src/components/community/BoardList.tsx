"use client";

import Link from "next/link";
import { useState } from "react";
import { PencilLine, Search } from "lucide-react";
import type { BoardPost } from "@/types/content";
import { boardBadge, type BoardKind } from "@/data/community";
import { menuHref } from "@/data/menu";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/ListRow";
import { Pagination } from "@/components/ui/Pagination";
import { formatDate } from "@/lib/utils";

function PostTag({ post }: { post: BoardPost }) {
  if (post.tag) return <Tag>{post.tag}</Tag>;
  const badge = boardBadge(post.board);
  return badge ? <Tag tone={badge.tone}>{badge.label}</Tag> : null;
}

/** Prayer and fellowship boards: each post as a card with a two-line excerpt, so the words come first. */
function CardList({ posts }: { posts: BoardPost[] }) {
  return (
    <ul className="grid gap-4 border-t-2 border-navy pt-4 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`${menuHref("community", post.board)}${post.id}/`} className="group flex h-full flex-col border border-line bg-white p-6 hover:border-navy max-sm:p-5">
            <strong className="text-xl leading-snug text-ink group-hover:text-navy group-hover:underline">{post.title}</strong>
            <span className="mt-3 line-clamp-2 leading-[1.8] text-text">{post.body[0]}</span>
            <span className="mt-auto flex flex-wrap gap-x-3 pt-4 text-muted">
              <span>{post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function BoardList({ posts, kind = "life" }: { posts: BoardPost[]; kind?: BoardKind }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [writingNote, setWritingNote] = useState(false);
  const filtered = posts.filter((post) => post.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));
  const total = Math.ceil(filtered.length / 10);
  const visible = filtered.slice((page - 1) * 10, page * 10);

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div className="w-full min-w-0 sm:max-w-md">
          <label htmlFor="board-search" className="mb-2 block font-semibold text-ink">게시판 검색</label>
          <div className="relative">
            <Search className="pointer-events-none absolute top-4 left-4 size-5 text-muted" strokeWidth={1.75} aria-hidden />
            <input id="board-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="제목으로 검색하세요" className="min-h-13 w-full min-w-0 rounded border border-line bg-white py-3 pr-4 pl-12" />
          </div>
        </div>
        <button type="button" aria-expanded={writingNote} aria-controls="writing-note" onClick={() => setWritingNote((value) => !value)} className="inline-flex min-h-12 items-center gap-2 rounded-[2px] bg-navy px-5 font-semibold text-white hover:bg-navy-deep">
          <PencilLine className="size-5" strokeWidth={1.75} aria-hidden />글쓰기
        </button>
      </div>
      <div id="writing-note" role="status">
        {writingNote && <p className="mb-6 border border-line bg-soft p-5 leading-[1.8]">글쓰기는 재림마을 공식 사이트에서 이용하실 수 있습니다. <a href="https://www.adventist.or.kr" className="inline-flex min-h-12 items-center font-semibold text-navy underline">공식 사이트로 이동</a></p>}
      </div>
      <p aria-live="polite" className="mb-3 text-muted">전체 <strong className="font-semibold text-ink tabular">{filtered.length}</strong>건</p>
      {visible.length && kind === "fellowship" ? (
        <CardList posts={visible} />
      ) : visible.length ? (
        <table className="block w-full border-t-2 border-navy md:table">
          <caption className="sr-only">게시글 목록 · 번호, 제목, 작성자, 날짜, 조회</caption>
          <thead className="hidden bg-soft md:table-header-group">
            <tr className="border-b border-line text-left">
              <th scope="col" className="w-20 px-3 py-4 font-semibold">번호</th>
              <th scope="col" className="px-3 py-4 font-semibold">제목</th>
              <th scope="col" className="w-28 px-3 py-4 font-semibold">작성자</th>
              <th scope="col" className="w-36 px-3 py-4 font-semibold">날짜</th>
              <th scope="col" className="w-24 px-3 py-4 font-semibold">조회</th>
            </tr>
          </thead>
          <tbody className="block md:table-row-group">
            {visible.map((post, index) => (
              <tr key={post.id} className="flex min-w-0 flex-wrap items-center gap-x-4 border-b border-line py-4 md:table-row md:py-0">
                <td className="text-muted tabular md:px-3 md:py-4"><span className="md:sr-only">번호 </span>{filtered.length - (page - 1) * 10 - index}</td>
                <td className="order-first w-full min-w-0 md:table-cell md:w-auto md:px-3">
                  <Link href={`${menuHref("community", post.board)}${post.id}/`} className="flex min-h-12 min-w-0 flex-wrap items-center gap-y-2 py-2 font-semibold hover:text-navy hover:underline">
                    <PostTag post={post} />
                    <span className="min-w-0">{post.title}</span>
                  </Link>
                </td>
                <td className="text-muted md:px-3 md:py-4"><span className="md:sr-only">작성자 </span>{post.author}</td>
                <td className="text-muted md:px-3 md:py-4"><span className="sr-only">날짜 </span><time dateTime={post.date}>{formatDate(post.date)}</time></td>
                <td className="text-muted tabular md:px-3 md:py-4"><span className="md:sr-only">조회 </span>{post.views.toLocaleString("ko-KR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : <EmptyState title={query.trim() ? "검색 결과가 없습니다" : "아직 등록된 글이 없습니다"} description={query.trim() ? "검색어를 짧게 입력하거나 다른 제목으로 검색해 주세요." : "이 게시판의 실제 글은 재림마을 공식 사이트에서 확인하실 수 있습니다."} />}
      <Pagination page={page} total={total} onChange={setPage} />
    </>
  );
}
