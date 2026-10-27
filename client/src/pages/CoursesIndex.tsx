import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link, useSearch } from "wouter";
import type { CourseInterest } from "@/components/ConsultModalContext";
import { courses, trackLabels } from "@/lib/courses";
import { courseHref } from "@/lib/landings";

const tracks: (CourseInterest | "ALL")[] = ["ALL", "graphic", "motion", "interior", "cg", "ai", "drawing", "cert", "it"];

// 히어로 캐러셀의 "OO 전체과정 보기" 링크(/courses?track=interior)가 해당 탭을 미리 선택해 두도록.
// 쿼리 없이 들어오면 기존처럼 전체.
export default function CoursesIndex() {
  const search = useSearch();
  const initialTrack = new URLSearchParams(search).get("track") as CourseInterest | null;
  const [active, setActive] = useState<CourseInterest | "ALL">(initialTrack && tracks.includes(initialTrack) ? initialTrack : "ALL");
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
