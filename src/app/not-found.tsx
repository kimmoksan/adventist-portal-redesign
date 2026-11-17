import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export default function NotFound() {
  return <><PageHeader title="페이지를 찾을 수 없습니다" description="주소가 변경되었거나 이 콘셉트에서 제공하지 않는 페이지입니다." crumbs={[{ label: "페이지 찾기" }]} /><div className="wrap py-12"><div className="max-w-[68ch] border-t-2 border-navy py-8"><p className="font-semibold text-muted tabular">404</p><p className="mt-3 text-lg leading-[1.8]">입력하신 주소를 다시 확인해 주세요. 홈으로 돌아가시거나 사이트맵과 검색에서 원하시는 내용을 찾으실 수 있습니다.</p><nav aria-label="다른 페이지로 이동" className="mt-6 flex flex-wrap gap-3">{[{ label: "홈", href: "/" }, { label: "사이트맵", href: "/sitemap/" }, { label: "검색", href: "/search/" }].map((item) => <Link key={item.href} href={item.href} className="inline-flex min-h-12 items-center rounded-[2px] border border-navy px-5 font-semibold text-navy hover:bg-tint">{item.label}</Link>)}</nav></div></div></>;
}
