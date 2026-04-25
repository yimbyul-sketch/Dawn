/**
 * 공개 노션 사이트(aizic.notion.site) → 사이트 콘텐츠 동기화
 *
 * 노션 토큰이 필요 없습니다. 공개 페이지를 그대로 긁어옵니다.
 *
 * 사용법:
 *   npm run sync
 *
 * 결과:
 *   content/notion-cache/<page-id>.json 파일들이 생성/갱신됨
 */

import fs from "node:fs";
import path from "node:path";
import { NotionAPI } from "notion-client";
import type { ExtendedRecordMap } from "notion-types";
import { units } from "../src/content/units";

// 노션 ID는 dashed UUID로 lookup해야 함
function toUuid(id: string): string {
  const clean = id.replace(/-/g, "");
  if (clean.length !== 32) return id;
  return `${clean.slice(0, 8)}-${clean.slice(8, 12)}-${clean.slice(12, 16)}-${clean.slice(16, 20)}-${clean.slice(20, 32)}`;
}

// notion-client 응답이 환경에 따라 .value 또는 .value.value 로 다르게 들어옴
// 정규화해서 항상 동일한 위치에서 접근하도록 한다
type NotionBlockValue = {
  id: string;
  type: string;
  properties?: Record<string, unknown>;
  content?: string[];
  format?: Record<string, unknown>;
};
function getBlock(recordMap: ExtendedRecordMap, id: string): NotionBlockValue | null {
  const dashed = toUuid(id);
  const entry = recordMap.block[dashed] || recordMap.block[id];
  if (!entry) return null;
  // entry.value가 NotionBlockValue거나, entry.value.value가 NotionBlockValue인 두 케이스 처리
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v: any = (entry as any).value;
  if (!v) return null;
  if (v.type) return v as NotionBlockValue;
  if (v.value && v.value.type) return v.value as NotionBlockValue;
  return null;
}

// ────────────────────────────────────────────────────────────────────────────
// 우리 사이트가 사용하는 블록 형식
// ────────────────────────────────────────────────────────────────────────────
type Block =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; language: string; code: string; caption?: string }
  | { type: "callout"; emoji?: string; text: string }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "image"; src: string; alt?: string; caption?: string }
  | { type: "quote"; text: string }
  | { type: "divider" };

type CachedPage = {
  id: string;
  title?: string;
  blocks: Block[];
  fetchedAt: string;
};

const CACHE_DIR = path.join(process.cwd(), "content", "notion-cache");
fs.mkdirSync(CACHE_DIR, { recursive: true });

const api = new NotionAPI();

// ────────────────────────────────────────────────────────────────────────────
// rich text → plain string
// ────────────────────────────────────────────────────────────────────────────
function richToText(rich: unknown): string {
  if (!rich || !Array.isArray(rich)) return "";
  return rich
    .map((seg) => {
      if (Array.isArray(seg) && typeof seg[0] === "string") return seg[0];
      return "";
    })
    .join("");
}

// ────────────────────────────────────────────────────────────────────────────
// ExtendedRecordMap → 우리 Block[] 변환
// ────────────────────────────────────────────────────────────────────────────
function convertRecordMap(rootId: string, recordMap: ExtendedRecordMap): Block[] {
  const root = getBlock(recordMap, rootId);
  if (!root) return [];

  const out: Block[] = [];
  let pendingList: { ordered: boolean; items: string[] } | null = null;

  const flushList = () => {
    if (pendingList) {
      out.push({ type: "list", ordered: pendingList.ordered, items: pendingList.items });
      pendingList = null;
    }
  };

  const walk = (blockId: string, depth = 0) => {
    const block = getBlock(recordMap, blockId);
    if (!block) return;

    const t = block.type;
    const properties = (block.properties || {}) as Record<string, unknown>;

    // 리스트 블록 처리
    if (t === "bulleted_list" || t === "numbered_list") {
      const ordered = t === "numbered_list";
      if (!pendingList || pendingList.ordered !== ordered) {
        flushList();
        pendingList = { ordered, items: [] };
      }
      const text = richToText(properties.title);
      if (text.trim()) pendingList.items.push(text);
      // 자식이 있으면 들여쓰기 평탄화 — 그냥 다음 블록으로 넘어가게 둠
      for (const childId of block.content || []) walk(childId, depth + 1);
      return;
    }

    // 리스트 외 블록은 누적된 리스트를 비워준다
    flushList();

    switch (t) {
      case "page":
        // 루트 페이지면 자식 walk. 다른 sub_page는 무시 (별도 페이지이므로)
        if (block.id === toUuid(rootId)) {
          for (const childId of block.content || []) walk(childId, depth);
        }
        break;

      case "header":
      case "sub_header":
      case "sub_sub_header": {
        const level = t === "header" ? 1 : t === "sub_header" ? 2 : 3;
        out.push({ type: "heading", level, text: richToText(properties.title) });
        // 토글 가능한 헤더 안에 본문이 들어있는 경우 자식 펼쳐오기
        for (const childId of block.content || []) walk(childId, depth + 1);
        break;
      }

      case "text": {
        const text = richToText(properties.title);
        if (text.trim()) out.push({ type: "paragraph", text });
        break;
      }

      case "code": {
        const code = richToText(properties.title);
        const language = richToText(properties.language) || "plaintext";
        const caption = richToText(properties.caption);
        out.push({ type: "code", language: language.toLowerCase(), code, caption: caption || undefined });
        break;
      }

      case "callout": {
        const emoji = (block.format as { page_icon?: string })?.page_icon;
        out.push({ type: "callout", emoji, text: richToText(properties.title) });
        break;
      }

      case "quote":
        out.push({ type: "quote", text: richToText(properties.title) });
        break;

      case "divider":
        out.push({ type: "divider" });
        break;

      case "image": {
        const source =
          richToText(properties.source) ||
          (block.format as { display_source?: string })?.display_source ||
          "";
        if (source) {
          // notion s3 이미지 URL은 서명이 만료되므로 notion 프록시를 거쳐야 한다
          const proxied = `https://www.notion.so/image/${encodeURIComponent(source)}?table=block&id=${block.id}&cache=v2`;
          out.push({
            type: "image",
            src: proxied,
            alt: richToText(properties.caption),
            caption: richToText(properties.caption),
          });
        }
        break;
      }

      case "toggle": {
        // 토글의 제목 + 내용을 평탄화
        const title = richToText(properties.title);
        if (title.trim()) out.push({ type: "paragraph", text: `▸ ${title}` });
        for (const childId of block.content || []) walk(childId, depth + 1);
        break;
      }

      case "bulleted_list_item":
      case "numbered_list_item":
        // 안전망 (notion-utils에서 가끔 옴)
        if (!pendingList || pendingList.ordered !== (t === "numbered_list_item")) {
          flushList();
          pendingList = { ordered: t === "numbered_list_item", items: [] };
        }
        pendingList.items.push(richToText(properties.title));
        break;

      default:
        // 알려지지 않은 블록은 자식만 따라간다
        for (const childId of block.content || []) walk(childId, depth + 1);
    }
  };

  for (const childId of root.content || []) walk(childId);
  flushList();
  return out;
}

// ────────────────────────────────────────────────────────────────────────────
// 메인
// ────────────────────────────────────────────────────────────────────────────
async function main() {
  const allPages = units.flatMap((u) => u.pages.filter((p) => p.notionId));
  console.log(`▶ 동기화 대상: ${allPages.length}개 페이지`);

  let ok = 0;
  let fail = 0;
  let empty = 0;
  for (const page of allPages) {
    try {
      const recordMap = await api.getPage(page.notionId);
      const blocks = convertRecordMap(page.notionId, recordMap);

      const cache: CachedPage = {
        id: page.notionId,
        title: page.title,
        blocks,
        fetchedAt: new Date().toISOString(),
      };
      const file = path.join(CACHE_DIR, `${page.notionId}.json`);
      fs.writeFileSync(file, JSON.stringify(cache, null, 2), "utf8");
      if (blocks.length === 0) {
        empty++;
        process.stdout.write(`  ○ ${page.title}  (본문 비어있음)\n`);
      } else {
        ok++;
        process.stdout.write(`  ✓ ${page.title}  (${blocks.length} blocks)\n`);
      }
    } catch (err) {
      fail++;
      const msg = err instanceof Error ? err.message : String(err);
      process.stdout.write(`  ✗ ${page.title} — ${msg}\n`);
    }
    // 노션 공개 API rate limit 회피
    await new Promise((r) => setTimeout(r, 350));
  }
  console.log(`\n동기화 완료 — 본문 있음 ${ok} / 비어있음 ${empty} / 실패 ${fail}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
