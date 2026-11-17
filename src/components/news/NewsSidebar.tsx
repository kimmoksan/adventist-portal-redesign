import { menuHref } from "@/data/menu";
import { EVENTS, NOTICES } from "@/data/news";
import { ListRow } from "@/components/ui/ListRow";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatShortDate } from "@/lib/utils";

export function NewsSidebar() {
  return (
    <aside aria-label="공지사항과 행사안내" className="hidden min-w-0 flex-col gap-8 lg:flex print:hidden">
      {[
        { id: "news-notices", title: "공지사항", href: menuHref("community", "notice"), items: NOTICES },
        { id: "news-events", title: "행사안내", href: menuHref("union", "events"), items: EVENTS },
      ].map(({ id, title, href, items }) => (
        <section key={id} aria-labelledby={id} className="min-w-0">
          <SectionHeading id={id} title={title} size="md" more={{ href, label: `${title} 더보기` }} className="mb-1.5 flex-wrap" />
          <ul className="border-t-2 border-navy">
            {items.map((item) => (
              <ListRow key={item.id} href={item.href} title={item.title} meta={<time dateTime={item.date}>{formatShortDate(item.date)}</time>} clamp />
            ))}
          </ul>
        </section>
      ))}
    </aside>
  );
}
