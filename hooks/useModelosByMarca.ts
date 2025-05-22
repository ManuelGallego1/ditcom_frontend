import { useEffect, useState } from 'react';
import { getModelosByMarca } from '@/libs/celulares-service';

export function useModelosByMarca(marca: string | null) {
  const [modelos, setModelos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marca) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getModelosByMarca(marca);
        setModelos(response.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError('No se pudieron cargar los modelos');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, [marca]);

  return { modelos, loading, error };
}