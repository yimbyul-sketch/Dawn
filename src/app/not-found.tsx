import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-5 py-16 text-center">
      <div className="text-5xl">🔍</div>
      <h2 className="mt-4 text-xl font-bold">페이지를 찾을 수 없어요</h2>
      <p className="prose-ko mt-2 text-sm text-[rgb(var(--fg-muted))]">
        주소가 정확한지 다시 확인해주세요.
      </p>
      <Link href="/" className="btn mt-6 inline-flex">
        홈으로
      </Link>
    </div>
  );
}
