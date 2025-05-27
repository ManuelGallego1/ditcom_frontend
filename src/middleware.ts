// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { i18n } from './app/[locale]/i18n';
import { routes, rolePermissions } from './app/[locale]/i18n/routing';

type Role = keyof typeof routes['es'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const locale =
    i18n.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
    i18n.defaultLocale;

  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const publicPaths = [routes[locale].login];
  if (publicPaths.includes(pathWithoutLocale)) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/img')
  ) {
    return NextResponse.next();
  }

  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  const userRole = user?.role ?? null;

  if (!userRole || !(userRole in rolePermissions)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${routes[locale].login}`;
    return NextResponse.redirect(url);
  }

  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((regex) => regex.test(pathWithoutLocale));

  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${routes[locale][userRole as Role]}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
