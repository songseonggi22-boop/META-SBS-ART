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
    E'\U0001F5A5 새 상담 신청 (SBS아카데미AI학원)\n이름: %s\n연락처: %s\n이메일: %s\n관심 분야: %s\n문의사항: %s\n신청 화면: %s',
    new.name,
    new.phone,
    coalesce(new.email, '-'),
    new.interest,
    coalesce(new.inquiry, '-'),
    coalesce(new.source_page, '-')
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

-- 확인: 아래로 테스트 행을 하나 넣어보면 텔레그램으로 알림이 오는지 바로 확인 가능합니다.
-- insert into consult_requests (name, phone, interest, source_page) values ('테스트', '010-0000-0000', 'graphic', 'sql-test');
