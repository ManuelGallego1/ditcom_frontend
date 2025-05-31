'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import tokens from '@/utils/Token';
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
      <h1 className={tokens.title}>Dashboard Asesor</h1>

      <div className="flex justify-start gap-4">
        <CardTotalFijos vendedor_id={vendedorId} />
        <CardTotalMovil vendedor_id={vendedorId} />
      </div>

      <div className="p-6">
        <GraphVentasAnio vendedor_id={vendedorId} />
      </div>
    </div>
  );
}
