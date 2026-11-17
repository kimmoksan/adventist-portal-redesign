import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { SearchResults } from "@/components/search/SearchResults";

export const metadata: Metadata = { title: "통합 검색" };
export default function SearchPage() {
  return <><PageHeader title="통합 검색" description="메뉴와 뉴스, 방송, 게시판을 한곳에서 찾아보세요." crumbs={[{ label: "통합 검색" }]} /><div className="wrap py-12"><Suspense fallback={<p role="status" className="py-8 text-muted">검색 화면을 준비하고 있습니다.</p>}><SearchResults /></Suspense></div></>;
}
