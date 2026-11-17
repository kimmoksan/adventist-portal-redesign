import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { DailyReading } from "@/types/content";
import { formatDate } from "@/lib/utils";

export function TodayPanel({ reading }: { reading: DailyReading }) {
  const rows = [
    { label: "장년교과", title: reading.lesson.dayTitle },
    { label: "장년기도력", title: reading.adultDevotional },
    { label: "어린이기도력", title: reading.childDevotional },
  ];

  return (
    <section aria-labelledby="today-title" className="flex flex-col border border-line bg-white">
      <div className="border-b-2 border-navy px-6 pt-5 pb-4 max-lg:px-4">
        <h2 id="today-title" className="text-2xl">
          오늘의 말씀
        </h2>
        <p className="mt-2 flex items-center gap-2.5 text-muted">
          <span className="rounded-[3px] bg-gold px-2.5 py-0.5 text-sm leading-normal font-bold text-text">오늘</span>
          <time dateTime={reading.date}>
            {formatDate(reading.date)} {reading.weekday}
          </time>
        </p>
      </div>
      {rows.map((row) => (
        <Link
          key={row.label}
          href="/today/"
          className="flex min-h-20 items-center justify-between gap-3 border-b border-line px-6 py-3 hover:bg-soft max-lg:px-4"
        >
          <span>
            <strong className="block text-[1.0625rem] font-semibold text-navy">{row.label}</strong>
            <span className="mt-0.5 block">{row.title}</span>
          </span>
          <ChevronRight className="size-5 shrink-0" strokeWidth={1.75} aria-hidden />
        </Link>
      ))}
      <blockquote className="flex-1 bg-soft px-6 pt-4 pb-5 max-lg:px-4">
        <p className="leading-[1.7]">{reading.verse.text}</p>
        <cite className="mt-2 block font-semibold text-navy not-italic">{reading.verse.ref}</cite>
      </blockquote>
    </section>
  );
}
