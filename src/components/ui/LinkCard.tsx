import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The site's standard box: icon tile, title, one-line description and a footer action.
 * On phones it folds into one row (icon, text, arrow) so long menus stay short.
 * On hover a navy rule draws across the top, the card lifts slightly and the arrow moves.
 */
export function LinkCard({
  href,
  title,
  description,
  icon: Icon,
  index,
  action = "바로가기",
  children,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  /** Optional ordinal shown at the top right, e.g. 1 → "01" */
  index?: number;
  action?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[3px] border border-line bg-white p-6 transition-[border-color,box-shadow,translate] duration-200 ease-out-soft",
        "hover:border-[#b9c6d6] hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)] motion-safe:hover:-translate-y-0.5 max-sm:flex-row max-sm:items-center max-sm:gap-4 max-sm:p-4",
        className,
      )}
    >
      <span aria-hidden className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-navy transition-transform duration-300 ease-out-soft group-hover:scale-x-100" />
      {(Icon || index !== undefined) && (
        <span className="mb-5 flex items-start justify-between gap-4 max-sm:mb-0">
          {Icon && (
            <span className="grid size-12 shrink-0 place-items-center rounded-md max-sm:size-11 bg-tint text-navy transition-colors group-hover:bg-navy group-hover:text-white">
              <Icon className="size-6" strokeWidth={1.75} aria-hidden />
            </span>
          )}
          {index !== undefined && <span className="ml-auto pt-1 text-sm font-semibold text-muted tabular max-sm:hidden">{String(index).padStart(2, "0")}</span>}
        </span>
      )}
      <span className="flex min-w-0 flex-col max-sm:flex-1">
        <strong className="text-xl leading-snug font-bold text-ink group-hover:text-navy max-sm:text-lg">{title}</strong>
        {description && <span className="mt-2 leading-relaxed text-muted max-sm:mt-0.5 max-sm:text-[0.9375rem]">{description}</span>}
        {children}
      </span>
      <span aria-hidden className="min-h-5 flex-1 max-sm:hidden" />
      <span className="flex items-center gap-2 border-t border-line-soft pt-4 font-semibold text-navy max-sm:shrink-0 max-sm:border-0 max-sm:pt-0">
        <span className="max-sm:sr-only">{action}</span>
        <ArrowRight className="size-5 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={1.75} aria-hidden />
      </span>
    </Link>
  );
}
