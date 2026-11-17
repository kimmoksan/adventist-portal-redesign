import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  id?: string;
  title: string;
  more?: { label?: string; href: string };
  level?: "h1" | "h2";
  size?: "lg" | "md";
  className?: string;
};

/** Section title with the short navy rule above it and an optional "더보기" link on the right. */
export function SectionHeading({ id, title, more, level = "h2", size = "lg", className }: Props) {
  const Tag = level;
  return (
    <div className={cn("mb-5 flex items-end justify-between gap-4", className)}>
      <Tag id={id} className={cn("section-title", size === "lg" ? "text-[1.75rem] max-sm:text-2xl" : "text-2xl")}>
        {title}
      </Tag>
      {more && <MoreLink href={more.href} label={more.label} />}
    </div>
  );
}

export function MoreLink({ href, label = "더보기", className }: { href: string; label?: string; className?: string }) {
  return (
    <Link
      href={href}
      className={cn("inline-flex min-h-12 shrink-0 items-center gap-2 whitespace-nowrap text-muted hover:text-navy hover:underline", className)}
    >
      {label}
      <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
    </Link>
  );
}
