import React from 'react';
import { 
  ShieldCheck, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  Tag, 
  Search, 
  CalendarClock, 
  Receipt
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

export const ScanProgressModal: React.FC = () => {
  const { isScanning, scanProgressStep } = useSafeCart();

  if (!isScanning) return null;

  const steps = [
    { num: 1, label: 'Fetching page & assets...', icon: <Search className="w-4 h-4" /> },
    { num: 2, label: 'Reading checkout DOM content...', icon: <FileText className="w-4 h-4" /> },
    { num: 3, label: 'Checking pricing & unbundled fees...', icon: <Tag className="w-4 h-4" /> },
    { num: 4, label: 'Analyzing checkout language for dark patterns...', icon: <ShieldCheck className="w-4 h-4" /> },
    { num: 5, label: 'Checking subscription & renewal terms...', icon: <CalendarClock className="w-4 h-4" /> },
    { num: 6, label: 'Compiling auditable transparency report...', icon: <Receipt className="w-4 h-4" /> }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200"
      id="scan-progress-modal-backdrop"
    >
      <div 
        className="bg-white rounded-2xl max-w-md w-full border border-slate-200 p-6 sm:p-7 shadow-2xl text-center space-y-5"
        id="scan-progress-modal-card"
      >
        {/* Animated Pulse Icon */}
        <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-emerald-100 animate-ping opacity-75" />
          <div className="relative w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center text-white shadow-md">
            <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
          </div>
        </div>

        {/* Title */}
        <div>
          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 uppercase tracking-wider">
            SafeCart Pre-Payment Layer
          </span>
          <h3 className="font-display font-bold text-xl text-slate-900 mt-2">
            Auditing Checkout Screen
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Analyzing DOM elements, line items, preselected options & fine print
          </p>
        </div>

        {/* Multi-stage Progress Checklist */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left space-y-3">
          {steps.map((step) => {
            const isCompleted = scanProgressStep > step.num;
            const isCurrent = scanProgressStep === step.num;

            return (
              <div 
                key={step.num}
                className={`flex items-center gap-3 text-xs transition-all ${
                  isCompleted 
                    ? 'text-emerald-900 font-medium' 
                    : isCurrent 
                      ? 'text-slate-900 font-bold' 
                      : 'text-slate-400 font-normal'
                }`}
              >
                <div className="shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">
                      {step.num}
                    </div>
                  )}
                </div>
                <span>{step.label}</span>
              </div>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-400 font-medium">
          SafeCart cross-checks advertised pricing against final charges in real time.
        </p>
      </div>
    </div>
  );
};
