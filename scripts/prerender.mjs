// 빌드 후 실행: 라우트마다 정적 HTML(본문+메타+JSON-LD)을 만들고 sitemap.xml·404.html을 생성한다.
// 크롤러(네이버 Yeti 등)가 자바스크립트 없이도 본문을 읽게 하는 것이 목적.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist/public");
const { render, allRoutes, getMeta, SITE } = await import(pathToFileURL(path.resolve("dist/server/entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

function page(url) {
  const m = getMeta(url);
  const head = [
    `<meta name="description" content="${esc(m.description)}" />`,
    m.noindex ? `<meta name="robots" content="noindex" />` : `<link rel="canonical" href="${SITE.url}${m.path}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="ko_KR" />`,
    `<meta property="og:site_name" content="${esc(SITE.name)}" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${SITE.url}${m.path}" />`,
    ...m.jsonld.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\u003c")}</script>`),
  ].join("\n    ");
  return template
    .replace(/<title>.*?<\/title>/, `<title>${esc(m.title)}</title>`)
    .replace("<!--seo-head-->", head)
    .replace('<div id="root"></div>', `<div id="root">${render(url)}</div>`);
}

const routes = allRoutes();
for (const url of routes) {
  const out = url === "/" ? path.join(dist, "index.html") : path.join(dist, url, "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(url));
}
fs.writeFileSync(path.join(dist, "404.html"), page("/404"));

const today = new Date().toISOString().slice(0, 10);
const urls = routes.filter((u) => u !== "/privacy").map((u) => `  <url><loc>${SITE.url}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`);
fs.writeFileSync(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
console.log(`prerendered ${routes.length} routes + 404.html + sitemap.xml`);
