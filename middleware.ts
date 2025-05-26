import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { i18n } from './i18n';

const rolePermissions = {
  admin: [/^\/(.*)?$/],
  vendedor: [/^\/asesor(\/.*)?$/],
  coordinador: [/^\/coordinador(\/.*)?$/],
  activador: [/^\/activador(\/.*)?$/],
  pyme: [/^\/pyme(\/.*)?$/],
  administrador: [/^\/admin(\/.*)?$/],
};

const defaultPaths = {
  admin: '/admin',
  coordinador: '/coordinador',
  activador: '/activador',
  vendedor: '/asesor',
  pyme: '/pyme',
  administrador: '/admin',
};

type Role = keyof typeof defaultPaths;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const locale = i18n.locales.find((loc) => pathname.startsWith(`/${loc}`)) || i18n.defaultLocale;

  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  const publicPaths = ['/', '/login'];
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
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((regex) => regex.test(pathWithoutLocale));

  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${defaultPaths[userRole as Role]}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
