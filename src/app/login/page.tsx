import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "로그인 안내" };
export default function LoginPage() {
  return <><PageHeader title="로그인 안내" description="회원 서비스는 재림마을 공식 사이트에서 이용해 주세요." crumbs={[{ label: "로그인 안내" }]} /><div className="wrap py-12"><section aria-labelledby="official-login-title" className="max-w-[68ch] border-t-2 border-navy py-8"><h2 id="official-login-title" className="section-title text-2xl">공식 사이트에서 로그인해 주세요</h2><p className="mt-5 leading-[1.8]">이 사이트는 재림마을의 화면 구성과 이용 흐름을 제안하는 비공식 리디자인 콘셉트입니다. 로그인과 회원가입은 재림마을 공식 사이트에서 진행하실 수 있습니다.</p><a href="https://www.adventist.or.kr" className="mt-6 inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-navy px-5 py-3 font-semibold text-white hover:bg-navy-deep">재림마을 공식 사이트로 이동<ExternalLink className="size-5 shrink-0" strokeWidth={1.75} aria-hidden /></a></section></div></>;
}
