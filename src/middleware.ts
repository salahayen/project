
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const { pathname } = req.nextUrl;

    // 1. Redirect if not authenticated
    if (!token) {
        if (pathname.startsWith('/client') || pathname.startsWith('/expert') || pathname.startsWith('/admin')) {
            const loginUrl = new URL('/login', req.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            return NextResponse.redirect(loginUrl);
        }
        return NextResponse.next();
    }

    // 2. RBAC Checks
    const role = token.role as string;

    if (pathname.startsWith('/client') && role !== 'CLIENT' && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/expert') && role !== 'EXPERT' && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    if (pathname.startsWith('/admin') && role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/client/:path*', '/expert/:path*', '/admin/:path*'],
};
