import { ArrowLeft, ArrowUpRight, Play } from "lucide-react";
import { Link, useParams } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import { courseLabels, getPortfolioItem, portfolioItems } from "@/lib/portfolio";
import { NotFoundPage } from "./InfoPages";

// sbsart.com(같은 사업자 공식 포트폴리오) 상세페이지의 "영상/사진 크게 먼저 → 소개·툴·기간 스펙 → CTA" 흐름을
// 참고해 이 사이트 디자인 시스템(각진 카드·Space Grotesk·바이올렛 액센트)으로 재구성. 원본 디자인을 그대로
// 베끼지 않고 구조(정보 순서)만 참고, 톤은 이 사이트 것을 유지.
function toolChips(tools: string) {
  return tools.split(/[,·]/).map((t) => t.trim()).filter(Boolean);
}

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const { open } = useConsultModal();
  const item = id ? getPortfolioItem(id) : undefined;

  if (!item) return <NotFoundPage />;

  const courseInfo = courseLabels[item.course];
  const related = portfolioItems.filter((other) => other.course === item.course && other.id !== item.id);

  return (
    <div className="inner-page portfolio-detail-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb">
              <Link href="/">홈</Link> / <Link href="/#courses">커리큘럼</Link> / {courseInfo.label}
            </p>
            <div className="eyebrow"><span className="eyebrow-dot" /> {item.category}</div>
            <h1>{item.title}</h1>
          </div>
          <div className="inner-hero-aside">
            <p>{item.branch} · {item.student} · {item.date}</p>
            <span className="aside-index">{courseInfo.label.toUpperCase()}</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="portfolio-detail-media portfolio-detail-media-full">
            {item.video ? (
              <div className="portfolio-detail-video">
                <iframe
                  src={item.video}
                  title={`${item.title} 작품 영상`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <img src={item.img} alt={item.title} className="portfolio-detail-image" />
            )}
          </div>

          <div className="portfolio-detail-spec">
            <div className="spec-block">
              <span className="spec-label">작품 소개</span>
              <p className="spec-value">{item.intro}</p>
            </div>
            <div className="spec-block">
              <span className="spec-label">사용 툴</span>
              <div className="spec-chips">
                {toolChips(item.tools).map((tool) => (
                  <span className="spec-chip" key={tool}>{tool}</span>
                ))}
              </div>
            </div>
            {item.duration && (
              <div className="spec-block">
                <span className="spec-label">제작 기간</span>
                <p className="spec-value">{item.duration}</p>
              </div>
            )}
            {item.program && (
              <div className="spec-block">
                <span className="spec-label">수강 과정</span>
                <p className="spec-value">{item.program}</p>
              </div>
            )}
          </div>

          <div className="portfolio-detail-actions">
            <button
              type="button"
              className="button button-primary"
              onClick={() => open({ interest: item.course, sourcePage: `portfolio/${item.id}` })}
            >
              {courseInfo.label} 상담 시작하기 <ArrowUpRight size={16} />
            </button>
            <Link href="/#courses" className="arrow-link">
              <ArrowLeft size={16} /> 커리큘럼으로 돌아가기
            </Link>
          </div>
          <p className="portfolio-detail-source">
            출처: <a href={item.sourceHref} target="_blank" rel="noopener noreferrer">sbsart.com 공식 포트폴리오</a>
          </p>
        </div>

        {related.length > 0 && (
          <div className="container portfolio-detail-related">
            <h2 className="sr-only">{courseInfo.label} 다른 결과물</h2>
            <div className="portfolio-group-head">
              <h3>{courseInfo.label}의 다른 결과물</h3>
              <span>{courseInfo.tools}</span>
            </div>
            <div className="portfolio-grid">
              {related.map((other) => (
                <Link className="portfolio-card" href={`/portfolio/${other.id}`} key={other.id}>
                  <img src={other.img} alt={other.title} loading="lazy" />
                  {other.video && (
                    <span className="course-card-play portfolio-card-play">
                      <Play size={14} fill="currentColor" />
                    </span>
                  )}
                  <span className="portfolio-card-title">
                    {other.title} <ArrowUpRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
