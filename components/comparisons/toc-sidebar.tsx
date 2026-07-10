'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'quick-verdict', labelAr: 'Ø§ÙØ­ÙÙ Ø§ÙØ³Ø±ÙØ¹' },
  { id: 'scorecard', labelAr: 'Ø¨Ø·Ø§ÙØ© Ø§ÙÙÙØ§Ø·' },
  { id: 'pricing', labelAr: 'Ø§ÙØ£Ø³Ø¹Ø§Ø±' },
  { id: 'features', labelAr: 'Ø§ÙÙØ²Ø§ÙØ§' },
  { id: 'mini-calculator', labelAr: 'Ø§ÙØ­Ø§Ø³Ø¨Ø©' },
  { id: 'deep-dives', labelAr: 'Ø§ÙØªÙØµÙÙ' },
  { id: 'quiz', labelAr: 'Ø£ÙÙ ÙÙØµØ© ØªÙØ§Ø³Ø¨ÙØ' },
  { id: 'final-verdict', labelAr: 'Ø§ÙØ­ÙÙ Ø§ÙÙÙØ§Ø¦Ù' },
  { id: 'related', labelAr: 'ÙÙØ§Ø±ÙØ§Øª Ø°Ø§Øª ØµÙØ©' },
];

export function TocSidebar() {
  const [activeId, setActiveId] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hidden lg:block sticky top-28 w-48 flex-shrink-0 self-start">
      <div className="text-xs font-bold text-slate-500 mb-3 px-3">ÙÙ ÙØ°Ù Ø§ÙØµÙØ­Ø©</div>
      <ul className="space-y-0.5">
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`block px-3 py-2 rounded-lg text-xs transition-all ${
                activeId === s.id
                  ? 'bg-primary/15 text-blue-300 font-semibold'
                  : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
              }`}
            >
              {s.labelAr}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
