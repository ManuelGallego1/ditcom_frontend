'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPlans, deletePlan } from '@/libs/plan-service';
import { PlanDAO, PlanServiceList } from '@/interfaces/PlanInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TablePlanes() {
  const [isLoading, setIsLoading] = useState(true);
  const [allPlanes, setAllPlanes] = useState<PlanDAO[]>([]);
  const [planesList, setPlanesList] = useState<PlanDAO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
  const [fadeOut, setFadeOut] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    lastPage: 1,
    nextPageUrl: null as string | null,
    prevPageUrl: null as string | null,
  });

  const fetchPlanes = async (url?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response: PlanServiceList = await getPlans(url || '');
      if (Array.isArray(response.data)) {
        setAllPlanes(response.data);
        setPlanesList(response.data);
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
      console.error('Error fetching planes:', err);
      setError('Error al obtener los planes. Inténtalo de nuevo más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Seguro que quieres eliminar este plan?')) return;
    try {
      await deletePlan(id.toString());
      setAllPlanes(prev => prev.filter(plan => plan.id !== id));
      setPlanesList(prev => prev.filter(plan => plan.id !== id));
      setAlert({ type: 'success', message: 'Plan eliminado correctamente.' });
    } catch (err) {
      console.error('Error deleting plan:', err);
      setAlert({ type: 'error', message: 'Error al eliminar el plan. Inténtalo de nuevo.' });
    }
    setFadeOut(false);
    setTimeout(() => setFadeOut(true), 2500);
    setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
  };

  const handlePageChange = (url: string) => {
    fetchPlanes(url);
  };

  const handleSearch = (value: string) => {
    const term = value.toLowerCase();
    const filtered = allPlanes.filter(plan =>
      plan.nombre.toLowerCase().includes(term) ||
      plan.codigo.toLowerCase().includes(term) ||
      (plan.activo === 1 ? 'activo' : 'inactivo').includes(term)
    );
    setPlanesList(filtered);
  };

  return (
    <>
      <div className={tokens.tableContainer}>
        <div className={tokens.headerWrapper}>
          <h2 className={tokens.headerTitle}>Listado de Planes</h2>
          <SearchInput onSearch={handleSearch} placeholder="Buscar por nombre, código o estado..." />
        </div>
        <div className={tokens.tableWrapper}>
          <table className={tokens.table}>
            <thead>
              <tr className={tokens.tableHeadRow}>
                <th className={tokens.tableHeadCell}>Código</th>
                <th className={tokens.tableHeadCell}>Nombre</th>
                <th className={tokens.tableHeadCell}>Estado</th>
                <th className={tokens.tableHeadActionCell}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan={4} className={tokens.loadingCell}><Loading /></td></tr>
              ) : error ? (
                <tr><td colSpan={4} className={tokens.errorCell}>{error}</td></tr>
              ) : planesList.length > 0 ? (
                planesList.map(plan => (
                  <tr key={plan.id} className={tokens.tableRow}>
                    <td className={tokens.tableCell}>{plan.codigo}</td>
                    <td className={tokens.tableCell}>{plan.nombre}</td>
                    <td className={tokens.tableCellCapitalized}>{plan.activo === 1 ? 'Activo' : 'Inactivo'}</td>
                    <td className={tokens.tableCellCenter}>
                      <div className={tokens.actionWrapper}>
                        <Link href={`/admin/planes/${plan.id}`}>
                          <span className={tokens.viewAction}><CustomIcons.info /> Ver</span>
                        </Link>
                        <button onClick={() => handleDelete(plan.id)} className={tokens.deleteAction}>
                          <CustomIcons.delete /> Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={4} className={tokens.noUsersCell}>No hay planes disponibles.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        {!isLoading && !error && planesList.length > 0 && planesList.length === allPlanes.length && (
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
