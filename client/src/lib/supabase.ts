import { createClient } from "@supabase/supabase-js";

// SPA(Vite) 사이트라 서버 API 라우트가 없음 — 상담 폼은 브라우저에서 Supabase에 직접 insert.
// VITE_* 환경변수는 빌드 시점에 클라이언트 번들에 그대로 박히므로, anon key는 "공개돼도 되는" 키만 써야 함
// (RLS로 anon 역할은 insert만 가능하고 select는 막혀 있어야 안전 — supabase/schema.sql 참고).
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// 환경변수 미설정 시(.env.local 없는 경우 등) 빌드는 되게 하되 제출 시점에 에러 처리하도록 null 허용.
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;
