import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MENU, findMenu, menuHref } from "@/data/menu";
import { QUICK_SERVICES } from "@/data/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";

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
        <section aria-labelledby="section-menu-title">
          <SectionHeading id="section-menu-title" title={`${section.label} 메뉴`} />
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => <li key={item.slug} className="min-w-0 border border-line"><Link href={menuHref(slug, item.slug)} className="group flex h-full min-h-36 flex-col p-6 hover:bg-soft"><h3 className="flex items-center justify-between gap-4 text-2xl group-hover:text-navy group-hover:underline">{item.label}<ArrowRight className="size-5 shrink-0 text-navy" strokeWidth={1.75} aria-hidden /></h3><p className="mt-3 text-muted">{item.label} 자료를 모았습니다.</p></Link></li>)}
          </ul>
        </section>
        <section aria-labelledby="section-services-title" className="mt-12">
          <SectionHeading id="section-services-title" title="자주 찾는 서비스" size="md" />
          <ul className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">{services.map((service) => <li key={service.label} className="min-w-0 border-r border-b border-line"><Link href={service.href} className="flex min-h-24 items-center justify-between gap-4 px-6 py-4 hover:bg-tint"><span className="min-w-0"><strong className="block text-navy">{service.label}</strong><span className="mt-1 block text-muted">{service.caption}</span></span><ArrowRight className="size-5 shrink-0 text-navy" strokeWidth={1.75} aria-hidden /></Link></li>)}</ul>
        </section>
      </div>
    </>
  );
}
