import { ArrowRight, ArrowUpRight, Check, Lightbulb, Play } from "lucide-react";
import { Link, useParams } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import { NotFoundPage } from "./InfoPages";
import { getResource, resources } from "@/lib/resources";
import { portfolioItems } from "@/lib/portfolio";

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const { open } = useConsultModal();
  const resource = id ? getResource(id) : undefined;
  if (!resource) return <NotFoundPage />;

  const source = `resource-${resource.id}`;
  const works = resource.portfolioCourse ? portfolioItems.filter((p) => p.course === resource.portfolioCourse).slice(0, 3) : [];
  const others = resources.filter((r) => r.id !== resource.id).slice(0, 3);

  return (
    <div className="inner-page resource-detail-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / <Link href="/blog">자료실</Link> / {resource.category}</p>
            <h1 className="resource-detail-title">{resource.title}</h1>
          </div>
          <div className="inner-hero-aside">
            <p>{resource.excerpt}</p>
            <span className="aside-index">{resource.type} · {resource.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid">
          <div className="resource-detail-main">
            <ol className="tip-steps">
              {resource.steps.map((step, index) => (
                <li key={step.title}>
                  <span className="tip-step-no">{(index + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <h2>{step.title}</h2>
                    <p>{step.body}</p>
                    {step.tip && <p className="tip-callout"><Lightbulb size={15} /> {step.tip}</p>}
                  </div>
                </li>
              ))}
            </ol>

            {resource.media.map((m) => (
              <figure className="resource-media" key={m.src}>
                {m.kind === "youtube" ? (
                  <div className="portfolio-detail-video"><iframe src={m.src} title={m.caption} loading="lazy" allowFullScreen /></div>
                ) : (
                  <img src={m.src} alt={m.caption} loading="lazy" />
                )}
                <figcaption>{m.caption}</figcaption>
              </figure>
            ))}

            <div className="resource-checklist">
              <h3>셀프 체크리스트</h3>
              <ul>{resource.checklist.map((c) => <li key={c}><Check size={15} /> {c}</li>)}</ul>
            </div>

            {works.length > 0 && (
              <div className="resource-works">
                <h3>이 과정 수강생 결과물 미리보기</h3>
                <div className="resource-works-grid">
                  {works.map((w) => (
                    <Link key={w.id} href={`/portfolio/${w.id}`} className="resource-work">
                      <img src={w.img} alt={w.title} loading="lazy" />
                      {w.video && <span className="course-card-play"><Play size={14} fill="currentColor" /></span>}
                      <strong>{w.title}</strong>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="resource-detail-side">
            <div className="side-cta">
              <span className="side-cta-label">MORE TO LEARN</span>
              <p>{resource.next}</p>
              <button type="button" className="button button-primary full-button" onClick={() => open({ interest: resource.interest, sourcePage: source })}>
                무료 상담 신청 <ArrowRight size={16} />
              </button>
            </div>
            <div className="side-cta side-fee">
              <span className="side-cta-label">QUICK FEE CHECK</span>
              <p>이름과 번호만 남기면 수강료를 안내해 드립니다.</p>
              <QuickFeeForm sourcePage={`${source}-fee`} />
            </div>
          </aside>
        </div>
      </section>

      <section className="section-pad-small resource-more">
        <div className="container">
          <h3>다른 자료도 읽어 보세요</h3>
          <div className="resource-teaser-list">
            {others.map((r) => (
              <Link key={r.id} href={`/blog/${r.id}`} className="resource-teaser"><span>{r.category}</span><strong>{r.title}</strong><ArrowUpRight size={17} /></Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
