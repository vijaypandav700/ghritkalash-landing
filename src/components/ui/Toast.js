"use client";

import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertCircle } from "lucide-react";

/**
 * Global toast notification – reads from CartContext.
 * Renders nothing when there's no active toast.
 */
export default function Toast() {
  const { toast } = useCart();

  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[70] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border max-w-sm animate-slide-up"
      style={{
        background: isError ? "#2d0f0f" : "#0f2e20",
        borderColor: isError ? "rgba(220,38,38,0.4)" : "rgba(228,169,56,0.4)",
      }}
    >
      {isError ? (
        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
      ) : (
        <CheckCircle2 className="w-5 h-5 text-[#e4a938] shrink-0" />
      )}
      <span className="text-sm font-medium text-[#f8e7b9]">{toast.message}</span>
    </div>
  );
}
