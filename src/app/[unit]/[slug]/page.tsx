import { notFound } from "next/navigation";
import Link from "next/link";
import { findPage, getAllPagePaths } from "@/content/units";
import { Shell } from "@/components/Shell";
import { ProgressMarker } from "@/components/ProgressMarker";
import { NotionContent } from "@/components/NotionContent";

export function generateStaticParams() {
  return getAllPagePaths();
}

type Params = { unit: string; slug: string };

export default async function PageView({ params }: { params: Promise<Params> }) {
  const { unit: unitSlug, slug } = await params;
  const found = findPage(unitSlug, slug);
  if (!found) notFound();
  const { unit, page, prev, next } = found;

  return (
    <Shell>
      <article className="mx-auto max-w-3xl px-5 py-8 ipad:px-8 ipad:py-10">
        <ProgressMarker unitSlug={unit.slug} pageSlug={page.slug} />

        <nav className="mb-4 text-sm text-[rgb(var(--fg-muted))]">
          <Link href="/" className="inline-link hover:underline">홈</Link>
          <span className="mx-2">›</span>
          <span>{unit.emoji} {unit.title}</span>
        </nav>

        <header className="mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="prose-ko text-2xl font-extrabold ipad:text-3xl">{page.title}</h1>
            {page.status === "draft" && <span className="chip-warn">🚧 작성중</span>}
          </div>
        </header>

        {/* 노션 콘텐츠 */}
        <div className="prose-ko">
          <NotionContent unitSlug={unit.slug} pageSlug={page.slug} notionId={page.notionId} draft={page.status === "draft"} />
        </div>

        {/* 이전/다음 */}
        <nav className="mt-12 grid gap-3 ipad:grid-cols-2">
          {prev ? (
            <Link href={`/${unit.slug}/${prev.slug}`} className="card flex flex-col gap-1 p-4 text-left transition hover:-translate-y-0.5">
              <span className="text-xs text-[rgb(var(--fg-muted))]">← 이전</span>
              <span className="prose-ko font-semibold">{prev.title}</span>
            </Link>
          ) : <div className="hidden ipad:block" />}
          {next ? (
            <Link href={`/${unit.slug}/${next.slug}`} className="card flex flex-col gap-1 p-4 text-right transition hover:-translate-y-0.5">
              <span className="text-xs text-[rgb(var(--fg-muted))]">다음 →</span>
              <span className="prose-ko font-semibold">{next.title}</span>
            </Link>
          ) : <div className="hidden ipad:block" />}
        </nav>
      </article>
    </Shell>
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { unit, slug } = await params;
  const found = findPage(unit, slug);
  if (!found) return {};
  return {
    title: `${found.page.title} · 아이직 시험공부장`,
  };
}
