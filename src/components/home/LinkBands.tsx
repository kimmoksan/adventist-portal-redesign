import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LINK_GROUPS, SNS } from "@/data/home";

export function LinkGroupsBand() {
  return (
    <section aria-label="기관 및 합회 바로가기" className="border-t-2 border-navy py-6">
      <div className="wrap">
        {LINK_GROUPS.map((g, i) => (
          <div
            key={g.title}
            className={`grid grid-cols-[7.5rem_minmax(0,1fr)] gap-6 py-3 max-sm:block ${i > 0 ? "border-t border-line" : ""}`}
          >
            <h2 className="pt-2.5 text-xl max-sm:mb-2 max-sm:pt-0">{g.title}</h2>
            <ul className="flex flex-wrap gap-x-6 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4">
              {g.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className="flex min-h-12 items-center text-muted hover:text-navy hover:underline">
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="flex min-h-12 items-center text-muted hover:text-navy hover:underline">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ConnectBand() {
  return (
    <section aria-label="앱 다운로드와 소셜 미디어" className="border-y border-line bg-soft py-6">
      <div className="wrap flex items-center justify-between gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <strong className="mr-2 max-sm:w-full">재림마을 앱</strong>
          {[
            { label: "구글 플레이", href: "https://play.google.com/store/search?q=재림마을&c=apps" },
            { label: "앱 스토어", href: "https://apps.apple.com/kr/search?term=재림마을" },
          ].map((a) => (
            <a
              key={a.label}
              href={a.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-12 items-center gap-3 rounded-[2px] border border-line bg-white px-5 font-semibold text-navy hover:bg-tint max-sm:flex-1 max-sm:justify-center"
            >
              {a.label}
              <ArrowRight className="size-5" strokeWidth={1.75} aria-hidden />
            </a>
          ))}
        </div>
        <ul className="flex flex-wrap items-center gap-x-5">
          <li>
            <strong>SNS</strong>
          </li>
          {SNS.map((s) => (
            <li key={s}>
              <span className="flex min-h-12 items-center text-muted">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
