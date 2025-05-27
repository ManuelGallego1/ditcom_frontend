// src/i18n/routing.ts
export const routes = {
  es: {
    home: '/',
    admin: '/admin',
    vendedor: '/asesor',
    coordinador: '/coordinador',
    activador: '/activador',
    pyme: '/pyme',
    administrador: '/admin',
    login: '/login',
  },
  en: {

    
    admin: '/admin',
    vendedor: '/salesperson',
    coordinador: '/coordinator',
    activador: '/activator',
    pyme: '/sme',
    administrador: '/admin',
    login: '/login',
  },
};

export const rolePermissions = {
  admin: [/^\/(.*)?$/],
  vendedor: [/^\/asesor(\/.*)?$/, /^\/salesperson(\/.*)?$/],
  coordinador: [/^\/coordinador(\/.*)?$/, /^\/coordinator(\/.*)?$/],
  activador: [/^\/activador(\/.*)?$/, /^\/activator(\/.*)?$/],
  pyme: [/^\/pyme(\/.*)?$/, /^\/sme(\/.*)?$/],
  administrador: [/^\/admin(\/.*)?$/],
};
