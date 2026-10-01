import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, ChevronDown, Menu, Moon, Sun, X } from "lucide-react";
import { getLanding, landingsByMenu, menus, type MenuKey } from "@/lib/landings";

const utilLinks = [
  { label: "자료실", href: "/blog" },
  { label: "학원 안내", href: "/about" },
  { label: "수강 안내", href: "/pricing" },
];

// 상단 메뉴(시각편집·모션그래픽…) — PC는 마우스를 올리면, 터치 기기는 탭하면 아래에 키워드 바가 열린다.
// 키워드 링크는 닫혀 있어도 HTML에 남겨 두어(숨김 처리) 검색 크롤러가 모든 랜딩을 따라갈 수 있게 한다.
function MegaBars({ openMenu }: { openMenu: MenuKey | null }) {
  return (
    <>
      {menus.map((m) => (
        <div key={m.key} className={openMenu === m.key ? "mega-bar open" : "mega-bar"} id={`mega-${m.key}`}>
          <div className="container mega-bar-inner">
            <span className="mega-bar-label">{m.label}</span>
            {landingsByMenu(m.key).map((l) => (
              <Link key={l.slug} href={`/daejeon/${l.slug}`} className="mega-link">{l.keyword}</Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileSub, setMobileSub] = useState<MenuKey | null>(null);
  const activeMenu = location.startsWith("/daejeon/") ? getLanding(location.split("/")[2])?.menu : undefined;
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
    setOpenMenu(null);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenMenu(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="site-frame min-h-screen overflow-x-clip">
      <header className="site-header" onMouseLeave={() => setOpenMenu(null)}>
        <div className="container site-header-inner">
          <Link href="/" className="brand-lockup" aria-label="대전AI컴퓨터디자인학원 홈">
            <span className="brand-mark">AI</span>
            <span className="brand-copy">
              <strong>대전AI컴퓨터디자인학원</strong>
              <span>DAEJEON AI COMPUTER DESIGN</span>
            </span>
          </Link>

          <nav className="desktop-nav mega-nav" aria-label="과정 메뉴">
            {menus.map((m) => (
              <button
                key={m.key}
                type="button"
                className={openMenu === m.key || activeMenu === m.key ? "nav-link active" : "nav-link"}
                aria-expanded={openMenu === m.key}
                aria-controls={`mega-${m.key}`}
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpenMenu(m.key)}
                onClick={() => setOpenMenu((cur) => (cur === m.key ? null : m.key))}
              >
                {m.label}
              </button>
            ))}
          </nav>

          <div className="header-actions">
            <nav className="util-nav" aria-label="학원 안내">
              {utilLinks.map((u) => (
                <Link key={u.href} href={u.href} className={location === u.href ? "util-link active" : "util-link"}>{u.label}</Link>
              ))}
            </nav>
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

        <MegaBars openMenu={openMenu} />

        <div className={menuOpen ? "mobile-nav open" : "mobile-nav"} id="mobile-navigation">
          <div className="container mobile-nav-inner">
            {menus.map((m) => (
              <div key={m.key} className="mobile-menu-group">
                <button
                  type="button"
                  className={mobileSub === m.key ? "mobile-nav-link open" : "mobile-nav-link"}
                  aria-expanded={mobileSub === m.key}
                  onClick={() => setMobileSub((cur) => (cur === m.key ? null : m.key))}
                >
                  <span>{m.label}</span>
                  <ChevronDown size={16} />
                </button>
                <div className={mobileSub === m.key ? "mobile-sub open" : "mobile-sub"}>
                  {landingsByMenu(m.key).map((l) => (
                    <Link key={l.slug} href={`/daejeon/${l.slug}`} className="mobile-sub-link">{l.keyword}</Link>
                  ))}
                </div>
              </div>
            ))}
            {utilLinks.map((u) => (
              <Link key={u.href} href={u.href} className="mobile-nav-link">
                <span>{u.label}</span>
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
        <div className="container exact-footer-info">
          <p>대전광역시 서구 대덕대로 179, 9·10층 (둔산동,<br className="footer-mobile-break" /> 엠제이피부과굿모닝어학원빌딩)</p>
          <p>사업자(법인)명 주식회사 에스씨에이아카데미대전 · 대표 오도윤 · 개인정보책임자 오도윤 · 교육담당 송성기</p>
          <p>사업자등록번호 822-81-00224 · 통신판매업번호<br className="footer-mobile-break" /> 제2015-대전서구-0647 호</p>
          <p>학원명 SBS아카데미AI학원 · 학원등록번호 대전서부<br className="footer-mobile-break" /> 제서4019호</p>
          <p>대표전화 <a href="tel:042-719-8383">042-719-8383</a> · 대표이메일<br className="footer-mobile-break" /> <a href="mailto:privacy@koreaedugroup.com">privacy@koreaedugroup.com</a></p>
          <p>© SBS아카데미AI학원</p>
        </div>
        <nav className="container branch-links" aria-label="전국 지점 안내">
          {[
            "강남", "홍대", "인천", "부산", "대구", "대전", "광주", "수원", "일산", "울산", "노원", "분당", "종로(혜화)", "안산", "안양", "천안", "청주",
          ].map((branch) => <a key={branch} href="http://daejeoncom.kr/">{branch}</a>)}
        </nav>
      </footer>
    </div>
  );
}
