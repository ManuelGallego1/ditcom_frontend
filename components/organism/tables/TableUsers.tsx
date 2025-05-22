'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUsers, deleteUser } from '@/libs/user-service';
import { UserDAO, UserServiceList } from '@/interfaces/UserInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';
import SearchInput from '@/components/atoms/SearchInput';
import tokens from '@/utils/Token';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableUsers() {
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<UserDAO[]>([]);
    const [usersList, setUsersList] = useState<UserDAO[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [alert, setAlert] = useState<{ type: AlertType; message: string } | null>(null);
    const [fadeOut, setFadeOut] = useState(false);

    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        nextPageUrl: null as string | null,
        prevPageUrl: null as string | null,
    });

    const fetchUsers = async (url?: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const response: UserServiceList = await getUsers(url);
            if (Array.isArray(response.data)) {
                setAllUsers(response.data);
                setUsersList(response.data);
                setPagination({
                    currentPage: response.current_page ?? 1,
                    lastPage: response.last_page ?? 1,
                    nextPageUrl: response.next_page_url,
                    prevPageUrl: response.prev_page_url,
                });
            } else {
                setError('No hay datos disponibles.');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error al obtener los usuarios. Inténtalo de nuevo más tarde.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId: number) => {
        const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
        if (!confirmDelete) return;

        try {
            await deleteUser(userId);
            setAllUsers((prev) => prev.filter((user) => user.id !== userId));
            setUsersList((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            setAlert({ type: 'success', message: 'Usuario eliminado correctamente.' });
        } catch (error) {
            console.error('Error deleting user:', error);
            setAlert({ type: 'error', message: 'Error al eliminar el usuario. Inténtalo de nuevo más tarde.' });
        }
        setFadeOut(false);
        setTimeout(() => setFadeOut(true), 2500);
        setTimeout(() => {
            setAlert(null);
            setFadeOut(false);
        }, 3000);
    };

    const handlePageChange = (url: string) => {
        fetchUsers(url);
    };

    const handleSearch = (value: string) => {
        const search = value.toLowerCase();
        const filtered = allUsers.filter((user) =>
            user.username.toLowerCase().includes(search) ||
            user.role.toLowerCase().includes(search)
        );
        setUsersList(filtered);
    };

    return (
        <>
            <div className={tokens.tableContainer}>
                <div className={tokens.headerWrapper}>
                    <h2 className={tokens.headerTitle}>Lista de Usuarios</h2>
                    <SearchInput onSearch={handleSearch} placeholder="Buscar usuario o rol..." />
                </div>

                <div className={tokens.tableWrapper}>
                    <table className={tokens.table}>
                        <thead>
                            <tr className={tokens.tableHeadRow}>
                                <th className={tokens.tableHeadCell}>Usuario</th>
                                <th className={tokens.tableHeadCell}>Rol</th>
                                <th className={tokens.tableHeadActionCell}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className={tokens.loadingCell}>
                                        <Loading />
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={3} className={tokens.errorCell}>
                                        {error}
                                    </td>
                                </tr>
                            ) : usersList.length > 0 ? (
                                usersList.map((user) => (
                                    <tr key={user.id} className={tokens.tableRow}>
                                        <td className={tokens.tableCell}>{user.username}</td>
                                        <td className={tokens.tableCellCapitalized}>{user.role}</td>
                                        <td className={tokens.tableCellCenter}>
                                            <div className={tokens.actionWrapper}>
                                                <Link href={`/admin/usuarios/${user.id}`}>
                                                    <span className={tokens.viewAction}>
                                                        <CustomIcons.info className="text-base" /> Ver
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className={tokens.deleteAction}
                                                >
                                                    <CustomIcons.delete className="text-base" /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className={tokens.noUsersCell}>
                                        No hay usuarios disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {!isLoading && !error && usersList.length > 0 && usersList.length === allUsers.length && (
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
                <AlertBox
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}
        </>
    );
}