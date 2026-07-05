export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';

async function createFirstUser(formData: FormData) {
  'use server';
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  if (!email || !password || password.length < 8) return;
  const count = await prisma.adminUser.count();
  if (count > 0) { redirect('/admin/login'); return; }
  const bcrypt = await import('bcryptjs');
  const hash = await bcrypt.hash(password, 12);
  const token = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  await prisma.adminUser.create({ data: { email, passwordHash: hash, token } });
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  cookieStore.set('admin_token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, path: '/' });
  redirect('/admin');
}

export default async function SetupPage() {
  const count = await prisma.adminUser.count();
  if (count > 0) { redirect('/admin/login'); }
  return (
    <div className="min-h-screen bg-[#0A0F1E] flex items-center justify-center px-4" dir="ltr">
      <div className="w-full max-w-md">
        <div className="glass p-8 rounded-2xl">
          <h1 className="text-2xl font-extrabold text-white mb-2">Create Admin Account</h1>
          <p className="text-slate-400 text-sm mb-8">No users found. Create your first admin account to get started.</p>
          <form action={createFirstUser} className="flex flex-col gap-4">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Email</label>
              <input name="email" type="email" required placeholder="admin@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Password (min 8 characters)</label>
              <input name="password" type="password" required minLength={8} placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-secondary" />
            </div>
            <button type="submit" className="btn btn-primary w-full py-3 rounded-xl font-bold mt-2">Create Account & Enter Admin</button>
          </form>
        </div>
      </div>
    </div>
  );
}