"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center">
      <div className="text-5xl">😵</div>
      <h2 className="mt-4 text-xl font-bold">잠시 문제가 생겼어요</h2>
      <p className="prose-ko mt-2 text-sm text-[rgb(var(--fg-muted))]">
        새로고침 해도 계속 같은 화면이면 알려주세요.
      </p>
      <button onClick={() => reset()} className="btn mt-6">
        다시 시도
      </button>
    </div>
  );
}
