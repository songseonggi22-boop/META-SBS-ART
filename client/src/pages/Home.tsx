import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Box,
  Check,
  Code2,
  Cuboid,
  FileImage,
  Layers3,
  Move3d,
  PenTool,
  Play,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import { portfolioItems } from "@/lib/portfolio";
import { coursesByTrack } from "@/lib/courses";
import { courseHref } from "@/lib/landings";

// 각 과정 카드의 썸네일은 같은 사업자(SBS아카데미AIX학원) 공식 포트폴리오(sbsart.com, 2026-09-21 확인)의
// 실제 수강생 결과물 1건씩(lib/portfolio.ts) — 눌러도 sbsart.com으로 나가지 않고 이 사이트 안의 `/portfolio/:id`
// 랜딩페이지(영상·사진·작품소개·사용툴)로 이동. 유튜브 영상이 있는 항목은 재생 배지로 표시.
// "자격증 & AI"는 포트폴리오 사이트에 대응 카테고리가 없어 썸네일 없이 유지.
const graphicSample = portfolioItems.find((item) => item.course === "graphic")!;
const motionSample = portfolioItems.find((item) => item.course === "motion")!;
const cgSample = portfolioItems.find((item) => item.course === "cg")!;
const interiorSample = portfolioItems.find((item) => item.course === "interior")!;

const courses = [
  {
    number: "01",
    resourceId: "photoshop",
    interest: "graphic" as const,
    title: "시각편집디자인",
    tools: "Photoshop · Illustrator · InDesign · GTQ",
    description: "이미지와 벡터를 다루는 기본기부터 브랜드 그래픽까지.",
    icon: FileImage,
    accent: "lime",
    portfolio: graphicSample,
  },
  {
    number: "02",
    resourceId: "motion",
    interest: "motion" as const,
    title: "모션그래픽",
    tools: "Premiere · After Effects · C4D",
    description: "편집의 리듬, 타이포 모션, 3D 장면을 하나의 시퀀스로.",
    icon: Play,
    accent: "violet",
    portfolio: motionSample,
  },
  {
    number: "03",
    resourceId: "cg",
    interest: "cg" as const,
    title: "CG / 3D",
    tools: "ZBrush · Rigging · Animation · Maya",
    description: "형태를 만들고 움직임을 설계하는 캐릭터·애니메이션 트랙.",
    icon: Cuboid,
    accent: "cyan",
    portfolio: cgSample,
  },
  {
    number: "04",
    resourceId: "interior",
    interest: "interior" as const,
    title: "인테리어 디자인",
    tools: "CAD · SketchUp · 3ds Max · Enscape",
    description: "도면, 공간 모델링, 렌더링으로 아이디어를 설득 가능한 이미지로.",
    icon: Box,
    accent: "orange",
    portfolio: interiorSample,
  },
  {
    number: "05",
    resourceId: undefined,
    interest: "drawing" as const,
    title: "웹툰·디지털드로잉",
    tools: "Clip Studio · Procreate · iPad",
    description: "캐릭터·채색부터 웹툰·이모티콘·굿즈까지, 그림이 결과물인 트랙.",
    icon: PenTool,
    accent: "violet",
    portfolio: null,
  },
  {
    number: "06",
    resourceId: undefined,
    interest: "cert" as const,
    title: "컴퓨터 자격증",
    tools: "컴활 1급 · 2급 · Excel · Access",
    description: "엑셀 실무부터 Access 데이터베이스까지, 컴활 1급·2급 실기 대비.",
    icon: Check,
    accent: "orange",
    portfolio: null,
  },
  {
    number: "07",
    resourceId: "ai",
    interest: "ai" as const,
    title: "AI 활용",
    tools: "ChatGPT · Claude · 바이브코딩 · n8n 자동화",
    description: "업무와 콘텐츠에 바로 쓰는 AI 활용, 코딩 없이 만드는 자동화.",
    icon: WandSparkles,
    accent: "pink",
    portfolio: null,
  },
  {
    number: "08",
    resourceId: undefined,
    interest: "it" as const,
    title: "IT 프로그래밍",
    tools: "Python · Java · HTML/CSS · JavaScript",
    description: "언어를 직접 익히는 코딩 기초부터 웹 개발까지.",
    icon: Code2,
    accent: "cyan",
    portfolio: null,
  },
];

function HeroVisual() {
  return (
    <div className="hero-visual" aria-label="디지털 제작 툴과 커리큘럼을 표현한 그래픽">
      <div className="hero-visual-noise" />
      <div className="visual-topline">
        <span>STUDIO / 01</span>
        <span>MAKE IT MOVE</span>
      </div>
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-cube">
        <div className="cube-face cube-front">3D</div>
        <div className="cube-face cube-side">AI</div>
        <div className="cube-face cube-top">C/</div>
      </div>
      <div className="visual-caption">
        <span className="caption-index">[ 2026 ]</span>
        <strong>TOOLS<br />TO<br />SCENES</strong>
      </div>
      <div className="visual-pills">
        <span>PS</span>
        <span>AE</span>
        <span>AI</span>
        <span>CAD</span>
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: (typeof courses)[number] }) {
  const { open } = useConsultModal();
  const Icon = course.icon;
  const { portfolio } = course;
  return (
    <article className={`course-card accent-${course.accent}${portfolio ? " has-media" : ""}`}>
      {portfolio && (
        <Link
          className="course-card-media"
          href={`/portfolio/${portfolio.id}`}
          aria-label={`${course.title} 실제 결과물 보기 (${portfolio.title})`}
        >
          <img src={portfolio.img} alt={portfolio.title} loading="lazy" />
          {portfolio.video && (
            <span className="course-card-play">
              <Play size={16} fill="currentColor" />
            </span>
          )}
        </Link>
      )}
      <div className="course-card-topline">
        <span>{course.number}</span>
        <Icon size={22} strokeWidth={1.5} />
      </div>
      <div className="course-card-body">
        <h3>{course.title}</h3>
        <p className="course-tools">{course.tools}</p>
        <p className="course-description">{course.description}</p>
        <ul className="course-chips">
          {coursesByTrack(course.interest).map((c) => (
            <li key={c.slug}><Link href={courseHref(c.slug)}>{c.title}</Link></li>
          ))}
        </ul>
        <button type="button" className="course-consult" onClick={() => open({ interest: course.interest, sourcePage: `course-${course.resourceId}` })}>
          이 과정 상담받기 <ArrowRight size={13} />
        </button>
      </div>
    {course.resourceId && (
        <Link href={`/blog/${course.resourceId}`} className="course-card-link" aria-label={`${course.title} 자료실 보기`}>
          <ArrowUpRight size={16} />
        </Link>
      )}
    </article>
  );
}

export default function Home() {
  const { open } = useConsultModal();
  return (
    <div>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> COMPUTER / CREATIVE / AI</div>
            <h1>
              생각을
              <br />
              <em>장면으로.</em>
            </h1>
            <p className="hero-description">
              포토샵부터 3D, 모션그래픽, AI 자동화까지.<br className="desktop-only" />
              배우는 순서가 결과의 밀도를 바꿉니다.
            </p>
            <div className="hero-actions">
              <Link href="/#courses" className="button button-primary">
                커리큘럼 보기 <ArrowDownRight size={17} />
              </Link>
              <button type="button" className="button button-text" onClick={() => open({ sourcePage: "home-hero" })}>
                상담 시작하기 <ArrowRight size={16} />
              </button>
            </div>
            <div className="hero-fee">
              <span>수강료가 궁금하다면 · 이름/번호만 입력</span>
              <QuickFeeForm sourcePage="home-hero-fee" />
            </div>
            <div className="hero-note">
              <span className="note-line" />
              <span>Welcome to the Future of Making</span>
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <div className="ticker" aria-label="교육 분야">
        <div className="ticker-track">
          {["DESIGN", "MOTION", "CG", "INTERIOR", "CERTIFICATION", "AI WORKFLOW", "DESIGN", "MOTION", "CG", "INTERIOR", "CERTIFICATION", "AI WORKFLOW"].map((item, index) => (
            <span key={`${item}-${index}`}>
              {item} <b>✳</b>
            </span>
          ))}
        </div>
      </div>

      <section className="intro-section section-pad">
        <div className="container intro-grid">
          <div className="section-kicker"><span>01</span><span>WHY US</span></div>
          <div className="intro-content">
            <p className="section-lede">툴을 배우는 곳이 아니라, <br className="desktop-only" /><span>작업하는 사람</span>이 되는 곳.</p>
            <div className="intro-support">
              <p>기능을 나열하는 수업 대신, 하나의 작업이 완성되는 과정을 따라갑니다. 기초 툴부터 실무형 결과물, 그리고 반복을 줄이는 AI 워크플로우까지 한 흐름으로 연결합니다.</p>
              <div className="intro-tags">
                <span><Check size={13} /> 기초부터 실무까지</span>
                <span><Check size={13} /> 결과물 중심</span>
                <span><Check size={13} /> 도구 간 연결</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="courses-section section-pad" id="courses">
        <div className="container">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker"><span>02</span><span>THE PROGRAM</span></div>
              <h2>만드는 방식에<br /><em>맞춘 트랙.</em></h2>
            </div>
            <p className="heading-aside">필요한 도구를 고르고, <br className="desktop-only" />나만의 제작 루틴을 만드세요.</p>
          </div>
          <div className="course-grid">
            {courses.map((course) => <CourseCard key={course.number} course={course} />)}
          </div>
        </div>
      </section>

      <section className="mid-cta">
        <div className="container mid-cta-inner">
          <strong>어떤 트랙이 나에게 맞는지 모르겠다면?</strong>
          <button type="button" className="button button-primary" onClick={() => open({ sourcePage: "home-mid" })}>무료 상담 신청 <ArrowRight size={16} /></button>
        </div>
      </section>

      <PortfolioShowcase />

      <section className="method-section section-pad">
        <div className="container method-grid">
          <div className="method-card method-card-dark">
            <div className="method-card-header"><span>PROCESS / 04</span><Move3d size={20} /></div>
            <div className="method-letter">M</div>
            <p>막연한 아이디어를 <br className="desktop-only" /><strong>움직이는 결과물</strong>로.</p>
          </div>
          <div className="method-copy">
            <div className="section-kicker"><span>04</span><span>HOW WE WORK</span></div>
            <h2>작업의 처음과<br /><em>다음 장면</em>까지.</h2>
            <p>툴 하나를 익히는 데서 끝나지 않습니다. 기획 → 제작 → 수정 → 공유의 리듬을 경험하며 혼자서도 다음 작업을 시작할 수 있도록 설계합니다.</p>
            <Link href="/about" className="arrow-link">학원 안내 보기 <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="resource-preview section-pad" id="resources">
        <div className="container resource-preview-grid">
          <div>
            <div className="section-kicker"><span>05</span><span>RESOURCE ROOM</span></div>
            <h2>배운 뒤에도<br /><em>계속 꺼내 보는</em> 자료실.</h2>
          </div>
          <div className="resource-teaser-list">
            <Link href="/blog/photoshop" className="resource-teaser"><span>01 / GRAPHIC</span><strong>포토샵 레이어를 정리하는 다섯 가지 습관</strong><ArrowUpRight size={17} /></Link>
            <Link href="/blog/motion" className="resource-teaser"><span>02 / MOTION</span><strong>프리미어에서 애프터 이펙트로 넘어가는 타이밍</strong><ArrowUpRight size={17} /></Link>
            <Link href="/blog/ai" className="resource-teaser"><span>03 / AI WORKFLOW</span><strong>반복 업무를 줄이는 나만의 자동화 시작점</strong><ArrowUpRight size={17} /></Link>
            <Link href="/blog" className="resource-more">자료실 전체 보기 <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container cta-inner">
          <div className="cta-label"><Sparkles size={16} /> START MAKING</div>
          <h2>다음 작업을<br /><em>오늘 시작하세요.</em></h2>
          <div className="cta-bottom">
            <p>관심 있는 트랙과 현재 상황을 알려주시면, <br className="desktop-only" />가장 현실적인 시작점을 함께 찾습니다.</p>
            <button type="button" className="button button-light" onClick={() => open({ sourcePage: "home-cta" })}>상담 시작하기 <ArrowUpRight size={17} /></button>
          </div>
          <div className="cta-fee">
            <span>빠른 수강료 조회 · 이름과 번호만 남겨 주세요</span>
            <QuickFeeForm sourcePage="home-cta-fee" dark />
          </div>
        </div>
      </section>
    </div>
  );
}
