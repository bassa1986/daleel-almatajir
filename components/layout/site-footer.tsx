import Link from 'next/link';

const MAIN_LINKS = [
  { href: '/muqaranat', label: 'Ø§ÙÙÙØ§Ø±ÙØ§Øª' },
  { href: '/calculator', label: 'Ø§ÙØ­Ø§Ø³Ø¨Ø©' },
  { href: '/adilla', label: 'Ø§ÙØ£Ø¯ÙØ©' },
  { href: '/case-studies', label: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ©' },
];

const LEGAL_LINKS = [
  { href: '/privacy', label: 'Ø³ÙØ§Ø³Ø© Ø§ÙØ®ØµÙØµÙØ©' },
  { href: '/affiliate-disclosure', label: 'Ø¥ÙØµØ§Ø­ Ø§ÙØ±ÙØ§Ø¨Ø· Ø§ÙØªØ§Ø¨Ø¹Ø©' },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-background/50 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <Link href="/" className="text-xl font-extrabold text-white mb-3 block">Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±</Link>
            <p className="text-slate-400 text-sm leading-relaxed">Ø§ÙÙØ±Ø¬Ø¹ Ø§ÙØ£ÙÙ Ø¹Ø±Ø¨ÙØ§Ù ÙÙÙØ§Ø±ÙØ© ÙÙØµØ§Øª Ø§ÙØªØ¬Ø§Ø±Ø© Ø§ÙØ¥ÙÙØªØ±ÙÙÙØ© ÙÙ Ø§ÙØ³ÙÙ Ø§ÙØ³Ø¹ÙØ¯Ù ÙØ§ÙØ®ÙÙØ¬Ù.</p>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">Ø§ÙØµÙØ­Ø§Øª</h3>
            <ul className="space-y-2">
              {MAIN_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-4">ÙØ§ÙÙÙÙ</h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map(link => (
                <li key={link.href}><Link href={link.href} className="text-slate-400 hover:text-white text-sm transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/6 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">Â© {new Date().getFullYear()} Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±. Ø¬ÙÙØ¹ Ø§ÙØ­ÙÙÙ ÙØ­ÙÙØ¸Ø©.</p>
          <p className="text-slate-600 text-xs">ÙØ³ØªÙÙ ÙÙÙØ¶ÙØ¹Ù â ÙØ³ÙØ§ ØªØ§Ø¨Ø¹ÙÙ ÙØ£Ù ÙÙØµØ©</p>
        </div>
      </div>
    </footer>
  );
}