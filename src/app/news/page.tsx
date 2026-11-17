import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { NewsList } from "@/components/news/NewsList";
import { NewsSidebar } from "@/components/news/NewsSidebar";
import { latestNews, newsMenu } from "@/components/news/newsNavigation";

export const metadata: Metadata = { title: "뉴스", description: newsMenu.description };

export default function NewsPage() {
  return (
    <>
      <PageHeader title="뉴스" description={newsMenu.description} crumbs={[{ label: "뉴스" }]} section={newsMenu} />
      <div className="wrap py-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
          <NewsList articles={latestNews} showLead />
          <NewsSidebar />
        </div>
      </div>
    </>
  );
}
