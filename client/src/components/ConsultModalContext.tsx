import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

// 어느 페이지에서든(히어로 CTA·과정 카드·수강 안내 등) 같은 상담 모달을 열 수 있게 하는 전역 상태.
// evawacademy.com(홈페이지만들기 프로젝트)의 ConsultModalContext와 동일한 패턴.
export type CourseInterest = "graphic" | "motion" | "cg" | "interior" | "cert" | "ai" | "drawing" | "it";

type OpenOptions = {
  interest?: CourseInterest; // 과정 카드 등에서 넘어온 관심 분야 프리셋
  sourcePage?: string;
};

type ConsultModalContextValue = {
  isOpen: boolean;
  presetInterest?: CourseInterest;
  sourcePage: string;
  open: (options?: OpenOptions) => void;
  close: () => void;
};

const ConsultModalContext = createContext<ConsultModalContextValue | null>(null);

export function ConsultModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetInterest, setPresetInterest] = useState<CourseInterest | undefined>(undefined);
  const [sourcePage, setSourcePage] = useState("home");

  const open = useCallback((options?: OpenOptions) => {
    setPresetInterest(options?.interest);
    setSourcePage(options?.sourcePage ?? (typeof window === "undefined" ? "home" : window.location.pathname));
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, presetInterest, sourcePage, open, close }),
    [isOpen, presetInterest, sourcePage, open, close]
  );

  return <ConsultModalContext.Provider value={value}>{children}</ConsultModalContext.Provider>;
}

export function useConsultModal() {
  const ctx = useContext(ConsultModalContext);
  if (!ctx) throw new Error("useConsultModal은 ConsultModalProvider 안에서만 사용할 수 있습니다.");
  return ctx;
}
