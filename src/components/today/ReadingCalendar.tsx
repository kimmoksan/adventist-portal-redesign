"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { broadcastHref } from "@/data/broadcasts";
import { MoreLink, SectionHeading } from "@/components/ui/SectionHeading";
import { cn, formatDate } from "@/lib/utils";
import type { DailyReading } from "@/types/content";

export function ReadingCalendar({ readings, today }: { readings: DailyReading[]; today: string }) {
  const [selectedDate, setSelectedDate] = useState(today);

  useEffect(() => {
    function readHash() {
      const date = window.location.hash.slice(1);
      setSelectedDate(readings.some((reading) => reading.date === date) ? date : today);
    }
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [readings, today]);

  const index = readings.findIndex((reading) => reading.date === selectedDate);
  const reading = readings[index];

  function selectDate(date: string) {
    setSelectedDate(date);
    if (window.location.hash !== `#${date}`) window.location.hash = date;
  }

  if (!reading) return null;
  const sample = reading.date !== "2026-11-16";
  const navigationClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded-[2px] border border-line px-4 font-semibold text-navy hover:bg-soft disabled:cursor-not-allowed disabled:text-muted disabled:opacity-50 disabled:hover:bg-white";

  return (
    <div>
      <section aria-labelledby="reading-date-title">
        <SectionHeading id="reading-date-title" title="날짜별 말씀" />
        <div role="group" aria-label="말씀을 읽을 날짜 선택" className="grid grid-cols-7 border-t-2 border-l border-navy max-sm:grid-cols-4">
          {readings.map((day) => {
            const selected = day.date === reading.date;
            const [, month, date] = day.date.split("-").map(Number);
            return (
              <button
                key={day.date}
                type="button"
                aria-pressed={selected}
                aria-current={day.date === today ? "date" : undefined}
                aria-label={`${formatDate(day.date)} ${day.weekday}요일${day.date === today ? ", 오늘" : ""} 말씀 보기`}
                aria-controls="selected-reading"
                onClick={() => selectDate(day.date)}
                className={cn("flex min-h-28 min-w-0 flex-col items-center justify-center gap-1 border-r border-b px-2 py-3", selected ? "border-navy bg-navy text-white hover:bg-navy-deep" : "border-line bg-white text-text hover:bg-soft")}
              >
                <span>{day.weekday}</span>
                <time dateTime={day.date} className="text-xl font-bold tabular">{month}.{date}</time>
                {day.date === today && <span className="rounded-[3px] bg-gold px-2 py-0.5 text-sm leading-normal font-bold text-text">오늘</span>}
              </button>
            );
          })}
        </div>
      </section>

      <p role="status" aria-live="polite" aria-atomic="true" className="sr-only">{formatDate(reading.date)} {reading.weekday}요일 말씀을 선택했습니다.</p>

      <div className="my-8 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-2xl"><time dateTime={reading.date}>{formatDate(reading.date)}</time> <span className="font-normal text-muted">{reading.weekday}요일</span></h2>
        <div role="group" aria-label="이전 또는 다음 날짜 선택" className="flex flex-wrap gap-2">
          <button type="button" className={navigationClass} disabled={index <= 0} onClick={() => selectDate(readings[index - 1].date)}>
            <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden />이전 날
          </button>
          <button type="button" className={navigationClass} disabled={index >= readings.length - 1} onClick={() => selectDate(readings[index + 1].date)}>
            다음 날<ChevronRight className="size-5" strokeWidth={1.75} aria-hidden />
          </button>
        </div>
      </div>

      <div id="selected-reading" className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        <section aria-labelledby="lesson-reading-title" className="col-span-2 min-w-0 border border-line bg-wash p-8 max-md:col-span-1 max-sm:p-5">
          <h3 id="lesson-reading-title" className="section-title text-2xl">안식일학교 교과</h3>
          <p className="mt-5 font-semibold text-navy">{reading.lesson.quarter} · {reading.lesson.number}과 {reading.lesson.title}</p>
          <p className="mt-3 max-w-[68ch] text-[1.75rem] leading-normal font-bold text-ink max-sm:text-2xl">{reading.lesson.dayTitle}</p>
          {sample && <SampleNote />}
          <MoreLink href={broadcastHref("lesson-8-interpretation")} label="교과해설 영상 보기" className="mt-5 whitespace-normal" />
        </section>
        <section aria-labelledby="adult-reading-title" className="min-w-0 border border-line p-8 max-sm:p-5">
          <h3 id="adult-reading-title" className="section-title text-2xl">장년기도력</h3>
          <p className="mt-5 max-w-[68ch] text-xl leading-[1.8] font-semibold text-ink">{reading.adultDevotional}</p>
          {sample && <SampleNote />}
        </section>
        <section aria-labelledby="child-reading-title" className="min-w-0 border border-line p-8 max-sm:p-5">
          <h3 id="child-reading-title" className="section-title text-2xl">어린이기도력</h3>
          <p className="mt-5 max-w-[68ch] text-xl leading-[1.8] font-semibold text-ink">{reading.childDevotional}</p>
          {sample && <SampleNote />}
        </section>
        <section aria-labelledby="verse-reading-title" className="col-span-2 min-w-0 bg-soft p-8 max-md:col-span-1 max-sm:p-5">
          <h3 id="verse-reading-title" className="section-title text-2xl">오늘의 성경</h3>
          <blockquote className="mt-5 max-w-[68ch]">
            <p className="text-xl leading-[1.8]">{reading.verse.text}</p>
            <cite className="mt-4 block font-semibold text-navy not-italic">{reading.verse.ref}</cite>
          </blockquote>
        </section>
      </div>
    </div>
  );
}

function SampleNote() {
  return <p className="mt-2 text-sm text-muted">샘플 제목입니다</p>;
}
