import React from 'react';
import { SafeCartProvider, useSafeCart } from './context/SafeCartContext';
import { Navbar } from './components/Navbar';
import { ScanProgressModal } from './components/ScanProgressModal';
import { IssueDetailModal } from './components/IssueDetailModal';

// Views
import { LandingPage } from './views/LandingPage';
import { DashboardView } from './views/DashboardView';
import { ScanResultsView } from './views/ScanResultsView';
import { SubscriptionsView } from './views/SubscriptionsView';
import { CommunityView } from './views/CommunityView';
import { DarkPatternsLibraryView } from './views/DarkPatternsLibraryView';
import { FeeCalculatorView } from './views/FeeCalculatorView';
import { WebsiteProfileView } from './views/WebsiteProfileView';
import { SavedScansView } from './views/SavedScansView';
import { SettingsPrivacyView } from './views/SettingsPrivacyView';
import { ScannerCard } from './components/ScannerCard';

import { 
  ShieldCheck, 
  Lock, 
  ExternalLink, 
  Sparkles, 
  Receipt,
  Heart
} from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute, setCurrentRoute, activeModalIssue, setActiveModalIssue, runDemoScan } = useSafeCart();

  const renderCurrentView = () => {
    switch (currentRoute) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardView />;
      case 'scan':
        return (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Pre-Payment Scanner
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Audit Any Checkout Page
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Paste a checkout URL or upload an order screenshot to reveal hidden fees, auto-renewals, and manipulative checkboxes.
              </p>
            </div>
            <ScannerCard />
          </div>
        );
      case 'results':
        return <ScanResultsView />;
      case 'subscriptions':
        return <SubscriptionsView />;
      case 'community':
        return <CommunityView />;
      case 'patterns':
        return <DarkPatternsLibraryView />;
      case 'calculator':
        return <FeeCalculatorView />;
      case 'website-profile':
        return <WebsiteProfileView />;
      case 'saved':
        return <SavedScansView />;
      case 'settings':
      case 'privacy':
        return <SettingsPrivacyView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Container */}
      <main className="flex-1 pb-16">
        {renderCurrentView()}
      </main>

      {/* Global Modals */}
      <ScanProgressModal />
      <IssueDetailModal
        issue={activeModalIssue}
        onClose={() => setActiveModalIssue(null)}
      />

      {/* SafeCart Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100">
            
            {/* Col 1: Brand & Tagline */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="font-display font-extrabold text-lg text-slate-900">
                  SafeCart
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">
                Shop Smart. See the Hidden Costs. Avoid Dark Patterns.
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Zero card or bank credentials collected</span>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Platform
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <button onClick={() => setCurrentRoute('dashboard')} className="hover:text-slate-900">
                    Consumer Dashboard
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRoute('scan')} className="hover:text-slate-900">
                    Scan Checkout
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRoute('calculator')} className="hover:text-slate-900">
                    Hidden Fee Calculator
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRoute('subscriptions')} className="hover:text-slate-900">
                    Subscription Guard
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Education & Community */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Resources
              </span>
              <ul className="space-y-1.5 text-slate-600">
                <li>
                  <button onClick={() => setCurrentRoute('patterns')} className="hover:text-slate-900">
                    Dark Pattern Field Guide
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRoute('community')} className="hover:text-slate-900">
                    Community Intelligence
                  </button>
                </li>
                <li>
                  <button onClick={() => setCurrentRoute('privacy')} className="hover:text-slate-900">
                    Privacy & Security Architecture
                  </button>
                </li>
                <li>
                  <button onClick={() => runDemoScan('shopease')} className="text-amber-700 font-semibold hover:text-amber-800">
                    Run Interactive Demo Audit
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: SafeCart Ethics Disclaimer */}
            <div className="space-y-2">
              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block">
                Transparency Standard
              </span>
              <p className="text-slate-500 leading-relaxed text-[11px]">
                SafeCart operates as an impartial consumer transparency assistant. We highlight observed clauses, calculate line-item arithmetic, and leave final purchasing authority entirely in your hands.
              </p>
            </div>

          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
            <span>© 2026 SafeCart Transparency Labs. Open consumer protection.</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentRoute('privacy')} className="hover:underline">
                Privacy Policy
              </button>
              <span>•</span>
              <button onClick={() => setCurrentRoute('patterns')} className="hover:underline">
                Recognized Patterns
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <SafeCartProvider>
      <AppContent />
    </SafeCartProvider>
  );
}
