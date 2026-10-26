import { splitTools } from "@/lib/toolLogos";

// 글자로만 나열되던 "학습 도구"를 로고 칩 줄로 바꿔서 텍스트 밀도를 낮춘다. 로고가 없는 도구는
// 기존처럼 글자 칩으로 표시(가짜 로고 생성 금지).
export default function ToolRow({ tools }: { tools: string }) {
  const items = splitTools(tools);
  return (
    <ul className="tool-row">
      {items.map((t) => (
        <li key={t.label} className={t.logo ? "tool-chip has-logo" : "tool-chip"}>
          {t.logo && <img src={t.logo} alt="" width={22} height={22} loading="lazy" />}
          {t.label}
        </li>
      ))}
    </ul>
  );
}
