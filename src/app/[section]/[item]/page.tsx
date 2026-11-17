import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MENU, findMenu, menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { LinkCard } from "@/components/ui/LinkCard";
import { ITEM_META, SECTION_IDENTITY } from "@/components/layout/sectionIdentity";
import { SectionHeading } from "@/components/ui/SectionHeading";

const SECTIONS = ["faith", "mission", "study", "church", "union"];
export const dynamicParams = false;
export function generateStaticParams() {
  return MENU.filter((section) => SECTIONS.includes(section.slug)).flatMap((section) => section.items.filter((item) => !(section.slug === "union" && item.slug === "directory")).map((item) => ({ section: section.slug, item: item.slug })));
}
type Props = { params: Promise<{ section: string; item: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section, item } = await params;
  return { title: findMenu(section, item).item?.label ?? "메뉴 안내" };
}
export default async function ItemPage({ params }: Props) {
  const { section: slug, item: itemSlug } = await params;
  const { section, item } = findMenu(slug, itemSlug);
  if (!section || !item || !SECTIONS.includes(slug) || (slug === "union" && itemSlug === "directory")) notFound();
  const siblings = section.items.filter((entry) => entry.slug !== itemSlug);
  const describe = (s: string) => ITEM_META[`${slug}/${s}`]?.description;
  return (
    <>
      <PageHeader title={item.label} description={describe(item.slug) ?? `${item.label} 자료를 모았습니다.`} crumbs={[{ label: section.label, href: menuHref(slug) }, { label: item.label }]} section={section} />
      <div className="wrap py-12">
        <EmptyState title="공식 사이트에서 이용해 주세요" description={`이 리디자인 콘셉트에서는 ${item.label} 메뉴를 재림마을 공식 사이트로 안내합니다. 실제 자료와 서비스는 공식 사이트에서 확인하실 수 있습니다.`} />
        {siblings.length > 0 && <section aria-labelledby="sibling-menu-title" className="mt-12"><SectionHeading id="sibling-menu-title" title={`${section.label}의 다른 메뉴`} size="md" /><ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{siblings.map((sibling) => <li key={sibling.slug} className="min-w-0"><LinkCard href={menuHref(slug, sibling.slug)} title={sibling.label} description={describe(sibling.slug)} icon={ITEM_META[`${slug}/${sibling.slug}`]?.icon ?? SECTION_IDENTITY[slug].icon} /></li>)}</ul></section>}
      </div>
    </>
  );
}
