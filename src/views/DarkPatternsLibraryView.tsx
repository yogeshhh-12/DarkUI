import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Eye, 
  HelpCircle,
  ShieldAlert,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { useSafeCart } from '../context/SafeCartContext';

interface PatternDoc {
  id: string;
  name: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  definition: string;
  realExample: string;
  howToIdentify: string[];
  whatToCheck: string[];
  consumerAction: string;
  visualMock: {
    deceptive: string;
    transparent: string;
  };
}

export const DarkPatternsLibraryView: React.FC = () => {
  const { setCurrentRoute } = useSafeCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPattern, setSelectedPattern] = useState<PatternDoc | null>(null);

  const patterns: PatternDoc[] = [
    {
      id: 'hidden-costs',
      name: 'Hidden Costs & Drip Pricing',
      category: 'pricing',
      severity: 'high',
      definition: 'Revealing compulsory fees, service charges, or packaging markups incrementally as the consumer moves through checkout.',
      realExample: 'An airline ticket or hotel room advertised at ₹2,999 jumps to ₹3,840 at the final card entry screen due to “Platform Convenience Fee” and “Sanitization Charge”.',
      howToIdentify: [
        'Compare the headline catalog price with the final payment card prompt.',
        'Watch for fees labeled "Processing Fee", "Digital Convenience", or "Fulfillment Fee".',
        'Check if taxes are excluded until the last step without prior warning.'
      ],
      whatToCheck: [
        'Is the fee mandatory or optional?',
        'Does the fee offer tangible value or is it an unbundled markup?',
        'Was this price disclosed on the product detail page?'
      ],
      consumerAction: 'Calculate the true cost before proceeding. If unannounced fees exceed 10-15%, check competitor platforms that offer all-inclusive pricing.',
      visualMock: {
        deceptive: 'Cart: ₹499 -> Final Payment: ₹689 (+₹190 revealed at step 4)',
        transparent: 'Cart: ₹689 (Includes ₹499 base + ₹190 all fees clearly shown up front)'
      }
    },
    {
      id: 'preselection',
      name: 'Pre-Selection & Default Opt-Ins',
      category: 'interaction',
      severity: 'high',
      definition: 'Pre-ticking checkboxes for supplementary paid products (warranties, expedited handling, donations, or travel insurance) relying on consumer inattention.',
      realExample: 'A smartphone purchase automatically checks a ₹149 screen warranty and ₹29 donation box without asking permission.',
      howToIdentify: [
        'Look closely at every checkbox on the cart and order confirmation screen.',
        'Examine collapsed accordion sections for checked items.',
        'Review the line items in the price summary for unexpected additions.'
      ],
      whatToCheck: [
        'Did I intentionally click to add this protection or service?',
        'Is the checkbox explicitly checked by default?',
        'Can this item be unticked without clearing the cart?'
      ],
      consumerAction: 'Manually uncheck any pre-selected service. Under modern digital consumer protection guidelines (e.g. EU GDPR and India CCPA guidelines), pre-ticked opt-in boxes are restricted.',
      visualMock: {
        deceptive: '[☑] Add 1-Year Express Warranty for ₹199 (Pre-checked by site)',
        transparent: '[☐] Add 1-Year Express Warranty for ₹199 (Consumer must choose to check)'
      }
    },
    {
      id: 'forced-continuity',
      name: 'Forced Continuity & Trial Traps',
      category: 'subscription',
      severity: 'high',
      definition: 'Enticing consumers with a free or ₹1 trial that automatically converts into a high-cost recurring subscription without prominent reminders.',
      realExample: 'A 7-day fitness app trial converts silently into a ₹1,499 monthly subscription requiring manual cancellation through customer support emails.',
      howToIdentify: [
        'Free trials requiring credit card details upfront.',
        'Vague language such as "Renews automatically at standard rate".',
        'No visible expiration date or cancellation button.'
      ],
      whatToCheck: [
        'When is the exact trial expiration timestamp?',
        'What will the future renewal cost be?',
        'Is cancellation self-serve online or does it require calling phone support?'
      ],
      consumerAction: 'Set a calendar reminder for 48 hours before the trial ends, or use SafeCart\'s Subscription Tracker to keep an auditable record.',
      visualMock: {
        deceptive: 'Start Free 7-Day Trial (tiny 9px text: then ₹1,299/mo automatically)',
        transparent: 'Start Free 7-Day Trial. On Oct 15, your card will be billed ₹1,299/mo. Cancel anytime in 1 click.'
      }
    },
    {
      id: 'fake-urgency',
      name: 'Fake Urgency & Artificial Countdowns',
      category: 'psychology',
      severity: 'medium',
      definition: 'Creating artificial time pressure using countdown timers or scarcity counters that reset upon page refresh to induce hasty purchasing.',
      realExample: 'A banner proclaiming “Offer expires in 04:59!” that restarts at 05:00 if the page is opened in an incognito window.',
      howToIdentify: [
        'Refresh the page or open in an incognito tab to check if the timer resets.',
        'Look for repetitive countdowns across unrelated catalog items.',
        'Notice generic messages like "3 other shoppers are looking at this item".'
      ],
      whatToCheck: [
        'Does the deal actually expire, or is it the merchant\'s standard price?',
        'Are stock claims verifiable?',
        'Am I buying under panic instead of measured necessity?'
      ],
      consumerAction: 'Pause and step away for 10 minutes. Legitimate sales rarely evaporate in 300 seconds, and taking time prevents impulse regrets.',
      visualMock: {
        deceptive: 'Hurry! Deal ends in 02:41! Only 1 item left in stock!',
        transparent: 'Seasonal Sale: Valid through October 31, 2026.'
      }
    },
    {
      id: 'confirmshaming',
      name: 'Confirmshaming & Manipulative Opt-Outs',
      category: 'psychology',
      severity: 'medium',
      definition: 'Using emotional manipulation or guilt-inducing wording on decline buttons to shame the user into accepting optional paid offers.',
      realExample: 'A pop-up for expensive shipping insurance where the accept button says "Yes, protect my order" and the decline link says "No, I don\'t care if my package is lost".',
      howToIdentify: [
        'Contrast the prominent colored button with the passive-aggressive link below it.',
        'Look for words questioning your financial wisdom, safety, or intelligence in the decline text.'
      ],
      whatToCheck: [
        'Is the decline button using guilt or negative phrasing?',
        'Are both choices presented neutrally?'
      ],
      consumerAction: 'Recognize this as a psychological trick designed to exploit loss aversion. Ignore the wording and click decline with confidence.',
      visualMock: {
        deceptive: '[ Protect My Order ] vs "No, I like risking lost packages"',
        transparent: '[ Add Insurance (₹49) ] vs [ No Thanks, Standard Shipping ]'
      }
    },
    {
      id: 'difficult-cancellation',
      name: 'Difficult Cancellation (Roach Motel)',
      category: 'subscription',
      severity: 'high',
      definition: 'Making it remarkably easy to sign up or subscribe in 1 click, but requiring burdensome phone calls, postal mail, or multi-step retention mazes to cancel.',
      realExample: 'A digital newspaper subscription takes 5 seconds to activate via Apple Pay, but cancelling requires calling a phone number open only between 9am-12pm EST.',
      howToIdentify: [
        'Check the FAQ or terms of service for the word "call" under cancellation.',
        'No direct "Cancel Subscription" button in the customer dashboard.',
        'Forced live chat sessions with retention agents.'
      ],
      whatToCheck: [
        'Can I cancel through the same medium I used to subscribe?',
        'Is the cancellation self-service?'
      ],
      consumerAction: 'Whenever possible, subscribe through platform billing (Google Play / App Store) which enforces 1-click self-service cancellation.',
      visualMock: {
        deceptive: 'To cancel, please call 1-800-XXX-XXXX Mon-Fri 9-11 AM.',
        transparent: 'Cancel Subscription button directly inside Account -> Billing Settings.'
      }
    },
    {
      id: 'bait-and-switch',
      name: 'Bait and Switch',
      category: 'pricing',
      severity: 'high',
      definition: 'Advertising an extraordinarily low price to lure shoppers, only to claim out-of-stock upon checkout and substitute an expensive alternative.',
      realExample: 'A ₹999 flight appears in search, but selecting it produces an error: “This fare is no longer available. Next lowest fare is ₹2,499.”',
      howToIdentify: [
        'Extremely cheap deals that fail to resolve at checkout.',
        'Forced substitutions during cart progression.'
      ],
      whatToCheck: [
        'Did the cart automatically substitute a different SKU or model?'
      ],
      consumerAction: 'Exit the store immediately. Bait and switch is explicitly illegal under fair advertising regulations.',
      visualMock: {
        deceptive: 'Advertised ₹999 -> Click to buy -> "Sold out! Upgrade to ₹2,499 model"',
        transparent: 'Real-time stock synchronization displaying actual available inventory.'
      }
    },
    {
      id: 'disguised-ads',
      name: 'Disguised Ads & Sponsored Content',
      category: 'interaction',
      severity: 'medium',
      definition: 'Disguising commercial affiliate links or third-party sponsored downloads as integral navigation buttons or system recommendations.',
      realExample: 'A green "DOWNLOAD NOW" button that downloads adware rather than the requested invoice PDF.',
      howToIdentify: [
        'Multiple identical "Download" or "Continue" buttons on a single screen.',
        'Hover over the button to check the destination URL in browser status bar.'
      ],
      whatToCheck: [
        'Does the destination domain match the merchant?',
        'Is there a tiny "Ad" or "Sponsored" tag near the button?'
      ],
      consumerAction: 'Always inspect link URLs before clicking. Click only verified merchant actions.',
      visualMock: {
        deceptive: 'Giant fake "PROCEED TO PAYMENT" banner redirecting to partner offer.',
        transparent: 'Clear, isolated checkout flow with no third-party banner injections.'
      }
    }
  ];

  const filteredPatterns = patterns.filter(p => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.realExample.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="dark-patterns-library-root">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Consumer Education & Defense
          </span>
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Dark Pattern Field Guide
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Learn how deceptive design patterns work, how to recognize them, and how to protect your wallet.
          </p>
        </div>

        <button
          onClick={() => setCurrentRoute('scan')}
          className="px-4 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors self-start sm:self-auto"
        >
          Audit a Checkout Screen
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patterns by name or symptom..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Patterns' },
            { id: 'pricing', label: 'Pricing & Surcharges' },
            { id: 'subscription', label: 'Subscriptions' },
            { id: 'interaction', label: 'Checkboxes & UI' },
            { id: 'psychology', label: 'Psychology & Urgency' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Pattern Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPatterns.map((pat) => (
          <div
            key={pat.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-4 flex flex-col justify-between"
            id={`pattern-card-${pat.id}`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {pat.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                  pat.severity === 'high' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {pat.severity} Severity
                </span>
              </div>

              <h3 className="font-display font-bold text-lg text-slate-900">
                {pat.name}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {pat.definition}
              </p>

              {/* Real World Example */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-700 block">Real Example:</span>
                <p className="text-slate-600 italic">"{pat.realExample}"</p>
              </div>

              {/* Visual Mock: Deceptive vs Transparent */}
              <div className="space-y-1.5 text-[11px]">
                <div className="p-2 rounded-lg bg-rose-50/80 border border-rose-200 text-rose-950 font-mono">
                  <span className="font-bold uppercase text-[9px] text-rose-700 block not-mono">Deceptive UI Pattern</span>
                  {pat.visualMock.deceptive}
                </div>
                <div className="p-2 rounded-lg bg-emerald-50/80 border border-emerald-200 text-emerald-950 font-mono">
                  <span className="font-bold uppercase text-[9px] text-emerald-700 block not-mono">Transparent / Fair Standard</span>
                  {pat.visualMock.transparent}
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 block">How to Identify:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600 text-[11px]">
                  {pat.howToIdentify.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Consumer Action */}
            <div className="pt-3 border-t border-slate-100 text-xs bg-amber-50/50 p-3 rounded-xl border border-amber-200/80">
              <span className="font-bold text-amber-900 block">What You Can Do:</span>
              <p className="text-amber-950 mt-0.5">{pat.consumerAction}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
