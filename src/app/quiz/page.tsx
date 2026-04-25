import Link from "next/link";
import { Shell } from "@/components/Shell";
import { QuizHomeContent } from "./QuizHomeContent";
import { quizCountByUnit, quizUnitMeta, quizzes, type QuizUnit } from "@/content/quizzes";

export const metadata = {
  title: "예상문제 · 아이직 시험공부장",
};

export default function QuizHome() {
  const counts = quizCountByUnit();
  const totalQuestions = quizzes.length;
  const units = (Object.keys(quizUnitMeta) as QuizUnit[]).filter((u) => counts[u] > 0);

  return (
    <Shell>
      <div className="mx-auto max-w-4xl px-5 py-8 ipad:px-8 ipad:py-12">
        <header className="mb-8">
          <p className="text-sm font-medium text-[rgb(var(--accent))]">🎯 예상문제 풀이</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight ipad:text-4xl">
            시험 직전 점검
          </h1>
          <p className="prose-ko mt-3 text-[rgb(var(--fg-muted))]">
            세화고 예시문항 출제 패턴 그대로 만든 <strong className="text-[rgb(var(--fg))]">{totalQuestions}문제</strong>. 단원별로 차근차근 보거나, 시험모드로 한꺼번에 풀어 점수를 확인하세요.
          </p>
        </header>

        <QuizHomeContent />

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-bold">📚 단원별 학습모드</h2>
          <p className="mb-4 text-sm text-[rgb(var(--fg-muted))]">
            한 문제씩 풀고 즉시 정답·해설을 확인합니다. 시험 직전 약점 단원만 골라 보세요.
          </p>
          <div className="grid gap-3 ipad:grid-cols-2">
            {units.map((u) => (
              <Link
                key={u}
                href={`/quiz/learn/${u}`}
                className="card flex items-center justify-between gap-3 p-4 transition hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden>
                    {quizUnitMeta[u].emoji}
                  </span>
                  <div>
                    <div className="font-semibold">{quizUnitMeta[u].title}</div>
                    <div className="text-xs text-[rgb(var(--fg-muted))]">
                      문제 {counts[u]}개
                    </div>
                  </div>
                </div>
                <span aria-hidden className="text-[rgb(var(--accent))]">→</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-lg font-bold">🧪 시험모드 (전체)</h2>
          <p className="mb-4 text-sm text-[rgb(var(--fg-muted))]">
            정답 안 보이게 끝까지 풀고 점수·해설을 한꺼번에 확인합니다.
          </p>
          <div className="grid gap-3 ipad:grid-cols-3">
            <Link
              href={`/quiz/exam/play?count=10`}
              className="card flex flex-col gap-1 p-5 transition hover:-translate-y-0.5"
            >
              <div className="text-2xl" aria-hidden>⚡</div>
              <div className="font-bold">짧게 — 10문</div>
              <div className="text-xs text-[rgb(var(--fg-muted))]">5~10분</div>
            </Link>
            <Link
              href={`/quiz/exam/play?count=20`}
              className="card flex flex-col gap-1 p-5 transition hover:-translate-y-0.5"
            >
              <div className="text-2xl" aria-hidden>🔥</div>
              <div className="font-bold">보통 — 20문</div>
              <div className="text-xs text-[rgb(var(--fg-muted))]">10~20분</div>
            </Link>
            <Link
              href={`/quiz/exam/play?count=all`}
              className="card flex flex-col gap-1 p-5 transition hover:-translate-y-0.5"
            >
              <div className="text-2xl" aria-hidden>🏁</div>
              <div className="font-bold">전체 — {totalQuestions}문</div>
              <div className="text-xs text-[rgb(var(--fg-muted))]">25~40분</div>
            </Link>
          </div>
        </section>
      </div>
    </Shell>
  );
}
