import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import { courseLabels, portfolioItems, type CourseKey } from "@/lib/portfolio";

// "수강후기·작품" — 실제 후기 텍스트(제3자 작성)는 옮기지 않으므로(섹션 22 원칙) 이 페이지는
// 검증 가능한 실제 수강생 작품(sbsart.com 공개 게시물) 중심으로 구성한다. 후기는 쌓이는 대로 추가.
const courseOrder: CourseKey[] = ["graphic", "motion", "cg", "interior"];
const categories: { key: CourseKey | "ALL"; label: string }[] = [
  { key: "ALL", label: "전체" },
  ...courseOrder.map((k) => ({ key: k, label: courseLabels[k].label })),
];

export default function Community() {
  const { open } = useConsultModal();
  const [active, setActive] = useState<CourseKey | "ALL">("ALL");
  const items = useMemo(() => (active === "ALL" ? portfolioItems : portfolioItems.filter((i) => i.course === active)), [active]);

  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / 수강후기·작품</p>
            <div className="eyebrow"><span className="eyebrow-dot" /> COMMUNITY / 수강후기·작품</div>
            <h1>수강생이<br /><em>직접 완성한</em> 작품.</h1>
          </div>
          <div className="inner-hero-aside">
            <p>과정별 수강생 작품을 모았습니다. 작품을 누르면 소개·사용 툴·제작 과정을 볼 수 있습니다.</p>
            <span className="aside-index">COMMUNITY / 01</span>
          </div>
        </div>
      </section>

      <section className="resource-directory section-pad-small">
        <div className="container">
          <div className="resource-toolbar">
            <div className="category-tabs" role="tablist" aria-label="작품 카테고리">
              {categories.map((c) => (
                <button key={c.key} type="button" className={active === c.key ? "category-tab active" : "category-tab"} onClick={() => setActive(c.key)}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="resource-count"><span>{items.length.toString().padStart(2, "0")}</span> WORKS</div>
          <div className="portfolio-grid">
            {items.map((item) => (
              <Link className="portfolio-card" href={`/portfolio/${item.id}`} key={item.id}>
                <img src={item.img} alt={item.title} loading="lazy" />
                {item.video && <span className="course-card-play portfolio-card-play"><Play size={14} fill="currentColor" /></span>}
                <span className="portfolio-card-title">{item.title} <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <h3 style={{ marginBottom: 12 }}>수강후기</h3>
          <p style={{ color: "var(--muted-foreground)", fontSize: 14, lineHeight: 1.8, maxWidth: 640 }}>
            아직 이 사이트에 직접 올라온 후기가 없습니다. 실제 후기가 모이는 대로 이 자리에 추가합니다. 수업이 궁금하면 상담에서 진행 방식을 먼저 안내해 드립니다.
          </p>
        </div>
      </section>

      <section className="dark-strip">
        <div className="container dark-strip-inner">
          <span>QUESTIONS?</span>
          <strong>어떤 과정의 작품인지 궁금하신가요?</strong>
          <button type="button" className="arrow-link light-link" onClick={() => open({ sourcePage: "community" })}>
            상담 시작하기 <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
