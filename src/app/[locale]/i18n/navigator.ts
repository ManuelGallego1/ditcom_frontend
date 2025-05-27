// src/i18n/navigator.ts
const supportedLanguages = ['es', 'en'];

export function getBrowserLocale(): string {
  if (typeof navigator === 'undefined') return 'es'; // fallback para SSR

  const locale = navigator.language.split('-')[0]; // ej: 'en-US' → 'en'

  return supportedLanguages.includes(locale) ? locale : 'es';
}
