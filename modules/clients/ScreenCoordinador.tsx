'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';
import tokens from '@/utils/Token';

const GraphVentasAnio = dynamic(() => import('@/components/molecules/graphics/GraphicVentas'), { ssr: false });
const CardTotalFijos = dynamic(() => import('@/components/molecules/statistics/StatsVentasFijas'), { ssr: false });
const CardTotalMovil = dynamic(() => import('@/components/molecules/statistics/StatsVentasMovil'), { ssr: false });

export default function ScreenAsesor() {
  const [coordinador_id, setCoordinadorId] = useState<number | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setCoordinadorId(user.id);
      } catch (error) {
        console.error('Error parsing user cookie', error);
      }
    }
  }, []);

  if (!coordinador_id) return <div>Cargando datos del coordinador...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className={tokens.title}>Dashboard Coordinador</h1>

      <div className="flex justify-start gap-4">
        <CardTotalFijos coordinador_id={coordinador_id} />
        <CardTotalMovil coordinador_id={coordinador_id} />
      </div>

      <div className="p-6">
        <GraphVentasAnio coordinador_id={coordinador_id} />
      </div>
    </div>
  );
}
