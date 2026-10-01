import { ArrowRight, ArrowUpRight, Check, MapPin, Phone, Play } from "lucide-react";
import { Link, useParams } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import { NotFoundPage } from "./InfoPages";
import { getCourse, type Course } from "@/lib/courses";
import { courseHref, getLanding, landingFaq, landingsByMenu, menus } from "@/lib/landings";
import { portfolioItems, type CourseKey } from "@/lib/portfolio";

const portfolioByMenu: Partial<Record<string, CourseKey>> = { visual: "graphic", motion: "motion", interior: "interior", cg: "cg" };

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={courseHref(course.slug)} className="landing-course-card">
      <span>{course.period}</span>
      <strong>{course.title}</strong>
      <p>{course.tagline}</p>
      <ArrowUpRight size={16} />
    </Link>
  );
}

const byCourse = (slugs: string[]) => slugs.map(getCourse).filter((c): c is Course => !!c);

export default function Landing() {
  const { slug } = useParams<{ slug: string }>();
  const { open } = useConsultModal();
  const landing = slug ? getLanding(slug) : undefined;
  if (!landing) return <NotFoundPage />;

  const menu = menus.find((m) => m.key === landing.menu)!;
  const source = `landing-${landing.slug}`;
  const mainCourses = byCourse(landing.main);
  const relatedCourses = byCourse(landing.related);
  const portfolioKey = portfolioByMenu[landing.menu];
  const works = portfolioKey ? portfolioItems.filter((p) => p.course === portfolioKey).slice(0, 3) : [];
  const siblings = landingsByMenu(landing.menu).filter((l) => l.slug !== landing.slug);
  const faq = landingFaq(landing);
  const consult = () => open({ interest: landing.interest, sourcePage: source });

  return (
    <div className="inner-page resource-detail-page landing-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / {menu.label} / {landing.keyword}</p>
            <h1 className="resource-detail-title">{landing.keyword}</h1>
            <p className="landing-lead">{landing.lead}</p>
          </div>
          <div className="inner-hero-aside">
            <ul className="landing-points">{landing.points.map((p) => <li key={p}><Check size={15} /> {p}</li>)}</ul>
            <button type="button" className="button button-primary" onClick={consult}>
              무료 상담 신청 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid">
          <div className="resource-detail-main">
            {landing.branches && (
              <div className="landing-branches">
                <h2 className="course-section-title">목적에 따라 고르세요</h2>
                {landing.branches.map((b) => (
                  <div className="landing-branch" key={b.title}>
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                    <div className="landing-course-grid">{byCourse(b.courses).map((c) => <CourseCard key={c.slug} course={c} />)}</div>
                  </div>
                ))}
              </div>
            )}

            {mainCourses.map((course) => (
              <article className="landing-course" key={course.slug} id={course.slug}>
                <h2 className="course-section-title">{course.title} 커리큘럼</h2>
                <p className="landing-course-tagline">{course.tagline}</p>
                <dl className="course-facts">
                  <div><dt>수강 기간</dt><dd>{course.period}</dd></div>
                  <div><dt>학습 도구</dt><dd>{course.tools}</dd></div>
                  <div><dt>선수 과목</dt><dd>{course.prereq}</dd></div>
                </dl>
                <ol className="tip-steps">
                  {course.steps.map((step, index) => (
                    <li key={step.title + index}>
                      <span className="tip-step-no">{(index + 1).toString().padStart(2, "0")}</span>
                      <div><h3>{step.title}</h3><p>{step.body}</p></div>
                    </li>
                  ))}
                </ol>
                {course.audience.length > 0 && (
                  <div className="resource-checklist">
                    <h3>이런 분께 맞습니다</h3>
                    <ul>{course.audience.map((a) => <li key={a}><Check size={15} /> {a}</li>)}</ul>
                  </div>
                )}
              </article>
            ))}

            {relatedCourses.length > 0 && (
              <div className="landing-related">
                <h2 className="course-section-title">{mainCourses.length ? "함께 보면 좋은 과정" : "과정 안내"}</h2>
                <div className="landing-course-grid">{relatedCourses.map((c) => <CourseCard key={c.slug} course={c} />)}</div>
              </div>
            )}

            {works.length > 0 && (
              <div className="resource-works">
                <h3>수강생 결과물</h3>
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

            {faq.length > 0 && (
              <div className="course-faq">
                <h3>{landing.keyword} 자주 묻는 질문</h3>
                {faq.map((f) => (
                  <details key={f.q}>
                    <summary>{f.q}</summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            )}

            <div className="landing-location">
              <h3>학원 위치</h3>
              <p><MapPin size={15} /> 대전광역시 서구 대덕대로 179, 9·10층 (둔산동)</p>
              <p><Phone size={15} /> <a href="tel:042-719-8383">042-719-8383</a></p>
            </div>
          </div>

          <aside className="resource-detail-side">
            <div className="side-cta">
              <span className="side-cta-label">FREE CONSULT</span>
              <p>{landing.keyword} 과정, 내 수준과 목표에 맞는지 상담으로 확인해 보세요. 개강 일정과 반 배정도 안내해 드립니다.</p>
              <button type="button" className="button button-primary full-button" onClick={consult}>
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

      {siblings.length > 0 && (
        <section className="section-pad-small resource-more">
          <div className="container">
            <h3>{menu.label} 다른 과정</h3>
            <div className="resource-teaser-list">
              {siblings.map((l) => (
                <Link key={l.slug} href={`/daejeon/${l.slug}`} className="resource-teaser"><span>{menu.label}</span><strong>{l.keyword}</strong><ArrowUpRight size={17} /></Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
