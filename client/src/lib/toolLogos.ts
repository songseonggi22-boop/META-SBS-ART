// 과정 소개의 "학습 도구"가 전부 글자로만 나열돼 있어 텍스트가 빽빽해 보인다는 피드백(2026-10-26)으로
// 추가한 3D 아이콘 로고 — 사용자가 제공한 로고 세트(client/public/tool-logos/, 원본: 프로젝트 루트
// `3d 로고/` 폴더, 재배포 전용 자체 제작 아이콘) 중 실제 운영 중인 과정 도구에 맞는 것만 추려 썼다.
// 매칭되는 로고가 없는 도구(ChatGPT·Claude·컴활·Python 등)는 그냥 글자 칩으로 남는다 — 가짜 로고를
// 만들어 붙이지 않는다.
export const toolLogos: Record<string, string> = {
  photoshop: "/tool-logos/photoshop.png",
  illustrator: "/tool-logos/illustrator.png",
  premiere: "/tool-logos/premiere.png",
  "premiere pro": "/tool-logos/premiere.png",
  "after effects": "/tool-logos/after-effects.png",
  에펙: "/tool-logos/after-effects.png",
  indesign: "/tool-logos/indesign.png",
  인디자인: "/tool-logos/indesign.png",
  autocad: "/tool-logos/autocad.png",
  오토캐드: "/tool-logos/autocad.png",
  sketchup: "/tool-logos/sketchup.png",
  스케치업: "/tool-logos/sketchup.png",
  "3ds max": "/tool-logos/3dsmax.png",
  "3dsmax": "/tool-logos/3dsmax.png",
  maya: "/tool-logos/maya.png",
  마야: "/tool-logos/maya.png",
  blender: "/tool-logos/blender.png",
  블렌더: "/tool-logos/blender.png",
};

// "Photoshop, Illustrator, InDesign, GTQ" 같은 콤마/가운뎃점 구분 문자열을 토큰으로 쪼개, 로고가 있으면
// 매칭해 함께 돌려준다. 순서는 원문 그대로 유지.
export function splitTools(tools: string): { label: string; logo?: string }[] {
  return tools
    .split(/[,·]/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((label) => ({ label, logo: toolLogos[label.toLowerCase()] }));
}
