"use client";

import { useEffect } from "react";
import { pageKey, useProgress } from "@/lib/progress";

export function ProgressMarker({ unitSlug, pageSlug }: { unitSlug: string; pageSlug: string }) {
  const { markRead, hydrated } = useProgress();

  useEffect(() => {
    if (!hydrated) return;
    // 페이지에 30초 머무르면 "읽음" 처리
    const t = window.setTimeout(() => markRead(pageKey(unitSlug, pageSlug)), 30_000);
    // 또는 페이지 끝까지 스크롤하면 즉시 처리
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      if (scrollPos >= docHeight - 80) {
        markRead(pageKey(unitSlug, pageSlug));
        window.removeEventListener("scroll", handler);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", handler);
    };
  }, [hydrated, markRead, unitSlug, pageSlug]);

  return null;
}
