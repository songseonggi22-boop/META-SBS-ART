import { renderToString } from "react-dom/server";
import { Router } from "wouter";
import App from "./App";

// 빌드 시 프리렌더 전용 진입점 — scripts/prerender.mjs 가 라우트별로 호출해 정적 HTML을 만든다.
export const render = (url: string) =>
  renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>
  );

export { allRoutes, getMeta, SITE } from "./seo";
