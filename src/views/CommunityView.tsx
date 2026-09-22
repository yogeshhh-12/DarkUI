import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  ThumbsUp, 
  ThumbsDown, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter, 
  ExternalLink,
  MessageSquare,
  X,
  FileText
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';
import { CommunityReport, DetectionCategory } from '../types';

export const CommunityView: React.FC = () => {
  const { communityReports, voteCommunityReport, addCommunityReport, setSelectedWebsiteDomain, setCurrentRoute } = useSafeCart();
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);

  // Form State
  const [targetDomain, setTargetDomain] = useState('');
  const [targetUrl, setTargetUrl] = useState('');
  const [reportTitle, setReportTitle] = useState('');
  const [category, setCategory] = useState<DetectionCategory>('preselection');
  const [description, setDescription] = useState('');
  const [evidenceText, setEvidenceText] = useState('');
  const [extraFee, setExtraFee] = useState('');
  const [subIssue, setSubIssue] = useState(false);

  const filteredReports = communityReports.filter((rep) => {
    const matchesCat = filterCategory === 'all' || rep.category === filterCategory;
    const matchesSearch = 
      rep.websiteDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetDomain.trim() || !reportTitle.trim()) return;

    addCommunityReport({
      websiteDomain: targetDomain.trim().replace(/^https?:\/\//, '').split('/')[0],
      websiteUrl: targetUrl.trim() || `https://${targetDomain}`,
      category,
      title: reportTitle.trim(),
      description: description.trim(),
      evidenceText: evidenceText.trim() || 'User submitted screenshot and observation.',
      extraFeeReported: extraFee ? parseFloat(extraFee) : undefined,
      subscriptionIssueReported: subIssue,
      screenshotAttached: true
    });

    setShowReportModal(false);
    setTargetDomain('');
    setTargetUrl('');
    setReportTitle('');
    setDescription('');
    setEvidenceText('');
    setExtraFee('');
    setSubIssue(false);
  };

  const handleDomainClick = (domain: string) => {
    setSelectedWebsiteDomain(domain);
    setCurrentRoute('website-profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="community-view-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Collective Consumer Intelligence
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Community Checkout Reports
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Real experiences reported by shoppers. We verify evidence before patterns are marked.
          </p>
        </div>

        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Report a Checkout Issue</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by domain, title or fee..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Reports' },
            { id: 'preselection', label: 'Pre-Selection' },
            { id: 'recurring_billing', label: 'Subscriptions' },
            { id: 'convenience_fee', label: 'Fees & Surcharges' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                filterCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Feed */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-2xs space-y-4"
            id={`community-report-${report.id}`}
          >
            {/* Top Row: Domain, Status & Date */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDomainClick(report.websiteDomain)}
                  className="font-display font-bold text-sm text-slate-900 hover:text-emerald-700 underline transition-colors"
                >
                  {report.websiteDomain}
                </button>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] font-semibold text-slate-500">
                  {report.dateReported}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-[11px] text-slate-500">
                  {report.reportsCount} user reports
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 rounded border border-amber-200 uppercase tracking-wide">
                  Reported by users
                </span>
                {report.extraFeeReported && (
                  <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    +₹{report.extraFeeReported} extra
                  </span>
                )}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-1.5">
              <h3 className="font-display font-bold text-base text-slate-900">
                {report.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* Observed Evidence Box */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-1">
              <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px] block">
                Evidence Submitted
              </span>
              <p className="font-mono text-[11px] text-slate-700">
                "{report.evidenceText}"
              </p>
            </div>

            {/* Voting Bar */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Was this report accurate or helpful?
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => voteCommunityReport(report.id, 'helpful')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    report.userVoted === 'helpful'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({report.helpfulVotes})</span>
                </button>

                <button
                  onClick={() => voteCommunityReport(report.id, 'unhelpful')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    report.userVoted === 'unhelpful'
                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                  <span>Not Helpful ({report.unhelpfulVotes})</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-display font-bold text-base text-slate-900">
                  Report a Checkout Concern
                </h3>
                <p className="text-[11px] text-slate-500">
                  Help fellow shoppers avoid hidden costs. Please provide exact observed evidence.
                </p>
              </div>
              <button onClick={() => setShowReportModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Website Domain / Address</label>
                <input
                  type="text"
                  required
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  placeholder="e.g. quickdeal-store.demo"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Issue Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  <option value="preselection">Pre-Selection (Add-on pre-checked)</option>
                  <option value="hidden_costs">Hidden Costs / Drip Pricing</option>
                  <option value="recurring_billing">Recurring Subscription / Trial Trap</option>
                  <option value="fake_urgency">Fake Countdown Timer / Scarcity</option>
                  <option value="convenience_fee">Convenience / Platform Fee</option>
                  <option value="difficult_cancellation">Difficult Cancellation Clause</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title of Concern</label>
                <input
                  type="text"
                  required
                  value={reportTitle}
                  onChange={(e) => setReportTitle(e.target.value)}
                  placeholder="e.g. Pre-selected ₹99 warranty in cart summary"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">What happened? (Description)</label>
                <textarea
                  rows={2}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain how the fee was presented or concealed..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Exact Observed Evidence / Clause</label>
                <textarea
                  rows={2}
                  value={evidenceText}
                  onChange={(e) => setEvidenceText(e.target.value)}
                  placeholder="Quote the exact line item, checkbox text, or countdown message..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Extra Fee Amount (₹)</label>
                  <input
                    type="number"
                    value={extraFee}
                    onChange={(e) => setExtraFee(e.target.value)}
                    placeholder="e.g. 149"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="sub-issue-check"
                    checked={subIssue}
                    onChange={(e) => setSubIssue(e.target.checked)}
                    className="rounded text-slate-900 focus:ring-slate-900"
                  />
                  <label htmlFor="sub-issue-check" className="font-semibold text-slate-700">
                    Includes auto-renewal
                  </label>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowReportModal(false)}
                  className="px-3 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg"
                >
                  Publish Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
