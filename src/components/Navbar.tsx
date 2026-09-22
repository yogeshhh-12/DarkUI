import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  LayoutDashboard, 
  Bookmark, 
  Users, 
  HelpCircle, 
  CalendarClock, 
  Calculator, 
  Menu, 
  X, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';
import { useSafeCart, AppRoute } from '../context/SafeCartContext';

export const Navbar: React.FC = () => {
  const { currentRoute, setCurrentRoute, runDemoScan, isScanning } = useSafeCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { route: AppRoute; label: string; icon: React.ReactNode }[] = [
    { route: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { route: 'scan', label: 'Scan Checkout', icon: <Search className="w-4 h-4" /> },
    { route: 'calculator', label: 'Fee Calculator', icon: <Calculator className="w-4 h-4" /> },
    { route: 'subscriptions', label: 'Subscriptions', icon: <CalendarClock className="w-4 h-4" /> },
    { route: 'patterns', label: 'Dark Patterns', icon: <HelpCircle className="w-4 h-4" /> },
    { route: 'community', label: 'Community Intel', icon: <Users className="w-4 h-4" /> },
    { route: 'saved', label: 'Saved Scans', icon: <Bookmark className="w-4 h-4" /> },
  ];

  const handleNavClick = (route: AppRoute) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Tagline */}
          <div 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-3 cursor-pointer group select-none"
            id="nav-brand-logo"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition-colors">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-xl tracking-tight text-slate-900">
                  Safe<span className="text-emerald-600">Cart</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                  TRANSPARENCY LAYER
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block font-medium">
                Shop Smart. See the Hidden Costs.
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1" id="desktop-nav-menu">
            {navItems.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  id={`nav-link-${item.route}`}
                  onClick={() => handleNavClick(item.route)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-slate-900 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick Action CTAs */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              id="nav-quick-demo-btn"
              onClick={() => runDemoScan('shopease')}
              disabled={isScanning}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Try Demo Scan</span>
            </button>

            <button
              id="nav-primary-scan-btn"
              onClick={() => handleNavClick('scan')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Scan a Checkout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="nav-mobile-scan-shortcut"
              onClick={() => handleNavClick('scan')}
              className="p-2 text-emerald-700 bg-emerald-50 rounded-lg border border-emerald-200"
              aria-label="Scan"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              id="nav-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            <button
              onClick={() => { runDemoScan('shopease'); setMobileMenuOpen(false); }}
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg border border-slate-200"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Try Demo Scan</span>
            </button>
            <button
              onClick={() => handleNavClick('scan')}
              className="flex items-center justify-center gap-1.5 p-2.5 text-xs font-semibold text-white bg-emerald-600 rounded-lg shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Scan Checkout</span>
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNavClick(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  currentRoute === item.route 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Zero card data saved</span>
            </div>
            <button 
              onClick={() => handleNavClick('privacy')}
              className="text-slate-600 underline font-medium"
            >
              Privacy & Security
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
