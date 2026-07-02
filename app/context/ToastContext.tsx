"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Toast = { id: number; msg: string };
type ToastCtx = { show: (msg: string) => void };
const ToastContext = createContext<ToastCtx>({ show: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  let counter = 0;

  const show = useCallback((msg: string) => {
    const id = ++counter;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2800);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9000, display: "flex", flexDirection: "column", gap: 10, pointerEvents: "none" }}>
        {toasts.map((t) => (
          <div key={t.id} style={{
            background: "#FFD700", color: "#050505",
            fontFamily: "'Press Start 2P', monospace", fontSize: "0.55rem",
            padding: "12px 20px", lineHeight: 1.6,
            boxShadow: "0 4px 24px rgba(255,215,0,0.4)",
            animation: "floatUp 0.3s ease both",
            clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
          }}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() { return useContext(ToastContext); }
