import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FOOTER_LINKS, ORG } from "@/data/home";
import { Brand } from "./Brand";

export function SiteFooter() {
  return (
    <>
      <p className="border-b border-line bg-soft py-5 text-[1.0625rem] text-muted">
        <span className="wrap block">이 사이트는 재림마을 리디자인 포트폴리오 시안이며, 기사 본문·수치·인명은 샘플입니다.</span>
      </p>
      <footer className="bg-ink pt-10 pb-12 text-[#c3ced9]">
        <div className="wrap">
          <nav aria-label="사이트 이용안내" className="mb-5 flex flex-wrap gap-x-6">
            {FOOTER_LINKS.map((label) => (
              <Link key={label} href="/about/" className="flex min-h-12 items-center text-[#e2e8ee] hover:text-white">
                {label}
              </Link>
            ))}
            <Link href="/privacy/" className="flex min-h-12 items-center font-bold text-white">
              개인정보처리방침
            </Link>
          </nav>
          <div className="flex justify-between gap-8 max-md:flex-col">
            <div>
              <Brand tone="dark" className="mb-4" />
              <p className="text-[#b4c1ce]">{ORG.name}</p>
              <p className="mt-1.5 text-[#b4c1ce]">
                고유번호 <span className="tabular">{ORG.registration}</span> · 대표자 {ORG.representative} · 운영센터{" "}
                <a href={`tel:${ORG.phone.replaceAll("-", "")}`} className="tabular text-[#e2e8ee]">
                  {ORG.phone}
                </a>
              </p>
              <p className="mt-4 text-[#b4c1ce]">Copyright © adventist.or.kr All rights reserved.</p>
            </div>
            <a
              href="#main"
              className="flex min-h-12 items-center justify-center gap-2 self-start border border-white/25 px-4 text-white hover:bg-white/10"
            >
              맨 위로
              <ArrowUp className="size-5" strokeWidth={1.75} />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
