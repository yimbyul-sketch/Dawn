"use client";

import Link from "next/link";
import { useState } from "react";
import type { QuizQuestion, QuizUnit } from "@/content/quizzes";
import { quizUnitMeta } from "@/content/quizzes";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { useQuizProgress } from "@/lib/quiz-progress";

export function LearnRunner({
  unit,
  questions,
}: {
  unit: QuizUnit;
  questions: QuizQuestion[];
}) {
  const meta = quizUnitMeta[unit];
  const { recordLearn } = useQuizProgress();
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const q = questions[index];
  const isLast = index === questions.length - 1;

  const onCheck = () => {
    if (selected === null) return;
    setShowResult(true);
    recordLearn({
      questionId: q.id,
      selected,
      correct: selected === q.answer,
      at: new Date().toISOString(),
    });
  };

  const onPrev = () => {
    if (index === 0) return;
    setIndex(index - 1);
    setSelected(null);
    setShowResult(false);
  };

  const onNext = () => {
    if (isLast) return;
    setIndex(index + 1);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      <nav className="text-sm text-[rgb(var(--fg-muted))]">
        <Link href="/quiz" className="inline-link hover:underline">
          🎯 예상문제
        </Link>
        <span className="mx-2">›</span>
        <span>
          {meta.emoji} {meta.title} 학습모드
        </span>
      </nav>

      <QuestionCard
        q={q}
        index={index}
        total={questions.length}
        selected={selected}
        onSelect={(i) => !showResult && setSelected(i)}
        showResult={showResult}
        showExplanation={showResult}
      />

      <div className="grid gap-3 ipad:grid-cols-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={index === 0}
          className="btn-ghost disabled:opacity-40"
        >
          ← 이전
        </button>
        {!showResult ? (
          <button
            type="button"
            onClick={onCheck}
            disabled={selected === null}
            className="btn disabled:opacity-40"
          >
            정답 확인
          </button>
        ) : isLast ? (
          <Link href="/quiz" className="btn text-center">
            홈으로 ↩
          </Link>
        ) : (
          <button type="button" onClick={onNext} className="btn">
            다음 →
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className="btn-ghost disabled:opacity-40"
        >
          건너뛰기 →
        </button>
      </div>
    </div>
  );
}
