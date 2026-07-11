import Link from 'next/link';

const MAIN_LINKS = [
  { href: '/muqaranat', label: 'المقارنات' },
  { href: '/calculator', label: 'الحاسبة' },
  { href: '/adilla', label: 'الأدلة' },
  { href: '/case-studies', label: 'دراسات الحالة' },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'سياسة الخصوصية' },
  { href: '/affiliate-disclosure', label: 'إفصاح الروابط التابعة' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-background/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-extrabold text-white mb-3 block">دليل المتاجر</Link>
            <p className="text-slate-400 text-sm leading-relaxed">المرجع الأول عربياً لمقارنة منصات التجارة الإلكترونية في السوق السعودي والخليجي.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">الصفحات</h3>
            <ul className="space-y-2">
              {MAIN_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">قانوني</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} دليل المتاجر. جميع الحقوق محفوظة.</p>
          <p className="text-slate-600 text-xs">مستقل وموضوعي — لسنا تابعين لأي منصة</p>
        </div>
      </div>
    </footer>
  );
}