'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/cn';

const NAV_ITEMS = [
  { href: '/Ù…Ù‚Ø§Ø±Ù†Ø§Øª', labelAr: 'Ø§Ù„Ù…Ù‚Ø§Ø±Ù†Ø§Øª' },
  { href: '/Ø­Ø§Ø³Ø¨Ø©-Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ', labelAr: 'Ø§Ù„Ø­Ø§Ø³Ø¨Ø©' },
  { href: '/Ø£Ø¯Ù„Ø©', labelAr: 'Ø§Ù„Ø£Ø¯Ù„Ø©' },
  { href: '/Ø¯Ø±Ø§Ø³Ø§Øª-Ø§Ù„Ø­Ø§Ù„Ø©', labelAr: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©' },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/8 bg-background/80 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-extrabold text-white hover:text-primary transition-colors">
            Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø±
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/8 transition-all"
              >
                {item.labelAr}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/Ø­Ø§Ø³Ø¨Ø©-Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ" className="btn-primary text-sm px-5 py-2.5">
              Ø§Ø­Ø³Ø¨ ØªÙƒÙ„ÙØªÙƒ
              <ArrowLeft size={15} />
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Ø¥ØºÙ„Ø§Ù‚ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©' : 'ÙØªØ­ Ø§Ù„Ù‚Ø§Ø¦Ù…Ø©'}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-surface border-r border-white/10 p-6 md:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-extrabold text-white">Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø±</span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-400"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-1 mb-8">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/8 transition-all"
                  >
                    {item.labelAr}
                  </Link>
                ))}
              </div>
              <Link
                href="/Ø­Ø§Ø³Ø¨Ø©-Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ"
                onClick={() => setMenuOpen(false)}
                className="btn-primary w-full text-sm py-3 justify-center"
              >
                Ø§Ø­Ø³Ø¨ ØªÙƒÙ„ÙØªÙƒ Ø§Ù„Ø¢Ù† <ArrowLeft size={15} />
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
