import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import QuickFeeForm from "./QuickFeeForm";

// 사이트 진입 직후 뜨는 이벤트 팝업. 버튼으로 다른 모달을 여는 대신 "수강료 조회" 폼(QuickFeeForm)을
// 팝업 안에 바로 넣어, 들어온 사람이 그 자리에서 문의를 남길 수 있게 한다.
// (상담 모달과 같은 Supabase `consult_requests` 테이블에 interest="fee"로 저장 — 텔레그램 알림 라벨 체계에도 그대로 잡힘)
//
// ── 담당자가 고칠 곳은 아래 상수 5개뿐 ───────────────────────────────
// 기간이 지나면 코드를 지우지 않아도 팝업이 자동으로 안 뜬다. 다음 이벤트 때는 날짜·문구만 갱신.
const EVENT_STARTS_AT = "2026-11-24T00:00:00+09:00";
const EVENT_ENDS_AT = "2026-11-30T23:59:59+09:00";
const SEAT_LIMIT = 5; // 선착순 인원
const EVENT_BADGE = "11.24 ~ 11.30 겨울방학 사전등록 이벤트";
// 노출 기록 키 — 문구/기간을 바꿔 "다시 보여주고 싶을 때"는 끝의 버전만 올리면 됨(winter2 등).
const STORAGE_KEY = "cult-event-popup-winter";
// ──────────────────────────────────────────────────────────────

const OPEN_DELAY_MS = 600; // 첫 화면 로딩을 방해하지 않을 만큼만 늦게 띄운다

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

// 마감일까지 남은 날 수(D-n 표기용). 마감 당일이면 0 → "오늘 마감".
function daysLeft(now: number) {
  const end = new Date(EVENT_ENDS_AT).getTime();
  return Math.max(0, Math.floor((end - now) / 86_400_000));
}

export default function EventPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = Date.now();
    // 기간 밖이면 아무것도 하지 않는다.
    if (now < new Date(EVENT_STARTS_AT).getTime() || now > new Date(EVENT_ENDS_AT).getTime()) return;
    // 이미 닫았으면(이 탭 세션) / "오늘 하루 보지 않기"를 눌렀으면(당일) 건너뛴다.
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      if (localStorage.getItem(STORAGE_KEY) === todayKey()) return;
    } catch {
      // 사생활 보호 모드 등에서 스토리지 접근이 막히면 그냥 띄운다.
    }
    const timer = window.setTimeout(() => setIsOpen(true), OPEN_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  function dismiss(forToday = false) {
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
      if (forToday) localStorage.setItem(STORAGE_KEY, todayKey());
    } catch {
      // 스토리지 못 쓰면 이 화면에서만 닫힌다.
    }
    setIsOpen(false);
  }

  const remaining = daysLeft(Date.now());

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && dismiss()}>
      <Dialog.Portal>
        <Dialog.Overlay className="consult-modal-overlay" />
        <Dialog.Content className="consult-modal-content auth-card event-popup" aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button type="button" className="icon-button consult-modal-close" aria-label="닫기">
              <X size={16} />
            </button>
          </Dialog.Close>

          <p className="event-popup-badge">{EVENT_BADGE}</p>
          <Dialog.Title asChild>
            <h2 className="event-popup-title">
              대전 AI 컴퓨터학원
              <br />
              겨울방학 사전등록 <em>선착순 {SEAT_LIMIT}명</em>
            </h2>
          </Dialog.Title>
          <p className="event-popup-lead">
            AI 전 과정 포함! 지금 <strong>수강료 조회</strong>를 남겨주신 분 중 <strong>선착순 {SEAT_LIMIT}명</strong>만
            사전등록으로 접수됩니다. 접수 순서대로 담당자가 개별 안내드립니다.
          </p>

          <ul className="event-popup-points">
            <li>
              <Check size={14} /> AI·디자인·자격증 전 과정 수강료·시간표 한 번에 안내
            </li>
            <li>
              <Check size={14} /> 이름·연락처만, 1분이면 접수 완료
            </li>
            <li>
              <Check size={14} /> {remaining > 0 ? `마감까지 D-${remaining}` : "오늘 마감"} · 선착순 {SEAT_LIMIT}명 마감 시 종료
            </li>
          </ul>

          <QuickFeeForm sourcePage="event-popup-winter" />

          <p className="event-popup-note">* 사전등록 혜택 내용과 조건은 상담 시 안내드립니다.</p>
          <button type="button" className="event-popup-dismiss" onClick={() => dismiss(true)}>
            오늘 하루 보지 않기
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
