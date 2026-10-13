import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import PortfolioCard from "@/components/PortfolioCard";
import { portfolioItems } from "@/lib/portfolio";
import { landings, menus } from "@/lib/landings";

// 취업률·연계 기업 수 같은 수치는 검증되지 않아 적지 않는다(섹션 22 원칙). 이 페이지는 "어떻게
// 결과물을 쌓아 가는가"와 "관련 자격증"처럼 사실로 확인 가능한 구조만 설명한다.
const stages = [
  { title: "기초 결과물", body: "각 과정의 1~2단계에서 도구 사용법과 함께 작은 결과물을 먼저 완성합니다. STEP 구성은 과정마다 상세 페이지에서 확인할 수 있습니다." },
  { title: "실무형 결과물", body: "중반 이후 단계는 실제 업무·포트폴리오에 들어갈 수준의 결과물을 목표로 합니다." },
  { title: "포트폴리오 정리", body: "완성한 결과물을 모아 포트폴리오로 정리합니다. 아래 수강생 작품은 이렇게 완성된 결과물의 실제 사례입니다." },
];

const certLandings = ["gtq", "gtqi", "computer", "cad"];

export default function Careers() {
  const { open } = useConsultModal();
  const sample = portfolioItems.slice(0, 6);
  const certs = certLandings.map((s) => landings.find((l) => l.slug === s)).filter((l): l is NonNullable<typeof l> => !!l);

  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / 취업지원</p>
            <div className="eyebrow"><span className="eyebrow-dot" /> CAREER / 취업지원</div>
            <h1>결과물로<br /><em>증명하는</em> 포트폴리오.</h1>
          </div>
          <div className="inner-hero-aside">
            <p>과정마다 단계별로 결과물을 만들고, 마지막에 포트폴리오로 정리합니다. 수치가 아니라 실제로 완성한 작품으로 확인하세요.</p>
            <span className="aside-index">CAREER / 01</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="section-kicker"><span>01</span><span>HOW</span></div>
          <h2 className="course-section-title" style={{ marginBottom: 24 }}>포트폴리오가 쌓이는 과정</h2>
          <ol className="tip-steps">
            {stages.map((s, i) => (
              <li key={s.title}>
                <span className="tip-step-no">{(i + 1).toString().padStart(2, "0")}</span>
                <div><h3>{s.title}</h3><p>{s.body}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker"><span>02</span><span>WORKS</span></div>
              <h2 className="course-section-title" style={{ marginBottom: 0 }}>수강생 작품 미리보기</h2>
            </div>
            <Link href="/community" className="arrow-link">작품 전체 보기 <ArrowUpRight size={16} /></Link>
          </div>
          <div className="portfolio-grid" style={{ marginTop: 20 }}>
            {sample.map((item) => <PortfolioCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="section-kicker"><span>03</span><span>CERTIFICATES</span></div>
          <h2 className="course-section-title" style={{ marginBottom: 24 }}>결과물과 함께 준비하는 자격증</h2>
          <div className="landing-course-grid">
            {certs.map((l) => (
              <Link key={l.slug} href={`/daejeon/${l.slug}`} className="landing-course-card">
                <span>{menus.find((m) => m.key === l.menu)!.label}</span>
                <strong>{l.keyword}</strong>
                <p>{l.description}</p>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid" style={{ gridTemplateColumns: "1fr 360px" }}>
          <div className="course-faq" style={{ marginTop: 0 }}>
            <h3>취업지원 자주 묻는 질문</h3>
            <details><summary>포트폴리오가 없어도 과정을 시작할 수 있나요?</summary><p>네. 대부분의 과정이 입문자 기준으로 시작해 과정 중에 포트폴리오를 처음부터 만들어 갑니다.</p></details>
            <details><summary>취업을 연계해 주나요?</summary><p>이 페이지는 과정 안에서 포트폴리오를 완성하는 방법을 안내합니다. 구체적인 취업 연계 범위는 상담에서 확인해 주세요.</p></details>
          </div>
          <aside>
            <div className="side-cta">
              <span className="side-cta-label">FREE CONSULT</span>
              <p>어떤 과정이 포트폴리오로 이어지는지 상담으로 확인해 보세요.</p>
              <button type="button" className="button button-primary full-button" onClick={() => open({ sourcePage: "careers" })}>
                무료 상담 신청 <ArrowRight size={16} />
              </button>
            </div>
            <div className="side-cta side-fee">
              <span className="side-cta-label">QUICK FEE CHECK</span>
              <p>이름과 번호만 남기면 수강료를 안내해 드립니다.</p>
              <QuickFeeForm sourcePage="careers-fee" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
