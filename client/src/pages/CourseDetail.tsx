import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link, Redirect, useParams } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import { NotFoundPage } from "./InfoPages";
import { coursesByTrack, getCourse, trackLabels } from "@/lib/courses";
import { courseHref, coursePrimaryLanding } from "@/lib/landings";

export default function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useConsultModal();
  const course = slug ? getCourse(slug) : undefined;
  if (!course) return <NotFoundPage />;
  // 대표 랜딩에 커리큘럼 전체가 실린 과정은 랜딩으로 보낸다(서버에서는 vercel.json 301).
  if (coursePrimaryLanding(course.slug)) return <Redirect to={courseHref(course.slug)} replace />;

  const source = `course-${course.slug}`;
  const related = coursesByTrack(course.track).filter((c) => c.slug !== course.slug);

  return (
    <div className="inner-page resource-detail-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / <Link href="/#courses">커리큘럼</Link> / {trackLabels[course.track]}</p>
            <h1 className="resource-detail-title">{course.title}</h1>
          </div>
          <div className="inner-hero-aside">
            <p>{course.tagline}</p>
            <span className="aside-index">{trackLabels[course.track]} · {course.period}</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid">
          <div className="resource-detail-main">
            <dl className="course-facts">
              <div><dt>수강 기간</dt><dd>{course.period}</dd></div>
              <div><dt>학습 도구</dt><dd>{course.tools}</dd></div>
              <div><dt>선수 과목</dt><dd>{course.prereq}</dd></div>
            </dl>

            <p className="course-overview">
              {course.title} 과정은 {course.tools} 환경에서 {course.period} 동안 진행합니다. 총 {course.steps.length}단계로 이어지며 단계마다 직접 결과물을 만들고 강사의 피드백을 받습니다. 개강 일정과 반 배정은 상담에서 안내해 드립니다.
            </p>

            <h2 className="course-section-title">커리큘럼</h2>
            <ol className="tip-steps">
              {course.steps.map((step, index) => (
                <li key={step.title + index}>
                  <span className="tip-step-no">{(index + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {course.audience.length > 0 && (
              <div className="resource-checklist">
                <h3>이런 분께 맞습니다</h3>
                <ul>{course.audience.map((a) => <li key={a}><Check size={15} /> {a}</li>)}</ul>
              </div>
            )}

            {course.faq.length > 0 && (
              <div className="course-faq">
                <h3>자주 묻는 질문</h3>
                {course.faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            )}
          </div>

          <aside className="resource-detail-side">
            <div className="side-cta">
              <span className="side-cta-label">FREE CONSULT</span>
              <p>{course.title}, 내 수준에 맞는지 상담으로 확인해 보세요. 개강 일정과 반 배정도 안내해 드립니다.</p>
              <button type="button" className="button button-primary full-button" onClick={() => open({ interest: course.track, sourcePage: source })}>
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

      {related.length > 0 && (
        <section className="section-pad-small resource-more">
          <div className="container">
            <h3>{trackLabels[course.track]} 다른 과정</h3>
            <div className="resource-teaser-list">
              {related.map((c) => (
                <Link key={c.slug} href={courseHref(c.slug)} className="resource-teaser"><span>{c.period}</span><strong>{c.title}</strong><ArrowUpRight size={17} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
