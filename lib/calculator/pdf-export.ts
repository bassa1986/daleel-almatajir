// =============================================================
// دليل المتاجر — PDF export
//
// SECTION 3, "PDF EXPORT (jsPDF)":
//   Header:  "دليل المتاجر — تقرير تكاليف منصات التجارة الإلكترونية"
//   Inputs summary row
//   Per-platform result with cost breakdown
//   Footer:  "daleel-almatajir.com | الأرقام تقديرية"
//
// IMPORTANT — why this isn't pure jsPDF text:
// jsPDF's built-in fonts have no Arabic glyphs and don't perform Arabic
// contextual shaping (initial/medial/final letterforms) or bidi reordering.
// Rather than embed a custom font + a reshaping library, we rasterize a
// normal React/HTML report element (already rendered correctly by the
// browser, RTL + Cairo font) with html2canvas and place the resulting
// image(s) into a paginated jsPDF document. `jspdf` and `html2canvas` are
// both declared in package.json.
//
// The UI step (calculator page) is expected to render an off-screen
// printable element using the data from `buildPdfReportData` and pass its
// ref to `exportCalculatorReportPdf`.
// =============================================================

import { convertFromSAR, formatCurrency, formatNumber, formatPercent } from './currency';
import { WOOCOMMERCE_SCENARIO_LABELS_AR } from './constants';
import type { CalculatorOutput } from './types';

export const PDF_REPORT_HEADER_AR = 'دليل المتاجر — تقرير تكاليف منصات التجارة الإلكترونية';
export const PDF_REPORT_FOOTER_AR = 'daleel-almatajir.com | الأرقام تقديرية';

export interface PdfSummaryRow {
  labelAr: string;
  valueAr: string;
}

export interface PdfPlatformBreakdown {
  slug: string;
  nameAr: string;
  tierNameAr: string;
  isRecommended: boolean;
  rank: number;
  rows: PdfSummaryRow[];
  totalMonthlyCostAr: string;
  totalAnnualCostAr: string;
  warningsAr: string[];
}

export interface PdfReportData {
  headerAr: string;
  generatedAtAr: string;
  inputsSummary: PdfSummaryRow[];
  platforms: PdfPlatformBreakdown[];
  footerAr: string;
}

/**
 * Transforms a CalculatorOutput into a plain-data structure ready to be
 * rendered by a printable React component (header, inputs summary table,
 * per-platform breakdown cards, footer).
 */
export function buildPdfReportData(output: CalculatorOutput): PdfReportData {
  const { inputs, results } = output;
  const currency = inputs.currency;

  const inputsSummary: PdfSummaryRow[] = [
    { labelAr: 'الإيرادات الشهرية', valueAr: formatCurrency(inputs.monthlyRevenue, 'SAR') },
    { labelAr: 'عدد الطلبات الشهرية', valueAr: formatNumber(inputs.monthlyOrders) },
    { labelAr: 'العملة المعروضة', valueAr: currency },
    { labelAr: 'تضمين رسوم الإعداد في التكلفة السنوية', valueAr: inputs.includeSetup ? 'نعم' : 'لا' },
    {
      labelAr: 'سيناريو تكاليف ووكومرس',
      valueAr: WOOCOMMERCE_SCENARIO_LABELS_AR[inputs.wooCommerceScenario],
    },
  ];

  const platforms: PdfPlatformBreakdown[] = results.map((r) => {
    // monthlySubscription / transactionFees / perOrderFees / hiddenCostsTotal /
    // costPerOrder are all stored in SAR — convert each to the display
    // currency before formatting, same as totalMonthlyCostConverted etc.
    const rows: PdfSummaryRow[] = [
      { labelAr: 'الاشتراك الشهري', valueAr: formatCurrency(convertFromSAR(r.monthlySubscription, currency), currency) },
      { labelAr: 'رسوم المعاملات', valueAr: formatCurrency(convertFromSAR(r.transactionFees, currency), currency) },
      { labelAr: 'رسوم الطلبات', valueAr: formatCurrency(convertFromSAR(r.perOrderFees, currency), currency) },
      { labelAr: 'تكاليف خفية', valueAr: formatCurrency(convertFromSAR(r.hiddenCostsTotal, currency), currency) },
      { labelAr: 'التكلفة لكل طلب', valueAr: formatCurrency(convertFromSAR(r.costPerOrder, currency), currency) },
      { labelAr: 'التكلفة كنسبة من الإيرادات', valueAr: formatPercent(r.costAsRevenuePercent) },
    ];

    const warningsAr: string[] = [];
    if (r.magentoWarningTextAr) warningsAr.push(r.magentoWarningTextAr);
    if (r.tierUpgradeWarningTextAr) warningsAr.push(r.tierUpgradeWarningTextAr);
    if (r.shopifyInsightAr) warningsAr.push(r.shopifyInsightAr);

    return {
      slug: r.slug,
      nameAr: r.nameAr,
      tierNameAr: r.selectedTier.nameAr,
      isRecommended: r.isRecommended,
      rank: r.rank,
      rows,
      totalMonthlyCostAr: formatCurrency(r.totalMonthlyCostConverted, currency),
      totalAnnualCostAr: formatCurrency(r.totalAnnualCostConverted, currency),
      warningsAr,
    };
  });

  const generatedAtAr = new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  return {
    headerAr: PDF_REPORT_HEADER_AR,
    generatedAtAr,
    inputsSummary,
    platforms,
    footerAr: PDF_REPORT_FOOTER_AR,
  };
}

export interface ExportPdfOptions {
  filename?: string;
  pageFormat?: 'a4' | 'letter';
}

const DEFAULT_FILENAME = 'تقرير-تكاليف-دليل-المتاجر.pdf';

/**
 * Renders a DOM element (the printable report) to a paginated PDF and
 * triggers a download. Must run in the browser.
 *
 * @param element - root element of the printable report, e.g. a hidden
 *   `<div dir="rtl">` containing the header, inputs summary, per-platform
 *   breakdown cards, and footer — styled with the Cairo font.
 */
export async function exportCalculatorReportPdf(
  element: HTMLElement,
  options: ExportPdfOptions = {}
): Promise<void> {
  const { filename = DEFAULT_FILENAME, pageFormat = 'a4' } = options;

  // jsPDF is a named export (`export { jsPDF }`), not a default export —
  // html2canvas, by contrast, exports its function as the default.
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([
    import('jspdf'),
    import('html2canvas'),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: '#0A0F1E',
    useCORS: true,
  });

  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: pageFormat });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const imgData = canvas.toDataURL('image/png');
  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    doc.addPage();
    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  doc.save(filename);
}
