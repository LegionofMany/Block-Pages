import { NextResponse } from 'next/server';

// List of public routes that do not require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
  '/public',
];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // Allow public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }
  // Check for auth cookie (replace 'auth-token' with your actual cookie name)
  const token = request.cookies.get('auth-token');
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
