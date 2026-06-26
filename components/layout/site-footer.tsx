'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Twitter, Linkedin, Youtube, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { subscribeEmail } from '@/lib/actions/subscribe';

const NAV_LINKS = [
  { href: '/Ù…Ù‚Ø§Ø±Ù†Ø§Øª', labelAr: 'Ø§Ù„Ù…Ù‚Ø§Ø±Ù†Ø§Øª' },
  { href: '/Ø­Ø§Ø³Ø¨Ø©-Ø§Ù„ØªÙƒØ§Ù„ÙŠÙ', labelAr: 'Ø§Ù„Ø­Ø§Ø³Ø¨Ø©' },
  { href: '/Ø£Ø¯Ù„Ø©', labelAr: 'Ø§Ù„Ø£Ø¯Ù„Ø©' },
  { href: '/Ø¯Ø±Ø§Ø³Ø§Øª-Ø§Ù„Ø­Ø§Ù„Ø©', labelAr: 'Ø¯Ø±Ø§Ø³Ø§Øª Ø§Ù„Ø­Ø§Ù„Ø©' },
];

const LEGAL_LINKS = [
  { href: '/Ø³ÙŠØ§Ø³Ø©-Ø§Ù„Ø®ØµÙˆØµÙŠØ©', labelAr: 'Ø³ÙŠØ§Ø³Ø© Ø§Ù„Ø®ØµÙˆØµÙŠØ©' },
  { href: '/Ø¥ÙØµØ§Ø­-Ø§Ù„ØªØ§Ø¨Ø¹', labelAr: 'Ø¥ÙØµØ§Ø­ Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ØªØ§Ø¨Ø¹Ø©' },
];

export function SiteFooter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubscribe() {
    if (!email) return;
    setStatus('loading');
    const result = await subscribeEmail(email, 'footer');
    setStatus(result.success ? 'success' : 'error');
    setMessage(result.messageAr);
    if (result.success) setEmail('');
  }

  return (
    <footer className="border-t border-white/6 bg-surface/50 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Newsletter + brand row */}
        <div className="grid md:grid-cols-2 gap-12 mb-14">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-extrabold text-white mb-3">Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø±</h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-5 max-w-sm">
              Ø§Ù„Ù…Ø±Ø¬Ø¹ Ø§Ù„Ø£ÙˆÙ„ Ø¹Ø±Ø¨ÙŠØ§Ù‹ Ù„Ù…Ù‚Ø§Ø±Ù†Ø© Ù…Ù†ØµØ§Øª Ø§Ù„ØªØ¬Ø§Ø±Ø© Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠØ©. Ø¨ÙŠØ§Ù†Ø§Øª Ù…Ø³ØªÙ‚Ù„Ø© ÙˆÙ…ÙˆØ¶ÙˆØ¹ÙŠØ©ØŒ
              Ù…Ø­Ø¯Ù‘Ø«Ø© Ø¯ÙˆØ±ÙŠØ§Ù‹ØŒ Ù„Ù„Ù…Ø³Ø§Ø¹Ø¯Ø© ÙÙŠ Ø§ØªØ®Ø§Ø° Ø§Ù„Ù‚Ø±Ø§Ø± Ø§Ù„ØµØ­ÙŠØ­.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ØªÙˆÙŠØªØ±"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ù„ÙŠÙ†ÙƒØ¯Ø¥Ù†"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ÙŠÙˆØªÙŠÙˆØ¨"
                className="w-9 h-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Mail size={18} className="text-secondary" />
              Ø§Ø´ØªØ±Ùƒ ÙÙŠ Ø§Ù„Ù†Ø´Ø±Ø© Ø§Ù„Ø£Ø³Ø¨ÙˆØ¹ÙŠØ©
            </h3>
            <p className="text-slate-400 text-sm mb-5">
              Ø£Ø­Ø¯Ø« Ù…Ù‚Ø§Ø±Ù†Ø§Øª Ø§Ù„Ø£Ø³Ø¹Ø§Ø± ÙˆØªØ­Ø¯ÙŠØ«Ø§Øª Ø§Ù„Ù…Ù†ØµØ§Øª Ù…Ø¨Ø§Ø´Ø±Ø©Ù‹ Ø¥Ù„Ù‰ Ø¨Ø±ÙŠØ¯Ùƒ.
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 text-emerald-400 text-sm font-semibold"
              >
                <CheckCircle2 size={18} />
                {message}
              </motion.div>
            ) : (
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                  placeholder="Ø¨Ø±ÙŠØ¯Ùƒ Ø§Ù„Ø¥Ù„ÙƒØªØ±ÙˆÙ†ÙŠ"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 backdrop-blur-sm transition-all"
                  dir="ltr"
                />
                <button
                  onClick={handleSubscribe}
                  disabled={status === 'loading' || !email}
                  className="btn-primary text-sm px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? '...' : 'Ø§Ø´ØªØ±Ùƒ'}
                </button>
              </div>
            )}

            {status === 'error' && (
              <p className="text-red-400 text-xs mt-2">{message}</p>
            )}
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-x-6 gap-y-3 mb-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.labelAr}
            </Link>
          ))}
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
            >
              {link.labelAr}
            </Link>
          ))}
        </div>

        <div className="section-divider mb-8" />

        {/* Affiliate disclosure */}
        <div className="glass p-5 mb-8 rounded-xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">Ø¥ÙØµØ§Ø­: </span>
            Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø± Ù…ÙˆÙ‚Ø¹ Ù…Ø³ØªÙ‚Ù„ØŒ ÙˆÙ‚Ø¯ Ù†Ø­ØµÙ„ Ø¹Ù„Ù‰ Ø¹Ù…ÙˆÙ„Ø© Ù…Ù† Ø¨Ø¹Ø¶ Ø§Ù„Ø±ÙˆØ§Ø¨Ø· Ø§Ù„ØªØ§Ø¨Ø¹Ø© ÙÙŠ Ù‡Ø°Ø§ Ø§Ù„Ù…ÙˆÙ‚Ø¹ Ø¯ÙˆÙ†
            Ø£ÙŠ ØªÙƒÙ„ÙØ© Ø¥Ø¶Ø§ÙÙŠØ© Ø¹Ù„ÙŠÙƒ. Ù‡Ø°Ø§ Ù„Ø§ ÙŠØ¤Ø«Ø± Ø¹Ù„Ù‰ ØªÙ‚ÙŠÙŠÙ…Ø§ØªÙ†Ø§ Ø£Ùˆ ØªØ±ØªÙŠØ¨ Ø§Ù„Ù…Ù‚Ø§Ø±Ù†Ø§ØªØŒ ÙˆØ§Ù„ØªÙŠ ØªØ³ØªÙ†Ø¯
            Ø¥Ù„Ù‰ Ø£Ø³Ø¹Ø§Ø± ÙˆÙ…Ø²Ø§ÙŠØ§ Ø­Ù‚ÙŠÙ‚ÙŠØ© Ù„ÙƒÙ„ Ù…Ù†ØµØ©.
          </p>
        </div>

        {/* Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
          <span>Â© Ù¢Ù Ù¢Ù¦ Ø¯Ù„ÙŠÙ„ Ø§Ù„Ù…ØªØ§Ø¬Ø± â€” Ù…Ø³ØªÙ‚Ù„ Ø¹Ù† Ø¬Ù…ÙŠØ¹ Ø§Ù„Ù…Ù†ØµØ§Øª Ø§Ù„Ù…Ø°ÙƒÙˆØ±Ø©</span>
          <span className="flex items-center gap-1">
            ØµÙÙ†Ø¹ Ø¨Ù€ â™¥ Ù„Ù„ØªØ¬Ø§Ø± Ø§Ù„Ø¹Ø±Ø¨
          </span>
        </div>
      </div>
    </footer>
  );
}
