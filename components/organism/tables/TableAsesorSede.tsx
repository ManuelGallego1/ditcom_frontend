'use client';

import React, { useEffect, useState } from 'react';
import { getSedeAsesores, deleteSedeAsesor } from '@/libs/sede-asesor-service';
import { SedeAsesorDAO, SedeAsesorServiceList } from '@/interfaces/SedeAsesorInterface';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import { CustomIcons } from '@/utils/Icons';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableSedeAsesores() {
  const [isLoading, setIsLoading] = useState(true);
  const [allItems, setAllItems] = useState<SedeAsesorDAO[]>([]);
  const [filteredItems, setFilteredItems] = useState<SedeAsesorDAO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
  });

  const fetchData = async (url?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: SedeAsesorServiceList = await getSedeAsesores(url || '');
      if (Array.isArray(response.data)) {
        setAllItems(response.data);
        setFilteredItems(response.data);
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
      console.error('Error al obtener los registros:', err);
      setError('Error al obtener los datos. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar esta asignación?')) return;
    try {
      await deleteSedeAsesor(id.toString());
      setAllItems(prev => prev.filter(item => item.id !== id));
      setFilteredItems(prev => prev.filter(item => item.id !== id));
      setAlert({ type: 'success', message: 'Asignación eliminada correctamente.' });
    } catch (err) {
      console.error('Error al eliminar:', err);
      setAlert({ type: 'error', message: 'Error al eliminar la asignación. Inténtalo de nuevo.' });
    }
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
  };

  const handlePageChange = (url: string) => {
    fetchData(url);
  };

  const handleSearch = (value: string) => {
    const term = value.toLowerCase();
    const filtered = allItems.filter(item =>
      item.sede.nombre.toLowerCase().includes(term) ||
      item.vendedor.name.toLowerCase().includes(term) ||
      item.vendedor.username.toLowerCase().includes(term)
    );
    setFilteredItems(filtered);
  };

  return (
    <>
      <div className={tokens.tableContainer}>
        <div className={tokens.headerWrapper}>
          <h2 className={tokens.headerTitle}>Sede - Asesores</h2>
          <SearchInput onSearch={handleSearch} placeholder="Buscar por sede o asesor..." />
        </div>
        <div className={tokens.tableWrapper}>
          <table className={tokens.table}>
            <thead>
              <tr className={tokens.tableHeadRow}>
                <th className={tokens.tableHeadCell}>Sede</th>
                <th className={tokens.tableHeadCell}>Asesor</th>
                <th className={tokens.tableHeadCell}>Usuario</th>
                <th className={tokens.tableHeadActionCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className={tokens.loadingCell}><Loading /></td></tr>
              ) : error ? (
                <tr><td colSpan={4} className={tokens.errorCell}>{error}</td></tr>
              ) : filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <tr key={item.id} className={tokens.tableRow}>
                    <td className={tokens.tableCell}>{item.sede.nombre}</td>
                    <td className={tokens.tableCell}>{item.vendedor.name}</td>
                    <td className={tokens.tableCell}>{item.vendedor.username}</td>
                    <td className={tokens.tableCellCenter}>
                      <div className={tokens.actionWrapper}>
                        <button onClick={() => handleDelete(item.id)} className={tokens.deleteAction}>
                          <CustomIcons.delete /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className={tokens.noUsersCell}>No hay asignaciones registradas.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !error && filteredItems.length > 0 && filteredItems.length === allItems.length && (
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
