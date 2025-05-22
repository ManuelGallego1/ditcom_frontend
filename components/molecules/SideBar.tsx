'use client';

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { CustomIcons } from "@/utils/Icons";
import Loading from "@/components/atoms/Loading";

interface SideBarProps {
    sidebarOpen: boolean;
    setSidebarOpen?: (open: boolean) => void;
    role: any;
}

export default function SideBar({ sidebarOpen, setSidebarOpen, role }: SideBarProps) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const handleNavigation = (href: string) => {
        if (router && (window.location.pathname === href)) return;
        setLoading(true);
        router.push(href);
    };

    useEffect(() => {
        setLoading(false);
    }, [pathname]);

    const renderIcon = (Icon: React.ElementType) => (
        <Icon className="text-bodydark1 group-hover:text-red transition-colors duration-300 w-5 h-5" />
    );

    const menuItems = [
        {
            label: "Dashboard",
            href: "/admin",
            roles: ["admin", "administrador", "coordinador"],
            icon: CustomIcons.dashboard,
        },
        {
            label: "Fijo",
            href: "/admin/fijo",
            roles: ["admin", "administrador"],
            icon: CustomIcons.home,
        },
        {
            label: "Móvil",
            href: "/admin/movil",
            roles: ["admin", "administrador"],
            icon: CustomIcons.phone,
        },
        {
            label: "Celulares",
            href: "/admin/celulares",
            roles: ["admin", "administrador", "vendedor", "activador", "pyme"],
            icon: CustomIcons.signal,
        },
        {
            label: "Usuarios",
            href: "/admin/usuarios",
            roles: ["admin"],
            icon: CustomIcons.users,
        },
        {
            label: "Sedes",
            href: "/admin/sedes",
            roles: ["admin", "administrador"],
            icon: CustomIcons.locationDot,
        },
        {
            label: "Planes",
            href: "/admin/planes",
            roles: ["admin", "administrador"],
            icon: CustomIcons.plans,
        },
        {
            label: "asignar sede",
            href: "/admin/vincular-sede",
            roles: ["admin", "administrador"],
            icon: CustomIcons.locationSelect,
        }
    ];

    const asesorItems = [
        {
            label: "Inicio",
            href: "/asesor",
            roles: ["vendedor", "activador", "pyme"],
            icon: CustomIcons.users,
        },
        {
            label: "Ver móvil",
            href: "/asesor/ver-movil",
            roles: ["vendedor", "activador"],
            icon: CustomIcons.phone,
        },
        {
            label: "Ver Fijo",
            href: "/asesor/ver-fijo",
            roles: ["vendedor", "activador"],
            icon: CustomIcons.home,
        },
    ];

    const filteredItems = menuItems.filter((item) => item.roles.includes(role));
    const filteredAsesorItems = asesorItems.filter((item) => item.roles.includes(role));

    return (
        <>
            {loading && (
                <div className="fixed inset-0 z-[100] bg-black bg-opacity-60 flex items-center justify-center">
                    <Loading />
                </div>
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-full w-60 flex-col bg-black duration-300 ease-linear dark:bg-boxdark 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-60'} lg:static lg:translate-x-0`}
            >
                <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                    <Image src="/img/png/logo.png" width={200} height={200} alt="Logo" />
                </div>

                <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                    <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                        {filteredItems.length > 0 && (
                            <ul className="mb-6 flex flex-col gap-1.5">
                                {filteredItems.map(({ label, href, icon }, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => handleNavigation(href)}
                                            className="group w-full text-left relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-2"
                                        >
                                            {renderIcon(icon)}
                                            <span className="group-hover:text-red transition-colors duration-300">{label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {filteredAsesorItems.length > 0 && (
                            <ul>
                                {filteredAsesorItems.map(({ label, href, icon }, idx) => (
                                    <li key={idx}>
                                        <button
                                            onClick={() => handleNavigation(href)}
                                            className="group w-full text-left relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-2"
                                        >
                                            {renderIcon(icon)}
                                            <span className="group-hover:text-red transition-colors duration-300">{label}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </nav>
                </div>
            </aside>
        </>
    );
}
