import { ArrowUpRight, Play } from "lucide-react";
import { Link } from "wouter";
import { courseLabels, portfolioItems, type CourseKey } from "@/lib/portfolio";

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
            전국 캠퍼스 수강생들이 실제로 완성한 작품입니다.<br />
            사진·영상·작품 소개까지 눌러서 바로 확인해 보세요.
          </p>
        </div>

        {courseOrder.map((course) => {
          const info = courseLabels[course];
          const items = portfolioItems.filter((item) => item.course === course);
          return (
            <div className="portfolio-group" key={course}>
              <div className="portfolio-group-head">
                <h3>{info.label}</h3>
                <span>{info.tools}</span>
              </div>
              <div className="portfolio-grid">
                {items.map((item) => (
                  <Link className="portfolio-card" href={`/portfolio/${item.id}`} key={item.id}>
                    <img src={item.img} alt={item.title} loading="lazy" />
                    {item.video && (
                      <span className="course-card-play portfolio-card-play">
                        <Play size={14} fill="currentColor" />
                      </span>
                    )}
                    <span className="portfolio-card-title">
                      {item.title} <ArrowUpRight size={14} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
