import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ChurchDirectory } from "@/components/directory/ChurchDirectory";
import { findMenu, menuHref } from "@/data/menu";

export const metadata: Metadata = { title: "교회주소록" };
export default function DirectoryPage() {
  return <><PageHeader title="교회주소록" description="지역과 이름으로 가까운 교회를 찾아보세요." crumbs={[{ label: "한국연합회", href: menuHref("union") }, { label: "교회주소록" }]} section={findMenu("union").section} /><div className="wrap py-12"><Suspense fallback={<p role="status" className="py-8 text-muted">교회주소록을 준비하고 있습니다.</p>}><ChurchDirectory /></Suspense></div></>;
}
