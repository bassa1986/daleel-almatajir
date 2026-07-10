'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/muqaranat', label: 'Ø§ÙÙÙØ§Ø±ÙØ§Øª' },
  { href: '/calculator', label: 'Ø§ÙØ­Ø§Ø³Ø¨Ø©' },
  { href: '/adilla', label: 'Ø§ÙØ£Ø¯ÙØ©' },
  { href: '/case-studies', label: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§ÙØ­Ø§ÙØ©' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-white tracking-tight">Ø¯ÙÙÙ Ø§ÙÙØªØ§Ø¬Ø±</Link>
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white transition-colors font-medium">{link.label}</Link>
          ))}
        </nav>
        <Link href="/calculator" className="hidden md:flex btn btn-primary text-sm px-4 py-2 rounded-full font-bold">
          â Ø§Ø­Ø³Ø¨ ØªÙÙÙØªÙ
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-background border-t border-white/6 px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="text-slate-300 hover:text-white font-medium">{link.label}</Link>
          ))}
          <Link href="/calculator" onClick={() => setOpen(false)} className="btn btn-primary text-sm px-4 py-2 rounded-full font-bold text-center">â Ø§Ø­Ø³Ø¨ ØªÙÙÙØªÙ</Link>
        </div>
      )}
    </header>
  );
}