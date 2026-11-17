import type { Metadata } from "next";
import Link from "next/link";
import { MENU, menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "사이트맵" };
export default function SitemapPage() {
  return (
    <>
      <PageHeader title="사이트맵" description="재림마을의 모든 메뉴를 한눈에 살펴보세요." crumbs={[{ label: "사이트맵" }]} />
      <div className="wrap py-12">
        <nav aria-label="전체 메뉴" className="grid items-start gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {MENU.map((section) => <section key={section.slug} aria-labelledby={`sitemap-${section.slug}`} className="min-w-0"><h2 id={`sitemap-${section.slug}`} className="section-title text-2xl"><Link href={menuHref(section.slug)} className="inline-flex min-h-12 items-center hover:text-navy hover:underline">{section.label}</Link></h2><ul className="mt-3 border-t border-line">{section.items.map((item) => <li key={item.slug} className="border-b border-line-soft"><Link href={menuHref(section.slug, item.slug)} className="flex min-h-12 items-center py-2 text-text hover:text-navy hover:underline">{item.label}</Link></li>)}</ul></section>)}
        </nav>
        <nav aria-label="이용 안내" className="mt-12 flex flex-wrap gap-x-6 border-t border-line pt-5">{[{ label: "오늘의 말씀", href: "/today/" }, { label: "통합 검색", href: "/search/" }, { label: "로그인 안내", href: "/login/" }, { label: "리디자인 소개", href: "/about/" }, { label: "개인정보 안내", href: "/privacy/" }].map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-12 items-center text-navy hover:underline">{item.label}</Link>)}</nav>
      </div>
    </>
  );
}
