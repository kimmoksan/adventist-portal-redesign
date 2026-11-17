"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MapPin, Phone } from "lucide-react";
import { CHURCHES } from "@/data/churches";
import { REGIONS } from "@/data/home";
import { EmptyState } from "@/components/ui/EmptyState";

export function ChurchDirectory() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const requestedRegion = params.get("region") ?? "";
  const region = REGIONS.includes(requestedRegion) ? requestedRegion : "";
  return <DirectoryContent key={`${region}:${q}`} initialRegion={region} initialQuery={q} />;
}

function DirectoryContent({ initialRegion, initialQuery }: { initialRegion: string; initialQuery: string }) {
  const router = useRouter();
  const [region, setRegion] = useState(initialRegion);
  const [query, setQuery] = useState(initialQuery);
  const results = CHURCHES.filter((church) => (!region || church.region === region) && church.name.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()));

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (region) params.set("region", region);
    if (query.trim()) params.set("q", query.trim());
    router.replace(`/union/directory/${params.size ? `?${params.toString()}` : ""}`, { scroll: false });
  }

  return (
    <>
      <p className="mb-6 border border-line bg-soft p-5 leading-[1.8] text-muted">화면 구성을 위한 샘플 주소록입니다. 주소는 시·군·구까지만 표시하며, 전화번호는 연결되지 않는 예시 번호입니다. 실제 소속·연락처·예배 시간은 공식 사이트에서 확인해 주세요.</p>
      <form onSubmit={submit} className="mb-8 grid min-w-0 items-end gap-4 sm:grid-cols-[10rem_minmax(0,1fr)_auto]">
        <div className="min-w-0"><label htmlFor="directory-region" className="mb-2 block font-semibold text-ink">지역</label><select id="directory-region" name="region" value={region} onChange={(event) => setRegion(event.target.value)} className="min-h-13 w-full rounded border border-line bg-white px-4 py-3"><option value="">전체 지역</option>{REGIONS.map((item) => <option key={item} value={item}>{item}</option>)}</select></div>
        <div className="min-w-0"><label htmlFor="directory-query" className="mb-2 block font-semibold text-ink">교회 이름</label><input id="directory-query" type="search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="예: 공릉동교회" className="min-h-13 w-full min-w-0 rounded border border-line px-4 py-3" /></div>
        <button type="submit" className="min-h-13 rounded-[2px] bg-navy px-6 font-semibold text-white hover:bg-navy-deep">교회 찾기</button>
      </form>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p aria-live="polite" aria-atomic="true">검색 결과 <strong className="text-navy tabular">{results.length}</strong>곳</p>{(region || query) && <button type="button" onClick={() => { setRegion(""); setQuery(""); router.replace("/union/directory/", { scroll: false }); }} className="min-h-12 px-3 text-navy underline hover:bg-tint">검색 조건 초기화</button>}</div>
      {results.length ? <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{results.map((church) => <li key={church.id} className="min-w-0 border border-line p-6">
        <p className="mb-2 text-muted">{church.conference} · {church.region}</p>
        <h2 className="section-title text-2xl">{church.name}</h2>
        <dl className="mt-5 space-y-3"><div><dt className="font-semibold text-ink">주소</dt><dd className="text-muted">{church.address}</dd></div><div><dt className="font-semibold text-ink">예배 시간 <span className="font-normal text-muted">(샘플)</span></dt><dd className="text-muted">{church.worshipTime}</dd></div></dl>
        <div className="mt-5 flex flex-col items-start border-t border-line-soft pt-2">
          <a href={`tel:${church.phone}`} aria-label={`${church.name} 예시 전화번호 ${church.phone}`} className="inline-flex min-h-12 items-center gap-2 text-navy tabular hover:underline"><Phone className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />{church.phone} <span className="text-muted">(예시)</span></a>
          <a href={`https://map.naver.com/p/search/${encodeURIComponent(church.name)}`} target="_blank" rel="noreferrer" aria-label={`${church.name} 지도에서 보기 (새 창)`} className="inline-flex min-h-12 items-center gap-2 font-semibold text-navy hover:underline"><MapPin className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />지도에서 보기</a>
        </div>
      </li>)}</ul> : <EmptyState title="조건에 맞는 교회가 없습니다" description="다른 지역을 선택하거나 교회 이름을 짧게 입력해 주세요. 실제 교회 정보는 공식 사이트에서도 확인하실 수 있습니다." />}
    </>
  );
}
