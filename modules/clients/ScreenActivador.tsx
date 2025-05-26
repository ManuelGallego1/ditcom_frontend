'use client';

import dynamic from 'next/dynamic';

const GraphVentasAnio = dynamic(() => import('@/components/molecules/graphics/GraphicVentas'), { ssr: false });
const CardTotalFijos = dynamic(() => import('@/components/molecules/statistics/StatsVentasFijas'), { ssr: false });
const CardTotalMovil = dynamic(() => import('@/components/molecules/statistics/StatsVentasMovil'), { ssr: false });
const GraphMejorAsesor = dynamic(() => import('@/components/molecules/graphics/GrapicVendedor'), { ssr: false });

export default function ScreenAdmin() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Dashboard Activador</h1>

      <div className="flex gap-4">
        <CardTotalFijos />
        <CardTotalMovil />
      </div>

      <div className="p-6">
        <GraphVentasAnio />
      </div>
    </div>

  );
}
