-- SBS아카데미AI학원 대전점(cult-computer-academy) — 상담 신청 테이블
-- Supabase 대시보드 > SQL Editor 에서 이 파일 내용을 그대로 실행하세요.
-- (이 사이트는 정적 SPA(Vite)라 서버가 없음 — 브라우저가 anon key로 직접 insert함.
--  그래서 RLS를 반드시 켜고 "insert만" 허용해야 함. select/update/delete는 전부 막아서
--  한 방문자가 다른 방문자의 상담 신청 내역을 볼 수 없게 함 — 관리자는 대시보드에서 확인.)

create table if not exists consult_requests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  interest text not null,       -- 관심 분야 (graphic/motion/cg/interior/ai)
  inquiry text,                 -- 문의사항 (선택)
  source_page text              -- 어느 화면에서 신청했는지 (예: "home", "pricing")
);

alter table consult_requests enable row level security;

-- 누구나(anon 포함) 새 상담 신청을 "추가"만 할 수 있음.
create policy "anyone can submit a consult request"
  on consult_requests for insert
  to anon
  with check (true);

-- select/update/delete 정책은 의도적으로 만들지 않음 — anon key로는 조회·수정·삭제가 전부 막힘.
-- 관리자가 신청 내역을 보려면 Supabase 대시보드(Table Editor)에서 로그인 후 확인.
-- 새 신청이 들어올 때마다 텔레그램으로 즉시 알림 받으려면 이 파일 다음에 telegram-notify.sql 실행 (README.md 참고).
