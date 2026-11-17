"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { MENU, menuHref } from "@/data/menu";
import { NEWS, articleHref } from "@/data/news";
import { BROADCASTS, broadcastHref } from "@/data/broadcasts";
import { POSTS } from "@/data/community";
import { EmptyState } from "@/components/ui/EmptyState";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return text;
  const lower = text.toLocaleLowerCase();
  const needle = query.toLocaleLowerCase();
  const parts: React.ReactNode[] = [];
  let cursor = 0;
  let index = lower.indexOf(needle);
  while (index !== -1) {
    parts.push(text.slice(cursor, index));
    parts.push(<mark key={index} className="bg-gold/40 text-ink">{text.slice(index, index + query.length)}</mark>);
    cursor = index + query.length;
    index = lower.indexOf(needle, cursor);
  }
  parts.push(text.slice(cursor));
  return <>{parts}</>;
}

type Result = { title: string; href: string; description?: string; date?: string };
const MENU_RESULTS: Result[] = MENU.flatMap((section) => [
  { title: section.label, description: section.description, href: menuHref(section.slug) },
  ...section.items.map((item) => ({ title: `${section.label} · ${item.label}`, href: menuHref(section.slug, item.slug) })),
]);

export function SearchResults() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  return <SearchContent key={initial} initial={initial} />;
}

function SearchContent({ initial }: { initial: string }) {
  const router = useRouter();
  const [input, setInput] = useState(initial);
  const query = initial.trim();
  const includes = (value: string) => !!query && value.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  const groups: { label: string; results: Result[] }[] = [
    { label: "메뉴", results: MENU_RESULTS.filter((item) => includes(item.title)) },
    { label: "뉴스", results: NEWS.filter((item) => includes(item.title) || includes(item.summary)).map((item) => ({ title: item.title, description: item.summary, href: articleHref(item.id), date: item.date })) },
    { label: "방송", results: BROADCASTS.filter((item) => includes(item.title) || includes(item.program) || includes(item.speaker ?? "")).map((item) => ({ title: item.title, description: [item.program, item.speaker].filter(Boolean).join(" · "), href: broadcastHref(item.id), date: item.date })) },
    { label: "게시판", results: POSTS.filter((item) => includes(item.title)).map((item) => ({ title: item.title, href: `${menuHref("community", item.board)}${item.id}/`, date: item.date })) },
  ];
  const count = groups.reduce((sum, group) => sum + group.results.length, 0);

  function search(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (input.trim()) params.set("q", input.trim());
    router.replace(`/search/${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <>
      <form onSubmit={search} role="search" className="mb-8 border border-line bg-soft p-5 sm:p-6">
        <label htmlFor="site-search" className="mb-2 block font-semibold text-ink">통합 검색</label>
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row">
          <input id="site-search" name="q" type="search" value={input} onChange={(event) => setInput(event.target.value)} placeholder="찾으시는 메뉴나 소식을 입력하세요" className="min-h-13 min-w-0 flex-1 rounded border border-line bg-white px-4 py-3" />
          <button type="submit" className="inline-flex min-h-13 shrink-0 items-center justify-center gap-2 rounded-[2px] bg-navy px-6 font-semibold text-white hover:bg-navy-deep"><Search className="size-5" strokeWidth={1.75} aria-hidden />검색</button>
        </div>
      </form>
      <p role="status" className="mb-8 text-muted">{query ? <><strong className="text-ink">‘{query}’</strong> 검색 결과 <strong className="text-ink tabular">{count}</strong>건</> : "검색어를 입력하시면 메뉴와 뉴스, 방송, 게시글을 함께 찾아드립니다."}</p>
      {query && <div className="space-y-10">{groups.map((group) => (
        <section key={group.label} aria-label={`${group.label} 검색 결과`} className="min-w-0">
          <SectionHeading title={`${group.label} (${group.results.length})`} size="md" />
          {group.results.length ? <ul className="border-t-2 border-navy">{group.results.map((result) => <li key={result.href} className="min-w-0 border-b border-line py-4">
            <Link href={result.href} className="block min-h-12 min-w-0 py-2 text-xl font-semibold hover:text-navy hover:underline"><Highlight text={result.title} query={query} /></Link>
            {result.description && <p className="mt-1 max-w-[68ch] leading-[1.8] text-muted"><Highlight text={result.description} query={query} /></p>}
            {result.date && <time dateTime={result.date} className="mt-2 block text-muted">{result.date}</time>}
          </li>)}</ul> : <p className="border-t border-line py-5 text-muted">이 분류에는 검색 결과가 없습니다.</p>}
        </section>
      ))}</div>}
      {!count && <div className={query ? "mt-10" : ""}>
        <EmptyState title={query ? "일치하는 검색 결과가 없습니다" : "어떤 내용을 찾고 계신가요?"} description="검색어의 띄어쓰기를 확인하거나 짧은 단어로 다시 검색해 주세요. 아래 자주 찾는 메뉴도 이용하실 수 있습니다." action={{ label: "전체 메뉴 보기", href: "/sitemap/" }} />
        <nav aria-label="추천 검색 메뉴" className="mt-5 flex flex-wrap gap-3">
          {[{ label: "오늘 기도력", href: "/today/" }, { label: "찬미가", href: menuHref("faith", "hymn") }, { label: "교회 찾기", href: menuHref("union", "directory") }, { label: "부고", href: menuHref("community", "obituary") }].map((item) => <Link key={item.label} href={item.href} className="inline-flex min-h-12 items-center rounded-[2px] border border-line px-4 font-semibold text-navy hover:bg-tint">{item.label}</Link>)}
        </nav>
      </div>}
    </>
  );
}
