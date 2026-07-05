import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token');
  if (!token) return false;
  const user = await prisma.adminUser.findFirst({ where: { token: token.value } });
  return !!user;
}

async function hasAnyUser() {
  const count = await prisma.adminUser.count();
  return count > 0;
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authed, hasUser] = await Promise.all([isAuthenticated(), hasAnyUser()]);

  const pathname = '';

  if (!hasUser) {
    redirect('/admin/setup');
  }

  if (!authed) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex" dir="ltr">
      <aside className="w-56 border-r border-white/6 flex flex-col py-8 px-4 fixed inset-y-0">
        <Link href="/admin" className="text-lg font-extrabold text-white mb-8 block">⚙ Admin</Link>
        <nav className="flex flex-col gap-1 flex-1">
          {[
            { href: '/admin', label: 'Dashboard' },
            { href: '/admin/platforms', label: 'Platforms' },
            { href: '/admin/articles', label: 'Articles' },
            { href: '/admin/subscribers', label: 'Subscribers' },
            { href: '/admin/calculator', label: 'Calculator' },
            { href: '/admin/affiliate-links', label: 'Affiliate Links' },
            { href: '/admin/settings', label: 'Settings' },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-slate-400 hover:text-white text-sm px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">{link.label}</Link>
          ))}
        </nav>
        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="text-slate-500 hover:text-white text-sm px-3 py-2 w-full text-left rounded-lg hover:bg-white/5 transition-colors">Logout</button>
        </form>
      </aside>
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}