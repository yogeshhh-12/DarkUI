import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Search, 
  ExternalLink, 
  Receipt, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

export const SavedScansView: React.FC = () => {
  const { 
    scanHistory, 
    savedScans, 
    toggleSaveScan, 
    setCurrentScan, 
    setCurrentRoute,
    removeScanFromHistory
  } = useSafeCart();

  const savedList = scanHistory.filter(s => savedScans.includes(s.id));
  const recentList = scanHistory;

  const handleOpenScan = (scan: any) => {
    setCurrentScan(scan);
    setCurrentRoute('results');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="saved-scans-view-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Audit Archive
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Scan History & Bookmarks
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review past transparency reports, re-verify price math, and manage bookmarked checkouts.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('scan')}
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          <Search className="w-4 h-4" />
          <span>New Checkout Audit</span>
        </button>
      </div>

      {/* Bookmarked Scans */}
      <div className="space-y-4">
        <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-600" />
          <span>Bookmarked Checkouts ({savedList.length})</span>
        </h3>

        {savedList.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center text-xs text-slate-500">
            No bookmarked scans yet. Click "Save Scan" on any scan result to pin it here.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedList.map((scan) => (
              <div
                key={scan.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-display font-bold text-base text-slate-900">
                        {scan.targetDomain}
                      </h4>
                      <span className="text-xs text-slate-400">Audited {scan.scanDate}</span>
                    </div>

                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      Score: {scan.riskScore}/100
                    </span>
                  </div>

                  <div className="mt-3 p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Advertised:</span>
                      <span className="font-mono font-semibold">₹{scan.priceBreakdown.advertisedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Estimated Final:</span>
                      <span className="font-mono font-bold text-slate-900">₹{scan.priceBreakdown.estimatedTotal}</span>
                    </div>
                    {scan.priceBreakdown.potentialExtraCost > 0 && (
                      <div className="flex justify-between text-amber-700 font-semibold pt-1 border-t border-slate-200">
                        <span>Extra charges:</span>
                        <span className="font-mono">+₹{scan.priceBreakdown.potentialExtraCost}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <button
                    onClick={() => toggleSaveScan(scan.id)}
                    className="text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    Remove Bookmark
                  </button>

                  <button
                    onClick={() => handleOpenScan(scan)}
                    className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                  >
                    <span>View Audit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Complete Scan History */}
      <div className="space-y-4 pt-4">
        <h3 className="font-display font-bold text-base text-slate-900 flex items-center gap-2">
          <Receipt className="w-4 h-4 text-slate-500" />
          <span>All Past Audits ({recentList.length})</span>
        </h3>

        <div className="space-y-3">
          {recentList.map((scan) => (
            <div
              key={scan.id}
              className="bg-white rounded-xl border border-slate-200 p-4 hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-sm text-slate-900">
                    {scan.targetDomain}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.2 rounded border border-slate-200 capitalize">
                    {scan.scanType}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{scan.scanDate}</span>
                  <span>•</span>
                  <span>{scan.detectedConcernsCount} concerns flagged</span>
                  <span>•</span>
                  <span className="font-mono">Advertised ₹{scan.priceBreakdown.advertisedPrice} → Final ₹{scan.priceBreakdown.estimatedTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => removeScanFromHistory(scan.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete from history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleOpenScan(scan)}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Open</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
