# ⚡ 아이직 시험공부장

고등학교 2학년을 위한 인공지능 기초 학습 사이트. [aizic.notion.site](https://aizic.notion.site/)의 학습자료를 단원별로 다시 묶어서, **아이패드에서 책처럼 보면서 시험공부**할 수 있도록 만든 정적 웹사이트.

## 한눈에 보기

- **메인 디바이스:** iPad Safari (가로/세로 모두 최적화). PC·휴대폰도 동작.
- **콘텐츠:** Python 기초 33페이지 + 머신러닝 10페이지 = 단원 3개. (노션에 본문이 있는 페이지만 노출)
- **진도 체크:** 페이지를 끝까지 스크롤하거나 30초 이상 머무르면 자동으로 ✓. localStorage 저장.
- **다크 모드:** iPad 다크 모드와 자동 연동.
- **PWA:** "홈 화면에 추가" 하면 앱처럼 전체화면 실행.
- **노션 동기화:** `npm run sync` 한 번이면 노션 최신 내용을 사이트로 끌어옴.

## 처음 설치

```bash
npm install
```

## 로컬에서 띄우기

```bash
npm run dev
# → http://localhost:3000
```

같은 와이파이의 아이패드에서 보려면 PC IP로 접속: `http://<PC-IP>:3000`

## 노션 콘텐츠 동기화

처음에는 모든 페이지가 "동기화되지 않았어요" 상태로 보입니다. 다음 절차로 본문을 채워주세요.

### 1) 노션 Integration 만들기

1. [notion.so/my-integrations](https://notion.so/my-integrations) 접속
2. "+ New integration" → 이름 `aizic-site`, 워크스페이스 선택
3. **Capabilities**: Read content만 켜도 충분
4. "Submit" → 보이는 **Internal Integration Secret** (`secret_…`)을 복사

### 2) 노션 페이지에 권한 부여

1. [aizic.notion.site](https://aizic.notion.site/)의 메인 페이지를 노션 앱에서 연다
2. 우상단 ⋯ → **Connections** → **+ Add connections** → `aizic-site` 선택
3. 하위 페이지는 자동으로 같은 권한이 적용됨

### 3) `.env.local` 파일 생성

프로젝트 루트에 `.env.local` 파일을 만들고:

```
NOTION_TOKEN=secret_여기에_복사한_키
```

### 4) 동기화 실행

```bash
npm run sync
```

`content/notion-cache/<페이지ID>.json` 파일들이 생성되며, 다음 빌드부터 사이트에 본문이 표시됩니다. 노션을 수정한 뒤에는 다시 `npm run sync`만 실행하면 갱신됩니다.

## 배포 (Vercel · 무료)

### 한 번만: GitHub에 올리기

```bash
git init
git add .
git commit -m "초기 커밋"
git branch -M main
gh repo create aizic-study --private --source=. --remote=origin --push
```

### Vercel 연결

1. [vercel.com](https://vercel.com) 로그인 (GitHub 계정으로)
2. **New Project** → 방금 만든 `aizic-study` 레포 선택
3. **Environment Variables**: `NOTION_TOKEN` = 위에서 받은 secret 키
4. **Deploy** → 1~2분 후 `https://aizic-study.vercel.app` 같은 주소가 생성됨

이후 `git push`만 하면 자동으로 다시 배포됩니다.

### 노션 변경 자동 반영 (선택)

매일 새벽 자동 재빌드:

1. Vercel 프로젝트 → **Settings → Cron Jobs** → 매일 03:00 UTC에 `/api/revalidate` 호출
2. 또는 GitHub Actions로 매일 `npm run sync && git commit && git push` 자동화 (저에게 요청해주세요).

## 폴더 구조

```
src/
├─ app/
│  ├─ layout.tsx              # 전체 레이아웃 (폰트, 메타)
│  ├─ globals.css             # 디자인 토큰, iPad 안전영역, 다크모드
│  ├─ page.tsx                # 홈 (단원 트리 + 진도)
│  └─ [unit]/[slug]/page.tsx  # 단원 페이지 동적 라우팅
├─ components/
│  ├─ Shell.tsx               # 사이드바 + 햄버거 메뉴 레이아웃
│  ├─ Sidebar.tsx             # 단원 목차 (진도 표시 포함)
│  ├─ HomeProgress.tsx        # 홈 진도 카드
│  ├─ ProgressMarker.tsx      # 페이지 자동 ✓ 처리
│  └─ NotionContent.tsx       # 캐시된 노션 블록 렌더
├─ content/
│  └─ units.ts                # 단원·페이지 인덱스 (노션 페이지 ID 매핑)
└─ lib/
   └─ progress.ts             # 진도 localStorage 훅

scripts/
└─ sync-notion.ts             # 노션 API → JSON 캐시 변환

content/
└─ notion-cache/<id>.json     # 동기화 결과물 (gitignore)
```

## iPad에서 더 잘 쓰는 팁

- **홈 화면에 추가** : Safari의 공유 메뉴 → "홈 화면에 추가" → 아이콘이 생기고, 누르면 앱처럼 전체화면.
- **분할 화면** : 영상이나 메모 앱과 나란히 보면서 공부 가능.
- **다크 모드 자동** : 시스템 다크 모드 설정에 자동으로 맞춰짐.
- **오프라인** : 한 번 본 페이지는 와이파이 끊겨도 다시 열림.

## 문제가 생겼을 때

| 증상 | 해결 |
|---|---|
| "동기화되지 않았어요" 메시지가 계속 보임 | `.env.local`의 `NOTION_TOKEN` 확인 → `npm run sync` 다시 실행 |
| `npm run sync` 시 401 에러 | 노션에서 Integration이 페이지에 연결됐는지 확인 |
| 한국어가 깨져서 보임 | 브라우저를 최신으로 업데이트. 사파리 16+ 권장 |
| iPad에서 사이드바가 안 열림 | 좌상단 ☰ 메뉴 버튼 탭 |

## 라이선스 / 출처

- 학습 콘텐츠 원본: [aizic.notion.site](https://aizic.notion.site/) (미래엔 인공지능기초 교과서 기반).
- 사이트 코드는 자유롭게 수정·재배포 가능.
