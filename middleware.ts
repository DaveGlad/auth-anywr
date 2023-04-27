import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const userToken = request.cookies.get('user-token');

  if (request.nextUrl.pathname.startsWith('/auth') && userToken) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  //!REDIRECT
  if (request.nextUrl.pathname.startsWith('/dashboard') && !userToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
