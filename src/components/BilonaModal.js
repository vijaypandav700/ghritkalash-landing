"use client";

import { X, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: 1,
    title: "Sourcing Pure A2 Milk",
    desc: "Fresh whole milk is obtained exclusively from indigenous Gir and Sahiwal cows grazing naturally in open pastures.",
  },
  {
    n: 2,
    title: "Boiling in Earthen Pots",
    desc: "Milk is slowly boiled over firewood in clay pots to retain essential live enzymes and natural sweetness.",
  },
  {
    n: 3,
    title: "Curd Fermentation (Dahi)",
    desc: "Whole milk is naturally cultured into rich probiotic curd overnight in cool earthen pots.",
  },
  {
    n: 4,
    title: "Bi-directional Hand Churning (Bilona)",
    desc: "The curd is gently churned back and forth with a wooden churner (madhani) using cotton ropes to separate pure makhan (butter) from buttermilk.",
  },
  {
    n: 5,
    title: "Slow Simmering to Liquid Gold",
    desc: "The extracted makhan is slowly melted and clarified over gentle flame until all moisture evaporates, yielding golden, granular (danedar) Vedic Ghee.",
  },
];

/**
 * BilonaModal
 *
 * Displays the 5-step Vedic Bilona process in a modal overlay.
 *
 * @param {{ isOpen: boolean, onClose: () => void, onShopNow: () => void }} props
 */
export default function BilonaModal({ isOpen, onClose, onShopNow }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bilona-modal-title"
    >
      <div className="bg-[#fbf9f4] border border-[#ebdcc4] max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#ebdcc4]/60 text-[#493e32] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Heading */}
        <div className="text-center mb-7">
          <span className="text-[11px] font-bold tracking-[0.22em] text-[#a86e1a] uppercase">
            Vedic Bilona Method
          </span>
          <h3
            id="bilona-modal-title"
            className="font-serif text-2xl sm:text-3xl text-[#23180d] font-bold mt-1"
          >
            The Sacred 5-Step Bilona Process
          </h3>
        </div>

        {/* Steps */}
        <ol className="space-y-4">
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="flex gap-4 p-4 rounded-2xl bg-white border border-[#ebdcc4] shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-[#113123] text-white flex items-center justify-center shrink-0 font-bold text-sm">
                {step.n}
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#23180d]">{step.title}</h4>
                <p className="text-xs text-[#6e6152] leading-relaxed mt-0.5">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* Footer CTA */}
        <div className="mt-7 pt-5 border-t border-[#ebdcc4] flex justify-end">
          <button
            onClick={() => {
              onClose();
              onShopNow?.();
            }}
            className="px-7 py-3 rounded-full text-xs font-bold uppercase tracking-wider btn-amazon-primary flex items-center gap-2"
          >
            <span>Shop Now</span>
            <ArrowRight className="w-4 h-4 text-[#e3a938]" />
          </button>
        </div>
      </div>
    </div>
  );
}
