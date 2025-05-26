import { useState } from 'react';
import { ClienteDAO } from '@/src/interfaces/ClienteInterface';
import { getClienteById } from '@/src/libs/clientes-service';

export function useClienteByCC() {
  const [cliente, setCliente] = useState<ClienteDAO | null>(null);
  const [existe, setExiste] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buscarCliente = async (cc: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await getClienteById(cc);
      if (data.status === 200 && data.data) {
        setCliente(data.data);
        setExiste(true);
      } else {
        setExiste(false);
        setCliente(null);
      }
    } catch (err) {
      console.error(err);
      setError('Error al buscar cliente');
      setExiste(false);
      setCliente(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    cliente,
    existe,
    loading,
    error,
    buscarCliente,
  };
}
