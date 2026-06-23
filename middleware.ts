import { NextRequest, NextResponse } from 'next/server';

// Admin dashboard is local-only: it's never served on the public production
// deployment. To manage content, run `npm run dev` locally with DATABASE_URL
// pointed at the production database, and use /admin from localhost.
export function middleware(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return new NextResponse('Not Found', { status: 404 });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
