'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMoviles, deleteMovil } from '@/libs/movil-service';
import { MovilDAO, MovilServiceList } from '@/interfaces/MovilInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableMoviles() {
    const [isLoading, setIsLoading] = useState(true);
    const [allMoviles, setAllMoviles] = useState<MovilDAO[]>([]);
    const [movilesList, setMovilesList] = useState<MovilDAO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: null as string | null,
        prevPageUrl: null as string | null,
    });

    const fetchMoviles = async (url?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: MovilServiceList = await getMoviles(url || '');
            if (Array.isArray(response.data)) {
                setAllMoviles(response.data);
                setMovilesList(response.data);
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
            console.error('Error fetching moviles:', err);
            setError('Error al obtener los registros móviles. Inténtalo de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMoviles();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Seguro que quieres eliminar este registro móvil?')) return;
        try {
            await deleteMovil(id.toString());
            setAllMoviles(prev => prev.filter(movil => movil.id !== id));
            setMovilesList(prev => prev.filter(movil => movil.id !== id));
            setAlert({ type: 'success', message: 'Registro eliminado correctamente.' });
        } catch (err) {
            console.error('Error deleting movil:', err);
            setAlert({ type: 'error', message: 'Error al eliminar el registro. Inténtalo de nuevo.' });
        }
        setFadeOut(false);
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
    };

    const handlePageChange = (url: string) => {
        fetchMoviles(url);
    };

    const handleSearch = (value: string) => {
        const term = value.toLowerCase();
        const filtered = allMoviles.filter(movil =>
            movil.min.toLowerCase().includes(term) ||
            movil.imei.toLowerCase().includes(term) ||
            movil.iccid.toLowerCase().includes(term) ||
            movil.cliente.cc.toLowerCase().includes(term) ||
            movil.cliente.p_nombre.toLowerCase().includes(term) ||
            movil.estado.toLowerCase().includes(term) ||
            movil.sede.nombre.toLowerCase().includes(term)
        );
        setMovilesList(filtered);
    };

    return (
        <>
            <div className={tokens.tableContainer}>
                <div className={tokens.headerWrapper}>
                    <h1 className={tokens.headerTitle}>Listado de Registros Móviles</h1>
                    <SearchInput onSearch={handleSearch} placeholder="Buscar por cliente, min, sede, estado..." />
                </div>
                <div className={`max-h-[60vh] ${tokens.tableWrapper}`}>
                    <table className={tokens.table}>
                        <thead>
                            <tr className={tokens.tableHeadRow}>
                                <th className={tokens.tableHeadCell}>MIN</th>
                                <th className={tokens.tableHeadCell}>Cliente</th>
                                <th className={tokens.tableHeadCell}>Sede</th>
                                <th className={tokens.tableHeadCell}>Tipo</th>
                                <th className={tokens.tableHeadCell}>Estado</th>
                                <th className={tokens.tableHeadCell}>Plan</th>
                                <th className={tokens.tableHeadActionCell}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={7} className={tokens.loadingCell}><Loading /></td></tr>
                            ) : error ? (
                                <tr><td colSpan={7} className={tokens.errorCell}>{error}</td></tr>
                            ) : movilesList.length > 0 ? (
                                movilesList.map(movil => (
                                    <tr key={movil.id} className={tokens.tableRow}>
                                        <td className={tokens.tableCell}>{movil.min}</td>
                                        <td className={tokens.tableCell}>{movil.cliente.cc}</td>
                                        <td className={tokens.tableCell}>{movil.sede.nombre}</td>
                                        <td className={tokens.tableCell}>{movil.tipo}</td>
                                        <td className={tokens.tableCellCapitalized}>{movil.estado}</td>
                                        <td className={tokens.tableCell}>{movil.plan?.nombre || 'N/A'}</td>
                                        <td className={tokens.tableCellCenter}>
                                            <div className={tokens.actionWrapper}>
                                                <Link href={`/admin/moviles/${movil.id}`}>
                                                    <span className={tokens.viewAction}><CustomIcons.info /> Ver</span>
                                                </Link>
                                                <button onClick={() => handleDelete(movil.id)} className={tokens.deleteAction}>
                                                    <CustomIcons.delete /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={7} className={tokens.noUsersCell}>No hay registros móviles.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!isLoading && !error && movilesList.length > 0 && movilesList.length === allMoviles.length && (
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
