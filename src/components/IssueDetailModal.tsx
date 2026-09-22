import React from 'react';
import { 
  X, 
  AlertCircle, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  MapPin, 
  DollarSign, 
  Lightbulb, 
  CheckSquare,
  Eye
} from 'lucide-react';
import { ScanIssue } from '../types';

interface IssueDetailModalProps {
  issue: ScanIssue | null;
  onClose: () => void;
}

export const IssueDetailModal: React.FC<IssueDetailModalProps> = ({ issue, onClose }) => {
  if (!issue) return null;

  const statusConfig = {
    detected: {
      label: 'DETECTED',
      badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
      icon: <AlertCircle className="w-5 h-5 text-rose-600" />
    },
    possible: {
      label: 'POSSIBLE CONCERN',
      badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
      icon: <AlertTriangle className="w-5 h-5 text-amber-600" />
    },
    not_detected: {
      label: 'NOT DETECTED',
      badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600" />
    }
  }[issue.status];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      id="issue-detail-modal-backdrop"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
        id="issue-detail-modal-container"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-start justify-between gap-4 bg-slate-50/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wider ${statusConfig.badgeClass}`}>
                {statusConfig.icon}
                {statusConfig.label}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
                Source: {issue.source}
              </span>
              {issue.confidenceScore && (
                <span className="text-xs font-mono text-slate-500">
                  {issue.confidenceScore}% confidence
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-xl text-slate-900">
              {issue.name}
            </h3>
          </div>

          <button
            id="close-issue-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Section 1: WHAT WE FOUND */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <Eye className="w-4 h-4 text-slate-600" />
              <span>What SafeCart Found</span>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <p className="text-sm font-medium text-slate-800 leading-relaxed">
                {issue.evidence}
              </p>
            </div>
          </div>

          {/* Section 2: WHY THIS MATTERS */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Why This Matters to You</span>
            </div>
            <div className="bg-amber-50/70 rounded-xl p-4 border border-amber-200/80">
              <p className="text-sm text-amber-950 font-medium leading-relaxed">
                {issue.whyItMatters}
              </p>
            </div>
          </div>

          {/* Section 3: WHAT YOU CAN DO (RECOMMENDED ACTION) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>What You Can Do Before Paying</span>
            </div>
            <div className="bg-emerald-50/70 rounded-xl p-4 border border-emerald-200/80">
              <p className="text-sm text-emerald-950 font-medium leading-relaxed">
                {issue.recommendedAction}
              </p>
            </div>
          </div>

          {/* Section 4: EVIDENCE AUDIT DATA */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-600 uppercase tracking-wider border-b border-slate-200 pb-2">
              Auditable Evidence Details
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-500 block">Observed Location</span>
                  <span className="font-medium text-slate-800">{issue.location}</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <DollarSign className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-500 block">Potential Financial Impact</span>
                  <span className="font-medium text-slate-800">
                    {issue.potentialCost > 0 
                      ? `${issue.currency}${issue.potentialCost} additional` 
                      : 'Non-monetary (contract / urgency friction)'}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:col-span-2">
                <FileText className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-500 block">Verification Standard</span>
                  <span className="text-slate-600">
                    Derived from direct observation ({issue.source}). SafeCart does not fabricate or assume unobserved fees.
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Click outside to dismiss
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
          >
            I Understand — Back to Results
          </button>
        </div>

      </div>
    </div>
  );
};
