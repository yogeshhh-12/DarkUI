export type RiskLevel = 'low' | 'medium' | 'high';

export type PatternStatus = 'detected' | 'possible' | 'not_detected';

export type SeverityLevel = 'low' | 'medium' | 'high';

export type EvidenceSource = 
  | 'Screenshot'
  | 'Page text'
  | 'User report'
  | 'Estimated calculation'
  | 'AI interpretation';

export type DetectionCategory =
  | 'preselection'
  | 'hidden_costs'
  | 'recurring_billing'
  | 'fake_urgency'
  | 'forced_continuity'
  | 'difficult_cancellation'
  | 'bait_and_switch'
  | 'disguised_ads'
  | 'scarcity_claims'
  | 'misleading_buttons'
  | 'convenience_fee'
  | 'platform_fee'
  | 'delivery_fee';

export interface ScoreBreakdownItem {
  id: string;
  name: string;
  points: number;
  reason: string;
}

export interface ScanIssue {
  id: string;
  name: string;
  category: DetectionCategory;
  status: PatternStatus;
  severity: SeverityLevel;
  evidence: string;
  location: string;
  potentialCost: number; // in currency units (e.g. INR ₹)
  currency: string;
  whyItMatters: string;
  recommendedAction: string;
  source: EvidenceSource;
  confidenceScore?: number; // 0-100
}

export interface PriceBreakdown {
  advertisedPrice: number;
  deliveryFee: number;
  platformFee: number;
  protectionPlan: number;
  taxes: number;
  otherFees: { name: string; amount: number }[];
  estimatedTotal: number;
  potentialExtraCost: number;
  currency: string;
}

export interface SubscriptionDetails {
  hasSubscription: boolean;
  trialPeriodDays?: number;
  recurringAmount?: number;
  billingFrequency?: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  estimatedAnnualCost?: number;
  trialConversionNotice?: string;
  cancellationMethod?: string;
  requiresManualCancellation?: boolean;
}

export interface ScanResult {
  id: string;
  targetUrl?: string;
  targetDomain: string;
  scanType: 'url' | 'screenshot' | 'demo';
  scanDate: string;
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  scoreBreakdown: ScoreBreakdownItem[];
  detectedConcernsCount: number;
  possibleConcernsCount: number;
  issues: ScanIssue[];
  priceBreakdown: PriceBreakdown;
  subscription: SubscriptionDetails;
  screenshotUrl?: string;
  readinessState: 'REVIEW_BEFORE_PAYING' | 'READY_TO_REVIEW_PAYMENT';
  readinessSummary: string;
  isDemo?: boolean;
}

export interface SavedSubscription {
  id: string;
  serviceName: string;
  websiteUrl: string;
  price: number;
  currency: string;
  billingFrequency: 'weekly' | 'monthly' | 'quarterly' | 'annual';
  nextRenewalDate: string;
  trialEndDate?: string;
  cancellationMethod: string;
  cancellationUrl?: string;
  remindDaysBefore: number;
  notes?: string;
  createdAt: string;
}

export interface CommunityReport {
  id: string;
  websiteDomain: string;
  websiteUrl: string;
  category: DetectionCategory | 'general_complaint';
  title: string;
  description: string;
  evidenceText: string;
  screenshotAttached?: boolean;
  extraFeeReported?: number;
  subscriptionIssueReported?: boolean;
  reportsCount: number;
  helpfulVotes: number;
  unhelpfulVotes: number;
  dateReported: string;
  verificationStatus: 'community_flagged' | 'under_review' | 'verified_pattern';
  userVoted?: 'helpful' | 'unhelpful';
}

export interface WebsiteSafetyProfile {
  domain: string;
  name: string;
  category: string;
  lastScanned: string;
  averageRiskScore: number;
  totalScans: number;
  riskIndicator: RiskLevel;
  commonDetectedPatterns: { pattern: string; occurrences: number }[];
  reportedHiddenFeesAverage: number;
  subscriptionComplaintsCount: number;
  communityReportsCount: number;
  isFictionalDemo?: boolean;
  safetyChecklist: string[];
}

export interface DarkPatternEducation {
  id: string;
  name: string;
  shortDescription: string;
  definition: string;
  realWorldExample: string;
  howToIdentify: string[];
  whatToCheck: string[];
  whatConsumerCanDo: string[];
  severity: SeverityLevel;
  commonIndustries: string[];
}

export interface BeforeYouPayItem {
  id: string;
  label: string;
  hint: string;
  critical: boolean;
  checked: boolean;
}
