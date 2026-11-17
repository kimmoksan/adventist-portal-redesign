import Image from "next/image";
import type { Photo as PhotoData } from "@/types/content";
import { cn, unsplash } from "@/lib/utils";

type Props = {
  photo: PhotoData;
  /** Requested pixel width from the CDN */
  width: number;
  /** Rendered aspect ratio, e.g. "16/9". Ignored when `fill` is set. */
  ratio?: string;
  /** Cover the nearest positioned parent instead of keeping a ratio */
  fill?: boolean;
  decorative?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function Photo({ photo, width, ratio = "16/10", fill, decorative, priority, className, sizes = "100vw" }: Props) {
  const [w, h] = ratio.split("/").map(Number);
  return (
    <Image
      src={unsplash(photo, width)}
      alt={decorative ? "" : photo.alt}
      width={width}
      height={Math.round((width * h) / w)}
      priority={priority}
      sizes={sizes}
      className={cn(fill ? "absolute inset-0 size-full" : "h-auto w-full", "object-cover", className)}
      style={fill ? undefined : { aspectRatio: ratio }}
    />
  );
}
