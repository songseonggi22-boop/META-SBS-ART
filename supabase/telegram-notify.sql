-- 상담 신청이 들어올 때마다 텔레그램으로 알림 보내기
-- schema.sql을 먼저 실행한 뒤, 이 파일을 Supabase 대시보드 > SQL Editor 에서 실행하세요.
--
-- 실행 전에 아래 값들을 먼저 준비해서 채워 넣으세요:
--   1) 봇 토큰: 텔레그램에서 @BotFather 검색 → /newbot → 이름 정하면 토큰(숫자:영문 조합) 받음
--   2) chat_id: 알림 받을 사람이 그 봇에게 텔레그램으로 아무 메시지나 한 번 보낸 뒤,
--      브라우저에서 https://api.telegram.org/bot<봇토큰>/getUpdates 접속 →
--      응답 JSON에서 "chat":{"id": 이 숫자} 를 복사
--      (알림 받을 사람이 여러 명이면 각자 봇에게 메시지 1번씩 보낸 뒤 v_chat_ids 배열에 전부 추가)

create extension if not exists pg_net with schema extensions;

-- 과정(interest)·신청 화면(source_page) 코드값을 사람이 바로 알아볼 수 있는 한글 설명으로 바꾼다.
-- interest는 ConsultModal.tsx의 INTEREST_OPTIONS + QuickFeeForm의 "fee" 뿐인 닫힌 집합이라 전부 매핑.
-- source_page는 Home.tsx 등 모든 CTA 호출부(`open({ sourcePage: ... })`)의 고정 식별자는 전부 매핑하고,
-- course-*, landing-*, resource-*, portfolio/* 처럼 슬러그가 붙는 동적 값은 접두어만 번역해 원래 슬러그를
-- 그대로 붙여 보여준다(= 그 자체로 어떤 과정/글/포트폴리오인지 식별 가능).
create or replace function label_interest(p text)
returns text
language sql
immutable
as $$
  select case p
    when 'graphic'  then '시각편집디자인 (포토샵·일러스트·인디자인·GTQ)'
    when 'motion'   then '모션그래픽 (Premiere·AE·C4D)'
    when 'cg'       then 'CG/3D (ZBrush·Maya)'
    when 'interior' then '인테리어 디자인 (CAD·SketchUp)'
    when 'cert'     then '컴퓨터 자격증 (컴활 1·2급)'
    when 'ai'       then 'AI 활용 (ChatGPT·바이브코딩·자동화)'
    when 'it'       then 'IT 프로그래밍 (파이썬·자바·웹)'
    when 'drawing'  then '웹툰·디지털드로잉 (아이패드·이모티콘)'
    when 'fee'      then '수강료만 빠르게 조회'
    else coalesce(p, '-')
  end;
$$;

create or replace function label_source_page(p text)
returns text
language sql
immutable
as $$
  select case
    when p = 'home-hero'      then '홈 - 히어로 배너 캐러셀 CTA'
    when p = 'home-hotdeal'   then '홈 - HOT DEAL(수강료 지원) 섹션 CTA'
    when p = 'home-mid'       then '홈 - 중간 CTA ("어떤 트랙이 맞는지 모르겠다면")'
    when p = 'home-cta'       then '홈 - 맨 아래 마지막 CTA'
    when p = 'floating-cta'   then '플로팅 상담 버튼 (화면 우하단, 전 페이지 공통)'
    when p = 'pricing'        then '수강 안내 페이지 - 트랙 카드 CTA'
    when p = 'pricing-fee'    then '수강 안내 페이지 - 빠른 수강료 조회 폼'
    when p = 'careers'        then '취업지원 페이지 CTA'
    when p = 'community'      then '수강후기·작품 페이지 CTA'
    when p = 'funding'        then '국비지원 페이지 CTA'
    when p = 'about'          then '학원안내 페이지 CTA'
    when p = 'resources'      then '자료실 페이지 CTA'
    when p like 'course-%'    then '과정 상세 페이지 (' || p || ')'
    when p like 'landing-%'   then '분야 랜딩 페이지 (' || p || ')'
    when p like 'resource-%'  then '자료실 상세 페이지 (' || p || ')'
    when p like 'portfolio/%' then '포트폴리오 상세 페이지 (' || p || ')'
    else coalesce(p, '-')
  end;
$$;

create or replace function notify_telegram_on_consult_request()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_bot_token text := 'REPLACE_WITH_BOT_TOKEN';   -- 예: 123456789:AAExxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  v_chat_ids  text[] := array['REPLACE_WITH_CHAT_ID_1', 'REPLACE_WITH_CHAT_ID_2'];  -- 알림 받을 사람 전원 (1명이면 배열 1개만)
  v_message   text;
  v_chat_id   text;
begin
  v_message := format(
    E'\U0001F5A5 새 상담 신청 (SBS아카데미AI학원)\n이름: %s\n연락처: %s\n이메일: %s\n관심 과정: %s\n문의사항: %s\n신청 화면/CTA: %s',
    new.name,
    new.phone,
    coalesce(new.email, '-'),
    label_interest(new.interest),
    coalesce(new.inquiry, '-'),
    label_source_page(new.source_page)
  );

  foreach v_chat_id in array v_chat_ids
  loop
    perform net.http_post(
      url := format('https://api.telegram.org/bot%s/sendMessage', v_bot_token),
      headers := '{"Content-Type": "application/json"}'::jsonb,
      body := jsonb_build_object('chat_id', v_chat_id, 'text', v_message)
    );
  end loop;

  return new;
end;
$$;

drop trigger if exists trg_notify_telegram_on_consult_request on consult_requests;
create trigger trg_notify_telegram_on_consult_request
  after insert on consult_requests
  for each row
  execute function notify_telegram_on_consult_request();

-- 확인: 아래로 테스트 행을 하나 넣어보면 텔레그램으로 알림이 오는지, 라벨이 잘 바뀌는지 바로 확인 가능합니다.
-- insert into consult_requests (name, phone, interest, source_page) values ('테스트', '010-0000-0000', 'graphic', 'home-hero');
