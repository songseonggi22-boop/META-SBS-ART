import { courseLabels, portfolioItems, type CourseKey } from "@/lib/portfolio";
import PortfolioCard from "./PortfolioCard";

const courseOrder: CourseKey[] = ["graphic", "motion", "cg", "interior"];

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

        {courseOrder.map((course, groupIndex) => {
          const info = courseLabels[course];
          const items = portfolioItems.filter((item) => item.course === course);
          return (
            <div className="portfolio-group" key={course}>
              <div className="portfolio-group-head">
                <h3>{info.label}</h3>
                <span>{info.tools}</span>
              </div>
              <div className="portfolio-grid">
                {items.map((item, i) => (
                  <PortfolioCard key={item.id} item={item} eager={groupIndex === 0 && i < 3} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
