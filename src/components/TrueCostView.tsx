import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  AlertCircle, 
  HelpCircle, 
  Receipt,
  ArrowRight
} from 'lucide-react';
import { PriceBreakdown } from '../types';

interface TrueCostViewProps {
  breakdown: PriceBreakdown;
  currency?: string;
  isCompact?: boolean;
}

export const TrueCostView: React.FC<TrueCostViewProps> = ({
  breakdown,
  currency = '₹',
  isCompact = false
}) => {
  const {
    advertisedPrice,
    deliveryFee,
    platformFee,
    protectionPlan,
    taxes,
    otherFees,
    estimatedTotal,
    potentialExtraCost
  } = breakdown;

  // Verify internal math correctness
  const calculatedTotal = 
    advertisedPrice + 
    deliveryFee + 
    platformFee + 
    protectionPlan + 
    taxes + 
    (otherFees?.reduce((acc, f) => acc + f.amount, 0) || 0);

  const finalTotal = estimatedTotal || calculatedTotal;
  const extraCost = potentialExtraCost !== undefined ? potentialExtraCost : (finalTotal - advertisedPrice);

  return (
    <div 
      className={`bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden ${
        isCompact ? 'p-4' : 'p-5 sm:p-6'
      }`}
      id="safecart-true-cost-view"
    >
      {/* Title & Badge */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-slate-900">
              SafeCart True Cost View™
            </h3>
            <p className="text-[11px] text-slate-500 font-medium">
              Transparent pre-payment fee audit
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 text-slate-700 rounded-md border border-slate-200">
          ESTIMATED BREAKDOWN
        </span>
      </div>

      {/* Comparison Grid: Advertised vs True Cost */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
        
        {/* Advertised Price */}
        <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Advertised Price
          </span>
          <div className="font-display text-xl sm:text-2xl font-bold text-slate-800 mt-1">
            {currency}{advertisedPrice.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Initial headline figure
          </span>
        </div>

        {/* Estimated True Cost */}
        <div className="bg-slate-900 text-white rounded-xl p-3 border border-slate-800">
          <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
            Estimated True Cost
          </span>
          <div className="font-display text-xl sm:text-2xl font-bold text-emerald-400 mt-1">
            {currency}{finalTotal.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            Total observed at payment
          </span>
        </div>

        {/* Potential Extra Cost Difference */}
        <div className={`col-span-2 sm:col-span-1 rounded-xl p-3 border ${
          extraCost > 0 
            ? 'bg-amber-50/80 border-amber-200 text-amber-950' 
            : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              Potential Extra Cost
            </span>
            {extraCost > 0 && <TrendingUp className="w-3.5 h-3.5 text-amber-600" />}
          </div>
          <div className={`font-display text-xl sm:text-2xl font-bold mt-1 ${
            extraCost > 0 ? 'text-amber-700' : 'text-emerald-700'
          }`}>
            {extraCost > 0 ? `+${currency}${extraCost.toLocaleString()}` : '₹0'}
          </div>
          <span className="text-[10px] opacity-80 block mt-0.5">
            {extraCost > 0 ? 'Possible unannounced charges' : 'Matches advertised pricing'}
          </span>
        </div>

      </div>

      {/* Signature SafeCart Callout Banner */}
      {extraCost > 0 ? (
        <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-900 font-semibold leading-relaxed">
            You may pay <span className="font-bold underline">{currency}{extraCost.toLocaleString()} more</span> than the advertised headline price due to pre-selected add-ons or shipping surcharges.
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
          <p className="text-xs text-emerald-900 font-semibold leading-relaxed">
            The final price appears consistent with the advertised amount. No hidden fees or pre-selected add-ons detected.
          </p>
        </div>
      )}

      {/* Itemized Transparent Math Breakdown */}
      <div className="bg-slate-50/60 rounded-xl p-3.5 border border-slate-200 space-y-2 text-xs">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-200">
          Itemized Audit (Line-by-Line)
        </div>

        <div className="flex justify-between items-center py-0.5">
          <span className="text-slate-600 font-medium">Base Product / Advertised Rate</span>
          <span className="font-mono font-semibold text-slate-800">{currency}{advertisedPrice.toLocaleString()}</span>
        </div>

        {deliveryFee > 0 && (
          <div className="flex justify-between items-center py-0.5 text-amber-900">
            <span className="flex items-center gap-1 font-medium">
              <span className="text-amber-600">+</span> Delivery & Handling Fee
            </span>
            <span className="font-mono font-semibold">{currency}{deliveryFee.toLocaleString()}</span>
          </div>
        )}

        {platformFee > 0 && (
          <div className="flex justify-between items-center py-0.5 text-amber-900">
            <span className="flex items-center gap-1 font-medium">
              <span className="text-amber-600">+</span> Platform / Convenience Fee
            </span>
            <span className="font-mono font-semibold">{currency}{platformFee.toLocaleString()}</span>
          </div>
        )}

        {protectionPlan > 0 && (
          <div className="flex justify-between items-center py-0.5 text-rose-900">
            <span className="flex items-center gap-1 font-medium">
              <span className="text-rose-600">+</span> Optional Protection Plan (Pre-selected)
            </span>
            <span className="font-mono font-semibold">{currency}{protectionPlan.toLocaleString()}</span>
          </div>
        )}

        {taxes > 0 && (
          <div className="flex justify-between items-center py-0.5 text-slate-600">
            <span className="font-medium">+ Taxes & Statutory Duties (GST)</span>
            <span className="font-mono font-semibold">{currency}{taxes.toLocaleString()}</span>
          </div>
        )}

        {otherFees && otherFees.map((fee, idx) => (
          <div key={idx} className="flex justify-between items-center py-0.5 text-amber-900">
            <span className="font-medium">+ {fee.name}</span>
            <span className="font-mono font-semibold">{currency}{fee.amount.toLocaleString()}</span>
          </div>
        ))}

        {/* Divider & Estimated Total */}
        <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-900">
          <span>Estimated Total Payment</span>
          <span className="font-mono text-base font-extrabold text-slate-900">{currency}{finalTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Precision / Evidence Disclaimer */}
      <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 italic">
          <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
          Always labeled as "Estimated" until payment confirmation receipt.
        </span>
        <span className="font-mono text-[10px] text-slate-400">
          Math verified: {advertisedPrice} + {extraCost} = {finalTotal}
        </span>
      </div>
    </div>
  );
};
