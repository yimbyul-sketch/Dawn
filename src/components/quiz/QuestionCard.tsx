"use client";

import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion, quizUnitMeta } from "@/content/quizzes";
import { QuizCodeBlock } from "./QuizCodeBlock";
import { AnswerOption, StatementOption } from "./AnswerOption";

export function QuestionCard({
  q,
  index,
  total,
  selected,
  onSelect,
  showResult,
  showExplanation,
}: {
  q: QuizQuestion;
  index: number;
  total: number;
  selected: number | null;
  onSelect: (i: number) => void;
  showResult?: boolean;
  showExplanation?: boolean;
}) {
  const isCorrect = selected !== null && selected === q.answer;
  const meta = quizUnitMeta[q.unit];

  return (
    <article className="space-y-5">
      {/* 진행 표시 */}
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-[rgb(var(--fg-muted))]">
          <span aria-hidden>{meta.emoji}</span>
          <span>{meta.title}</span>
          <span>·</span>
          <span className="tabular-nums">
            {index + 1} / {total}
          </span>
        </div>
        <span className="chip text-xs">
          {q.difficulty === "easy" ? "기본" : q.difficulty === "medium" ? "보통" : "심화"}
        </span>
      </header>

      <div
        className="h-1.5 overflow-hidden rounded-full"
        style={{ background: "rgb(var(--border))" }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{
            width: `${((index + 1) / total) * 100}%`,
            background: "rgb(var(--accent))",
          }}
        />
      </div>

      {/* 문제 */}
      <div className="prose-ko text-[17px] font-semibold leading-relaxed ipad:text-lg">
        {q.question}
      </div>

      {/* <보기> 박스 */}
      {q.bokiBox && (
        <div
          className="rounded-xl border-2 px-4 py-3 text-[15px] leading-relaxed prose-ko"
          style={{
            borderColor: "rgb(var(--border))",
            borderStyle: "dashed",
          }}
        >
          <div className="mb-1.5 text-center text-xs font-semibold tracking-wider text-[rgb(var(--fg-muted))]">
            &lt; 보 기 &gt;
          </div>
          {q.bokiBox}
        </div>
      )}

      {/* 코드 박스 */}
      {q.code && <QuizCodeBlock language={q.code.language} lines={q.code.lines} />}

      {/* ㄱ/ㄴ/ㄷ/ㄹ 진술문 */}
      {q.statements && q.statements.length > 0 && (
        <div
          className="rounded-xl border-2 p-3"
          style={{
            borderColor: "rgb(var(--border))",
            borderStyle: "dashed",
          }}
        >
          <div className="mb-2 text-center text-xs font-semibold tracking-wider text-[rgb(var(--fg-muted))]">
            &lt; 보 기 &gt;
          </div>
          <div className="space-y-2">
            {q.statements.map((s) => (
              <StatementOption
                key={s.label}
                label={s.label}
                text={s.text}
                selected={false}
                showResult={showResult}
                correct={s.correct}
              />
            ))}
          </div>
        </div>
      )}

      {/* 5지선다 보기 */}
      <div className="space-y-2.5">
        {q.options.map((opt, i) => (
          <AnswerOption
            key={i}
            index={i}
            text={opt}
            selected={selected === i}
            showResult={showResult}
            isCorrect={isCorrect}
            isCorrectAnswer={i === q.answer}
            onClick={() => onSelect(i)}
            disabled={showResult}
          />
        ))}
      </div>

      {/* 해설 */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="card space-y-2 p-4"
          >
            <div className="flex items-center gap-2 font-bold">
              {isCorrect ? (
                <>
                  <span className="text-xl">🎉</span>
                  <span className="text-green-700 dark:text-green-400">정답!</span>
                </>
              ) : (
                <>
                  <span className="text-xl">📝</span>
                  <span className="text-[rgb(var(--fg))]">
                    정답: {["①", "②", "③", "④", "⑤"][q.answer]}
                  </span>
                </>
              )}
            </div>
            <p className="prose-ko text-sm leading-relaxed">{q.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
