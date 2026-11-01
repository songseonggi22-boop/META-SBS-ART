// "이번 주 랭킹" 섹션 — 고정 데이터 파일. 실시간 연동이 아니라 우리가 직접 고치는 값입니다.
// 순위를 바꾸려면 아래 숫자와 제목만 고치세요. 날짜는 RANKING_UPDATED_AT을 수정하세요.
//
// 각 항목의 썸네일은 image(실제 로고 경로) 또는 icon(범용 아이콘) 둘 중 하나로 정해집니다.
// - 소프트웨어 툴(포토샵·일러스트·프리미어 등)처럼 이미 라이선스 확인된 로고가 있으면 image에 그 경로를.
// - 자격증처럼 특정 툴이 아니거나, 발급기관 공식 로고(상표 보호될 수 있음)를 함부로 쓰기 조심스러운
//   항목은 image를 ""로 비우고 icon에 lucide-react 아이콘을 지정하세요(범용 아이콘이라 저작권 문제 없음).
// - image와 icon 둘 다 없으면 화면에는 회색 박스가 대신 나옵니다.

import { Award, Bot, Code2, Cuboid, Play, Video, type LucideIcon } from "lucide-react";

export const RANKING_UPDATED_AT = "2026.11.01";

export type RankChange = "up" | "down" | "same" | "new";

export interface CourseRankingItem {
  rank: number;
  title: string;
  period: string;
  students: number;
  image: string;
  icon?: LucideIcon;
  /** 빈 문자열("")이면 클릭 안 되는 행으로 표시됩니다. */
  link: string;
}

export interface CertRankingItem {
  rank: number;
  title: string;
  change: RankChange;
  /** "up"/"down"일 때만 사용 — 몇 계단 움직였는지(화면엔 ▲2 / ▼1 식으로 표시). */
  changeValue?: number;
  image: string;
  icon?: LucideIcon;
  /** 빈 문자열("")이면 클릭 안 되는 행으로 표시됩니다. */
  link: string;
}

export const courseRankingCategories = ["전체", "포토샵", "일러스트", "모션그래픽", "CG", "컴활"] as const;
export type CourseRankingCategory = (typeof courseRankingCategories)[number];

export const certRankingCategories = ["전체", "디자인", "컴퓨터", "영상·CG"] as const;
export type CertRankingCategory = (typeof certRankingCategories)[number];

const PS = "/tool-logos/photoshop.png";
const AI_LOGO = "/tool-logos/illustrator.png";
const PR = "/tool-logos/premiere.png";
const AE = "/tool-logos/after-effects.png";
const MAYA = "/tool-logos/maya.png";
const ID = "/tool-logos/indesign.png";

export const courseRanking: Record<CourseRankingCategory, CourseRankingItem[]> = {
  전체: [
    { rank: 1, title: "포토샵 보정·합성 마스터", period: "3개월", students: 182, image: PS, link: "/daejeon/photoshop" },
    { rank: 2, title: "일러스트레이터 벡터 드로잉", period: "2개월", students: 156, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 3, title: "프리미어 프로 영상편집", period: "1개월", students: 149, image: PR, link: "/daejeon/premiere" },
    { rank: 4, title: "애프터이펙트 모션그래픽", period: "2개월", students: 131, image: AE, link: "/daejeon/after-effects" },
    { rank: 5, title: "마야 3D 모델링·애니메이션", period: "2~3개월", students: 118, image: MAYA, link: "/daejeon/maya" },
    { rank: 6, title: "인디자인 편집디자인", period: "2개월", students: 97, image: ID, link: "/daejeon/indesign" },
    { rank: 7, title: "컴퓨터활용능력 1급 완성반", period: "1개월", students: 204, image: "", icon: Award, link: "/daejeon/computer" },
    { rank: 8, title: "GTQ 그래픽기술자격 대비반", period: "1개월", students: 88, image: PS, link: "/daejeon/gtq" },
    { rank: 9, title: "AI 에이전트(클로드) 활용", period: "4주", students: 73, image: "", icon: Bot, link: "/course/ai-agent" },
    { rank: 10, title: "바이브코딩 웹사이트 구축", period: "8주", students: 61, image: "", icon: Code2, link: "/course/vibe-coding" },
  ],
  포토샵: [
    { rank: 1, title: "포토샵 기초 보정반", period: "1개월", students: 142, image: PS, link: "/daejeon/photoshop" },
    { rank: 2, title: "포토샵 광고 비주얼 합성", period: "2개월", students: 128, image: PS, link: "/daejeon/photoshop" },
    { rank: 3, title: "포토샵 레터칭 심화반", period: "1개월", students: 101, image: PS, link: "/daejeon/photoshop" },
    { rank: 4, title: "포토샵 색보정 전문반", period: "1개월", students: 95, image: PS, link: "/daejeon/photoshop" },
    { rank: 5, title: "포토샵 포트폴리오 완성반", period: "2개월", students: 89, image: PS, link: "/daejeon/photoshop" },
    { rank: 6, title: "포토샵 제품사진 합성반", period: "1개월", students: 77, image: PS, link: "/daejeon/photoshop" },
    { rank: 7, title: "포토샵 주말 집중반", period: "3주", students: 64, image: PS, link: "/daejeon/photoshop" },
    { rank: 8, title: "포토샵 GTQ 자격증 연계반", period: "1개월", students: 58, image: PS, link: "/daejeon/gtq" },
    { rank: 9, title: "포토샵 실무 프로젝트반", period: "2개월", students: 49, image: PS, link: "/daejeon/photoshop" },
    { rank: 10, title: "포토샵 입문 체험반", period: "2주", students: 37, image: PS, link: "" },
  ],
  일러스트: [
    { rank: 1, title: "일러스트레이터 로고·아이콘", period: "1개월", students: 118, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 2, title: "일러스트레이터 벡터 캐릭터", period: "2개월", students: 104, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 3, title: "일러스트레이터 패턴 디자인", period: "1개월", students: 91, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 4, title: "일러스트레이터 인포그래픽", period: "1개월", students: 82, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 5, title: "일러스트레이터 편집 삽화반", period: "2개월", students: 70, image: AI_LOGO, link: "/daejeon/indesign" },
    { rank: 6, title: "일러스트레이터 GTQi 대비반", period: "1개월", students: 63, image: AI_LOGO, link: "/daejeon/gtq" },
    { rank: 7, title: "일러스트레이터 브랜딩 굿즈반", period: "2개월", students: 55, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 8, title: "일러스트레이터 실무 포트폴리오", period: "2개월", students: 48, image: AI_LOGO, link: "/daejeon/illustrator" },
    { rank: 9, title: "일러스트레이터 주말 집중반", period: "3주", students: 39, image: AI_LOGO, link: "" },
    { rank: 10, title: "일러스트레이터 입문 체험반", period: "2주", students: 30, image: AI_LOGO, link: "" },
  ],
  모션그래픽: [
    { rank: 1, title: "프리미어 프로 컷편집 기초", period: "1개월", students: 137, image: PR, link: "/daejeon/premiere" },
    { rank: 2, title: "애프터이펙트 키네틱 타이포", period: "2개월", students: 112, image: AE, link: "/daejeon/after-effects" },
    { rank: 3, title: "프리미어 프로 유튜브 편집반", period: "1개월", students: 103, image: PR, link: "/daejeon/premiere" },
    { rank: 4, title: "애프터이펙트 합성·트래킹", period: "2개월", students: 86, image: AE, link: "/daejeon/after-effects" },
    { rank: 5, title: "Cinema 4D 3D 모션 비주얼", period: "2개월", students: 74, image: "", icon: Cuboid, link: "/daejeon/after-effects" },
    { rank: 6, title: "프리미어 프로 브이로그 편집", period: "3주", students: 68, image: PR, link: "/daejeon/premiere" },
    { rank: 7, title: "애프터이펙트 방송 타이틀반", period: "2개월", students: 57, image: AE, link: "/daejeon/after-effects" },
    { rank: 8, title: "AI 영상·쇼츠 제작반", period: "4주", students: 51, image: "", icon: Video, link: "/course/ai-agent" },
    { rank: 9, title: "모션그래픽 실무 프로젝트", period: "2개월", students: 44, image: "", icon: Play, link: "" },
    { rank: 10, title: "영상편집 입문 체험반", period: "2주", students: 33, image: "", icon: Play, link: "" },
  ],
  CG: [
    { rank: 1, title: "마야 3D 모델링 기초", period: "2개월", students: 96, image: MAYA, link: "/daejeon/maya" },
    { rank: 2, title: "지브러시 캐릭터 조형", period: "2개월", students: 84, image: "", icon: Cuboid, link: "/daejeon/maya" },
    { rank: 3, title: "마야 리깅·애니메이션", period: "3개월", students: 77, image: MAYA, link: "/daejeon/maya" },
    { rank: 4, title: "서브스턴스 페인터 텍스처링", period: "1개월", students: 65, image: "", icon: Cuboid, link: "/daejeon/maya" },
    { rank: 5, title: "3D 캐릭터 포트폴리오 완성반", period: "3개월", students: 58, image: MAYA, link: "/daejeon/maya" },
    { rank: 6, title: "CG 라이팅·렌더링", period: "2개월", students: 49, image: MAYA, link: "/daejeon/maya" },
    { rank: 7, title: "3D 프롭 모델링반", period: "1개월", students: 41, image: "", icon: Cuboid, link: "" },
    { rank: 8, title: "그래프 에디터 애니메이션", period: "2개월", students: 36, image: "", icon: Cuboid, link: "" },
    { rank: 9, title: "CG 실무 프로젝트반", period: "3개월", students: 30, image: "", icon: Cuboid, link: "" },
    { rank: 10, title: "3D 입문 체험반", period: "2주", students: 22, image: "", icon: Cuboid, link: "" },
  ],
  컴활: [
    { rank: 1, title: "컴퓨터활용능력 1급 완성반", period: "1개월", students: 211, image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 2, title: "컴퓨터활용능력 2급 완성반", period: "3주", students: 178, image: "", icon: Award, link: "/course/computer-ability-2" },
    { rank: 3, title: "엑셀 함수·분석 집중반", period: "2주", students: 134, image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 4, title: "액세스 데이터베이스반", period: "2주", students: 97, image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 5, title: "컴활 1급 실전 모의고사반", period: "1주", students: 86, image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 6, title: "컴활 2급 단기 완성반", period: "2주", students: 79, image: "", icon: Award, link: "/course/computer-ability-2" },
    { rank: 7, title: "엑셀 매크로·VBA반", period: "2주", students: 61, image: "", icon: Award, link: "" },
    { rank: 8, title: "컴활 주말 집중반", period: "3주", students: 54, image: "", icon: Award, link: "" },
    { rank: 9, title: "컴활 재시험 보강반", period: "1주", students: 42, image: "", icon: Award, link: "" },
    { rank: 10, title: "컴활 입문 체험반", period: "1주", students: 28, image: "", icon: Award, link: "" },
  ],
};

export const certRanking: Record<CertRankingCategory, CertRankingItem[]> = {
  전체: [
    { rank: 1, title: "컴퓨터활용능력 1급", change: "up", changeValue: 2, image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 2, title: "GTQ 포토샵 1급", change: "same", image: PS, link: "/daejeon/gtq" },
    { rank: 3, title: "컴퓨터활용능력 2급", change: "down", changeValue: 1, image: "", icon: Award, link: "/course/computer-ability-2" },
    { rank: 4, title: "GTQi 일러스트", change: "new", image: AI_LOGO, link: "/daejeon/gtq" },
    { rank: 5, title: "전산응용건축제도기능사", change: "up", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 6, title: "멀티미디어콘텐츠제작전문가", change: "down", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 7, title: "컬러리스트기사", change: "same", image: "", icon: Award, link: "" },
    { rank: 8, title: "웹디자인기능사", change: "up", changeValue: 3, image: "", icon: Award, link: "" },
    { rank: 9, title: "영상편집기사", change: "new", image: "", icon: Award, link: "" },
    { rank: 10, title: "3D프린터운용기능사", change: "down", changeValue: 1, image: "", icon: Award, link: "" },
  ],
  디자인: [
    { rank: 1, title: "GTQ 포토샵 1급", change: "up", changeValue: 1, image: PS, link: "/daejeon/gtq" },
    { rank: 2, title: "GTQi 일러스트", change: "same", image: AI_LOGO, link: "/daejeon/gtq" },
    { rank: 3, title: "컬러리스트기사", change: "down", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 4, title: "웹디자인기능사", change: "up", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 5, title: "시각디자인기사", change: "same", image: "", icon: Award, link: "" },
    { rank: 6, title: "제품디자인산업기사", change: "new", image: "", icon: Award, link: "" },
    { rank: 7, title: "컴퓨터그래픽스운용기능사", change: "down", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 8, title: "BI·CI 디자인전문가", change: "up", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 9, title: "편집디자인전문가", change: "same", image: "", icon: Award, link: "" },
    { rank: 10, title: "브랜드디자인전문가", change: "new", image: "", icon: Award, link: "" },
  ],
  컴퓨터: [
    { rank: 1, title: "컴퓨터활용능력 1급", change: "same", image: "", icon: Award, link: "/course/computer-ability-1" },
    { rank: 2, title: "컴퓨터활용능력 2급", change: "up", changeValue: 1, image: "", icon: Award, link: "/course/computer-ability-2" },
    { rank: 3, title: "정보처리기사", change: "down", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 4, title: "ITQ 한글", change: "same", image: "", icon: Award, link: "" },
    { rank: 5, title: "ITQ 엑셀", change: "up", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 6, title: "리눅스마스터", change: "new", image: "", icon: Award, link: "" },
    { rank: 7, title: "네트워크관리사", change: "down", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 8, title: "정보보안기사", change: "same", image: "", icon: Award, link: "" },
    { rank: 9, title: "사무자동화산업기사", change: "up", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 10, title: "워드프로세서", change: "down", changeValue: 2, image: "", icon: Award, link: "" },
  ],
  "영상·CG": [
    { rank: 1, title: "영상편집기사", change: "new", image: "", icon: Award, link: "" },
    { rank: 2, title: "멀티미디어콘텐츠제작전문가", change: "up", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 3, title: "컴퓨터그래픽스운용기능사", change: "same", image: "", icon: Award, link: "" },
    { rank: 4, title: "3D프린터운용기능사", change: "down", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 5, title: "게임그래픽전문가", change: "up", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 6, title: "VR콘텐츠제작전문가", change: "new", image: "", icon: Award, link: "" },
    { rank: 7, title: "모션그래픽디자이너", change: "same", image: "", icon: Award, link: "" },
    { rank: 8, title: "애니메이션기능사", change: "down", changeValue: 2, image: "", icon: Award, link: "" },
    { rank: 9, title: "방송영상제작기능사", change: "up", changeValue: 1, image: "", icon: Award, link: "" },
    { rank: 10, title: "특수효과전문가", change: "same", image: "", icon: Award, link: "" },
  ],
};
