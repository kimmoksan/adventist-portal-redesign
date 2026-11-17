"use client";

import { useId, useState } from "react";
import { Copy, Printer } from "lucide-react";

export function ArticleActions() {
  const [message, setMessage] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");
  const [copying, setCopying] = useState(false);
  const inputId = useId();

  async function copyLink() {
    setCopying(true);
    setMessage("");
    setFallbackUrl("");
    try {
      await navigator.clipboard.writeText(window.location.href);
      setMessage("기사 링크를 복사했습니다.");
    } catch {
      setFallbackUrl(window.location.href);
      setMessage("링크를 자동으로 복사하지 못했습니다. 아래 주소를 선택하여 복사해 주세요.");
    } finally {
      setCopying(false);
    }
  }

  function printArticle() {
    try {
      window.print();
    } catch {
      setMessage("인쇄 창을 열지 못했습니다. 브라우저 메뉴에서 인쇄를 선택해 주세요.");
    }
  }

  const buttonClass = "inline-flex min-h-12 items-center justify-center gap-2 rounded border border-line px-5 font-semibold text-navy hover:bg-tint disabled:opacity-50";

  return (
    <div className="mt-8 print:hidden">
      <div role="group" aria-label="기사 도구" className="flex flex-wrap gap-3">
        <button type="button" onClick={copyLink} disabled={copying} className={buttonClass}>
          <Copy className="size-5" strokeWidth={1.75} aria-hidden />
          {copying ? "복사 중…" : "링크 복사"}
        </button>
        <button type="button" onClick={printArticle} className={buttonClass}>
          <Printer className="size-5" strokeWidth={1.75} aria-hidden />
          인쇄
        </button>
      </div>
      <p role="status" aria-live="polite" aria-atomic="true" className="mt-3 text-muted">{message}</p>
      {fallbackUrl && (
        <div className="mt-3">
          <label htmlFor={inputId} className="mb-2 block font-semibold">기사 주소</label>
          <input id={inputId} type="text" readOnly value={fallbackUrl} onFocus={(event) => event.currentTarget.select()} className="min-h-12 w-full min-w-0 rounded border border-line bg-soft px-3 text-text" />
        </div>
      )}
    </div>
  );
}
