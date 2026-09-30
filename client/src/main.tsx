import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 프리렌더된 HTML(빌드 결과)이 있으면 이어붙이고(hydrate), 개발 서버처럼 비어 있으면 새로 그린다.
const root = document.getElementById("root")!;
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
