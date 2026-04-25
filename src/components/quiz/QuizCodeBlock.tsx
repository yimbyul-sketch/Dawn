"use client";

export function QuizCodeBlock({
  language,
  lines,
}: {
  language: string;
  lines: string[];
}) {
  return (
    <div
      className="my-4 overflow-hidden rounded-xl text-sm"
      style={{ background: "rgb(var(--bg-elev))", border: "1px solid rgb(var(--border))" }}
    >
      <div
        className="flex items-center justify-between border-b px-3 py-1.5 text-xs text-[rgb(var(--fg-muted))]"
        style={{ borderColor: "rgb(var(--border))" }}
      >
        <span>&lt; 코 드 &gt;</span>
        <span className="font-mono">{language}</span>
      </div>
      <pre className="overflow-x-auto p-3 font-mono leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span
                className="mr-3 shrink-0 select-none text-right text-[rgb(var(--fg-muted))]"
                style={{ width: "2.25rem" }}
              >
                {i + 1}
              </span>
              <span className="whitespace-pre">{line || " "}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
