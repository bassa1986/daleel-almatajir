import { Check } from 'lucide-react';
import type { PlatformFullRelations } from '@/lib/data/platforms';

interface QuickVerdictProps {
  platformA: PlatformFullRelations;
  platformB: PlatformFullRelations;
}

export function QuickVerdict({ platformA, platformB }: QuickVerdictProps) {
  return (
    <section id="quick-verdict" className="glass p-6 md:p-8 mb-12 border-secondary/20">
      <h2 className="text-2xl font-extrabold text-white mb-6 text-center">الحكم السريع</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <VerdictColumn platform={platformA} />
        <VerdictColumn platform={platformB} />
      </div>
    </section>
  );
}

function VerdictColumn({ platform }: { platform: PlatformFullRelations }) {
  const points = platform.pros.slice(0, 3);
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-5">
      <h3 className="font-extrabold text-white mb-4">اختر {platform.nameAr} إذا:</h3>
      <ul className="space-y-3">
        {points.map((pro) => (
          <li key={pro.id} className="flex items-start gap-2.5 text-sm text-slate-300">
            <Check size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
            {pro.textAr}
          </li>
        ))}
      </ul>
    </div>
  );
}
