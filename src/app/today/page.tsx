import type { Metadata } from "next";
import { MENU, menuHref } from "@/data/menu";
import { READINGS } from "@/data/today";
import { CONTENT_TODAY } from "@/lib/utils";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReadingCalendar } from "@/components/today/ReadingCalendar";

const description = "날짜별 안식일학교 교과와 기도력, 오늘의 성경을 한곳에서 읽습니다.";

export const metadata: Metadata = { title: "오늘의 말씀", description };

export default function TodayPage() {
  const section = MENU.find((entry) => entry.slug === "faith")!;

  return (
    <>
      <PageHeader title="오늘의 말씀" description={description} crumbs={[{ label: "신앙", href: menuHref("faith") }, { label: "오늘의 말씀" }]} section={section} />
      <div className="wrap py-12">
        <ReadingCalendar readings={READINGS} today={CONTENT_TODAY} />
      </div>
    </>
  );
}
