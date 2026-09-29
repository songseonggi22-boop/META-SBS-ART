import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Check, X } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useConsultModal, type CourseInterest } from "./ConsultModalContext";
import PrivacyPolicyText from "./PrivacyPolicyText";

const INTEREST_OPTIONS: { value: CourseInterest; label: string }[] = [
  { value: "graphic", label: "그래픽 디자인 (Photoshop·Illustrator)" },
  { value: "motion", label: "모션그래픽 (Premiere·AE·C4D)" },
  { value: "cg", label: "CG / 3D (ZBrush·Maya)" },
  { value: "interior", label: "인테리어 디자인 (CAD·SketchUp)" },
  { value: "ai", label: "자격증 & AI (컴활·Vibe Coding)" },
];

// 연락처 검증 — 010 등 01[016789]로 시작, 하이픈 유무 모두 허용.
const phoneRegex = /^01[016789]-?\d{3,4}-?\d{4}$/;

const schema = z.object({
  interest: z.string().min(1, "관심 분야를 선택해 주세요."),
  name: z.string().trim().min(2, "이름은 2자 이상 입력해 주세요."),
  phone: z.string().regex(phoneRegex, "올바른 휴대폰 번호 형식이 아닙니다. (예: 010-1234-5678)"),
  email: z.string().trim().email("올바른 이메일 형식이 아닙니다.").optional().or(z.literal("")),
  inquiry: z.string().optional(),
  agree: z.boolean().refine((v) => v === true, { message: "개인정보 수집·이용에 동의해 주세요." }),
});
type FormValues = z.infer<typeof schema>;

export default function ConsultModal() {
  const { isOpen, presetInterest, sourcePage, close } = useConsultModal();
  const [submitted, setSubmitted] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { interest: "", name: "", phone: "", email: "", inquiry: "", agree: false },
  });

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setShowPrivacy(false);
      reset({ interest: presetInterest ?? "", name: "", phone: "", email: "", inquiry: "", agree: false });
    }
  }, [isOpen, presetInterest, reset]);

  async function onSubmit(values: FormValues) {
    if (!supabase) {
      toast.error("지금은 상담 신청을 접수할 수 없습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }

    const { error } = await supabase.from("consult_requests").insert({
      name: values.name,
      phone: values.phone,
      email: values.email || null,
      interest: values.interest,
      inquiry: values.inquiry || null,
      source_page: sourcePage,
    });

    if (error) {
      toast.error("접수 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && close()}>
      <Dialog.Portal>
        <Dialog.Overlay className="consult-modal-overlay" />
        <Dialog.Content className="consult-modal-content auth-card" aria-describedby={undefined}>
          <Dialog.Close asChild>
            <button type="button" className="icon-button consult-modal-close" aria-label="닫기">
              <X size={16} />
            </button>
          </Dialog.Close>

          {submitted ? (
            <div className="consult-success">
              <Dialog.Title asChild>
                <p className="consult-success-title">
                  <Check size={16} /> 상담 신청이 완료되었습니다.
                </p>
              </Dialog.Title>
              <p className="consult-success-body">담당자가 확인 후 대표전화 042-719-8383으로 연락드리겠습니다.</p>
            </div>
          ) : (
            <form className="auth-form consult-form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <Dialog.Title asChild>
                <h2 className="consult-modal-title">상담 신청</h2>
              </Dialog.Title>
              <p className="consult-modal-lead">관심 분야와 연락처를 남겨주시면 담당자가 안내해 드립니다.</p>

              <label>
                관심 분야
                <select {...register("interest")} defaultValue={presetInterest ?? ""}>
                  <option value="" disabled>
                    선택해 주세요
                  </option>
                  {INTEREST_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.interest && <p className="field-error">{errors.interest.message}</p>}
              </label>

              <label>
                이름
                <input {...register("name")} placeholder="이름을 입력해 주세요" />
                {errors.name && <p className="field-error">{errors.name.message}</p>}
              </label>

              <label>
                연락처
                <input
                  type="tel"
                  placeholder="010-0000-0000"
                  maxLength={13}
                  {...register("phone", {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/[^0-9]/g, "").replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
                    },
                  })}
                />
                {errors.phone && <p className="field-error">{errors.phone.message}</p>}
              </label>

              <label>
                이메일 (선택)
                <input type="email" placeholder="you@example.com" {...register("email")} />
                {errors.email && <p className="field-error">{errors.email.message}</p>}
              </label>

              <label>
                문의사항 (선택)
                <textarea rows={3} placeholder="궁금한 점을 자유롭게 남겨주세요" {...register("inquiry")} />
              </label>

              <label className="consult-agree">
                <input type="checkbox" {...register("agree")} />
                <span>
                  개인정보 수집·이용에 동의합니다. (
                  <button type="button" className="consult-privacy-toggle" onClick={() => setShowPrivacy((v) => !v)}>
                    {showPrivacy ? "접기" : "개인정보처리방침 보기"}
                  </button>
                  )
                </span>
              </label>
              {showPrivacy && (
                <div className="consult-privacy-embed">
                  <PrivacyPolicyText />
                </div>
              )}
              {errors.agree && <p className="field-error">{errors.agree.message}</p>}

              <button type="submit" className="button button-primary full-button" disabled={isSubmitting}>
                {isSubmitting ? "접수 중..." : "상담 신청하기"} <ArrowRight size={16} />
              </button>
              <p className="consult-modal-privacy-link">
                <Link href="/privacy" onClick={() => close()}>
                  개인정보처리방침 전체 페이지 보기
                </Link>
              </p>
            </form>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
