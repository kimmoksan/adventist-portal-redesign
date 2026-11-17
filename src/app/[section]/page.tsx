import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { LinkCard } from "@/components/ui/LinkCard";
import { ITEM_META, SECTION_IDENTITY } from "@/components/layout/sectionIdentity";
import { SectionClosingBand, SectionFeature } from "@/components/section/SectionFeature";
import { MENU, findMenu, menuHref } from "@/data/menu";
import { QUICK_SERVICES } from "@/data/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICE_ICONS as ICON_OF } from "@/components/home/ServiceGrid";

const SECTIONS = ["faith", "mission", "study", "church", "union"];
const SERVICE_ICONS: Record<string, string[]> = {
  faith: ["bible", "hymn", "lesson", "spirit", "devotional", "commentary"],
  mission: ["bible", "study", "address"],
  study: ["bible", "study", "commentary"],
  church: ["address", "lesson", "devotional"],
  union: ["address", "study"],
};

export const dynamicParams = false;
export function generateStaticParams() {
  return MENU.filter((section) => SECTIONS.includes(section.slug)).map((section) => ({ section: section.slug }));
}
type Props = { params: Promise<{ section: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  return { title: findMenu(section).section?.label ?? "메뉴 안내" };
}
export default async function SectionPage({ params }: Props) {
  const { section: slug } = await params;
  const { section } = findMenu(slug);
  if (!section || !SECTIONS.includes(slug)) notFound();
  const services = QUICK_SERVICES.filter((service) => SERVICE_ICONS[slug].includes(service.icon));
  return (
    <>
      <PageHeader title={section.label} description={section.description} crumbs={[{ label: section.label }]} section={section} />
      <div className="wrap py-12">
        <div className="mb-14">
          <SectionFeature slug={slug} />
        </div>
        <section aria-labelledby="section-menu-title">
          <SectionHeading id="section-menu-title" title={`${section.label} 메뉴`} />
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item, i) => {
              const meta = ITEM_META[`${slug}/${item.slug}`];
              return (
                <li key={item.slug} className="min-w-0">
                  <LinkCard
                    href={menuHref(slug, item.slug)}
                    title={item.label}
                    description={meta?.description ?? `${item.label} 자료를 모았습니다.`}
                    icon={meta?.icon ?? SECTION_IDENTITY[slug].icon}
                    index={i + 1}
                  />
                </li>
              );
            })}
          </ul>
        </section>
        <section aria-labelledby="section-services-title" className="mt-12">
          <SectionHeading id="section-services-title" title="자주 찾는 서비스" size="md" />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => { const Icon = ICON_OF[service.icon]; return <li key={service.label} className="min-w-0"><Link href={service.href} className="group flex min-h-24 items-center gap-4 rounded-[3px] border border-line bg-white px-5 py-4 transition-[border-color,box-shadow] hover:border-[#b9c6d6] hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)]"><span className="grid size-12 shrink-0 place-items-center rounded-md bg-tint text-navy transition-colors group-hover:bg-navy group-hover:text-white"><Icon className="size-6" strokeWidth={1.75} aria-hidden /></span><span className="min-w-0 flex-1"><strong className="block text-navy">{service.label}</strong><span className="mt-1 block text-muted">{service.caption}</span></span><ArrowRight className="size-5 shrink-0 text-navy transition-transform group-hover:translate-x-1" strokeWidth={1.75} aria-hidden /></Link></li>; })}</ul>
        </section>
      </div>
      <SectionClosingBand slug={slug} />
    </>
  );
}
