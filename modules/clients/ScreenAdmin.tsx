'use client';

import { useTranslations } from 'next-intl';

export default function ScreenAdmin() {
  const t = useTranslations('Admin');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('welcome')}</p>
    </div>
  );
}
