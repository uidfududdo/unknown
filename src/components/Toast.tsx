import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export interface ToastInfo {
  id: string;
  message: string;
  type: "success" | "info" | "warning";
  title?: string;
}

interface ToastProps {
  toasts: ToastInfo[];
  onDismiss: (id: string) => void;
}

export default function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div
      id="samurai-toast-container"
      className="fixed bottom-6 right-6 z-55 flex flex-col space-y-3 w-[calc(100%-3rem)] sm:w-full sm:max-w-sm pointer-events-none"
    >
      <AnimatePresence>
        {toasts.map((toast) => {
          return (
            <motion.div
              key={toast.id}
              layout
              initial={{ opacity: 0, y: 40, scale: 0.85, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -20, filter: "blur(4px)", transition: { duration: 0.3 } }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
              className="pointer-events-auto flex w-full items-start rounded-sm border border-gold/20 bg-black/90 p-4 shadow-2xl relative overflow-hidden backdrop-blur-md"
              style={{
                willChange: "transform, opacity, filter",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
              }}
            >
              {/* Theme aesthetic side edge indicator */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] ${
                  toast.type === "success"
                    ? "bg-emerald-500"
                    : toast.type === "warning"
                    ? "bg-crimson"
                    : "bg-gold"
                }`}
              />

              <div className="flex-shrink-0 ml-1">
                {toast.type === "success" && <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />}
                {toast.type === "warning" && <AlertCircle className="h-4.5 w-4.5 text-crimson" />}
                {toast.type === "info" && <Info className="h-4.5 w-4.5 text-gold" />}
              </div>

              <div className="ml-3 flex-1 pt-0.5">
                {toast.title && (
                  <span className="font-display text-[10px] font-bold tracking-[0.18em] text-white block uppercase mb-1">
                    {toast.title}
                  </span>
                )}
                <p className="font-sans text-[11px] text-gray-300 leading-relaxed font-normal">
                  {toast.message}
                </p>
              </div>

              <div className="ml-4 flex flex-shrink-0">
                <button
                  type="button"
                  onClick={() => onDismiss(toast.id)}
                  className="inline-flex text-gray-500 hover:text-white focus:outline-hidden cursor-pointer p-0.5 rounded-sm hover:bg-white/5 transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
