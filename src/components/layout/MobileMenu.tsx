"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ChevronDown, X } from "lucide-react";
import { MENU, menuHref } from "@/data/menu";

/** Full-screen accordion menu for phones and tablets, built on <dialog> for focus trapping and Esc. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      id="mobile-menu"
      aria-label="전체 메뉴"
      onClose={onClose}
      className="m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-white p-0 text-text backdrop:bg-ink/60"
    >
      <div className="sticky top-0 z-10 flex min-h-[4.5rem] items-center justify-between border-b border-line bg-white px-4">
        <strong className="text-lg text-ink">재림마을 전체메뉴</strong>
        <button type="button" onClick={onClose} aria-label="전체메뉴 닫기" className="grid size-12 place-items-center">
          <X className="size-6" strokeWidth={1.75} />
        </button>
      </div>
      <nav aria-label="전체 메뉴">
        {MENU.map((section, i) => (
          <details key={section.slug} open={i === 0} className="group border-b border-line">
            <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between px-4 text-xl font-bold text-ink [&::-webkit-details-marker]:hidden">
              {section.label}
              <ChevronDown className="size-5 transition-transform group-open:rotate-180" strokeWidth={1.75} />
            </summary>
            <ul className="grid grid-cols-2 gap-x-4 bg-soft px-4 pt-1 pb-4">
              <li className="col-span-2">
                <Link href={menuHref(section.slug)} onClick={onClose} className="flex min-h-12 items-center font-bold text-navy">
                  {section.label} 첫 화면
                </Link>
              </li>
              {section.items.map((item) => (
                <li key={item.slug}>
                  <Link href={menuHref(section.slug, item.slug)} onClick={onClose} className="flex min-h-12 items-center">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
    </dialog>
  );
}
