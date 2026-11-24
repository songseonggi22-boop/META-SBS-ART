import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { Link, useParams, useSearch } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import ToolRow from "@/components/ToolRow";
import { NotFoundPage } from "./InfoPages";
import {
  aiCampusByDept,
  aiCampusCourses,
  aiCampusDeptLabels,
  getAiCampusCourse,
  type AiCampusDept,
} from "@/lib/aiCampus";

// .AI 캠퍼스(KOREA AI CAMPUS) — 같은 그룹의 AI 전문 서브브랜드. 전 과정 100% ZOOM 비대면 라이브라
// 지점 수업과 운영 방식이 다르므로 /courses(지점 과정)와 섞지 않고 이 라우트로 분리해서 보여준다.
// 한 파일에서 목록(/ai-campus)과 상세(/ai-campus/:slug)를 모두 그린다 — 기존 과정 페이지의 CSS를 그대로 재사용.

const depts: (AiCampusDept | "ALL")[] = ["ALL", "content", "dev", "marketing", "cert", "automation"];

export default function AiCampus() {
  const { slug } = useParams<{ slug?: string }>();
  return slug ? <AiCampusDetail slug={slug} /> : <AiCampusIndex />;
}

function AiCampusIndex() {
  const search = useSearch();
  const initial = new URLSearchParams(search).get("dept") as AiCampusDept | null;
  const [active, setActive] = useState<AiCampusDept | "ALL">(initial && depts.includes(initial) ? initial : "ALL");
  const list = useMemo(
    () => (active === "ALL" ? aiCampusCourses : aiCampusCourses.filter((c) => c.dept === active)),
    [active]
  );

  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb">
              <Link href="/">홈</Link> / <Link href="/courses">전체과정</Link> / .AI 캠퍼스
            </p>
            <div className="eyebrow"><span className="eyebrow-dot" /> KOREA AI CAMPUS / .AI 캠퍼스</div>
            <h1>
              .AI 캠퍼스<br />
              <em>AI 전문과정.</em>
            </h1>
          </div>
          <div className="inner-hero-aside">
            <p>
              AI 개발·콘텐츠 제작·마케팅·업무 자동화·AI 자격증까지, AI 전문 과정만 따로 모은 서브브랜드 과정입니다.
              전 과정 100% ZOOM 비대면 라이브로 진행하고 전 회차 녹화본을 제공합니다(수업 후 1주일 스트리밍).
            </p>
            <span className="aside-index">AI CAMPUS / {aiCampusCourses.length.toString().padStart(2, "0")}</span>
          </div>
        </div>
      </section>

      <section className="resource-directory section-pad-small">
        <div className="container">
          <div className="resource-toolbar">
            <div className="category-tabs" role="tablist" aria-label="AI 캠퍼스 분야">
              {depts.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={active === d ? "category-tab active" : "category-tab"}
                  onClick={() => setActive(d)}
                >
                  {d === "ALL" ? "전체" : aiCampusDeptLabels[d]}
                </button>
              ))}
            </div>
          </div>
          <div className="resource-count"><span>{list.length.toString().padStart(2, "0")}</span> COURSES</div>
          <div className="landing-course-grid courses-index-grid">
            {list.map((c) => (
              <Link key={c.slug} href={`/ai-campus/${c.slug}`} className="landing-course-card">
                <span>{aiCampusDeptLabels[c.dept]} · {c.hours.replace(/^총 /, "")}</span>
                <strong>{c.title}</strong>
                <p>{c.tagline}</p>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function AiCampusDetail({ slug }: { slug: string }) {
  const { open } = useConsultModal();
  const course = getAiCampusCourse(slug);
  if (!course) return <NotFoundPage />;

  const source = `ai-campus-${course.slug}`;
  const related = aiCampusByDept(course.dept).filter((c) => c.slug !== course.slug);

  return (
    <div className="inner-page resource-detail-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb">
              <Link href="/">홈</Link> / <Link href="/ai-campus">.AI 캠퍼스</Link> / {aiCampusDeptLabels[course.dept]}
            </p>
            <h1 className="resource-detail-title">{course.title}</h1>
          </div>
          <div className="inner-hero-aside">
            <p>{course.tagline}</p>
            <span className="aside-index">{aiCampusDeptLabels[course.dept]} · {course.days}</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid">
          <div className="resource-detail-main">
            <dl className="course-facts">
              <div><dt>수업 구성</dt><dd>{course.hours}</dd></div>
              <div><dt>수업 요일</dt><dd>{course.days}</dd></div>
              <div><dt>담당 강사</dt><dd>{course.instructor} 강사</dd></div>
              <div><dt>난이도</dt><dd>{course.level}</dd></div>
              <div><dt>주요 도구</dt><dd><ToolRow tools={course.tools} /></dd></div>
              <div><dt>교육 방식</dt><dd>{course.format}</dd></div>
              {course.prereq && <div><dt>선행 학습</dt><dd>{course.prereq}</dd></div>}
              {course.env && <div><dt>실습 환경</dt><dd>{course.env}</dd></div>}
            </dl>

            {course.summary && <p className="course-overview">{course.summary}</p>}

            <h2 className="course-section-title">커리큘럼 — 모듈 구성</h2>
            <ol className="tip-steps">
              {course.modules.map((m, i) => (
                <li key={m.title + i}>
                  <span className="tip-step-no">{(i + 1).toString().padStart(2, "0")}</span>
                  <div>
                    <h3>{m.title}</h3>
                    <p>{m.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            {course.sessions.length > 0 && (
              <div className="course-faq">
                <h3>회차별 상세 커리큘럼 ({course.sessions.length}회차)</h3>
                {course.sessions.map((s, i) => (
                  <details key={s.title + i}>
                    <summary>{s.title}</summary>
                    {s.detail && <p><strong>세부 내용</strong> · {s.detail}</p>}
                    {s.practice && <p><strong>실습 내용</strong> · {s.practice}</p>}
                    {s.tools && <p><strong>사용 툴</strong> · {s.tools}</p>}
                  </details>
                ))}
              </div>
            )}

            {course.audience.length > 0 && (
              <div className="resource-checklist">
                <h3>이런 분께 맞습니다</h3>
                <ul>{course.audience.map((a) => <li key={a}><Check size={15} /> {a}</li>)}</ul>
              </div>
            )}
          </div>

          <aside className="resource-detail-side">
            <div className="side-cta">
              <span className="side-cta-label">FREE CONSULT</span>
              <p>{course.title}, 내 수준에 맞는지 상담으로 확인해 보세요. 개강 일정과 수강 방법도 안내해 드립니다.</p>
              <button
                type="button"
                className="button button-primary full-button"
                onClick={() => open({ interest: "ai", sourcePage: source })}
              >
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
            <h3>{aiCampusDeptLabels[course.dept]} 다른 과정</h3>
            <div className="resource-teaser-list">
              {related.map((c) => (
                <Link key={c.slug} href={`/ai-campus/${c.slug}`} className="resource-teaser">
                  <span>{c.hours.replace(/^총 /, "")}</span>
                  <strong>{c.title}</strong>
                  <ArrowUpRight size={17} />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
