import React, { useState } from 'react';
import { 
  CheckSquare, 
  Square, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle,
  Info,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ScanResult, BeforeYouPayItem } from '../types';

interface BeforeYouPayChecklistProps {
  scan: ScanResult;
}

export const BeforeYouPayChecklist: React.FC<BeforeYouPayChecklistProps> = ({ scan }) => {
  const [items, setItems] = useState<BeforeYouPayItem[]>([
    {
      id: 'chk-price',
      label: 'Compare Advertised vs Final Charged Amount',
      hint: `Verify if the cart total matches your expected ₹${scan.priceBreakdown.advertisedPrice} figure.`,
      critical: true,
      checked: false
    },
    {
      id: 'chk-delivery',
      label: 'Inspect Delivery & Handling Surcharges',
      hint: scan.priceBreakdown.deliveryFee > 0 
        ? `Delivery fee of ₹${scan.priceBreakdown.deliveryFee} was appended at checkout.` 
        : 'Verify shipping line item is either zero or expected.',
      critical: scan.priceBreakdown.deliveryFee > 0,
      checked: false
    },
    {
      id: 'chk-preselect',
      label: 'Uncheck Pre-Selected Optional Warranties or Bundles',
      hint: scan.priceBreakdown.protectionPlan > 0 
        ? `Pre-selected protection plan (₹${scan.priceBreakdown.protectionPlan}) detected.` 
        : 'Ensure no unwanted insurance, gift bags, or donations were checked.',
      critical: scan.priceBreakdown.protectionPlan > 0,
      checked: false
    },
    {
      id: 'chk-sub',
      label: 'Check for Hidden Trial or Recurring Auto-Renew Clauses',
      hint: scan.subscription.hasSubscription 
        ? `Recurring billing of ₹${scan.subscription.recurringAmount}/${scan.subscription.billingFrequency} detected.` 
        : 'Verify no ongoing subscription commitment is attached to this order.',
      critical: scan.subscription.hasSubscription,
      checked: false
    },
    {
      id: 'chk-cancel',
      label: 'Review Cancellation & Refund Policy',
      hint: 'Ensure return windows, return shipping costs, and cancellation methods are clear.',
      critical: false,
      checked: false
    },
    {
      id: 'chk-urgency',
      label: 'Pause and Disregard Countdown Urgency Timers',
      hint: 'Never allow artificial 5-minute timers to rush your financial decisions.',
      critical: false,
      checked: false
    }
  ]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const checkedCount = items.filter(i => i.checked).length;
  const allCriticalChecked = items.filter(i => i.critical).every(i => i.checked);
  const totalItems = items.length;

  // SafeCart payment readiness state
  const isHighConcern = scan.riskLevel === 'high' || scan.detectedConcernsCount > 0;
  const readinessTitle = isHighConcern ? 'REVIEW BEFORE PAYING' : 'READY TO REVIEW PAYMENT';

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs"
      id="before-you-pay-checklist"
    >
      {/* Header & Readiness Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Final Pre-Payment Verification
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              {checkedCount}/{totalItems} Verified
            </span>
          </div>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
            Before You Click "Pay"
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            SafeCart provides transparency — you make the final call. Check each item on the merchant's screen before submitting card details.
          </p>
        </div>

        {/* Readiness Badge */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 sm:self-start ${
          isHighConcern 
            ? 'bg-amber-50 border-amber-300 text-amber-900' 
            : 'bg-emerald-50 border-emerald-300 text-emerald-900'
        }`}>
          {isHighConcern ? (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          )}
          <div>
            <span className="text-[11px] font-bold block uppercase tracking-wide">
              {readinessTitle}
            </span>
            <span className="text-[10px] opacity-80 block leading-tight">
              {isHighConcern ? 'Address highlighted concerns first' : 'Standard pre-checkout inspection'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="my-4">
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-900 transition-all duration-300"
            style={{ width: `${(checkedCount / totalItems) * 100}%` }}
          />
        </div>
      </div>

      {/* Interactive Checklist Items */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            id={`checklist-item-${item.id}`}
            onClick={() => toggleItem(item.id)}
            className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
              item.checked 
                ? 'bg-slate-50/80 border-slate-200 opacity-75' 
                : item.critical 
                  ? 'bg-amber-50/40 border-amber-200 hover:border-amber-300' 
                  : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            <button 
              type="button" 
              className="mt-0.5 text-slate-700 hover:text-slate-900 shrink-0"
              aria-label={item.checked ? 'Checked' : 'Unchecked'}
            >
              {item.checked ? (
                <CheckSquare className="w-5 h-5 text-emerald-600" />
              ) : (
                <Square className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-semibold ${
                  item.checked ? 'line-through text-slate-500' : 'text-slate-900'
                }`}>
                  {item.label}
                </span>
                {item.critical && !item.checked && (
                  <span className="px-1.5 py-0.2 text-[9px] font-bold bg-rose-100 text-rose-800 rounded uppercase">
                    HIGH PRIORITY
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                {item.hint}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Never 100% Safe Rule Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <Info className="w-3.5 h-3.5 text-slate-400" />
          SafeCart never claims 100% safety. Always confirm merchant legitimacy and HTTPS padlock.
        </span>
        {checkedCount === totalItems && (
          <span className="font-bold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> All items inspected
          </span>
        )}
      </div>
    </div>
  );
};
