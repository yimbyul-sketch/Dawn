import { Shell } from "@/components/Shell";
import { ResultView } from "./ResultView";

export const metadata = { title: "시험 결과 · 아이직 시험공부장" };

export default async function ExamResultPage({
  searchParams,
}: {
  searchParams: Promise<{ run?: string }>;
}) {
  const sp = await searchParams;
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-8 ipad:px-8 ipad:py-10">
        <ResultView runId={sp.run ?? ""} />
      </div>
    </Shell>
  );
}
