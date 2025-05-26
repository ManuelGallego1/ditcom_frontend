import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { VentasPorMes } from '@/interfaces/EstadisticaInterface';
import { ApexOptions } from 'apexcharts';
import Loading from '@/components/atoms/Loading';
import { getVentasPorMesAnioActual } from '@/libs/estadistica-service'; // Importa la función correcta

interface GraphVentasAnioProps {
  vendedor_id?: number;
  coordinador_id?: number;
  ventas_pyme?: boolean;
}


const options: ApexOptions = {
  chart: {
    fontFamily: 'Open Sans, sans-serif',
    height: 335,
    type: 'area',
    toolbar: { show: true },
    foreColor: '#343a40',
  },
  colors: ['#80CAEE', '#9c0720'],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  grid: {
    borderColor: '#E5E7EB',
    xaxis: { lines: { show: true } },
    yaxis: { lines: { show: true } },
  },
  dataLabels: { enabled: false },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColors: ['#80CAEE', '#B22222'],
    strokeWidth: 3,
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'left',
    labels: { colors: '#343a40' },
  },
  xaxis: {
    type: 'category',
    categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    axisBorder: { show: false },
    axisTicks: { show: false },
    labels: { style: { colors: '#343a40', fontSize: '14px' } },
  },
  yaxis: {
    min: 0,
    max: 400,
    labels: { style: { colors: '#343a40', fontSize: '14px' } },
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '14px' },
  },
};

export default function GraphVentasAnio({ vendedor_id, coordinador_id, ventas_pyme }: GraphVentasAnioProps) {
  const [data, setData] = useState<VentasPorMes | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getVentasPorMesAnioActual({ vendedor_id, coordinador_id, ventas_pyme })
      .then((res) => {
        const ventas = Array.isArray(res) ? res[0] : res;
        setData(ventas);
      })
      .catch((err) => {
        console.error('Error fetching ventas:', err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [vendedor_id, coordinador_id, ventas_pyme]);

  const series = [
    { name: 'Total Fijo', data: data?.fijos || [] },
    { name: 'Total Movil', data: data?.moviles || [] },
  ];

  return (
    <div className="w-full max-w-5xl p-4 bg-white rounded shadow">
      <div id="chartOne">
        {loading ? <Loading /> : <ReactApexChart options={options} series={series} type="area" height={350} />}
      </div>
    </div>
  );
}