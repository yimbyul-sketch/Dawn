"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { findQuiz, quizUnitMeta, type QuizUnit } from "@/content/quizzes";
import { useQuizProgress } from "@/lib/quiz-progress";
import { QuestionCard } from "@/components/quiz/QuestionCard";

type RunSnapshot = {
  id: string;
  questions: string[];
  answers: (number | null)[];
  startedAt: string;
  finishedAt: string;
};

export function ResultView({ runId }: { runId: string }) {
  const { state, hydrated } = useQuizProgress();
  const [snapshot, setSnapshot] = useState<RunSnapshot | null>(null);
  const [showOnlyWrong, setShowOnlyWrong] = useState(true);

  useEffect(() => {
    if (!runId) return;
    try {
      const raw = sessionStorage.getItem(`aizic.quiz.run.${runId}`);
      if (raw) setSnapshot(JSON.parse(raw) as RunSnapshot);
    } catch {
      /* */
    }
  }, [runId]);

  const examMeta = state.exams.find((e) => e.id === runId);

  // 본 페이지에 표시할 질문/답변 결합
  const items = useMemo(() => {
    if (!snapshot) {
      // sessionStorage가 비어있는 경우(다른 기기에서 진입), examMeta의 answers만으로 재구성
      if (!examMeta) return [];
      return examMeta.answers.map((a) => ({
        q: findQuiz(a.questionId)!,
        selected: a.selected >= 0 ? a.selected : null,
      })).filter((x) => x.q);
    }
    return snapshot.questions.map((qid, i) => ({
      q: findQuiz(qid)!,
      selected: snapshot.answers[i] ?? null,
    })).filter((x) => x.q);
  }, [snapshot, examMeta]);

  if (!hydrated) {
    return <div className="text-[rgb(var(--fg-muted))]">불러오는 중…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="card space-y-3 p-6">
        <p className="text-lg">결과를 찾을 수 없어요 🤔</p>
        <p className="text-sm text-[rgb(var(--fg-muted))]">
          시험을 새로 시작해 보세요.
        </p>
        <Link href="/quiz" className="btn inline-flex">
          예상문제 홈으로
        </Link>
      </div>
    );
  }

  const total = items.length;
  const correctCount = items.filter((x) => x.selected !== null && x.selected === x.q.answer).length;
  const score = Math.round((correctCount / total) * 100);

  // 단원별 점수
  const byUnit: Record<string, { correct: number; total: number }> = {};
  for (const x of items) {
    const u = x.q.unit;
    if (!byUnit[u]) byUnit[u] = { correct: 0, total: 0 };
    byUnit[u].total++;
    if (x.selected !== null && x.selected === x.q.answer) byUnit[u].correct++;
  }

  const wrongOrSkipped = items.filter(
    (x) => x.selected === null || x.selected !== x.q.answer
  );

  return (
    <div className="space-y-8">
      <nav className="text-sm text-[rgb(var(--fg-muted))]">
        <Link href="/quiz" className="inline-link hover:underline">
          🎯 예상문제
        </Link>
        <span className="mx-2">›</span>
        <span>🧪 시험 결과</span>
      </nav>

      {/* 점수 카드 */}
      <div
        className="card p-6 text-center"
        style={{
          background:
            score >= 80
              ? "linear-gradient(135deg, rgb(var(--accent-soft)), rgb(var(--bg-elev)))"
              : "rgb(var(--bg-elev))",
        }}
      >
        <div className="text-sm text-[rgb(var(--fg-muted))]">총점</div>
        <div className="mt-2 text-5xl font-extrabold tabular-nums ipad:text-6xl">
          {score}
          <span className="text-2xl">점</span>
        </div>
        <div className="mt-2 text-[rgb(var(--fg-muted))]">
          {correctCount} / {total} 정답
          {examMeta && (
            <>
              <span className="mx-2">·</span>
              <span>
                {(() => {
                  const ms =
                    new Date(examMeta.finishedAt).getTime() -
                    new Date(examMeta.startedAt).getTime();
                  const min = Math.floor(ms / 60000);
                  const sec = Math.floor((ms % 60000) / 1000);
                  return `${min}분 ${sec}초`;
                })()}
              </span>
            </>
          )}
        </div>
      </div>

      {/* 단원별 점수 */}
      <section>
        <h2 className="mb-3 text-lg font-bold">📊 단원별 점수</h2>
        <div className="space-y-2">
          {Object.entries(byUnit).map(([u, s]) => {
            const pct = Math.round((s.correct / s.total) * 100);
            const meta = quizUnitMeta[u as QuizUnit];
            return (
              <div key={u} className="card p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold">
                    {meta.emoji} {meta.title}
                  </span>
                  <span className="text-sm tabular-nums">
                    {s.correct} / {s.total} ({pct}%)
                  </span>
                </div>
                <div
                  className="mt-2 h-1.5 overflow-hidden rounded-full"
                  style={{ background: "rgb(var(--border))" }}
                >
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${pct}%`,
                      background:
                        pct >= 80
                          ? "rgb(34 197 94)"
                          : pct >= 50
                            ? "rgb(var(--accent))"
                            : "rgb(239 68 68)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 해설 */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold">📝 해설</h2>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={showOnlyWrong}
              onChange={(e) => setShowOnlyWrong(e.target.checked)}
              className="h-5 w-5"
            />
            <span>틀린 문제만</span>
          </label>
        </div>
        <div className="space-y-6">
          {(showOnlyWrong ? wrongOrSkipped : items).map((x, i) => (
            <div key={x.q.id} className="card p-5">
              <QuestionCard
                q={x.q}
                index={i}
                total={(showOnlyWrong ? wrongOrSkipped : items).length}
                selected={x.selected}
                onSelect={() => {}}
                showResult
                showExplanation
              />
            </div>
          ))}
          {showOnlyWrong && wrongOrSkipped.length === 0 && (
            <div className="card p-6 text-center text-lg font-semibold">
              🎉 모두 정답! 완벽해요.
            </div>
          )}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/quiz/exam/play?count=all" className="btn">
          🔁 다시 도전
        </Link>
        <Link href="/quiz" className="btn-ghost">
          예상문제 홈으로
        </Link>
      </div>
    </div>
  );
}
