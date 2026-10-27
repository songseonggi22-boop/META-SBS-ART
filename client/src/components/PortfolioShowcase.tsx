import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { courseLabels, portfolioItems, type CourseKey } from "@/lib/portfolio";
import PortfolioCard from "./PortfolioCard";

const courseOrder: CourseKey[] = ["graphic", "motion", "cg", "interior"];

// 과정별 결과물 한 묶음 — motemote 상품 캐러셀처럼 가로 스크롤 + 화살표 네비게이션(2026-10-27).
// PortfolioCard는 Community·Careers·PortfolioDetail에서도 그대로 쓰므로 손대지 않고, 감싸는 트랙만 교체.
function PortfolioGroup({ course, eager }: { course: CourseKey; eager: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const info = courseLabels[course];
  const items = portfolioItems.filter((item) => item.course === course);
  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="portfolio-group">
      <div className="portfolio-group-head">
        <div className="portfolio-group-head-text">
          <h3>{info.label}</h3>
          <span>{info.tools}</span>
        </div>
        <div className="portfolio-group-arrows">
          <button type="button" className="icon-button" aria-label={`${info.label} 결과물 이전`} onClick={() => scroll(-1)}><ArrowLeft size={16} /></button>
          <button type="button" className="icon-button" aria-label={`${info.label} 결과물 다음`} onClick={() => scroll(1)}><ArrowRight size={16} /></button>
        </div>
      </div>
      <div className="portfolio-carousel-track" ref={trackRef}>
        {items.map((item, i) => (
          <div className="portfolio-carousel-item" key={item.id}>
            <PortfolioCard item={item} eager={eager && i < 3} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PortfolioShowcase() {
  return (
    <section className="portfolio-showcase section-pad" id="portfolio">
      <div className="container">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker"><span>03</span><span>REAL RESULTS</span></div>
            <h2>과정별<br /><em>실제 결과물.</em></h2>
          </div>
          <p className="heading-aside">
            전국 캠퍼스 수강생들이 실제로 완성한 작품입니다. <br className="desktop-only" />
            카드를 누르면 작품 소개·사용 툴까지 바로 볼 수 있습니다.
          </p>
        </div>

        {courseOrder.map((course, groupIndex) => (
          <PortfolioGroup key={course} course={course} eager={groupIndex === 0} />
        ))}
      </div>
    </section>
  );
}
