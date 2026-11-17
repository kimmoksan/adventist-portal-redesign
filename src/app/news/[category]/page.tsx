import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { menuHref } from "@/data/menu";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsList } from "@/components/news/NewsList";
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { categoryBySlug, latestNews, newsMenu } from "@/components/news/newsNavigation";
import { EmptyState } from "@/components/ui/EmptyState";

type Props = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return newsMenu.items.map((item) => ({ category: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const item = newsMenu.items.find((entry) => entry.slug === category);
  if (!item) notFound();
  return { title: `${item.label} | 뉴스`, description: newsMenu.description };
}

export default async function NewsCategoryPage({ params }: Props) {
  const { category } = await params;
  const item = newsMenu.items.find((entry) => entry.slug === category);
  if (!item) notFound();
  const articles = category === "all" ? latestNews : latestNews.filter((article) => article.category === categoryBySlug[category]);

  return (
    <>
      <PageHeader title={item.label} description={newsMenu.description} crumbs={[{ label: "뉴스", href: menuHref("news") }, { label: item.label }]} section={newsMenu} />
      <div className="wrap py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <div className="min-w-0">
            {category === "paper" ? (
              <EmptyState title="지면보기는 공식 사이트에서 이용하실 수 있습니다" description="신문 지면과 지난 호를 보시려면 재림마을 공식 사이트의 뉴스 지면보기를 이용해 주세요." action={{ label: "재림마을 공식 사이트로 이동", href: "https://www.adventist.or.kr/" }} />
            ) : <NewsList key={category} articles={articles} />}
          </div>
          <NewsSidebar />
        </div>
      </div>
    </>
  );
}
