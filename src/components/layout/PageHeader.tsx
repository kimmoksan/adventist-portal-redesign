import Link from "next/link";
import { ChevronRight, House } from "lucide-react";
import { SubNav } from "./SubNav";
import type { MenuSection } from "@/types/content";

type Crumb = { label: string; href?: string };

/**
 * Top of every inner page: breadcrumb, page title (h1), one-line description
 * and, when a menu section is given, its sub-menu as a horizontal nav.
 */
export function PageHeader({
  title,
  description,
  crumbs = [],
  section,
  activeHref,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  section?: MenuSection;
  /** Highlights a sub-menu item on pages that live outside it (e.g. an article under its category) */
  activeHref?: string;
}) {
  return (
    <div className="border-b border-line bg-soft">
      <div className="wrap pt-6 pb-8 max-sm:pt-4 max-sm:pb-6">
        <nav aria-label="현재 위치" className="mb-4">
          <ol className="flex flex-wrap items-center gap-1 text-[0.9375rem] text-muted">
            <li>
              <Link href="/" className="inline-flex min-h-12 items-center gap-1 hover:text-navy hover:underline">
                <House className="size-4" strokeWidth={1.75} aria-hidden />
                홈
              </Link>
            </li>
            {crumbs.map((c, i) => (
              <li key={`${c.label}-${i}`} className="flex items-center gap-1">
                <ChevronRight className="size-4" strokeWidth={1.75} aria-hidden />
                {c.href && i < crumbs.length - 1 ? (
                  <Link href={c.href} className="inline-flex min-h-12 items-center hover:text-navy hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-ink">
                    {c.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="section-title text-[2.25rem] leading-tight max-sm:text-[1.75rem]">{title}</h1>
        {description && <p className="mt-2 max-w-[65ch] text-lg text-muted">{description}</p>}
      </div>
      {section && <SubNav section={section} activeHref={activeHref} />}
    </div>
  );
}
