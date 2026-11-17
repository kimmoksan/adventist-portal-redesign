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
  const cls = "mt-6 inline-flex min-h-12 items-center rounded-[3px] bg-navy px-5 font-semibold text-white hover:bg-navy-deep";
  return (
    <div className="flex flex-col items-center rounded-[3px] border border-line bg-soft px-6 py-14 text-center">
      <span className="mb-5 grid size-16 place-items-center rounded-full bg-white text-navy shadow-[0_2px_10px_-4px_rgba(19,35,63,0.3)]">
        <Inbox className="size-8" strokeWidth={1.5} aria-hidden />
      </span>
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
