export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/db';
import { SubscribersView } from '@/components/admin/subscribers-view';

export default async function AdminSubscribersPage() {
  const subscribers = await prisma.subscriber.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-white mb-6">Subscribers</h1>
      <SubscribersView
        subscribers={subscribers.map((s) => ({
          id: s.id,
          email: s.email,
          source: s.source,
          createdAt: s.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
