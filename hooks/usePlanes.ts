import { useEffect, useState } from 'react';
import { getPlans } from '@/libs/plan-service';

export function usePlanes() {
  const [planes, setPlanes] = useState<{ id: number; codigo: string; nombre: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getPlans();
        setPlanes(response.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError('No se pudieron cargar los planes');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { planes, loading, error };
}
