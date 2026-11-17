import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";

export const metadata: Metadata = { title: "리디자인 소개" };
export default function AboutPage() {
  return <><PageHeader title="리디자인 소개" description="매일 찾는 말씀과 소식에 더 쉽게 닿도록 제안합니다." crumbs={[{ label: "리디자인 소개" }]} /><div className="wrap py-12"><div className="max-w-[68ch] space-y-10 leading-[1.8]">
    <section aria-labelledby="about-concept"><h2 id="about-concept" className="section-title text-2xl">비공식 리디자인 콘셉트입니다</h2><p className="mt-5">이 사이트는 재림마을(adventist.or.kr)의 메뉴와 이용 흐름을 바탕으로 제작한 포트폴리오 프로젝트입니다. 한국연합회가 운영하는 공식 사이트가 아니며, 공식 서비스나 공지를 대신하지 않습니다.</p></section>
    <section aria-labelledby="about-design"><h2 id="about-design" className="section-title text-2xl">더 편하게 읽고 찾을 수 있도록</h2><p className="mt-5">오늘의 말씀과 기도력, 교과를 첫 화면에서 찾기 쉽게 배치했습니다. 뉴스·방송·게시판의 목록 형식을 정리하고, 큰 글자와 넉넉한 간격, 모바일에서도 사용할 수 있는 전체 메뉴와 검색을 적용했습니다.</p></section>
    <section aria-labelledby="about-samples"><h2 id="about-samples" className="section-title text-2xl">콘텐츠 이용 안내</h2><p className="mt-5">기사·방송 제목과 메뉴에는 기존 사이트의 내용을 참고한 항목이 있습니다. 기사 본문, 게시글 작성자와 조회 수, 교회주소록 등은 화면 구성을 위한 샘플입니다. 실제 정보와 서비스는 <a href="https://www.adventist.or.kr" className="inline-flex min-h-12 items-center text-navy underline">재림마을 공식 사이트</a>에서 확인해 주세요.</p></section>
    <a href="https://github.com/kimmoksan/adventist-portal-redesign" className="inline-flex min-h-12 items-center rounded-[2px] border border-navy px-5 py-3 font-semibold text-navy hover:bg-tint">GitHub에서 프로젝트 보기</a>
  </div></div></>;
}
