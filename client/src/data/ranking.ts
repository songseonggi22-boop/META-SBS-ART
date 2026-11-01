// "이번 주 랭킹" 섹션 — 고정 데이터 파일. 실시간 연동이 아니라 우리가 직접 고치는 값입니다.
// 순위를 바꾸려면 아래 숫자와 제목만 고치세요. 날짜는 RANKING_UPDATED_AT을 수정하세요.
//
// 지금 들어있는 항목은 전부 화면 구성을 보여주기 위한 더미(예시) 데이터입니다 — 제목 끝에 "(예시)"가
// 붙어 있는 것도 그 때문입니다. 실제로 쓰려면 이 "(예시)" 항목들을 실제 과정/순위로 하나씩 바꾸세요.
// image 경로(/images/ranking/...)에 실제 파일이 없으면 화면에는 자동으로 회색 박스가 나옵니다.

export const RANKING_UPDATED_AT = "2026.11.01";

export type RankChange = "up" | "down" | "same" | "new";

export interface CourseRankingItem {
  rank: number;
  title: string;
  period: string;
  students: number;
  image: string;
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
  /** 빈 문자열("")이면 클릭 안 되는 행으로 표시됩니다. */
  link: string;
}

export const courseRankingCategories = ["전체", "포토샵", "일러스트", "모션그래픽", "CG", "컴활"] as const;
export type CourseRankingCategory = (typeof courseRankingCategories)[number];

export const certRankingCategories = ["전체", "디자인", "컴퓨터", "영상·CG"] as const;
export type CertRankingCategory = (typeof certRankingCategories)[number];

export const courseRanking: Record<CourseRankingCategory, CourseRankingItem[]> = {
  전체: [
    { rank: 1, title: "포토샵 보정·합성 마스터 (예시)", period: "3개월", students: 182, image: "/images/ranking/course-all-01.jpg", link: "/daejeon/photoshop" },
    { rank: 2, title: "일러스트레이터 벡터 드로잉 (예시)", period: "2개월", students: 156, image: "/images/ranking/course-all-02.jpg", link: "/daejeon/illustrator" },
    { rank: 3, title: "프리미어 프로 영상편집 (예시)", period: "1개월", students: 149, image: "/images/ranking/course-all-03.jpg", link: "/daejeon/premiere" },
    { rank: 4, title: "애프터이펙트 모션그래픽 (예시)", period: "2개월", students: 131, image: "/images/ranking/course-all-04.jpg", link: "/daejeon/after-effects" },
    { rank: 5, title: "마야 3D 모델링·애니메이션 (예시)", period: "2~3개월", students: 118, image: "/images/ranking/course-all-05.jpg", link: "/daejeon/maya" },
    { rank: 6, title: "인디자인 편집디자인 (예시)", period: "2개월", students: 97, image: "/images/ranking/course-all-06.jpg", link: "/daejeon/indesign" },
    { rank: 7, title: "컴퓨터활용능력 1급 완성반 (예시)", period: "1개월", students: 204, image: "/images/ranking/course-all-07.jpg", link: "/daejeon/computer" },
    { rank: 8, title: "GTQ 그래픽기술자격 대비반 (예시)", period: "1개월", students: 88, image: "/images/ranking/course-all-08.jpg", link: "/daejeon/gtq" },
    { rank: 9, title: "AI 에이전트(클로드) 활용 (예시)", period: "4주", students: 73, image: "/images/ranking/course-all-09.jpg", link: "/course/ai-agent" },
    { rank: 10, title: "바이브코딩 웹사이트 구축 (예시)", period: "8주", students: 61, image: "/images/ranking/course-all-10.jpg", link: "/course/vibe-coding" },
  ],
  포토샵: [
    { rank: 1, title: "포토샵 기초 보정반 (예시)", period: "1개월", students: 142, image: "/images/ranking/course-photoshop-01.jpg", link: "/daejeon/photoshop" },
    { rank: 2, title: "포토샵 광고 비주얼 합성 (예시)", period: "2개월", students: 128, image: "/images/ranking/course-photoshop-02.jpg", link: "/daejeon/photoshop" },
    { rank: 3, title: "포토샵 레터칭 심화반 (예시)", period: "1개월", students: 101, image: "/images/ranking/course-photoshop-03.jpg", link: "/daejeon/photoshop" },
    { rank: 4, title: "포토샵 색보정 전문반 (예시)", period: "1개월", students: 95, image: "/images/ranking/course-photoshop-04.jpg", link: "/daejeon/photoshop" },
    { rank: 5, title: "포토샵 포트폴리오 완성반 (예시)", period: "2개월", students: 89, image: "/images/ranking/course-photoshop-05.jpg", link: "/daejeon/photoshop" },
    { rank: 6, title: "포토샵 제품사진 합성반 (예시)", period: "1개월", students: 77, image: "/images/ranking/course-photoshop-06.jpg", link: "/daejeon/photoshop" },
    { rank: 7, title: "포토샵 주말 집중반 (예시)", period: "3주", students: 64, image: "/images/ranking/course-photoshop-07.jpg", link: "/daejeon/photoshop" },
    { rank: 8, title: "포토샵 GTQ 자격증 연계반 (예시)", period: "1개월", students: 58, image: "/images/ranking/course-photoshop-08.jpg", link: "/daejeon/gtq" },
    { rank: 9, title: "포토샵 실무 프로젝트반 (예시)", period: "2개월", students: 49, image: "/images/ranking/course-photoshop-09.jpg", link: "/daejeon/photoshop" },
    { rank: 10, title: "포토샵 입문 체험반 (예시)", period: "2주", students: 37, image: "/images/ranking/course-photoshop-10.jpg", link: "" },
  ],
  일러스트: [
    { rank: 1, title: "일러스트레이터 로고·아이콘 (예시)", period: "1개월", students: 118, image: "/images/ranking/course-illustrator-01.jpg", link: "/daejeon/illustrator" },
    { rank: 2, title: "일러스트레이터 벡터 캐릭터 (예시)", period: "2개월", students: 104, image: "/images/ranking/course-illustrator-02.jpg", link: "/daejeon/illustrator" },
    { rank: 3, title: "일러스트레이터 패턴 디자인 (예시)", period: "1개월", students: 91, image: "/images/ranking/course-illustrator-03.jpg", link: "/daejeon/illustrator" },
    { rank: 4, title: "일러스트레이터 인포그래픽 (예시)", period: "1개월", students: 82, image: "/images/ranking/course-illustrator-04.jpg", link: "/daejeon/illustrator" },
    { rank: 5, title: "일러스트레이터 편집 삽화반 (예시)", period: "2개월", students: 70, image: "/images/ranking/course-illustrator-05.jpg", link: "/daejeon/indesign" },
    { rank: 6, title: "일러스트레이터 GTQi 대비반 (예시)", period: "1개월", students: 63, image: "/images/ranking/course-illustrator-06.jpg", link: "/daejeon/gtq" },
    { rank: 7, title: "일러스트레이터 브랜딩 굿즈반 (예시)", period: "2개월", students: 55, image: "/images/ranking/course-illustrator-07.jpg", link: "/daejeon/illustrator" },
    { rank: 8, title: "일러스트레이터 실무 포트폴리오 (예시)", period: "2개월", students: 48, image: "/images/ranking/course-illustrator-08.jpg", link: "/daejeon/illustrator" },
    { rank: 9, title: "일러스트레이터 주말 집중반 (예시)", period: "3주", students: 39, image: "/images/ranking/course-illustrator-09.jpg", link: "" },
    { rank: 10, title: "일러스트레이터 입문 체험반 (예시)", period: "2주", students: 30, image: "/images/ranking/course-illustrator-10.jpg", link: "" },
  ],
  모션그래픽: [
    { rank: 1, title: "프리미어 프로 컷편집 기초 (예시)", period: "1개월", students: 137, image: "/images/ranking/course-motion-01.jpg", link: "/daejeon/premiere" },
    { rank: 2, title: "애프터이펙트 키네틱 타이포 (예시)", period: "2개월", students: 112, image: "/images/ranking/course-motion-02.jpg", link: "/daejeon/after-effects" },
    { rank: 3, title: "프리미어 프로 유튜브 편집반 (예시)", period: "1개월", students: 103, image: "/images/ranking/course-motion-03.jpg", link: "/daejeon/premiere" },
    { rank: 4, title: "애프터이펙트 합성·트래킹 (예시)", period: "2개월", students: 86, image: "/images/ranking/course-motion-04.jpg", link: "/daejeon/after-effects" },
    { rank: 5, title: "Cinema 4D 3D 모션 비주얼 (예시)", period: "2개월", students: 74, image: "/images/ranking/course-motion-05.jpg", link: "/daejeon/after-effects" },
    { rank: 6, title: "프리미어 프로 브이로그 편집 (예시)", period: "3주", students: 68, image: "/images/ranking/course-motion-06.jpg", link: "/daejeon/premiere" },
    { rank: 7, title: "애프터이펙트 방송 타이틀반 (예시)", period: "2개월", students: 57, image: "/images/ranking/course-motion-07.jpg", link: "/daejeon/after-effects" },
    { rank: 8, title: "AI 영상·쇼츠 제작반 (예시)", period: "4주", students: 51, image: "/images/ranking/course-motion-08.jpg", link: "/course/ai-agent" },
    { rank: 9, title: "모션그래픽 실무 프로젝트 (예시)", period: "2개월", students: 44, image: "/images/ranking/course-motion-09.jpg", link: "" },
    { rank: 10, title: "영상편집 입문 체험반 (예시)", period: "2주", students: 33, image: "/images/ranking/course-motion-10.jpg", link: "" },
  ],
  CG: [
    { rank: 1, title: "마야 3D 모델링 기초 (예시)", period: "2개월", students: 96, image: "/images/ranking/course-cg-01.jpg", link: "/daejeon/maya" },
    { rank: 2, title: "지브러시 캐릭터 조형 (예시)", period: "2개월", students: 84, image: "/images/ranking/course-cg-02.jpg", link: "/daejeon/maya" },
    { rank: 3, title: "마야 리깅·애니메이션 (예시)", period: "3개월", students: 77, image: "/images/ranking/course-cg-03.jpg", link: "/daejeon/maya" },
    { rank: 4, title: "서브스턴스 페인터 텍스처링 (예시)", period: "1개월", students: 65, image: "/images/ranking/course-cg-04.jpg", link: "/daejeon/maya" },
    { rank: 5, title: "3D 캐릭터 포트폴리오 완성반 (예시)", period: "3개월", students: 58, image: "/images/ranking/course-cg-05.jpg", link: "/daejeon/maya" },
    { rank: 6, title: "CG 라이팅·렌더링 (예시)", period: "2개월", students: 49, image: "/images/ranking/course-cg-06.jpg", link: "/daejeon/maya" },
    { rank: 7, title: "3D 프롭 모델링반 (예시)", period: "1개월", students: 41, image: "/images/ranking/course-cg-07.jpg", link: "" },
    { rank: 8, title: "그래프 에디터 애니메이션 (예시)", period: "2개월", students: 36, image: "/images/ranking/course-cg-08.jpg", link: "" },
    { rank: 9, title: "CG 실무 프로젝트반 (예시)", period: "3개월", students: 30, image: "/images/ranking/course-cg-09.jpg", link: "" },
    { rank: 10, title: "3D 입문 체험반 (예시)", period: "2주", students: 22, image: "/images/ranking/course-cg-10.jpg", link: "" },
  ],
  컴활: [
    { rank: 1, title: "컴퓨터활용능력 1급 완성반 (예시)", period: "1개월", students: 211, image: "/images/ranking/course-computer-01.jpg", link: "/course/computer-ability-1" },
    { rank: 2, title: "컴퓨터활용능력 2급 완성반 (예시)", period: "3주", students: 178, image: "/images/ranking/course-computer-02.jpg", link: "/course/computer-ability-2" },
    { rank: 3, title: "엑셀 함수·분석 집중반 (예시)", period: "2주", students: 134, image: "/images/ranking/course-computer-03.jpg", link: "/course/computer-ability-1" },
    { rank: 4, title: "액세스 데이터베이스반 (예시)", period: "2주", students: 97, image: "/images/ranking/course-computer-04.jpg", link: "/course/computer-ability-1" },
    { rank: 5, title: "컴활 1급 실전 모의고사반 (예시)", period: "1주", students: 86, image: "/images/ranking/course-computer-05.jpg", link: "/course/computer-ability-1" },
    { rank: 6, title: "컴활 2급 단기 완성반 (예시)", period: "2주", students: 79, image: "/images/ranking/course-computer-06.jpg", link: "/course/computer-ability-2" },
    { rank: 7, title: "엑셀 매크로·VBA반 (예시)", period: "2주", students: 61, image: "/images/ranking/course-computer-07.jpg", link: "" },
    { rank: 8, title: "컴활 주말 집중반 (예시)", period: "3주", students: 54, image: "/images/ranking/course-computer-08.jpg", link: "" },
    { rank: 9, title: "컴활 재시험 보강반 (예시)", period: "1주", students: 42, image: "/images/ranking/course-computer-09.jpg", link: "" },
    { rank: 10, title: "컴활 입문 체험반 (예시)", period: "1주", students: 28, image: "/images/ranking/course-computer-10.jpg", link: "" },
  ],
};

export const certRanking: Record<CertRankingCategory, CertRankingItem[]> = {
  전체: [
    { rank: 1, title: "컴퓨터활용능력 1급 (예시)", change: "up", changeValue: 2, image: "/images/ranking/cert-all-01.png", link: "/course/computer-ability-1" },
    { rank: 2, title: "GTQ 포토샵 1급 (예시)", change: "same", image: "/images/ranking/cert-all-02.png", link: "/daejeon/gtq" },
    { rank: 3, title: "컴퓨터활용능력 2급 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-all-03.png", link: "/course/computer-ability-2" },
    { rank: 4, title: "GTQi 일러스트 (예시)", change: "new", image: "/images/ranking/cert-all-04.png", link: "/daejeon/gtq" },
    { rank: 5, title: "전산응용건축제도기능사 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-all-05.png", link: "" },
    { rank: 6, title: "멀티미디어콘텐츠제작전문가 (예시)", change: "down", changeValue: 2, image: "/images/ranking/cert-all-06.png", link: "" },
    { rank: 7, title: "컬러리스트기사 (예시)", change: "same", image: "/images/ranking/cert-all-07.png", link: "" },
    { rank: 8, title: "웹디자인기능사 (예시)", change: "up", changeValue: 3, image: "/images/ranking/cert-all-08.png", link: "" },
    { rank: 9, title: "영상편집기사 (예시)", change: "new", image: "/images/ranking/cert-all-09.png", link: "" },
    { rank: 10, title: "3D프린터운용기능사 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-all-10.png", link: "" },
  ],
  디자인: [
    { rank: 1, title: "GTQ 포토샵 1급 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-design-01.png", link: "/daejeon/gtq" },
    { rank: 2, title: "GTQi 일러스트 (예시)", change: "same", image: "/images/ranking/cert-design-02.png", link: "/daejeon/gtq" },
    { rank: 3, title: "컬러리스트기사 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-design-03.png", link: "" },
    { rank: 4, title: "웹디자인기능사 (예시)", change: "up", changeValue: 2, image: "/images/ranking/cert-design-04.png", link: "" },
    { rank: 5, title: "시각디자인기사 (예시)", change: "same", image: "/images/ranking/cert-design-05.png", link: "" },
    { rank: 6, title: "제품디자인산업기사 (예시)", change: "new", image: "/images/ranking/cert-design-06.png", link: "" },
    { rank: 7, title: "컴퓨터그래픽스운용기능사 (예시)", change: "down", changeValue: 2, image: "/images/ranking/cert-design-07.png", link: "" },
    { rank: 8, title: "BI·CI 디자인전문가 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-design-08.png", link: "" },
    { rank: 9, title: "편집디자인전문가 (예시)", change: "same", image: "/images/ranking/cert-design-09.png", link: "" },
    { rank: 10, title: "브랜드디자인전문가 (예시)", change: "new", image: "/images/ranking/cert-design-10.png", link: "" },
  ],
  컴퓨터: [
    { rank: 1, title: "컴퓨터활용능력 1급 (예시)", change: "same", image: "/images/ranking/cert-pc-01.png", link: "/course/computer-ability-1" },
    { rank: 2, title: "컴퓨터활용능력 2급 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-pc-02.png", link: "/course/computer-ability-2" },
    { rank: 3, title: "정보처리기사 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-pc-03.png", link: "" },
    { rank: 4, title: "ITQ 한글 (예시)", change: "same", image: "/images/ranking/cert-pc-04.png", link: "" },
    { rank: 5, title: "ITQ 엑셀 (예시)", change: "up", changeValue: 2, image: "/images/ranking/cert-pc-05.png", link: "" },
    { rank: 6, title: "리눅스마스터 (예시)", change: "new", image: "/images/ranking/cert-pc-06.png", link: "" },
    { rank: 7, title: "네트워크관리사 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-pc-07.png", link: "" },
    { rank: 8, title: "정보보안기사 (예시)", change: "same", image: "/images/ranking/cert-pc-08.png", link: "" },
    { rank: 9, title: "사무자동화산업기사 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-pc-09.png", link: "" },
    { rank: 10, title: "워드프로세서 (예시)", change: "down", changeValue: 2, image: "/images/ranking/cert-pc-10.png", link: "" },
  ],
  "영상·CG": [
    { rank: 1, title: "영상편집기사 (예시)", change: "new", image: "/images/ranking/cert-video-01.png", link: "" },
    { rank: 2, title: "멀티미디어콘텐츠제작전문가 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-video-02.png", link: "" },
    { rank: 3, title: "컴퓨터그래픽스운용기능사 (예시)", change: "same", image: "/images/ranking/cert-video-03.png", link: "" },
    { rank: 4, title: "3D프린터운용기능사 (예시)", change: "down", changeValue: 1, image: "/images/ranking/cert-video-04.png", link: "" },
    { rank: 5, title: "게임그래픽전문가 (예시)", change: "up", changeValue: 2, image: "/images/ranking/cert-video-05.png", link: "" },
    { rank: 6, title: "VR콘텐츠제작전문가 (예시)", change: "new", image: "/images/ranking/cert-video-06.png", link: "" },
    { rank: 7, title: "모션그래픽디자이너 (예시)", change: "same", image: "/images/ranking/cert-video-07.png", link: "" },
    { rank: 8, title: "애니메이션기능사 (예시)", change: "down", changeValue: 2, image: "/images/ranking/cert-video-08.png", link: "" },
    { rank: 9, title: "방송영상제작기능사 (예시)", change: "up", changeValue: 1, image: "/images/ranking/cert-video-09.png", link: "" },
    { rank: 10, title: "특수효과전문가 (예시)", change: "same", image: "/images/ranking/cert-video-10.png", link: "" },
  ],
};
