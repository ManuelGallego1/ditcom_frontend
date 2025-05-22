'use client';

import React, { useState, useEffect } from 'react';
import SideBarButton from '../atoms/SideBarButton';
import SideBar from './SideBar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/libs/auth-services';
import { CustomIcons } from "@/utils/Icons";
import Loading from '@/components/atoms/Loading';

export default function NavBar({ onSidebarToggle }: { onSidebarToggle: (isOpen: boolean) => void }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        onSidebarToggle(sidebarOpen);
    }, [sidebarOpen, onSidebarToggle]);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const user = JSON.parse(userCookie);
            setUserName(user.name);
            setUserRole(user.role);
        } else {
            setUserName('Iniciar sesión');
        }
        setIsLoading(false);
    }, []);

    const handleLogout = async () => {
        setIsLoading(true);

        try {
            const success = await logoutUser();
            if (success) {
                await router.push('/login');
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error en logout:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="relative">
            {isLoading && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
                    <Loading />
                </div>
            )}
            <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} role={userRole} />
            <nav className="flex h-16 justify-between items-center px-4 bg-black duration-500 ease-linear dark:bg-boxdark">
                <div className="flex items-center">
                    <SideBarButton sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                </div>
                <div className="flex items-center text-white space-x-4">
                    <span className="flex cursor-pointer items-center gap-1 hover:scale-105 transition-transform duration-200">
                        <CustomIcons.account />
                        <span>{userName}</span>
                    </span>
                    <span
                        onClick={handleLogout}
                        className="flex cursor-pointer items-center gap-1 hover:scale-105 transition-transform duration-200"
                    >
                        <CustomIcons.logout />
                        <span>Salir</span>
                    </span>
                </div>
            </nav>
        </div>
    );
}
