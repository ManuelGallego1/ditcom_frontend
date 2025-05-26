import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';
import { routing } from './i18n/routing';

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

  // 1. Detectar locale o usar el default
  const locale =
    routing.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
    routing.defaultLocale;

  // 2. Redirigir desde "/" a "/{locale}"
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  // 3. Redirigir si no hay locale en la URL
  const hasLocale = routing.locales.some(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`
  );
  if (!hasLocale) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // 4. Remover el locale para evaluar permisos
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // 5. Permitir rutas públicas (como /login)
  const publicPaths = ['/login'];
  if (publicPaths.includes(pathWithoutLocale)) {
    return NextResponse.next();
  }

  // 6. Permitir recursos estáticos
  if (
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/img')
  ) {
    return NextResponse.next();
  }

  // 7. Leer cookie de usuario
  const cookieHeader = req.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  let userRole: string | null = null;

  try {
    const user = cookies.user ? JSON.parse(cookies.user) : null;
    userRole = user?.role ?? null;
  } catch {
    userRole = null;
  }

  // 8. Redirigir al login si no está autenticado o rol inválido
  if (!userRole || !(userRole in rolePermissions)) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/login`;
    return NextResponse.redirect(url);
  }

  // 9. Validar permisos por ruta
  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((regex) => regex.test(pathWithoutLocale));

  // 10. Redirigir al dashboard por defecto si no tiene permiso
  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}${defaultPaths[userRole as Role]}`;
    return NextResponse.redirect(url);
  }

  // 11. Todo correcto, continuar
  return NextResponse.next();
}

// 12. Configurar matcher para ignorar rutas internas
export const config = {
  matcher: ['/((?!_next|favicon.ico|img).*)'],
};
