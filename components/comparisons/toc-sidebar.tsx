'use client';

import { useEffect, useState } from 'react';

const SECTIONS = [
  { id: 'quick-verdict', labelAr: 'ÃÂ§ÃÂÃÂ­ÃÂÃÂ ÃÂ§ÃÂÃÂ³ÃÂ±ÃÂÃÂ¹' },
  { id: 'scorecard', labelAr: 'ÃÂ¨ÃÂ·ÃÂ§ÃÂÃÂ© ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ·' },
  { id: 'pricing', labelAr: 'ÃÂ§ÃÂÃÂ£ÃÂ³ÃÂ¹ÃÂ§ÃÂ±' },
  { id: 'features', labelAr: 'ÃÂ§ÃÂÃÂÃÂ²ÃÂ§ÃÂÃÂ§' },
  { id: 'mini-calculator', labelAr: 'ÃÂ§ÃÂÃÂ­ÃÂ§ÃÂ³ÃÂ¨ÃÂ©' },
  { id: 'deep-dives', labelAr: 'ÃÂ§ÃÂÃÂªÃÂÃÂµÃÂÃÂ' },
  { id: 'quiz', labelAr: 'ÃÂ£ÃÂÃÂ ÃÂÃÂÃÂµÃÂ© ÃÂªÃÂÃÂ§ÃÂ³ÃÂ¨ÃÂÃÂ' },
  { id: 'final-verdict', labelAr: 'ÃÂ§ÃÂÃÂ­ÃÂÃÂ ÃÂ§ÃÂÃÂÃÂÃÂ§ÃÂ¦ÃÂ' },
  { id: 'related', labelAr: 'ÃÂÃÂÃÂ§ÃÂ±ÃÂÃÂ§ÃÂª ÃÂ°ÃÂ§ÃÂª ÃÂµÃÂÃÂ©' },
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
      <div className="text-xs font-bold text-slate-500 mb-3 px-3">ÃÂÃÂ ÃÂÃÂ°ÃÂ ÃÂ§ÃÂÃÂµÃÂÃÂ­ÃÂ©</div>
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
