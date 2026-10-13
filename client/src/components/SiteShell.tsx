import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { getLanding, landingsByMenu, menus } from "@/lib/landings";
import { footerNav, topNav } from "@/lib/nav";

// 전국 지점 — 같은 사업자(SBS아카데미AIX학원) 공식 사이트(daejeoncom.kr, 2026-10-13 사용자 제공) 푸터의
// 지점별 실제 사이트로 연결. 우리 학원(대전)은 daejeon.sbsart.com에 해당.
const branches = [
  { label: "강남", href: "https://gangnam.sbsart.com/" },
  { label: "홍대", href: "https://sinchon.sbsart.com/" },
  { label: "인천", href: "https://incheon.sbsart.com/" },
  { label: "부산", href: "https://busan.sbsart.com/" },
  { label: "대구", href: "https://daegu.sbsart.com/" },
  { label: "대전", href: "https://daejeon.sbsart.com/" },
  { label: "광주", href: "https://gwangju.sbsart.com/" },
  { label: "수원", href: "https://suwon.sbsart.com/" },
  { label: "일산", href: "https://ilsan.sbsart.com/" },
  { label: "울산", href: "https://ulsan.sbsart.com/" },
  { label: "노원", href: "https://nowon.sbsart.com/" },
  { label: "분당", href: "https://bundang.sbsart.com/" },
  { label: "종로(혜화)", href: "https://hyehwa.sbsart.com/" },
  { label: "안산", href: "https://ansan.sbsart.com/" },
  { label: "안양", href: "https://anyang.sbsart.com/" },
  { label: "천안", href: "https://cheonan.sbsart.com/" },
  { label: "청주", href: "https://cheongju.sbsart.com/" },
];
import { useConsultModal } from "./ConsultModalContext";

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

// "교육과정" 메가메뉴 — 7개 분야를 한 패널에 묶어서 보여준다(IA: 홈 > 교육과정 > 분야 > 키워드).
// 닫혀 있어도 링크는 DOM에 남겨(숨김) 검색 크롤러가 전체 과정으로 들어갈 수 있게 한다.
function CoursesMegaPanel({ open }: { open: boolean }) {
  return (
    <div className={open ? "mega-bar courses-mega open" : "mega-bar courses-mega"} id="mega-courses">
      <div className="container mega-bar-inner courses-mega-inner">
        {menus.map((m) => (
          <div className="mega-col" key={m.key}>
            <span className="mega-bar-label">{m.label}</span>
            <div className="mega-col-links">
              {landingsByMenu(m.key).map((l) => (
                <Link key={l.slug} href={`/daejeon/${l.slug}`} className="mega-link">{l.keyword}</Link>
              ))}
            </div>
          </div>
        ))}
        <Link href="/courses" className="mega-col mega-col-all">
          전체과정 보기 <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { open: openConsult } = useConsultModal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  // 전체 페이지 이동 직후 마우스 커서가 "교육과정" 버튼과 같은 좌표에 머물러 있으면 브라우저가 그 자리에서
  // 바로 hover를 재발생시킬 수 있다(특히 메가메뉴 안의 링크를 눌러 이동한 경우). 마운트 직후 짧게는 무시한다.
  const [hoverReady, setHoverReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHoverReady(true), 200);
    return () => clearTimeout(t);
  }, []);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const coursesActive = location.startsWith("/daejeon/") || location.startsWith("/course/") || location === "/courses" || !!getLanding(location.split("/")[2] ?? "");
  // 프리렌더 HTML과 첫 렌더를 일치시키려고 초기값은 항상 라이트 — 저장된 테마는 마운트 후에 적용.
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem("cult-academy-theme") === "dark") setIsDark(true);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("cult-academy-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    setMenuOpen(false);
    setCoursesOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCoursesOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="site-frame min-h-screen overflow-x-clip">
      <header className="site-header" onMouseLeave={() => setCoursesOpen(false)}>
        <div className="container site-header-inner">
          <Link href="/" className="brand-lockup" aria-label="대전AI컴퓨터디자인학원 홈">
            <span className="brand-mark">AI</span>
            <span className="brand-copy">
              <strong>대전AI컴퓨터디자인학원</strong>
              <span>DAEJEON AI COMPUTER DESIGN</span>
            </span>
          </Link>

          <nav className="desktop-nav mega-nav" aria-label="주요 내비게이션">
            <button
              type="button"
              className={coursesOpen || coursesActive ? "nav-link active" : "nav-link"}
              aria-expanded={coursesOpen}
              aria-controls="mega-courses"
              onPointerEnter={(e) => e.pointerType === "mouse" && hoverReady && setCoursesOpen(true)}
              onClick={() => setCoursesOpen((v) => !v)}
            >
              교육과정
            </button>
            {topNav.map((item) => (
              <Link key={item.href} href={item.href} className={isCurrent(location, item.href) ? "nav-link active" : "nav-link"}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button type="button" className="button button-primary header-cta" onClick={() => openConsult({ sourcePage: "header" })}>
              수강료 조회 <ArrowRight size={14} />
            </button>
            <button
              type="button"
              className="icon-button theme-toggle"
              onClick={() => setIsDark((value) => !value)}
              aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
              title={isDark ? "라이트 모드" : "다크 모드"}
            >
              {isDark ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            </button>
            <button
              type="button"
              className="icon-button mobile-menu-button"
              onClick={() => setMenuOpen((value) => !value)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <CoursesMegaPanel open={coursesOpen} />

        <div className={menuOpen ? "mobile-nav open" : "mobile-nav"} id="mobile-navigation">
          <div className="container mobile-nav-inner">
            <div className="mobile-menu-group">
              <button
                type="button"
                className={mobileCoursesOpen ? "mobile-nav-link open" : "mobile-nav-link"}
                aria-expanded={mobileCoursesOpen}
                onClick={() => setMobileCoursesOpen((v) => !v)}
              >
                <span>교육과정</span>
                <ChevronDown size={16} />
              </button>
              <div className={mobileCoursesOpen ? "mobile-sub mobile-sub-grouped open" : "mobile-sub mobile-sub-grouped"}>
                {menus.map((m) => (
                  <div className="mobile-sub-group" key={m.key}>
                    <span className="mobile-sub-group-label">{m.label}</span>
                    <div className="mobile-sub-group-links">
                      {landingsByMenu(m.key).map((l) => (
                        <Link key={l.slug} href={`/daejeon/${l.slug}`} className="mobile-sub-link">{l.keyword}</Link>
                      ))}
                    </div>
                  </div>
                ))}
                <Link href="/courses" className="mobile-nav-link">
                  <span>전체과정 보기</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
            {topNav.map((item) => (
              <Link key={item.href} href={item.href} className="mobile-nav-link">
                <span>{item.label}</span>
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <Link href="/auth/login" className="mobile-nav-link">
              <span>로그인</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer official-footer exact-footer">
        <nav className="container footer-links" aria-label="바로가기">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>
        <div className="container exact-footer-info">
          <p>대전광역시 서구 대덕대로 179, 9·10층 (둔산동,<br className="footer-mobile-break" /> 엠제이피부과굿모닝어학원빌딩)</p>
          <p>사업자(법인)명 주식회사 에스씨에이아카데미대전 · 대표 오도윤 · 개인정보책임자 오도윤 · 교육담당 송성기</p>
          <p>사업자등록번호 822-81-00224 · 통신판매업번호<br className="footer-mobile-break" /> 제2015-대전서구-0647 호</p>
          <p>학원명 SBS아카데미AIX학원 · 학원등록번호 대전서부<br className="footer-mobile-break" /> 제서4019호</p>
          <p>대표전화 <a href="tel:042-719-8383">042-719-8383</a> · 대표이메일<br className="footer-mobile-break" /> <a href="mailto:privacy@koreaedugroup.com">privacy@koreaedugroup.com</a></p>
          <p>© SBS아카데미AIX학원</p>
        </div>
        <nav className="container branch-links" aria-label="전국 지점 안내">
          {branches.map((b) => <a key={b.label} href={b.href} target="_blank" rel="noopener noreferrer">{b.label}</a>)}
        </nav>
      </footer>
    </div>
  );
}
