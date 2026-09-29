# CULT Computer Academy — Claude Code Handoff

## 프로젝트 개요

기존 `cult-polar-starter.vercel.app`의 라우팅과 외부 링크 구조를 참고해 제작한 컴퓨터학원 웹사이트입니다. 메인, 자료실, 학원 안내, 수강 안내, 인증/체크아웃 경로를 포함합니다.

## 실행 방법

```bash
pnpm install
pnpm dev
```

기본 개발 서버는 `http://localhost:3000`에서 실행됩니다.

## 검증 명령

```bash
pnpm check
pnpm build
```

## 주요 파일

- `client/src/App.tsx` — 전체 라우팅
- `client/src/components/SiteShell.tsx` — 공통 헤더와 대전지점 공식 푸터
- `client/src/pages/Home.tsx` — 메인 페이지
- `client/src/pages/Resources.tsx` — 자료실 검색·필터·복사 기능
- `client/src/pages/InfoPages.tsx` — 학원 안내, 수강 안내, 인증, 체크아웃, 문서, 약관 페이지
- `client/src/index.css` — 전체 디자인 토큰, 반응형 레이아웃, 애니메이션
- `client/index.html` — 문서 메타와 폰트 설정

## 유지해야 하는 주요 경로

- `/`
- `/blog` — 자료실
- `/about`
- `/pricing`
- `/auth/login`
- `/auth/sign-up`
- `/checkout`
- `/docs`
- `/terms`
- `/404`

## 현재 구현된 기능

- Photoshop / Illustrator
- Premiere / After Effects / C4D
- ZBrush / Rigging / Animation / Maya
- CAD / SketchUp / 3ds Max / Enscape
- 컴활 / Vibe Coding / Agent / Automation
- 자료실 카테고리 필터
- 자료 검색
- 자료 제목 복사 버튼
- 상담 폼 성공 상태
- 다크 모드
- 모바일 메뉴
- `prefers-reduced-motion` 대응
- 대전지점 공식 푸터의 대표전화·이메일 링크

## 공식 푸터 정보

첨부된 실제 푸터 기준으로 다음 내용을 반영했습니다.

- 대전광역시 서구 대덕대로 179, 9·10층
- 주식회사 에스씨에이아카데미대전
- 대표 오도윤
- 개인정보책임자 오도윤
- 교육담당 송성기
- 사업자등록번호 822-81-00224
- 통신판매업번호 제2015-대전서구-0647 호
- 학원명 SBS아카데미AI학원
- 학원등록번호 대전서부 제서4019호
- 대표전화 042-719-8383
- 대표이메일 privacy@koreaedugroup.com
- 강남, 홍대, 인천, 부산, 대구, 대전, 광주, 수원, 일산, 울산, 노원, 분당, 종로(혜화), 안산, 안양, 천안, 청주

## Claude Code에게 전달할 작업 원칙

1. 기존 라우트와 외부 링크를 삭제하거나 임의로 변경하지 않습니다.
2. `client/src/components/SiteShell.tsx`의 공식 푸터 문구는 사용자 확인 없이 바꾸지 않습니다.
3. `client/src/index.css`의 모바일 브레이크포인트와 `prefers-reduced-motion` 규칙을 유지합니다.
4. 확인되지 않은 수강 후기, 수치, 로고, 학원 기능을 새로 만들지 않습니다.
5. 변경 후 반드시 다음을 실행합니다.

```bash
pnpm check
pnpm build
```

6. 데스크톱 1440px, 모바일 390px에서 가로 스크롤과 텍스트 잘림을 확인합니다.
