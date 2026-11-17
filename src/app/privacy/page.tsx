import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "개인정보 안내" };
export default function PrivacyPage() {
  return <><PageHeader title="개인정보 안내" description="이 리디자인 콘셉트의 개인정보와 브라우저 저장 안내입니다." crumbs={[{ label: "개인정보 안내" }]} /><div className="wrap py-12"><div className="max-w-[68ch] space-y-10 leading-[1.8]">
    <section aria-labelledby="privacy-data"><h2 id="privacy-data" className="section-title text-2xl">개인정보를 수집하지 않습니다</h2><p className="mt-5">이 리디자인 콘셉트는 개인정보를 수집하지 않습니다. 회원가입, 로그인, 게시글 작성은 재림마을 공식 사이트에서 이용하실 수 있습니다.</p></section>
    <section aria-labelledby="privacy-browser"><h2 id="privacy-browser" className="section-title text-2xl">글자 크기 설정을 기억합니다</h2><p className="mt-5">브라우저의 localStorage에는 선택하신 글자 크기 설정만 저장합니다. 다음 방문에도 읽기 편한 크기를 유지하기 위한 설정이며, 서버로 전송하지 않습니다. 브라우저에서 이 사이트의 저장 데이터를 삭제하시면 설정도 초기화됩니다.</p></section>
    <section aria-labelledby="privacy-external"><h2 id="privacy-external" className="section-title text-2xl">외부 사이트 이용 안내</h2><p className="mt-5">공식 사이트와 지도 등 외부 링크로 이동하시면 해당 사이트의 개인정보 처리방침이 적용됩니다.</p><Link href="/about/" className="mt-5 inline-flex min-h-12 items-center text-navy underline">리디자인 소개 보기</Link></section>
  </div></div></>;
}
