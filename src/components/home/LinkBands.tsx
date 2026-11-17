import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LINK_GROUPS, SNS } from "@/data/home";

const APPS = [
  { label: "구글 플레이", href: "https://play.google.com/store/search?q=재림마을&c=apps" },
  { label: "앱 스토어", href: "https://apps.apple.com/kr/search?term=재림마을" },
];

const row = "grid grid-cols-[7.5rem_minmax(0,1fr)] gap-6 py-3 max-sm:block";
const heading = "pt-2.5 text-xl max-sm:mb-2 max-sm:pt-0";
const linkClass = "flex min-h-12 items-center text-muted hover:text-navy hover:underline";

/** Institution and conference links, then the app and SNS row, in one band above the footer. */
export function LinkGroupsBand() {
  return (
    <section aria-label="기관 · 합회 바로가기와 앱" className="border-t-2 border-navy py-6">
      <div className="wrap">
        {LINK_GROUPS.map((g, i) => (
          <div key={g.title} className={`${row} ${i > 0 ? "border-t border-line" : ""}`}>
            <h2 className={heading}>{g.title}</h2>
            <ul className="flex flex-wrap gap-x-6 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4">
              {g.links.map((l) => (
                <li key={l.label}>
                  {l.href.startsWith("http") ? (
                    <a href={l.href} target="_blank" rel="noreferrer" className={linkClass}>
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className={linkClass}>
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className={`${row} border-t border-line`}>
          <h2 className={heading}>앱 · SNS</h2>
          <ul className="flex flex-wrap items-center gap-x-6 max-sm:grid max-sm:grid-cols-2 max-sm:gap-x-4">
            {APPS.map((a) => (
              <li key={a.label}>
                <a href={a.href} target="_blank" rel="noreferrer" className="flex min-h-12 items-center gap-2 font-semibold text-navy hover:underline">
                  재림마을 앱 · {a.label}
                  <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden />
                </a>
              </li>
            ))}
            {SNS.map((s) => (
              <li key={s}>
                <span className="flex min-h-12 items-center text-muted">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
