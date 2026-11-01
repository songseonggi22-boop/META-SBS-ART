import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Box,
  Check,
  Code2,
  Cuboid,
  FileImage,
  Layers3,
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
import { SITE } from "@/seo";
import {
  HOTDEAL_STARTS_AT,
  HOTDEAL_DURATION_HOURS,
  SUPPORT_PERCENT,
  SEAT_LIMIT,
  SEATS_TAKEN,
  SEATS_UPDATED_AT,
  NOTICE as HOTDEAL_NOTICE,
  CTA_LABEL_OPEN as HOTDEAL_CTA_OPEN,
  CTA_LABEL_CLOSED as HOTDEAL_CTA_CLOSED,
  hotDealItems,
} from "@/data/hotdeal";
import {
  RANKING_UPDATED_AT,
  courseRankingCategories,
  certRankingCategories,
  courseRanking,
  certRanking,
  type CourseRankingCategory,
  type CertRankingCategory,
  type CourseRankingItem,
  type CertRankingItem,
  type RankChange,
} from "@/data/ranking";

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

// 히어로 바로 아래 바로가기 — 실제 툴 로고(ToolGrid)+대표 프로그램만 남긴다(2026-10-28). 원래 여기
// 있던 "분야로 둘러보기" 7개 분야 아이콘 행은 사용자 지적으로 제거 — 히어로 캐러셀(분야별 7슬라이드)·
// 헤더 "교육과정" 메가메뉴와 내용이 그대로 겹쳐 히어로 바로 아래가 무거워지기만 했다. 분야별 랜딩
// 링크 자체는 없애지 않고 사람들이 실제로 찾아볼 법한 자리인 푸터로 옮겼다(SiteShell.tsx 참고).
function QuickAccess() {
  return (
    <section className="quick-access" aria-label="바로가기">
      <div className="container">
        <div className="quick-access-group">
          <span className="quick-access-label">자주 찾는 프로그램 · 눌러서 바로 그 과정으로</span>
          <ToolGrid />
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

// "100시간 한정 수강료 지원" 섹션 — 참고 사이트(motemote.kr)의 HOT DEAL 섹션 구조(배지·카운트다운·
// 잔여인원·카드 슬라이더)만 참고해 우리 스타일로 새로 작성(2026-11-01). 이전 "04 HOW WE WORK"
// method-section 자리를 그대로 대체 — 뒤따르는 05 RESOURCE ROOM·06 ALL COURSES 번호는 안 바꿔도 된다
// (이 섹션은 번호 대신 HOT DEAL 배지가 그 자리를 대신한다). 데이터는 전부 client/src/data/hotdeal.ts
// 고정값 — 서버·API 연동 없음, 그 파일만 고치면 반영된다.
const HOTDEAL_STARTS_MS = new Date(HOTDEAL_STARTS_AT).getTime();
const HOTDEAL_ENDS_MS = HOTDEAL_STARTS_MS + HOTDEAL_DURATION_HOURS * 3600 * 1000;
const HOTDEAL_SEATS_TAKEN = Math.min(Math.max(SEATS_TAKEN, 0), SEAT_LIMIT);
const HOTDEAL_SEATS_LEFT = SEAT_LIMIT - HOTDEAL_SEATS_TAKEN;
const HOTDEAL_SEATS_FULL = HOTDEAL_SEATS_TAKEN >= SEAT_LIMIT;

type HotDealPhase = "loading" | "upcoming" | "open" | "closed";

// SSR 프리렌더 시각과 방문자가 실제로 보는 시각이 다르므로, 마운트 전(서버 렌더·첫 클라이언트 페인트)에는
// 항상 같은 "loading" 플레이스홀더만 보여주고 useEffect에서 실제 남은 시간을 계산해 넣는다 — 이 프로젝트가
// 다크모드 초기값을 항상 라이트로 두는 것과 같은 방식(SiteShell.tsx), 깜빡임 없이 하이드레이션 안전.
function useHotDealPhase(): { phase: HotDealPhase; remainingMs: number } {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return { phase: "loading", remainingMs: 0 };
  if (HOTDEAL_SEATS_FULL || now >= HOTDEAL_ENDS_MS) return { phase: "closed", remainingMs: 0 };
  if (now < HOTDEAL_STARTS_MS) return { phase: "upcoming", remainingMs: HOTDEAL_STARTS_MS - now };
  return { phase: "open", remainingMs: HOTDEAL_ENDS_MS - now };
}

// "D-4 04:00:00"(일 / 시:분:초) 형식.
function formatHotDealCountdown(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `D-${days} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function HotDealCards() {
  const trackRef = useRef<HTMLDivElement>(null);
  const showArrows = hotDealItems.length > 3;
  const scroll = (dir: 1 | -1) => trackRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <div className="hotdeal-cards">
      <div className="hotdeal-cards-track" ref={trackRef}>
        {hotDealItems.map((item) => (
          <Link key={item.link} href={item.link} className="hotdeal-card">
            {item.image ? (
              <span className="hotdeal-card-media"><img src={item.image} alt="" loading="lazy" /></span>
            ) : (
              <span className="hotdeal-card-media hotdeal-card-media-empty" aria-hidden="true" />
            )}
            <span className="hotdeal-card-body">
              <span className="hotdeal-card-info">
                <span className="hotdeal-card-category">{item.category}</span>
                <strong className="hotdeal-card-title">{item.title}</strong>
                <span className="hotdeal-card-period">{item.period} · 수강료 {SUPPORT_PERCENT}% 지원</span>
              </span>
              <span className="hotdeal-card-percent">{SUPPORT_PERCENT}%</span>
            </span>
          </Link>
        ))}
      </div>
      {showArrows && (
        <div className="hotdeal-cards-arrows">
          <button type="button" className="icon-button" aria-label="이전" onClick={() => scroll(-1)}><ArrowLeft size={18} /></button>
          <button type="button" className="icon-button" aria-label="다음" onClick={() => scroll(1)}><ArrowRight size={18} /></button>
        </div>
      )}
    </div>
  );
}

function HotDealSection() {
  const { open } = useConsultModal();
  const { phase, remainingMs } = useHotDealPhase();
  const badgeLabel = phase === "upcoming" ? "오픈 예정" : phase === "closed" ? "마감" : "HOT DEAL";
  const ctaLabel = phase === "closed" ? HOTDEAL_CTA_CLOSED : HOTDEAL_CTA_OPEN;
  const seatsPercent = (HOTDEAL_SEATS_TAKEN / SEAT_LIMIT) * 100;

  return (
    <section className="hotdeal-section" aria-label="수강료 지원 행사">
      <div className="container hotdeal-grid">
        <div className="hotdeal-left">
          <span className={phase === "closed" ? "hotdeal-badge hotdeal-badge-closed" : "hotdeal-badge"}>{badgeLabel}</span>
          <h2 className="hotdeal-title">{HOTDEAL_DURATION_HOURS}시간 한정!<br />수강료 {SUPPORT_PERCENT}% 지원, 선착순 {SEAT_LIMIT}명</h2>
          <p className="hotdeal-countdown" aria-live="off">{formatHotDealCountdown(remainingMs)}</p>
          <div className="hotdeal-seats">
            <p className="hotdeal-seats-text">선착순 {SEAT_LIMIT}명 · 남은 자리 {HOTDEAL_SEATS_LEFT} / {SEAT_LIMIT}</p>
            <div
              className="hotdeal-progress-track"
              role="progressbar"
              aria-valuenow={HOTDEAL_SEATS_TAKEN}
              aria-valuemin={0}
              aria-valuemax={SEAT_LIMIT}
              aria-label="접수 인원"
            >
              <div className="hotdeal-progress-fill" style={{ width: `${seatsPercent}%` }} />
            </div>
            <p className="hotdeal-updated">접수 현황 업데이트 {SEATS_UPDATED_AT}</p>
          </div>
          <button type="button" className="button button-light hotdeal-cta" onClick={() => open({ sourcePage: "home-hotdeal" })}>
            {ctaLabel} <ArrowRight size={16} />
          </button>
          <p className="hotdeal-notice">{HOTDEAL_NOTICE}</p>
          <Link href="/about" className="hotdeal-about-link">학원 안내 보기 <ArrowUpRight size={14} /></Link>
        </div>
        <HotDealCards />
      </div>
    </section>
  );
}

// "이번 주 랭킹" 섹션 — 참고 사이트(motemote.kr)의 "실시간 주간 랭킹" 구조(토글+카테고리 칩+2열 순위
// 목록)만 참고해 우리 스타일로 새로 작성(2026-11-01). 이전 "01 WHY US" intro-section 자리를 그대로
// 대체 — section-kicker 클래스 자체는 다른 섹션(02/03/06 등)에서 계속 쓰므로 CSS는 그대로 두되, 이
// 섹션은 번호 배지를 쓰지 않는 디자인이라 마크업에서 쓰지 않는다. 데이터는 client/src/data/ranking.ts
// 고정값 — 서버·API 연동 없음, 전부 화면 구성을 보여주기 위한 더미(예시) 데이터(제목 끝 "(예시)").
function RankingThumb({ src }: { src: string }) {
  const [broken, setBroken] = useState(false);
  if (!src || broken) return <span className="ranking-row-thumb ranking-row-thumb-empty" aria-hidden="true" />;
  return (
    <span className="ranking-row-thumb">
      <img src={src} alt="" loading="lazy" onError={() => setBroken(true)} />
    </span>
  );
}

function RankingChangeBadge({ change, value }: { change: RankChange; value?: number }) {
  if (change === "new") return <span className="ranking-change ranking-change-new">NEW</span>;
  if (change === "same") return <span className="ranking-change ranking-change-same">-</span>;
  if (change === "up") return <span className="ranking-change ranking-change-up">▲{value ?? ""}</span>;
  return <span className="ranking-change ranking-change-down">▼{value ?? ""}</span>;
}

function CourseRankingRow({ item }: { item: CourseRankingItem }) {
  const body = (
    <>
      <span className="ranking-row-rank">{item.rank}</span>
      <RankingThumb src={item.image} />
      <span className="ranking-row-info">
        <strong className="ranking-row-title">{item.title}</strong>
        <span className="ranking-row-meta">{item.period} · 수강생 {item.students}명</span>
      </span>
    </>
  );
  if (!item.link) return <div className="ranking-row ranking-row-static" aria-disabled="true">{body}</div>;
  return <Link href={item.link} className="ranking-row">{body}</Link>;
}

function CertRankingRow({ item }: { item: CertRankingItem }) {
  const body = (
    <>
      <span className="ranking-row-rank">{item.rank}</span>
      <RankingThumb src={item.image} />
      <span className="ranking-row-info">
        <strong className="ranking-row-title">{item.title}</strong>
        <RankingChangeBadge change={item.change} value={item.changeValue} />
      </span>
    </>
  );
  if (!item.link) return <div className="ranking-row ranking-row-static" aria-disabled="true">{body}</div>;
  return <Link href={item.link} className="ranking-row">{body}</Link>;
}

function RankingSection() {
  const [mode, setMode] = useState<"course" | "cert">("course");
  const [courseCategory, setCourseCategory] = useState<CourseRankingCategory>("전체");
  const [certCategory, setCertCategory] = useState<CertRankingCategory>("전체");

  const categories = mode === "course" ? courseRankingCategories : certRankingCategories;
  const activeCategory = mode === "course" ? courseCategory : certCategory;

  return (
    <section className="ranking-section section-pad">
      <div className="container">
        <div className="ranking-head">
          <h2>이번 주 인기 강의 · 자격증 순위</h2>
          <span className="ranking-updated">{RANKING_UPDATED_AT} 기준</span>
        </div>

        <div className="ranking-toggle" role="tablist" aria-label="순위 종류">
          <button
            type="button"
            role="tab"
            aria-selected={mode === "course"}
            className={mode === "course" ? "ranking-toggle-btn active" : "ranking-toggle-btn"}
            onClick={() => setMode("course")}
          >
            인기 강의
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "cert"}
            className={mode === "cert" ? "ranking-toggle-btn active" : "ranking-toggle-btn"}
            onClick={() => setMode("cert")}
          >
            자격증 순위
          </button>
        </div>

        <div className="ranking-chips" role="tablist" aria-label="카테고리">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={activeCategory === c}
              className={activeCategory === c ? "ranking-chip active" : "ranking-chip"}
              onClick={() => (mode === "course" ? setCourseCategory(c as CourseRankingCategory) : setCertCategory(c as CertRankingCategory))}
            >
              {c}
            </button>
          ))}
        </div>

        <div
          className="ranking-panel"
          role="tabpanel"
          aria-label={`${mode === "course" ? "인기 강의" : "자격증"} ${activeCategory} 순위`}
        >
          {/* key가 바뀔 때마다 새로 마운트되며 아래 CSS 애니메이션(translateX, ease-out)이 다시 실행된다
              — 칩/토글을 누르면 목록이 슬라이드로 전환되는 효과(2026-11-01, 새 라이브러리 없이 CSS만). */}
          <div className="ranking-slide" key={`${mode}-${activeCategory}`}>
            <div className="ranking-columns">
              {mode === "course" ? (
                <>
                  <ol className="ranking-column">
                    {courseRanking[courseCategory].slice(0, 5).map((item) => (
                      <li key={item.rank}><CourseRankingRow item={item} /></li>
                    ))}
                  </ol>
                  <ol className="ranking-column">
                    {courseRanking[courseCategory].slice(5, 10).map((item) => (
                      <li key={item.rank}><CourseRankingRow item={item} /></li>
                    ))}
                  </ol>
                </>
              ) : (
                <>
                  <ol className="ranking-column">
                    {certRanking[certCategory].slice(0, 5).map((item) => (
                      <li key={item.rank}><CertRankingRow item={item} /></li>
                    ))}
                  </ol>
                  <ol className="ranking-column">
                    {certRanking[certCategory].slice(5, 10).map((item) => (
                      <li key={item.rank}><CertRankingRow item={item} /></li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
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
      {/* 히어로가 분야별로 돌아가는 캐러셀이라 고정된 큰 타이틀을 둘 자리가 없다 — 모트모트 홈도 같은
          이유로 sr-only h1을 쓴다(2026-10-27, H1 누락 지적으로 추가). 시각 디자인은 그대로 두고
          검색엔진·스크린리더용 페이지 제목만 명확히 한다. */}
      <h1 className="sr-only">{SITE.name} — 포토샵·일러스트·모션그래픽·CG·컴활·AI 활용 교육</h1>
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

      <RankingSection />

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

      <HotDealSection />

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

      <PortfolioShowcase />

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
