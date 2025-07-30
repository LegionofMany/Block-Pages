import { NextResponse } from 'next/server';

// List of public routes that do not require authentication
const publicRoutes = [
  '/login',
  '/register',
  '/_next',
  '/favicon.ico',
  '/api',
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
  matcher: ['/((?!api|_next|favicon.ico|public).*)'],
};
