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
  return null;
}
