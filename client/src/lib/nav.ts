// 최상단 내비게이션(정보구조) 단일 출처 — 헤더·모바일 메뉴·푸터가 전부 이 배열을 쓴다.
// "교육과정"(메가메뉴, menus.ts의 7개 분야)은 SiteShell에서 별도로 그리고, 여기는 그 옆의 5개 상단 메뉴.
export type NavLink = { label: string; href: string };

export const topNav: NavLink[] = [
  { label: "국비지원", href: "/funding" },
  { label: "취업지원", href: "/careers" },
  { label: "수강후기·작품", href: "/community" },
  { label: "자료실", href: "/blog" },
  { label: "학원안내", href: "/about" },
];

// 푸터용 — 위 상단 메뉴 + 전체과정·수강안내·개인정보처리방침까지 포함한 확장판.
export const footerNav: NavLink[] = [
  { label: "전체과정", href: "/courses" },
  { label: "국비지원", href: "/funding" },
  { label: "취업지원", href: "/careers" },
  { label: "수강후기·작품", href: "/community" },
  { label: "자료실", href: "/blog" },
  { label: "학원안내", href: "/about" },
  { label: "수강 안내", href: "/pricing" },
  { label: "개인정보처리방침", href: "/privacy" },
];
