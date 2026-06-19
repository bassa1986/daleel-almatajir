import { formatCurrency } from '@/lib/calculator/currency';
import type { PdfReportData } from '@/lib/calculator/pdf-export';

interface PrintableReportProps {
  data: PdfReportData;
}

/**
 * Rendered off-screen (see CalculatorApp) and rasterized by html2canvas in
 * exportCalculatorReportPdf. Must stay self-contained inline styles only —
 * no Tailwind utility classes — since html2canvas snapshots computed styles
 * and we want this to look identical regardless of the page's CSS state.
 */
export function PrintableReport({ data }: PrintableReportProps) {
  return (
    <div
      dir="rtl"
      style={{
        width: '760px',
        padding: '40px',
        backgroundColor: '#0A0F1E',
        color: '#E2E8F0',
        fontFamily: 'Cairo, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
        <div style={{ fontSize: '22px', fontWeight: 800, color: '#fff', marginBottom: '6px' }}>{data.headerAr}</div>
        <div style={{ fontSize: '12px', color: '#94A3B8' }}>{data.generatedAtAr}</div>
      </div>

      {/* Inputs summary */}
      <div style={{ marginBottom: '28px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>ملخص المدخلات</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {data.inputsSummary.map((row, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                padding: '8px 12px',
                backgroundColor: 'rgba(255,255,255,0.04)',
                borderRadius: '8px',
              }}
            >
              <span style={{ color: '#94A3B8' }}>{row.labelAr}</span>
              <span style={{ color: '#fff', fontWeight: 600 }}>{row.valueAr}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Per-platform breakdown */}
      {data.platforms.map((platform) => (
        <div
          key={platform.slug}
          style={{
            marginBottom: '16px',
            padding: '16px',
            backgroundColor: platform.isRecommended ? 'rgba(59,130,246,0.08)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${platform.isRecommended ? 'rgba(59,130,246,0.3)' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '12px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff' }}>
                #{platform.rank} {platform.nameAr}
              </span>
              <span style={{ fontSize: '11px', color: '#94A3B8', marginRight: '8px' }}>باقة {platform.tierNameAr}</span>
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#fff' }}>{platform.totalMonthlyCostAr}/شهر</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', marginBottom: '8px' }}>
            {platform.rows.map((row, i) => (
              <div key={i} style={{ fontSize: '10px' }}>
                <div style={{ color: '#64748B' }}>{row.labelAr}</div>
                <div style={{ color: '#CBD5E1', fontWeight: 600 }}>{row.valueAr}</div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '11px', color: '#94A3B8' }}>التكلفة السنوية: {platform.totalAnnualCostAr}</div>

          {platform.warningsAr.map((w, i) => (
            <div key={i} style={{ fontSize: '10px', color: '#FCD34D', marginTop: '6px' }}>
              ⚠ {w}
            </div>
          ))}
        </div>
      ))}

      {/* Footer */}
      <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.15)', fontSize: '11px', color: '#64748B', textAlign: 'center' }}>
        {data.footerAr}
      </div>
    </div>
  );
}
