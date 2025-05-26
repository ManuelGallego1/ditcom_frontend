import { getDictionary } from '@/src/i18n/dictionaries';
import HomePage from '@/src/modules/clients/ScreenHomePage';

export default async function LocaleHomePage({
  params,
}: {
  params: { locale: 'en' | 'es' };
}) {
  const dictionary = await getDictionary(params.locale);
  return <HomePage dictionary={dictionary.Home} />;
}
