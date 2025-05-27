// src/i18n/request.ts
import { NextRequest } from 'next/server';
import Negotiator from 'negotiator';

const languages = ['es', 'en'];

export function getLocale(request: NextRequest) {
  const negotiator = new Negotiator({
    headers: Object.fromEntries(request.headers.entries()),
  });
  const language = negotiator.language(languages);
  return language || 'es';
}
