// 키워드 랜딩페이지 데이터 — 키워드 하나 = 페이지 하나(/daejeon/:slug). 2026-10-01 사용자 확정 매핑.
// 원칙: 첫 문단에서 직답, 수강료·국비 금액·후기·과장 수치는 쓰지 않는다(상담/수강료 조회로 안내).
// main = 이 페이지에 커리큘럼 전체를 싣는 대표 과정(해당 /course/:slug 는 이 랜딩으로 301),
// related = 카드로만 보여주는 연관 과정, branches = 검색 의도가 두 갈래인 키워드의 갈래 안내.
import type { CourseInterest } from "@/components/ConsultModalContext";
import { getCourse } from "./courses";

export type MenuKey = "visual" | "motion" | "interior" | "cg" | "ai" | "drawing" | "cert";

export const menus: { key: MenuKey; label: string; interest: CourseInterest }[] = [
  { key: "visual", label: "시각편집", interest: "graphic" },
  { key: "motion", label: "모션그래픽", interest: "motion" },
  { key: "interior", label: "인테리어", interest: "interior" },
  { key: "cg", label: "CG", interest: "cg" },
  { key: "ai", label: "AI", interest: "ai" },
  { key: "drawing", label: "웹툰/디지털드로잉", interest: "drawing" },
  { key: "cert", label: "자격증", interest: "cert" },
];

export type Landing = {
  slug: string;
  keyword: string;
  menu: MenuKey;
  interest: CourseInterest;
  title: string;
  description: string;
  lead: string;
  points: string[];
  main: string[];
  related: string[];
  branches?: { title: string; body: string; courses: string[] }[];
  faq: { q: string; a: string }[];
};

export const landings: Landing[] = [
  // ── 시각편집 ──
  {
    slug: "visual-design",
    keyword: "대전시각편집학원",
    menu: "visual",
    interest: "graphic",
    title: "대전시각편집학원 | 포토샵·일러스트·인디자인·GTQ",
    description: "대전 둔산동 시각편집디자인 과정. 포토샵 보정·합성, 일러스트레이터 로고·벡터, 인디자인 편집·출판, GTQ·GTQi 자격까지 한 흐름으로 배웁니다.",
    lead: "대전시각편집학원을 찾는다면 포토샵·일러스트레이터·인디자인 세 프로그램을 어떤 순서로 배울지부터 정하는 게 좋습니다. 대전 서구 둔산동 대전AI컴퓨터디자인학원은 보정·합성(포토샵) → 로고·벡터(일러스트레이터) → 편집·출판(인디자인) 순서로 과정을 나눠 운영하고, GTQ·GTQi 자격 대비반도 함께 운영합니다.",
    points: ["포토샵 보정·합성과 광고 비주얼", "일러스트레이터 로고·아이콘·벡터 드로잉", "인디자인 브로슈어·카탈로그 편집과 인쇄 출력"],
    main: [],
    related: ["photoshop", "illustrator", "indesign", "gtq"],
    faq: [
      { q: "시각편집디자인은 어떤 일을 하나요?", a: "포스터·브로슈어·카탈로그·SNS 이미지처럼 인쇄물과 디지털 화면에 들어가는 시각물을 기획하고 편집하는 일입니다. 포토샵·일러스트레이터·인디자인이 기본 도구입니다." },
      { q: "어떤 프로그램부터 배워야 하나요?", a: "보통 포토샵으로 이미지 다루는 법을 먼저 익히고, 일러스트레이터와 인디자인으로 넘어갑니다. 이미 다뤄본 프로그램이 있으면 상담에서 시작 지점을 조정합니다." },
      { q: "자격증도 같이 준비할 수 있나요?", a: "포토샵은 GTQ, 일러스트레이터는 GTQi 대비 과정이 있습니다. 시험 일정과 급수는 시행처(한국생산성본부) 공고를 기준으로 안내합니다." },
    ],
  },
  {
    slug: "photoshop",
    keyword: "대전포토샵학원",
    menu: "visual",
    interest: "graphic",
    title: "대전포토샵학원 | 보정·합성부터 광고 비주얼까지 8주",
    description: "대전 둔산동 포토샵 과정. 선택·마스크, 보정·색보정, 레이어 스타일부터 인물 레터칭·광고 합성·Camera RAW까지 8주 동안 결과물 중심으로 배웁니다.",
    lead: "대전포토샵학원을 찾는다면 '기능을 몇 개 배우는지'보다 '어떤 결과물을 만들 수 있게 되는지'를 먼저 확인하세요. 대전AI컴퓨터디자인학원의 포토샵 과정은 8주 동안 선택·마스크·보정 기초에서 시작해 인물 레터칭, 광고 비주얼 합성까지 단계마다 결과물을 만들며 진행합니다.",
    points: ["선택 도구·마스크로 이미지 합성 기본기", "곡선·색조/채도·Camera RAW 색보정", "인물·제품 레터칭과 광고 비주얼 합성"],
    main: ["photoshop"],
    related: ["illustrator", "gtq"],
    faq: [
      { q: "포토샵을 처음 써보는데 수강할 수 있나요?", a: "선수 과목이 없는 과정이라 처음 시작하는 분도 수강할 수 있습니다. 작업 환경과 도구 사용법부터 함께 시작합니다." },
      { q: "포토샵 자격증도 준비할 수 있나요?", a: "포토샵 자격증인 GTQ 대비 과정을 따로 운영합니다. 대전GTQ학원 페이지에서 시험 대비 커리큘럼을 확인할 수 있습니다." },
    ],
  },
  {
    slug: "illustrator",
    keyword: "대전일러스트학원",
    menu: "visual",
    interest: "graphic",
    title: "대전일러스트학원 | 일러스트레이터 벡터·로고 & 디지털 드로잉",
    description: "대전일러스트학원, 목적에 따라 두 갈래입니다. 로고·아이콘·벡터 디자인은 일러스트레이터 과정, 캐릭터·채색 그림은 디지털드로잉·아이패드 드로잉 과정으로 안내합니다.",
    lead: "'일러스트'를 배우려는 목적은 두 갈래로 나뉩니다. 로고·아이콘·인포그래픽 같은 벡터 디자인이 목표라면 어도비 일러스트레이터 과정이, 캐릭터·채색·굿즈 같은 그림이 목표라면 디지털드로잉 과정이 맞습니다. 대전AI컴퓨터디자인학원은 두 과정을 모두 운영하니, 만들고 싶은 결과물을 기준으로 고르세요.",
    points: ["펜툴·패스·앵커 포인트로 벡터 드로잉", "로고·아이콘·패턴 디자인", "캐릭터·채색 중심의 디지털 드로잉 갈래"],
    main: ["illustrator"],
    related: ["gtq"],
    branches: [
      { title: "로고·아이콘·벡터 디자인 → 일러스트레이터", body: "크기를 바꿔도 깨지지 않는 벡터 그래픽을 다룹니다. 로고·아이콘·인포그래픽·편집물 삽화처럼 인쇄와 브랜딩에 쓰이는 결과물이 목표라면 이 갈래입니다.", courses: ["illustrator", "gtq"] },
      { title: "캐릭터·채색 그림 → 디지털 드로잉", body: "클립스튜디오·포토샵·프로크리에이트로 캐릭터와 채색 일러스트를 그립니다. 이모티콘·굿즈·웹툰 채색처럼 그림 자체가 결과물이라면 이 갈래입니다.", courses: ["digital-drawing", "ipad-drawing"] },
    ],
    faq: [
      { q: "일러스트레이터와 드로잉 중 어느 쪽인지 모르겠어요.", a: "만들고 싶은 결과물을 기준으로 정하면 됩니다. 로고·아이콘이면 일러스트레이터, 캐릭터·그림이면 드로잉입니다. 상담에서 만들고 싶은 것을 말씀해 주시면 갈래를 잡아 드립니다." },
      { q: "일러스트레이터 자격증이 있나요?", a: "GTQi(그래픽기술자격 일러스트)가 있습니다. 급수와 시험 일정은 시행처(한국생산성본부) 공고를 기준으로 안내합니다." },
    ],
  },
  {
    slug: "indesign",
    keyword: "대전인디자인학원",
    menu: "visual",
    interest: "graphic",
    title: "대전인디자인학원 | 편집디자인·디지털 출판 8주",
    description: "대전 둔산동 인디자인 과정. 그리드·타이포그래피, 마스터 페이지, 브로슈어·카탈로그 편집, 인쇄용 출력과 디지털 출판까지 8주 동안 배웁니다.",
    lead: "대전인디자인학원을 찾는다면 여러 페이지를 일관된 규칙으로 편집하는 능력이 핵심입니다. 대전AI컴퓨터디자인학원의 인디자인 과정은 8주 동안 그리드·타이포그래피 같은 편집 기본기부터 브로슈어·카탈로그 제작, 인쇄 출력 준비까지 다룹니다.",
    points: ["그리드·타이포그래피로 페이지 구성", "마스터 페이지·스타일로 다페이지 편집", "인쇄용 출력과 디지털 출판"],
    main: ["indesign"],
    related: ["photoshop", "illustrator"],
    faq: [
      { q: "포토샵·일러스트레이터를 먼저 알아야 하나요?", a: "인디자인 과정은 포토샵·일러스트레이터와 함께 쓰는 작업이 많아 기본 사용법을 알면 유리합니다. 처음이라면 상담에서 순서를 함께 정합니다." },
    ],
  },
  {
    slug: "gtq",
    keyword: "대전GTQ학원",
    menu: "visual",
    interest: "graphic",
    title: "대전GTQ학원 | 포토샵 자격증 GTQ 실기 대비 4주",
    description: "대전 둔산동 GTQ(그래픽기술자격) 대비 과정. 포토샵 시험 기능 학습, 유형별 문제 풀이, 실전 모의고사와 피드백까지 4주 동안 준비합니다.",
    lead: "GTQ는 포토샵 활용 능력을 평가하는 그래픽기술자격으로, 시험 유형이 정해져 있어 유형별 반복 실습이 합격의 핵심입니다. 대전AI컴퓨터디자인학원의 GTQ·GTQi 과정은 4주 동안 기능 학습 → 유형별 풀이 → 실전 모의고사 순서로 진행합니다.",
    points: ["시험 주요 기능과 작업 환경", "출제 유형별 반복 실습", "실전 조건 모의고사와 시간 관리"],
    main: ["gtq"],
    related: ["photoshop"],
    faq: [
      { q: "GTQ는 어디서 시행하나요?", a: "한국생산성본부(KPC)가 시행합니다. 시험 일정·급수·접수 방법은 시행처 공고를 기준으로 상담에서 안내합니다." },
      { q: "포토샵을 처음 다뤄도 GTQ를 준비할 수 있나요?", a: "기본 도구와 작업 환경부터 시작하는 과정입니다. 포토샵 경험이 전혀 없다면 기초 과정과 함께 듣는 방법도 상담에서 안내합니다." },
    ],
  },
  {
    slug: "gtqi",
    keyword: "대전GTQi학원",
    menu: "visual",
    interest: "graphic",
    title: "대전GTQi학원 | 일러스트레이터 자격증 GTQi 실기 대비",
    description: "대전 둔산동 GTQi(그래픽기술자격 일러스트) 대비 과정. 일러스트레이터 시험 기능, 유형별 실습, 모의고사와 피드백으로 4주 동안 준비합니다.",
    lead: "GTQi는 일러스트레이터 활용 능력을 평가하는 그래픽기술자격입니다. 대전AI컴퓨터디자인학원은 GTQ와 같은 반 구성(GTQ·GTQi 과정)에서 일러스트레이터 시험 기능과 출제 유형을 4주 동안 반복 실습하고 모의고사로 마무리합니다.",
    points: ["펜툴·패스 등 시험 핵심 기능", "출제 유형별 벡터 작업 실습", "모의고사와 취약 유형 보완"],
    main: ["gtq"],
    related: ["illustrator"],
    faq: [
      { q: "GTQ와 GTQi는 무엇이 다른가요?", a: "GTQ는 포토샵, GTQi는 일러스트레이터 활용 능력을 평가합니다. 두 시험 모두 한국생산성본부가 시행합니다." },
      { q: "GTQ와 GTQi를 같이 준비해도 되나요?", a: "같은 과정에서 두 프로그램을 함께 다루므로 일정에 맞춰 함께 준비할 수 있습니다. 응시 순서는 상담에서 정합니다." },
    ],
  },
  // ── 모션그래픽 ──
  {
    slug: "premiere",
    keyword: "대전프리미어학원",
    menu: "motion",
    interest: "motion",
    title: "대전프리미어학원 | 프리미어 프로 영상 편집 4주",
    description: "대전 둔산동 프리미어 프로 영상 편집 과정. 프로젝트 설정·컷 편집부터 속도 조절·자막·전환까지 4주 동안 실습하며 편집의 리듬을 익힙니다.",
    lead: "대전프리미어학원을 찾는다면 컷 편집과 자막·전환처럼 실제 영상에 바로 쓰는 기능부터 익히는 과정인지 확인하세요. 대전AI컴퓨터디자인학원의 프리미어 프로 과정은 4주 동안 프로젝트 설정과 컷 편집에서 시작해 속도 조절·화면 구성·자막·전환까지 실습합니다.",
    points: ["프로젝트 설정과 컷 편집", "속도 조절·화면 구성으로 리듬 만들기", "자막·전환과 Media Encoder 출력"],
    main: ["premiere"],
    related: ["youtube-ai", "after-effects"],
    faq: [
      { q: "영상 편집을 처음 해보는데 괜찮을까요?", a: "프로젝트 만들기와 영상 불러오기부터 시작하는 과정이라 처음인 분도 따라올 수 있습니다." },
      { q: "프리미어 다음에는 무엇을 배우나요?", a: "모션그래픽까지 하려면 애프터이펙트로 이어가는 경우가 많습니다. 유튜브 운영이 목표라면 AI 활용 유튜브 편집 과정도 있습니다." },
    ],
  },
  {
    slug: "youtube",
    keyword: "대전유튜브학원",
    menu: "motion",
    interest: "motion",
    title: "대전유튜브학원 | 유튜브 영상 편집 & AI 영상 제작",
    description: "대전 둔산동 유튜브 영상 편집 과정. ChatGPT·Gemini로 기획하고 CapCut·Vrew로 편집하는 AI 유튜브 편집, 프리미어 프로 편집 과정을 안내합니다.",
    lead: "유튜브를 시작하려면 기획·촬영본 편집·자막·썸네일까지 한 흐름을 직접 할 수 있어야 합니다. 대전AI컴퓨터디자인학원은 AI 도구로 기획과 편집 시간을 줄이는 'AI 활용 유튜브 영상편집' 과정과, 편집 기본기를 다지는 프리미어 프로 과정을 운영합니다.",
    points: ["ChatGPT·Gemini로 콘텐츠 기획·대본", "CapCut·Vrew로 컷 편집과 자막", "쇼츠·롱폼에 맞는 편집 흐름"],
    main: ["youtube-ai"],
    related: ["premiere", "ai-shorts", "ai-video"],
    faq: [
      { q: "촬영도 배우나요?", a: "이 과정은 기획과 편집 중심입니다. 촬영·조명 장비 운용은 과정 범위가 아니니 필요하면 상담에서 확인해 주세요." },
      { q: "프리미어와 AI 편집 과정 중 무엇이 맞나요?", a: "빠르게 업로드 루틴을 만들고 싶다면 AI 편집 과정, 편집 실력 자체를 탄탄히 하고 싶다면 프리미어 프로 과정이 맞습니다." },
    ],
  },
  {
    slug: "after-effects",
    keyword: "대전에펙학원",
    menu: "motion",
    interest: "motion",
    title: "대전에펙학원 | 애프터이펙트 모션그래픽 8주",
    description: "대전 둔산동 애프터이펙트(에펙) 과정. 키프레임·합성·트래킹, 키네틱 타이포, 3D 레이어와 방송 타이틀까지 8주 동안 모션그래픽 포트폴리오로 완성합니다.",
    lead: "대전에펙학원을 찾는다면 기초 기능에서 끝나지 않고 포트폴리오 작품까지 이어지는지 확인하세요. 대전AI컴퓨터디자인학원의 애프터이펙트 과정은 8주 동안 기초 → 장르별 모션 → 캐릭터 애니메이션 순서로 결과물을 쌓아 갑니다.",
    points: ["키프레임·그래프 에디터로 움직임 설계", "합성·트래킹과 키네틱 타이포그래피", "3D 레이어와 방송 타이틀"],
    main: ["after-effects"],
    related: ["cinema-4d", "premiere"],
    faq: [
      { q: "프리미어를 몰라도 에펙을 배울 수 있나요?", a: "에펙만으로도 시작할 수 있지만, 완성 영상을 내보내는 과정에서 프리미어를 함께 쓰는 경우가 많습니다. 상담에서 순서를 함께 정합니다." },
    ],
  },
  {
    slug: "cinema4d",
    keyword: "대전시포디학원",
    menu: "motion",
    interest: "motion",
    title: "대전시포디학원 | Cinema 4D 3D 모션그래픽 12주",
    description: "대전 둔산동 시포디(Cinema 4D) 과정. 모델링·재질·텍스처링·라이팅·카메라 애니메이션까지 12주 동안 3D 모션그래픽을 형태부터 비주얼까지 완성합니다.",
    lead: "시포디(Cinema 4D)는 모션그래픽 분야에서 3D 장면을 만들 때 많이 쓰는 프로그램입니다. 대전AI컴퓨터디자인학원의 Cinema 4D 과정은 12주 동안 모델링 → 움직임 → 현상(시뮬레이션) → 렌더링 비주얼 순서로 3D 모션을 완성합니다.",
    points: ["3D 모델링과 재질·텍스처링", "라이팅·카메라 애니메이션", "렌더링으로 완성하는 3D 모션 비주얼"],
    main: ["cinema-4d"],
    related: ["blender", "after-effects"],
    faq: [
      { q: "3D를 처음 해봐도 시포디를 배울 수 있나요?", a: "모델링 기초부터 시작하는 과정입니다. 애프터이펙트 경험이 있으면 모션 작업에 더 빨리 적응할 수 있습니다." },
      { q: "블렌더와 시포디 중 무엇을 배워야 하나요?", a: "모션그래픽 실무 연계가 목표라면 Cinema 4D, 무료 툴로 3D 전반을 익히려면 블렌더가 맞습니다. 두 과정 모두 운영합니다." },
    ],
  },
  // ── 인테리어 ──
  {
    slug: "cad",
    keyword: "대전캐드학원",
    menu: "interior",
    interest: "interior",
    title: "대전캐드학원 | 오토캐드 인테리어 도면 8주",
    description: "대전 둔산동 캐드(AutoCAD) 과정. 도면 작성 기초부터 평면도·입면도·단면도 등 인테리어 실무 도면까지 8주 동안 정확하게 그리는 법을 배웁니다.",
    lead: "대전캐드학원을 찾는다면 어떤 분야의 도면을 그릴지부터 정하는 게 좋습니다. 대전AI컴퓨터디자인학원의 오토캐드 과정은 인테리어 실무 도면 중심으로, 8주 동안 기본 명령어와 도면 작성 규칙에서 시작해 실무 도면 세트를 완성합니다.",
    points: ["오토캐드 기본 명령어와 도면 규칙", "평면도·입면도·단면도 작성", "치수·레이어·출력 설정"],
    main: ["autocad"],
    related: ["sketchup", "3ds-max"],
    faq: [
      { q: "캐드 다음에는 무엇을 배우나요?", a: "인테리어는 도면(캐드) → 3D 공간 구성(스케치업·3ds Max) 순서로 이어가는 경우가 많습니다." },
      { q: "자격증도 준비할 수 있나요?", a: "실내건축 관련 국가자격과 전산응용건축제도기능사 대비는 상담에서 개설 여부를 확인해 안내합니다." },
    ],
  },
  {
    slug: "sketchup",
    keyword: "대전스케치업학원",
    menu: "interior",
    interest: "interior",
    title: "대전스케치업학원 | 스케치업·엔스케이프 3D 공간 구성 8주",
    description: "대전 둔산동 스케치업 과정. 도면을 3D 공간으로 세우는 모델링부터 재질·조명, Enscape·V-Ray 렌더링까지 8주 동안 공간 디자인 결과물을 만듭니다.",
    lead: "스케치업은 도면을 빠르고 직관적으로 3D 공간으로 세울 수 있어 인테리어 실무에서 많이 쓰입니다. 대전AI컴퓨터디자인학원의 스케치업 과정은 8주 동안 공간 모델링부터 재질·조명, Enscape·V-Ray 렌더링까지 다룹니다.",
    points: ["캐드 도면을 3D 공간으로 모델링", "재질·조명·가구 배치", "Enscape·V-Ray 렌더링"],
    main: ["sketchup"],
    related: ["autocad", "3ds-max"],
    faq: [
      { q: "캐드를 몰라도 스케치업을 배울 수 있나요?", a: "스케치업만으로 시작할 수 있지만, 실무에서는 캐드 도면을 불러와 작업하는 경우가 많아 함께 배우면 유리합니다." },
    ],
  },
  {
    slug: "max",
    keyword: "대전맥스학원",
    menu: "interior",
    interest: "interior",
    title: "대전맥스학원 | 3ds Max·V-Ray 공간 비주얼라이제이션 8주",
    description: "대전 둔산동 3ds Max(맥스) 과정. 공간 모델링, 재질·조명 세팅, V-Ray 렌더링으로 실사에 가까운 인테리어 투시도를 8주 동안 완성합니다.",
    lead: "3ds Max(맥스)는 실사에 가까운 인테리어 투시도를 만들 때 쓰는 대표 프로그램입니다. 대전AI컴퓨터디자인학원의 3ds Max 과정은 8주 동안 공간 모델링부터 재질·조명 세팅, V-Ray 렌더링까지 단계별로 진행합니다.",
    points: ["3ds Max 공간 모델링", "재질·조명 세팅", "V-Ray 렌더링으로 투시도 완성"],
    main: ["3ds-max"],
    related: ["sketchup", "autocad"],
    faq: [
      { q: "스케치업과 3ds Max는 무엇이 다른가요?", a: "스케치업은 빠른 공간 구성과 의사소통에, 3ds Max는 고품질 렌더링 투시도에 강점이 있습니다. 목표에 따라 순서를 정합니다." },
    ],
  },
  // ── CG ──
  {
    slug: "maya",
    keyword: "대전마야학원",
    menu: "cg",
    interest: "cg",
    title: "대전마야학원 | 마야 3D 모델링·리깅·애니메이션",
    description: "대전 둔산동 마야(Maya) 과정. 마야·지브러시 3D 에셋 모델링, 서브스턴스 텍스처링, HumanIK 리깅과 그래프 에디터 애니메이션까지 배웁니다.",
    lead: "마야(Maya)는 게임·영상 CG에서 캐릭터와 에셋을 만들고 움직이는 데 쓰는 대표 3D 프로그램입니다. 대전AI컴퓨터디자인학원은 지브러시와 함께하는 3D 모델링 과정과, 리깅·애니메이션 과정을 나눠 운영합니다.",
    points: ["마야·지브러시 3D 에셋 모델링", "서브스턴스 페인터 텍스처링", "HumanIK 리깅과 그래프 에디터 애니메이션"],
    main: ["maya-modeling", "maya-rigging"],
    related: [],
    faq: [
      { q: "모델링과 애니메이션 중 무엇부터 배우나요?", a: "일반적으로 모델링으로 형태를 만드는 법을 먼저 익히고 리깅·애니메이션으로 넘어갑니다. 목표 직무에 따라 상담에서 순서를 정합니다." },
    ],
  },
  // ── AI ──
  {
    slug: "ai",
    keyword: "대전AI학원",
    menu: "ai",
    interest: "ai",
    title: "대전AI학원 | ChatGPT·클로드·업무 자동화·AI 영상",
    description: "대전 둔산동 AI 활용 과정. ChatGPT 입문, 클로드 AI 에이전트, 오피스·n8n 업무 자동화, AI 영상·쇼츠, 마케팅 자동화까지 목적별로 고르세요.",
    lead: "대전AI학원을 찾는다면 AI로 무엇을 하고 싶은지부터 정하세요. 대전AI컴퓨터디자인학원은 ChatGPT 입문, 업무 자동화(오피스·n8n), AI 에이전트(클로드), AI 영상·쇼츠, 마케팅 자동화처럼 목적별로 과정을 나눠 운영합니다.",
    points: ["ChatGPT로 검색·문서·이미지 생성", "오피스·n8n으로 반복 업무 자동화", "AI 영상·쇼츠와 마케팅 콘텐츠 제작"],
    main: [],
    related: ["chatgpt-first", "ai-agent", "chatgpt-office", "n8n-efficiency", "ai-video", "ai-shorts", "ai-marketing-auto", "vibe-coding"],
    faq: [
      { q: "AI를 전혀 써본 적이 없는데 괜찮을까요?", a: "'챗GPT와 친해지는 첫걸음' 과정은 계정 설정과 프롬프트 기본부터 시작합니다. 처음이라면 이 과정부터 추천합니다." },
      { q: "코딩을 몰라도 업무 자동화를 할 수 있나요?", a: "ChatGPT 오피스 자동화와 n8n 과정은 코딩 경험이 없는 분을 기준으로 진행합니다." },
    ],
  },
  {
    slug: "coding",
    keyword: "대전코딩학원",
    menu: "ai",
    interest: "it",
    title: "대전코딩학원 | AI 바이브코딩 & 파이썬·자바·웹 프로그래밍",
    description: "대전코딩학원, 두 갈래로 운영합니다. Claude·Cursor로 웹사이트를 만드는 AI 바이브코딩, 파이썬·자바·HTML/CSS·자바스크립트 프로그래밍 과정을 안내합니다.",
    lead: "코딩을 배우는 길은 두 가지입니다. AI에게 지시해 웹사이트와 자동화를 빠르게 만드는 'AI 바이브코딩', 그리고 파이썬·자바·웹(HTML/CSS·자바스크립트)처럼 언어를 직접 익히는 프로그래밍입니다. 대전AI컴퓨터디자인학원은 두 갈래를 모두 운영합니다.",
    points: ["Claude·Cursor로 웹사이트 제작(바이브코딩)", "파이썬·자바 문법과 객체지향", "HTML/CSS·자바스크립트 웹 개발 기초"],
    main: [],
    related: [],
    branches: [
      { title: "AI로 만드는 코딩 → 바이브코딩", body: "Claude·Cursor 같은 AI 도구에 지시하며 웹사이트·자동화를 만듭니다. 결과물을 빨리 만들어 보고 싶은 비전공자에게 맞습니다.", courses: ["vibe-coding", "ai-agent"] },
      { title: "언어를 직접 배우는 코딩 → 프로그래밍", body: "파이썬·자바·HTML/CSS·자바스크립트 문법과 구조를 익힙니다. 개발 직무를 준비하거나 기초를 탄탄히 하고 싶은 분께 맞습니다.", courses: ["python", "java", "html-css", "javascript"] },
    ],
    faq: [
      { q: "바이브코딩과 프로그래밍 중 무엇을 배워야 하나요?", a: "당장 웹사이트나 자동화 결과물이 필요하면 바이브코딩, 개발 직무나 깊은 이해가 목표라면 프로그래밍 언어부터 추천합니다." },
      { q: "레벨 테스트가 있나요?", a: "프로그래밍 과정은 상담과 레벨 확인 후 반을 배정합니다." },
    ],
  },
  // ── 웹툰/디지털드로잉 ──
  {
    slug: "webtoon",
    keyword: "대전웹툰학원",
    menu: "drawing",
    interest: "drawing",
    title: "대전웹툰학원 | 클립스튜디오 웹툰 & AI 어시스트",
    description: "대전 둔산동 웹툰 과정. 클립스튜디오로 캐릭터·배경·채색을 익히고 AI 어시스트를 활용해 웹툰 작업 흐름을 만듭니다. 3개월 이상 과정.",
    lead: "대전웹툰학원을 찾는다면 그림체·캐릭터 표현 중심인지, 스토리·콘티 중심인지 먼저 확인하세요. 대전AI컴퓨터디자인학원의 웹툰 과정은 클립스튜디오로 캐릭터·배경·채색을 익히고 AI 어시스트를 작업 흐름에 연결하는 그림 표현 중심 과정입니다.",
    points: ["클립스튜디오 캐릭터·채색", "배경 작업(스케치업 활용 포함)", "AI 어시스트로 작업 효율화"],
    main: ["webtoon"],
    related: ["digital-drawing", "emoticon"],
    faq: [
      { q: "스토리·콘티·투고까지 지도하나요?", a: "이 과정은 그림 표현과 작업 흐름이 중심입니다. 스토리 기획·투고 지도가 필요하면 상담에서 범위를 확인해 주세요." },
    ],
  },
  {
    slug: "digital-drawing",
    keyword: "대전디지털드로잉학원",
    menu: "drawing",
    interest: "drawing",
    title: "대전디지털드로잉학원 | 디지털아트 드로잉 마스터 과정",
    description: "대전 둔산동 디지털 드로잉 과정. 클립스튜디오·포토샵과 태블릿으로 형태·명암·채색 기초부터 캐릭터 일러스트 포트폴리오까지 3개월 이상 배웁니다.",
    lead: "디지털 드로잉은 종이 그림 실력에 태블릿·레이어·브러시 활용이 더해지는 작업입니다. 대전AI컴퓨터디자인학원의 디지털아트 드로잉 과정은 클립스튜디오·포토샵과 태블릿으로 형태·명암·채색 기초부터 포트폴리오 작품까지 이어집니다.",
    points: ["태블릿·브러시·레이어 활용", "형태·명암·채색 기초", "캐릭터 일러스트 포트폴리오"],
    main: ["digital-drawing"],
    related: ["ipad-drawing", "webtoon"],
    faq: [
      { q: "그림을 잘 못 그려도 시작할 수 있나요?", a: "형태와 명암 같은 기초부터 진행합니다. 개인별 진도 차이가 있어 기간은 상담에서 함께 정합니다." },
    ],
  },
  {
    slug: "ipad-drawing",
    keyword: "대전아이패드드로잉학원",
    menu: "drawing",
    interest: "drawing",
    title: "대전아이패드드로잉학원 | 프로크리에이트 아이패드 드로잉",
    description: "대전 둔산동 아이패드 드로잉 과정. 아이패드·애플펜슬·프로크리에이트로 브러시·레이어·채색 기초부터 나만의 그림 완성까지 1개월부터 시작합니다.",
    lead: "아이패드 드로잉은 프로크리에이트 앱과 애플펜슬만 있으면 바로 시작할 수 있어 입문자에게 부담이 적습니다. 대전AI컴퓨터디자인학원의 아이패드 드로잉 과정은 브러시·레이어·채색 기초부터 완성 그림까지 1개월부터 진행합니다.",
    points: ["프로크리에이트 브러시·레이어 기초", "채색과 명암 표현", "SNS·굿즈용 그림 완성"],
    main: ["ipad-drawing"],
    related: ["digital-drawing", "emoticon"],
    faq: [
      { q: "아이패드를 가져가야 하나요?", a: "개인 아이패드·애플펜슬 사용을 기준으로 진행합니다. 준비 사항은 상담에서 안내합니다." },
    ],
  },
  {
    slug: "emoticon",
    keyword: "대전이모티콘학원",
    menu: "drawing",
    interest: "drawing",
    title: "대전이모티콘학원 | 캐릭터·이모티콘·굿즈 크리에이터",
    description: "대전 둔산동 이모티콘 과정. 클립스튜디오·포토샵·프로크리에이트와 생성형 AI로 캐릭터를 만들고 이모티콘·굿즈 콘텐츠로 완성합니다. 2개월 과정.",
    lead: "이모티콘은 캐릭터 하나를 다양한 표정과 동작으로 일관되게 그리는 능력이 핵심입니다. 대전AI컴퓨터디자인학원의 캐릭터·이모티콘·굿즈 과정은 캐릭터 설계부터 이모티콘 세트, 굿즈 콘텐츠까지 2개월 동안 진행합니다.",
    points: ["캐릭터 설계와 표정·동작 바리에이션", "이모티콘 세트 제작", "굿즈용 캐릭터 콘텐츠"],
    main: ["emoticon"],
    related: ["ipad-drawing", "webtoon"],
    faq: [
      { q: "이모티콘 제안(입점)도 도와주나요?", a: "제작 과정이 중심이며, 플랫폼별 제안 규격은 수업에서 함께 확인합니다. 입점 결과는 플랫폼 심사에 따릅니다." },
    ],
  },
  // ── 자격증 ──
  {
    slug: "computer",
    keyword: "대전컴활학원",
    menu: "cert",
    interest: "cert",
    title: "대전컴활학원 | 컴퓨터활용능력 1급·2급 실기 대비",
    description: "대전 둔산동 컴활 과정. 컴퓨터활용능력 2급(엑셀)과 1급(엑셀+액세스) 실기를 각 4주 동안 함수·분석·매크로·데이터베이스와 실전 모의고사로 준비합니다.",
    lead: "컴활은 2급이 엑셀, 1급이 엑셀에 액세스(데이터베이스)까지 더해지는 시험입니다. 대전AI컴퓨터디자인학원은 2급·1급 실기 과정을 각각 4주로 운영하며, 함수·분석·매크로 실습과 실전 모의고사로 마무리합니다.",
    points: ["2급: 엑셀 함수·분석·매크로·차트", "1급: 고급 엑셀 + 액세스 데이터베이스", "제한 시간 실전 모의고사와 오답 피드백"],
    main: ["computer-ability-2", "computer-ability-1"],
    related: [],
    faq: [
      { q: "컴활은 어디서 시행하나요?", a: "대한상공회의소가 시행합니다. 시험 일정과 접수는 시행처 공고를 기준으로 상담에서 안내합니다." },
      { q: "2급 없이 1급부터 준비해도 되나요?", a: "엑셀 기본기가 있다면 가능하지만, 2급으로 기초를 잡고 1급으로 가면 훨씬 수월합니다." },
    ],
  },
];

export const getLanding = (slug: string) => landings.find((l) => l.slug === slug);
export const landingsByMenu = (menu: MenuKey) => landings.filter((l) => l.menu === menu);

// 과정 → 커리큘럼 전체를 싣는 대표 랜딩. 여기 걸린 과정은 /course/:slug 대신 랜딩으로 연결(301).
const primary = new Map<string, string>();
for (const l of landings) for (const c of l.main) if (!primary.has(c)) primary.set(c, l.slug);
export const courseHref = (courseSlug: string) => (primary.has(courseSlug) ? `/daejeon/${primary.get(courseSlug)}` : `/course/${courseSlug}`);
export const coursePrimaryLanding = (courseSlug: string) => primary.get(courseSlug);

// 화면에 보이는 FAQ = FAQPage JSON-LD (같은 함수로 만들어 둘이 어긋나지 않게).
export function landingFaq(l: Landing) {
  const seen = new Set<string>();
  return [...l.faq, ...l.main.flatMap((s) => getCourse(s)?.faq ?? [])].filter((f) => !seen.has(f.q) && seen.add(f.q)).slice(0, 8);
}
