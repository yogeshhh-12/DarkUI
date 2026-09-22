import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  TrendingUp, 
  Sparkles, 
  Receipt, 
  CalendarClock, 
  AlertTriangle, 
  Bookmark, 
  ExternalLink, 
  ArrowRight,
  Plus,
  Trash2,
  CheckCircle2,
  AlertOctagon,
  Clock
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';
import { ScannerCard } from '../components/ScannerCard';

export const DashboardView: React.FC = () => {
  const { 
    scanHistory, 
    setCurrentScan, 
    setCurrentRoute, 
    savedSubscriptions, 
    communityReports, 
    moneyPotentiallySaved,
    runDemoScan,
    setSelectedWebsiteDomain
  } = useSafeCart();

  const handleViewScan = (scan: any) => {
    setCurrentScan(scan);
    setCurrentRoute('results');
  };

  const handleViewDomainProfile = (domain: string) => {
    setSelectedWebsiteDomain(domain);
    setCurrentRoute('website-profile');
  };

  // Find nearest upcoming renewal
  const upcomingRenewal = savedSubscriptions.length > 0
    ? [...savedSubscriptions].sort((a, b) => new Date(a.nextRenewalDate).getTime() - new Date(b.nextRenewalDate).getTime())[0]
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="dashboard-view-root">
      
      {/* Top Welcome & Headline */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Consumer Transparency Command Center
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Shop smarter. Know what you're really paying.
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Audit any checkout before clicking “Pay”. See the true unbundled costs, auto-renewals, and fine-print conditions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => runDemoScan('shopease')}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-2xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Try Sample Scan</span>
          </button>
        </div>
      </div>

      {/* Main Scanner Card */}
      <ScannerCard />

      {/* Real Data Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4" id="dashboard-stats-strip">
        
        {/* Money Potentially Saved (Mathematically derived from scans) */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Fees Flagged
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-2">
            ₹{moneyPotentiallySaved.toLocaleString()}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Calculated across {scanHistory.length} audited carts
          </p>
        </div>

        {/* Audited Scans Count */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Scans Completed
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-2">
            {scanHistory.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            URLs and checkout screenshots
          </p>
        </div>

        {/* Active Subscriptions Monitored */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Tracked Renewals
            </span>
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <CalendarClock className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-2">
            {savedSubscriptions.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Protecting against surprise renewals
          </p>
        </div>

        {/* Community Alerts Flagged */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Community Reports
            </span>
            <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="font-display text-2xl font-bold text-slate-900 mt-2">
            {communityReports.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Consumer peer transparency reports
          </p>
        </div>

      </div>

      {/* 2-Column Content Grid: Recent Scans vs Alerts & Subscriptions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 7 Columns: Recent Scans */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
              <Receipt className="w-4 h-4 text-slate-500" />
              <span>Recent Checkout Audits</span>
            </h3>
            <button
              onClick={() => setCurrentRoute('saved')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All History
            </button>
          </div>

          <div className="space-y-3">
            {scanHistory.map((scan) => {
              const isHigh = scan.riskLevel === 'high';
              const isMedium = scan.riskLevel === 'medium';
              return (
                <div
                  key={scan.id}
                  id={`dashboard-scan-item-${scan.id}`}
                  onClick={() => handleViewScan(scan)}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 hover:shadow-xs transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-sm text-slate-900">
                        {scan.targetDomain}
                      </span>
                      {scan.isDemo && (
                        <span className="text-[9px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200">
                          DEMO
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span>{scan.scanDate}</span>
                      <span>•</span>
                      <span>{scan.detectedConcernsCount} concerns flagged</span>
                      {scan.priceBreakdown.potentialExtraCost > 0 && (
                        <>
                          <span>•</span>
                          <span className="font-bold text-amber-700">
                            +₹{scan.priceBreakdown.potentialExtraCost} extra
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <div className="text-right">
                      <div className="text-xs font-mono font-bold text-slate-800">
                        Score: {scan.riskScore}/100
                      </div>
                      <span className={`text-[10px] font-bold uppercase ${
                        isHigh ? 'text-rose-600' : isMedium ? 'text-amber-600' : 'text-emerald-600'
                      }`}>
                        {scan.riskLevel}
                      </span>
                    </div>

                    <div className="p-2 text-slate-400 hover:text-slate-700 bg-slate-50 rounded-lg">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 5 Columns: Upcoming Renewals & Community Alerts */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Upcoming Subscriptions Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-amber-600" />
                <span>Upcoming Renewals</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('subscriptions')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                Manage
              </button>
            </div>

            {upcomingRenewal ? (
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-amber-950">
                      {upcomingRenewal.serviceName}
                    </h4>
                    <span className="text-[11px] text-amber-800 font-medium">
                      Renews on: {upcomingRenewal.nextRenewalDate}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-900 bg-white/80 px-2 py-0.5 rounded border border-amber-300">
                    ₹{upcomingRenewal.price}/{upcomingRenewal.billingFrequency}
                  </span>
                </div>
                <p className="text-[11px] text-amber-900 leading-snug">
                  <span className="font-semibold">Cancellation: </span>
                  {upcomingRenewal.cancellationMethod}
                </p>
              </div>
            ) : (
              <div className="p-4 bg-slate-50 rounded-xl text-center text-xs text-slate-500">
                No active renewals tracked. Scans will detect and suggest adding subscriptions here.
              </div>
            )}
          </div>

          {/* Community Alerts Snippet */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                <span>Recent Community Alerts</span>
              </h3>
              <button
                onClick={() => setCurrentRoute('community')}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                All Reports
              </button>
            </div>

            <div className="space-y-2.5">
              {communityReports.slice(0, 2).map((rep) => (
                <div 
                  key={rep.id}
                  onClick={() => setCurrentRoute('community')}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      {rep.websiteDomain}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {rep.dateReported}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-1">
                    {rep.title}
                  </p>
                  {rep.extraFeeReported && (
                    <span className="inline-block text-[10px] font-bold text-rose-600">
                      +₹{rep.extraFeeReported} extra fee reported
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
