"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen-dvh flex">
      {/* 데스크톱·iPad 가로 사이드바 (>=1024px) */}
      <aside
        className="sticky top-0 hidden h-screen w-[300px] shrink-0 border-r ipad-lg:block"
        style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-elev))" }}
      >
        <Sidebar />
      </aside>

      {/* 모바일·iPad 세로 햄버거 사이드바 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 ipad-lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40 animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-[88%] max-w-[340px] animate-fade-in border-r"
            style={{ borderColor: "rgb(var(--border))", background: "rgb(var(--bg-elev))" }}
          >
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </aside>
        </div>
      )}

      {/* 메인 영역 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* 모바일·iPad 세로 상단바 */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b px-4 py-3 ipad-lg:hidden"
          style={{
            borderColor: "rgb(var(--border))",
            background: "rgba(var(--bg), 0.85)",
            backdropFilter: "blur(10px)",
          }}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2"
            aria-label="단원 목차 열기"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <div className="font-bold text-[rgb(var(--accent))]">⚡ 아이직</div>
          <div className="w-10" aria-hidden />
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
