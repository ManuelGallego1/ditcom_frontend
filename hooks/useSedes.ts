import { useEffect, useState } from 'react';
import { SedeDAO } from '@/interfaces/SedeInterface';
import { getSedes } from '@/libs/sede-service';

export function useSedes() {
  const [items, setItems] = useState<SedeDAO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `${API_URL}/api/sedes`;
        const resp = await getSedes(query);
        setItems(resp.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError('No se pudo cargar la lista de sedes');
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  return { items, loading, error };
}
