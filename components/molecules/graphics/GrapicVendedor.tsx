import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { getMejorVendedor } from '@/libs/estadistica-service';
import { MejorVendedor } from '@/interfaces/EstadisticaInterface';
import Loading from '@/components/atoms/Loading';

const options: ApexOptions = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: { show: true },
    fontFamily: 'Open Sans, sans-serif',
    foreColor: '#343a40',
  },
  colors: ['#9c0720'],
  plotOptions: {
    bar: {
      horizontal: true,
      borderRadius: 6,
      columnWidth: '50%',
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ['#fff'],
      fontSize: '14px',
      fontWeight: 600,
    },
  },
  xaxis: {
    categories: ['Fijo', 'Móvil', 'Total'],
    labels: {
      style: {
        colors: ['#343a40', '#343a40', '#343a40'],
        fontSize: '14px',
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: '#343a40',
        fontSize: '14px',
      },
    },
  },
  tooltip: {
    theme: 'light',
    style: { fontSize: '14px' },
  },
  states: {
    hover: {
      filter: { type: 'darken' },
    },
  },
};

export default function GraphMejorAsesor() {
  const [data, setData] = useState<MejorVendedor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMejorVendedor().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const series = [
    {
      name: 'Ventas',
      data: [data?.ventas_fijo ?? 0, data?.ventas_movil ?? 0, data?.ventas_totales ?? 0],
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-current">
        Mejor Asesor del Mes {data?.mejor_vendedor?.name && `- ${data.mejor_vendedor.name}`}
      </h2>

      {loading ? <Loading /> : <ReactApexChart options={options} series={series} type="bar" height={300} />}
    </div>
  );
}
