import Link from "next/link";
import { BookOpen, BookOpenText, CalendarDays, GraduationCap, MapPin, Music, NotebookPen, Sunrise } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { QuickService, QuickServiceIcon } from "@/types/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const SERVICE_ICONS: Record<QuickServiceIcon, LucideIcon> = {
  bible: BookOpen,
  hymn: Music,
  lesson: CalendarDays,
  spirit: NotebookPen,
  devotional: Sunrise,
  address: MapPin,
  study: GraduationCap,
  commentary: BookOpenText,
};

export function ServiceGrid({ services }: { services: QuickService[] }) {
  return (
    <section aria-labelledby="services-title" className="wrap pt-8 pb-12">
      <SectionHeading id="services-title" title="자주 찾는 서비스" size="md" more={{ label: "신앙 자료 보기", href: "/faith/" }} />
      <ul className="grid grid-cols-8 border-t border-l border-line max-lg:grid-cols-4 max-sm:grid-cols-2">
        {services.map((s) => {
          const Icon = SERVICE_ICONS[s.icon];
          return (
            <li key={s.label} className="border-r border-b border-line">
              <Link
                href={s.href}
                className="group flex min-h-40 flex-col items-center justify-center gap-1.5 px-3 pt-6 pb-5 text-center transition-colors hover:bg-[#f7f9fb] max-sm:min-h-36"
              >
                <span className="mb-2 grid size-14 place-items-center rounded-md bg-tint text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                  <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                </span>
                <span className="text-[1.0625rem] font-bold text-ink group-hover:underline">{s.label}</span>
                <span className="text-sm leading-snug font-medium text-muted max-sm:text-[0.8125rem]">{s.caption}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
