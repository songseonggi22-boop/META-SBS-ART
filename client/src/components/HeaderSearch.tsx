import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, X } from "lucide-react";
import { courses } from "@/lib/courses";
import { courseHref, landings } from "@/lib/landings";

// 헤더 검색 — motemote.kr의 네비게이션 구성(카테고리/브랜드스토리/검색창) 참고(2026-10-27). 실제 과정·
// 키워드 랜딩 데이터만 검색 대상으로 쓴다(외부 콘텐츠 색인이나 가짜 자동완성 없음).
type SearchItem = { label: string; sub: string; href: string };

const index: SearchItem[] = [
  ...landings.map((l) => ({ label: l.keyword, sub: "키워드 랜딩", href: `/daejeon/${l.slug}` })),
  ...courses.map((c) => ({ label: c.title, sub: "교육과정", href: courseHref(c.slug) })),
];

function search(query: string): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return index.filter((item) => item.label.toLowerCase().includes(q)).slice(0, 8);
}

export default function HeaderSearch() {
  const [, navigate] = useLocation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const results = search(query);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const submit = () => {
    if (results[0]) {
      navigate(results[0].href);
      setOpen(false);
      setQuery("");
    }
  };

  return (
    <div className="header-search" ref={rootRef}>
      <Search size={15} strokeWidth={2} className="header-search-icon" />
      <input
        type="search"
        placeholder="과정·키워드를 검색해보세요"
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        aria-label="과정·키워드 검색"
      />
      {query && (
        <button type="button" className="header-search-clear" aria-label="검색어 지우기" onClick={() => { setQuery(""); setOpen(false); }}>
          <X size={14} />
        </button>
      )}
      {open && query.trim() && (
        <div className="header-search-results">
          {results.length > 0 ? (
            results.map((item) => (
              <Link
                key={item.href + item.label}
                href={item.href}
                className="header-search-result"
                onClick={() => { setOpen(false); setQuery(""); }}
              >
                <span>{item.label}</span>
                <span className="header-search-result-sub">{item.sub}</span>
              </Link>
            ))
          ) : (
            <div className="header-search-empty">일치하는 과정이 없어요. 상담에서 직접 물어보세요.</div>
          )}
        </div>
      )}
    </div>
  );
}
