import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  RotateCcw, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

export const FeeCalculatorView: React.FC = () => {
  const { setCurrentRoute } = useSafeCart();

  const [basePrice, setBasePrice] = useState<number>(499);
  const [deliveryFee, setDeliveryFee] = useState<number>(49);
  const [platformFee, setPlatformFee] = useState<number>(20);
  const [warrantyFee, setWarrantyFee] = useState<number>(99);
  const [taxes, setTaxes] = useState<number>(58);
  const [otherFee, setOtherFee] = useState<number>(0);

  // Exact Mathematical Calculations
  const calculatedTotal = basePrice + deliveryFee + platformFee + warrantyFee + taxes + otherFee;
  const extraCost = calculatedTotal - basePrice;
  const markupPercent = basePrice > 0 ? ((extraCost / basePrice) * 100).toFixed(1) : '0';

  const handleReset = () => {
    setBasePrice(499);
    setDeliveryFee(49);
    setPlatformFee(20);
    setWarrantyFee(99);
    setTaxes(58);
    setOtherFee(0);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="fee-calculator-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Pre-Payment Mathematics
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Hidden Fee & Drip Pricing Calculator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Compute the true out-of-pocket cost and percentage markup when multiple fees are added at checkout.
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Sample</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <h3 className="font-display font-bold text-base text-slate-900 border-b border-slate-100 pb-3">
            Enter Checkout Line Items
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Advertised Catalog / Base Price (₹)
              </label>
              <input
                type="number"
                min="0"
                value={basePrice || ''}
                onChange={(e) => setBasePrice(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <span className="text-[11px] text-slate-400 mt-0.5 block">
                The headline price displayed on the product catalog card.
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Delivery & Shipping Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={deliveryFee || ''}
                  onChange={(e) => setDeliveryFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Platform / Convenience Fee (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={platformFee || ''}
                  onChange={(e) => setPlatformFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Pre-Selected Warranty / Add-on (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={warrantyFee || ''}
                  onChange={(e) => setWarrantyFee(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Taxes & GST (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={taxes || ''}
                  onChange={(e) => setTaxes(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Other Packaging or Surcharges (₹)
              </label>
              <input
                type="number"
                min="0"
                value={otherFee || ''}
                onChange={(e) => setOtherFee(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-mono text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>
        </div>

        {/* Right Output & Visualization (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Calculated Transparency Analysis
            </span>

            {/* Total Comparison Box */}
            <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                True Estimated Checkout Outflow
              </span>
              <div className="font-display text-3xl font-extrabold text-emerald-400">
                ₹{calculatedTotal.toLocaleString()}
              </div>
              <div className="text-xs text-slate-300 flex items-center justify-between pt-1 border-t border-slate-800">
                <span>Base Headline: ₹{basePrice}</span>
                <span className="font-bold text-amber-400">+{markupPercent}% markup</span>
              </div>
            </div>

            {/* Extra Cost Callout */}
            {extraCost > 0 ? (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs text-amber-900">
                    You may pay ₹{extraCost.toLocaleString()} more than the advertised price.
                  </h4>
                  <p className="text-[11px] text-amber-800 mt-0.5">
                    Unbundled fees represent a +{markupPercent}% inflation over the initial price tag.
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                No extra fees detected. The checkout price matches the advertised rate.
              </div>
            )}

            {/* Visual Bar Ratio */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs text-slate-600 font-semibold">
                <span>Base Price</span>
                <span>Additional Fees</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                <div 
                  className="bg-emerald-500 h-full"
                  style={{ width: `${calculatedTotal > 0 ? (basePrice / calculatedTotal) * 100 : 100}%` }}
                />
                <div 
                  className="bg-amber-500 h-full"
                  style={{ width: `${calculatedTotal > 0 ? (extraCost / calculatedTotal) * 100 : 0}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>₹{basePrice} ({(calculatedTotal > 0 ? (basePrice / calculatedTotal) * 100 : 100).toFixed(0)}%)</span>
                <span>₹{extraCost} ({(calculatedTotal > 0 ? (extraCost / calculatedTotal) * 100 : 0).toFixed(0)}%)</span>
              </div>
            </div>

            {/* Audit Math Summary */}
            <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 font-mono text-slate-600">
              <div className="flex justify-between">
                <span>Advertised:</span>
                <span>₹{basePrice}</span>
              </div>
              <div className="flex justify-between text-amber-800">
                <span>Total Surcharges:</span>
                <span>+₹{extraCost}</span>
              </div>
              <div className="flex justify-between font-bold text-slate-900 pt-1 border-t border-slate-200">
                <span>Final:</span>
                <span>₹{calculatedTotal}</span>
              </div>
            </div>

          </div>

          <button
            onClick={() => setCurrentRoute('scan')}
            className="w-full py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <span>Scan Real Checkout Page Instead</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
