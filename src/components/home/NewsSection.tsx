import type { Notice } from "@/types/content";
import { EVENTS, NOTICES } from "@/data/news";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ListRow } from "@/components/ui/ListRow";
import { formatShortDate } from "@/lib/utils";
import { NewsTabs } from "./NewsTabs";

export function NewsSection() {
  return (
    <div className="wrap grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-12 pt-4 pb-12 max-lg:grid-cols-1 max-lg:gap-10">
      <section aria-labelledby="news-title">
        <SectionHeading id="news-title" title="뉴스" more={{ href: "/news/" }} className="mb-3" />
        <NewsTabs />
      </section>
      <div className="flex flex-col gap-6 max-lg:grid max-lg:grid-cols-2 max-lg:gap-8 max-sm:grid-cols-1">
        <NoticeList id="notice-title" title="공지사항" href="/community/notice/" items={NOTICES} />
        <NoticeList id="events-title" title="행사안내" href="/union/events/" items={EVENTS} />
      </div>
    </div>
  );
}

function NoticeList({ id, title, href, items }: { id: string; title: string; href: string; items: Notice[] }) {
  return (
    <section aria-labelledby={id}>
      <SectionHeading id={id} title={title} size="md" more={{ href }} className="mb-1.5" />
      <ul className="border-t-2 border-navy">
        {items.map((n) => (
          <ListRow key={n.id} href={n.href} title={n.title} meta={formatShortDate(n.date)} clamp />
        ))}
      </ul>
    </section>
  );
}
