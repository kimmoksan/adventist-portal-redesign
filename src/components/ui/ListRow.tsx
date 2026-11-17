import Link from "next/link";
import { cn } from "@/lib/utils";

/** Dated list row used by news, notices and boards. */
export function ListRow({
  href,
  title,
  tag,
  meta,
  clamp = false,
  className,
}: {
  href: string;
  title: string;
  tag?: string;
  meta?: React.ReactNode;
  clamp?: boolean;
  className?: string;
}) {
  return (
    <li className={cn("flex items-center justify-between gap-6 border-b border-line max-sm:items-start max-sm:gap-3", className)}>
      <Link href={href} className={cn("flex min-h-13 min-w-0 flex-1 items-center py-2.5 hover:text-navy hover:underline", clamp && "line-clamp-2 block")}>
        {tag && <Tag>{tag}</Tag>}
        <span className={cn(!clamp && "truncate")}>{title}</span>
      </Link>
      {meta && <span className="shrink-0 py-2.5 text-muted tabular">{meta}</span>}
    </li>
  );
}

export function Tag({ children, tone = "navy" }: { children: React.ReactNode; tone?: "navy" | "grape" }) {
  return (
    <span
      className={cn(
        "mr-2.5 inline-block shrink-0 rounded-[2px] border px-2 py-px text-[0.8125rem] leading-normal font-bold",
        tone === "navy" ? "border-tag text-navy" : "border-[#7f264a] text-[#7f264a]",
      )}
    >
      {children}
    </span>
  );
}
