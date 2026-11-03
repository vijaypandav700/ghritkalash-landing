"use client";

import { X, ArrowRight, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Pure Cow Milk",
    desc: "Obtained from healthy cows and tested for pure A2 quality.",
  },
  {
    n: 2,
    title: "Gentle Boiling",
    desc: "Milk is slowly boiled following time-honoured culinary practices.",
  },
  {
    n: 3,
    title: "Curd Culturing",
    desc: "The boiled milk is naturally set into curd using traditional starter dahi.",
  },
  {
    n: 4,
    title: "Traditional Bilona Churning",
    desc: "Curd is traditionally churned to separate fresh butter (makhan) from buttermilk.",
  },
  {
    n: 5,
    title: "Clarification into Pure Ghee",
    desc: "The extracted butter is gently simmered over controlled heat into golden, aromatic, granular (danedar) ghee.",
  },
];

export default function BilonaModal({ isOpen, onClose, onShopNow }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bilona-modal-title"
    >
      <div className="bg-[#fcfaf5] border border-[#ebdcc4] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#ebdcc4]/60 text-[#493e32] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="text-[11px] font-bold tracking-[0.25em] text-[#c69324] uppercase">
            Traditional Method
          </span>
          <h3
            id="bilona-modal-title"
            className="font-serif text-2xl sm:text-3xl text-[#142d1f] font-bold mt-1"
          >
            The Traditional Bilona Method
          </h3>
          <p className="text-xs text-[#6e6152] mt-1 max-w-md mx-auto">
            Following time-honoured Indian preparation practices to separate butter from cultured curd and gently clarify into pure ghee.
          </p>
        </div>

        <ol className="space-y-3.5">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex gap-4 p-4 rounded-2xl bg-white border border-[#ebdcc4] shadow-sm"
            >
              <div className="w-8 h-8 rounded-xl bg-[#0b3b24] text-[#ffd978] flex items-center justify-center shrink-0 font-bold text-xs">
                {step.n}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#142d1f]">{step.title}</h4>
                <p className="text-xs text-[#6e6152] leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 pt-5 border-t border-[#ebdcc4] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-[#09733c] font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Lab-Tested &bull; Unsalted &bull; Pure</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onShopNow?.();
            }}
            className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider btn-anveshan-primary text-[#fce8a9] flex items-center gap-2"
          >
            <span>Order Pure Ghee</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#ffd978]" />
          </button>
        </div>
      </div>
    </div>
  );
}
