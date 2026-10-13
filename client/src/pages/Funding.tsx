import { ArrowRight, Check, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";

// 국비지원은 학원이 정하는 혜택이 아니라 국가(고용노동부)가 운영하는 제도라서, 금액·지원율처럼
// 바뀌거나 사람마다 달라지는 수치는 적지 않는다. 제도 이름과 절차만 안내하고, 각 개인의 대상 여부·
// 한도는 공식 채널(HRD-Net·고용센터) 확인 또는 상담으로 넘긴다. ponytail: 수치 없는 안내 페이지로 충분.
const programs = [
  {
    name: "국민내일배움카드",
    body: "고용노동부가 운영하는 직업훈련 지원 제도입니다. 카드를 발급받으면 정해진 기간·한도 안에서 직업훈련 비용을 지원받을 수 있습니다. 발급 대상, 기간, 한도는 운영 기준에 따라 달라지므로 HRD-Net 공식 안내 또는 가까운 고용센터에서 확인하는 것이 정확합니다.",
  },
  {
    name: "국민취업지원제도",
    body: "구직자를 대상으로 취업 지원 서비스와 함께 교육·훈련을 연계하는 제도입니다. 소득·재산·취업 경험 등 요건에 따라 대상 여부가 갈리므로, 본인이 해당하는지는 고용센터 상담을 통해 확인해야 합니다.",
  },
];

const steps = [
  { title: "상담 신청", body: "관심 과정과 현재 상황(재직 여부, 이전 훈련 이력 등)을 알려주시면 국비지원 대상인지 먼저 가늠해 드립니다." },
  { title: "대상 여부 확인", body: "국민내일배움카드 발급 이력, 고용보험 가입 여부 등 개인 조건에 따라 대상 여부와 한도가 다릅니다. 필요하면 고용센터 확인을 함께 안내합니다." },
  { title: "과정 선택과 등록", body: "대상이 확인되면 원하는 과정과 시간표를 상담에서 함께 정합니다." },
];

export default function Funding() {
  const { open } = useConsultModal();
  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <p className="breadcrumb"><Link href="/">홈</Link> / 국비지원</p>
            <div className="eyebrow"><span className="eyebrow-dot" /> FUNDING / 국비지원</div>
            <h1>국비지원,<br /><em>대상인지부터</em> 확인하세요.</h1>
          </div>
          <div className="inner-hero-aside">
            <p>국비지원은 학원이 아니라 국가가 운영하는 제도입니다. 지원 비율과 한도는 사람마다 달라 정확한 금액은 상담이나 공식 채널 확인이 필요합니다.</p>
            <span className="aside-index">FUNDING / 01</span>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="section-kicker"><span>01</span><span>PROGRAMS</span></div>
          <h2 className="course-section-title" style={{ marginBottom: 24 }}>어떤 제도가 있나요</h2>
          <div className="funding-programs">
            {programs.map((p) => (
              <article className="funding-program" key={p.name}>
                <h3>{p.name}</h3>
                <p>{p.body}</p>
                <a className="arrow-link" href="https://www.hrd.go.kr" target="_blank" rel="noreferrer">
                  HRD-Net에서 공식 안내 확인 <ExternalLink size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container">
          <div className="section-kicker"><span>02</span><span>HOW IT WORKS</span></div>
          <h2 className="course-section-title" style={{ marginBottom: 24 }}>국비지원 확인 절차</h2>
          <ol className="tip-steps">
            {steps.map((s, i) => (
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
          <div className="resource-checklist" style={{ maxWidth: 640 }}>
            <h3>국비지원 과정을 찾고 있다면</h3>
            <ul>
              <li><Check size={15} /> 대부분의 과정이 국비지원 대상 여부를 상담에서 확인할 수 있습니다</li>
              <li><Check size={15} /> 정확한 지원율·한도는 개인 조건에 따라 달라 상담에서 안내합니다</li>
              <li><Check size={15} /> <Link href="/courses">전체 과정 보기</Link>에서 관심 분야를 먼저 둘러볼 수 있습니다</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-pad-small">
        <div className="container resource-detail-grid" style={{ gridTemplateColumns: "1fr 360px" }}>
          <div className="course-faq" style={{ marginTop: 0 }}>
            <h3>국비지원 자주 묻는 질문</h3>
            <details><summary>모든 과정이 국비지원 대상인가요?</summary><p>과정과 개인 조건에 따라 다릅니다. 관심 과정을 말씀해 주시면 상담에서 확인해 드립니다.</p></details>
            <details><summary>국비지원을 받으려면 무엇이 필요한가요?</summary><p>국민내일배움카드 발급 등 사전 절차가 필요한 경우가 많습니다. 아직 카드가 없다면 발급 방법부터 안내해 드립니다.</p></details>
            <details><summary>예전에 다른 교육에서 국비지원을 받았는데 또 받을 수 있나요?</summary><p>카드의 남은 한도와 기간에 따라 달라집니다. 정확한 잔여 한도는 HRD-Net 또는 고용센터에서 확인하는 것이 가장 정확합니다.</p></details>
            <details><summary>재직자도 국비지원이 되나요?</summary><p>재직자 대상 제도는 요건이 별도입니다. 현재 상황을 알려주시면 해당하는 제도가 있는지 확인해 드립니다.</p></details>
          </div>
          <aside>
            <div className="side-cta">
              <span className="side-cta-label">FREE CONSULT</span>
              <p>국비지원 대상인지부터 확인해 보세요.</p>
              <button type="button" className="button button-primary full-button" onClick={() => open({ sourcePage: "funding" })}>
                무료 상담 신청 <ArrowRight size={16} />
              </button>
            </div>
            <div className="side-cta side-fee">
              <span className="side-cta-label">QUICK FEE CHECK</span>
              <p>이름과 번호만 남기면 수강료를 안내해 드립니다.</p>
              <QuickFeeForm sourcePage="funding-fee" />
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
