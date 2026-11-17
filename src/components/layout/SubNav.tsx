"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MenuSection } from "@/types/content";
import { menuHref } from "@/data/menu";
import { cn } from "@/lib/utils";

/** Section sub-menu. Scrolls horizontally on phones; the current page is marked with aria-current. */
export function SubNav({ section, activeHref }: { section: MenuSection; activeHref?: string }) {
  const pathname = usePathname();
  const links = [{ label: `${section.label} 홈`, href: menuHref(section.slug) }, ...section.items.map((i) => ({ label: i.label, href: menuHref(section.slug, i.slug) }))];

  return (
    <nav aria-label={`${section.label} 하위 메뉴`} className="border-t border-line bg-white">
      <ul className="wrap flex gap-1 overflow-x-auto">
        {links.map((l) => {
          const current = l.href === activeHref || pathname === l.href || (l.href !== menuHref(section.slug) && pathname.startsWith(l.href));
          return (
            <li key={l.href} className="shrink-0">
              <Link
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex min-h-13 items-center border-b-[3px] px-4 whitespace-nowrap",
                  current ? "border-navy font-bold text-navy" : "border-transparent text-muted hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
