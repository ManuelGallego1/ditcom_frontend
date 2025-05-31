'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import tokens from '@/utils/Token';

const GraphVentasAnio = dynamic(() => import('@/components/molecules/graphics/GraphicVentas'), { ssr: false });
const CardTotalFijos = dynamic(() => import('@/components/molecules/statistics/StatsVentasFijas'), { ssr: false });
const CardTotalMovil = dynamic(() => import('@/components/molecules/statistics/StatsVentasMovil'), { ssr: false });

export default function ScreenPyme() {
  const [pymeId, setPymeId] = useState<number | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setPymeId(user.id);
      } catch (error) {
        console.error('Error parsing user cookie', error);
      }
    }
  }, []);

  if (!pymeId) return <div>Cargando datos de la Pyme...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className={tokens.title}>Dashboard Pyme</h1>

      <div className="flex justify-start gap-4">
        <CardTotalFijos ventas_pyme={true} />
        <CardTotalMovil ventas_pyme={true} />
      </div>

      <div className="p-6">
        <GraphVentasAnio ventas_pyme={true} />
      </div>
    </div>
  );
}
