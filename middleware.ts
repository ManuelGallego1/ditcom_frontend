import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

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
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  const userRole = user?.role ?? null;

  console.log('Cookies:', cookies);
  console.log('User:', user);
  console.log('User role:', userRole);

  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    if (userRole && userRole in defaultPaths) {
      const url = req.nextUrl.clone();
      url.pathname = defaultPaths[userRole as Role];
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  if (pathname === '/login') {
    if (userRole && userRole in defaultPaths) {
      const url = req.nextUrl.clone();
      url.pathname = defaultPaths[userRole as Role];
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

    if (req.nextUrl.pathname.startsWith('/_next/static')) {
        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/img')) {
        return NextResponse.next();
    }

    if (req.nextUrl.pathname.startsWith('/_next/image')) {
        return NextResponse.next();
    }

  if (!userRole || !(userRole in rolePermissions)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((pathRegex) => pathRegex.test(pathname));

  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = defaultPaths[userRole as Role];
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
