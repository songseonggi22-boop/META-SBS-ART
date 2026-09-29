import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const navItems = [
  { label: "커리큘럼", href: "/#courses" },
  { label: "자료실", href: "/blog" },
  { label: "학원 안내", href: "/about" },
  { label: "수강 안내", href: "/pricing" },
];

function isCurrent(pathname: string, href: string) {
  if (href === "/#courses") return pathname === "/";
  return pathname === href;
}

export default function SiteShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("cult-academy-theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    window.localStorage.setItem("cult-academy-theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <div className="site-frame min-h-screen overflow-x-clip">
      <header className="site-header">
        <div className="container site-header-inner">
          <Link href="/" className="brand-lockup" aria-label="CULT Computer Academy 홈">
            <span className="brand-mark">C/</span>
            <span className="brand-copy">
              <strong>CULT</strong>
              <span>COMPUTER ACADEMY</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="주요 내비게이션">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={isCurrent(location, item.href) ? "nav-link active" : "nav-link"}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link href="/auth/login" className="login-link">
              로그인
            </Link>
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

        <div className={menuOpen ? "mobile-nav open" : "mobile-nav"} id="mobile-navigation">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
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
