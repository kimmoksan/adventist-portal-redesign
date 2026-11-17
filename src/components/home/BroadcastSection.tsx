import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import type { Broadcast } from "@/types/content";
import { broadcastHref } from "@/data/broadcasts";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Photo } from "@/components/ui/Photo";

export function BroadcastCard({ item, sizes = "(max-width: 640px) 100vw, 25vw" }: { item: Broadcast; sizes?: string }) {
  return (
    <Link href={broadcastHref(item.id)} className="group block">
      <span className="relative block overflow-hidden bg-ink">
        <Photo photo={item.photo} width={640} ratio="16/9" decorative sizes={sizes} className="transition-transform duration-300 ease-out-soft group-hover:scale-[1.04]" />
        <span aria-hidden className="absolute top-1/2 left-1/2 grid size-12 -translate-1/2 place-items-center rounded-full bg-white text-navy shadow-[0_2px_8px_rgba(17,28,39,0.25)]">
          <Play className="ml-0.5 size-5 fill-current" strokeWidth={1.75} />
        </span>
        <span className="absolute right-2 bottom-2 bg-ink px-1.5 text-white tabular">
          <span className="sr-only">재생 시간 </span>
          {item.duration}
        </span>
      </span>
      <span className="mt-3 mb-1 block font-semibold text-navy">{item.program}</span>
      <span className="block text-xl leading-normal font-bold text-ink group-hover:underline">
        {item.title}
        {item.speaker && <span className="block">{item.speaker}</span>}
      </span>
    </Link>
  );
}

export function BroadcastSection({ items }: { items: Broadcast[] }) {
  return (
    <section aria-labelledby="broadcast-title" className="border-y border-line bg-wash py-12 max-sm:py-10">
      <div className="wrap">
        <SectionHeading id="broadcast-title" title="방송" more={{ href: "/broadcast/" }} />
        <ul className="grid grid-cols-4 gap-6 max-lg:grid-cols-2 max-lg:gap-x-6 max-lg:gap-y-8 max-sm:grid-cols-1">
          {items.slice(0, 4).map((b) => (
            <li key={b.id}>
              <BroadcastCard item={b} />
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap justify-end gap-x-6 gap-y-2 max-sm:justify-start">
          {[
            { label: "52주 챌린지 참여방법", href: broadcastHref("onevoice27-52-weeks") },
            { label: "유년교과 영상", href: broadcastHref("junior-lesson-7") },
          ].map((l) => (
            <Link key={l.label} href={l.href} className="flex min-h-12 items-center gap-2 text-navy hover:underline">
              {l.label}
              <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
