import React from 'react';
import { 
  AlertTriangle, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight,
  ExternalLink,
  ShieldAlert,
  Tag
} from 'lucide-react';
import { ScanIssue, PatternStatus, SeverityLevel } from '../types';

interface IssueCardProps {
  issue: ScanIssue;
  onSelect: (issue: ScanIssue) => void;
}

export const IssueCard: React.FC<IssueCardProps> = ({ issue, onSelect }) => {
  const statusConfig = {
    detected: {
      label: 'DETECTED',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: <AlertCircle className="w-4 h-4 text-rose-600" />
    },
    possible: {
      label: 'POSSIBLE CONCERN',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    not_detected: {
      label: 'NOT DETECTED',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />
    }
  }[issue.status];

  const severityConfig = {
    low: { label: 'Low Severity', class: 'text-slate-600 bg-slate-100' },
    medium: { label: 'Medium Severity', class: 'text-amber-700 bg-amber-50' },
    high: { label: 'High Severity', class: 'text-rose-700 bg-rose-50' }
  }[issue.severity];

  return (
    <div 
      onClick={() => onSelect(issue)}
      className="group bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
      id={`issue-card-${issue.id}`}
    >
      <div>
        {/* Top Badges: Status + Source Tag + Severity */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${statusConfig.badgeClass}`}>
              {statusConfig.icon}
              {statusConfig.label}
            </span>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Source: {issue.source}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${severityConfig.class}`}>
              {severityConfig.label}
            </span>
            {issue.potentialCost > 0 && (
              <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                +{issue.currency}{issue.potentialCost}
              </span>
            )}
          </div>
        </div>

        {/* Issue Name */}
        <h4 className="font-display font-bold text-base text-slate-900 group-hover:text-emerald-700 transition-colors mt-1">
          {issue.name}
        </h4>

        {/* Why It Matters Snippet */}
        <div className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
          <span className="font-semibold text-slate-800">Why it matters: </span>
          {issue.whyItMatters}
        </div>

        {/* Observed Evidence Snippet */}
        <div className="mt-2.5 p-2.5 bg-slate-50 rounded-lg border border-slate-200/80 text-[11px] font-mono text-slate-700 line-clamp-2">
          <span className="font-bold text-slate-500 uppercase not-mono text-[9px] block">
            Observed Evidence ({issue.location}):
          </span>
          "{issue.evidence}"
        </div>
      </div>

      {/* Footer Action */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-500 font-medium">
          Action: <span className="text-slate-800 font-semibold">{issue.recommendedAction.slice(0, 48)}...</span>
        </span>
        <span className="flex items-center gap-1 font-bold text-emerald-600 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2">
          View details <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </div>
  );
};
