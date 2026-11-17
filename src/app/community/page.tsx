import type { Metadata } from "next";
import Link from "next/link";
import { BOARD_GROUPS, getBoard, postsOf } from "@/data/community";
import { findMenu, menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { MoreLink } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = { title: "커뮤니티" };

export default function CommunityPage() {
  const { section } = findMenu("community");
  return (
    <>
      <PageHeader title="커뮤니티" description={section?.description} crumbs={[{ label: "커뮤니티" }]} section={section} />
      <div className="wrap py-12">
        {BOARD_GROUPS.map((group, gi) => (
        <section key={group.title} aria-labelledby={`group-${gi}`} className={gi > 0 ? "mt-14" : ""}>
        <div className="mb-5 flex items-baseline gap-3">
          <h2 id={`group-${gi}`} className="section-title text-[1.75rem] max-sm:text-2xl">{group.title}</h2>
          <span className="text-muted">{group.description}</span>
        </div>
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {group.keys.map((key) => {
            const board = getBoard(key)!;
            const posts = [...postsOf(board.key)].sort((a, b) => b.date.localeCompare(a.date));
            const latest = posts[0];
            return (
              <li key={board.key} className="flex min-w-0 flex-col rounded-[3px] border border-line bg-white p-6 transition-[border-color,box-shadow] hover:border-[#b9c6d6] hover:shadow-[0_12px_28px_-16px_rgba(19,35,63,0.45)]">
                <h3 className="text-2xl"><Link href={menuHref("community", board.key)} className="inline-flex min-h-12 items-center hover:text-navy hover:underline">{board.label}</Link></h3>
                <p className="mt-1 text-muted">{board.description}</p>
                <div className="mt-5 flex-1 rounded-[3px] bg-soft px-4 py-3">
                  <p className="text-sm font-semibold text-muted">최근 글</p>
                  {latest ? <><Link href={`${menuHref("community", board.key)}${latest.id}/`} className="flex min-h-12 items-center font-semibold hover:text-navy hover:underline">{latest.title}</Link><time dateTime={latest.date} className="mt-2 block text-muted">{formatDate(latest.date)}</time></> : <p className="py-3 text-muted">아직 등록된 샘플 글이 없습니다.</p>}
                </div>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3"><span className="text-muted">게시글 <span className="tabular">{posts.length}</span>건</span><MoreLink href={menuHref("community", board.key)} label={`${board.label} 보기`} /></div>
              </li>
            );
          })}
        </ul>
        </section>
        ))}
      </div>
    </>
  );
}
