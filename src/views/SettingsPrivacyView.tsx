import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

export const SettingsPrivacyView: React.FC = () => {
  const { clearAllData } = useSafeCart();
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your local scan history and tracked subscriptions?')) {
      clearAllData();
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="settings-privacy-root">
      
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Trust & Architecture
        </span>
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Privacy, Security & Ethics Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          SafeCart is engineered to protect consumer transparency without collecting sensitive financial credentials.
        </p>
      </div>

      {/* Core Privacy Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* What SafeCart Scans */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5" />
            <span>What SafeCart Audits</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Checkout URLs, catalog pricing line items, and promotional claims.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Pre-checked checkboxes for warranties, insurance, and donations.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Trial length terms, auto-renewal billing frequency, and cancellation policies.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
              <span>Countdown timers and urgency scripts for deceptive reset loops.</span>
            </li>
          </ul>
        </div>

        {/* What SafeCart NEVER Collects */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
            <Lock className="w-5 h-5" />
            <span>What SafeCart NEVER Accesses</span>
          </div>
          <ul className="space-y-2 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Never asks for or stores credit card numbers, CVVs, or cardholder names.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Never accesses user bank logins, OTPs, or payment gateway secure iframes.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>Never sells shopper browsing habits or cart data to advertisers.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              <span>No mandatory account registration or invasive phone tracking.</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Ethical Stance */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3">
        <h3 className="font-display font-bold text-base text-slate-900">
          The SafeCart Ethical Guarantee
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          SafeCart is an informational transparency assistant. We never arbitrarily slander legitimate online stores as “scams”. Instead, we provide auditable evidence, accurate fee mathematics, and clear risk indicators so that you retain complete authority over your payment decisions.
        </p>
      </div>

      {/* Data Management & Storage */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900">
          Local Storage & Data Controls
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Your scan history, custom tracked subscriptions, and community voting data are stored locally in your browser's private storage (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">localStorage</code>). You can reset your data at any time.
        </p>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Local History & Subscriptions</span>
          </button>

          {clearedNotice && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Local data cleared!
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
