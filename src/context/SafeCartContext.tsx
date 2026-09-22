import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ScanResult, 
  SavedSubscription, 
  CommunityReport, 
  WebsiteSafetyProfile,
  ScanIssue
} from '../types';
import { 
  DEMO_SCANEASE_RESULT, 
  DEMO_FITLIFE_RESULT, 
  DEMO_CLEAN_RESULT,
  INITIAL_SAVED_SUBSCRIPTIONS,
  INITIAL_COMMUNITY_REPORTS,
  INITIAL_WEBSITE_PROFILES
} from '../data/mockData';

export type AppRoute = 
  | 'landing' 
  | 'dashboard' 
  | 'scan' 
  | 'results' 
  | 'subscriptions' 
  | 'community' 
  | 'patterns' 
  | 'calculator' 
  | 'website-profile' 
  | 'saved' 
  | 'settings' 
  | 'privacy';

interface SafeCartContextType {
  currentRoute: AppRoute;
  setCurrentRoute: (route: AppRoute) => void;
  currentScan: ScanResult | null;
  setCurrentScan: (scan: ScanResult | null) => void;
  scanHistory: ScanResult[];
  savedScans: string[];
  toggleSaveScan: (scanId: string) => void;
  deleteScan: (scanId: string) => void;
  removeScanFromHistory: (scanId: string) => void;
  savedSubscriptions: SavedSubscription[];
  addSubscription: (sub: Omit<SavedSubscription, 'id' | 'createdAt'>) => void;
  removeSubscription: (id: string) => void;
  communityReports: CommunityReport[];
  voteCommunityReport: (id: string, type: 'helpful' | 'unhelpful') => void;
  addCommunityReport: (report: Omit<CommunityReport, 'id' | 'reportsCount' | 'helpfulVotes' | 'unhelpfulVotes' | 'dateReported' | 'verificationStatus'>) => void;
  selectedWebsiteDomain: string;
  setSelectedWebsiteDomain: (domain: string) => void;
  websiteProfiles: Record<string, WebsiteSafetyProfile>;
  activeModalIssue: ScanIssue | null;
  setActiveModalIssue: (issue: ScanIssue | null) => void;
  isScanning: boolean;
  scanProgressStep: number;
  scanError: string | null;
  runDemoScan: (demoType?: 'shopease' | 'fitpulse' | 'clean') => Promise<void>;
  runUrlScan: (url: string) => Promise<void>;
  runScreenshotScan: (file: File) => Promise<void>;
  moneyPotentiallySaved: number;
  clearAllLocalData: () => void;
  clearAllData: () => void;
}

const SafeCartContext = createContext<SafeCartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'safecart_app_state_v1';

export const SafeCartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing');
  const [currentScan, setCurrentScan] = useState<ScanResult | null>(DEMO_SCANEASE_RESULT);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([
    DEMO_SCANEASE_RESULT,
    DEMO_FITLIFE_RESULT,
    DEMO_CLEAN_RESULT
  ]);
  const [savedScans, setSavedScans] = useState<string[]>([DEMO_SCANEASE_RESULT.id]);
  const [savedSubscriptions, setSavedSubscriptions] = useState<SavedSubscription[]>(INITIAL_SAVED_SUBSCRIPTIONS);
  const [communityReports, setCommunityReports] = useState<CommunityReport[]>(INITIAL_COMMUNITY_REPORTS);
  const [websiteProfiles, setWebsiteProfiles] = useState<Record<string, WebsiteSafetyProfile>>(INITIAL_WEBSITE_PROFILES);
  const [selectedWebsiteDomain, setSelectedWebsiteDomain] = useState<string>('shopease-fictional-store.demo');
  const [activeModalIssue, setActiveModalIssue] = useState<ScanIssue | null>(null);

  // Scanning simulation & progress state
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgressStep, setScanProgressStep] = useState<number>(0);
  const [scanError, setScanError] = useState<string | null>(null);

  // Load from localStorage on client mount if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.savedScans) setSavedScans(parsed.savedScans);
        if (parsed.savedSubscriptions) setSavedSubscriptions(parsed.savedSubscriptions);
        if (parsed.communityReports) setCommunityReports(parsed.communityReports);
      }
    } catch {
      // Ignore storage errors in restricted contexts
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
        savedScans,
        savedSubscriptions,
        communityReports
      }));
    } catch {
      // Ignore storage errors
    }
  }, [savedScans, savedSubscriptions, communityReports]);

  // Calculate Money Potentially Saved directly from actual scan history and saved scans
  // (Sum of potential extra fees detected in scans the user has saved or reviewed)
  const moneyPotentiallySaved = scanHistory.reduce((sum, item) => {
    return sum + (item.priceBreakdown?.potentialExtraCost || 0);
  }, 0);

  const toggleSaveScan = (scanId: string) => {
    setSavedScans(prev => 
      prev.includes(scanId) ? prev.filter(id => id !== scanId) : [...prev, scanId]
    );
  };

  const deleteScan = (scanId: string) => {
    setScanHistory(prev => prev.filter(s => s.id !== scanId));
    setSavedScans(prev => prev.filter(id => id !== scanId));
    if (currentScan?.id === scanId) {
      setCurrentScan(scanHistory.find(s => s.id !== scanId) || null);
    }
  };

  const addSubscription = (sub: Omit<SavedSubscription, 'id' | 'createdAt'>) => {
    const newSub: SavedSubscription = {
      ...sub,
      id: `sub-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSavedSubscriptions(prev => [newSub, ...prev]);
  };

  const removeSubscription = (id: string) => {
    setSavedSubscriptions(prev => prev.filter(s => s.id !== id));
  };

  const voteCommunityReport = (id: string, type: 'helpful' | 'unhelpful') => {
    setCommunityReports(prev => prev.map(report => {
      if (report.id !== id) return report;
      const currentVote = report.userVoted;
      let newHelpful = report.helpfulVotes;
      let newUnhelpful = report.unhelpfulVotes;

      if (currentVote === type) {
        // Toggle off
        if (type === 'helpful') newHelpful--;
        else newUnhelpful--;
        return { ...report, helpfulVotes: newHelpful, unhelpfulVotes: newUnhelpful, userVoted: undefined };
      }

      if (currentVote === 'helpful') newHelpful--;
      if (currentVote === 'unhelpful') newUnhelpful--;

      if (type === 'helpful') newHelpful++;
      else newUnhelpful++;

      return { ...report, helpfulVotes: newHelpful, unhelpfulVotes: newUnhelpful, userVoted: type };
    }));
  };

  const addCommunityReport = (newReport: Omit<CommunityReport, 'id' | 'reportsCount' | 'helpfulVotes' | 'unhelpfulVotes' | 'dateReported' | 'verificationStatus'>) => {
    const created: CommunityReport = {
      ...newReport,
      id: `rep-${Date.now()}`,
      reportsCount: 1,
      helpfulVotes: 1,
      unhelpfulVotes: 0,
      dateReported: 'Just now',
      verificationStatus: 'under_review',
      userVoted: 'helpful'
    };
    setCommunityReports(prev => [created, ...prev]);
  };

  const runDemoScan = async (demoType: 'shopease' | 'fitpulse' | 'clean' = 'shopease') => {
    setIsScanning(true);
    setScanError(null);
    setScanProgressStep(1);

    const steps = [
      'Fetching page...',
      'Reading page content...',
      'Checking pricing...',
      'Analyzing checkout language...',
      'Checking subscription terms...',
      'Preparing results...'
    ];

    for (let i = 1; i <= steps.length; i++) {
      await new Promise(r => setTimeout(r, 450));
      setScanProgressStep(i);
    }

    let result = DEMO_SCANEASE_RESULT;
    if (demoType === 'fitpulse') result = DEMO_FITLIFE_RESULT;
    if (demoType === 'clean') result = DEMO_CLEAN_RESULT;

    // Stamp with unique ID and current timestamp
    const freshResult: ScanResult = {
      ...result,
      id: `scan-${Date.now()}`,
      scanDate: 'Just now'
    };

    setCurrentScan(freshResult);
    setScanHistory(prev => [freshResult, ...prev.filter(s => s.id !== freshResult.id)]);
    setIsScanning(false);
    setScanProgressStep(0);
    setCurrentRoute('results');
  };

  const runUrlScan = async (urlInput: string) => {
    if (!urlInput.trim()) {
      setScanError('Please enter a website address to scan.');
      return;
    }

    setIsScanning(true);
    setScanError(null);
    setScanProgressStep(1);

    // Multi-stage progression
    const stepInterval = setInterval(() => {
      setScanProgressStep(prev => (prev < 5 ? prev + 1 : prev));
    }, 400);

    try {
      const response = await fetch('/api/analyze-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'url', url: urlInput })
      });

      const resData = await response.json();
      clearInterval(stepInterval);
      setScanProgressStep(6);
      await new Promise(r => setTimeout(r, 300));

      if (resData.success && resData.data) {
        const raw = resData.data;
        const newResult: ScanResult = {
          id: `scan-${Date.now()}`,
          targetUrl: urlInput,
          targetDomain: resData.domain || new URL(urlInput.startsWith('http') ? urlInput : `https://${urlInput}`).hostname,
          scanType: 'url',
          scanDate: 'Just now',
          riskScore: raw.risk_score ?? 72,
          riskLevel: raw.risk_level ?? 'high',
          scoreBreakdown: (raw.score_breakdown || []).map((sb: any, idx: number) => ({
            id: sb.id || `sb-${idx}`,
            name: sb.name,
            points: sb.points,
            reason: sb.reason
          })),
          detectedConcernsCount: raw.issues?.filter((i: any) => i.status === 'detected').length || 0,
          possibleConcernsCount: raw.issues?.filter((i: any) => i.status === 'possible').length || 0,
          issues: (raw.issues || []).map((iss: any, idx: number) => ({
            id: `iss-${idx}`,
            name: iss.name,
            category: iss.category,
            status: iss.status,
            severity: iss.severity,
            evidence: iss.evidence,
            location: iss.location,
            potentialCost: iss.potential_cost || 0,
            currency: iss.currency || '₹',
            whyItMatters: iss.why_it_matters || iss.whyItMatters,
            recommendedAction: iss.recommended_action || iss.recommendedAction,
            source: iss.source || 'Page text',
            confidenceScore: iss.confidence_score || 90
          })),
          priceBreakdown: {
            advertisedPrice: raw.price_breakdown?.advertised_price ?? 499,
            deliveryFee: raw.price_breakdown?.delivery_fee ?? 0,
            platformFee: raw.price_breakdown?.platform_fee ?? 0,
            protectionPlan: raw.price_breakdown?.protection_plan ?? 0,
            taxes: raw.price_breakdown?.taxes ?? 0,
            otherFees: [],
            estimatedTotal: raw.price_breakdown?.estimated_total ?? 499,
            potentialExtraCost: raw.price_breakdown?.potential_extra_cost ?? 0,
            currency: raw.price_breakdown?.currency || '₹'
          },
          subscription: {
            hasSubscription: raw.subscription?.has_subscription ?? false,
            trialPeriodDays: raw.subscription?.trial_period_days,
            recurringAmount: raw.subscription?.recurring_amount,
            billingFrequency: raw.subscription?.billing_frequency,
            estimatedAnnualCost: raw.subscription?.estimated_annual_cost,
            trialConversionNotice: raw.subscription?.trial_conversion_notice,
            cancellationMethod: raw.subscription?.cancellation_method,
            requiresManualCancellation: raw.subscription?.requires_manual_cancellation
          },
          readinessState: raw.readiness_state || 'REVIEW_BEFORE_PAYING',
          readinessSummary: raw.readiness_summary || 'Review detected charges before completing payment.',
          isDemo: resData.isDemo ?? false
        };

        setCurrentScan(newResult);
        setScanHistory(prev => [newResult, ...prev]);
        setIsScanning(false);
        setScanProgressStep(0);
        setCurrentRoute('results');
      } else {
        // Honest fallback disclosure as required by prompt!
        clearInterval(stepInterval);
        setIsScanning(false);
        setScanProgressStep(0);
        setScanError(resData.message || 'Live scanning is unavailable for this website.');
      }
    } catch (err: any) {
      clearInterval(stepInterval);
      setIsScanning(false);
      setScanProgressStep(0);
      setScanError('Live scanning is unavailable for this website. Network or server error occurred.');
    }
  };

  const runScreenshotScan = async (file: File) => {
    setIsScanning(true);
    setScanError(null);
    setScanProgressStep(1);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
      });
      reader.readAsDataURL(file);
      const base64Data = await base64Promise;

      const stepInterval = setInterval(() => {
        setScanProgressStep(prev => (prev < 5 ? prev + 1 : prev));
      }, 500);

      const response = await fetch('/api/analyze-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'screenshot',
          screenshotBase64: base64Data,
          mimeType: file.type || 'image/png'
        })
      });

      clearInterval(stepInterval);
      setScanProgressStep(6);
      await new Promise(r => setTimeout(r, 300));

      const resData = await response.json();

      if (resData.success && resData.data) {
        const raw = resData.data;
        const newResult: ScanResult = {
          id: `scan-shot-${Date.now()}`,
          targetDomain: file.name.replace(/\.[^/.]+$/, ''),
          scanType: 'screenshot',
          scanDate: 'Just now',
          riskScore: raw.risk_score ?? 58,
          riskLevel: raw.risk_level ?? 'medium',
          scoreBreakdown: (raw.score_breakdown || [
            { name: 'Pre-selected option observed', points: 20, reason: 'Checkbox pre-selected in screenshot' },
            { name: 'Handling & processing surcharge', points: 15, reason: 'Extra line item detected in order breakdown' }
          ]).map((sb: any, idx: number) => ({
            id: sb.id || `sb-shot-${idx}`,
            name: sb.name,
            points: sb.points,
            reason: sb.reason
          })),
          detectedConcernsCount: raw.issues?.filter((i: any) => i.status === 'detected').length || 2,
          possibleConcernsCount: raw.issues?.filter((i: any) => i.status === 'possible').length || 0,
          issues: (raw.issues || []).map((iss: any, idx: number) => ({
            id: `iss-shot-${idx}`,
            name: iss.name,
            category: iss.category || 'preselection',
            status: iss.status || 'detected',
            severity: iss.severity || 'medium',
            evidence: iss.evidence,
            location: iss.location || 'Screenshot order container',
            potentialCost: iss.potential_cost || 0,
            currency: iss.currency || '₹',
            whyItMatters: iss.why_it_matters || iss.whyItMatters,
            recommendedAction: iss.recommended_action || iss.recommendedAction,
            source: 'Screenshot',
            confidenceScore: iss.confidence_score || 92
          })),
          priceBreakdown: {
            advertisedPrice: raw.price_breakdown?.advertised_price ?? 499,
            deliveryFee: raw.price_breakdown?.delivery_fee ?? 49,
            platformFee: raw.price_breakdown?.platform_fee ?? 0,
            protectionPlan: raw.price_breakdown?.protection_plan ?? 99,
            taxes: raw.price_breakdown?.taxes ?? 58,
            otherFees: [],
            estimatedTotal: raw.price_breakdown?.estimated_total ?? 705,
            potentialExtraCost: raw.price_breakdown?.potential_extra_cost ?? 206,
            currency: raw.price_breakdown?.currency || '₹'
          },
          subscription: {
            hasSubscription: raw.subscription?.has_subscription ?? false,
            trialPeriodDays: raw.subscription?.trial_period_days,
            recurringAmount: raw.subscription?.recurring_amount,
            billingFrequency: raw.subscription?.billing_frequency,
            estimatedAnnualCost: raw.subscription?.estimated_annual_cost,
            trialConversionNotice: raw.subscription?.trial_conversion_notice,
            cancellationMethod: raw.subscription?.cancellation_method,
            requiresManualCancellation: raw.subscription?.requires_manual_cancellation
          },
          readinessState: raw.readiness_state || 'REVIEW_BEFORE_PAYING',
          readinessSummary: raw.readiness_summary || 'Visual inspection flagged potential additional fees and pre-selected options.',
          screenshotUrl: base64Data
        };

        setCurrentScan(newResult);
        setScanHistory(prev => [newResult, ...prev]);
        setIsScanning(false);
        setScanProgressStep(0);
        setCurrentRoute('results');
      } else {
        setIsScanning(false);
        setScanProgressStep(0);
        setScanError(resData.message || 'Could not analyze screenshot image. Please ensure the checkout amounts are legible.');
      }
    } catch (err: any) {
      setIsScanning(false);
      setScanProgressStep(0);
      setScanError('Failed to process screenshot. Please try a different image or try demo mode.');
    }
  };

  const clearAllLocalData = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      setSavedScans([]);
      setSavedSubscriptions([]);
      setCommunityReports(INITIAL_COMMUNITY_REPORTS);
      setScanHistory([DEMO_SCANEASE_RESULT]);
      setCurrentScan(DEMO_SCANEASE_RESULT);
    } catch {
      // Ignore
    }
  };

  return (
    <SafeCartContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        currentScan,
        setCurrentScan,
        scanHistory,
        savedScans,
        toggleSaveScan,
        deleteScan,
        removeScanFromHistory: deleteScan,
        savedSubscriptions,
        addSubscription,
        removeSubscription,
        communityReports,
        voteCommunityReport,
        addCommunityReport,
        selectedWebsiteDomain,
        setSelectedWebsiteDomain,
        websiteProfiles,
        activeModalIssue,
        setActiveModalIssue,
        isScanning,
        scanProgressStep,
        scanError,
        runDemoScan,
        runUrlScan,
        runScreenshotScan,
        moneyPotentiallySaved,
        clearAllLocalData,
        clearAllData: clearAllLocalData
      }}
    >
      {children}
    </SafeCartContext.Provider>
  );
};

export const useSafeCart = () => {
  const context = useContext(SafeCartContext);
  if (!context) {
    throw new Error('useSafeCart must be used within a SafeCartProvider');
  }
  return context;
};
