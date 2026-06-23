import { NextRequest, NextResponse } from 'next/server';
import { subscribeEmail } from '@/lib/actions/subscribe';

export async function POST(req: NextRequest) {
  const { email, source = 'footer' } = await req.json();
  const result = await subscribeEmail(email, source);
  return NextResponse.json(result, { status: result.success ? 200 : 400 });
}
