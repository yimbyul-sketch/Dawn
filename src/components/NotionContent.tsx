import fs from "node:fs";
import path from "node:path";

const CACHE_DIR = path.join(process.cwd(), "content", "notion-cache");

type CachedPage = {
  id: string;
  title?: string;
  blocks: Block[];
};

type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string; caption?: string }
  | { type: "callout"; emoji?: string; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "divider" };

function loadCache(notionId: string): CachedPage | null {
  if (!notionId) return null;
  const file = path.join(CACHE_DIR, `${notionId}.json`);
  try {
    const raw = fs.readFileSync(file, "utf8");
    return JSON.parse(raw) as CachedPage;
  } catch {
    return null;
  }
}

export function NotionContent({
  notionId,
  draft,
}: {
  unitSlug?: string;
  pageSlug?: string;
  notionId: string;
  draft?: boolean;
}) {
  const cached = loadCache(notionId);

  if (!cached || cached.blocks.length === 0) {
    return (
      <div className="card space-y-3 p-6">
        {draft && (
          <div className="flex items-start gap-2 text-sm">
            <span>🚧</span>
            <p>원본 노션 페이지가 <b>작성중</b>이에요. 강사가 본문을 채우고 동기화하면 자동으로 이 자리에 보입니다.</p>
          </div>
        )}
        {!draft && (
          <>
            <p className="text-lg">📝 이 페이지는 아직 사이트에 동기화되지 않았어요.</p>
            <p className="text-sm text-[rgb(var(--fg-muted))]">
              터미널에서 <code className="rounded px-1.5 py-0.5" style={{ background: "rgb(var(--bg))" }}>npm run sync</code>를 실행하면 노션의 최신 내용이 들어옵니다.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cached.blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "heading": {
      const Tag = (`h${Math.min(block.level + 1, 4)}` as "h2" | "h3" | "h4");
      const cls =
        block.level === 1
          ? "mt-8 text-2xl font-extrabold"
          : block.level === 2
            ? "mt-6 text-xl font-bold"
            : "mt-4 text-lg font-semibold";
      return <Tag className={cls}>{block.text}</Tag>;
    }
    case "paragraph":
      return <p className="leading-relaxed">{block.text}</p>;
    case "code":
      return (
        <pre
          className="overflow-x-auto rounded-xl p-4 text-sm"
          style={{ background: "rgb(var(--bg-elev))", border: "1px solid rgb(var(--border))" }}
        >
          <code className={`language-${block.language}`}>{block.code}</code>
        </pre>
      );
    case "callout":
      return (
        <div
          className="flex gap-3 rounded-xl p-4"
          style={{ background: "rgb(var(--accent-soft))" }}
        >
          {block.emoji && <span className="text-xl">{block.emoji}</span>}
          <p className="leading-relaxed">{block.text}</p>
        </div>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      const cls = block.ordered ? "list-decimal pl-6 space-y-1" : "list-disc pl-6 space-y-1";
      return (
        <Tag className={cls}>
          {block.items.map((it, i) => (
            <li key={i} className="leading-relaxed">{it}</li>
          ))}
        </Tag>
      );
    }
    case "image":
      // eslint-disable-next-line @next/next/no-img-element
      return <img src={block.src} alt={block.alt ?? ""} className="rounded-xl" />;
    case "quote":
      return (
        <blockquote
          className="border-l-4 pl-4 italic"
          style={{ borderColor: "rgb(var(--accent))" }}
        >
          {block.text}
        </blockquote>
      );
    case "divider":
      return <hr style={{ borderColor: "rgb(var(--border))" }} />;
    default:
      return null;
  }
}
