import Link from "next/link";
import { Inbox } from "lucide-react";

/** Shown when a list or menu page has no content in the sample data yet. */
export function EmptyState({
  title = "아직 등록된 글이 없습니다",
  description = "이 메뉴의 콘텐츠는 재림마을 공식 사이트에서 이용하실 수 있습니다.",
  action = { label: "공식 사이트로 이동", href: "https://www.adventist.or.kr" },
}: {
  title?: string;
  description?: string;
  action?: { label: string; href: string };
}) {
  const external = action.href.startsWith("http");
  const cls = "mt-6 inline-flex min-h-12 items-center rounded-[2px] border border-navy px-5 font-semibold text-navy hover:bg-tint";
  return (
    <div className="flex flex-col items-center border border-dashed border-line bg-soft px-6 py-16 text-center">
      <Inbox className="mb-4 size-10 text-muted" strokeWidth={1.5} aria-hidden />
      <p className="text-xl font-bold text-ink">{title}</p>
      <p className="mt-2 max-w-[48ch] text-muted">{description}</p>
      {external ? (
        <a href={action.href} target="_blank" rel="noreferrer" className={cls}>
          {action.label}
        </a>
      ) : (
        <Link href={action.href} className={cls}>
          {action.label}
        </Link>
      )}
    </div>
  );
}
