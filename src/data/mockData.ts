import { 
  ScanResult, 
  SavedSubscription, 
  CommunityReport, 
  WebsiteSafetyProfile, 
  DarkPatternEducation 
} from '../types';

export const DEMO_SCANEASE_RESULT: ScanResult = {
  id: 'scan-shopease-demo-01',
  targetUrl: 'https://shopease-fictional-store.demo/checkout',
  targetDomain: 'shopease-fictional-store.demo',
  scanType: 'demo',
  scanDate: 'Just now',
  riskScore: 72,
  riskLevel: 'high',
  scoreBreakdown: [
    {
      id: 'sb-1',
      name: 'Pre-selected protection plan',
      points: 20,
      reason: 'A ₹99 extended warranty checkbox was pre-ticked by default without user consent.'
    },
    {
      id: 'sb-2',
      name: 'Recurring subscription after trial',
      points: 20,
      reason: 'Hidden "VIP Club Membership" will automatically bill ₹499/month after a 7-day trial.'
    },
    {
      id: 'sb-3',
      name: 'Hidden delivery fee',
      points: 15,
      reason: '₹49 standard shipping added at step 3 despite "Free Delivery" banner on product page.'
    },
    {
      id: 'sb-4',
      name: 'Urgency & scarcity countdown',
      points: 10,
      reason: 'Artificial 5-minute checkout countdown timer pushing fast checkout.'
    },
    {
      id: 'sb-5',
      name: 'Difficult cancellation clause',
      points: 7,
      reason: 'Cancellation requires contacting support via phone during limited weekday hours.'
    }
  ],
  detectedConcernsCount: 4,
  possibleConcernsCount: 1,
  issues: [
    {
      id: 'iss-1',
      name: 'Pre-selected Protection Plan',
      category: 'preselection',
      status: 'detected',
      severity: 'medium',
      evidence: 'Checkbox labeled "Add 1-Year Express Device Protection Plan for ₹99" is checked by default in the order summary container.',
      location: 'Checkout Section — Order Review',
      potentialCost: 99,
      currency: '₹',
      whyItMatters: 'An additional fee is added to your total payment unless you actively notice and uncheck it.',
      recommendedAction: 'Carefully review the order summary checkboxes and uncheck the protection plan if you do not want it.',
      source: 'Screenshot',
      confidenceScore: 98
    },
    {
      id: 'iss-2',
      name: 'Hidden Delivery & Handling Fee',
      category: 'delivery_fee',
      status: 'detected',
      severity: 'medium',
      evidence: '₹49 "Standard Logistics & Handling Fee" appended at payment step. Previous product card displayed "Free Delivery Eligible".',
      location: 'Subtotal & Taxes section',
      potentialCost: 49,
      currency: '₹',
      whyItMatters: 'The advertised price was presented lower than what you are actually asked to pay upon checkout.',
      recommendedAction: 'Check if you qualify for true free shipping thresholds or if slower shipping eliminates the fee.',
      source: 'Page text',
      confidenceScore: 94
    },
    {
      id: 'iss-3',
      name: '7-Day Free Trial Auto-Converts to Recurring Billing',
      category: 'recurring_billing',
      status: 'detected',
      severity: 'high',
      evidence: 'Micro-text below Terms checkbox: "By completing this order, you enroll in ShopEase VIP for a 7-day trial, then ₹499/month until cancelled."',
      location: 'Below Final Pay Button (8pt gray font)',
      potentialCost: 499,
      currency: '₹',
      whyItMatters: 'You will incur unexpected ongoing monthly charges starting 7 days from today unless you cancel in time.',
      recommendedAction: 'Set a reminder immediately for day 5 of the trial to review or cancel the subscription before renewal.',
      source: 'Page text',
      confidenceScore: 96
    },
    {
      id: 'iss-4',
      name: 'Artificial Urgency Countdown',
      category: 'fake_urgency',
      status: 'detected',
      severity: 'low',
      evidence: 'Timer stating "Order reserved for 04:58 minutes — items will be released to next customer". Script re-triggers on refresh.',
      location: 'Top Banner above Checkout Steps',
      potentialCost: 0,
      currency: '₹',
      whyItMatters: 'Urgency cues pressure consumers into rushed decisions without reviewing fees or contract terms.',
      recommendedAction: 'Do not rush. Take all the time needed to review line items, return terms, and pre-selected add-ons.',
      source: 'AI interpretation',
      confidenceScore: 89
    },
    {
      id: 'iss-5',
      name: 'Limited Cancellation Disclosure',
      category: 'difficult_cancellation',
      status: 'possible',
      severity: 'medium',
      evidence: 'Terms link specifies cancellation requests must be phoned in between 10am-4pm EST on business days with 48h notice.',
      location: 'Terms of Service clause 14.2',
      potentialCost: 0,
      currency: '₹',
      whyItMatters: 'Making subscription cancellation intentionally difficult can result in extra unwanted monthly billing cycles.',
      recommendedAction: 'Verify whether online 1-click cancellation is available in your account settings prior to checkout.',
      source: 'AI interpretation',
      confidenceScore: 82
    }
  ],
  priceBreakdown: {
    advertisedPrice: 499,
    deliveryFee: 49,
    platformFee: 0,
    protectionPlan: 99,
    taxes: 58,
    otherFees: [],
    estimatedTotal: 705,
    potentialExtraCost: 206,
    currency: '₹'
  },
  subscription: {
    hasSubscription: true,
    trialPeriodDays: 7,
    recurringAmount: 499,
    billingFrequency: 'monthly',
    estimatedAnnualCost: 5988,
    trialConversionNotice: '7-day trial converts to ₹499/month recurring charge',
    cancellationMethod: 'Phone customer support or account settings prior to 48 hours before renewal',
    requiresManualCancellation: true
  },
  readinessState: 'REVIEW_BEFORE_PAYING',
  readinessSummary: '4 potential concerns detected totaling ₹206 in potential extra upfront charges and a recurring ₹499/month subscription.',
  isDemo: true
};

export const DEMO_FITLIFE_RESULT: ScanResult = {
  id: 'scan-fitlife-demo-02',
  targetUrl: 'https://fitpulse-pro-fictional.demo/join',
  targetDomain: 'fitpulse-pro-fictional.demo',
  scanType: 'demo',
  scanDate: 'Yesterday, 4:15 PM',
  riskScore: 68,
  riskLevel: 'high',
  scoreBreakdown: [
    { id: 'f-1', name: 'Auto-renewal after trial', points: 25, reason: '₹149 trial converts to ₹1,499/month subscription.' },
    { id: 'f-2', name: 'Platform processing fee', points: 15, reason: '₹49 platform maintenance fee not shown in intro headline.' },
    { id: 'f-3', name: 'Pre-selected nutrition guide', points: 18, reason: '₹199 digital recipe booklet pre-selected.' },
    { id: 'f-4', name: 'Strict 30-day cancellation window', points: 10, reason: 'Requires certified mail or direct call to cancel.' }
  ],
  detectedConcernsCount: 3,
  possibleConcernsCount: 1,
  issues: [
    {
      id: 'fit-1',
      name: 'Trial Auto-Renewal to Full Monthly Rate',
      category: 'recurring_billing',
      status: 'detected',
      severity: 'high',
      evidence: 'Intro trial for ₹149 automatically bills ₹1,499 every 30 days starting on day 15.',
      location: 'Below billing address input',
      potentialCost: 1499,
      currency: '₹',
      whyItMatters: 'A low intro price conceals a 10x ongoing monthly commitment.',
      recommendedAction: 'Note renewal date and assess if the recurring value justifies ₹1,499 monthly.',
      source: 'Page text',
      confidenceScore: 99
    },
    {
      id: 'fit-2',
      name: 'Pre-selected Digital Nutrition Plan',
      category: 'preselection',
      status: 'detected',
      severity: 'medium',
      evidence: 'Ticked box: "Include Pro Meal Planner (+₹199 one-time setup)".',
      location: 'Add-ons Section',
      potentialCost: 199,
      currency: '₹',
      whyItMatters: 'Optional add-on automatically increases total upfront price.',
      recommendedAction: 'Uncheck if you only intended to test the workout pass.',
      source: 'Screenshot',
      confidenceScore: 95
    },
    {
      id: 'fit-3',
      name: 'Unexpected Platform Maintenance Fee',
      category: 'platform_fee',
      status: 'detected',
      severity: 'low',
      evidence: '₹49 line item labeled "Digital Infrastructure Contribution".',
      location: 'Payment calculation summary',
      potentialCost: 49,
      currency: '₹',
      whyItMatters: 'Increases payment beyond advertised headline figures.',
      recommendedAction: 'Review line item list before submitting card details.',
      source: 'Page text',
      confidenceScore: 92
    }
  ],
  priceBreakdown: {
    advertisedPrice: 149,
    deliveryFee: 0,
    platformFee: 49,
    protectionPlan: 199,
    taxes: 38,
    otherFees: [],
    estimatedTotal: 435,
    potentialExtraCost: 286,
    currency: '₹'
  },
  subscription: {
    hasSubscription: true,
    trialPeriodDays: 14,
    recurringAmount: 1499,
    billingFrequency: 'monthly',
    estimatedAnnualCost: 17988,
    trialConversionNotice: '14-day trial auto-renews at ₹1,499/month',
    cancellationMethod: 'Settings -> Billing -> Cancel Membership before next billing cycle',
    requiresManualCancellation: true
  },
  readinessState: 'REVIEW_BEFORE_PAYING',
  readinessSummary: '3 potential concerns detected. Trial auto-renews at ₹1,499/month and ₹286 extra upfront fees detected.',
  isDemo: true
};

export const DEMO_CLEAN_RESULT: ScanResult = {
  id: 'scan-bookhaven-demo-03',
  targetUrl: 'https://bookhaven-transparent.demo/cart',
  targetDomain: 'bookhaven-transparent.demo',
  scanType: 'demo',
  scanDate: '2 days ago',
  riskScore: 8,
  riskLevel: 'low',
  scoreBreakdown: [
    { id: 'b-1', name: 'Transparent checkout', points: 8, reason: 'Clear prices, zero pre-selected add-ons, transparent tax breakdown.' }
  ],
  detectedConcernsCount: 0,
  possibleConcernsCount: 0,
  issues: [
    {
      id: 'bk-1',
      name: 'No Pre-selected Items Detected',
      category: 'preselection',
      status: 'not_detected',
      severity: 'low',
      evidence: 'All optional items and packaging upgrades are unticked by default.',
      location: 'Cart Overview',
      potentialCost: 0,
      currency: '₹',
      whyItMatters: 'You are only charged for the exact items you placed in your cart.',
      recommendedAction: 'No action needed on pre-selected items.',
      source: 'Page text',
      confidenceScore: 97
    },
    {
      id: 'bk-2',
      name: 'No Recurring Charges Detected',
      category: 'recurring_billing',
      status: 'not_detected',
      severity: 'low',
      evidence: 'One-time transaction. No subscription or membership enrollment discovered.',
      location: 'Payment method selection',
      potentialCost: 0,
      currency: '₹',
      whyItMatters: 'No future automated billing will be triggered by this purchase.',
      recommendedAction: 'Ensure receipt is saved for your records.',
      source: 'Page text',
      confidenceScore: 99
    }
  ],
  priceBreakdown: {
    advertisedPrice: 1200,
    deliveryFee: 0,
    platformFee: 0,
    protectionPlan: 0,
    taxes: 0, // Included in advertised
    otherFees: [],
    estimatedTotal: 1200,
    potentialExtraCost: 0,
    currency: '₹'
  },
  subscription: {
    hasSubscription: false
  },
  readinessState: 'READY_TO_REVIEW_PAYMENT',
  readinessSummary: 'No suspicious patterns or hidden fees detected. Clear one-time transaction matching advertised pricing.',
  isDemo: true
};

export const INITIAL_SAVED_SUBSCRIPTIONS: SavedSubscription[] = [
  {
    id: 'sub-1',
    serviceName: 'StreamWave Plus',
    websiteUrl: 'https://streamwave-media.demo',
    price: 499,
    currency: '₹',
    billingFrequency: 'monthly',
    nextRenewalDate: '2026-10-04',
    cancellationMethod: 'Profile > Account > Cancel Subscription online',
    remindDaysBefore: 3,
    notes: 'Converted from 30-day free trial on Sep 4',
    createdAt: '2026-08-20'
  },
  {
    id: 'sub-2',
    serviceName: 'CloudBox Pro Storage',
    websiteUrl: 'https://cloudbox-storage.demo',
    price: 1999,
    currency: '₹',
    billingFrequency: 'annual',
    nextRenewalDate: '2026-11-15',
    cancellationMethod: 'Settings > Billing > Turn off Auto-Renew',
    remindDaysBefore: 7,
    notes: 'Annual backup plan with 2TB storage',
    createdAt: '2025-11-15'
  }
];

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-1',
    websiteDomain: 'quickdeal-market.demo',
    websiteUrl: 'https://quickdeal-market.demo',
    category: 'preselection',
    title: 'Pre-selected ₹149 carbon offset and gift bag',
    description: 'During checkout, two checkboxes at the bottom were automatically enabled adding ₹149 without explicit consent.',
    evidenceText: 'Screenshot of final step showing pre-checked "Green Delivery Pledge (₹99)" and "VIP Packaging (₹50)".',
    screenshotAttached: true,
    extraFeeReported: 149,
    subscriptionIssueReported: false,
    reportsCount: 42,
    helpfulVotes: 128,
    unhelpfulVotes: 4,
    dateReported: '2 days ago',
    verificationStatus: 'verified_pattern'
  },
  {
    id: 'rep-2',
    websiteDomain: 'fittrack-club.demo',
    websiteUrl: 'https://fittrack-club.demo',
    category: 'recurring_billing',
    title: 'Free water bottle promo converted into ₹899 monthly coaching',
    description: 'Offered free fitness tracker where user only paid ₹49 shipping, but small terms enrolled user in monthly recurring subscription.',
    evidenceText: 'Terms clause 9 in light gray font: "Recipient agrees to ongoing monthly wellness coaching at ₹899/month unless cancelled in 5 days."',
    screenshotAttached: true,
    extraFeeReported: 899,
    subscriptionIssueReported: true,
    reportsCount: 68,
    helpfulVotes: 215,
    unhelpfulVotes: 6,
    dateReported: '5 days ago',
    verificationStatus: 'verified_pattern'
  },
  {
    id: 'rep-3',
    websiteDomain: 'eventpass-hub.demo',
    websiteUrl: 'https://eventpass-hub.demo',
    category: 'convenience_fee',
    title: '₹220 surprise booking & platform fee per concert ticket',
    description: 'Advertised tickets at ₹999, but added ₹180 convenience fee plus ₹40 platform processing fee at last card entry step.',
    evidenceText: 'Payment breakdown showing ₹999 base ticket inflating to ₹1,219 after mandatory convenience surcharge.',
    screenshotAttached: false,
    extraFeeReported: 220,
    subscriptionIssueReported: false,
    reportsCount: 31,
    helpfulVotes: 89,
    unhelpfulVotes: 2,
    dateReported: '1 week ago',
    verificationStatus: 'community_flagged'
  }
];

export const INITIAL_WEBSITE_PROFILES: Record<string, WebsiteSafetyProfile> = {
  'shopease-fictional-store.demo': {
    domain: 'shopease-fictional-store.demo',
    name: 'ShopEase Demo Store',
    category: 'General E-Commerce',
    lastScanned: 'Today',
    averageRiskScore: 72,
    totalScans: 89,
    riskIndicator: 'high',
    commonDetectedPatterns: [
      { pattern: 'Pre-selected Protection Plan', occurrences: 68 },
      { pattern: 'Hidden Delivery Fees', occurrences: 64 },
      { pattern: 'Auto-Renewing VIP Club', occurrences: 52 },
      { pattern: 'Artificial Urgency Timers', occurrences: 45 }
    ],
    reportedHiddenFeesAverage: 206,
    subscriptionComplaintsCount: 38,
    communityReportsCount: 47,
    isFictionalDemo: true,
    safetyChecklist: [
      'Uncheck the pre-selected warranty checkbox in the cart',
      'Verify whether the final total reflects the advertised discount',
      'Look for VIP membership or recurring terms under the checkout button',
      'Ensure you do not rush under countdown pressure'
    ]
  },
  'bookhaven-transparent.demo': {
    domain: 'bookhaven-transparent.demo',
    name: 'BookHaven Bookstore Demo',
    category: 'Books & Media',
    lastScanned: '2 days ago',
    averageRiskScore: 8,
    totalScans: 142,
    riskIndicator: 'low',
    commonDetectedPatterns: [],
    reportedHiddenFeesAverage: 0,
    subscriptionComplaintsCount: 0,
    communityReportsCount: 1,
    isFictionalDemo: true,
    safetyChecklist: [
      'Review final shipping address',
      'Confirm item quantity before payment'
    ]
  }
};

export const DARK_PATTERNS_LIBRARY: DarkPatternEducation[] = [
  {
    id: 'preselection',
    name: 'Pre-Selection (Sneak into Basket)',
    shortDescription: 'Items, warranties, or services automatically added or pre-checked without your choice.',
    definition: 'Preselection happens when an online merchant defaults optional choices to "YES" or pre-checks checkboxes for added products, warranties, or donations before you reach payment.',
    realWorldExample: 'A flight booking checkout where travel insurance (₹450) and priority boarding (₹200) are automatically ticked in your fare breakdown.',
    howToIdentify: [
      'Look for pre-filled checkmarks in add-on or protection sections',
      'Compare your cart item count with the quantity shown on the final checkout screen',
      'Examine whether "optional" items say "Included by default"'
    ],
    whatToCheck: [
      'Checkboxes next to warranties or insurance',
      'Donation or carbon offset additions',
      'Premium packaging or fast-track handling line items'
    ],
    whatConsumerCanDo: [
      'Click to uncheck any option you did not explicitly request',
      'Verify that the total amount recalculates downwards immediately',
      'If an uncheck option is disabled, do not proceed with payment'
    ],
    severity: 'medium',
    commonIndustries: ['Travel & Airlines', 'Consumer Electronics', 'Ticketing']
  },
  {
    id: 'hidden_costs',
    name: 'Hidden Costs (Drip Pricing)',
    shortDescription: 'Revealing extra mandatory fees incrementally throughout the checkout process.',
    definition: 'Drip pricing is the deceptive practice of showing an attractive initial headline price, only to tack on mandatory delivery, handling, convenience, or platform fees in subsequent steps.',
    realWorldExample: 'A concert ticket advertised at ₹500 that accumulates a ₹60 convenience fee, ₹35 venue facility fee, and ₹25 processing fee by the payment screen.',
    howToIdentify: [
      'Notice if the total keeps increasing as you click "Continue" through shipping and billing',
      'Check for newly appeared line items titled "Convenience", "Platform", or "Service"',
      'Inspect whether headline prices specify "Exclusive of mandatory charges"'
    ],
    whatToCheck: [
      'Delivery and logistics surcharges',
      'Platform maintenance or gateway convenience fees',
      'Mandatory service surcharges not included in initial quotes'
    ],
    whatConsumerCanDo: [
      'Calculate the true final price before entering credit card information',
      'Compare the final total against competitors who show all-inclusive pricing',
      'Document and report hidden drip pricing to consumer protection bodies'
    ],
    severity: 'high',
    commonIndustries: ['Food Delivery', 'Event Ticketing', 'Hotels & Vacation Rentals']
  },
  {
    id: 'recurring_billing',
    name: 'Forced Continuity (Subscription Traps)',
    shortDescription: 'Free trials or one-time orders that silently lock you into recurring ongoing monthly fees.',
    definition: 'Forced continuity occurs when a user signs up for a free trial or purchases a single product, but fine print automatically enrolls them into a recurring paid membership that silently bills every month.',
    realWorldExample: 'A "Pay ₹49 shipping for a free skincare sample" promotion that charges ₹1,299 every 30 days after a 5-day trial period.',
    howToIdentify: [
      'Look for micro-text beneath payment buttons or "I agree to Terms" boxes',
      'Check for terms containing "renews automatically", "until cancelled", or "monthly VIP"',
      'Note if payment requires credit card details for a supposedly "free" offering'
    ],
    whatToCheck: [
      'Exact duration of the free or introductory trial period',
      'Price that will be charged upon renewal',
      'Billing frequency (weekly, monthly, or annual)'
    ],
    whatConsumerCanDo: [
      'Immediately set a calendar reminder 2-3 days before the trial expires',
      'Use virtual payment cards with spending limits or single-use numbers',
      'Locate and test the cancellation procedure immediately after sign-up'
    ],
    severity: 'high',
    commonIndustries: ['Software & SaaS', 'Fitness & Wellness', 'Streaming Media', 'Beauty Boxes']
  },
  {
    id: 'fake_urgency',
    name: 'Fake Urgency & Scarcity',
    shortDescription: 'Artificial timers and misleading stock counts intended to induce impulsive panic purchases.',
    definition: 'Fake urgency creates synthetic pressure on shoppers using repeating countdown timers, fabricated "Only 1 left in stock" notices, or fake "14 other people viewing this right now" popups.',
    realWorldExample: 'A countdown clock counting down from 10:00 to 00:00 that simply resets back to 10:00 when the browser page is refreshed.',
    howToIdentify: [
      'Refresh the webpage in a private browser window to see if the timer restarts',
      'Notice if scarcity claims appear on virtually every product in the catalog',
      'Watch for generic notifications like "Someone in your city just bought this"'
    ],
    whatToCheck: [
      'Does the price actually increase when the timer hits zero?',
      'Is the stock number genuinely low or dynamic code?',
      'Are you being pressured to skip reviewing fee breakdowns?'
    ],
    whatConsumerCanDo: [
      'Pause and step away for 10 minutes to eliminate emotional buying pressure',
      'Search for the identical item on alternative merchants to verify standard pricing',
      'Never allow an artificial countdown to prevent checking refund and shipping terms'
    ],
    severity: 'medium',
    commonIndustries: ['Fast Fashion', 'Hotel Booking', 'Course Sellers', 'Dropshipping']
  },
  {
    id: 'confirmshaming',
    name: 'Confirmshaming',
    shortDescription: 'Guilt-inducing button labels designed to shame users into accepting unwanted offers.',
    definition: 'Confirmshaming emotionally manipulates users into agreeing to an add-on, newsletter, or upsell by phrasing the opt-out option in a humiliating or guilt-inducing manner.',
    realWorldExample: 'A button to decline insurance that reads: "No thanks, I prefer risking my hard-earned money and traveling without safety."',
    howToIdentify: [
      'Look for dismiss buttons that insult your intelligence, savings habits, or safety',
      'Notice stark visual contrast where the "Accept" button is huge and "Decline" is tiny text',
      'Check if the opt-out phrasing makes you feel negligent or foolish'
    ],
    whatToCheck: [
      'Read past the emotional wording to see what the action actually does',
      'Verify if declining the upsell causes any actual penalty'
    ],
    whatConsumerCanDo: [
      'Recognize emotional manipulation as a marketing tactic',
      'Click the opt-out button regardless of the shame copy',
      'Support merchants who use neutral language such as "No, thank you"'
    ],
    severity: 'low',
    commonIndustries: ['E-Commerce popups', 'Retail upsells', 'Software downloads']
  },
  {
    id: 'difficult_cancellation',
    name: 'Roach Motel (Obstruction)',
    shortDescription: 'Effortless to subscribe in one click, but deliberately grueling to cancel.',
    definition: 'The Roach Motel pattern makes signing up seamless (e.g. 1-click via mobile), while cancellation requires navigating buried menus, calling call centers during narrow hours, or sending written letters.',
    realWorldExample: 'Subscribing online in 10 seconds, but cancellation requires calling a toll-free number open only 10am-2pm weekdays with long wait times.',
    howToIdentify: [
      'Search the website for a "Cancel Subscription" button before you purchase',
      'Review terms of service to see if online cancellation is explicitly stated',
      'Look for customer reviews mentioning cancellation difficulties'
    ],
    whatToCheck: [
      'Is cancellation available inside the account dashboard?',
      'Does cancellation require advance notice (e.g. 30 days prior)?',
      'Are there early termination or cancellation penalties?'
    ],
    whatConsumerCanDo: [
      'Check subscription management tools provided by your payment processor (e.g., UPI mandates, PayPal, Apple Subscriptions)',
      'Keep copies of cancellation requests and timestamps',
      'Use SafeCart Subscription Tracker to monitor upcoming renewals'
    ],
    severity: 'high',
    commonIndustries: ['Gym Memberships', 'News & Magazine Subscriptions', 'Telecom Services']
  }
];
