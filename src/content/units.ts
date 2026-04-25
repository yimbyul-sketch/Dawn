// 단원 구조 — 노션에 본문이 있는 페이지만 사이트에 노출.
// (탐색 알고리즘 / K-NN처럼 노션 본문이 비어있는 단원은 제외했습니다.)

export type UnitPage = {
  slug: string;
  title: string;
  notionId: string;
  status?: "ready" | "draft"; // draft = 노션에서 "작성중" 표시된 페이지
};

export type Unit = {
  slug: string;
  title: string;
  emoji: string;
  description: string;
  pages: UnitPage[];
};

export const units: Unit[] = [
  {
    slug: "intro",
    title: "오리엔테이션",
    emoji: "🚦",
    description: "이 사이트로 어떻게 공부하는지부터 시작.",
    pages: [
      { slug: "home", title: "아이직 HOME", notionId: "4059f09e643d48b5887db0f403c465fd" },
      { slug: "orientation", title: "오리엔테이션", notionId: "5f8e54fd1bb94568ba9bd0a1e7714e17" },
    ],
  },
  {
    slug: "python",
    title: "Python 기초",
    emoji: "🐍",
    description: "변수·연산자·함수까지. 머신러닝 들어가기 전 필수.",
    pages: [
      { slug: "what-is-python", title: "Python? 그게 뭐고, 왜 배우죠?", notionId: "1ef427c99ca24234903518ef6b1bdbd9" },
      { slug: "setup", title: "Python 사용 준비", notionId: "2449613bf86347e784e7b2c061329a66" },
      { slug: "shell-editor", title: "Shell과 Editor", notionId: "51ad116b425e444bb6324edf7ae388ab" },
      { slug: "comments", title: "주석", notionId: "ed9fa5ecc06244eb853f2bf73477b4a7" },
      { slug: "cl00-numbers-strings", title: "[ABPYCL00] 정수·부동소수점·문자열", notionId: "dc71751a73b54676845ec61be7fc524c" },
      { slug: "cl01-bool", title: "[ABPYCL01] 진위(bool)", notionId: "a5636dd77dc4445abfa6a4f78d0de4d6" },
      { slug: "cl02-members", title: "[ABPYCL02] 멤버 변수와 함수", notionId: "9dd6cbc6676d4ecda310198e68525647" },
      { slug: "cl04-cast", title: "[ABPYCL04] 명시적 형 변환", notionId: "7a8311e4182b4ff5a6a8f43956c6c540" },
      { slug: "cl05-list-tuple", title: "[ABPYCL05] 리스트·튜플·인덱스", notionId: "f478e1ffaaac4bb2b05837840b85540c" },
      { slug: "cl06-dict", title: "[ABPYCL06] 딕셔너리", notionId: "27c3c357fa5042c8a0d22bfe1d322eef" },
      { slug: "cl09-class", title: "[ABPYCL09] 사용자 정의 클래스", notionId: "97ee299165744929aa1550f4b59c4a80" },
      { slug: "cl10-mutability", title: "[ABPYCL10] 불변과 가변", notionId: "074111dd2f404c4bb6735a625c351887" },
      { slug: "cl11-fstring", title: "[ABPYCL11] escape character, f-string", notionId: "65bd0f3e7ada46e3998bccddf9fc58ea" },
      { slug: "pr00-arith", title: "[ABPYPR00] 산술연산자", notionId: "b6c501fe7bc34e028433d19903c171fc" },
      { slug: "pr01-compare", title: "[ABPYPR01] 비교연산자", notionId: "f6ea492e1f6245f5adbf34f524d35330" },
      { slug: "pr02-membership", title: "[ABPYPR02] 멤버십연산자", notionId: "d964930d36714336972d18f2772b6566" },
      { slug: "pr03-logic", title: "[ABPYPR03] 논리연산자", notionId: "cfa0fe8dfe3348dd909ca524efc782eb" },
      { slug: "pr04-assign", title: "[ABPYPR04] 할당연산자와 변수", notionId: "ebcb65dbef354cdea575c106e1399a8c" },
      { slug: "pr05-if", title: "[ABPYPR05] 조건문", notionId: "24312d738d4e435bb96ceaacdcc75961" },
      { slug: "pr06-loop", title: "[ABPYPR06] 반복문", notionId: "2b73a25f6c96418583d94fb8b23f13f1" },
      { slug: "pr-comp-assign", title: "[AMPYPR00] 복합할당연산자", notionId: "3eaed4c5036d49918d047a837eb35d0f" },
      { slug: "pr-list-comp", title: "[AMPYPR01] 리스트 컴프리헨션", notionId: "9158f4e9858247c6bb286e34273b4d03" },
      { slug: "pr-identity", title: "[AMPYPR03] 식별 연산자", notionId: "3ef073db4ae54691a4e97d6016c63958" },
      { slug: "pr-exception", title: "[AMPYPR04] 예외 처리", notionId: "14ad28963b60400d99702901b1464b3a" },
      { slug: "fn00-builtin", title: "[ABPYFN00] 함수 구조와 내장함수", notionId: "d2e25e240d9d4fc6afbd548ceb2e6680" },
      { slug: "fn01-userdef", title: "[ABPYFN01] 사용자 정의 함수", notionId: "71a66467eb1c49fb865546a816b2336c" },
      { slug: "fn02-scope", title: "[ABPYFN02] 함수의 실행과 Scope", notionId: "3242f77e093f4dc6a3a6ed40ab5badf0" },
      { slug: "fn-recursion", title: "[AMPYFN01] 재귀 함수", notionId: "d9e0aa208b6f432895ff2e17a463f676" },
      { slug: "io00-print", title: "[ABPYIO00] 화면 출력", notionId: "e9b5a65f7e9b4940a8303ad08bf18f5d" },
      { slug: "io01-input", title: "[ABPYIO01] 키보드 입력", notionId: "cc6471b55a374265b72b2348a962df1e" },
      { slug: "io02-fileout", title: "[ABPYIO02] 파일 출력", notionId: "ea1bd5dd8a314f92a2ea6372f3718f6f" },
      { slug: "io03-filein", title: "[ABPYIO03] 파일 입력", notionId: "3b4eb045e82c4f27b20ad7c01b6da12b" },
      { slug: "module-pip", title: "[ABPYLI00] 모듈/패키지, pip활용", notionId: "8e23e30bfa604c33b320cc4f4b07a61e" },
    ],
  },
  {
    slug: "ml",
    title: "머신러닝",
    emoji: "🤖",
    description: "AI·ML·DL 개념부터 분류·회귀·군집화까지.",
    pages: [
      { slug: "ot00-concepts", title: "[ABMLOT00] AI vs ML vs DL", notionId: "cb3b09524d054c3a85ac5be0789ceb2c" },
      { slug: "ot01-without-ml", title: "[ABMLOT01] ML 없을 때 vs 있을 때", notionId: "7e307b21eb2046b892f53bbe1c971959" },
      { slug: "ot02-can-do", title: "[ABMLOT02] ML로 할 수 있는 것들", notionId: "bb95152c7beb45a388a5e8ee84eb24ab" },
      { slug: "ot03-roadmap", title: "[ABMLOT03] 지금 무엇을 어떻게 할지", notionId: "6ba62207af2a46019edcb1679a56d431" },
      { slug: "lr00-concept", title: "[ABMLLR00] 선형회귀 개념과 필요성", notionId: "8ffd190431c74392adee3e5e09dae154" },
      { slug: "lr01-basis", title: "[ABMLLR01] 선형회귀의 기반 지식", notionId: "b48a926f16414b35950637a0329d478c" },
      { slug: "lr02-interpret", title: "[ABMLLR02] 선형회귀 문제 해석", notionId: "063ac5329b9a454caee489eb625992ea" },
      { slug: "lr03-solve", title: "[ABMLLR03] 선형회귀 문제 풀이", notionId: "22a5a21d25a94565a628ff3fb73bf953" },
      { slug: "sl00-class-vs-reg", title: "[ABMLSL00] 분류 vs 회귀", notionId: "f5bdd6465c924c059aff39d609cfd2aa" },
      { slug: "sl03-eval", title: "[ABMLSL03] 분류 모델 성능 평가", notionId: "0a97847453e54fe19655fe20bc99e43e" },
    ],
  },
];

export function findPage(unitSlug: string, pageSlug: string) {
  const unit = units.find((u) => u.slug === unitSlug);
  if (!unit) return null;
  const pageIndex = unit.pages.findIndex((p) => p.slug === pageSlug);
  if (pageIndex < 0) return null;
  const prev = pageIndex > 0 ? unit.pages[pageIndex - 1] : null;
  const next = pageIndex < unit.pages.length - 1 ? unit.pages[pageIndex + 1] : null;
  return { unit, page: unit.pages[pageIndex], prev, next };
}

export function getAllPagePaths() {
  return units.flatMap((u) => u.pages.map((p) => ({ unit: u.slug, slug: p.slug })));
}
