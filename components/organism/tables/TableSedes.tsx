'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getSedes, deleteSede } from '@/libs/sede-service';
import { SedeDAO, SedeServiceList } from '@/interfaces/SedeInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableSedes() {
  const [isLoading, setIsLoading] = useState(true);
  const [allSedes, setAllSedes] = useState<SedeDAO[]>([]);
  const [sedesList, setSedesList] = useState<SedeDAO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
  });

  const fetchSedes = async (url?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: SedeServiceList = await getSedes(url || '');
      if (Array.isArray(response.data)) {
        setAllSedes(response.data);
        setSedesList(response.data);
        setPagination({
          currentPage: response.current_page ?? 1,
          lastPage: response.last_page ?? 1,
          nextPageUrl: response.next_page_url,
          prevPageUrl: response.prev_page_url,
        });
      } else {
        setError('No hay datos disponibles.');
      }
    } catch (err) {
      console.error('Error fetching sedes:', err);
      setError('Error al obtener las sedes. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSedes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta sede?')) return;
    try {
      await deleteSede(id.toString());
      setAllSedes(prev => prev.filter(sede => sede.id !== id));
      setSedesList(prev => prev.filter(sede => sede.id !== id));
      setAlert({ type: 'success', message: 'Sede eliminada correctamente.' });
    } catch (err) {
      console.error('Error deleting sede:', err);
      setAlert({ type: 'error', message: 'Error al eliminar la sede. Inténtalo de nuevo.' });
    }
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
  };

  const handlePageChange = (url: string) => {
    fetchSedes(url);
  };

  const handleSearch = (value: string) => {
    const term = value.toLowerCase();
    const filtered = allSedes.filter(sede =>
      sede.nombre.toLowerCase().includes(term) ||
      sede.coordinador.username.toLowerCase().includes(term) ||
      (sede.activo === 1 ? 'activo' : 'inactivo').includes(term) ||
        sede.coordinador.name.toLowerCase().includes(term)
    );
    setSedesList(filtered);
  };

  return (
    <>
      <div className={tokens.tableContainer}>
        <div className={tokens.headerWrapper}>
          <h2 className={tokens.headerTitle}>Listado de Sedes</h2>
          <SearchInput onSearch={handleSearch} placeholder="Buscar por nombre, coordinador o estado..." />
        </div>
        <div className={tokens.tableWrapper}>
          <table className={tokens.table}>
            <thead>
              <tr className={tokens.tableHeadRow}>
                <th className={tokens.tableHeadCell}>Nombre</th>
                <th className={tokens.tableHeadCell}>Coordinador</th>
                <th className={tokens.tableHeadCell}>Estado</th>
                <th className={tokens.tableHeadActionCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className={tokens.loadingCell}><Loading /></td></tr>
              ) : error ? (
                <tr><td colSpan={4} className={tokens.errorCell}>{error}</td></tr>
              ) : sedesList.length > 0 ? (
                sedesList.map(sede => (
                  <tr key={sede.id} className={tokens.tableRow}>
                    <td className={tokens.tableCell}>{sede.nombre}</td>
                    <td className={tokens.tableCell}>{sede.coordinador.name}</td>
                    <td className={tokens.tableCellCapitalized}>{sede.activo === 1 ? 'Activo' : 'Inactivo'}</td>
                    <td className={tokens.tableCellCenter}>
                      <div className={tokens.actionWrapper}>
                        <Link href={`/admin/sedes/${sede.id}`}>
                          <span className={tokens.viewAction}><CustomIcons.info /> Ver</span>
                        </Link>
                        <button onClick={() => handleDelete(sede.id)} className={tokens.deleteAction}>
                          <CustomIcons.delete /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className={tokens.noUsersCell}>No hay sedes disponibles.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !error && sedesList.length > 0 && sedesList.length === allSedes.length && (
          <Pagination
            currentPage={pagination.currentPage}
            lastPage={pagination.lastPage}
            nextPageUrl={pagination.nextPageUrl}
            prevPageUrl={pagination.prevPageUrl}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {alert && (
        <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
      )}
    </>
  );
}
