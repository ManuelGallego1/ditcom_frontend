import { useEffect, useState } from 'react';
import { UserDAO } from '@/interfaces/UserInterface';
import { getUsers } from '@/libs/user-service';

export function useUsersByRole(role: string) {
  const [items, setItems] = useState<UserDAO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const query = `${API_URL}/api/users?role=${encodeURIComponent(role)}`;
        const resp = await getUsers(query);
        setItems(resp.data ?? []);
      } catch (err: any) {
        console.error(err);
        setError('No se pudo cargar la lista');
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [role]);

  return { items, loading, error };
}
