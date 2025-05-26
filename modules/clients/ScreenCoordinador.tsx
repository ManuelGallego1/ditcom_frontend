'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic';

const GraphVentasAnio = dynamic(() => import('@/components/molecules/graphics/GraphicVentas'), { ssr: false });
const CardTotalFijos = dynamic(() => import('@/components/molecules/statistics/StatsVentasFijas'), { ssr: false });
const CardTotalMovil = dynamic(() => import('@/components/molecules/statistics/StatsVentasMovil'), { ssr: false });

export default function ScreenAsesor() {
  const [vendedorId, setVendedorId] = useState<number | null>(null);

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);
        setVendedorId(user.id);
      } catch (error) {
        console.error('Error parsing user cookie', error);
      }
    }
  }, []);

  if (!vendedorId) return <div>Cargando datos del asesor...</div>;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard Asesor</h1>

      <div className="flex justify-start gap-4">
        <CardTotalFijos coordinador_id={9} />
        <CardTotalMovil coordinador_id={9} />
      </div>

      <div className="p-6">
        <GraphVentasAnio coordinador_id={9} />
      </div>
    </div>
  );
}
