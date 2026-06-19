import type { Metadata } from 'next';

export const metadata: Metadata = { title: { default: 'Admin', template: '%s | Daleel Admin' } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    // Admin CMS is LTR per spec (Section 7)
    <div dir="ltr" className="min-h-screen flex" style={{ background: '#0B1120' }}>
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-white/8 flex flex-col" style={{ background: '#0F1629' }}>
        <div className="p-5 border-b border-white/8">
          <div className="text-sm font-extrabold text-white">Daleel Al-Matajir</div>
          <div className="text-xs text-slate-500 mt-0.5">Admin CMS</div>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            { href: '/admin', label: 'Dashboard' },
            { href: '/admin/articles', label: 'Articles' },
            { href: '/admin/platforms', label: 'Platforms' },
            { href: '/admin/calculator', label: 'Calculator' },
            { href: '/admin/subscribers', label: 'Subscribers' },
            { href: '/admin/affiliate-links', label: 'Affiliate Links' },
            { href: '/admin/settings', label: 'Settings' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/8 transition-all"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="p-3 border-t border-white/8">
          <a href="/admin/login" className="block px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-red-400 transition-colors">
            Sign out
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-white/8 flex items-center px-6">
          <span className="text-sm text-slate-400 flex-1">Admin Panel</span>
          <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-xs text-primary font-bold">A</div>
        </header>
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
