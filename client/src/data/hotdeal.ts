// 수강료 지원 행사 — 고정 데이터 파일. 서버·DB 연동 없이 이 파일만 고치면 홈 화면(HotDealSection)에
// 바로 반영됩니다. 행사 시작 시각, 접수 인원, 업데이트 시각, 과정 목록만 고치면 됩니다.
//
// 수정 순서: 아래 값을 바꾼다 → 저장한다 → `pnpm run build:static` → 배포(git push, Vercel 자동배포).

// 행사 시작 시각(ISO, 타임존 포함) — 이 시각부터 카운트다운이 "마감까지 남은 시간"으로 바뀝니다.
// 2026-11-12: 1회성 100시간 행사가 끝나고 멈춰 있던 걸 "7일 주기로 계속 반복"하도록 변경.
// 이 값은 그 반복 주기의 기준점(앵커)일 뿐 — 한 번 지나도 끝나지 않고, 7일마다 자동으로 다시 7일 카운트다운이
// 시작됩니다(Home.tsx의 hotDealCycleEnd 참고). 날짜를 바꿀 필요는 없고, 그대로 두면 됩니다.
export const HOTDEAL_STARTS_AT = "2026-11-02T10:00:00+09:00";
// 한 주기 길이(시간 단위) = 7일. 이 값을 바꾸면 반복 주기 자체가 바뀝니다(예: 168→72면 3일마다 반복).
export const HOTDEAL_DURATION_HOURS = 24 * 7;
export const SUPPORT_PERCENT = 40;
export const SEAT_LIMIT = 50;
// 현재 접수 인원 — 이 숫자만 바꾸면 잔여 좌석·진행 막대가 전부 자동으로 갱신됩니다.
export const SEATS_TAKEN = 10;
// SEATS_TAKEN을 마지막으로 고친 시각(화면에 작게 표시).
export const SEATS_UPDATED_AT = "2026-11-02 14:00";
export const NOTICE = "지원 대상 및 조건은 상담 시 안내드립니다.";

// 상담 버튼 문구 — 진행 중/마감 상태에서 다른 문구를 쓰고 싶으면 여기만 고치면 됩니다.
export const CTA_LABEL_OPEN = "무료 상담 신청";
export const CTA_LABEL_CLOSED = "상담 신청하기";

export interface HotDealItem {
  category: string;
  title: string;
  period: string;
  image: string;
  link: string;
}

export const hotDealItems: HotDealItem[] = [
  { category: "컴퓨터 자격증", title: "컴퓨터활용능력 1급", period: "4주", image: "/course-hero/ca1.webp", link: "/daejeon/computer" },
  { category: "AI 활용", title: "AI 에이전트(클로드)", period: "4주", image: "/course-hero/ai-agent.webp", link: "/course/ai-agent" },
  { category: "AI 활용", title: "바이브코딩 : Claude AI로 웹사이트 구축", period: "8주", image: "/course-hero/vibe-coding.webp", link: "/course/vibe-coding" },
  { category: "시각편집디자인", title: "그래픽 기초 : 포토샵", period: "8주", image: "/img-cache/21186.webp", link: "/daejeon/photoshop" },
  { category: "모션그래픽", title: "프리미어 프로(영상 편집)", period: "4주", image: "/img-cache/21197.webp", link: "/daejeon/premiere" },
  { category: "CG / 3D", title: "마야 3D모델링(지브러쉬)", period: "4~8주", image: "/img-cache/21137.webp", link: "/daejeon/maya" },
];
