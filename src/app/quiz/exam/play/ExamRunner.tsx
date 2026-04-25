"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { quizzes } from "@/content/quizzes";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useQuizProgress } from "@/lib/quiz-progress";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ExamRunner({ countParam }: { countParam: string }) {
  const router = useRouter();
  const { recordExam, hydrated } = useQuizProgress();

  const targetCount = useMemo(() => {
    if (countParam === "all") return quizzes.length;
    const n = parseInt(countParam, 10);
    if (isNaN(n) || n <= 0) return quizzes.length;
    return Math.min(n, quizzes.length);
  }, [countParam]);

  // hydration 안전: shuffle/Date는 클라이언트에서만
  const [questions, setQuestions] = useState<typeof quizzes>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [index, setIndex] = useState(0);
  const [startedAt, setStartedAt] = useState<string>("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const picked = shuffle(quizzes).slice(0, targetCount);
    setQuestions(picked);
    setAnswers(new Array(picked.length).fill(null));
    setStartedAt(new Date().toISOString());
    setReady(true);
  }, [targetCount]);

  if (!ready || questions.length === 0) {
    return (
      <div className="card p-6 text-center text-[rgb(var(--fg-muted))]">
        시험 문제 준비 중…
      </div>
    );
  }

  const q = questions[index];
  const answeredCount = answers.filter((a) => a !== null).length;
  const isLast = index === questions.length - 1;

  const setSelected = (i: number) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  };

  const submit = () => {
    if (!hydrated) return;
    const correct = answers.reduce<number>((acc, sel, i) => {
      if (sel !== null && sel === questions[i].answer) return acc + 1;
      return acc;
    }, 0);
    const id = `exam-${Date.now()}`;
    const finishedAt = new Date().toISOString();
    recordExam({
      id,
      mode: "exam",
      startedAt,
      finishedAt,
      total: questions.length,
      correct,
      answers: questions.map((qq, i) => ({ questionId: qq.id, selected: answers[i] ?? -1 })),
    });
    // 결과 페이지로 직접 데이터 전달 위해 sessionStorage에 questions 정보 저장
    sessionStorage.setItem(
      `aizic.quiz.run.${id}`,
      JSON.stringify({
        id,
        startedAt,
        finishedAt,
        questions: questions.map((qq) => qq.id),
        answers,
      })
    );
    router.push(`/quiz/exam/result?run=${id}`);
  };

  return (
    <div className="space-y-6">
      <nav className="flex items-center justify-between text-sm text-[rgb(var(--fg-muted))]">
        <span>
          <Link href="/quiz" className="inline-link hover:underline">
            🎯 예상문제
          </Link>
          <span className="mx-2">›</span>
          <span>🧪 시험모드</span>
        </span>
        <span className="tabular-nums">
          답변 {answeredCount} / {questions.length}
        </span>
      </nav>

      <QuestionCard
        q={q}
        index={index}
        total={questions.length}
        selected={answers[index]}
        onSelect={setSelected}
      />

      <div className="grid gap-3 ipad:grid-cols-3">
        <button
          type="button"
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          disabled={index === 0}
          className="btn-ghost disabled:opacity-40"
        >
          ← 이전
        </button>
        {!isLast ? (
          <button
            type="button"
            onClick={() => setIndex((i) => Math.min(questions.length - 1, i + 1))}
            className="btn"
          >
            다음 →
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              if (answeredCount < questions.length) {
                if (!confirm(`아직 ${questions.length - answeredCount}문제 답변이 비어 있어요. 그래도 제출할까요?`)) return;
              }
              submit();
            }}
            className="btn"
            style={{ background: "rgb(34 197 94)" }}
          >
            ✅ 제출하기
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            if (confirm("시험을 그만두고 홈으로 돌아갈까요? 답한 내용은 저장되지 않아요.")) {
              router.push("/quiz");
            }
          }}
          className="btn-ghost"
        >
          그만두기
        </button>
      </div>

      {/* 빠른 이동 */}
      <details className="card p-4">
        <summary className="cursor-pointer text-sm font-semibold">
          📋 문제 빠르게 이동 ({questions.length}문제)
        </summary>
        <div className="mt-3 grid grid-cols-8 gap-2 ipad:grid-cols-10">
          {questions.map((_, i) => {
            const filled = answers[i] !== null;
            const active = i === index;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className="rounded-lg p-2 text-xs font-semibold tabular-nums"
                style={{
                  background: active
                    ? "rgb(var(--accent))"
                    : filled
                      ? "rgb(var(--accent-soft))"
                      : "rgb(var(--bg-elev))",
                  color: active ? "white" : "rgb(var(--fg))",
                  border: "1px solid rgb(var(--border))",
                  minHeight: "44px",
                }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </details>
    </div>
  );
}
