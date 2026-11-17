import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NEWS, articleHref, getArticle } from "@/data/news";
import { menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { ArticleActions } from "@/components/news/ArticleActions";
import { categoryHref, latestNews, newsMenu } from "@/components/news/newsNavigation";
import { Tag } from "@/components/ui/ListRow";
import { Photo } from "@/components/ui/Photo";
import { MoreLink, SectionHeading } from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/utils";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return NEWS.map((article) => ({ id: article.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();
  return { title: article.title, description: article.summary };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) notFound();
  const index = latestNews.findIndex((entry) => entry.id === id);
  const previous = latestNews[index + 1];
  const next = latestNews[index - 1];
  const others = latestNews.filter((entry) => entry.id !== id);
  const sameCategory = others.filter((entry) => entry.category === article.category);
  const related = (sameCategory.length > 0 ? sameCategory : others).slice(0, 3);

  return (
    <>
      <PageHeader title={article.title} description={article.summary} crumbs={[{ label: "뉴스", href: menuHref("news") }, { label: article.category, href: categoryHref(article.category) }, { label: "기사" }]} section={newsMenu} activeHref={categoryHref(article.category)} />
      <div className="wrap py-12">
        <article aria-label="기사 본문" className="mx-auto min-w-0 max-w-[68ch] text-[1.125rem] leading-[1.8]">
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line pb-5">
            <Tag>{article.category}</Tag>
            <p className="min-w-0 text-muted">
              {article.author} <span aria-hidden>·</span> <time dateTime={article.date} className="tabular">{formatDate(article.date)}</time>
            </p>
          </div>
          <Photo photo={article.photo} width={1400} ratio="16/9" priority sizes="(min-width: 1024px) 850px, 100vw" className="rounded" />
          <div className="mt-8 space-y-6">
            {article.body.map((paragraph, paragraphIndex) => <p key={paragraphIndex}>{paragraph}</p>)}
          </div>
          <p className="mt-10 rounded border border-line-soft bg-soft p-5 text-muted">
            샘플 기사입니다. 실제 기사는 재림마을 뉴스에서 확인하실 수 있습니다.
          </p>
          <ArticleActions />
        </article>

        <nav aria-label="이전 기사와 다음 기사" className="mx-auto mt-12 max-w-[68ch] border-t-2 border-navy text-[1.125rem] print:hidden">
          {[
            { label: "이전 기사", entry: previous },
            { label: "다음 기사", entry: next },
          ].map(({ label, entry }) => (
            <div key={label} className="border-b border-line">
              {entry ? (
                <Link href={articleHref(entry.id)} className="group flex min-h-12 min-w-0 flex-col gap-2 py-4 hover:bg-soft sm:flex-row sm:gap-6">
                  <span className="shrink-0 font-semibold text-navy">{label}</span>
                  <span className="min-w-0 group-hover:underline">{entry.title}</span>
                </Link>
              ) : (
                <p className="flex min-h-12 flex-wrap gap-x-6 gap-y-2 py-4 text-muted"><span className="font-semibold">{label}</span><span>{label}가 없습니다.</span></p>
              )}
            </div>
          ))}
          <div className="mt-4 flex justify-end"><MoreLink href={menuHref("news", "all")} label="전체기사 보기" /></div>
        </nav>

        {related.length > 0 && (
          <section aria-labelledby="related-news-title" className="mt-12 print:hidden">
            <SectionHeading id="related-news-title" title="관련 기사" />
            <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {related.map((entry) => (
                <li key={entry.id} className="min-w-0">
                  <Link href={articleHref(entry.id)} className="group block min-h-12 min-w-0 border-b border-line pb-5">
                    <div className="mb-4 overflow-hidden rounded">
                      <Photo photo={entry.photo} width={700} ratio="16/10" sizes="(min-width: 1440px) 432px, (min-width: 768px) 32vw, 100vw" className="transition-transform duration-300 ease-out-soft group-hover:scale-[1.03] motion-reduce:transform-none" />
                    </div>
                    <Tag>{entry.category}</Tag>
                    <h3 className="mt-2 text-xl group-hover:underline">{entry.title}</h3>
                    <time dateTime={entry.date} className="mt-3 block text-muted tabular">{formatDate(entry.date)}</time>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  );
}
