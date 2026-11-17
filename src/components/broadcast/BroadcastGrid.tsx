import { BroadcastCard } from "@/components/home/BroadcastSection";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Broadcast } from "@/types/content";

export function BroadcastGrid({ items }: { items: Broadcast[] }) {
  if (items.length === 0) {
    return <EmptyState title="아직 등록된 영상이 없습니다" description="이 분류의 영상은 재림마을 공식 사이트에서 확인하실 수 있습니다." />;
  }

  return (
    <ul className="grid grid-cols-4 gap-x-6 gap-y-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
      {items.map((item) => (
        <li key={item.id} className="min-w-0">
          <BroadcastCard item={item} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        </li>
      ))}
    </ul>
  );
}
