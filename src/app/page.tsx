import { HERO_SLIDES, QUICK_SERVICES } from "@/data/home";
import { BROADCASTS } from "@/data/broadcasts";
import { getReading } from "@/data/today";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { TodayPanel } from "@/components/home/TodayPanel";
import { ServiceGrid } from "@/components/home/ServiceGrid";
import { NewsSection } from "@/components/home/NewsSection";
import { BroadcastSection } from "@/components/home/BroadcastSection";
import { FaithStudySection } from "@/components/home/FaithSections";
import { CommunitySection } from "@/components/home/CommunitySection";
import { ChurchFinder } from "@/components/home/ChurchFinder";
import { LinkGroupsBand } from "@/components/home/LinkBands";

/**
 * Home, in priority order: today → services → news → broadcast →
 * faith/study/mission → church news & boards → church finder → links.
 * Everything else is one step away through the mega menu.
 */
export default function HomePage() {
  return (
    <>
      <div className="bg-soft py-8 max-sm:py-4">
        <div className="wrap grid grid-cols-12 gap-6 max-lg:gap-4">
          <div className="col-span-8 max-lg:col-span-7 max-md:col-span-12">
            <HeroCarousel slides={HERO_SLIDES} />
          </div>
          <div className="col-span-4 max-lg:col-span-5 max-md:col-span-12">
            <TodayPanel reading={getReading()} />
          </div>
        </div>
      </div>
      <ServiceGrid services={QUICK_SERVICES} />
      <NewsSection />
      <BroadcastSection items={BROADCASTS} />
      <CommunitySection />
      <FaithStudySection />
      <ChurchFinder />
      <LinkGroupsBand />
    </>
  );
}
