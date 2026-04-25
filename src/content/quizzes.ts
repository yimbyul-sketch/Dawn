// 예상문제 데이터 — 세화고 2026학년도 1학기 중간고사 예시문항(PDF) 출제 패턴 기반.
// 시험 범위: 미래엔 인공지능기초(2022 개정) ~ 115쪽.
// 5가지 유형 모두 풀 수 있도록 단일 타입으로 통합.

export type QuizUnit =
  | "ai-basics"
  | "ml-basics"
  | "search"
  | "regression"
  | "classification"
  | "evaluation"
  | "python";

export type QuizQuestion = {
  id: string;
  unit: QuizUnit;
  difficulty: "easy" | "medium" | "hard";
  type: "single" | "boki-multi";

  question: string;
  code?: { language: string; lines: string[] };
  bokiBox?: string;

  // E형(boki-multi)일 때만 사용
  statements?: { label: "ㄱ" | "ㄴ" | "ㄷ" | "ㄹ"; text: string; correct: boolean }[];

  options: string[]; // 5개
  answer: 0 | 1 | 2 | 3 | 4;
  explanation: string;
};

export const quizUnitMeta: Record<QuizUnit, { title: string; emoji: string }> = {
  "ai-basics": { title: "인공지능 개념·특성", emoji: "🤖" },
  "ml-basics": { title: "기계학습 개념·절차", emoji: "📚" },
  search: { title: "탐색 알고리즘", emoji: "🧭" },
  regression: { title: "선형회귀", emoji: "📈" },
  classification: { title: "분류 (vs 회귀, K-NN)", emoji: "🎯" },
  evaluation: { title: "모델 성능 평가", emoji: "✅" },
  python: { title: "Python 핵심 문법", emoji: "🐍" },
};

export const quizzes: QuizQuestion[] = [
  // ──────────────────────────────────────────────────────────────────────
  // 1. 인공지능 개념·특성 (5문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-ai-001",
    unit: "ai-basics",
    difficulty: "easy",
    type: "single",
    question: "인공지능의 개념과 특성에 대한 설명으로 가장 적절한 것은?",
    options: [
      "튜링 테스트는 인공지능을 속이는 인간의 지능을 판단한다.",
      "과학 연구에도 인공지능을 활용하고 있으나 뚜렷한 성과는 없다고 알려져 있다.",
      "인공지능이 어떤 상황에서 판단하고 행동하기 위해서는 미리 학습된 상태여야 한다.",
      "객관적 데이터에 대한 인식과 추론은 수행할 수 있으나 사람에게 내재된 감정을 추론하는 것은 어렵다.",
      "인공지능이 여러 가지 센서를 통해 외부 정보를 인식하고 주변 상황을 이해할 수 있는 것은 RLHF가 적용되었기 때문이다.",
    ],
    answer: 3,
    explanation:
      "①은 반대로 '기계가 인간 지능을 흉내내는지'를 판단합니다. ②는 신약 개발·기상 예측 등 실제 성과가 많아 틀렸습니다. ③ 강화학습처럼 미리 학습 없이 환경과 상호작용하며 학습하기도 합니다. ⑤ 센서 인식과 RLHF는 무관합니다(RLHF는 언어모델 정렬 기법). ④가 정답: 객관적 데이터 인식·추론은 강하지만 인간의 내재 감정 추론은 여전히 어렵습니다.",
  },
  {
    id: "q-ai-002",
    unit: "ai-basics",
    difficulty: "easy",
    type: "single",
    question: "<보기>의 설명에 해당하는 인공지능 분야로 가장 적절한 것은?",
    bokiBox:
      "컴퓨터가 자연어로 작성된 문장을 이해하고, 사람과 대화하거나 문서를 요약·번역할 수 있도록 만드는 인공지능 기술 분야",
    options: ["컴퓨터 비전", "음성 인식", "자연어 처리(NLP)", "강화학습", "전문가 시스템"],
    answer: 2,
    explanation:
      "자연어(사람의 말·글)를 이해·생성하는 분야는 NLP(자연어 처리). 컴퓨터 비전은 이미지·영상, 음성 인식은 말소리 입력, 강화학습은 보상 기반 학습, 전문가 시스템은 규칙 기반 시스템입니다.",
  },
  {
    id: "q-ai-003",
    unit: "ai-basics",
    difficulty: "medium",
    type: "single",
    question: "강한 인공지능(Strong AI)과 약한 인공지능(Weak AI)에 대한 설명으로 옳은 것은?",
    options: [
      "현재 우리가 사용하는 ChatGPT, 알파고는 모두 강한 인공지능이다.",
      "약한 인공지능은 특정 영역의 문제만 해결하도록 설계된다.",
      "강한 인공지능은 사람보다 항상 빠르게 계산하는 기계를 의미한다.",
      "약한 인공지능은 의식과 자아를 가진 인공지능을 말한다.",
      "강한 인공지능은 이미 1990년대에 완성되어 산업에 활용 중이다.",
    ],
    answer: 1,
    explanation:
      "약한 AI = 특정 작업(번역·바둑 등) 전용. 강한 AI = 인간 수준의 범용 지능·자의식. ChatGPT·알파고는 모두 약한 AI. 강한 AI는 아직 구현되지 않았습니다.",
  },
  {
    id: "q-ai-004",
    unit: "ai-basics",
    difficulty: "medium",
    type: "single",
    question: "튜링 테스트(Turing Test)에 대한 설명으로 가장 적절한 것은?",
    options: [
      "사람이 컴퓨터의 연산 속도를 측정하는 시험이다.",
      "심사자가 모니터 너머의 상대가 사람인지 기계인지 구분하지 못하면 그 기계는 지능이 있다고 본다.",
      "기계가 다른 기계를 평가하기 위한 자동화된 검증 절차이다.",
      "인공지능의 윤리성을 검증하기 위한 표준 시험이다.",
      "이미지 인식 정확도를 평가하는 알고리즘 대회이다.",
    ],
    answer: 1,
    explanation:
      "튜링 테스트는 1950년 앨런 튜링이 제안. 텍스트 대화에서 심사자가 인간/기계를 구분할 수 없으면 '지능적'이라고 판정. 연산 속도·이미지 인식·윤리 평가와는 무관합니다.",
  },
  {
    id: "q-ai-005",
    unit: "ai-basics",
    difficulty: "easy",
    type: "single",
    question: "<보기>가 설명하는 것으로 가장 적절한 것은?",
    bokiBox:
      "인간의 뇌 신경 세포(뉴런)의 동작 방식에서 영감을 받아 만든 수학 모델로, 입력에 가중치를 곱하고 활성화 함수를 거쳐 출력을 만드는 구조",
    options: ["결정 트리", "유전 알고리즘", "K-평균 군집화", "인공신경망", "베이즈 분류기"],
    answer: 3,
    explanation:
      "뉴런 → 입력·가중치·활성화 함수 → 출력 구조는 인공신경망(ANN)의 정의. 결정 트리는 if-else 분기, 유전 알고리즘은 진화 모방, K-평균은 군집화, 베이즈는 확률 기반 분류입니다.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 2. 기계학습 개념·절차 (5문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-ml-001",
    unit: "ml-basics",
    difficulty: "easy",
    type: "single",
    question: "<보기>가 설명하고 있는 것으로 가장 적절한 것은?",
    bokiBox: "컴퓨터가 스스로 데이터에서 규칙을 찾아 문제 해결 능력을 갖출 수 있도록 만드는 것",
    options: ["모델", "기계학습", "문제 해결", "선택적 자동화", "전통적 프로그래밍"],
    answer: 1,
    explanation:
      "데이터로부터 규칙·패턴을 자동으로 찾는 것 = 기계학습(Machine Learning). 전통적 프로그래밍은 사람이 직접 규칙을 코딩해야 합니다.",
  },
  {
    id: "q-ml-002",
    unit: "ml-basics",
    difficulty: "medium",
    type: "single",
    question: "기계학습을 이용한 문제 해결 절차로 가장 적절한 것은?",
    options: [
      "문제 정의 - 기계학습 유형과 알고리즘 선정 - 데이터 선정·수집·전처리 - 모델 생성 - 성능 평가 및 수정",
      "문제 정의 - 기계학습 유형과 알고리즘 선정 - 데이터 선정·수집·전처리 - 성능 평가 및 수정 - 모델 생성",
      "모델 생성 - 성능 평가 및 수정 - 문제 정의 - 데이터 선정·수집·전처리 - 기계학습 유형과 알고리즘 선정",
      "문제 정의 - 데이터 선정·수집·전처리 - 모델 생성 - 기계학습 유형과 알고리즘 선정 - 성능 평가 및 수정",
      "문제 정의 - 데이터 선정·수집·전처리 - 기계학습 유형과 알고리즘 선정 - 모델 생성 - 성능 평가 및 수정",
    ],
    answer: 4,
    explanation:
      "교과서 표준 절차: ①문제 정의 → ②데이터 수집·전처리 → ③알고리즘 선정 → ④모델 생성(학습) → ⑤성능 평가 및 수정. 데이터를 먼저 보고 어떤 알고리즘이 적합할지 결정하는 흐름이 자연스럽습니다.",
  },
  {
    id: "q-ml-003",
    unit: "ml-basics",
    difficulty: "medium",
    type: "single",
    question: "기계학습의 유형 중 <보기>가 설명하는 것은?",
    bokiBox:
      "정답 라벨이 없는 데이터에서 비슷한 것끼리 묶거나 데이터의 숨은 구조를 찾아내는 학습 유형. 군집화, 차원 축소 등이 여기에 속한다.",
    options: ["지도학습", "비지도학습", "강화학습", "전이학습", "준지도학습"],
    answer: 1,
    explanation:
      "정답(라벨) 없이 데이터의 구조를 파악 = 비지도학습. 지도학습은 (입력, 정답) 쌍이 있고, 강화학습은 보상을 통해 학습합니다.",
  },
  {
    id: "q-ml-004",
    unit: "ml-basics",
    difficulty: "easy",
    type: "single",
    question: "다음 중 지도학습으로 해결하기에 가장 적절한 문제는?",
    options: [
      "고객 구매 패턴을 분석하여 비슷한 고객끼리 그룹으로 묶기",
      "이메일에 '스팸/정상' 라벨이 붙은 데이터로 새 메일이 스팸인지 판별",
      "체스 게임에서 승률이 높아지도록 스스로 수를 학습",
      "방대한 단어들을 의미가 비슷한 것끼리 자동으로 묶기",
      "도시의 교통량 데이터에서 숨은 패턴 발견",
    ],
    answer: 1,
    explanation:
      "스팸 메일 분류는 (메일, 스팸여부) 라벨이 있는 데이터로 학습 → 지도학습 분류 문제. ①④⑤는 비지도학습(군집화), ③은 강화학습입니다.",
  },
  {
    id: "q-ml-005",
    unit: "ml-basics",
    difficulty: "medium",
    type: "single",
    question: "데이터 전처리 단계에서 일반적으로 하는 작업이 아닌 것은?",
    options: [
      "결측치(NaN) 채우기 또는 제거",
      "중복 데이터 제거",
      "특성(feature) 단위가 다르면 정규화·표준화",
      "이상치(outlier) 점검",
      "모델의 가중치를 무작위로 초기화",
    ],
    answer: 4,
    explanation:
      "가중치 무작위 초기화는 '모델 생성' 단계에서 일어나는 일이지 전처리가 아닙니다. ①~④는 모두 전처리 표준 작업입니다.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 3. 탐색 알고리즘 (8문) — D형/E형 코드 읽기 중심
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-search-001",
    unit: "search",
    difficulty: "medium",
    type: "single",
    question: "<코드>가 사용하고 있는 탐색 알고리즘은?",
    code: {
      language: "python",
      lines: [
        "def search(grid, start, goal):",
        "    alist = []",
        "    alist.append(start)",
        "    grid[start[0]][start[1]]=\"★\"",
        "    while True:",
        "        if alist == []:",
        "            return False",
        "        i, j = alist.pop(-1)",
        "        print((i, j))",
        "        if (i, j) == goal:",
        "            return grid",
        "        if i-1 >= 0 and grid[i-1][j] == 0:",
        "            alist.append((i-1, j))",
        "            grid[i-1][j] = \"↓\"",
        "        # ...(생략)...",
      ],
    },
    options: ["A*", "이진 탐색", "깊이 우선 탐색", "너비 우선 탐색", "최상 우선 탐색"],
    answer: 2,
    explanation:
      "alist.pop(-1)은 리스트의 맨 끝(가장 최근 추가) 원소를 꺼냄 → LIFO(스택). 스택 기반으로 한 길로 끝까지 들어가는 방식이 깊이 우선 탐색(DFS)입니다. BFS는 pop(0)으로 가장 먼저 들어온 것을 꺼냅니다.",
  },
  {
    id: "q-search-002",
    unit: "search",
    difficulty: "medium",
    type: "single",
    question: "<코드>의 빈 칸 ⓐ에 들어갈 코드로 가장 적절한 것은? (BFS 구현)",
    code: {
      language: "python",
      lines: [
        "def bfs(grid, start, goal):",
        "    queue = []",
        "    queue.append(start)",
        "    while True:",
        "        if queue == []:",
        "            return False",
        "        i, j = ⓐ          # ← 여기",
        "        if (i, j) == goal:",
        "            return grid",
        "        # 이웃 칸들을 queue에 추가",
      ],
    },
    options: [
      "queue.pop(-1)",
      "queue.pop(0)",
      "queue.pop()",
      "min(queue)",
      "max(queue)",
    ],
    answer: 1,
    explanation:
      "BFS는 FIFO(큐). 가장 먼저 들어온 원소를 꺼내야 하므로 queue.pop(0). pop(-1)·pop()은 끝에서 꺼내는 스택(DFS), min/max는 우선순위 큐 방식입니다.",
  },
  {
    id: "q-search-003",
    unit: "search",
    difficulty: "easy",
    type: "single",
    question: "DFS와 BFS에 대한 설명으로 옳지 않은 것은?",
    options: [
      "DFS는 스택(또는 재귀)을 사용한다.",
      "BFS는 큐를 사용한다.",
      "BFS는 가중치가 모두 같을 때 최단 경로를 보장한다.",
      "DFS는 항상 BFS보다 메모리를 더 많이 사용한다.",
      "DFS는 한 길을 끝까지 따라가다가 막히면 되돌아오는 방식이다.",
    ],
    answer: 3,
    explanation:
      "DFS는 일반적으로 메모리를 더 적게 씁니다(현재 경로만 기억). BFS가 모든 동심원 노드를 큐에 담아두기 때문에 더 많이 쓸 수 있습니다. 나머지는 모두 옳은 설명입니다.",
  },
  {
    id: "q-search-004",
    unit: "search",
    difficulty: "hard",
    type: "boki-multi",
    question: "<코드>에 대한 설명으로 옳은 것만을 <보기>에서 있는 대로 고른 것은?",
    code: {
      language: "python",
      lines: [
        "def dist(p1, p2):",
        "    return (p2[0]-p1[0])**2 + (p2[1]-p1[1])**2",
        "",
        "def best_first_search(grid, start, goal):",
        "    op = []",
        "    cl = []",
        "    op.append(start)",
        "    while True:",
        "        if op == []:",
        "            return False",
        "        v = min(op, key=lambda p: dist(p, goal))",
        "        op.remove(v)",
        "        cl.append(v)",
        "        i, j = v[0], v[1]",
        "        print((i, j))",
        "        if (i, j) == goal:",
        "            return grid",
        "        # 이웃 처리...",
      ],
    },
    statements: [
      { label: "ㄱ", text: "리스트를 우선순위 큐로 응용하고 있다.", correct: true },
      { label: "ㄴ", text: "dist 함수는 맨해튼 거리를 사용하고 있다.", correct: false },
      { label: "ㄷ", text: "min() 함수가 호출될 때마다 op 안의 모든 원소를 검사한다.", correct: true },
      { label: "ㄹ", text: "print((i, j))는 알고리즘 동작에 꼭 필요한 코드이다.", correct: false },
    ],
    options: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄷ", "ㄱ, ㄷ, ㄹ", "ㄱ, ㄴ, ㄷ, ㄹ"],
    answer: 1,
    explanation:
      "ㄱ ⭕ min()으로 가장 좋은 원소를 매번 뽑는 건 우선순위 큐 패턴. ㄴ ❌ (x2-x1)²+(y2-y1)²는 유클리드 거리의 제곱(맨해튼은 |Δx|+|Δy|). ㄷ ⭕ 파이썬 min()은 선형 탐색. ㄹ ❌ print는 진행 상황 디버깅용일 뿐 알고리즘 결과에 영향 없음.",
  },
  {
    id: "q-search-005",
    unit: "search",
    difficulty: "medium",
    type: "single",
    question: "A* 알고리즘의 평가 함수 f(n)에 대한 설명으로 가장 적절한 것은?",
    options: [
      "f(n) = h(n)만으로 평가하므로 항상 최단 경로를 보장한다.",
      "f(n) = g(n) + h(n)이며, g는 시작점에서 현재까지의 실제 비용, h는 현재에서 목표까지의 추정 비용이다.",
      "f(n) = g(n) - h(n)이다.",
      "BFS와 동일한 방식이며 휴리스틱은 사용하지 않는다.",
      "DFS의 단점인 무한 루프를 막기 위해 깊이 제한만 추가한 것이다.",
    ],
    answer: 1,
    explanation:
      "A*의 핵심은 f(n) = g(n) + h(n). g(n)은 출발지에서 현재까지의 실제 누적 비용, h(n)은 현재에서 목표까지의 휴리스틱 추정. 둘을 합쳐 가장 작은 노드를 우선 선택해 효율 + 최단 경로(h가 admissible할 때)를 동시에 달성합니다.",
  },
  {
    id: "q-search-006",
    unit: "search",
    difficulty: "medium",
    type: "single",
    question: "최상 우선 탐색(Best-First Search)과 A*의 차이로 가장 적절한 것은?",
    options: [
      "Best-First는 큐, A*는 스택을 쓴다.",
      "Best-First는 h(n)만, A*는 g(n)+h(n)을 평가에 사용한다.",
      "둘은 사실상 동일한 알고리즘이다.",
      "Best-First는 가중치 그래프에서만, A*는 격자 미로에서만 동작한다.",
      "A*는 휴리스틱을 쓰지 않고 Best-First는 휴리스틱을 쓴다.",
    ],
    answer: 1,
    explanation:
      "Best-First는 '목표에 가까워 보이는 것'(h(n))만 따라감 → 함정에 빠질 수 있고 최단 보장 X. A*는 이미 온 거리(g)도 같이 고려해 함정·우회를 회피하고, h가 admissible이면 최단 보장.",
  },
  {
    id: "q-search-007",
    unit: "search",
    difficulty: "hard",
    type: "single",
    question:
      "격자 미로에서 한 칸 이동 비용이 모두 1일 때, 다음 중 항상 최단 경로를 찾아주는 알고리즘이 아닌 것은?",
    options: [
      "BFS",
      "다익스트라(Dijkstra)",
      "A* (h가 admissible일 때)",
      "최상 우선 탐색(Best-First)",
      "균일 비용 탐색(UCS, Uniform Cost Search)",
    ],
    answer: 3,
    explanation:
      "Best-First는 휴리스틱만 보고 가다가 우회 경로로 빠질 수 있어 최단 보장이 없습니다. BFS·다익스트라·UCS는 비용을 균등하게 확장하므로 최단을 보장하고, A*도 h가 admissible이면 보장됩니다.",
  },
  {
    id: "q-search-008",
    unit: "search",
    difficulty: "hard",
    type: "boki-multi",
    question: "DFS·BFS·A*에 대한 설명으로 옳은 것만을 <보기>에서 있는 대로 고른 것은?",
    statements: [
      { label: "ㄱ", text: "DFS는 재귀 호출로도 구현할 수 있다.", correct: true },
      { label: "ㄴ", text: "BFS의 시간 복잡도는 트리의 깊이가 깊을수록 항상 DFS보다 빠르다.", correct: false },
      { label: "ㄷ", text: "A*는 우선순위 큐를 사용해 f(n)이 가장 작은 노드를 먼저 확장한다.", correct: true },
      { label: "ㄹ", text: "BFS는 가중치가 다른 그래프에서도 항상 최단 경로를 보장한다.", correct: false },
    ],
    options: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄹ", "ㄷ, ㄹ", "ㄱ, ㄷ, ㄹ"],
    answer: 1,
    explanation:
      "ㄱ ⭕ DFS는 재귀로 자연스럽게 구현 가능. ㄴ ❌ 깊이가 깊으면 BFS가 더 많은 노드를 큐에 담아 오히려 메모리·시간 폭증. ㄷ ⭕ A*는 OPEN 리스트(우선순위 큐) 사용. ㄹ ❌ BFS는 모든 간선 비용이 같을 때만 최단 보장. 가중치 다르면 다익스트라/A* 필요.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 4. 분류 (vs 회귀, K-NN) (4문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-cls-001",
    unit: "classification",
    difficulty: "easy",
    type: "single",
    question: "다음 중 분류(classification) 문제에 해당하는 것은?",
    options: [
      "내일의 서울 최고 기온이 몇 도일지 예측",
      "주식 가격이 다음 달까지 얼마가 될지 예측",
      "사진을 보고 강아지 / 고양이 / 토끼 중 어느 동물인지 판별",
      "사람의 키와 몸무게로부터 체질량 지수(BMI) 계산",
      "회사 매출액을 분기별로 예측",
    ],
    answer: 2,
    explanation:
      "출력이 '연속된 숫자'면 회귀, '카테고리 라벨'이면 분류. ①②⑤는 숫자 예측(회귀), ④는 단순 계산. ③은 카테고리(동물 종류) 판별 = 분류.",
  },
  {
    id: "q-cls-002",
    unit: "classification",
    difficulty: "easy",
    type: "single",
    question: "<보기>가 설명하는 알고리즘은?",
    bokiBox:
      "새로운 데이터의 분류를 결정할 때, 학습 데이터 중 가장 가까운 K개의 이웃을 찾아 그 중 가장 많은 클래스로 결정한다. 학습 단계가 거의 없고, 예측 시점에 거리 계산을 한다.",
    options: ["선형회귀", "K-Means 군집화", "K-NN", "결정 트리", "신경망"],
    answer: 2,
    explanation:
      "'가장 가까운 K개 이웃의 다수결' = K-NN(K-Nearest Neighbors). K-Means는 비지도 군집화(이름 헷갈리지 말 것). 학습이 거의 없는 lazy learning이 K-NN의 특징입니다.",
  },
  {
    id: "q-cls-003",
    unit: "classification",
    difficulty: "medium",
    type: "single",
    question: "K-NN에서 K 값에 대한 설명으로 가장 적절한 것은?",
    options: [
      "K가 작을수록 항상 정확도가 높다.",
      "K가 클수록 잡음에 더 민감해져 결과가 자주 바뀐다.",
      "이진 분류에서는 동률을 피하기 위해 보통 홀수를 사용한다.",
      "K는 학습 단계에서 자동으로 결정되는 값이다.",
      "K=0이 가능하며 가장 빠른 분류를 제공한다.",
    ],
    answer: 2,
    explanation:
      "두 클래스(이진 분류)일 때 짝수 K는 동률 가능 → 홀수(3, 5, 7) 권장. K가 작으면 잡음에 민감하고, 크면 경계가 흐려져 둘 다 단점이 있어 적절한 K를 골라야 합니다. K=0은 정의되지 않음.",
  },
  {
    id: "q-cls-004",
    unit: "classification",
    difficulty: "medium",
    type: "single",
    question:
      "K-NN에서 두 점 A=(1, 2), B=(4, 6) 사이의 유클리드 거리는?",
    options: ["3", "4", "5", "7", "25"],
    answer: 2,
    explanation:
      "유클리드 거리 = √((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5. ⑤ 25는 거리 제곱(맨해튼 거리도 |3|+|4|=7).",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 5. 선형회귀 (4문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-reg-001",
    unit: "regression",
    difficulty: "easy",
    type: "single",
    question: "<보기>가 설명하는 것은?",
    bokiBox:
      "독립변수 x가 변할 때 종속변수 y가 어떻게 변하는지를 직선 y = wx + b 형태로 예측하는 가장 단순한 회귀 모델",
    options: ["로지스틱 회귀", "선형회귀", "릿지 회귀", "K-NN 회귀", "신경망 회귀"],
    answer: 1,
    explanation:
      "y = wx + b 직선 형태로 예측 = 단순 선형회귀(simple linear regression). 로지스틱은 분류, 릿지는 정규화 추가, K-NN/신경망은 비선형도 가능합니다.",
  },
  {
    id: "q-reg-002",
    unit: "regression",
    difficulty: "medium",
    type: "single",
    question: "선형회귀에서 손실 함수로 가장 일반적으로 사용되는 것은?",
    options: [
      "정확도(accuracy)",
      "교차 엔트로피(cross-entropy)",
      "평균 제곱 오차(MSE, Mean Squared Error)",
      "F1 점수",
      "ROC-AUC",
    ],
    answer: 2,
    explanation:
      "회귀는 예측값과 실제값의 차이를 제곱해 평균낸 MSE = (1/n)Σ(y − ŷ)²를 최소화. 정확도·F1·ROC-AUC는 분류 지표, 교차 엔트로피는 분류·확률 모델 손실입니다.",
  },
  {
    id: "q-reg-003",
    unit: "regression",
    difficulty: "medium",
    type: "single",
    question:
      "공부 시간 x와 시험 점수 y로 학습한 선형회귀 모델 y = 8x + 30이 있다. 5시간 공부했을 때 예측 점수는?",
    options: ["38점", "65점", "70점", "75점", "80점"],
    answer: 2,
    explanation: "y = 8 × 5 + 30 = 40 + 30 = 70. 모델식에 x=5 대입.",
  },
  {
    id: "q-reg-004",
    unit: "regression",
    difficulty: "hard",
    type: "single",
    question:
      "<코드>에서 데이터를 학습한 후 손실(MSE)을 계산하려고 한다. 빈 칸 ⓐ에 들어갈 식으로 적절한 것은?",
    code: {
      language: "python",
      lines: [
        "y_true = [10, 20, 30, 40]",
        "y_pred = [12, 18, 33, 41]",
        "n = len(y_true)",
        "mse = ⓐ          # ← 여기",
        "print(mse)",
      ],
    },
    options: [
      "sum(y_true) / n",
      "sum([(t - p) for t, p in zip(y_true, y_pred)]) / n",
      "sum([(t - p) ** 2 for t, p in zip(y_true, y_pred)]) / n",
      "max([(t - p) ** 2 for t, p in zip(y_true, y_pred)])",
      "abs(sum(y_true) - sum(y_pred))",
    ],
    answer: 2,
    explanation:
      "MSE = (1/n)Σ(y_true − y_pred)². 차이를 제곱한 뒤 평균내야 합니다. ②는 차이만 평균(부호 상쇄), ④는 최대값. ③이 정답.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 6. 모델 성능 평가 (4문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-eval-001",
    unit: "evaluation",
    difficulty: "easy",
    type: "single",
    question:
      "100개의 메일 중 스팸이 30개, 정상이 70개. 모델이 스팸을 25개 맞추고 정상을 65개 맞췄다면 정확도(accuracy)는?",
    options: ["55%", "65%", "75%", "85%", "90%"],
    answer: 4,
    explanation:
      "정확도 = (맞은 개수) / 전체 = (25 + 65) / 100 = 90 / 100 = 90%.",
  },
  {
    id: "q-eval-002",
    unit: "evaluation",
    difficulty: "medium",
    type: "single",
    question: "<보기>가 설명하는 평가 지표는?",
    bokiBox:
      "모델이 '스팸이다'라고 예측한 것 중 실제로 스팸이었던 비율. 즉, 양성으로 예측한 것의 정확성을 본다.",
    options: ["정확도(accuracy)", "정밀도(precision)", "재현율(recall)", "F1 점수", "AUC"],
    answer: 1,
    explanation:
      "정밀도 = TP / (TP + FP). '예측이 양성이라고 한 것 중 진짜 양성 비율'. 재현율은 '실제 양성 중 모델이 잡아낸 비율' = TP/(TP+FN). 둘은 종종 트레이드오프 관계입니다.",
  },
  {
    id: "q-eval-003",
    unit: "evaluation",
    difficulty: "medium",
    type: "single",
    question:
      "암 환자 100명 중 모델이 '암 있음'으로 예측한 사람이 60명, 그 중 실제 암 환자는 50명이다. 실제 암 환자가 총 70명일 때, 재현율(recall)은?",
    options: ["50/100 = 50%", "50/60 ≈ 83%", "50/70 ≈ 71%", "60/70 ≈ 86%", "10/70 ≈ 14%"],
    answer: 2,
    explanation:
      "재현율 = TP / (TP + FN) = 실제 양성 중 모델이 맞춘 비율 = 50 / 70 ≈ 71%. ②는 정밀도(50/60 ≈ 83%)입니다.",
  },
  {
    id: "q-eval-004",
    unit: "evaluation",
    difficulty: "hard",
    type: "boki-multi",
    question: "분류 모델 평가에 대한 설명으로 옳은 것만을 <보기>에서 있는 대로 고른 것은?",
    statements: [
      { label: "ㄱ", text: "데이터가 한 클래스로 치우쳐 있으면 정확도만으로 판단하기 어렵다.", correct: true },
      { label: "ㄴ", text: "F1 점수는 정밀도와 재현율의 조화평균이다.", correct: true },
      { label: "ㄷ", text: "혼동행렬(confusion matrix)은 회귀 문제에서 사용한다.", correct: false },
      { label: "ㄹ", text: "재현율을 높이면 정밀도는 항상 같이 올라간다.", correct: false },
    ],
    options: ["ㄱ, ㄴ", "ㄱ, ㄷ", "ㄴ, ㄹ", "ㄱ, ㄴ, ㄹ", "ㄴ, ㄷ, ㄹ"],
    answer: 0,
    explanation:
      "ㄱ ⭕ 클래스 불균형(예: 99% 정상)이면 다 정상이라고 해도 정확도 99% → 정밀도/재현율 함께 봐야 함. ㄴ ⭕ F1 = 2·P·R/(P+R) (조화평균). ㄷ ❌ 혼동행렬은 분류용. ㄹ ❌ 둘은 보통 트레이드오프 관계.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // 7. Python 핵심 문법 (4문)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "q-py-001",
    unit: "python",
    difficulty: "easy",
    type: "single",
    question: "<코드> 실행 결과로 출력되는 값은?",
    code: {
      language: "python",
      lines: [
        "a = [1, 2, 3, 4, 5]",
        "print(a[1:4])",
      ],
    },
    options: ["[1, 2, 3]", "[2, 3, 4]", "[2, 3, 4, 5]", "[1, 2, 3, 4]", "[1, 4]"],
    answer: 1,
    explanation:
      "리스트 슬라이싱 a[1:4]는 인덱스 1부터 4 직전까지 = a[1], a[2], a[3] = [2, 3, 4]. 끝 인덱스는 포함하지 않음에 주의.",
  },
  {
    id: "q-py-002",
    unit: "python",
    difficulty: "easy",
    type: "single",
    question: "<코드> 실행 후 result 값은?",
    code: {
      language: "python",
      lines: [
        "result = 0",
        "for i in range(1, 6):",
        "    result += i",
        "print(result)",
      ],
    },
    options: ["5", "6", "10", "15", "21"],
    answer: 3,
    explanation: "range(1, 6) = 1,2,3,4,5. 합계 = 1+2+3+4+5 = 15.",
  },
  {
    id: "q-py-003",
    unit: "python",
    difficulty: "medium",
    type: "single",
    question: "<코드>의 빈 칸 ⓐ에 들어갈 코드로 가장 적절한 것은?",
    code: {
      language: "python",
      lines: [
        "scores = {'국어': 90, '영어': 85, '수학': 95}",
        "# 평균 점수를 계산하려면?",
        "avg = ⓐ",
        "print(avg)",
      ],
    },
    options: [
      "sum(scores) / len(scores)",
      "sum(scores.keys()) / len(scores)",
      "sum(scores.values()) / len(scores)",
      "scores.mean()",
      "average(scores)",
    ],
    answer: 2,
    explanation:
      "딕셔너리에서 합·평균을 내려면 .values()로 값만 뽑아 sum()/len(). ①은 키 합산이 시도되어 TypeError, ④⑤는 파이썬 내장에 없는 함수.",
  },
  {
    id: "q-py-004",
    unit: "python",
    difficulty: "medium",
    type: "single",
    question: "<코드> 실행 결과는?",
    code: {
      language: "python",
      lines: [
        "def f(x, y=10):",
        "    return x + y",
        "",
        "print(f(3))",
        "print(f(3, 5))",
      ],
    },
    options: ["13 / 8", "3 / 5", "13 / 13", "8 / 8", "에러 발생"],
    answer: 0,
    explanation:
      "f(3): y는 기본값 10 → 3+10=13. f(3, 5): y=5 → 3+5=8. 기본 인자(default argument)는 호출 시 값이 없으면 자동 사용됩니다.",
  },
];

// 단원별 문제 필터링 헬퍼
export function quizzesByUnit(unit: QuizUnit) {
  return quizzes.filter((q) => q.unit === unit);
}

export function quizCountByUnit() {
  const counts = {} as Record<QuizUnit, number>;
  for (const u of Object.keys(quizUnitMeta) as QuizUnit[]) counts[u] = 0;
  for (const q of quizzes) counts[q.unit]++;
  return counts;
}

export function findQuiz(id: string) {
  return quizzes.find((q) => q.id === id) ?? null;
}
