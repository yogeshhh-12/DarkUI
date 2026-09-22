import { jsPDF } from 'jspdf';
import { ScanResult } from '../types';

/**
 * Generates and downloads a clean, professional PDF audit report
 * summarizing detected dark patterns, price breakdown, and checklist recommendations.
 */
export function generatePdfReport(scan: ScanResult): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let currentY = 18;

  // Helper to ensure page bounds
  const checkPageBreak = (neededHeight: number) => {
    if (currentY + neededHeight > pageHeight - margin) {
      doc.addPage();
      currentY = margin;
      drawHeaderBadge();
    }
  };

  const drawHeaderBadge = () => {
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`SafeCart Audit Report • ${scan.targetDomain} • Page ${doc.getNumberOfPages()}`, margin, 10);
  };

  // --- Document Header ---
  // Top Banner / Header Accent Bar
  doc.setFillColor(15, 23, 42); // slate-900
  doc.roundedRect(margin, currentY, contentWidth, 24, 3, 3, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(255, 255, 255);
  doc.text('SafeCart™ Transparency & Pre-Payment Audit', margin + 6, currentY + 10);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  const dateStr = scan.scanDate || new Date().toLocaleDateString();
  doc.text(`Domain: ${scan.targetDomain}  |  Scan Type: ${scan.scanType.toUpperCase()}  |  Date: ${dateStr}`, margin + 6, currentY + 18);

  currentY += 30;

  // --- Executive Summary Box ---
  checkPageBreak(38);
  const isHighRisk = scan.riskLevel === 'high';
  const isMediumRisk = scan.riskLevel === 'medium';

  // Box background based on risk
  if (isHighRisk) {
    doc.setFillColor(254, 242, 242); // rose-50
    doc.setDrawColor(248, 113, 113); // rose-400
  } else if (isMediumRisk) {
    doc.setFillColor(255, 251, 235); // amber-50
    doc.setDrawColor(251, 191, 36); // amber-400
  } else {
    doc.setFillColor(240, 253, 244); // emerald-50
    doc.setDrawColor(74, 222, 128); // emerald-400
  }

  doc.setLineWidth(0.4);
  doc.roundedRect(margin, currentY, contentWidth, 26, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  if (isHighRisk) {
    doc.setTextColor(185, 28, 28);
  } else if (isMediumRisk) {
    doc.setTextColor(180, 83, 9);
  } else {
    doc.setTextColor(21, 128, 61);
  }
  
  const riskTitle = `RISK SCORE: ${scan.riskScore}/100 • ${scan.riskLevel.toUpperCase()} RISK INDICATOR`;
  doc.text(riskTitle, margin + 6, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Readiness Status: ${scan.readinessState.replace(/_/g, ' ')}  |  Detected Concerns: ${scan.detectedConcernsCount}  |  Potential Concerns: ${scan.possibleConcernsCount}`,
    margin + 6,
    currentY + 14
  );

  const summaryLines = doc.splitTextToSize(scan.readinessSummary || 'Comprehensive pre-payment analysis completed.', contentWidth - 12);
  doc.text(summaryLines, margin + 6, currentY + 20);

  currentY += 34;

  // --- True Cost & Price Breakdown Section ---
  checkPageBreak(50);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('1. True Cost View™ & Hidden Fee Summary', margin, currentY);
  currentY += 5;

  const pb = scan.priceBreakdown;
  const curr = pb.currency || '₹';

  // Table header
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(margin, currentY, contentWidth, 7, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text('LINE ITEM', margin + 4, currentY + 5);
  doc.text('AMOUNT', margin + contentWidth - 25, currentY + 5, { align: 'right' });
  currentY += 7;

  // Line items
  const lineItems: { label: string; amount: number; highlight?: boolean }[] = [
    { label: 'Advertised Baseline Price', amount: pb.advertisedPrice },
    { label: 'Delivery & Handling Surcharge', amount: pb.deliveryFee },
    { label: 'Platform / Convenience Fee', amount: pb.platformFee },
    { label: 'Pre-Selected Protection / Warranty Add-on', amount: pb.protectionPlan },
    { label: 'Estimated Taxes & Levies', amount: pb.taxes },
  ];

  if (pb.otherFees && pb.otherFees.length > 0) {
    pb.otherFees.forEach(of => {
      lineItems.push({ label: of.name, amount: of.amount });
    });
  }

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);

  lineItems.forEach((item, index) => {
    if (item.amount > 0 || index === 0) {
      checkPageBreak(7);
      if (index % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(margin, currentY, contentWidth, 6, 'F');
      }
      doc.text(item.label, margin + 4, currentY + 4.5);
      doc.text(`${curr}${item.amount.toLocaleString()}`, margin + contentWidth - 25, currentY + 4.5, { align: 'right' });
      currentY += 6;
    }
  });

  // Totals line
  checkPageBreak(16);
  doc.setDrawColor(203, 213, 225);
  doc.line(margin, currentY + 1, margin + contentWidth, currentY + 1);
  currentY += 3;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(15, 23, 42);
  doc.text('Estimated Final Checkout Total:', margin + 4, currentY + 4);
  doc.text(`${curr}${pb.estimatedTotal.toLocaleString()}`, margin + contentWidth - 25, currentY + 4, { align: 'right' });
  currentY += 7;

  if (pb.potentialExtraCost > 0) {
    doc.setFillColor(254, 242, 242);
    doc.roundedRect(margin, currentY, contentWidth, 7, 1.5, 1.5, 'F');
    doc.setTextColor(185, 28, 28);
    doc.setFontSize(8.5);
    doc.text(
      `Notice: You may pay ${curr}${pb.potentialExtraCost.toLocaleString()} more than the advertised baseline price.`,
      margin + 4,
      currentY + 4.8
    );
    currentY += 10;
  } else {
    currentY += 4;
  }

  // --- Detected Dark Patterns & Clauses ---
  checkPageBreak(25);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(`2. Detected Dark Patterns & Issues (${scan.issues.length})`, margin, currentY);
  currentY += 6;

  if (scan.issues.length === 0) {
    checkPageBreak(12);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8.5);
    doc.setTextColor(100, 116, 139);
    doc.text('No deceptive patterns or unexpected billing practices were detected in this audit.', margin + 4, currentY + 4);
    currentY += 10;
  } else {
    scan.issues.forEach((issue, idx) => {
      checkPageBreak(28);

      const statusColor = issue.status === 'detected' ? [225, 29, 72] : [217, 119, 6];
      const statusLabel = issue.status === 'detected' ? 'DETECTED' : 'POSSIBLE CONCERN';

      // Card Container
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(margin, currentY, contentWidth, 24, 1.5, 1.5, 'FD');

      // Issue Title & Status Badge
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(`${idx + 1}. ${issue.name}`, margin + 4, currentY + 5.5);

      doc.setFontSize(7.5);
      doc.setTextColor(statusColor[0], statusColor[1], statusColor[2]);
      doc.text(`[${statusLabel} • ${issue.severity.toUpperCase()} SEVERITY]`, margin + contentWidth - 6, currentY + 5.5, { align: 'right' });

      // Evidence Quote
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(71, 85, 105);
      const evidenceText = `Evidence: "${issue.evidence}" (Found at: ${issue.location})`;
      const evidenceLines = doc.splitTextToSize(evidenceText, contentWidth - 10);
      doc.text(evidenceLines, margin + 4, currentY + 10.5);

      // What You Can Do
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7.5);
      doc.setTextColor(15, 23, 42);
      doc.text('Action before paying: ', margin + 4, currentY + 19);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(15, 118, 110); // teal-700
      const recLines = doc.splitTextToSize(issue.recommendedAction, contentWidth - 40);
      doc.text(recLines, margin + 35, currentY + 19);

      currentY += 27;
    });
  }

  // --- Recurring Billing / Subscription Alert (if any) ---
  if (scan.subscription && scan.subscription.hasSubscription) {
    checkPageBreak(30);
    doc.setFillColor(254, 242, 242);
    doc.setDrawColor(248, 113, 113);
    doc.roundedRect(margin, currentY, contentWidth, 24, 2, 2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(185, 28, 28);
    doc.text('3. Recurring Subscription & Continuity Alert', margin + 5, currentY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(51, 65, 85);
    const subNotice = scan.subscription.trialConversionNotice || 'Automatic recurring charges apply unless canceled manually.';
    const subLines = doc.splitTextToSize(`Recurring Amount: ${curr}${scan.subscription.recurringAmount || 0} / ${scan.subscription.billingFrequency || 'period'} • ${subNotice}`, contentWidth - 10);
    doc.text(subLines, margin + 5, currentY + 12);

    const cancelLine = `Cancellation Method: ${scan.subscription.cancellationMethod || 'Account settings before next renewal'}`;
    doc.text(cancelLine, margin + 5, currentY + 19);

    currentY += 28;
  }

  // --- Footer / Disclaimer ---
  checkPageBreak(20);
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184); // slate-400
  const disclaimer = 'SafeCart is an independent pre-payment transparency assistant. SafeCart does not process payments, store credit card details, or represent scanned merchants. All findings represent automated observations to help consumers make informed checkout decisions.';
  const disclaimerLines = doc.splitTextToSize(disclaimer, contentWidth);
  doc.text(disclaimerLines, margin, currentY + 6);

  // Generate clean filename
  const cleanDomain = scan.targetDomain.replace(/[^a-zA-Z0-9.-]/g, '_');
  const filename = `SafeCart-Audit-${cleanDomain}-${Date.now().toString().slice(-6)}.pdf`;
  
  doc.save(filename);
}
