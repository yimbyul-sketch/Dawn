"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "aizic.quiz.v1";

export type LearnAnswer = {
  questionId: string;
  selected: number;
  correct: boolean;
  at: string; // ISO
};

export type ExamRun = {
  id: string;
  mode: "exam";
  startedAt: string;
  finishedAt: string;
  total: number;
  correct: number;
  answers: { questionId: string; selected: number }[];
};

export type QuizState = {
  learn: Record<string, LearnAnswer>; // questionId → 마지막 답
  exams: ExamRun[];
};

const initial: QuizState = { learn: {}, exams: [] };

function load(): QuizState {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return initial;
    const parsed = JSON.parse(raw) as Partial<QuizState>;
    return { learn: parsed.learn ?? {}, exams: parsed.exams ?? [] };
  } catch {
    return initial;
  }
}

function save(state: QuizState) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* 용량 초과 등 무시 */
  }
}

export function useQuizProgress() {
  const [state, setState] = useState<QuizState>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(load());
    setHydrated(true);
  }, []);

  const recordLearn = useCallback((a: LearnAnswer) => {
    setState((prev) => {
      const next: QuizState = { ...prev, learn: { ...prev.learn, [a.questionId]: a } };
      save(next);
      return next;
    });
  }, []);

  const recordExam = useCallback((run: ExamRun) => {
    setState((prev) => {
      // 최근 10회까지만 보관
      const exams = [run, ...prev.exams].slice(0, 10);
      const next: QuizState = { ...prev, exams };
      save(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setState(initial);
    save(initial);
  }, []);

  return { state, hydrated, recordLearn, recordExam, reset };
}
