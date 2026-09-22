import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  AlertOctagon, 
  Info, 
  ChevronDown, 
  ChevronUp,
  HelpCircle
} from 'lucide-react';
import { RiskLevel, ScoreBreakdownItem } from '../types';

interface RiskMeterProps {
  score: number;
  level: RiskLevel;
  concernsCount: number;
  breakdown: ScoreBreakdownItem[];
  isDemo?: boolean;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({
  score,
  level,
  concernsCount,
  breakdown,
  isDemo
}) => {
  const [showCalculationDetails, setShowCalculationDetails] = useState<boolean>(true);

  // Configuration for color, label, and accessible iconography
  const config = {
    low: {
      label: 'LOW CONCERN',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      meterColor: 'bg-emerald-500',
      textColor: 'text-emerald-700',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      description: 'Checkout patterns appear transparent with minimal or zero hidden add-ons detected.'
    },
    medium: {
      label: 'POTENTIAL CONCERNS',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
      meterColor: 'bg-amber-500',
      textColor: 'text-amber-700',
      icon: <AlertTriangle className="w-6 h-6 text-amber-600" />,
      description: 'One or more items may add unexpected costs or recurring obligations unless reviewed.'
    },
    high: {
      label: 'MULTIPLE CONCERNS DETECTED',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
      meterColor: 'bg-rose-500',
      textColor: 'text-rose-700',
      icon: <AlertOctagon className="w-6 h-6 text-rose-600" />,
      description: 'Multiple checkout patterns detected that may significantly alter your final or ongoing payment.'
    }
  }[level];

  return (
    <div 
      className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs" 
      id="safecart-risk-meter-container"
    >
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
            {config.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
                Transparency Risk Score
              </span>
              {isDemo && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                  DEMO SCENARIO
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {score}
              </span>
              <span className="text-sm font-semibold text-slate-400">/ 100</span>
              <span className={`ml-2 px-2.5 py-1 text-xs font-bold border rounded-md uppercase tracking-wide ${config.badgeClass}`}>
                {config.label}
              </span>
            </div>
          </div>
        </div>

        {/* Explainability Note */}
        <div className="sm:text-right max-w-xs">
          <p className="text-xs font-semibold text-slate-800">
            Based on {concernsCount} {concernsCount === 1 ? 'pattern' : 'patterns'} detected
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
            Not proof of fraud. Highlights clauses and items to inspect prior to paying.
          </p>
        </div>
      </div>

      {/* Visual Meter Bar */}
      <div className="mt-5 space-y-2">
        <div className="flex justify-between text-[11px] font-semibold text-slate-500">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
            0–30 Low
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block"></span>
            31–60 Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block"></span>
            61–100 High
          </span>
        </div>

        {/* Meter Gauge Track */}
        <div className="relative h-3 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div 
            className={`h-full rounded-full transition-all duration-700 ease-out ${config.meterColor}`}
            style={{ width: `${Math.min(Math.max(score, 4), 100)}%` }}
          />
        </div>

        <p className="text-xs text-slate-600 pt-1">
          {config.description}
        </p>
      </div>

      {/* Explainable Modular Point Breakdown Accordion */}
      {breakdown && breakdown.length > 0 && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button
            id="toggle-score-calculation-btn"
            onClick={() => setShowCalculationDetails(!showCalculationDetails)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-700 hover:text-slate-900 transition-colors py-1"
          >
            <div className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-slate-500" />
              <span>How This Score Was Calculated (Auditable Breakdown)</span>
            </div>
            {showCalculationDetails ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {showCalculationDetails && (
            <div className="mt-2.5 space-y-2 bg-slate-50/80 rounded-xl p-3 border border-slate-200/80 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {breakdown.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start justify-between gap-2 p-2 bg-white rounded-lg border border-slate-200"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{item.name}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-tight">{item.reason}</p>
                    </div>
                    <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200 text-xs whitespace-nowrap">
                      +{item.points}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-200/80 px-1 text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3 h-3 text-slate-400" />
                  Scores are calculated additively from detected patterns, never black-box AI guessing.
                </span>
                <span className="font-bold text-slate-800">
                  Total Risk Points: {score}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
