"use client";

import { useProgress } from "@/lib/progress";

export function HomeProgress({ totalPages }: { totalPages: number }) {
  const { progress, hydrated, reset } = useProgress();
  const doneCount = hydrated ? Object.keys(progress).length : 0;
  const percent = totalPages > 0 ? Math.round((doneCount / totalPages) * 100) : 0;

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-[rgb(var(--fg-muted))]">전체 진도</p>
          <p className="mt-0.5 text-2xl font-extrabold tabular-nums">
            {hydrated ? `${doneCount} / ${totalPages}` : `· / ${totalPages}`}{" "}
            <span className="text-base font-semibold text-[rgb(var(--accent))]">
              ({hydrated ? percent : 0}%)
            </span>
          </p>
        </div>
        {hydrated && doneCount > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirm("진도 기록을 모두 지울까요?")) reset();
            }}
            className="btn-ghost text-sm"
          >
            진도 초기화
          </button>
        )}
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full" style={{ background: "rgb(var(--border))" }}>
        <div
          className="h-full transition-all duration-700"
          style={{
            width: `${hydrated ? percent : 0}%`,
            background: "rgb(var(--accent))",
          }}
        />
      </div>
      <p className="prose-ko mt-3 text-sm text-[rgb(var(--fg-muted))]">
        각 페이지를 끝까지 읽으면 ✓로 자동 체크돼요. 데이터는 이 기기 안에만 저장됩니다 (localStorage).
      </p>
    </div>
  );
}
