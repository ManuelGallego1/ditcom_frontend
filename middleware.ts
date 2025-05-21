import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

// Rutas permitidas según rol
const rolePermissions = {
  admin: [/^\/(.*)?$/],                // Admin puede acceder a todo
  user: [/^\/dashboard(\/.*)?$/],
  asesor: [/^\/asesor(\/.*)?$/],
  pyme: [/^\/pyme(\/.*)?$/],
  super: [/^\/admin(\/.*)?$/],
};

// Rutas por defecto según el rol
const defaultPaths = {
  admin: '/admin',
  user: '/dashboard',
  asesor: '/asesor',
  pyme: '/pyme',
  super: '/admin',
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

  // ✅ Permitir ver el HomePage al entrar a "/"
  if (pathname === '/') {
    return NextResponse.next();
  }

  // ✅ Si entra a /login y ya tiene sesión → redirigir a su dashboard
  if (pathname === '/login') {
    if (userRole && userRole in defaultPaths) {
      const url = req.nextUrl.clone();
      url.pathname = defaultPaths[userRole as Role];
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Ignorar archivos estáticos de Next.js
  if (pathname.startsWith('/_next/static')) {
    return NextResponse.next();
  }

  // Si no está logueado → redirigir a login
  if (!userRole || !(userRole in rolePermissions)) {
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // Revisar si tiene permiso para acceder a la ruta
  const allowedPaths = rolePermissions[userRole as Role];
  const hasAccess = allowedPaths.some((pathRegex) => pathRegex.test(pathname));

  if (!hasAccess) {
    const url = req.nextUrl.clone();
    url.pathname = defaultPaths[userRole as Role];
    return NextResponse.redirect(url);
  }

  // ✅ Permitir el acceso
  return NextResponse.next();
}
