import ScreenManagmentUsers from '@/src/modules/admin/usuarios/ScreenManagmentUsers';
import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gestor - Usuarios | Ditcom',
    description: 'Gestor de Usuarios',
};

export default function Page() {
    return (
        <ScreenManagmentUsers />
    );
}
