"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, Search } from "lucide-react";
import { MENU, menuHref } from "@/data/menu";
import { cn } from "@/lib/utils";
import { Brand } from "./Brand";
import { FontSizeControl } from "./FontSizeControl";
import { MobileMenu } from "./MobileMenu";

const CLOSE_DELAY = 150;

/**
 * Two-row header: a white utility row that scrolls away, and a navy menu bar
 * that sticks to the top (the header is sticky at -row1 height).
 * Hovering or focusing a menu item slides the mega menu down with that column highlighted.
 */
export function SiteHeader() {
  const router = useRouter();
  const [megaOpen, setMegaOpen] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const headerRef = useRef<HTMLElement>(null);
  const lastTrigger = useRef<HTMLElement | null>(null);

  const open = useCallback((index: number | null, trigger?: HTMLElement) => {
    clearTimeout(closeTimer.current);
    if (trigger) lastTrigger.current = trigger;
    setActive(index);
    setMegaOpen(true);
  }, []);

  const close = useCallback((restoreFocus = false) => {
    clearTimeout(closeTimer.current);
    setMegaOpen(false);
    setActive(null);
    if (restoreFocus) lastTrigger.current?.focus();
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => close(), CLOSE_DELAY);
  }, [close]);

  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen, close]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
    router.push(q ? `/search/?q=${encodeURIComponent(q)}` : "/search/");
  }

  return (
    <header
      ref={headerRef}
      className="sticky -top-[5.5rem] z-30 bg-white max-lg:static"
      onBlur={(e) => {
        if (!headerRef.current?.contains(e.relatedTarget as Node | null)) close();
      }}
    >
      {/* Row 1 */}
      <div className="wrap flex min-h-[5.5rem] items-center gap-6 max-lg:min-h-[4.5rem] max-lg:gap-2">
        <Brand className="max-lg:mr-auto" />

        <div className="ml-auto flex items-center gap-5 max-xl:gap-3 max-lg:hidden">
          <form role="search" onSubmit={onSearch} className="flex h-11 items-center overflow-hidden rounded border border-line focus-within:border-navy focus-within:ring-3 focus-within:ring-navy/20">
            <label htmlFor="header-q" className="sr-only">
              통합검색
            </label>
            <input
              id="header-q"
              name="q"
              type="search"
              placeholder="말씀, 소식, 방송 검색"
              autoComplete="off"
              className="h-full w-60 bg-transparent px-3.5 text-base outline-none placeholder:text-[#5f6d7b] max-xl:w-40"
            />
            <button type="submit" aria-label="검색" className="grid h-full w-11 place-items-center text-navy hover:bg-soft">
              <Search className="size-5" strokeWidth={1.75} />
            </button>
          </form>
          <nav aria-label="회원 메뉴" className="flex items-center text-[0.9375rem]">
            {["로그인", "회원가입", "사이트맵"].map((label, i) => (
              <Link
                key={label}
                href={label === "사이트맵" ? "/sitemap/" : "/login/"}
                className={cn(
                  "relative inline-flex min-h-11 items-center px-2.5 text-text hover:text-navy hover:underline max-xl:px-2",
                  i > 0 && "before:absolute before:left-0 before:top-1/2 before:h-3 before:w-px before:-translate-y-1/2 before:bg-line",
                )}
              >
                {label}
              </Link>
            ))}
          </nav>
          <FontSizeControl />
        </div>

        <Link href="/search/" aria-label="통합검색" className="grid size-12 place-items-center text-navy lg:hidden">
          <Search className="size-6" strokeWidth={1.75} />
        </Link>
        <button
          type="button"
          aria-label="전체메뉴 열기"
          aria-expanded={drawerOpen}
          aria-controls="mobile-menu"
          onClick={() => setDrawerOpen(true)}
          className="grid size-12 place-items-center text-ink lg:hidden"
        >
          <Menu className="size-6" strokeWidth={1.75} />
        </button>
      </div>

      {/* Mobile utility row */}
      <div className="wrap flex flex-wrap items-center justify-between gap-2 border-t border-line py-2 lg:hidden">
        <nav aria-label="회원 메뉴" className="flex text-[0.9375rem]">
          <Link href="/login/" className="inline-flex min-h-11 items-center pr-3">로그인</Link>
          <Link href="/login/" className="inline-flex min-h-11 items-center px-3">회원가입</Link>
        </nav>
        <FontSizeControl />
      </div>

      {/* Row 2: navy menu bar */}
      <div className="bg-navy text-white max-lg:hidden">
        <div className="wrap grid min-h-16 grid-cols-[minmax(0,1fr)_8.5rem]">
          <nav aria-label="주 메뉴" onMouseLeave={scheduleClose}>
            <ul className="grid h-full grid-cols-8">
              {MENU.map((section, i) => {
                const isActive = megaOpen && active === i;
                return (
                  <li key={section.slug} className="flex">
                    <Link
                      href={menuHref(section.slug)}
                      aria-expanded={isActive}
                      aria-controls="mega-menu"
                      onMouseEnter={(e) => open(i, e.currentTarget)}
                      onFocus={(e) => open(i, e.currentTarget)}
                      className={cn(
                        "relative flex flex-1 items-center justify-center text-xl font-bold tracking-[-0.02em] text-white no-underline transition-colors max-xl:text-lg",
                        "after:absolute after:inset-x-4 after:bottom-0 after:h-[3px] after:origin-center after:scale-x-0 after:bg-gold after:transition-transform after:duration-200 after:ease-out-soft",
                        "focus-visible:outline-white focus-visible:-outline-offset-[5px]",
                        isActive ? "bg-navy-deep after:scale-x-100" : "hover:bg-navy-deep",
                      )}
                    >
                      {section.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <button
            type="button"
            aria-expanded={megaOpen && active === null}
            aria-controls="mega-menu"
            onClick={(e) => (megaOpen ? close() : open(null, e.currentTarget))}
            className="flex items-center justify-center gap-2 border-l border-white/20 text-base font-bold hover:bg-navy-deep"
          >
            <Menu className="size-5" strokeWidth={1.75} />
            전체메뉴
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <div
        id="mega-menu"
        hidden={!megaOpen}
        onMouseEnter={() => clearTimeout(closeTimer.current)}
        onMouseLeave={scheduleClose}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_16px_32px_-16px_rgba(17,28,39,0.25)] motion-safe:animate-mega-in max-lg:hidden"
      >
        <nav aria-label="전체 메뉴" className="wrap grid grid-cols-8 pt-5 pr-[8.5rem] pb-7">
          {MENU.map((section, i) => (
            <div
              key={section.slug}
              className={cn(
                "px-3.5 pt-2 pb-4 transition-colors",
                i > 0 && "border-l border-line",
                active === i && "bg-tint",
              )}
            >
              <Link
                href={menuHref(section.slug)}
                onClick={() => close()}
                className={cn(
                  "mb-1.5 flex min-h-11 items-center border-b-2 border-navy text-[1.0625rem] font-bold no-underline",
                  active === i ? "text-navy" : "text-ink",
                )}
              >
                {section.label}
              </Link>
              <ul>
                {section.items.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={menuHref(section.slug, item.slug)}
                      onClick={() => close()}
                      className="flex min-h-10 items-center py-1 text-base text-text hover:text-navy hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <MobileMenu open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </header>
  );
}
