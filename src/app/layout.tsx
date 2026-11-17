import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FontSizeProvider, fontSizeBootScript } from "@/components/providers/FontSizeProvider";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { BackToTop } from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: { default: "재림마을 | 제칠일안식일예수재림교 한국연합회", template: "%s | 재림마을" },
  description: "재림마을 리디자인 컨셉 — 오늘의 말씀, 교단 소식, 방송과 신앙 자료를 전 연령이 쉽게 만나는 포털",
  // Unofficial portfolio concept: keep it out of search results so it is never mistaken for the real site.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#1b2f52",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: fontSizeBootScript }} />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body>
        <FontSizeProvider>
          <a
            href="#main"
            className="fixed left-4 top-2 z-[100] -translate-y-[160%] border-2 border-navy bg-white px-4 py-3 font-bold text-navy focus:translate-y-0"
          >
            본문 바로가기
          </a>
          <SiteHeader />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </FontSizeProvider>
      </body>
    </html>
  );
}
