import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowLeft, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  AlertTriangle, 
  CalendarClock, 
  Plus, 
  Check, 
  ExternalLink, 
  Search, 
  Copy, 
  FileText,
  Clock,
  Globe,
  Sparkles,
  Download,
  Loader2
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';
import { RiskMeter } from '../components/RiskMeter';
import { TrueCostView } from '../components/TrueCostView';
import { IssueCard } from '../components/IssueCard';
import { BeforeYouPayChecklist } from '../components/BeforeYouPayChecklist';
import { generatePdfReport } from '../utils/pdfGenerator';

export const ScanResultsView: React.FC = () => {
  const { 
    currentScan, 
    setCurrentRoute, 
    savedScans, 
    toggleSaveScan, 
    setActiveModalIssue,
    addSubscription,
    setSelectedWebsiteDomain
  } = useSafeCart();

  const [copiedLink, setCopiedLink] = useState(false);
  const [subSaved, setSubSaved] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  if (!currentScan) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-slate-800">
          No Scan Results Selected
        </h2>
        <p className="text-sm text-slate-500">
          Please run a new checkout scan or select a previous analysis from the dashboard.
        </p>
        <button
          onClick={() => setCurrentRoute('scan')}
          className="px-6 py-2.5 text-xs font-bold text-white bg-slate-900 rounded-xl"
        >
          Scan a Checkout
        </button>
      </div>
    );
  }

  const isSaved = savedScans.includes(currentScan.id);

  const handleDownloadPdf = async () => {
    try {
      setIsExportingPdf(true);
      // Allow UI to update before synchronous PDF calculation
      await new Promise(resolve => setTimeout(resolve, 200));
      generatePdfReport(currentScan);
      setPdfDownloaded(true);
      setTimeout(() => setPdfDownloaded(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF report:', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSaveSubscription = () => {
    if (!currentScan.subscription.hasSubscription) return;
    addSubscription({
      serviceName: `${currentScan.targetDomain} Membership`,
      websiteUrl: currentScan.targetUrl || `https://${currentScan.targetDomain}`,
      price: currentScan.subscription.recurringAmount || 499,
      currency: '₹',
      billingFrequency: currentScan.subscription.billingFrequency || 'monthly',
      nextRenewalDate: new Date(Date.now() + (currentScan.subscription.trialPeriodDays || 7) * 86400000).toISOString().split('T')[0],
      cancellationMethod: currentScan.subscription.cancellationMethod || 'Account settings before next renewal',
      remindDaysBefore: 3,
      notes: currentScan.subscription.trialConversionNotice
    });
    setSubSaved(true);
    setTimeout(() => setSubSaved(false), 3000);
  };

  const handleViewProfile = () => {
    setSelectedWebsiteDomain(currentScan.targetDomain);
    setCurrentRoute('website-profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="scan-results-root">
      
      {/* Top Navigation & Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentRoute('dashboard')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-lg text-slate-900">
                {currentScan.targetDomain}
              </span>
              {currentScan.isDemo && (
                <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                  DEMO AUDIT
                </span>
              )}
              <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 capitalize">
                {currentScan.scanType} Scan
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Audited {currentScan.scanDate} • SafeCart Pre-Payment Layer
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 rounded-xl shadow-2xs transition-all disabled:opacity-60"
            title="Download PDF audit report summarizing detected dark patterns and hidden fees"
          >
            {isExportingPdf ? (
              <Loader2 className="w-3.5 h-3.5 text-slate-600 animate-spin" />
            ) : pdfDownloaded ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Download className="w-3.5 h-3.5 text-slate-700" />
            )}
            <span>{pdfDownloaded ? 'Report Downloaded!' : isExportingPdf ? 'Generating PDF...' : 'Download PDF Report'}</span>
          </button>

          <button
            onClick={() => toggleSaveScan(currentScan.id)}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border transition-colors ${
              isSaved 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {isSaved ? <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved to Audits' : 'Save Scan'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl transition-colors"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={() => setCurrentRoute('scan')}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>
        </div>

      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (7 cols): Risk Meter, Detected Concerns, Before You Pay */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Risk Meter with Auditable Point Arithmetic */}
          <RiskMeter
            score={currentScan.riskScore}
            level={currentScan.riskLevel}
            concernsCount={currentScan.detectedConcernsCount}
            breakdown={currentScan.scoreBreakdown}
            isDemo={currentScan.isDemo}
          />

          {/* 2. Detected Issues List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-slate-900">
                  Detected Patterns & Clauses ({currentScan.issues.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click any card to inspect observed evidence, exact location, and why it matters
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {currentScan.issues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onSelect={(iss) => setActiveModalIssue(iss)}
                />
              ))}
            </div>
          </div>

          {/* 3. Before You Pay Interactive Checklist */}
          <BeforeYouPayChecklist scan={currentScan} />

        </div>

        {/* Right Column (5 cols): True Cost View, Subscription Guard, Website Safety */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 1. True Cost View™ */}
          <TrueCostView breakdown={currentScan.priceBreakdown} />

          {/* 2. Subscription Protection Guard */}
          {currentScan.subscription.hasSubscription ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                    <CalendarClock className="w-4 h-4" />
                  </div>
                  <h3 className="font-display font-bold text-sm text-slate-900">
                    Subscription Protection Guard
                  </h3>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded">
                  AUTO-RENEWAL
                </span>
              </div>

              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-amber-950 block">
                      {currentScan.subscription.trialPeriodDays}-Day Free / Intro Trial
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Converts to ₹{currentScan.subscription.recurringAmount}/{currentScan.subscription.billingFrequency}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase block font-semibold">
                      Estimated Annual Cost
                    </span>
                    <span className="font-mono font-bold text-amber-900 text-sm">
                      ₹{currentScan.subscription.estimatedAnnualCost?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <p className="text-[11px] text-amber-900 font-medium pt-1 border-t border-amber-200/80">
                  <span className="font-semibold">Cancellation Terms: </span>
                  {currentScan.subscription.cancellationMethod}
                </p>
              </div>

              <button
                onClick={handleSaveSubscription}
                disabled={subSaved}
                className={`w-full py-2 text-xs font-bold rounded-xl border transition-colors flex items-center justify-center gap-1.5 ${
                  subSaved 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                    : 'bg-slate-900 hover:bg-slate-800 text-white border-transparent'
                }`}
              >
                {subSaved ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added to Renewal Tracker!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Track This Renewal in Subscriptions</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 text-xs space-y-2">
              <div className="flex items-center gap-2 text-emerald-700 font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>No Recurring Charges Detected</span>
              </div>
              <p className="text-slate-500 leading-snug">
                This appears to be a standard one-time checkout transaction with no detected hidden trial commitments.
              </p>
            </div>
          )}

          {/* 3. Export PDF Audit Report Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900">
                    Export Audit Report
                  </h4>
                  <span className="text-[11px] text-slate-500">
                    Portable PDF breakdown
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                PDF
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-snug">
              Download an itemized report containing the True Cost View™, detected deceptive clauses, and recommended consumer actions before payment.
            </p>

            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
            >
              {isExportingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-700" />
                  <span>Preparing Document...</span>
                </>
              ) : pdfDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-800">Downloaded to Your Device!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-slate-800" />
                  <span>Download Full PDF Report</span>
                </>
              )}
            </button>
          </div>

          {/* 4. Community Profile & Report Shortcut */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-slate-500" />
                <span>Domain Intelligence</span>
              </span>
              <button
                onClick={handleViewProfile}
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-snug">
              See aggregated scan history, common reported patterns, and community feedback for <span className="font-semibold text-slate-800">{currentScan.targetDomain}</span>.
            </p>

            <button
              onClick={() => setCurrentRoute('community')}
              className="w-full py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors"
            >
              Report a Concern on This Website
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
