'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getFijos, deleteFijo } from '@/libs/fijo-service';
import { FijoDAO, FijoServiceList } from '@/interfaces/FijoInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableFijos() {
    const [isLoading, setIsLoading] = useState(true);
    const [allFijos, setAllFijos] = useState<FijoDAO[]>([]);
    const [fijosList, setFijosList] = useState<FijoDAO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: null as string | null,
        prevPageUrl: null as string | null,
    });

    const fetchFijos = async (url?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: FijoServiceList = await getFijos(url || '');
            if (Array.isArray(response.data)) {
                setAllFijos(response.data);
                setFijosList(response.data);
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
            console.error('Error fetching fijos:', err);
            setError('Error al obtener los registros fijos. Inténtalo de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchFijos();
    }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Seguro que quieres eliminar este registro fijo?')) return;
        try {
            await deleteFijo(id.toString());
            setAllFijos(prev => prev.filter(fijo => fijo.id !== id));
            setFijosList(prev => prev.filter(fijo => fijo.id !== id));
            setAlert({ type: 'success', message: 'Registro eliminado correctamente.' });
        } catch (err) {
            console.error('Error deleting fijo:', err);
            setAlert({ type: 'error', message: 'Error al eliminar el registro. Inténtalo de nuevo.' });
        }
        setFadeOut(false);
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => { setAlert(null); setFadeOut(false); }, 3000);
    };

    const handlePageChange = (url: string) => {
        fetchFijos(url);
    };

    const handleSearch = (value: string) => {
        const term = value.toLowerCase();
        const filtered = allFijos.filter(fijo =>
            fijo.cliente.cc.toLowerCase().includes(term) ||
            fijo.sede.nombre.toLowerCase().includes(term) ||
            fijo.estado.toLowerCase().includes(term) ||
            fijo.fecha_instalacion.toLowerCase().includes(term) ||
            (fijo.fecha_legalizacion ?? '').toLowerCase().includes(term) ||
            fijo.ciudad.toLowerCase().includes(term)
        );

        setFijosList(filtered);
    };

    return (
        <>
            <div className={tokens.tableContainer}>
                <div className={tokens.headerWrapper}>
                    <h1 className={tokens.headerTitle}>Listado de Registros Fijos</h1>
                    <SearchInput onSearch={handleSearch} placeholder="Buscar por cliente, sede o estado..." />
                </div>
                <div className={`max-h-[60vh] ${tokens.tableWrapper}`}>
                    <table className={tokens.table}>
                        <thead>
                            <tr className={tokens.tableHeadRow}>
                                <th className={tokens.tableHeadCell}>Fecha Legalización</th>
                                <th className={tokens.tableHeadCell}>Fecha Instalación</th>
                                <th className={tokens.tableHeadCell}>CC Cliente</th>
                                <th className={tokens.tableHeadCell}>Sede</th>
                                <th className={tokens.tableHeadCell}>Estado</th>
                                <th className={tokens.tableHeadCell}>Ciudad</th>
                                <th className={tokens.tableHeadActionCell}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr><td colSpan={4} className={tokens.loadingCell}><Loading /></td></tr>
                            ) : error ? (
                                <tr><td colSpan={4} className={tokens.errorCell}>{error}</td></tr>
                            ) : fijosList.length > 0 ? (
                                fijosList.map(fijo => (
                                    <tr key={fijo.id} className={tokens.tableRow}>
                                        <td className={tokens.tableCell}>{fijo.fecha_legalizacion || 'N/A'}</td>
                                        <td className={tokens.tableCell}>{fijo.fecha_instalacion}</td>
                                        <td className={tokens.tableCell}>{fijo.cliente.cc}</td>
                                        <td className={tokens.tableCell}>{fijo.sede.nombre}</td>
                                        <td className={tokens.tableCellCapitalized}>{fijo.estado}</td>
                                        <td className={tokens.tableCell}>{fijo.ciudad}</td>
                                        <td className={tokens.tableCellCenter}>
                                            <div className={tokens.actionWrapper}>
                                                <Link href={`/admin/fijos/${fijo.id}`}>
                                                    <span className={tokens.viewAction}><CustomIcons.info /> Ver</span>
                                                </Link>
                                                <button onClick={() => handleDelete(fijo.id)} className={tokens.deleteAction}>
                                                    <CustomIcons.delete /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={4} className={tokens.noUsersCell}>No hay registros fijos.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {!isLoading && !error && fijosList.length > 0 && fijosList.length === allFijos.length && (
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
