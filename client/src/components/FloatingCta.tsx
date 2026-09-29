import { MessageCircle } from "lucide-react";
import { useConsultModal } from "./ConsultModalContext";

// 어느 페이지에서든 상담 모달을 바로 열 수 있는 우하단 고정 버튼. evawacademy.com 패턴과 동일.
export default function FloatingCta() {
  const { open } = useConsultModal();
  return (
    <button type="button" className="floating-cta" onClick={() => open({ sourcePage: "floating-cta" })}>
      <MessageCircle size={18} strokeWidth={1.8} />
      <span>상담 신청</span>
    </button>
  );
}
