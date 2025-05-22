'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCelulares, deleteCelular } from '@/libs/celulares-service';
import { CelularDAO, CelularServiceList } from '@/interfaces/CelularInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableCelulares() {
  const [isLoading, setIsLoading] = useState(true);
  const [allCelulares, setAllCelulares] = useState<CelularDAO[]>([]);
  const [celularesList, setCelularesList] = useState<CelularDAO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
  });

  const fetchCelulares = async (url?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: CelularServiceList = await getCelulares(url || '');
      if (Array.isArray(response.data)) {
        setAllCelulares(response.data);
        setCelularesList(response.data);
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
      console.error('Error fetching celulares:', err);
      setError('Error al obtener los celulares. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCelulares();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este celular?')) return;
    try {
      await deleteCelular(id.toString());
      setAllCelulares(prev => prev.filter(celular => celular.id !== id));
      setCelularesList(prev => prev.filter(celular => celular.id !== id));
      setAlert({ type: 'success', message: 'Celular eliminado correctamente.' });
    } catch (err) {
      console.error('Error deleting celular:', err);
      setAlert({ type: 'error', message: 'Error al eliminar el celular. Inténtalo de nuevo.' });
    }
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
  };

  const handlePageChange = (url: string) => {
    fetchCelulares(url);
  };

  const handleSearch = (value: string) => {
    const term = value.toLowerCase();
    const filtered = allCelulares.filter(celular =>
      celular.marca.toLowerCase().includes(term) ||
      celular.modelo.toLowerCase().includes(term) ||
      (celular.activo === 1 ? 'activo' : 'inactivo').includes(term)
    );
    setCelularesList(filtered);
  };

  return (
    <>
      <div className={tokens.tableContainer}>
        <div className={tokens.headerWrapper}>
          <h2 className={tokens.headerTitle}>Listado de Celulares</h2>
          <SearchInput onSearch={handleSearch} placeholder="Buscar por marca, modelo o estado..." />
        </div>
        <div className={tokens.tableWrapper}>
          <table className={tokens.table}>
            <thead>
              <tr className={tokens.tableHeadRow}>
                <th className={tokens.tableHeadCell}>Marca</th>
                <th className={tokens.tableHeadCell}>Modelo</th>
                <th className={tokens.tableHeadCell}>Estado</th>
                <th className={tokens.tableHeadActionCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className={tokens.loadingCell}><Loading /></td></tr>
              ) : error ? (
                <tr><td colSpan={4} className={tokens.errorCell}>{error}</td></tr>
              ) : celularesList.length > 0 ? (
                celularesList.map(celular => (
                  <tr key={celular.id} className={tokens.tableRow}>
                    <td className={tokens.tableCell}>{celular.marca}</td>
                    <td className={tokens.tableCell}>{celular.modelo}</td>
                    <td className={tokens.tableCellCapitalized}>{celular.activo === 1 ? 'Activo' : 'Inactivo'}</td>
                    <td className={tokens.tableCellCenter}>
                      <div className={tokens.actionWrapper}>
                        <Link href={`/admin/celulares/${celular.id}`}>
                          <span className={tokens.viewAction}><CustomIcons.info /> Ver</span>
                        </Link>
                        <button onClick={() => handleDelete(celular.id)} className={tokens.deleteAction}>
                          <CustomIcons.delete /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className={tokens.noUsersCell}>No hay celulares disponibles.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !error && celularesList.length > 0 && celularesList.length === allCelulares.length && (
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
