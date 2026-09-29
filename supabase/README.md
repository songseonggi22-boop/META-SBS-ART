# Supabase 연동 설정 (상담 신청 폼)

이 사이트는 정적 SPA(Vite)라 서버가 없습니다. 상담 신청 폼(전역 상담 모달)은 브라우저에서 Supabase에
**직접** 데이터를 저장하고, 저장되는 순간 텔레그램으로 알림이 오도록 구성합니다. (evawacademy.com 사이트의
[[홈페이지-상담폼-supabase-telegram연동]]과 동일한 구조.)

## 0. 아직 Supabase 프로젝트가 없다면

이 학원(SBS아카데미AI학원)은 애견미용학원(evawacademy.com)과 별개 사업이므로, **그 프로젝트와 같은
Supabase 프로젝트를 공유하지 말고 새 프로젝트를 하나 더 만드세요** (supabase.com 대시보드 → New project).

## 1. 테이블 만들기

Supabase 대시보드 → SQL Editor → `schema.sql` 내용을 그대로 붙여넣고 실행.

## 2. 텔레그램 알림 연결

1. 텔레그램 앱에서 `@BotFather` 검색 → `/newbot` → 이름 정하면 **봇 토큰**을 줍니다 (숫자:영문 조합).
2. 방금 만든 봇에게 텔레그램으로 아무 메시지나 한 번 보냅니다 (봇과 대화를 시작해야 chat_id를 알 수 있음).
3. 브라우저에서 `https://api.telegram.org/bot<봇토큰>/getUpdates` 접속 → 응답 JSON에서 `"chat":{"id": 숫자}` 값을 복사 (이게 **chat_id**).
4. `telegram-notify.sql`을 열어 `REPLACE_WITH_BOT_TOKEN`, `REPLACE_WITH_CHAT_ID_1`(필요하면 `_2`도) 자리를 방금 값으로 채운 뒤, SQL Editor에서 실행.
5. 파일 맨 아래 주석의 테스트 insert문 주석을 풀고 한 번 실행해서 텔레그램으로 알림이 오는지 확인.

## 3. 사이트에 연결 키 넣기 (anon key)

1. Supabase 대시보드 → Project Settings → API → **anon / public** key 복사 (service_role 키 절대 아님 — 그건 공개되면 안 됨).
2. `.env.example`을 `.env.local`로 복사하고 `VITE_SUPABASE_URL`·`VITE_SUPABASE_ANON_KEY`에 채워 넣기.
3. 로컬 확인: `pnpm dev` → 상담 모달 제출 → Supabase Table Editor에서 행 생성 확인 + 텔레그램 알림 확인.
4. **실제 배포 시에도 반드시 등록**: 배포 플랫폼(Vercel 등) 프로젝트 설정 → Environment Variables 에
   `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` 두 개를 동일하게 추가 → 재배포.
   (빌드 시점에 값이 파일에 박혀 들어갑니다 — 값 바뀌면 재배포 필요.)

## 보안 메모

- `VITE_SUPABASE_ANON_KEY`는 브라우저 코드에 그대로 노출됩니다 — 이건 정상입니다(Supabase가 그렇게 설계됨).
  안전한 이유는 `schema.sql`에서 Row Level Security를 켜고 **insert만** 허용했기 때문 — 이 anon key로는
  다른 사람의 상담 신청 내역을 조회·수정·삭제할 수 없습니다.
- 텔레그램 봇 토큰은 `telegram-notify.sql` 안의 데이터베이스 함수에 저장됩니다 — 이건 SQL Editor 접근 권한이
  있는 프로젝트 소유자만 볼 수 있고, 사이트 코드(클라이언트)에는 전혀 노출되지 않습니다.
