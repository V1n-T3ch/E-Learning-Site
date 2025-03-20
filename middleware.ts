// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    // Check if the path starts with /admin
    if (path.startsWith('/admin')) {
        const session = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        // Redirect to login if not authenticated
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }

        // Redirect to home if not an admin
        if (session.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
        }

        // Allow access if admin
        return NextResponse.next();
    }

    // For all other routes, allow access
    return NextResponse.next();
}

// Only run middleware on matching routes
export const config = {
    matcher: ['/admin/:path*'],
};