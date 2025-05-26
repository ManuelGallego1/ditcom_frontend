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

  // 1) Detectamos el locale por URL o usamos el default
  const locale =
    i18n.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
    i18n.defaultLocale;

  // 2) Si están en la raíz exacta "/", redirigimos a "/{locale}"
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 3) Normalizamos removiendo el locale de la ruta
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // 4) Rutas públicas accesibles sin login (pero ya no incluimos "/")
  const publicPaths = ['/login'];
  if (publicPaths.includes(pathWithoutLocale)) {
    return NextResponse.next();
  }

  // 5) Permitimos assets estáticos
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/img')
  ) {
    return NextResponse.next();
  }

  // 6) Leemos la cookie de usuario
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const user = cookies.user ? JSON.parse(cookies.user) : null;
  const userRole = user?.role ?? null;

  // 7) Si no está autenticado, redirigimos a "/{locale}/login"
  if (!userRole || !(userRole in rolePermissions)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // 8) Validamos permisos de ruta según role
  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((regex) =>
    regex.test(pathWithoutLocale)
  );

  // 9) Si no tiene acceso, lo mandamos a su dashboard por defecto
  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${defaultPaths[userRole as Role]}`;
    return NextResponse.redirect(url);
  }

  // 10) Todo OK, continúa
  return NextResponse.next();
}
