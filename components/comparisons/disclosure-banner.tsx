'use client';

import { useState } from 'react';
import { X, Info } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export function DisclosureBanner() {
  const [dismissed, setDismissed] = useState(false);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="sticky top-16 z-40 overflow-hidden bg-surface/95 backdrop-blur-md border-b border-white/8"
        >
          <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-3 text-xs text-slate-400">
            <Info size={14} className="text-secondary flex-shrink-0" />
            <span className="flex-1">
              Ø¥ÙØµØ§Ø­: ÙØ¯ ØªØ­ØªÙÙ ÙØ°Ù Ø§ÙØµÙØ­Ø© Ø¹ÙÙ Ø±ÙØ§Ø¨Ø· ØªØ§Ø¨Ø¹Ø©. ÙÙØ§Ø±ÙØªÙØ§ ÙØ³ØªÙÙØ© ÙÙÙØ¶ÙØ¹ÙØ©.
            </span>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Ø¥ØºÙØ§Ù"
              className="flex-shrink-0 text-slate-500 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
