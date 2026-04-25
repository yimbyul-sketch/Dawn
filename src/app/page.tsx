import Link from "next/link";
import { units } from "@/content/units";
import { Shell } from "@/components/Shell";
import { HomeProgress } from "@/components/HomeProgress";

export default function Home() {
  const totalPages = units.reduce((sum, u) => sum + u.pages.length, 0);

  return (
    <Shell>
      <div className="mx-auto max-w-5xl px-5 py-8 ipad:px-8 ipad:py-12">
        <header className="mb-10">
          <p className="text-sm font-medium text-[rgb(var(--accent))]">고등학교 2학년 인공지능 기초</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight ipad:text-4xl">
            ⚡ 아이직 시험공부장
          </h1>
          <p className="prose-ko mt-3 max-w-2xl text-[rgb(var(--fg-muted))]">
            노션에 정리된{" "}
            <a className="inline-link underline" href="https://aizic.notion.site/" target="_blank" rel="noreferrer">
              아이직 학습자료
            </a>
            를 단원별로 다시 묶어, 아이패드에서 책처럼 보면서 시험공부할 수 있도록 만든 사이트입니다.
          </p>
        </header>

        <HomeProgress totalPages={totalPages} />

        <section className="mt-10 grid gap-4 ipad:grid-cols-2">
          {units.map((unit) => (
            <UnitCard key={unit.slug} unit={unit} />
          ))}
        </section>

        <footer className="mt-16 border-t pt-6 text-center text-sm text-[rgb(var(--fg-muted))]" style={{ borderColor: "rgb(var(--border))" }}>
          미래엔 인공지능 기초 교과서 기반 ·{" "}
          <a className="inline-link underline" href="https://aizic.notion.site/" target="_blank" rel="noreferrer">
            원본 노션 보기
          </a>
        </footer>
      </div>
    </Shell>
  );
}

function UnitCard({ unit }: { unit: (typeof units)[number] }) {
  return (
    <Link
      href={`/${unit.slug}/${unit.pages[0]?.slug ?? ""}`}
      className="card p-5 transition hover:-translate-y-0.5"
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>{unit.emoji}</span>
          <h3 className="text-lg font-bold">{unit.title}</h3>
        </div>
        <span className="text-xs text-[rgb(var(--fg-muted))]">
          {unit.pages.length}개 단원
        </span>
      </div>
      <p className="prose-ko mt-2 text-sm text-[rgb(var(--fg-muted))]">{unit.description}</p>
    </Link>
  );
}
