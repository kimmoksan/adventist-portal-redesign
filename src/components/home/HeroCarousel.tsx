"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { HeroSlide } from "@/types/content";
import { useRotation } from "@/hooks/useRotation";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/utils";

const INTERVAL = 7000;

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const r = useRotation(slides.length, INTERVAL);

  return (
    <section
      aria-roledescription="캐러셀"
      aria-label="주요 소식 (7초마다 자동으로 넘어갑니다)"
      data-paused={r.paused}
      className="relative min-h-[31rem] overflow-hidden bg-text text-white max-lg:min-h-[29rem]"
      style={{ ["--progress-duration" as string]: `${INTERVAL}ms` }}
      {...r.bind}
    >
      <div className="fade-stack absolute inset-0">
        {slides.map((slide, i) => {
          const current = i === r.index;
          return (
            <article
              key={slide.id}
              role="group"
              aria-roledescription="슬라이드"
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={!current}
              inert={!current}
              data-current={current}
              className="relative h-full overflow-hidden"
            >
              <Photo
                photo={slide.photo}
                width={1400}
                ratio="14/9"
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="hero-photo brightness-[0.88]"
              />
              <div className="hero-panel absolute bottom-0 left-0 max-w-[90%] bg-ink/55 px-8 pt-7 pb-24 max-sm:max-w-full max-sm:px-5">
                {i === 0 ? (
                  <h1 className="text-[2.5rem] leading-tight whitespace-pre-line text-white max-lg:text-[2rem]">{slide.title}</h1>
                ) : (
                  <h2 className="text-[2.5rem] leading-tight whitespace-pre-line text-white max-lg:text-[2rem]">{slide.title}</h2>
                )}
                <p className="mt-3 mb-2 text-xl leading-normal whitespace-pre-line">{slide.subtitle}</p>
                <p className="mb-4">{slide.meta}</p>
                <Link
                  href={slide.cta.href}
                  className="inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-white px-5 font-semibold text-ink hover:bg-soft"
                >
                  {slide.cta.label}
                  <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      {/* Controls + labeled tabs with progress */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex min-h-14 bg-ink/90">
        <div className="flex items-center border-r border-white/15 px-1">
          <button type="button" onClick={r.prev} aria-label="이전 소식" className="grid size-12 place-items-center hover:bg-white/10">
            <ChevronLeft className="size-5" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            onClick={r.togglePause}
            aria-label={r.userPaused ? "자동 넘김 시작" : "자동 넘김 일시정지"}
            aria-pressed={!r.userPaused}
            className="grid size-12 place-items-center hover:bg-white/10"
          >
            {r.userPaused ? <Play className="size-5" strokeWidth={1.75} /> : <Pause className="size-5" strokeWidth={1.75} />}
          </button>
          <button type="button" onClick={r.next} aria-label="다음 소식" className="grid size-12 place-items-center hover:bg-white/10">
            <ChevronRight className="size-5" strokeWidth={1.75} />
          </button>
        </div>
        <div role="group" aria-label="주요 소식 선택" className="grid flex-1 grid-cols-3">
          {slides.map((slide, i) => {
            const current = i === r.index;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => r.go(i)}
                aria-current={current}
                data-current={current}
                className={cn(
                  "relative flex min-h-14 items-center gap-2 overflow-hidden px-4 text-left text-[0.9375rem] font-semibold whitespace-nowrap hover:bg-white/5 max-sm:justify-center max-sm:px-1",
                  i > 0 && "border-l border-white/10",
                  current ? "text-white" : "text-[#c9d4de]",
                )}
              >
                <span className={cn("tabular text-[0.8125rem] max-sm:text-sm", current ? "text-gold-soft" : "text-[#8fa3b6]")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="truncate max-sm:sr-only">{slide.tabLabel}</span>
                <i key={`${i}-${r.cycle}`} aria-hidden className="progress-bar absolute inset-x-0 bottom-0 h-[3px] bg-gold" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
