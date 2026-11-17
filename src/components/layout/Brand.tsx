import Image from "next/image";
import Link from "next/link";
import mark from "@/assets/brand/kuc_mark.svg";
import { cn } from "@/lib/utils";

/**
 * Official church mark + typeset union name, with the portal name 재림마을
 * aligned to the baseline of 한국연합회.
 */
export function Brand({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark";
  return (
    <Link
      href="/"
      aria-label="재림마을 홈 · 제칠일안식일예수재림교 한국연합회"
      className={cn("flex shrink-0 [align-items:last_baseline] no-underline", className)}
    >
      <Image
        src={mark}
        alt=""
        priority={!dark}
        className={cn("mr-3 h-12 w-auto self-center max-lg:h-10 max-sm:mr-2 max-sm:h-[2.125rem]", dark && "brightness-0 invert")}
      />
      <span aria-hidden className={cn("flex flex-col leading-none", dark ? "text-white" : "text-logo")}>
        <small className="mb-1.5 text-[0.8125rem] font-bold tracking-[0.06em] whitespace-nowrap max-sm:mb-1 max-sm:text-[0.6875rem] max-sm:tracking-[0.02em]">
          제칠일안식일예수재림교
        </small>
        <b className="text-[1.75rem] font-extrabold tracking-[-0.02em] whitespace-nowrap max-lg:text-[1.375rem] max-sm:text-lg">
          한국연합회
        </b>
      </span>
      <span
        aria-hidden
        className={cn("mx-4 h-8 w-px self-center max-lg:mx-3 max-lg:h-6 max-sm:mx-2 max-sm:h-[1.125rem]", dark ? "bg-white/25" : "bg-line")}
      />
      <span
        aria-hidden
        className={cn(
          "text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap max-lg:text-[1.375rem] max-sm:text-lg",
          dark ? "text-white" : "text-navy",
        )}
      >
        재림마을
      </span>
    </Link>
  );
}
