"use client";

import Link from "next/link";
import { useState } from "react";
import type { NewsCategory } from "@/types/content";
import { NEWS_CATEGORIES, articleHref, newsByCategory } from "@/data/news";
import { useRotation } from "@/hooks/useRotation";
import { Photo } from "@/components/ui/Photo";
import { ListRow } from "@/components/ui/ListRow";
import { Tabs } from "@/components/ui/Tabs";
import { formatDate, formatShortDate } from "@/lib/utils";

const INTERVAL = 6000;

/** Category tabs; the top three stories of the tab rotate every 6 seconds. */
export function NewsTabs() {
  const [category, setCategory] = useState<"전체" | NewsCategory>("전체");
  const entries = newsByCategory(category);
  const leads = entries.slice(0, Math.min(3, entries.length));
  const rest = entries.slice(leads.length, leads.length + 4);
  const r = useRotation(leads.length, INTERVAL);

  return (
    <div>
      <Tabs label="뉴스 분류" tabs={NEWS_CATEGORIES} value={category} onChange={setCategory} />
      <div role="tabpanel" aria-label={`${category} 뉴스`} className="min-h-[22rem] max-sm:min-h-0">
        <div
          className="relative"
          data-paused={r.paused}
          style={{ ["--progress-duration" as string]: `${INTERVAL}ms` }}
          {...r.bind}
        >
          <div className="fade-stack">
            {leads.map((a, i) => {
              const current = i === r.index;
              return (
                <Link
                  key={a.id}
                  href={articleHref(a.id)}
                  data-current={current}
                  aria-hidden={!current}
                  tabIndex={current ? 0 : -1}
                  className="group grid grid-cols-[14rem_minmax(0,1fr)] items-start gap-6 border-b border-line py-6 max-lg:grid-cols-[10rem_minmax(0,1fr)] max-lg:gap-4 max-sm:grid-cols-1"
                >
                  <span className="overflow-hidden">
                    <Photo
                      photo={a.photo}
                      width={560}
                      ratio="16/10"
                      sizes="224px"
                      className="transition-transform duration-300 ease-out-soft group-hover:scale-[1.03]"
                    />
                  </span>
                  <span>
                    <span className="font-semibold text-navy">{a.category}</span>
                    <span className="mt-1 mb-2 block text-2xl leading-snug font-bold text-ink group-hover:underline max-lg:text-xl">
                      {a.title}
                    </span>
                    <time dateTime={a.date} className="text-muted">
                      {formatDate(a.date)}
                    </time>
                  </span>
                </Link>
              );
            })}
          </div>
          {leads.length > 1 && (
            <div role="group" aria-label="주요 기사 선택" className="absolute right-0 bottom-6 flex gap-1.5 max-sm:static max-sm:mt-2 max-sm:justify-end">
              {leads.map((a, i) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => r.go(i)}
                  aria-label={`${i + 1}번째 주요 기사 보기`}
                  aria-current={i === r.index}
                  data-current={i === r.index}
                  className="group/dot grid size-11 place-items-center"
                >
                  <span className="relative block h-1 w-7 overflow-hidden rounded-[2px] bg-line group-hover/dot:bg-[#b9c7d6]">
                    <i key={`${i}-${r.cycle}`} className="progress-bar absolute inset-0 bg-navy" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
        <ul>
          {rest.map((a) => (
            <ListRow key={a.id} href={articleHref(a.id)} title={a.title} tag={a.category} meta={formatShortDate(a.date)} />
          ))}
        </ul>
      </div>
    </div>
  );
}
