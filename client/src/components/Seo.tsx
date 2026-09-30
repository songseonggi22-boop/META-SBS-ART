import { useEffect } from "react";
import { useLocation } from "wouter";
import { getMeta, SITE } from "@/seo";

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

// 프리렌더된 첫 화면 이후, 클라이언트 이동(SPA)에서도 제목·설명·canonical·JSON-LD를 페이지에 맞게 갱신한다.
export default function Seo() {
  const [location] = useLocation();
  useEffect(() => {
    const m = getMeta(location);
    document.title = m.title;
    setMeta('meta[name="description"]', "name", "description", m.description);
    setMeta('meta[property="og:title"]', "property", "og:title", m.title);
    setMeta('meta[property="og:description"]', "property", "og:description", m.description);
    setMeta('meta[property="og:url"]', "property", "og:url", SITE.url + m.path);
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = SITE.url + m.path;
    document.head.querySelectorAll('script[type="application/ld+json"]').forEach((n) => n.remove());
    m.jsonld.forEach((obj) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [location]);
  // 페이지 이동 시 항상 화면 맨 위에서 시작 (해시 링크는 해당 섹션으로). 이전 페이지의 스크롤 위치가 남지 않게 한다.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView({ behavior: "instant" as ScrollBehavior }));
    else {
      // html { scroll-behavior: smooth } 때문에 이동 후 스크롤이 천천히 올라오지 않도록 잠시 끄고 즉시 맨 위로.
      const root = document.documentElement;
      root.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      requestAnimationFrame(() => requestAnimationFrame(() => (root.style.scrollBehavior = "")));
    }
  }, [location]);

  // 같은 페이지 안의 해시 링크("/#courses")는 경로가 안 바뀌어 위 효과가 돌지 않으므로 클릭 시 직접 스크롤한다.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const href = (e.target as Element).closest?.("a")?.getAttribute("href") ?? "";
      const id = href.match(/^\/?#(.+)$/)?.[1];
      if (id) setTimeout(() => document.getElementById(decodeURIComponent(id))?.scrollIntoView({ behavior: "smooth" }), 0);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
