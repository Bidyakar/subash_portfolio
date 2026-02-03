import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const session = request.cookies.get('admin_session');

    // Check if the user is trying to access the dashboard
    if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
        if (!session) {
            // Redirect to login page if no session
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    // Allow access to login page if already authenticated
    if (request.nextUrl.pathname === '/admin' && session) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
