"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

const NUMBER_LABELS = ["①", "②", "③", "④", "⑤"] as const;

export function AnswerOption({
  index,
  text,
  selected,
  showResult,
  isCorrect,
  isCorrectAnswer,
  onClick,
  disabled,
}: {
  index: number;
  text: string;
  selected: boolean;
  showResult?: boolean;
  isCorrect?: boolean; // 학생의 선택이 정답이었는가
  isCorrectAnswer?: boolean; // 이 옵션이 정답인가
  onClick?: () => void;
  disabled?: boolean;
}) {
  // 색상 결정
  let stateClass = "";
  let style: React.CSSProperties = {};

  if (showResult) {
    if (isCorrectAnswer) {
      style = { background: "rgb(220 252 231)", borderColor: "rgb(34 197 94)", color: "rgb(20 83 45)" };
      stateClass = "ring-2 ring-green-500/40";
    } else if (selected && !isCorrect) {
      style = { background: "rgb(254 226 226)", borderColor: "rgb(239 68 68)", color: "rgb(127 29 29)" };
    } else {
      style = { background: "rgb(var(--bg-elev))", borderColor: "rgb(var(--border))" };
    }
  } else if (selected) {
    style = { background: "rgb(var(--accent-soft))", borderColor: "rgb(var(--accent))" };
    stateClass = "ring-2 ring-[rgb(var(--accent))]/30";
  } else {
    style = { background: "rgb(var(--bg-elev))", borderColor: "rgb(var(--border))" };
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={!disabled ? { scale: 0.98 } : undefined}
      className={clsx(
        "flex w-full items-start gap-3 rounded-2xl border px-4 py-3.5 text-left text-[16px] leading-snug transition",
        "min-h-[56px]",
        !disabled && "active:translate-y-[1px]",
        disabled && "cursor-default",
        stateClass
      )}
      style={style}
    >
      <span className="shrink-0 text-xl font-bold leading-tight tabular-nums">
        {NUMBER_LABELS[index]}
      </span>
      <span className="prose-ko flex-1 pt-0.5">{text}</span>
      {showResult && isCorrectAnswer && <span className="ml-2 text-xl">✓</span>}
      {showResult && selected && !isCorrect && <span className="ml-2 text-xl">✗</span>}
    </motion.button>
  );
}

export function StatementOption({
  label,
  text,
  selected,
  showResult,
  correct,
  onClick,
}: {
  label: "ㄱ" | "ㄴ" | "ㄷ" | "ㄹ";
  text: string;
  selected: boolean;
  showResult?: boolean;
  correct?: boolean;
  onClick?: () => void;
}) {
  let style: React.CSSProperties = {};
  if (showResult) {
    if (correct) {
      style = { background: "rgb(220 252 231)", borderColor: "rgb(34 197 94)" };
    } else {
      style = { background: "rgb(254 226 226)", borderColor: "rgb(239 68 68)" };
    }
  } else if (selected) {
    style = { background: "rgb(var(--accent-soft))", borderColor: "rgb(var(--accent))" };
  } else {
    style = { background: "rgb(var(--bg-elev))", borderColor: "rgb(var(--border))" };
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={showResult}
      className={clsx(
        "flex w-full items-start gap-3 rounded-xl border px-3 py-2.5 text-left text-[15px] leading-snug transition",
        "min-h-[48px]"
      )}
      style={style}
    >
      <span className="shrink-0 font-bold">{label}.</span>
      <span className="prose-ko flex-1">{text}</span>
      {showResult && (
        <span className="ml-2 shrink-0 text-lg">
          {correct ? "⭕" : "❌"}
        </span>
      )}
    </button>
  );
}
