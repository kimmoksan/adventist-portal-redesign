"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Play } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import type { Broadcast } from "@/types/content";

export function VideoPlayer({ item }: { item: Broadcast }) {
  const [opened, setOpened] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) panel.current?.focus();
  }, [opened]);

  if (opened) {
    return (
      <div
        ref={panel}
        tabIndex={-1}
        aria-label="영상 재생 안내"
        className="flex aspect-video min-h-64 flex-col items-center justify-center gap-5 border border-line bg-soft p-5 text-center sm:min-h-0 sm:p-8"
      >
        <p className="max-w-[48ch] leading-[1.8]">이 시안에서는 영상을 재생하지 않습니다. 실제 영상은 재림마을 방송에서 시청하실 수 있습니다.</p>
        <a href="https://www.adventist.or.kr" target="_blank" rel="noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] bg-navy px-5 font-semibold text-white hover:bg-navy-deep">
          재림마을 방송에서 시청하기
          <ExternalLink className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span className="sr-only">(새 창)</span>
        </a>
      </div>
    );
  }

  return (
    <div className="relative aspect-video bg-ink">
      <Photo photo={item.photo} width={1200} ratio="16/9" fill priority sizes="(max-width: 1024px) 100vw, 66vw" />
      <button type="button" onClick={() => setOpened(true)} aria-label={`${item.title} 재생 안내 보기`} className="group absolute inset-0 grid size-full place-items-center hover:bg-ink/10">
        <span className="grid size-16 place-items-center rounded-[4px] bg-white text-navy group-hover:bg-navy group-hover:text-white sm:size-20">
          <Play className="ml-1 size-8 fill-current" strokeWidth={1.75} aria-hidden />
        </span>
      </button>
    </div>
  );
}
