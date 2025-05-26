import { useEffect, useState } from 'react';
import { getModelosByMarca } from '@/src/libs/celulares-service';

interface ModeloOption {
  id: number;
  modelo: string;
}

export function useModelosByMarca(marca: string | null) {
  const [modelos, setModelos] = useState<ModeloOption[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!marca) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getModelosByMarca(marca);
        const options = (response.data ?? []).map(modelo => ({
          id: modelo.id,
          modelo: modelo.modelo,
        }));
        setModelos(options);
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
