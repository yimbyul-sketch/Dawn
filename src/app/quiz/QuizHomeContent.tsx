"use client";

import Link from "next/link";
import { useQuizProgress } from "@/lib/quiz-progress";
import { quizzes } from "@/content/quizzes";

export function QuizHomeContent() {
  const { state, hydrated } = useQuizProgress();

  const learnedCount = hydrated ? Object.keys(state.learn).length : 0;
  const learnedCorrect = hydrated
    ? Object.values(state.learn).filter((a) => a.correct).length
    : 0;
  const lastExam = state.exams[0];

  return (
    <div className="grid gap-3 ipad:grid-cols-2">
      <div className="card p-5">
        <div className="text-sm text-[rgb(var(--fg-muted))]">📝 학습모드 진행</div>
        <div className="mt-1.5 text-2xl font-extrabold tabular-nums">
          {hydrated ? `${learnedCount} / ${quizzes.length}` : `· / ${quizzes.length}`}
          {hydrated && learnedCount > 0 && (
            <span className="ml-2 text-base font-semibold text-[rgb(var(--accent))]">
              정답 {learnedCorrect}개
            </span>
          )}
        </div>
        <div
          className="mt-3 h-2 overflow-hidden rounded-full"
          style={{ background: "rgb(var(--border))" }}
        >
          <div
            className="h-full transition-all duration-700"
            style={{
              width: `${hydrated ? (learnedCount / quizzes.length) * 100 : 0}%`,
              background: "rgb(var(--accent))",
            }}
          />
        </div>
      </div>

      <div className="card p-5">
        <div className="text-sm text-[rgb(var(--fg-muted))]">🧪 최근 시험 기록</div>
        {hydrated && lastExam ? (
          <>
            <div className="mt-1.5 text-2xl font-extrabold tabular-nums">
              {lastExam.correct} / {lastExam.total}
              <span className="ml-2 text-base font-semibold text-[rgb(var(--accent))]">
                {Math.round((lastExam.correct / lastExam.total) * 100)}점
              </span>
            </div>
            <div className="mt-1 text-xs text-[rgb(var(--fg-muted))]">
              {new Date(lastExam.finishedAt).toLocaleString("ko-KR", {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
            <Link
              href={`/quiz/exam/result?run=${lastExam.id}`}
              className="mt-3 inline-block text-sm font-semibold text-[rgb(var(--accent))] underline-offset-2 hover:underline"
            >
              결과 다시 보기 →
            </Link>
          </>
        ) : (
          <div className="prose-ko mt-2 text-sm text-[rgb(var(--fg-muted))]">
            아직 시험모드 기록이 없어요. 아래 시험모드 카드로 시작!
          </div>
        )}
      </div>
    </div>
  );
}
