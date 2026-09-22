import React from 'react';
import { 
  ShieldCheck, 
  Search, 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Receipt, 
  Eye, 
  Lock, 
  CalendarClock, 
  Users, 
  DollarSign,
  TrendingDown,
  Layers
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

export const LandingPage: React.FC = () => {
  const { setCurrentRoute, runDemoScan, isScanning } = useSafeCart();

  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-12" id="landing-page-root">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PRE-PAYMENT TRANSPARENCY ASSISTANT</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Is this website really charging what you think?
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              SafeCart acts as an impartial intelligence layer between you and the “PAY” button — spotting hidden fees, pre-checked add-ons, auto-renewing subscriptions, and deceptive checkout patterns before you pay.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                id="hero-scan-website-cta"
                onClick={() => setCurrentRoute('scan')}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all group"
              >
                <Search className="w-4 h-4" />
                <span>Scan a Website</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-try-demo-cta"
                onClick={() => runDemoScan('shopease')}
                disabled={isScanning}
                className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl shadow-xs transition-colors"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Demo Scan</span>
              </button>
            </div>

            {/* Micro Guarantees */}
            <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                No credit card or login needed
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-slate-500" />
                Zero personal payment data stored
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-slate-500" />
                Evidence-first auditing
              </span>
            </div>
          </div>

          {/* Right Column: Signature Hero Comparison Mock Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-xl p-6 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    SafeCart Analysis
                  </span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 rounded">
                  POTENTIAL CONCERNS DETECTED
                </span>
              </div>

              {/* Price Contrast */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ADVERTISED
                  </span>
                  <span className="font-display text-2xl font-extrabold text-slate-800 block mt-0.5">
                    ₹499
                  </span>
                  <span className="text-[10px] text-slate-400">Headline catalog price</span>
                </div>

                <div className="bg-slate-900 text-white rounded-xl p-3 border border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    ESTIMATED FINAL
                  </span>
                  <span className="font-display text-2xl font-extrabold text-emerald-400 block mt-0.5">
                    ₹725
                  </span>
                  <span className="text-[10px] text-slate-400">Total observed at checkout</span>
                </div>
              </div>

              {/* Potential Extra Cost Badge */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-900 block">
                    +₹226 potential additional cost
                  </span>
                  <span className="text-[11px] text-amber-700">
                    Includes ₹99 pre-selected warranty & hidden fee
                  </span>
                </div>
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              </div>

              {/* Detected Line Items */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Base Item</span>
                  <span className="font-mono font-semibold">₹499</span>
                </div>
                <div className="flex items-center justify-between text-amber-800 font-medium">
                  <span>+ Delivery & Handling Fee</span>
                  <span className="font-mono font-semibold">₹49</span>
                </div>
                <div className="flex items-center justify-between text-amber-800 font-medium">
                  <span>+ Pre-selected Protection Plan</span>
                  <span className="font-mono font-semibold">₹99</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>+ Taxes & Surcharges</span>
                  <span className="font-mono font-semibold">₹58</span>
                </div>
                <div className="flex items-center justify-between text-amber-900 font-medium pt-1 border-t border-slate-100">
                  <span>+ VIP Club Auto-Renew</span>
                  <span className="font-mono font-semibold">₹499/mo after 7-day trial</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => runDemoScan('shopease')}
                className="w-full py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Review Before Paying (Explore Demo)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 2. HOW SAFECART WORKS */}
      <section className="bg-white border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              TRANSPARENT WORKFLOW
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              How SafeCart Audits Your Checkout
            </h2>
            <p className="text-sm text-slate-600">
              SafeCart never makes decisions for you. We provide verifiable evidence, accurate arithmetic, and risk context so you decide with full clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Input or Screenshot
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste any checkout URL or upload an image of your order summary. No password or personal account required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Multi-Layer Audit
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We inspect line items for hidden handling fees, pre-checked checkboxes, countdown timers, and recurring trial conversions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Evidence & True Cost
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every concern includes observed text, exact page location, why it matters, and a line-by-line mathematical cost comparison.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <h3 className="font-display font-bold text-base text-slate-900">
                You Decide
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use our interactive Before You Pay checklist to uncheck unwanted items and review cancellation clauses before paying.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. WHAT WE DETECT (18 Dark Patterns & Surcharges) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              COMPREHENSIVE SURVEILLANCE
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900">
              What SafeCart Detects
            </h2>
            <p className="text-sm text-slate-600 max-w-xl">
              From subtle drip pricing to recurring subscription traps, we identify deceptive mechanics across retail, travel, food delivery, and software.
            </p>
          </div>

          <button
            onClick={() => setCurrentRoute('patterns')}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
          >
            <span>Explore Pattern Library</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { title: 'Hidden Costs', desc: 'Mandatory drip fees revealed only at final step' },
            { title: 'Preselection', desc: 'Checkboxes for warranties or add-ons ticked by default' },
            { title: 'Forced Continuity', desc: 'Free trials that convert into silent recurring billing' },
            { title: 'Fake Urgency', desc: 'Artificial timers and repeating scarcity counters' },
            { title: 'Confirmshaming', desc: 'Guilt-inducing opt-out buttons' },
            { title: 'Difficult Cancellation', desc: 'Roach motels requiring phone calls or letters' },
            { title: 'Platform Fees', desc: 'Arbitrary digital service charges' },
            { title: 'Convenience Fees', desc: 'Payment processing markups' },
            { title: 'Bait & Switch', desc: 'Headline offers replaced by higher cart prices' },
            { title: 'Disguised Ads', desc: 'Sponsored partner items disguised as items' },
            { title: 'Mandatory Add-ons', desc: 'Required packaging or insurance' },
            { title: 'Sneak into Basket', desc: 'Items automatically inserted into your cart' },
          ].map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <h4 className="font-display font-bold text-xs text-slate-900">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. SIGNATURE FEATURE CALLOUT: THE 4 CORE PRINCIPLES */}
      <section className="bg-slate-900 text-white rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              SAFEGUARDING CONSUMER TRUST
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
              We Never Say “This Website Is A Scam”
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Legitimate stores sometimes use aggressive marketing. Scam sites use them too. SafeCart stays strictly neutral: we show facts, observed line items, and risk context so you can make an educated choice.
            </p>
            <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-mono text-emerald-400 font-bold block">FACT</span>
                <span className="text-slate-300 text-[11px] mt-0.5 block">Explicit observed text</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-mono text-amber-400 font-bold block">ESTIMATE</span>
                <span className="text-slate-300 text-[11px] mt-0.5 block">Calculated price differences</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-mono text-blue-400 font-bold block">COMMUNITY REPORT</span>
                <span className="text-slate-300 text-[11px] mt-0.5 block">Verified peer feedback</span>
              </div>
              <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
                <span className="font-mono text-purple-400 font-bold block">AI ANALYSIS</span>
                <span className="text-slate-300 text-[11px] mt-0.5 block">Contextual pattern match</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 space-y-4">
            <h3 className="font-display font-bold text-base text-white">
              The SafeCart Standard
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-slate-300">
                  <span className="font-semibold text-white">“Here is what we detected”</span> — we quote exact lines and checkboxes from the screen.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-slate-300">
                  <span className="font-semibold text-white">“Here is the possible extra cost”</span> — verified arithmetic, never arbitrary guesses.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-slate-300">
                  <span className="font-semibold text-white">“Why this matters”</span> — plain-English explanations for non-technical consumers.
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <p className="text-slate-300">
                  <span className="font-semibold text-white">“What you should check before paying”</span> — actionable step-by-step checklist.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700 flex items-center justify-between text-[11px] text-slate-400">
              <span>Readiness state:</span>
              <span className="font-bold text-amber-400">“REVIEW BEFORE PAYING”</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRIVACY & SECURITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
              <Lock className="w-6 h-6 text-slate-700" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900">
                Zero Card Storage & Privacy First
              </h3>
              <p className="text-xs text-slate-500 max-w-xl mt-0.5">
                SafeCart never asks for or stores credit card numbers, CVVs, or store account passwords. Scans and uploaded screenshots remain entirely in your control.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentRoute('privacy')}
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
          >
            Review Security Architecture
          </button>
        </div>
      </section>

      {/* 6. FINAL CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900">
          Ready to verify your next online order?
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Takes less than 5 seconds. Save yourself from unexpected recurring renewals and hidden drip charges.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => setCurrentRoute('scan')}
            className="px-8 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Scan a Website or Screenshot</span>
          </button>
          <button
            onClick={() => runDemoScan('shopease')}
            className="px-8 py-3.5 text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Explore Interactive Demo
          </button>
        </div>
      </section>

    </div>
  );
};
