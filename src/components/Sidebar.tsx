"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { units } from "@/content/units";
import { pageKey, useProgress } from "@/lib/progress";
import clsx from "clsx";

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { progress, hydrated } = useProgress();

  return (
    <nav aria-label="단원 목차" className="flex h-full flex-col gap-1 overflow-y-auto p-4 text-[15px]">
      <Link
        href="/"
        onClick={onNavigate}
        className="mb-3 flex items-center gap-2 rounded-xl px-3 py-2 font-bold text-[rgb(var(--accent))]"
      >
        <span className="text-xl">⚡</span>
        <span>아이직 시험공부장</span>
      </Link>

      {units.map((unit) => {
        const total = unit.pages.length;
        const done = hydrated
          ? unit.pages.filter((p) => progress[pageKey(unit.slug, p.slug)]).length
          : 0;
        return (
          <UnitGroup
            key={unit.slug}
            unit={unit}
            doneCount={done}
            totalCount={total}
            currentPath={pathname}
            progress={progress}
            onNavigate={onNavigate}
          />
        );
      })}
    </nav>
  );
}

function UnitGroup({
  unit,
  doneCount,
  totalCount,
  currentPath,
  progress,
  onNavigate,
}: {
  unit: (typeof units)[number];
  doneCount: number;
  totalCount: number;
  currentPath: string;
  progress: Record<string, true>;
  onNavigate?: () => void;
}) {
  const isInUnit = currentPath.startsWith(`/${unit.slug}/`);
  const [open, setOpen] = useState(isInUnit || unit.slug === "intro");

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left font-semibold hover:bg-[rgb(var(--bg-elev))]"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden>{unit.emoji}</span>
          <span>{unit.title}</span>
        </span>
        <span className="flex items-center gap-2 text-xs text-[rgb(var(--fg-muted))]">
          <span>
            {doneCount}/{totalCount}
          </span>
          <span className={clsx("transition", open && "rotate-180")} aria-hidden>
            ▾
          </span>
        </span>
      </button>
      {open && (
        <ul className="mt-1 space-y-0.5 pl-2">
          {unit.pages.map((page) => {
            const href = `/${unit.slug}/${page.slug}`;
            const active = currentPath === href;
            const read = !!progress[pageKey(unit.slug, page.slug)];
            return (
              <li key={page.slug}>
                <Link
                  href={href}
                  onClick={onNavigate}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] leading-snug",
                    active
                      ? "bg-[rgb(var(--accent-soft))] text-[rgb(var(--accent))] font-semibold"
                      : "text-[rgb(var(--fg-muted))] hover:bg-[rgb(var(--bg-elev))]"
                  )}
                >
                  <span aria-hidden className="w-4 shrink-0 text-center">
                    {read ? "✓" : "·"}
                  </span>
                  <span className="prose-ko line-clamp-2 flex-1">{page.title}</span>
                  {page.status === "draft" && <span className="chip-warn shrink-0">작성중</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
