import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import type { CourseInterest } from "@/components/ConsultModalContext";
import { courses, trackLabels } from "@/lib/courses";
import { courseHref } from "@/lib/landings";
import { aiCampusCourses } from "@/lib/aiCampus";

const tracks: (CourseInterest | "ALL")[] = ["ALL", "graphic", "motion", "interior", "cg", "ai", "drawing", "cert", "it"];

// 히어로 캐러셀의 "OO 전체과정 보기" 링크(/courses?track=interior)가 해당 탭을 미리 선택해 두도록.
// 쿼리 없이 들어오면 기존처럼 전체.
export default function CoursesIndex() {
  const [active, setActive] = useState<CourseInterest | "ALL">("ALL");
  // 프리렌더된 HTML을 hydrate 할 때 wouter의 useSearch()는 빈 문자열을 돌려줘서(서버 스냅샷)
  // ?track= 선택이 프로덕션에서만 먹지 않았다. hydrate 끝난 뒤 한 번 직접 읽어 맞춘다.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("track") as CourseInterest | null;
    if (t && tracks.includes(t)) setActive(t);
  }, []);
  const list = useMemo(() => (active === "ALL" ? courses : courses.filter((c) => c.track === active)), [active]);

  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / 전체과정</p>
            <div className="eyebrow"><span className="eyebrow-dot" /> COURSES / 전체과정</div>
            <h1>전체<br /><em>교육과정.</em></h1>
          </div>
          <div className="inner-hero-aside">
            <p>시각편집·모션그래픽·인테리어·CG·AI·웹툰/디지털드로잉·자격증·IT까지, 운영 중인 과정을 한 번에 둘러보세요.</p>
            <span className="aside-index">COURSES / 01</span>
          </div>
        </div>
      </section>

      {/* AI 전문 서브브랜드(.AI 캠퍼스) 과정은 운영 방식(100% ZOOM 라이브)이 달라 별도 라우트로 둔다.
          전체과정을 보러 온 사람이 여기서 바로 넘어갈 수 있게 입구를 둔 것. */}
      <section className="container campus-band-wrap">
        <Link href="/ai-campus" className="campus-band">
          <span className="campus-band-label">KOREA AI CAMPUS</span>
          <strong>.AI 캠퍼스 AI 전문과정 {aiCampusCourses.length}개 커리큘럼 보기</strong>
          <p>AI 개발 · 콘텐츠 제작 · 마케팅 · 업무 자동화 · AI 자격증. 전 과정 100% ZOOM 비대면 라이브, 모듈·회차별 커리큘럼을 바로 확인할 수 있습니다.</p>
          <ArrowUpRight size={18} />
        </Link>
      </section>

      <section className="resource-directory section-pad-small">
        <div className="container">
          <div className="resource-toolbar">
            <div className="category-tabs" role="tablist" aria-label="과정 분야">
              {tracks.map((t) => (
                <button key={t} type="button" className={active === t ? "category-tab active" : "category-tab"} onClick={() => setActive(t)}>
                  {t === "ALL" ? "전체" : trackLabels[t]}
                </button>
              ))}
            </div>
          </div>
          <div className="resource-count"><span>{list.length.toString().padStart(2, "0")}</span> COURSES</div>
          <div className="landing-course-grid courses-index-grid">
            {list.map((c) => (
              <Link key={c.slug} href={courseHref(c.slug)} className="landing-course-card">
                <span>{trackLabels[c.track]} · {c.period}</span>
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
