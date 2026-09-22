import React from 'react';
import { 
  Globe, 
  ArrowLeft, 
  ShieldCheck, 
  AlertTriangle, 
  Search, 
  FileText, 
  CheckCircle2, 
  Receipt,
  Users,
  CalendarClock,
  ExternalLink
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';
import { WebsiteSafetyProfile } from '../types';

export const WebsiteProfileView: React.FC = () => {
  const { 
    selectedWebsiteDomain, 
    setCurrentRoute, 
    websiteProfiles, 
    communityReports, 
    scanHistory,
    runUrlScan,
    setCurrentScan
  } = useSafeCart();

  const domain = selectedWebsiteDomain || 'shopease-fictional-store.demo';
  const profileList = Object.values(websiteProfiles);
  const profile: WebsiteSafetyProfile = profileList.find((p: WebsiteSafetyProfile) => p.domain.toLowerCase() === domain.toLowerCase()) || {
    domain: domain,
    name: domain.split('.')[0].toUpperCase(),
    category: 'E-Commerce / Retail',
    riskIndicator: 'medium' as const,
    averageRiskScore: 54,
    totalScans: 12,
    lastScanned: '2026-09-20',
    commonDetectedPatterns: [
      { pattern: 'Pre-selected Warranties', occurrences: 8 },
      { pattern: 'Drip Shipping Fees', occurrences: 6 }
    ],
    reportedHiddenFeesAverage: 129,
    subscriptionComplaintsCount: 3,
    communityReportsCount: 4,
    safetyChecklist: [
      'Verify if ₹99 accidental damage protection was unchecked',
      'Compare catalog price against final payment gateway amount',
      'Check if shipping fee was waived with discount code'
    ]
  };

  const domainReports = communityReports.filter(r => r.websiteDomain.toLowerCase() === domain.toLowerCase());
  const domainScans = scanHistory.filter(s => s.targetDomain.toLowerCase() === domain.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="website-profile-root">
      
      {/* Top Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
                {profile.domain}
              </h1>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase border ${
                profile.riskIndicator === 'high' 
                  ? 'bg-rose-50 text-rose-700 border-rose-300' 
                  : profile.riskIndicator === 'medium'
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-300'
              }`}>
                {profile.riskIndicator} Risk Indicator
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Category: {profile.category} • Audited across {profile.totalScans} checkouts
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            runUrlScan(`https://${profile.domain}/checkout`);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>Scan This Store</span>
        </button>
      </div>

      {/* 2-Column Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left 7 Columns: Known Billing Practices & Checklist */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Site-Specific Checklist */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="font-display font-bold text-base text-slate-900">
                Checklist for {profile.domain}
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Shoppers frequently report these specific items when checking out on this merchant:
            </p>

            <div className="space-y-2.5">
              {profile.safetyChecklist.map((item: string, idx: number) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-800">
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Average Reported Extra Fees */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h3 className="font-display font-bold text-base text-slate-900">
              Transparency Observations
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Avg Extra Fee Reported</span>
                <span className="font-mono text-base font-bold text-amber-700 mt-1 block">
                  ₹{profile.reportedHiddenFeesAverage}
                </span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[11px] font-semibold text-slate-500 block">Auto-Renew Complaints</span>
                <span className="font-mono text-base font-bold text-rose-700 mt-1 block">
                  {profile.subscriptionComplaintsCount}
                </span>
              </div>
            </div>
          </div>

          {/* Community Reports for this site */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-600" />
                <span>Community Reports ({domainReports.length})</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('community')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Submit Report
              </button>
            </div>

            {domainReports.length === 0 ? (
              <p className="text-xs text-slate-500 italic">No user complaints logged for this domain yet.</p>
            ) : (
              <div className="space-y-3">
                {domainReports.map((rep) => (
                  <div key={rep.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>{rep.title}</span>
                      <span className="text-[10px] text-slate-400 font-normal">{rep.dateReported}</span>
                    </div>
                    <p className="text-slate-600 leading-snug">{rep.description}</p>
                    {rep.extraFeeReported && (
                      <span className="text-[10px] font-bold text-rose-600 block pt-1">
                        Reported extra fee: +₹{rep.extraFeeReported}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right 5 Columns: Risk Score & Pattern Frequency */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Average Risk Indicator */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
              Average Risk Assessment
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl font-extrabold text-slate-900">
                {profile.averageRiskScore}
              </span>
              <span className="text-slate-400 font-mono text-sm">/ 100</span>
            </div>
            <p className="text-xs text-slate-500 leading-snug">
              Based on automated audits and reported consumer friction points. SafeCart never marks legitimate businesses as scams; we score transparency.
            </p>
          </div>

          {/* Common Detected Patterns */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
            <h4 className="font-display font-bold text-sm text-slate-900">
              Recurring Pattern Frequency
            </h4>
            <div className="space-y-2 text-xs">
              {profile.commonDetectedPatterns.map((pat: { pattern: string; occurrences: number }, idx: number) => (
                <div key={idx} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between">
                  <span className="font-bold text-amber-950 block">{pat.pattern}</span>
                  <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    {pat.occurrences} audits
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Scans for this domain */}
          {domainScans.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-3">
              <h4 className="font-display font-bold text-sm text-slate-900">
                Saved Audits for this Domain
              </h4>
              <div className="space-y-2">
                {domainScans.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      setCurrentScan(s);
                      setCurrentRoute('results');
                    }}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">{s.scanDate}</span>
                      <span className="text-[11px] text-slate-500">{s.detectedConcernsCount} concerns flagged</span>
                    </div>
                    <span className="font-mono font-bold text-slate-800">
                      Score: {s.riskScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
