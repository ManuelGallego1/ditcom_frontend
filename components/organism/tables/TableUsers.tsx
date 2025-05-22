'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUsers, deleteUser } from '@/libs/user-service';
import { UserDAO, UserServiceList } from '@/interfaces/UserInterface';
import { CustomIcons } from '@/utils/Icons';
import Loading from '@/components/atoms/Loading';
import AlertBox from '@/components/atoms/AlertBox';
import Pagination from '@/components/atoms/Pagination';

type AlertType = 'success' | 'error' | 'info' | 'warning';

export default function TableUsers() {
    const [isLoading, setIsLoading] = useState(true);
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

    return (
        <>
            <div className="p-4 bg-white dark:bg-boxdark rounded-xl shadow-md overflow-hidden">
                <h2 className="text-lg font-semibold text-black dark:text-white mb-4">Lista de Usuarios</h2>

                <div className="overflow-x-auto max-h-[60vh] overflow-y-auto block">
                    <table className="min-w-full table-auto text-sm text-left border-collapse border rounded-md">
                        <thead>
                            <tr className="bg-gray-100 bg-white text-black uppercase text-xs">
                                <th className="p-3 whitespace-nowrap">Usuario</th>
                                <th className="p-3 whitespace-nowrap">Rol</th>
                                <th className="p-3 whitespace-nowrap text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={3} className="text-center p-4">
                                        <Loading />
                                    </td>
                                </tr>
                            ) : error ? (
                                <tr>
                                    <td colSpan={3} className="text-center text-red-500 p-4">
                                        {error}
                                    </td>
                                </tr>
                            ) : usersList.length > 0 ? (
                                usersList.map((user) => (
                                    <tr key={user.id} className="border-t border-gray-200 bg-white text-black">
                                        <td className="p-3">{user.username}</td>
                                        <td className="p-3 capitalize">{user.role}</td>
                                        <td className="p-3 text-center">
                                            <div className="flex flex-wrap justify-center gap-3">
                                                <Link href={`/admin/usuarios/${user.id}`}>
                                                    <span className="text-green-500 hover:underline flex items-center gap-1 cursor-pointer">
                                                        <CustomIcons.info className="text-base" /> Ver
                                                    </span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="text-red-500 hover:underline flex items-center gap-1"
                                                >
                                                    <CustomIcons.delete className="text-base" /> Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-4">
                                        No hay usuarios disponibles.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                {!isLoading && !error && usersList.length > 0 && (
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
