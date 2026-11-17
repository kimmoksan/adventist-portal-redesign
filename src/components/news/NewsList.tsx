"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { articleHref } from "@/data/news";
import type { NewsArticle } from "@/types/content";
import { EmptyState } from "@/components/ui/EmptyState";
import { Tag } from "@/components/ui/ListRow";
import { Pagination } from "@/components/ui/Pagination";
import { Photo } from "@/components/ui/Photo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

const PAGE_SIZE = 6;

export function NewsList({ articles, showLead = false }: { articles: NewsArticle[]; showLead?: boolean }) {
  const [page, setPage] = useState(1);
  const listRef = useRef<HTMLElement>(null);
  const lead = showLead ? articles[0] : undefined;
  const rows = lead ? articles.slice(1) : articles;
  const total = Math.ceil(rows.length / PAGE_SIZE);
  const currentPage = Math.min(page, Math.max(1, total));
  const visible = rows.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function changePage(nextPage: number) {
    setPage(Math.max(1, Math.min(nextPage, total)));
    listRef.current?.focus({ preventScroll: true });
    listRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }

  if (articles.length === 0) {
    return <EmptyState title="아직 등록된 기사가 없습니다" description="이 분류의 새 소식을 준비하고 있습니다. 실제 기사는 재림마을 공식 사이트에서 확인하실 수 있습니다." />;
  }

  return (
    <div className="min-w-0">
      {lead && (
        <article className="mb-10 border-b border-line pb-8">
          <Link href={articleHref(lead.id)} className="group block min-h-12 min-w-0">
            <div className="overflow-hidden rounded">
              <Photo photo={lead.photo} width={1400} ratio="16/9" priority sizes="(min-width: 1440px) 875px, (min-width: 1024px) 64vw, 100vw" className="transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none" />
            </div>
            <div className="mt-5">
              <Tag>{lead.category}</Tag>
              <h2 className="mt-3 text-[2rem] group-hover:underline">{lead.title}</h2>
              <p className="mt-3 text-muted">{lead.summary}</p>
              <time dateTime={lead.date} className="mt-3 block text-muted tabular">{formatDate(lead.date)}</time>
            </div>
          </Link>
        </article>
      )}
      {rows.length > 0 && (
        <section ref={listRef} tabIndex={-1} aria-labelledby="news-list-title" className="min-w-0 scroll-mt-40">
          <SectionHeading id="news-list-title" title={lead ? "더 많은 기사" : "기사 목록"} size="md" />
          <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            총 {rows.length}건 중 {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, rows.length)}번째 기사, {currentPage} / {total}페이지
          </p>
          <ul className="border-t-2 border-navy">
            {visible.map((article) => (
              <li key={article.id} className="border-b border-line">
                <Link href={articleHref(article.id)} className="group grid min-h-12 min-w-0 grid-cols-[6rem_minmax(0,1fr)] items-start gap-4 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6">
                  <span className="overflow-hidden rounded">
                    <Photo photo={article.photo} width={400} ratio="16/10" sizes="(min-width: 640px) 160px, 96px" className="transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none" />
                  </span>
                  <div className="min-w-0">
                    <Tag>{article.category}</Tag>
                    <h3 className="mt-2 text-xl group-hover:underline">{article.title}</h3>
                    <p className="mt-2 text-muted md:line-clamp-1">{article.summary}</p>
                    <time dateTime={article.date} className="mt-2 block text-muted tabular">{formatDate(article.date)}</time>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <Pagination page={currentPage} total={total} onChange={changePage} />
        </section>
      )}
    </div>
  );
}
