"use client";

import { useState } from "react";
import { Copy } from "lucide-react";

export function CopyLinkButton() {
  const [feedback, setFeedback] = useState("");

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setFeedback("영상 링크를 복사했습니다.");
    } catch {
      setFeedback("링크를 복사하지 못했습니다. 주소창의 링크를 직접 복사해 주세요.");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <button type="button" onClick={copyLink} className="inline-flex min-h-12 items-center gap-2 rounded-[2px] border border-line px-5 font-semibold text-navy hover:bg-soft">
        <Copy className="size-5" strokeWidth={1.75} aria-hidden />
        링크 복사
      </button>
      <p role="status" aria-live="polite" aria-atomic="true" className="text-muted">{feedback}</p>
    </div>
  );
}
