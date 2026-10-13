import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "wouter";
import type { PortfolioItem } from "@/lib/portfolio";

// 수강생 작품 카드 — 썸네일만 덩그러니 있으면 "그냥 장식 이미지"로 보여 클릭을 못 받는다.
// 제목·학생·사용 툴을 썸네일 아래 항상 보이는 카드 본문으로 깔아, 자료실/과정 카드와 같은
// "눌러서 상세로 들어가는 콘텐츠" 생김새로 통일한다. PortfolioShowcase·Community·Careers·
// PortfolioDetail(관련 작품) 네 곳에서 공용으로 쓴다.
export default function PortfolioCard({ item, eager = false }: { item: PortfolioItem; eager?: boolean }) {
  return (
    <Link className="portfolio-card" href={`/portfolio/${item.id}`}>
      <span className="portfolio-card-media">
        <img
          src={item.img}
          alt={item.title}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
        />
        {item.video && (
          <span className="portfolio-card-play">
            <Play size={14} fill="currentColor" />
          </span>
        )}
      </span>
      <span className="portfolio-card-body">
        <span className="portfolio-card-tag">{item.program ?? item.category}</span>
        <strong>{item.title}</strong>
        <span className="portfolio-card-meta">{item.student} · {item.branch}</span>
        <span className="portfolio-card-cta">작품 보기 <ArrowUpRight size={13} /></span>
      </span>
    </Link>
  );
}
