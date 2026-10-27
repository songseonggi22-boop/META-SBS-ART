import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Box,
  Calculator,
  Check,
  Code2,
  Cuboid,
  FileImage,
  Landmark,
  Layers3,
  Move3d,
  MousePointerClick,
  PenTool,
  Play,
  Sparkles,
  Video,
  WandSparkles,
  X,
} from "lucide-react";
import { Link } from "wouter";
import { useConsultModal } from "@/components/ConsultModalContext";
import QuickFeeForm from "@/components/QuickFeeForm";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import { portfolioItems } from "@/lib/portfolio";
import { courses as allCourses, coursesByTrack, getCourse, trackLabels } from "@/lib/courses";
import type { CourseInterest } from "@/components/ConsultModalContext";
import { courseHref, landingsByMenu, menus, type MenuKey } from "@/lib/landings";
import { splitTools, toolLogos } from "@/lib/toolLogos";

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

// THE PROGRAM 상단 — 실제 쓰는 소프트웨어 로고를 눌러 바로 그 과정으로 들어가는 빠른 길.
// toolLogos에 로고가 있는 도구만(가짜 로고 생성 안 함) 과정 1개씩 연결.
const toolLinks: { tool: string; course: string; label: string }[] = [
  { tool: "photoshop", course: "photoshop", label: "포토샵" },
  { tool: "illustrator", course: "illustrator", label: "일러스트레이터" },
  { tool: "indesign", course: "indesign", label: "인디자인" },
  { tool: "premiere", course: "premiere", label: "프리미어 프로" },
  { tool: "after-effects", course: "after-effects", label: "애프터이펙트" },
  { tool: "autocad", course: "autocad", label: "오토캐드" },
  { tool: "sketchup", course: "sketchup", label: "스케치업" },
  { tool: "3dsmax", course: "3ds-max", label: "3ds Max" },
  { tool: "maya", course: "maya-modeling", label: "마야" },
  { tool: "blender", course: "blender", label: "블렌더" },
  { tool: "python", course: "python", label: "파이썬" },
  { tool: "clip-studio-paint", course: "webtoon", label: "클립스튜디오" },
  { tool: "html5", course: "html-css", label: "HTML/CSS" },
  { tool: "n8n", course: "n8n-efficiency", label: "n8n" },
];

// "이번년도 인기 툴" 요청(2026-10-27) — Claude·유튜브는 실제 과정(ai-agent, youtube-ai)이 있지만
// 공식 로고는 둘 다 서면 승인이 있어야 쓸 수 있어서(Anthropic 상표 가이드라인, YouTube Brand Use
// Request Form 확인) 로고 대신 범용 아이콘으로 표시한다. "인기"는 실제 신청·조회 데이터가 없어
// 검증 불가능한 주장이라 "대표 프로그램"으로 정직하게 라벨링.
const featuredTools: { label: string; course: string; logo?: string; icon?: typeof Bot }[] = [
  { label: "포토샵", course: "photoshop", logo: toolLogos.photoshop },
  { label: "일러스트레이터", course: "illustrator", logo: toolLogos.illustrator },
  { label: "프리미어 프로", course: "premiere", logo: toolLogos.premiere },
  { label: "Claude(클로드)", course: "ai-agent", icon: Bot },
  { label: "유튜브 영상편집", course: "youtube-ai", icon: Video },
];

function FeaturedTools() {
  return (
    <div className="tool-grid">
      {featuredTools.map((t) => (
        <Link key={t.course} href={courseHref(t.course)} className="tool-grid-item">
          {t.logo ? <img src={t.logo} alt="" loading="lazy" /> : t.icon && <span className="tool-grid-item-icon"><t.icon size={24} strokeWidth={1.5} /></span>}
          <span>{t.label}</span>
        </Link>
      ))}
    </div>
  );
}

function ToolGrid() {
  return (
    <div className="tool-grid">
      {toolLinks.map((t) => (
        <Link key={t.tool} href={courseHref(t.course)} className="tool-grid-item">
          <img src={toolLogos[t.tool]} alt="" loading="lazy" />
          <span>{t.label}</span>
        </Link>
      ))}
    </div>
  );
}

// 가로 스크롤 "과정 빠르게 둘러보기" — 히어로 바로 아래. 과정 하나하나가 카드로 흐르듯 지나가는
// 교육기관 사이트 특유의 모집중 과정 슬라이더 패턴(화살표로 넘기기)을 우리 실제 과정 데이터로 구현한다.
// 개강일·모집상태 같은 실제 일정 데이터는 없으므로(상담에서 확인) 넣지 않고, 분야 칩 + 제목만 보여준다.
const quickBrowseSlugs = [
  "photoshop", "illustrator", "premiere", "after-effects", "maya-modeling",
  "autocad", "sketchup", "computer-ability-1", "computer-ability-2",
  "vibe-coding", "ai-agent", "chatgpt-first", "webtoon", "ipad-drawing", "python",
];
const trackIcon: Record<string, typeof FileImage> = {
  graphic: FileImage, motion: Play, cg: Cuboid, interior: Box, cert: Check, ai: WandSparkles, drawing: PenTool, it: Code2,
};
const trackAccent: Record<string, string> = {
  graphic: "lime", motion: "violet", cg: "cyan", interior: "orange", cert: "orange", ai: "pink", drawing: "violet", it: "cyan",
};
const thumbTracks = new Set(["graphic", "motion", "cg", "interior"]);
// 과정 소개 사진 — 같은 사업자 공식 사이트(daejeoncom.kr, 2026-10-13 사용자 제공 링크)의 과정 상세
// 페이지 대표 이미지. daejeoncom.kr은 HTTPS 미지원이라 교육시설 사진과 같은 이유로 내려받아
// client/public/course-hero/에 자체 호스팅한다(원본은 각 slug별 /class/.../*.asp 과정 페이지).
const courseHero: Partial<Record<string, string>> = {
  "computer-ability-1": "/course-hero/ca1.webp",
  "computer-ability-2": "/course-hero/ca2.webp",
  "vibe-coding": "/course-hero/vibe-coding.webp",
  "ai-agent": "/course-hero/ai-agent.webp",
  "chatgpt-first": "/course-hero/chatgpt-first.webp",
  webtoon: "/course-hero/goods.webp",
  "ipad-drawing": "/course-hero/procreate.webp",
};

function QuickBrowse() {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const baseItems = quickBrowseSlugs.map(getCourse).filter((c): c is NonNullable<typeof c> => !!c);
  const thumbSeen: Partial<Record<string, number>> = {};
  const cards = baseItems.map((c) => {
    let thumb: { img: string; alt: string } | undefined;
    const hero = courseHero[c.slug];
    if (hero) {
      thumb = { img: hero, alt: c.title };
    } else if (thumbTracks.has(c.track)) {
      const pool = portfolioItems.filter((p) => p.course === c.track);
      const i = thumbSeen[c.track] ?? 0;
      const pick = pool[i % pool.length];
      thumb = { img: pick.img, alt: pick.title };
      thumbSeen[c.track] = i + 1;
    }
    return { course: c, thumb };
  });
  // 한 벌을 통째로 복제해 뒤에 이어붙이고, 절반 지점을 지나면 스크롤 위치를 되감아 이음새 없이 반복한다
  // (이미 홈 화면 ticker 섹션에서 쓰는 것과 같은 무한 루프 트릭).
  const loopedCards = [...cards, ...cards];

  useEffect(() => {
    const el = trackRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf: number;
    const tick = () => {
      if (!pausedRef.current) {
        const half = el.scrollWidth / 2;
        el.scrollLeft += 0.6;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pause = () => { pausedRef.current = true; clearTimeout(resumeTimerRef.current); };
  const resume = (delay = 0) => { resumeTimerRef.current = setTimeout(() => { pausedRef.current = false; }, delay); };
  const scroll = (dir: 1 | -1) => {
    pause();
    trackRef.current?.scrollBy({ left: dir * 300, behavior: "smooth" });
    resume(2500);
  };

  return (
    <section className="quick-browse" aria-label="과정 빠르게 둘러보기">
      <div className="container quick-browse-head">
        <div>
          <div className="section-kicker"><span>00</span><span>QUICK BROWSE</span></div>
          <h2>과정을<br /><em>빠르게 둘러보세요.</em></h2>
        </div>
        <div className="quick-browse-arrows">
          <button type="button" className="icon-button" aria-label="이전 과정" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
          <button type="button" className="icon-button" aria-label="다음 과정" onClick={() => scroll(1)}><ArrowRight size={18} /></button>
        </div>
      </div>
      <div
        className="quick-browse-track"
        ref={trackRef}
        onPointerEnter={(e) => e.pointerType === "mouse" && pause()}
        onPointerLeave={(e) => e.pointerType === "mouse" && resume()}
        onTouchStart={pause}
        onFocus={pause}
        onBlur={() => resume()}
      >
        {loopedCards.map(({ course: c, thumb }, i) => {
          const Icon = trackIcon[c.track];
          return (
            <Link key={`${c.slug}-${i}`} href={courseHref(c.slug)} className="quick-course-card" tabIndex={i < cards.length ? 0 : -1} aria-hidden={i >= cards.length}>
              {thumb ? (
                <img className="quick-course-media" src={thumb.img} alt={thumb.alt} loading="lazy" />
              ) : (
                <div className={`quick-course-media quick-course-tile accent-${trackAccent[c.track]}`}><Icon size={26} strokeWidth={1.5} /></div>
              )}
              <span className="quick-course-chip">{trackLabels[c.track]}</span>
              <strong>{c.title}</strong>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// 히어로 "피크" 캐러셀 — 카드 여러 장이 동시에 보이고 가장자리는 다음/이전 카드가 살짝 비치는 레이아웃
// (2026-10-27, 모트모트 메인 배너 참고 — 사진·캐릭터는 가져오지 않고 레이아웃 메커니즘만). 가로 스크롤은
// QuickBrowse와 같은 풀블리드 네이티브 overflow-x+스냅 방식을 재사용해 터치 스와이프가 공짜로 따라온다.
// 이미지·카피는 전부 우리 데이터(7개 분야 실사진 + 랜딩 포인트).
//
// 과정이 7개(분야)뿐이라 슬라이드가 금방 끝나 버린다는 피드백(2026-10-27)으로, 각 분야 카드 아래에
// "그 분야에서 실제로 배우는 툴" 칩 행을 추가 — 과정 32개를 전부 눌러볼 수 있는 두 번째 경로를 연다.
// 카드(사진) 클릭 = 그 분야 대표 랜딩으로 바로, 툴 칩 클릭 = 그 툴을 쓰는 특정 과정으로, "전체과정 보기" =
// /courses?track=에서 그 분야만 필터링. 가짜 툴(레빗 등 실제로 안 가르치는 것)은 넣지 않는다 —
// lib/courses.ts의 실제 tools 필드에서 과정당 대표 툴 하나씩만 뽑아 쓴다(중복 툴은 첫 과정만).
function categoryTools(interest: CourseInterest) {
  const seen = new Set<string>();
  const result: { label: string; logo?: string; href: string }[] = [];
  for (const c of coursesByTrack(interest)) {
    const primary = splitTools(c.tools)[0];
    if (!primary || seen.has(primary.label.toLowerCase())) continue;
    seen.add(primary.label.toLowerCase());
    result.push({ ...primary, href: courseHref(c.slug) });
  }
  return result;
}

// 분야 카드를 누르면 뜨는 "배우는 툴" 팝업 — 전에는 캐러셀이 지금 보여주고 있는 카드가 바뀔 때마다(자동
// 재생·스와이프 포함) 하단 바가 계속 바뀌어 "내가 보고 싶은 과정이 아닌데도 계속 뜬다"는 불편함이
// 있었다(2026-10-27 피드백). PC는 클릭, 모바일은 터치 — 둘 다 같은 onClick 이벤트라 별도 분기가 필요
// 없다. 직접 누른 카드에 대해서만, 누른 순간에만 뜨고, 닫기 전까지 유지된다.
function CategoryToolModal({ menuKey, onClose }: { menuKey: MenuKey; onClose: () => void }) {
  const menu = menus.find((m) => m.key === menuKey)!;
  const tools = categoryTools(menu.interest);
  const landing = landingsByMenu(menu.key)[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div className="tool-modal-backdrop" onClick={onClose}>
      <div className="tool-modal-panel" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${menu.label}에서 배우는 툴`}>
        <div className="tool-modal-head">
          <span>{menu.label}에서 배우는 툴</span>
          <button type="button" className="tool-modal-close" aria-label="닫기" onClick={onClose}><X size={18} /></button>
        </div>
        <div className="tool-modal-grid">
          {tools.map((t) => (
            <Link key={t.href} href={t.href} className="tool-modal-item" onClick={onClose}>
              {t.logo ? <img src={t.logo} alt="" width={36} height={36} loading="lazy" /> : <span className="tool-modal-item-fallback">{t.label.slice(0, 2)}</span>}
              <span>{t.label}</span>
            </Link>
          ))}
        </div>
        <Link href={landing ? `/daejeon/${landing.slug}` : `/courses?track=${menu.interest}`} className="button button-primary full-button" onClick={onClose}>
          {menu.label} 전체과정 보기 <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}

function HeroCarousel() {
  const slides = menus.map((m) => {
    const landing = landingsByMenu(m.key)[0];
    return {
      key: m.key,
      href: landing ? `/daejeon/${landing.slug}` : "/courses",
      image: m.heroImage,
      kicker: m.label,
      headline: landing?.points[0] ?? m.label,
    };
  });
  const total = slides.length;
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [openKey, setOpenKey] = useState<MenuKey | null>(null);
  const pausedRef = useRef(false);
  // scrollTo(smooth)가 진행 중인 동안 중간 스크롤 위치마다 onScroll이 "가장 가까운 카드"를 다시 계산해
  // index를 되돌려 버리는 버그를 겪었다(점/화살표를 눌러도 항상 0번으로 복귀) — 프로그램이 직접 스크롤을
  // 거는 동안에는 onScroll의 index 보정을 잠시 꺼서 서로 되돌리는 피드백 루프를 끊는다.
  const scrollingRef = useRef(false);
  const scrollingTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // offsetLeft는 offsetParent 기준이라 track 자체의 스크롤 위치와 안 맞을 수 있다. 뷰포트 기준
  // getBoundingClientRect로 계산해야 정확하다.
  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    scrollingRef.current = true;
    clearTimeout(scrollingTimerRef.current);
    const delta = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
    track.scrollTo({ left: track.scrollLeft + delta, behavior: "smooth" });
    scrollingTimerRef.current = setTimeout(() => { scrollingRef.current = false; }, 600);
  };

  const goTo = (i: number) => { setIndex(i); scrollToIndex(i); };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => { if (!pausedRef.current) setIndex((i) => { const next = (i + 1) % total; scrollToIndex(next); return next; }); }, 4000);
    return () => clearInterval(timer);
  }, [total]);

  // 사용자가 직접 스와이프/드래그로 스크롤해도 점 표시가 따라가도록 현재 위치에 가장 가까운 카드를 추적
  // (프로그램이 건 스크롤이 진행 중일 때는 건너뛴다 — 위 설명 참고).
  const onScroll = () => {
    if (scrollingRef.current) return;
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    let closest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const d = Math.abs((child as HTMLElement).getBoundingClientRect().left - trackLeft);
      if (d < min) { min = d; closest = i; }
    });
    setIndex(closest);
  };

  return (
    <section
      className="hero-carousel-section"
      aria-label="분야별 과정 배너"
      onPointerEnter={() => (pausedRef.current = true)}
      onPointerLeave={() => (pausedRef.current = false)}
      onTouchStart={() => (pausedRef.current = true)}
    >
      <div className="hero-carousel-track" ref={trackRef} onScroll={onScroll}>
        {slides.map((s, i) => (
          <button
            key={s.key}
            type="button"
            className="hero-carousel-slide"
            onClick={() => setOpenKey(s.key)}
          >
            <img src={s.image} alt="" loading={i === 0 ? "eager" : "lazy"} fetchPriority={i === 0 ? "high" : "auto"} />
            <span className="hero-carousel-cta"><MousePointerClick size={13} /> 배우는 툴 보기</span>
            <div className="hero-carousel-overlay">
              <p className="hero-carousel-kicker">{s.kicker}</p>
              <p className="hero-carousel-headline">{s.headline}</p>
            </div>
          </button>
        ))}
      </div>
      <p className="hero-carousel-hint">카드를 눌러 분야별로 배우는 프로그램을 확인해보세요</p>
      <div className="container hero-carousel-controls">
        <button type="button" className="hero-carousel-arrow" aria-label="이전 분야" onClick={() => goTo((index - 1 + total) % total)}><ArrowLeft size={16} /></button>
        <div className="hero-carousel-dots">
          {slides.map((s, i) => (
            <button key={s.key} type="button" className={i === index ? "dot active" : "dot"} aria-label={`${s.kicker} 배너로 이동`} onClick={() => goTo(i)} />
          ))}
        </div>
        <button type="button" className="hero-carousel-arrow" aria-label="다음 분야" onClick={() => goTo((index + 1) % total)}><ArrowRight size={16} /></button>
      </div>
      {openKey && <CategoryToolModal menuKey={openKey} onClose={() => setOpenKey(null)} />}
    </section>
  );
}

// 히어로 바로 아래 분야별 바로가기 아이콘 행 — motemote.kr의 아이콘 숏컷 UX를 참고해, 실제 7개 분야
// 메뉴 + 국비지원·수강료 조회 페이지로 바로 연결. "실시간 랭킹"·할인 카운트다운처럼 실제 데이터가
// 없는 항목은 만들지 않는다(가짜 수치·거짓 긴급성 금지 원칙).
// 히어로 바로 아래 바로가기 — 원래는 실제 브랜드 로고(ToolGrid)가 한참 아래 "02 THE PROGRAM" 섹션에,
// 분야 아이콘(CategoryShortcuts)은 따로 히어로 바로 밑에 떨어져 있었다. "사람들이 누를 수 있게"
// 피드백(2026-10-27)으로 둘을 하나의 "바로가기" 섹션으로 합쳐 히어로 바로 아래 가장 눈에 띄는 자리로
// 이동 — 알아보기 쉬운 실제 툴 로고를 먼저, 분야·국비지원·수강료조회는 보조 줄로. THE PROGRAM 섹션의
// 중복 ToolGrid는 제거(아래 Home() 참고).
function QuickAccess() {
  return (
    <section className="quick-access" aria-label="바로가기">
      <div className="container">
        <div className="quick-access-group">
          <span className="quick-access-label">자주 찾는 프로그램 · 눌러서 바로 그 과정으로</span>
          <ToolGrid />
        </div>
        <div className="quick-access-group">
          <span className="quick-access-label">분야로 둘러보기</span>
          <nav className="category-shortcuts-row" aria-label="분야별 바로가기">
            {menus.map((m) => {
              const Icon = trackIcon[m.interest];
              const target = landingsByMenu(m.key)[0];
              return (
                <Link key={m.key} href={target ? `/daejeon/${target.slug}` : "/courses"} className="category-shortcut">
                  <span className="category-shortcut-icon"><Icon size={22} strokeWidth={1.5} /></span>
                  <span>{m.label}</span>
                </Link>
              );
            })}
            <Link href="/funding" className="category-shortcut">
              <span className="category-shortcut-icon"><Landmark size={22} strokeWidth={1.5} /></span>
              <span>국비지원</span>
            </Link>
            <Link href="/pricing" className="category-shortcut">
              <span className="category-shortcut-icon"><Calculator size={22} strokeWidth={1.5} /></span>
              <span>수강료 조회</span>
            </Link>
          </nav>
        </div>
        <div className="quick-access-group">
          <span className="quick-access-label">대표 프로그램</span>
          <FeaturedTools />
        </div>
      </div>
    </section>
  );
}

// 전체 교육과정 목록 — motemote.kr의 탭+번호 리스트 UI를 참고(2026-10-27)했지만, 실제 판매·조회 데이터가
// 없으므로 "랭킹"이 아니라 정직하게 "전체 과정 목록"으로 쓴다. 실제 lib/courses.ts 32개 과정 전부,
// 트랙 탭으로 필터링.
const directoryTracks: { key: CourseInterest | "all"; label: string }[] = [
  { key: "all", label: "전체" },
  { key: "graphic", label: trackLabels.graphic },
  { key: "motion", label: trackLabels.motion },
  { key: "cg", label: trackLabels.cg },
  { key: "interior", label: trackLabels.interior },
  { key: "ai", label: trackLabels.ai },
  { key: "drawing", label: trackLabels.drawing },
  { key: "cert", label: trackLabels.cert },
  { key: "it", label: trackLabels.it },
];

function CourseDirectory() {
  const [tab, setTab] = useState<CourseInterest | "all">("all");
  const list = tab === "all" ? allCourses : allCourses.filter((c) => c.track === tab);
  return (
    <section className="course-directory section-pad-small" aria-label="전체 교육과정 목록">
      <div className="container">
        <div className="section-kicker"><span>06</span><span>ALL COURSES</span></div>
        <h2>전체 교육과정<br /><em>한눈에 보기.</em></h2>
        <div className="directory-tabs" role="tablist" aria-label="분야 필터">
          {directoryTracks.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={tab === t.key}
              className={tab === t.key ? "directory-tab active" : "directory-tab"}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <ol className="directory-list">
          {list.map((c, i) => (
            <li key={c.slug}>
              <Link href={courseHref(c.slug)} className="directory-row">
                <span className="directory-index">{(i + 1).toString().padStart(2, "0")}</span>
                <span className="directory-title">{c.title}</span>
                <span className="directory-meta">{c.period} · {c.tools}</span>
                <ArrowUpRight size={15} />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
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
  const courseGridRef = useRef<HTMLDivElement>(null);
  // 모바일·태블릿 폭(≤1050px)에서는 course-grid가 세로로 안 쌓이고 옆으로 넘기는 슬라이더가 된다
  // (CSS에서 flex+overflow-x로 전환). 넓은 화면에서는 기존 그리드 그대로라 이 버튼은 숨겨진다.
  const scrollCourses = (dir: 1 | -1) => courseGridRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });
  return (
    <div>
      <HeroCarousel />

      <section className="hero-quickbar">
        <div className="container hero-quickbar-inner">
          <div className="hero-quickbar-text">
            <strong>포토샵부터 3D, 모션그래픽, AI 자동화까지.</strong>
            <span>배우는 순서가 결과의 밀도를 바꿉니다.</span>
          </div>
          <div className="hero-quickbar-actions">
            <button type="button" className="button button-primary" onClick={() => open({ sourcePage: "home-hero" })}>
              무료 상담 신청 <ArrowRight size={16} />
            </button>
            <QuickFeeForm sourcePage="home-hero-fee" />
          </div>
        </div>
      </section>

      <QuickAccess />

      <QuickBrowse />

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
            <div className="courses-section-arrows">
              <button type="button" className="icon-button" aria-label="이전 트랙" onClick={() => scrollCourses(-1)}><ArrowLeft size={18} /></button>
              <button type="button" className="icon-button" aria-label="다음 트랙" onClick={() => scrollCourses(1)}><ArrowRight size={18} /></button>
            </div>
          </div>
          <div className="course-grid" ref={courseGridRef}>
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

      <CourseDirectory />

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
