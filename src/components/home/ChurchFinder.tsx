"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { REGIONS } from "@/data/home";
import { PHOTOS } from "@/data/photos";
import { Photo } from "@/components/ui/Photo";

export function ChurchFinder() {
  const router = useRouter();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const params = new URLSearchParams();
    const region = data.get("region")?.toString();
    const q = data.get("q")?.toString().trim();
    if (region) params.set("region", region);
    if (q) params.set("q", q);
    const qs = params.toString();
    router.push(`/union/directory/${qs ? `?${qs}` : ""}`);
  }

  return (
    <section aria-labelledby="finder-title" className="bg-navy py-10 text-white">
      <div className="wrap grid grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] items-center gap-12 max-lg:grid-cols-1 max-lg:gap-8">
        <div>
          <h2 id="finder-title" className="text-[1.75rem] font-extrabold text-white max-sm:text-2xl">
            가까운 재림교회 찾기
          </h2>
          <p className="mt-2 text-[1.0625rem] text-[#dbe6f1]">전국 교회와 기관의 주소·연락처·예배 시간을 확인하세요.</p>
          <form onSubmit={onSubmit} className="mt-6 flex gap-2 max-sm:flex-wrap">
            <label htmlFor="finder-region" className="sr-only">
              지역
            </label>
            <select id="finder-region" name="region" defaultValue="" className="h-13 w-36 shrink-0 rounded bg-white px-4 text-text max-sm:w-full">
              <option value="">전체 지역</option>
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <label htmlFor="finder-q" className="sr-only">
              교회 이름
            </label>
            <input
              id="finder-q"
              name="q"
              type="search"
              placeholder="교회 이름 (예: 공릉동교회)"
              className="h-13 min-w-0 flex-1 rounded bg-white px-4 text-text placeholder:text-[#5f6d7b] max-sm:basis-full"
            />
            <button type="submit" className="inline-flex h-13 items-center gap-2 rounded bg-ink px-5 font-bold whitespace-nowrap hover:bg-black max-sm:w-full max-sm:justify-center">
              교회 찾기
              <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
            </button>
          </form>
          <p className="mt-4 text-[0.9375rem] text-[#c9d8e7]">동중한 · 서중한 · 영남 · 충청 · 호남합회와 제주대회의 교회를 한 번에 찾습니다.</p>
        </div>
        <Photo photo={PHOTOS.worship} width={900} ratio="21/10" sizes="(max-width: 1024px) 100vw, 45vw" className="rounded" />
      </div>
    </section>
  );
}
