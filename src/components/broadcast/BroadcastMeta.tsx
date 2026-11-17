import { formatDate } from "@/lib/utils";
import type { Broadcast } from "@/types/content";

export function BroadcastMeta({ item }: { item: Broadcast }) {
  return (
    <dl className="flex flex-wrap gap-x-6 gap-y-2 text-muted">
      {item.speaker && (
        <div className="flex gap-2">
          <dt>출연</dt>
          <dd className="font-semibold text-text">{item.speaker}</dd>
        </div>
      )}
      <div className="flex gap-2">
        <dt>등록일</dt>
        <dd><time dateTime={item.date}>{formatDate(item.date)}</time></dd>
      </div>
      <div className="flex gap-2">
        <dt>재생 시간</dt>
        <dd className="tabular">{item.duration}</dd>
      </div>
    </dl>
  );
}
