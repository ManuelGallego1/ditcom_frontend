import es from "@/messages/es.json";
import en from "@/messages/en.json";

export const i18n = {
  defaultLocale: 'es',
  locales: ['es', 'en'],
};

export const dictionaries = {
  es,
  en,
};

export const getDictionary = (locale: keyof typeof dictionaries) => dictionaries[locale];
