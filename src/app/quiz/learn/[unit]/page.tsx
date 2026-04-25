import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { LearnRunner } from "./LearnRunner";
import { quizUnitMeta, quizzesByUnit, type QuizUnit } from "@/content/quizzes";

export function generateStaticParams() {
  return (Object.keys(quizUnitMeta) as QuizUnit[]).map((u) => ({ unit: u }));
}

export default async function LearnUnitPage({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  if (!(unit in quizUnitMeta)) notFound();
  const unitKey = unit as QuizUnit;
  const list = quizzesByUnit(unitKey);
  if (list.length === 0) notFound();

  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-5 py-8 ipad:px-8 ipad:py-10">
        <LearnRunner unit={unitKey} questions={list} />
      </div>
    </Shell>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ unit: string }>;
}) {
  const { unit } = await params;
  if (!(unit in quizUnitMeta)) return {};
  const meta = quizUnitMeta[unit as QuizUnit];
  return { title: `${meta.title} 학습모드 · 아이직 시험공부장` };
}
