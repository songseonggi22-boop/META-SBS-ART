import { FormEvent, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, LockKeyhole, Mail, Sparkles } from "lucide-react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import QuickFeeForm from "@/components/QuickFeeForm";
import PrivacyPolicyText from "@/components/PrivacyPolicyText";
import { useConsultModal } from "@/components/ConsultModalContext";

// 교육시설 사진·소개 문구 — 같은 사업자(주식회사 에스씨에이아카데미대전, 학원등록번호 대전서부 제서4019호,
// daejeoncom.kr 공식 사이트, 2026-10-13 확인)의 실제 대전 지점 시설. daejeoncom.kr은 HTTPS를 지원하지 않아
// (TLS 핸드셰이크 실패) 우리 HTTPS 사이트에서 그대로 참조(hotlink)하면 믹스드 콘텐츠로 전부 깨진다 —
// 그래서 다른 소스(sbsart.com 포트폴리오)와 달리 이 사진만 `client/public/facility/`에 내려받아 자체 호스팅한다.
const facilityIntro = {
  label: "FACILITY",
  title: "작업이 끊기지 않는 환경",
  body: "실습 중심 교육에서 장비는 곧 수업의 속도입니다. 렌더링을 기다리느라 진도가 멈추지 않도록 사양과 공간을 맞췄습니다.",
};
const facilityFeatures = [
  { label: "SYSTEM", title: "전문가용 작업 사양", body: "고사양 워크스테이션과 색보정 디스플레이, 펜 태블릿을 1인 1대로 배치해 3D·영상 렌더링 작업이 수업 중에 그대로 돌아갑니다." },
  { label: "SPACE", title: "감각적인 인테리어", body: "강의실·실습실·라운지를 분리해 수업과 개인 작업이 서로 방해받지 않도록 구성했습니다." },
  { label: "LICENSE", title: "정품 소프트웨어", body: "Adobe·Autodesk·Maya 등 실무에서 쓰는 프로그램을 정품 라이선스로 제공해 수업에서 배운 환경 그대로 실습합니다." },
  { label: "ACCESS", title: "역세권 접근성", body: "지하철역 도보 거리에 있어 퇴근 후·주말 수강도 이동 부담이 적습니다." },
];
const facilityPhotos = [
  { file: "fac01", caption: "강의실 전경" },
  { file: "fac02", caption: "실습용 워크스테이션" },
  { file: "fac03", caption: "개인 작업 공간" },
  { file: "fac04", caption: "그룹 프로젝트룸" },
  { file: "fac05", caption: "자율 학습 공간" },
  { file: "fac06", caption: "휴게 라운지" },
  { file: "fac07", caption: "상담 공간" },
  { file: "fac08", caption: "스튜디오 촬영 장비" },
  { file: "fac09", caption: "드로잉·태블릿 실습실" },
  { file: "fac10", caption: "대형 스크린 강의실" },
  { file: "fac11", caption: "포트폴리오 리뷰룸" },
  { file: "fac12", caption: "로비와 안내 데스크" },
].map((p) => ({ ...p, src: `/facility/${p.file}.webp` }));

const legacyCheckoutLinks = [
  "https://cult-polar-starter.vercel.app/auth/sign-up?returnUrl=%2Fcheckout%3FproductId%3Dbf1a3211-7ed6-4ff4-9fcd-fbc62e423229%26priceId%3D75e18906-163f-4b82-9e1f-140d8b4dcf1a%26amount%3D800%26type%3Dfixed",
  "https://cult-polar-starter.vercel.app/auth/sign-up?returnUrl=%2Fcheckout%3FproductId%3Dbe0f649e-c848-47ae-930b-61b66921e771%26priceId%3Dfd8f2a02-e30b-4fa4-a6c4-5467f854bb0b%26amount%3D1200%26type%3Dfixed",
];

export function AboutPage() {
  const { open } = useConsultModal();
  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div><div className="eyebrow"><span className="eyebrow-dot" /> ABOUT / 학원 안내</div><h1>도구보다<br /><em>작업을</em> 믿습니다.</h1></div>
          <div className="inner-hero-aside"><p>작업을 시작하는 사람에게 필요한 건 더 많은 기능이 아니라, 다음 장면으로 넘어가는 감각입니다.</p><span className="aside-index">ABOUT / 01</span></div>
        </div>
      </section>
      <section className="section-pad about-content"><div className="container about-grid"><div className="section-kicker"><span>01</span><span>OUR POINT OF VIEW</span></div><div><p className="section-lede">배운 것을 <br className="desktop-only" /><span>써먹을 수 있게.</span></p><p className="long-copy">대전AI컴퓨터디자인학원은 그래픽 디자인, 모션그래픽, CG, 인테리어, 자격증, AI 활용을 각각의 섬으로 두지 않습니다. 하나의 프로젝트 안에서 도구가 어떻게 이어지는지, 어디서 시간을 줄이고 어디에 집중해야 하는지 함께 탐구합니다.</p><div className="check-list"><span><Check size={14} /> 결과물 중심 커리큘럼</span><span><Check size={14} /> 도구 간 연결을 고려한 수업</span><span><Check size={14} /> 반복 가능한 작업 루틴</span></div></div></div></section>
      <section className="section-pad-small facility-section">
        <div className="container">
          <div className="section-kicker"><span>02</span><span>{facilityIntro.label}</span></div>
          <div className="section-heading-row">
            <h2 className="course-section-title" style={{ marginBottom: 0 }}>{facilityIntro.title}</h2>
          </div>
          <p className="landing-lead" style={{ margin: "14px 0 32px" }}>{facilityIntro.body}</p>
          <div className="facility-features">
            {facilityFeatures.map((f) => (
              <div className="facility-feature" key={f.label}>
                <span className="side-cta-label">{f.label}</span>
                <strong>{f.title}</strong>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
          <div className="facility-gallery">
            {facilityPhotos.map((p) => (
              <figure key={p.file}>
                <img src={p.src} alt={`대전AI컴퓨터디자인학원 교육시설 - ${p.caption}`} loading="lazy" width={1600} height={1067} />
                <figcaption>{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <section className="dark-strip"><div className="container dark-strip-inner"><span>MAKE / LEARN / REPEAT</span><strong>Build your next scene.</strong><button type="button" className="arrow-link light-link" onClick={() => open({ sourcePage: "about" })}>상담 시작하기 <ArrowUpRight size={16} /></button></div></section>
    </div>
  );
}

export function PricingPage() {
  const { open } = useConsultModal();
  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero"><div className="container inner-hero-grid"><div><div className="eyebrow"><span className="eyebrow-dot" /> PROGRAM / START HERE</div><h1>지금 필요한<br /><em>시작점</em>을 찾기.</h1></div><div className="inner-hero-aside"><p>목표와 현재 경험에 따라 그래픽, 모션, CG, 인테리어, 자격증, AI 트랙을 살펴보세요.</p><span className="aside-index">PROGRAM / 02</span></div></div></section>
      <section className="section-pad pricing-content"><div className="container"><div className="section-kicker"><span>01</span><span>CHOOSE YOUR TRACK</span></div><div className="pricing-grid"><div className="price-card price-card-dark"><div className="price-label">FOR VISUAL MAKERS</div><h2>디자인 &<br />모션</h2><p>Photoshop · Illustrator · Premiere · After Effects · C4D</p><button type="button" className="button button-light" onClick={() => open({ sourcePage: "pricing" })}>상담 시작하기 <ArrowRight size={16} /></button></div><div className="price-card price-card-light"><div className="price-label">FOR 3D BUILDERS</div><h2>CG &<br />인테리어</h2><p>ZBrush · Maya · CAD · SketchUp · 3ds Max · Enscape</p><button type="button" className="button button-dark" onClick={() => open({ sourcePage: "pricing" })}>상담 시작하기 <ArrowRight size={16} /></button></div><div className="price-card price-card-lime"><div className="price-label">FOR SMART WORKFLOWS</div><h2>컴활 &<br />AI 활용</h2><p>컴활 1급·2급 · ChatGPT · 바이브코딩 · 업무 자동화</p><button type="button" className="button button-dark" onClick={() => open({ interest: "ai", sourcePage: "pricing" })}>상담 시작하기 <ArrowRight size={16} /></button></div></div><div className="fee-band-inner pricing-fee"><div><span className="side-cta-label">QUICK FEE CHECK</span><strong>빠른 수강료 조회</strong><p>이름과 번호만 남기면 수강료를 안내해 드립니다.</p></div><QuickFeeForm sourcePage="pricing-fee" /></div><div className="legacy-links"><div><span className="footer-label">LINK PRESERVATION</span><p>기존 Pricing 경로와 결제 URL의 UTM/쿼리 파라미터를 보존했습니다.</p></div><div className="legacy-link-list"><a href={legacyCheckoutLinks[0]}>Get Base access <ArrowUpRight size={14} /></a><a href={legacyCheckoutLinks[1]}>Get Pro access <ArrowUpRight size={14} /></a></div></div></div></section>
    </div>
  );
}

export function AuthPage({ mode }: { mode: "login" | "sign-up" }) {
  const [, navigate] = useLocation();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const isLogin = mode === "login";
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    toast.success(isLogin ? "로그인 요청을 확인했습니다." : "가입 요청을 확인했습니다.");
  }
  return <div className="auth-page"><div className="auth-card"><Link href="/" className="brand-lockup"><span className="brand-mark">AI</span><span className="brand-copy"><strong>대전AI컴퓨터디자인학원</strong><span>DAEJEON AI COMPUTER DESIGN</span></span></Link><div className="auth-card-heading"><span className="eyebrow"><span className="eyebrow-dot" /> {isLogin ? "WELCOME BACK" : "START MAKING"}</span><h1>{isLogin ? "다시 만나요." : "작업을 시작해요."}</h1><p>{isLogin ? "기존 계정으로 계속합니다." : "관심 있는 트랙을 남기면 상담을 시작합니다."}</p></div><form onSubmit={handleSubmit} className="auth-form"><label>이메일<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>{!isLogin && <label>관심 분야<select defaultValue="graphic"><option value="graphic">그래픽 디자인</option><option value="motion">모션그래픽</option><option value="cg">CG / 3D</option><option value="interior">인테리어 디자인</option><option value="ai">자격증 & AI</option></select></label>}<button type="submit" className="button button-primary full-button">{isLogin ? "로그인" : "상담 요청하기"} <ArrowRight size={16} /></button></form>{submitted && <div className="form-success"><Check size={15} /> 입력한 내용을 확인했습니다. 다음 안내를 준비할게요.</div>}<div className="auth-footer">{isLogin ? <span>처음 오셨나요? <button type="button" onClick={() => navigate("/auth/sign-up")}>Sign Up</button></span> : <span>이미 계정이 있나요? <button type="button" onClick={() => navigate("/auth/login")}>Login</button></span>}<Link href="/auth/login" className="forgot-link"><LockKeyhole size={13} /> Forgot Password</Link></div></div></div>;
}

export function CheckoutPage() {
  const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
  return <div className="auth-page"><div className="auth-card checkout-card"><div className="checkout-icon"><Sparkles size={20} /></div><span className="eyebrow"><span className="eyebrow-dot" /> CHECKOUT ROUTE</span><h1>기존 결제 경로</h1><p>요청된 checkout URL을 유지하고 있습니다. 실제 결제 연동이 연결되면 이 페이지에서 이어집니다.</p><div className="query-box"><span>productId</span><strong>{params.get("productId") || "—"}</strong><span>priceId</span><strong>{params.get("priceId") || "—"}</strong><span>amount</span><strong>{params.get("amount") || "—"}</strong></div><Link href="/pricing" className="button button-primary full-button">수강 안내로 돌아가기 <ArrowRight size={16} /></Link></div></div>;
}

export function InfoPage({ kind }: { kind: "docs" | "terms" }) {
  const isDocs = kind === "docs";
  return <div className="inner-page"><section className="inner-hero compact-hero"><div className="container inner-hero-grid"><div><div className="eyebrow"><span className="eyebrow-dot" /> {isDocs ? "DOCUMENTATION" : "TERMS"}</div><h1>{isDocs ? <>도구를<br /><em>이해하는</em> 문서.</> : <>서비스 이용<br /><em>안내</em> 페이지.</>}</h1></div><div className="inner-hero-aside"><p>{isDocs ? "수업과 자료실을 더 잘 활용하기 위한 기존 문서 경로를 유지합니다." : "기존 Terms 경로를 유지한 안내 페이지입니다."}</p><span className="aside-index">{isDocs ? "DOCS / 01" : "TERMS / 01"}</span></div></div></section><section className="section-pad"><div className="container doc-card"><Mail size={20} /><h2>{isDocs ? "Documentation" : "Terms"}</h2><p>{isDocs ? "자료실과 커리큘럼을 통해 작업을 시작하세요. 세부 문서가 연결되면 이 페이지에 이어서 안내합니다." : "공식 약관 내용이 제공되면 이 주소에 반영합니다. 현재는 기존 링크와 라우팅을 보존한 상태입니다."}</p><Link href="/" className="arrow-link">홈으로 돌아가기 <ArrowRight size={16} /></Link></div></section></div>;
}

export function PrivacyPage() {
  return (
    <div className="inner-page">
      <section className="inner-hero compact-hero">
        <div className="container inner-hero-grid">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> PRIVACY</div>
            <h1>개인정보<br /><em>처리방침.</em></h1>
          </div>
          <div className="inner-hero-aside"><p>상담 신청 시 수집하는 개인정보의 처리 기준을 안내합니다.</p><span className="aside-index">PRIVACY / 01</span></div>
        </div>
      </section>
      <section className="section-pad-small">
        <div className="container">
          <PrivacyPolicyText />
        </div>
      </section>
    </div>
  );
}

export function NotFoundPage() {
  return <div className="auth-page"><div className="auth-card"><span className="eyebrow"><span className="eyebrow-dot" /> 404 / NOT FOUND</span><h1>페이지를<br /><em>찾을 수 없어요.</em></h1><p>주소를 확인하거나 홈으로 돌아가 주세요.</p><Link href="/" className="button button-primary full-button">홈으로 돌아가기 <ArrowRight size={16} /></Link></div></div>;
}
