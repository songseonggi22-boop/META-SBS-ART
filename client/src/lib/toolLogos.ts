// 과정 소개의 "학습 도구"가 전부 글자로만 나열돼 있어 텍스트가 빽빽해 보인다는 피드백(2026-10-26)으로
// 추가한 3D 아이콘 로고 — 사용자가 제공한 로고 세트(client/public/tool-logos/, 원본: 프로젝트 루트
// `3d 로고/` 폴더, 재배포 전용 자체 제작 아이콘) 중 실제 운영 중인 과정 도구에 맞는 것만 추려 썼다.
//
// 아래 4개(python/html5/n8n/clip-studio-paint)는 각 브랜드의 공식 배포처에서 직접 받은 로고다(2026-10-26
// 구글 검색으로 공식 가이드라인 확인 후 추가):
// - python: python.org/static/community_logos (파이썬 공식 사이트 자체 배포, 자유 사용)
// - html5: w3.org/html/logo (W3C 공식 HTML5 로고, CC BY 3.0)
// - n8n: github.com/n8n-io/n8n (n8n 오픈소스 저장소 자체 배포 에셋)
// - clip-studio-paint: clipstudio.net 공식 프레스 에셋 페이지
// 반대로 제외한 것: ChatGPT/OpenAI·Claude/Anthropic(가이드라인이 조건부·비공식 소스라 애매해 보류),
// Microsoft Excel/Access(정식 라이선스 계약 필요), Procreate(서면 동의 필요), Java 커피컵 로고(유료
// 라이선스 필요 — Duke 마스코트는 BSD 라이선스로 자유 사용 가능하지만 인지도가 낮아 보류). 매칭되는
// 로고가 없는 도구는 그냥 글자 칩으로 남는다 — 가짜 로고를 만들어 붙이지 않는다.
export const toolLogos: Record<string, string> = {
  photoshop: "/tool-logos/photoshop.png",
  illustrator: "/tool-logos/illustrator.png",
  premiere: "/tool-logos/premiere.png",
  "premiere pro": "/tool-logos/premiere.png",
  "after effects": "/tool-logos/after-effects.png",
  "after-effects": "/tool-logos/after-effects.png",
  에펙: "/tool-logos/after-effects.png",
  indesign: "/tool-logos/indesign.png",
  인디자인: "/tool-logos/indesign.png",
  autocad: "/tool-logos/autocad.png",
  오토캐드: "/tool-logos/autocad.png",
  sketchup: "/tool-logos/sketchup.png",
  "sketchup pro": "/tool-logos/sketchup.png",
  스케치업: "/tool-logos/sketchup.png",
  "3ds max": "/tool-logos/3dsmax.png",
  "3dsmax": "/tool-logos/3dsmax.png",
  maya: "/tool-logos/maya.png",
  마야: "/tool-logos/maya.png",
  blender: "/tool-logos/blender.png",
  블렌더: "/tool-logos/blender.png",
  python: "/tool-logos/python.png",
  파이썬: "/tool-logos/python.png",
  html5: "/tool-logos/html5.png",
  html: "/tool-logos/html5.png",
  n8n: "/tool-logos/n8n.png",
  "clip studio paint": "/tool-logos/clip-studio-paint.png",
  "clip-studio-paint": "/tool-logos/clip-studio-paint.png",
  클립스튜디오: "/tool-logos/clip-studio-paint.png",
  "클립 스튜디오": "/tool-logos/clip-studio-paint.png",
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
