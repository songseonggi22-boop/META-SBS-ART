import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

// 이름·연락처·개인정보 동의만 받는 "빠른 수강료 조회" 폼. 상담 모달과 같은 consult_requests 테이블에 저장(interest="fee").
export default function QuickFeeForm({ sourcePage, dark = false }: { sourcePage: string; dark?: boolean }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (name.trim().length < 2) return setError("이름은 2자 이상 입력해 주세요.");
    if (!phoneRegex.test(phone)) return setError("올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)");
    if (!agree) return setError("개인정보 수집·이용에 동의해 주세요.");
    if (!supabase) return toast.error("지금은 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.");

    setError("");
    setBusy(true);
    const { error: dbError } = await supabase.from("consult_requests").insert({
      name: name.trim(),
      phone,
      interest: "fee",
      inquiry: "빠른 수강료 조회",
      source_page: sourcePage,
    });
    setBusy(false);
    if (dbError) return toast.error("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    setDone(true);
  }

  if (done) {
    return (
      <div className={`fee-form fee-done${dark ? " fee-dark" : ""}`}>
        <p><Check size={16} /> 접수되었습니다. 담당자가 수강료를 안내해 드리겠습니다.</p>
      </div>
    );
  }

  return (
    <form className={`fee-form${dark ? " fee-dark" : ""}`} onSubmit={onSubmit} noValidate>
      <div className="fee-fields">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="이름" aria-label="이름" autoComplete="name" />
        <input
          type="tel"
          inputMode="numeric"
          maxLength={13}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3"))}
          placeholder="010-0000-0000"
          aria-label="연락처"
          autoComplete="tel"
        />
        <button type="submit" className="button button-primary" disabled={busy}>
          {busy ? "접수 중..." : "수강료 조회"} <ArrowRight size={16} />
        </button>
      </div>
      <label className="fee-agree">
        <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
        <span>
          개인정보 수집·이용에 동의합니다. (<a href="/privacy" target="_blank" rel="noreferrer">개인정보처리방침</a>)
        </span>
      </label>
      {error && <p className="field-error">{error}</p>}
    </form>
  );
}
