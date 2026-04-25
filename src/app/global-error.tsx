"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h2>문제가 발생했어요</h2>
        <p style={{ color: "#666", fontSize: "14px" }}>{error.message}</p>
        <button onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          다시 시도
        </button>
      </body>
    </html>
  );
}
