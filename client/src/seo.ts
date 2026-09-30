import { courses, trackLabels, getCourse } from "@/lib/courses";
import { resources } from "@/lib/resources";
import { courseLabels, getPortfolioItem, portfolioItems } from "@/lib/portfolio";

// 페이지별 SEO 메타 + JSON-LD 단일 원천. 빌드 시 프리렌더(scripts/prerender.mjs)와 클라이언트 이동(Seo.tsx)이 같이 쓴다.
// 도메인을 연결하면 SITE.url 한 줄만 바꾸면 사이트맵·canonical·JSON-LD가 전부 따라온다.
export const SITE = {
  name: "대전AI컴퓨터디자인학원",
  url: "https://cult-computer-academy.vercel.app",
  phone: "+82-42-719-8383",
  email: "privacy@koreaedugroup.com",
  street: "대덕대로 179, 9·10층 (둔산동)",
  locality: "대전광역시 서구",
};

export type PageMeta = { title: string; description: string; path: string; jsonld: object[]; noindex?: boolean };

const ORG_ID = `${SITE.url}/#organization`;
const organization = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: SITE.name,
  alternateName: "SBS아카데미AI학원 대전점",
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  address: { "@type": "PostalAddress", streetAddress: SITE.street, addressLocality: SITE.locality, addressCountry: "KR" },
};

const brand = (t: string) => `${t} | ${SITE.name}`;
const clip = (s: string, n = 150) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
const crumbs = (items: [string, string][]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: SITE.url + path })),
});

const staticMeta: Record<string, Omit<PageMeta, "path">> = {
  "/": {
    title: `${SITE.name} | 포토샵·일러스트·모션그래픽·CG·컴활`,
    description: "대전 둔산동 컴퓨터·디자인 학원. 포토샵·일러스트, 프리미어·애프터이펙트·C4D, ZBrush·Maya, CAD·스케치업, 컴활·AI 활용까지 과정 안내와 무료 상담.",
    jsonld: [organization],
  },
  "/blog": {
    title: brand("학습 자료실 · 포토샵 일러스트 모션 CG 팁"),
    description: "포토샵 레이어 정리, 일러스트레이터 벡터 감각, 프리미어·애프터 이펙트 작업 흐름, ZBrush, CAD, AI 자동화까지 단계별 팁과 체크리스트를 모았습니다.",
    jsonld: [crumbs([["홈", "/"], ["자료실", "/blog"]])],
  },
  "/about": {
    title: brand("학원 안내"),
    description: "대전 서구 둔산동 학원 안내. 툴 사용법이 아니라 결과물 중심으로 그래픽, 모션, CG, 인테리어, 자격증과 AI 활용 과정을 운영합니다.",
    jsonld: [organization, crumbs([["홈", "/"], ["학원 안내", "/about"]])],
  },
  "/pricing": {
    title: brand("수강 안내 · 수강료 조회 및 무료 상담"),
    description: "디자인·모션, CG·인테리어, 자격증·AI 트랙 수강 안내. 이름과 연락처만 남기면 수강료를 안내해 드립니다.",
    jsonld: [crumbs([["홈", "/"], ["수강 안내", "/pricing"]])],
  },
  "/privacy": {
    title: brand("개인정보처리방침"),
    description: `${SITE.name}의 개인정보 수집·이용 및 처리 방침 안내.`,
    jsonld: [],
  },
};

export function getMeta(path: string): PageMeta {
  const p = path.split("?")[0].split("#")[0].replace(/(.)\/$/, "$1");
  if (staticMeta[p]) return { ...staticMeta[p], path: p };

  const blog = p.match(/^\/blog\/([^/]+)$/);
  const r = blog && resources.find((x) => x.id === blog[1]);
  if (r) {
    return {
      path: p,
      title: brand(r.title),
      description: clip(r.excerpt + " " + r.steps.map((s) => s.title).join(", ")),
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: r.title,
          description: r.excerpt,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          mainEntityOfPage: SITE.url + p,
        },
        crumbs([["홈", "/"], ["자료실", "/blog"], [r.title, p]]),
      ],
    };
  }

  const cm = p.match(/^\/course\/([^/]+)$/);
  const course = cm && getCourse(cm[1]);
  if (course) {
    const desc = `${course.title} 수강 안내. ${course.tagline} ${course.period} · ${course.tools}. 커리큘럼과 무료 상담.`;
    return {
      path: p,
      title: brand(`${course.title} · 대전 ${trackLabels[course.track]} 과정`),
      description: clip(desc),
      jsonld: [
        {
          "@context": "https://schema.org",
          "@type": "Course",
          name: course.title,
          description: course.tagline,
          provider: { "@id": ORG_ID },
          url: SITE.url + p,
        },
        crumbs([["홈", "/"], [trackLabels[course.track], "/#courses"], [course.title, p]]),
      ],
    };
  }

  const pf = p.match(/^\/portfolio\/([^/]+)$/);
  const item = pf && getPortfolioItem(pf[1]);
  if (item) {
    return {
      path: p,
      title: brand(`${courseLabels[item.course].label} 수강생 작품 · ${item.title}`),
      description: clip(item.intro.replace(/\s+/g, " ")),
      jsonld: [crumbs([["홈", "/"], [courseLabels[item.course].label, "/#courses"], [item.title, p]])],
    };
  }

  return { path: p, title: brand("페이지를 찾을 수 없습니다"), description: "요청하신 페이지를 찾을 수 없습니다.", jsonld: [], noindex: true };
}

export const allRoutes = (): string[] => [
  ...Object.keys(staticMeta),
  ...resources.map((r) => `/blog/${r.id}`),
  ...courses.map((c) => `/course/${c.slug}`),
  ...portfolioItems.map((i) => `/portfolio/${i.id}`),
];
