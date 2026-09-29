import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, FileImage, Play, Search, WandSparkles } from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import { resources } from "@/lib/resources";

const icons: Record<string, typeof FileImage> = { GRAPHIC: FileImage, MOTION: Play, CG: WandSparkles, INTERIOR: FileImage, "AI WORKFLOW": WandSparkles };
const categories = ["ALL", "GRAPHIC", "MOTION", "CG", "INTERIOR", "AI WORKFLOW"];

export default function Resources() {
  const { open } = useConsultModal();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("ALL");
  const filteredResources = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = activeCategory === "ALL" || resource.category === activeCategory;
      const matchesQuery = !normalized || `${resource.title} ${resource.excerpt} ${resource.category}`.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query]);

  return (
    <div className="inner-page resources-page">
      <section className="inner-hero">
        <div className="container inner-hero-grid">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> RESOURCE ROOM / BLOG</div>
            <h1>배우고,<br /><em>다시 꺼내 쓰는</em><br />자료실.</h1>
          </div>
          <div className="inner-hero-aside">
            <p>포토샵, 모션그래픽, CG, 인테리어, AI 워크플로우를 작업자의 언어로 기록합니다.</p>
            <span className="aside-index">ARCHIVE / 2026</span>
          </div>
        </div>
      </section>

      <section className="resource-directory section-pad-small">
        <div className="container">
          <div className="resource-toolbar">
            <div className="category-tabs" role="tablist" aria-label="자료실 카테고리">
              {categories.map((category) => (
                <button key={category} type="button" className={activeCategory === category ? "category-tab active" : "category-tab"} onClick={() => setActiveCategory(category)}>
                  {category}
                </button>
              ))}
            </div>
            <label className="search-field">
              <Search size={17} />
              <span className="sr-only">자료 검색</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="자료 검색" />
            </label>
          </div>

          <div className="resource-count"><span>{filteredResources.length.toString().padStart(2, "0")}</span> NOTES AVAILABLE</div>
          {filteredResources.length > 0 ? (
            <div className="resource-list">
              {filteredResources.map((resource, index) => {
                const Icon = icons[resource.category];
                return (
                  <article className={`resource-row accent-${resource.accent}`} id={resource.id} key={resource.id}>
                    <div className="resource-row-index">{(index + 1).toString().padStart(2, "0")}</div>
                    <div className="resource-row-icon"><Icon size={22} strokeWidth={1.5} /></div>
                    <div className="resource-row-main">
                      <div className="resource-meta"><span>{resource.category}</span><b>{resource.type}</b></div>
                      <h2><Link href={`/blog/${resource.id}`}>{resource.title}</Link></h2>
                      <p>{resource.excerpt}</p>
                    </div>
                    <Link className="resource-row-arrow" href={`/blog/${resource.id}`} aria-label={`${resource.title} 자세히 보기`}><ArrowRight size={18} /></Link>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state"><Search size={19} /><p>검색 결과가 없습니다. 다른 키워드로 다시 찾아보세요.</p></div>
          )}
        </div>
      </section>

      <section className="fee-band">
        <div className="container fee-band-inner">
          <div><span className="side-cta-label">QUICK FEE CHECK</span><strong>빠른 수강료 조회</strong><p>이름과 번호만 남기면 담당자가 수강료를 안내해 드립니다.</p></div>
          <QuickFeeForm sourcePage="resources-fee" />
        </div>
      </section>

      <section className="dark-strip">
        <div className="container dark-strip-inner">
          <span>QUESTIONS?</span>
          <strong>더 궁금한 점이 있으신가요?</strong>
          <button type="button" className="arrow-link light-link" onClick={() => open({ sourcePage: "resources" })}>
            상담 시작하기 <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
