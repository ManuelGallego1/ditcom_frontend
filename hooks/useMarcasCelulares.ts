import { useEffect, useState } from 'react';
import { getMarcasCelulares } from '@/libs/celulares-service';

export function useMarcasCelulares() {
  const [marcas, setMarcas] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getMarcasCelulares();
        setMarcas(response.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError('No se pudieron cargar las marcas');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { marcas, loading, error };
}
