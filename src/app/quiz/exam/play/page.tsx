import { Shell } from "@/components/Shell";
import { ExamRunner } from "./ExamRunner";

export const metadata = { title: "시험모드 · 아이직 시험공부장" };

export default async function ExamPlayPage({
  searchParams,
}: {
  searchParams: Promise<{ count?: string }>;
}) {
  const sp = await searchParams;
  const countParam = sp.count ?? "all";
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-8 ipad:px-8 ipad:py-10">
        <ExamRunner countParam={countParam} />
      </div>
    </Shell>
  );
}
